import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

export function SelectedWork({ onStartProject }: { onStartProject: () => void }) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].work;

  return (
    <section className="relative overflow-hidden py-24 sm:py-28 lg:py-40" dir={dir}>
      <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} className="max-w-4xl" />
          <p className="max-w-xl text-base leading-8 text-slate-400 lg:justify-self-end">
            {copy.body}
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {copy.items.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              className={`work-tile group relative overflow-hidden ${index === 0 ? "lg:row-span-2 lg:min-h-[760px]" : "min-h-[430px]"}`}
            >
              <img
                src={project.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(2_6_23_/_0.06),rgb(2_6_23_/_0.2)_38%,rgb(2_6_23_/_0.96)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em]">
                  <span className="rounded-full border border-cyan-300/30 bg-black/25 px-3 py-1.5 text-cyan-200 backdrop-blur">
                    {project.status}
                  </span>
                  <span className="text-slate-400">{project.category}</span>
                </div>
                <div className="mt-4 flex items-end justify-between gap-5">
                  <div>
                    <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                      {project.name}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                      {project.description}
                    </p>
                  </div>
                  {index === 0 ? (
                    <a
                      href="https://fit-coach-ai-frontend.onrender.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${copy.view}: ${project.name}`}
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 bg-white/8 text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
                    >
                      <ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={onStartProject}
                      aria-label={`${copy.view}: ${project.name}`}
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 bg-white/8 text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
                    >
                      <ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" />
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
