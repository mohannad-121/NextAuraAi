import { localize, siteKnowledge, type SupportedLanguage } from "@/data/siteKnowledge";

type ChatbotCopy = {
  welcome: string;
  fallback: string;
  suggestions: string[];
  placeholders: {
    input: string;
    typing: string;
    send: string;
  };
};

export const chatbotCopy: Record<SupportedLanguage, ChatbotCopy> = {
  en: {
    welcome: "Hi! I'm the NextAura Assistant. You can ask me about our services, team, pricing, FitCoach AI, or how to start your project.",
    fallback: "I can answer based on the information currently available on our website. If you want more details, please contact us directly.",
    suggestions: [
      "What does NextAura AI do?",
      "Who is Mohannad?",
      "Who is Moayad?",
      "Tell me about FitCoach AI",
      "What services do you offer?",
      "What are your price ranges?",
      "How do I start a project?",
      "What is included in a basic website?",
      "Do you build admin dashboards?",
      "Can you build AI chatbots?",
    ],
    placeholders: { input: "Ask about services, pricing, team...", typing: "NextAura Assistant is typing", send: "Send" },
  },
  ar: {
    welcome: "مرحبا! أنا مساعد NextAura. يمكنك سؤالي عن خدماتنا، فريقنا، الأسعار، مشروع FitCoach AI، أو كيفية بدء مشروعك.",
    fallback: "أستطيع الإجابة بناء على المعلومات الموجودة حاليا في الموقع. إذا كنت تريد تفاصيل أكثر، تواصل معنا مباشرة.",
    suggestions: [
      "شو بتعمل NextAura AI؟",
      "مين مهند؟",
      "مين مؤيد؟",
      "احكيلي عن FitCoach AI",
      "شو الخدمات اللي بتقدموها؟",
      "كم أسعاركم؟",
      "كيف أبدأ مشروعي؟",
      "شو يشمل الموقع الأساسي؟",
      "هل بتعملوا Admin Dashboard؟",
      "هل بتبنوا شات بوتات؟",
    ],
    placeholders: { input: "اسأل عن الخدمات، الأسعار، الفريق...", typing: "مساعد NextAura يكتب", send: "إرسال" },
  },
  es: {
    welcome: "¡Hola! Soy el asistente de NextAura. Puedes preguntarme sobre nuestros servicios, equipo, precios, FitCoach AI o cómo empezar tu proyecto.",
    fallback: "Puedo responder según la información disponible actualmente en el sitio web. Si deseas más detalles, contáctanos directamente.",
    suggestions: [
      "¿Qué hace NextAura AI?",
      "¿Quién es Mohannad?",
      "¿Quién es Moayad?",
      "Háblame de FitCoach AI",
      "¿Qué servicios ofrecen?",
      "¿Cuáles son sus precios?",
      "¿Cómo empiezo mi proyecto?",
      "¿Incluyen panel de administración?",
      "¿Construyen chatbots con IA?",
    ],
    placeholders: { input: "Pregunta sobre servicios, precios, equipo...", typing: "NextAura Assistant está escribiendo", send: "Enviar" },
  },
};

const includesAny = (text: string, keywords: string[]) => keywords.some((keyword) => text.includes(keyword));

function normalize(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[؟?¿!¡.,:;]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function list(items: string[], language: SupportedLanguage) {
  const marker = language === "ar" ? "• " : "- ";
  return items.map((item) => `${marker}${item}`).join("\n");
}

function companyResponse(language: SupportedLanguage) {
  const company = siteKnowledge.company;
  const lines = [
    localize(company.description, language),
    localize(company.mission, language),
  ];
  return lines.join("\n\n");
}

function servicesResponse(language: SupportedLanguage) {
  const intro = {
    en: "We offer four core service areas:",
    ar: "نقدم أربع خدمات رئيسية:",
    es: "Ofrecemos cuatro áreas principales:",
  }[language];
  const services = siteKnowledge.services.map((service) => `${localize(service.name, language)}: ${localize(service.description, language)}`);
  return `${intro}\n${list(services, language)}`;
}

function pricingResponse(language: SupportedLanguage) {
  const intro = {
    en: "Our current estimated price ranges are:",
    ar: "نطاقات الأسعار التقديرية الحالية هي:",
    es: "Nuestros rangos estimados actuales son:",
  }[language];
  const packages = siteKnowledge.pricing.packages.map((pkg) => `${localize(pkg.name, language)} (${pkg.price}): ${localize(pkg.description, language)}`);
  return `${intro}\n${list(packages, language)}\n\n${localize(siteKnowledge.pricing.disclaimer, language)}`;
}

function packageResponse(language: SupportedLanguage) {
  const pkg = siteKnowledge.pricing.packages[0];
  const heading = {
    en: "The Basic Website package includes:",
    ar: "باقة الموقع الأساسي تشمل:",
    es: "El paquete de sitio web básico incluye:",
  }[language];
  return `${heading}\n${list(pkg.includes.map((item) => localize(item, language)), language)}\n\n${pkg.price} - ${localize(pkg.description, language)}`;
}

function fitCoachResponse(language: SupportedLanguage) {
  const caseStudy = siteKnowledge.caseStudies[0];
  const featuresIntro = {
    en: "Key parts include:",
    ar: "أهم الأجزاء تشمل:",
    es: "Partes clave:",
  }[language];
  return `${localize(caseStudy.summary, language)}\n\n${featuresIntro}\n${list(caseStudy.features.map((feature) => localize(feature, language)), language)}`;
}

function memberResponse(id: "mohannad" | "moayad", language: SupportedLanguage) {
  const member = siteKnowledge.team.find((person) => person.id === id);
  if (!member) return chatbotCopy[language].fallback;
  const responsibilitiesIntro = {
    en: "Responsibilities:",
    ar: "المسؤوليات:",
    es: "Responsabilidades:",
  }[language];
  return `${member.name} - ${member.role}\n${localize(member.bio, language)}\n\n${responsibilitiesIntro}\n${list(member.responsibilities.map((item) => localize(item, language)), language)}`;
}

function teamResponse(language: SupportedLanguage) {
  const intro = {
    en: "The current website lists two founders:",
    ar: "الموقع الحالي يعرض مؤسسين اثنين:",
    es: "El sitio actual muestra dos fundadores:",
  }[language];
  const members = siteKnowledge.team.map((member) => `${member.name}: ${member.role}`);
  return `${intro}\n${list(members, language)}`;
}

function farahResponse(language: SupportedLanguage) {
  return {
    en: "The current website information only lists Mohannad and Moayad as the founders. I do not have verified website information about Farah.",
    ar: "المعلومات الحالية في الموقع تعرض مهند ومؤيد فقط كمؤسسين. لا توجد لدي معلومات مؤكدة في الموقع عن فرح.",
    es: "La información actual del sitio solo muestra a Mohannad y Moayad como fundadores. No tengo información verificada del sitio sobre Farah.",
  }[language];
}

function startProjectResponse(language: SupportedLanguage) {
  const intro = {
    en: "To start a project, click Start a Project and share your idea, project type, required features, package, timeline, and preferred contact method.",
    ar: "لبدء مشروعك، اضغط ابدأ مشروعك وشاركنا الفكرة، نوع المشروع، الميزات المطلوبة، الباقة، المدة، وطريقة التواصل المفضلة.",
    es: "Para empezar, haz clic en Iniciar proyecto y comparte tu idea, tipo de proyecto, funciones, paquete, plazo y método de contacto preferido.",
  }[language];
  return `${intro}\n\n${processResponse(language)}`;
}

function processResponse(language: SupportedLanguage) {
  const heading = {
    en: "Our project flow:",
    ar: "تدفق العمل عندنا:",
    es: "Nuestro flujo de proyecto:",
  }[language];
  return `${heading}\n${list(siteKnowledge.process.map((step) => localize(step, language)), language)}`;
}

function contactResponse(language: SupportedLanguage) {
  const prefix = {
    en: "You can contact us through the website form or directly through:",
    ar: "يمكنك التواصل معنا من خلال نموذج الموقع أو مباشرة عبر:",
    es: "Puedes contactarnos desde el formulario del sitio o directamente por:",
  }[language];
  return `${prefix}\n${list([`WhatsApp: ${siteKnowledge.contact.whatsapp}`, `Email: ${siteKnowledge.contact.email}`, localize(siteKnowledge.contact.location, language)], language)}`;
}

function adminResponse(language: SupportedLanguage) {
  return {
    en: "Yes. We build admin dashboards for content, products, gallery management, offers, bookings, users, databases, and internal workflows. A simple admin dashboard fits the Business Website + Admin package; advanced dashboards usually fit the Complete System package.",
    ar: "نعم. نبني لوحات تحكم لإدارة المحتوى، المنتجات، المعارض، العروض، الحجوزات، المستخدمين، قواعد البيانات، وسير العمل الداخلي. لوحة تحكم بسيطة تناسب باقة موقع بزنس مع لوحة تحكم، والمتقدمة عادة تناسب باقة النظام المتكامل.",
    es: "Sí. Creamos paneles de administración para contenido, productos, galerías, ofertas, reservas, usuarios, bases de datos y flujos internos. Un admin simple encaja en Sitio empresarial + Admin; uno avanzado suele encajar en Sistema completo.",
  }[language];
}

function chatbotServiceResponse(language: SupportedLanguage) {
  return {
    en: "Yes. We build AI chatbots for customer support, lead collection, business FAQs, and smarter visitor guidance. They can be part of a website, MVP, or complete system.",
    ar: "نعم. نبني شات بوتات بالذكاء الاصطناعي لدعم العملاء، جمع العملاء المحتملين، أسئلة العمل الشائعة، وإرشاد زوار الموقع. يمكن أن تكون جزءا من موقع، MVP، أو نظام متكامل.",
    es: "Sí. Construimos chatbots con IA para soporte, captación de leads, FAQ del negocio y guía inteligente para visitantes. Pueden formar parte de un sitio, MVP o sistema completo.",
  }[language];
}

function earlyWorkResponse(language: SupportedLanguage) {
  const heading = {
    en: "Current early work and demo concepts:",
    ar: "الأعمال الأولية والنماذج الحالية:",
    es: "Trabajos iniciales y demos actuales:",
  }[language];
  return `${heading}\n${list(siteKnowledge.earlyWork.map((item) => localize(item, language)), language)}`;
}

export function getChatbotResponse(message: string, language: SupportedLanguage) {
  const text = normalize(message);

  if (!text) return chatbotCopy[language].fallback;

  if (includesAny(text, ["farah", "فرح"])) return farahResponse(language);
  if (includesAny(text, ["mohannad", "muhannad", "مهند"])) return memberResponse("mohannad", language);
  if (includesAny(text, ["moayad", "moayed", "مؤيد", "مويد"])) return memberResponse("moayad", language);
  if (includesAny(text, ["fitcoach", "fit coach", "fitness", "لياقة", "فيت", "entrenador", "fitness"])) return fitCoachResponse(language);
  if (includesAny(text, ["price", "pricing", "cost", "budget", "package", "prices", "اسعار", "أسعار", "سعر", "تكلفة", "باقة", "precios", "precio", "cuanto", "cuánto", "paquete"])) {
    if (includesAny(text, ["basic", "اساسي", "أساسي", "basico", "básico"])) return packageResponse(language);
    return pricingResponse(language);
  }
  if (includesAny(text, ["admin", "dashboard", "لوحة", "تحكم", "panel", "administracion", "administración"])) return adminResponse(language);
  if (includesAny(text, ["chatbot", "chat bot", "assistant", "شات", "بوت", "asistente"])) return chatbotServiceResponse(language);
  if (includesAny(text, ["service", "offer", "build", "خدمات", "بتعمل", "بتقدمو", "تبن", "servicios", "ofrecen", "hace", "construyen"])) return servicesResponse(language);
  if (includesAny(text, ["start", "begin", "project", "ابدأ", "ابدا", "مشروعي", "مشروع", "empiezo", "empezar", "proyecto"])) return startProjectResponse(language);
  if (includesAny(text, ["contact", "whatsapp", "phone", "email", "تواصل", "واتساب", "هاتف", "ايميل", "contacto", "telefono", "teléfono"])) return contactResponse(language);
  if (includesAny(text, ["process", "flow", "steps", "كيف", "مراحل", "proceso", "flujo", "pasos"])) return processResponse(language);
  if (includesAny(text, ["team", "founder", "founders", "owner", "فريق", "مؤسس", "مؤسسين", "equipo", "fundador", "fundadores"])) return teamResponse(language);
  if (includesAny(text, ["demo", "work", "example", "examples", "اعمال", "أعمال", "نماذج", "ejemplos", "trabajos", "demos"])) return earlyWorkResponse(language);
  if (includesAny(text, ["nextaura", "company", "about", "شركة", "عنكم", "compania", "compañia", "empresa"])) return companyResponse(language);

  return chatbotCopy[language].fallback;
}
