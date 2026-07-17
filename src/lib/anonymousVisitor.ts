const VISITOR_ID_KEY = "nextaura-anonymous-visitor-id";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

let sessionVisitorId: string | null = null;

export function isAnonymousVisitorId(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

export function getAnonymousVisitorId() {
  if (sessionVisitorId) return sessionVisitorId;

  try {
    const stored = window.localStorage.getItem(VISITOR_ID_KEY);
    if (isAnonymousVisitorId(stored)) {
      sessionVisitorId = stored;
      return stored;
    }
  } catch {
    // A session-stable ID is still used when storage is unavailable.
  }

  const visitorId = crypto.randomUUID();
  sessionVisitorId = visitorId;

  try {
    window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
  } catch {
    // Some privacy modes block localStorage. The module value remains stable for this session.
  }

  return visitorId;
}

export const anonymousVisitorStorageKey = VISITOR_ID_KEY;
