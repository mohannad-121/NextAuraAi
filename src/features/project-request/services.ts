import type { Language } from "@/i18n/translations";
import { FALLBACK_EXCHANGE_RATES, FALLBACK_RATE_METADATA, getFeature, getPackage } from "./config";
import { projectRequestCopy } from "./copy";
import { createProjectRequestSummary } from "./summary";
import type {
  CurrencyCode,
  EstimateResult,
  ExchangeRateSnapshot,
  ProjectRequestDraft,
  PersistedProjectRequest,
  TimelineDetails,
} from "./types";

const WHATSAPP_NUMBER = "962799195498";
export const WHATSAPP_URL_SAFE_LENGTH = 7600;

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
  return buildWhatsAppMessage(request, language, options).url;
}

export function buildWhatsAppConversationUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}`;
}

export function buildWhatsAppMessage(
  request: PersistedProjectRequest,
  language: Language,
  options: { hasPdf: boolean } = { hasPdf: true },
) {
  const copy = projectRequestCopy[language];
  const labels =
    language === "ar"
      ? {
          title: "🚀 طلب مشروع جديد — NEXTAURA AI",
          request: "معلومات الطلب",
          customer: "بيانات العميل",
          overview: "نظرة عامة على المشروع",
          included: "الميزات المشمولة",
          selected: "الميزات الإضافية",
          custom: "المتطلب المخصص",
          timeline: "المدة الزمنية",
          estimate: "السعر التقديري",
          explanation: "شرح التقدير",
          notes: "ملاحظات إضافية",
          maintenance: "الصيانة",
          disclaimer: "تنبيه التقدير",
          pdf: "تم إنشاء ملخص PDF تفصيلي أيضاً.",
        }
      : language === "es"
        ? {
            title: "🚀 NUEVA SOLICITUD DE PROYECTO — NEXTAURA AI",
            request: "INFORMACIÓN DE LA SOLICITUD",
            customer: "DATOS DEL CLIENTE",
            overview: "RESUMEN DEL PROYECTO",
            included: "FUNCIONES INCLUIDAS",
            selected: "FUNCIONES ADICIONALES",
            custom: "REQUISITO PERSONALIZADO",
            timeline: "PLAZO",
            estimate: "PRECIO ESTIMADO",
            explanation: "EXPLICACIÓN DE LA ESTIMACIÓN",
            notes: "NOTAS ADICIONALES",
            maintenance: "MANTENIMIENTO",
            disclaimer: "AVISO DE ESTIMACIÓN",
            pdf: "También se ha generado un resumen detallado en PDF.",
          }
        : {
            title: "🚀 NEW PROJECT REQUEST — NEXTAURA AI",
            request: "REQUEST INFORMATION",
            customer: "CUSTOMER DETAILS",
            overview: "PROJECT OVERVIEW",
            included: "PACKAGE-INCLUDED FEATURES",
            selected: "ADDITIONAL SELECTED FEATURES",
            custom: "CUSTOM REQUIREMENT",
            timeline: "TIMELINE",
            estimate: "ESTIMATED PRICE",
            explanation: "ESTIMATE EXPLANATION",
            notes: "ADDITIONAL NOTES",
            maintenance: "MAINTENANCE",
            disclaimer: "ESTIMATE DISCLAIMER",
            pdf: "A detailed PDF summary has also been generated.",
          };
  const categoryTitle: Record<string, string> =
    language === "ar"
      ? {
          intelligence: "ميزات الذكاء الاصطناعي والأتمتة",
          commerce: "التكاملات والتجارة",
          business: "ميزات الأعمال",
          essentials: "الأساسيات",
        }
      : language === "es"
        ? {
            intelligence: "IA y automatización",
            commerce: "Integraciones y comercio",
            business: "Funciones de negocio",
            essentials: "Elementos esenciales",
          }
        : {
            intelligence: "AI & AUTOMATION",
            commerce: "INTEGRATIONS & COMMERCE",
            business: "BUSINESS FEATURES",
            essentials: "ESSENTIALS",
          };
  const summary = createProjectRequestSummary(request, language);
  const list = (items: string[]) => items.map((item) => `• ${item}`);
  const section = (title: string, values: Array<string | undefined>) => {
    const populated = values.filter((value): value is string => Boolean(value?.trim()));
    return populated.length ? [title, ...populated, ""] : [];
  };
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
  const submittedAt = new Intl.DateTimeFormat(
    language === "ar" ? "ar-JO" : language === "es" ? "es-ES" : "en-GB",
    { dateStyle: "medium", timeStyle: "short" },
  ).format(new Date(request.createdAt || request.submittedAt));
  const fullMessage = [
    labels.title,
    "",
    ...section(`🆔 ${labels.request}`, [
      `${copy.success.requestId}: ${request.id}`,
      `${copy.review.submittedAt}: ${submittedAt}`,
    ]),
    ...section(`👤 ${labels.customer}`, [
      `${copy.review.fullName}: ${request.customer.fullName}`,
      request.customer.businessName
        ? `${copy.review.businessName}: ${request.customer.businessName}`
        : undefined,
      `${copy.review.phone}: ${request.customer.phone}`,
      request.customer.email ? `${copy.review.email}: ${request.customer.email}` : undefined,
      request.contactMethod
        ? `${copy.review.contactMethod}: ${copy.timeline.contactOptions[request.contactMethod]}`
        : undefined,
    ]),
    ...section(`🌐 ${labels.overview}`, [
      `${copy.review.projectType}: ${summary.projectTypeTitle}`,
      `${copy.review.package}: ${summary.packageTitle}`,
      `${copy.review.projectIdea}:\n${request.projectIdea}`,
      `${copy.review.languages}: ${request.languageCount}`,
    ]),
    ...section(`✨ ${labels.included}`, list(summary.includedFeatureNames)),
    ...Object.entries(summary.selectedFeaturesByCategory).flatMap(([category, features]) =>
      section(`🧩 ${categoryTitle[category]}`, list(features ?? [])),
    ),
    ...section(`🧩 ${labels.custom}`, request.customFeature ? [request.customFeature] : []),
    ...section(`⏱️ ${labels.timeline}`, [
      `${copy.review.requestedTimeline}: ${summary.timelineTitle}`,
      `${copy.review.deliveryMode}: ${request.timeline.isRush ? copy.review.rush : copy.review.normal}`,
      request.timeline.days ? `${request.timeline.days} days` : undefined,
    ]),
    ...section(`💰 ${labels.estimate}`, [
      `${copy.review.originalEstimate}: ${formatMoneyRange(request.estimate.estimatedMinJod, request.estimate.estimatedMaxJod, "JOD", language)}`,
      `${copy.review.convertedEstimate}: ${converted}`,
      `${copy.estimate.currency}: ${request.estimate.selectedCurrency}`,
    ]),
    ...section(`🤖 ${labels.explanation}`, [request.estimate.explanation]),
    ...section(`📝 ${labels.notes}`, request.notes ? [request.notes] : []),
    ...section(`🛠️ ${labels.maintenance}`, [copy.maintenance.title, copy.maintenance.body]),
    ...section(`⚠️ ${labels.disclaimer}`, [copy.disclaimer]),
    ...(options.hasPdf ? ["📎 PDF", labels.pdf] : []),
  ]
    .join("\n")
    .trim();

  const encodedMessage = encodeURIComponent(fullMessage);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  return { message: fullMessage, url, urlLength: url.length };
}
