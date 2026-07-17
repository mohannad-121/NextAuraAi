import { getSupabaseClient, getSupabaseProjectHostname, logSupabaseError } from "@/lib/supabase";
import type { ProjectRequest, ProjectRequestRecord } from "./types";

type SubmitProjectRequestRpcResponse = {
  id: string | number;
  request_id: string;
  created_at: string;
};

export type SavedProjectRequest = {
  id: string;
  requestId: string;
  createdAt: string;
};

export class ProjectRequestPersistenceError extends Error {
  constructor(
    message: string,
    readonly code?: string,
  ) {
    super(message);
    this.name = "ProjectRequestPersistenceError";
  }
}

const PROJECT_REQUEST_RPC = "submit_project_request";

function nullableText(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function requestedDate(value: string | undefined) {
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}

type RequestPersistenceDiagnostics = {
  hasProjectIdea: boolean;
  projectIdeaLength: number;
  additionalNotesLength: number;
  includedFeaturesCount: number;
  selectedFeaturesCount: number;
  customFeatureLength: number;
};

function getPersistenceDiagnostics(request: ProjectRequest): RequestPersistenceDiagnostics {
  return {
    hasProjectIdea: Boolean(request.projectIdea.trim()),
    projectIdeaLength: request.projectIdea.length,
    additionalNotesLength: request.notes?.length ?? 0,
    includedFeaturesCount: request.includedFeatures.length,
    selectedFeaturesCount: request.selectedFeatures.length,
    customFeatureLength: request.customFeature?.length ?? 0,
  };
}

/** Stops a submission instead of silently creating a row with known lost form data. */
function assertRequestReadyForPersistence(request: ProjectRequest) {
  const problems: string[] = [];
  if (!request.projectIdea.trim()) problems.push("project idea");
  if (request.includedFeatureIds.length > 0 && request.includedFeatures.length === 0) {
    problems.push("package-included features");
  }
  if (request.selectedFeatureIds.length > 0 && request.selectedFeatures.length === 0) {
    problems.push("selected features");
  }
  if (problems.length) {
    throw new ProjectRequestPersistenceError(
      `Project request mapping failed for: ${problems.join(", ")}`,
      "PROJECT_REQUEST_MAPPING_INVALID",
    );
  }
}

/** Maps the form model once, immediately before calling the controlled RPC. */
export function mapProjectRequestToRpcPayload(request: ProjectRequest) {
  const payload: Omit<
    ProjectRequestRecord,
    "id" | "request_id" | "maintenance_months" | "status" | "source_page" | "created_at"
  > = {
    full_name: request.customer.fullName.trim(),
    phone: request.customer.phone.trim(),
    email: nullableText(request.customer.email),
    business_name: nullableText(request.customer.businessName),
    project_type: request.projectType,
    project_idea: nullableText(request.projectIdea),
    package_id: request.packageId,
    included_features: request.includedFeatures,
    selected_features: request.selectedFeatures,
    custom_features: nullableText(request.customFeature),
    language_count: request.languageCount,
    timeline_option: request.timeline.option,
    requested_date: requestedDate(request.timeline.requestedDate),
    is_rush: request.timeline.isRush,
    contact_method: nullableText(request.contactMethod),
    notes: nullableText(request.notes),
    estimated_min_jod: request.estimate.estimatedMinJod,
    estimated_max_jod: request.estimate.estimatedMaxJod,
    selected_currency: request.estimate.selectedCurrency,
    converted_min: request.estimate.convertedMin ?? null,
    converted_max: request.estimate.convertedMax ?? null,
    estimate_explanation: request.estimate.explanation,
  };

  return {
    p_full_name: payload.full_name,
    p_phone: payload.phone,
    p_email: payload.email,
    p_business_name: payload.business_name,
    p_project_type: payload.project_type,
    p_project_idea: payload.project_idea,
    p_package_id: payload.package_id,
    p_included_features: payload.included_features,
    p_selected_features: payload.selected_features,
    p_custom_features: payload.custom_features,
    p_language_count: payload.language_count,
    p_timeline_option: payload.timeline_option,
    p_requested_date: payload.requested_date,
    p_is_rush: payload.is_rush,
    p_contact_method: payload.contact_method,
    p_notes: payload.notes,
    p_estimated_min_jod: payload.estimated_min_jod,
    p_estimated_max_jod: payload.estimated_max_jod,
    p_selected_currency: payload.selected_currency,
    p_converted_min: payload.converted_min,
    p_converted_max: payload.converted_max,
    p_estimate_explanation: payload.estimate_explanation,
  };
}

export async function submitProjectRequest(request: ProjectRequest): Promise<SavedProjectRequest> {
  const client = getSupabaseClient();
  const projectHost = getSupabaseProjectHostname();
  if (!client) {
    throw new ProjectRequestPersistenceError(
      "Supabase is not configured",
      "SUPABASE_CONFIG_MISSING",
    );
  }

  assertRequestReadyForPersistence(request);
  const rpcPayload = mapProjectRequestToRpcPayload(request);
  const payloadFields = Object.keys(rpcPayload);

  if (import.meta.env.DEV) {
    console.info("[project-request] Calling Supabase RPC", {
      projectHost,
      rpcName: PROJECT_REQUEST_RPC,
      payloadFields,
      ...getPersistenceDiagnostics(request),
    });
  }

  const { data, error } = await client.rpc(PROJECT_REQUEST_RPC, rpcPayload);
  const result = Array.isArray(data)
    ? (data[0] as SubmitProjectRequestRpcResponse | undefined)
    : undefined;

  if (error) {
    logSupabaseError("project-request RPC failed", error);
    if (import.meta.env.DEV) {
      console.error("[project-request] RPC diagnostics", {
        rpcName: PROJECT_REQUEST_RPC,
        payloadFields,
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
    }
    throw new ProjectRequestPersistenceError(error.message, error.code);
  }

  if (!result?.id || !result.request_id || !result.created_at) {
    if (import.meta.env.DEV) {
      console.error("[project-request] Supabase RPC returned an invalid response", { projectHost });
    }
    throw new ProjectRequestPersistenceError(
      "Supabase did not return a saved request",
      "RPC_RESPONSE_INVALID",
    );
  }

  if (import.meta.env.DEV) {
    console.info("[project-request] Supabase RPC persisted request", {
      projectHost,
      requestId: result.request_id,
    });
  }

  return {
    id: String(result.id),
    requestId: result.request_id,
    createdAt: result.created_at,
  };
}

/**
 * Development-only connection check. It deliberately creates one clearly labelled
 * dummy request so the RPC, anon grant, and returned fields can be verified end-to-end.
 */
export async function runProjectRequestConnectionTest(): Promise<SavedProjectRequest> {
  if (!import.meta.env.DEV) {
    throw new Error("Project request connection tests are available only in development.");
  }

  return submitProjectRequest({
    locale: "en",
    customer: {
      fullName: "NextAura RPC test",
      phone: "+962000000000",
      email: "rpc-test@example.invalid",
      businessName: "NextAura test",
    },
    projectType: "businessWebsite",
    projectIdea: "Development-only RPC connection test. Safe to delete after verification.",
    packageId: "basic",
    includedFeatureIds: ["responsiveDesign"],
    selectedFeatureIds: ["responsiveDesign"],
    includedFeatures: ["Responsive design"],
    selectedFeatures: ["Responsive design"],
    languageCount: 1,
    timeline: { option: "flexible", isRush: false },
    estimate: {
      packageId: "basic",
      isRush: false,
      allowedMinJod: 100,
      allowedMaxJod: 300,
      estimatedMinJod: 100,
      estimatedMaxJod: 300,
      complexityScore: 1,
      complexityPosition: 0,
      impactingFeatureIds: [],
      currencyBase: "JOD",
      selectedCurrency: "JOD",
      approximateConversion: false,
      explanation: "Development-only RPC connection test.",
    },
    maintenance: { freeMonths: 8 },
    submittedAt: new Date().toISOString(),
  });
}

declare global {
  interface Window {
    nextAuraProjectRequestTest?: () => Promise<SavedProjectRequest>;
  }
}

if (import.meta.env.DEV && typeof window !== "undefined") {
  window.nextAuraProjectRequestTest = runProjectRequestConnectionTest;
}
