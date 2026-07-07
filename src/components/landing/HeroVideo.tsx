import { motion } from "framer-motion";

export function HeroVideo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -36, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[560px] animate-float"
    >
      <div className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_28%_30%,rgb(56_189_248_/_0.32),transparent_42%),radial-gradient(circle_at_78%_68%,rgb(124_58_237_/_0.30),transparent_44%)] blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-sky-300/20 bg-card/70 p-2 shadow-[0_26px_90px_rgb(2_6_23_/_0.72),0_0_70px_rgb(14_165_233_/_0.22),0_0_42px_rgb(124_58_237_/_0.18)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-x-10 top-0 z-10 h-px bg-gradient-to-r from-transparent via-cyan/80 to-transparent" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_22%_20%,rgb(56_189_248_/_0.20),transparent_36%),radial-gradient(circle_at_80%_74%,rgb(124_58_237_/_0.22),transparent_38%),linear-gradient(135deg,#020617,#070A16_48%,#111827)]">
          <video
            className="h-full w-full object-cover"
            src="/videos/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="NextAura AI product showcase"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgb(2_6_23_/_0.42)),radial-gradient(circle_at_50%_0%,rgb(255_255_255_/_0.10),transparent_34%)]" />
        </div>
      </div>
    </motion.div>
  );
}
