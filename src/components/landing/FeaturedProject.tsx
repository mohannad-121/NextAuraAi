import { ArrowUpRight, Check } from "lucide-react";
import { CinematicCard } from "@/components/landing/CinematicCard";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

export function FeaturedProject({ onStartProject }: { onStartProject: () => void }) {
  const { language, tr, dir } = useLanguage();
  const featured = homepageContent[language].featured;
  const work = homepageContent[language].work;
  const primaryProject = work.items[0];
  const supportingProjects = work.items.slice(1, 3);

  return (
    <section id="projects" className="homepage-section homepage-environment-alt relative" dir={dir}>
      <div className="homepage-container">
        <SectionHeading
          eyebrow={featured.eyebrow}
          title={featured.title}
          body={featured.body}
          className="max-w-4xl"
        />

        <CinematicCard className="mt-12 overflow-hidden !p-0">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="aspect-[16/10] min-w-0 overflow-hidden bg-[#071020] lg:aspect-auto lg:h-full lg:min-h-[31rem]">
              <img
                src={primaryProject.image}
                alt={primaryProject.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative z-10 flex min-w-0 flex-col justify-center bg-[var(--card-background)] p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-2 text-sm text-cyan-300">
                <span>{primaryProject.category}</span>
                <span aria-hidden="true" className="text-slate-600">
                  /
                </span>
                <span className="text-slate-400">{primaryProject.status}</span>
              </div>

              <div className="mt-7 space-y-6">
                <div>
                  <div className="text-sm font-semibold text-white">{tr.caseStudy.problem}</div>
                  <p className="mt-2 text-base leading-7 text-[var(--secondary-text)]">
                    {tr.caseStudy.problemText}
                  </p>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{tr.caseStudy.solution}</div>
                  <p className="mt-2 text-base leading-7 text-[var(--secondary-text)]">
                    {tr.caseStudy.solutionText}
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-start gap-3 rounded-xl border border-cyan-300/15 bg-cyan-300/6 p-4 text-sm leading-6 text-slate-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span>{featured.features[0]}</span>
              </div>

              <a
                href="https://fit-coach-ai-frontend.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button premium-button-primary mt-8 w-fit justify-center"
              >
                {featured.liveDemo}
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </a>
            </div>
          </div>
        </CinematicCard>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {supportingProjects.map((project) => (
            <CinematicCard
              key={project.name}
              className="grid gap-5 sm:grid-cols-[11rem_1fr] sm:items-center"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#071020]">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-medium text-cyan-300">{project.category}</div>
                <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">
                  {project.description}
                </p>
                <button
                  type="button"
                  onClick={onStartProject}
                  className="mt-4 inline-flex min-h-10 cursor-pointer items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
                >
                  {work.view}
                  <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                </button>
              </div>
            </CinematicCard>
          ))}
        </div>
      </div>
    </section>
  );
}
