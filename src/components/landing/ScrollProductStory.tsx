import { motion, useScroll, useTransform } from "framer-motion";
import { Bot, BrainCircuit, ChartNoAxesCombined, Code2, MonitorSmartphone, Workflow } from "lucide-react";
import { useRef } from "react";
import { AICoreVisual } from "@/components/landing/AICoreVisual";
import { ProductModule } from "@/components/landing/ProductModule";
import { PremiumSectionTitle } from "@/components/landing/PremiumSectionTitle";
import { useLanguage } from "@/i18n/translations";

const storyCopy = {
  en: {
    eyebrow: "Product reveal",
    title: "From idea to product",
    subtitle: "One AI core, six product layers. As we build, each capability separates from the core and becomes a usable digital product.",
    modules: [
      ["AI Chatbot", "A guided assistant for support, FAQs, and lead capture."],
      ["Website Platform", "A fast, premium website or web platform around your business."],
      ["MVP Prototype", "A testable product version for founders and new ideas."],
      ["Automation Workflow", "Connected forms, CRM flows, notifications, and repeated processes."],
      ["AI Agent", "A focused assistant that handles requests and guides users."],
      ["Analytics Dashboard", "Admin views, progress, reports, and operational clarity."],
    ],
  },
  ar: {
    eyebrow: "كشف المنتج",
    title: "من الفكرة إلى المنتج",
    subtitle: "نواة ذكاء واحدة، وست طبقات منتج. مع البناء، تنفصل كل قدرة من النواة وتتحول إلى منتج رقمي قابل للاستخدام.",
    modules: [
      ["AI Chatbot", "مساعد ذكي للدعم، الأسئلة الشائعة، وجمع العملاء المحتملين."],
      ["Website Platform", "موقع أو منصة ويب سريعة وفاخرة حول أهداف عملك."],
      ["MVP Prototype", "نسخة منتج قابلة للتجربة للمؤسسين والأفكار الجديدة."],
      ["Automation Workflow", "نماذج، CRM، إشعارات، وعمليات متكررة مرتبطة ببعضها."],
      ["AI Agent", "مساعد مركز يتعامل مع الطلبات ويرشد المستخدمين."],
      ["Analytics Dashboard", "لوحات إدارة، تقدم، تقارير، ووضوح تشغيلي."],
    ],
  },
  es: {
    eyebrow: "Reveal de producto",
    title: "De la idea al producto",
    subtitle: "Un núcleo de IA, seis capas de producto. Cada capacidad se separa del núcleo y se convierte en un producto digital usable.",
    modules: [
      ["AI Chatbot", "Un asistente guiado para soporte, FAQs y captación de leads."],
      ["Website Platform", "Un sitio o plataforma web rápida y premium para tu negocio."],
      ["MVP Prototype", "Una versión testeable para fundadores e ideas nuevas."],
      ["Automation Workflow", "Formularios, CRM, notificaciones y procesos conectados."],
      ["AI Agent", "Un asistente enfocado para solicitudes y guía de usuarios."],
      ["Analytics Dashboard", "Admin, progreso, reportes y claridad operativa."],
    ],
  },
};

const icons = [Bot, MonitorSmartphone, Code2, Workflow, BrainCircuit, ChartNoAxesCombined];
const variants = ["typing", "slide", "expand", "connect", "rotate", "analytics"] as const;

export function ScrollProductStory() {
  const { language, dir } = useLanguage();
  const text = storyCopy[language as keyof typeof storyCopy] || storyCopy.en;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const sceneScale = useTransform(scrollYProgress, [0, 0.22, 0.72, 1], [0.92, 1, 1.05, 0.94]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const connectorHeight = useTransform(scrollYProgress, [0.12, 0.92], ["8%", "88%"]);

  return (
    <section id="services" ref={ref} className="section-light relative overflow-hidden py-16 md:py-28">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <PremiumSectionTitle
          eyebrow={text.eyebrow}
          title={text.title}
          subtitle={text.subtitle}
          align={dir === "rtl" ? "right" : "left"}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="relative lg:sticky lg:top-28">
            <motion.div style={{ scale: sceneScale, y: sceneY }} className="mx-auto flex justify-center">
              <AICoreVisual progress={scrollYProgress} size="story" />
            </motion.div>
          </div>

          <div className="relative space-y-5 lg:space-y-6">
            <motion.div className={`absolute top-8 hidden w-px bg-gradient-to-b from-cyan via-primary to-accent opacity-70 lg:block ${dir === "rtl" ? "right-[-1.5rem]" : "left-[-1.5rem]"}`} style={{ height: connectorHeight }} />
            {text.modules.map(([title, description], index) => {
              const Icon = icons[index];
              return (
                <ProductModule
                  key={title}
                  title={title}
                  description={description}
                  icon={Icon}
                  index={index}
                  active
                  variant={variants[index]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
