import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";
import { usePrefersReducedMotion, useViewportActivity } from "@/hooks/use-viewport-activity";
import { VisitorCounter } from "@/components/landing/VisitorCounter";

type CinematicHeroProps = { onStartProject: () => void };

const HERO_VIDEO_SRC = "/videos/astronaut-hero.mp4";

export function CinematicHero({ onStartProject }: CinematicHeroProps) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].hero;
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { targetRef: primaryCtaRef, isActive: isPrimaryCtaActive } =
    useViewportActivity<HTMLButtonElement>({ rootMargin: "96px 0px", threshold: 0.1 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Muted autoplay can still be blocked by browser or device policy.
    });
  }, [prefersReducedMotion]);

  return (
    <section
      id="home"
      className="cinematic-hero relative flex min-h-[max(680px,100svh)] items-center overflow-hidden pb-20 pt-28 sm:min-h-[max(720px,100svh)] sm:pt-32"
      dir={dir}
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#071020]">
        <video
          ref={videoRef}
          src={HERO_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
          className="hero-video absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div aria-hidden="true" className="hero-copy-support absolute inset-0 z-10" />

      <div className="homepage-container z-20">
        <div className="max-w-[40rem] rtl:max-w-[44rem]">
          <h1 className="text-balance text-[clamp(2.6rem,7vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white rtl:tracking-normal">
            {copy.lead}
            <span className="text-gradient">{copy.accent}</span>
          </h1>
          <p className="mt-7 max-w-[17rem] text-base leading-8 text-slate-200 sm:max-w-[36rem] sm:text-lg">
            {copy.body}
          </p>
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <button
              ref={primaryCtaRef}
              type="button"
              onClick={onStartProject}
              className="hero-start-project premium-button premium-button-primary justify-center"
              data-motion-active={isPrimaryCtaActive}
            >
              <span>{copy.primary}</span>
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </button>
            <div className="flex max-w-full flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex min-h-11 items-center border-b border-white/30 text-sm font-semibold text-white transition-colors duration-200 hover:border-cyan-300 hover:text-cyan-200"
              >
                {copy.secondary}
              </a>
              <VisitorCounter
                accessibleLabel={copy.visitors}
                retryLabel={copy.visitorsRetry}
                unavailableLabel={copy.visitorsUnavailable}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
