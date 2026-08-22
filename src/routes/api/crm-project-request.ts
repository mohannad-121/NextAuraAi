import process from "node:process";
import { createClient } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";

const MAX_BODY_BYTES = 24 * 1024;
const MAX_ATTEMPTS = 6;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, number[]>();

type WebsiteLead = {
  sourceRequestId: string;
  request: {
    locale: "en" | "ar" | "es";
    customer: { fullName: string; phone: string; email?: string; businessName?: string };
    projectType: string;
    projectIdea: string;
    packageId: string;
    includedFeatures: string[];
    selectedFeatures: string[];
    customFeature?: string;
    languageCount: number;
    timeline: { option: string; requestedDate?: string; isRush: boolean };
    contactMethod?: string;
    notes?: string;
    estimate: {
      estimatedMinJod: number;
      estimatedMaxJod: number;
      selectedCurrency: string;
      convertedMin?: number;
      convertedMax?: number;
      explanation: string;
    };
  };
};

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) {
    attempts.set(key, recent);
    return true;
  }
  attempts.set(key, [...recent, now]);
  return false;
}

function validText(value: unknown, min: number, max: number) {
  return typeof value === "string" && value.trim().length >= min && value.trim().length <= max;
}

function isWebsiteLead(value: unknown): value is WebsiteLead {
  if (!value || typeof value !== "object") return false;
  const lead = value as Partial<WebsiteLead>;
  const request = lead.request;
  return Boolean(
    validText(lead.sourceRequestId, 6, 100) &&
    request &&
    validText(request.customer?.fullName, 2, 160) &&
    validText(request.customer?.phone, 7, 40) &&
    validText(request.projectType, 2, 80) &&
    validText(request.projectIdea, 20, 12_000) &&
    validText(request.packageId, 2, 80) &&
    Array.isArray(request.includedFeatures) &&
    Array.isArray(request.selectedFeatures),
  );
}

function clean(value: string | undefined, max: number) {
  const text = value
    ? Array.from(value)
        .map((character) => {
          const code = character.charCodeAt(0);
          return code >= 32 && code !== 127 ? character : " ";
        })
        .join("")
        .trim()
    : "";
  return text ? text.slice(0, max) : null;
}

function buildDescription(lead: WebsiteLead) {
  const { request } = lead;
  const features = [...request.includedFeatures, ...request.selectedFeatures]
    .map((item) => clean(item, 160))
    .filter(Boolean)
    .join(", ");
  const lines = [
    request.projectIdea.trim(),
    features && `Requested features: ${features}`,
    clean(request.customFeature, 1_500) &&
      `Custom requirement: ${clean(request.customFeature, 1_500)}`,
    `Package: ${request.packageId}`,
    `Timeline: ${request.timeline.option}${request.timeline.requestedDate ? ` (${request.timeline.requestedDate})` : ""}`,
    `Languages: ${request.languageCount}`,
  ].filter(Boolean);
  return lines.join("\n\n").slice(0, 20_000);
}

function buildInternalNotes(lead: WebsiteLead) {
  const { request } = lead;
  const estimate = `${request.estimate.estimatedMinJod}–${request.estimate.estimatedMaxJod} JOD`;
  return [
    `Website lead ID: ${lead.sourceRequestId}`,
    `Preferred contact: ${request.contactMethod ?? "not specified"}`,
    `Website estimate: ${estimate}`,
    clean(request.estimate.explanation, 4_000) &&
      `Estimate notes: ${clean(request.estimate.explanation, 4_000)}`,
    clean(request.notes, 4_000) && `Visitor notes: ${clean(request.notes, 4_000)}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

export const Route = createFileRoute("/api/crm-project-request")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const contentLength = Number(request.headers.get("content-length") ?? 0);
        if (contentLength > MAX_BODY_BYTES) return json({ error: "Request is too large." }, 413);
        if (!request.headers.get("content-type")?.includes("application/json")) {
          return json({ error: "Expected JSON." }, 415);
        }
        if (rateLimited(clientKey(request))) {
          return json({ error: "Too many project submissions. Please try again later." }, 429);
        }

        let lead: unknown;
        try {
          lead = await request.json();
        } catch {
          return json({ error: "Invalid request body." }, 400);
        }
        if (!isWebsiteLead(lead)) return json({ error: "Invalid project request." }, 400);

        const crmUrl = process.env.CRM_SUPABASE_URL?.trim();
        const serviceRoleKey = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY?.trim();
        if (!crmUrl || !serviceRoleKey) {
          console.error("[crm-project-request] CRM Supabase environment is not configured.");
          return json({ error: "Project intake is temporarily unavailable." }, 503);
        }

        const crm = createClient(crmUrl, serviceRoleKey, {
          auth: { autoRefreshToken: false, persistSession: false },
        });
        const marker = `Website lead ID: ${lead.sourceRequestId}`;
        const { data: existing, error: existingError } = await crm
          .from("client_requests")
          .select("id,request_number")
          .ilike("internal_notes", `%${marker}%`)
          .limit(1)
          .maybeSingle();
        if (existingError) {
          console.error("[crm-project-request] CRM duplicate check failed", existingError.message);
          return json({ error: "Project intake is temporarily unavailable." }, 502);
        }
        if (existing)
          return json({ id: existing.id, requestNumber: existing.request_number, duplicate: true });

        const estimate =
          lead.request.estimate.convertedMax ?? lead.request.estimate.estimatedMaxJod;
        const projectTitle = `${lead.request.projectType.replace(/([A-Z])/g, " $1").trim()} — ${lead.request.customer.businessName || lead.request.customer.fullName}`;
        const { data: created, error } = await crm
          .from("client_requests")
          .insert({
            customer_name: clean(lead.request.customer.fullName, 160)!,
            business_name: clean(lead.request.customer.businessName, 160),
            email: clean(lead.request.customer.email, 254),
            phone: clean(lead.request.customer.phone, 40),
            whatsapp:
              lead.request.contactMethod === "whatsapp"
                ? clean(lead.request.customer.phone, 40)
                : null,
            preferred_language: lead.request.locale,
            contact_source: "Website",
            project_title: projectTitle.slice(0, 255),
            project_description: buildDescription(lead),
            internal_notes: buildInternalNotes(lead),
            quoted_price: Number.isFinite(estimate) ? estimate : null,
            currency: clean(lead.request.estimate.selectedCurrency, 8) ?? "JOD",
            priority: lead.request.timeline.isRush ? "urgent" : "normal",
            status: "new_lead",
            request_date: new Date().toISOString().slice(0, 10),
          })
          .select("id,request_number")
          .single();
        if (error) {
          console.error("[crm-project-request] CRM insert failed", {
            code: error.code,
            message: error.message,
          });
          return json({ error: "Project intake is temporarily unavailable." }, 502);
        }
        return json(
          { id: created.id, requestNumber: created.request_number, duplicate: false },
          201,
        );
      },
    },
  },
});
