import { Blocks, Route, Target, TrendingUp, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

type BenefitVisual = {
  icon: LucideIcon;
  image: string;
  accent: "violet" | "cyan" | "blue";
};

const benefitVisuals: BenefitVisual[] = [
  {
    icon: Target,
    image: "/images/cinematic/nextaura-sculpture.webp",
    accent: "violet",
  },
  {
    icon: Blocks,
    image: "/images/cinematic/business-automation.webp",
    accent: "cyan",
  },
  {
    icon: Route,
    image: "/images/cinematic/digital-commerce.webp",
    accent: "blue",
  },
  {
    icon: TrendingUp,
    image: "/images/cinematic/connected-industries.webp",
    accent: "violet",
  },
];

export function WhyChoose() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].benefits;
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex ?? focusedIndex ?? lockedIndex;

  return (
    <section className="why-nextaura homepage-section" dir={dir}>
      <div className="why-nextaura-backdrop" aria-hidden="true">
        <img
          className="why-nextaura-backdrop-image"
          src="/images/cinematic/nextaura-ai-hero.webp"
          alt=""
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        <div className="why-nextaura-backdrop-shade" />
        <div className="why-nextaura-atmosphere" />
      </div>

      <div className="homepage-container why-nextaura-layout">
        <div className="why-nextaura-content">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            body={copy.body}
            className="why-nextaura-heading"
          />

          <div className="why-nextaura-grid">
            {copy.items.map((item, index) => {
              const visual = benefitVisuals[index];
              const Icon = visual.icon;
              const isActive = activeIndex === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  className="why-nextaura-card"
                  data-active={isActive ? "true" : "false"}
                  data-accent={visual.accent}
                  aria-pressed={lockedIndex === index}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setHoveredIndex(index);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") setHoveredIndex(null);
                  }}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  onClick={() => setLockedIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key !== "Escape") return;
                    setLockedIndex(null);
                    setHoveredIndex(null);
                    setFocusedIndex(null);
                    event.currentTarget.blur();
                  }}
                >
                  <img
                    className="why-nextaura-card-media"
                    src={visual.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="why-nextaura-card-overlay" aria-hidden="true" />
                  <span className="why-nextaura-card-inner">
                    <span className="why-nextaura-card-topline">
                      <span className="why-nextaura-card-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <span className="why-nextaura-card-number" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>

                    <span className="why-nextaura-card-copy">
                      <span className="why-nextaura-card-title">{item.title}</span>
                      <span className="why-nextaura-card-description">{item.description}</span>
                      <span className="why-nextaura-card-status" aria-hidden="true">
                        <span className="why-nextaura-card-status-dot" />
                        {copy.activeLabel}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="why-nextaura-visual-space" aria-hidden="true">
          <span className="why-nextaura-orbit why-nextaura-orbit-one" />
          <span className="why-nextaura-orbit why-nextaura-orbit-two" />
          <span className="why-nextaura-visual-label">NEXT / AURA</span>
        </div>
      </div>
    </section>
  );
}
