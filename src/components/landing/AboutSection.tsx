import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/i18n/translations";
import { homepageContent } from "@/i18n/homepageContent";

export function AboutSection() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].about;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-28, 28]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-[#050817] py-24 sm:py-28 lg:py-40"
      dir={dir}
    >
      <div className="mx-auto grid max-w-[96rem] gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(8% 8% 8% 8%)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] lg:aspect-[4/5]"
        >
          <motion.img
            src="/images/cinematic/nextaura-sculpture.webp"
            alt={copy.imageAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ y: imageY, scale: imageScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050817] via-transparent to-transparent" />
          <div className="absolute inset-x-6 bottom-6 flex items-center justify-between border-t border-white/15 pt-4 text-xs uppercase tracking-[0.2em] text-slate-400">
            <span>NextAura AI</span>
            <span>Jordan • UAE</span>
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow"
          >
            {copy.eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="mt-5 text-balance text-4xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            {copy.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="mt-8 text-lg leading-9 text-slate-200"
          >
            {copy.first}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mt-5 text-base leading-8 text-slate-400"
          >
            {copy.second}
          </motion.p>
          <div className="mt-9 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {copy.highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: dir === "rtl" ? 16 : -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 + index * 0.04 }}
                className="flex items-center gap-3 text-sm text-slate-200"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cyan-400/25 bg-cyan-400/8 text-cyan-300">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
