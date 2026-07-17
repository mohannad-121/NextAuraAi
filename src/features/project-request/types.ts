import type { Language } from "@/i18n/translations";

export type PackageId = "basic" | "business" | "complete";
export type ProjectTypeId =
  "businessWebsite" | "ecommerce" | "booking" | "webApplication" | "aiSolution" | "other";
export type TimelineOption = "oneWeek" | "twoWeeks" | "threeFourWeeks" | "flexible" | "custom";
export type ContactMethod = "whatsapp" | "phone" | "email";
export type CurrencyCode = "JOD" | "USD" | "EUR" | "GBP" | "ILS" | "AED" | "SAR" | "QAR" | "OMR";
export type FeatureComplexity = "low" | "medium" | "high" | "veryHigh";
export type FeatureCategory = "essentials" | "business" | "commerce" | "intelligence";

export type FeatureId =
  | "responsiveDesign"
  | "corePages"
  | "contactForm"
  | "whatsappSocial"
  | "basicSeo"
  | "maps"
  | "basicAnimations"
  | "deployment"
  | "cms"
  | "adminDashboard"
  | "productManagement"
  | "booking"
  | "database"
  | "multilingual"
  | "authentication"
  | "roles"
  | "analytics"
  | "payments"
  | "customerDashboard"
  | "ecommerce"
  | "realtime"
  | "apiIntegrations"
  | "crm"
  | "automation"
  | "aiChatbot"
  | "aiAssistant"
  | "rag"
  | "customReporting"
  | "customWorkflows"
  | "scalableBackend";

export type LocalizedText = Record<Language, string>;

export type PackagePricing = {
  normal: { min: number; max: number };
  rush: { min: number; max: number };
};

export type ProjectPackage = {
  id: PackageId;
  emoji: string;
  title: LocalizedText;
  description: LocalizedText;
  inheritance?: LocalizedText;
  badge?: LocalizedText;
  pricing: PackagePricing;
  includedFeatureIds: FeatureId[];
  highlightedFeatureIds: FeatureId[];
};

export type ProjectFeature = {
  id: FeatureId;
  emoji: string;
  title: LocalizedText;
  description: LocalizedText;
  category: FeatureCategory;
  complexity: FeatureComplexity;
  weight: number;
  minimumPackage: PackageId;
};

export type ProjectRequestDraft = {
  fullName: string;
  phone: string;
  email: string;
  businessName: string;
  projectType: ProjectTypeId | "";
  projectIdea: string;
  packageId: PackageId | "";
  selectedFeatureIds: FeatureId[];
  customFeature: string;
  languageCount: number;
  timelineOption: TimelineOption | "";
  requestedDate: string;
  contactMethod: ContactMethod | "";
  notes: string;
  currency: CurrencyCode;
};

export type TimelineDetails = {
  option: TimelineOption;
  requestedDate?: string;
  days?: number;
  isRush: boolean;
};

export type EstimateResult = {
  packageId: PackageId;
  isRush: boolean;
  allowedMinJod: number;
  allowedMaxJod: number;
  estimatedMinJod: number;
  estimatedMaxJod: number;
  complexityScore: number;
  complexityPosition: number;
  impactingFeatureIds: FeatureId[];
};

export type ExchangeRateSnapshot = {
  base: "JOD";
  rates: Record<CurrencyCode, number>;
  source: string;
  timestamp: string;
  approximate: boolean;
};

export type ProjectRequest = {
  id: string;
  locale: Language;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    businessName?: string;
  };
  projectType: ProjectTypeId;
  projectIdea: string;
  packageId: PackageId;
  includedFeatureIds: FeatureId[];
  selectedFeatureIds: FeatureId[];
  customFeature?: string;
  languageCount: number;
  timeline: TimelineDetails;
  contactMethod?: ContactMethod;
  notes?: string;
  estimate: EstimateResult & {
    currencyBase: "JOD";
    selectedCurrency: CurrencyCode;
    convertedMin?: number;
    convertedMax?: number;
    exchangeRate?: number;
    exchangeRateTimestamp?: string;
    exchangeRateSource?: string;
    approximateConversion: boolean;
    explanation: string;
  };
  maintenance: {
    freeMonths: 8;
  };
  submittedAt: string;
};
