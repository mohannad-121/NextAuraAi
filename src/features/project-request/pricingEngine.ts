import {
  FEATURES,
  PACKAGE_LEVEL,
  PRICE_COMPLEXITY_CAP,
  PROJECT_PACKAGES,
  PROJECT_TYPE_COMPLEXITY,
  getPackage,
} from "./config.ts";
import type {
  EstimateResult,
  FeatureId,
  PackageId,
  ProjectRequestDraft,
  TimelineDetails,
} from "./types.ts";

const DAY_MS = 24 * 60 * 60 * 1000;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const roundToFive = (value: number) => Math.round(value / 5) * 5;

export function getTimelineDetails(
  option: ProjectRequestDraft["timelineOption"],
  requestedDate: string,
  now = new Date(),
): TimelineDetails | null {
  if (!option) return null;
  if (option === "oneWeek") return { option, days: 7, isRush: true };
  if (option !== "custom") return { option, isRush: false };

  const parsedDate = new Date(`${requestedDate}T00:00:00`);
  if (!requestedDate || Number.isNaN(parsedDate.getTime())) return null;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.ceil((parsedDate.getTime() - today.getTime()) / DAY_MS);
  return { option, requestedDate, days, isRush: days <= 7 };
}

export function getEffectiveFeatureIds(
  packageId: PackageId,
  selectedFeatureIds: FeatureId[],
): FeatureId[] {
  return Array.from(new Set([...getPackage(packageId).includedFeatureIds, ...selectedFeatureIds]));
}

export function getRecommendedPackage(
  packageId: PackageId,
  selectedFeatureIds: FeatureId[],
): PackageId | null {
  const selectedLevel = PACKAGE_LEVEL[packageId];
  const requiredLevel = selectedFeatureIds.reduce((highest, featureId) => {
    const feature = FEATURES.find((item) => item.id === featureId);
    return feature ? Math.max(highest, PACKAGE_LEVEL[feature.minimumPackage]) : highest;
  }, selectedLevel);

  if (requiredLevel <= selectedLevel) return null;
  return PROJECT_PACKAGES.find((item) => PACKAGE_LEVEL[item.id] === requiredLevel)?.id ?? null;
}

export function calculateEstimate(
  draft: ProjectRequestDraft,
  timeline: TimelineDetails,
): EstimateResult {
  const packageId = draft.packageId || "basic";
  const projectPackage = getPackage(packageId);
  const pricing = timeline.isRush ? projectPackage.pricing.rush : projectPackage.pricing.normal;
  const selectedFeatures = draft.selectedFeatureIds
    .map((featureId) => FEATURES.find((item) => item.id === featureId))
    .filter((feature): feature is NonNullable<typeof feature> => Boolean(feature));
  const featureScore = selectedFeatures.reduce((total, feature) => total + feature.weight, 0);
  const languageScore = getEffectiveFeatureIds(packageId, draft.selectedFeatureIds).includes(
    "multilingual",
  )
    ? Math.max(0, draft.languageCount - 1) * 2
    : 0;
  const customScore = draft.customFeature.trim()
    ? clamp(3 + Math.ceil(draft.customFeature.trim().length / 80) * 2, 3, 11)
    : 0;
  const projectTypeScore = draft.projectType ? PROJECT_TYPE_COMPLEXITY[draft.projectType] : 0;
  const complexityScore = featureScore + languageScore + customScore + projectTypeScore;
  const normalized = clamp(complexityScore / PRICE_COMPLEXITY_CAP[packageId], 0, 1);
  const complexityPosition = 0.14 + normalized * 0.74;
  const spread = pricing.max - pricing.min;
  const windowSize = Math.max(40, spread * (customScore >= 7 ? 0.26 : 0.22));
  const center = pricing.min + spread * complexityPosition;

  let estimatedMinJod = roundToFive(clamp(center - windowSize / 2, pricing.min, pricing.max));
  let estimatedMaxJod = roundToFive(clamp(center + windowSize / 2, pricing.min, pricing.max));

  estimatedMinJod = Math.max(pricing.min, estimatedMinJod);
  estimatedMaxJod = Math.min(pricing.max, estimatedMaxJod);
  if (estimatedMaxJod <= estimatedMinJod) {
    estimatedMaxJod = Math.min(pricing.max, estimatedMinJod + 25);
  }

  const impactingFeatureIds = selectedFeatures
    .slice()
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 6)
    .map((feature) => feature.id);

  return {
    packageId,
    isRush: timeline.isRush,
    allowedMinJod: pricing.min,
    allowedMaxJod: pricing.max,
    estimatedMinJod,
    estimatedMaxJod,
    complexityScore,
    complexityPosition,
    impactingFeatureIds,
  };
}

export function preserveFeatureSelections(
  previousPackageId: PackageId | "",
  nextPackageId: PackageId,
  selectedFeatureIds: FeatureId[],
): FeatureId[] {
  const previousIncluded = previousPackageId
    ? getPackage(previousPackageId).includedFeatureIds
    : [];
  const effective = new Set<FeatureId>([...previousIncluded, ...selectedFeatureIds]);
  const nextIncluded = new Set(getPackage(nextPackageId).includedFeatureIds);
  return Array.from(effective).filter((featureId) => !nextIncluded.has(featureId));
}
