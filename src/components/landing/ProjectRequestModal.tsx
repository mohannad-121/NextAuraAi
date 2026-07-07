import { FormEvent, MouseEvent, ReactNode, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Check, ChevronLeft, ChevronRight, Globe, LayoutDashboard, Send, X } from "lucide-react";
import { useLanguage } from "@/i18n/translations";

const WHATSAPP_NUMBER = "962799195498";

const contactMethods = ["WhatsApp", "Phone call", "Email"];
const packageIcons = [Globe, LayoutDashboard, Bot];

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

type ProjectRequestModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ProjectRequestModal({ open, onClose }: ProjectRequestModalProps) {
  const { tr } = useLanguage();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const hasData = useMemo(
    () => Object.entries(form).some(([, value]) => (Array.isArray(value) ? value.length > 0 : value.trim().length > 0)),
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
    setField("features", form.features.includes(feature) ? form.features.filter((item) => item !== feature) : [...form.features, feature]);
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
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`, "_blank", "noreferrer");
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    console.log("Project request", form);
    setSuccess(true);
    openWhatsApp();
  };

  const requestClose = () => {
    if (hasData && !success && !window.confirm(tr.modal.confirmClose)) return;
    onClose();
  };

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
          className="fixed inset-0 z-[100] flex items-end justify-center bg-background/75 p-0 backdrop-blur-xl sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={closeFromBackdrop}
        >
          <motion.div
            dir="rtl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-request-title"
            className="glass glow-border h-[100dvh] w-full max-w-5xl overflow-y-auto rounded-none p-4 pb-24 text-right shadow-2xl sm:h-auto sm:max-h-[92vh] sm:rounded-2xl sm:p-7"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--cyan)" }}>NextAura AI</div>
                <h2 id="project-request-title" className="mt-2 text-2xl font-bold sm:text-4xl">{tr.modal.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                  {tr.modal.subtitle}
                </p>
              </div>
              <button type="button" onClick={requestClose} aria-label={tr.modal.actions.close} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border/70 bg-card/70 text-muted-foreground transition-colors hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-2 text-xs text-muted-foreground sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0">
              {tr.modal.steps.map((label: string, index: number) => (
                <button key={label} type="button" onClick={() => setStep(index + 1)} className={`min-h-10 min-w-[8.5rem] rounded-full border px-3 py-2 transition-colors sm:min-w-0 ${step === index + 1 ? "border-cyan/70 text-foreground shadow-[0_0_24px_rgb(56_189_248_/_0.26)]" : "border-border/60"}`}>
                  {label}
                </button>
              ))}
            </div>

            {success ? (
              <div className="mt-8 rounded-2xl border border-cyan/60 bg-card/70 p-6 text-center">
                <Check className="mx-auto h-10 w-10" style={{ color: "var(--cyan)" }} />
                <p className="mt-4 text-lg font-semibold">{tr.modal.success}</p>
                <button type="button" onClick={resetAndClose} className="btn-primary mt-6 min-h-12 rounded-full px-6 text-sm">{tr.modal.actions.close}</button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 sm:mt-8">
                {step === 1 ? <ClientInfo form={form} setField={setField} errors={errors} tr={tr} /> : null}
                {step === 2 ? <ProjectDetails form={form} setField={setField} toggleFeature={toggleFeature} errors={errors} tr={tr} /> : null}
                {step === 3 ? <PackageStep form={form} setField={setField} error={errors.selectedPackage} tr={tr} /> : null}
                {step === 4 ? <ReviewStep form={form} setField={setField} tr={tr} /> : null}

                <div className="mt-7 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
                  <button type="button" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="btn-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40">
                    <ChevronRight className="h-4 w-4" /> {tr.modal.actions.previous}
                  </button>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {step < 4 ? (
                      <button type="button" onClick={() => setStep(Math.min(4, step + 1))} className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm">
                        {tr.modal.actions.next} <ChevronLeft className="h-4 w-4" />
                      </button>
                    ) : (
                      <>
                        <button type="button" onClick={openWhatsApp} className="btn-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm">
                          {tr.modal.actions.whatsapp} <Send className="h-4 w-4" />
                        </button>
                        <button type="submit" className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm">
                          {tr.modal.actions.submit} <Send className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ClientInfo({ form, setField, errors, tr }: { form: ProjectForm; setField: (field: keyof ProjectForm, value: string | string[]) => void; errors: Record<string, string>; tr: any }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label={tr.modal.labels.fullName} error={errors.fullName}><input value={form.fullName} onChange={(e) => setField("fullName", e.target.value)} placeholder={tr.modal.placeholders.fullName} className="form-input" /></Field>
      <Field label={tr.modal.labels.phone} error={errors.phone}><input value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder={tr.modal.placeholders.phone} className="form-input" /></Field>
      <Field label={tr.modal.labels.email}><input value={form.email} onChange={(e) => setField("email", e.target.value)} type="email" className="form-input" /></Field>
      <Field label={tr.modal.labels.businessName}><input value={form.businessName} onChange={(e) => setField("businessName", e.target.value)} placeholder={tr.modal.placeholders.businessName} className="form-input" /></Field>
    </div>
  );
}

function ProjectDetails({ form, setField, toggleFeature, errors, tr }: { form: ProjectForm; setField: (field: keyof ProjectForm, value: string | string[]) => void; toggleFeature: (feature: string) => void; errors: Record<string, string>; tr: any }) {
  return (
    <div className="space-y-5">
      <Field label={tr.modal.labels.projectType} error={errors.projectType}>
        <select value={form.projectType} onChange={(e) => setField("projectType", e.target.value)} className="form-input">
          <option value="">{tr.modal.select.projectType}</option>
          {tr.modal.projectTypes.map((type: string) => <option key={type} value={type}>{type}</option>)}
        </select>
      </Field>
      <Field label={tr.modal.labels.projectIdea} error={errors.projectIdea}>
        <textarea value={form.projectIdea} onChange={(e) => setField("projectIdea", e.target.value)} placeholder={tr.modal.placeholders.projectIdea} className="form-input min-h-32 resize-y" />
      </Field>
      <div>
        <div className="mb-3 text-sm font-semibold">{tr.modal.labels.features}</div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {tr.modal.features.map((feature: string) => (
            <label key={feature} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-border/60 bg-card/40 p-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <input type="checkbox" checked={form.features.includes(feature)} onChange={() => toggleFeature(feature)} className="accent-sky-400" />
              <span>{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function PackageStep({ form, setField, error, tr }: { form: ProjectForm; setField: (field: keyof ProjectForm, value: string | string[]) => void; error?: string; tr: any }) {
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-3 text-sm font-semibold">{tr.modal.labels.package}</div>
        {error ? <p className="mb-3 text-xs text-red-300">{error}</p> : null}
        <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
          {tr.modal.packages.map((pkg: any, index: number) => {
            const Icon = packageIcons[index];
            return (
            <button key={pkg.title} type="button" onClick={() => setField("selectedPackage", pkg.title)} className={`rounded-2xl border bg-card/50 p-4 text-right transition-all hover:-translate-y-1 sm:p-5 ${form.selectedPackage === pkg.title ? "border-cyan/80 shadow-[0_0_32px_rgb(56_189_248_/_0.3)]" : "border-border/60"}`}>
              <div className="flex items-start justify-between gap-3">
                <Icon className="h-6 w-6" style={{ color: "var(--cyan)" }} />
                {pkg.badge ? <span className="rounded-full bg-primary/30 px-3 py-1 text-xs text-foreground">{pkg.badge}</span> : null}
              </div>
              <h3 className="mt-4 text-lg font-bold">{pkg.title}</h3>
              <div className="mt-1 text-sm font-semibold text-gradient">{pkg.price}</div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{pkg.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {pkg.features.map((feature) => <li key={feature} className="flex items-center gap-2"><Check className="h-4 w-4" style={{ color: "var(--cyan)" }} /><span>{feature}</span></li>)}
              </ul>
            </button>
          )})}
        </div>
        <p className="mt-4 rounded-xl border border-border/60 bg-card/40 p-4 text-sm leading-7 text-muted-foreground">
          {tr.modal.pricingNote}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={tr.modal.labels.timeline}><select value={form.timeline} onChange={(e) => setField("timeline", e.target.value)} className="form-input"><option value="">{tr.modal.select.timeline}</option>{tr.modal.timelines.map((timeline: string) => <option key={timeline} value={timeline}>{timeline}</option>)}</select></Field>
        <Field label={tr.modal.labels.contactMethod}><select value={form.contactMethod} onChange={(e) => setField("contactMethod", e.target.value)} className="form-input"><option value="">{tr.modal.select.contactMethod}</option>{contactMethods.map((method) => <option key={method} value={method}>{method}</option>)}</select></Field>
      </div>
    </div>
  );
}

function ReviewStep({ form, setField, tr }: { form: ProjectForm; setField: (field: keyof ProjectForm, value: string | string[]) => void; tr: any }) {
  return (
    <div className="space-y-5">
      <Field label={tr.modal.labels.notes}><textarea value={form.notes} onChange={(e) => setField("notes", e.target.value)} placeholder={tr.modal.placeholders.notes} className="form-input min-h-28 resize-y" /></Field>
      <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
        <h3 className="text-lg font-bold">{tr.modal.labels.review}</h3>
        <dl className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <Review label={tr.modal.labels.fullName} value={form.fullName} fallback={tr.modal.reviewFallback} />
          <Review label={tr.modal.labels.phone} value={form.phone} fallback={tr.modal.reviewFallback} />
          <Review label={tr.modal.labels.projectType} value={form.projectType} fallback={tr.modal.reviewFallback} />
          <Review label={tr.modal.labels.package} value={form.selectedPackage} fallback={tr.modal.reviewFallback} />
          <Review label={tr.modal.labels.timeline} value={form.timeline} fallback={tr.modal.reviewFallback} />
          <Review label={tr.modal.labels.contactMethod} value={form.contactMethod} fallback={tr.modal.reviewFallback} />
        </dl>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-red-300">{error}</span> : null}
    </label>
  );
}

function Review({ label, value, fallback }: { label: string; value: string; fallback: string }) {
  return (
    <div>
      <dt className="text-xs">{label}</dt>
      <dd className="mt-1 font-semibold text-foreground">{value || fallback}</dd>
    </div>
  );
}
