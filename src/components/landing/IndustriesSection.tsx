import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/translations";
import { homepageContent } from "@/i18n/homepageContent";

export function IndustriesSection() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].industries;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[760px] items-center overflow-hidden py-24 lg:min-h-[88svh]"
      dir={dir}
    >
      <motion.img
        src="/images/cinematic/connected-industries.webp"
        alt={copy.imageAlt}
        loading="lazy"
        className="absolute -inset-y-24 h-[calc(100%+12rem)] w-full object-cover"
        style={{ y: imageY }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#020617_0%,rgb(2_6_23_/_0.38)_22%,rgb(2_6_23_/_0.62)_75%,#020617_100%),radial-gradient(circle_at_50%_44%,rgb(2_6_23_/_0.08),rgb(2_6_23_/_0.74)_80%)]" />
      <div className="relative mx-auto w-full max-w-[96rem] px-5 text-center sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-eyebrow justify-center"
        >
          {copy.eyebrow}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.8 }}
          className="mx-auto mt-5 max-w-5xl text-balance text-4xl font-semibold leading-[1] sm:text-6xl lg:text-8xl"
        >
          {copy.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
        >
          {copy.body}
        </motion.p>
        <div className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-2.5 sm:gap-3">
          {copy.items.map((industry, index) => (
            <motion.span
              key={industry}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 + index * 0.04 }}
              className="rounded-full border border-white/15 bg-black/25 px-4 py-2.5 text-sm text-slate-200 backdrop-blur-md sm:px-5"
            >
              {industry}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
