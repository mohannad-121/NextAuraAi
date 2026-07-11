import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight, Network } from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { DepthIndicator } from "@/components/landing/DepthIndicator";
import {
  EnergyCore,
  NeuralCoreVisualization,
  ParticleLayer,
  ServiceCard,
  WorkflowVisualization,
} from "@/components/landing/DepthVisuals";
import {
  cinematicJourneyContent,
  type JourneySectionContent,
} from "@/i18n/cinematicJourneyContent";
import { useLanguage } from "@/i18n/translations";

type CinematicDepthJourneyProps = { onStartProject: () => void };

// Primary cinematic controls. Values are intentionally centralized for easy art direction.
const AUTOMATION_PIN_DURATION = 2.2;
const INTELLIGENCE_PIN_DURATION = 2.3;
const MOBILE_SCROLL_DURATION = 1.55;
const FOUNDATION_PARALLAX = 42;
const DEEP_PARALLAX = 58;
const CARD_REVEAL_DURATION = 0.16;
const WORKFLOW_SPEED = 0.64;
const AI_CORE_ROTATION = 22;
const FINAL_CORE_BRIGHTNESS = 1.24;
const PARTICLE_COUNTS = { foundation: 22, automation: 26, intelligence: 28, core: 24 };

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function SectionHeading({ copy }: { copy: JourneySectionContent }) {
  return (
    <header data-scene-copy className="relative z-10 max-w-3xl">
      <p className="section-eyebrow">{copy.eyebrow}</p>
      <h2 className="mt-5 text-balance font-display text-[clamp(2.35rem,5.3vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.052em] text-white [text-shadow:0_4px_26px_rgb(0_0_0_/_0.42)]">
        {copy.title}
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300/78 sm:text-lg sm:leading-8">
        {copy.body}
      </p>
    </header>
  );
}

function FoundationSection({ copy }: { copy: JourneySectionContent }) {
  let serviceIndex = 0;
  return (
    <section
      id="depth-foundation"
      data-depth-section="foundation"
      className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_74%_14%,rgb(124_58_237_/_0.18),transparent_30%),radial-gradient(circle_at_18%_48%,rgb(115_75_53_/_0.2),transparent_35%),linear-gradient(180deg,#151117_0%,#0c0e15_52%,#070a13_100%)] px-5 pb-28 pt-32 sm:px-8 lg:px-12 lg:pb-40 lg:pt-44"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-55 [background-image:radial-gradient(circle_at_15%_22%,rgb(255_255_255_/_0.04)_0_1px,transparent_2px),radial-gradient(circle_at_80%_60%,rgb(167_139_250_/_0.06)_0_1px,transparent_2px)] [background-size:47px_43px,68px_61px]"
      />
      <div
        data-foundation-rock
        className="absolute -left-20 top-[24%] h-72 w-72 rounded-[42%_58%_64%_36%] border border-white/5 bg-[#1a151b]/75 shadow-[inset_-20px_-24px_50px_rgb(0_0_0_/_0.5)] blur-[1px]"
      />
      <div
        data-foundation-rock
        className="absolute -right-28 top-[52%] h-96 w-96 rounded-[63%_37%_45%_55%] border border-violet-300/5 bg-[#11121a]/80 shadow-[inset_24px_-20px_60px_rgb(0_0_0_/_0.55)]"
      />
      <div
        data-digital-crack
        className="absolute left-[7%] top-[35%] h-px w-[41%] -rotate-[11deg] bg-gradient-to-r from-transparent via-violet-300/35 to-cyan-200/5 shadow-[0_0_14px_rgb(139_92_246_/_0.25)]"
      />
      <div
        data-digital-crack
        className="absolute right-[4%] top-[68%] h-px w-[45%] rotate-[14deg] bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent shadow-[0_0_12px_rgb(34_211_238_/_0.15)]"
      />
      <ParticleLayer count={PARTICLE_COUNTS.foundation} mobileCount={9} tone="earth" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading copy={copy} />
        <div className="mt-24 space-y-24 lg:mt-36 lg:space-y-36">
          {copy.groups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              data-foundation-group
              className={`grid min-h-[48svh] content-center gap-[24svh] md:gap-5 ${group.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2 lg:px-[8%]"}`}
            >
              {group.map((service) => {
                const index = serviceIndex++;
                return <ServiceCard key={service.title} service={service} index={index} />;
              })}
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-transparent via-[#070a13]/70 to-[#050816]"
      />
    </section>
  );
}

function AutomationSection({ copy }: { copy: ReturnType<typeof getCopy>["automation"] }) {
  let serviceIndex = 0;
  return (
    <section
      id="depth-automation"
      data-depth-section="automation"
      className="relative isolate bg-[#050816]"
    >
      <div
        data-automation-scene
        className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-24 sm:px-8 lg:px-12"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgb(37_99_235_/_0.16),transparent_32%),radial-gradient(circle_at_16%_70%,rgb(124_58_237_/_0.18),transparent_35%),linear-gradient(180deg,#050816,#050713_70%,#040611)]"
        />
        <div
          data-network-grid
          aria-hidden="true"
          className="grid-fade absolute inset-0 opacity-50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
        />
        <ParticleLayer count={PARTICLE_COUNTS.automation} mobileCount={10} tone="digital" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-center xl:gap-14">
          <div>
            <SectionHeading copy={copy} />
            <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/65">
              <Network className="size-4" />
              {copy.workflowLabel}
            </div>
          </div>
          <div>
            <WorkflowVisualization labels={copy.workflow} ariaLabel={copy.workflowLabel} />
            <div className="relative mt-6 min-h-[38rem] sm:min-h-[14rem]">
              {copy.groups.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  data-automation-group
                  className={`absolute inset-0 grid content-start gap-4 ${group.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
                >
                  {group.map((service) => {
                    const index = serviceIndex++;
                    return <ServiceCard key={service.title} service={service} index={index} />;
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntelligenceSection({ copy }: { copy: ReturnType<typeof getCopy>["intelligence"] }) {
  let serviceIndex = 0;
  return (
    <section
      id="depth-intelligence"
      data-depth-section="intelligence"
      className="relative isolate bg-[#040611]"
    >
      <div
        data-intelligence-scene
        className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-24 sm:px-8 lg:px-12"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_68%_44%,rgb(34_211_238_/_0.12),transparent_27%),radial-gradient(circle_at_36%_48%,rgb(109_40_217_/_0.22),transparent_36%),linear-gradient(180deg,#040611,#030510_72%,#02040c)]"
        />
        <div
          data-neural-field
          aria-hidden="true"
          className="neural-field absolute inset-0 opacity-60"
        />
        <ParticleLayer count={PARTICLE_COUNTS.intelligence} mobileCount={10} tone="digital" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 xl:grid-cols-[1fr_0.9fr] xl:items-center xl:gap-14">
          <div>
            <SectionHeading copy={copy} />
            <div className="relative mt-8 min-h-[38rem] sm:min-h-[14rem]">
              {copy.groups.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  data-intelligence-group
                  className={`absolute inset-0 grid content-start gap-4 ${group.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
                >
                  {group.map((service) => {
                    const index = serviceIndex++;
                    return <ServiceCard key={service.title} service={service} index={index} />;
                  })}
                </div>
              ))}
            </div>
          </div>
          <NeuralCoreVisualization />
        </div>
      </div>
    </section>
  );
}

function CoreSection({
  copy,
  onStartProject,
}: {
  copy: ReturnType<typeof getCopy>["core"];
  onStartProject: () => void;
}) {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="depth-core"
      data-depth-section="core"
      className="relative min-h-[165svh] bg-[#02040c]"
    >
      <div
        data-core-scene
        className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden px-5 py-20 sm:px-8 lg:px-12"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_47%,rgb(37_99_235_/_0.18),transparent_20%),radial-gradient(circle_at_50%_50%,rgb(124_58_237_/_0.16),transparent_42%),linear-gradient(180deg,#02040c,#030511_70%,#040617)]"
        />
        <ParticleLayer count={PARTICLE_COUNTS.core} mobileCount={9} tone="core" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-2 lg:grid-cols-[1fr_1.08fr] lg:gap-12">
          <div
            data-core-copy
            className="relative z-20 order-2 max-w-2xl pb-6 text-center lg:order-1 lg:text-start"
          >
            <p className="section-eyebrow">{copy.eyebrow}</p>
            <h2 className="mt-5 text-balance font-display text-[clamp(2.6rem,6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-white">
              {copy.title}
            </h2>
            <p className="mt-6 text-base leading-7 text-slate-200/80 sm:text-lg">{copy.body}</p>
            <p className="mt-3 text-sm leading-6 text-violet-100/65 sm:text-base">{copy.line}</p>
            <div
              data-core-actions
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <button
                type="button"
                onClick={onStartProject}
                className="premium-button premium-button-primary justify-center"
              >
                {copy.primary}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={scrollToContact}
                className="premium-button premium-button-secondary justify-center"
              >
                {copy.secondary}
                <ArrowDown className="size-4" />
              </button>
            </div>
            <p data-core-final className="mt-8 text-sm font-medium tracking-wide text-cyan-100/80">
              {copy.final}
            </p>
          </div>
          <div className="order-1 mx-auto w-full max-w-[34rem] lg:order-2 lg:max-w-none">
            <EnergyCore logoAlt={copy.logoAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}

function getCopy(language: "en" | "ar" | "es") {
  return cinematicJourneyContent[language];
}

export function CinematicDepthJourney({ onStartProject }: CinematicDepthJourneyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { language, dir } = useLanguage();
  const copy = getCopy(language);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    let media: gsap.MatchMedia | undefined;

    const context = gsap.context(() => {
      const select = gsap.utils.selector(root);
      media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (matchContext) => {
          const conditions = matchContext.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };
          const { desktop, mobile, reduceMotion } = conditions;
          const scrub = reduceMotion ? true : 0.45;
          const cleanups: Array<() => void> = [];

          select("[data-foundation-group]").forEach((group, index) => {
            const cards = group.querySelectorAll("[data-service-card]");
            const tween = gsap.fromTo(
              cards,
              {
                autoAlpha: reduceMotion ? 0.55 : 0,
                y: reduceMotion ? 0 : 52,
                scale: reduceMotion ? 1 : 0.97,
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                stagger: reduceMotion ? 0 : 0.06,
                ease: "power2.out",
                scrollTrigger: {
                  id: `foundation-group-${index}`,
                  trigger: group,
                  start: "top 82%",
                  end: "top 42%",
                  scrub,
                },
              },
            );
            cleanups.push(() => tween.kill());
          });

          select("[data-digital-crack]").forEach((crack, index) => {
            const tween = gsap.to(crack, {
              xPercent: index % 2 ? -FOUNDATION_PARALLAX : FOUNDATION_PARALLAX,
              scaleX: 1.25,
              ease: "none",
              scrollTrigger: {
                trigger: "#depth-foundation",
                start: "top bottom",
                end: "bottom top",
                scrub,
              },
            });
            cleanups.push(() => tween.kill());
          });

          const setupPinnedScene = (
            sectionSelector: string,
            sceneSelector: string,
            groupSelector: string,
            pinDistance: number,
            enhance: (timeline: gsap.core.Timeline) => void,
          ) => {
            const section = select(sectionSelector)[0] as HTMLElement | undefined;
            const scene = select(sceneSelector)[0] as HTMLElement | undefined;
            const groups = select(groupSelector) as HTMLElement[];
            if (!section || !scene || groups.length === 0) return;

            gsap.set(groups, { autoAlpha: 0, y: reduceMotion ? 0 : 24 });
            gsap.set(groups[0], { autoAlpha: 1, y: 0 });

            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                id: `${section.id}-timeline`,
                trigger: section,
                start: "top top",
                end: () =>
                  `+=${window.innerHeight * (mobile ? MOBILE_SCROLL_DURATION : pinDistance)}`,
                pin: desktop ? scene : false,
                pinSpacing: true,
                scrub,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            groups.slice(1).forEach((group, index) => {
              const previous = groups[index];
              const position = 0.28 + index * 0.3;
              timeline
                .to(
                  previous,
                  { autoAlpha: 0, y: reduceMotion ? 0 : -24, duration: CARD_REVEAL_DURATION },
                  position,
                )
                .to(group, { autoAlpha: 1, y: 0, duration: CARD_REVEAL_DURATION }, position + 0.04);
            });
            enhance(timeline);
            cleanups.push(() => {
              timeline.scrollTrigger?.kill();
              timeline.kill();
            });
          };

          setupPinnedScene(
            "#depth-automation",
            "[data-automation-scene]",
            "[data-automation-group]",
            AUTOMATION_PIN_DURATION,
            (timeline) => {
              const nodes = select("[data-workflow-node]");
              const paths = select("[data-workflow-path]");
              gsap.set(nodes, { autoAlpha: 0.35, scale: 0.94 });
              gsap.set(paths, {
                scaleX: desktop ? 0 : 1,
                scaleY: desktop ? 1 : 0,
                transformOrigin: "0 0",
              });
              timeline
                .to(
                  nodes,
                  {
                    autoAlpha: 1,
                    scale: 1,
                    stagger: WORKFLOW_SPEED / Math.max(nodes.length, 1),
                    duration: 0.08,
                  },
                  0.02,
                )
                .to(
                  paths,
                  {
                    scaleX: 1,
                    scaleY: 1,
                    stagger: WORKFLOW_SPEED / Math.max(paths.length, 1),
                    duration: 0.08,
                  },
                  0.08,
                )
                .to("[data-network-grid]", { yPercent: -4, opacity: 0.72, duration: 0.9 }, 0);
            },
          );

          setupPinnedScene(
            "#depth-intelligence",
            "[data-intelligence-scene]",
            "[data-intelligence-group]",
            INTELLIGENCE_PIN_DURATION,
            (timeline) => {
              timeline
                .to(
                  "[data-neural-ring]",
                  {
                    rotation: AI_CORE_ROTATION,
                    stagger: 0.04,
                    duration: 1,
                    transformOrigin: "50% 50%",
                  },
                  0,
                )
                .fromTo(
                  "[data-neural-node]",
                  { autoAlpha: 0.25, scale: 0.7 },
                  { autoAlpha: 1, scale: 1.1, stagger: 0.025, duration: 0.5 },
                  0.05,
                )
                .fromTo(
                  "[data-ai-mode]",
                  { autoAlpha: 0, y: 12 },
                  { autoAlpha: 1, y: 0, stagger: 0.18, duration: 0.16 },
                  0.18,
                )
                .to("[data-neural-field]", { yPercent: -5, scale: 1.04, duration: 1 }, 0);
            },
          );

          const intelligenceSection = select("#depth-intelligence")[0] as HTMLElement | undefined;
          const neuralField = select("[data-neural-field]")[0] as HTMLElement | undefined;
          if (intelligenceSection && neuralField) {
            neuralField.style.animationPlayState = "paused";
            const ambientTrigger = ScrollTrigger.create({
              trigger: intelligenceSection,
              start: "top bottom",
              end: "bottom top",
              onEnter: () => (neuralField.style.animationPlayState = "running"),
              onEnterBack: () => (neuralField.style.animationPlayState = "running"),
              onLeave: () => (neuralField.style.animationPlayState = "paused"),
              onLeaveBack: () => (neuralField.style.animationPlayState = "paused"),
            });
            cleanups.push(() => ambientTrigger.kill());
          }

          const core = select("#depth-core")[0] as HTMLElement | undefined;
          if (core) {
            gsap.set(
              ["[data-core-logo]", "[data-core-copy]", "[data-core-actions]", "[data-core-final]"],
              { autoAlpha: 0 },
            );
            gsap.set("[data-core-logo]", { scale: reduceMotion ? 1 : 0.78 });
            const coreTimeline = gsap.timeline({
              scrollTrigger: {
                id: "depth-core-timeline",
                trigger: core,
                start: "top top",
                end: "bottom bottom",
                scrub,
                invalidateOnRefresh: true,
              },
            });
            coreTimeline
              .to(
                "[data-energy-ring]",
                {
                  rotation: AI_CORE_ROTATION * 1.4,
                  scale: 1.05,
                  stagger: 0.04,
                  duration: 0.65,
                  transformOrigin: "50% 50%",
                },
                0,
              )
              .to(
                "[data-depth-particle]",
                { x: 0, y: reduceMotion ? 0 : -DEEP_PARALLAX, stagger: 0.006, duration: 0.8 },
                0,
              )
              .to("[data-core-logo]", { autoAlpha: 1, scale: 1, duration: 0.2 }, 0.18)
              .to("[data-core-copy]", { autoAlpha: 1, y: 0, duration: 0.2 }, 0.38)
              .to("[data-core-actions]", { autoAlpha: 1, y: 0, duration: 0.16 }, 0.58)
              .to("[data-core-final]", { autoAlpha: 1, duration: 0.14 }, 0.76)
              .to(
                "[data-energy-glow]",
                { scale: FINAL_CORE_BRIGHTNESS, opacity: 1, duration: 0.2 },
                0.78,
              );
            cleanups.push(() => {
              coreTimeline.scrollTrigger?.kill();
              coreTimeline.kill();
            });
          }

          if (!reduceMotion) {
            select("[data-depth-section]").forEach((section) => {
              const particles = section.querySelectorAll("[data-depth-particle]");
              const tween = gsap.to(particles, {
                y: mobile ? -22 : -DEEP_PARALLAX,
                stagger: 0.008,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              });
              cleanups.push(() => tween.kill());
            });
          }

          requestAnimationFrame(() => ScrollTrigger.refresh());
          return () => cleanups.forEach((cleanup) => cleanup());
        },
      );
    }, root);

    return () => {
      media?.revert();
      context.revert();
    };
  }, []);

  return (
    <div ref={rootRef} dir={dir} className="relative isolate overflow-x-clip bg-[#050816]">
      <DepthIndicator copy={copy.depth} />
      <FoundationSection copy={copy.foundation} />
      <AutomationSection copy={copy.automation} />
      <IntelligenceSection copy={copy.intelligence} />
      <CoreSection copy={copy.core} onStartProject={onStartProject} />
    </div>
  );
}
