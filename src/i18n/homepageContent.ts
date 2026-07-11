import type { Language } from "@/i18n/translations";

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

const en = {
  nav: {
    home: "Home",
    services: "Services",
    about: "About",
    projects: "Projects",
    process: "Process",
    team: "Team",
    insights: "Insights",
    contact: "Contact",
    start: "Start a Project",
    menu: "Open menu",
    close: "Close menu",
  },
  hero: {
    eyebrow: "AI • SOFTWARE • DIGITAL EXPERIENCES",
    lead: "We turn ambitious ideas into ",
    accent: "intelligent digital products.",
    body: "NextAura AI designs and builds intelligent websites, AI assistants, automation systems, business platforms, and custom digital experiences for ambitious brands.",
    primary: "Start a Project",
    secondary: "Explore Our Work",
    trust: "Based in Jordan • Serving Jordan, UAE and beyond",
    scroll: "Explore",
  },
  trust: [
    { value: "2", label: "Founders" },
    { value: "6+", label: "Digital services" },
    { value: "AI", label: "Driven solutions" },
    { value: "JO • UAE", label: "Regional presence" },
    { value: "100%", label: "Custom development" },
  ],
  services: {
    eyebrow: "WHAT WE DO",
    title: "Technology that moves businesses forward.",
    body: "From digital presence to intelligent automation, we create systems designed around real business needs.",
    cta: "Discuss your project",
    items: [
      {
        title: "Website Design & Development",
        description:
          "High-performance websites, corporate platforms, portfolios, landing pages, and interactive web experiences.",
      },
      {
        title: "AI Chatbots & Virtual Assistants",
        description:
          "Intelligent assistants trained around business information, services, products, and customer questions.",
      },
      {
        title: "Business Automation",
        description:
          "Automated workflows for operations, communication, data handling, and repetitive internal processes.",
      },
      {
        title: "CRM & Business Platforms",
        description:
          "Custom dashboards, client systems, booking platforms, memberships, and administrative tools.",
      },
      {
        title: "AI Integration",
        description:
          "AI models, retrieval systems, recommendation engines, APIs, and purposeful intelligent functionality.",
      },
      {
        title: "UI/UX & Product Design",
        description:
          "Research, wireframes, interface systems, responsive prototypes, and complete product experiences.",
      },
      {
        title: "Custom Software Development",
        description:
          "Tailored software designed around specific operational, team, or customer needs.",
      },
      {
        title: "MVP Development",
        description:
          "A focused path from idea to a functional, testable, and scalable initial product.",
      },
    ],
  },
  about: {
    eyebrow: "WHO WE ARE",
    title: "Small team. Serious product energy.",
    first:
      "NextAura AI is a technology company founded by two specialists who combine artificial intelligence, software development, product thinking, and creative execution. We build digital systems that do more than look good—they solve problems, simplify operations, and help businesses grow.",
    second:
      "Every project is approached as a custom product. We study the business, define the right solution, design the experience, build the system, and continue refining it after launch.",
    highlights: [
      "AI-first thinking",
      "Custom-built solutions",
      "Product-focused execution",
      "Clear communication",
      "Scalable technology",
    ],
    imageAlt: "Abstract NextAura technology sculpture",
  },
  industries: {
    eyebrow: "WHO WE BUILD FOR",
    title: "Digital solutions shaped around your industry.",
    body: "Different industries need different systems. We shape the product around your customers, operations, and growth model.",
    imageAlt: "Connected digital landscape representing industries in Jordan and the UAE",
    items: [
      "Fitness & Wellness",
      "Food & Retail",
      "Professional Services",
      "Education",
      "Startups",
      "Agencies",
      "E-commerce",
      "Local Businesses",
    ],
  },
  team: {
    eyebrow: "THE FOUNDERS",
    title: "Two perspectives. One product mindset.",
    body: "A compact founding team that stays close to the strategy, design, technology, and delivery of every product.",
    members: {
      mohannad: {
        role: "Founder & AI/Backend Lead",
        description: "AI, backend systems, product development, and business direction.",
      },
      moayad: {
        role: "Co-Founder & Systems Architect",
        description: "Software development, system architecture, and technical execution.",
      },
    },
  },
  process: {
    eyebrow: "OUR PROCESS",
    title: "From the first conversation to a product ready for the real world.",
    scroll: "Scroll to follow the build",
    steps: [
      {
        title: "Discover",
        description: "We understand your business, audience, challenges, and objectives.",
      },
      {
        title: "Define",
        description:
          "We translate the idea into a clear scope, feature plan, and technical direction.",
      },
      {
        title: "Design",
        description: "We create the user experience, visual system, and interactive prototype.",
      },
      {
        title: "Build",
        description: "We develop, integrate, test, and optimize the complete solution.",
      },
      { title: "Launch", description: "We deploy the product and prepare it for real users." },
      {
        title: "Improve",
        description: "We support, analyze, refine, and expand the product as the business grows.",
      },
    ],
  },
  featured: {
    eyebrow: "FEATURED PRODUCT",
    title: "FitCoach AI — Intelligent Virtual Personal Trainer",
    body: "An AI-powered fitness platform that combines personalized workout and nutrition planning, AI conversation, intelligent recommendations, scheduling, exercise guidance, and user data.",
    features: [
      "Personalized workout plans",
      "Personalized nutrition guidance",
      "AI fitness assistant",
      "Intelligent recommendations",
      "Schedule and plan management",
      "Interactive exercise content",
      "User profiles and progress data",
    ],
    tags: ["Artificial Intelligence", "Fitness Platform", "Personalization", "Product Design"],
    caseStudy: "View Case Study",
    liveDemo: "Open Live Demo",
  },
  work: {
    eyebrow: "SELECTED WORK",
    title: "A glimpse into what we build.",
    body: "Real internal products alongside clearly labelled concepts that demonstrate the systems and experiences we can create.",
    view: "View project",
    items: [
      {
        name: "FitCoach AI",
        category: "AI Fitness Platform",
        status: "Internal Product",
        description:
          "Personalized workouts, nutrition guidance, scheduling, and an AI fitness assistant.",
        image: "/images/cinematic/ai-assistant.webp",
      },
      {
        name: "Business CRM",
        category: "Operations Platform",
        status: "Concept",
        description:
          "A connected workspace for clients, pipeline, tasks, schedules, and business reporting.",
        image: "/images/cinematic/business-automation.webp",
      },
      {
        name: "Digital Commerce",
        category: "Website & Platform",
        status: "Concept",
        description:
          "An editorial storefront and mobile buying experience designed around conversion and operations.",
        image: "/images/cinematic/digital-commerce.webp",
      },
    ],
  },
  benefits: {
    eyebrow: "WHY NEXTAURA",
    title: "Why businesses choose us",
    items: [
      {
        title: "Personalized, Not Generic",
        description:
          "Every solution is designed around the specific business, audience, and goals.",
      },
      {
        title: "Modern Technology",
        description:
          "We select current, scalable tools for the actual requirements of the product.",
      },
      {
        title: "AI With a Purpose",
        description:
          "AI is implemented where it creates real value, not added as a marketing label.",
      },
      {
        title: "End-to-End Execution",
        description: "Strategy, design, development, integration, deployment, and support.",
      },
      {
        title: "Clear Communication",
        description: "Transparent stages, realistic expectations, and direct collaboration.",
      },
      {
        title: "Built for Growth",
        description: "Products are structured so they can evolve as the business expands.",
      },
    ],
  },
  quality: {
    eyebrow: "DELIVERY STANDARD",
    title: "Built, tested, and ready to launch.",
    body: "We design, build, test, and refine digital products with attention to performance, usability, scalability, and long-term business value.",
    words: ["Responsive", "Accessible", "Secure", "Performant", "Scalable", "Maintainable"],
  },
  values: {
    eyebrow: "HOW WE COLLABORATE",
    title: "What we value in every collaboration.",
    body: "No invented testimonials. Just the standards we bring to every working relationship.",
    items: [
      { title: "Communication", description: "Direct, useful updates throughout the project." },
      {
        title: "Transparency",
        description: "Clear scope, priorities, decisions, and expectations.",
      },
      { title: "Quality", description: "Care in the visible experience and the system behind it." },
      {
        title: "Responsibility",
        description: "We own the details and follow through on commitments.",
      },
      {
        title: "Long-term thinking",
        description: "Solutions designed to keep creating value after launch.",
      },
    ],
  },
  insights: {
    eyebrow: "INSIGHTS",
    title: "Ideas, lessons, and practical technology insights.",
    body: "Straightforward thinking for businesses planning a website, an automation system, or an AI-powered product.",
    read: "Read more",
    items: [
      {
        category: "AI for Business",
        title: "How AI Assistants Can Support Small Businesses",
        excerpt:
          "Where assistants create practical value across customer questions, leads, and internal knowledge.",
        image: "/images/cinematic/ai-assistant.webp",
      },
      {
        category: "Digital Strategy",
        title: "What Makes a Business Website Actually Effective?",
        excerpt:
          "A useful website connects story, usability, performance, and a clear business action.",
        image: "/images/cinematic/digital-commerce.webp",
      },
      {
        category: "Business Systems",
        title: "CRM vs Custom Business Platform",
        excerpt:
          "How to choose between adapting an existing tool and building around your own workflow.",
        image: "/images/cinematic/business-automation.webp",
      },
      {
        category: "Product",
        title: "From Idea to MVP: A Practical Roadmap",
        excerpt:
          "A focused path for defining, designing, building, and testing the first useful version.",
        image: "/images/cinematic/nextaura-sculpture.webp",
      },
    ],
  },
  media: {
    eyebrow: "INSIDE NEXTAURA",
    title: "Latest from NextAura",
    body: "Temporary media slots prepared for product demos, useful AI tips, and behind-the-scenes stories.",
    play: "Play video",
    close: "Close video",
    placeholder: "Placeholder media — replace before publication",
    items: [
      {
        category: "Product demo",
        title: "Designing an intelligent product",
        poster: "/images/cinematic/ai-assistant.webp",
      },
      {
        category: "Development process",
        title: "From workflow to working system",
        poster: "/images/cinematic/business-automation.webp",
      },
      {
        category: "Website transformation",
        title: "Turning a digital presence into an experience",
        poster: "/images/cinematic/digital-commerce.webp",
      },
    ],
  },
  cta: {
    eyebrow: "START THE CONVERSATION",
    title: "Have an idea? Let’s turn it into a product.",
    body: "Tell us what you want to build, improve, or automate. We’ll help you define the right next step.",
    start: "Start a Project",
    whatsapp: "Chat on WhatsApp",
  },
  footer: {
    description:
      "NextAura AI builds websites, intelligent assistants, automation systems, and custom software for ambitious businesses.",
    navigation: "Navigation",
    services: "Services",
    contact: "Contact",
    location: "Jordan • UAE / Dubai presence",
    privacy: "Privacy Policy",
    terms: "Terms",
    built: "Built by NextAura AI",
  },
};

const ar: Widen<typeof en> = {
  ...en,
  nav: {
    home: "الرئيسية",
    services: "الخدمات",
    about: "من نحن",
    projects: "المشاريع",
    process: "آلية العمل",
    team: "الفريق",
    insights: "المعرفة",
    contact: "تواصل",
    start: "ابدأ مشروعك",
    menu: "افتح القائمة",
    close: "أغلق القائمة",
  },
  hero: {
    eyebrow: "ذكاء اصطناعي • برمجيات • تجارب رقمية",
    lead: "نحوّل الأفكار الطموحة إلى ",
    accent: "منتجات رقمية ذكية.",
    body: "تصمم NextAura AI وتبني مواقع ذكية، ومساعدين بالذكاء الاصطناعي، وأنظمة أتمتة، ومنصات أعمال، وتجارب رقمية مخصصة للعلامات الطموحة.",
    primary: "ابدأ مشروعك",
    secondary: "استكشف أعمالنا",
    trust: "من الأردن • نخدم الأردن والإمارات وما بعدهما",
    scroll: "استكشف",
  },
  trust: [
    { value: "2", label: "مؤسسون" },
    { value: "+6", label: "خدمات رقمية" },
    { value: "AI", label: "حلول ذكية" },
    { value: "JO • UAE", label: "حضور إقليمي" },
    { value: "100%", label: "تطوير مخصص" },
  ],
  services: {
    eyebrow: "ماذا نقدم",
    title: "تقنية تدفع الأعمال إلى الأمام.",
    body: "من الحضور الرقمي إلى الأتمتة الذكية، نصنع أنظمة مبنية حول احتياجات العمل الحقيقية.",
    cta: "ناقش مشروعك",
    items: [
      {
        title: "تصميم وتطوير المواقع",
        description: "مواقع سريعة، ومنصات شركات، وصفحات هبوط، ومحافظ أعمال وتجارب ويب تفاعلية.",
      },
      {
        title: "مساعدون وشات بوتات ذكية",
        description: "مساعدون مدربون على معلومات العمل وخدماته ومنتجاته وأسئلة العملاء.",
      },
      {
        title: "أتمتة الأعمال",
        description: "سير عمل آلي للعمليات والتواصل والبيانات والمهام الداخلية المتكررة.",
      },
      {
        title: "CRM ومنصات الأعمال",
        description: "لوحات تحكم وأنظمة عملاء وحجز وعضويات وأدوات إدارية مخصصة.",
      },
      {
        title: "تكامل الذكاء الاصطناعي",
        description: "نماذج AI وأنظمة استرجاع وتوصيات وواجهات API ووظائف ذكية هادفة.",
      },
      {
        title: "تصميم UI/UX والمنتجات",
        description: "بحث وتجربة مستخدم وواجهات وأنظمة متجاوبة ونماذج أولية متكاملة.",
      },
      {
        title: "تطوير برمجيات مخصصة",
        description: "حلول برمجية مصممة للاحتياجات التشغيلية أو احتياجات الفريق والعملاء.",
      },
      {
        title: "تطوير MVP",
        description: "طريق مركز من الفكرة إلى منتج أولي وظيفي وقابل للاختبار والتوسع.",
      },
    ],
  },
  about: {
    eyebrow: "من نحن",
    title: "فريق صغير. طاقة كبيرة لبناء المنتجات.",
    first:
      "NextAura AI شركة تقنية أسسها متخصصان يجمعان بين الذكاء الاصطناعي وتطوير البرمجيات والتفكير المنتج والتنفيذ الإبداعي. نبني أنظمة رقمية لا تكتفي بالمظهر، بل تحل المشكلات وتبسط العمليات وتساعد الأعمال على النمو.",
    second:
      "نتعامل مع كل مشروع كمنتج مخصص. ندرس العمل، ونحدد الحل الصحيح، ونصمم التجربة، ونبني النظام، ثم نواصل تحسينه بعد الإطلاق.",
    highlights: [
      "تفكير يبدأ بالذكاء الاصطناعي",
      "حلول مخصصة",
      "تنفيذ يركز على المنتج",
      "تواصل واضح",
      "تقنية قابلة للتوسع",
    ],
    imageAlt: "منحوتة تقنية تجريدية لـ NextAura",
  },
  industries: {
    eyebrow: "لمن نبني",
    title: "حلول رقمية مصممة حول قطاعك.",
    body: "لكل قطاع احتياجات مختلفة. نصمم المنتج حول عملائك وعملياتك ونموذج نموك.",
    imageAlt: "مشهد رقمي مترابط يمثل القطاعات في الأردن والإمارات",
    items: [
      "اللياقة والعافية",
      "الطعام والتجزئة",
      "الخدمات المهنية",
      "التعليم",
      "الشركات الناشئة",
      "الوكالات",
      "التجارة الإلكترونية",
      "الأعمال المحلية",
    ],
  },
  team: {
    eyebrow: "المؤسسون",
    title: "وجهتا نظر. عقلية منتج واحدة.",
    body: "فريق مؤسس قريب من الاستراتيجية والتصميم والتقنية وتسليم كل منتج.",
    members: {
      mohannad: {
        role: "Founder & AI/Backend Lead",
        description: "الذكاء الاصطناعي وأنظمة الباكند وتطوير المنتج واتجاه الأعمال.",
      },
      moayad: {
        role: "Co-Founder & Systems Architect",
        description: "تطوير البرمجيات وهيكلة الأنظمة والتنفيذ التقني.",
      },
    },
  },
  process: {
    eyebrow: "آلية عملنا",
    title: "من أول محادثة إلى منتج جاهز للعالم الحقيقي.",
    scroll: "مرّر لمتابعة مراحل البناء",
    steps: [
      { title: "اكتشاف", description: "نفهم عملك وجمهورك وتحدياتك وأهدافك." },
      { title: "تحديد", description: "نحوّل الفكرة إلى نطاق واضح وخطة ميزات واتجاه تقني." },
      { title: "تصميم", description: "نصمم تجربة المستخدم والنظام البصري والنموذج التفاعلي." },
      { title: "بناء", description: "نطور الحل الكامل وندمجه ونختبره ونحسنه." },
      { title: "إطلاق", description: "ننشر المنتج ونجهزه للمستخدمين الحقيقيين." },
      { title: "تحسين", description: "ندعم المنتج ونحلله ونطوره مع نمو العمل." },
    ],
  },
  featured: {
    eyebrow: "منتج مميز",
    title: "FitCoach AI — مدرب شخصي افتراضي ذكي",
    body: "منصة لياقة مدعومة بالذكاء الاصطناعي تجمع بين خطط التمرين والتغذية المخصصة والمحادثة الذكية والتوصيات والجدولة وإرشاد التمارين وبيانات المستخدم.",
    features: [
      "خطط تمرين مخصصة",
      "إرشاد تغذية مخصص",
      "مساعد لياقة ذكي",
      "توصيات ذكية",
      "إدارة الخطط والجدول",
      "محتوى تمارين تفاعلي",
      "ملفات المستخدم وبيانات التقدم",
    ],
    tags: ["ذكاء اصطناعي", "منصة لياقة", "تخصيص", "تصميم المنتج"],
    caseStudy: "عرض دراسة الحالة",
    liveDemo: "فتح العرض المباشر",
  },
  work: {
    ...en.work,
    eyebrow: "أعمال مختارة",
    title: "لمحة عما نبنيه.",
    body: "منتجات داخلية حقيقية مع مفاهيم موضحة بوضوح تستعرض الأنظمة والتجارب التي يمكننا بناؤها.",
    view: "عرض المشروع",
    items: [
      {
        ...en.work.items[0],
        category: "منصة لياقة ذكية",
        status: "منتج داخلي",
        description: "تمارين وتغذية مخصصة وجدولة ومساعد لياقة ذكي.",
      },
      {
        ...en.work.items[1],
        category: "منصة عمليات",
        status: "مفهوم",
        description: "مساحة مترابطة للعملاء والمبيعات والمهام والجداول وتقارير الأعمال.",
      },
      {
        ...en.work.items[2],
        category: "موقع ومنصة",
        status: "مفهوم",
        description: "متجر تحريري وتجربة شراء للموبايل مصممة حول التحويل والعمليات.",
      },
    ],
  },
  benefits: {
    eyebrow: "لماذا NextAura",
    title: "لماذا تختارنا الأعمال",
    items: [
      { title: "مخصص وليس عامًا", description: "كل حل مصمم حول العمل والجمهور والأهداف." },
      {
        title: "تقنية حديثة",
        description: "نختار أدوات حديثة وقابلة للتوسع حسب احتياجات المنتج الفعلية.",
      },
      {
        title: "ذكاء اصطناعي هادف",
        description: "نستخدم AI حيث يصنع قيمة حقيقية، لا كشعار تسويقي.",
      },
      { title: "تنفيذ متكامل", description: "استراتيجية وتصميم وتطوير وتكامل ونشر ودعم." },
      { title: "تواصل واضح", description: "مراحل شفافة وتوقعات واقعية وتعاون مباشر." },
      { title: "مبني للنمو", description: "هيكلة تسمح للمنتج بالتطور مع توسع العمل." },
    ],
  },
  quality: {
    eyebrow: "معيار التسليم",
    title: "مبني، مختبر، وجاهز للإطلاق.",
    body: "نصمم ونبني ونختبر ونحسن المنتجات الرقمية مع الاهتمام بالأداء وسهولة الاستخدام والتوسع والقيمة طويلة المدى.",
    words: ["متجاوب", "سهل الوصول", "آمن", "سريع", "قابل للتوسع", "سهل الصيانة"],
  },
  values: {
    eyebrow: "كيف نتعاون",
    title: "ما نقدّره في كل تعاون.",
    body: "لا شهادات مختلقة. فقط المعايير التي نحملها إلى كل علاقة عمل.",
    items: [
      { title: "التواصل", description: "تحديثات مباشرة ومفيدة طوال المشروع." },
      { title: "الشفافية", description: "وضوح في النطاق والأولويات والقرارات والتوقعات." },
      { title: "الجودة", description: "عناية بالتجربة الظاهرة والنظام خلفها." },
      { title: "المسؤولية", description: "نمتلك التفاصيل ونلتزم بما نتعهد به." },
      { title: "تفكير طويل المدى", description: "حلول تستمر في صنع القيمة بعد الإطلاق." },
    ],
  },
  insights: {
    ...en.insights,
    eyebrow: "معرفة",
    title: "أفكار ودروس ورؤى تقنية عملية.",
    body: "تفكير واضح للأعمال التي تخطط لموقع أو نظام أتمتة أو منتج مدعوم بالذكاء الاصطناعي.",
    read: "اقرأ المزيد",
    items: en.insights.items,
  },
  media: {
    ...en.media,
    eyebrow: "داخل NextAura",
    title: "الأحدث من NextAura",
    body: "مساحات وسائط مؤقتة جاهزة لعروض المنتجات ونصائح AI وكواليس العمل.",
    play: "تشغيل الفيديو",
    close: "إغلاق الفيديو",
    placeholder: "وسائط مؤقتة — تُستبدل قبل النشر",
    items: en.media.items,
  },
  cta: {
    eyebrow: "ابدأ المحادثة",
    title: "عندك فكرة؟ خلينا نحولها إلى منتج.",
    body: "احكِ لنا ماذا تريد أن تبني أو تحسن أو تؤتمت. سنساعدك في تحديد الخطوة الصحيحة التالية.",
    start: "ابدأ مشروعك",
    whatsapp: "تواصل عبر واتساب",
  },
  footer: {
    description:
      "تبني NextAura AI مواقع ومساعدين أذكياء وأنظمة أتمتة وبرمجيات مخصصة للأعمال الطموحة.",
    navigation: "التنقل",
    services: "الخدمات",
    contact: "التواصل",
    location: "الأردن • حضور في الإمارات / دبي",
    privacy: "سياسة الخصوصية",
    terms: "الشروط",
    built: "بُني بواسطة NextAura AI",
  },
};

const es: Widen<typeof en> = {
  ...en,
  nav: {
    home: "Inicio",
    services: "Servicios",
    about: "Nosotros",
    projects: "Proyectos",
    process: "Proceso",
    team: "Equipo",
    insights: "Ideas",
    contact: "Contacto",
    start: "Iniciar un proyecto",
    menu: "Abrir menú",
    close: "Cerrar menú",
  },
  hero: {
    eyebrow: "IA • SOFTWARE • EXPERIENCIAS DIGITALES",
    lead: "Convertimos ideas ambiciosas en ",
    accent: "productos digitales inteligentes.",
    body: "NextAura AI diseña y crea sitios inteligentes, asistentes IA, automatizaciones, plataformas empresariales y experiencias digitales a medida para marcas ambiciosas.",
    primary: "Iniciar un proyecto",
    secondary: "Explorar nuestro trabajo",
    trust: "Desde Jordania • Para Jordania, EAU y más allá",
    scroll: "Explorar",
  },
  trust: [
    { value: "2", label: "Fundadores" },
    { value: "6+", label: "Servicios digitales" },
    { value: "IA", label: "Soluciones inteligentes" },
    { value: "JO • EAU", label: "Presencia regional" },
    { value: "100%", label: "Desarrollo a medida" },
  ],
  services: {
    eyebrow: "QUÉ HACEMOS",
    title: "Tecnología que impulsa negocios.",
    body: "De la presencia digital a la automatización inteligente, creamos sistemas alrededor de necesidades reales.",
    cta: "Hablar de tu proyecto",
    items: [
      {
        title: "Diseño y desarrollo web",
        description:
          "Sitios de alto rendimiento, plataformas corporativas, portfolios, landing pages y experiencias interactivas.",
      },
      {
        title: "Chatbots y asistentes virtuales",
        description:
          "Asistentes entrenados con la información, servicios, productos y preguntas de tu negocio.",
      },
      {
        title: "Automatización empresarial",
        description:
          "Flujos automáticos para operaciones, comunicación, datos y procesos internos repetitivos.",
      },
      {
        title: "CRM y plataformas empresariales",
        description:
          "Paneles, gestión de clientes, reservas, membresías y herramientas administrativas.",
      },
      {
        title: "Integración de IA",
        description:
          "Modelos, sistemas de recuperación, recomendaciones, APIs y funciones inteligentes con propósito.",
      },
      {
        title: "UI/UX y diseño de producto",
        description:
          "Investigación, wireframes, interfaces, prototipos responsive y experiencias de producto.",
      },
      {
        title: "Software a medida",
        description: "Soluciones adaptadas a necesidades operativas, del equipo o del cliente.",
      },
      {
        title: "Desarrollo MVP",
        description:
          "Un camino enfocado de la idea a un primer producto funcional, testeable y escalable.",
      },
    ],
  },
  about: {
    eyebrow: "QUIÉNES SOMOS",
    title: "Equipo pequeño. Gran energía de producto.",
    first:
      "NextAura AI es una empresa tecnológica fundada por dos especialistas que combinan inteligencia artificial, desarrollo de software, pensamiento de producto y ejecución creativa. Creamos sistemas que no solo se ven bien: resuelven problemas, simplifican operaciones y ayudan a crecer.",
    second:
      "Tratamos cada proyecto como un producto a medida. Estudiamos el negocio, definimos la solución, diseñamos la experiencia, construimos el sistema y seguimos mejorándolo tras el lanzamiento.",
    highlights: [
      "Pensamiento AI-first",
      "Soluciones a medida",
      "Ejecución de producto",
      "Comunicación clara",
      "Tecnología escalable",
    ],
    imageAlt: "Escultura tecnológica abstracta de NextAura",
  },
  industries: {
    eyebrow: "PARA QUIÉN CREAMOS",
    title: "Soluciones digitales para tu industria.",
    body: "Cada industria necesita sistemas distintos. Diseñamos alrededor de tus clientes, operaciones y modelo de crecimiento.",
    imageAlt: "Paisaje digital conectado que representa industrias de Jordania y EAU",
    items: [
      "Fitness y bienestar",
      "Alimentos y retail",
      "Servicios profesionales",
      "Educación",
      "Startups",
      "Agencias",
      "E-commerce",
      "Negocios locales",
    ],
  },
  team: {
    eyebrow: "FUNDADORES",
    title: "Dos perspectivas. Una mentalidad de producto.",
    body: "Un equipo fundador cercano a la estrategia, diseño, tecnología y entrega de cada producto.",
    members: {
      mohannad: {
        role: "Founder & AI/Backend Lead",
        description: "IA, sistemas backend, desarrollo de producto y dirección de negocio.",
      },
      moayad: {
        role: "Co-Founder & Systems Architect",
        description: "Desarrollo de software, arquitectura de sistemas y ejecución técnica.",
      },
    },
  },
  process: {
    eyebrow: "NUESTRO PROCESO",
    title: "De la primera conversación a un producto listo para el mundo real.",
    scroll: "Desplázate para seguir el proceso",
    steps: [
      { title: "Descubrir", description: "Entendemos tu negocio, audiencia, retos y objetivos." },
      {
        title: "Definir",
        description: "Convertimos la idea en alcance, funciones y dirección técnica.",
      },
      {
        title: "Diseñar",
        description: "Creamos la experiencia, el sistema visual y el prototipo.",
      },
      {
        title: "Construir",
        description: "Desarrollamos, integramos, probamos y optimizamos la solución.",
      },
      {
        title: "Lanzar",
        description: "Desplegamos el producto y lo preparamos para usuarios reales.",
      },
      {
        title: "Mejorar",
        description: "Apoyamos, analizamos y ampliamos el producto con el negocio.",
      },
    ],
  },
  featured: {
    eyebrow: "PRODUCTO DESTACADO",
    title: "FitCoach AI — Entrenador personal virtual inteligente",
    body: "Plataforma fitness con IA que combina entrenamiento y nutrición personalizados, conversación inteligente, recomendaciones, agenda, guía de ejercicios y datos del usuario.",
    features: [
      "Entrenamientos personalizados",
      "Guía nutricional",
      "Asistente fitness IA",
      "Recomendaciones inteligentes",
      "Gestión de agenda y planes",
      "Contenido interactivo",
      "Perfiles y progreso",
    ],
    tags: [
      "Inteligencia artificial",
      "Plataforma fitness",
      "Personalización",
      "Diseño de producto",
    ],
    caseStudy: "Ver caso de estudio",
    liveDemo: "Abrir demo",
  },
  work: {
    ...en.work,
    eyebrow: "TRABAJO SELECCIONADO",
    title: "Un vistazo a lo que creamos.",
    body: "Productos internos reales y conceptos claramente identificados que muestran los sistemas y experiencias que podemos crear.",
    view: "Ver proyecto",
    items: en.work.items,
  },
  benefits: {
    eyebrow: "POR QUÉ NEXTAURA",
    title: "Por qué las empresas nos eligen",
    items: [
      {
        title: "Personalizado",
        description: "Cada solución se diseña para el negocio, audiencia y objetivos.",
      },
      {
        title: "Tecnología moderna",
        description: "Seleccionamos herramientas actuales y escalables para cada producto.",
      },
      {
        title: "IA con propósito",
        description: "Usamos IA donde crea valor real, no como etiqueta de marketing.",
      },
      {
        title: "Ejecución integral",
        description: "Estrategia, diseño, desarrollo, integración, despliegue y soporte.",
      },
      {
        title: "Comunicación clara",
        description: "Etapas transparentes, expectativas realistas y colaboración directa.",
      },
      {
        title: "Creado para crecer",
        description: "Productos que pueden evolucionar junto con el negocio.",
      },
    ],
  },
  quality: {
    eyebrow: "ESTÁNDAR DE ENTREGA",
    title: "Construido, probado y listo para lanzar.",
    body: "Diseñamos, construimos, probamos y refinamos productos con atención al rendimiento, usabilidad, escalabilidad y valor a largo plazo.",
    words: ["Responsive", "Accesible", "Seguro", "Rápido", "Escalable", "Mantenible"],
  },
  values: {
    eyebrow: "CÓMO COLABORAMOS",
    title: "Lo que valoramos en cada colaboración.",
    body: "Sin testimonios inventados. Solo los estándares que llevamos a cada relación de trabajo.",
    items: [
      {
        title: "Comunicación",
        description: "Actualizaciones directas y útiles durante el proyecto.",
      },
      {
        title: "Transparencia",
        description: "Alcance, prioridades, decisiones y expectativas claras.",
      },
      {
        title: "Calidad",
        description: "Cuidado en la experiencia y en el sistema que hay detrás.",
      },
      { title: "Responsabilidad", description: "Nos hacemos cargo de los detalles y compromisos." },
      {
        title: "Visión a largo plazo",
        description: "Soluciones que siguen creando valor después del lanzamiento.",
      },
    ],
  },
  insights: {
    ...en.insights,
    eyebrow: "IDEAS",
    title: "Ideas, aprendizajes y tecnología práctica.",
    body: "Pensamiento claro para empresas que planean un sitio, automatización o producto con IA.",
    read: "Leer más",
    items: en.insights.items,
  },
  media: {
    ...en.media,
    eyebrow: "DENTRO DE NEXTAURA",
    title: "Lo último de NextAura",
    body: "Espacios temporales para demos, consejos de IA e historias del proceso.",
    play: "Reproducir",
    close: "Cerrar video",
    placeholder: "Contenido temporal — reemplazar antes de publicar",
    items: en.media.items,
  },
  cta: {
    eyebrow: "INICIA LA CONVERSACIÓN",
    title: "¿Tienes una idea? Convirtámosla en producto.",
    body: "Cuéntanos qué quieres crear, mejorar o automatizar. Te ayudaremos a definir el siguiente paso.",
    start: "Iniciar un proyecto",
    whatsapp: "Hablar por WhatsApp",
  },
  footer: {
    description:
      "NextAura AI crea sitios, asistentes inteligentes, automatizaciones y software a medida para empresas ambiciosas.",
    navigation: "Navegación",
    services: "Servicios",
    contact: "Contacto",
    location: "Jordania • Presencia en EAU / Dubái",
    privacy: "Privacidad",
    terms: "Términos",
    built: "Creado por NextAura AI",
  },
};

export type HomepageContent = Widen<typeof en>;
export const homepageContent: Record<Language, HomepageContent> = { en, ar, es };
