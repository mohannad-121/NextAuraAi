import { CinematicHero } from "@/components/landing/CinematicHero";
import { DigitalFoundationChapter } from "@/components/landing/cinematic/scenes/DigitalFoundationChapter";
import { useLanguage } from "@/i18n/translations";
import type { ReactNode } from "react";

type HeroUndergroundJourneyProps = { onStartProject: () => void; children: ReactNode };

export function HeroUndergroundJourney({ onStartProject, children }: HeroUndergroundJourneyProps) {
  const { dir } = useLanguage();

  return (
    <div className="relative isolate bg-transparent" dir={dir}>
      <CinematicHero onStartProject={onStartProject} />
      <div className="nextaura-glass-world">
        <DigitalFoundationChapter />
        {children}
      </div>
    </div>
  );
}
