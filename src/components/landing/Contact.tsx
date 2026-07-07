import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Mail, MessageCircle, Rocket } from "lucide-react";
import { useLanguage } from "@/i18n/translations";
import { BrandLogo } from "@/components/landing/BrandLogo";

type ContactProps = {
  onStartProject: () => void;
};

export function Contact({ onStartProject }: ContactProps) {
  const { tr, dir } = useLanguage();
  const channels = [
    { icon: MessageCircle, label: "WhatsApp", value: tr.contact.channels.whatsapp, href: "https://wa.me/962799195498" },
    { icon: Mail, label: "Email", value: tr.contact.channels.email, href: "mailto:hello@nextaura.ai" },
    { icon: Linkedin, label: "LinkedIn", value: tr.contact.channels.linkedin, href: "https://linkedin.com/company/nextaura-ai" },
  ];

  return (
    <section id="contact" className="relative py-12 pb-32 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl glass glow-border p-5 text-center sm:p-10 md:p-14">
          <div className="absolute -top-32 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-primary)" }} />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--cyan)" }}>{tr.contact.eyebrow}</div>
            <h2 className="mt-4 text-3xl font-bold sm:text-5xl md:text-6xl">
              {tr.contact.titleA}<span className="text-gradient">{tr.contact.titleB}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">{tr.contact.subtitle}</p>
            <button type="button" onClick={onStartProject} className="btn-primary mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm sm:w-auto">
              <Rocket className="h-4 w-4" />
              {tr.nav.start}
            </button>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
              {channels.map((c, i) => (
                <motion.a key={c.label} href={c.href} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className={`group flex min-h-20 items-center justify-between rounded-2xl glass p-4 transition-colors hover:border-cyan/50 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
                      <c.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{c.label}</div>
                      <div className="text-xs text-muted-foreground">{c.value}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <footer className="mt-12 grid gap-8 border-t border-border/50 pt-8 text-sm text-muted-foreground md:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr]">
          <div>
            <BrandLogo className="w-[10rem] sm:w-[11.5rem]" />
            <p className="mt-4 max-w-sm leading-6">{tr.contact.footerText}</p>
          </div>
          <FooterGroup title={tr.contact.quickLinks} items={[tr.nav.services, tr.nav.work, tr.nav.team, tr.nav.contact]} />
          <FooterGroup title={tr.nav.services} items={tr.services.items.map((item: any) => item.title)} />
          <div>
            <div className="font-semibold text-foreground">{tr.contact.contact}</div>
            <div className="mt-3 space-y-2">
              <div>hello@nextaura.ai</div>
              <div>{tr.contact.location}</div>
              <div>© {new Date().getFullYear()} NextAura AI</div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

function FooterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="font-semibold text-foreground">{title}</div>
      <div className="mt-3 space-y-2">
        {items.map((item) => <div key={item}>{item}</div>)}
      </div>
    </div>
  );
}
