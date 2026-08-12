import { ArrowUpRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";
import { socialBrandClassName } from "@/components/landing/socialBrandStyles";

const people = [
  {
    key: "mohannad" as const,
    name: "Mohannad",
    image: "/team/mohannad.jpg",
    imagePosition: "50% 19%",
    route: "/founders/mohannad" as const,
    socials: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mohannadabuayyash/",
        icon: FaLinkedinIn,
      },
      { label: "Instagram", href: "https://www.instagram.com/mohannad14_06/", icon: FaInstagram },
      { label: "WhatsApp", href: "https://wa.me/962799195498", icon: FaWhatsapp },
      {
        label: "Facebook",
        href: "https://www.facebook.com/mohannad.abuayyash.20/",
        icon: FaFacebookF,
      },
    ],
  },
  {
    key: "moayad" as const,
    name: "Muayid",
    image: "/team/moayad.jpg",
    imagePosition: "50% 28%",
    route: "/founders/moayad" as const,
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/moayad-rabah/", icon: FaLinkedinIn },
      { label: "Instagram", href: "https://www.instagram.com/moayad.rabah/", icon: FaInstagram },
      { label: "WhatsApp", href: "https://wa.me/962780467522", icon: FaWhatsapp },
      { label: "Facebook", href: "https://www.facebook.com/moayad.rabah.2", icon: FaFacebookF },
    ],
  },
];

export function Team() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].team;

  return (
    <section id="team" className="homepage-section homepage-environment-alt relative" dir={dir}>
      <div className="homepage-container">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} className="max-w-3xl" />
          <p className="max-w-xl text-base leading-8 text-[var(--secondary-text)] lg:justify-self-end">
            {copy.body}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {people.map((person) => {
            const translated = copy.members[person.key];
            return (
              <article key={person.name} className="team-profile-card group">
                <div className="team-profile-picture bg-slate-900">
                  <img
                    src={person.image}
                    alt={`${person.name} — ${translated.role}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: person.imagePosition }}
                  />
                </div>
                <div className="team-profile-details">
                  <div className="team-profile-content">
                    <h3 className="text-2xl font-semibold text-white">{person.name}</h3>
                    <div className="mt-2 text-sm font-medium text-cyan-300">{translated.role}</div>
                    <p className="mt-4 text-sm leading-6 text-slate-200">{translated.description}</p>
                  </div>
                  <div className="team-profile-actions">
                    <div className="flex flex-wrap gap-2" aria-label={`${person.name}'s social profiles`}>
                      {person.socials.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${person.name} on ${social.label}`}
                          title={social.label}
                          className={`${socialBrandClassName(social.href, social.label)} cursor-pointer`}
                        >
                          <social.icon className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                    <Link to={person.route} className="team-profile-link">
                      {translated.about}
                      <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
