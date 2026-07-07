import { motion } from "framer-motion";
import { Instagram, Linkedin, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/translations";
import { TeamCard } from "@/components/landing/TeamCard";

const team = [
  {
    name: "Mohannad",
    role: "Founder & AI/Backend Lead",
    initials: "MO",
    image: "/team/mohannad.jpg",
    key: "mohannad",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/mohannad14_06/", icon: Instagram },
      { label: "WhatsApp", href: "https://wa.me/962799195498", icon: MessageCircle },
      { label: "Phone", href: "tel:+962799195498", icon: Phone },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mohannadabuayyash/", icon: Linkedin },
    ],
  },
  {
    name: "Moayad",
    initials: "MA",
    image: "/team/moayad.jpg",
    key: "moayad",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/moayad.rabah/", icon: Instagram },
      { label: "WhatsApp", href: "https://wa.me/962780467522", icon: MessageCircle },
      { label: "Phone", href: "tel:+962780467522", icon: Phone },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/moayad-rabah/", icon: Linkedin },
    ],
  },
];

export function Team() {
  const { tr, dir } = useLanguage();
  return (
    <section id="team" className="section-light relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
          <div className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--cyan)" }}>{tr.team.eyebrow}</div>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            {tr.team.titleA}<span className="text-gradient">{tr.team.titleB}</span>
          </h2>
        </motion.div>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 md:gap-6">
          {team.map((m, i) => (
            <TeamCard
              key={m.name}
              member={m}
              translated={tr.team.members[m.key]}
              dir={dir}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
