import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

type BenefitVisual = {
  image: string;
  accent: "violet" | "cyan" | "blue";
  imagePosition: string;
};

const benefitVisuals: BenefitVisual[] = [
  {
    image: "/images/cinematic/business01.png",
    accent: "violet",
    imagePosition: "center",
  },
  {
    image: "/images/cinematic/WAA.png",
    accent: "cyan",
    imagePosition: "center 46%",
  },
  {
    image: "/images/cinematic/CDC.png",
    accent: "blue",
    imagePosition: "center 42%",
  },
  {
    image: "/images/cinematic/LSG.png",
    accent: "violet",
    imagePosition: "center",
  },
];

export function WhyChoose() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].benefits;
  const shouldReduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const cards = copy.items.map((item, index) => ({
    item,
    index,
    visual: benefitVisuals[index],
  }));
  const selectedCard = cards[selectedIndex] ?? cards[0];
  const orderedCards = selectedCard
    ? [selectedCard, ...cards.filter((card) => card.index !== selectedCard.index)]
    : cards;

  return (
    <section className="why-nextaura homepage-section" dir={dir}>
      <div className="why-nextaura-backdrop" aria-hidden="true">
        <img
          className="why-nextaura-backdrop-image"
          src="/images/cinematic/astro-moon-phone.png"
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

          <div className="why-nextaura-grid" data-selected-index={selectedIndex}>
            {orderedCards.map(({ item, index, visual }, displayPosition) => {
              const isSelected = selectedIndex === index;
              const isPreviewed = previewIndex === index && !isSelected;

              return (
                <motion.button
                  layout={!shouldReduceMotion}
                  transition={{
                    layout: shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                  }}
                  key={index}
                  type="button"
                  className="why-nextaura-card"
                  data-active={isSelected ? "true" : "false"}
                  data-preview={isPreviewed ? "true" : "false"}
                  data-card-index={index}
                  data-position={displayPosition}
                  data-accent={visual.accent}
                  aria-pressed={isSelected}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setPreviewIndex(index);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") setPreviewIndex(null);
                  }}
                  onFocus={() => setPreviewIndex(index)}
                  onBlur={() => setPreviewIndex(null)}
                  onClick={() => setSelectedIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key !== "Escape") return;
                    setSelectedIndex(0);
                    setPreviewIndex(null);
                    event.currentTarget.blur();
                  }}
                >
                  <img
                    className="why-nextaura-card-media"
                    src={visual.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: visual.imagePosition }}
                  />
                  <span className="why-nextaura-card-overlay" aria-hidden="true" />
                  <span className="why-nextaura-card-inner">
                    <span className="why-nextaura-card-topline">
                      <span className="why-nextaura-card-number">
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
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
