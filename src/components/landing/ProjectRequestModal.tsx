import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Download,
  FileText,
  Info,
  LoaderCircle,
  LockKeyhole,
  Mail,
  MessageCircle,
  Pencil,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { LanguageSwitcher, useLanguage } from "@/i18n/translations";
import { ProjectPageTail } from "@/components/landing/ProjectPageTail";
import { socialBrandClassName } from "@/components/landing/socialBrandStyles";
import {
  CURRENCIES,
  FEATURES,
  FEATURE_CATEGORY_ORDER,
  PACKAGE_LEVEL,
  PROJECT_PACKAGES,
  PROJECT_TYPE_OPTIONS,
  TIMELINE_OPTIONS,
  getFeature,
  getPackage,
} from "@/features/project-request/config";
import { formatProjectCopy, projectRequestCopy } from "@/features/project-request/copy";
import {
  calculateEstimate,
  getEffectiveFeatureIds,
  getRecommendedPackage,
  getTimelineDetails,
  preserveFeatureSelections,
} from "@/features/project-request/pricingEngine";
import { downloadProjectPdf, generateProjectRequestPdf } from "@/features/project-request/pdf";
import {
  buildEstimateExplanation,
  buildWhatsAppUrl,
  convertEstimate,
  formatMoneyRange,
  loadExchangeRates,
} from "@/features/project-request/services";
import {
  ProjectRequestPersistenceError,
  submitProjectRequest,
} from "@/features/project-request/projectRequests";
import type {
  ContactMethod,
  FeatureId,
  PackageId,
  PersistedProjectRequest,
  ProjectRequest,
  ProjectRequestDraft,
  ProjectTypeId,
  TimelineOption,
} from "@/features/project-request/types";
import "./project-request.css";

const STEP_EMOJIS = ["👋", "🌐", "💼", "✨", "⏱️", "🤖", "📄"];
const STEP_COUNT = STEP_EMOJIS.length;

const emptyDraft: ProjectRequestDraft = {
  fullName: "",
  phone: "",
  email: "",
  businessName: "",
  projectType: "",
  projectIdea: "",
  packageId: "",
  selectedFeatureIds: [],
  customFeature: "",
  languageCount: 1,
  timelineOption: "",
  requestedDate: "",
  contactMethod: "",
  notes: "",
  currency: "JOD",
};

type ProjectRequestModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
  presentation?: "modal" | "page";
};

type FieldErrors = Partial<Record<keyof ProjectRequestDraft | "consent", string>>;

type SubmissionResult = {
  stored: true;
  pdfStored: boolean;
  requestId: string;
};

export function ProjectRequestModal({
  open,
  onClose,
  onSubmitted,
  presentation = "modal",
}: ProjectRequestModalProps) {
  const { language, dir } = useLanguage();
  const copy = projectRequestCopy[language];
  const reduceMotion = useReducedMotion();
  const isPage = presentation === "page";
  const [step, setStep] = useState(0);
  const [maxReachedStep, setMaxReachedStep] = useState(0);
  const [draft, setDraft] = useState<ProjectRequestDraft>(emptyDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [consent, setConsent] = useState(false);
  const [calculationStage, setCalculationStage] = useState(0);
  const [calculationReady, setCalculationReady] = useState(false);
  const [rates, setRates] = useState<Awaited<ReturnType<typeof loadExchangeRates>> | null>(null);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [dismissedRecommendation, setDismissedRecommendation] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState<SubmissionResult | null>(null);
  const [submittedRequest, setSubmittedRequest] = useState<PersistedProjectRequest | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const submissionInFlightRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const hasData = useMemo(
    () =>
      Object.entries(draft).some(([key, value]) => {
        if (key === "currency" || key === "languageCount") return false;
        return Array.isArray(value) ? value.length > 0 : String(value).trim().length > 0;
      }),
    [draft],
  );

  const timeline = useMemo(
    () => getTimelineDetails(draft.timelineOption, draft.requestedDate),
    [draft.requestedDate, draft.timelineOption],
  );
  const estimate = useMemo(
    () => (draft.packageId && timeline ? calculateEstimate(draft, timeline) : null),
    [draft, timeline],
  );
  const convertedEstimate = useMemo(
    () => (estimate ? convertEstimate(estimate, draft.currency, rates) : null),
    [draft.currency, estimate, rates],
  );
  const selectedPackage = draft.packageId ? getPackage(draft.packageId) : null;
  const includedFeatureIds = selectedPackage?.includedFeatureIds ?? [];
  const recommendation = draft.packageId
    ? getRecommendedPackage(draft.packageId, draft.selectedFeatureIds)
    : null;
  const recommendationKey = recommendation
    ? `${draft.packageId}:${recommendation}:${[...draft.selectedFeatureIds].sort().join(",")}`
    : null;
  const showRecommendation = Boolean(
    recommendation && recommendationKey !== dismissedRecommendation,
  );

  const setField = <Key extends keyof ProjectRequestDraft>(
    field: Key,
    value: ProjectRequestDraft[Key],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (
      [
        "projectType",
        "packageId",
        "selectedFeatureIds",
        "customFeature",
        "languageCount",
        "timelineOption",
        "requestedDate",
      ].includes(field)
    ) {
      setCalculationReady(false);
    }
  };

  const requestClose = useCallback(() => {
    if (
      hasData &&
      !submission &&
      !window.confirm(
        language === "ar"
          ? "لديك بيانات غير مرسلة. هل تريد الخروج؟"
          : language === "es"
            ? "Tienes datos sin enviar. ¿Quieres salir?"
            : "You have unsent information. Do you want to exit?",
      )
    )
      return;
    onClose();
  }, [hasData, language, onClose, submission]);

  useEffect(() => {
    if (!open || isPage) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
      if (event.key !== "Tab") return;
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])",
      );
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isPage, open, requestClose]);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    if (step !== 5 || !estimate) return;
    setCalculationReady(false);
    setCalculationStage(0);
    if (reduceMotion) {
      setCalculationStage(copy.estimate.stages.length - 1);
      setCalculationReady(true);
      return;
    }
    const duration = 520;
    const timers = copy.estimate.stages.map((_, index) =>
      window.setTimeout(() => setCalculationStage(index), index * duration),
    );
    timers.push(
      window.setTimeout(() => setCalculationReady(true), copy.estimate.stages.length * duration),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [copy.estimate.stages, estimate, reduceMotion, step]);

  useEffect(() => {
    if (step < 5 || rates || ratesLoading) return;
    setRatesLoading(true);
    void loadExchangeRates()
      .then(setRates)
      .finally(() => setRatesLoading(false));
  }, [rates, ratesLoading, step]);

  const getErrorsForStep = (targetStep: number) => {
    const next: FieldErrors = {};
    if (targetStep === 0) {
      if (draft.fullName.trim().length < 2) next.fullName = copy.errors.required;
      if (!/^[+\d][\d\s()-]{6,31}$/.test(draft.phone.trim())) next.phone = copy.errors.invalidPhone;
      if (draft.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email))
        next.email = copy.errors.invalidEmail;
    }
    if (targetStep === 1) {
      if (!draft.projectType) next.projectType = copy.errors.chooseType;
      if (draft.projectIdea.trim().length < 20) next.projectIdea = copy.errors.projectIdeaShort;
    }
    if (targetStep === 2 && !draft.packageId) next.packageId = copy.errors.choosePackage;
    if (targetStep === 4) {
      if (!draft.timelineOption) next.timelineOption = copy.errors.chooseTimeline;
      if (draft.timelineOption === "custom") {
        const customTimeline = getTimelineDetails("custom", draft.requestedDate);
        if (!customTimeline) next.requestedDate = copy.errors.invalidDate;
        else if ((customTimeline.days ?? -1) < 0) next.requestedDate = copy.errors.pastDate;
      }
    }
    return next;
  };

  const validateStep = (targetStep = step) => {
    const next = getErrorsForStep(targetStep);
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const moveToStep = (nextStep: number) => {
    const safeStep = Math.max(0, Math.min(STEP_COUNT - 1, nextStep));
    setStep(safeStep);
    setMaxReachedStep((current) => Math.max(current, safeStep));
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const continueForward = () => {
    if (!validateStep()) return;
    moveToStep(step + 1);
  };

  const choosePackage = (packageId: PackageId) => {
    const selectedFeatureIds = preserveFeatureSelections(
      draft.packageId,
      packageId,
      draft.selectedFeatureIds,
    );
    setDraft((current) => ({
      ...current,
      packageId,
      selectedFeatureIds,
      languageCount: getPackage(packageId).includedFeatureIds.includes("multilingual")
        ? Math.max(2, current.languageCount)
        : current.languageCount,
    }));
    setErrors((current) => ({ ...current, packageId: undefined }));
    setDismissedRecommendation(null);
    setCalculationReady(false);
  };

  const toggleFeature = (featureId: FeatureId) => {
    const adding = !draft.selectedFeatureIds.includes(featureId);
    const selectedFeatureIds = !adding
      ? draft.selectedFeatureIds.filter((id) => id !== featureId)
      : [...draft.selectedFeatureIds, featureId];
    setDraft((current) => ({
      ...current,
      selectedFeatureIds,
      languageCount:
        featureId === "multilingual"
          ? adding
            ? Math.max(2, current.languageCount)
            : current.packageId &&
                getPackage(current.packageId).includedFeatureIds.includes("multilingual")
              ? Math.max(2, current.languageCount)
              : 1
          : current.languageCount,
    }));
    setCalculationReady(false);
    setDismissedRecommendation(null);
  };

  const acceptRecommendation = () => {
    if (!recommendation) return;
    choosePackage(recommendation);
  };

  const buildRequest = (): ProjectRequest | null => {
    if (!draft.packageId || !draft.projectType || !timeline || !estimate) return null;
    const converted = convertEstimate(estimate, draft.currency, rates);
    const explanation = buildEstimateExplanation(draft, estimate, timeline, language);
    return {
      locale: language,
      customer: {
        fullName: draft.fullName.trim(),
        phone: draft.phone.trim(),
        email: draft.email.trim() || undefined,
        businessName: draft.businessName.trim() || undefined,
      },
      projectType: draft.projectType,
      projectIdea: draft.projectIdea.trim(),
      packageId: draft.packageId,
      includedFeatureIds: getPackage(draft.packageId).includedFeatureIds,
      selectedFeatureIds: draft.selectedFeatureIds,
      customFeature: draft.customFeature.trim() || undefined,
      languageCount: draft.languageCount,
      timeline,
      contactMethod: draft.contactMethod || undefined,
      notes: draft.notes.trim() || undefined,
      estimate: {
        ...estimate,
        currencyBase: "JOD",
        selectedCurrency: draft.currency,
        convertedMin: converted?.min,
        convertedMax: converted?.max,
        exchangeRate: converted?.rate,
        exchangeRateTimestamp: rates?.timestamp,
        exchangeRateSource: rates?.source,
        approximateConversion: rates?.approximate ?? draft.currency !== "JOD",
        explanation,
      },
      maintenance: { freeMonths: 8 },
      submittedAt: new Date().toISOString(),
    };
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (submissionInFlightRef.current) return;
    const allValidationErrors: FieldErrors = {};
    const invalidSteps: number[] = [];
    for (const validationStep of [0, 1, 2, 4]) {
      const stepErrors = getErrorsForStep(validationStep);
      if (Object.keys(stepErrors).length) invalidSteps.push(validationStep);
      Object.assign(allValidationErrors, stepErrors);
    }
    if (invalidSteps.length) {
      setErrors(allValidationErrors);
      moveToStep(Math.min(...invalidSteps));
      return;
    }
    if (!consent) {
      setErrors({ consent: copy.errors.consent });
      return;
    }
    const request = buildRequest();
    if (!request) return;

    submissionInFlightRef.current = true;
    setSubmitting(true);
    setSubmissionError(null);
    setSubmission(null);
    setSubmittedRequest(null);
    setPdfBlob(null);
    try {
      const saved = await submitProjectRequest(request);
      const persistedRequest: PersistedProjectRequest = {
        ...request,
        id: saved.requestId,
        databaseId: saved.id,
        createdAt: saved.createdAt,
      };
      setSubmittedRequest(persistedRequest);

      let generatedPdf: Blob | null = null;
      try {
        generatedPdf = await generateProjectRequestPdf(persistedRequest, language);
        setPdfBlob(generatedPdf);
      } catch {
        setPdfBlob(null);
        setSubmissionError(copy.errors.pdf);
      }

      setSubmission({
        stored: true,
        pdfStored: Boolean(generatedPdf),
        requestId: saved.requestId,
      });
    } catch (error) {
      const code = error instanceof ProjectRequestPersistenceError ? error.code : undefined;
      if (code === "42883" || code === "PGRST202") {
        setSubmissionError(copy.errors.submissionFunction);
      } else if (code === "22023" || code === "22P02") {
        setSubmissionError(copy.errors.submissionValidation);
      } else if (code === "42501" || code === "PGRST301" || code === "SUPABASE_CONFIG_MISSING") {
        setSubmissionError(copy.errors.submissionUnavailable);
      } else {
        setSubmissionError(copy.errors.submission);
      }
    } finally {
      submissionInFlightRef.current = false;
      setSubmitting(false);
    }
  };

  const openManualWhatsApp = () => {
    if (!submittedRequest) return;
    const whatsappWindow = window.open(
      buildWhatsAppUrl(submittedRequest, language, { hasPdf: Boolean(pdfBlob) }),
      "_blank",
      "noopener,noreferrer",
    );
    if (whatsappWindow && onSubmitted) window.setTimeout(onSubmitted, 1200);
  };

  const progress = ((step + 1) / STEP_COUNT) * 100;
  const outerClass = isPage ? "nxa-project-page" : "nxa-project-modal";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={outerClass}
          initial={isPage || reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={dialogRef}
            dir={dir}
            role={isPage ? undefined : "dialog"}
            aria-modal={isPage ? undefined : "true"}
            aria-labelledby="project-builder-title"
            className="nxa-project-shell"
            initial={isPage || reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <header className="nxa-project-topbar">
              <button type="button" className="nxa-project-brand" onClick={requestClose}>
                <img src="/images/cinematic/logo-no-background.png" alt="NextAura AI" />
                <span>NextAura AI</span>
              </button>
              <div className="nxa-project-top-actions">
                <LanguageSwitcher />
                <button
                  type="button"
                  className="nxa-project-exit"
                  onClick={requestClose}
                  aria-label={copy.close}
                >
                  {isPage ? <ArrowLeft className="rtl:-scale-x-100" /> : <X />}
                  <span>{copy.home}</span>
                </button>
              </div>
            </header>

            <div className="nxa-project-heading">
              <div>
                <span className="nxa-project-eyebrow">{copy.eyebrow}</span>
                <h1 id="project-builder-title">{copy.title}</h1>
                <p>{copy.subtitle}</p>
              </div>
              <div className="nxa-project-progress-copy">
                <strong>{String(step + 1).padStart(2, "0")}</strong>
                <span>/ {String(STEP_COUNT).padStart(2, "0")}</span>
              </div>
            </div>

            <div className="nxa-project-mobile-progress" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>

            <div className="nxa-project-workspace">
              <StepRail
                step={step}
                maxReachedStep={maxReachedStep}
                steps={copy.steps}
                progress={copy.stepProgress}
                onSelect={moveToStep}
              />

              <main className="nxa-project-form-surface">
                {submission ? (
                  <SubmissionState
                    copy={copy}
                    submission={submission}
                    error={submissionError}
                    pdfBlob={pdfBlob}
                    request={submittedRequest}
                    onDownload={() => {
                      if (pdfBlob && submittedRequest)
                        downloadProjectPdf(pdfBlob, submittedRequest.id);
                    }}
                    onWhatsApp={openManualWhatsApp}
                  />
                ) : (
                  <form onSubmit={submit} noValidate>
                    {submissionError ? (
                      <div className="nxa-project-submission-warning" role="alert">
                        <AlertTriangle />
                        <span>{submissionError}</span>
                        <button
                          type="submit"
                          className="nxa-project-text-button"
                          disabled={submitting}
                        >
                          {copy.actions.retry}
                        </button>
                      </div>
                    ) : null}
                    <div className="nxa-project-step-heading">
                      <span className="nxa-project-step-emoji" aria-hidden="true">
                        {STEP_EMOJIS[step]}
                      </span>
                      <div>
                        <span>
                          {formatProjectCopy(copy.stepProgress, {
                            current: step + 1,
                            total: STEP_COUNT,
                          })}
                        </span>
                        <h2 ref={headingRef} tabIndex={-1}>
                          {copy.steps[step]}
                        </h2>
                        <p>{copy.stepIntros[step]}</p>
                      </div>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={step}
                        className="nxa-project-step-content"
                        initial={reduceMotion ? false : { opacity: 0, x: dir === "rtl" ? -14 : 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={
                          reduceMotion ? { opacity: 1 } : { opacity: 0, x: dir === "rtl" ? 8 : -8 }
                        }
                        transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
                      >
                        {step === 0 ? (
                          <InformationStep
                            draft={draft}
                            errors={errors}
                            setField={setField}
                            copy={copy}
                          />
                        ) : null}
                        {step === 1 ? (
                          <ProjectTypeStep
                            draft={draft}
                            errors={errors}
                            setField={setField}
                            copy={copy}
                            language={language}
                          />
                        ) : null}
                        {step === 2 ? (
                          <PackageStep
                            draft={draft}
                            error={errors.packageId}
                            choosePackage={choosePackage}
                            copy={copy}
                            language={language}
                          />
                        ) : null}
                        {step === 3 ? (
                          <FeatureStep
                            draft={draft}
                            includedFeatureIds={includedFeatureIds}
                            recommendation={recommendation}
                            showRecommendation={showRecommendation}
                            onAcceptRecommendation={acceptRecommendation}
                            onKeepRecommendation={() =>
                              recommendationKey && setDismissedRecommendation(recommendationKey)
                            }
                            toggleFeature={toggleFeature}
                            setField={setField}
                            copy={copy}
                            language={language}
                          />
                        ) : null}
                        {step === 4 ? (
                          <TimelineStep
                            draft={draft}
                            errors={errors}
                            setField={setField}
                            timeline={timeline}
                            copy={copy}
                            language={language}
                          />
                        ) : null}
                        {step === 5 && estimate && timeline ? (
                          <EstimateStep
                            draft={draft}
                            estimate={estimate}
                            timeline={timeline}
                            rates={rates}
                            ratesLoading={ratesLoading}
                            converted={convertedEstimate}
                            calculationReady={calculationReady}
                            calculationStage={calculationStage}
                            setField={setField}
                            copy={copy}
                            language={language}
                          />
                        ) : null}
                        {step === 6 && estimate && timeline ? (
                          <ReviewStep
                            draft={draft}
                            estimate={estimate}
                            timeline={timeline}
                            rates={rates}
                            converted={convertedEstimate}
                            consent={consent}
                            consentError={errors.consent}
                            setConsent={(value) => {
                              setConsent(value);
                              setErrors((current) => ({ ...current, consent: undefined }));
                            }}
                            onEdit={moveToStep}
                            copy={copy}
                            language={language}
                          />
                        ) : null}
                      </motion.div>
                    </AnimatePresence>

                    <div className="nxa-project-actions">
                      <button
                        type="button"
                        className="nxa-project-button nxa-project-button-secondary"
                        onClick={() => (step === 0 ? requestClose() : moveToStep(step - 1))}
                      >
                        <ArrowLeft className="rtl:-scale-x-100" />
                        {step === 0 ? copy.home : copy.actions.back}
                      </button>
                      {step < 5 ? (
                        <button
                          type="button"
                          className="nxa-project-button nxa-project-button-primary"
                          onClick={continueForward}
                        >
                          {step === 4 ? copy.actions.calculate : copy.actions.continue}
                          <ArrowRight className="rtl:-scale-x-100" />
                        </button>
                      ) : step === 5 ? (
                        <button
                          type="button"
                          disabled={!calculationReady}
                          className="nxa-project-button nxa-project-button-primary"
                          onClick={continueForward}
                        >
                          {copy.actions.review}
                          <ArrowRight className="rtl:-scale-x-100" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={submitting}
                          className="nxa-project-button nxa-project-button-primary"
                        >
                          {submitting ? (
                            <LoaderCircle className="nxa-project-spinner" />
                          ) : (
                            <ShieldCheck />
                          )}
                          {submitting ? copy.actions.submitting : copy.actions.submit}
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </main>

              <LiveSummary
                draft={draft}
                estimate={calculationReady ? estimate : null}
                converted={calculationReady ? convertedEstimate : null}
                timeline={timeline}
                copy={copy}
                language={language}
              />
            </div>
            {isPage ? <ProjectPageTail /> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function StepRail({
  step,
  maxReachedStep,
  steps,
  progress,
  onSelect,
}: {
  step: number;
  maxReachedStep: number;
  steps: string[];
  progress: string;
  onSelect: (step: number) => void;
}) {
  return (
    <nav className="nxa-project-step-rail" aria-label="Project request progress">
      <div className="nxa-project-step-rail-line" aria-hidden="true" />
      {steps.map((label, index) => {
        const current = step === index;
        const complete = step > index || maxReachedStep > index;
        const enabled = index <= maxReachedStep;
        return (
          <button
            key={label}
            type="button"
            disabled={!enabled}
            onClick={() => onSelect(index)}
            className="nxa-project-step-link"
            data-current={current}
            data-complete={complete && !current}
            aria-current={current ? "step" : undefined}
            aria-label={`${label}. ${formatProjectCopy(progress, { current: index + 1, total: steps.length })}`}
          >
            <span className="nxa-project-step-dot" aria-hidden="true">
              {complete && !current ? <Check /> : STEP_EMOJIS[index]}
            </span>
            <span>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <strong>{label}</strong>
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function InformationStep({ draft, errors, setField, copy }: StepProps) {
  return (
    <div className="nxa-project-field-grid">
      <FormField id="project-full-name" label={copy.info.fullName} error={errors.fullName} required>
        <UserRound />
        <input
          id="project-full-name"
          value={draft.fullName}
          onChange={(event) => setField("fullName", event.target.value)}
          placeholder={copy.info.fullNamePlaceholder}
          autoComplete="name"
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "project-full-name-error" : undefined}
        />
      </FormField>
      <FormField id="project-phone" label={copy.info.phone} error={errors.phone} required>
        <Phone />
        <input
          id="project-phone"
          value={draft.phone}
          onChange={(event) => setField("phone", event.target.value)}
          placeholder={copy.info.phonePlaceholder}
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "project-phone-error" : undefined}
        />
      </FormField>
      <FormField
        id="project-email"
        label={copy.info.email}
        optional={copy.info.optional}
        error={errors.email}
      >
        <Mail />
        <input
          id="project-email"
          type="email"
          value={draft.email}
          onChange={(event) => setField("email", event.target.value)}
          placeholder={copy.info.emailPlaceholder}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "project-email-error" : undefined}
        />
      </FormField>
      <FormField id="project-business" label={copy.info.businessName} optional={copy.info.optional}>
        <Sparkles />
        <input
          id="project-business"
          value={draft.businessName}
          onChange={(event) => setField("businessName", event.target.value)}
          placeholder={copy.info.businessPlaceholder}
          autoComplete="organization"
        />
      </FormField>
      <div className="nxa-project-privacy-note">
        <LockKeyhole aria-hidden="true" />
        <p>{copy.info.privacy}</p>
      </div>
    </div>
  );
}

function ProjectTypeStep({
  draft,
  errors,
  setField,
  copy,
  language,
}: StepProps & { language: "ar" | "en" | "es" }) {
  return (
    <div className="nxa-project-stack">
      <fieldset>
        <legend className="nxa-project-legend">{copy.project.chooseType}</legend>
        <div className="nxa-project-choice-grid">
          {PROJECT_TYPE_OPTIONS.map((option) => {
            const selected = draft.projectType === option.id;
            return (
              <label key={option.id} className="nxa-project-choice-card" data-selected={selected}>
                <input
                  type="radio"
                  name="project-type"
                  value={option.id}
                  checked={selected}
                  onChange={() => setField("projectType", option.id)}
                />
                <span className="nxa-project-choice-emoji" aria-hidden="true">
                  {option.emoji}
                </span>
                <span>
                  <strong>{option.label[language]}</strong>
                  <small>{option.description[language]}</small>
                </span>
                <Check className="nxa-project-choice-check" aria-hidden="true" />
              </label>
            );
          })}
        </div>
        {errors.projectType ? (
          <p className="nxa-project-error" role="alert">
            {errors.projectType}
          </p>
        ) : null}
      </fieldset>
      <FormField
        id="project-idea"
        label={copy.project.idea}
        error={errors.projectIdea}
        required
        helper={copy.project.ideaHelp}
      >
        <textarea
          id="project-idea"
          value={draft.projectIdea}
          onChange={(event) => setField("projectIdea", event.target.value)}
          placeholder={copy.project.ideaPlaceholder}
          rows={5}
          aria-invalid={Boolean(errors.projectIdea)}
          aria-describedby={errors.projectIdea ? "project-idea-error" : "project-idea-help"}
        />
      </FormField>
    </div>
  );
}

function PackageStep({
  draft,
  error,
  choosePackage,
  copy,
  language,
}: {
  draft: ProjectRequestDraft;
  error?: string;
  choosePackage: (packageId: PackageId) => void;
  copy: (typeof projectRequestCopy)["en"];
  language: "ar" | "en" | "es";
}) {
  return (
    <div className="nxa-project-stack">
      <div className="nxa-project-package-grid">
        {PROJECT_PACKAGES.map((projectPackage) => {
          const selected = draft.packageId === projectPackage.id;
          return (
            <button
              key={projectPackage.id}
              type="button"
              className="nxa-project-package-card"
              data-selected={selected}
              aria-pressed={selected}
              onClick={() => choosePackage(projectPackage.id)}
            >
              <div className="nxa-project-package-top">
                <span className="nxa-project-package-emoji" aria-hidden="true">
                  {projectPackage.emoji}
                </span>
                {projectPackage.badge ? (
                  <span className="nxa-project-package-badge">
                    {projectPackage.badge[language]}
                  </span>
                ) : null}
                {selected ? (
                  <span className="nxa-project-package-selected">
                    <Check /> {copy.packages.selected}
                  </span>
                ) : null}
              </div>
              <h3>{projectPackage.title[language]}</h3>
              {projectPackage.inheritance ? (
                <p className="nxa-project-inheritance">{projectPackage.inheritance[language]}</p>
              ) : null}
              <p className="nxa-project-package-description">
                {projectPackage.description[language]}
              </p>
              <div className="nxa-project-package-prices">
                <div>
                  <span>{copy.packages.normal}</span>
                  <strong>
                    {formatMoneyRange(
                      projectPackage.pricing.normal.min,
                      projectPackage.pricing.normal.max,
                      "JOD",
                      language,
                    )}
                  </strong>
                </div>
                <div>
                  <span>{copy.packages.rush}</span>
                  <strong>
                    {formatMoneyRange(
                      projectPackage.pricing.rush.min,
                      projectPackage.pricing.rush.max,
                      "JOD",
                      language,
                    )}
                  </strong>
                </div>
              </div>
              <div className="nxa-project-package-includes">
                <span>{copy.packages.included}</span>
                <ul>
                  {projectPackage.highlightedFeatureIds.map((featureId) => (
                    <li key={featureId}>
                      <Check /> {getFeature(featureId)?.title[language]}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="nxa-project-package-action">
                {selected ? copy.packages.selected : copy.packages.select}
              </span>
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="nxa-project-error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="nxa-project-inline-note">
        <Info />{" "}
        <span>
          {copy.packages.priceLater} {copy.packages.rushRule}
        </span>
      </div>
    </div>
  );
}

function FeatureStep({
  draft,
  includedFeatureIds,
  recommendation,
  showRecommendation,
  onAcceptRecommendation,
  onKeepRecommendation,
  toggleFeature,
  setField,
  copy,
  language,
}: {
  draft: ProjectRequestDraft;
  includedFeatureIds: FeatureId[];
  recommendation: PackageId | null;
  showRecommendation: boolean;
  onAcceptRecommendation: () => void;
  onKeepRecommendation: () => void;
  toggleFeature: (featureId: FeatureId) => void;
  setField: SetField;
  copy: (typeof projectRequestCopy)["en"];
  language: "ar" | "en" | "es";
}) {
  const selectedLevel = draft.packageId ? PACKAGE_LEVEL[draft.packageId] : 0;
  const included = FEATURES.filter((feature) => includedFeatureIds.includes(feature.id));
  const optional = FEATURES.filter((feature) => !includedFeatureIds.includes(feature.id));
  const multilingualActive = getEffectiveFeatureIds(
    draft.packageId || "basic",
    draft.selectedFeatureIds,
  ).includes("multilingual");

  return (
    <div className="nxa-project-stack">
      {showRecommendation && recommendation ? (
        <div className="nxa-project-recommendation" role="status">
          <div>
            <Sparkles />
            <span>
              <strong>{copy.features.recommendationTitle}</strong>
              <p>
                {formatProjectCopy(copy.features.recommendationBody, {
                  package: getPackage(recommendation).title[language],
                })}
              </p>
            </span>
          </div>
          <div className="nxa-project-recommendation-actions">
            <button type="button" onClick={onAcceptRecommendation}>
              {copy.actions.acceptUpgrade}
            </button>
            <button type="button" onClick={onKeepRecommendation}>
              {copy.actions.keepPackage}
            </button>
          </div>
        </div>
      ) : null}

      <details className="nxa-project-feature-group" open>
        <summary>
          <span>
            <CheckCircle2 />
            <span>
              <strong>{copy.features.includedTitle}</strong>
              <small>{copy.features.includedHelp}</small>
            </span>
          </span>
          <ChevronDown />
        </summary>
        <div className="nxa-project-feature-grid">
          {included.map((feature) => (
            <div key={feature.id} className="nxa-project-feature-card" data-status="included">
              <span className="nxa-project-feature-emoji" aria-hidden="true">
                {feature.emoji}
              </span>
              <span>
                <strong>{feature.title[language]}</strong>
                <small>{feature.description[language]}</small>
              </span>
              <span className="nxa-project-feature-status">
                <Check /> {copy.features.included}
              </span>
            </div>
          ))}
        </div>
      </details>

      <div className="nxa-project-feature-options">
        <div className="nxa-project-section-title">
          <strong>{copy.features.optionalTitle}</strong>
          <p>{copy.features.optionalHelp}</p>
        </div>
        {FEATURE_CATEGORY_ORDER.map((category) => {
          const categoryFeatures = optional.filter((feature) => feature.category === category);
          if (!categoryFeatures.length) return null;
          return (
            <section key={category} className="nxa-project-feature-category">
              <h3>{copy.features.categoryLabels[category]}</h3>
              <div className="nxa-project-feature-grid">
                {categoryFeatures.map((feature) => {
                  const selected = draft.selectedFeatureIds.includes(feature.id);
                  const advanced = PACKAGE_LEVEL[feature.minimumPackage] > selectedLevel;
                  return (
                    <button
                      key={feature.id}
                      type="button"
                      className="nxa-project-feature-card"
                      data-selected={selected}
                      data-status={advanced ? "advanced" : "optional"}
                      aria-pressed={selected}
                      onClick={() => toggleFeature(feature.id)}
                    >
                      <span className="nxa-project-feature-emoji" aria-hidden="true">
                        {feature.emoji}
                      </span>
                      <span>
                        <strong>{feature.title[language]}</strong>
                        <small>{feature.description[language]}</small>
                      </span>
                      <span className="nxa-project-feature-status">
                        {selected ? <Check /> : null}
                        {advanced ? copy.features.advanced : copy.features.optional}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {multilingualActive ? (
        <FormField
          id="project-language-count"
          label={copy.features.languageCount}
          helper={copy.features.languageCountHelp}
        >
          <select
            id="project-language-count"
            value={draft.languageCount}
            onChange={(event) => setField("languageCount", Number(event.target.value))}
          >
            {[2, 3, 4, 5, 6].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </FormField>
      ) : null}

      <FormField
        id="project-custom-feature"
        label={copy.features.customTitle}
        helper={copy.features.customHelp}
      >
        <textarea
          id="project-custom-feature"
          rows={4}
          value={draft.customFeature}
          onChange={(event) => setField("customFeature", event.target.value)}
          placeholder={copy.features.customPlaceholder}
        />
      </FormField>
    </div>
  );
}

function TimelineStep({
  draft,
  errors,
  setField,
  timeline,
  copy,
  language,
}: StepProps & {
  timeline: ReturnType<typeof getTimelineDetails>;
  language: "ar" | "en" | "es";
}) {
  return (
    <div className="nxa-project-stack">
      <fieldset>
        <legend className="nxa-project-legend">{copy.timeline.choose}</legend>
        <div className="nxa-project-timeline-grid">
          {TIMELINE_OPTIONS.map((option) => {
            const selected = draft.timelineOption === option.id;
            return (
              <label key={option.id} className="nxa-project-timeline-card" data-selected={selected}>
                <input
                  type="radio"
                  name="timeline"
                  checked={selected}
                  onChange={() => setField("timelineOption", option.id)}
                />
                <span aria-hidden="true">{option.emoji}</span>
                <span>
                  <strong>{option.label[language]}</strong>
                  <small>{option.description[language]}</small>
                </span>
                <Check aria-hidden="true" />
              </label>
            );
          })}
        </div>
        {errors.timelineOption ? (
          <p className="nxa-project-error" role="alert">
            {errors.timelineOption}
          </p>
        ) : null}
      </fieldset>

      {draft.timelineOption === "custom" ? (
        <FormField
          id="project-requested-date"
          label={copy.timeline.date}
          helper={copy.timeline.dateHelp}
          error={errors.requestedDate}
          required
        >
          <Clock3 />
          <input
            id="project-requested-date"
            type="date"
            value={draft.requestedDate}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(event) => setField("requestedDate", event.target.value)}
            aria-invalid={Boolean(errors.requestedDate)}
          />
        </FormField>
      ) : null}

      {timeline ? (
        <div className="nxa-project-delivery-status" data-rush={timeline.isRush}>
          {timeline.isRush ? <AlertTriangle /> : <CheckCircle2 />}
          <span>
            <strong>{timeline.isRush ? copy.timeline.rushTitle : copy.timeline.normalTitle}</strong>
            <p>{timeline.isRush ? copy.timeline.rushBody : copy.timeline.normalBody}</p>
          </span>
        </div>
      ) : null}

      <fieldset>
        <legend className="nxa-project-legend">{copy.timeline.contactMethod}</legend>
        <p className="nxa-project-legend-help">{copy.timeline.contactHelp}</p>
        <div className="nxa-project-contact-options">
          {(["whatsapp", "phone", "email"] as ContactMethod[]).map((method) => (
            <label key={method} data-selected={draft.contactMethod === method}>
              <input
                type="radio"
                name="contact-method"
                checked={draft.contactMethod === method}
                onChange={() => setField("contactMethod", method)}
              />
              {method === "whatsapp" ? (
                <MessageCircle />
              ) : method === "phone" ? (
                <Phone />
              ) : (
                <Mail />
              )}
              <span>{copy.timeline.contactOptions[method]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <FormField id="project-notes" label={copy.review.notes} optional={copy.info.optional}>
        <textarea
          id="project-notes"
          rows={4}
          value={draft.notes}
          onChange={(event) => setField("notes", event.target.value)}
        />
      </FormField>
    </div>
  );
}

function EstimateStep({
  draft,
  estimate,
  timeline,
  rates,
  ratesLoading,
  converted,
  calculationReady,
  calculationStage,
  setField,
  copy,
  language,
}: {
  draft: ProjectRequestDraft;
  estimate: NonNullable<ReturnType<typeof calculateEstimate>>;
  timeline: NonNullable<ReturnType<typeof getTimelineDetails>>;
  rates: Awaited<ReturnType<typeof loadExchangeRates>> | null;
  ratesLoading: boolean;
  converted: ReturnType<typeof convertEstimate>;
  calculationReady: boolean;
  calculationStage: number;
  setField: SetField;
  copy: (typeof projectRequestCopy)["en"];
  language: "ar" | "en" | "es";
}) {
  const projectPackage = getPackage(estimate.packageId);
  const explanation = buildEstimateExplanation(draft, estimate, timeline, language);
  const timelineLabel = TIMELINE_OPTIONS.find((option) => option.id === timeline.option)?.label[
    language
  ];
  const resultRange = converted
    ? formatMoneyRange(converted.min, converted.max, draft.currency, language)
    : formatMoneyRange(estimate.estimatedMinJod, estimate.estimatedMaxJod, "JOD", language);

  if (!calculationReady) {
    return (
      <div className="nxa-project-calculation" role="status" aria-live="polite">
        <div className="nxa-project-calculation-orb">
          <Sparkles />
          <span />
        </div>
        <span className="nxa-project-estimate-badge">🤖 {copy.estimate.badge}</span>
        <h3>{copy.estimate.calculatingTitle}</h3>
        <p>{copy.estimate.calculatingBody}</p>
        <div className="nxa-project-calculation-progress">
          <span
            style={{ width: `${((calculationStage + 1) / copy.estimate.stages.length) * 100}%` }}
          />
        </div>
        <ol>
          {copy.estimate.stages.map((stage, index) => (
            <li
              key={stage}
              data-active={index === calculationStage}
              data-complete={index < calculationStage}
            >
              <span>
                {index < calculationStage ? (
                  <Check />
                ) : index === calculationStage ? (
                  <LoaderCircle className="nxa-project-spinner" />
                ) : (
                  index + 1
                )}
              </span>
              {stage}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="nxa-project-stack" aria-live="polite">
      <section className="nxa-project-estimate-hero">
        <span className="nxa-project-estimate-badge">🤖 {copy.estimate.badge}</span>
        <p className="nxa-project-estimate-lead">{copy.estimate.resultLead}</p>
        <div className="nxa-project-estimate-price">{resultRange}</div>
        {draft.currency !== "JOD" ? (
          <div className="nxa-project-estimate-jod">
            {formatMoneyRange(estimate.estimatedMinJod, estimate.estimatedMaxJod, "JOD", language)}{" "}
            · {copy.summary.sourceJod}
          </div>
        ) : null}
        <p className="nxa-project-package-limit">
          {formatProjectCopy(copy.estimate.allowedRange, {
            range: formatMoneyRange(
              estimate.allowedMinJod,
              estimate.allowedMaxJod,
              "JOD",
              language,
            ),
          })}
        </p>
        <div className="nxa-project-estimate-meta">
          <span>
            <strong>{copy.estimate.selectedPackage}</strong>
            {projectPackage.title[language]}
          </span>
          <span>
            <strong>{copy.estimate.selectedTimeline}</strong>
            {timelineLabel}
          </span>
        </div>
      </section>

      <section className="nxa-project-currency-panel">
        <label htmlFor="project-currency">💵 {copy.estimate.currency}</label>
        <select
          id="project-currency"
          value={draft.currency}
          onChange={(event) =>
            setField("currency", event.target.value as ProjectRequestDraft["currency"])
          }
        >
          {CURRENCIES.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.emoji} {currency.code} — {currency.label[language]}
            </option>
          ))}
        </select>
        <div className="nxa-project-rate-note">
          {ratesLoading ? (
            <LoaderCircle className="nxa-project-spinner" />
          ) : rates?.approximate ? (
            <Info />
          ) : (
            <CheckCircle2 />
          )}
          <span>
            {ratesLoading || !rates
              ? copy.estimate.loading
              : rates.approximate
                ? copy.estimate.approximate
                : copy.estimate.live}
            {rates ? (
              <>
                {" "}
                ·{" "}
                <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer">
                  {formatProjectCopy(copy.estimate.rateUpdated, {
                    date: new Intl.DateTimeFormat(
                      language === "ar" ? "ar-JO" : language === "es" ? "es-ES" : "en-GB",
                      { dateStyle: "medium" },
                    ).format(new Date(rates.timestamp)),
                  })}
                </a>
              </>
            ) : null}
          </span>
        </div>
        {!converted ? (
          <p className="nxa-project-error">{copy.estimate.conversionUnavailable}</p>
        ) : null}
      </section>

      <section className="nxa-project-explanation-panel">
        <div>
          <CircleDollarSign />
          <span>
            <h3>{copy.estimate.whyTitle}</h3>
            <p>{explanation}</p>
          </span>
        </div>
        <h4>{copy.estimate.factorsTitle}</h4>
        {estimate.impactingFeatureIds.length ? (
          <ul>
            {estimate.impactingFeatureIds.map((featureId) => (
              <li key={featureId}>
                <Check />
                {getFeature(featureId)?.title[language]}
              </li>
            ))}
          </ul>
        ) : (
          <p>{copy.estimate.noAddedFeatures}</p>
        )}
        <small>
          <LockKeyhole /> {copy.estimate.localTemplate}
        </small>
      </section>

      <MaintenanceCard copy={copy} />
      <p className="nxa-project-disclaimer">
        <Info /> {copy.disclaimer}
      </p>
    </div>
  );
}

function ReviewStep({
  draft,
  estimate,
  timeline,
  rates,
  converted,
  consent,
  consentError,
  setConsent,
  onEdit,
  copy,
  language,
}: {
  draft: ProjectRequestDraft;
  estimate: NonNullable<ReturnType<typeof calculateEstimate>>;
  timeline: NonNullable<ReturnType<typeof getTimelineDetails>>;
  rates: Awaited<ReturnType<typeof loadExchangeRates>> | null;
  converted: ReturnType<typeof convertEstimate>;
  consent: boolean;
  consentError?: string;
  setConsent: (value: boolean) => void;
  onEdit: (step: number) => void;
  copy: (typeof projectRequestCopy)["en"];
  language: "ar" | "en" | "es";
}) {
  const packageTitle = getPackage(estimate.packageId).title[language];
  const projectType = PROJECT_TYPE_OPTIONS.find((item) => item.id === draft.projectType)?.label[
    language
  ];
  const timelineLabel = TIMELINE_OPTIONS.find((item) => item.id === timeline.option)?.label[
    language
  ];
  const includedNames = getPackage(estimate.packageId)
    .includedFeatureIds.map((id) => getFeature(id)?.title[language])
    .filter(Boolean);
  const selectedNames = draft.selectedFeatureIds
    .map((id) => getFeature(id)?.title[language])
    .filter(Boolean);
  const explanation = buildEstimateExplanation(draft, estimate, timeline, language);
  const fallback = copy.review.notProvided;
  const displayEstimate = converted
    ? formatMoneyRange(converted.min, converted.max, draft.currency, language)
    : fallback;

  return (
    <div className="nxa-project-stack">
      <div className="nxa-project-review-intro">
        <ShieldCheck />
        <p>{copy.review.intro}</p>
      </div>
      <ReviewSection title={copy.review.customer} onEdit={() => onEdit(0)} edit={copy.actions.edit}>
        <ReviewGrid
          items={[
            [copy.review.fullName, draft.fullName],
            [copy.review.phone, draft.phone],
            [copy.review.email, draft.email || fallback],
            [copy.review.businessName, draft.businessName || fallback],
          ]}
        />
      </ReviewSection>
      <ReviewSection title={copy.review.project} onEdit={() => onEdit(1)} edit={copy.actions.edit}>
        <ReviewGrid
          items={[
            [copy.review.projectType, projectType || fallback],
            [copy.review.projectIdea, draft.projectIdea],
          ]}
        />
      </ReviewSection>
      <ReviewSection title={copy.review.scope} onEdit={() => onEdit(3)} edit={copy.actions.edit}>
        <ReviewGrid
          items={[
            [copy.review.package, packageTitle],
            [copy.review.includedFeatures, includedNames.join(" · ")],
            [copy.review.selectedFeatures, selectedNames.join(" · ") || fallback],
            [copy.review.customFeature, draft.customFeature || fallback],
            [copy.review.languages, String(draft.languageCount)],
          ]}
        />
      </ReviewSection>
      <ReviewSection title={copy.review.timeline} onEdit={() => onEdit(4)} edit={copy.actions.edit}>
        <ReviewGrid
          items={[
            [copy.review.requestedTimeline, timeline.requestedDate || timelineLabel || fallback],
            [copy.review.deliveryMode, timeline.isRush ? copy.review.rush : copy.review.normal],
            [
              copy.review.contactMethod,
              draft.contactMethod ? copy.timeline.contactOptions[draft.contactMethod] : fallback,
            ],
            [copy.review.notes, draft.notes || fallback],
          ]}
        />
      </ReviewSection>
      <ReviewSection
        title={copy.review.estimate}
        onEdit={() => onEdit(5)}
        edit={copy.actions.edit}
        accent
      >
        <ReviewGrid
          items={[
            [
              copy.review.originalEstimate,
              formatMoneyRange(estimate.estimatedMinJod, estimate.estimatedMaxJod, "JOD", language),
            ],
            [copy.review.convertedEstimate, displayEstimate],
            [copy.review.explanation, explanation],
            [
              copy.review.submittedAt,
              new Intl.DateTimeFormat(
                language === "ar" ? "ar-JO" : language === "es" ? "es-ES" : "en-GB",
                { dateStyle: "long" },
              ).format(new Date()),
            ],
          ]}
        />
        {rates ? (
          <small className="nxa-project-review-rate">
            {rates.source} · {rates.timestamp}
          </small>
        ) : null}
      </ReviewSection>
      <MaintenanceCard copy={copy} />
      <p className="nxa-project-disclaimer">
        <Info /> {copy.disclaimer}
      </p>
      <label className="nxa-project-consent" data-error={Boolean(consentError)}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
        />
        <span className="nxa-project-consent-check">
          <Check />
        </span>
        <span>{copy.review.consent}</span>
      </label>
      {consentError ? (
        <p className="nxa-project-error" role="alert">
          {consentError}
        </p>
      ) : null}
    </div>
  );
}

function LiveSummary({
  draft,
  estimate,
  converted,
  timeline,
  copy,
  language,
}: {
  draft: ProjectRequestDraft;
  estimate: ReturnType<typeof calculateEstimate> | null;
  converted: ReturnType<typeof convertEstimate>;
  timeline: ReturnType<typeof getTimelineDetails>;
  copy: (typeof projectRequestCopy)["en"];
  language: "ar" | "en" | "es";
}) {
  const projectPackage = draft.packageId ? getPackage(draft.packageId) : null;
  const timelineLabel = timeline
    ? TIMELINE_OPTIONS.find((item) => item.id === timeline.option)?.label[language]
    : null;
  return (
    <aside className="nxa-project-summary" aria-label={copy.summary.title}>
      <span className="nxa-project-summary-eyebrow">{copy.summary.eyebrow}</span>
      <h2>{copy.summary.title}</h2>
      {projectPackage ? (
        <>
          <div className="nxa-project-summary-package">
            <span aria-hidden="true">{projectPackage.emoji}</span>
            <div>
              <strong>{projectPackage.title[language]}</strong>
              <small>
                {projectPackage.inheritance?.[language] ?? projectPackage.description[language]}
              </small>
            </div>
          </div>
          <div className="nxa-project-summary-row">
            <span>{copy.summary.features}</span>
            <strong>
              {projectPackage.includedFeatureIds.length} {copy.summary.included} ·{" "}
              {draft.selectedFeatureIds.length} {copy.summary.added}
            </strong>
          </div>
          <div className="nxa-project-summary-row">
            <span>{copy.summary.timeline}</span>
            <strong>{timelineLabel ?? "—"}</strong>
          </div>
          <div className="nxa-project-summary-estimate">
            <span>{copy.summary.estimate}</span>
            <strong>
              {estimate && converted
                ? formatMoneyRange(converted.min, converted.max, draft.currency, language)
                : copy.summary.pendingEstimate}
            </strong>
            {estimate && draft.currency !== "JOD" ? (
              <small>
                {formatMoneyRange(
                  estimate.estimatedMinJod,
                  estimate.estimatedMaxJod,
                  "JOD",
                  language,
                )}
              </small>
            ) : null}
          </div>
          <div className="nxa-project-summary-maintenance">
            <span aria-hidden="true">🛠️</span>
            <p>{copy.maintenance.title}</p>
          </div>
        </>
      ) : (
        <p className="nxa-project-summary-empty">{copy.summary.emptyPackage}</p>
      )}
      <div className="nxa-project-summary-secure">
        <LockKeyhole />
        <span>{copy.info.privacy}</span>
      </div>
    </aside>
  );
}

function SubmissionState({
  copy,
  submission,
  error,
  pdfBlob,
  request,
  onDownload,
  onWhatsApp,
}: {
  copy: (typeof projectRequestCopy)["en"];
  submission: SubmissionResult;
  error: string | null;
  pdfBlob: Blob | null;
  request: PersistedProjectRequest | null;
  onDownload: () => void;
  onWhatsApp: () => void;
}) {
  return (
    <div className="nxa-project-submission-state" role="status">
      <div className="nxa-project-success-icon" data-manual="true">
        <FileText />
      </div>
      <span className="nxa-project-estimate-badge">
        ✅ {copy.success.requestId}: {submission.requestId}
      </span>
      <h2>{copy.success.manualTitle}</h2>
      {error ? (
        <p className="nxa-project-submission-warning">
          <AlertTriangle /> {error}
        </p>
      ) : null}
      {submission.stored ? <p>{copy.success.stored}</p> : null}
      <p>{copy.success.manualBody}</p>
      <ol>
        {copy.success.manualSteps.map((item) => (
          <li key={item}>
            <span>{copy.success.manualSteps.indexOf(item) + 1}</span>
            {item}
          </li>
        ))}
      </ol>
      <div className="nxa-project-submission-actions">
        <button
          type="button"
          className="nxa-project-button nxa-project-button-secondary"
          onClick={onDownload}
          disabled={!pdfBlob || !submission.pdfStored}
        >
          <Download /> {copy.actions.downloadPdf}
        </button>
        <button
          type="button"
          className={`nxa-project-button nxa-project-button-primary ${socialBrandClassName("https://wa.me/962799195498", "WhatsApp", "cta")}`}
          onClick={onWhatsApp}
          disabled={!request}
        >
          <MessageCircle /> {copy.actions.openWhatsapp}
        </button>
      </div>
    </div>
  );
}

function MaintenanceCard({ copy }: { copy: (typeof projectRequestCopy)["en"] }) {
  return (
    <div className="nxa-project-maintenance">
      <span aria-hidden="true">🛠️</span>
      <span>
        <strong>{copy.maintenance.title}</strong>
        <p>{copy.maintenance.body}</p>
      </span>
    </div>
  );
}

function ReviewSection({
  title,
  edit,
  onEdit,
  accent = false,
  children,
}: {
  title: string;
  edit: string;
  onEdit: () => void;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="nxa-project-review-section" data-accent={accent}>
      <header>
        <h3>{title}</h3>
        <button type="button" onClick={onEdit}>
          <Pencil /> {edit}
        </button>
      </header>
      {children}
    </section>
  );
}

function ReviewGrid({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className="nxa-project-review-grid">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

type SetField = <Key extends keyof ProjectRequestDraft>(
  field: Key,
  value: ProjectRequestDraft[Key],
) => void;
type StepProps = {
  draft: ProjectRequestDraft;
  errors: FieldErrors;
  setField: SetField;
  copy: (typeof projectRequestCopy)["en"];
};

function FormField({
  id,
  label,
  optional,
  required,
  error,
  helper,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  required?: boolean;
  error?: string;
  helper?: string;
  children: ReactNode;
}) {
  return (
    <div className="nxa-project-field">
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
        {optional ? <small>{optional}</small> : null}
      </label>
      <div className="nxa-project-control" data-error={Boolean(error)}>
        {children}
      </div>
      {helper ? (
        <p id={`${id}-help`} className="nxa-project-helper">
          {helper}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="nxa-project-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
