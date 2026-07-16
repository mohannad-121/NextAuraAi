import {
  localize,
  siteKnowledge,
  type Localized,
  type SupportedLanguage,
} from "@/data/siteKnowledge";

export type ChatbotAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type ChatbotAnswer = {
  content: string;
  language: SupportedLanguage;
  actions?: ChatbotAction[];
};

type ChatbotCopy = {
  welcome: string;
  fallback: string;
  subtitle: string;
  suggestions: string[];
  placeholders: {
    input: string;
    typing: string;
    send: string;
    open: string;
    close: string;
  };
};

export const chatbotCopy: Record<SupportedLanguage, ChatbotCopy> = {
  en: {
    welcome:
      "Hi! I'm the NextAura Assistant. Ask me about the company, services, founders, products, pricing, project process, or contact details.",
    fallback:
      "I couldn't match that to verified information on our website. I can help with services, products, founders, pricing, timelines, project requests, and contact details.",
    subtitle: "Company, services, products, pricing, and team",
    suggestions: [
      "What does NextAura AI do?",
      "Show me all products",
      "What would my project cost?",
      "Who are the founders?",
      "How do I start a project?",
      "Can you build a custom system?",
    ],
    placeholders: {
      input: "Ask anything about NextAura AI...",
      typing: "NextAura Assistant is typing",
      send: "Send",
      open: "Open NextAura Assistant",
      close: "Close assistant",
    },
  },
  ar: {
    welcome:
      "أهلًا! أنا مساعد NextAura. اسألني عن الشركة، الخدمات، المؤسسين، المنتجات، الأسعار، خطوات المشروع، أو طرق التواصل.",
    fallback:
      "ما قدرت أربط السؤال بمعلومة مؤكدة في الموقع. بقدر أساعدك بالخدمات، المنتجات، المؤسسين، الأسعار، المدة، طلب المشروع، وطرق التواصل.",
    subtitle: "الشركة، الخدمات، المنتجات، الأسعار، والفريق",
    suggestions: [
      "شو بتعمل NextAura AI؟",
      "ورجيني كل المنتجات",
      "كم ممكن يكلف مشروعي؟",
      "مين المؤسسين؟",
      "كيف أطلب مشروع؟",
      "بتقدروا تعملوا نظام مخصص؟",
    ],
    placeholders: {
      input: "اسأل أي شيء عن NextAura AI...",
      typing: "مساعد NextAura يكتب",
      send: "إرسال",
      open: "افتح مساعد NextAura",
      close: "أغلق المساعد",
    },
  },
  es: {
    welcome:
      "¡Hola! Soy el asistente de NextAura. Pregúntame sobre la empresa, servicios, fundadores, productos, precios, proceso o contacto.",
    fallback:
      "No pude relacionar la pregunta con información verificada del sitio. Puedo ayudarte con servicios, productos, fundadores, precios, plazos, solicitudes y contacto.",
    subtitle: "Empresa, servicios, productos, precios y equipo",
    suggestions: [
      "¿Qué hace NextAura AI?",
      "Muéstrame todos los productos",
      "¿Cuánto costaría mi proyecto?",
      "¿Quiénes son los fundadores?",
      "¿Cómo inicio un proyecto?",
      "¿Crean sistemas a medida?",
    ],
    placeholders: {
      input: "Pregunta lo que quieras sobre NextAura AI...",
      typing: "NextAura Assistant está escribiendo",
      send: "Enviar",
      open: "Abrir NextAura Assistant",
      close: "Cerrar asistente",
    },
  },
  zh: {
    welcome:
      "你好！我是 NextAura 助手。你可以询问公司、服务、创始人、产品、价格、项目流程或联系方式。",
    fallback:
      "我没有在网站的已验证信息中找到准确答案。我可以介绍服务、产品、创始人、价格、周期、项目申请和联系方式。",
    subtitle: "公司、服务、产品、价格与团队",
    suggestions: [
      "NextAura AI 是做什么的？",
      "展示所有产品",
      "我的项目大概多少钱？",
      "创始人是谁？",
      "如何开始项目？",
      "你们能开发定制系统吗？",
    ],
    placeholders: {
      input: "询问任何有关 NextAura AI 的问题...",
      typing: "NextAura 助手正在输入",
      send: "发送",
      open: "打开 NextAura 助手",
      close: "关闭助手",
    },
  },
};

const uiText = {
  services: { en: "View services", ar: "عرض الخدمات", es: "Ver servicios", zh: "查看服务" },
  products: { en: "View our work", ar: "عرض أعمالنا", es: "Ver proyectos", zh: "查看项目" },
  team: { en: "Meet the founders", ar: "تعرف على المؤسسين", es: "Conocer fundadores", zh: "认识创始人" },
  process: { en: "View the process", ar: "عرض مراحل العمل", es: "Ver el proceso", zh: "查看流程" },
  start: { en: "Start a project", ar: "ابدأ مشروعك", es: "Iniciar proyecto", zh: "开始项目" },
  contact: { en: "Contact us", ar: "تواصل معنا", es: "Contactar", zh: "联系我们" },
  whatsapp: { en: "WhatsApp", ar: "واتساب", es: "WhatsApp", zh: "WhatsApp" },
  email: { en: "Email", ar: "البريد الإلكتروني", es: "Correo", zh: "电子邮件" },
  visit: { en: "Visit product", ar: "زيارة المنتج", es: "Visitar producto", zh: "访问产品" },
} satisfies Record<string, Localized>;

const pageActions = {
  services: (language: SupportedLanguage): ChatbotAction => ({
    label: localize(uiText.services, language),
    href: "/#services",
  }),
  products: (language: SupportedLanguage): ChatbotAction => ({
    label: localize(uiText.products, language),
    href: "/#projects",
  }),
  team: (language: SupportedLanguage): ChatbotAction => ({
    label: localize(uiText.team, language),
    href: "/#team",
  }),
  process: (language: SupportedLanguage): ChatbotAction => ({
    label: localize(uiText.process, language),
    href: "/#process",
  }),
  start: (language: SupportedLanguage): ChatbotAction => ({
    label: localize(uiText.start, language),
    href: "/start-project",
  }),
  contact: (language: SupportedLanguage): ChatbotAction => ({
    label: localize(uiText.contact, language),
    href: "/#contact",
  }),
  whatsapp: (language: SupportedLanguage): ChatbotAction => ({
    label: localize(uiText.whatsapp, language),
    href: siteKnowledge.contact.whatsappUrl,
    external: true,
  }),
  email: (language: SupportedLanguage): ChatbotAction => ({
    label: localize(uiText.email, language),
    href: siteKnowledge.contact.emailUrl,
  }),
};

function normalize(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u064b-\u065f\u0670\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[؟?¿!¡.,:;،؛()[\]{}"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const languageSignals: Record<Exclude<SupportedLanguage, "zh">, string[]> = {
  en: ["what", "who", "how", "for", "basic", "build", "price", "project", "services", "hello", "thanks", "web", "website"],
  ar: ["شو", "مين", "كيف", "سعر", "بكلف", "مشروع", "خدمات", "مرحبا", "شكرا", "موقع"],
  es: ["que", "quien", "como", "cuanto", "cuesta", "precio", "proyecto", "servicios", "hola", "gracias", "sitio", "web"],
};

export function detectChatLanguage(message: string, preferred: SupportedLanguage): SupportedLanguage {
  if (/\p{Script=Han}/u.test(message)) return "zh";
  if (/\p{Script=Arabic}/u.test(message)) return "ar";
  if (/[ñ¿¡]/i.test(message)) return "es";

  const text = normalize(message);
  const scores = Object.entries(languageSignals).map(([language, signals]) => ({
    language: language as Exclude<SupportedLanguage, "zh">,
    score: signals.reduce((total, signal) => total + (text.includes(signal) ? 1 : 0), 0),
  }));
  scores.sort((a, b) => b.score - a.score);
  return scores[0]?.score ? scores[0].language : preferred;
}

function list(items: readonly string[], language: SupportedLanguage) {
  const marker = language === "zh" ? "• " : language === "ar" ? "• " : "- ";
  return items.map((item) => `${marker}${item}`).join("\n");
}

function localized(values: Localized, language: SupportedLanguage) {
  return localize(values, language);
}

function answer(
  content: string,
  language: SupportedLanguage,
  actions?: ChatbotAction[],
): ChatbotAnswer {
  return { content, language, actions };
}

function fuzzyMatch(token: string, keyword: string) {
  if (token === keyword) return true;
  if (token.length < 4 || keyword.length < 4 || Math.abs(token.length - keyword.length) > 1) return false;

  let edits = 0;
  let left = 0;
  let right = 0;
  while (left < token.length && right < keyword.length) {
    if (token[left] === keyword[right]) {
      left += 1;
      right += 1;
      continue;
    }
    edits += 1;
    if (edits > 1) return false;
    if (token.length > keyword.length) left += 1;
    else if (keyword.length > token.length) right += 1;
    else {
      left += 1;
      right += 1;
    }
  }
  return edits + (left < token.length || right < keyword.length ? 1 : 0) <= 1;
}

function matches(text: string, keywords: readonly string[]) {
  const tokens = text.split(" ");
  return keywords.some((keyword) => {
    const normalizedKeyword = normalize(keyword);
    if (!normalizedKeyword) return false;
    if (/\p{Script=Han}/u.test(normalizedKeyword)) return text.includes(normalizedKeyword);
    if (normalizedKeyword.includes(" ")) return text.includes(normalizedKeyword);
    if (normalizedKeyword.length <= 3) return tokens.includes(normalizedKeyword);
    return text.includes(normalizedKeyword) || tokens.some((token) => fuzzyMatch(token, normalizedKeyword));
  });
}

const terms = {
  greeting: ["hello", "hi", "hey", "good morning", "مرحبا", "اهلا", "هلا", "السلام عليكم", "سلام", "صباح الخير", "hola", "buenos dias", "你好", "您好", "早上好"],
  thanks: ["thanks", "thank you", "appreciate", "شكرا", "يسلمو", "مشكور", "gracias", "muchas gracias", "谢谢", "感谢"],
  farewell: ["bye", "goodbye", "see you", "مع السلامه", "باي", "وداعا", "adios", "hasta luego", "再见"],
  smalltalk: ["how are you", "what's up", "كيفك", "شو اخبارك", "como estas", "qué tal", "你好吗"],
  company: ["nextaura", "company", "what do you do", "who are you", "who we are", "mission", "شركة", "مين انتو", "مين احنا", "شو بتعمل", "شو منشتغل", "شو شغلكم", "ماذا تفعلون", "وظيفه الشركه", "عنكم", "empresa", "quienes son", "quienes somos", "que hacen", "mision", "公司", "你们是谁", "做什么", "使命"],
  help: ["help", "what can i ask", "website sections", "site map", "everything on the site", "ساعدني", "شو بقدر اسال", "شو موجود بالموقع", "كل اشي بالموقع", "دليل الموقع", "ayuda", "que puedo preguntar", "secciones del sitio", "帮助", "可以问什么", "网站内容"],
  services: ["services", "service", "offer", "capabilities", "what can you build", "can you build", "خدمات", "بتقدمو", "شو بتعملو", "شو بتقدروا", "شو منقدر", "قدرات", "servicios", "ofrecen", "pueden crear", "服务", "能做什么", "开发什么"],
  website: ["website", "web app", "landing page", "ecommerce", "e commerce", "online store", "موقع", "متجر", "صفحه هبوط", "تطبيق ويب", "sitio web", "tienda online", "aplicacion web", "网站", "网页", "电商", "Web 应用"],
  chatbot: ["chatbot", "chat bot", "ai assistant", "rag", "knowledge assistant", "شات", "بوت", "مساعد ذكي", "اسئله العملاء", "asistente ia", "chatbot", "聊天机器人", "AI 助手", "知识库"],
  automation: ["automation", "workflow", "repetitive", "notifications", "اتمته", "أتمتة", "مهام متكرره", "سير العمل", "automatizacion", "flujo de trabajo", "自动化", "工作流"],
  platform: ["crm", "dashboard", "admin", "booking", "membership", "business system", "لوحه تحكم", "نظام حجز", "اداره عملاء", "نظام بزنس", "panel", "reservas", "plataforma", "管理后台", "CRM", "预约系统"],
  mvp: ["mvp", "prototype", "startup idea", "proof of concept", "نموذج اولي", "فكره ناشئه", "prototipo", "idea startup", "原型", "初创产品"],
  design: ["ui ux", "design", "wireframe", "prototype design", "تصميم", "واجهات", "تجربه مستخدم", "diseno", "experiencia de usuario", "设计", "用户体验"],
  pricing: ["price", "pricing", "cost", "budget", "quote", "package", "how much", "سعر", "اسعار", "تكلفه", "تكلف", "بكلف", "يكلف", "ميزانيه", "عرض سعر", "باقه", "precio", "precios", "costo", "cuesta", "presupuesto", "cuanto", "报价", "价格", "预算", "多少钱"],
  basicPackage: ["basic", "simple website", "landing", "small website", "اساسي", "بسيط", "صفحه هبوط", "basico", "sencillo", "landing", "基础", "简单网站", "落地页"],
  businessPackage: ["products", "gallery", "offers", "booking", "admin", "dashboard", "simple admin", "business website", "منتجات", "معرض", "عروض", "حجز", "لوحه", "لوحه تحكم", "لوحه بسيطه", "productos", "galeria", "ofertas", "reservas", "panel", "administracion", "商品", "图库", "预约", "后台", "基础后台"],
  completePackage: ["database", "login", "advanced admin", "integration", "api", "ai", "complete system", "قاعده بيانات", "تسجيل دخول", "لوحه متقدمه", "تكامل", "نظام متكامل", "base de datos", "inicio de sesion", "admin avanzado", "integracion", "数据库", "登录", "高级后台", "集成", "完整系统"],
  founders: ["founder", "founders", "owner", "team", "who built", "مؤسس", "مؤسسين", "فريق", "اصحاب الشركه", "fundador", "fundadores", "equipo", "创始人", "团队", "老板"],
  mohannad: ["mohannad", "muhannad", "مهند"],
  moayad: ["moayad", "moayed", "moaiad", "مؤيد", "مويد"],
  products: ["products", "projects", "portfolio", "your work", "what have you built", "منتجاتكم", "برودكت", "برودكتات", "مشاريع", "اعمالكم", "شو عاملين", "portfolio", "proyectos", "productos", "trabajos", "产品", "项目", "案例"],
  fitcoach: ["fitcoach", "fit coach", "fitness coach", "مدرب لياقه", "فيت كوتش", "entrenador fitness", "健身教练", "AI FitCoach"],
  aurawallet: ["aurawallet", "aura wallet", "finance tracker", "محفظه", "اداره ماليه", "finanzas", "cartera", "财务", "钱包"],
  letsbake: ["lets bake", "let's bake", "baking", "مخبوزات", "بيك", "reposteria", "hornear", "烘焙", "电商平台"],
  start: ["start project", "request project", "order project", "hire you", "work with you", "ابدأ مشروع", "اطلب مشروع", "بدي مشروع", "اتفق معكم", "iniciar proyecto", "solicitar proyecto", "contratar", "开始项目", "提交项目", "合作"],
  contact: ["contact", "whatsapp", "phone", "email", "call", "تواصل", "واتساب", "هاتف", "رقم", "ايميل", "contacto", "telefono", "correo", "联系", "电话", "邮箱"],
  process: ["process", "steps", "workflow", "how do you work", "مراحل", "خطوات", "كيف بتشتغلو", "proceso", "pasos", "como trabajan", "流程", "步骤", "怎么合作"],
  location: ["location", "where are you", "country", "jordan", "dubai", "worldwide", "وينكم", "موقعكم", "الاردن", "دبي", "كل العالم", "ubicacion", "jordania", "dubai", "全球", "约旦", "迪拜", "在哪里"],
  industries: ["industry", "industries", "who do you work with", "sectors", "مجالات", "قطاعات", "لمين بتشتغلو", "industrias", "sectores", "行业", "客户类型"],
  timeline: ["timeline", "how long", "delivery", "duration", "وقت", "مده", "متى", "قديش بياخذ", "plazo", "cuanto tarda", "tiempo", "周期", "多久", "交付"],
  support: ["support", "maintenance", "hosting", "domain", "after launch", "دعم", "صيانه", "استضافه", "دومين", "بعد الاطلاق", "soporte", "mantenimiento", "hosting", "dominio", "支持", "维护", "托管", "域名"],
};

function greetingResponse(language: SupportedLanguage) {
  return answer(
    localized({
      en: "Hi! Great to meet you. I can guide you through everything published about NextAura AI. What would you like to know?",
      ar: "أهلًا وسهلًا! بقدر أساعدك بكل المعلومات المنشورة عن NextAura AI. شو حاب تعرف؟",
      es: "¡Hola! Puedo guiarte por toda la información publicada sobre NextAura AI. ¿Qué te gustaría saber?",
      zh: "你好！我可以为你介绍 NextAura AI 网站上的全部信息。你想了解什么？",
    }, language),
    language,
    [pageActions.services(language), pageActions.products(language)],
  );
}

function companyResponse(language: SupportedLanguage) {
  const { company } = siteKnowledge;
  return answer(
    `${localize(company.description, language)}\n\n${localize(company.mission, language)}\n\n${localize(company.approach, language)}`,
    language,
    [pageActions.services(language), pageActions.products(language), pageActions.team(language)],
  );
}

function helpResponse(language: SupportedLanguage) {
  const content = localized({
    en: "I can guide you through the full website: what NextAura AI does, all services, featured products, founders, pricing by feature level, project stages, timelines, industries, support, locations, and every way to start or contact us.",
    ar: "بقدر أدلك على كل محتوى الموقع: شو بتعمل NextAura AI، كل الخدمات، المنتجات، المؤسسين، الأسعار حسب مستوى الخصائص، مراحل المشروع، المدة، المجالات، الدعم، مواقعنا، وكيف تبدأ مشروع أو تتواصل معنا.",
    es: "Puedo guiarte por todo el sitio: empresa, servicios, productos, fundadores, precios según funciones, proceso, plazos, industrias, soporte, ubicaciones y contacto.",
    zh: "我可以带你了解整个网站：公司介绍、全部服务、产品、创始人、按功能划分的价格、项目流程、周期、行业、支持、所在地以及所有联系和项目申请方式。",
  }, language);
  return answer(content, language, [
    pageActions.services(language),
    pageActions.products(language),
    pageActions.team(language),
    pageActions.start(language),
  ]);
}

function servicesResponse(language: SupportedLanguage) {
  const intro = localized({
    en: "NextAura AI covers eight connected service areas:",
    ar: "NextAura AI تغطي ثمانية مجالات خدمات مترابطة:",
    es: "NextAura AI cubre ocho áreas de servicio conectadas:",
    zh: "NextAura AI 提供八个相互关联的服务领域：",
  }, language);
  const services = siteKnowledge.services.map(
    (service) => `${localize(service.name, language)}: ${localize(service.description, language)}`,
  );
  return answer(`${intro}\n${list(services, language)}`, language, [
    pageActions.services(language),
    pageActions.start(language),
  ]);
}

function specificServiceResponse(serviceId: string, language: SupportedLanguage) {
  const service = siteKnowledge.services.find((item) => item.id === serviceId);
  if (!service) return servicesResponse(language);
  const ending = localized({
    en: "The exact scope is tailored to your business and can be combined with our other services.",
    ar: "نحدد النطاق حسب احتياج عملك، ويمكن دمج هذه الخدمة مع باقي خدماتنا.",
    es: "El alcance se adapta a tu negocio y puede combinarse con otros servicios.",
    zh: "具体范围会根据你的业务定制，也可以与其他服务组合。",
  }, language);
  return answer(
    `${localize(service.name, language)}\n${localize(service.description, language)}\n\n${ending}`,
    language,
    [pageActions.services(language), pageActions.start(language)],
  );
}

function pricingResponse(text: string, language: SupportedLanguage) {
  let recommendedIndex: number | null = null;
  if (matches(text, terms.completePackage)) recommendedIndex = 2;
  else if (matches(text, terms.businessPackage)) recommendedIndex = 1;
  else if (matches(text, terms.basicPackage)) recommendedIndex = 0;

  const packages = siteKnowledge.pricing.packages;
  if (recommendedIndex !== null) {
    const pkg = packages[recommendedIndex];
    const heading = localized({
      en: "The final price is determined by your exact requirements. Based on the features you mentioned, the closest initial range is:",
      ar: "السعر النهائي يتحدد حسب متطلباتك بالضبط. وبناءً على الخصائص التي ذكرتها، أقرب نطاق مبدئي هو:",
      es: "El precio final se determina según tus requisitos exactos. Por las funciones mencionadas, el rango inicial más cercano es:",
      zh: "最终价格取决于你的具体需求。根据你提到的功能，最接近的初步价格范围是：",
    }, language);
    return answer(
      `${heading}\n${localize(pkg.name, language)} — ${pkg.price}\n${localize(pkg.description, language)}\n\n${list(pkg.includes.map((item) => localize(item, language)), language)}\n\n${localize(siteKnowledge.pricing.disclaimer, language)}`,
      language,
      [pageActions.start(language), pageActions.contact(language)],
    );
  }

  const requirementsPrompt = localized({
    en: "The price is determined by what you need. Tell us the project type, number of pages, required features, whether you need an admin dashboard, database or login, AI/chatbot, integrations, domain, hosting, and preferred timeline. Once we understand those requirements, we can give you an accurate quote.",
    ar: "السعر يتحدد حسب شو متطلباتك بالضبط. احكيلنا نوع المشروع، عدد الصفحات، الخصائص المطلوبة، وهل تحتاج لوحة تحكم، قاعدة بيانات أو تسجيل دخول، AI أو شات بوت، تكاملات، دومين، استضافة، والمدة المناسبة. بعد ما نفهم هاي التفاصيل بنعطيك عرض سعر دقيق.",
    es: "El precio depende de lo que necesitas. Indícanos el tipo de proyecto, páginas, funciones, panel de administración, base de datos o login, IA/chatbot, integraciones, dominio, hosting y plazo. Con esos requisitos podremos darte una cotización precisa.",
    zh: "价格取决于你的具体需求。请告诉我们项目类型、页面数量、所需功能，以及是否需要管理后台、数据库或登录、AI/聊天机器人、系统集成、域名、托管和期望周期。了解这些需求后，我们才能提供准确报价。",
  }, language);
  return answer(
    requirementsPrompt,
    language,
    [pageActions.start(language), pageActions.contact(language)],
  );
}

function memberResponse(id: "mohannad" | "moayad", language: SupportedLanguage) {
  const member = siteKnowledge.team.find((item) => item.id === id);
  if (!member) return teamResponse(language);
  const heading = localized({ en: "Core responsibilities:", ar: "المسؤوليات الأساسية:", es: "Responsabilidades principales:", zh: "主要职责：" }, language);
  return answer(
    `${member.name} — ${localize(member.role, language)}\n${localize(member.bio, language)}\n\n${heading}\n${list(member.responsibilities.map((item) => localize(item, language)), language)}`,
    language,
    [pageActions.team(language)],
  );
}

function teamResponse(language: SupportedLanguage) {
  const intro = localized({
    en: "NextAura AI has two founders who stay close to strategy, technology, design, and delivery:",
    ar: "لدى NextAura AI مؤسسان يتابعان الاستراتيجية، التقنية، التصميم، والتنفيذ بشكل مباشر:",
    es: "NextAura AI tiene dos fundadores involucrados en estrategia, tecnología, diseño y entrega:",
    zh: "NextAura AI 有两位创始人，直接参与战略、技术、设计和交付：",
  }, language);
  return answer(
    `${intro}\n${list(siteKnowledge.team.map((member) => `${member.name} — ${localize(member.role, language)}. ${localize(member.bio, language)}`), language)}`,
    language,
    [pageActions.team(language), pageActions.start(language)],
  );
}

function teamCapabilitiesResponse(language: SupportedLanguage) {
  const intro = localized({
    en: "NextAura AI is founded by Mohannad, Founder & AI/Backend Lead, and Moayad, Founder & Systems Architect. Together they lead:",
    ar: "أسس NextAura AI كل من مهند، مؤسس وقائد AI والباكند، ومؤيد، مؤسس ومهندس أنظمة. ومعًا يقودان تنفيذ:",
    es: "NextAura AI fue fundada por Mohannad, líder de IA/Backend, y Moayad, arquitecto de sistemas. Juntos dirigen:",
    zh: "NextAura AI 由 AI/后端负责人 Mohannad 和系统架构师 Moayad 共同创立。他们带领团队提供：",
  }, language);
  const serviceNames = siteKnowledge.services.map((service) => localize(service.name, language));
  return answer(`${intro}\n${list(serviceNames, language)}`, language, [
    pageActions.team(language),
    pageActions.services(language),
    pageActions.start(language),
  ]);
}

function productsResponse(language: SupportedLanguage) {
  const intro = localized({
    en: "These are the three products currently featured on the website:",
    ar: "هاي المنتجات الثلاثة المعروضة حاليًا في الموقع:",
    es: "Estos son los tres productos destacados actualmente en el sitio:",
    zh: "网站目前展示了三个产品：",
  }, language);
  return answer(
    `${intro}\n${list(siteKnowledge.products.map((product) => `${product.name}: ${localize(product.description, language)}`), language)}`,
    language,
    [pageActions.products(language)],
  );
}

function productResponse(id: string, language: SupportedLanguage) {
  const product = siteKnowledge.products.find((item) => item.id === id);
  if (!product) return productsResponse(language);
  const heading = localized({ en: "Main features:", ar: "أهم الخصائص:", es: "Funciones principales:", zh: "主要功能：" }, language);
  return answer(
    `${product.name}\n${localize(product.description, language)}\n\n${heading}\n${list(product.features[language], language)}`,
    language,
    [
      { label: `${localize(uiText.visit, language)} — ${product.name}`, href: product.url, external: true },
      pageActions.products(language),
    ],
  );
}

function startProjectResponse(language: SupportedLanguage) {
  const content = localized({
    en: `Open Start a Project and submit your contact details, project type, idea, required features, budget/package, timeline, and preferred contact method. You can also contact us by WhatsApp (${siteKnowledge.contact.whatsapp}) or email (${siteKnowledge.contact.email}).`,
    ar: `افتح صفحة ابدأ مشروعك وعبّي معلومات التواصل، نوع المشروع، الفكرة، الخصائص المطلوبة، الميزانية أو الباقة، المدة، وطريقة التواصل المفضلة. وتقدر تتواصل مباشرة على واتساب ${siteKnowledge.contact.whatsapp} أو البريد ${siteKnowledge.contact.email}.`,
    es: `Abre Iniciar proyecto y completa tus datos, tipo de proyecto, idea, funciones, presupuesto/paquete, plazo y contacto preferido. También puedes escribir por WhatsApp (${siteKnowledge.contact.whatsapp}) o email (${siteKnowledge.contact.email}).`,
    zh: `打开“开始项目”页面，填写联系方式、项目类型、想法、所需功能、预算/套餐、时间和首选联系方式。也可以通过 WhatsApp（${siteKnowledge.contact.whatsapp}）或邮箱（${siteKnowledge.contact.email}）联系我们。`,
  }, language);
  return answer(content, language, [
    pageActions.start(language),
    pageActions.whatsapp(language),
    pageActions.email(language),
  ]);
}

function processResponse(language: SupportedLanguage) {
  const heading = localized({ en: "Our project process has four clear stages:", ar: "عملية المشروع عندنا من أربع مراحل واضحة:", es: "Nuestro proceso tiene cuatro etapas:", zh: "我们的项目流程分为四个阶段：" }, language);
  return answer(
    `${heading}\n${list(siteKnowledge.process.map((step) => localize(step, language)), language)}`,
    language,
    [pageActions.process(language), pageActions.start(language)],
  );
}

function contactResponse(language: SupportedLanguage) {
  const intro = localized({ en: "You can reach NextAura AI through:", ar: "تقدر تتواصل مع NextAura AI عبر:", es: "Puedes contactar a NextAura AI por:", zh: "你可以通过以下方式联系 NextAura AI：" }, language);
  return answer(
    `${intro}\n${list([`WhatsApp: ${siteKnowledge.contact.whatsapp}`, `Email: ${siteKnowledge.contact.email}`, localize(siteKnowledge.contact.location, language)], language)}`,
    language,
    [pageActions.contact(language), pageActions.whatsapp(language), pageActions.email(language)],
  );
}

function locationResponse(language: SupportedLanguage) {
  return answer(localize(siteKnowledge.contact.location, language), language, [
    pageActions.contact(language),
    pageActions.start(language),
  ]);
}

function industriesResponse(language: SupportedLanguage) {
  const intro = localized({ en: "We adapt solutions to different industries, including:", ar: "نخصص الحل حسب المجال، ومن المجالات التي نخدمها:", es: "Adaptamos la solución a diferentes industrias, incluyendo:", zh: "我们会根据行业定制解决方案，包括：" }, language);
  return answer(`${intro}\n${list(siteKnowledge.industries[language], language)}`, language, [
    pageActions.services(language),
    pageActions.start(language),
  ]);
}

function timelineResponse(language: SupportedLanguage) {
  const content = localized({
    en: "The website does not publish one fixed delivery time because it depends on scope, pages, integrations, content readiness, feedback speed, and whether the project needs a database, admin dashboard, or AI. Share those details in Start a Project for an accurate timeline.",
    ar: "الموقع ما يحدد مدة ثابتة لأن المدة تعتمد على النطاق، عدد الصفحات، التكاملات، جاهزية المحتوى، سرعة الملاحظات، والحاجة لقاعدة بيانات أو لوحة تحكم أو AI. اذكر التفاصيل في صفحة ابدأ مشروعك حتى تحصل على مدة دقيقة.",
    es: "No hay un plazo fijo publicado: depende del alcance, páginas, integraciones, contenido, feedback, base de datos, admin e IA. Comparte los detalles en Iniciar proyecto para recibir un plazo preciso.",
    zh: "网站没有公布固定交付周期，因为它取决于范围、页面、集成、内容准备、反馈速度，以及是否需要数据库、后台或 AI。请在“开始项目”中提交详情以获得准确周期。",
  }, language);
  return answer(content, language, [pageActions.start(language), pageActions.process(language)]);
}

function supportResponse(language: SupportedLanguage) {
  const content = localized({
    en: "We launch, monitor, support, improve, and expand products as the business grows. Domain, hosting, maintenance, and post-launch requirements affect the final scope and quote, so include them in your project request.",
    ar: "نطلق المنتج ونراقبه وندعمه ونحسنه ونوسعه مع نمو العمل. الدومين، الاستضافة، الصيانة، ودعم ما بعد الإطلاق تؤثر على النطاق والسعر، فاذكرها في طلب المشروع.",
    es: "Lanzamos, monitorizamos, apoyamos y ampliamos los productos. Dominio, hosting, mantenimiento y soporte afectan el alcance y precio; inclúyelos en tu solicitud.",
    zh: "我们会负责上线、监控、支持、改进和扩展。域名、托管、维护和上线后支持会影响范围与报价，请在项目申请中注明。",
  }, language);
  return answer(content, language, [pageActions.start(language), pageActions.contact(language)]);
}

export function getChatbotResponse(
  message: string,
  preferredLanguage: SupportedLanguage,
): ChatbotAnswer {
  const language = detectChatLanguage(message, preferredLanguage);
  const text = normalize(message);
  if (!text) return answer(chatbotCopy[language].fallback, language);

  if (matches(text, terms.thanks)) {
    return answer(localized({ en: "You're welcome! I'm here whenever you need help with NextAura AI or your project idea.", ar: "العفو! أنا جاهز بأي وقت تساعدك بمعلومات NextAura AI أو بفكرة مشروعك.", es: "¡Con gusto! Estoy aquí para ayudarte con NextAura AI o tu idea de proyecto.", zh: "不客气！随时可以继续询问 NextAura AI 或你的项目想法。" }, language), language, [pageActions.start(language)]);
  }
  if (matches(text, terms.farewell)) {
    return answer(localized({ en: "Goodbye! We hope to build something great with you.", ar: "مع السلامة! بنتمنى نبني معك شيء مميز.", es: "¡Hasta luego! Esperamos construir algo excelente contigo.", zh: "再见！期待与你一起打造出色的产品。" }, language), language);
  }
  if (matches(text, terms.smalltalk)) {
    return answer(localized({ en: "I'm doing great and ready to help. Ask me about a service, product, price, or project idea.", ar: "تمام وجاهز أساعدك! اسألني عن خدمة، منتج، سعر، أو فكرة مشروع.", es: "¡Muy bien y listo para ayudarte! Pregunta por servicios, productos, precios o tu idea.", zh: "我很好，随时可以帮你。你可以询问服务、产品、价格或项目想法。" }, language), language);
  }
  if (matches(text, terms.greeting) && text.length < 45) return greetingResponse(language);
  if (matches(text, terms.help)) return helpResponse(language);

  if (matches(text, terms.founders) && matches(text, terms.services)) {
    return teamCapabilitiesResponse(language);
  }
  if (matches(text, terms.mohannad)) return memberResponse("mohannad", language);
  if (matches(text, terms.moayad)) return memberResponse("moayad", language);
  if (matches(text, terms.fitcoach)) return productResponse("fitcoach", language);
  if (matches(text, terms.aurawallet)) return productResponse("aurawallet", language);
  if (matches(text, terms.letsbake)) return productResponse("letsbake", language);
  if (matches(text, terms.pricing)) return pricingResponse(text, language);
  if (matches(text, terms.start)) return startProjectResponse(language);
  if (matches(text, terms.contact)) return contactResponse(language);
  if (matches(text, terms.timeline)) return timelineResponse(language);
  if (matches(text, terms.support)) return supportResponse(language);
  if (matches(text, terms.location)) return locationResponse(language);
  if (matches(text, terms.process)) return processResponse(language);
  if (matches(text, terms.founders)) return teamResponse(language);
  if (matches(text, terms.products)) return productsResponse(language);
  if (matches(text, terms.industries)) return industriesResponse(language);
  if (matches(text, terms.chatbot)) return specificServiceResponse("chatbots", language);
  if (matches(text, terms.automation)) return specificServiceResponse("automation", language);
  if (matches(text, terms.platform)) return specificServiceResponse("platforms", language);
  if (matches(text, terms.mvp)) return specificServiceResponse("mvp", language);
  if (matches(text, terms.design)) return specificServiceResponse("design", language);
  if (matches(text, terms.website)) return specificServiceResponse("web", language);
  if (matches(text, terms.services)) return servicesResponse(language);
  if (matches(text, terms.company)) return companyResponse(language);

  return answer(chatbotCopy[language].fallback, language, [
    pageActions.services(language),
    pageActions.products(language),
    pageActions.contact(language),
  ]);
}
