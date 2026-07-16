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
  ambientAudio: {
    enable: "Enable ambient sound",
    mute: "Mute ambient sound",
    unmute: "Unmute ambient sound",
  },
  hero: {
    eyebrow: "AI • SOFTWARE • DIGITAL EXPERIENCES",
    lead: "We turn ambitious ideas into ",
    accent: "intelligent digital products.",
    body: "NextAura AI designs and builds intelligent websites, AI assistants, automation systems, business platforms, and custom digital experiences for ambitious brands.",
    primary: "Start a Project",
    secondary: "Explore Our Work",
    visitors: "website visitors",
    trust: "Based in Jordan • Serving Jordan, UAE and beyond",
    scroll: "Explore",
  },
  underground: {
    foundation: "Digital Foundation",
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
        title: "Websites & Digital Products",
        description:
          "High-performing digital experiences designed to attract customers and make everyday interactions easier.",
        examples: ["Business websites", "E-commerce platforms", "Booking and dashboard systems"],
      },
      {
        title: "AI Assistants & Automation",
        description:
          "Purposeful AI that answers questions, connects knowledge, and removes repetitive work from your team.",
        examples: ["AI chatbots", "Workflow automation", "RAG and knowledge assistants"],
      },
      {
        title: "Business Systems & Custom Software",
        description:
          "Connected software built around the way your business operates, manages data, and grows.",
        examples: ["CRM integrations", "Admin systems", "Custom internal tools"],
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
        role: "Founder & Systems Architect",
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
        title: "Plan",
        description:
          "We shape the scope, experience, priorities, and technical direction before building.",
      },
      {
        title: "Build",
        description: "We develop, integrate, test, and optimize the complete solution.",
      },
      {
        title: "Launch & Improve",
        description: "We release, monitor, support, and expand the product as your business grows.",
      },
    ],
  },
  featured: {
    eyebrow: "Selected Work",
    title: "Projects built to solve real business problems.",
    body: "From artificial intelligence and financial management to premium e-commerce, explore platforms designed and developed by NextAura AI.",
    projects: {
      aiFitCoach: {
        badge: "Flagship project",
        category: "AI Fitness Platform",
        title: "AI FitCoach — Intelligent Virtual Personal Trainer",
        description:
          "An intelligent fitness platform that creates personalized workout and nutrition plans, tracks progress, and supports users through AI-powered coaching.",
        featuresLabel: "AI FitCoach feature highlights",
        features: [
          "Personalized workout plans",
          "Tailored nutrition plans",
          "AI fitness assistant",
          "Progress and schedule tracking",
          "Intelligent recommendations",
        ],
        servicesLabel: "AI FitCoach technology and service areas",
        tags: ["Artificial Intelligence", "Fitness Product", "Personalization", "Product Design"],
        cta: "Visit AI FitCoach",
        externalLabel: "Visit AI FitCoach (opens in a new tab)",
        imageAlt: "AI FitCoach intelligent virtual personal trainer project",
      },
      auraWallet: {
        category: "Financial Dashboard",
        title: "AuraWallet — Personal Finance & Money Management",
        description:
          "A premium personal finance platform that helps users manage balances, record income and spending, organize categories, track money owed, and understand their financial activity.",
        featuresLabel: "AuraWallet feature highlights",
        features: [
          "Personal wallet overview",
          "Income and expense tracking",
          "Spending categories",
          "Reports and financial insights",
        ],
        cta: "Visit AuraWallet",
        externalLabel: "Visit AuraWallet (opens in a new tab)",
        imageAlt: "AuraWallet personal finance dashboard project",
      },
      letsBake: {
        category: "Premium E-commerce Platform",
        title: "Let’s Bake — Premium Baking & E-commerce Platform",
        description:
          "A premium digital platform for baking products and pastry ingredients, combining product discovery, recipes, wholesale requests, online ordering, and business administration.",
        featuresLabel: "Let’s Bake feature highlights",
        features: [
          "Premium product catalogue",
          "Recipes and baking inspiration",
          "Wholesale pricing requests",
          "Responsive e-commerce experience",
        ],
        cta: "Visit Let’s Bake",
        externalLabel: "Visit Let’s Bake (opens in a new tab)",
        imageAlt: "Let’s Bake premium baking and e-commerce project",
      },
    },
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
    body: "We combine strategy, design, development, automation, and AI into one clear delivery process built around your business.",
    activeLabel: "In focus",
    items: [
      {
        title: "Built Around Your Business",
        description:
          "Every decision starts with your customers, operations, goals, and real constraints.",
      },
      {
        title: "Web, Automation & AI in One Team",
        description:
          "Strategy, product design, software, automation, and AI move together without handoff gaps.",
      },
      {
        title: "Clear Delivery & Communication",
        description:
          "You get visible progress, realistic expectations, direct communication, and clear project stages.",
      },
      {
        title: "Long-Term Support & Growth",
        description:
          "We continue improving, maintaining, optimizing, and scaling the product after launch.",
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
  ambientAudio: {
    enable: "تشغيل الصوت المحيطي",
    mute: "كتم الصوت المحيطي",
    unmute: "إلغاء كتم الصوت المحيطي",
  },
  hero: {
    eyebrow: "ذكاء اصطناعي • برمجيات • تجارب رقمية",
    lead: "نحوّل الأفكار الطموحة إلى ",
    accent: "منتجات رقمية ذكية.",
    body: "تصمم NextAura AI وتبني مواقع ذكية، ومساعدين بالذكاء الاصطناعي، وأنظمة أتمتة، ومنصات أعمال، وتجارب رقمية مخصصة للعلامات الطموحة.",
    primary: "ابدأ مشروعك",
    secondary: "استكشف أعمالنا",
    visitors: "زوار الموقع",
    trust: "من الأردن • نخدم الأردن والإمارات وما بعدهما",
    scroll: "استكشف",
  },
  underground: {
    foundation: "الأساس الرقمي",
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
        title: "المواقع والمنتجات الرقمية",
        description: "تجارب رقمية سريعة تساعدك على جذب العملاء وتسهّل تفاعلهم اليومي مع أعمالك.",
        examples: ["مواقع الأعمال", "منصات التجارة الإلكترونية", "أنظمة الحجز ولوحات التحكم"],
      },
      {
        title: "المساعدون الأذكياء والأتمتة",
        description:
          "ذكاء اصطناعي هادف يجيب عن الأسئلة ويربط المعرفة ويخفف المهام المتكررة عن فريقك.",
        examples: ["شات بوتات ذكية", "أتمتة سير العمل", "مساعدو المعرفة وRAG"],
      },
      {
        title: "أنظمة الأعمال والبرمجيات المخصصة",
        description: "برمجيات مترابطة مبنية حول طريقة تشغيل أعمالك وإدارة بياناتك وخطط نموك.",
        examples: ["تكاملات CRM", "الأنظمة الإدارية", "أدوات داخلية مخصصة"],
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
        role: "Founder & Systems Architect",
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
      {
        title: "تخطيط",
        description: "نحدد النطاق والتجربة والأولويات والاتجاه التقني قبل بدء البناء.",
      },
      { title: "بناء", description: "نطور الحل الكامل وندمجه ونختبره ونحسنه." },
      { title: "إطلاق وتحسين", description: "نطلق المنتج ونراقبه وندعمه ونطوره مع نمو أعمالك." },
    ],
  },
  featured: {
    eyebrow: "أعمال مختارة",
    title: "مشاريع صُممت لحل تحديات أعمال حقيقية.",
    body: "من الذكاء الاصطناعي وإدارة الأموال إلى التجارة الإلكترونية المتقدمة، تعرّف على منصات صممتها وطورتها NextAura AI.",
    projects: {
      aiFitCoach: {
        badge: "المشروع الرئيسي",
        category: "منصة لياقة بالذكاء الاصطناعي",
        title: "AI FitCoach — مدرب شخصي افتراضي ذكي",
        description:
          "منصة لياقة ذكية تنشئ خطط تمارين وتغذية مخصصة، وتتابع التقدم، وتدعم المستخدم من خلال مدرب يعمل بالذكاء الاصطناعي.",
        featuresLabel: "أبرز مزايا AI FitCoach",
        features: [
          "خطط تمارين مخصصة",
          "خطط تغذية مخصصة",
          "مساعد لياقة بالذكاء الاصطناعي",
          "متابعة التقدم والجداول",
          "توصيات ذكية",
        ],
        servicesLabel: "تقنيات ومجالات خدمة AI FitCoach",
        tags: ["ذكاء اصطناعي", "منتج لياقة", "تخصيص", "تصميم المنتج"],
        cta: "زيارة AI FitCoach",
        externalLabel: "زيارة مشروع AI FitCoach (يفتح في علامة تبويب جديدة)",
        imageAlt: "مشروع AI FitCoach للمدرب الشخصي الافتراضي الذكي",
      },
      auraWallet: {
        category: "لوحة تحكم مالية",
        title: "AuraWallet — إدارة الأموال والشؤون المالية الشخصية",
        description:
          "منصة مالية شخصية تساعد المستخدم على إدارة الأرصدة، وتسجيل الدخل والمصروفات، وتنظيم الفئات، ومتابعة المبالغ المستحقة، وفهم نشاطه المالي.",
        featuresLabel: "أبرز مزايا AuraWallet",
        features: [
          "نظرة شاملة على المحفظة",
          "تتبع الدخل والمصروفات",
          "تنظيم فئات الإنفاق",
          "تقارير ورؤى مالية",
        ],
        cta: "زيارة AuraWallet",
        externalLabel: "زيارة مشروع AuraWallet (يفتح في علامة تبويب جديدة)",
        imageAlt: "مشروع AuraWallet للوحة التحكم في الشؤون المالية الشخصية",
      },
      letsBake: {
        category: "منصة تجارة إلكترونية متقدمة",
        title: "Let’s Bake — منصة متقدمة للخبز والتجارة الإلكترونية",
        description:
          "منصة رقمية متقدمة لمنتجات الخَبز ومكونات الحلويات، تجمع بين عرض المنتجات والوصفات وطلبات الجملة والطلب الإلكتروني وإدارة الأعمال.",
        featuresLabel: "أبرز مزايا Let’s Bake",
        features: [
          "كتالوج منتجات متميز",
          "وصفات وإلهام للخَبز",
          "طلبات أسعار الجملة",
          "تجربة تجارة إلكترونية متجاوبة",
        ],
        cta: "زيارة Let’s Bake",
        externalLabel: "زيارة مشروع Let’s Bake (يفتح في علامة تبويب جديدة)",
        imageAlt: "مشروع Let’s Bake المتقدم للخَبز والتجارة الإلكترونية",
      },
    },
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
    title: "لماذا تختارنا الشركات",
    body: "نجمع الاستراتيجية والتصميم والتطوير والأتمتة والذكاء الاصطناعي ضمن عملية تسليم واضحة مصممة حول أعمالك.",
    activeLabel: "قيد العرض",
    items: [
      {
        title: "مبني حول أعمالك",
        description: "كل قرار يبدأ من عملائك وعملياتك وأهدافك وقيودك الحقيقية.",
      },
      {
        title: "الويب والأتمتة والذكاء الاصطناعي في فريق واحد",
        description:
          "تتحرك الاستراتيجية وتصميم المنتجات والبرمجيات والأتمتة والذكاء الاصطناعي معًا دون فجوات في التسليم.",
      },
      {
        title: "تسليم وتواصل واضحان",
        description: "تحصل على تقدم مرئي وتوقعات واقعية وتواصل مباشر ومراحل مشروع واضحة.",
      },
      {
        title: "دعم ونمو طويل الأمد",
        description: "نواصل تحسين المنتج وصيانته ورفع كفاءته وتوسيعه بعد الإطلاق.",
      },
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
  ambientAudio: {
    enable: "Activar sonido ambiental",
    mute: "Silenciar sonido ambiental",
    unmute: "Reactivar sonido ambiental",
  },
  hero: {
    eyebrow: "IA • SOFTWARE • EXPERIENCIAS DIGITALES",
    lead: "Convertimos ideas ambiciosas en ",
    accent: "productos digitales inteligentes.",
    body: "NextAura AI diseña y crea sitios inteligentes, asistentes IA, automatizaciones, plataformas empresariales y experiencias digitales a medida para marcas ambiciosas.",
    primary: "Iniciar un proyecto",
    secondary: "Explorar nuestro trabajo",
    visitors: "visitantes del sitio",
    trust: "Desde Jordania • Para Jordania, EAU y más allá",
    scroll: "Explorar",
  },
  underground: {
    foundation: "Fundamento digital",
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
        title: "Sitios web y productos digitales",
        description:
          "Experiencias digitales rápidas que atraen clientes y facilitan cada interacción con tu negocio.",
        examples: ["Sitios empresariales", "Plataformas e-commerce", "Reservas y paneles"],
      },
      {
        title: "Asistentes de IA y automatización",
        description:
          "IA útil que responde preguntas, conecta conocimiento y elimina tareas repetitivas del equipo.",
        examples: [
          "Chatbots de IA",
          "Automatización de flujos",
          "Asistentes RAG y de conocimiento",
        ],
      },
      {
        title: "Sistemas empresariales y software a medida",
        description:
          "Software conectado alrededor de cómo opera tu negocio, gestiona sus datos y crece.",
        examples: [
          "Integraciones CRM",
          "Sistemas administrativos",
          "Herramientas internas a medida",
        ],
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
        role: "Founder & Systems Architect",
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
        title: "Planificar",
        description:
          "Definimos alcance, experiencia, prioridades y dirección técnica antes de construir.",
      },
      {
        title: "Construir",
        description: "Desarrollamos, integramos, probamos y optimizamos la solución.",
      },
      {
        title: "Lanzar y mejorar",
        description: "Publicamos, monitorizamos, apoyamos y ampliamos el producto con tu negocio.",
      },
    ],
  },
  featured: {
    eyebrow: "Trabajo seleccionado",
    title: "Proyectos creados para resolver problemas reales de negocio.",
    body: "Desde inteligencia artificial y gestión financiera hasta comercio electrónico premium, descubre plataformas diseñadas y desarrolladas por NextAura AI.",
    projects: {
      aiFitCoach: {
        badge: "Proyecto insignia",
        category: "Plataforma de fitness con IA",
        title: "AI FitCoach — Entrenador personal virtual inteligente",
        description:
          "Una plataforma inteligente de fitness que crea planes personalizados de entrenamiento y nutrición, registra el progreso y acompaña al usuario con asesoramiento impulsado por IA.",
        featuresLabel: "Funciones destacadas de AI FitCoach",
        features: [
          "Planes de entrenamiento personalizados",
          "Planes de nutrición a medida",
          "Asistente de fitness con IA",
          "Seguimiento de progreso y agenda",
          "Recomendaciones inteligentes",
        ],
        servicesLabel: "Tecnologías y áreas de servicio de AI FitCoach",
        tags: [
          "Inteligencia artificial",
          "Producto fitness",
          "Personalización",
          "Diseño de producto",
        ],
        cta: "Visitar AI FitCoach",
        externalLabel: "Visitar AI FitCoach (se abre en una pestaña nueva)",
        imageAlt: "Proyecto AI FitCoach de entrenador personal virtual inteligente",
      },
      auraWallet: {
        category: "Panel financiero",
        title: "AuraWallet — Finanzas personales y gestión del dinero",
        description:
          "Una plataforma premium de finanzas personales que ayuda a gestionar saldos, registrar ingresos y gastos, organizar categorías, controlar deudas y comprender la actividad financiera.",
        featuresLabel: "Funciones destacadas de AuraWallet",
        features: [
          "Resumen de la cartera personal",
          "Seguimiento de ingresos y gastos",
          "Categorías de consumo",
          "Informes e información financiera",
        ],
        cta: "Visitar AuraWallet",
        externalLabel: "Visitar AuraWallet (se abre en una pestaña nueva)",
        imageAlt: "Proyecto AuraWallet de panel de finanzas personales",
      },
      letsBake: {
        category: "Plataforma de comercio electrónico premium",
        title: "Let’s Bake — Plataforma premium de repostería y comercio electrónico",
        description:
          "Una plataforma digital premium para productos de repostería e ingredientes de pastelería que integra catálogo, recetas, solicitudes mayoristas, pedidos en línea y administración del negocio.",
        featuresLabel: "Funciones destacadas de Let’s Bake",
        features: [
          "Catálogo premium de productos",
          "Recetas e inspiración para hornear",
          "Solicitudes de precios mayoristas",
          "Experiencia de compra adaptable",
        ],
        cta: "Visitar Let’s Bake",
        externalLabel: "Visitar Let’s Bake (se abre en una pestaña nueva)",
        imageAlt: "Proyecto premium Let’s Bake de repostería y comercio electrónico",
      },
    },
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
    body: "Unimos estrategia, diseño, desarrollo, automatización e IA en un proceso de entrega claro construido alrededor de tu negocio.",
    activeLabel: "En detalle",
    items: [
      {
        title: "Creado alrededor de tu negocio",
        description:
          "Cada decisión parte de tus clientes, operaciones, objetivos y límites reales.",
      },
      {
        title: "Web, automatización e IA en un equipo",
        description:
          "Estrategia, diseño de producto, software, automatización e IA avanzan sin brechas entre equipos.",
      },
      {
        title: "Entrega y comunicación claras",
        description:
          "Recibes progreso visible, expectativas realistas, comunicación directa y etapas de proyecto claras.",
      },
      {
        title: "Soporte y crecimiento a largo plazo",
        description:
          "Seguimos mejorando, manteniendo, optimizando y escalando el producto después del lanzamiento.",
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
