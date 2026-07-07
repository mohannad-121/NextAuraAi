import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  to: number;
  suffix?: string;
};

export function AnimatedCounter({ to, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useMotionValue(0);
  const spring = useSpring(value, { stiffness: 70, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) value.set(to);
  }, [inView, to, value]);

  useEffect(() => {
    return spring.on("change", (latest) => setDisplay(Math.round(latest)));
  }, [spring]);

  return (
    <motion.span ref={ref}>
      {display}{suffix}
    </motion.span>
  );
}
