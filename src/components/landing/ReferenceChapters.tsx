import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

function FloatingTechnologyField({ labels }: { labels: string[] }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const field = fieldRef.current;
    const items = itemRefs.current.filter((item): item is HTMLSpanElement => Boolean(item));
    if (!field || items.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    type Body = {
      element: HTMLSpanElement;
      x: number;
      y: number;
      width: number;
      height: number;
      vx: number;
      vy: number;
    };
    let bodies: Body[] = [];
    let frame = 0;
    let previousTime = performance.now();
    let visible = false;

    const initialize = () => {
      field.classList.add("is-floating");
      const bounds = field.getBoundingClientRect();
      const columns = window.innerWidth < 600 ? 2 : 4;
      const rows = Math.ceil(items.length / columns);
      const cellWidth = bounds.width / columns;
      const cellHeight = bounds.height / rows;
      const speedScale = window.innerWidth < 600 ? 0.58 : 1;
      bodies = items.map((element, index) => {
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const column = index % columns;
        const row = Math.floor(index / columns);
        const angle = 0.73 + index * 1.71;
        const speed = (0.018 + (index % 5) * 0.0035) * speedScale;
        const x = Math.max(12, column * cellWidth + (cellWidth - width) / 2);
        const y = Math.max(12, row * cellHeight + (cellHeight - height) / 2);
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        return {
          element,
          x,
          y,
          width,
          height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      });
    };

    const animate = (time: number) => {
      const delta = Math.min(32, time - previousTime);
      previousTime = time;
      if (visible && !document.hidden) {
        const bounds = field.getBoundingClientRect();
        const padding = 10;
        const coreSize = Math.min(174, bounds.width * 0.28);
        const core = {
          left: (bounds.width - coreSize) / 2 - 12,
          right: (bounds.width + coreSize) / 2 + 12,
          top: (bounds.height - coreSize) / 2 - 12,
          bottom: (bounds.height + coreSize) / 2 + 12,
        };

        bodies.forEach((body) => {
          let nextX = body.x + body.vx * delta;
          let nextY = body.y + body.vy * delta;
          if (nextX <= padding || nextX + body.width >= bounds.width - padding) {
            body.vx *= -1;
            nextX = Math.min(bounds.width - body.width - padding, Math.max(padding, nextX));
          }
          if (nextY <= padding || nextY + body.height >= bounds.height - padding) {
            body.vy *= -1;
            nextY = Math.min(bounds.height - body.height - padding, Math.max(padding, nextY));
          }
          const hitsCore =
            nextX < core.right &&
            nextX + body.width > core.left &&
            nextY < core.bottom &&
            nextY + body.height > core.top;
          if (hitsCore) {
            body.vx *= -1;
            body.vy *= -1;
            nextX = body.x + body.vx * delta;
            nextY = body.y + body.vy * delta;
          }
          body.x = nextX;
          body.y = nextY;
          body.element.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
        });
        for (let first = 0; first < bodies.length; first += 1) {
          for (let second = first + 1; second < bodies.length; second += 1) {
            const a = bodies[first];
            const b = bodies[second];
            const overlaps =
              a.x < b.x + b.width + 5 &&
              a.x + a.width + 5 > b.x &&
              a.y < b.y + b.height + 5 &&
              a.y + a.height + 5 > b.y;
            if (!overlaps) continue;
            const overlapX = Math.min(a.x + a.width - b.x, b.x + b.width - a.x) + 6;
            const overlapY = Math.min(a.y + a.height - b.y, b.y + b.height - a.y) + 6;
            if (overlapX < overlapY) {
              const push = overlapX / 2;
              const aIsLeft = a.x + a.width / 2 < b.x + b.width / 2;
              a.x += aIsLeft ? -push : push;
              b.x += aIsLeft ? push : -push;
              a.vx *= -1;
              b.vx *= -1;
            } else {
              const push = overlapY / 2;
              const aIsAbove = a.y + a.height / 2 < b.y + b.height / 2;
              a.y += aIsAbove ? -push : push;
              b.y += aIsAbove ? push : -push;
              a.vy *= -1;
              b.vy *= -1;
            }
            a.x = Math.min(bounds.width - a.width - padding, Math.max(padding, a.x));
            a.y = Math.min(bounds.height - a.height - padding, Math.max(padding, a.y));
            b.x = Math.min(bounds.width - b.width - padding, Math.max(padding, b.x));
            b.y = Math.min(bounds.height - b.height - padding, Math.max(padding, b.y));
            a.element.style.transform = `translate3d(${a.x}px, ${a.y}px, 0)`;
            b.element.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
          }
        }
      }
      frame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        previousTime = performance.now();
      },
      { rootMargin: "100px" },
    );
    const resizeObserver = new ResizeObserver(initialize);
    observer.observe(field);
    resizeObserver.observe(field);
    initialize();
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      field.classList.remove("is-floating");
      items.forEach((item) => item.removeAttribute("style"));
    };
  }, [labels]);

  return (
    <div ref={fieldRef} className="con-ecosystem-grid">
      {labels.map((item, index) => (
        <span
          key={item}
          ref={(element) => {
            itemRefs.current[index] = element;
          }}
        >
          {item}
        </span>
      ))}
      <div className="con-ecosystem-core" aria-hidden="true">
        <small>NEXTAURA</small>
        <strong>NA</strong>
        <i />
      </div>
    </div>
  );
}

export function EcosystemChapter() {
  const { language, dir } = useLanguage();
  const labels = [
    "React",
    "TypeScript",
    "Python",
    "FastAPI",
    "PyTorch",
    "OpenCV",
    "Supabase",
    "APIs",
    "RAG",
    "Kotlin",
    "Machine Learning",
    "Computer Vision",
  ];
  const heading =
    language === "ar"
      ? "المنظومة التقنية"
      : language === "es"
        ? "Ecosistema tecnológico"
        : "Technology ecosystem";
  const body =
    language === "ar"
      ? "تقنيات مستخدمة في مشاريعنا ومنصاتنا الفعلية."
      : language === "es"
        ? "Tecnologías presentes en nuestros proyectos y plataformas reales."
        : "Technologies used across our real projects and platforms.";
  return (
    <section className="con-ecosystem con-section" dir={dir}>
      <div className="con-section-head">
        <span className="con-section-label">NEXTAURA AI</span>
        <h2>{heading}</h2>
      </div>
      <FloatingTechnologyField labels={labels} />
      <p>{body}</p>
    </section>
  );
}

export function FaqChapter() {
  const { language, dir } = useLanguage();
  const content = homepageContent[language];
  const questions =
    language === "ar"
      ? [
          "ماذا تبنون؟",
          "كيف تبدأ المشاريع؟",
          "هل يمكنكم دمج الذكاء الاصطناعي والأتمتة؟",
          "ماذا يحدث بعد الإطلاق؟",
        ]
      : language === "es"
        ? [
            "¿Qué construyen?",
            "¿Cómo comienza un proyecto?",
            "¿Pueden integrar IA y automatización?",
            "¿Qué sucede después del lanzamiento?",
          ]
        : [
            "What does NextAura build?",
            "How does a project begin?",
            "Can you integrate AI and automation?",
            "What happens after launch?",
          ];
  const answers = [
    content.services.body,
    content.process.steps[0].description,
    content.services.items[1].description,
    content.process.steps[3].description,
  ];
  const [active, setActive] = useState<number | null>(0);
  return (
    <section className="con-faq con-section" dir={dir}>
      <div className="con-section-head">
        <span className="con-section-label">FAQ</span>
        <h2>
          {language === "ar"
            ? "الأسئلة الشائعة"
            : language === "es"
              ? "Preguntas frecuentes"
              : "Common questions"}
        </h2>
      </div>
      <div className="con-faq-list">
        {questions.map((question, index) => (
          <article className={`con-faq-item ${active === index ? "is-open" : ""}`} key={question}>
            <button
              type="button"
              onClick={() => setActive(active === index ? null : index)}
              aria-expanded={active === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="con-faq-number">{index + 1}</span>
              <span>{question}</span>
              <span className="con-faq-toggle">
                {active === index ? <X size={19} /> : <Plus size={19} />}
              </span>
            </button>
            <div id={`faq-answer-${index}`} className="con-faq-answer">
              <div>
                <p>{answers[index]}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
