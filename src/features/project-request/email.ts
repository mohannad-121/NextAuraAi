type SendProjectRequestEmailInput = {
  pdf: Blob;
  requestId: string;
};

type SendProjectRequestEmailResponse = {
  emailId?: string;
  error?: string;
};

export class ProjectRequestEmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProjectRequestEmailError";
  }
}

/** Sends the already-generated project PDF to the protected server endpoint. */
export async function sendProjectRequestEmail({
  pdf,
  requestId,
}: SendProjectRequestEmailInput): Promise<string | undefined> {
  const formData = new FormData();
  formData.set("requestId", requestId);
  formData.set("pdf", pdf, `${requestId}-project-request.pdf`);

  const response = await fetch("/api/project-request-email", {
    method: "POST",
    body: formData,
  });
  const result = (await response.json().catch(() => ({}))) as SendProjectRequestEmailResponse;

  if (!response.ok) {
    throw new ProjectRequestEmailError(result.error || "The email could not be sent.");
  }

  return result.emailId;
}
