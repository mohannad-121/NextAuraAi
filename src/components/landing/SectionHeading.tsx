import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-7xl">
        {title}
      </h2>
      {body ? (
        <p
          className={`mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg ${align === "center" ? "mx-auto" : ""}`}
        >
          {body}
        </p>
      ) : null}
    </motion.header>
  );
}
