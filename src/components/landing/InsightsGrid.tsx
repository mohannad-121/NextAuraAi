import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function InsightsGrid() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].insights;
  const closeLabel = homepageContent[language].nav.close;
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active === null) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActive(null);
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="insights" className="relative overflow-hidden py-24 sm:py-28 lg:py-40" dir={dir}>
      <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
          className="max-w-5xl"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {copy.items.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ delay: index * 0.06 }}
              className="group flex min-h-[510px] flex-col overflow-hidden rounded-[1.5rem] bg-[#071022]"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={article.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071022] to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                  {article.category}
                </div>
                <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
                  {article.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{article.excerpt}</p>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className="mt-auto flex items-center justify-between border-t border-white/10 pt-5 text-sm font-semibold text-slate-200"
                >
                  {copy.read}
                  <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-[#02040d]/88 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => event.target === event.currentTarget && setActive(null)}
          >
            <motion.article
              role="dialog"
              aria-modal="true"
              aria-labelledby="insight-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#071022] shadow-2xl"
            >
              <img
                src={copy.items[active].image}
                alt=""
                className="h-64 w-full object-cover sm:h-80"
              />
              <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-t from-[#071022] to-transparent sm:h-80" />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setActive(null)}
                aria-label={closeLabel}
                className="absolute end-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative p-7 sm:p-10">
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                  {copy.items[active].category}
                </div>
                <h2
                  id="insight-title"
                  className="mt-4 text-3xl font-semibold text-white sm:text-5xl"
                >
                  {copy.items[active].title}
                </h2>
                <p className="mt-6 text-base leading-8 text-slate-300">
                  {copy.items[active].excerpt}
                </p>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
