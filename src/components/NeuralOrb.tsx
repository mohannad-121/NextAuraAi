import { motion } from "framer-motion";

export function NeuralOrb() {
  const nodes = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const r = 130 + (i % 3) * 30;
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r, i };
  });

  return (
    <div className="relative h-[300px] w-[300px] max-w-full sm:h-[420px] sm:w-[420px]">
      {/* glow */}
      <div className="absolute inset-0 rounded-full blur-3xl opacity-60"
           style={{ background: "var(--gradient-glow)" }} />

      {/* rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg viewBox="-220 -220 440 440" className="h-full w-full">
          {nodes.map((n) =>
            nodes
              .filter((m) => m.i > n.i && Math.hypot(n.x - m.x, n.y - m.y) < 180)
              .map((m) => (
                <line
                  key={`${n.i}-${m.i}`}
                  x1={n.x} y1={n.y} x2={m.x} y2={m.y}
                  stroke="url(#g)"
                  strokeWidth="0.6"
                  opacity="0.4"
                />
              ))
          )}
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4C1D95" />
              <stop offset="52%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <radialGradient id="node" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#38BDF8" />
            </radialGradient>
          </defs>
          {nodes.map((n) => (
            <circle key={n.i} cx={n.x} cy={n.y} r={4 + (n.i % 3)} fill="url(#node)" />
          ))}
        </svg>
      </motion.div>

      {/* counter ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 rounded-full border border-cyan/30"
        style={{ borderColor: "rgb(56 189 248 / 0.3)" }}
      />

      {/* core */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-24 sm:w-24"
        style={{
          background: "var(--gradient-primary)",
          boxShadow: "0 0 80px rgb(56 189 248 / 0.52), 0 0 50px rgb(124 58 237 / 0.4), inset 0 0 30px rgb(224 242 254 / 0.22)",
        }}
      />
    </div>
  );
}
