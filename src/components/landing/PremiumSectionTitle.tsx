import { motion } from "framer-motion";

type PremiumSectionTitleProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
};

export function PremiumSectionTitle({ eyebrow, title, accent, subtitle, align = "center" }: PremiumSectionTitleProps) {
  const alignment = align === "center" ? "mx-auto text-center" : align === "right" ? "text-right" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${alignment}`}
    >
      <div className="text-xs uppercase tracking-[0.3em] text-cyan">{eyebrow}</div>
      <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
        {title}{accent ? <span className="text-gradient">{accent}</span> : null}
      </h2>
      {subtitle ? <p className="mt-4 leading-7 text-muted-foreground">{subtitle}</p> : null}
    </motion.div>
  );
}
