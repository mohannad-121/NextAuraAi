import type { Language } from "@/i18n/translations";

export type JourneyService = {
  title: string;
  description: string;
};

export type JourneySectionContent = {
  eyebrow: string;
  title: string;
  body: string;
  groups: JourneyService[][];
};

export type CinematicJourneyContent = {
  depth: {
    label: string;
    progress: string;
    stages: Array<{ label: string; depth: string }>;
  };
  foundation: JourneySectionContent;
  automation: JourneySectionContent & {
    workflowLabel: string;
    workflow: string[];
  };
  intelligence: JourneySectionContent;
  core: {
    eyebrow: string;
    title: string;
    body: string;
    line: string;
    primary: string;
    secondary: string;
    final: string;
    logoAlt: string;
  };
};

const en: CinematicJourneyContent = {
  depth: {
    label: "Creative journey depth",
    progress: "Journey progress",
    stages: [
      { label: "Surface", depth: "0 m" },
      { label: "Foundation", depth: "250 m" },
      { label: "Automation", depth: "500 m" },
      { label: "Intelligence", depth: "750 m" },
      { label: "Core", depth: "1000 m" },
    ],
  },
  foundation: {
    eyebrow: "Digital Foundation",
    title: "Every powerful digital experience begins with a strong foundation.",
    body: "We design and build fast, scalable, and professional digital platforms tailored around your business.",
    groups: [
      [
        {
          title: "Website Development",
          description: "Fast, responsive websites engineered for clarity, trust, and growth.",
        },
        {
          title: "Landing Pages",
          description: "Focused launch experiences designed around one clear business action.",
        },
        {
          title: "E-commerce Platforms",
          description: "Conversion-ready stores with practical catalog and order workflows.",
        },
      ],
      [
        {
          title: "Booking Systems",
          description: "Smooth scheduling journeys for customers, teams, and operations.",
        },
        {
          title: "Admin Dashboards",
          description: "Purpose-built control centers for content, customers, and performance.",
        },
      ],
      [
        {
          title: "Multilingual Websites",
          description: "Localized experiences that communicate naturally across markets.",
        },
        {
          title: "Payment Integrations",
          description: "Secure payment flows connected cleanly to your digital platform.",
        },
      ],
    ],
  },
  automation: {
    eyebrow: "Automation Layer",
    title: "Below the surface, every process works together.",
    body: "We connect your tools, automate repetitive work, and build smarter workflows that save time and reduce manual effort.",
    workflowLabel: "Connected business workflow",
    workflow: [
      "Customer Request",
      "Website or Application",
      "Automation Engine",
      "CRM or Database",
      "Notification",
      "Completed Action",
    ],
    groups: [
      [
        {
          title: "Business Process Automation",
          description: "Connect repeated business steps into one reliable system.",
        },
        {
          title: "Workflow Automation",
          description: "Move work forward automatically with clear rules and handoffs.",
        },
        {
          title: "Automated Notifications",
          description: "Send timely updates to customers and teams without manual follow-up.",
        },
      ],
      [
        {
          title: "CRM Integrations",
          description: "Keep customer activity and sales data synchronized.",
        },
        {
          title: "API Integrations",
          description: "Make separate tools exchange information securely.",
        },
        {
          title: "Data Synchronization",
          description: "Maintain consistent records across your connected platforms.",
        },
      ],
      [
        {
          title: "Smart Booking Workflows",
          description: "Coordinate availability, confirmations, reminders, and follow-up.",
        },
      ],
    ],
  },
  intelligence: {
    eyebrow: "AI Intelligence Core",
    title: "Deeper intelligence creates smarter businesses.",
    body: "We build artificial intelligence solutions that understand information, automate decisions, and create better experiences for your customers and team.",
    groups: [
      [
        {
          title: "AI Chatbots",
          description: "Natural conversations that answer questions and guide customers.",
        },
        {
          title: "AI Assistants",
          description: "Focused assistants that support customers and internal teams.",
        },
        {
          title: "Natural Language Processing",
          description: "Systems that interpret, organize, and act on human language.",
        },
      ],
      [
        {
          title: "RAG Systems",
          description: "Ground AI answers in your approved documents and business knowledge.",
        },
        {
          title: "Machine Learning Solutions",
          description: "Turn business data into useful patterns, signals, and predictions.",
        },
      ],
      [
        {
          title: "Intelligent Data Analysis",
          description: "Reveal meaningful insights inside complex operational data.",
        },
        {
          title: "Custom AI Integrations",
          description: "Add purposeful intelligence directly to the products you already use.",
        },
      ],
    ],
  },
  core: {
    eyebrow: "NextAura Core",
    title: "We build what comes next.",
    body: "Websites, automation, and artificial intelligence built around your business.",
    line: "Your vision is the starting point. We build the system behind it.",
    primary: "Start Your Project",
    secondary: "Contact Us",
    final: "Welcome to the next era of your business.",
    logoAlt: "NextAura AI",
  },
};

const ar: CinematicJourneyContent = {
  depth: {
    label: "العمق الإبداعي للرحلة",
    progress: "تقدم الرحلة",
    stages: [
      { label: "السطح", depth: "0 م" },
      { label: "الأساس", depth: "250 م" },
      { label: "الأتمتة", depth: "500 م" },
      { label: "الذكاء", depth: "750 م" },
      { label: "النواة", depth: "1000 م" },
    ],
  },
  foundation: {
    eyebrow: "الأساس الرقمي",
    title: "كل تجربة رقمية قوية تبدأ بأساس متين.",
    body: "نصمم ونبني منصات رقمية سريعة وقابلة للتوسع واحترافية، مصممة خصيصًا حول احتياجات عملك.",
    groups: [
      [
        {
          title: "تطوير المواقع",
          description: "مواقع سريعة ومتجاوبة، مبنية لتعزيز الوضوح والثقة والنمو.",
        },
        {
          title: "صفحات الهبوط",
          description: "تجارب إطلاق مركزة تقود الزائر نحو إجراء تجاري واضح.",
        },
        {
          title: "منصات التجارة الإلكترونية",
          description: "متاجر جاهزة للتحويل مع إدارة عملية للمنتجات والطلبات.",
        },
      ],
      [
        { title: "أنظمة الحجز", description: "رحلات حجز سلسة للعملاء والفرق والعمليات." },
        {
          title: "لوحات التحكم الإدارية",
          description: "مراكز تحكم مخصصة للمحتوى والعملاء وقياس الأداء.",
        },
      ],
      [
        {
          title: "مواقع متعددة اللغات",
          description: "تجارب محلية تتواصل بصورة طبيعية في مختلف الأسواق.",
        },
        { title: "تكاملات الدفع", description: "عمليات دفع آمنة ومتصلة بسلاسة مع منصتك الرقمية." },
      ],
    ],
  },
  automation: {
    eyebrow: "طبقة الأتمتة",
    title: "تحت السطح، تعمل كل عملية بتناغم.",
    body: "نربط أدواتك، ونؤتمت الأعمال المتكررة، ونبني مسارات عمل أذكى توفر الوقت وتقلل الجهد اليدوي.",
    workflowLabel: "مسار عمل مترابط",
    workflow: [
      "طلب العميل",
      "الموقع أو التطبيق",
      "محرك الأتمتة",
      "نظام العملاء أو قاعدة البيانات",
      "الإشعار",
      "اكتمال الإجراء",
    ],
    groups: [
      [
        {
          title: "أتمتة عمليات الأعمال",
          description: "نربط خطوات العمل المتكررة في نظام واحد موثوق.",
        },
        {
          title: "أتمتة مسارات العمل",
          description: "نُحرك العمل تلقائيًا وفق قواعد وتسليمات واضحة.",
        },
        {
          title: "الإشعارات الآلية",
          description: "تحديثات فورية للعملاء والفرق دون متابعة يدوية.",
        },
      ],
      [
        { title: "تكاملات CRM", description: "مزامنة نشاط العملاء وبيانات المبيعات باستمرار." },
        { title: "تكاملات API", description: "تمكين الأدوات المنفصلة من تبادل المعلومات بأمان." },
        { title: "مزامنة البيانات", description: "الحفاظ على سجلات متسقة عبر المنصات المتصلة." },
      ],
      [
        {
          title: "مسارات حجز ذكية",
          description: "تنسيق المواعيد والتأكيدات والتذكيرات والمتابعة.",
        },
      ],
    ],
  },
  intelligence: {
    eyebrow: "نواة الذكاء الاصطناعي",
    title: "ذكاء أعمق يصنع أعمالًا أكثر تطورًا.",
    body: "نبني حلول ذكاء اصطناعي تفهم المعلومات، وتؤتمت القرارات، وتصنع تجارب أفضل لعملائك وفريقك.",
    groups: [
      [
        {
          title: "روبوتات محادثة ذكية",
          description: "محادثات طبيعية تجيب عن الأسئلة وتوجه العملاء.",
        },
        {
          title: "مساعدون بالذكاء الاصطناعي",
          description: "مساعدون متخصصون يدعمون العملاء والفرق الداخلية.",
        },
        {
          title: "معالجة اللغة الطبيعية",
          description: "أنظمة تفهم اللغة البشرية وتنظمها وتتفاعل معها.",
        },
      ],
      [
        {
          title: "أنظمة RAG",
          description: "إجابات ذكاء اصطناعي تستند إلى مستنداتك ومعرفتك المعتمدة.",
        },
        {
          title: "حلول تعلم الآلة",
          description: "تحويل بيانات العمل إلى أنماط ومؤشرات وتوقعات مفيدة.",
        },
      ],
      [
        {
          title: "تحليل البيانات الذكي",
          description: "استخراج رؤى ذات معنى من البيانات التشغيلية المعقدة.",
        },
        {
          title: "تكاملات ذكاء اصطناعي مخصصة",
          description: "إضافة ذكاء هادف مباشرة إلى المنتجات التي تستخدمها.",
        },
      ],
    ],
  },
  core: {
    eyebrow: "نواة NextAura",
    title: "نبني ما يأتي بعد ذلك.",
    body: "مواقع وأتمتة وذكاء اصطناعي مبنية حول احتياجات عملك.",
    line: "رؤيتك هي نقطة البداية. ونحن نبني النظام الذي يحققها.",
    primary: "ابدأ مشروعك",
    secondary: "تواصل معنا",
    final: "مرحبًا بك في العصر القادم لأعمالك.",
    logoAlt: "NextAura AI",
  },
};

const es: CinematicJourneyContent = {
  depth: {
    label: "Profundidad creativa del viaje",
    progress: "Progreso del viaje",
    stages: [
      { label: "Superficie", depth: "0 m" },
      { label: "Fundación", depth: "250 m" },
      { label: "Automatización", depth: "500 m" },
      { label: "Inteligencia", depth: "750 m" },
      { label: "Núcleo", depth: "1000 m" },
    ],
  },
  foundation: {
    eyebrow: "Fundación digital",
    title: "Toda experiencia digital potente comienza con una base sólida.",
    body: "Diseñamos y construimos plataformas digitales rápidas, escalables y profesionales, adaptadas a tu negocio.",
    groups: [
      [
        {
          title: "Desarrollo web",
          description:
            "Sitios rápidos y responsive, creados para generar claridad, confianza y crecimiento.",
        },
        {
          title: "Landing pages",
          description: "Experiencias de lanzamiento enfocadas en una acción de negocio clara.",
        },
        {
          title: "Plataformas e-commerce",
          description:
            "Tiendas orientadas a conversión con flujos prácticos de catálogo y pedidos.",
        },
      ],
      [
        {
          title: "Sistemas de reservas",
          description: "Reservas fluidas para clientes, equipos y operaciones.",
        },
        {
          title: "Paneles administrativos",
          description: "Centros de control para contenido, clientes y rendimiento.",
        },
      ],
      [
        {
          title: "Sitios multilingües",
          description: "Experiencias localizadas que comunican con naturalidad en cada mercado.",
        },
        {
          title: "Integraciones de pago",
          description: "Pagos seguros conectados limpiamente con tu plataforma digital.",
        },
      ],
    ],
  },
  automation: {
    eyebrow: "Capa de automatización",
    title: "Bajo la superficie, cada proceso trabaja en conjunto.",
    body: "Conectamos tus herramientas, automatizamos el trabajo repetitivo y creamos flujos más inteligentes que ahorran tiempo y esfuerzo manual.",
    workflowLabel: "Flujo empresarial conectado",
    workflow: [
      "Solicitud del cliente",
      "Web o aplicación",
      "Motor de automatización",
      "CRM o base de datos",
      "Notificación",
      "Acción completada",
    ],
    groups: [
      [
        {
          title: "Automatización de procesos",
          description: "Conecta pasos repetitivos en un único sistema fiable.",
        },
        {
          title: "Automatización de flujos",
          description: "Impulsa el trabajo con reglas y entregas claras.",
        },
        {
          title: "Notificaciones automáticas",
          description: "Actualiza a clientes y equipos sin seguimiento manual.",
        },
      ],
      [
        {
          title: "Integraciones CRM",
          description: "Mantén sincronizada la actividad del cliente y las ventas.",
        },
        {
          title: "Integraciones API",
          description:
            "Permite que distintas herramientas intercambien información de forma segura.",
        },
        {
          title: "Sincronización de datos",
          description: "Conserva registros coherentes en todas tus plataformas.",
        },
      ],
      [
        {
          title: "Reservas inteligentes",
          description: "Coordina disponibilidad, confirmaciones, recordatorios y seguimiento.",
        },
      ],
    ],
  },
  intelligence: {
    eyebrow: "Núcleo de inteligencia IA",
    title: "Una inteligencia más profunda crea negocios más inteligentes.",
    body: "Creamos soluciones de inteligencia artificial que entienden información, automatizan decisiones y mejoran la experiencia de clientes y equipos.",
    groups: [
      [
        {
          title: "Chatbots con IA",
          description: "Conversaciones naturales que responden preguntas y orientan al cliente.",
        },
        {
          title: "Asistentes con IA",
          description: "Asistentes enfocados que apoyan a clientes y equipos internos.",
        },
        {
          title: "Procesamiento del lenguaje",
          description: "Sistemas que interpretan, organizan y utilizan lenguaje humano.",
        },
      ],
      [
        {
          title: "Sistemas RAG",
          description: "Respuestas de IA basadas en tus documentos y conocimiento aprobado.",
        },
        {
          title: "Soluciones de machine learning",
          description: "Convierte datos de negocio en patrones, señales y predicciones útiles.",
        },
      ],
      [
        {
          title: "Análisis inteligente de datos",
          description: "Descubre información útil dentro de datos operativos complejos.",
        },
        {
          title: "Integraciones de IA a medida",
          description: "Añade inteligencia útil directamente a los productos que ya utilizas.",
        },
      ],
    ],
  },
  core: {
    eyebrow: "Núcleo NextAura",
    title: "Construimos lo que viene después.",
    body: "Sitios web, automatización e inteligencia artificial creados alrededor de tu negocio.",
    line: "Tu visión es el punto de partida. Nosotros construimos el sistema que la impulsa.",
    primary: "Inicia tu proyecto",
    secondary: "Contáctanos",
    final: "Bienvenido a la próxima era de tu negocio.",
    logoAlt: "NextAura AI",
  },
};

export const cinematicJourneyContent: Record<Language, CinematicJourneyContent> = { en, ar, es };
