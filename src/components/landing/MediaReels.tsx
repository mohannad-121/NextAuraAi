import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { VideoModal } from "@/components/landing/VideoModal";

export function MediaReels() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].media;
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#050817] py-24 sm:py-28 lg:py-40" dir={dir}>
      <div className="section-glow -left-44 bottom-10" />
      <div className="relative mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
          className="max-w-5xl"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((item, index) => (
            <motion.button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${copy.play}: ${item.title}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className={`group relative aspect-[9/14] overflow-hidden rounded-[1.8rem] text-start sm:aspect-[9/15] ${index === 1 ? "lg:mt-16" : ""}`}
            >
              <img
                src={item.poster}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-[1.055]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040d] via-[#02040d]/10 to-transparent" />
              <span className="absolute end-5 top-5 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-slate-300 backdrop-blur">
                {copy.placeholder}
              </span>
              <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/28 text-white backdrop-blur transition duration-300 group-hover:scale-110 group-hover:border-cyan-300/50">
                <Play className="ms-1 h-5 w-5 fill-current" />
              </span>
              <span className="absolute inset-x-0 bottom-0 block p-6 sm:p-7">
                <span className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                  {item.category}
                </span>
                <span className="mt-3 block text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  {item.title}
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      <VideoModal
        open={active !== null}
        onClose={() => setActive(null)}
        title={active === null ? "" : copy.items[active].title}
        closeLabel={copy.close}
        src="/videos/astronaut-hero.mp4"
      />
    </section>
  );
}
