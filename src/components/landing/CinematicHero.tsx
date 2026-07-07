import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { AICoreVisual } from "@/components/landing/AICoreVisual";
import { AnimatedCounter } from "@/components/landing/AnimatedCounter";
import { useLanguage } from "@/i18n/translations";

type CinematicHeroProps = {
  onStartProject: () => void;
};

export function CinematicHero({ onStartProject }: CinematicHeroProps) {
  const { tr, dir } = useLanguage();

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 md:min-h-screen md:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgb(124_58_237_/_0.24),transparent_34%),radial-gradient(circle_at_82%_18%,rgb(56_189_248_/_0.18),transparent_32%),linear-gradient(180deg,#070A16,#020617)]" />
      <div className="absolute inset-0 grid-bg opacity-35" />
      <div className="cinematic-beam cinematic-beam-a" />
      <div className="cinematic-beam cinematic-beam-b" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, x: dir === "rtl" ? -40 : 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 flex justify-center lg:order-1"
        >
          <AICoreVisual interactive />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className={`order-1 lg:order-2 ${dir === "rtl" ? "text-right" : "text-left"}`}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-2 text-xs text-white/75 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-cyan" />
            {tr.hero.badge}
          </div>

          <h1 className="text-[2.6rem] font-bold leading-[1.03] sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{tr.hero.titleA}</span>{tr.hero.titleB}
          </h1>
          <p className={`mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg ${dir === "rtl" ? "mr-0" : ""}`}>
            {tr.hero.subtitle}
          </p>

          <div className={`mt-7 grid gap-3 sm:flex ${dir === "rtl" ? "sm:justify-start" : "sm:justify-start"}`}>
            <button type="button" onClick={onStartProject} className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm">
              {tr.nav.start} <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
            </button>
            <a href="#services" className="btn-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm">
              {tr.hero.viewWork}
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-border/60 bg-card/35 p-3 backdrop-blur sm:p-4">
              <div className="font-display text-xl font-bold text-gradient sm:text-2xl"><AnimatedCounter to={82} suffix="%" /></div>
              <div className="mt-1 text-[0.8rem] text-muted-foreground">{tr.hero.readiness}</div>
            </div>
            {tr.hero.stats.slice(0, 2).map(([k, v]: [string, string]) => (
              <div key={v} className="rounded-2xl border border-border/60 bg-card/35 p-3 backdrop-blur sm:p-4">
                <div className="font-display text-xl font-bold text-gradient sm:text-2xl">{k}</div>
                <div className="mt-1 text-[0.8rem] text-muted-foreground">{v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
