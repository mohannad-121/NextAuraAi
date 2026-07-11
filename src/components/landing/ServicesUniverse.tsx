import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Braces,
  BrainCircuit,
  DraftingCompass,
  Layers3,
  MonitorSmartphone,
  Network,
  Workflow,
} from "lucide-react";
import { useLanguage } from "@/i18n/translations";
import { homepageContent } from "@/i18n/homepageContent";
import { SectionHeading } from "@/components/landing/SectionHeading";

const icons = [
  MonitorSmartphone,
  Bot,
  Workflow,
  Layers3,
  BrainCircuit,
  DraftingCompass,
  Braces,
  Network,
];

const serviceImages = [
  "/images/cinematic/digital-commerce.webp",
  "/images/services/ai-chatbots.webp",
  "/images/services/business-automation.webp",
  "/images/services/crm-platform.webp",
  "/images/services/ai-integration.webp",
  "/images/cinematic/nextaura-sculpture.webp",
  "/images/services/custom-software.webp",
  "/images/services/mvp-development.webp",
];

export function ServicesUniverse({ onStartProject }: { onStartProject: () => void }) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].services;

  return (
    <section
      id="services"
      className="section-shell relative overflow-hidden py-24 sm:py-28 lg:py-40"
      dir={dir}
    >
      <div className="absolute inset-0 grid-fade opacity-45" />
      <div className="section-glow -left-32 top-20" />
      <div className="relative mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} className="max-w-3xl" />
          <div className="lg:pb-2">
            <p className="max-w-2xl text-lg leading-8 text-slate-300">{copy.body}</p>
            <button
              type="button"
              onClick={onStartProject}
              className="mt-6 inline-flex items-center gap-2 border-b border-cyan-400/40 pb-1 text-sm font-semibold text-white transition-colors hover:border-cyan-300 hover:text-cyan-200"
            >
              {copy.cta}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </button>
          </div>
        </div>

        <div className="mt-16 grid auto-rows-[minmax(390px,auto)] gap-px overflow-hidden rounded-[2rem] border border-white/8 bg-white/8 md:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((service, index) => {
            const Icon = icons[index];
            const wide = index === 0 || index === 5;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (index % 4) * 0.06, duration: 0.65 }}
                className={`service-panel group relative isolate overflow-hidden bg-[#060b1b] ${wide ? "lg:col-span-2" : ""}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgb(56_189_248_/_0.12),transparent_32%),radial-gradient(circle_at_18%_85%,rgb(124_58_237_/_0.15),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-full min-h-[390px] flex-col">
                  <div className={`relative overflow-hidden ${wide ? "h-60" : "h-52"}`}>
                    <img
                      src={serviceImages[index]}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060b1b] via-transparent to-black/15" />
                    <span className="absolute start-5 top-5 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 font-mono text-xs text-slate-300 backdrop-blur">
                      0{index + 1}
                    </span>
                    <span className="absolute end-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/45 text-cyan-300 backdrop-blur transition-all duration-500 group-hover:rotate-6 group-hover:border-cyan-300/40 group-hover:bg-cyan-300/10">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="mt-auto p-7 sm:p-8">
                    <h3
                      className={`max-w-xl text-balance font-display font-semibold leading-tight text-white ${wide ? "text-3xl sm:text-4xl" : "text-2xl"}`}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 transition-colors group-hover:text-slate-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
