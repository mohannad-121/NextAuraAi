import { Blocks, LifeBuoy, Target } from "lucide-react";
import { CinematicCard } from "@/components/landing/CinematicCard";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

const icons = [Target, Blocks, LifeBuoy];

export function WhyChoose() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].benefits;

  return (
    <section className="homepage-section homepage-environment relative" dir={dir}>
      <div className="homepage-container">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} className="max-w-3xl" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {copy.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <CinematicCard key={item.title} className="shadow-none">
                <Icon className="h-6 w-6 text-cyan-300" />
                <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--secondary-text)]">
                  {item.description}
                </p>
              </CinematicCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
