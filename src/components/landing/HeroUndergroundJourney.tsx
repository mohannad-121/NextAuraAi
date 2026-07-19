import { lazy } from "react";
import { CinematicHero } from "@/components/landing/CinematicHero";
import { DeferredSection } from "@/components/landing/DeferredSection";
import { useLanguage } from "@/i18n/translations";

const DigitalFoundationSection = lazy(() =>
  import("@/components/landing/CinematicDepthJourney").then((module) => ({
    default: module.DigitalFoundationSection,
  })),
);

type HeroUndergroundJourneyProps = { onStartProject: () => void };

export function HeroUndergroundJourney({ onStartProject }: HeroUndergroundJourneyProps) {
  const { dir } = useLanguage();

  return (
    <div className="relative isolate bg-[var(--page-background)]" dir={dir}>
      <CinematicHero onStartProject={onStartProject} />
      <DeferredSection minHeight="44rem">
        <DigitalFoundationSection />
      </DeferredSection>
    </div>
  );
}
