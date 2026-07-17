import type { Language } from "@/i18n/translations";

type ProjectRequestCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  home: string;
  close: string;
  stepProgress: string;
  steps: string[];
  stepIntros: string[];
  actions: {
    back: string;
    continue: string;
    calculate: string;
    review: string;
    submit: string;
    submitting: string;
    edit: string;
    acceptUpgrade: string;
    keepPackage: string;
    returnToFeatures: string;
    downloadPdf: string;
    openWhatsapp: string;
    contact: string;
    retry: string;
  };
  summary: {
    eyebrow: string;
    title: string;
    emptyPackage: string;
    features: string;
    included: string;
    added: string;
    timeline: string;
    estimate: string;
    pendingEstimate: string;
    sourceJod: string;
  };
  info: {
    fullName: string;
    phone: string;
    email: string;
    optional: string;
    businessName: string;
    fullNamePlaceholder: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    businessPlaceholder: string;
    privacy: string;
  };
  project: {
    chooseType: string;
    idea: string;
    ideaPlaceholder: string;
    ideaHelp: string;
  };
  packages: {
    normal: string;
    rush: string;
    rushRule: string;
    included: string;
    selected: string;
    select: string;
    priceLater: string;
  };
  features: {
    includedTitle: string;
    includedHelp: string;
    optionalTitle: string;
    optionalHelp: string;
    included: string;
    optional: string;
    advanced: string;
    customTitle: string;
    customPlaceholder: string;
    customHelp: string;
    languageCount: string;
    languageCountHelp: string;
    categoryLabels: Record<string, string>;
    recommendationTitle: string;
    recommendationBody: string;
  };
  timeline: {
    choose: string;
    date: string;
    dateHelp: string;
    rushTitle: string;
    rushBody: string;
    normalTitle: string;
    normalBody: string;
    contactMethod: string;
    contactHelp: string;
    contactOptions: Record<string, string>;
  };
  estimate: {
    badge: string;
    calculatingTitle: string;
    calculatingBody: string;
    stages: string[];
    resultLead: string;
    allowedRange: string;
    selectedPackage: string;
    selectedTimeline: string;
    currency: string;
    approximate: string;
    live: string;
    loading: string;
    conversionUnavailable: string;
    rateUpdated: string;
    whyTitle: string;
    factorsTitle: string;
    noAddedFeatures: string;
    localTemplate: string;
  };
  maintenance: {
    title: string;
    body: string;
  };
  disclaimer: string;
  review: {
    title: string;
    intro: string;
    customer: string;
    project: string;
    scope: string;
    timeline: string;
    estimate: string;
    fullName: string;
    phone: string;
    email: string;
    businessName: string;
    projectType: string;
    projectIdea: string;
    package: string;
    includedFeatures: string;
    selectedFeatures: string;
    customFeature: string;
    languages: string;
    requestedTimeline: string;
    deliveryMode: string;
    normal: string;
    rush: string;
    contactMethod: string;
    notes: string;
    originalEstimate: string;
    convertedEstimate: string;
    explanation: string;
    submittedAt: string;
    notProvided: string;
    consent: string;
  };
  success: {
    title: string;
    stored: string;
    whatsappDelivered: string;
    redirecting: string;
    manualTitle: string;
    manualBody: string;
    manualSteps: string[];
    requestId: string;
  };
  errors: {
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    projectIdeaShort: string;
    chooseType: string;
    choosePackage: string;
    chooseTimeline: string;
    invalidDate: string;
    pastDate: string;
    consent: string;
    submission: string;
    submissionFunction: string;
    submissionUnavailable: string;
    submissionValidation: string;
    pdf: string;
  };
};

export const projectRequestCopy = {
  en: {
    eyebrow: "NextAura project builder",
    title: "Build your project brief",
    subtitle:
      "Choose what you need, understand the estimate, and send one clear request to our team.",
    home: "Back to home",
    close: "Exit project builder",
    stepProgress: "Step {current} of {total}",
    steps: [
      "Your info",
      "Project type",
      "Package",
      "Features",
      "Timeline",
      "AI estimate",
      "Review & submit",
    ],
    stepIntros: [
      "Let’s start with the best way to reach you.",
      "Tell us what you want to build and why it matters.",
      "Choose a cumulative package as your starting point.",
      "Confirm what is included and add only what you need.",
      "Choose a realistic delivery window and contact method.",
      "Review a deterministic, AI-assisted estimate before submitting.",
      "Check every detail, then explicitly send your request.",
    ],
    actions: {
      back: "Back",
      continue: "Continue",
      calculate: "Calculate estimate",
      review: "Continue to review",
      submit: "Submit project request",
      submitting: "Preparing secure request…",
      edit: "Edit",
      acceptUpgrade: "Use recommended package",
      keepPackage: "Keep my package",
      returnToFeatures: "Review features",
      downloadPdf: "Download PDF",
      openWhatsapp: "Open WhatsApp",
      contact: "Continue to Contact",
      retry: "Retry",
    },
    summary: {
      eyebrow: "Your request",
      title: "Live summary",
      emptyPackage: "Choose a package to see your project summary.",
      features: "Project scope",
      included: "included",
      added: "added",
      timeline: "Delivery",
      estimate: "Estimated range",
      pendingEstimate: "Calculated after features and timeline",
      sourceJod: "Original JOD pricing remains the source.",
    },
    info: {
      fullName: "Full name",
      phone: "Phone / WhatsApp",
      email: "Email",
      optional: "Optional",
      businessName: "Business or project name",
      fullNamePlaceholder: "e.g. Mohannad Abu Ayyash",
      phonePlaceholder: "+962 7X XXX XXXX",
      emailPlaceholder: "name@company.com",
      businessPlaceholder: "e.g. NextAura AI",
      privacy:
        "Your contact details stay in this form until you explicitly submit the final request.",
    },
    project: {
      chooseType: "What are you planning to build?",
      idea: "Describe the project idea",
      ideaPlaceholder:
        "Explain the problem, who the product is for, and the most important outcome.",
      ideaHelp: "A few clear sentences are enough. You can refine details with our team later.",
    },
    packages: {
      normal: "Normal range",
      rush: "Rush · 7 days or less",
      rushRule:
        "The rush range is used only when the requested delivery is seven calendar days or less.",
      included: "Key inclusions",
      selected: "Selected package",
      select: "Choose package",
      priceLater: "Your focused estimate is calculated after features and timeline are selected.",
    },
    features: {
      includedTitle: "Included with your package",
      includedHelp:
        "These capabilities are already covered. Packages are cumulative, so higher packages inherit earlier capabilities.",
      optionalTitle: "Add optional features",
      optionalHelp:
        "Choose only what the project genuinely needs. Advanced selections may trigger a package recommendation.",
      included: "Included",
      optional: "Optional",
      advanced: "Advanced",
      customTitle: "Describe another feature you need",
      customPlaceholder: "Example: A custom approval flow for three departments…",
      customHelp:
        "Custom requirements affect complexity but never push an estimate outside the selected package’s allowed range.",
      languageCount: "Number of languages",
      languageCountHelp: "Includes the primary language.",
      categoryLabels: {
        essentials: "Website essentials",
        business: "Business management",
        commerce: "Commerce & integrations",
        intelligence: "AI & advanced systems",
      },
      recommendationTitle: "A higher package may fit better",
      recommendationBody:
        "Based on your selected features, {package} may provide a clearer foundation. Your package has not been changed.",
    },
    timeline: {
      choose: "When would you like the project delivered?",
      date: "Preferred delivery date",
      dateHelp: "A date seven calendar days or less from today activates rush pricing.",
      rushTitle: "Rush delivery is active",
      rushBody:
        "A small urgency adjustment is included because the requested timeline is one week or less.",
      normalTitle: "Normal delivery range",
      normalBody: "Your selected timeline uses the normal package range.",
      contactMethod: "Preferred contact method",
      contactHelp: "Choose how you would like our team to follow up after submission.",
      contactOptions: { whatsapp: "WhatsApp", phone: "Phone call", email: "Email" },
    },
    estimate: {
      badge: "AI-assisted estimate",
      calculatingTitle: "Preparing your estimate",
      calculatingBody:
        "The price is calculated locally from controlled package ranges and transparent complexity weights.",
      stages: [
        "Reviewing your selected package",
        "Evaluating feature complexity",
        "Checking integrations",
        "Applying the timeline rule",
        "Preparing your estimate",
      ],
      resultLead:
        "Based on the package, features, integrations, and timeline you selected, your project may cost approximately:",
      allowedRange: "Selected package limit: {range}",
      selectedPackage: "Package",
      selectedTimeline: "Timeline",
      currency: "Display currency",
      approximate: "Approximate conversion",
      live: "Latest daily conversion",
      loading: "Loading conversion rates",
      conversionUnavailable:
        "Currency conversion is temporarily unavailable. The original estimate is shown in JOD.",
      rateUpdated: "Rates by ExchangeRate-API · updated {date}",
      whyTitle: "Why this range?",
      factorsTitle: "Selected features affecting the estimate",
      noAddedFeatures:
        "No optional features were added, so the estimate stays near the lower part of the package range.",
      localTemplate:
        "The explanation is generated locally from your structured selections; no customer details are sent to an external AI provider.",
    },
    maintenance: {
      title: "Eight months of maintenance are included free of charge.",
      body: "Free maintenance covers fixes and support related to the agreed project scope. Major new features are quoted separately.",
    },
    disclaimer:
      "This is an initial estimated range, not a final quotation. The final price will be confirmed after reviewing the complete requirements.",
    review: {
      title: "Review your project request",
      intro:
        "Nothing is sent until you press Submit. Use Edit to return to any previous section without losing data.",
      customer: "Customer details",
      project: "Project direction",
      scope: "Package & features",
      timeline: "Timeline & contact",
      estimate: "AI-assisted estimate",
      fullName: "Full name",
      phone: "Phone / WhatsApp",
      email: "Email",
      businessName: "Business / project",
      projectType: "Project type",
      projectIdea: "Project idea",
      package: "Package",
      includedFeatures: "Included features",
      selectedFeatures: "Added features",
      customFeature: "Custom requirement",
      languages: "Languages",
      requestedTimeline: "Requested timeline",
      deliveryMode: "Pricing mode",
      normal: "Normal",
      rush: "Rush",
      contactMethod: "Contact method",
      notes: "Additional notes",
      originalEstimate: "Original JOD estimate",
      convertedEstimate: "Display estimate",
      explanation: "Estimate explanation",
      submittedAt: "Submission date",
      notProvided: "Not provided",
      consent:
        "I confirm these details are correct and agree to send this request to the NextAura AI team.",
    },
    success: {
      title: "Your project brief is ready",
      stored: "Your structured project request was saved securely.",
      whatsappDelivered:
        "A PDF copy was delivered to the configured NextAura WhatsApp Business account.",
      redirecting: "Taking you to Contact…",
      manualTitle: "One manual step is needed",
      manualBody:
        "Secure automatic WhatsApp document delivery is not configured. Your PDF is ready; download it, open WhatsApp, and attach the file manually.",
      manualSteps: [
        "Download the project-request PDF.",
        "Open the prefilled WhatsApp conversation.",
        "Attach the downloaded PDF before sending.",
      ],
      requestId: "Request ID",
    },
    errors: {
      required: "This field is required.",
      invalidEmail: "Enter a valid email address.",
      invalidPhone: "Enter a valid phone or WhatsApp number.",
      projectIdeaShort: "Please add at least 20 characters so we can understand the idea.",
      chooseType: "Choose a project type.",
      choosePackage: "Choose a package to continue.",
      chooseTimeline: "Choose a delivery timeline.",
      invalidDate: "Choose a valid delivery date.",
      pastDate: "The delivery date cannot be in the past.",
      consent: "Confirm the details before submitting.",
      submission:
        "We could not save the request. Your details are still here, so please try again.",
      submissionFunction: "The submission function is not configured yet.",
      submissionUnavailable: "The database service is temporarily unavailable.",
      submissionValidation:
        "Your request could not be validated. Please review the required fields.",
      pdf: "We could not generate the PDF. Please try again.",
    },
  },
  ar: {
    eyebrow: "منشئ المشاريع من NextAura",
    title: "أنشئ ملخص مشروعك",
    subtitle: "اختر احتياجاتك، افهم التقدير، وأرسل طلباً واحداً واضحاً إلى فريقنا.",
    home: "العودة للرئيسية",
    close: "الخروج من منشئ المشروع",
    stepProgress: "الخطوة {current} من {total}",
    steps: [
      "معلوماتك",
      "نوع المشروع",
      "الباقة",
      "الميزات",
      "المدة",
      "تقدير ذكي",
      "المراجعة والإرسال",
    ],
    stepIntros: [
      "لنبدأ بأفضل طريقة للتواصل معك.",
      "أخبرنا بما تريد بناءه ولماذا هو مهم.",
      "اختر باقة تراكمية كنقطة بداية.",
      "راجع ما تتضمنه الباقة وأضف ما تحتاجه فقط.",
      "اختر مدة تسليم واقعية وطريقة التواصل المفضلة.",
      "راجع تقديراً مضبوطاً ومدعوماً بالتحليل قبل الإرسال.",
      "تحقق من كل التفاصيل ثم أرسل طلبك بوضوح.",
    ],
    actions: {
      back: "السابق",
      continue: "متابعة",
      calculate: "احسب التقدير",
      review: "الانتقال للمراجعة",
      submit: "إرسال طلب المشروع",
      submitting: "جارٍ تجهيز الطلب الآمن…",
      edit: "تعديل",
      acceptUpgrade: "استخدام الباقة المقترحة",
      keepPackage: "الاحتفاظ بباقتي",
      returnToFeatures: "مراجعة الميزات",
      downloadPdf: "تنزيل PDF",
      openWhatsapp: "فتح واتساب",
      contact: "الانتقال إلى التواصل",
      retry: "إعادة المحاولة",
    },
    summary: {
      eyebrow: "طلبك",
      title: "ملخص مباشر",
      emptyPackage: "اختر باقة لعرض ملخص مشروعك.",
      features: "نطاق المشروع",
      included: "مشمولة",
      added: "مضافة",
      timeline: "التسليم",
      estimate: "النطاق التقديري",
      pendingEstimate: "يُحسب بعد اختيار الميزات والمدة",
      sourceJod: "يبقى التسعير الأصلي بالدينار الأردني هو الأساس.",
    },
    info: {
      fullName: "الاسم الكامل",
      phone: "الهاتف / واتساب",
      email: "البريد الإلكتروني",
      optional: "اختياري",
      businessName: "اسم النشاط أو المشروع",
      fullNamePlaceholder: "مثال: مهند أبو عياش",
      phonePlaceholder: "+962 7X XXX XXXX",
      emailPlaceholder: "name@company.com",
      businessPlaceholder: "مثال: NextAura AI",
      privacy: "تبقى بيانات التواصل داخل هذا النموذج حتى ترسل الطلب النهائي بنفسك.",
    },
    project: {
      chooseType: "ما الذي تخطط لبنائه؟",
      idea: "صف فكرة المشروع",
      ideaPlaceholder: "اشرح المشكلة، ولمن صُمم المنتج، وما النتيجة الأهم التي تريدها.",
      ideaHelp: "تكفي بضع جمل واضحة، ويمكن تحسين التفاصيل لاحقاً مع فريقنا.",
    },
    packages: {
      normal: "النطاق الطبيعي",
      rush: "مستعجل · 7 أيام أو أقل",
      rushRule:
        "يُستخدم نطاق الاستعجال فقط عندما يكون التسليم المطلوب خلال سبعة أيام تقويمية أو أقل.",
      included: "أهم المزايا المشمولة",
      selected: "الباقة المختارة",
      select: "اختيار الباقة",
      priceLater: "يُحسب التقدير المخصص بعد اختيار الميزات ومدة التسليم.",
    },
    features: {
      includedTitle: "مشمول في باقتك",
      includedHelp:
        "هذه الإمكانات مغطاة مسبقاً. الباقات تراكمية، لذلك ترث الباقات الأعلى إمكانات الباقات السابقة.",
      optionalTitle: "أضف ميزات اختيارية",
      optionalHelp:
        "اختر ما يحتاجه المشروع فعلاً. قد تؤدي الاختيارات المتقدمة إلى اقتراح باقة أنسب.",
      included: "مشمولة",
      optional: "اختيارية",
      advanced: "متقدمة",
      customTitle: "صف ميزة أخرى تحتاجها",
      customPlaceholder: "مثال: مسار موافقات مخصص لثلاثة أقسام…",
      customHelp:
        "تؤثر المتطلبات المخصصة في التعقيد، لكنها لا ترفع التقدير خارج نطاق الباقة المختارة.",
      languageCount: "عدد اللغات",
      languageCountHelp: "يشمل اللغة الأساسية.",
      categoryLabels: {
        essentials: "أساسيات الموقع",
        business: "إدارة الأعمال",
        commerce: "التجارة والتكاملات",
        intelligence: "الذكاء والأنظمة المتقدمة",
      },
      recommendationTitle: "قد تكون باقة أعلى أنسب",
      recommendationBody:
        "بناءً على الميزات المختارة، قد تمنحك باقة {package} أساساً أوضح. لم نغيّر باقتك تلقائياً.",
    },
    timeline: {
      choose: "متى ترغب باستلام المشروع؟",
      date: "تاريخ التسليم المفضل",
      dateHelp: "اختيار تاريخ خلال سبعة أيام تقويمية أو أقل يفعّل تسعير الاستعجال.",
      rushTitle: "تم تفعيل التسليم المستعجل",
      rushBody: "أُضيف تعديل بسيط للاستعجال لأن المدة المطلوبة أسبوع أو أقل.",
      normalTitle: "نطاق التسليم الطبيعي",
      normalBody: "المدة المختارة تستخدم نطاق الباقة الطبيعي.",
      contactMethod: "طريقة التواصل المفضلة",
      contactHelp: "اختر الطريقة التي تفضل أن يتابع بها فريقنا معك بعد الإرسال.",
      contactOptions: { whatsapp: "واتساب", phone: "مكالمة هاتفية", email: "بريد إلكتروني" },
    },
    estimate: {
      badge: "تقدير مدعوم بالتحليل الذكي",
      calculatingTitle: "جارٍ تجهيز تقديرك",
      calculatingBody: "يُحسب السعر محلياً من نطاقات باقات مضبوطة وأوزان تعقيد واضحة.",
      stages: [
        "مراجعة الباقة المختارة",
        "تقييم تعقيد الميزات",
        "فحص التكاملات",
        "تطبيق قاعدة المدة",
        "تجهيز التقدير",
      ],
      resultLead:
        "بناءً على الباقة والميزات والتكاملات والمدة التي اخترتها، قد تبلغ تكلفة مشروعك تقريباً:",
      allowedRange: "حدود الباقة المختارة: {range}",
      selectedPackage: "الباقة",
      selectedTimeline: "المدة",
      currency: "عملة العرض",
      approximate: "تحويل تقريبي",
      live: "أحدث تحويل يومي",
      loading: "جارٍ تحميل أسعار التحويل",
      conversionUnavailable: "تحويل العملات غير متاح مؤقتاً. نعرض التقدير الأصلي بالدينار الأردني.",
      rateUpdated: "أسعار ExchangeRate-API · آخر تحديث {date}",
      whyTitle: "لماذا هذا النطاق؟",
      factorsTitle: "الميزات المختارة المؤثرة في التقدير",
      noAddedFeatures:
        "لم تُضف ميزات اختيارية، لذلك يبقى التقدير قريباً من الجزء الأدنى لنطاق الباقة.",
      localTemplate:
        "يُنشأ الشرح محلياً من اختياراتك المنظمة، ولا تُرسل بيانات العميل إلى مزود ذكاء اصطناعي خارجي.",
    },
    maintenance: {
      title: "ثمانية أشهر من الصيانة مشمولة مجاناً.",
      body: "تشمل الصيانة المجانية الإصلاحات والدعم المرتبطين بنطاق المشروع المتفق عليه. تُسعّر الميزات الجديدة الكبيرة بشكل منفصل.",
    },
    disclaimer:
      "هذا نطاق تقديري أولي وليس عرض سعر نهائياً. يُؤكد السعر النهائي بعد مراجعة المتطلبات الكاملة.",
    review: {
      title: "راجع طلب مشروعك",
      intro: "لن يُرسل شيء حتى تضغط إرسال. استخدم تعديل للعودة إلى أي قسم دون فقدان بياناتك.",
      customer: "بيانات العميل",
      project: "اتجاه المشروع",
      scope: "الباقة والميزات",
      timeline: "المدة والتواصل",
      estimate: "التقدير المدعوم بالتحليل",
      fullName: "الاسم الكامل",
      phone: "الهاتف / واتساب",
      email: "البريد الإلكتروني",
      businessName: "النشاط / المشروع",
      projectType: "نوع المشروع",
      projectIdea: "فكرة المشروع",
      package: "الباقة",
      includedFeatures: "الميزات المشمولة",
      selectedFeatures: "الميزات المضافة",
      customFeature: "المتطلب المخصص",
      languages: "اللغات",
      requestedTimeline: "المدة المطلوبة",
      deliveryMode: "نمط التسعير",
      normal: "طبيعي",
      rush: "مستعجل",
      contactMethod: "طريقة التواصل",
      notes: "ملاحظات إضافية",
      originalEstimate: "التقدير الأصلي بالدينار",
      convertedEstimate: "التقدير بعملة العرض",
      explanation: "شرح التقدير",
      submittedAt: "تاريخ الإرسال",
      notProvided: "غير مذكور",
      consent: "أؤكد أن هذه التفاصيل صحيحة وأوافق على إرسال الطلب إلى فريق NextAura AI.",
    },
    success: {
      title: "ملخص مشروعك جاهز",
      stored: "تم حفظ طلب مشروعك المنظم بشكل آمن.",
      whatsappDelivered: "تم تسليم نسخة PDF إلى حساب واتساب الأعمال المُعد لفريق NextAura.",
      redirecting: "جارٍ نقلك إلى قسم التواصل…",
      manualTitle: "تبقت خطوة يدوية واحدة",
      manualBody:
        "إرسال مستند واتساب تلقائياً غير مُعد. ملف PDF جاهز؛ نزّله وافتح واتساب وأرفق الملف يدوياً.",
      manualSteps: [
        "نزّل ملف PDF الخاص بطلب المشروع.",
        "افتح محادثة واتساب المجهزة مسبقاً.",
        "أرفق ملف PDF الذي نزلته قبل الإرسال.",
      ],
      requestId: "رقم الطلب",
    },
    errors: {
      required: "هذا الحقل مطلوب.",
      invalidEmail: "أدخل بريداً إلكترونياً صحيحاً.",
      invalidPhone: "أدخل رقم هاتف أو واتساب صحيحاً.",
      projectIdeaShort: "أضف 20 حرفاً على الأقل حتى نفهم الفكرة.",
      chooseType: "اختر نوع المشروع.",
      choosePackage: "اختر باقة للمتابعة.",
      chooseTimeline: "اختر مدة التسليم.",
      invalidDate: "اختر تاريخ تسليم صحيحاً.",
      pastDate: "لا يمكن أن يكون تاريخ التسليم في الماضي.",
      consent: "أكد صحة التفاصيل قبل الإرسال.",
      submission: "تعذر حفظ الطلب. بقيت بياناتك هنا، لذا يُرجى المحاولة مرة أخرى.",
      submissionFunction: "لم يتم إعداد دالة الإرسال بعد.",
      submissionUnavailable: "خدمة قاعدة البيانات غير متاحة مؤقتًا.",
      submissionValidation: "تعذر التحقق من صحة طلبك. يُرجى مراجعة الحقول المطلوبة.",
      pdf: "تعذر إنشاء ملف PDF. حاول مرة أخرى.",
    },
  },
  es: {
    eyebrow: "Constructor de proyectos NextAura",
    title: "Crea el brief de tu proyecto",
    subtitle:
      "Elige lo que necesitas, entiende la estimación y envía una solicitud clara a nuestro equipo.",
    home: "Volver al inicio",
    close: "Salir del constructor",
    stepProgress: "Paso {current} de {total}",
    steps: [
      "Tus datos",
      "Tipo de proyecto",
      "Paquete",
      "Funciones",
      "Plazo",
      "Estimación IA",
      "Revisión y envío",
    ],
    stepIntros: [
      "Empecemos por la mejor forma de contactarte.",
      "Cuéntanos qué quieres construir y por qué importa.",
      "Elige un paquete acumulativo como punto de partida.",
      "Confirma lo incluido y añade solo lo que necesitas.",
      "Elige un plazo realista y el método de contacto.",
      "Revisa una estimación controlada y asistida por IA antes de enviar.",
      "Comprueba cada detalle y envía tu solicitud de forma explícita.",
    ],
    actions: {
      back: "Atrás",
      continue: "Continuar",
      calculate: "Calcular estimación",
      review: "Continuar a revisión",
      submit: "Enviar solicitud",
      submitting: "Preparando solicitud segura…",
      edit: "Editar",
      acceptUpgrade: "Usar paquete recomendado",
      keepPackage: "Mantener mi paquete",
      returnToFeatures: "Revisar funciones",
      downloadPdf: "Descargar PDF",
      openWhatsapp: "Abrir WhatsApp",
      contact: "Continuar a Contacto",
      retry: "Reintentar",
    },
    summary: {
      eyebrow: "Tu solicitud",
      title: "Resumen en vivo",
      emptyPackage: "Elige un paquete para ver el resumen.",
      features: "Alcance del proyecto",
      included: "incluidas",
      added: "añadidas",
      timeline: "Entrega",
      estimate: "Rango estimado",
      pendingEstimate: "Se calcula después de funciones y plazo",
      sourceJod: "El precio original en JOD sigue siendo la base.",
    },
    info: {
      fullName: "Nombre completo",
      phone: "Teléfono / WhatsApp",
      email: "Correo electrónico",
      optional: "Opcional",
      businessName: "Nombre del negocio o proyecto",
      fullNamePlaceholder: "p. ej. Mohannad Abu Ayyash",
      phonePlaceholder: "+962 7X XXX XXXX",
      emailPlaceholder: "nombre@empresa.com",
      businessPlaceholder: "p. ej. NextAura AI",
      privacy:
        "Tus datos de contacto permanecen en este formulario hasta que envíes explícitamente la solicitud final.",
    },
    project: {
      chooseType: "¿Qué quieres construir?",
      idea: "Describe la idea del proyecto",
      ideaPlaceholder:
        "Explica el problema, para quién es el producto y cuál es el resultado más importante.",
      ideaHelp:
        "Unas frases claras son suficientes. Podrás afinar los detalles con nuestro equipo.",
    },
    packages: {
      normal: "Rango normal",
      rush: "Urgente · 7 días o menos",
      rushRule:
        "El rango urgente solo se usa cuando la entrega solicitada es de siete días naturales o menos.",
      included: "Incluye principalmente",
      selected: "Paquete seleccionado",
      select: "Elegir paquete",
      priceLater: "La estimación específica se calcula después de elegir funciones y plazo.",
    },
    features: {
      includedTitle: "Incluido en tu paquete",
      includedHelp:
        "Estas capacidades ya están cubiertas. Los paquetes son acumulativos y los superiores heredan los anteriores.",
      optionalTitle: "Añade funciones opcionales",
      optionalHelp:
        "Elige solo lo que el proyecto necesita. Las funciones avanzadas pueden generar una recomendación de paquete.",
      included: "Incluida",
      optional: "Opcional",
      advanced: "Avanzada",
      customTitle: "Describe otra función que necesites",
      customPlaceholder: "Ejemplo: Un flujo de aprobación para tres departamentos…",
      customHelp:
        "Los requisitos personalizados afectan la complejidad, pero nunca sacan la estimación del rango permitido.",
      languageCount: "Número de idiomas",
      languageCountHelp: "Incluye el idioma principal.",
      categoryLabels: {
        essentials: "Esenciales del sitio",
        business: "Gestión empresarial",
        commerce: "Comercio e integraciones",
        intelligence: "IA y sistemas avanzados",
      },
      recommendationTitle: "Un paquete superior podría encajar mejor",
      recommendationBody:
        "Según las funciones elegidas, {package} puede ofrecer una base más clara. Tu paquete no ha cambiado.",
    },
    timeline: {
      choose: "¿Cuándo te gustaría recibir el proyecto?",
      date: "Fecha de entrega preferida",
      dateHelp: "Una fecha dentro de siete días naturales o menos activa el precio urgente.",
      rushTitle: "Entrega urgente activa",
      rushBody:
        "Se incluye un pequeño ajuste por urgencia porque el plazo solicitado es de una semana o menos.",
      normalTitle: "Rango de entrega normal",
      normalBody: "El plazo seleccionado utiliza el rango normal del paquete.",
      contactMethod: "Método de contacto preferido",
      contactHelp: "Elige cómo quieres que nuestro equipo te contacte después del envío.",
      contactOptions: {
        whatsapp: "WhatsApp",
        phone: "Llamada telefónica",
        email: "Correo electrónico",
      },
    },
    estimate: {
      badge: "Estimación asistida por IA",
      calculatingTitle: "Preparando tu estimación",
      calculatingBody:
        "El precio se calcula localmente con rangos controlados y pesos de complejidad transparentes.",
      stages: [
        "Revisando el paquete",
        "Evaluando la complejidad",
        "Comprobando integraciones",
        "Aplicando la regla del plazo",
        "Preparando la estimación",
      ],
      resultLead:
        "Según el paquete, las funciones, las integraciones y el plazo elegidos, tu proyecto puede costar aproximadamente:",
      allowedRange: "Límite del paquete: {range}",
      selectedPackage: "Paquete",
      selectedTimeline: "Plazo",
      currency: "Moneda mostrada",
      approximate: "Conversión aproximada",
      live: "Última conversión diaria",
      loading: "Cargando tipos de cambio",
      conversionUnavailable:
        "La conversión no está disponible temporalmente. Mostramos la estimación original en JOD.",
      rateUpdated: "Tipos de ExchangeRate-API · actualizado {date}",
      whyTitle: "¿Por qué este rango?",
      factorsTitle: "Funciones seleccionadas que influyen en la estimación",
      noAddedFeatures:
        "No se añadieron funciones opcionales, por lo que la estimación se mantiene cerca de la parte baja del rango.",
      localTemplate:
        "La explicación se genera localmente con tus selecciones; no se envían datos del cliente a una IA externa.",
    },
    maintenance: {
      title: "Ocho meses de mantenimiento están incluidos sin coste.",
      body: "El mantenimiento gratuito cubre correcciones y soporte del alcance acordado. Las nuevas funciones importantes se cotizan aparte.",
    },
    disclaimer:
      "Este es un rango inicial estimado, no una cotización final. El precio final se confirmará después de revisar todos los requisitos.",
    review: {
      title: "Revisa tu solicitud",
      intro: "No se envía nada hasta que pulses Enviar. Usa Editar para volver sin perder datos.",
      customer: "Datos del cliente",
      project: "Dirección del proyecto",
      scope: "Paquete y funciones",
      timeline: "Plazo y contacto",
      estimate: "Estimación asistida por IA",
      fullName: "Nombre completo",
      phone: "Teléfono / WhatsApp",
      email: "Correo electrónico",
      businessName: "Negocio / proyecto",
      projectType: "Tipo de proyecto",
      projectIdea: "Idea del proyecto",
      package: "Paquete",
      includedFeatures: "Funciones incluidas",
      selectedFeatures: "Funciones añadidas",
      customFeature: "Requisito personalizado",
      languages: "Idiomas",
      requestedTimeline: "Plazo solicitado",
      deliveryMode: "Modo de precio",
      normal: "Normal",
      rush: "Urgente",
      contactMethod: "Método de contacto",
      notes: "Notas adicionales",
      originalEstimate: "Estimación original en JOD",
      convertedEstimate: "Estimación mostrada",
      explanation: "Explicación de la estimación",
      submittedAt: "Fecha de envío",
      notProvided: "No indicado",
      consent:
        "Confirmo que los datos son correctos y acepto enviar esta solicitud al equipo de NextAura AI.",
    },
    success: {
      title: "El brief de tu proyecto está listo",
      stored: "Tu solicitud estructurada se guardó de forma segura.",
      whatsappDelivered: "Se entregó una copia PDF a la cuenta de WhatsApp Business configurada.",
      redirecting: "Te llevamos a Contacto…",
      manualTitle: "Falta un paso manual",
      manualBody:
        "La entrega automática de documentos por WhatsApp no está configurada. Descarga el PDF, abre WhatsApp y adjúntalo manualmente.",
      manualSteps: [
        "Descarga el PDF de la solicitud.",
        "Abre la conversación de WhatsApp preparada.",
        "Adjunta el PDF descargado antes de enviar.",
      ],
      requestId: "ID de solicitud",
    },
    errors: {
      required: "Este campo es obligatorio.",
      invalidEmail: "Introduce un correo válido.",
      invalidPhone: "Introduce un teléfono o WhatsApp válido.",
      projectIdeaShort: "Añade al menos 20 caracteres para que entendamos la idea.",
      chooseType: "Elige un tipo de proyecto.",
      choosePackage: "Elige un paquete para continuar.",
      chooseTimeline: "Elige un plazo de entrega.",
      invalidDate: "Elige una fecha de entrega válida.",
      pastDate: "La fecha de entrega no puede estar en el pasado.",
      consent: "Confirma los datos antes de enviar.",
      submission:
        "No pudimos guardar la solicitud. Tus datos siguen aquí, así que vuelve a intentarlo.",
      submissionFunction: "La función de envío aún no está configurada.",
      submissionUnavailable: "El servicio de base de datos no está disponible temporalmente.",
      submissionValidation: "No se pudo validar tu solicitud. Revisa los campos obligatorios.",
      pdf: "No pudimos generar el PDF. Inténtalo de nuevo.",
    },
  },
} satisfies Record<Language, ProjectRequestCopy>;

export function formatProjectCopy(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}
