import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { ProjectPageTail } from "@/components/landing/ProjectPageTail";
import { socialBrandClassName } from "@/components/landing/socialBrandStyles";
import { founderProfiles, founderUi, type FounderId } from "@/features/founders/founderProfiles";
import { useLanguage } from "@/i18n/translations";

export function FounderProfilePage({ founderId }: { founderId: FounderId }) {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const profile = founderProfiles[founderId];
  const copy = founderUi[language];

  return (
    <div className="min-h-screen overflow-x-clip bg-[#050b19] text-white" dir={dir}>
      <Nav internalPage onStartProject={() => navigate({ to: "/start-project" })} />

      <main className="pt-28 sm:pt-32">
        <section className="relative border-b border-white/10 bg-[radial-gradient(circle_at_85%_15%,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_10%_22%,rgba(139,92,246,0.16),transparent_30%)]">
          <div className="homepage-container grid gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,0.96fr)_minmax(20rem,0.8fr)] lg:items-center lg:gap-14 lg:py-20">
            <div className="order-2 lg:order-1">
              <Link
                to="/"
                hash="team"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 text-sm font-medium text-slate-200 transition-colors duration-200 hover:border-cyan-200/60 hover:text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                {copy.backToFounders}
              </Link>
              <p className="mt-8 font-mono text-xs font-semibold tracking-[0.22em] text-cyan-200">
                {copy.profile}
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                {profile.displayName}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-cyan-100 sm:text-xl">
                {profile.headline[language]}
              </p>
              <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                {profile.location[language]}
              </div>
              <p className="mt-8 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {profile.summary[language]}
              </p>
              <ProfileLinks profile={profile} labels={copy} />
            </div>

            <div className="order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-slate-900/60 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                <div className="aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-slate-900">
                  <img
                    src={profile.image}
                    alt={`${profile.displayName}, ${profile.headline[language]}`}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: profile.imagePosition }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="homepage-container grid gap-5 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.65fr)] lg:items-stretch">
          <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <SectionTitle icon={BriefcaseBusiness} title={copy.currentRole} />
            <h2 className="mt-5 text-2xl font-semibold text-white">
              {profile.currentRole.title[language]}
            </h2>
            <p className="mt-2 text-sm text-cyan-200">
              {profile.currentRole.period[language]} <span className="mx-2 text-slate-600">•</span>{" "}
              {profile.currentRole.arrangement[language]}
            </p>
            <p className="mt-5 max-w-3xl leading-8 text-slate-300">
              {profile.currentRole.summary[language]}
            </p>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-slate-300">
              {profile.currentRole.responsibilities[language].map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </article>

          <aside className="h-full rounded-3xl border border-cyan-200/15 bg-cyan-200/[0.045] p-6 sm:p-8">
            <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-cyan-200">
              {copy.capabilities}
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.capabilities.map((capability) => (
                <Tag key={capability}>{capability}</Tag>
              ))}
            </div>
          </aside>
        </section>

        <section className="border-y border-white/10 bg-[#071226]">
          <div className="homepage-container py-14 sm:py-20">
            <SectionTitle title={copy.projects} />
            <div className="mt-7 grid auto-rows-fr gap-5 lg:grid-cols-2">
              {profile.projects.map((project) => (
                <article
                  key={project.name}
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition-colors duration-200 hover:border-cyan-200/30 sm:p-7"
                >
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  <p className="mt-4 leading-7 text-slate-300">{project.description[language]}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <Tag key={technology}>{technology}</Tag>
                    ))}
                  </div>
                  <h4 className="mt-6 text-sm font-semibold text-cyan-100">{copy.contributions}</h4>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300">
                    {project.contributions[language].map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                  {project.outcomes ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.outcomes.map((outcome) => (
                        <span
                          key={outcome}
                          className="rounded-full border border-violet-300/30 bg-violet-300/10 px-3 py-1.5 text-xs font-semibold text-violet-100"
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {project.repository ? (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${socialBrandClassName(project.repository, "GitHub", "compact")} mt-6 w-fit`}
                    >
                      {copy.viewRepository}
                      <ExternalLink className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="homepage-container py-14 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
            <div>
              <SectionTitle title={copy.experience} />
              <div className="mt-6 grid gap-5">
                {profile.experience.map((role) => (
                  <article
                    key={`${role.organization}-${role.period.en}`}
                    className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
                  >
                    <h3 className="text-xl font-semibold text-white">{role.title[language]}</h3>
                    <p className="mt-1 font-medium text-cyan-200">{role.organization}</p>
                    <p className="mt-2 text-sm text-slate-400">
                      {role.period[language]} · {role.location[language]} ·{" "}
                      {role.arrangement[language]}
                    </p>
                    <p className="mt-4 leading-7 text-slate-300">{role.description[language]}</p>
                    <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-300">
                      {role.highlights[language].map((item) => (
                        <CheckItem key={item}>{item}</CheckItem>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <SectionTitle title={copy.skills} />
              <div className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2">
                {profile.skills.map((group) => (
                  <article
                    key={group.title.en}
                    className="h-full rounded-3xl border border-white/10 bg-white/[0.035] p-5"
                  >
                    <h3 className="text-sm font-semibold text-cyan-100">{group.title[language]}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.values.map((value) => (
                        <Tag key={value}>{value}</Tag>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#071226]">
          <div className="homepage-container grid gap-5 py-14 sm:py-20 lg:grid-cols-2 lg:items-stretch">
            <article className="h-full rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <SectionTitle title={copy.education} />
              <h3 className="mt-5 text-2xl font-semibold text-white">
                {profile.education.degree[language]}
              </h3>
              <p className="mt-2 text-cyan-200">{profile.education.institution}</p>
              <p className="mt-2 text-sm text-slate-400">
                {profile.education.period[language]} · {profile.education.result[language]}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {profile.education.focus[language].map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </article>
            <article className="h-full rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <SectionTitle title={copy.achievements} />
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-300">
                {profile.achievements[language].map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="homepage-container grid gap-8 py-14 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <article>
            <SectionTitle title={copy.certifications} />
            <div className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2">
              {profile.certifications.map((certification) => (
                <article
                  key={certification.provider}
                  className="h-full rounded-3xl border border-white/10 bg-white/[0.035] p-6"
                >
                  <h3 className="font-semibold text-white">{certification.provider}</h3>
                  <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300">
                    {certification.items.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </article>
          <div className="grid content-start gap-5">
            <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              <SectionTitle title={copy.languages} />
              <dl className="mt-5 grid gap-3">
                {profile.languages.map((item) => (
                  <div
                    key={item.language.en}
                    className="flex items-center justify-between gap-4 border-b border-white/8 pb-3 text-sm"
                  >
                    <dt className="font-semibold text-white">{item.language[language]}</dt>
                    <dd className="text-end text-slate-400">{item.level[language]}</dd>
                  </div>
                ))}
              </dl>
            </article>
            {profile.volunteering ? (
              <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
                <SectionTitle title={copy.volunteering} />
                <div className="mt-5 grid gap-5">
                  {profile.volunteering.map((item) => (
                    <div key={item.organization}>
                      <h3 className="font-semibold text-white">{item.organization}</h3>
                      <p className="mt-1 text-xs text-cyan-200">{item.period[language]}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {item.description[language]}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.13),transparent_52%)]">
          <div className="homepage-container flex flex-col items-start justify-between gap-6 py-14 sm:flex-row sm:items-center sm:py-16">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-cyan-200">
                NEXAURA AI
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{copy.connect}</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate({ to: "/start-project" })}
              className="premium-button premium-button-primary min-h-11 px-5"
            >
              {copy.startProject}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>
      <ProjectPageTail />
    </div>
  );
}

function ProfileLinks({
  profile,
  labels,
}: {
  profile: (typeof founderProfiles)[FounderId];
  labels: Record<string, string>;
}) {
  const links = [
    { label: labels.linkedin, href: profile.links.linkedin, icon: Linkedin },
    { label: labels.github, href: profile.links.github, icon: Github },
    { label: labels.email, href: profile.links.email, icon: Mail },
  ];
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={socialBrandClassName(link.href, link.label, "pill")}
        >
          <link.icon className="h-4 w-4" aria-hidden="true" />
          {link.label}
        </a>
      ))}
    </div>
  );
}

function SectionTitle({ title, icon: Icon }: { title: string; icon?: typeof BriefcaseBusiness }) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.18em] text-cyan-200">
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      {title}
    </div>
  );
}

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />{" "}
      <span>{children}</span>
    </li>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-slate-200">
      {children}
    </span>
  );
}
