import { ServicePlanetCarousel } from "@/components/landing/ServicePlanetCarousel";
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
      <div className="services-section-media" aria-hidden="true">
        <video
          className="services-section-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/services-universe-space.web.mp4" type="video/mp4" />
        </video>
        <div className="services-section-video-overlay" />
      </div>
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
