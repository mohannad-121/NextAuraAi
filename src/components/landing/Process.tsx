import { motion } from "framer-motion";
import { Compass, Figma, Rocket, Wrench } from "lucide-react";
import { useLanguage } from "@/i18n/translations";

const icons = [Compass, Figma, Wrench, Rocket];

export function Process() {
  const { tr } = useLanguage();
  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--cyan)" }}>{tr.process.eyebrow}</div>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            {tr.process.titleA}<span className="text-gradient">{tr.process.titleB}</span>
          </h2>
        </motion.div>

        <div className="relative mt-8 grid gap-3 md:mt-10 md:grid-cols-4 md:gap-4">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-border/70 max-md:block" />
          {tr.process.steps.map((step: any, index: number) => {
            const Icon = icons[index];
            return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative rounded-2xl glass p-4 md:p-6"
            >
              <div className="mb-4 flex items-center gap-4 md:mb-5">
                <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: "var(--gradient-primary)" }}>
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-mono text-sm text-muted-foreground">0{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
