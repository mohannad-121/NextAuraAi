import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { createFileRoute } from "@tanstack/react-router";

const BASE_VISITOR_COUNT = 110;
const MAX_PAGE_LENGTH = 160;
const MAX_USER_AGENT_LENGTH = 512;
const MIN_HASH_SECRET_LENGTH = 32;
const SUPABASE_TIMEOUT_MS = 6_000;
const UNIQUE_VISIT_WINDOW_MS = 24 * 60 * 60 * 1_000;

const AUTOMATED_TRAFFIC_PATTERN =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|whatsapp|slackbot|discordbot|twitterbot|linkedinbot|headlesschrome|lighthouse|pagespeed|vercel-screenshot|googleother|pingdom|datadog|newrelic|statuscake|healthcheck|curl|wget|python-requests|postmanruntime|node-fetch|axios|go-http-client|monitor|uptime|preview/i;

type VisitorResponse = {
  success: boolean;
  counted: boolean;
  realCount: number;
  displayedCount: number;
  ignored?: boolean;
  error?: string;
  code?: string;
};

type SupabaseConfig = {
  restUrl: string;
  serviceRoleKey: string;
  hashSecret: string;
};

function visitorLog(message: string, details?: Record<string, unknown>) {
  if (details) {
    console.info(`[visitor-counter] ${message}`, details);
    return;
  }

  console.info(`[visitor-counter] ${message}`);
}

function visitorError(message: string, details?: Record<string, unknown>) {
  if (details) {
    console.error(`[visitor-counter] ${message}`, details);
    return;
  }

  console.error(`[visitor-counter] ${message}`);
}

function jsonResponse(payload: VisitorResponse, status = 200) {
  return Response.json(payload, {
    status,
    headers: {
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      expires: "0",
      pragma: "no-cache",
    },
  });
}

function failureResponse(error: string, code: string, status = 502) {
  return jsonResponse(
    {
      success: false,
      counted: false,
      realCount: 0,
      displayedCount: BASE_VISITOR_COUNT,
      error,
      code,
    },
    status,
  );
}

function ignoredResponse() {
  return jsonResponse({
    success: true,
    counted: false,
    ignored: true,
    realCount: 0,
    displayedCount: BASE_VISITOR_COUNT,
  });
}

function getClientIp(headers: Headers) {
  const forwardedHeaders = ["x-vercel-forwarded-for", "x-forwarded-for", "x-real-ip"];

  for (const headerName of forwardedHeaders) {
    const headerValue = headers.get(headerName);
    if (!headerValue) continue;

    for (const candidate of headerValue.split(",")) {
      const clientIp = candidate.trim();
      if (clientIp.length <= 64 && isIP(clientIp) !== 0) return clientIp;
    }
  }

  return null;
}

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

function isAutomatedTraffic(headers: Headers) {
  const userAgent = headers.get("user-agent")?.trim() ?? "";
  const purpose = `${headers.get("purpose") ?? ""} ${headers.get("sec-purpose") ?? ""}`;
  const fetchSite = headers.get("sec-fetch-site");

  return (
    userAgent.length < 8 ||
    AUTOMATED_TRAFFIC_PATTERN.test(userAgent) ||
    /prefetch|preview/i.test(purpose) ||
    (fetchSite !== null && fetchSite !== "same-origin")
  );
}

function sanitizeText(value: string, maxLength: number) {
  let withoutControls = "";

  for (const character of value) {
    const codePoint = character.codePointAt(0) ?? 0;
    withoutControls += codePoint <= 0x1f || codePoint === 0x7f ? " " : character;
  }

  return withoutControls.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizePage(value: unknown) {
  if (typeof value !== "string") return "/";

  const page = sanitizeText(value, MAX_PAGE_LENGTH).split(/[?#]/, 1)[0];
  if (!page.startsWith("/") || page.startsWith("//") || page.includes("\\")) return "/";
  return page || "/";
}

function getSupabaseConfig(): SupabaseConfig | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const hashSecret = process.env.VISITOR_HASH_SECRET;

  visitorLog("Environment check", {
    supabaseUrlConfigured: Boolean(supabaseUrl),
    serviceRoleKeyConfigured: Boolean(serviceRoleKey),
    hashSecretConfigured: Boolean(hashSecret),
  });

  if (
    !supabaseUrl ||
    !serviceRoleKey ||
    !hashSecret ||
    hashSecret.length < MIN_HASH_SECRET_LENGTH
  ) {
    return null;
  }

  try {
    const parsedUrl = new URL(supabaseUrl);
    if (parsedUrl.protocol !== "https:" && parsedUrl.hostname !== "127.0.0.1") return null;

    return {
      restUrl: `${parsedUrl.toString().replace(/\/$/, "")}/rest/v1`,
      serviceRoleKey,
      hashSecret,
    };
  } catch {
    return null;
  }
}

function supabaseHeaders(config: SupabaseConfig, additional?: HeadersInit) {
  const headers = new Headers(additional);
  headers.set("accept", "application/json");
  headers.set("apikey", config.serviceRoleKey);
  headers.set("authorization", `Bearer ${config.serviceRoleKey}`);
  return headers;
}

async function supabaseRequest(config: SupabaseConfig, path: string, init?: RequestInit) {
  return fetch(`${config.restUrl}${path}`, {
    ...init,
    headers: supabaseHeaders(config, init?.headers),
    signal: AbortSignal.timeout(SUPABASE_TIMEOUT_MS),
    cache: "no-store",
  });
}

async function hasRecentVisit(config: SupabaseConfig, visitorHash: string) {
  const cutoff = new Date(Date.now() - UNIQUE_VISIT_WINDOW_MS).toISOString();
  const query = new URLSearchParams({
    select: "id",
    visitor_hash: `eq.${visitorHash}`,
    visited_at: `gte.${cutoff}`,
    limit: "1",
  });
  const response = await supabaseRequest(config, `/website_visits?${query.toString()}`);

  if (!response.ok) {
    visitorError("Duplicate check failed", { status: response.status });
    throw new Error("DUPLICATE_CHECK_FAILED");
  }

  const records = (await response.json()) as unknown;
  if (!Array.isArray(records)) {
    visitorError("Duplicate check returned an invalid response");
    throw new Error("DUPLICATE_CHECK_FAILED");
  }

  const duplicateFound = records.length > 0;
  visitorLog("Duplicate check succeeded", { duplicateFound });
  return duplicateFound;
}

async function insertVisit(
  config: SupabaseConfig,
  visitorHash: string,
  page: string,
  userAgent: string,
) {
  const response = await supabaseRequest(config, "/website_visits", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      prefer: "return=minimal",
    },
    body: JSON.stringify({
      visitor_hash: visitorHash,
      page,
      user_agent: userAgent,
    }),
  });

  if (!response.ok) {
    visitorError("Supabase insert failed", { status: response.status });
    throw new Error("INSERT_FAILED");
  }

  visitorLog("Supabase insert succeeded");
}

function parseExactCount(contentRange: string | null) {
  const match = contentRange?.match(/\/(\d+)$/);
  if (!match) return null;

  const count = Number(match[1]);
  return Number.isSafeInteger(count) && count >= 0 ? count : null;
}

async function getRealVisitCount(config: SupabaseConfig) {
  const query = new URLSearchParams({ select: "id", limit: "1" });
  const response = await supabaseRequest(config, `/website_visits?${query.toString()}`, {
    headers: {
      prefer: "count=exact",
      range: "0-0",
      "range-unit": "items",
    },
  });

  if (!response.ok) {
    visitorError("Supabase count query failed", { status: response.status });
    throw new Error("COUNT_QUERY_FAILED");
  }

  const realCount = parseExactCount(response.headers.get("content-range"));
  if (realCount === null) {
    visitorError("Supabase count query returned an invalid count header");
    throw new Error("COUNT_QUERY_FAILED");
  }

  visitorLog("Supabase count query succeeded", { realCount });
  return realCount;
}

function safeFailure(error: unknown) {
  const code = error instanceof Error ? error.message : "VISITOR_TRACKING_FAILED";

  if (code === "DUPLICATE_CHECK_FAILED") {
    return failureResponse("Unable to check recent visitors", code);
  }
  if (code === "INSERT_FAILED") {
    return failureResponse("Unable to save this visit", code);
  }
  if (code === "COUNT_QUERY_FAILED") {
    return failureResponse("Unable to load the visitor count", code);
  }

  visitorError("Unexpected visitor tracking failure");
  return failureResponse("Visitor tracking is temporarily unavailable", "VISITOR_TRACKING_FAILED");
}

async function registerVisit(request: Request) {
  visitorLog("API route reached");

  if (!isSameOrigin(request)) {
    visitorLog("Request rejected because its origin did not match");
    return failureResponse("Request origin is not allowed", "ORIGIN_NOT_ALLOWED", 403);
  }

  if (isAutomatedTraffic(request.headers)) {
    visitorLog("Request ignored as automated traffic");
    return ignoredResponse();
  }

  const config = getSupabaseConfig();
  if (!config) {
    visitorError("Required environment configuration is missing or invalid");
    return failureResponse("Visitor tracking is not configured", "VISITOR_CONFIG_MISSING", 503);
  }

  const clientIp = getClientIp(request.headers);
  if (!clientIp) {
    visitorError("No valid Vercel-compatible client IP header was found");
    return failureResponse("Unable to identify this visitor", "VISITOR_IP_MISSING", 400);
  }

  let page = "/";
  try {
    const body = (await request.json()) as { page?: unknown };
    page = normalizePage(body.page);
  } catch {
    visitorLog("Request body was missing or invalid; using the homepage path");
  }

  const visitorHash = createHmac("sha256", config.hashSecret).update(clientIp).digest("hex");
  const userAgent = sanitizeText(request.headers.get("user-agent") ?? "", MAX_USER_AGENT_LENGTH);

  try {
    const duplicateFound = await hasRecentVisit(config, visitorHash);
    let counted = false;

    if (duplicateFound) {
      visitorLog("Visitor was already counted within 24 hours");
    } else {
      await insertVisit(config, visitorHash, page, userAgent);
      counted = true;
    }

    const realCount = await getRealVisitCount(config);
    return jsonResponse({
      success: true,
      counted,
      realCount,
      displayedCount: BASE_VISITOR_COUNT + realCount,
    });
  } catch (error) {
    return safeFailure(error);
  }
}

export const Route = createFileRoute("/api/visitors")({
  server: {
    handlers: {
      POST: ({ request }) => registerVisit(request),
    },
  },
});
