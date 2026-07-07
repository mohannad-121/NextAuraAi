import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Hero3DVisual } from "@/components/landing/3DHeroVisual";
import { useLanguage } from "@/i18n/translations";

type HeroProps = {
  onStartProject: () => void;
};

export function Hero({ onStartProject }: HeroProps) {
  const { tr, dir } = useLanguage();
  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-40 md:pb-24">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 animated-aurora opacity-80" />
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-primary/70"
            style={{ left: `${8 + ((i * 17) % 84)}%`, top: `${14 + ((i * 23) % 72)}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.25, 0.9, 0.25] }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={dir === "rtl" ? "text-center lg:text-right" : "text-center lg:text-left"}
        >
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs lg:mx-0">
            <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--cyan)" }} />
            <span className="text-muted-foreground">{tr.hero.badge}</span>
          </div>

          <h1 className="text-[2.35rem] font-bold leading-[1.04] sm:text-5xl lg:text-7xl">
            <span className="text-gradient">{tr.hero.titleA}</span>{tr.hero.titleB}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">
            {tr.hero.subtitle}
          </p>

          <div className="mt-7 grid gap-3 sm:flex sm:justify-center lg:justify-start">
            <button type="button" onClick={onStartProject} className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm">
              {tr.nav.start} <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#work" className="btn-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm">
              {tr.hero.viewWork}
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {tr.hero.stats.map(([k, v]: [string, string]) => (
              <div key={v} className="rounded-2xl border border-border/60 bg-card/35 p-3 backdrop-blur sm:p-4">
                <div className="font-display text-xl font-bold text-gradient sm:text-2xl">{k}</div>
                <div className="mt-1 text-[0.8rem] text-muted-foreground">{v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto mt-1 flex w-full justify-center lg:mt-0 lg:justify-end"
        >
          <Hero3DVisual />
        </motion.div>
      </div>
    </section>
  );
}
