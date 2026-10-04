import { useState, type KeyboardEvent, type MouseEvent } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

const people = [
  {
    key: "mohannad" as const,
    name: "Mohannad",
    image: "/team/mohannad.jpg",
    imagePosition: "50% 19%",
    route: "/founders/mohannad" as const,
    accent: "violet",
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
    accent: "blue",
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
  const [openCard, setOpenCard] = useState<string | null>(null);

  const toggleFromCard = (event: MouseEvent<HTMLElement>, key: string) => {
    if ((event.target as HTMLElement).closest("a, button")) return;
    setOpenCard((current) => (current === key ? null : key));
  };

  const toggleFromKeyboard = (event: KeyboardEvent<HTMLElement>, key: string) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if ((event.target as HTMLElement).closest("a, button")) return;
    event.preventDefault();
    setOpenCard((current) => (current === key ? null : key));
  };

  return (
    <section className="con-team con-section" dir={dir}>
      <div className="con-team-container">
        <div className="con-team-head">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} className="max-w-3xl" />
          <p>{copy.body}</p>
        </div>

        <div className="con-team-grid">
          {people.map((person) => {
            const translated = copy.members[person.key];
            const isOpen = openCard === person.key;
            return (
              <article
                key={person.key}
                className="founder-card"
                data-accent={person.accent}
                data-open={isOpen || undefined}
                tabIndex={0}
                aria-label={`${person.name}, ${translated.role}`}
                onClick={(event) => toggleFromCard(event, person.key)}
                onKeyDown={(event) => toggleFromKeyboard(event, person.key)}
                onFocusCapture={() => setOpenCard(person.key)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null))
                    setOpenCard(null);
                }}
              >
                <a
                  className="founder-mail"
                  href="mailto:info@next-aura-ai.com"
                  aria-label={`Email NextAura AI about ${person.name}`}
                >
                  <Mail aria-hidden="true" />
                </a>

                <div className="founder-profile-pic">
                  <img
                    src={person.image}
                    alt={`${person.name}, ${translated.role}`}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: person.imagePosition }}
                  />
                </div>

                <div className="founder-bottom">
                  <div className="founder-content">
                    <span className="founder-name">{person.name}</span>
                    <span className="founder-role">{translated.role}</span>
                    <span className="founder-about">{translated.description}</span>
                  </div>
                  <div className="founder-bottom-row">
                    <div
                      className="founder-social-links"
                      aria-label={`${person.name}'s social profiles`}
                    >
                      {person.socials.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${person.name} on ${social.label}`}
                          title={social.label}
                        >
                          <social.icon aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                    <Link to={person.route} className="founder-button">
                      {translated.about}
                      <ArrowUpRight aria-hidden="true" />
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
