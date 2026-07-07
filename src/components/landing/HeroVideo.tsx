import { motion } from "framer-motion";

export function HeroVideo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -36, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[760px] animate-float"
    >
      <div className="absolute -inset-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_28%_30%,rgb(56_189_248_/_0.34),transparent_44%),radial-gradient(circle_at_78%_68%,rgb(124_58_237_/_0.32),transparent_46%)] blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-sky-300/20 bg-card/70 p-2.5 shadow-[0_34px_110px_rgb(2_6_23_/_0.76),0_0_86px_rgb(14_165_233_/_0.24),0_0_54px_rgb(124_58_237_/_0.20)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-x-12 top-0 z-10 h-px bg-gradient-to-r from-transparent via-cyan/80 to-transparent" />
        <div className="relative aspect-[16/11] overflow-hidden rounded-[1.45rem] border border-white/10 bg-[radial-gradient(circle_at_22%_20%,rgb(56_189_248_/_0.20),transparent_36%),radial-gradient(circle_at_80%_74%,rgb(124_58_237_/_0.22),transparent_38%),linear-gradient(135deg,#020617,#070A16_48%,#111827)] sm:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/10]">
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
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(2_6_23_/_0.10),transparent_28%,rgb(2_6_23_/_0.54)),radial-gradient(circle_at_50%_0%,rgb(255_255_255_/_0.12),transparent_34%)]" />
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 hidden items-center justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-xs text-white/75 backdrop-blur-xl sm:flex">
            <span className="font-semibold text-white">NextAura AI</span>
            <span>Websites • Chatbots • MVPs</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
