import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseConfiguration = {
  url: string;
  anonKey: string;
};

function readSupabaseConfiguration(): SupabaseConfiguration | null {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim();
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) return null;

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "https:" && parsedUrl.hostname !== "127.0.0.1") return null;
    return { url: parsedUrl.toString().replace(/\/$/, ""), anonKey };
  } catch {
    return null;
  }
}

const configuration = readSupabaseConfiguration();

export const supabase: SupabaseClient | null = configuration
  ? createClient(configuration.url, configuration.anonKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    })
  : null;

export function getSupabaseClient() {
  return supabase;
}

export function getSupabaseConfigurationError() {
  return configuration ? null : "SUPABASE_CONFIG_MISSING";
}

/** Safe diagnostic value for development logs; it never includes the anon key. */
export function getSupabaseProjectHostname() {
  return configuration ? new URL(configuration.url).hostname : null;
}
