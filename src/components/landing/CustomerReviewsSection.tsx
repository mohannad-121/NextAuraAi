import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  MessageSquareText,
  Quote,
  RotateCcw,
  Send,
  Star,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import type {
  CustomerReview,
  ReviewErrorResponse,
  ReviewListResponse,
  ReviewSubmissionResponse,
} from "@/features/reviews/types";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";
import { getAnonymousVisitorId } from "@/lib/anonymousVisitor";
import "./customer-reviews.css";

const PAGE_SIZE = 4;
const MAX_COMMENT_LENGTH = 800;
const STAR_VALUES = [1, 2, 3, 4, 5] as const;

let initialReviewRequest: Promise<ReviewListResponse> | null = null;

function formatCopy(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

async function requestReviewPage(offset: number) {
  const response = await fetch(`/api/customer-reviews?offset=${offset}&limit=${PAGE_SIZE}`, {
    headers: { accept: "application/json" },
    cache: "no-store",
    credentials: "same-origin",
  });
  const payload = (await response.json().catch(() => null)) as
    ReviewListResponse | ReviewErrorResponse | null;
  if (!response.ok || !payload || payload.success !== true) {
    throw new Error(payload && "code" in payload ? payload.code : "REVIEW_LOAD_FAILED");
  }
  return payload;
}

function requestInitialReviews(force = false) {
  if (force) initialReviewRequest = null;
  initialReviewRequest ??= requestReviewPage(0);
  return initialReviewRequest;
}

export function CustomerReviewsSection() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].reviews;
  const reduceMotion = useReducedMotion();
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [rating, setRating] = useState(0);
  const [previewRating, setPreviewRating] = useState(0);
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [commentError, setCommentError] = useState("");
  const [submissionState, setSubmissionState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const lastSubmission = useRef<{ fingerprint: string; timestamp: number } | null>(null);

  const locale = language === "ar" ? "ar-JO" : language === "es" ? "es-ES" : "en-JO";
  const numberFormatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });

  const loadInitial = useCallback((force = false) => {
    setLoading(true);
    setLoadError(false);
    void requestInitialReviews(force)
      .then((payload) => {
        setReviews(payload.reviews);
        setTotalCount(payload.totalCount);
        setAverageRating(payload.averageRating);
        setHasMore(payload.hasMore);
        setLoadError(false);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  const resetFeedback = () => {
    if (submissionState !== "submitting") {
      setSubmissionState("idle");
      setSubmissionMessage("");
    }
  };

  const selectRating = (value: number) => {
    setRating(value);
    setRatingError("");
    resetFeedback();
  };

  const handleRatingKeyDown = (event: KeyboardEvent<HTMLInputElement>, value: number) => {
    if (event.key === "Enter") {
      event.preventDefault();
      selectRating(value);
    }
  };

  const loadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    setLoadError(false);
    try {
      const payload = await requestReviewPage(reviews.length);
      setReviews((current) => {
        const ids = new Set(current.map((review) => review.id));
        return [...current, ...payload.reviews.filter((review) => !ids.has(review.id))];
      });
      setTotalCount(payload.totalCount);
      setAverageRating(payload.averageRating);
      setHasMore(payload.hasMore);
    } catch {
      setLoadError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionState === "submitting") return;

    const cleanComment = comment.trim();
    let invalid = false;
    if (rating < 1 || rating > 5) {
      setRatingError(copy.ratingRequired);
      invalid = true;
    }
    if (cleanComment.length < 5) {
      setCommentError(copy.commentRequired);
      invalid = true;
    } else if (cleanComment.length > MAX_COMMENT_LENGTH) {
      setCommentError(formatCopy(copy.commentTooLong, { max: MAX_COMMENT_LENGTH }));
      invalid = true;
    }
    if (invalid) return;

    const fingerprint = `${rating}:${cleanComment.toLocaleLowerCase()}`;
    if (
      lastSubmission.current?.fingerprint === fingerprint &&
      Date.now() - lastSubmission.current.timestamp < 10_000
    ) {
      setSubmissionState("error");
      setSubmissionMessage(copy.duplicate);
      return;
    }

    setSubmissionState("submitting");
    setSubmissionMessage("");
    try {
      const response = await fetch("/api/customer-reviews", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          visitorId: getAnonymousVisitorId(),
          displayName: displayName.trim(),
          rating,
          comment: cleanComment,
          website,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        ReviewSubmissionResponse | ReviewErrorResponse | null;
      if (!response.ok || !payload || payload.success !== true) {
        const code = payload && "code" in payload ? payload.code : "REVIEW_SUBMIT_FAILED";
        throw new Error(code);
      }

      lastSubmission.current = { fingerprint, timestamp: Date.now() };
      setReviews((current) => [
        payload.review,
        ...current.filter((review) => review.id !== payload.review.id),
      ]);
      setTotalCount(payload.totalCount);
      setAverageRating(payload.averageRating);
      setHasMore(payload.totalCount > reviews.length + 1);
      setDisplayName("");
      setRating(0);
      setPreviewRating(0);
      setComment("");
      setWebsite("");
      setSubmissionState("success");
      setSubmissionMessage(copy.success);
    } catch (error) {
      const code = error instanceof Error ? error.message : "REVIEW_SUBMIT_FAILED";
      setSubmissionState("error");
      setSubmissionMessage(
        code === "REVIEW_RATE_LIMITED"
          ? copy.rateLimited
          : code === "REVIEW_DUPLICATE"
            ? copy.duplicate
            : copy.submitError,
      );
    }
  };

  const activeRating = previewRating || rating;
  const summaryLabel = totalCount
    ? formatCopy(copy.reviewCount, { count: new Intl.NumberFormat(locale).format(totalCount) })
    : copy.noRatings;

  return (
    <section id="reviews" className="customer-reviews-section" dir={dir}>
      <div className="customer-reviews-backdrop" aria-hidden="true">
        <img
          src="/images/cinematic/astro-review.png"
          alt=""
          loading="lazy"
          decoding="async"
          className="customer-reviews-backdrop-image"
        />
        <div className="customer-reviews-backdrop-overlay" />
        <div className="customer-reviews-vignette" />
      </div>

      <div className="homepage-container customer-reviews-container">
        <motion.header
          className="customer-reviews-intro"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
        >
          <div className="section-eyebrow">{copy.eyebrow}</div>
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
          <div className="customer-reviews-summary" aria-live="polite">
            <span className="customer-reviews-summary-icon" aria-hidden="true">
              <Star />
            </span>
            <span>
              <small>{copy.averageRating}</small>
              <strong>
                {totalCount
                  ? formatCopy(copy.outOfFive, {
                      rating: numberFormatter.format(averageRating),
                    })
                  : copy.noRatings}
              </strong>
            </span>
            <span className="customer-reviews-summary-count">{summaryLabel}</span>
          </div>
        </motion.header>

        <motion.div
          className="customer-reviews-workspace"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: reduceMotion ? 0 : 0.46, delay: reduceMotion ? 0 : 0.05 }}
        >
          <form className="customer-review-form" onSubmit={submitReview} noValidate>
            <div className="customer-review-panel-heading">
              <span className="customer-review-panel-icon" aria-hidden="true">
                <MessageSquareText />
              </span>
              <span>
                <h3>{copy.formTitle}</h3>
                <p>{copy.formIntro}</p>
              </span>
            </div>

            <div className="customer-review-field">
              <label htmlFor="customer-review-name">
                {copy.nameLabel} <small>{copy.optional}</small>
              </label>
              <input
                id="customer-review-name"
                value={displayName}
                maxLength={80}
                autoComplete="name"
                placeholder={copy.namePlaceholder}
                onChange={(event) => {
                  setDisplayName(event.target.value);
                  resetFeedback();
                }}
              />
            </div>

            <fieldset className="customer-review-rating-field">
              <legend>{copy.ratingLabel}</legend>
              <div
                className="customer-review-star-input"
                onPointerLeave={() => setPreviewRating(0)}
              >
                {STAR_VALUES.map((value) => (
                  <label
                    key={value}
                    htmlFor={`customer-review-rating-${value}`}
                    data-active={value <= activeRating}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") setPreviewRating(value);
                    }}
                  >
                    <input
                      id={`customer-review-rating-${value}`}
                      type="radio"
                      name="customer-review-rating"
                      value={value}
                      checked={rating === value}
                      aria-label={formatCopy(copy.starLabel, { rating: value })}
                      aria-invalid={Boolean(ratingError)}
                      onChange={() => selectRating(value)}
                      onKeyDown={(event) => handleRatingKeyDown(event, value)}
                    />
                    <Star aria-hidden="true" />
                  </label>
                ))}
                <span className="customer-review-rating-value" aria-live="polite">
                  {rating ? formatCopy(copy.ratingSelected, { rating }) : ""}
                </span>
              </div>
              {ratingError ? (
                <p className="customer-review-field-error" role="alert">
                  <AlertCircle aria-hidden="true" /> {ratingError}
                </p>
              ) : null}
            </fieldset>

            <div className="customer-review-field">
              <label htmlFor="customer-review-comment">{copy.commentLabel}</label>
              <textarea
                id="customer-review-comment"
                rows={5}
                required
                minLength={5}
                maxLength={MAX_COMMENT_LENGTH}
                value={comment}
                placeholder={copy.commentPlaceholder}
                aria-invalid={Boolean(commentError)}
                aria-describedby="customer-review-comment-counter"
                onChange={(event) => {
                  setComment(event.target.value);
                  setCommentError("");
                  resetFeedback();
                }}
              />
              <span
                id="customer-review-comment-counter"
                className="customer-review-character-count"
                data-near-limit={comment.length >= MAX_COMMENT_LENGTH * 0.9}
              >
                {formatCopy(copy.characterCounter, {
                  count: comment.length,
                  max: MAX_COMMENT_LENGTH,
                })}
              </span>
              {commentError ? (
                <p className="customer-review-field-error" role="alert">
                  <AlertCircle aria-hidden="true" /> {commentError}
                </p>
              ) : null}
            </div>

            <div className="customer-review-honeypot" aria-hidden="true">
              <label htmlFor="customer-review-website">Website</label>
              <input
                id="customer-review-website"
                value={website}
                tabIndex={-1}
                autoComplete="off"
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="customer-review-submit"
              disabled={submissionState === "submitting"}
            >
              {submissionState === "submitting" ? (
                <LoaderCircle className="customer-review-spinner" aria-hidden="true" />
              ) : (
                <Send aria-hidden="true" />
              )}
              {submissionState === "submitting" ? copy.submitting : copy.submit}
            </button>

            <div
              className="customer-review-submission-message"
              data-state={submissionState}
              role={submissionState === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {submissionMessage ? (
                <>
                  {submissionState === "success" ? (
                    <CheckCircle2 aria-hidden="true" />
                  ) : submissionState === "error" ? (
                    <AlertCircle aria-hidden="true" />
                  ) : null}
                  <span>{submissionMessage}</span>
                </>
              ) : null}
            </div>
          </form>

          <section
            className="customer-review-list-panel"
            aria-labelledby="customer-reviews-list-title"
          >
            <div className="customer-review-list-heading">
              <span>
                <small>{summaryLabel}</small>
                <h3 id="customer-reviews-list-title">{copy.newest}</h3>
              </span>
              <Quote aria-hidden="true" />
            </div>

            {loading ? <ReviewSkeleton /> : null}
            {!loading && loadError && reviews.length === 0 ? (
              <div className="customer-review-state" role="alert">
                <AlertCircle aria-hidden="true" />
                <p>{copy.databaseError}</p>
                <button type="button" onClick={() => loadInitial(true)}>
                  <RotateCcw aria-hidden="true" /> {copy.retry}
                </button>
              </div>
            ) : null}
            {!loading && !loadError && reviews.length === 0 ? (
              <div className="customer-review-state customer-review-empty-state">
                <MessageSquareText aria-hidden="true" />
                <h4>{copy.emptyTitle}</h4>
                <p>{copy.emptyBody}</p>
              </div>
            ) : null}
            {reviews.length ? (
              <div className="customer-review-cards">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    anonymous={copy.anonymous}
                    outOfFive={copy.outOfFive}
                    locale={locale}
                  />
                ))}
              </div>
            ) : null}

            {loadError && reviews.length > 0 ? (
              <p className="customer-review-inline-error" role="alert">
                <AlertCircle aria-hidden="true" /> {copy.databaseError}
              </p>
            ) : null}
            {hasMore ? (
              <button
                type="button"
                className="customer-review-load-more"
                disabled={loadingMore}
                onClick={loadMore}
              >
                {loadingMore ? (
                  <LoaderCircle className="customer-review-spinner" aria-hidden="true" />
                ) : null}
                {loadingMore ? copy.loadingMore : copy.loadMore}
              </button>
            ) : null}
          </section>
        </motion.div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  anonymous,
  outOfFive,
  locale,
}: {
  review: CustomerReview;
  anonymous: string;
  outOfFive: string;
  locale: string;
}) {
  const ratingLabel = formatCopy(outOfFive, { rating: review.rating });
  return (
    <article className="customer-review-card">
      <div className="customer-review-card-topline">
        <span>
          <strong>{review.displayName || anonymous}</strong>
          <time dateTime={review.createdAt}>
            {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
              new Date(review.createdAt),
            )}
          </time>
        </span>
        <span className="customer-review-card-rating" aria-label={ratingLabel}>
          <span aria-hidden="true">
            {STAR_VALUES.map((value) => (
              <Star key={value} data-filled={value <= review.rating} />
            ))}
          </span>
          <small>{ratingLabel}</small>
        </span>
      </div>
      <blockquote>
        <p>{review.comment}</p>
      </blockquote>
    </article>
  );
}

function ReviewSkeleton() {
  return (
    <div className="customer-review-skeletons" aria-hidden="true">
      {[0, 1, 2].map((value) => (
        <div key={value} className="customer-review-skeleton">
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}
