import { motion } from "framer-motion";
import { Bot, BrainCircuit, ChartNoAxesCombined, Globe, Rocket, Workflow } from "lucide-react";
import { useLanguage } from "@/i18n/translations";
import { AnimatedServiceCard } from "@/components/landing/AnimatedServiceCard";

const icons = [Bot, Globe, Rocket, Workflow, BrainCircuit, ChartNoAxesCombined];

const extraServices = {
  en: [
    { title: "AI Agents", desc: "Focused AI assistants that can guide users, organize requests, and support smarter internal workflows.", features: ["Guided flows", "Task support", "Knowledge responses"], bestFor: "Teams that need intelligent assistance" },
    { title: "Dashboards & Admin Systems", desc: "Control panels for content, bookings, users, products, reports, and operational visibility.", features: ["Admin tools", "Analytics", "User management"], bestFor: "Businesses that need control and clarity" },
  ],
  ar: [
    { title: "وكلاء ذكاء اصطناعي", desc: "مساعدون أذكياء يوجهون المستخدمين، ينظمون الطلبات، ويدعمون سير العمل الداخلي.", features: ["تدفقات موجهة", "دعم المهام", "إجابات معرفية"], bestFor: "الفرق التي تحتاج مساعدة ذكية" },
    { title: "لوحات تحكم وأنظمة Admin", desc: "لوحات لإدارة المحتوى، الحجوزات، المستخدمين، المنتجات، التقارير، ومتابعة العمليات.", features: ["أدوات إدارة", "تحليلات", "إدارة مستخدمين"], bestFor: "الأعمال التي تحتاج تحكما ووضوحا" },
  ],
  es: [
    { title: "Agentes de IA", desc: "Asistentes inteligentes que guían usuarios, organizan solicitudes y apoyan flujos internos.", features: ["Flujos guiados", "Soporte de tareas", "Respuestas con conocimiento"], bestFor: "Equipos que necesitan asistencia inteligente" },
    { title: "Dashboards y Admin Systems", desc: "Paneles para contenido, reservas, usuarios, productos, reportes y visibilidad operativa.", features: ["Herramientas admin", "Analítica", "Gestión de usuarios"], bestFor: "Empresas que necesitan control y claridad" },
  ],
};

export function Services() {
  const { tr, language } = useLanguage();
  const services = [...tr.services.items, ...(extraServices[language as keyof typeof extraServices] || extraServices.en)];
  return (
    <section id="services" className="relative py-12 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--cyan)" }}>
            {tr.services.eyebrow}
          </div>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            {tr.services.titleA}<span className="text-gradient">{tr.services.titleB}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            {tr.services.subtitle}
          </p>
        </motion.div>

        <div className="-mx-5 mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {services.map((s: any, i: number) => {
            const Icon = icons[i];
            return (
            <AnimatedServiceCard
              key={s.title}
              title={s.title}
              desc={s.desc}
              features={s.features}
              bestFor={s.bestFor}
              bestForLabel={tr.services.bestFor}
              icon={Icon}
              index={i}
            />
          )})}
        </div>
      </div>
    </section>
  );
}
