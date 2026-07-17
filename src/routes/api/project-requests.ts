import { Buffer } from "node:buffer";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getPackage } from "@/features/project-request/config";
import { calculateEstimate } from "@/features/project-request/pricingEngine";
import type { ProjectRequestDraft } from "@/features/project-request/types";

const PDF_LIMIT_BYTES = 5 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 8_000;

const packageIds = ["basic", "business", "complete"] as const;
const currencies = ["JOD", "USD", "EUR", "GBP", "ILS", "AED", "SAR", "QAR", "OMR"] as const;
const featureIds = [
  "responsiveDesign",
  "corePages",
  "contactForm",
  "whatsappSocial",
  "basicSeo",
  "maps",
  "basicAnimations",
  "deployment",
  "cms",
  "adminDashboard",
  "productManagement",
  "booking",
  "database",
  "multilingual",
  "authentication",
  "roles",
  "analytics",
  "payments",
  "customerDashboard",
  "ecommerce",
  "realtime",
  "apiIntegrations",
  "crm",
  "automation",
  "aiChatbot",
  "aiAssistant",
  "rag",
  "customReporting",
  "customWorkflows",
  "scalableBackend",
] as const;

const projectRequestSchema = z.object({
  id: z.string().regex(/^NXA-\d{8}-[A-F0-9]{8}$/),
  locale: z.enum(["ar", "en", "es"]),
  customer: z.object({
    fullName: z.string().trim().min(2).max(120),
    phone: z.string().trim().min(7).max(32),
    email: z.string().email().max(160).optional(),
    businessName: z.string().max(160).optional(),
  }),
  projectType: z.enum([
    "businessWebsite",
    "ecommerce",
    "booking",
    "webApplication",
    "aiSolution",
    "other",
  ]),
  projectIdea: z.string().trim().min(20).max(3000),
  packageId: z.enum(packageIds),
  includedFeatureIds: z.array(z.enum(featureIds)).max(30),
  selectedFeatureIds: z.array(z.enum(featureIds)).max(30),
  customFeature: z.string().max(2000).optional(),
  languageCount: z.number().int().min(1).max(10),
  timeline: z.object({
    option: z.enum(["oneWeek", "twoWeeks", "threeFourWeeks", "flexible", "custom"]),
    requestedDate: z.string().max(10).optional(),
    days: z.number().int().min(0).max(3650).optional(),
    isRush: z.boolean(),
  }),
  contactMethod: z.enum(["whatsapp", "phone", "email"]).optional(),
  notes: z.string().max(2000).optional(),
  estimate: z.object({
    packageId: z.enum(packageIds),
    isRush: z.boolean(),
    allowedMinJod: z.number().min(100).max(1500),
    allowedMaxJod: z.number().min(100).max(1500),
    estimatedMinJod: z.number().min(100).max(1500),
    estimatedMaxJod: z.number().min(100).max(1500),
    complexityScore: z.number().min(0).max(1000),
    complexityPosition: z.number().min(0).max(1),
    impactingFeatureIds: z.array(z.enum(featureIds)).max(10),
    currencyBase: z.literal("JOD"),
    selectedCurrency: z.enum(currencies),
    convertedMin: z.number().positive().optional(),
    convertedMax: z.number().positive().optional(),
    exchangeRate: z.number().positive().optional(),
    exchangeRateTimestamp: z.string().max(64).optional(),
    exchangeRateSource: z.string().max(160).optional(),
    approximateConversion: z.boolean(),
    explanation: z.string().min(10).max(1500),
  }),
  maintenance: z.object({ freeMonths: z.literal(8) }),
  submittedAt: z.string().datetime(),
});

const submissionSchema = z.object({
  request: projectRequestSchema,
  pdfBase64: z
    .string()
    .min(100)
    .max(Math.ceil((PDF_LIMIT_BYTES * 4) / 3) + 16),
});

type SubmissionConfig = {
  supabaseUrl: string;
  serviceRoleKey: string;
  storageBucket: string;
};

type WhatsAppConfig = {
  accessToken: string;
  phoneNumberId: string;
  recipientNumber: string;
  graphApiVersion: string;
};

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost ?? request.headers.get("host");
  try {
    return Boolean(host) && new URL(origin).host === host;
  } catch {
    return false;
  }
}

function getSubmissionConfig(): SubmissionConfig | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!supabaseUrl || !serviceRoleKey) return null;
  try {
    const parsed = new URL(supabaseUrl);
    if (parsed.protocol !== "https:" && parsed.hostname !== "127.0.0.1") return null;
    return {
      supabaseUrl: parsed.toString().replace(/\/$/, ""),
      serviceRoleKey,
      storageBucket: process.env.PROJECT_REQUEST_STORAGE_BUCKET?.trim() || "project-request-pdfs",
    };
  } catch {
    return null;
  }
}

function getWhatsAppConfig(): WhatsAppConfig | null {
  const accessToken = process.env.WHATSAPP_CLOUD_ACCESS_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const recipientNumber = process.env.WHATSAPP_RECIPIENT_NUMBER?.trim();
  const graphApiVersion = process.env.WHATSAPP_GRAPH_API_VERSION?.trim();
  if (!accessToken || !phoneNumberId || !recipientNumber || !graphApiVersion) return null;
  if (!/^v\d+\.\d+$/.test(graphApiVersion)) return null;
  return { accessToken, phoneNumberId, recipientNumber, graphApiVersion };
}

function supabaseHeaders(config: SubmissionConfig, additional?: HeadersInit) {
  const headers = new Headers(additional);
  headers.set("apikey", config.serviceRoleKey);
  headers.set("authorization", `Bearer ${config.serviceRoleKey}`);
  return headers;
}

async function saveRecord(config: SubmissionConfig, request: z.infer<typeof projectRequestSchema>) {
  const response = await fetch(`${config.supabaseUrl}/rest/v1/project_requests`, {
    method: "POST",
    headers: supabaseHeaders(config, {
      "content-type": "application/json",
      prefer: "return=minimal",
    }),
    body: JSON.stringify({
      request_id: request.id,
      customer_name: request.customer.fullName,
      customer_phone: request.customer.phone,
      customer_email: request.customer.email ?? null,
      package_id: request.packageId,
      estimated_min_jod: request.estimate.estimatedMinJod,
      estimated_max_jod: request.estimate.estimatedMaxJod,
      selected_currency: request.estimate.selectedCurrency,
      is_rush: request.timeline.isRush,
      payload: request,
      submitted_at: request.submittedAt,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`SUPABASE_RECORD_${response.status}`);
}

async function savePdf(config: SubmissionConfig, requestId: string, pdf: ArrayBuffer) {
  const path = `${encodeURIComponent(requestId)}.pdf`;
  const response = await fetch(
    `${config.supabaseUrl}/storage/v1/object/${encodeURIComponent(config.storageBucket)}/${path}`,
    {
      method: "POST",
      headers: supabaseHeaders(config, { "content-type": "application/pdf", "x-upsert": "false" }),
      body: pdf,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    },
  );
  return response.ok;
}

async function deliverToWhatsApp(
  config: WhatsAppConfig,
  requestId: string,
  customerName: string,
  pdf: ArrayBuffer,
) {
  const root = `https://graph.facebook.com/${config.graphApiVersion}/${config.phoneNumberId}`;
  const mediaBody = new FormData();
  mediaBody.append("messaging_product", "whatsapp");
  mediaBody.append("type", "application/pdf");
  mediaBody.append("file", new Blob([pdf], { type: "application/pdf" }), `${requestId}.pdf`);
  const mediaResponse = await fetch(`${root}/media`, {
    method: "POST",
    headers: { authorization: `Bearer ${config.accessToken}` },
    body: mediaBody,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!mediaResponse.ok) return false;
  const mediaPayload = (await mediaResponse.json()) as { id?: string };
  if (!mediaPayload.id) return false;

  const messageResponse = await fetch(`${root}/messages`, {
    method: "POST",
    headers: { authorization: `Bearer ${config.accessToken}`, "content-type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: config.recipientNumber,
      type: "document",
      document: {
        id: mediaPayload.id,
        filename: `${requestId}.pdf`,
        caption: `New project request ${requestId} — ${customerName}`,
      },
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  return messageResponse.ok;
}

async function handleSubmission(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json(
      { success: false, manualFallback: true, error: "ORIGIN_NOT_ALLOWED" },
      { status: 403 },
    );
  }
  let parsed: z.infer<typeof submissionSchema>;
  try {
    parsed = submissionSchema.parse(await request.json());
  } catch {
    return Response.json(
      { success: false, manualFallback: true, error: "INVALID_REQUEST" },
      { status: 400 },
    );
  }

  const pdf = Buffer.from(parsed.pdfBase64, "base64");
  if (pdf.length > PDF_LIMIT_BYTES || pdf.subarray(0, 4).toString("ascii") !== "%PDF") {
    return Response.json(
      { success: false, manualFallback: true, error: "INVALID_PDF" },
      { status: 400 },
    );
  }
  const pdfArrayBuffer = Uint8Array.from(pdf).buffer;

  const pricingDraft: ProjectRequestDraft = {
    fullName: "",
    phone: "",
    email: "",
    businessName: "",
    projectType: parsed.request.projectType,
    projectIdea: parsed.request.projectIdea,
    packageId: parsed.request.packageId,
    selectedFeatureIds: parsed.request.selectedFeatureIds,
    customFeature: parsed.request.customFeature ?? "",
    languageCount: parsed.request.languageCount,
    timelineOption: parsed.request.timeline.option,
    requestedDate: parsed.request.timeline.requestedDate ?? "",
    contactMethod: parsed.request.contactMethod ?? "",
    notes: parsed.request.notes ?? "",
    currency: parsed.request.estimate.selectedCurrency,
  };
  const expectedEstimate = calculateEstimate(pricingDraft, parsed.request.timeline);
  const estimateKeys = [
    "allowedMinJod",
    "allowedMaxJod",
    "estimatedMinJod",
    "estimatedMaxJod",
    "complexityScore",
    "complexityPosition",
  ] as const;
  const pricingMatches =
    parsed.request.estimate.packageId === parsed.request.packageId &&
    parsed.request.estimate.isRush === parsed.request.timeline.isRush &&
    estimateKeys.every((key) => parsed.request.estimate[key] === expectedEstimate[key]);
  const expectedIncluded = getPackage(parsed.request.packageId).includedFeatureIds;
  const includedMatches =
    expectedIncluded.length === parsed.request.includedFeatureIds.length &&
    expectedIncluded.every((featureId) => parsed.request.includedFeatureIds.includes(featureId));
  if (!pricingMatches || !includedMatches) {
    return Response.json(
      { success: false, manualFallback: true, error: "PRICING_VALIDATION_FAILED" },
      { status: 400 },
    );
  }

  const config = getSubmissionConfig();
  if (!config) {
    return Response.json({
      success: false,
      stored: false,
      pdfStored: false,
      whatsappDelivered: false,
      manualFallback: true,
      requestId: parsed.request.id,
      error: "PROJECT_REQUEST_STORAGE_NOT_CONFIGURED",
    });
  }

  try {
    await saveRecord(config, parsed.request);
  } catch {
    console.error("[project-request] Record persistence failed", { requestId: parsed.request.id });
    return Response.json({
      success: false,
      stored: false,
      pdfStored: false,
      whatsappDelivered: false,
      manualFallback: true,
      requestId: parsed.request.id,
      error: "PROJECT_REQUEST_PERSISTENCE_FAILED",
    });
  }

  const pdfStored = await savePdf(config, parsed.request.id, pdfArrayBuffer).catch(() => false);
  const whatsappConfig = getWhatsAppConfig();
  const whatsappDelivered = whatsappConfig
    ? await deliverToWhatsApp(
        whatsappConfig,
        parsed.request.id,
        parsed.request.customer.fullName,
        pdfArrayBuffer,
      ).catch(() => false)
    : false;

  console.info("[project-request] Submission handled", {
    requestId: parsed.request.id,
    pdfStored,
    whatsappDelivered,
  });

  return Response.json({
    success: true,
    stored: true,
    pdfStored,
    whatsappDelivered,
    manualFallback: !whatsappDelivered,
    requestId: parsed.request.id,
  });
}

export const Route = createFileRoute("/api/project-requests")({
  server: {
    handlers: {
      POST: ({ request }) => handleSubmission(request),
    },
  },
});
