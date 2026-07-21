import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";
import { BrandSymbol } from "@/components/landing/BrandSymbol";
import { socialBrandClassName } from "@/components/landing/socialBrandStyles";

type ContactProps = { onStartProject: () => void };

export function Contact({ onStartProject }: ContactProps) {
  const { language, dir } = useLanguage();
  const page = homepageContent[language];
  const copy = page.cta;
  const nav = page.nav;
  const footer = page.footer;
  const navigation = [
    [nav.home, "#home"],
    [nav.services, "#services"],
    [nav.projects, "#projects"],
    [nav.process, "#process"],
    [nav.team, "#team"],
    [nav.contact, "#contact"],
  ];
  const services = page.services.items.slice(0, 6).map((item) => item.title);

  return (
    <section
      id="contact"
      className="homepage-environment-alt relative overflow-hidden pt-[var(--section-space)]"
      dir={dir}
    >
      <div className="homepage-container">
        <div className="relative overflow-hidden rounded-2xl border border-white/12 px-5 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgb(124_58_237_/_0.3),transparent_36%),radial-gradient(circle_at_85%_78%,rgb(14_165_233_/_0.24),transparent_38%),linear-gradient(135deg,#0b1326,#071020)]" />
          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="section-eyebrow">{copy.eyebrow}</div>
              <h2 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.06] sm:text-5xl lg:text-6xl">
                {copy.title}
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {copy.body}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onStartProject}
                  className="premium-button premium-button-primary cursor-pointer justify-center"
                >
                  {copy.start}
                  <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                </button>
                <a
                  href="https://wa.me/962799195498"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${socialBrandClassName("https://wa.me/962799195498", "WhatsApp", "cta")} justify-center`}
                >
                  <MessageCircle className="h-4 w-4" />
                  {copy.whatsapp}
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <ContactLink
                icon={Mail}
                label="Email"
                value="info@next-aura-ai.com"
                href="mailto:info@next-aura-ai.com"
              />
              <ContactLink
                icon={MessageCircle}
                label="WhatsApp"
                value="+962 7 9919 5498"
                href="https://wa.me/962799195498"
              />
              <div className="flex items-center gap-4 border-t border-white/10 py-4 text-slate-300">
                <MapPin className="h-5 w-5 text-cyan-300" />
                <span>{footer.location}</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="relative pb-28 pt-16 md:pb-10 lg:pt-24">
          <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr_0.9fr]">
            <div>
              <BrandSymbol className="h-11 w-11" imageClassName="h-full w-full" />
              <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">{footer.description}</p>
              <div className="mt-6 flex flex-wrap gap-2" aria-label="NextAura AI social media">
                <a
                  href="https://linkedin.com/company/nextaura-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit NextAura AI on LinkedIn"
                  className={socialBrandClassName(
                    "https://linkedin.com/company/nextaura-ai",
                    "LinkedIn",
                  )}
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/nextauraai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit NextAura AI on Instagram"
                  className={socialBrandClassName(
                    "https://www.instagram.com/nextauraai/",
                    "Instagram",
                  )}
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/Nextauraai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit NextAura AI on Facebook"
                  className={socialBrandClassName(
                    "https://www.facebook.com/Nextauraai",
                    "Facebook",
                  )}
                >
                  <FaFacebookF className="h-4 w-4" />
                </a>
                <a
                  href="https://www.youtube.com/@NextAuraAI-Solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit NextAura AI on YouTube"
                  className={socialBrandClassName(
                    "https://www.youtube.com/@NextAuraAI-Solutions",
                    "YouTube",
                  )}
                >
                  <FaYoutube className="h-4 w-4" />
                </a>
                <a
                  href="http://tiktok.com/@nextaura_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit NextAura AI on TikTok"
                  className={socialBrandClassName("http://tiktok.com/@nextaura_ai", "TikTok")}
                >
                  <FaTiktok className="h-4 w-4" />
                </a>
                <a
                  href="mailto:info@next-aura-ai.com"
                  aria-label="Email NextAura AI"
                  className={socialBrandClassName("mailto:info@next-aura-ai.com", "Email")}
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
            <FooterColumn title={footer.navigation} items={navigation} />
            <div>
              <h3 className="text-sm font-semibold text-white">{footer.services}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-400">
                {services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{footer.contact}</h3>
              <div className="mt-5 space-y-3 text-sm text-slate-400">
                <a
                  className={socialBrandClassName("mailto:info@next-aura-ai.com", "Email", "text")}
                  href="mailto:info@next-aura-ai.com"
                >
                  info@next-aura-ai.com
                </a>
                <a
                  className={socialBrandClassName("https://wa.me/962799195498", "WhatsApp", "text")}
                  href="https://wa.me/962799195498"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +962 7 9919 5498
                </a>
                <p>{footer.location}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} NextAura AI</span>
            <div className="flex flex-wrap gap-5">
              <span>{footer.privacy}</span>
              <span>{footer.terms}</span>
              <span>{footer.built}</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

function ContactLink({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={socialBrandClassName(href, label, "row")}
    >
      <span className="flex items-center gap-4">
        <Icon className="h-5 w-5" />
        <span>
          <span className="block text-xs uppercase tracking-[0.14em] text-slate-500">{label}</span>
          <span className="mt-1 block text-sm">{value}</span>
        </span>
      </span>
      <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
    </a>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[][] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-slate-400">
        {items.map(([label, href]) => (
          <li key={href}>
            <a href={href} className="transition hover:text-white">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
