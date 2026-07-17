export type SupportedLanguage = "en" | "ar" | "es" | "zh";

export type Localized = Record<SupportedLanguage, string>;

export type TeamMemberKnowledge = {
  id: "mohannad" | "moayad";
  name: string;
  role: Localized;
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
      en: "NextAura AI is a technology company that builds premium websites, AI assistants, automation systems, CRM platforms, MVPs, and custom digital products.",
      ar: "NextAura AI شركة تقنية تبني مواقع احترافية، مساعدين بالذكاء الاصطناعي، أنظمة أتمتة، منصات CRM، منتجات MVP، وحلولًا رقمية مخصصة.",
      es: "NextAura AI es una empresa tecnológica que crea sitios premium, asistentes de IA, automatizaciones, plataformas CRM, MVP y productos digitales a medida.",
      zh: "NextAura AI 是一家科技公司，专注于高端网站、AI 助手、自动化系统、CRM 平台、MVP 和定制数字产品。",
    },
    mission: {
      en: "We turn business ideas and operational challenges into practical, intelligent products that save time, improve customer experience, and support growth.",
      ar: "نحوّل أفكار الشركات وتحدياتها التشغيلية إلى منتجات ذكية وعملية توفر الوقت، تحسن تجربة العملاء، وتدعم النمو.",
      es: "Convertimos ideas y retos operativos en productos inteligentes que ahorran tiempo, mejoran la experiencia del cliente y apoyan el crecimiento.",
      zh: "我们将商业创意和运营挑战转化为实用的智能产品，以节省时间、改善客户体验并支持业务增长。",
    },
    approach: {
      en: "Every project is custom: we study the business, define the right scope, design the experience, build the system, test it, launch it, and keep improving it.",
      ar: "كل مشروع عندنا مخصص: نفهم العمل، نحدد النطاق المناسب، نصمم التجربة، نبني النظام، نختبره، نطلقه، ونستمر بتحسينه.",
      es: "Cada proyecto es personalizado: estudiamos el negocio, definimos el alcance, diseñamos, construimos, probamos, lanzamos y mejoramos.",
      zh: "每个项目都按需定制：我们了解业务、确定范围、设计体验、开发系统、测试上线并持续改进。",
    },
  },
  services: [
    {
      id: "web",
      name: {
        en: "Websites & Web Apps",
        ar: "المواقع وتطبيقات الويب",
        es: "Sitios y aplicaciones web",
        zh: "网站与 Web 应用",
      },
      description: {
        en: "Landing pages, business websites, e-commerce, dashboards, booking flows, and full-stack web applications.",
        ar: "صفحات هبوط، مواقع أعمال، متاجر إلكترونية، لوحات تحكم، أنظمة حجز، وتطبيقات ويب متكاملة.",
        es: "Landing pages, sitios empresariales, comercio electrónico, paneles, reservas y aplicaciones web completas.",
        zh: "落地页、企业网站、电商平台、管理面板、预约流程和全栈 Web 应用。",
      },
    },
    {
      id: "chatbots",
      name: {
        en: "AI Assistants & Chatbots",
        ar: "مساعدو وشات بوتات الذكاء الاصطناعي",
        es: "Asistentes y chatbots con IA",
        zh: "AI 助手与聊天机器人",
      },
      description: {
        en: "Multilingual assistants for support, lead collection, business FAQs, website guidance, and knowledge retrieval.",
        ar: "مساعدون متعددو اللغات للدعم، جمع العملاء المحتملين، أسئلة العمل، إرشاد الزوار، واسترجاع المعرفة.",
        es: "Asistentes multilingües para soporte, leads, FAQ, navegación web y recuperación de conocimiento.",
        zh: "用于客户支持、线索收集、业务问答、网站导航和知识检索的多语言助手。",
      },
    },
    {
      id: "automation",
      name: {
        en: "Business Automation",
        ar: "أتمتة الأعمال",
        es: "Automatización empresarial",
        zh: "业务自动化",
      },
      description: {
        en: "Automation for repeated workflows, forms, reports, notifications, CRM flows, and internal operations.",
        ar: "أتمتة المهام المتكررة، النماذج، التقارير، الإشعارات، تدفقات CRM، والعمليات الداخلية.",
        es: "Automatización de tareas, formularios, reportes, notificaciones, CRM y operaciones internas.",
        zh: "自动化重复工作、表单、报告、通知、CRM 流程和内部运营。",
      },
    },
    {
      id: "platforms",
      name: {
        en: "CRM & Business Platforms",
        ar: "CRM ومنصات الأعمال",
        es: "CRM y plataformas empresariales",
        zh: "CRM 与业务平台",
      },
      description: {
        en: "Custom client-management systems, booking platforms, memberships, databases, and administrative tools.",
        ar: "أنظمة مخصصة لإدارة العملاء، الحجز، العضويات، قواعد البيانات، والأدوات الإدارية.",
        es: "Sistemas de clientes, reservas, membresías, bases de datos y herramientas administrativas.",
        zh: "定制客户管理、预约、会员、数据库和后台管理平台。",
      },
    },
    {
      id: "mvp",
      name: {
        en: "AI MVP Development",
        ar: "تطوير MVP بالذكاء الاصطناعي",
        es: "Desarrollo de MVP con IA",
        zh: "AI MVP 开发",
      },
      description: {
        en: "Testable AI-powered prototypes and early products for founders and businesses.",
        ar: "نماذج ومنتجات أولية مدعومة بالذكاء الاصطناعي قابلة للتجربة والعرض والإطلاق.",
        es: "Prototipos y productos iniciales con IA que se pueden probar, presentar y lanzar.",
        zh: "面向创始人和企业的可测试、可展示、可上线的 AI 原型与早期产品。",
      },
    },
    {
      id: "ai-integration",
      name: {
        en: "AI Integration",
        ar: "تكامل الذكاء الاصطناعي",
        es: "Integración de IA",
        zh: "AI 集成",
      },
      description: {
        en: "Purposeful AI models, RAG and knowledge systems, recommendations, and API integrations.",
        ar: "نماذج AI، أنظمة RAG ومعرفة، توصيات، وتكاملات API تخدم هدفًا عمليًا.",
        es: "Modelos de IA, sistemas RAG, recomendaciones e integraciones API con propósito.",
        zh: "实用的 AI 模型、RAG 知识系统、推荐功能与 API 集成。",
      },
    },
    {
      id: "design",
      name: {
        en: "UI/UX & Product Design",
        ar: "تصميم UI/UX والمنتجات",
        es: "UI/UX y diseño de producto",
        zh: "UI/UX 与产品设计",
      },
      description: {
        en: "Research, user flows, wireframes, design systems, responsive prototypes, and complete product experiences.",
        ar: "بحث، مسارات مستخدم، Wireframes، أنظمة تصميم، نماذج متجاوبة، وتجارب منتج متكاملة.",
        es: "Investigación, flujos, wireframes, sistemas de diseño, prototipos y experiencias completas.",
        zh: "用户研究、流程、线框图、设计系统、响应式原型和完整产品体验。",
      },
    },
    {
      id: "custom-software",
      name: {
        en: "Custom Software",
        ar: "برمجيات مخصصة",
        es: "Software a medida",
        zh: "定制软件",
      },
      description: {
        en: "Software tailored to specific operational, team, integration, or customer needs.",
        ar: "برمجيات مصممة حسب احتياجات التشغيل، الفريق، التكاملات، أو العملاء.",
        es: "Software adaptado a necesidades operativas, del equipo, integraciones o clientes.",
        zh: "围绕运营、团队、系统集成或客户需求打造的定制软件。",
      },
    },
  ],
  industries: {
    en: ["Fitness & wellness", "Food & retail", "Professional services", "Education", "Startups", "Agencies", "E-commerce", "Local businesses"],
    ar: ["اللياقة والصحة", "الأغذية والتجزئة", "الخدمات المهنية", "التعليم", "الشركات الناشئة", "الوكالات", "التجارة الإلكترونية", "الأعمال المحلية"],
    es: ["Fitness y bienestar", "Alimentos y retail", "Servicios profesionales", "Educación", "Startups", "Agencias", "E-commerce", "Negocios locales"],
    zh: ["健身与健康", "食品与零售", "专业服务", "教育", "初创企业", "代理机构", "电子商务", "本地企业"],
  },
  team: [
    {
      id: "mohannad",
      name: "Mohannad",
      role: {
        en: "Founder & AI/Backend Lead",
        ar: "مؤسس وقائد الذكاء الاصطناعي والباكند",
        es: "Fundador y líder de IA/Backend",
        zh: "创始人兼 AI/后端负责人",
      },
      bio: {
        en: "Mohannad leads product direction, backend systems, AI logic, and client delivery.",
        ar: "مهند يقود اتجاه المنتج، أنظمة الباكند، منطق الذكاء الاصطناعي، وتسليم العمل للعملاء.",
        es: "Mohannad lidera la dirección de producto, backend, lógica de IA y entrega al cliente.",
        zh: "Mohannad 负责产品方向、后端系统、AI 逻辑和客户交付。",
      },
      responsibilities: [
        { en: "AI logic and integrations", ar: "منطق وتكاملات AI", es: "Lógica e integraciones de IA", zh: "AI 逻辑与集成" },
        { en: "Backend systems", ar: "أنظمة الباكند", es: "Sistemas backend", zh: "后端系统" },
        { en: "Product and client delivery", ar: "المنتج وتسليم العملاء", es: "Producto y entrega", zh: "产品与客户交付" },
      ],
    },
    {
      id: "moayad",
      name: "Moayad",
      role: {
        en: "Founder & Systems Architect",
        ar: "مؤسس ومهندس أنظمة",
        es: "Fundador y arquitecto de sistemas",
        zh: "创始人兼系统架构师",
      },
      bio: {
        en: "Moayad focuses on software development, system architecture, workflows, testing, and technical execution.",
        ar: "مؤيد يركز على تطوير البرمجيات، هيكلة الأنظمة، سير العمل، الاختبار، والتنفيذ التقني.",
        es: "Moayad se enfoca en desarrollo, arquitectura de sistemas, flujos, pruebas y ejecución técnica.",
        zh: "Moayad 专注于软件开发、系统架构、工作流程、测试和技术执行。",
      },
      responsibilities: [
        { en: "Software development", ar: "تطوير البرمجيات", es: "Desarrollo de software", zh: "软件开发" },
        { en: "System architecture", ar: "هندسة الأنظمة", es: "Arquitectura de sistemas", zh: "系统架构" },
        { en: "Testing and technical execution", ar: "الاختبار والتنفيذ التقني", es: "Pruebas y ejecución técnica", zh: "测试与技术执行" },
      ],
    },
  ] satisfies TeamMemberKnowledge[],
  products: [
    {
      id: "fitcoach",
      name: "AI FitCoach",
      url: "https://aifitcoach.dev/",
      description: {
        en: "An intelligent virtual personal trainer that creates personalized workout and nutrition plans, tracks progress, and provides AI-powered coaching.",
        ar: "مدرب شخصي افتراضي ذكي ينشئ خطط تمرين وتغذية مخصصة، يتابع التقدم، ويقدم إرشادًا مدعومًا بالذكاء الاصطناعي.",
        es: "Un entrenador personal virtual que crea planes de ejercicio y nutrición, sigue el progreso y ofrece coaching con IA.",
        zh: "智能虚拟私人教练，可生成个性化训练和营养计划、跟踪进度并提供 AI 指导。",
      },
      features: {
        en: ["Personalized workouts", "Nutrition plans", "AI fitness assistant", "Progress and schedule tracking", "Intelligent recommendations"],
        ar: ["تمارين مخصصة", "خطط تغذية", "مساعد لياقة AI", "تتبع التقدم والجدول", "توصيات ذكية"],
        es: ["Entrenamientos personalizados", "Planes de nutrición", "Asistente fitness IA", "Seguimiento", "Recomendaciones inteligentes"],
        zh: ["个性化训练", "营养计划", "AI 健身助手", "进度与日程跟踪", "智能推荐"],
      },
    },
    {
      id: "aurawallet",
      name: "AuraWallet",
      url: "https://finance-tracker-aurawallet-eight.vercel.app/",
      description: {
        en: "A personal finance platform for balances, income and expenses, spending categories, money owed, reports, and financial insights.",
        ar: "منصة مالية شخصية لإدارة الأرصدة، الدخل والمصروفات، التصنيفات، الديون، التقارير، والتحليلات المالية.",
        es: "Una plataforma de finanzas personales para saldos, ingresos, gastos, categorías, deudas, reportes e información financiera.",
        zh: "个人财务平台，用于管理余额、收支、消费分类、应收应付、报告和财务洞察。",
      },
      features: {
        en: ["Wallet overview", "Income and expense tracking", "Spending categories", "Reports and insights"],
        ar: ["ملخص المحفظة", "تتبع الدخل والمصروف", "تصنيفات الإنفاق", "تقارير وتحليلات"],
        es: ["Resumen de cartera", "Control de ingresos y gastos", "Categorías", "Reportes e insights"],
        zh: ["钱包概览", "收支跟踪", "消费分类", "报告与洞察"],
      },
    },
    {
      id: "letsbake",
      name: "Let's Bake",
      url: "https://let-s-bake-premium-hub.vercel.app/",
      description: {
        en: "A premium baking and e-commerce platform combining a product catalogue, recipes, wholesale requests, online ordering, and business administration.",
        ar: "منصة مخبوزات وتجارة إلكترونية تجمع كتالوج المنتجات، الوصفات، طلبات الجملة، الطلب أونلاين، وإدارة العمل.",
        es: "Una plataforma premium de repostería y e-commerce con catálogo, recetas, solicitudes mayoristas, pedidos y administración.",
        zh: "高端烘焙电商平台，整合商品目录、食谱、批发询价、在线订购和业务管理。",
      },
      features: {
        en: ["Premium catalogue", "Recipes", "Wholesale requests", "Responsive e-commerce"],
        ar: ["كتالوج احترافي", "وصفات", "طلبات جملة", "متجر متجاوب"],
        es: ["Catálogo premium", "Recetas", "Solicitudes mayoristas", "E-commerce responsive"],
        zh: ["高端商品目录", "食谱", "批发询价", "响应式电商体验"],
      },
    },
  ],
  pricing: {
    disclaimer: {
      en: "Prices are estimates. The final quote depends on features, pages, design depth, database and login needs, integrations, admin dashboard, AI, domain, hosting, and delivery timeline.",
      ar: "الأسعار تقديرية. السعر النهائي يعتمد على الخصائص، عدد الصفحات، عمق التصميم، قاعدة البيانات وتسجيل الدخول، التكاملات، لوحة التحكم، AI، الدومين، الاستضافة، ومدة التنفيذ.",
      es: "Los precios son estimados. La cotización final depende de funciones, páginas, diseño, base de datos, login, integraciones, admin, IA, dominio, hosting y plazo.",
      zh: "价格为预估范围。最终报价取决于功能、页面数量、设计复杂度、数据库与登录、系统集成、后台、AI、域名、托管和交付周期。",
    },
    packages: [
      {
        name: { en: "Basic Website", ar: "موقع أساسي", es: "Sitio web básico", zh: "基础网站" },
        price: "150 - 350 JOD",
        description: {
          en: "Best for landing pages and small business websites without complex backend logic.",
          ar: "مناسب لصفحات الهبوط ومواقع الأعمال الصغيرة دون منطق باكند معقد.",
          es: "Ideal para landing pages y sitios pequeños sin backend complejo.",
          zh: "适合落地页和无需复杂后端的小型企业网站。",
        },
        includes: [
          { en: "Responsive professional design", ar: "تصميم احترافي متجاوب", es: "Diseño profesional responsive", zh: "专业响应式设计" },
          { en: "Informational pages and gallery", ar: "صفحات تعريفية ومعرض", es: "Páginas informativas y galería", zh: "信息页面与图库" },
          { en: "Contact and WhatsApp", ar: "تواصل وربط واتساب", es: "Contacto y WhatsApp", zh: "联系表单与 WhatsApp" },
        ],
      },
      {
        name: { en: "Business Website + Admin", ar: "موقع بزنس مع لوحة تحكم", es: "Sitio empresarial + Admin", zh: "企业网站 + 后台" },
        price: "400 - 700 JOD",
        description: {
          en: "Best when you need editable content, products, offers, gallery management, booking, or a simple admin dashboard.",
          ar: "مناسب عند الحاجة لإدارة المحتوى، المنتجات، العروض، المعرض، الحجز، أو لوحة تحكم بسيطة.",
          es: "Ideal para contenido editable, productos, ofertas, galerías, reservas o un admin simple.",
          zh: "适合需要内容、商品、优惠、图库、预约或基础后台管理的企业。",
        },
        includes: [
          { en: "Everything in Basic", ar: "كل ميزات الموقع الأساسي", es: "Todo lo del básico", zh: "包含基础网站全部功能" },
          { en: "Admin dashboard", ar: "لوحة تحكم", es: "Panel de administración", zh: "管理后台" },
          { en: "Products, gallery, offers, or booking", ar: "منتجات أو معرض أو عروض أو حجز", es: "Productos, galería, ofertas o reservas", zh: "商品、图库、优惠或预约" },
        ],
      },
      {
        name: { en: "Complete System", ar: "نظام متكامل", es: "Sistema completo", zh: "完整系统" },
        price: "800 - 1500 JOD",
        description: {
          en: "Best for complete web apps with database, login, advanced admin, business logic, integrations, or AI/chatbot functionality.",
          ar: "مناسب لتطبيقات الويب الكاملة مع قاعدة بيانات، تسجيل دخول، إدارة متقدمة، منطق أعمال، تكاملات، أو AI وشات بوت.",
          es: "Ideal para apps completas con base de datos, login, admin avanzado, lógica, integraciones o IA/chatbot.",
          zh: "适合包含数据库、登录、高级后台、业务逻辑、系统集成或 AI/聊天机器人的完整 Web 应用。",
        },
        includes: [
          { en: "Database and login", ar: "قاعدة بيانات وتسجيل دخول", es: "Base de datos y login", zh: "数据库与登录" },
          { en: "Advanced admin dashboard", ar: "لوحة تحكم متقدمة", es: "Admin avanzado", zh: "高级管理后台" },
          { en: "Integrations, AI, or chatbot option", ar: "تكاملات وخيار AI أو شات بوت", es: "Integraciones, IA o chatbot", zh: "系统集成、AI 或聊天机器人" },
        ],
      },
    ] satisfies PackageKnowledge[],
  },
  process: [
    { en: "Discover: understand the business, audience, challenges, and goals.", ar: "اكتشاف: نفهم العمل، الجمهور، التحديات، والأهداف.", es: "Descubrir: entendemos negocio, audiencia, retos y objetivos.", zh: "探索：了解业务、受众、挑战和目标。" },
    { en: "Plan: define scope, priorities, user experience, and technical direction.", ar: "تخطيط: نحدد النطاق، الأولويات، تجربة المستخدم، والاتجاه التقني.", es: "Planificar: definimos alcance, prioridades, experiencia y dirección técnica.", zh: "规划：确定范围、优先级、用户体验和技术方向。" },
    { en: "Build: develop, integrate, test, and optimize the complete solution.", ar: "بناء: نطور ونربط ونختبر ونحسن الحل الكامل.", es: "Construir: desarrollamos, integramos, probamos y optimizamos.", zh: "构建：开发、集成、测试并优化完整解决方案。" },
    { en: "Launch & improve: release, monitor, support, and expand as the business grows.", ar: "إطلاق وتحسين: ننشر ونراقب وندعم ونوسع المنتج مع نمو العمل.", es: "Lanzar y mejorar: publicamos, monitorizamos, apoyamos y ampliamos.", zh: "上线与改进：发布、监控、支持，并随业务增长持续扩展。" },
  ],
  contact: {
    whatsapp: "+962 7 9919 5498",
    whatsappUrl: "https://wa.me/962799195498",
    email: "info@next-aura-ai.com",
    emailUrl: "mailto:info@next-aura-ai.com",
    linkedinUrl: "https://linkedin.com/company/nextaura-ai",
    location: {
      en: "Founded in Jordan, with UAE / Dubai presence and worldwide delivery.",
      ar: "تأسست في الأردن، مع حضور في الإمارات / دبي وتقديم خدمات للعملاء حول العالم.",
      es: "Fundada en Jordania, con presencia en EAU / Dubái y servicios para todo el mundo.",
      zh: "公司创立于约旦，在阿联酋/迪拜设有业务，并面向全球客户交付服务。",
    },
  },
} as const;

export function localize(value: Localized, language: SupportedLanguage) {
  return value[language] || value.en;
}
