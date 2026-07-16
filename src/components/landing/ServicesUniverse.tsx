import { ServicePlanetCarousel } from "@/components/landing/ServicePlanetCarousel";
import { SpaceSectionBackdrop } from "@/components/landing/SpaceSectionBackdrop";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

export function ServicesUniverse({ onStartProject }: { onStartProject: () => void }) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].services;

  return (
    <section
      id="services"
      className="services-universe-section homepage-section homepage-environment relative"
      dir={dir}
    >
      <SpaceSectionBackdrop />
      <div className="homepage-container">
        <header className="services-section-heading">
          <span className="services-section-eyebrow">{copy.eyebrow}</span>
          <h2 className="services-section-title">{copy.title}</h2>
        </header>

        <ServicePlanetCarousel items={copy.items} />
      </div>
    </section>
  );
}
