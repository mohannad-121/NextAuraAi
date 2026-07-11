import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/translations";
import { homepageContent } from "@/i18n/homepageContent";
import { SectionHeading } from "@/components/landing/SectionHeading";

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
    <section
      id="team"
      className="relative overflow-hidden bg-[#050817] py-24 sm:py-28 lg:py-40"
      dir={dir}
    >
      <div className="section-glow -right-52 top-32" />
      <div className="relative mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} className="max-w-4xl" />
          <p className="max-w-xl text-base leading-8 text-slate-400 lg:justify-self-end">
            {copy.body}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-10 md:grid-cols-2 lg:gap-16">
          {people.map((person, index) => {
            const translated = copy.members[person.key];
            return (
              <motion.article
                key={person.name}
                initial={{ opacity: 0, y: 42 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08, duration: 0.75 }}
                className="team-editorial group relative overflow-hidden"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
                  <img
                    src={person.image}
                    alt={`${person.name} — ${translated.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top grayscale-[0.12] transition duration-700 group-hover:scale-[1.035] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030612] via-transparent to-transparent" />
                </div>
                <div className="relative -mt-16 p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-semibold text-white">{person.name}</h3>
                      <div className="mt-2 text-sm font-medium text-cyan-300">
                        {translated.role}
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 min-h-[4rem] text-sm leading-7 text-slate-400">
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
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/6 text-slate-300 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:text-cyan-200"
                      >
                        <social.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
