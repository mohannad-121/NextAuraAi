import { CinematicHero } from "@/components/landing/CinematicHero";
import { AstronautContinuationScene } from "@/components/landing/AstronautContinuationScene";
import { DigitalFoundationSection } from "@/components/landing/CinematicDepthJourney";
import { useLanguage } from "@/i18n/translations";

type HeroUndergroundJourneyProps = { onStartProject: () => void };

export function HeroUndergroundJourney({ onStartProject }: HeroUndergroundJourneyProps) {
  const { dir } = useLanguage();

  return (
    <div className="relative isolate bg-[var(--page-background)]" dir={dir}>
      <CinematicHero onStartProject={onStartProject} />
      <AstronautContinuationScene />
      <div aria-hidden="true" className="hero-depth-threshold">
        <div className="hero-depth-line" />
      </div>
      <DigitalFoundationSection />
    </div>
  );
}
