import { motion } from "framer-motion";

type TeamCardProps = {
  member: any;
  translated: any;
  dir: "rtl" | "ltr";
  index: number;
};

export function TeamCard({ member, translated, dir, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, rotateX: 2, rotateY: index % 2 ? -3 : 3 }}
      className="group relative overflow-hidden rounded-3xl glass glow-border p-4 transform-gpu perspective-card sm:p-6"
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan/80 to-transparent" />
      <div className="absolute -right-16 top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-35" style={{ background: "var(--gradient-primary)" }} />
      <div className="grid gap-5 sm:grid-cols-[210px_1fr] sm:items-center">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] sm:max-w-none">
          <div className="absolute inset-0 rounded-3xl blur-xl opacity-60" style={{ background: "var(--gradient-primary)" }} />
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-primary/30 font-display text-4xl font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <span aria-hidden="true">{member.initials}</span>
            <img src={member.image} alt={`${member.name} portrait`} className="absolute inset-0 z-10 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.08]" />
          </div>
        </div>
        <div className={dir === "rtl" ? "text-center sm:text-right" : "text-center sm:text-left"}>
          <div className="mx-auto inline-flex rounded-full border border-cyan/40 bg-card/55 px-3 py-1 text-xs text-muted-foreground sm:mx-0">
            {translated.role}
          </div>
          <h3 className="mt-4 text-2xl font-semibold">{member.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{translated.bio}</p>
          <div className={`mt-4 flex flex-wrap justify-center gap-2 ${dir === "rtl" ? "sm:justify-end" : "sm:justify-start"}`}>
            {translated.focus.map((item: string) => (
              <span key={item} className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted-foreground">{item}</span>
            ))}
          </div>
          <div className={`mt-5 flex items-center justify-center gap-3 ${dir === "rtl" ? "sm:justify-end" : "sm:justify-start"}`}>
            {member.links.map((link: any) => (
              <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} aria-label={link.label} title={link.label} className="grid h-11 w-11 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition-all hover:-translate-y-1 hover:border-cyan/70 hover:text-foreground hover:shadow-[0_0_24px_oklch(0.68_0.22_28_/_0.2)]">
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
