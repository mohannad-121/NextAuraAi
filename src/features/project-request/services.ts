import type { Language } from "@/i18n/translations";
import { FALLBACK_EXCHANGE_RATES, FALLBACK_RATE_METADATA, getFeature, getPackage } from "./config";
import { projectRequestCopy } from "./copy";
import type {
  CurrencyCode,
  EstimateResult,
  ExchangeRateSnapshot,
  ProjectRequestDraft,
  PersistedProjectRequest,
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

export function buildWhatsAppUrl(
  request: PersistedProjectRequest,
  language: Language,
  options: { hasPdf: boolean } = { hasPdf: true },
) {
  const copy = projectRequestCopy[language];
  const projectPackage = getPackage(request.packageId);
  const timelineLabel = request.timeline.requestedDate ?? request.timeline.option;
  const selectedFeatures = request.selectedFeatureIds
    .map((featureId) => getFeature(featureId)?.title[language])
    .filter((title): title is string => Boolean(title));
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
    `${copy.summary.features}: ${selectedFeatures.join(", ") || copy.review.notProvided}`,
    "Eight months free maintenance included.",
  ];
  if (options.hasPdf) {
    lines.push("PDF generated. Please attach the downloaded project-request PDF to this message.");
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
