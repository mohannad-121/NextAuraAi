import type { Language } from "@/i18n/translations";
import { FALLBACK_EXCHANGE_RATES, FALLBACK_RATE_METADATA, getFeature, getPackage } from "./config";
import { projectRequestCopy } from "./copy";
import type {
  CurrencyCode,
  EstimateResult,
  ExchangeRateSnapshot,
  ProjectRequest,
  ProjectRequestDraft,
  TimelineDetails,
} from "./types";

const WHATSAPP_NUMBER = "962799195498";

export function formatMoney(value: number, currency: CurrencyCode, language: Language) {
  return new Intl.NumberFormat(
    language === "ar" ? "ar-JO" : language === "es" ? "es-ES" : "en-JO",
    {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: currency === "JOD" || currency === "OMR" ? 3 : 2,
    },
  ).format(value);
}

export function formatMoneyRange(
  min: number,
  max: number,
  currency: CurrencyCode,
  language: Language,
) {
  return `${formatMoney(min, currency, language)} – ${formatMoney(max, currency, language)}`;
}

export function convertEstimate(
  estimate: EstimateResult,
  currency: CurrencyCode,
  rates: ExchangeRateSnapshot | null,
) {
  if (currency === "JOD") {
    return { min: estimate.estimatedMinJod, max: estimate.estimatedMaxJod, rate: 1 };
  }
  const rate = rates?.rates[currency];
  if (!rate || !Number.isFinite(rate)) return null;
  return {
    min: estimate.estimatedMinJod * rate,
    max: estimate.estimatedMaxJod * rate,
    rate,
  };
}

export async function loadExchangeRates(): Promise<ExchangeRateSnapshot> {
  try {
    const response = await fetch("/api/exchange-rates", {
      headers: { accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) throw new Error("RATE_REQUEST_FAILED");
    const data = (await response.json()) as ExchangeRateSnapshot;
    if (data.base !== "JOD" || !data.rates?.JOD) throw new Error("INVALID_RATE_RESPONSE");
    return data;
  } catch {
    return {
      base: "JOD",
      rates: FALLBACK_EXCHANGE_RATES,
      source: FALLBACK_RATE_METADATA.source,
      timestamp: FALLBACK_RATE_METADATA.timestamp,
      approximate: true,
    };
  }
}

export function buildEstimateExplanation(
  draft: ProjectRequestDraft,
  estimate: EstimateResult,
  timeline: TimelineDetails,
  language: Language,
) {
  const packageTitle = getPackage(estimate.packageId).title[language];
  const featureNames = estimate.impactingFeatureIds
    .map((featureId) => getFeature(featureId)?.title[language])
    .filter((title): title is string => Boolean(title));
  const customMention = draft.customFeature.trim()
    ? language === "ar"
      ? "ومتطلبك المخصص"
      : language === "es"
        ? "y tu requisito personalizado"
        : "and your custom requirement"
    : "";
  const rushMention = timeline.isRush
    ? language === "ar"
      ? "مع تطبيق نطاق التسليم المستعجل"
      : language === "es"
        ? "con el rango de entrega urgente"
        : "with the rush-delivery range applied"
    : language === "ar"
      ? "ضمن نطاق التسليم الطبيعي"
      : language === "es"
        ? "dentro del rango de entrega normal"
        : "within the normal delivery range";

  if (language === "ar") {
    return `يعكس هذا التقدير باقة ${packageTitle}${featureNames.length ? ` والميزات المؤثرة: ${featureNames.join("، ")}` : ""} ${customMention}، ${rushMention}.`;
  }
  if (language === "es") {
    return `Esta estimación refleja el paquete ${packageTitle}${featureNames.length ? ` y las funciones principales: ${featureNames.join(", ")}` : ""} ${customMention}, ${rushMention}.`;
  }
  return `This estimate reflects the ${packageTitle} package${featureNames.length ? ` and the main complexity factors: ${featureNames.join(", ")}` : ""} ${customMention}, ${rushMention}.`;
}

export function createRequestId(now = new Date()) {
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  const random = Array.from(crypto.getRandomValues(new Uint8Array(4)))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  return `NXA-${date}-${random}`;
}

export function buildWhatsAppUrl(request: ProjectRequest, language: Language) {
  const copy = projectRequestCopy[language];
  const projectPackage = getPackage(request.packageId);
  const timelineLabel = request.timeline.requestedDate ?? request.timeline.option;
  const converted =
    request.estimate.convertedMin != null && request.estimate.convertedMax != null
      ? formatMoneyRange(
          request.estimate.convertedMin,
          request.estimate.convertedMax,
          request.estimate.selectedCurrency,
          language,
        )
      : formatMoneyRange(
          request.estimate.estimatedMinJod,
          request.estimate.estimatedMaxJod,
          "JOD",
          language,
        );
  const lines = [
    "New project request — NextAura AI",
    `${copy.success.requestId}: ${request.id}`,
    `${copy.review.fullName}: ${request.customer.fullName}`,
    `${copy.review.package}: ${projectPackage.title[language]}`,
    `${copy.review.originalEstimate}: ${formatMoneyRange(request.estimate.estimatedMinJod, request.estimate.estimatedMaxJod, "JOD", language)}`,
    `${copy.review.convertedEstimate}: ${converted}`,
    `${copy.review.requestedTimeline}: ${timelineLabel}`,
    "PDF generated. Please attach the downloaded project-request PDF to this message.",
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export type SubmissionResult = {
  success: boolean;
  stored: boolean;
  pdfStored: boolean;
  whatsappDelivered: boolean;
  manualFallback: boolean;
  requestId: string;
  error?: string;
};

export async function submitProjectRequest(
  request: ProjectRequest,
  pdfBlob: Blob,
): Promise<SubmissionResult> {
  const pdfBase64 = await blobToBase64(pdfBlob);
  const response = await fetch("/api/project-requests", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ request, pdfBase64 }),
    keepalive: false,
  });
  const payload = (await response.json().catch(() => null)) as SubmissionResult | null;
  if (!response.ok || !payload) {
    return {
      success: false,
      stored: false,
      pdfStored: false,
      whatsappDelivered: false,
      manualFallback: true,
      requestId: request.id,
      error: payload?.error ?? "SUBMISSION_FAILED",
    };
  }
  return payload;
}

async function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result ?? "");
      resolve(value.split(",", 2)[1] ?? "");
    };
    reader.onerror = () => reject(reader.error ?? new Error("PDF_ENCODING_FAILED"));
    reader.readAsDataURL(blob);
  });
}
