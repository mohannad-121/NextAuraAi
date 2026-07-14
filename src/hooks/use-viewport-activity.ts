import { useEffect, useRef, useState } from "react";

type ViewportActivityOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useViewportActivity<T extends Element>({
  rootMargin = "0px",
  threshold = 0,
}: ViewportActivityOptions = {}) {
  const targetRef = useRef<T>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    if (!("IntersectionObserver" in window)) {
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry?.isIntersecting ?? false),
      { rootMargin, threshold },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { targetRef, isActive };
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}
