import { createFileRoute } from "@tanstack/react-router";

/** Visitor counting uses the restricted browser Supabase RPC directly. */
export const Route = createFileRoute("/api/visitors")({
  server: {
    handlers: {
      POST: () => Response.json({ error: "SUPABASE_BROWSER_CLIENT_REQUIRED" }, { status: 410 }),
    },
  },
});
