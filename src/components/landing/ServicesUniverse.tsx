import { lazy, Suspense, useEffect, useState } from "react";
import { SpaceSectionBackdrop } from "@/components/landing/SpaceSectionBackdrop";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

const ServicePlanetCarousel = lazy(() =>
  import("@/components/landing/ServicePlanetCarousel").then((module) => ({
    default: module.ServicePlanetCarousel,
  })),
);

export function ServicesUniverse({ onStartProject }: { onStartProject: () => void }) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].services;
  const [useStaticServices, setUseStaticServices] = useState(true);

  useEffect(() => {
    const compactDevice = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setUseStaticServices(compactDevice.matches || reducedMotion.matches);

    update();
    compactDevice.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      compactDevice.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

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

        {useStaticServices ? (
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.items.slice(0, 3).map((service) => (
              <article
                key={service.title}
                className="rounded-3xl border border-white/10 bg-slate-950/55 p-6 shadow-[0_18px_48px_rgb(0_0_0_/_0.2)] backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <Suspense fallback={<div className="mt-12 min-h-[38rem]" aria-hidden="true" />}>
            <ServicePlanetCarousel items={copy.items} />
          </Suspense>
        )}
      </div>
    </section>
  );
}
