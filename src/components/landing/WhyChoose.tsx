import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

type BenefitVisual = {
  image: string;
  accent: "violet" | "cyan" | "blue";
  imagePosition: string;
};

type CursorSide = "previous" | "next" | null;

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
  const [direction, setDirection] = useState<1 | -1>(1);
  const [cursorSide, setCursorSide] = useState<CursorSide>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const cards = copy.items.map((item, index) => ({
    item,
    index,
    visual: benefitVisuals[index],
  }));
  const activeCard = cards[selectedIndex] ?? cards[0];

  const selectCard = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= cards.length || nextIndex === selectedIndex) return;
    setDirection(nextIndex > selectedIndex ? 1 : -1);
    setSelectedIndex(nextIndex);
    setCursorSide(null);
  };

  const moveSelection = (nextDirection: 1 | -1) => {
    selectCard(selectedIndex + nextDirection);
  };

  const updateCursor = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const side = relativeX < rect.width / 2 ? "previous" : "next";
    const hasDestination =
      side === "previous" ? selectedIndex > 0 : selectedIndex < cards.length - 1;

    setCursorPosition({ x: relativeX, y: event.clientY - rect.top });
    setCursorSide(hasDestination ? side : null);
  };

  const handleCardClick = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && cursorSide) {
      moveSelection(cursorSide === "previous" ? -1 : 1);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    moveSelection(event.clientX - rect.left < rect.width / 2 ? -1 : 1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveSelection(dir === "rtl" ? 1 : -1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveSelection(dir === "rtl" ? -1 : 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectCard(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectCard(cards.length - 1);
    }
  };

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

          <div
            className="why-nextaura-gallery"
            role="region"
            aria-roledescription="carousel"
            aria-label={copy.title}
            tabIndex={0}
            onPointerMove={updateCursor}
            onPointerLeave={() => setCursorSide(null)}
            onPointerUp={handleCardClick}
            onKeyDown={handleKeyDown}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.article
                key={activeCard.index}
                custom={direction}
                className="why-nextaura-gallery-card"
                data-accent={activeCard.visual.accent}
                initial={shouldReduceMotion ? false : { x: `${direction * 100}%` }}
                animate={{ x: "0%" }}
                exit={shouldReduceMotion ? undefined : { x: `${direction * -100}%` }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.42, 0, 0.58, 1] }
                }
              >
                <img
                  className="why-nextaura-gallery-media"
                  src={activeCard.visual.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: activeCard.visual.imagePosition }}
                />
                <span className="why-nextaura-gallery-overlay" aria-hidden="true" />
                <span className="why-nextaura-gallery-inner">
                  <span className="why-nextaura-gallery-topline">
                    <span className="why-nextaura-gallery-number">
                      {String(activeCard.index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="why-nextaura-gallery-copy">
                    <span className="why-nextaura-gallery-title">{activeCard.item.title}</span>
                    <span className="why-nextaura-gallery-description">
                      {activeCard.item.description}
                    </span>
                    <span className="why-nextaura-gallery-status" aria-hidden="true">
                      <span />
                      {copy.activeLabel}
                    </span>
                  </span>
                </span>
              </motion.article>
            </AnimatePresence>

            {cursorSide ? (
              <span
                className="why-nextaura-gallery-cursor"
                aria-hidden="true"
                style={{ left: cursorPosition.x, top: cursorPosition.y }}
              >
                {cursorSide === "next" ? <ChevronRight /> : <ChevronLeft />}
              </span>
            ) : null}

            <div className="why-nextaura-gallery-dots" aria-label="Gallery navigation">
              {cards.map((card) => (
                <button
                  key={card.index}
                  type="button"
                  aria-label={`${card.item.title} (${card.index + 1} of ${cards.length})`}
                  aria-current={selectedIndex === card.index ? "true" : undefined}
                  data-active={selectedIndex === card.index ? "true" : "false"}
                  onPointerUp={(event) => event.stopPropagation()}
                  onClick={() => selectCard(card.index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
