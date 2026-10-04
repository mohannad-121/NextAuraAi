import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/translations";
import { homepageContent } from "@/i18n/homepageContent";
import { CINEMATIC_CHAPTERS } from "../sceneConfig";

interface CinematicChapterRailProps {
  activeChapter: number;
  onSelectChapter: (index: number) => void;
}

export function CinematicChapterRail({
  activeChapter,
  onSelectChapter,
}: CinematicChapterRailProps) {
  const { language, dir } = useLanguage();
  const content = homepageContent[language];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chapterNames: Record<string, string> = {
    home: content.nav.home,
    services: content.nav.services,
    projects: content.nav.projects,
    team: content.nav.team,
    "why-choose": content.benefits.eyebrow,
    reviews: content.reviews.eyebrow,
    contact: content.nav.contact,
  };

  if (!mounted) return null;

  const railPositionClass = dir === "rtl" ? "left-3 sm:left-6" : "right-3 sm:right-6";

  return (
    <nav
      aria-label={language === "ar" ? "التنقل بين أقسام الصفحة" : "Cinematic chapter navigation"}
      className={`fixed top-1/2 z-30 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3.5 ${railPositionClass}`}
    >
      <div className="flex flex-col items-center gap-3 rounded-full border border-white/10 bg-[#070e1c]/70 px-2.5 py-4 shadow-xl backdrop-blur-md">
        {CINEMATIC_CHAPTERS.map((chapter, idx) => {
          const isActive = activeChapter === idx;
          const label = chapterNames[chapter.id] || chapter.id;

          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onSelectChapter(idx)}
              aria-label={language === "ar" ? `انتقل إلى ${label}` : `Jump to ${label}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative grid h-6 w-6 place-items-center focus-visible:outline-none"
            >
              {/* Tooltip on hover */}
              <span
                className={`pointer-events-none absolute whitespace-nowrap rounded-md border border-white/12 bg-[#091326]/95 px-2.5 py-1 text-xs font-medium text-slate-200 shadow-lg backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                  dir === "rtl" ? "left-8 origin-left" : "right-8 origin-right"
                }`}
              >
                {label}
              </span>

              {/* Indicator Dot */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-3.5 w-3.5 bg-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.85)] scale-110"
                    : "h-2 w-2 bg-slate-500/70 hover:bg-slate-300 group-hover:scale-125"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
