import type { Language } from "@/i18n/translations";

type Localized = Record<Language, string>;
type LocalizedList = Record<Language, string[]>;

const text = (en: string, ar: string, es: string): Localized => ({ en, ar, es });
const list = (en: string[], ar: string[], es: string[]): LocalizedList => ({ en, ar, es });

export type FounderId = "mohannad" | "moayad";

export type FounderProfile = {
  id: FounderId;
  displayName: string;
  fullName: string;
  image: string;
  imagePosition: string;
  headline: Localized;
  location: Localized;
  summary: Localized;
  currentRole: {
    title: Localized;
    period: Localized;
    arrangement: Localized;
    summary: Localized;
    responsibilities: LocalizedList;
  };
  capabilities: string[];
  projects: Array<{
    name: string;
    description: Localized;
    technologies: string[];
    contributions: LocalizedList;
    outcomes?: string[];
    repository?: string;
  }>;
  experience: Array<{
    title: Localized;
    organization: string;
    period: Localized;
    location: Localized;
    arrangement: Localized;
    description: Localized;
    highlights: LocalizedList;
  }>;
  skills: Array<{ title: Localized; values: string[] }>;
  education: {
    degree: Localized;
    institution: string;
    period: Localized;
    result: Localized;
    focus: LocalizedList;
  };
  certifications: Array<{ provider: string; items: string[] }>;
  languages: Array<{ language: Localized; level: Localized }>;
  volunteering?: Array<{
    organization: string;
    period: Localized;
    description: Localized;
  }>;
  achievements: LocalizedList;
  links: { linkedin: string; github: string; email: string };
};

export const founderProfiles: Record<FounderId, FounderProfile> = {
  mohannad: {
    id: "mohannad",
    displayName: "Mohannad Abuayyash",
    fullName: "Mohannad Ahmad Saadat Abuayyash",
    image: "/team/mohannad.jpg",
    imagePosition: "50% 19%",
    headline: text(
      "Founder & CEO of NextAura AI · AI Developer · Junior Backend Developer",
      "المؤسس والرئيس التنفيذي لـ NextAura AI · مطوّر ذكاء اصطناعي · مطوّر باكند مبتدئ",
      "Fundador y CEO de NextAura AI · Desarrollador de IA · Desarrollador backend junior",
    ),
    location: text("Amman, Jordan", "عمّان، الأردن", "Amán, Jordania"),
    summary: text(
      "Artificial Intelligence graduate and founder of NextAura AI with hands-on experience in backend development, AI systems, machine learning, computer vision, NLP, speech recognition, Android development, and intelligent chatbot solutions. He turns business ideas into practical digital products by connecting product planning, backend logic, automation, AI integrations, and scalable implementation.",
      "خريج ذكاء اصطناعي ومؤسس NextAura AI، يمتلك خبرة عملية في تطوير الباكند وأنظمة الذكاء الاصطناعي والتعلّم الآلي والرؤية الحاسوبية ومعالجة اللغة الطبيعية والتعرّف على الكلام وتطوير أندرويد وحلول روبوتات الدردشة الذكية. يحوّل أفكار الأعمال إلى منتجات رقمية عملية عبر ربط تخطيط المنتج ومنطق الباكند والأتمتة وتكاملات الذكاء الاصطناعي والتنفيذ القابل للتوسع.",
      "Graduado en Inteligencia Artificial y fundador de NextAura AI, con experiencia práctica en desarrollo backend, sistemas de IA, aprendizaje automático, visión por computadora, NLP, reconocimiento de voz, desarrollo Android y chatbots inteligentes. Convierte ideas de negocio en productos digitales prácticos conectando planificación de producto, lógica backend, automatización, integraciones de IA e implementación escalable.",
    ),
    currentRole: {
      title: text(
        "Founder & CEO · NextAura AI",
        "المؤسس والرئيس التنفيذي · NextAura AI",
        "Fundador y CEO · NextAura AI",
      ),
      period: text("June 2026 – Present", "يونيو 2026 – حتى الآن", "Junio de 2026 – Actualidad"),
      arrangement: text("Self-employed · Hybrid", "عمل حر · هجين", "Autónomo · Híbrido"),
      summary: text(
        "Mohannad leads business strategy, product direction, customer discovery, system planning, and backend implementation. He connects design, software, automation, and AI to turn business requirements into clear digital products.",
        "يقود مهند استراتيجية الأعمال واتجاه المنتج وفهم احتياجات العملاء وتخطيط الأنظمة وتنفيذ الباكند. ويربط بين التصميم والبرمجيات والأتمتة والذكاء الاصطناعي لتحويل متطلبات الأعمال إلى منتجات رقمية واضحة.",
        "Mohannad lidera la estrategia de negocio, la dirección de producto, el descubrimiento de clientes, la planificación de sistemas y la implementación backend. Conecta diseño, software, automatización e IA para transformar requisitos de negocio en productos digitales claros.",
      ),
      responsibilities: list(
        [
          "Leads company direction, business planning, and product vision.",
          "Defines client requirements and coordinates product delivery.",
          "Builds backend logic, APIs, AI websites, chatbots, and business automations.",
          "Oversees scalable software and intelligent product implementation across website, AI, automation, and product services.",
        ],
        [
          "يقود اتجاه الشركة وتخطيط الأعمال ورؤية المنتج.",
          "يحدّد متطلبات العملاء وينسّق تسليم المنتجات.",
          "يبني منطق الباكند وواجهات API ومواقع الذكاء الاصطناعي وروبوتات الدردشة وأتمتة الأعمال.",
          "يشرف على تنفيذ البرمجيات القابلة للتوسع والمنتجات الذكية عبر خدمات المواقع والذكاء الاصطناعي والأتمتة والمنتجات.",
        ],
        [
          "Lidera la dirección de la empresa, la planificación de negocio y la visión de producto.",
          "Define requisitos de clientes y coordina la entrega de productos.",
          "Construye lógica backend, APIs, sitios de IA, chatbots y automatizaciones de negocio.",
          "Supervisa software escalable y productos inteligentes en servicios de sitios web, IA, automatización y producto.",
        ],
      ),
    },
    capabilities: [
      "AI Product Development",
      "Backend Development",
      "FastAPI & REST APIs",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP & Chatbots",
      "RAG & LLM Integration",
      "Business Automation",
      "Supabase & PostgreSQL",
      "React & TypeScript",
      "Android Fundamentals",
      "Product Planning",
      "Client Requirement Analysis",
      "Technical Team Coordination",
    ],
    projects: [
      {
        name: "FitCoach AI — AI-Powered Fitness Recommendation Platform",
        description: text(
          "A bilingual fitness platform that provides personalized workout and nutrition recommendations from each user’s profile, health information, goals, activity, and progress.",
          "منصة لياقة ثنائية اللغة تقدّم توصيات شخصية للتمارين والتغذية اعتمادًا على ملف المستخدم ومعلوماته الصحية وأهدافه ونشاطه وتقدّمه.",
          "Plataforma de fitness bilingüe que ofrece recomendaciones personalizadas de entrenamiento y nutrición según el perfil, la información de salud, los objetivos, la actividad y el progreso de cada usuario.",
        ),
        technologies: [
          "Python",
          "FastAPI",
          "ML",
          "RAG",
          "LLMs",
          "Supabase",
          "React",
          "TypeScript",
          "PostgreSQL",
          "Fitbit API",
        ],
        contributions: list(
          [
            "Built FastAPI backend services and API endpoints for profiles, chatbot, plans, schedules, and progress.",
            "Implemented goal classification for weight loss, muscle gain, and maintenance.",
            "Integrated RAG and LLM capabilities with validation and safety considerations.",
            "Developed bilingual Arabic/English workflows, profile and plan approval, scheduling, and Supabase data workflows.",
          ],
          [
            "بنى خدمات الباكند وواجهات FastAPI للملفات الشخصية وروبوت الدردشة والخطط والجداول والتقدم.",
            "طبّق تصنيف الأهداف لخسارة الوزن وبناء العضلات والمحافظة على الوزن.",
            "دمج قدرات RAG وLLM مع مراعاة التحقق والسلامة.",
            "طوّر مسارات عمل ثنائية اللغة بالعربية والإنجليزية واعتماد الملفات والخطط والجدولة ومسارات بيانات Supabase.",
          ],
          [
            "Construyó servicios backend y endpoints FastAPI para perfiles, chatbot, planes, calendarios y progreso.",
            "Implementó clasificación de objetivos para pérdida de peso, ganancia muscular y mantenimiento.",
            "Integró capacidades RAG y LLM con consideraciones de validación y seguridad.",
            "Desarrolló flujos bilingües árabe/inglés, aprobación de perfiles y planes, programación y flujos de datos de Supabase.",
          ],
        ),
      },
      {
        name: "University AI Chatbot — Student Academic Assistant",
        description: text(
          "An academic assistant for structured university information including courses, prerequisites, instructors, departments, office numbers, and services.",
          "مساعد أكاديمي لمعلومات الجامعة المنظمة، بما يشمل المساقات والمتطلبات السابقة والمدرسين والأقسام وأرقام المكاتب والخدمات.",
          "Asistente académico para información universitaria estructurada: cursos, prerrequisitos, instructores, departamentos, números de oficina y servicios.",
        ),
        technologies: ["Python", "NLP", "AI Chatbot", "APIs", "Database"],
        contributions: list(
          [
            "Designed chatbot flows for academic information, prerequisites, and instructor or department questions.",
            "Delivered fast, structured responses for common student queries.",
          ],
          [
            "صمّم تدفقات روبوت الدردشة للمعلومات الأكاديمية والمتطلبات السابقة وأسئلة المدرسين والأقسام.",
            "قدّم إجابات سريعة ومنظمة للاستفسارات الطلابية الشائعة.",
          ],
          [
            "Diseñó flujos de chatbot para información académica, prerrequisitos y preguntas sobre instructores o departamentos.",
            "Ofreció respuestas rápidas y estructuradas para consultas estudiantiles frecuentes.",
          ],
        ),
      },
      {
        name: "Animal Image Classification System",
        description: text(
          "An image classification system that predicts an uploaded animal image’s category and name.",
          "نظام لتصنيف الصور يتنبأ بفئة واسم الحيوان في الصورة المرفوعة.",
          "Sistema de clasificación de imágenes que predice la categoría y el nombre de un animal a partir de una imagen subida.",
        ),
        technologies: ["Python", "Computer Vision", "Deep Learning", "Image Classification"],
        contributions: list(
          [
            "Handled image preprocessing, model inference, prediction visualization, and deep-learning image recognition.",
          ],
          ["نفّذ معالجة الصور والاستدلال بالنموذج وعرض التنبؤات والتعرّف العميق على الصور."],
          [
            "Gestionó el preprocesamiento de imágenes, la inferencia del modelo, la visualización de predicciones y el reconocimiento profundo de imágenes.",
          ],
        ),
      },
      {
        name: "Additional AI, Deep Learning & Computer Vision Projects",
        description: text(
          "Practical machine-learning, deep-learning, and computer-vision work covering model training, testing, evaluation, and image AI.",
          "مشاريع عملية في التعلّم الآلي والتعلّم العميق والرؤية الحاسوبية تغطي تدريب النماذج واختبارها وتقييمها وذكاء الصور.",
          "Trabajo práctico de aprendizaje automático, aprendizaje profundo y visión por computadora que abarca entrenamiento, pruebas, evaluación e IA de imágenes.",
        ),
        technologies: ["Python", "Machine Learning", "Deep Learning", "Computer Vision"],
        contributions: list(
          [
            "Built and evaluated practical AI models across machine learning and image-focused work.",
          ],
          ["بنى وقيّم نماذج ذكاء اصطناعي عملية في التعلّم الآلي والعمل المرتكز على الصور."],
          [
            "Construyó y evaluó modelos de IA prácticos en aprendizaje automático y trabajo centrado en imágenes.",
          ],
        ),
      },
    ],
    experience: [
      {
        title: text(
          "AI Developer / Trainee",
          "مطوّر ومتدرّب ذكاء اصطناعي",
          "Desarrollador / Practicante de IA",
        ),
        organization: "Ministry of Digital Economy and Entrepreneurship, Jordan",
        period: text(
          "September 2025 – November 2025",
          "سبتمبر 2025 – نوفمبر 2025",
          "Septiembre de 2025 – Noviembre de 2025",
        ),
        location: text("Amman, Jordan", "عمّان، الأردن", "Amán, Jordania"),
        arrangement: text(
          "Hybrid · Part-time training",
          "هجين · تدريب بدوام جزئي",
          "Híbrido · Formación a tiempo parcial",
        ),
        description: text(
          "An intensive hands-on AI training program focused on applied machine learning, LLM concepts, deployment, and NLP.",
          "برنامج تدريبي مكثف وعملي في الذكاء الاصطناعي ركّز على التعلّم الآلي التطبيقي ومفاهيم LLM والنشر وNLP.",
          "Programa intensivo y práctico de formación en IA centrado en aprendizaje automático aplicado, conceptos de LLM, despliegue y NLP.",
        ),
        highlights: list(
          [
            "Worked with data processing, model development, ML pipelines, preprocessing, training, evaluation, and inference.",
            "Applied NLP and LLM concepts to chatbot intent handling, prompt engineering, and LoRA concepts.",
            "Built and deployed AI models using Python and FastAPI, with data analysis and visualization.",
          ],
          [
            "عمل على معالجة البيانات وتطوير النماذج ومسارات التعلّم الآلي والمعالجة المسبقة والتدريب والتقييم والاستدلال.",
            "طبّق مفاهيم NLP وLLM في معالجة نوايا روبوتات الدردشة وهندسة الموجّهات ومفاهيم LoRA.",
            "بنى ونشر نماذج ذكاء اصطناعي باستخدام Python وFastAPI، مع تحليل البيانات وعرضها.",
          ],
          [
            "Trabajó con procesamiento de datos, desarrollo de modelos, pipelines de ML, preprocesamiento, entrenamiento, evaluación e inferencia.",
            "Aplicó conceptos de NLP y LLM al manejo de intenciones de chatbots, prompt engineering y conceptos de LoRA.",
            "Construyó y desplegó modelos de IA con Python y FastAPI, además de análisis y visualización de datos.",
          ],
        ),
      },
    ],
    skills: [
      {
        title: text("Programming", "البرمجة", "Programación"),
        values: ["Python", "JavaScript", "TypeScript", "Java", "SQL", "C#"],
      },
      {
        title: text("Backend", "الباكند", "Backend"),
        values: ["FastAPI", "Flask", "REST APIs", "API Design", "Authentication Fundamentals"],
      },
      {
        title: text("Frontend", "الواجهة الأمامية", "Frontend"),
        values: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
      },
      {
        title: text(
          "AI & Machine Learning",
          "الذكاء الاصطناعي والتعلّم الآلي",
          "IA y aprendizaje automático",
        ),
        values: [
          "Machine Learning",
          "Deep Learning",
          "NLP",
          "Computer Vision",
          "Image Classification",
          "Speech Recognition",
          "AI Chatbots",
          "RAG",
          "LLM Integration",
          "Prompt Engineering",
          "LoRA Concepts",
        ],
      },
      {
        title: text(
          "Computer Vision Tools",
          "أدوات الرؤية الحاسوبية",
          "Herramientas de visión por computadora",
        ),
        values: [
          "PyTorch",
          "TensorFlow",
          "OpenCV",
          "Image Preprocessing",
          "Model Training",
          "Inference",
        ],
      },
      {
        title: text("Mobile", "الموبايل", "Móvil"),
        values: ["Android Fundamentals", "Face Recognition and Detection Concepts"],
      },
      {
        title: text("Databases & Cloud", "قواعد البيانات والسحابة", "Bases de datos y nube"),
        values: ["Supabase", "PostgreSQL", "MySQL", "AWS EC2 Fundamentals"],
      },
      {
        title: text("Tools", "الأدوات", "Herramientas"),
        values: ["Git", "GitHub", "VS Code", "Postman", "NetBeans"],
      },
    ],
    education: {
      degree: text(
        "Bachelor of Artificial Intelligence",
        "بكالوريوس في الذكاء الاصطناعي",
        "Licenciatura en Inteligencia Artificial",
      ),
      institution: "Zarqa University, Jordan",
      period: text("Graduated 2026", "تخرّج عام 2026", "Graduado en 2026"),
      result: text("Overall grade: 81%", "المعدل: 81٪", "Calificación global: 81 %"),
      focus: list(
        [
          "Artificial Intelligence",
          "Machine Learning",
          "Deep Learning",
          "Computer Vision",
          "NLP",
          "Data Analysis",
          "Software Development",
        ],
        [
          "الذكاء الاصطناعي",
          "التعلّم الآلي",
          "التعلّم العميق",
          "الرؤية الحاسوبية",
          "معالجة اللغة الطبيعية",
          "تحليل البيانات",
          "تطوير البرمجيات",
        ],
        [
          "Inteligencia Artificial",
          "Aprendizaje automático",
          "Aprendizaje profundo",
          "Visión por computadora",
          "NLP",
          "Análisis de datos",
          "Desarrollo de software",
        ],
      ),
    },
    certifications: [
      {
        provider: "Cisco",
        items: [
          "Python Essentials 1",
          "Python Essentials 2",
          "Endpoint Security",
          "Data Science Essentials with Python",
        ],
      },
      {
        provider: "Udemy",
        items: [
          "Complete Computer Vision Bootcamp With PyTorch & TensorFlow",
          "100 Days of Code: The Complete Python Pro Bootcamp",
          "Android App Development Bootcamp: Beginner to Pro",
          "Speech Recognition with Python",
          "Face Recognition and Detection in Android 16 – 2025 Guide",
        ],
      },
    ],
    languages: [
      { language: text("Arabic", "العربية", "Árabe"), level: text("Native", "لغة أم", "Nativo") },
      {
        language: text("English", "الإنجليزية", "Inglés"),
        level: text(
          "Very good / professional working proficiency",
          "جيد جدًا / كفاءة مهنية في العمل",
          "Muy bueno / competencia profesional de trabajo",
        ),
      },
      {
        language: text("Spanish", "الإسبانية", "Español"),
        level: text(
          "Limited working proficiency",
          "كفاءة محدودة في العمل",
          "Competencia laboral limitada",
        ),
      },
    ],
    achievements: list(
      [
        "Founded NextAura AI and leads product planning and implementation.",
        "Graduated in Artificial Intelligence with an overall grade of 81%.",
        "Built the backend and AI capabilities for FitCoach AI.",
        "Completed AI training with Jordan’s Ministry of Digital Economy and Entrepreneurship.",
        "Delivered practical AI, computer-vision, chatbot, and backend projects alongside Cisco and Udemy certifications.",
      ],
      [
        "أسس NextAura AI ويقود تخطيط المنتجات وتنفيذها.",
        "تخرّج في الذكاء الاصطناعي بمعدل 81٪.",
        "بنى قدرات الباكند والذكاء الاصطناعي لمنصة FitCoach AI.",
        "أكمل تدريب الذكاء الاصطناعي مع وزارة الاقتصاد الرقمي والريادة في الأردن.",
        "قدّم مشاريع عملية في الذكاء الاصطناعي والرؤية الحاسوبية وروبوتات الدردشة والباكند إلى جانب شهادات Cisco وUdemy.",
      ],
      [
        "Fundó NextAura AI y lidera la planificación e implementación de productos.",
        "Se graduó en Inteligencia Artificial con una calificación global de 81 %.",
        "Construyó las capacidades backend y de IA de FitCoach AI.",
        "Completó formación en IA con el Ministerio de Economía Digital y Emprendimiento de Jordania.",
        "Entregó proyectos prácticos de IA, visión por computadora, chatbots y backend junto con certificaciones de Cisco y Udemy.",
      ],
    ),
    links: {
      linkedin: "https://www.linkedin.com/in/mohannadabuayyash/",
      github: "https://github.com/mohannad-121",
      email: "mailto:info@next-aura-ai.com",
    },
  },
  moayad: {
    id: "moayad",
    displayName: "Muayid Rabah",
    fullName: "Muayid Abduljawad Awadallah Rabah",
    image: "/team/moayad.jpg",
    imagePosition: "50% 28%",
    headline: text(
      "Founder & AI Engineer · LLMs, RAG, MCP Agents & Computer Vision · Python/FastAPI Developer",
      "مؤسس ومهندس ذكاء اصطناعي · نماذج اللغة وRAG ووكلاء MCP والرؤية الحاسوبية · مطوّر Python/FastAPI",
      "Fundador e ingeniero de IA · LLM, RAG, agentes MCP y visión por computadora · Desarrollador Python/FastAPI",
    ),
    location: text("Amman, Jordan", "عمّان، الأردن", "Amán, Jordania"),
    summary: text(
      "AI engineer and recent AI graduate who builds practical products end to end across RAG, LLMs, computer vision, machine-learning APIs, Android, and full-stack AI. His work includes FitCoach AI, deployed ML APIs, computer vision, and training in Claude APIs, MCP, Amazon Bedrock, Google Cloud Vertex AI, and agent workflows.",
      "مهندس ذكاء اصطناعي وخريج حديث في المجال، يبني منتجات عملية من البداية إلى النهاية عبر RAG ونماذج اللغة والرؤية الحاسوبية وواجهات التعلّم الآلي وأندرويد والذكاء الاصطناعي المتكامل. تشمل أعماله FitCoach AI وواجهات ML المنشورة والرؤية الحاسوبية وتدريبًا في Claude API وMCP وAmazon Bedrock وGoogle Cloud Vertex AI ومسارات عمل الوكلاء.",
      "Ingeniero de IA y recién graduado en IA que construye productos prácticos de extremo a extremo con RAG, LLM, visión por computadora, APIs de aprendizaje automático, Android e IA full-stack. Su trabajo incluye FitCoach AI, APIs de ML desplegadas, visión por computadora y formación en Claude API, MCP, Amazon Bedrock, Google Cloud Vertex AI y flujos de agentes.",
    ),
    currentRole: {
      title: text(
        "Founder & AI Engineer · NextAura AI",
        "المؤسس ومهندس الذكاء الاصطناعي · NextAura AI",
        "Fundador e ingeniero de IA · NextAura AI",
      ),
      period: text("July 2026 – Present", "يوليو 2026 – حتى الآن", "Julio de 2026 – Actualidad"),
      arrangement: text(
        "Amman · On-site / Hybrid",
        "عمّان · في الموقع / هجين",
        "Amán · Presencial / Híbrido",
      ),
      summary: text(
        "Muayid designs and implements intelligent product capabilities, including RAG systems, LLM integrations, AI agents, computer vision, ML APIs, and production-ready AI workflows.",
        "يصمّم مؤيد وينفّذ قدرات المنتجات الذكية، بما فيها أنظمة RAG وتكاملات نماذج اللغة ووكلاء الذكاء الاصطناعي والرؤية الحاسوبية وواجهات ML ومسارات العمل الجاهزة للإنتاج.",
        "Muayid diseña e implementa capacidades de producto inteligente, incluidos sistemas RAG, integraciones LLM, agentes de IA, visión por computadora, APIs de ML y flujos de IA listos para producción.",
      ),
      responsibilities: list(
        [
          "Builds chatbots, RAG pipelines, and LLM-powered digital products.",
          "Develops machine-learning services, computer-vision capabilities, Python/FastAPI backends, and full-stack AI products.",
          "Supports AI consultation, automation, website MVPs, and product architecture.",
          "Researches MCP, subagents, Amazon Bedrock, Google Cloud Vertex AI, and agent workflows.",
        ],
        [
          "يبني روبوتات الدردشة ومسارات RAG والمنتجات الرقمية المدعومة بنماذج اللغة.",
          "يطوّر خدمات التعلّم الآلي وقدرات الرؤية الحاسوبية وباكند Python/FastAPI ومنتجات ذكاء اصطناعي متكاملة.",
          "يدعم استشارات الذكاء الاصطناعي والأتمتة وMVP للمواقع وهندسة المنتجات.",
          "يبحث في MCP والوكلاء الفرعيين وAmazon Bedrock وGoogle Cloud Vertex AI ومسارات عمل الوكلاء.",
        ],
        [
          "Construye chatbots, pipelines RAG y productos digitales impulsados por LLM.",
          "Desarrolla servicios de aprendizaje automático, capacidades de visión por computadora, backends Python/FastAPI y productos de IA full-stack.",
          "Apoya consultoría de IA, automatización, MVP de sitios web y arquitectura de producto.",
          "Investiga MCP, subagentes, Amazon Bedrock, Google Cloud Vertex AI y flujos de agentes.",
        ],
      ),
    },
    capabilities: [
      "LLM Integration",
      "RAG Systems",
      "MCP & AI Agents",
      "Computer Vision",
      "Machine Learning",
      "FastAPI & ML APIs",
      "AI Chatbots",
      "Prompt Engineering",
      "Python",
      "Full-stack AI",
      "Android Development",
      "AWS AI Services",
      "Amazon Bedrock",
      "Google Cloud Vertex AI",
      "Claude API",
      "Data Analysis",
      "Feature Engineering",
      "Model Evaluation",
    ],
    projects: [
      {
        name: "FitCoach AI — Intelligent Virtual Personal Trainer",
        description: text(
          "A bilingual AI fitness coach using RAG, LLMs, machine learning, fitness data, health conditions, meal analysis, workout guidance, and follow-up.",
          "مدرّب لياقة افتراضي ثنائي اللغة مدعوم بالذكاء الاصطناعي، يستخدم RAG ونماذج اللغة والتعلّم الآلي وبيانات اللياقة والحالات الصحية وتحليل الوجبات وإرشاد التمارين والمتابعة.",
          "Entrenador de fitness virtual bilingüe con IA que usa RAG, LLM, aprendizaje automático, datos de fitness, condiciones de salud, análisis de comidas, guía de ejercicios y seguimiento.",
        ),
        technologies: [
          "React",
          "FastAPI",
          "RAG",
          "FAISS",
          "LLM",
          "SentenceTransformers",
          "scikit-learn",
          "Python",
          "Supabase",
          "PostgreSQL",
          "Computer Vision",
          "Fitbit",
        ],
        contributions: list(
          [
            "Implemented FAISS and SentenceTransformers RAG, LLM integration, backend APIs, preprocessing, validation, and safety handling.",
            "Contributed product architecture, health recommendation logic, progress tracking, admin follow-up, and bilingual Arabic/English support.",
            "Built meal-photo and medical-report analysis, workout browsing and scheduling.",
          ],
          [
            "نفّذ RAG باستخدام FAISS وSentenceTransformers وتكامل نماذج اللغة وواجهات الباكند والمعالجة المسبقة والتحقق ومعالجة السلامة.",
            "ساهم في هندسة المنتج ومنطق التوصيات الصحية وتتبع التقدم ومتابعة المسؤول والدعم الثنائي بالعربية والإنجليزية.",
            "بنى تحليل صور الوجبات والتقارير الطبية وتصفح التمارين وجدولتها.",
          ],
          [
            "Implementó RAG con FAISS y SentenceTransformers, integración LLM, APIs backend, preprocesamiento, validación y manejo de seguridad.",
            "Contribuyó a la arquitectura de producto, la lógica de recomendaciones de salud, el seguimiento del progreso, el seguimiento administrativo y el soporte bilingüe árabe/inglés.",
            "Construyó análisis de fotos de comidas e informes médicos, exploración y programación de entrenamientos.",
          ],
        ),
        repository: "https://github.com/moayadabdo22-boop/FitCoach-AI",
      },
      {
        name: "Family Vault — Android Password & Notes Manager",
        description: text(
          "An offline Android app for household passwords, PINs, and private notes.",
          "تطبيق أندرويد يعمل دون اتصال لإدارة كلمات مرور المنزل ورموز PIN والملاحظات الخاصة.",
          "Aplicación Android sin conexión para contraseñas del hogar, PIN y notas privadas.",
        ),
        technologies: [
          "Kotlin",
          "Android",
          "Fragments",
          "ViewPager2",
          "Navigation Component",
          "RecyclerView",
          "Material Design",
        ],
        contributions: list(
          [
            "Built Fragment navigation with Safe Args, a two-tab ViewPager2 experience, RecyclerView CRUD, and tap-to-reveal behavior.",
            "Tested with three family members, with average usability above 4/5.",
          ],
          [
            "بنى تنقل Fragments باستخدام Safe Args وتجربة ViewPager2 بعلامتي تبويب وعمليات CRUD عبر RecyclerView وسلوك الإظهار بالضغط.",
            "اختبر التطبيق مع ثلاثة من أفراد العائلة بمتوسط قابلية استخدام يتجاوز 4/5.",
          ],
          [
            "Construyó navegación con Fragments y Safe Args, una experiencia ViewPager2 de dos pestañas, CRUD con RecyclerView y revelado al tocar.",
            "Probó la app con tres familiares, con una usabilidad media superior a 4/5.",
          ],
        ),
        repository: "https://github.com/moayadabdo22-boop/family-vault-android",
      },
      {
        name: "Cat vs Dog Classification — Hybrid Deep Learning",
        description: text(
          "A computer-vision classifier trained on more than 10,000 images, combining deep learning with image-processing techniques.",
          "مصنّف للرؤية الحاسوبية دُرّب على أكثر من 10,000 صورة، ويجمع التعلّم العميق مع تقنيات معالجة الصور.",
          "Clasificador de visión por computadora entrenado con más de 10.000 imágenes que combina aprendizaje profundo y técnicas de procesamiento de imágenes.",
        ),
        technologies: ["PyTorch", "EfficientNetB0", "OpenCV", "Python"],
        contributions: list(
          [
            "Fine-tuned EfficientNetB0 and used Harris corner detection, ORB, Haar cascades, template matching, histogram equalization, and Canny processing.",
            "Built real-time annotated inference and image preprocessing.",
          ],
          [
            "حسّن EfficientNetB0 واستخدم كشف زوايا Harris وORB وشلالات Haar ومطابقة القوالب وتسوية المدرج التكراري ومعالجة Canny.",
            "بنى الاستدلال الفوري المعلّم والمعالجة المسبقة للصور.",
          ],
          [
            "Ajustó EfficientNetB0 y usó detección de esquinas Harris, ORB, cascadas Haar, coincidencia de plantillas, ecualización de histograma y procesamiento Canny.",
            "Construyó inferencia anotada en tiempo real y preprocesamiento de imágenes.",
          ],
        ),
        outcomes: [
          "93.5% accuracy",
          "0.9354 macro F1",
          "2.3 percentage-point preprocessing improvement",
        ],
        repository: "https://github.com/moayadabdo22-boop/cat-dog-classification",
      },
      {
        name: "House Price Prediction API",
        description: text(
          "A FastAPI machine-learning API built during the Ministry training using California socioeconomic data, from cleaning and feature engineering through evaluation, packaging, and a live endpoint.",
          "واجهة API للتعلّم الآلي باستخدام FastAPI، بُنيت خلال تدريب الوزارة بالاعتماد على بيانات اجتماعية واقتصادية من كاليفورنيا، من التنظيف وهندسة الخصائص إلى التقييم والتغليف ونقطة نهاية مباشرة.",
          "API de aprendizaje automático con FastAPI, creada durante la formación del Ministerio con datos socioeconómicos de California, desde limpieza e ingeniería de características hasta evaluación, empaquetado y endpoint en vivo.",
        ),
        technologies: ["FastAPI", "scikit-learn", "Python"],
        contributions: list(
          [
            "Prepared data, engineered features, evaluated the model, packaged it, and deployed a live prediction endpoint.",
          ],
          ["أعد البيانات وهندس الخصائص وقيّم النموذج وغلّفه ونشر نقطة نهاية مباشرة للتنبؤ."],
          [
            "Preparó datos, diseñó características, evaluó el modelo, lo empaquetó y desplegó un endpoint de predicción en vivo.",
          ],
        ),
        repository: "https://github.com/moayadabdo22-boop/ML_Deployment",
      },
      {
        name: "Student Academic Performance Analysis",
        description: text(
          "An analysis of 1,044 UCI student records comparing Random Forest, SVM, Naive Bayes, Logistic Regression, and kNN to identify factors associated with academic performance.",
          "تحليل لـ 1,044 سجلًا طلابيًا من UCI يقارن Random Forest وSVM وNaive Bayes وLogistic Regression وkNN لتحديد العوامل المرتبطة بالأداء الأكاديمي.",
          "Análisis de 1.044 registros de estudiantes de UCI que compara Random Forest, SVM, Naive Bayes, Regresión Logística y kNN para identificar factores asociados al desempeño académico.",
        ),
        technologies: ["Python", "Orange", "Random Forest", "scikit-learn"],
        contributions: list(
          ["Compared models and identified absences, failures, and age as relevant factors."],
          ["قارن النماذج وحدد الغياب والإخفاقات والعمر كعوامل ذات صلة."],
          ["Comparó modelos e identificó ausencias, suspensos y edad como factores relevantes."],
        ),
        outcomes: ["Random Forest: 79.5% accuracy", "AUC: 0.806"],
      },
    ],
    experience: [
      {
        title: text("AI Trainee", "متدرّب ذكاء اصطناعي", "Practicante de IA"),
        organization: "Ministry of Digital Economy and Entrepreneurship, Jordan",
        period: text(
          "September 2025 – November 2025",
          "سبتمبر 2025 – نوفمبر 2025",
          "Septiembre de 2025 – Noviembre de 2025",
        ),
        location: text("Amman, Jordan", "عمّان، الأردن", "Amán, Jordania"),
        arrangement: text("Hybrid · Internship", "هجين · تدريب", "Híbrido · Prácticas"),
        description: text(
          "Applied AI training focused on a live house-price FastAPI endpoint and collaborative development practices.",
          "تدريب تطبيقي في الذكاء الاصطناعي ركّز على نقطة نهاية FastAPI مباشرة لتوقع أسعار المنازل وممارسات التطوير التعاونية.",
          "Formación aplicada en IA centrada en un endpoint FastAPI en vivo de predicción de precios de viviendas y prácticas de desarrollo colaborativo.",
        ),
        highlights: list(
          [
            "Used raw socioeconomic data for cleaning, feature engineering, model evaluation, packaging, and deployment.",
            "Practiced prompt and LLM concepts alongside Git branches, pull requests, and team collaboration.",
          ],
          [
            "استخدم بيانات اجتماعية واقتصادية خام للتنظيف وهندسة الخصائص وتقييم النموذج والتغليف والنشر.",
            "تدرّب على مفاهيم الموجّهات ونماذج اللغة إلى جانب فروع Git وطلبات السحب والتعاون ضمن فريق.",
          ],
          [
            "Usó datos socioeconómicos sin procesar para limpieza, ingeniería de características, evaluación del modelo, empaquetado y despliegue.",
            "Practicó conceptos de prompts y LLM junto con ramas Git, pull requests y colaboración en equipo.",
          ],
        ),
      },
    ],
    skills: [
      {
        title: text("Languages", "اللغات", "Lenguajes"),
        values: ["Python", "JavaScript", "TypeScript", "Kotlin", "Java", "SQL"],
      },
      {
        title: text(
          "AI Agents & LLMs",
          "وكلاء الذكاء الاصطناعي ونماذج اللغة",
          "Agentes de IA y LLM",
        ),
        values: [
          "LLMs",
          "RAG",
          "FAISS",
          "SentenceTransformers",
          "MCP",
          "Subagents",
          "Prompt Engineering",
          "Claude API",
          "Amazon Bedrock",
          "Google Cloud Vertex AI",
        ],
      },
      {
        title: text(
          "Machine Learning & Computer Vision",
          "التعلّم الآلي والرؤية الحاسوبية",
          "Aprendizaje automático y visión por computadora",
        ),
        values: [
          "PyTorch",
          "scikit-learn",
          "EfficientNet",
          "OpenCV",
          "Feature Engineering",
          "Cross-validation",
          "AUC",
          "F1",
          "Image Preprocessing",
          "Deep Learning",
          "Computer Vision",
        ],
      },
      {
        title: text("Web & APIs", "الويب وواجهات API", "Web y APIs"),
        values: ["FastAPI", "React", "TypeScript", "REST", "HTML", "CSS"],
      },
      {
        title: text("Mobile", "الموبايل", "Móvil"),
        values: [
          "Android",
          "Kotlin",
          "Fragments",
          "ViewPager",
          "Navigation",
          "RecyclerView",
          "Material Design",
        ],
      },
      {
        title: text("Cloud & Tools", "السحابة والأدوات", "Nube y herramientas"),
        values: [
          "AWS",
          "Git",
          "GitHub",
          "Android Studio",
          "VS Code",
          "Jupyter",
          "Postman",
          "Orange",
        ],
      },
      {
        title: text("Data", "البيانات", "Datos"),
        values: ["pandas", "NumPy", "Matplotlib", "Feature Engineering", "Cross-validation"],
      },
    ],
    education: {
      degree: text(
        "Bachelor of Information Technology — Artificial Intelligence",
        "بكالوريوس تكنولوجيا المعلومات — الذكاء الاصطناعي",
        "Licenciatura en Tecnología de la Información — Inteligencia Artificial",
      ),
      institution: "Zarqa University, Jordan",
      period: text(
        "February 2022 – June 2026",
        "فبراير 2022 – يونيو 2026",
        "Febrero de 2022 – Junio de 2026",
      ),
      result: text("Very Good", "جيد جدًا", "Muy bueno"),
      focus: list(
        [
          "Machine Learning",
          "Applied Deep Learning",
          "Computer Vision",
          "NLP",
          "Information Retrieval",
          "Image Processing",
          "Data Mining",
          "Android",
          "IoT",
          "FitCoach AI graduation project supervised by Dr. Ahmad Aburomman",
          "AI and programming clubs, workshops, coding competitions, hackathons, IoT and robotics activities",
        ],
        [
          "التعلّم الآلي",
          "التعلّم العميق التطبيقي",
          "الرؤية الحاسوبية",
          "معالجة اللغة الطبيعية",
          "استرجاع المعلومات",
          "معالجة الصور",
          "تنقيب البيانات",
          "أندرويد",
          "إنترنت الأشياء",
          "مشروع التخرج FitCoach AI بإشراف د. أحمد أبو رمان",
          "أندية الذكاء الاصطناعي والبرمجة وورش العمل ومسابقات البرمجة والهاكاثونات وأنشطة إنترنت الأشياء والروبوتات",
        ],
        [
          "Aprendizaje automático",
          "Aprendizaje profundo aplicado",
          "Visión por computadora",
          "NLP",
          "Recuperación de información",
          "Procesamiento de imágenes",
          "Minería de datos",
          "Android",
          "IoT",
          "Proyecto de graduación FitCoach AI supervisado por el Dr. Ahmad Aburomman",
          "Clubes de IA y programación, talleres, concursos de código, hackathons y actividades de IoT y robótica",
        ],
      ),
    },
    certifications: [
      {
        provider: "Anthropic",
        items: [
          "Building with the Claude API",
          "Claude Code 101",
          "Introduction to Model Context Protocol",
          "MCP: Advanced Topics",
          "Introduction to Subagents",
          "Claude on Amazon Bedrock",
          "Claude on Google Cloud Vertex AI",
          "Claude 101",
          "AI Fluency Framework Foundations",
          "AI Capabilities and Limitations",
          "AI Fluency for Builders — Anthropic & CodePath",
        ],
      },
      {
        provider: "Cisco",
        items: [
          "Python Essentials 1",
          "Python Essentials 2",
          "Data Science Essentials with Python",
        ],
      },
      { provider: "AWS", items: ["AWS AI Practitioner Challenge"] },
      {
        provider: "Udemy",
        items: [
          "Complete Computer Vision Bootcamp With PyTorch & TensorFlow",
          "100 Days of Code: The Complete Python Pro Bootcamp",
          "Complete Android Development Bootcamp",
        ],
      },
    ],
    languages: [
      { language: text("Arabic", "العربية", "Árabe"), level: text("Native", "لغة أم", "Nativo") },
      {
        language: text("English", "الإنجليزية", "Inglés"),
        level: text(
          "Full professional proficiency",
          "كفاءة مهنية كاملة",
          "Competencia profesional completa",
        ),
      },
    ],
    volunteering: [
      {
        organization: "Al-Zamalah — Independent Election Commission & USAID Jordan",
        period: text("2024–2025", "2024–2025", "2024–2025"),
        description: text(
          "Completed 15 hours of structured training in dialogue, facilitation, critical thinking, and democratic participation.",
          "أكمل 15 ساعة من التدريب المنظم في الحوار والتيسير والتفكير النقدي والمشاركة الديمقراطية.",
          "Completó 15 horas de formación estructurada en diálogo, facilitación, pensamiento crítico y participación democrática.",
        ),
      },
      {
        organization: "Ana Osharek",
        period: text("2024–2025", "2024–2025", "2024–2025"),
        description: text(
          "Completed 15 hours focused on political participation, dialogue, and civic skills.",
          "أكمل 15 ساعة ركزت على المشاركة السياسية والحوار والمهارات المدنية.",
          "Completó 15 horas centradas en participación política, diálogo y habilidades cívicas.",
        ),
      },
    ],
    achievements: list(
      [
        "Co-founded NextAura AI and builds its intelligent product capabilities.",
        "Built FitCoach AI over one academic year.",
        "Delivered a FastAPI house-price prediction endpoint during Ministry training.",
        "Achieved 93.5% accuracy and 0.9354 macro F1 on the Cat vs Dog classifier.",
        "Completed Anthropic AI training, created an Android manager, and graduated with a Very Good result.",
        "Completed civic and leadership training through Al-Zamalah and Ana Osharek.",
      ],
      [
        "شارك في تأسيس NextAura AI ويبني قدراتها في المنتجات الذكية.",
        "بنى FitCoach AI خلال عام أكاديمي واحد.",
        "قدّم نقطة نهاية FastAPI لتوقع أسعار المنازل خلال تدريب الوزارة.",
        "حقق دقة 93.5٪ وMacro F1 بمقدار 0.9354 في مصنف القطط والكلاب.",
        "أكمل تدريبات Anthropic في الذكاء الاصطناعي وأنشأ تطبيق مدير على أندرويد وتخرّج بتقدير جيد جدًا.",
        "أكمل تدريبًا مدنيًا وقياديًا عبر الزمالة وأنا أشارك.",
      ],
      [
        "Cofundó NextAura AI y construye sus capacidades de producto inteligente.",
        "Construyó FitCoach AI durante un año académico.",
        "Entregó un endpoint FastAPI de predicción de precios de viviendas durante la formación del Ministerio.",
        "Logró 93,5 % de precisión y 0,9354 de macro F1 en el clasificador de gatos y perros.",
        "Completó formación de IA de Anthropic, creó un gestor Android y se graduó con resultado Muy Bueno.",
        "Completó formación cívica y de liderazgo mediante Al-Zamalah y Ana Osharek.",
      ],
    ),
    links: {
      linkedin: "https://www.linkedin.com/in/moayad-rabah/",
      github: "https://github.com/moayadabdo22-boop",
      email: "mailto:info@next-aura-ai.com",
    },
  },
};

export const founderUi = {
  en: {
    profile: "Founder profile",
    location: "Location",
    currentRole: "Current role",
    responsibilities: "Responsibilities",
    capabilities: "Core capabilities",
    projects: "Selected projects",
    contributions: "Key contributions",
    outcomes: "Results",
    experience: "Experience",
    skills: "Technical toolkit",
    education: "Education",
    certifications: "Certifications & training",
    languages: "Languages",
    volunteering: "Volunteering",
    achievements: "Highlights",
    viewRepository: "View repository",
    connect: "Connect",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    startProject: "Start a project",
    backToFounders: "Back to founders",
  },
  ar: {
    profile: "ملف المؤسس",
    location: "الموقع",
    currentRole: "الدور الحالي",
    responsibilities: "المسؤوليات",
    capabilities: "القدرات الأساسية",
    projects: "مشاريع مختارة",
    contributions: "المساهمات الرئيسية",
    outcomes: "النتائج",
    experience: "الخبرة",
    skills: "الأدوات التقنية",
    education: "التعليم",
    certifications: "الشهادات والتدريب",
    languages: "اللغات",
    volunteering: "التطوع",
    achievements: "أبرز المحطات",
    viewRepository: "عرض المستودع",
    connect: "تواصل",
    linkedin: "لينكدإن",
    github: "غيت هب",
    email: "البريد الإلكتروني",
    startProject: "ابدأ مشروعًا",
    backToFounders: "العودة إلى المؤسسين",
  },
  es: {
    profile: "Perfil del fundador",
    location: "Ubicación",
    currentRole: "Rol actual",
    responsibilities: "Responsabilidades",
    capabilities: "Capacidades principales",
    projects: "Proyectos seleccionados",
    contributions: "Contribuciones clave",
    outcomes: "Resultados",
    experience: "Experiencia",
    skills: "Herramientas técnicas",
    education: "Educación",
    certifications: "Certificaciones y formación",
    languages: "Idiomas",
    volunteering: "Voluntariado",
    achievements: "Aspectos destacados",
    viewRepository: "Ver repositorio",
    connect: "Conectar",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Correo",
    startProject: "Iniciar un proyecto",
    backToFounders: "Volver a fundadores",
  },
} satisfies Record<Language, Record<string, string>>;
