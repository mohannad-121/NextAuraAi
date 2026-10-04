import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

const projects = [
  {
    id: "aiFitCoach",
    image: "/images/cinematic/NextAura FIT.jpg",
    url: "https://aifitcoach.dev/",
    objectPosition: "center center",
  },
  {
    id: "letsBake",
    image: "/images/cinematic/lets-bake.png",
    url: "https://let-s-bake-premium-hub.vercel.app/",
    objectPosition: "center center",
  },
  {
    id: "arzanaArabia",
    image: "/images/cinematic/saudi.png",
    url: "https://arzanaco.com/",
    objectPosition: "center center",
  },
  {
    id: "alKamalRestaurant",
    image: "https://alkamalrestaurant.com/images/storefront.jpg",
    url: "https://alkamalrestaurant.com/",
    objectPosition: "center center",
  },
  {
    id: "tasweq",
    image: "https://www.tasweq.store/logo.jpg",
    url: "https://www.tasweq.store/",
    objectPosition: "center center",
  },
] as const;

export function FeaturedProject(_: { onStartProject: () => void }) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].featured;
  const [index, setIndex] = useState(1);
  const project = projects[index];
  const detail = copy.projects[project.id];
  const move = (direction: number) =>
    setIndex((current) => (current + direction + projects.length) % projects.length);

  return (
    <section className="con-projects con-section" dir={dir}>
      <div className="con-section-head">
        <span className="con-section-label">{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </div>
      <div className="con-project-stage">
        <button
          type="button"
          className="con-project-arrow con-project-prev"
          onClick={() => move(-1)}
          aria-label="Previous project"
        >
          <ArrowLeft size={22} />
        </button>
        <article className="con-project-feature" key={project.id}>
          <div className="con-project-image">
            <img
              src={project.image}
              alt={detail.imageAlt}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: project.objectPosition }}
            />
          </div>
          <div className="con-project-info">
            <span className="con-project-category">
              {detail.category}{" "}
              <b>
                0{index + 1} / 0{projects.length}
              </b>
            </span>
            <h3>{detail.title.replace(/\s*[—–]\s*/g, " ")}</h3>
            <p>{detail.description}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={detail.externalLabel}
              className="con-inline-link"
            >
              {detail.cta}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <div className="con-project-facts">
              <span>{detail.category}</span>
              <span>NextAura AI</span>
              <span>
                {language === "ar"
                  ? "مشروع حي"
                  : language === "es"
                    ? "Proyecto en vivo"
                    : "Live project"}
              </span>
            </div>
          </div>
        </article>
        <button
          type="button"
          className="con-project-arrow con-project-next"
          onClick={() => move(1)}
          aria-label="Next project"
        >
          <ArrowRight size={22} />
        </button>
      </div>
      <div className="con-project-pagination" role="group" aria-label="Select project">
        {projects.map((item, position) => (
          <button
            type="button"
            key={item.id}
            className={index === position ? "is-active" : ""}
            onClick={() => setIndex(position)}
            aria-label={copy.projects[item.id].title}
            aria-current={index === position ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
