import { useCallback, useEffect, useRef, useState } from "react";
import { CINEMATIC_CHAPTERS, CINEMATIC_WAYPOINTS } from "./sceneConfig";

export interface CinematicScrollState {
  progress: number;
  smoothProgress: number;
  activeChapter: number;
  pointer: { x: number; y: number };
  isReducedMotion: boolean;
  scrollToChapter: (index: number) => void;
}

export function useCinematicScroll(): CinematicScrollState {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const stateRef = useRef({
    progress: 0,
    smoothProgress: 0,
    activeChapter: 0,
    pointerX: 0,
    pointerY: 0,
    targetPointerX: 0,
    targetPointerY: 0,
    anchors: [] as number[],
    maxScroll: 1,
    isReducedMotion: false,
  });

  const measure = useCallback(() => {
    if (typeof window === "undefined") return;
    const vpH = window.innerHeight;
    const scrollH = document.documentElement.scrollHeight;
    const maxScroll = Math.max(1, scrollH - vpH);
    stateRef.current.maxScroll = maxScroll;

    const sections = CINEMATIC_CHAPTERS.map((ch) => document.getElementById(ch.id));

    const anchors = sections.map((el, i) => {
      if (i === 0 || !el) return 0;
      if (i === sections.length - 1) return maxScroll;
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      return Math.min(Math.max(0, top + rect.height * 0.35 - vpH * 0.5), maxScroll);
    });

    for (let i = 1; i < anchors.length; i++) {
      if (anchors[i] <= anchors[i - 1]) {
        anchors[i] = anchors[i - 1] + 1;
      }
    }

    stateRef.current.anchors = anchors;
  }, []);

  const progressFor = useCallback((y: number) => {
    const anchors = stateRef.current.anchors;
    const maxIndex = CINEMATIC_WAYPOINTS.length - 1;
    if (!anchors.length || y <= anchors[0]) return 0;
    if (y >= stateRef.current.maxScroll) return maxIndex;

    for (let i = 0; i < anchors.length - 1; i++) {
      if (y <= anchors[i + 1]) {
        const span = anchors[i + 1] - anchors[i];
        const fraction = span > 0 ? (y - anchors[i]) / span : 0;
        return Math.min(maxIndex, i + fraction);
      }
    }
    return maxIndex;
  }, []);

  const scrollToChapter = useCallback((index: number) => {
    if (typeof window === "undefined") return;
    const targetAnchor = stateRef.current.anchors[index] ?? 0;
    window.scrollTo({
      top: targetAnchor,
      behavior: stateRef.current.isReducedMotion ? "auto" : "smooth",
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      setIsReducedMotion(mediaQuery.matches);
      stateRef.current.isReducedMotion = mediaQuery.matches;
    };
    updateMotion();
    mediaQuery.addEventListener("change", updateMotion);

    measure();

    let scrollRafId: number | null = null;
    const onScroll = () => {
      if (scrollRafId !== null) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;
        const currentY = window.scrollY;
        const prog = progressFor(currentY);
        stateRef.current.progress = prog;
        setProgress(prog);

        const currentChapter = Math.min(
          CINEMATIC_CHAPTERS.length - 1,
          Math.max(0, Math.round(prog)),
        );
        if (currentChapter !== stateRef.current.activeChapter) {
          stateRef.current.activeChapter = currentChapter;
          setActiveChapter(currentChapter);
        }
      });
    };

    let resizeTimeout: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        measure();
        onScroll();
      }, 100);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (stateRef.current.isReducedMotion) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = (e.clientX / w) * 2 - 1;
      const ny = (e.clientY / h) * 2 - 1;
      stateRef.current.targetPointerX = nx;
      stateRef.current.targetPointerY = ny;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    onScroll();

    return () => {
      mediaQuery.removeEventListener("change", updateMotion);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
      window.clearTimeout(resizeTimeout);
    };
  }, [measure, progressFor]);

  return {
    progress,
    smoothProgress: stateRef.current.smoothProgress,
    activeChapter,
    pointer: { x: stateRef.current.pointerX, y: stateRef.current.pointerY },
    isReducedMotion,
    scrollToChapter,
  };
}
