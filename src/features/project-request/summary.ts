import type { Language } from "@/i18n/translations";
import { getFeature, getPackage, PROJECT_TYPE_OPTIONS, TIMELINE_OPTIONS } from "./config";
import type { FeatureCategory, FeatureId, PersistedProjectRequest } from "./types";

export type ProjectRequestSummary = {
  request: PersistedProjectRequest;
  packageTitle: string;
  projectTypeTitle: string;
  timelineTitle: string;
  includedFeatureNames: string[];
  selectedFeatureNames: string[];
  selectedFeaturesByCategory: Partial<Record<FeatureCategory, string[]>>;
};

const unique = <Value>(values: Value[]) => [...new Set(values)];

/** Shared normalized request presentation for the PDF and WhatsApp summary. */
export function createProjectRequestSummary(
  request: PersistedProjectRequest,
  language: Language,
): ProjectRequestSummary {
  const featureDetails = (ids: FeatureId[]) =>
    unique(ids)
      .map((id) => getFeature(id))
      .filter((feature): feature is NonNullable<typeof feature> => Boolean(feature));
  const includedFeatures = featureDetails(request.includedFeatureIds);
  const includedIds = new Set(includedFeatures.map((feature) => feature.id));
  const selectedFeatures = featureDetails(request.selectedFeatureIds).filter(
    (feature) => !includedIds.has(feature.id),
  );
  const selectedFeaturesByCategory = selectedFeatures.reduce<
    Partial<Record<FeatureCategory, string[]>>
  >((groups, feature) => {
    groups[feature.category] = [...(groups[feature.category] ?? []), feature.title[language]];
    return groups;
  }, {});
  const projectType = PROJECT_TYPE_OPTIONS.find((item) => item.id === request.projectType);
  const timeline = TIMELINE_OPTIONS.find((item) => item.id === request.timeline.option);

  return {
    request,
    packageTitle: getPackage(request.packageId).title[language],
    projectTypeTitle: projectType?.label[language] ?? request.projectType,
    timelineTitle:
      request.timeline.requestedDate ?? timeline?.label[language] ?? request.timeline.option,
    includedFeatureNames: includedFeatures.map((feature) => feature.title[language]),
    selectedFeatureNames: selectedFeatures.map((feature) => feature.title[language]),
    selectedFeaturesByCategory,
  };
}
