import { createFileRoute } from "@tanstack/react-router";

/**
 * Project requests are now written only through the restricted
 * `submit_project_request` Supabase RPC from the Start Project form.
 * This route intentionally no longer accepts the legacy service-role payload.
 */
export const Route = createFileRoute("/api/project-requests")({
  server: {
    handlers: {
      POST: () =>
        Response.json(
          {
            error: "PROJECT_REQUEST_RPC_REQUIRED",
            message: "Submit project requests through the Start Project form.",
          },
          { status: 410 },
        ),
    },
  },
});
