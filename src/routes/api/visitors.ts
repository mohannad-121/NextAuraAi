import { createHmac } from "node:crypto";
import { createFileRoute } from "@tanstack/react-router";

const BASE_VISITOR_COUNT = 110;
const MAX_PAGE_LENGTH = 160;
const MAX_USER_AGENT_LENGTH = 512;

const AUTOMATED_TRAFFIC_PATTERN =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|whatsapp|slackbot|discordbot|twitterbot|linkedinbot|headlesschrome|lighthouse|pagespeed|curl|wget|python-requests|postmanruntime|monitor|uptime|preview/i;

type VisitorRpcResult = {
  real_unique_count?: number | string;
};

function jsonResponse(payload: Record<string, unknown>) {
  return Response.json(payload, {
    headers: { "cache-control": "no-store, max-age=0" },
  });
}

function fallbackResponse() {
  return jsonResponse({ count: BASE_VISITOR_COUNT, realUniqueVisitorCount: 0 });
}

function getClientIp(headers: Headers) {
  const forwardedIp =
    headers.get("x-vercel-forwarded-for") ??
    headers.get("x-forwarded-for") ??
    headers.get("x-real-ip");
  const clientIp = forwardedIp?.split(",")[0]?.trim();

  if (!clientIp || clientIp.toLowerCase() === "unknown" || clientIp.length > 64) return null;
  return clientIp;
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

  return (
    userAgent.length < 8 ||
    AUTOMATED_TRAFFIC_PATTERN.test(userAgent) ||
    /prefetch|preview/i.test(purpose)
  );
}

function normalizePage(value: unknown) {
  if (typeof value !== "string" || !value.startsWith("/")) return "/";
  return value.slice(0, MAX_PAGE_LENGTH);
}

async function registerVisit(request: Request) {
  if (!isSameOrigin(request) || isAutomatedTraffic(request.headers)) return fallbackResponse();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hashSecret = process.env.VISITOR_HASH_SECRET;
  const clientIp = getClientIp(request.headers);

  if (!supabaseUrl || !serviceRoleKey || !hashSecret || !clientIp) return fallbackResponse();

  let page = "/";
  try {
    const body = (await request.json()) as { page?: unknown };
    page = normalizePage(body.page);
  } catch {
    // A missing or malformed body should not prevent a homepage visit from being counted.
  }

  const visitorHash = createHmac("sha256", hashSecret).update(clientIp).digest("hex");
  const userAgent = (request.headers.get("user-agent") ?? "").slice(0, MAX_USER_AGENT_LENGTH);

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/register_website_visit`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        authorization: `Bearer ${serviceRoleKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        p_visitor_hash: visitorHash,
        p_page: page,
        p_user_agent: userAgent,
      }),
    });

    if (!response.ok) throw new Error(`Supabase RPC returned ${response.status}`);

    const result = (await response.json()) as VisitorRpcResult[];
    const realUniqueVisitorCount = Number(result[0]?.real_unique_count);
    if (!Number.isSafeInteger(realUniqueVisitorCount) || realUniqueVisitorCount < 0) {
      throw new Error("Supabase RPC returned an invalid visitor count");
    }

    return jsonResponse({
      count: BASE_VISITOR_COUNT + realUniqueVisitorCount,
      realUniqueVisitorCount,
    });
  } catch (error) {
    console.error(
      "Visitor registration failed",
      error instanceof Error ? error.message : "Unknown error",
    );
    return fallbackResponse();
  }
}

export const Route = createFileRoute("/api/visitors")({
  server: {
    handlers: {
      POST: ({ request }) => registerVisit(request),
    },
  },
});
