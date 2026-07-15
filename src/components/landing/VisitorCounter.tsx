import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-viewport-activity";

const BASE_VISITOR_COUNT = 110;
const COUNT_ANIMATION_DURATION = 650;

let visitorCountRequest: Promise<number> | undefined;

function loadVisitorCount() {
  if (!visitorCountRequest) {
    visitorCountRequest = fetch("/api/visitors", {
      method: "POST",
      cache: "no-store",
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ page: window.location.pathname }),
      keepalive: true,
    })
      .then(async (response) => {
        const data = (await response.json()) as {
          displayedCount?: unknown;
          error?: unknown;
        };

        if (!response.ok) {
          if (import.meta.env.DEV) {
            console.error(
              "Visitor count request failed",
              typeof data.error === "string" ? data.error : `HTTP ${response.status}`,
            );
          }
          throw new Error("Visitor count request failed");
        }

        return typeof data.displayedCount === "number" && Number.isFinite(data.displayedCount)
          ? Math.max(BASE_VISITOR_COUNT, Math.floor(data.displayedCount))
          : BASE_VISITOR_COUNT;
      })
      .catch((error: unknown) => {
        if (import.meta.env.DEV) console.error("Using the visitor counter fallback", error);
        return BASE_VISITOR_COUNT;
      });
  }

  return visitorCountRequest;
}

type VisitorCounterProps = {
  accessibleLabel: string;
};

export function VisitorCounter({ accessibleLabel }: VisitorCounterProps) {
  const [displayedCount, setDisplayedCount] = useState(BASE_VISITOR_COUNT);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let isCancelled = false;
    let animationFrame = 0;

    void loadVisitorCount().then((targetCount) => {
      if (isCancelled || targetCount === BASE_VISITOR_COUNT) return;

      if (prefersReducedMotion) {
        setDisplayedCount(targetCount);
        return;
      }

      const startedAt = performance.now();
      const animate = (now: number) => {
        if (isCancelled) return;

        const progress = Math.min((now - startedAt) / COUNT_ANIMATION_DURATION, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayedCount(
          Math.round(BASE_VISITOR_COUNT + (targetCount - BASE_VISITOR_COUNT) * easedProgress),
        );

        if (progress < 1) animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);
    });

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrame);
    };
  }, [prefersReducedMotion]);

  return (
    <span className="hero-visitor-counter" aria-label={`${displayedCount}+ ${accessibleLabel}`}>
      <Eye aria-hidden="true" className="h-4 w-4" strokeWidth={1.9} />
      <span aria-hidden="true">{displayedCount}+</span>
    </span>
  );
}
