import { Eye, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { getAnonymousVisitorId } from "@/lib/anonymousVisitor";
import { getSupabaseClient } from "@/lib/supabase";
import { useLanguage } from "@/i18n/translations";

const COUNT_CACHE_KEY = "nextaura-last-confirmed-visitor-count";
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1_000;

let visitorCountRequest: Promise<number> | null = null;

function readCachedCount() {
  try {
    const cached = JSON.parse(window.localStorage.getItem(COUNT_CACHE_KEY) ?? "null") as {
      count?: unknown;
      timestamp?: unknown;
    } | null;
    if (
      cached &&
      Number.isSafeInteger(cached.count) &&
      Number(cached.count) >= 0 &&
      typeof cached.timestamp === "number" &&
      Date.now() - cached.timestamp <= CACHE_MAX_AGE_MS
    ) {
      return Number(cached.count);
    }
  } catch {
    // The confirmed server value will replace an unavailable or invalid cache.
  }
  return null;
}

function cacheCount(count: number) {
  try {
    window.localStorage.setItem(COUNT_CACHE_KEY, JSON.stringify({ count, timestamp: Date.now() }));
  } catch {
    // Counting remains functional when browser storage is unavailable.
  }
}

function requestVisitorCount(force = false) {
  if (force) visitorCountRequest = null;
  if (!visitorCountRequest) {
    const supabase = getSupabaseClient();
    if (!supabase) return Promise.reject(new Error("SUPABASE_CONFIG_MISSING"));

    visitorCountRequest = Promise.resolve(
      supabase.rpc("register_site_visitor", {
        p_visitor_id: getAnonymousVisitorId(),
        p_path: window.location.pathname,
      }),
    ).then(({ data, error }) => {
      if (error) throw new Error(error.code || "VISITOR_DATABASE_FAILED");

      const row = Array.isArray(data) ? data[0] : data;
      const count = Number((row as { total_count?: unknown } | null)?.total_count);
      if (!Number.isSafeInteger(count) || count < 0) {
        throw new Error("VISITOR_RESPONSE_INVALID");
      }

      cacheCount(count);
      return count;
    });
  }
  return visitorCountRequest!;
}

type VisitorCounterProps = {
  accessibleLabel: string;
  retryLabel: string;
  unavailableLabel: string;
};

export function VisitorCounter({
  accessibleLabel,
  retryLabel,
  unavailableLabel,
}: VisitorCounterProps) {
  const { language } = useLanguage();
  const [count, setCount] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  const load = (force = false) => {
    setFailed(false);
    void requestVisitorCount(force)
      .then(setCount)
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.error("[visitor-counter] registration failed", {
            code: error instanceof Error ? error.message : "VISITOR_COUNT_UNAVAILABLE",
          });
        }
        setFailed(true);
      });
  };

  useEffect(() => {
    setCount(readCachedCount());
    load();
  }, []);

  const locale = language === "ar" ? "ar-JO" : language === "es" ? "es-ES" : "en-JO";
  const formattedCount = count === null ? null : new Intl.NumberFormat(locale).format(count);
  const content = (
    <>
      <Eye aria-hidden="true" className="h-4 w-4" strokeWidth={1.9} />
      <span aria-live="polite">{formattedCount ?? "—"}</span>
      {failed ? <RotateCcw aria-hidden="true" className="hero-visitor-retry-icon" /> : null}
    </>
  );

  if (failed) {
    return (
      <button
        type="button"
        className="hero-visitor-counter hero-visitor-counter-retry"
        aria-label={`${retryLabel}. ${formattedCount ?? unavailableLabel}`}
        title={retryLabel}
        onClick={() => load(true)}
      >
        {content}
      </button>
    );
  }

  return (
    <span
      className="hero-visitor-counter"
      aria-label={formattedCount ? `${formattedCount} ${accessibleLabel}` : unavailableLabel}
    >
      {content}
    </span>
  );
}
