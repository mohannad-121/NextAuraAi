import { ArrowUpRight } from "lucide-react";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

const portfolioProjects = [
  {
    id: "aiFitCoach",
    image: "/images/cinematic/ai-fit-coach.png",
    url: "https://aifitcoach.dev/",
    accent: "fitcoach",
  },
  {
    id: "auraWallet",
    image: "/images/cinematic/aura-wallet.png",
    url: "https://finance-tracker-aurawallet-eight.vercel.app/",
    accent: "wallet",
  },
  {
    id: "letsBake",
    image: "/images/cinematic/lets-bake.png",
    url: "https://let-s-bake-premium-hub.vercel.app/",
    accent: "bake",
  },
  {
    id: "arzanaArabia",
    image: "/images/cinematic/saudi.png",
    url: "https://arzanaco.com/",
    accent: "arzana",
  },
  {
    id: "alKamalRestaurant",
    image: "https://alkamalrestaurant.com/images/storefront.jpg",
    url: "https://alkamalrestaurant.com/",
    accent: "kamal",
  },
  {
    id: "tasweq",
    image: "https://www.tasweq.store/logo.jpg",
    url: "https://www.tasweq.store/",
    accent: "tasweq",
  },
] as const;

type PortfolioProject = (typeof portfolioProjects)[number];

function ProjectLink({
  project,
  label,
  accessibleLabel,
}: {
  project: PortfolioProject;
  label: string;
  accessibleLabel: string;
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleLabel}
      className="premium-button premium-button-primary portfolio-project-link"
    >
      <span>{label}</span>
      <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 rtl:-scale-x-100" />
    </a>
  );
}

export function FeaturedProject(_: { onStartProject: () => void }) {
  const { language, dir } = useLanguage();
  const content = homepageContent[language].featured;
  return (
    <section
      aria-labelledby="portfolio-showcase-title"
      aria-describedby="portfolio-showcase-description"
      className="portfolio-showcase homepage-section"
      dir={dir}
    >
      <div className="portfolio-readability-layer" aria-hidden="true" />
      <div className="portfolio-atmosphere" aria-hidden="true">
        <span className="portfolio-ambient portfolio-ambient-violet" />
        <span className="portfolio-ambient portfolio-ambient-cyan" />
      </div>

      <div className="homepage-container portfolio-content-layer">
        <header className="portfolio-intro max-w-4xl">
          <div className="section-eyebrow">{content.eyebrow}</div>
          <h2
            id="portfolio-showcase-title"
            className="mt-5 text-balance text-4xl font-semibold leading-[1.08] text-[var(--primary-text)] sm:text-5xl"
          >
            {content.title}
          </h2>
          <p
            id="portfolio-showcase-description"
            className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg"
          >
            {content.body}
          </p>
        </header>

        <div className="portfolio-project-grid mt-10">
            {portfolioProjects.map((project) => {
              const projectCopy = content.projects[project.id];

              return (
                <article
                  key={project.id}
                  className={`portfolio-project-card portfolio-project-compact portfolio-accent-${project.accent}`}
                >
                  <div className="portfolio-project-visual portfolio-project-compact-visual">
                    <img
                      src={project.image}
                      alt={projectCopy.imageAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="portfolio-project-copy portfolio-project-compact-copy">
                    <div className="portfolio-category text-sm">{projectCopy.category}</div>
                    <h3 className="mt-2 text-xl font-semibold leading-tight text-white">
                      {projectCopy.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {projectCopy.description}
                    </p>

                    <ProjectLink
                      project={project}
                      label={projectCopy.cta}
                      accessibleLabel={projectCopy.externalLabel}
                    />
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
}
