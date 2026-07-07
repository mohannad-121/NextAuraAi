import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AnimatedServiceCardProps = {
  title: string;
  desc: string;
  features: string[];
  bestFor: string;
  bestForLabel: string;
  icon: LucideIcon;
  index: number;
};

export function AnimatedServiceCard({ title, desc, features, bestFor, bestForLabel, icon: Icon, index }: AnimatedServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, rotateX: 2, rotateY: index % 2 ? -3 : 3 }}
      className="group relative min-w-[86%] snap-center overflow-hidden rounded-2xl glass glow-border p-5 transform-gpu perspective-card sm:min-w-0 sm:p-6"
    >
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-50" style={{ background: "var(--gradient-primary)" }} />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent opacity-60" />
      <motion.div
        className="mb-5 grid h-14 w-14 place-items-center rounded-2xl"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon className="h-6 w-6 text-primary-foreground" />
      </motion.div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{desc}</p>
      <ul className="mt-5 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 shrink-0 text-cyan" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-xl border border-border/60 bg-background/45 p-3 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">{bestForLabel} </span>{bestFor}
      </div>
    </motion.div>
  );
}
