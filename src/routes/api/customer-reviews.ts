import { createFileRoute } from "@tanstack/react-router";

/** Customer reviews use the restricted browser Supabase client and RPCs. */
export const Route = createFileRoute("/api/customer-reviews")({
  server: {
    handlers: {
      GET: () => Response.json({ error: "SUPABASE_BROWSER_CLIENT_REQUIRED" }, { status: 410 }),
      POST: () => Response.json({ error: "SUPABASE_BROWSER_CLIENT_REQUIRED" }, { status: 410 }),
    },
  },
});
