import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-viewport-activity";

type ViewportVideoProps = {
  src: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
};

export function ViewportVideo({ src, className = "", preload = "none" }: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNear = entry?.isIntersecting ?? false;
        setIsNearViewport(isNear);
        if (isNear) setShouldLoad(true);
      },
      { rootMargin: "600px 0px", threshold: 0.01 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion || !isNearViewport) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Muted autoplay can still be blocked by browser or device policy.
    });
  }, [isNearViewport, prefersReducedMotion, shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      autoPlay
      loop
      muted
      playsInline
      preload={preload}
      controls={false}
      disablePictureInPicture
      aria-hidden="true"
      className={`h-full w-full object-cover ${className}`}
      data-video-loaded={shouldLoad}
    />
  );
}
