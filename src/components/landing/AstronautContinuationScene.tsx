import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-viewport-activity";

const CONTINUATION_VIDEO_SRC = "/videos/moon-continuation.mp4";
export const CONTINUATION_PLAYBACK_RATE = 0.9;

function applyPlaybackRate(video: HTMLVideoElement) {
  video.defaultPlaybackRate = CONTINUATION_PLAYBACK_RATE;
  video.playbackRate = CONTINUATION_PLAYBACK_RATE;
}

export function AstronautContinuationScene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      applyPlaybackRate(video);
    }

    void video.play().catch(() => {
      // This muted decorative video may still be paused by device-level policy.
    });
  }, [prefersReducedMotion]);

  return (
    <section className="moon-continuation" aria-hidden="true">
      <video
        ref={videoRef}
        src={CONTINUATION_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        onLoadedMetadata={(event) => applyPlaybackRate(event.currentTarget)}
        className="moon-continuation-video"
      />
      <div className="moon-continuation-tone" />
    </section>
  );
}
