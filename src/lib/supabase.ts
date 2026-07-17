import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseConfiguration = {
  url: string;
  publishableKey: string;
};

function readSupabaseConfiguration(): SupabaseConfiguration | null {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim();
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !publishableKey) return null;

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "https:" && parsedUrl.hostname !== "127.0.0.1") return null;
    return { url: parsedUrl.toString().replace(/\/$/, ""), publishableKey };
  } catch {
    return null;
  }
}

const configuration = readSupabaseConfiguration();

export const supabase: SupabaseClient | null = configuration
  ? createClient(configuration.url, configuration.publishableKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    })
  : null;

export const isSupabaseConfigured = Boolean(configuration);

if (import.meta.env.DEV && !configuration) {
  console.warn(
    "[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. Supabase features are unavailable.",
  );
}

export function getSupabaseClient() {
  return supabase;
}

export function getSupabaseConfigurationError() {
  return configuration ? null : "VITE_SUPABASE_CONFIG_MISSING";
}

/** Safe diagnostic value for development logs; it never includes the publishable key. */
export function getSupabaseProjectHostname() {
  return configuration ? new URL(configuration.url).hostname : null;
}

type SupabaseDiagnosticError = {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
};

/** Development-only diagnostics without ever printing a credential or request payload. */
export function logSupabaseError(context: string, error: SupabaseDiagnosticError) {
  if (!import.meta.env.DEV) return;
  console.error(`[supabase] ${context}`, {
    projectHost: getSupabaseProjectHostname(),
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  });
}
