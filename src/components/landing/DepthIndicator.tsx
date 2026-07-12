import { useEffect, useRef, useState } from "react";
import type { CinematicJourneyContent } from "@/i18n/cinematicJourneyContent";

const targets = [
  "home",
  "depth-foundation",
  "depth-automation",
  "depth-intelligence",
  "depth-core",
];

export function DepthIndicator({ copy }: { copy: CinematicJourneyContent["depth"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const viewportMarker = window.innerHeight * 0.48;
      const sections = targets.map((target) => document.getElementById(target));
      let nextActive = 0;

      const centeredSection = document
        .elementsFromPoint(window.innerWidth * 0.5, viewportMarker)
        .map((element) => element.closest<HTMLElement>("[data-depth-section]"))
        .find(Boolean);
      const centeredStage = centeredSection?.dataset.depthSection;
      const centeredIndex = ["foundation", "automation", "intelligence", "core"].indexOf(
        centeredStage ?? "",
      );

      if (centeredIndex >= 0) nextActive = centeredIndex + 1;
      else {
        sections.forEach((section, index) => {
          if (section && section.getBoundingClientRect().top <= viewportMarker) nextActive = index;
        });
      }

      const first = sections[0];
      const last = sections.at(-1);
      if (first && last) {
        const start = first.getBoundingClientRect().top + window.scrollY;
        const end =
          last.getBoundingClientRect().top +
          window.scrollY +
          last.offsetHeight -
          window.innerHeight;
        setProgress(Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(end - start, 1))));
        setIsVisible(window.scrollY <= end + window.innerHeight * 0.35);
      }

      setActiveIndex(nextActive);
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const goToStage = (index: number) => {
    const target = document.getElementById(targets[index]);
    if (!target) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav
      aria-label={copy.label}
      className={`fixed end-3 top-1/2 z-[65] hidden -translate-y-1/2 rounded-2xl border border-white/10 bg-[#050713]/72 px-2.5 py-3 shadow-[0_18px_60px_rgb(0_0_0_/_0.38)] backdrop-blur-xl transition-opacity duration-300 md:block 2xl:end-6 ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="relative flex flex-col gap-3">
        <div className="absolute bottom-3 end-[0.55rem] top-3 w-px bg-white/10" aria-hidden="true">
          <span
            className="block w-full origin-top bg-gradient-to-b from-violet-400 via-blue-400 to-cyan-300 transition-transform duration-150"
            style={{ height: "100%", transform: `scaleY(${progress})` }}
          />
        </div>
        {copy.stages.map((stage, index) => (
          <button
            key={stage.label}
            type="button"
            onClick={() => goToStage(index)}
            onKeyDown={(event) => {
              if (event.key !== "Enter" && event.key !== " ") return;
              event.preventDefault();
              goToStage(index);
            }}
            aria-current={activeIndex === index ? "step" : undefined}
            aria-label={`${stage.label}, ${stage.depth}`}
            className="group relative flex min-h-8 items-center gap-2.5 rounded-xl px-2 text-start focus-visible:outline-cyan-300"
          >
            <span
              className={`max-w-0 overflow-hidden whitespace-nowrap text-[0.64rem] font-medium tracking-wide transition-all duration-300 2xl:max-w-24 ${activeIndex === index ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}
            >
              {stage.label}
              <small className="ms-1 text-[0.55rem] text-cyan-200/55">{stage.depth}</small>
            </span>
            <span
              aria-hidden="true"
              className={`relative z-10 ms-auto block size-2.5 rounded-full border transition-all duration-300 ${activeIndex === index ? "scale-125 border-cyan-200 bg-cyan-300 shadow-[0_0_13px_rgb(34_211_238_/_0.75)]" : "border-white/25 bg-[#0a0d18] group-hover:border-violet-300/60"}`}
            />
          </button>
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        {copy.progress}: {copy.stages[activeIndex]?.label}
      </span>
    </nav>
  );
}
