import { CinematicHero } from "@/components/landing/CinematicHero";
import { DigitalFoundationSection } from "@/components/landing/CinematicDepthJourney";
import { useLanguage } from "@/i18n/translations";

type HeroUndergroundJourneyProps = { onStartProject: () => void };

export function HeroUndergroundJourney({ onStartProject }: HeroUndergroundJourneyProps) {
  const { dir } = useLanguage();

  return (
    <div className="relative isolate bg-[var(--page-background)]" dir={dir}>
      <CinematicHero onStartProject={onStartProject} />
      <DigitalFoundationSection />
    </div>
  );
}
