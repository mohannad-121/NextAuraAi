import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";

export type Language = "ar" | "en" | "es";

export const languageOptions: Array<{ code: Language; label: string; short: string }> = [
  { code: "ar", label: "العربية", short: "AR" },
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
];

// Keep this file saved as UTF-8. Do not paste mojibake/corrupted text into translations.
export const translations = {
  en: {
    brand: "NextAura AI",
    nav: { home: "Home", services: "Services", work: "Work", team: "Team", contact: "Contact", start: "Start a Project", startShort: "Start" },
    hero: {
      badge: "AI software studio • est. 2025",
      titleA: "We build",
      titleB: " websites, chatbots, and MVPs.",
      subtitle: "We help businesses turn ideas into intelligent digital products using AI, automation, and modern software development.",
      viewWork: "View Our Work",
      readiness: "Product readiness",
      stats: [
        ["AI", "Products"],
        ["100%", "Custom Built"],
        ["Fast", "Delivery"],
        ["Ongoing", "Support"],
      ],
    },
    services: {
      eyebrow: "What we build",
      titleA: "Services we build for the ",
      titleB: "AI era",
      subtitle: "Focused offers for businesses that need real software, not empty tech theatre.",
      bestFor: "Best for:",
      items: [
        { title: "AI Chatbots", desc: "Conversational agents that answer questions, collect leads, and support customers 24/7.", features: ["Customer support", "Lead collection", "Business FAQ"], bestFor: "Gyms, clinics, restaurants, agencies" },
        { title: "Websites & Web Apps", desc: "Fast, modern websites and full-stack web applications built around your business goals.", features: ["Landing pages", "Dashboards", "Booking systems"], bestFor: "Small businesses and startups" },
        { title: "AI MVP Development", desc: "Turn your idea into a usable AI-powered product that can be tested, shown, or launched.", features: ["Prototype", "User flow", "AI integration"], bestFor: "Founders and new ideas" },
        { title: "Business Automation", desc: "Automate repetitive workflows, forms, reports, and customer processes.", features: ["Forms", "CRM flow", "Notifications"], bestFor: "Businesses with repeated manual tasks" },
      ],
    },
    process: {
      eyebrow: "How we build",
      titleA: "How we turn ideas into ",
      titleB: "intelligent products",
      steps: [
        { title: "Discover", text: "We understand your business, idea, goals, and users." },
        { title: "Design", text: "We create a clear structure, user experience, and product flow." },
        { title: "Build", text: "We develop the website, dashboard, chatbot, or MVP." },
        { title: "Launch", text: "We deploy, test, improve, and prepare the product for real users." },
      ],
    },
    caseStudy: {
      eyebrow: "Featured case study",
      titleA: "FitCoach AI - ",
      titleB: "Intelligent Virtual Personal Trainer",
      desc: "FitCoach AI is our AI-powered fitness platform that generates personalized workout and nutrition plans based on user profile data, goals, and fitness level.",
      problem: "Problem",
      problemText: "Generic fitness advice does not fit every user.",
      solution: "Solution",
      solutionText: "We built a personalized AI experience that understands user goals and creates practical plans.",
      request: "Request Similar Project",
      viewProject: "View Project",
      dashboardUrl: "fitcoach.ai/dashboard",
      today: "Today's AI plan",
      plan: "Upper Body Strength",
      coach: "AI Coach: Great progress this week. Updating load, recovery, and nutrition targets.",
      tags: ["AI Chatbot", "Personalized Workout Plans", "Nutrition Guidance", "User Dashboard", "Scheduling System", "Plan Approval Flow"],
      features: ["AI Chatbot", "Workout Engine", "Nutrition Plans", "User Dashboard", "Scheduling", "Approval Flow"],
      workouts: [["Bench Press", "4 x 8"], ["Pull-ups", "4 x 10"], ["Shoulder Press", "3 x 12"], ["Nutrition Goal", "2,450 kcal"]],
    },
    why: {
      eyebrow: "Why NextAura",
      titleA: "Why businesses choose ",
      titleB: "us",
      items: [
        { title: "Practical AI, not hype", text: "We build AI features that solve real business problems." },
        { title: "Custom-built solutions", text: "We design every project around the client's actual workflow." },
        { title: "Fast MVP delivery", text: "We help you launch quickly and improve after real feedback." },
        { title: "Business-first approach", text: "We focus on how the product helps you get clients, save time, or improve operations." },
      ],
    },
    early: {
      eyebrow: "Demo showcase",
      titleA: "Early work and ",
      titleB: "demo concepts",
      subtitle: "No fake testimonials — just honest examples of what we have built and what we can build.",
      items: [
        { title: "FitCoach AI", text: "AI fitness platform with workout and nutrition planning." },
        { title: "Miss Gym Website Demo", text: "Business website concept with booking, products, gallery, location, and admin dashboard preview." },
        { title: "AI Assistant Concepts", text: "Custom chatbot ideas for businesses that want smarter customer interaction." },
      ],
    },
    team: {
      eyebrow: "The founders",
      titleA: "Small team, ",
      titleB: "serious product energy",
      portrait: "portrait",
      members: {
        mohannad: { role: "Founder & AI/Backend Lead", bio: "On our team, Mohannad leads product direction, backend systems, AI logic, and client delivery.", focus: ["AI logic", "Backend systems", "Client delivery"] },
        moayad: { role: "Co-Founder & Systems Architect", bio: "On our team, Moayad focuses on system structure, documentation, workflows, testing, and technical planning.", focus: ["System architecture", "Workflows", "Testing"] },
      },
    },
    contact: {
      eyebrow: "Start the conversation",
      titleA: "Have an idea? ",
      titleB: "Let's turn it into a product.",
      subtitle: "Share the rough version. We'll help shape the right website, dashboard, chatbot, or full system.",
      channels: { whatsapp: "Chat with us instantly", email: "hello@nextaura.ai", linkedin: "Follow our journey" },
      footerText: "Built with ambition by our team. We create AI-powered software for businesses that want momentum.",
      quickLinks: "Quick links",
      contact: "Contact",
      location: "Amman / Remote",
    },
    mobileCta: { ready: "Ready to build?", idea: "Tell us your idea", start: "Start" },
    modal: {
      title: "Start your project",
      subtitle: "Tell us about your idea and we'll help you choose the best solution based on your goals and required features.",
      steps: ["Client info", "Idea & features", "Package & budget", "Review & submit"],
      labels: {
        fullName: "Full name", phone: "Phone / WhatsApp", email: "Email - optional", businessName: "Business or project name", projectType: "Project type", projectIdea: "Explain your project idea", features: "Required features", package: "Choose the package that fits your budget", timeline: "When do you need the project?", contactMethod: "Preferred contact method", notes: "Extra notes", review: "Request review",
      },
      placeholders: { fullName: "Example: Mohannad Abu Ayyash", phone: "07XXXXXXXX", businessName: "Example: Miss Gym", projectIdea: "Briefly describe the project idea, the problem you want to solve, and the most important pages or features.", notes: "Any extra details you want to share." },
      select: { projectType: "Choose project type", timeline: "Choose timeline", contactMethod: "Choose contact method" },
      actions: { next: "Next", previous: "Previous", submit: "Submit request", whatsapp: "Send via WhatsApp", close: "Close" },
      success: "Your request has been received successfully. We will contact you soon to discuss the details.",
      confirmClose: "You have entered data. Do you want to close the form?",
      required: "This field is required.",
      pricingNote: "Prices are estimated ranges and depend on the number of pages, features, database needs, admin dashboard, integrations, domain, and hosting.",
      reviewFallback: "Not specified",
      projectTypes: ["Portfolio website", "Company/business website", "Store or product menu", "Booking system", "Admin Dashboard", "Complete web application", "Chatbot / AI Assistant", "Other"],
      features: ["Responsive professional design", "Informational pages", "Image gallery", "Products or services menu", "Contact form", "Appointment booking", "WhatsApp integration", "Admin dashboard", "User login", "Database", "Online payment", "Chatbot / AI", "Domain and hosting"],
      timelines: ["Within one week", "Within two weeks", "Within one month", "Not urgent"],
      packages: [
        { title: "Basic Website", price: "150 - 350 JOD", desc: "For landing pages, small business websites, basic pages, gallery, contact, and WhatsApp.", features: ["Responsive design", "Basic pages", "Images and services", "Contact and WhatsApp", "Good starting point"] },
        { title: "Business Website + Admin", price: "400 - 700 JOD", badge: "Most requested", desc: "For businesses that need content management, products, gallery, offers, bookings, or a simple admin dashboard.", features: ["Everything in Basic", "Admin Dashboard", "Products or gallery management", "Offers or services management", "Simple booking or request flow"] },
        { title: "Complete System", price: "800 - 1500 JOD", desc: "For full web apps with database, login, advanced admin dashboard, booking system, AI/chatbot integration, and deployment.", features: ["Complete web app", "Database", "Login system", "Advanced Admin Dashboard", "AI / chatbot option", "Deployment setup"] },
      ],
    },
  },
  ar: {} as any,
  es: {} as any,
} as const;

translations.ar = {
  ...translations.en,
  nav: { home: "الرئيسية", services: "الخدمات", work: "الأعمال", team: "الفريق", contact: "تواصل", start: "ابدأ مشروعك", startShort: "ابدأ" },
  hero: { ...translations.en.hero, titleA: "نبني", titleB: " مواقع، شات بوتات، ومنتجات MVP.", subtitle: "نساعد الشركات على تحويل أفكارها إلى منتجات رقمية ذكية باستخدام الذكاء الاصطناعي، الأتمتة، وتطوير البرمجيات الحديثة.", viewWork: "شاهد أعمالنا", readiness: "جاهزية المنتج", stats: [["AI", "منتجات"], ["100%", "تفصيل حسب الطلب"], ["سريع", "تسليم"], ["مستمر", "دعم"]] },
  services: { ...translations.en.services, eyebrow: "ماذا نبني", titleA: "خدمات نبنيها لـ", titleB: "عصر الذكاء الاصطناعي", subtitle: "خدمات عملية للشركات التي تحتاج حلولا حقيقية، وليس مجرد كلام تقني.", bestFor: "مناسب لـ:", items: [
    { title: "شات بوتات بالذكاء الاصطناعي", desc: "مساعدون ذكيون يجيبون على الأسئلة، يجمعون العملاء المحتملين، ويدعمون العملاء على مدار الساعة.", features: ["دعم العملاء", "جمع العملاء المحتملين", "أسئلة العمل الشائعة"], bestFor: "النوادي، العيادات، المطاعم، الوكالات" },
    { title: "مواقع وتطبيقات ويب", desc: "مواقع حديثة وسريعة وتطبيقات ويب متكاملة مبنية حول أهداف عملك.", features: ["صفحات هبوط", "لوحات تحكم", "أنظمة حجز"], bestFor: "الشركات الصغيرة والناشئة" },
    { title: "تطوير منتجات MVP بالذكاء الاصطناعي", desc: "حوّل فكرتك إلى منتج ذكي قابل للتجربة، العرض، أو الإطلاق.", features: ["نموذج أولي", "تدفق المستخدم", "دمج الذكاء الاصطناعي"], bestFor: "المؤسسون والأفكار الجديدة" },
    { title: "أتمتة الأعمال", desc: "أتمتة المهام المتكررة، النماذج، التقارير، وعمليات العملاء.", features: ["نماذج", "تدفق CRM", "إشعارات"], bestFor: "الأعمال ذات المهام اليدوية المتكررة" },
  ] },
  process: { ...translations.en.process, eyebrow: "كيف نبني", titleA: "كيف نحول الأفكار إلى ", titleB: "منتجات ذكية", steps: [
    { title: "اكتشاف", text: "نفهم عملك، فكرتك، أهدافك، والمستخدمين المستهدفين." },
    { title: "تصميم", text: "نصمم هيكلا واضحا، تجربة استخدام مناسبة، ومسارا منطقيا للمنتج." },
    { title: "بناء", text: "نطور الموقع، لوحة التحكم، الشات بوت، أو منتج MVP." },
    { title: "إطلاق", text: "ننشر المنتج، نختبره، نحسنه، ونجهزه للمستخدمين الحقيقيين." },
  ] },
  caseStudy: { ...translations.en.caseStudy, titleB: "مدرب شخصي ذكي افتراضي", desc: "FitCoach AI هو مشروعنا في اللياقة الذكية، يساعد على إنشاء خطط تمرين وتغذية مخصصة حسب بيانات المستخدم، هدفه، ومستوى لياقته.", problem: "المشكلة", problemText: "النصائح العامة في اللياقة لا تناسب كل مستخدم.", solution: "الحل", solutionText: "بنينا تجربة ذكاء اصطناعي مخصصة تفهم هدف المستخدم وتقترح خططا عملية.", request: "اطلب مشروعا مشابها", viewProject: "استعرض المشروع", today: "خطة اليوم بالذكاء الاصطناعي", plan: "قوة الجزء العلوي", coach: "مدرب AI: تقدم ممتاز هذا الأسبوع. سنحدث الحمل والتعافي وأهداف التغذية.", tags: ["شات بوت AI", "خطط تمرين مخصصة", "إرشادات تغذية", "لوحة مستخدم", "نظام جدولة", "تدفق موافقة"], features: ["شات بوت AI", "محرك تمارين", "خطط تغذية", "لوحة مستخدم", "جدولة", "تدفق موافقة"], workouts: [["تمرين الصدر", "4 x 8"], ["عقلة", "4 x 10"], ["ضغط كتف", "3 x 12"], ["هدف التغذية", "2,450 سعرة"]] },
  why: { ...translations.en.why, eyebrow: "لماذا نحن", titleA: "لماذا تختارنا ", titleB: "الشركات", items: [
    { title: "ذكاء عملي وليس ضجة", text: "نبني خصائص ذكاء اصطناعي تحل مشاكل حقيقية في العمل." },
    { title: "حلول مخصصة", text: "نصمم كل مشروع حول طريقة عمل العميل الفعلية." },
    { title: "تسليم MVP سريع", text: "نساعدك على الإطلاق بسرعة والتحسين بعد ملاحظات حقيقية." },
    { title: "نهج يركز على العمل", text: "نركز على كيف يساعدك المنتج في جلب عملاء، توفير وقت، أو تحسين العمليات." },
  ] },
  early: { ...translations.en.early, eyebrow: "نماذج مبكرة", titleA: "أعمالنا الأولية و", titleB: "نماذجنا التجريبية", subtitle: "بدون شهادات وهمية — فقط أمثلة حقيقية على ما بنيناه وما نستطيع بناءه.", items: [
    { title: "FitCoach AI", text: "منصة لياقة ذكية لتخطيط التمارين والتغذية." },
    { title: "عرض Miss Gym التجريبي", text: "مفهوم موقع بزنس مع حجز، منتجات، معرض، موقع، ومعاينة لوحة تحكم." },
    { title: "مفاهيم مساعد AI", text: "أفكار شات بوت مخصصة للأعمال التي تريد تفاعل عملاء أذكى." },
  ] },
  team: { ...translations.en.team, eyebrow: "المؤسسون", titleA: "فريق صغير، ", titleB: "وطاقة جدية لبناء المنتجات", portrait: "صورة", members: { mohannad: { role: "Founder & AI/Backend Lead", bio: "في فريقنا، يقود مهند اتجاه المنتج، أنظمة الباكند، منطق الذكاء الاصطناعي، وتسليم العملاء.", focus: ["منطق AI", "أنظمة باكند", "تسليم العملاء"] }, moayad: { role: "Co-Founder & Systems Architect", bio: "في فريقنا، يركز مؤيد على هيكلة الأنظمة، التوثيق، سير العمل، الاختبار، والتخطيط التقني.", focus: ["هيكلة الأنظمة", "سير العمل", "الاختبار"] } } },
  contact: { ...translations.en.contact, eyebrow: "ابدأ المحادثة", titleA: "عندك فكرة؟ ", titleB: "خلينا نحولها إلى منتج.", subtitle: "شاركنا فكرتك حتى لو كانت بسيطة، وسنساعدك في تحويلها إلى موقع، لوحة تحكم، شات بوت، أو نظام متكامل.", channels: { whatsapp: "تواصل معنا مباشرة", email: "hello@nextaura.ai", linkedin: "تابع رحلتنا" }, footerText: "بني بطموح من فريقنا. نصنع برمجيات مدعومة بالذكاء الاصطناعي للشركات التي تريد التقدم.", quickLinks: "روابط سريعة", contact: "تواصل", location: "عمّان / عن بعد" },
  mobileCta: { ready: "جاهز للبناء؟", idea: "احكِ لنا فكرتك", start: "ابدأ" },
  modal: {
    ...translations.en.modal,
    title: "ابدأ مشروعك معنا",
    subtitle: "احكِ لنا عن فكرتك وسنساعدك في اختيار الحل الأنسب حسب أهدافك والميزات المطلوبة.",
    steps: ["معلومات العميل", "الفكرة والميزات", "الباقة والميزانية", "المراجعة والإرسال"],
    labels: { fullName: "الاسم الكامل", phone: "رقم الهاتف / واتساب", email: "البريد الإلكتروني - اختياري", businessName: "اسم المشروع أو الشركة", projectType: "نوع المشروع", projectIdea: "اشرح فكرة مشروعك", features: "الميزات المطلوبة", package: "اختر الفئة المناسبة لميزانيتك", timeline: "متى تحتاج المشروع؟", contactMethod: "طريقة التواصل المفضلة", notes: "ملاحظات إضافية", review: "مراجعة الطلب" },
    placeholders: { fullName: "مثال: مهند أبو عياش", phone: "07XXXXXXXX", businessName: "مثال: Miss Gym", projectIdea: "اكتب باختصار فكرة المشروع، المشكلة اللي بدك تحلها، وأهم الصفحات أو الخصائص المطلوبة.", notes: "أي تفاصيل إضافية تحب تخبرنا عنها." },
    select: { projectType: "اختر نوع المشروع", timeline: "اختر المدة", contactMethod: "اختر طريقة التواصل" },
    actions: { next: "التالي", previous: "السابق", submit: "إرسال الطلب", whatsapp: "إرسال عبر واتساب", close: "إغلاق" },
    success: "تم استلام طلبك بنجاح، سنتواصل معك قريبا لمناقشة التفاصيل.",
    confirmClose: "لديك بيانات مدخلة. هل تريد إغلاق النموذج؟",
    required: "هذا الحقل مطلوب.",
    pricingNote: "الأسعار تقريبية وتعتمد على عدد الصفحات، الخصائص المطلوبة، قاعدة البيانات، لوحة التحكم، التكاملات، الدومين، والاستضافة.",
    reviewFallback: "غير محدد",
    projectTypes: ["موقع تعريفي", "موقع لشركة أو بزنس", "متجر أو منيو منتجات", "نظام حجز", "لوحة تحكم Admin Dashboard", "تطبيق ويب متكامل", "شات بوت / AI Assistant", "غير ذلك"],
    features: ["تصميم احترافي متجاوب", "صفحات تعريفية", "معرض صور", "منيو منتجات أو خدمات", "فورم تواصل", "حجز مواعيد", "ربط واتساب", "لوحة تحكم Admin", "تسجيل دخول للمستخدمين", "قاعدة بيانات", "دفع إلكتروني", "شات بوت / AI", "دومين واستضافة"],
    timelines: ["خلال أسبوع", "خلال أسبوعين", "خلال شهر", "غير مستعجل"],
    packages: [
      { title: "موقع أساسي", price: "150 - 350 دينار أردني", desc: "مناسب لصفحات الهبوط والمواقع الصغيرة والصفحات الأساسية والمعرض والتواصل والواتساب.", features: ["تصميم متجاوب", "صفحات أساسية", "صور وخدمات", "تواصل وواتساب", "مناسب كبداية"] },
      { title: "موقع بزنس مع لوحة تحكم", price: "400 - 700 دينار أردني", badge: "الأكثر طلبا", desc: "مناسب للأعمال التي تحتاج إدارة محتوى، منتجات، صور، عروض، حجوزات، أو لوحة تحكم بسيطة.", features: ["كل ميزات Basic", "Admin Dashboard", "إدارة المنتجات أو الصور", "إدارة العروض أو الخدمات", "نظام حجز أو طلبات بسيط"] },
      { title: "نظام متكامل", price: "800 - 1500 دينار أردني", desc: "مناسب لتطبيقات ويب كاملة مع قاعدة بيانات، تسجيل دخول، لوحة تحكم متقدمة، نظام حجز، وربط AI أو شات بوت.", features: ["تطبيق ويب متكامل", "قاعدة بيانات", "نظام تسجيل دخول", "لوحة تحكم متقدمة", "خيار AI / شات بوت", "تجهيز الإطلاق"] },
    ],
  },
};

translations.es = {
  ...translations.en,
  nav: { home: "Inicio", services: "Servicios", work: "Proyectos", team: "Equipo", contact: "Contacto", start: "Iniciar proyecto", startShort: "Iniciar" },
  hero: { ...translations.en.hero, titleA: "Creamos", titleB: " sitios web, chatbots y MVPs.", subtitle: "Ayudamos a las empresas a convertir ideas en productos digitales inteligentes usando IA, automatización y desarrollo de software moderno.", viewWork: "Ver proyectos", readiness: "Preparación del producto", stats: [["IA", "Productos"], ["100%", "A medida"], ["Rápida", "Entrega"], ["Continuo", "Soporte"]] },
  services: { ...translations.en.services, eyebrow: "Qué construimos", titleA: "Servicios que creamos para la ", titleB: "era de la IA", subtitle: "Soluciones prácticas para empresas que necesitan software real, no solo palabras tecnológicas.", bestFor: "Ideal para:", items: [
    { title: "Chatbots con IA", desc: "Agentes conversacionales que responden preguntas, captan clientes potenciales y atienden a los usuarios 24/7.", features: ["Atención al cliente", "Captación de leads", "FAQ del negocio"], bestFor: "Gimnasios, clínicas, restaurantes, agencias" },
    { title: "Sitios web y aplicaciones web", desc: "Sitios modernos y rápidos, además de aplicaciones web completas creadas según los objetivos de tu negocio.", features: ["Landing pages", "Dashboards", "Sistemas de reserva"], bestFor: "Pequeñas empresas y startups" },
    { title: "Desarrollo de MVP con IA", desc: "Convierte tu idea en un producto con IA que se pueda probar, presentar o lanzar.", features: ["Prototipo", "Flujo de usuario", "Integración de IA"], bestFor: "Fundadores e ideas nuevas" },
    { title: "Automatización empresarial", desc: "Automatiza tareas repetitivas, formularios, reportes y procesos de clientes.", features: ["Formularios", "Flujo CRM", "Notificaciones"], bestFor: "Empresas con tareas manuales repetidas" },
  ] },
  process: { ...translations.en.process, eyebrow: "Cómo construimos", titleA: "Cómo convertimos ideas en ", titleB: "productos inteligentes", steps: [
    { title: "Descubrir", text: "Entendemos tu negocio, idea, objetivos y usuarios." },
    { title: "Diseñar", text: "Creamos una estructura clara, experiencia de usuario y flujo del producto." },
    { title: "Construir", text: "Desarrollamos el sitio, dashboard, chatbot o MVP." },
    { title: "Lanzar", text: "Lanzamos, probamos, mejoramos y preparamos el producto para usuarios reales." },
  ] },
  caseStudy: { ...translations.en.caseStudy, titleB: "Entrenador personal virtual inteligente", desc: "FitCoach AI es nuestra plataforma fitness impulsada por IA que genera planes personalizados de entrenamiento y nutrición según el perfil, los objetivos y el nivel físico del usuario.", problem: "Problema", problemText: "Los consejos fitness generales no se adaptan a cada usuario.", solution: "Solución", solutionText: "Creamos una experiencia de IA personalizada que entiende los objetivos del usuario y propone planes prácticos.", request: "Solicitar proyecto similar", viewProject: "Ver proyecto", today: "Plan de IA de hoy", plan: "Fuerza de tren superior", coach: "Coach IA: Gran progreso esta semana. Actualizando carga, recuperación y objetivos de nutrición.", tags: ["Chatbot IA", "Planes personalizados", "Guía nutricional", "Panel de usuario", "Sistema de agenda", "Flujo de aprobación"], features: ["Chatbot IA", "Motor de entreno", "Planes de nutrición", "Panel de usuario", "Agenda", "Aprobación"], workouts: [["Press de banca", "4 x 8"], ["Dominadas", "4 x 10"], ["Press de hombro", "3 x 12"], ["Objetivo nutricional", "2,450 kcal"]] },
  why: { ...translations.en.why, eyebrow: "Por qué nosotros", titleA: "Por qué las empresas ", titleB: "nos eligen", items: [
    { title: "IA práctica, no humo", text: "Creamos funciones de IA que resuelven problemas reales del negocio." },
    { title: "Soluciones a medida", text: "Diseñamos cada proyecto según el flujo real de trabajo del cliente." },
    { title: "Entrega rápida de MVP", text: "Te ayudamos a lanzar rápido y mejorar con feedback real." },
    { title: "Enfoque de negocio", text: "Nos enfocamos en cómo el producto te ayuda a conseguir clientes, ahorrar tiempo o mejorar operaciones." },
  ] },
  early: { ...translations.en.early, eyebrow: "Demo showcase", titleA: "Primeros trabajos y ", titleB: "demos", subtitle: "Sin testimonios falsos — solo ejemplos reales de lo que hemos creado y de lo que podemos crear.", items: [
    { title: "FitCoach AI", text: "Plataforma fitness con IA para planificación de entrenamiento y nutrición." },
    { title: "Demo de Miss Gym", text: "Concepto de sitio empresarial con reservas, productos, galería, ubicación y vista previa de admin." },
    { title: "Conceptos de asistentes IA", text: "Ideas de chatbots personalizados para empresas que quieren una interacción más inteligente." },
  ] },
  team: { ...translations.en.team, eyebrow: "Fundadores", titleA: "Equipo pequeño, ", titleB: "energía seria para crear productos", portrait: "retrato", members: { mohannad: { role: "Founder & AI/Backend Lead", bio: "En nuestro equipo, Mohannad lidera la dirección del producto, backend, lógica de IA y entrega al cliente.", focus: ["Lógica IA", "Backend", "Entrega al cliente"] }, moayad: { role: "Co-Founder & Systems Architect", bio: "En nuestro equipo, Moayad se enfoca en arquitectura, documentación, flujos, pruebas y planificación técnica.", focus: ["Arquitectura", "Flujos", "Pruebas"] } } },
  contact: { ...translations.en.contact, eyebrow: "Inicia la conversación", titleA: "¿Tienes una idea? ", titleB: "Vamos a convertirla en producto.", subtitle: "Comparte tu idea aunque esté en borrador. Te ayudamos a convertirla en sitio web, panel, chatbot o sistema completo.", channels: { whatsapp: "Chatea con nosotros", email: "hello@nextaura.ai", linkedin: "Sigue nuestro camino" }, footerText: "Creado con ambición por nuestro equipo. Construimos software con IA para empresas que quieren avanzar.", quickLinks: "Enlaces rápidos", contact: "Contacto", location: "Amman / Remoto" },
  mobileCta: { ready: "¿Listo para construir?", idea: "Cuéntanos tu idea", start: "Iniciar" },
  modal: {
    ...translations.en.modal,
    title: "Inicia tu proyecto",
    subtitle: "Cuéntanos tu idea y te ayudaremos a elegir la mejor solución según tus objetivos y funciones requeridas.",
    steps: ["Datos del cliente", "Idea y funciones", "Paquete y presupuesto", "Revisión y envío"],
    labels: { fullName: "Nombre completo", phone: "Teléfono / WhatsApp", email: "Correo electrónico - opcional", businessName: "Nombre del proyecto o empresa", projectType: "Tipo de proyecto", projectIdea: "Explica tu idea", features: "Funciones requeridas", package: "Elige el paquete adecuado para tu presupuesto", timeline: "¿Cuándo necesitas el proyecto?", contactMethod: "Método de contacto preferido", notes: "Notas adicionales", review: "Revisión de la solicitud" },
    placeholders: { fullName: "Ejemplo: Mohannad Abu Ayyash", phone: "07XXXXXXXX", businessName: "Ejemplo: Miss Gym", projectIdea: "Describe brevemente la idea, el problema que quieres resolver y las páginas o funciones principales.", notes: "Cualquier detalle adicional que quieras compartir." },
    select: { projectType: "Elige el tipo de proyecto", timeline: "Elige el plazo", contactMethod: "Elige el método de contacto" },
    actions: { next: "Siguiente", previous: "Anterior", submit: "Enviar solicitud", whatsapp: "Enviar por WhatsApp", close: "Cerrar" },
    success: "Hemos recibido tu solicitud correctamente. Nos pondremos en contacto contigo pronto para hablar de los detalles.",
    confirmClose: "Has ingresado datos. ¿Quieres cerrar el formulario?",
    required: "Este campo es obligatorio.",
    pricingNote: "Los precios son rangos estimados y dependen del número de páginas, funciones, base de datos, panel de administración, integraciones, dominio y hosting.",
    reviewFallback: "No especificado",
    projectTypes: ["Sitio informativo", "Sitio de empresa o negocio", "Tienda o menú de productos", "Sistema de reservas", "Admin Dashboard", "Aplicación web completa", "Chatbot / AI Assistant", "Otro"],
    features: ["Diseño profesional responsive", "Páginas informativas", "Galería de imágenes", "Menú de productos o servicios", "Formulario de contacto", "Reserva de citas", "Integración WhatsApp", "Admin dashboard", "Inicio de sesión", "Base de datos", "Pago en línea", "Chatbot / IA", "Dominio y hosting"],
    timelines: ["En una semana", "En dos semanas", "En un mes", "Sin urgencia"],
    packages: [
      { title: "Sitio web básico", price: "150 - 350 JOD", desc: "Para landing pages, sitios de pequeños negocios, páginas básicas, galería, contacto y WhatsApp.", features: ["Diseño responsive", "Páginas básicas", "Imágenes y servicios", "Contacto y WhatsApp", "Buen punto de inicio"] },
      { title: "Sitio empresarial + Admin", price: "400 - 700 JOD", badge: "Más solicitado", desc: "Para empresas que necesitan gestión de contenido, productos, galería, ofertas, reservas o un admin simple.", features: ["Todo lo de Basic", "Admin Dashboard", "Gestión de productos o galería", "Gestión de ofertas o servicios", "Flujo simple de reservas o solicitudes"] },
      { title: "Sistema completo", price: "800 - 1500 JOD", desc: "Para aplicaciones web completas con base de datos, login, admin avanzado, reservas, integración IA/chatbot y despliegue.", features: ["Aplicación web completa", "Base de datos", "Sistema de login", "Admin Dashboard avanzado", "Opción IA / chatbot", "Preparación de despliegue"] },
    ],
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  tr: any;
  dir: "rtl" | "ltr";
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("nextaura-language") as Language | null;
    return saved && ["ar", "en", "es"].includes(saved) ? saved : "en";
  });

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("nextaura-language", next);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, tr: translations[language] || translations.en, dir: language === "ar" ? "rtl" as const : "ltr" as const }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = languageOptions.find((option) => option.code === language) || languageOptions[1];

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Language"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-primary/35 bg-card/75 px-3 text-sm font-semibold text-foreground shadow-[0_0_24px_oklch(0.58_0.24_315_/_0.18)] backdrop-blur-xl transition-all hover:border-cyan/70 hover:shadow-[0_0_32px_oklch(0.68_0.22_28_/_0.25)]"
      >
        <Globe2 className="h-4 w-4" style={{ color: "var(--cyan)" }} />
        <span>{current.short}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="absolute end-0 top-12 z-[120] w-44 overflow-hidden rounded-2xl border border-primary/35 bg-background/95 p-1.5 shadow-[0_18px_60px_oklch(0.05_0.04_265_/_0.75),0_0_40px_oklch(0.58_0.24_315_/_0.18)] backdrop-blur-2xl">
          {languageOptions.map((option) => {
            const active = option.code === language;
            return (
              <button
                key={option.code}
                type="button"
                onClick={() => {
                  setLanguage(option.code);
                  setOpen(false);
                }}
                className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/25 text-foreground ring-1 ring-cyan/40"
                    : "text-muted-foreground hover:bg-card/90 hover:text-foreground"
                }`}
              >
                <span>{option.label}</span>
                <span className="flex h-5 w-5 items-center justify-center">
                  {active ? <Check className="h-4 w-4" style={{ color: "var(--cyan)" }} /> : null}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
