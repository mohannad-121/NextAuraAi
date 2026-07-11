import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/i18n/translations";
import { homepageContent } from "@/i18n/homepageContent";

export function Process() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].process;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 85, damping: 24, mass: 0.35 });

  return (
    <section
      id="process"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-28 lg:py-40"
      dir={dir}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#020617,#071022_48%,#020617)]" />
      <div className="relative mx-auto grid max-w-[96rem] gap-14 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24 lg:px-12">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <div className="section-eyebrow">{copy.eyebrow}</div>
          <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
            {copy.title}
          </h2>
          <div className="mt-10 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500 lg:flex">
            <ArrowDownRight className="h-4 w-4 rtl:-scale-x-100" />
            {copy.scroll}
          </div>
        </div>

        <div className="relative ps-10 sm:ps-16">
          <div className="absolute bottom-0 start-3 top-0 w-px bg-white/10 sm:start-5" />
          <motion.div
            className="absolute start-3 top-0 h-full w-px origin-top bg-gradient-to-b from-violet-500 via-cyan-400 to-blue-500 sm:start-5"
            style={{ scaleY: progress }}
          />
          <div className="space-y-4">
            {copy.steps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0.25, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.55 }}
                transition={{ duration: 0.6 }}
                className="group relative min-h-[230px] border-b border-white/10 py-10 first:pt-0 sm:min-h-[260px] sm:py-14"
              >
                <div className="absolute -start-[2.28rem] top-11 grid h-5 w-5 place-items-center rounded-full border border-cyan-300/45 bg-[#050a19] sm:-start-[3.27rem] sm:top-16">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 transition-transform group-hover:scale-150" />
                </div>
                <div className="grid gap-4 sm:grid-cols-[5.5rem_1fr] sm:gap-8">
                  <span className="font-mono text-sm text-cyan-300/70">0{index + 1}</span>
                  <div>
                    <h3 className="text-3xl font-semibold text-white sm:text-4xl">{step.title}</h3>
                    <p className="mt-5 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
