import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import type {
  CustomerReview,
  ReviewErrorResponse,
  ReviewListResponse,
  ReviewSubmissionResponse,
  ReviewSummary,
} from "@/features/reviews/types";

const SUPABASE_TIMEOUT_MS = 6_000;
const DEFAULT_PAGE_SIZE = 4;
const MAX_PAGE_SIZE = 8;
const MAX_COMMENT_LENGTH = 800;
const REVIEW_LIMIT_PER_HOUR = 3;
const DUPLICATE_WINDOW_MS = 10 * 60 * 1_000;

const reviewSubmissionSchema = z.object({
  visitorId: z.string().uuid(),
  displayName: z.string().max(80).optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5).max(MAX_COMMENT_LENGTH),
  website: z.string().max(200).optional(),
});

type SupabaseConfig = {
  restUrl: string;
  serviceRoleKey: string;
};

type ReviewRow = {
  id: string;
  display_name: string | null;
  rating: number;
  comment: string;
  created_at: string;
};

function noStoreJson(
  payload: ReviewListResponse | ReviewSubmissionResponse | ReviewErrorResponse,
  status = 200,
) {
  return Response.json(payload, {
    status,
    headers: { "cache-control": "no-store, no-cache, must-revalidate, max-age=0" },
  });
}

function errorResponse(code: string, status = 200) {
  console.error("[customer-reviews] Request failed", { code });
  return noStoreJson({ success: false, code }, status);
}

function getSupabaseConfig(): SupabaseConfig | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!supabaseUrl || !serviceRoleKey) return null;

  try {
    const parsedUrl = new URL(supabaseUrl);
    if (parsedUrl.protocol !== "https:" && parsedUrl.hostname !== "127.0.0.1") return null;
    return {
      restUrl: `${parsedUrl.toString().replace(/\/$/, "")}/rest/v1`,
      serviceRoleKey,
    };
  } catch {
    return null;
  }
}

function supabaseHeaders(config: SupabaseConfig, additional?: HeadersInit) {
  const headers = new Headers(additional);
  headers.set("accept", "application/json");
  headers.set("apikey", config.serviceRoleKey);
  headers.set("authorization", `Bearer ${config.serviceRoleKey}`);
  return headers;
}

async function supabaseRequest(config: SupabaseConfig, path: string, init?: RequestInit) {
  return fetch(`${config.restUrl}${path}`, {
    ...init,
    headers: supabaseHeaders(config, init?.headers),
    signal: AbortSignal.timeout(SUPABASE_TIMEOUT_MS),
    cache: "no-store",
  });
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost ?? request.headers.get("host");
  try {
    return Boolean(host) && new URL(origin).host === host;
  } catch {
    return false;
  }
}

function sanitizeText(value: string, maxLength: number) {
  let safe = "";
  for (const character of value) {
    const codePoint = character.codePointAt(0) ?? 0;
    safe += codePoint <= 0x1f || codePoint === 0x7f ? " " : character;
  }
  return safe.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function isRepeatedNoise(comment: string) {
  const compact = comment.toLocaleLowerCase().replace(/[\s\p{P}\p{S}]/gu, "");
  if (/(.)\1{14,}/u.test(compact)) return true;
  return compact.length >= 24 && new Set(compact).size < 3;
}

function toCustomerReview(row: ReviewRow): CustomerReview {
  return {
    id: row.id,
    displayName: row.display_name,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at,
  };
}

async function getReviewSummary(config: SupabaseConfig): Promise<ReviewSummary> {
  const response = await supabaseRequest(config, "/rpc/get_customer_review_summary", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}",
  });
  if (!response.ok) {
    if (response.status === 404) throw new Error("REVIEW_SCHEMA_MISSING");
    throw new Error("REVIEW_DATABASE_FAILED");
  }

  const payload = (await response.json()) as unknown;
  const row = Array.isArray(payload) ? payload[0] : payload;
  if (!row || typeof row !== "object") throw new Error("REVIEW_RESPONSE_INVALID");

  const totalCount = Number((row as Record<string, unknown>).total_count);
  const averageRating = Number((row as Record<string, unknown>).average_rating);
  if (
    !Number.isSafeInteger(totalCount) ||
    totalCount < 0 ||
    !Number.isFinite(averageRating) ||
    averageRating < 0 ||
    averageRating > 5
  ) {
    throw new Error("REVIEW_RESPONSE_INVALID");
  }
  return { totalCount, averageRating };
}

async function loadReviews(config: SupabaseConfig, offset: number, limit: number) {
  const query = new URLSearchParams({
    select: "id,display_name,rating,comment,created_at",
    is_visible: "eq.true",
    order: "created_at.desc",
    offset: String(offset),
    limit: String(limit),
  });
  const response = await supabaseRequest(config, `/customer_reviews?${query.toString()}`);
  if (!response.ok) {
    if (response.status === 404) throw new Error("REVIEW_SCHEMA_MISSING");
    throw new Error("REVIEW_DATABASE_FAILED");
  }
  const rows = (await response.json()) as ReviewRow[];
  if (!Array.isArray(rows)) throw new Error("REVIEW_RESPONSE_INVALID");
  return rows.map(toCustomerReview);
}

async function enforceReviewRateLimit(
  config: SupabaseConfig,
  visitorId: string,
  normalizedComment: string,
) {
  const hourAgo = new Date(Date.now() - 60 * 60 * 1_000).toISOString();
  const query = new URLSearchParams({
    select: "comment,created_at",
    visitor_id: `eq.${visitorId}`,
    created_at: `gte.${hourAgo}`,
    order: "created_at.desc",
    limit: String(REVIEW_LIMIT_PER_HOUR),
  });
  const response = await supabaseRequest(config, `/customer_reviews?${query.toString()}`);
  if (!response.ok) throw new Error("REVIEW_RATE_LIMIT_UNAVAILABLE");
  const recent = (await response.json()) as Array<{ comment?: unknown; created_at?: unknown }>;
  if (!Array.isArray(recent)) throw new Error("REVIEW_RATE_LIMIT_UNAVAILABLE");
  if (recent.length >= REVIEW_LIMIT_PER_HOUR) throw new Error("REVIEW_RATE_LIMITED");

  const duplicate = recent.some((review) => {
    if (typeof review.comment !== "string" || typeof review.created_at !== "string") return false;
    const submittedAt = Date.parse(review.created_at);
    return (
      Number.isFinite(submittedAt) &&
      Date.now() - submittedAt <= DUPLICATE_WINDOW_MS &&
      sanitizeText(review.comment, MAX_COMMENT_LENGTH).toLocaleLowerCase() ===
        normalizedComment.toLocaleLowerCase()
    );
  });
  if (duplicate) throw new Error("REVIEW_DUPLICATE");
}

async function insertReview(
  config: SupabaseConfig,
  input: { visitorId: string; displayName: string | null; rating: number; comment: string },
) {
  const response = await supabaseRequest(
    config,
    "/customer_reviews?select=id,display_name,rating,comment,created_at",
    {
      method: "POST",
      headers: { "content-type": "application/json", prefer: "return=representation" },
      body: JSON.stringify({
        visitor_id: input.visitorId,
        display_name: input.displayName,
        rating: input.rating,
        comment: input.comment,
        source_page: "homepage",
      }),
    },
  );
  if (!response.ok) throw new Error("REVIEW_INSERT_FAILED");
  const rows = (await response.json()) as ReviewRow[];
  if (!Array.isArray(rows) || !rows[0]) throw new Error("REVIEW_RESPONSE_INVALID");
  return toCustomerReview(rows[0]);
}

async function handleGet(request: Request) {
  const config = getSupabaseConfig();
  if (!config) return errorResponse("REVIEW_CONFIG_MISSING");
  const url = new URL(request.url);
  const offset = Math.max(0, Number.parseInt(url.searchParams.get("offset") ?? "0", 10) || 0);
  const limit = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, Number.parseInt(url.searchParams.get("limit") ?? "", 10) || DEFAULT_PAGE_SIZE),
  );

  try {
    const [reviews, summary] = await Promise.all([
      loadReviews(config, offset, limit),
      getReviewSummary(config),
    ]);
    return noStoreJson({
      success: true,
      reviews,
      ...summary,
      hasMore: offset + reviews.length < summary.totalCount,
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "REVIEW_DATABASE_FAILED";
    return errorResponse(code);
  }
}

async function handlePost(request: Request) {
  if (!isSameOrigin(request)) return errorResponse("ORIGIN_NOT_ALLOWED", 403);

  let parsed: z.infer<typeof reviewSubmissionSchema>;
  try {
    parsed = reviewSubmissionSchema.parse(await request.json());
  } catch {
    return errorResponse("REVIEW_REQUEST_INVALID", 400);
  }
  if (parsed.website?.trim()) return errorResponse("REVIEW_REQUEST_INVALID", 400);

  const displayName = sanitizeText(parsed.displayName ?? "", 80) || null;
  const comment = sanitizeText(parsed.comment, MAX_COMMENT_LENGTH);
  if (comment.length < 5 || isRepeatedNoise(comment)) {
    return errorResponse("REVIEW_COMMENT_INVALID", 400);
  }

  const config = getSupabaseConfig();
  if (!config) return errorResponse("REVIEW_CONFIG_MISSING");

  try {
    await enforceReviewRateLimit(config, parsed.visitorId, comment);
    const review = await insertReview(config, {
      visitorId: parsed.visitorId,
      displayName,
      rating: parsed.rating,
      comment,
    });
    const summary = await getReviewSummary(config);
    return noStoreJson({ success: true, review, ...summary }, 201);
  } catch (error) {
    const code = error instanceof Error ? error.message : "REVIEW_DATABASE_FAILED";
    const status = code === "REVIEW_RATE_LIMITED" || code === "REVIEW_DUPLICATE" ? 429 : 200;
    return errorResponse(code, status);
  }
}

export const Route = createFileRoute("/api/customer-reviews")({
  server: {
    handlers: {
      GET: ({ request }) => handleGet(request),
      POST: ({ request }) => handlePost(request),
    },
  },
});
