import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { FitCoachDemo } from "@/components/landing/FitCoachDemo";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

export function FeaturedProject() {
  const { language, tr, dir } = useLanguage();
  const copy = homepageContent[language].featured;
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#050817] py-24 sm:py-28 lg:py-40"
      dir={dir}
    >
      <div className="section-glow left-1/3 top-1/3" />
      <div className="relative mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
          className="max-w-5xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85 }}
          className="mt-14"
        >
          <FitCoachDemo tr={tr} />
        </motion.div>

        <div
          id="fitcoach-details"
          className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20"
        >
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {copy.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: dir === "rtl" ? 14 : -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="flex items-center gap-3 text-sm text-slate-300"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-500/12 text-cyan-300">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {feature}
              </motion.div>
            ))}
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {copy.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/12 px-3 py-2 text-xs text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
                className="premium-button premium-button-secondary justify-center"
              >
                {copy.caseStudy}
              </button>
              <a
                href="https://fit-coach-ai-frontend.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button premium-button-primary justify-center"
              >
                {copy.liveDemo}
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </a>
            </div>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] bg-white/10 sm:grid-cols-2">
                <article className="bg-[#071022] p-7 sm:p-9">
                  <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                    {tr.caseStudy.problem}
                  </div>
                  <p className="mt-4 text-lg leading-8 text-slate-300">
                    {tr.caseStudy.problemText}
                  </p>
                </article>
                <article className="bg-[#071022] p-7 sm:p-9">
                  <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                    {tr.caseStudy.solution}
                  </div>
                  <p className="mt-4 text-lg leading-8 text-slate-300">
                    {tr.caseStudy.solutionText}
                  </p>
                </article>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
