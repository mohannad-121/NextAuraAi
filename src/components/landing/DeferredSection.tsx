import { Suspense, type ReactNode } from "react";
import { useViewportActivity } from "@/hooks/use-viewport-activity";

type DeferredSectionProps = {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
};

/** Defers non-critical route chunks until the reader is approaching their section. */
export function DeferredSection({
  children,
  minHeight = "28rem",
  rootMargin = "360px 0px",
}: DeferredSectionProps) {
  const { targetRef, isActive } = useViewportActivity<HTMLDivElement>({
    rootMargin,
    threshold: 0.01,
  });

  return (
    <div ref={targetRef} style={{ minHeight: isActive ? undefined : minHeight }}>
      {isActive ? <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense> : null}
    </div>
  );
}
