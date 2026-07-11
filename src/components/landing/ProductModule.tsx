import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type ProductModuleProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  active?: boolean;
  variant: "slide" | "rotate" | "expand" | "connect" | "typing" | "analytics";
};

export function ProductModule({
  title,
  description,
  icon: Icon,
  index,
  active = false,
  variant,
}: ProductModuleProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, rotateX: 7 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: false, amount: 0.55 }}
      transition={{ duration: 0.68, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
      className={`relative min-h-[18rem] overflow-hidden rounded-3xl border p-5 backdrop-blur-xl transition-all sm:p-6 ${
        active
          ? "border-cyan/50 bg-card/68 shadow-[0_24px_70px_rgb(2_6_23_/_0.48),0_0_34px_rgb(56_189_248_/_0.18)]"
          : "border-border/60 bg-card/42"
      }`}
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent" />
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
      <div className="mb-5 flex items-center justify-between">
        <div
          className="grid h-13 w-13 place-items-center rounded-2xl shadow-[0_0_30px_rgb(56_189_248_/_0.22)]"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Icon className="h-6 w-6 text-background" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
      </div>
      <h3 className="text-xl font-semibold leading-tight">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>

      <div className="mt-6 h-24 rounded-2xl border border-border/50 bg-background/45 p-4">
        {variant === "typing" ? (
          <div className="space-y-3">
            <div className="h-2 w-2/3 rounded-full bg-cyan/70" />
            <motion.div
              className="h-2 rounded-full bg-primary/70"
              initial={{ width: "24%" }}
              whileInView={{ width: "88%" }}
              viewport={{ once: false }}
              transition={{ duration: 1.2 }}
            />
            <div className="h-2 w-1/2 rounded-full bg-accent/60" />
          </div>
        ) : variant === "analytics" ? (
          <div className="flex h-full items-end gap-2">
            {[36, 62, 48, 82].map((height, i) => (
              <motion.div
                key={height}
                className="flex-1 rounded-md"
                style={{ background: "var(--gradient-primary)" }}
                initial={{ height: "18%" }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.08 }}
              />
            ))}
          </div>
        ) : variant === "connect" ? (
          <svg className="h-full w-full" viewBox="0 0 220 80" aria-hidden="true">
            <path
              d="M20 40 H78 C96 40 94 18 112 18 H196"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 8"
            />
            <path
              d="M20 40 H78 C96 40 94 62 112 62 H196"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 8"
            />
            {[20, 78, 112, 196].map((cx) => (
              <circle key={cx} cx={cx} cy={cx === 112 ? 18 : 40} r="4.5" fill="#FFFFFF" />
            ))}
          </svg>
        ) : (
          <motion.div
            className="h-full rounded-lg border border-primary/20 bg-primary/10"
            initial={{
              scaleX: variant === "expand" ? 0.35 : 0.74,
              rotate: variant === "rotate" ? -5 : 0,
              x: variant === "slide" ? -18 : 0,
            }}
            whileInView={{ scaleX: 1, rotate: 0, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
          />
        )}
      </div>
    </motion.article>
  );
}
