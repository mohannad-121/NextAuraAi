import type {
  CurrencyCode,
  FeatureCategory,
  FeatureId,
  LocalizedText,
  PackageId,
  ProjectFeature,
  ProjectPackage,
  ProjectTypeId,
  TimelineOption,
} from "./types.ts";

const localized = (en: string, ar: string, es: string): LocalizedText => ({ en, ar, es });

export const PACKAGE_PRICING_JOD = {
  basic: { normal: { min: 100, max: 300 }, rush: { min: 130, max: 350 } },
  business: { normal: { min: 400, max: 650 }, rush: { min: 450, max: 700 } },
  complete: { normal: { min: 700, max: 1400 }, rush: { min: 750, max: 1500 } },
} as const;

export const PACKAGE_LEVEL: Record<PackageId, number> = {
  basic: 0,
  business: 1,
  complete: 2,
};

export const FEATURES: ProjectFeature[] = [
  {
    id: "responsiveDesign",
    emoji: "📱",
    title: localized("Responsive design", "تصميم متجاوب", "Diseño responsive"),
    description: localized(
      "Optimized for phone, tablet, and desktop.",
      "تجربة مرتبة على الهاتف والجهاز اللوحي والكمبيوتر.",
      "Optimizado para móvil, tablet y escritorio.",
    ),
    category: "essentials",
    complexity: "low",
    weight: 1,
    minimumPackage: "basic",
  },
  {
    id: "corePages",
    emoji: "🧭",
    title: localized("Core website pages", "صفحات الموقع الأساسية", "Páginas esenciales"),
    description: localized(
      "Home, About, Services, and Contact pages.",
      "الرئيسية، من نحن، الخدمات، والتواصل.",
      "Inicio, Nosotros, Servicios y Contacto.",
    ),
    category: "essentials",
    complexity: "low",
    weight: 2,
    minimumPackage: "basic",
  },
  {
    id: "contactForm",
    emoji: "✉️",
    title: localized("Contact form", "نموذج تواصل", "Formulario de contacto"),
    description: localized(
      "A clear inquiry form with validation.",
      "نموذج واضح لاستقبال الاستفسارات مع التحقق من الحقول.",
      "Formulario claro con validación.",
    ),
    category: "essentials",
    complexity: "low",
    weight: 1,
    minimumPackage: "basic",
  },
  {
    id: "whatsappSocial",
    emoji: "💬",
    title: localized(
      "WhatsApp & social links",
      "واتساب وروابط التواصل",
      "WhatsApp y redes sociales",
    ),
    description: localized(
      "Direct contact and social profile links.",
      "تواصل مباشر وروابط حسابات التواصل الاجتماعي.",
      "Contacto directo y enlaces a redes.",
    ),
    category: "essentials",
    complexity: "low",
    weight: 1,
    minimumPackage: "basic",
  },
  {
    id: "basicSeo",
    emoji: "🔎",
    title: localized("Basic SEO setup", "تهيئة أساسية لمحركات البحث", "SEO básico"),
    description: localized(
      "Page titles, descriptions, and search essentials.",
      "عناوين ووصف الصفحات وأساسيات الظهور في البحث.",
      "Títulos, descripciones y ajustes esenciales.",
    ),
    category: "essentials",
    complexity: "low",
    weight: 2,
    minimumPackage: "basic",
  },
  {
    id: "maps",
    emoji: "📍",
    title: localized("Google Maps", "خرائط Google", "Google Maps"),
    description: localized(
      "Show your business location clearly.",
      "عرض موقع نشاطك بوضوح.",
      "Muestra claramente la ubicación del negocio.",
    ),
    category: "essentials",
    complexity: "low",
    weight: 1,
    minimumPackage: "basic",
  },
  {
    id: "basicAnimations",
    emoji: "✨",
    title: localized("Subtle animations", "حركات بسيطة", "Animaciones sutiles"),
    description: localized(
      "Restrained motion that supports the content.",
      "حركة هادئة تدعم المحتوى دون تشتيت.",
      "Movimiento discreto que apoya el contenido.",
    ),
    category: "essentials",
    complexity: "low",
    weight: 1,
    minimumPackage: "basic",
  },
  {
    id: "deployment",
    emoji: "🚀",
    title: localized("Deployment & domain help", "الإطلاق وربط الدومين", "Despliegue y dominio"),
    description: localized(
      "Launch setup and domain connection assistance.",
      "تجهيز الإطلاق والمساعدة في ربط الدومين.",
      "Configuración de lanzamiento y conexión del dominio.",
    ),
    category: "essentials",
    complexity: "low",
    weight: 2,
    minimumPackage: "basic",
  },
  {
    id: "cms",
    emoji: "📝",
    title: localized("Content management", "إدارة المحتوى", "Gestión de contenido"),
    description: localized(
      "Update pages and content without editing code.",
      "تحديث الصفحات والمحتوى دون تعديل الكود.",
      "Actualiza páginas y contenido sin editar código.",
    ),
    category: "business",
    complexity: "medium",
    weight: 4,
    minimumPackage: "business",
  },
  {
    id: "adminDashboard",
    emoji: "🖥️",
    title: localized("Admin dashboard", "لوحة تحكم إدارية", "Panel de administración"),
    description: localized(
      "A secure workspace to manage the business.",
      "مساحة آمنة لإدارة بيانات النشاط.",
      "Espacio seguro para gestionar el negocio.",
    ),
    category: "business",
    complexity: "high",
    weight: 7,
    minimumPackage: "business",
  },
  {
    id: "productManagement",
    emoji: "📦",
    title: localized(
      "Products or services management",
      "إدارة المنتجات أو الخدمات",
      "Gestión de productos o servicios",
    ),
    description: localized(
      "Create, update, and organize your catalog.",
      "إضافة وتحديث وتنظيم المنتجات أو الخدمات.",
      "Crea, actualiza y organiza el catálogo.",
    ),
    category: "business",
    complexity: "medium",
    weight: 4,
    minimumPackage: "business",
  },
  {
    id: "booking",
    emoji: "📅",
    title: localized("Booking management", "إدارة الحجوزات", "Gestión de reservas"),
    description: localized(
      "Appointments, availability, and booking requests.",
      "المواعيد والتوفر وطلبات الحجز.",
      "Citas, disponibilidad y solicitudes de reserva.",
    ),
    category: "business",
    complexity: "medium",
    weight: 5,
    minimumPackage: "business",
  },
  {
    id: "database",
    emoji: "🗄️",
    title: localized("Database integration", "ربط قاعدة بيانات", "Integración de base de datos"),
    description: localized(
      "Structured storage for business information.",
      "حفظ منظم وآمن لبيانات العمل.",
      "Almacenamiento estructurado de la información.",
    ),
    category: "business",
    complexity: "medium",
    weight: 5,
    minimumPackage: "business",
  },
  {
    id: "multilingual",
    emoji: "🌍",
    title: localized("Multiple languages", "لغات متعددة", "Varios idiomas"),
    description: localized(
      "Localized content with RTL support where needed.",
      "محتوى مترجم مع دعم اتجاه RTL عند الحاجة.",
      "Contenido localizado con soporte RTL cuando sea necesario.",
    ),
    category: "business",
    complexity: "medium",
    weight: 4,
    minimumPackage: "business",
  },
  {
    id: "authentication",
    emoji: "🔐",
    title: localized("Authentication", "تسجيل الدخول", "Autenticación"),
    description: localized(
      "Secure account creation and sign-in.",
      "إنشاء حسابات وتسجيل دخول آمن.",
      "Creación de cuentas e inicio de sesión seguro.",
    ),
    category: "business",
    complexity: "high",
    weight: 7,
    minimumPackage: "business",
  },
  {
    id: "roles",
    emoji: "👥",
    title: localized("Roles & permissions", "الأدوار والصلاحيات", "Roles y permisos"),
    description: localized(
      "Different access levels for team members.",
      "مستويات وصول مختلفة لأعضاء الفريق.",
      "Niveles de acceso distintos para el equipo.",
    ),
    category: "business",
    complexity: "high",
    weight: 7,
    minimumPackage: "business",
  },
  {
    id: "analytics",
    emoji: "📊",
    title: localized("Analytics & reports", "التحليلات والتقارير", "Analítica e informes"),
    description: localized(
      "Track activity and useful business metrics.",
      "متابعة النشاط ومؤشرات العمل المهمة.",
      "Seguimiento de actividad y métricas útiles.",
    ),
    category: "business",
    complexity: "medium",
    weight: 4,
    minimumPackage: "business",
  },
  {
    id: "payments",
    emoji: "💳",
    title: localized("Payment integration", "ربط الدفع الإلكتروني", "Integración de pagos"),
    description: localized(
      "Secure online payment flows where applicable.",
      "مسارات دفع إلكتروني آمنة حسب طبيعة المشروع.",
      "Flujos de pago seguros cuando corresponda.",
    ),
    category: "commerce",
    complexity: "high",
    weight: 8,
    minimumPackage: "business",
  },
  {
    id: "customerDashboard",
    emoji: "🧑‍💻",
    title: localized("Customer dashboard", "لوحة تحكم للعملاء", "Panel de clientes"),
    description: localized(
      "A personalized area for every customer.",
      "مساحة مخصصة لكل عميل.",
      "Área personalizada para cada cliente.",
    ),
    category: "commerce",
    complexity: "high",
    weight: 8,
    minimumPackage: "complete",
  },
  {
    id: "ecommerce",
    emoji: "🛒",
    title: localized(
      "E-commerce system",
      "نظام تجارة إلكترونية",
      "Sistema de comercio electrónico",
    ),
    description: localized(
      "Catalog, cart, checkout, and order management.",
      "كتالوج وسلة شراء ودفع وإدارة طلبات.",
      "Catálogo, carrito, pago y gestión de pedidos.",
    ),
    category: "commerce",
    complexity: "high",
    weight: 10,
    minimumPackage: "complete",
  },
  {
    id: "realtime",
    emoji: "🔔",
    title: localized("Real-time notifications", "إشعارات فورية", "Notificaciones en tiempo real"),
    description: localized(
      "Live updates for important events.",
      "تحديثات مباشرة للأحداث المهمة.",
      "Actualizaciones en vivo para eventos importantes.",
    ),
    category: "commerce",
    complexity: "high",
    weight: 8,
    minimumPackage: "complete",
  },
  {
    id: "apiIntegrations",
    emoji: "🔌",
    title: localized("External API integrations", "ربط أنظمة خارجية API", "Integraciones con APIs"),
    description: localized(
      "Connect trusted third-party services.",
      "ربط خدمات وأنظمة خارجية موثوقة.",
      "Conecta servicios externos confiables.",
    ),
    category: "commerce",
    complexity: "high",
    weight: 9,
    minimumPackage: "complete",
  },
  {
    id: "crm",
    emoji: "🤝",
    title: localized("CRM integration", "ربط نظام CRM", "Integración CRM"),
    description: localized(
      "Connect customer and sales workflows.",
      "ربط بيانات العملاء ومسارات المبيعات.",
      "Conecta clientes y flujos de ventas.",
    ),
    category: "commerce",
    complexity: "high",
    weight: 9,
    minimumPackage: "complete",
  },
  {
    id: "automation",
    emoji: "⚙️",
    title: localized("Business automation", "أتمتة الأعمال", "Automatización empresarial"),
    description: localized(
      "Automate repetitive operational tasks.",
      "أتمتة المهام التشغيلية المتكررة.",
      "Automatiza tareas operativas repetitivas.",
    ),
    category: "intelligence",
    complexity: "veryHigh",
    weight: 11,
    minimumPackage: "complete",
  },
  {
    id: "aiChatbot",
    emoji: "🤖",
    title: localized("AI chatbot", "شات بوت بالذكاء الاصطناعي", "Chatbot con IA"),
    description: localized(
      "A guided assistant for common customer questions.",
      "مساعد موجه لأسئلة العملاء المتكررة.",
      "Asistente guiado para preguntas frecuentes.",
    ),
    category: "intelligence",
    complexity: "veryHigh",
    weight: 11,
    minimumPackage: "complete",
  },
  {
    id: "aiAssistant",
    emoji: "🧠",
    title: localized("AI assistant", "مساعد ذكي", "Asistente de IA"),
    description: localized(
      "A task-focused assistant inside the product.",
      "مساعد متخصص ينفذ مهام داخل المنتج.",
      "Asistente especializado dentro del producto.",
    ),
    category: "intelligence",
    complexity: "veryHigh",
    weight: 12,
    minimumPackage: "complete",
  },
  {
    id: "rag",
    emoji: "📚",
    title: localized("RAG knowledge system", "نظام معرفة RAG", "Sistema de conocimiento RAG"),
    description: localized(
      "Answers grounded in approved business knowledge.",
      "إجابات مبنية على معرفة العمل المعتمدة.",
      "Respuestas basadas en conocimiento empresarial aprobado.",
    ),
    category: "intelligence",
    complexity: "veryHigh",
    weight: 13,
    minimumPackage: "complete",
  },
  {
    id: "customReporting",
    emoji: "📈",
    title: localized("Custom reporting", "تقارير مخصصة", "Informes personalizados"),
    description: localized(
      "Reports designed around your decisions.",
      "تقارير مصممة وفق القرارات التي تحتاجها.",
      "Informes diseñados para tus decisiones.",
    ),
    category: "intelligence",
    complexity: "high",
    weight: 8,
    minimumPackage: "complete",
  },
  {
    id: "customWorkflows",
    emoji: "🧩",
    title: localized(
      "Custom business workflows",
      "مسارات عمل مخصصة",
      "Flujos de negocio personalizados",
    ),
    description: localized(
      "Purpose-built logic for your operations.",
      "منطق مخصص لعمليات نشاطك.",
      "Lógica específica para tus operaciones.",
    ),
    category: "intelligence",
    complexity: "veryHigh",
    weight: 12,
    minimumPackage: "complete",
  },
  {
    id: "scalableBackend",
    emoji: "🏗️",
    title: localized("Scalable backend", "بنية خلفية قابلة للتوسع", "Backend escalable"),
    description: localized(
      "Architecture prepared for future growth.",
      "بنية تقنية جاهزة للنمو المستقبلي.",
      "Arquitectura preparada para crecer.",
    ),
    category: "intelligence",
    complexity: "veryHigh",
    weight: 10,
    minimumPackage: "complete",
  },
];

const basicIncluded: FeatureId[] = [
  "responsiveDesign",
  "corePages",
  "contactForm",
  "whatsappSocial",
  "basicSeo",
  "maps",
  "basicAnimations",
  "deployment",
];

const businessIncluded: FeatureId[] = [
  ...basicIncluded,
  "cms",
  "adminDashboard",
  "productManagement",
  "database",
];

const completeIncluded: FeatureId[] = [
  ...businessIncluded,
  "booking",
  "multilingual",
  "authentication",
  "roles",
  "analytics",
  "payments",
  "customerDashboard",
  "apiIntegrations",
  "customWorkflows",
  "scalableBackend",
];

export const PROJECT_PACKAGES: ProjectPackage[] = [
  {
    id: "basic",
    emoji: "🌐",
    title: localized("Basic Website", "موقع أساسي", "Sitio web básico"),
    description: localized(
      "A polished, responsive presence for a small business or focused idea.",
      "حضور رقمي احترافي ومتجاوب لنشاط صغير أو فكرة محددة.",
      "Una presencia profesional y responsive para un negocio pequeño o una idea concreta.",
    ),
    pricing: PACKAGE_PRICING_JOD.basic,
    includedFeatureIds: basicIncluded,
    highlightedFeatureIds: [
      "responsiveDesign",
      "corePages",
      "contactForm",
      "whatsappSocial",
      "basicSeo",
    ],
  },
  {
    id: "business",
    emoji: "🏢",
    title: localized(
      "Business Website + Admin",
      "موقع أعمال + لوحة تحكم",
      "Sitio empresarial + Admin",
    ),
    description: localized(
      "Manage content, services, and business data from a secure dashboard.",
      "إدارة المحتوى والخدمات وبيانات العمل من لوحة تحكم آمنة.",
      "Gestiona contenido, servicios y datos desde un panel seguro.",
    ),
    inheritance: localized(
      "Includes everything from Basic",
      "يشمل كل ما في الباقة الأساسية",
      "Incluye todo lo del plan Básico",
    ),
    badge: localized("Most requested", "الأكثر طلباً", "Más solicitado"),
    pricing: PACKAGE_PRICING_JOD.business,
    includedFeatureIds: businessIncluded,
    highlightedFeatureIds: [
      "cms",
      "adminDashboard",
      "productManagement",
      "database",
      "responsiveDesign",
    ],
  },
  {
    id: "complete",
    emoji: "🚀",
    title: localized("Complete System", "نظام متكامل", "Sistema completo"),
    description: localized(
      "A custom platform for advanced workflows, customers, integrations, and growth.",
      "منصة مخصصة لمسارات العمل المتقدمة والعملاء والتكاملات والنمو.",
      "Una plataforma a medida para flujos avanzados, clientes, integraciones y crecimiento.",
    ),
    inheritance: localized(
      "Includes everything from Basic & Business",
      "يشمل كل ما في الباقتين الأساسية والأعمال",
      "Incluye todo lo de Básico y Empresarial",
    ),
    pricing: PACKAGE_PRICING_JOD.complete,
    includedFeatureIds: completeIncluded,
    highlightedFeatureIds: [
      "customerDashboard",
      "apiIntegrations",
      "customWorkflows",
      "scalableBackend",
      "payments",
    ],
  },
];

export const PROJECT_TYPE_OPTIONS: Array<{
  id: ProjectTypeId;
  emoji: string;
  label: LocalizedText;
  description: LocalizedText;
}> = [
  {
    id: "businessWebsite",
    emoji: "🌐",
    label: localized("Business website", "موقع أعمال", "Sitio empresarial"),
    description: localized(
      "A clear marketing and service website.",
      "موقع واضح للتعريف بالخدمات والتسويق.",
      "Un sitio claro para marketing y servicios.",
    ),
  },
  {
    id: "ecommerce",
    emoji: "🛒",
    label: localized("Online store", "متجر إلكتروني", "Tienda en línea"),
    description: localized(
      "Products, checkout, and orders.",
      "منتجات ودفع وإدارة طلبات.",
      "Productos, pago y pedidos.",
    ),
  },
  {
    id: "booking",
    emoji: "📅",
    label: localized("Booking platform", "منصة حجوزات", "Plataforma de reservas"),
    description: localized(
      "Appointments, availability, and requests.",
      "مواعيد وتوفر وطلبات حجز.",
      "Citas, disponibilidad y solicitudes.",
    ),
  },
  {
    id: "webApplication",
    emoji: "🧩",
    label: localized("Custom web application", "تطبيق ويب مخصص", "Aplicación web a medida"),
    description: localized(
      "A tailored product or internal system.",
      "منتج أو نظام داخلي مصمم حسب الحاجة.",
      "Producto o sistema interno personalizado.",
    ),
  },
  {
    id: "aiSolution",
    emoji: "🤖",
    label: localized("AI solution", "حل بالذكاء الاصطناعي", "Solución con IA"),
    description: localized(
      "An assistant, chatbot, or knowledge tool.",
      "مساعد أو شات بوت أو أداة معرفة.",
      "Asistente, chatbot o herramienta de conocimiento.",
    ),
  },
  {
    id: "other",
    emoji: "✨",
    label: localized("Something else", "فكرة أخرى", "Otra idea"),
    description: localized(
      "Tell us what you have in mind.",
      "أخبرنا بما تفكر فيه.",
      "Cuéntanos lo que tienes en mente.",
    ),
  },
];

export const TIMELINE_OPTIONS: Array<{
  id: TimelineOption;
  emoji: string;
  label: LocalizedText;
  description: LocalizedText;
}> = [
  {
    id: "oneWeek",
    emoji: "🚀",
    label: localized("Within one week", "خلال أسبوع", "En una semana"),
    description: localized(
      "Rush delivery · 7 days or less",
      "تسليم مستعجل · 7 أيام أو أقل",
      "Entrega urgente · 7 días o menos",
    ),
  },
  {
    id: "twoWeeks",
    emoji: "⏱️",
    label: localized("Within two weeks", "خلال أسبوعين", "En dos semanas"),
    description: localized(
      "Normal package range",
      "نطاق السعر الطبيعي",
      "Rango normal del paquete",
    ),
  },
  {
    id: "threeFourWeeks",
    emoji: "🗓️",
    label: localized(
      "Three to four weeks",
      "من ثلاثة إلى أربعة أسابيع",
      "De tres a cuatro semanas",
    ),
    description: localized(
      "More room for iteration",
      "وقت أوسع للمراجعة والتحسين",
      "Más tiempo para iterar",
    ),
  },
  {
    id: "flexible",
    emoji: "🌿",
    label: localized("Flexible timeline", "موعد مرن", "Plazo flexible"),
    description: localized(
      "We will plan the right schedule together",
      "نحدد الجدول المناسب معاً",
      "Definiremos juntos el calendario",
    ),
  },
  {
    id: "custom",
    emoji: "📌",
    label: localized("Custom date", "تاريخ محدد", "Fecha personalizada"),
    description: localized(
      "Choose your preferred delivery date",
      "اختر تاريخ التسليم المفضل",
      "Elige la fecha de entrega",
    ),
  },
];

export const FEATURE_CATEGORY_ORDER: FeatureCategory[] = [
  "essentials",
  "business",
  "commerce",
  "intelligence",
];

export const CURRENCIES: Array<{ code: CurrencyCode; emoji: string; label: LocalizedText }> = [
  {
    code: "JOD",
    emoji: "🇯🇴",
    label: localized("Jordanian dinar", "الدينار الأردني", "Dinar jordano"),
  },
  {
    code: "USD",
    emoji: "🇺🇸",
    label: localized("United States dollar", "الدولار الأمريكي", "Dólar estadounidense"),
  },
  { code: "EUR", emoji: "🇪🇺", label: localized("Euro", "اليورو", "Euro") },
  {
    code: "GBP",
    emoji: "🇬🇧",
    label: localized("British pound", "الجنيه الإسترليني", "Libra esterlina"),
  },
  {
    code: "ILS",
    emoji: "💵",
    label: localized("Israeli new shekel", "الشيكل الإسرائيلي الجديد", "Nuevo séquel israelí"),
  },
  { code: "AED", emoji: "🇦🇪", label: localized("UAE dirham", "الدرهم الإماراتي", "Dírham de EAU") },
  { code: "SAR", emoji: "🇸🇦", label: localized("Saudi riyal", "الريال السعودي", "Riyal saudí") },
  { code: "QAR", emoji: "🇶🇦", label: localized("Qatari riyal", "الريال القطري", "Riyal catarí") },
  { code: "OMR", emoji: "🇴🇲", label: localized("Omani rial", "الريال العُماني", "Rial omaní") },
];

export const FALLBACK_EXCHANGE_RATES: Record<CurrencyCode, number> = {
  JOD: 1,
  USD: 1.410437,
  EUR: 1.231991,
  GBP: 1.045793,
  ILS: 4.252973,
  AED: 5.179831,
  SAR: 5.28914,
  QAR: 5.133992,
  OMR: 0.542309,
};

export const FALLBACK_RATE_METADATA = {
  source: "NextAura reference snapshot (ExchangeRate-API)",
  timestamp: "2026-07-17T00:02:31.000Z",
};

export const PROJECT_TYPE_COMPLEXITY: Record<ProjectTypeId, number> = {
  businessWebsite: 0,
  ecommerce: 7,
  booking: 5,
  webApplication: 9,
  aiSolution: 11,
  other: 3,
};

export const PRICE_COMPLEXITY_CAP: Record<PackageId, number> = {
  basic: 28,
  business: 52,
  complete: 86,
};

export const getPackage = (packageId: PackageId) =>
  PROJECT_PACKAGES.find((item) => item.id === packageId) ?? PROJECT_PACKAGES[0];

export const getFeature = (featureId: FeatureId) => FEATURES.find((item) => item.id === featureId);
