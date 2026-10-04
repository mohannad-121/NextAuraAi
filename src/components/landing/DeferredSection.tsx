import { Suspense, useEffect, useState, type ReactNode } from "react";
import { useViewportActivity } from "@/hooks/use-viewport-activity";

type DeferredSectionProps = {
  children: ReactNode;
  id?: string;
  minHeight?: string;
  rootMargin?: string;
};

/** Defers non-critical route chunks until the reader is approaching their section. */
export function DeferredSection({
  children,
  id,
  minHeight = "28rem",
  rootMargin = "360px 0px",
}: DeferredSectionProps) {
  const { targetRef, isActive } = useViewportActivity<HTMLDivElement>({
    rootMargin,
    threshold: 0.01,
  });
  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => {
    if (isActive) setHasEntered(true);
  }, [isActive]);

  return (
    <div
      ref={targetRef}
      id={id}
      className={id ? "navigation-target" : undefined}
      style={{ minHeight: hasEntered ? undefined : minHeight }}
    >
      {hasEntered ? <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense> : null}
    </div>
  );
}
