import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/translations";
import { homepageContent } from "@/i18n/homepageContent";
import { DEPTH_JOURNEY_CONFIG } from "@/components/landing/depthJourneyConfig";

type CinematicHeroProps = { onStartProject: () => void };

export function CinematicHero({ onStartProject }: CinematicHeroProps) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].hero;

  return (
    <section
      id="home"
      className="cinematic-hero relative flex min-h-[max(720px,100svh)] items-center overflow-hidden pb-16 pt-28 sm:min-h-[max(780px,100svh)] sm:pb-20 sm:pt-32 lg:min-h-[100svh] lg:pb-20 lg:pt-28"
    >
      <div
        data-hero-video-frame
        className="absolute inset-0 overflow-hidden bg-cover bg-center"
        style={{
          transform: "scale(1.04)",
          backgroundImage: "url('/images/cinematic/hero-robot-poster.webp')",
        }}
      >
        {/* Add responsive <source> elements here when dedicated mobile/desktop encodes exist. */}
        <video
          src="/videos/hero-video.mp4"
          poster="/images/cinematic/hero-robot-poster.webp"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
          data-hero-video
          className="hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{
            filter: `brightness(${DEPTH_JOURNEY_CONFIG.hero.brightness}) contrast(${DEPTH_JOURNEY_CONFIG.hero.contrast}) saturate(${DEPTH_JOURNEY_CONFIG.hero.saturation})`,
          }}
          onCanPlay={(event) => (event.currentTarget.style.opacity = "1")}
          onError={(event) => (event.currentTarget.style.opacity = "0")}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(2_4_13_/_0.76)_0%,rgb(2_4_13_/_0.62)_24%,rgb(2_4_13_/_0.28)_43%,transparent_68%)] rtl:bg-[linear-gradient(270deg,rgb(2_4_13_/_0.76)_0%,rgb(2_4_13_/_0.62)_24%,rgb(2_4_13_/_0.28)_43%,transparent_68%)]" />
      <div className="absolute inset-0 hero-noise opacity-25" />
      <div className="absolute inset-0 neural-field opacity-40" aria-hidden="true" />

      <motion.div className="relative mx-auto w-full max-w-[96rem] px-5 sm:px-8 lg:px-12" dir={dir}>
        <div className="max-w-[580px] rtl:max-w-[620px] 2xl:max-w-[680px] 2xl:rtl:max-w-[720px]">
          <div data-hero-heading>
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
              className="mt-6 max-w-[580px] text-balance text-[clamp(2.35rem,9vw,3.05rem)] font-semibold leading-[0.99] tracking-[-0.045em] text-white [text-shadow:0_2px_18px_rgb(0_0_0_/_0.28)] sm:text-[clamp(2.9rem,6vw,3.85rem)] lg:text-[clamp(3.3rem,4.8vw,4.55rem)] 2xl:max-w-[680px] 2xl:text-[clamp(3.7rem,4.8vw,5.6rem)]"
            >
              {copy.lead}
              <span className="text-gradient">{copy.accent}</span>
            </motion.h1>
          </div>
          <div data-hero-support>
            <motion.p
              data-hero-paragraph
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.75 }}
              className="mt-7 max-w-[36rem] text-base leading-8 text-slate-200 sm:text-lg lg:leading-8"
            >
              {copy.body}
            </motion.p>
            <motion.div
              data-hero-actions
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
              data-hero-trust
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center gap-3 text-sm text-slate-400"
            >
              <span className="h-px w-10 bg-gradient-to-r from-violet-500 to-cyan-400" />
              <span>{copy.trust}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <a
        href="#services"
        aria-label={copy.scroll}
        data-hero-scroll
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-slate-500 lg:flex"
      >
        {copy.scroll}
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#020617]" />
    </section>
  );
}
