import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
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
  "GE",
  "GH",
  "GN",
  "GR",
  "GT",
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

export function ProjectPageTail() {
  const { language, dir } = useLanguage();
  const [countryNames, setCountryNames] = useState<Record<string, string>>({});
  const page = homepageContent[language];
  const footer = page.footer;
  const nav = page.nav;

  useEffect(() => {
    const names = new Intl.DisplayNames([language], { type: "region" });
    setCountryNames(Object.fromEntries(countryCodes.map((code) => [code, names.of(code) ?? code])));
  }, [language]);

  const countries = useMemo(
    () =>
      countryCodes.map((code) => ({
        code: code.toLowerCase(),
        name: countryNames[code] ?? code,
      })),
    [countryNames],
  );

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
        <h2 id="global-reach-title">Built in Jordan. Ready for the world.</h2>
        <div className="project-flag-field">
          <FlagMarquee countries={countries} />
        </div>
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

function FlagMarquee({ countries }: { countries: Array<{ code: string; name: string }> }) {
  const list = (
    <ul className="project-flag-list">
      {countries.map((country) => (
        <li key={country.code} className="project-flag-item" title={country.name}>
          <img
            src={`/flags/${country.code}.png`}
            alt={country.name}
            width="40"
            height="20"
            loading="lazy"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="project-flag-marquee">
      <div className="project-flag-track">
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
