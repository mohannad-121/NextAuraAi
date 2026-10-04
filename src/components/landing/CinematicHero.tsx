import { ArrowDown, ArrowUpRight } from "lucide-react";
import { VisitorCounter } from "@/components/landing/VisitorCounter";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

type CinematicHeroProps = { onStartProject: () => void };

export function CinematicHero({ onStartProject }: CinematicHeroProps) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].hero;

  return (
    <section
      id="hero"
      className="editorial-hero relative isolate flex min-h-[100svh] flex-col"
      dir={dir}
    >
      <div className="editorial-hero-media" aria-hidden="true">
        <video
          className="editorial-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/cinematic/nextaura-ai-hero.webp"
          tabIndex={-1}
        >
          <source src="/videos/herosectionvideo.mp4" type="video/mp4" />
        </video>
        <div className="editorial-hero-video-overlay" />
      </div>
      <div id="home" className="pointer-events-none absolute top-0 h-px w-px" />
      <div className="editorial-hero-content relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-28 pt-36 text-center sm:px-10 sm:pt-40">
        <div className="editorial-hero-eyebrow">{copy.eyebrow}</div>
        <h1 className="editorial-hero-title mt-7 max-w-6xl text-balance">
          {copy.lead}
          <span>{copy.accent}</span>
        </h1>
        <p className="editorial-hero-description mt-6 max-w-2xl text-balance">{copy.body}</p>
        <div className="editorial-hero-actions mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onStartProject}
            className="editorial-button editorial-button-dark"
          >
            <span>{copy.primary}</span>
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
          </button>
          <a href="#projects" className="editorial-button editorial-button-light">
            <span>{copy.secondary}</span>
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
          </a>
        </div>
        <div className="editorial-hero-meta mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <span>{copy.trust}</span>
          <VisitorCounter
            accessibleLabel={copy.visitors}
            retryLabel={copy.visitorsRetry}
            unavailableLabel={copy.visitorsUnavailable}
          />
        </div>
      </div>
      <a
        href="#foundation"
        className="editorial-scroll-cue absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-xs font-medium"
      >
        {copy.scroll}
        <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </section>
  );
}
