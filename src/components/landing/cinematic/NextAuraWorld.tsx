import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

interface NextAuraWorldProps {
  children: ReactNode;
}

export function NextAuraWorld({ children }: NextAuraWorldProps) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: 0 },
      lerp: 0.085,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      allowNestedScroll: true,
    });
    const restoreHash = () => {
      if (window.location.hash) lenis.scrollTo(window.location.hash, { immediate: true });
    };
    window.addEventListener("popstate", restoreHash);
    return () => {
      window.removeEventListener("popstate", restoreHash);
      lenis.destroy();
    };
  }, []);
  return (
    <div className="nextaura-editorial relative min-h-screen w-full selection:bg-violet-200 selection:text-slate-900">
      <div className="relative z-10 w-full overflow-hidden">{children}</div>
    </div>
  );
}
