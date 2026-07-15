import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-viewport-activity";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

const portfolioProjects = [
  {
    id: "aiFitCoach",
    featured: true,
    image: "/images/cinematic/ai-fit-coach.png",
    url: "https://aifitcoach.dev/",
    accent: "fitcoach",
  },
  {
    id: "auraWallet",
    featured: false,
    image: "/images/cinematic/aura-wallet.png",
    url: "https://finance-tracker-aurawallet-eight.vercel.app/",
    accent: "wallet",
  },
  {
    id: "letsBake",
    featured: false,
    image: "/images/cinematic/lets-bake.png",
    url: "https://let-s-bake-premium-hub.vercel.app/",
    accent: "bake",
  },
] as const;

type PortfolioProject = (typeof portfolioProjects)[number];

function PortfolioBackgroundVideo({ reducedMotion }: { reducedMotion: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry?.isIntersecting ?? false),
      { rootMargin: "400px 0px", threshold: 0.01 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion || !isNearViewport) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Muted autoplay may still be rejected by a browser or device policy.
    });
  }, [isNearViewport, reducedMotion]);

  return (
    <video
      ref={videoRef}
      src="/videos/our-websites.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      controls={false}
      disablePictureInPicture
      aria-hidden="true"
      className="portfolio-background-video"
    />
  );
}

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
  const reducedMotion = usePrefersReducedMotion();
  const [featuredProject, ...supportingProjects] = portfolioProjects;
  const featuredCopy = content.projects[featuredProject.id];

  return (
    <section
      id="projects"
      aria-labelledby="portfolio-showcase-title"
      aria-describedby="portfolio-showcase-description"
      className="portfolio-showcase homepage-section"
      dir={dir}
    >
      <div className="portfolio-media-layer" aria-hidden="true">
        <PortfolioBackgroundVideo reducedMotion={reducedMotion} />
      </div>
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

        <div className="portfolio-projects-reveal mt-10">
          <article
            className={`portfolio-project-card portfolio-project-featured portfolio-accent-${featuredProject.accent}`}
          >
            <div className="portfolio-project-visual portfolio-fitcoach-visual">
              <img
                src={featuredProject.image}
                alt={featuredCopy.imageAlt}
                decoding="async"
                className="portfolio-fitcoach-image"
              />
            </div>

            <div className="portfolio-project-copy portfolio-featured-copy">
              <div className="flex flex-wrap items-center gap-2.5 text-sm">
                <span className="portfolio-category">{featuredCopy.category}</span>
                <span className="portfolio-project-badge">{featuredCopy.badge}</span>
              </div>
              <h3 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {featuredCopy.title}
              </h3>
              <p className="mt-5 text-base leading-7 text-slate-300">{featuredCopy.description}</p>

              <ul className="portfolio-feature-grid mt-6" aria-label={featuredCopy.featuresLabel}>
                {featuredCopy.features.map((feature) => (
                  <li key={feature}>
                    <Check aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2" aria-label={featuredCopy.servicesLabel}>
                {featuredCopy.tags.map((tag) => (
                  <span key={tag} className="portfolio-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <ProjectLink
                project={featuredProject}
                label={featuredCopy.cta}
                accessibleLabel={featuredCopy.externalLabel}
              />
            </div>
          </article>

          <div className="portfolio-supporting-grid">
            {supportingProjects.map((project) => {
              const projectCopy = content.projects[project.id];

              return (
                <article
                  key={project.id}
                  className={`portfolio-project-card portfolio-project-supporting portfolio-accent-${project.accent}`}
                >
                  <div className="portfolio-project-visual portfolio-supporting-visual">
                    <img
                      src={project.image}
                      alt={projectCopy.imageAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="portfolio-project-copy portfolio-supporting-copy">
                    <div className="portfolio-category text-sm">{projectCopy.category}</div>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
                      {projectCopy.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                      {projectCopy.description}
                    </p>

                    <ul
                      className="portfolio-supporting-features"
                      aria-label={projectCopy.featuresLabel}
                    >
                      {projectCopy.features.map((feature) => (
                        <li key={feature}>
                          <Check aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

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
      </div>
    </section>
  );
}
