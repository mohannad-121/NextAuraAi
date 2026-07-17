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

  const visitorId = createVisitorId();
  sessionVisitorId = visitorId;

  try {
    window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
  } catch {
    // Some privacy modes block localStorage. The module value remains stable for this session.
  }

  return visitorId;
}

function createVisitorId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export const anonymousVisitorStorageKey = VISITOR_ID_KEY;
