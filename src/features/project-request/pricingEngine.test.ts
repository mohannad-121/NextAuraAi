import assert from "node:assert/strict";
import test from "node:test";
import { calculateEstimate, getRecommendedPackage, getTimelineDetails } from "./pricingEngine.ts";
import type { FeatureId, PackageId, ProjectRequestDraft, TimelineOption } from "./types.ts";

function draft(
  packageId: PackageId,
  selectedFeatureIds: FeatureId[],
  timelineOption: TimelineOption,
): ProjectRequestDraft {
  return {
    fullName: "Test customer",
    phone: "+962799999999",
    email: "",
    businessName: "",
    projectType: packageId === "complete" ? "webApplication" : "businessWebsite",
    projectIdea: "A sufficiently clear project idea for pricing tests.",
    packageId,
    selectedFeatureIds,
    customFeature: "",
    languageCount: selectedFeatureIds.includes("multilingual") ? 3 : 1,
    timelineOption,
    requestedDate: "",
    contactMethod: "whatsapp",
    notes: "",
    currency: "JOD",
  };
}

function estimateFor(input: ProjectRequestDraft) {
  const timeline = getTimelineDetails(input.timelineOption, input.requestedDate);
  assert.ok(timeline);
  return calculateEstimate(input, timeline);
}

function assertWithin(value: ReturnType<typeof estimateFor>, min: number, max: number) {
  assert.ok(value.estimatedMinJod >= min, `${value.estimatedMinJod} should be >= ${min}`);
  assert.ok(value.estimatedMaxJod <= max, `${value.estimatedMaxJod} should be <= ${max}`);
  assert.ok(value.estimatedMaxJod > value.estimatedMinJod);
}

test("Case 1: a simple Basic project stays near the lower normal range", () => {
  const estimate = estimateFor(draft("basic", [], "twoWeeks"));
  assertWithin(estimate, 100, 300);
  assert.ok(estimate.estimatedMaxJod <= 180);
});

test("Case 2: a feature-rich Basic rush request stays inside JOD 130–350", () => {
  const estimate = estimateFor(
    draft("basic", ["cms", "booking", "multilingual", "analytics"], "oneWeek"),
  );
  assertWithin(estimate, 130, 350);
  assert.equal(estimate.isRush, true);
});

test("Case 3: Business with dashboard, languages, booking, and database stays inside JOD 400–650", () => {
  const estimate = estimateFor(
    draft("business", ["adminDashboard", "multilingual", "booking", "database"], "twoWeeks"),
  );
  assertWithin(estimate, 400, 650);
});

test("Case 4: feature-heavy Business rush stays inside JOD 450–700", () => {
  const estimate = estimateFor(
    draft(
      "business",
      ["booking", "multilingual", "authentication", "roles", "analytics", "payments"],
      "oneWeek",
    ),
  );
  assertWithin(estimate, 450, 700);
  assert.equal(estimate.isRush, true);
});

test("Case 5: advanced Complete project stays inside JOD 700–1,400", () => {
  const estimate = estimateFor(
    draft(
      "complete",
      ["aiAssistant", "payments", "roles", "automation", "apiIntegrations"],
      "threeFourWeeks",
    ),
  );
  assertWithin(estimate, 700, 1400);
});

test("Case 6: complex Complete rush stays inside JOD 750–1,500", () => {
  const estimate = estimateFor(
    draft(
      "complete",
      ["aiAssistant", "rag", "automation", "ecommerce", "realtime", "crm", "customReporting"],
      "oneWeek",
    ),
  );
  assertWithin(estimate, 750, 1500);
  assert.equal(estimate.isRush, true);
});

test("Case 7: advanced Basic selections recommend an upgrade without escaping the Basic rush ceiling", () => {
  const selected: FeatureId[] = ["aiAssistant", "payments", "adminDashboard", "roles"];
  const estimate = estimateFor(draft("basic", selected, "oneWeek"));
  assert.equal(getRecommendedPackage("basic", selected), "complete");
  assertWithin(estimate, 130, 350);
});

test("custom dates use rush pricing at seven days and normal pricing at eight days", () => {
  const now = new Date("2026-07-17T12:00:00Z");
  assert.equal(getTimelineDetails("custom", "2026-07-24", now)?.isRush, true);
  assert.equal(getTimelineDetails("custom", "2026-07-25", now)?.isRush, false);
});
