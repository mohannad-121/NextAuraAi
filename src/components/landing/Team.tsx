import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { CinematicCard } from "@/components/landing/CinematicCard";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

const people = [
  {
    key: "mohannad" as const,
    name: "Mohannad",
    image: "/team/mohannad.jpg",
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
                <div className="aspect-[4/3] overflow-hidden bg-slate-900 sm:aspect-[3/2]">
                  <img
                    src={person.image}
                    alt={`${person.name} — ${translated.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top grayscale-[0.08] transition-[filter] duration-200 group-hover:grayscale-0"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-2xl font-semibold text-white">{person.name}</h3>
                  <div className="mt-2 text-sm font-medium text-cyan-300">{translated.role}</div>
                  <p className="mt-4 text-base leading-7 text-[var(--secondary-text)]">
                    {translated.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                    {person.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${person.name} on ${social.label}`}
                        title={social.label}
                        className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-colors duration-200 hover:border-cyan-300/50 hover:text-cyan-200"
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
