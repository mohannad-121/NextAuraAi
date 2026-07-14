import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-viewport-activity";

type ViewportVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

export function ViewportVideo({ src, poster, className = "" }: ViewportVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [hasError, setHasError] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || prefersReducedMotion || shouldLoad) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        loadObserver.disconnect();
      },
      { rootMargin: "700px 0px", threshold: 0.01 },
    );

    loadObserver.observe(frame);
    return () => loadObserver.disconnect();
  }, [prefersReducedMotion, shouldLoad]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !shouldLoad || prefersReducedMotion) {
      setIsNearViewport(false);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const playbackObserver = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry?.isIntersecting ?? false),
      { rootMargin: "180px 0px", threshold: 0.08 },
    );

    playbackObserver.observe(frame);
    return () => playbackObserver.disconnect();
  }, [prefersReducedMotion, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion || !isNearViewport || hasError) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Muted autoplay can still be blocked by browser or device policy.
    });
  }, [hasError, isNearViewport, prefersReducedMotion]);

  return (
    <div
      ref={frameRef}
      className="ai-video-frame relative h-full min-h-0 overflow-hidden"
      data-video-loaded={shouldLoad && !hasError}
    >
      <video
        ref={videoRef}
        src={shouldLoad && !prefersReducedMotion && !hasError ? src : undefined}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        controls={false}
        disablePictureInPicture
        aria-hidden="true"
        className={`h-full w-full object-cover ${className}`}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
