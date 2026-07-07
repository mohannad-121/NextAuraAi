import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Bot, Code2, Database, Network, Sparkles, Workflow } from "lucide-react";
import { useRef } from "react";

const nodes = [
  { icon: Bot, label: "Chatbot", x: "7%", y: "22%" },
  { icon: Code2, label: "MVP", x: "74%", y: "15%" },
  { icon: Workflow, label: "Flow", x: "79%", y: "69%" },
  { icon: Database, label: "Data", x: "10%", y: "72%" },
];

export function Hero3DVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 18 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-13, 13]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const coreScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.08, 0.94]);
  const coreY = useTransform(scrollYProgress, [0, 1], [32, -36]);

  return (
    <div
      ref={ref}
      className="relative h-[360px] w-full max-w-[520px] perspective-hero sm:h-[500px]"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <div className="absolute inset-0 rounded-full opacity-40 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
      <div className="absolute inset-8 rounded-full border border-primary/20 bg-primary/5 blur-sm" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 transform-gpu preserve-3d sm:h-72 sm:w-72"
        style={{ rotateX, rotateY, scale: coreScale, y: coreY }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-[2.25rem] border border-cyan/35 bg-card/50 shadow-[0_0_80px_rgb(56_189_248_/_0.28),0_0_54px_rgb(124_58_237_/_0.2)] backdrop-blur-xl" />
        <div className="absolute inset-7 rounded-[1.75rem] border border-primary/35 bg-background/60" />
        <div className="absolute inset-14 rounded-[1.25rem] border border-accent/45 bg-primary/15" />
        <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan/50 bg-background/85 shadow-[0_0_50px_rgb(56_189_248_/_0.34)]">
          <Network className="h-9 w-9 text-cyan" />
        </div>
      </motion.div>

      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-60" viewBox="0 0 520 500" aria-hidden="true">
        <path d="M110 145 C190 60 330 70 410 135" fill="none" stroke="url(#heroLine)" strokeWidth="1.5" />
        <path d="M105 355 C210 435 335 430 425 345" fill="none" stroke="url(#heroLine)" strokeWidth="1.5" />
        <path d="M96 145 C70 250 82 315 112 356" fill="none" stroke="url(#heroLine)" strokeWidth="1.5" />
        <path d="M415 135 C452 230 456 285 424 346" fill="none" stroke="url(#heroLine)" strokeWidth="1.5" />
        <defs>
          <linearGradient id="heroLine" x1="0" x2="1">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
      </svg>

      {nodes.map((node, index) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.label}
            className="absolute rounded-2xl border border-border/60 bg-card/72 px-3 py-2 shadow-2xl backdrop-blur-xl sm:px-4 sm:py-3"
            style={{ left: node.x, top: node.y }}
            animate={{ y: [0, -12, 0], rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 4.5 + index * 0.35, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
              <Icon className="h-4 w-4 text-cyan" />
              <span>{node.label}</span>
            </div>
          </motion.div>
        );
      })}

      {Array.from({ length: 18 }, (_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan/70"
          style={{ left: `${8 + ((i * 29) % 84)}%`, top: `${10 + ((i * 17) % 78)}%` }}
          animate={{ opacity: [0.15, 0.8, 0.15], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 3.4 + (i % 5), repeat: Infinity, delay: i * 0.12 }}
        />
      ))}

      <motion.div
        className="absolute bottom-4 left-1/2 flex w-[88%] -translate-x-1/2 items-center gap-3 rounded-2xl glass p-3 shadow-2xl sm:bottom-8 sm:w-[76%] sm:p-4"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Sparkles className="h-5 w-5 text-cyan" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Product readiness</span>
            <span className="font-semibold text-gradient">82%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-background/70">
            <motion.div className="h-full rounded-full" style={{ background: "var(--gradient-primary)" }} initial={{ width: "20%" }} animate={{ width: "82%" }} transition={{ duration: 1.4, delay: 0.8 }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
