import { motion } from "framer-motion";
import { Bot, Boxes, Braces, MessageSquareMore, Route, TrendingUp } from "lucide-react";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";
import { SectionHeading } from "@/components/landing/SectionHeading";

const icons = [Route, Braces, Bot, Boxes, MessageSquareMore, TrendingUp];

export function WhyChoose() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].benefits;
  return (
    <section className="relative overflow-hidden bg-[#071022] py-24 sm:py-28 lg:py-36" dir={dir}>
      <div className="absolute inset-0 grid-fade opacity-25" />
      <div className="relative mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          align="center"
          className="max-w-4xl"
        />
        <div className="mt-14 grid border-y border-white/10 md:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group relative min-h-[260px] p-7 sm:p-9 ${index % 3 !== 2 ? "lg:border-e lg:border-white/10" : ""} ${index < 3 ? "border-b border-white/10" : "max-lg:border-b max-lg:border-white/10"}`}
              >
                <Icon className="h-7 w-7 text-cyan-300 transition-transform duration-500 group-hover:-translate-y-1" />
                <h3 className="mt-12 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
