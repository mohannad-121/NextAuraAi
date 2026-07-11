import { motion } from "framer-motion";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function ValuesSection() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].values;
  return (
    <section className="relative bg-[#050817] py-24 sm:py-28 lg:py-36" dir={dir}>
      <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} className="max-w-4xl" />
          <p className="max-w-xl text-base leading-8 text-slate-400 lg:justify-self-end">
            {copy.body}
          </p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/8 md:grid-cols-5">
          {copy.items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="min-h-[240px] bg-[#070c1b] p-6 sm:p-7"
            >
              <span className="font-mono text-xs text-cyan-300/70">0{index + 1}</span>
              <h3 className="mt-14 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
