import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-viewport-activity";

type ViewportVideoProps = {
  src: string;
  className?: string;
  poster?: string;
  rootMargin?: string;
  disableOnMobile?: boolean;
};

export function ViewportVideo({
  src,
  className = "",
  poster,
  rootMargin = "160px 0px",
  disableOnMobile = true,
}: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  // Start conservatively so a mobile browser cannot begin a video request before
  // the media-query effect has established the device category.
  const [isMobile, setIsMobile] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(!(disableOnMobile && isMobile));
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNear = entry?.isIntersecting ?? false;
        setIsNearViewport(isNear);
        if (isNear && !(disableOnMobile && isMobile)) setShouldLoad(true);
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [disableOnMobile, isMobile, rootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion || isMobile || !isNearViewport || !shouldLoad) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Muted autoplay can still be blocked by browser or device policy.
    });
  }, [isMobile, isNearViewport, prefersReducedMotion, shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      loop
      muted
      playsInline
      poster={poster}
      preload="none"
      controls={false}
      disablePictureInPicture
      aria-hidden="true"
      className={`h-full w-full object-cover ${className}`}
      data-video-loaded={shouldLoad}
    />
  );
}
