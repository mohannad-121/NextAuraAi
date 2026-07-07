import { motion, useScroll, useTransform } from "framer-motion";
import { Bot, BrainCircuit, ChartNoAxesCombined, Code2, LayoutDashboard, MonitorSmartphone, Workflow } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/i18n/translations";

const copy = {
  en: {
    eyebrow: "Interactive product reveal",
    title: "Digital products we build for you",
    subtitle: "Each service becomes a modular product layer: chatbot, website, workflow, dashboard, MVP, and AI logic.",
    modules: ["Chatbot bubble", "Website window", "Automation workflow", "Analytics dashboard", "MVP prototype", "AI neural core"],
  },
  ar: {
    eyebrow: "كشف تفاعلي للمنتجات",
    title: "منتجات رقمية نبنيها لك",
    subtitle: "كل خدمة تتحول إلى طبقة منتج: شات بوت، موقع، سير عمل، لوحة تحليلات، MVP، ومنطق ذكاء اصطناعي.",
    modules: ["فقاعة شات بوت", "نافذة موقع", "تدفق أتمتة", "لوحة تحليلات", "نموذج MVP", "نواة ذكاء اصطناعي"],
  },
  es: {
    eyebrow: "Reveal interactivo",
    title: "Productos digitales que creamos para ti",
    subtitle: "Cada servicio se convierte en una capa modular: chatbot, sitio, flujo, dashboard, MVP y lógica de IA.",
    modules: ["Burbuja chatbot", "Ventana web", "Automatización", "Dashboard analítico", "Prototipo MVP", "Núcleo IA"],
  },
};

const icons = [Bot, MonitorSmartphone, Workflow, ChartNoAxesCombined, Code2, BrainCircuit];
const positions = [
  ["-112%", "-62%"],
  ["0%", "-92%"],
  ["112%", "-58%"],
  ["-110%", "58%"],
  ["0%", "92%"],
  ["112%", "58%"],
];

export function ProductModulesShowcase() {
  const { language, dir } = useLanguage();
  const text = copy[language as keyof typeof copy] || copy.en;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  const coreScale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-18, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden py-14 md:py-28">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className={`mx-auto max-w-3xl text-center ${dir === "rtl" ? "rtl" : ""}`}>
          <div className="text-xs uppercase tracking-[0.3em] text-cyan">{text.eyebrow}</div>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">{text.title}</h2>
          <p className="mt-4 text-muted-foreground">{text.subtitle}</p>
        </div>

        <div className="relative mx-auto mt-10 h-[520px] max-w-4xl perspective-hero sm:h-[640px]">
          <motion.div
            className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] border border-primary/40 bg-card/70 shadow-[0_0_90px_oklch(0.58_0.24_315_/_0.34)] backdrop-blur-2xl sm:h-56 sm:w-56"
            style={{ scale: coreScale, rotate }}
          >
            <div className="absolute inset-5 rounded-[1.5rem] border border-cyan/30" />
            <BrainCircuit className="h-16 w-16 text-cyan sm:h-20 sm:w-20" />
          </motion.div>

          {text.modules.map((module, index) => {
            const Icon = icons[index];
            const [x, y] = positions[index];
            const moduleX = useTransform(scrollYProgress, [0, 1], ["-50%", `calc(-50% + ${x})`]);
            const moduleY = useTransform(scrollYProgress, [0, 1], ["-50%", `calc(-50% + ${y})`]);
            return (
              <motion.div
                key={module}
                className="absolute left-1/2 top-1/2 w-[11rem] rounded-2xl border border-border/70 bg-background/70 p-4 shadow-2xl backdrop-blur-xl sm:w-[13rem]"
                style={{ x: moduleX, y: moduleY }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
                  <Icon className="h-5 w-5 text-background" />
                </div>
                <div className="text-sm font-semibold">{module}</div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-card">
                  <motion.div className="h-full rounded-full" style={{ background: "var(--gradient-primary)" }} initial={{ width: "22%" }} whileInView={{ width: `${62 + index * 6}%` }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
