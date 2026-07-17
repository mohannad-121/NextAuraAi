import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { usePrefersReducedMotion } from "@/hooks/use-viewport-activity";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

const processTones = ["cyan", "blue", "violet", "blend"] as const;
const processImages = [
  "/images/cinematic/Discover01-robot.png",
  "/images/cinematic/plan02-robot.png",
  "/images/cinematic/build03-robot.png",
  "/images/cinematic/launch04-robot.png",
] as const;

export function Process() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].process;
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // The fallback background remains visible if autoplay is blocked by the browser.
    });
  }, [prefersReducedMotion]);

  return (
    <section id="process" className="process-video-section homepage-section" dir={dir}>
      <video
        ref={videoRef}
        className="process-background-video"
        src="/videos/our-process.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        tabIndex={-1}
        aria-hidden="true"
      />
      <div className="process-video-overlay" aria-hidden="true" />

      <div className="homepage-container process-content">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} className="max-w-4xl" />

        <div className="process-step-grid" data-active-step={activeStep}>
          <div aria-hidden="true" className="process-step-line" />
          {copy.steps.map((step, index) => {
            const isActive = activeStep === index;
            const isDimmed = !isActive;

            return (
              <button
                key={step.title}
                type="button"
                className="process-step-card"
                data-active={isActive}
                data-dimmed={isDimmed}
                data-process-tone={processTones[index]}
                aria-pressed={isActive}
                onClick={() => setActiveStep(index)}
              >
                <img
                  className="process-step-image"
                  src={processImages[index]}
                  alt=""
                  aria-hidden="true"
                />
                <span className="process-step-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="process-step-title">{step.title}</span>
                <span className="process-step-description">{step.description}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
