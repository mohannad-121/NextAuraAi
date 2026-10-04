import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

function BenefitArtwork({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="con-why-art con-why-art-1" aria-hidden="true">
        <div className="con-benefit-dashboard">
          <span className="con-benefit-status">LIVE</span>
          <b>One clear system</b>
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  if (index === 1)
    return (
      <div className="con-why-art con-why-art-2" aria-hidden="true">
        <svg className="con-benefit-flow" viewBox="0 0 320 190">
          <path d="M38 132 C92 28 205 37 277 95" />
          <circle cx="38" cy="132" r="12" />
          <circle cx="158" cy="54" r="17" />
          <circle cx="277" cy="95" r="12" />
        </svg>
        <span className="con-benefit-agent">AI</span>
      </div>
    );
  return (
    <div className="con-why-art con-why-art-3" aria-hidden="true">
      <div className="con-benefit-stages">
        <span>01</span>
        <span>02</span>
        <span>03</span>
      </div>
      <div className="con-benefit-release">
        <b>Ready</b>
        <i />
      </div>
    </div>
  );
}

export function WhyChoose() {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].benefits;
  return (
    <section className="con-why con-section" dir={dir}>
      <div className="con-section-head">
        <span className="con-section-label">{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </div>
      <div className="con-why-grid">
        {copy.items.slice(0, 3).map((item, index) => (
          <article className="con-why-card" key={item.title}>
            <BenefitArtwork index={index} />
            <div className="con-why-copy">
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="con-why-after">
        <strong>{copy.items[3].title}.</strong> {copy.items[3].description}
      </p>
    </section>
  );
}
