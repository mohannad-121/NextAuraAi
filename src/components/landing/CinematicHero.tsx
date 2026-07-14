import { ArrowUpRight } from "lucide-react";
import { DEPTH_JOURNEY_CONFIG } from "@/components/landing/depthJourneyConfig";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

type CinematicHeroProps = { onStartProject: () => void };

export function CinematicHero({ onStartProject }: CinematicHeroProps) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].hero;

  return (
    <section
      id="home"
      className="cinematic-hero relative flex min-h-[max(680px,100svh)] items-center overflow-hidden pb-20 pt-28 sm:min-h-[max(720px,100svh)] sm:pt-32"
      dir={dir}
    >
      <div
        className="absolute inset-0 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cinematic/hero-robot-poster.webp')" }}
      >
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
          className="hero-video absolute inset-0 h-full w-full object-cover"
          style={{
            filter: `brightness(${DEPTH_JOURNEY_CONFIG.hero.brightness}) contrast(${DEPTH_JOURNEY_CONFIG.hero.contrast}) saturate(${DEPTH_JOURNEY_CONFIG.hero.saturation})`,
          }}
          onError={(event) => (event.currentTarget.style.opacity = "0")}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(2_6_18_/_0.9)_0%,rgb(2_6_18_/_0.72)_32%,rgb(2_6_18_/_0.2)_66%,transparent_82%)] rtl:bg-[linear-gradient(270deg,rgb(2_6_18_/_0.9)_0%,rgb(2_6_18_/_0.72)_32%,rgb(2_6_18_/_0.2)_66%,transparent_82%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,var(--page-background)_100%)]" />

      <div className="homepage-container">
        <div className="max-w-[40rem] rtl:max-w-[44rem]">
          <h1 className="text-balance text-[clamp(2.6rem,7vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white rtl:tracking-normal">
            {copy.lead}
            <span className="text-gradient">{copy.accent}</span>
          </h1>
          <p className="mt-7 max-w-[36rem] text-base leading-8 text-slate-200 sm:text-lg">
            {copy.body}
          </p>
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onStartProject}
              className="premium-button premium-button-primary justify-center"
            >
              <span>{copy.primary}</span>
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </button>
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center border-b border-white/30 text-sm font-semibold text-white transition-colors duration-200 hover:border-cyan-300 hover:text-cyan-200"
            >
              {copy.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
