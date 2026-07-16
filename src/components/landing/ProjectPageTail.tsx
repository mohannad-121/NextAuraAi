import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Clock3,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

const countryCodes = [
  "AE",
  "AF",
  "AL",
  "AR",
  "AT",
  "AU",
  "BA",
  "BD",
  "BE",
  "BG",
  "BH",
  "BR",
  "BV",
  "CA",
  "CD",
  "CH",
  "CI",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CV",
  "CZ",
  "DE",
  "DJ",
  "DK",
  "DM",
  "DZ",
  "EC",
  "EG",
  "ES",
  "FI",
  "FR",
  "GB",
  "GB-ENG",
  "GB-SCT",
  "GB-WLS",
  "GE",
  "GH",
  "GN",
  "GR",
  "GT",
  "HM",
  "HN",
  "HR",
  "HT",
  "HU",
  "ID",
  "IE",
  "IN",
  "IQ",
  "IR",
  "IT",
  "JO",
  "JP",
  "KP",
  "KR",
  "KW",
  "LB",
  "LK",
  "LR",
  "LY",
  "MA",
  "MC",
  "MF",
  "ML",
  "MR",
  "MX",
  "MY",
  "NA",
  "NE",
  "NG",
  "NL",
  "NO",
  "OM",
  "PA",
  "PE",
  "PH",
  "PK",
  "PL",
  "PR",
  "PS",
  "PT",
  "PY",
  "QA",
  "RO",
  "RS",
  "RU",
  "SA",
  "SD",
  "SE",
  "SG",
  "SI",
  "SJ",
  "SK",
  "SN",
  "SV",
  "SY",
  "TD",
  "TH",
  "TN",
  "TR",
  "TW",
  "UA",
  "US",
  "UY",
  "UZ",
  "VE",
  "VN",
  "YE",
  "ZA",
] as const;

const specialCountryNames: Record<string, Record<string, string>> = {
  en: { "GB-ENG": "England", "GB-SCT": "Scotland", "GB-WLS": "Wales" },
  ar: { "GB-ENG": "إنجلترا", "GB-SCT": "اسكتلندا", "GB-WLS": "ويلز" },
  es: { "GB-ENG": "Inglaterra", "GB-SCT": "Escocia", "GB-WLS": "Gales" },
};

const reachCopy = {
  en: {
    eyebrow: "GLOBAL DELIVERY",
    title: "Built in Jordan. Ready for the world.",
    body: "One remote team, one clear process, and digital products shaped for businesses across every major market.",
    regions: ["Arab world", "Asia", "Europe", "The Americas", "Australia & Oceania"],
    stats: [
      ["100+", "markets represented"],
      ["One", "delivery standard"],
      ["Flexible", "time-zone collaboration"],
    ],
    note: "Your location should never limit the quality of what you can build.",
  },
  ar: {
    eyebrow: "خدمات بلا حدود",
    title: "نبني من الأردن، ونصل إلى العالم.",
    body: "فريق واحد عن بعد، عملية واضحة، ومنتجات رقمية مصممة للأعمال في أهم الأسواق حول العالم.",
    regions: ["العالم العربي", "آسيا", "أوروبا", "الأمريكيتان", "أستراليا وأوقيانوسيا"],
    stats: [
      ["+100", "سوق نمثله"],
      ["معيار واحد", "لجودة التسليم"],
      ["مرنة", "مواعيد التواصل"],
    ],
    note: "موقعك لا يجب أن يحد من جودة المنتج الذي تستطيع بناءه.",
  },
  es: {
    eyebrow: "ALCANCE GLOBAL",
    title: "Creamos desde Jordania para todo el mundo.",
    body: "Un equipo remoto, un proceso claro y productos digitales adaptados a empresas de los principales mercados.",
    regions: ["Mundo arabe", "Asia", "Europa", "Las Americas", "Australia y Oceania"],
    stats: [
      ["100+", "mercados representados"],
      ["Unico", "estandar de entrega"],
      ["Flexible", "colaboracion horaria"],
    ],
    note: "Tu ubicacion nunca debe limitar la calidad de lo que puedes crear.",
  },
};

export function ProjectPageTail() {
  const { language, dir } = useLanguage();
  const [countryNames, setCountryNames] = useState<Record<string, string>>({});
  const page = homepageContent[language];
  const copy = reachCopy[language];
  const footer = page.footer;
  const nav = page.nav;

  useEffect(() => {
    const names = new Intl.DisplayNames([language], { type: "region" });
    setCountryNames(
      Object.fromEntries(
        countryCodes.map((code) => [
          code,
          specialCountryNames[language]?.[code] ?? names.of(code) ?? code,
        ]),
      ),
    );
  }, [language]);

  const countries = useMemo(
    () =>
      countryCodes.map((code) => ({
        code: code.toLowerCase(),
        name: countryNames[code] ?? code,
      })),
    [countryNames],
  );

  const midpoint = Math.ceil(countries.length / 2);
  const navigation = [
    [nav.home, "/#home"],
    [nav.services, "/#services"],
    [nav.projects, "/#projects"],
    [nav.process, "/#process"],
    [nav.team, "/#team"],
    [nav.contact, "/#contact"],
  ];
  const services = page.services.items.slice(0, 3).map((item) => item.title);

  return (
    <>
      <section className="project-global-reach" dir={dir} aria-labelledby="global-reach-title">
        <div className="project-global-reach-heading">
          <div>
            <div className="project-global-reach-eyebrow">
              <span aria-hidden="true">{"\u{1F30D}"}</span>
              {copy.eyebrow}
            </div>
            <h2 id="global-reach-title">{copy.title}</h2>
          </div>
          <p>{copy.body}</p>
        </div>

        <div className="project-global-stats">
          {copy.stats.map(([value, label], index) => {
            const Icon = [Globe2, ShieldCheck, Clock3][index];
            return (
              <div key={label} className="project-global-stat">
                <Icon className="h-5 w-5" />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            );
          })}
        </div>

        <div className="project-global-regions" aria-label={copy.eyebrow}>
          {copy.regions.map((region) => (
            <span key={region}>{region}</span>
          ))}
        </div>

        <div className="project-flag-field">
          <FlagMarquee countries={countries.slice(0, midpoint)} />
          <FlagMarquee countries={countries.slice(midpoint)} reverse />
        </div>

        <p className="project-global-note">
          <span aria-hidden="true">{"\u2728"}</span>
          {copy.note}
        </p>
      </section>

      <footer className="project-page-footer" dir={dir}>
        <div className="project-page-footer-grid">
          <div className="project-page-footer-brand">
            <a href="/" className="project-page-footer-identity" aria-label="NextAura AI">
              <span className="project-page-mark" aria-hidden="true">
                <img src="/favicon-48.png" alt="" />
              </span>
              <span>NextAura AI</span>
            </a>
            <p>{footer.description}</p>
            <a
              href="https://linkedin.com/company/nextaura-ai"
              target="_blank"
              rel="noreferrer"
              aria-label="NextAura AI on LinkedIn"
              className="project-page-social"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          <FooterLinks title={footer.navigation} items={navigation} />

          <div className="project-page-footer-column">
            <h3>{footer.services}</h3>
            <ul>
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="project-page-footer-column project-page-footer-contact">
            <h3>{footer.contact}</h3>
            <a href="mailto:info@next-aura-ai.com">
              <Mail className="h-4 w-4" />
              info@next-aura-ai.com
            </a>
            <a href="https://wa.me/962799195498">
              <MessageCircle className="h-4 w-4" />
              +962 7 9919 5498
            </a>
            <p>
              <MapPin className="h-4 w-4" />
              {footer.location}
            </p>
          </div>
        </div>

        <div className="project-page-footer-bottom">
          <span>
            {"\u00A9"} {new Date().getFullYear()} NextAura AI
          </span>
          <div>
            <span>{footer.privacy}</span>
            <span>{footer.terms}</span>
            <span>{footer.built}</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function FlagMarquee({
  countries,
  reverse = false,
}: {
  countries: Array<{ code: string; name: string }>;
  reverse?: boolean;
}) {
  const list = (
    <ul className="project-flag-list">
      {countries.map((country) => (
        <li key={country.code} className="project-flag-item" title={country.name}>
          <img
            src={`/flags/${country.code}.png`}
            alt=""
            width="40"
            height="20"
            loading="lazy"
            decoding="async"
          />
          <span>{country.name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="project-flag-marquee">
      <div className="project-flag-track" data-reverse={reverse}>
        {list}
        <div aria-hidden="true">{list}</div>
      </div>
    </div>
  );
}

function FooterLinks({ title, items }: { title: string; items: string[][] }) {
  return (
    <div className="project-page-footer-column">
      <h3>{title}</h3>
      <ul>
        {items.map(([label, href]) => (
          <li key={href}>
            <a href={href}>
              {label}
              <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
