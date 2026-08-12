import process from "node:process";
import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

const COMPANY_EMAIL = "info@next-aura-ai.com";
const MAX_PDF_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_SENDS_PER_WINDOW = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const recentSendAttempts = new Map<string, number[]>();

function getClientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const attempts = (recentSendAttempts.get(clientKey) ?? []).filter(
    (attempt) => now - attempt < RATE_LIMIT_WINDOW_MS,
  );

  if (attempts.length >= MAX_SENDS_PER_WINDOW) {
    recentSendAttempts.set(clientKey, attempts);
    return true;
  }

  recentSendAttempts.set(clientKey, [...attempts, now]);
  return false;
}

function hasValidRequestId(value: string) {
  return /^[A-Za-z0-9-]{6,100}$/.test(value);
}

export const Route = createFileRoute("/api/project-request-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.RESEND_API_KEY;
        const from = process.env.RESEND_FROM_EMAIL;
        if (!apiKey || !from) {
          return Response.json({ error: "Email delivery is not configured yet." }, { status: 503 });
        }

        if (isRateLimited(getClientKey(request))) {
          return Response.json(
            { error: "Too many email attempts. Please wait a few minutes and try again." },
            { status: 429 },
          );
        }

        const formData = await request.formData();
        const requestId = formData.get("requestId");
        const pdf = formData.get("pdf");

        if (typeof requestId !== "string" || !hasValidRequestId(requestId)) {
          return Response.json({ error: "Invalid project request." }, { status: 400 });
        }
        if (!(pdf instanceof File) || pdf.type !== "application/pdf" || pdf.size === 0) {
          return Response.json({ error: "A valid project PDF is required." }, { status: 400 });
        }
        if (pdf.size > MAX_PDF_SIZE_BYTES) {
          return Response.json(
            { error: "The project PDF is too large to email." },
            { status: 413 },
          );
        }

        const attachment = Buffer.from(await pdf.arrayBuffer()).toString("base64");
        const resend = new Resend(apiKey);
        const { data, error } = await resend.emails.send(
          {
            from,
            to: [COMPANY_EMAIL],
            subject: `New project request: ${requestId}`,
            html: `
              <h1>New NextAura AI project request</h1>
              <p>Request ID: <strong>${requestId}</strong></p>
              <p>The complete project brief is attached as a PDF.</p>
            `,
            attachments: [
              {
                content: attachment,
                filename: `${requestId}-project-request.pdf`,
              },
            ],
            tags: [
              { name: "source", value: "start-project" },
              { name: "request_id", value: requestId },
            ],
          },
          { headers: { "Idempotency-Key": `project-request-email-${requestId}` } },
        );

        if (error || !data?.id) {
          console.error("[project-request-email] Resend delivery failed", {
            requestId,
            error,
          });
          return Response.json({ error: "The project PDF could not be sent." }, { status: 502 });
        }

        return Response.json({ emailId: data.id });
      },
    },
  },
});
