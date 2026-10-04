import { ArrowUpRight } from "lucide-react";
import { homepageContent } from "@/i18n/homepageContent";
import { cinematicJourneyContent } from "@/i18n/cinematicJourneyContent";
import { useLanguage } from "@/i18n/translations";

function ServiceArtwork({ kind }: { kind: number }) {
  if (kind === 0)
    return (
      <div className="con-art con-art-browser" aria-hidden="true">
        <div className="con-browser">
          <div className="con-browser-top">
            <i />
            <i />
            <i />
          </div>
          <div className="con-browser-hero">
            <b>NA</b>
            <span />
            <span />
          </div>
          <div className="con-browser-tiles">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="con-browser-float">
          <span>↗</span>
          <i />
          <i />
        </div>
      </div>
    );
  if (kind === 1)
    return (
      <div className="con-art con-art-chat" aria-hidden="true">
        <div className="con-chat-orb">✦</div>
        <div className="con-chat-bubble con-chat-bubble-one">
          <i />
          <i />
          <i />
        </div>
        <div className="con-chat-bubble con-chat-bubble-two">
          <span />
          <span />
        </div>
        <div className="con-chat-bubble con-chat-bubble-three">
          <i />
          <i />
        </div>
      </div>
    );
  if (kind === 2)
    return (
      <div className="con-art con-art-dashboard" aria-hidden="true">
        <div className="con-dashboard">
          <div className="con-dashboard-top">
            <i />
            <span />
          </div>
          <div className="con-chart">
            <svg viewBox="0 0 300 90" preserveAspectRatio="none">
              <path
                d="M0 77 C45 70 52 23 91 47 S153 71 183 35 S251 48 300 7"
                fill="none"
                stroke="url(#line)"
                strokeWidth="4"
              />
              <defs>
                <linearGradient id="line">
                  <stop stopColor="#d4aaff" />
                  <stop offset=".5" stopColor="#ffe1b8" />
                  <stop offset="1" stopColor="#7ab7ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="con-dashboard-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    );
  if (kind === 3)
    return (
      <div className="con-art con-art-commerce" aria-hidden="true">
        <div className="con-commerce-product">
          <div className="con-commerce-shape" />
          <i />
          <i />
        </div>
        <div className="con-commerce-tag">↗</div>
      </div>
    );
  return (
    <div className="con-art con-art-network" aria-hidden="true">
      <span className="con-network-center">NA</span>
      <span className="con-network-node node-a">A</span>
      <span className="con-network-node node-b">ع</span>
      <span className="con-network-node node-c">E</span>
      <span className="con-network-ring" />
    </div>
  );
}

export function ServicesUniverse({ onStartProject }: { onStartProject: () => void }) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].services;
  const foundation = cinematicJourneyContent[language].foundation.groups.flat();
  const items = [
    { ...copy.items[0], kind: 0 },
    { ...copy.items[1], kind: 1 },
    { ...copy.items[2], kind: 2 },
    { ...foundation[2], examples: [] as string[], kind: 3 },
    { ...foundation[5], examples: [] as string[], kind: 4 },
  ];
  return (
    <section className="con-services con-section" dir={dir}>
      <div className="con-section-head">
        <span className="con-section-label">{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </div>
      <div className="con-service-grid">
        {items.map((item, index) => (
          <article key={item.title} className={`con-service-card con-service-card-${index + 1}`}>
            <ServiceArtwork kind={item.kind} />
            <div className="con-service-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            {item.examples.length > 0 && (
              <ul>
                {item.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
      <button type="button" onClick={onStartProject} className="con-primary-button">
        {copy.cta}
        <ArrowUpRight size={17} aria-hidden="true" />
      </button>
    </section>
  );
}
