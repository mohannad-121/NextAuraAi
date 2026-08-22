import type { ProjectRequest } from "./types";

export class CrmSyncError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "CrmSyncError";
  }
}

export async function syncProjectRequestToCrm(request: ProjectRequest, sourceRequestId: string) {
  const response = await fetch("/api/crm-project-request", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ request, sourceRequestId }),
  });
  if (!response.ok) {
    throw new CrmSyncError("The CRM could not receive this project request.", response.status);
  }
  return (await response.json()) as {
    id: string;
    requestNumber: string | null;
    duplicate: boolean;
  };
}
