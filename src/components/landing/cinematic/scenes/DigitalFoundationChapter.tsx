import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

function RevealWord({
  word,
  index,
  count,
  progress,
  reduceMotion,
}: {
  word: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const start = (index / count) * 0.86;
  const end = Math.min(1, start + Math.max(0.07, 1.35 / count));
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(31, 33, 39, 0.16)", "rgba(25, 27, 32, 1)"],
  );
  return (
    <motion.span className="con-intro-word-reveal" style={reduceMotion ? undefined : { color }}>
      {word}{" "}
    </motion.span>
  );
}

export function DigitalFoundationChapter() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].about;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 78%", "end 42%"],
  });
  const words = copy.first.trim().split(/\s+/);

  return (
    <section ref={sectionRef} id="foundation" className="con-intro" dir={dir}>
      <div className="con-intro-content">
        <span className="con-section-label">{copy.eyebrow}</span>
        <h2 className="con-intro-reveal" aria-label={copy.first}>
          <span className="sr-only">{copy.first}</span>
          <span aria-hidden="true">
            {words.map((word, index) => (
              <RevealWord
                key={`${word}-${index}`}
                word={word}
                index={index}
                count={words.length}
                progress={scrollYProgress}
                reduceMotion={reduceMotion}
              />
            ))}
          </span>
        </h2>
        <p>{copy.second}</p>
        <a href="#services" className="con-inline-link">
          {homepageContent[language].nav.services}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
      <div className="con-intro-visual" aria-hidden="true">
        <span className="con-intro-word">NEXTAURA AI</span>
      </div>
    </section>
  );
}
