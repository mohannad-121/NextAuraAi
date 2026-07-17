import { createFileRoute } from "@tanstack/react-router";
import { FALLBACK_EXCHANGE_RATES, FALLBACK_RATE_METADATA } from "@/features/project-request/config";
import type { CurrencyCode, ExchangeRateSnapshot } from "@/features/project-request/types";

const RATE_URL = "https://open.er-api.com/v6/latest/JOD";
const CACHE_MS = 6 * 60 * 60 * 1000;
const CURRENCIES: CurrencyCode[] = ["JOD", "USD", "EUR", "GBP", "ILS", "AED", "SAR", "QAR", "OMR"];

let rateCache: { value: ExchangeRateSnapshot; expiresAt: number } | null = null;

function fallbackSnapshot(): ExchangeRateSnapshot {
  return {
    base: "JOD",
    rates: FALLBACK_EXCHANGE_RATES,
    source: FALLBACK_RATE_METADATA.source,
    timestamp: FALLBACK_RATE_METADATA.timestamp,
    approximate: true,
  };
}

async function loadRates(): Promise<ExchangeRateSnapshot> {
  if (rateCache && rateCache.expiresAt > Date.now()) return rateCache.value;

  try {
    const response = await fetch(RATE_URL, {
      headers: { accept: "application/json", "user-agent": "NextAura-AI/1.0" },
      signal: AbortSignal.timeout(5_000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("RATE_PROVIDER_FAILED");
    const payload = (await response.json()) as {
      result?: string;
      base_code?: string;
      time_last_update_utc?: string;
      rates?: Record<string, number>;
    };
    if (payload.result !== "success" || payload.base_code !== "JOD" || !payload.rates) {
      throw new Error("INVALID_RATE_RESPONSE");
    }
    const rates = Object.fromEntries(
      CURRENCIES.map((currency) => [currency, payload.rates?.[currency]]),
    ) as Record<CurrencyCode, number>;
    if (CURRENCIES.some((currency) => !Number.isFinite(rates[currency]) || rates[currency] <= 0)) {
      throw new Error("MISSING_RATE");
    }
    const value: ExchangeRateSnapshot = {
      base: "JOD",
      rates,
      source: "ExchangeRate-API open endpoint",
      timestamp: payload.time_last_update_utc
        ? new Date(payload.time_last_update_utc).toISOString()
        : new Date().toISOString(),
      approximate: false,
    };
    rateCache = { value, expiresAt: Date.now() + CACHE_MS };
    return value;
  } catch {
    return fallbackSnapshot();
  }
}

export const Route = createFileRoute("/api/exchange-rates")({
  server: {
    handlers: {
      GET: async () =>
        Response.json(await loadRates(), {
          headers: { "cache-control": "public, max-age=900, stale-while-revalidate=21600" },
        }),
    },
  },
});
