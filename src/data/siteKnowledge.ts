export type SupportedLanguage = "en" | "ar" | "es";

type Localized = Record<SupportedLanguage, string>;

export type TeamMemberKnowledge = {
  id: "mohannad" | "moayad";
  name: string;
  role: string;
  bio: Localized;
  responsibilities: Localized[];
};

export type PackageKnowledge = {
  name: Localized;
  price: string;
  description: Localized;
  includes: Localized[];
};

export const siteKnowledge = {
  company: {
    name: "NextAura AI",
    description: {
      en: "We build premium websites, AI assistants, automation systems, CRM platforms, MVPs, and custom digital products for businesses.",
      ar: "نبني مواقع مميزة ومساعدين بالذكاء الاصطناعي وأنظمة أتمتة ومنصات CRM ومنتجات MVP وحلولًا رقمية مخصصة للأعمال.",
      es: "Creamos sitios premium, asistentes IA, automatizaciones, plataformas CRM, MVPs y productos digitales a medida.",
    },
    mission: {
      en: "We help businesses turn rough ideas into practical, intelligent digital products.",
      ar: "نساعد الشركات على تحويل الأفكار الأولية إلى منتجات رقمية ذكية وعملية.",
      es: "Ayudamos a las empresas a convertir ideas iniciales en productos digitales inteligentes y prácticos.",
    },
  },
  services: [
    {
      name: { en: "AI Chatbots", ar: "شات بوتات بالذكاء الاصطناعي", es: "Chatbots con IA" },
      description: {
        en: "Conversational assistants for customer support, lead collection, business FAQs, and smarter customer interaction.",
        ar: "مساعدون للمحادثة لدعم العملاء، جمع العملاء المحتملين، الإجابة على أسئلة العمل، وتحسين تفاعل العملاء.",
        es: "Asistentes conversacionales para soporte, captación de leads, preguntas frecuentes e interacción más inteligente.",
      },
    },
    {
      name: {
        en: "Websites & Web Apps",
        ar: "مواقع وتطبيقات ويب",
        es: "Sitios web y aplicaciones web",
      },
      description: {
        en: "Modern landing pages, business websites, dashboards, booking flows, and full-stack web applications.",
        ar: "صفحات هبوط ومواقع أعمال ولوحات تحكم وأنظمة حجز وتطبيقات ويب متكاملة.",
        es: "Landing pages modernas, sitios empresariales, paneles, reservas y aplicaciones web completas.",
      },
    },
    {
      name: {
        en: "AI MVP Development",
        ar: "تطوير MVP بالذكاء الاصطناعي",
        es: "Desarrollo de MVP con IA",
      },
      description: {
        en: "Usable AI-powered prototypes and early products that can be tested, shown, or launched.",
        ar: "نماذج ومنتجات أولية مدعومة بالذكاء الاصطناعي قابلة للتجربة أو العرض أو الإطلاق.",
        es: "Prototipos y productos iniciales con IA que se pueden probar, presentar o lanzar.",
      },
    },
    {
      name: { en: "Business Automation", ar: "أتمتة الأعمال", es: "Automatización empresarial" },
      description: {
        en: "Automation for repeated workflows, forms, reports, CRM flows, notifications, and internal processes.",
        ar: "أتمتة للمهام المتكررة، النماذج، التقارير، تدفقات CRM، الإشعارات، والعمليات الداخلية.",
        es: "Automatización de tareas repetidas, formularios, reportes, flujos CRM, notificaciones y procesos internos.",
      },
    },
    {
      name: {
        en: "CRM & Business Platforms",
        ar: "CRM ومنصات الأعمال",
        es: "CRM y plataformas empresariales",
      },
      description: {
        en: "Custom dashboards, client-management systems, booking platforms, memberships, and administrative tools.",
        ar: "لوحات تحكم وأنظمة إدارة عملاء وحجز وعضويات وأدوات إدارية مخصصة.",
        es: "Paneles, gestión de clientes, reservas, membresías y herramientas administrativas a medida.",
      },
    },
    {
      name: { en: "AI Integration", ar: "تكامل الذكاء الاصطناعي", es: "Integración de IA" },
      description: {
        en: "Purposeful AI models, retrieval systems, recommendations, and API integrations.",
        ar: "نماذج ذكاء اصطناعي وأنظمة استرجاع وتوصيات وتكاملات API هادفة.",
        es: "Modelos IA, recuperación de información, recomendaciones e integraciones API con propósito.",
      },
    },
    {
      name: {
        en: "UI/UX & Product Design",
        ar: "تصميم UI/UX والمنتجات",
        es: "UI/UX y diseño de producto",
      },
      description: {
        en: "Research, wireframes, interface systems, responsive prototypes, and complete product experiences.",
        ar: "بحث وخرائط واجهات وأنظمة تصميم ونماذج متجاوبة وتجارب منتج متكاملة.",
        es: "Investigación, wireframes, sistemas de interfaz, prototipos responsive y experiencias completas.",
      },
    },
    {
      name: {
        en: "Custom Software Development",
        ar: "تطوير برمجيات مخصصة",
        es: "Software a medida",
      },
      description: {
        en: "Tailored software designed around specific operational, team, or customer needs.",
        ar: "برمجيات مصممة حول احتياجات تشغيلية أو احتياجات الفريق والعملاء.",
        es: "Software adaptado a necesidades operativas, del equipo o del cliente.",
      },
    },
  ],
  team: [
    {
      id: "mohannad",
      name: "Mohannad",
      role: "Founder & AI/Backend Lead",
      bio: {
        en: "Mohannad leads product direction, backend systems, AI logic, and client delivery.",
        ar: "مهند يقود اتجاه المنتج، أنظمة الباكند، منطق الذكاء الاصطناعي، وتسليم العمل للعملاء.",
        es: "Mohannad lidera la dirección del producto, backend, lógica de IA y entrega al cliente.",
      },
      responsibilities: [
        { en: "AI logic", ar: "منطق الذكاء الاصطناعي", es: "Lógica de IA" },
        { en: "Backend systems", ar: "أنظمة الباكند", es: "Backend" },
        { en: "Client delivery", ar: "تسليم العملاء", es: "Entrega al cliente" },
      ],
    },
    {
      id: "moayad",
      name: "Moayad",
      role: "Co-Founder & Systems Architect",
      bio: {
        en: "Moayad focuses on system structure, documentation, workflows, testing, and technical planning.",
        ar: "مؤيد يركز على هيكلة الأنظمة، التوثيق، سير العمل، الاختبار، والتخطيط التقني.",
        es: "Moayad se enfoca en arquitectura, documentación, flujos, pruebas y planificación técnica.",
      },
      responsibilities: [
        { en: "System architecture", ar: "هيكلة الأنظمة", es: "Arquitectura" },
        { en: "Workflows", ar: "سير العمل", es: "Flujos" },
        { en: "Testing", ar: "الاختبار", es: "Pruebas" },
      ],
    },
  ] satisfies TeamMemberKnowledge[],
  caseStudies: [
    {
      name: "FitCoach AI",
      summary: {
        en: "FitCoach AI is our featured AI-powered fitness platform. It generates personalized workout and nutrition plans based on user profile data, goals, and fitness level.",
        ar: "FitCoach AI هو مشروعنا المميز في اللياقة الذكية. ينشئ خطط تمرين وتغذية مخصصة حسب بيانات المستخدم وأهدافه ومستوى لياقته.",
        es: "FitCoach AI es nuestro proyecto destacado de fitness con IA. Genera planes personalizados de entrenamiento y nutrición según el perfil, objetivos y nivel físico del usuario.",
      },
      features: [
        { en: "Plan generation", ar: "إنشاء الخطط", es: "Generación de planes" },
        { en: "User dashboard", ar: "لوحة مستخدم", es: "Panel de usuario" },
        { en: "Nutrition guidance", ar: "إرشادات تغذية", es: "Guía nutricional" },
        { en: "Scheduling logic", ar: "منطق جدولة", es: "Lógica de agenda" },
      ],
    },
  ],
  earlyWork: [
    {
      en: "FitCoach AI: AI fitness platform with workout and nutrition planning.",
      ar: "FitCoach AI: منصة لياقة ذكية لتخطيط التمارين والتغذية.",
      es: "FitCoach AI: plataforma fitness con IA para planificación de entrenamiento y nutrición.",
    },
    {
      en: "Miss Gym Website Demo: business website concept with booking, products, gallery, location, and admin dashboard preview.",
      ar: "عرض Miss Gym التجريبي: مفهوم موقع بزنس مع حجز، منتجات، معرض، موقع، ومعاينة لوحة تحكم.",
      es: "Demo de Miss Gym: concepto de sitio empresarial con reservas, productos, galería, ubicación y vista previa de admin.",
    },
    {
      en: "AI Assistant Concepts: custom chatbot ideas for businesses that want smarter customer interaction.",
      ar: "مفاهيم مساعد AI: أفكار شات بوت مخصصة للأعمال التي تريد تفاعل عملاء أذكى.",
      es: "Conceptos de asistentes IA: ideas de chatbots personalizados para empresas que quieren interacción más inteligente.",
    },
  ],
  pricing: {
    disclaimer: {
      en: "These are estimated ranges and depend on features, number of pages, database needs, integrations, admin dashboard, domain, and hosting.",
      ar: "هذه أسعار تقديرية وتعتمد على الميزات، عدد الصفحات، احتياج قاعدة البيانات، التكاملات، لوحة التحكم، الدومين، والاستضافة.",
      es: "Estos rangos son estimados y dependen de funciones, número de páginas, base de datos, integraciones, panel de administración, dominio y hosting.",
    },
    packages: [
      {
        name: { en: "Basic Website", ar: "موقع أساسي", es: "Sitio web básico" },
        price: "150 - 350 JOD",
        description: {
          en: "For small business websites, landing pages, contact, gallery, and WhatsApp integration.",
          ar: "للمواقع الصغيرة، صفحات الهبوط، التواصل، المعرض، وربط واتساب.",
          es: "Para sitios de pequeños negocios, landing pages, contacto, galería e integración WhatsApp.",
        },
        includes: [
          { en: "Responsive design", ar: "تصميم متجاوب", es: "Diseño responsive" },
          { en: "Basic pages", ar: "صفحات أساسية", es: "Páginas básicas" },
          { en: "Contact and WhatsApp", ar: "تواصل وواتساب", es: "Contacto y WhatsApp" },
        ],
      },
      {
        name: {
          en: "Business Website + Admin",
          ar: "موقع بزنس مع لوحة تحكم",
          es: "Sitio empresarial + Admin",
        },
        price: "400 - 700 JOD",
        description: {
          en: "For businesses that need products, offers, gallery, booking, or a simple admin dashboard.",
          ar: "للأعمال التي تحتاج منتجات، عروض، معرض، حجز، أو لوحة تحكم بسيطة.",
          es: "Para empresas que necesitan productos, ofertas, galería, reservas o un admin simple.",
        },
        includes: [
          { en: "Everything in Basic", ar: "كل ميزات الموقع الأساسي", es: "Todo lo del básico" },
          { en: "Admin dashboard", ar: "لوحة تحكم", es: "Panel de administración" },
          {
            en: "Booking or request flow",
            ar: "نظام حجز أو طلبات",
            es: "Flujo de reservas o solicitudes",
          },
        ],
      },
      {
        name: { en: "Complete System", ar: "نظام متكامل", es: "Sistema completo" },
        price: "800 - 1500 JOD",
        description: {
          en: "For full systems with database, login, advanced admin dashboard, AI/chatbot integration, and production deployment.",
          ar: "للأنظمة الكاملة مع قاعدة بيانات، تسجيل دخول، لوحة تحكم متقدمة، ربط AI أو شات بوت، وتجهيز الإطلاق.",
          es: "Para sistemas completos con base de datos, login, admin avanzado, integración IA/chatbot y despliegue.",
        },
        includes: [
          { en: "Database and login", ar: "قاعدة بيانات وتسجيل دخول", es: "Base de datos y login" },
          { en: "Advanced admin dashboard", ar: "لوحة تحكم متقدمة", es: "Admin avanzado" },
          { en: "AI or chatbot option", ar: "خيار AI أو شات بوت", es: "Opción IA o chatbot" },
        ],
      },
    ] satisfies PackageKnowledge[],
  },
  process: [
    {
      en: "Discover: we understand your business, idea, goals, and users.",
      ar: "اكتشاف: نفهم عملك وفكرتك وأهدافك والمستخدمين.",
      es: "Descubrir: entendemos tu negocio, idea, objetivos y usuarios.",
    },
    {
      en: "Design: we create the structure, user experience, and product flow.",
      ar: "تصميم: نصمم الهيكل وتجربة المستخدم وتدفق المنتج.",
      es: "Diseño: creamos estructura, experiencia de usuario y flujo.",
    },
    {
      en: "Build: we develop the website, dashboard, chatbot, or MVP.",
      ar: "بناء: نطور الموقع أو لوحة التحكم أو الشات بوت أو MVP.",
      es: "Construcción: desarrollamos el sitio, panel, chatbot o MVP.",
    },
    {
      en: "Launch: we deploy, test, improve, and prepare for real users.",
      ar: "إطلاق: ننشر ونختبر ونحسن ونجهز للمستخدمين الحقيقيين.",
      es: "Lanzamiento: desplegamos, probamos, mejoramos y preparamos para usuarios reales.",
    },
  ],
  contact: {
    whatsapp: "+962 7 9919 5498",
    email: "info@next-aura-ai.com",
    linkedin: "NextAura AI LinkedIn",
    location: {
      en: "Jordan • UAE / Dubai presence",
      ar: "الأردن • حضور في الإمارات / دبي",
      es: "Jordania • Presencia en EAU / Dubái",
    },
  },
} as const;

export function localize(value: Localized, language: SupportedLanguage) {
  return value[language] || value.en;
}
