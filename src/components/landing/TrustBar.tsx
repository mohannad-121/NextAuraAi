import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/translations";
import { homepageContent } from "@/i18n/homepageContent";

export function TrustBar() {
  const { language } = useLanguage();
  const items = homepageContent[language].trust;
  return (
    <section
      aria-label="NextAura at a glance"
      className="relative z-10 border-y border-white/8 bg-[#040817]/88"
    >
      <div className="mx-auto grid max-w-[96rem] grid-cols-2 px-5 sm:px-8 lg:grid-cols-5 lg:px-12">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className={`relative flex min-h-28 flex-col justify-center py-5 ${index % 2 ? "ps-5" : "pe-5"} sm:px-6 lg:min-h-32 lg:px-7 ${index < items.length - 1 ? "lg:border-e lg:border-white/8" : ""}`}
          >
            <div className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {item.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
