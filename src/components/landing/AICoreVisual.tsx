import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BrainCircuit, Cpu, Network } from "lucide-react";

type AICoreVisualProps = {
  progress?: MotionValue<number>;
  size?: "hero" | "story" | "compact";
  interactive?: boolean;
};

export function AICoreVisual({ progress, size = "hero", interactive = false }: AICoreVisualProps) {
  const localProgress = useMotionValue(0.25);
  const p = progress || localProgress;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 18 });
  const pointerRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const pointerRotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const scrollRotate = useTransform(p, [0, 1], [-18, 24]);
  const openGap = useTransform(p, [0, 0.45, 1], [0, 14, 28]);
  const innerScale = useTransform(p, [0, 0.5, 1], [0.88, 1.04, 0.96]);
  const shellOpacity = useTransform(p, [0, 0.45, 1], [0.55, 0.85, 0.4]);

  const dimensions =
    size === "compact"
      ? "h-56 w-56"
      : size === "story"
        ? "h-72 w-72 sm:h-96 sm:w-96"
        : "h-80 w-80 sm:h-[30rem] sm:w-[30rem]";

  return (
    <div
      className={`relative ${dimensions} perspective-hero`}
      onMouseMove={(event) => {
        if (!interactive) return;
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-35 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div className="absolute inset-8 rounded-full border border-primary/15 bg-primary/5 shadow-[inset_0_0_60px_rgb(56_189_248_/_0.08)]" />
      <motion.div
        className="absolute inset-[13%] transform-gpu preserve-3d"
        style={{
          rotateX: interactive ? pointerRotateX : 0,
          rotateY: interactive ? pointerRotateY : scrollRotate,
          rotateZ: scrollRotate,
          scale: innerScale,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-[2.25rem] border border-cyan/35 bg-card/50 shadow-[0_0_95px_rgb(56_189_248_/_0.24),0_0_62px_rgb(124_58_237_/_0.18),inset_0_0_36px_rgb(255_255_255_/_0.04)] backdrop-blur-2xl"
          style={{ opacity: shellOpacity }}
        />
        <motion.div
          className="absolute inset-x-4 top-4 h-[calc(50%-1rem)] rounded-t-[1.7rem] border border-primary/35 bg-background/70"
          style={{ y: useTransform(openGap, (v) => -v) }}
        />
        <motion.div
          className="absolute inset-x-4 bottom-4 h-[calc(50%-1rem)] rounded-b-[1.7rem] border border-accent/35 bg-background/70"
          style={{ y: openGap }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan/55 bg-background/90 shadow-[0_0_60px_rgb(56_189_248_/_0.36)] sm:h-28 sm:w-28"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          <BrainCircuit className="h-11 w-11 text-cyan sm:h-12 sm:w-12" />
        </motion.div>
        <motion.div
          className="absolute left-[18%] top-[18%] grid h-12 w-12 place-items-center rounded-2xl border border-border/70 bg-card/70"
          style={{
            x: useTransform(openGap, (v) => -v * 1.1),
            y: useTransform(openGap, (v) => -v * 0.7),
          }}
        >
          <Cpu className="h-5 w-5 text-cyan" />
        </motion.div>
        <motion.div
          className="absolute bottom-[18%] right-[18%] grid h-12 w-12 place-items-center rounded-2xl border border-border/70 bg-card/70"
          style={{
            x: useTransform(openGap, (v) => v * 1.1),
            y: useTransform(openGap, (v) => v * 0.7),
          }}
        >
          <Network className="h-5 w-5 text-cyan" />
        </motion.div>
      </motion.div>

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <motion.circle
          cx="200"
          cy="200"
          r="132"
          fill="none"
          stroke="url(#aiCoreStroke)"
          strokeWidth="1.2"
          strokeDasharray="9 14"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "center" }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="94"
          fill="none"
          stroke="url(#aiCoreStroke)"
          strokeWidth="1"
          strokeDasharray="5 12"
          animate={{ rotate: -360 }}
          style={{ transformOrigin: "center" }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
        <path
          d="M82 204 C126 112 276 96 322 190"
          fill="none"
          stroke="url(#aiCoreStroke)"
          strokeWidth="1.2"
          opacity="0.65"
        />
        <path
          d="M96 260 C150 328 272 326 326 236"
          fill="none"
          stroke="url(#aiCoreStroke)"
          strokeWidth="1.2"
          opacity="0.45"
        />
        <defs>
          <linearGradient id="aiCoreStroke" x1="0" x2="1">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
      </svg>

      {Array.from({ length: 7 }, (_, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan/70"
          style={{ left: `${17 + ((index * 23) % 68)}%`, top: `${13 + ((index * 31) % 70)}%` }}
          animate={{ opacity: [0.2, 0.85, 0.2], scale: [0.8, 1.35, 0.8] }}
          transition={{ duration: 4 + (index % 4), repeat: Infinity, delay: index * 0.12 }}
        />
      ))}
    </div>
  );
}
