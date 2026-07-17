import type { Language } from "@/i18n/translations";
import { getFeature, getPackage } from "./config";
import type {
  EstimateResult,
  ExchangeRateSnapshot,
  ProjectRequest,
  ProjectRequestDraft,
  TimelineDetails,
} from "./types";

type NormalizeProjectRequestInput = {
  draft: ProjectRequestDraft;
  language: Language;
  timeline: TimelineDetails;
  estimate: EstimateResult;
  converted: { min: number; max: number; rate: number } | null;
  rates: ExchangeRateSnapshot | null;
  explanation: string;
};

const optionalText = (value: string) => {
  const trimmed = value.trim();
  return trimmed || undefined;
};

const uniqueNames = (ids: ProjectRequestDraft["selectedFeatureIds"], language: Language) =>
  [...new Set(ids)]
    .map((id) => getFeature(id)?.title[language])
    .filter((value): value is string => Boolean(value?.trim()));

/**
 * The one complete representation of a submitted Start Project request.
 * It is used for persistence, then augmented with the confirmed database ID for PDF and WhatsApp.
 */
export function normalizeProjectRequest({
  draft,
  language,
  timeline,
  estimate,
  converted,
  rates,
  explanation,
}: NormalizeProjectRequestInput): ProjectRequest | null {
  if (!draft.packageId || !draft.projectType) return null;
  const projectPackage = getPackage(draft.packageId);
  const includedFeatureIds = [...new Set(projectPackage.includedFeatureIds)];

  return {
    locale: language,
    customer: {
      fullName: draft.fullName.trim(),
      phone: draft.phone.trim(),
      email: optionalText(draft.email),
      businessName: optionalText(draft.businessName),
    },
    projectType: draft.projectType,
    projectIdea: draft.projectIdea.trim(),
    packageId: draft.packageId,
    includedFeatureIds,
    selectedFeatureIds: [...new Set(draft.selectedFeatureIds)],
    includedFeatures: uniqueNames(includedFeatureIds, language),
    selectedFeatures: uniqueNames(draft.selectedFeatureIds, language),
    customFeature: optionalText(draft.customFeature),
    languageCount: draft.languageCount,
    timeline,
    contactMethod: draft.contactMethod || undefined,
    notes: optionalText(draft.notes),
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
}
