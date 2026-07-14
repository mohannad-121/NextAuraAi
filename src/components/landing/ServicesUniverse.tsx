import { ArrowUpRight, Bot, MonitorSmartphone, PanelsTopLeft } from "lucide-react";
import { CinematicCard } from "@/components/landing/CinematicCard";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

const icons = [MonitorSmartphone, Bot, PanelsTopLeft];

export function ServicesUniverse({ onStartProject }: { onStartProject: () => void }) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].services;

  return (
    <section id="services" className="homepage-section homepage-environment relative" dir={dir}>
      <div className="homepage-container">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} className="max-w-2xl" />
          <div className="lg:pb-1">
            <p className="max-w-xl text-base leading-8 text-[var(--secondary-text)] sm:text-lg">
              {copy.body}
            </p>
            <button
              type="button"
              onClick={onStartProject}
              className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
            >
              {copy.cta}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {copy.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <CinematicCard key={service.title} className="flex min-h-full flex-col">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/8 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-7 text-2xl font-semibold leading-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[var(--secondary-text)]">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
                  {service.examples.map((example) => (
                    <li
                      key={example}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </CinematicCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
