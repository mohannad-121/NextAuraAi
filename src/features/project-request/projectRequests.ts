import { getSupabaseClient, getSupabaseProjectHostname } from "@/lib/supabase";
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

function nullableText(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function requestedDate(value: string | undefined) {
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
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
    package_id: request.packageId,
    selected_features: [...new Set(request.selectedFeatureIds)],
    custom_features: nullableText(request.customFeature),
    timeline_option: request.timeline.option,
    requested_date: requestedDate(request.timeline.requestedDate),
    is_rush: request.timeline.isRush,
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
    p_package_id: payload.package_id,
    p_selected_features: payload.selected_features,
    p_custom_features: payload.custom_features,
    p_timeline_option: payload.timeline_option,
    p_requested_date: payload.requested_date,
    p_is_rush: payload.is_rush,
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

  if (import.meta.env.DEV) {
    console.info("[project-request] Calling Supabase RPC", { projectHost });
  }

  const { data, error } = await client.rpc(
    "submit_project_request",
    mapProjectRequestToRpcPayload(request),
  );
  const result = Array.isArray(data)
    ? (data[0] as SubmitProjectRequestRpcResponse | undefined)
    : undefined;

  if (error) {
    if (import.meta.env.DEV) {
      console.error("[project-request] Supabase RPC failed", {
        projectHost,
        code: error.code,
        message: error.message,
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
