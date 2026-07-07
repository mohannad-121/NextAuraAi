import { motion } from "framer-motion";
import { Bot, Dumbbell, Store } from "lucide-react";
import { useLanguage } from "@/i18n/translations";

const icons = [Dumbbell, Store, Bot];

export function EarlyWork() {
  const { tr } = useLanguage();
  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--cyan)" }}>{tr.early.eyebrow}</div>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              {tr.early.titleA}<span className="text-gradient">{tr.early.titleB}</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            {tr.early.subtitle}
          </p>
        </div>
        <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-4">
          {tr.early.items.map((demo: any, index: number) => {
            const Icon = icons[index];
            return (
            <motion.div key={demo.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ y: -6 }} className="rounded-2xl glass glow-border p-5 md:p-6">
              <Icon className="h-7 w-7" style={{ color: "var(--cyan)" }} />
              <h3 className="mt-5 text-xl font-semibold">{demo.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{demo.text}</p>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
