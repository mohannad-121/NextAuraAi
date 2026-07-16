import {
  FormEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Bot,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Globe,
  LayoutDashboard,
  Lightbulb,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  StickyNote,
  UserRound,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import { LanguageSwitcher, translations, useLanguage } from "@/i18n/translations";
import { ProjectPageTail } from "@/components/landing/ProjectPageTail";

const WHATSAPP_NUMBER = "962799195498";

const packageIcons = [Globe, LayoutDashboard, Bot];
const stepIcons = [UserRound, Lightbulb, WalletCards, FileText];

const emptyForm = {
  fullName: "",
  phone: "",
  email: "",
  businessName: "",
  projectType: "",
  projectIdea: "",
  features: [] as string[],
  selectedPackage: "",
  timeline: "",
  contactMethod: "",
  notes: "",
};

type ProjectForm = typeof emptyForm;
type ProjectTranslation = (typeof translations)["en"];

type ProjectRequestModalProps = {
  open: boolean;
  onClose: () => void;
  presentation?: "modal" | "page";
};

export function ProjectRequestModal({
  open,
  onClose,
  presentation = "modal",
}: ProjectRequestModalProps) {
  const { tr, dir } = useLanguage();
  const isPage = presentation === "page";
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const hasData = useMemo(
    () =>
      Object.entries(form).some(([, value]) =>
        Array.isArray(value) ? value.length > 0 : value.trim().length > 0,
      ),
    [form],
  );

  const setField = (field: keyof ProjectForm, value: string | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const toggleFeature = (feature: string) => {
    setField(
      "features",
      form.features.includes(feature)
        ? form.features.filter((item) => item !== feature)
        : [...form.features, feature],
    );
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.fullName.trim()) nextErrors.fullName = tr.modal.required;
    if (!form.phone.trim()) nextErrors.phone = tr.modal.required;
    if (!form.projectType) nextErrors.projectType = tr.modal.required;
    if (!form.projectIdea.trim()) nextErrors.projectIdea = tr.modal.required;
    if (!form.selectedPackage) nextErrors.selectedPackage = tr.modal.required;
    setErrors(nextErrors);
    if (nextErrors.fullName || nextErrors.phone) setStep(1);
    else if (nextErrors.projectType || nextErrors.projectIdea) setStep(2);
    else if (nextErrors.selectedPackage) setStep(3);
    return Object.keys(nextErrors).length === 0;
  };

  const buildWhatsAppMessage = () =>
    [
      "New project request - NextAura AI",
      `${tr.modal.labels.fullName}: ${form.fullName}`,
      `${tr.modal.labels.phone}: ${form.phone}`,
      `${tr.modal.labels.email}: ${form.email || tr.modal.reviewFallback}`,
      `${tr.modal.labels.businessName}: ${form.businessName || tr.modal.reviewFallback}`,
      `${tr.modal.labels.projectType}: ${form.projectType}`,
      `${tr.modal.labels.projectIdea}: ${form.projectIdea}`,
      `${tr.modal.labels.package}: ${form.selectedPackage}`,
      `${tr.modal.labels.features}: ${form.features.length ? form.features.join(", ") : tr.modal.reviewFallback}`,
      `${tr.modal.labels.timeline}: ${form.timeline || tr.modal.reviewFallback}`,
      `${tr.modal.labels.contactMethod}: ${form.contactMethod || tr.modal.reviewFallback}`,
      `${tr.modal.labels.notes}: ${form.notes || tr.modal.reviewFallback}`,
    ].join("\n");

  const openWhatsApp = () => {
    if (!validate()) return;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`,
      "_blank",
      "noreferrer",
    );
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    console.log("Project request", form);
    setSuccess(true);
    openWhatsApp();
  };

  const requestClose = useCallback(() => {
    if (hasData && !success && !window.confirm(tr.modal.confirmClose)) return;
    onClose();
  }, [hasData, onClose, success, tr.modal.confirmClose]);

  useEffect(() => {
    if (!open || isPage) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
      if (event.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href], input, select, textarea",
        );
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 20);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isPage, open, requestClose]);

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) requestClose();
  };

  const resetAndClose = () => {
    setStep(1);
    setForm(emptyForm);
    setErrors({});
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={isPage ? "project-page" : "project-modal-backdrop"}
          initial={isPage ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={isPage ? undefined : closeFromBackdrop}
        >
          <motion.div
            ref={dialogRef}
            dir={dir}
            role={isPage ? undefined : "dialog"}
            aria-modal={isPage ? undefined : "true"}
            aria-labelledby="project-request-title"
            className={isPage ? "project-page-shell" : "project-modal-shell"}
            initial={isPage ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: isPage ? 1 : 0.98 }}
            transition={{ duration: isPage ? 0.35 : 0.18 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {isPage ? (
              <div className="project-page-topbar">
                <button
                  type="button"
                  onClick={requestClose}
                  className="project-page-identity"
                  aria-label={tr.nav.home}
                >
                  <span className="project-page-mark" aria-hidden="true">
                    <img src="/favicon-48.png" alt="" />
                  </span>
                  <span>NextAura AI</span>
                </button>
                <div className="project-page-topbar-actions">
                  <LanguageSwitcher />
                  <button type="button" onClick={requestClose} className="project-page-back">
                    <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" />
                    <span>{tr.nav.home}</span>
                  </button>
                </div>
              </div>
            ) : null}

            <div className="project-modal-header">
              <div className="project-modal-heading">
                <div className="project-modal-brand">NextAura AI</div>
                <h2 id="project-request-title" className="project-modal-title">
                  {tr.modal.title}
                </h2>
                <p className="project-modal-subtitle">{tr.modal.subtitle}</p>
              </div>
              {isPage ? (
                <div className="project-page-step-count" aria-hidden="true">
                  <span>{String(step).padStart(2, "0")}</span>
                  <span>/ 04</span>
                </div>
              ) : (
                <button
                  ref={closeRef}
                  type="button"
                  onClick={requestClose}
                  aria-label={tr.modal.actions.close}
                  className="project-modal-close"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className={isPage ? "project-page-workspace" : "project-modal-workspace"}>
              <nav className="project-modal-steps" aria-label={tr.modal.title}>
                {tr.modal.steps.map((label: string, index: number) => {
                  const Icon = stepIcons[index];
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setStep(index + 1)}
                      className="project-modal-step"
                      data-active={step === index + 1}
                      data-complete={step > index + 1}
                      aria-current={step === index + 1 ? "step" : undefined}
                    >
                      <span className="project-modal-step-number">
                        {step > index + 1 ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Icon className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <span className="project-modal-step-label">{label}</span>
                    </button>
                  );
                })}
              </nav>
              {isPage ? (
                <div className="project-page-progress" aria-hidden="true">
                  <span style={{ width: `${step * 25}%` }} />
                </div>
              ) : null}

              {success ? (
                <div className="project-modal-success">
                  <Check className="mx-auto h-10 w-10" style={{ color: "var(--cyan)" }} />
                  <p className="mt-4 text-lg font-semibold">{tr.modal.success}</p>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="project-modal-button project-modal-button-primary mt-6"
                  >
                    {tr.modal.actions.close}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="project-modal-form">
                  <div className="project-modal-body">
                    {isPage ? (
                      <div className="project-page-form-heading">
                        <span className="project-page-form-heading-icon">
                          {(() => {
                            const Icon = stepIcons[step - 1];
                            return <Icon className="h-5 w-5" />;
                          })()}
                        </span>
                        <span>
                          <small>{String(step).padStart(2, "0")}</small>
                          <strong>{tr.modal.steps[step - 1]}</strong>
                        </span>
                        <Sparkles className="project-page-form-heading-spark h-5 w-5" />
                      </div>
                    ) : null}
                    <AnimatePresence initial={false} mode="wait">
                      <motion.div
                        key={step}
                        className="project-step-motion"
                        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                        transition={{ duration: reduceMotion ? 0 : 0.22 }}
                      >
                        {step === 1 ? (
                          <ClientInfo form={form} setField={setField} errors={errors} tr={tr} />
                        ) : null}
                        {step === 2 ? (
                          <ProjectDetails
                            form={form}
                            setField={setField}
                            toggleFeature={toggleFeature}
                            errors={errors}
                            tr={tr}
                          />
                        ) : null}
                        {step === 3 ? (
                          <PackageStep
                            form={form}
                            setField={setField}
                            error={errors.selectedPackage}
                            tr={tr}
                          />
                        ) : null}
                        {step === 4 ? <ReviewStep form={form} setField={setField} tr={tr} /> : null}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="project-modal-actions">
                    <button
                      type="button"
                      onClick={() => setStep(Math.max(1, step - 1))}
                      disabled={step === 1}
                      className="project-modal-button project-modal-button-secondary disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <ChevronLeft className="h-4 w-4 rtl:-scale-x-100" />
                      {tr.modal.actions.previous}
                    </button>
                    <div className="project-modal-actions-primary">
                      {step < 4 ? (
                        <button
                          type="button"
                          onClick={() => setStep(Math.min(4, step + 1))}
                          className="project-modal-button project-modal-button-primary"
                        >
                          {tr.modal.actions.next}
                          <ChevronRight className="h-4 w-4 rtl:-scale-x-100" />
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={openWhatsApp}
                            className="project-modal-button project-modal-button-secondary"
                          >
                            {tr.modal.actions.whatsapp} <Send className="h-4 w-4" />
                          </button>
                          <button
                            type="submit"
                            className="project-modal-button project-modal-button-primary"
                          >
                            {tr.modal.actions.submit} <Send className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
            {isPage ? <ProjectPageTail /> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ClientInfo({
  form,
  setField,
  errors,
  tr,
}: {
  form: ProjectForm;
  setField: (field: keyof ProjectForm, value: string | string[]) => void;
  errors: Record<string, string>;
  tr: ProjectTranslation;
}) {
  return (
    <div className="project-fields-grid">
      <Field label={tr.modal.labels.fullName} error={errors.fullName} icon={UserRound}>
        <input
          value={form.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
          placeholder={tr.modal.placeholders.fullName}
          className="form-input"
          autoComplete="name"
        />
      </Field>
      <Field label={tr.modal.labels.phone} error={errors.phone} icon={Phone}>
        <input
          value={form.phone}
          onChange={(e) => setField("phone", e.target.value)}
          placeholder={tr.modal.placeholders.phone}
          className="form-input"
          inputMode="tel"
          autoComplete="tel"
        />
      </Field>
      <Field label={tr.modal.labels.email} icon={Mail}>
        <input
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          type="email"
          className="form-input"
          autoComplete="email"
        />
      </Field>
      <Field label={tr.modal.labels.businessName} icon={Building2}>
        <input
          value={form.businessName}
          onChange={(e) => setField("businessName", e.target.value)}
          placeholder={tr.modal.placeholders.businessName}
          className="form-input"
        />
      </Field>
    </div>
  );
}

function ProjectDetails({
  form,
  setField,
  toggleFeature,
  errors,
  tr,
}: {
  form: ProjectForm;
  setField: (field: keyof ProjectForm, value: string | string[]) => void;
  toggleFeature: (feature: string) => void;
  errors: Record<string, string>;
  tr: ProjectTranslation;
}) {
  return (
    <div className="project-step-content">
      <Field
        label={tr.modal.labels.projectType}
        error={errors.projectType}
        icon={BriefcaseBusiness}
      >
        <select
          value={form.projectType}
          onChange={(e) => setField("projectType", e.target.value)}
          className="form-input"
        >
          <option value="">{tr.modal.select.projectType}</option>
          {tr.modal.projectTypes.map((type: string) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>
      <Field
        label={tr.modal.labels.projectIdea}
        error={errors.projectIdea}
        icon={Lightbulb}
        multiline
      >
        <textarea
          value={form.projectIdea}
          onChange={(e) => setField("projectIdea", e.target.value)}
          placeholder={tr.modal.placeholders.projectIdea}
          className="form-input min-h-32 resize-y"
        />
      </Field>
      <div>
        <div className="project-field-heading project-field-heading-with-icon">
          <Sparkles className="h-4 w-4" />
          {tr.modal.labels.features}
        </div>
        <div className="project-feature-grid">
          {tr.modal.features.map((feature: string) => {
            const selected = form.features.includes(feature);
            return (
              <label key={feature} className="project-feature-option" data-selected={selected}>
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleFeature(feature)}
                  className="project-feature-checkbox"
                />
                <span>{feature}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PackageStep({
  form,
  setField,
  error,
  tr,
}: {
  form: ProjectForm;
  setField: (field: keyof ProjectForm, value: string | string[]) => void;
  error?: string;
  tr: ProjectTranslation;
}) {
  return (
    <div className="project-step-content">
      <div>
        <div className="project-field-heading">{tr.modal.labels.package}</div>
        {error ? <p className="mb-3 text-xs text-red-300">{error}</p> : null}
        <div className="project-package-grid">
          {tr.modal.packages.map((pkg, index: number) => {
            const Icon = packageIcons[index];
            const selected = form.selectedPackage === pkg.title;
            return (
              <button
                key={pkg.title}
                type="button"
                onClick={() => setField("selectedPackage", pkg.title)}
                className="project-package-card"
                data-selected={selected}
                aria-pressed={selected}
              >
                <div className="project-package-topline">
                  <span className="project-package-icon">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="project-package-meta">
                    {selected ? (
                      <span className="project-package-selected">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    ) : null}
                    {pkg.badge ? <span className="project-package-badge">{pkg.badge}</span> : null}
                  </span>
                </div>
                <h3 className="project-package-title">{pkg.title}</h3>
                <div className="project-package-price">{pkg.price}</div>
                <p className="project-package-description">{pkg.desc}</p>
                <ul className="project-package-features">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4" style={{ color: "var(--cyan)" }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
        <p className="project-pricing-note">{tr.modal.pricingNote}</p>
      </div>
      <div className="project-fields-grid">
        <Field label={tr.modal.labels.timeline} icon={Clock3}>
          <select
            value={form.timeline}
            onChange={(e) => setField("timeline", e.target.value)}
            className="form-input"
          >
            <option value="">{tr.modal.select.timeline}</option>
            {tr.modal.timelines.map((timeline: string) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </Field>
        <Field label={tr.modal.labels.contactMethod} icon={MessageCircle}>
          <select
            value={form.contactMethod}
            onChange={(e) => setField("contactMethod", e.target.value)}
            className="form-input"
          >
            <option value="">{tr.modal.select.contactMethod}</option>
            {tr.modal.contactMethods.map((method: string) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </div>
  );
}

function ReviewStep({
  form,
  setField,
  tr,
}: {
  form: ProjectForm;
  setField: (field: keyof ProjectForm, value: string | string[]) => void;
  tr: ProjectTranslation;
}) {
  return (
    <div className="project-step-content">
      <Field label={tr.modal.labels.notes} icon={StickyNote} multiline>
        <textarea
          value={form.notes}
          onChange={(e) => setField("notes", e.target.value)}
          placeholder={tr.modal.placeholders.notes}
          className="form-input min-h-28 resize-y"
        />
      </Field>
      <div className="project-review-panel">
        <h3 className="project-review-title">{tr.modal.labels.review}</h3>
        <dl className="project-review-grid">
          <Review
            label={tr.modal.labels.fullName}
            value={form.fullName}
            fallback={tr.modal.reviewFallback}
          />
          <Review
            label={tr.modal.labels.phone}
            value={form.phone}
            fallback={tr.modal.reviewFallback}
          />
          <Review
            label={tr.modal.labels.projectType}
            value={form.projectType}
            fallback={tr.modal.reviewFallback}
          />
          <Review
            label={tr.modal.labels.package}
            value={form.selectedPackage}
            fallback={tr.modal.reviewFallback}
          />
          <Review
            label={tr.modal.labels.timeline}
            value={form.timeline}
            fallback={tr.modal.reviewFallback}
          />
          <Review
            label={tr.modal.labels.contactMethod}
            value={form.contactMethod}
            fallback={tr.modal.reviewFallback}
          />
        </dl>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  icon: Icon,
  multiline = false,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  icon?: LucideIcon;
  multiline?: boolean;
}) {
  return (
    <label className="project-field">
      <span className="project-field-label">{label}</span>
      <span className="project-field-control" data-multiline={multiline}>
        {Icon ? <Icon className="project-field-control-icon h-4 w-4" /> : null}
        {children}
      </span>
      {error ? <span className="project-field-error">{error}</span> : null}
    </label>
  );
}

function Review({ label, value, fallback }: { label: string; value: string; fallback: string }) {
  return (
    <div className="project-review-item">
      <dt>{label}</dt>
      <dd>{value || fallback}</dd>
    </div>
  );
}
