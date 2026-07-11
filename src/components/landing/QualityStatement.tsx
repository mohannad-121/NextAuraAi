import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

export function QualityStatement() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].quality;
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, margin: "250px" });

  return (
    <section
      ref={ref}
      className="relative min-h-[720px] overflow-hidden py-24 lg:min-h-[84svh]"
      dir={dir}
    >
      {visible ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(2_6_23_/_0.96),rgb(2_6_23_/_0.66)_60%,rgb(2_6_23_/_0.38)),linear-gradient(180deg,#020617_0%,transparent_28%,#020617_100%)] rtl:bg-[linear-gradient(270deg,rgb(2_6_23_/_0.96),rgb(2_6_23_/_0.66)_60%,rgb(2_6_23_/_0.38)),linear-gradient(180deg,#020617_0%,transparent_28%,#020617_100%)]" />
      <div className="relative mx-auto flex min-h-[540px] max-w-[96rem] items-center px-5 sm:px-8 lg:px-12">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow"
          >
            {copy.eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.8 }}
            className="mt-5 text-balance text-5xl font-semibold leading-[0.95] sm:text-7xl lg:text-9xl"
          >
            {copy.title}
          </motion.h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {copy.body}
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-7">
            {copy.words.map((word) => (
              <span key={word} className="text-sm uppercase tracking-[0.17em] text-slate-300">
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
