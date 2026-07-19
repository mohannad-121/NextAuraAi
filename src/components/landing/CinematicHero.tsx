import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";
import { usePrefersReducedMotion, useViewportActivity } from "@/hooks/use-viewport-activity";
import { VisitorCounter } from "@/components/landing/VisitorCounter";

type CinematicHeroProps = { onStartProject: () => void };

const HERO_VIDEO_SRC = "/videos/astronaut-hero.mp4";
const HERO_POSTER_SRC = "/images/cinematic/hero-robot-poster.webp";
const MOBILE_VIDEO_DELAY_MS = 1_200;

type ConnectionWithSaveData = EventTarget & {
  saveData?: boolean;
};

function getConnection() {
  if (typeof navigator === "undefined") return undefined;

  return (navigator as Navigator & { connection?: ConnectionWithSaveData }).connection;
}

function hasDataSaverEnabled() {
  return Boolean(getConnection()?.saveData);
}

export function CinematicHero({ onStartProject }: CinematicHeroProps) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].hero;
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  // Start conservatively so a mobile browser never begins the large video request
  // before the media query effect has run.
  const [isMobile, setIsMobile] = useState(true);
  const [dataSaverEnabled, setDataSaverEnabled] = useState(hasDataSaverEnabled);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { targetRef: primaryCtaRef, isActive: isPrimaryCtaActive } =
    useViewportActivity<HTMLButtonElement>({ rootMargin: "96px 0px", threshold: 0.1 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const connection = getConnection();
    const update = () => setDataSaverEnabled(Boolean(connection?.saveData));

    update();
    connection?.addEventListener("change", update);
    return () => connection?.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry?.isIntersecting ?? false),
      { rootMargin: "0px", threshold: 0.2 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion && !dataSaverEnabled) return;

    videoRef.current?.pause();
    setShouldLoadVideo(false);
    setIsVideoPlaying(false);
  }, [dataSaverEnabled, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || dataSaverEnabled || !isHeroVisible || shouldLoadVideo) return;

    const loadVideo = () => setShouldLoadVideo(true);
    // Keep the established desktop idle behavior. Mobile users get a shorter,
    // controlled delay so the poster and Hero content have rendered first.
    const idle = isMobile
      ? window.setTimeout(loadVideo, MOBILE_VIDEO_DELAY_MS)
      : "requestIdleCallback" in window
        ? window.requestIdleCallback(loadVideo, { timeout: 3500 })
        : window.setTimeout(loadVideo, 1800);

    return () => {
      if (!isMobile && "cancelIdleCallback" in window) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, [dataSaverEnabled, isHeroVisible, isMobile, prefersReducedMotion, shouldLoadVideo]);

  const ensureMuted = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
  }, []);

  const requestPlayback = useCallback(() => {
    const video = videoRef.current;
    if (
      !video ||
      prefersReducedMotion ||
      dataSaverEnabled ||
      !shouldLoadVideo ||
      !isHeroVisible ||
      !isDocumentVisible
    ) {
      return;
    }

    ensureMuted();
    if (!video.paused) return;

    void video.play().catch(() => {
      // The poster remains visible when a browser rejects muted autoplay.
    });
  }, [
    dataSaverEnabled,
    ensureMuted,
    isDocumentVisible,
    isHeroVisible,
    prefersReducedMotion,
    shouldLoadVideo,
  ]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (
      prefersReducedMotion ||
      dataSaverEnabled ||
      !shouldLoadVideo ||
      !isHeroVisible ||
      !isDocumentVisible
    ) {
      video.pause();
      setIsVideoPlaying(false);
      return;
    }

    requestPlayback();
  }, [
    dataSaverEnabled,
    isDocumentVisible,
    isHeroVisible,
    prefersReducedMotion,
    requestPlayback,
    shouldLoadVideo,
  ]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="cinematic-hero relative flex min-h-[max(680px,100svh)] items-center overflow-hidden pb-20 pt-28 sm:min-h-[max(720px,100svh)] sm:pt-32"
      dir={dir}
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#071020]">
        <img
          src={HERO_POSTER_SRC}
          width={1280}
          height={720}
          fetchPriority="high"
          decoding="async"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          ref={videoRef}
          src={shouldLoadVideo ? HERO_VIDEO_SRC : undefined}
          autoPlay
          loop
          muted
          playsInline
          poster={HERO_POSTER_SRC}
          preload="none"
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
          onLoadedData={ensureMuted}
          onCanPlay={requestPlayback}
          onPlaying={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
          onError={() => setIsVideoPlaying(false)}
          className={`hero-video absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${isVideoPlaying ? "opacity-100" : "opacity-0"}`}
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
