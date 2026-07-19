import { ViewportVideo } from "@/components/landing/ViewportVideo";

export function SpaceSectionBackdrop() {
  return (
    <div className="space-section-media" aria-hidden="true">
      <ViewportVideo
        src="/videos/foundation-services-stars.web.mp4"
        className="space-section-video"
      />
      <div className="space-section-video-overlay" />
    </div>
  );
}
