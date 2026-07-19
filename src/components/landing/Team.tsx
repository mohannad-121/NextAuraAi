import { ArrowUpRight, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CinematicCard } from "@/components/landing/CinematicCard";
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
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mohannadabuayyash/", icon: Linkedin },
      { label: "Instagram", href: "https://www.instagram.com/mohannad14_06/", icon: Instagram },
      { label: "WhatsApp", href: "https://wa.me/962799195498", icon: MessageCircle },
      {
        label: "Facebook",
        href: "https://www.facebook.com/mohannad.abuayyash.20/",
        icon: Facebook,
      },
    ],
  },
  {
    key: "moayad" as const,
    name: "Moayad",
    image: "/team/moayad.jpg",
    imagePosition: "50% 28%",
    route: "/founders/moayad" as const,
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/moayad-rabah/", icon: Linkedin },
      { label: "Instagram", href: "https://www.instagram.com/moayad.rabah/", icon: Instagram },
      { label: "WhatsApp", href: "https://wa.me/962780467522", icon: MessageCircle },
      { label: "Facebook", href: "https://www.facebook.com/moayad.rabah.2", icon: Facebook },
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

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {people.map((person) => {
            const translated = copy.members[person.key];
            return (
              <CinematicCard key={person.name} className="group overflow-hidden !p-0">
                <div className="aspect-[4/5] overflow-hidden bg-slate-900 sm:aspect-[5/6] lg:aspect-[4/5]">
                  <img
                    src={person.image}
                    alt={`${person.name} — ${translated.role}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover grayscale-[0.08] transition-[filter] duration-200 group-hover:grayscale-0"
                    style={{ objectPosition: person.imagePosition }}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-2xl font-semibold text-white">{person.name}</h3>
                  <div className="mt-2 text-sm font-medium text-cyan-300">{translated.role}</div>
                  <p className="mt-4 text-base leading-7 text-[var(--secondary-text)]">
                    {translated.description}
                  </p>
                  <Link
                    to={person.route}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/5 px-4 text-sm font-semibold text-cyan-100 transition-colors duration-200 hover:border-cyan-200 hover:bg-cyan-300/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  >
                    {translated.about}
                    <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                  </Link>
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
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
                </div>
              </CinematicCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
