import { motion } from "framer-motion";
import { BrainCircuit, Gauge, Puzzle, Target } from "lucide-react";
import { useLanguage } from "@/i18n/translations";

const icons = [BrainCircuit, Puzzle, Gauge, Target];

export function WhyChoose() {
  const { tr } = useLanguage();
  return (
    <section className="section-light relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--cyan)" }}>{tr.why.eyebrow}</div>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            {tr.why.titleA}<span className="text-gradient">{tr.why.titleB}</span>
          </h2>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
          {tr.why.items.map((reason: any, index: number) => {
            const Icon = icons[index];
            return (
            <motion.div key={reason.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="light-card rounded-2xl p-5 md:p-6">
              <Icon className="h-7 w-7" style={{ color: "var(--cyan)" }} />
              <h3 className="mt-5 text-lg font-semibold">{reason.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{reason.text}</p>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
