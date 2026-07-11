import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/i18n/translations";
import { homepageContent } from "@/i18n/homepageContent";

type CinematicHeroProps = { onStartProject: () => void };

export function CinematicHero({ onStartProject }: CinematicHeroProps) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].hero;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -46]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[760px] items-end overflow-hidden pb-24 pt-32 sm:min-h-[820px] lg:min-h-[100svh] lg:items-center lg:pb-20 lg:pt-28"
    >
      <motion.video
        src="/videos/hero-video.mp4"
        poster="/images/cinematic/nextaura-ai-hero.webp"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
        style={{ y: imageY, scale: imageScale }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#02040d_5%,rgb(2_4_13_/_0.94)_32%,rgb(2_4_13_/_0.48)_66%,rgb(2_4_13_/_0.15)),linear-gradient(180deg,rgb(2_4_13_/_0.4),transparent_28%,#020617_100%)] rtl:bg-[linear-gradient(270deg,#02040d_5%,rgb(2_4_13_/_0.94)_32%,rgb(2_4_13_/_0.48)_66%,rgb(2_4_13_/_0.15)),linear-gradient(180deg,rgb(2_4_13_/_0.4),transparent_28%,#020617_100%)]" />
      <div className="absolute inset-0 hero-noise opacity-40" />
      <div className="absolute inset-0 neural-field opacity-55" aria-hidden="true" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-[96rem] px-5 sm:px-8 lg:px-12"
        dir={dir}
      >
        <div className="max-w-[52rem]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="section-eyebrow inline-flex items-center gap-2"
          >
            <Sparkles className="h-3.5 w-3.5" /> {copy.eyebrow}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[50rem] text-balance text-[clamp(3rem,7.2vw,7.8rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white"
          >
            {copy.lead}
            <span className="text-gradient">{copy.accent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.75 }}
            className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:text-xl lg:leading-9"
          >
            {copy.body}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.65 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={onStartProject}
              className="premium-button premium-button-primary justify-center sm:justify-start"
            >
              <span>{copy.primary}</span>
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </button>
            <a
              href="#projects"
              className="premium-button premium-button-secondary justify-center sm:justify-start"
            >
              {copy.secondary}
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex items-center gap-3 text-sm text-slate-400"
          >
            <span className="h-px w-10 bg-gradient-to-r from-violet-500 to-cyan-400" />
            <span>{copy.trust}</span>
          </motion.div>
        </div>
      </motion.div>

      <a
        href="#services"
        aria-label={copy.scroll}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-slate-500 lg:flex"
      >
        {copy.scroll}
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#020617]" />
    </section>
  );
}
