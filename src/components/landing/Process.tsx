import { CinematicCard } from "@/components/landing/CinematicCard";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

export function Process() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].process;

  return (
    <section id="process" className="homepage-section homepage-environment relative" dir={dir}>
      <div className="homepage-container">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} className="max-w-4xl" />

        <div className="relative mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-[12.5%] top-7 hidden h-px bg-gradient-to-r from-violet-500/20 via-cyan-300/50 to-violet-500/20 xl:block"
          />
          {copy.steps.map((step, index) => (
            <CinematicCard key={step.title} className="relative shadow-none">
              <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-cyan-300/30 bg-[#0b1529] font-mono text-sm font-semibold text-cyan-300">
                0{index + 1}
              </div>
              <h3 className="mt-7 text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-[var(--secondary-text)]">
                {step.description}
              </p>
            </CinematicCard>
          ))}
        </div>
      </div>
    </section>
  );
}
