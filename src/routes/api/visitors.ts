import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const SUPABASE_TIMEOUT_MS = 6_000;
const MAX_PAGE_LENGTH = 160;

const AUTOMATED_TRAFFIC_PATTERN =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|whatsapp|slackbot|discordbot|twitterbot|linkedinbot|lighthouse|pagespeed|vercel-screenshot|googleother|pingdom|datadog|newrelic|statuscake|healthcheck|curl|wget|python-requests|postmanruntime|node-fetch|axios|go-http-client|monitor|uptime|preview/i;

const visitorRequestSchema = z.object({
  visitorId: z.string().uuid(),
  page: z.string().max(MAX_PAGE_LENGTH).optional(),
});

type VisitorResponse = {
  success: boolean;
  uniqueCount: number | null;
  isNew: boolean;
  ignored?: boolean;
  code?: string;
};

type SupabaseConfig = {
  restUrl: string;
  serviceRoleKey: string;
};

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

function failureResponse(code: string, status = 200) {
  console.error("[visitor-counter] Registration failed", { code });
  return jsonResponse({ success: false, uniqueCount: null, isNew: false, code }, status);
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

function normalizePage(value: string | undefined) {
  if (!value) return "/";
  const page = value.trim().split(/[?#]/, 1)[0];
  if (!page.startsWith("/") || page.startsWith("//") || page.includes("\\")) return "/";
  return page || "/";
}

function getSupabaseConfig(): SupabaseConfig | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!supabaseUrl || !serviceRoleKey) return null;

  try {
    const parsedUrl = new URL(supabaseUrl);
    if (parsedUrl.protocol !== "https:" && parsedUrl.hostname !== "127.0.0.1") return null;
    return {
      restUrl: `${parsedUrl.toString().replace(/\/$/, "")}/rest/v1`,
      serviceRoleKey,
    };
  } catch {
    return null;
  }
}

async function registerVisitor(config: SupabaseConfig, visitorId: string, page: string) {
  const response = await fetch(`${config.restUrl}/rpc/register_site_visitor`, {
    method: "POST",
    headers: {
      accept: "application/json",
      apikey: config.serviceRoleKey,
      authorization: `Bearer ${config.serviceRoleKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ visitor_identifier: visitorId, current_path: page }),
    signal: AbortSignal.timeout(SUPABASE_TIMEOUT_MS),
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) throw new Error("VISITOR_SCHEMA_MISSING");
    throw new Error("VISITOR_DATABASE_FAILED");
  }

  const payload = (await response.json()) as unknown;
  const row = Array.isArray(payload) ? payload[0] : payload;
  if (!row || typeof row !== "object") throw new Error("VISITOR_RESPONSE_INVALID");

  const uniqueCount = Number((row as Record<string, unknown>).unique_count);
  const isNew = (row as Record<string, unknown>).is_new === true;
  if (!Number.isSafeInteger(uniqueCount) || uniqueCount < 0) {
    throw new Error("VISITOR_RESPONSE_INVALID");
  }

  return { uniqueCount, isNew };
}

async function handleVisitorRequest(request: Request) {
  if (!isSameOrigin(request)) return failureResponse("ORIGIN_NOT_ALLOWED", 403);
  if (isAutomatedTraffic(request.headers)) {
    return jsonResponse({
      success: true,
      uniqueCount: null,
      isNew: false,
      ignored: true,
    });
  }

  let input: z.infer<typeof visitorRequestSchema>;
  try {
    input = visitorRequestSchema.parse(await request.json());
  } catch {
    return failureResponse("VISITOR_REQUEST_INVALID", 400);
  }

  const config = getSupabaseConfig();
  if (!config) return failureResponse("VISITOR_CONFIG_MISSING");

  try {
    const result = await registerVisitor(config, input.visitorId, normalizePage(input.page));
    return jsonResponse({ success: true, ...result });
  } catch (error) {
    const code = error instanceof Error ? error.message : "VISITOR_DATABASE_FAILED";
    return failureResponse(code);
  }
}

export const Route = createFileRoute("/api/visitors")({
  server: {
    handlers: {
      POST: ({ request }) => handleVisitorRequest(request),
    },
  },
});
