import { motion } from "framer-motion";
import { CheckCircle2, Rocket, ShieldCheck } from "lucide-react";
import { useLanguage, type Language } from "@/i18n/translations";
import { ViewportVideo } from "@/components/landing/ViewportVideo";

type CinematicMediaSectionProps = {
  variant: "process" | "trust";
};

const copy = {
  process: {
    videoSrc: "/videos/process-video.mp4",
    eyebrow: {
      en: "From idea to launch",
      ar: "من الفكرة إلى الإطلاق",
      es: "De la idea al lanzamiento",
    },
    title: {
      en: "Start your project in minutes",
      ar: "ابدأ مشروعك خلال دقائق",
      es: "Inicia tu proyecto en minutos",
    },
    subtitle: {
      en: "Choose your service, select the features, and send your request. We handle the rest.",
      ar: "اختر الخدمة، حدد الميزات، وأرسل طلبك. نحن نتولى الباقي.",
      es: "Elige tu servicio, selecciona las funciones y envía tu solicitud. Nosotros nos encargamos del resto.",
    },
    points: {
      en: [
        "Click Start a Project",
        "Enter project information",
        "Choose features",
        "Select package",
        "Send request",
      ],
      ar: ["اضغط ابدأ مشروعك", "أدخل معلومات المشروع", "اختر الميزات", "حدد الباقة", "أرسل الطلب"],
      es: [
        "Haz clic en Iniciar proyecto",
        "Agrega la información",
        "Elige funciones",
        "Selecciona paquete",
        "Envía la solicitud",
      ],
    },
  },
  trust: {
    videoSrc: "/videos/trust-video.mp4",
    eyebrow: { en: "Delivery standard", ar: "معيار التسليم", es: "Estándar de entrega" },
    title: {
      en: "Built, verified, and ready to launch",
      ar: "مبني، مختبر، وجاهز للإطلاق",
      es: "Construido, verificado y listo para lanzar",
    },
    subtitle: {
      en: "We design, build, test, and launch digital products with secure and professional delivery.",
      ar: "نصمم ونبني ونختبر ونطلق المنتجات الرقمية بتسليم آمن واحترافي.",
      es: "Diseñamos, construimos, probamos y lanzamos productos digitales con entrega segura y profesional.",
    },
    points: {
      en: ["Professional product flow", "Quality testing", "Secure launch"],
      ar: ["تدفق منتج احترافي", "اختبار جودة", "إطلاق آمن"],
      es: ["Flujo profesional", "Pruebas de calidad", "Lanzamiento seguro"],
    },
  },
};

function textFor(values: Record<Language, string>, language: Language) {
  return values[language] || values.en;
}

export function CinematicMediaSection({ variant }: CinematicMediaSectionProps) {
  const { language, dir } = useLanguage();
  const section = copy[variant];
  const Icon = variant === "process" ? Rocket : ShieldCheck;

  return (
    <section className="relative overflow-hidden py-12 md:py-24" dir={dir}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgb(14_165_233_/_0.14),transparent_34%),radial-gradient(circle_at_82%_76%,rgb(124_58_237_/_0.16),transparent_38%)]" />
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl px-5 sm:px-6"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-sky-300/20 bg-card/45 p-2 shadow-[0_34px_120px_rgb(2_6_23_/_0.72),0_0_80px_rgb(14_165_233_/_0.18),0_0_56px_rgb(124_58_237_/_0.16)] backdrop-blur-2xl sm:p-3">
          <div className="pointer-events-none absolute inset-x-12 top-0 z-20 h-px bg-gradient-to-r from-transparent via-cyan/80 to-transparent" />
          <div className="relative min-h-[520px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_22%_22%,rgb(56_189_248_/_0.16),transparent_34%),radial-gradient(circle_at_82%_78%,rgb(124_58_237_/_0.18),transparent_38%),linear-gradient(135deg,#020617,#070A16_54%,#111827)] lg:min-h-[600px]">
            <ViewportVideo src={section.videoSrc} className="absolute inset-0" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(2_6_23_/_0.90),rgb(2_6_23_/_0.58)_42%,rgb(2_6_23_/_0.18)),linear-gradient(180deg,rgb(2_6_23_/_0.24),transparent_42%,rgb(2_6_23_/_0.68))] rtl:bg-[linear-gradient(270deg,rgb(2_6_23_/_0.90),rgb(2_6_23_/_0.58)_42%,rgb(2_6_23_/_0.18)),linear-gradient(180deg,rgb(2_6_23_/_0.24),transparent_42%,rgb(2_6_23_/_0.68))]" />
            <div
              className={`relative z-10 flex min-h-[520px] max-w-2xl flex-col justify-end p-6 sm:p-8 lg:min-h-[600px] lg:p-12 ${dir === "rtl" ? "mr-auto text-right" : "text-left"}`}
            >
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 backdrop-blur-xl">
                <Icon className="h-4 w-4 text-cyan" />
                {textFor(section.eyebrow, language)}
              </div>
              <h2 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                {textFor(section.title, language)}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                {textFor(section.subtitle, language)}
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {section.points[language].map((point) => (
                  <span
                    key={point}
                    className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-black/35 px-3 py-2 text-xs font-medium text-slate-200 backdrop-blur-xl"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan" />
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
