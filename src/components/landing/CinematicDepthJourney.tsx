import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight, Network } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";
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
import { DEPTH_JOURNEY_CONFIG } from "@/components/landing/depthJourneyConfig";

type CinematicDepthJourneyProps = { onStartProject: () => void };

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function SectionHeading({ copy }: { copy: JourneySectionContent }) {
  return (
    <header data-scene-copy className="relative z-10 max-w-[42.5rem] rtl:max-w-[46rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(3_5_16_/_0.62),transparent_72%)] blur-xl"
      />
      <p className="section-eyebrow">{copy.eyebrow}</p>
      <h2
        data-scene-heading
        className="mt-5 text-balance font-display text-[clamp(2.25rem,4.9vw,5rem)] font-semibold leading-[0.99] tracking-[-0.048em] text-white [text-shadow:0_4px_24px_rgb(0_0_0_/_0.4)] rtl:tracking-[-0.025em]"
      >
        {copy.title}
      </h2>
      <p
        data-scene-body
        className="mt-6 max-w-[40rem] text-base leading-7 text-slate-200/80 sm:text-lg sm:leading-8"
      >
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
      <ParticleLayer
        count={DEPTH_JOURNEY_CONFIG.particles.foundation}
        mobileCount={DEPTH_JOURNEY_CONFIG.particles.mobile}
        tone="earth"
      />

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
        className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,transparent_0%,rgb(7_10_19_/_0.72)_50%,#050816_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 h-28 opacity-45 [clip-path:polygon(0_74%,9%_50%,18%_69%,31%_35%,44%_62%,57%_28%,70%_57%,84%_32%,100%_61%,100%_100%,0_100%)] bg-[linear-gradient(180deg,transparent,#09101e)]"
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
      className="depth-scroll-section relative isolate bg-[#050816] xl:min-h-[var(--scene-scroll-height)]"
      style={
        {
          "--scene-scroll-height": `${(1 + DEPTH_JOURNEY_CONFIG.sections.automationPin) * 100}svh`,
        } as CSSProperties
      }
    >
      <div
        data-automation-scene
        className="depth-scroll-scene relative flex min-h-[100svh] items-center overflow-hidden px-5 py-16 sm:px-8 lg:px-12 xl:sticky xl:top-0"
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
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,#050816_0%,rgb(5_8_22_/_0.82)_42%,transparent_100%)]"
        />
        <ParticleLayer
          count={DEPTH_JOURNEY_CONFIG.particles.automation}
          mobileCount={DEPTH_JOURNEY_CONFIG.particles.mobile}
          tone="digital"
        />

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
      className="depth-scroll-section relative isolate bg-[#040611] xl:min-h-[var(--scene-scroll-height)]"
      style={
        {
          "--scene-scroll-height": `${(1 + DEPTH_JOURNEY_CONFIG.sections.intelligencePin) * 100}svh`,
        } as CSSProperties
      }
    >
      <div
        data-intelligence-scene
        className="depth-scroll-scene relative flex min-h-[100svh] items-center overflow-hidden px-5 py-16 sm:px-8 lg:px-12 xl:sticky xl:top-0"
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
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,#040611_0%,rgb(4_6_17_/_0.78)_48%,transparent_100%)]"
        />
        <ParticleLayer
          count={DEPTH_JOURNEY_CONFIG.particles.intelligence}
          mobileCount={DEPTH_JOURNEY_CONFIG.particles.mobile}
          tone="neural"
        />

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
      className="relative bg-[#02040c] md:min-h-[var(--core-desktop-height)]"
      style={
        {
          "--core-desktop-height": DEPTH_JOURNEY_CONFIG.sections.coreDesktopHeight,
        } as CSSProperties
      }
    >
      <div
        data-core-scene
        className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-20 sm:px-8 md:sticky md:top-0 lg:px-12"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_47%,rgb(37_99_235_/_0.18),transparent_20%),radial-gradient(circle_at_50%_50%,rgb(124_58_237_/_0.16),transparent_42%),linear-gradient(180deg,#02040c,#030511_70%,#040617)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,#02040c_0%,rgb(2_4_12_/_0.72)_48%,transparent_100%)]"
        />
        <ParticleLayer
          count={DEPTH_JOURNEY_CONFIG.particles.core}
          mobileCount={DEPTH_JOURNEY_CONFIG.particles.mobile}
          tone="core"
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-2 lg:grid-cols-[1fr_1.08fr] lg:gap-12">
          <div
            data-core-copy
            className="relative z-20 order-2 max-w-[40rem] pb-6 text-center lg:order-1 lg:text-start rtl:lg:max-w-[43rem]"
          >
            <p data-core-eyebrow className="section-eyebrow">
              {copy.eyebrow}
            </p>
            <h2
              data-core-heading
              className="mt-5 text-balance font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-semibold leading-[0.97] tracking-[-0.05em] text-white rtl:tracking-[-0.025em]"
            >
              {copy.title}
            </h2>
            <div data-core-body>
              <p className="mt-6 text-base leading-7 text-slate-200/80 sm:text-lg">{copy.body}</p>
              <p className="mt-3 text-sm leading-6 text-violet-100/70 sm:text-base">{copy.line}</p>
            </div>
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
        <div
          data-core-bridge
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent_0%,rgb(4_8_23_/_0.58)_62%,#040817_100%)]"
        />
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
          tablet: "(min-width: 768px) and (max-width: 1279px)",
          compactLandscape:
            "(orientation: landscape) and (max-height: 600px) and (max-width: 900px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (matchContext) => {
          const conditions = matchContext.conditions as {
            desktop: boolean;
            mobile: boolean;
            tablet: boolean;
            compactLandscape: boolean;
            reduceMotion: boolean;
          };
          const { desktop, mobile, tablet, compactLandscape, reduceMotion } = conditions;
          const simplified = mobile || compactLandscape;
          const scrub = reduceMotion ? true : DEPTH_JOURNEY_CONFIG.motion.scrub;
          const cleanups: Array<() => void> = [];

          const foundationSection = select("#depth-foundation")[0] as HTMLElement | undefined;
          if (foundationSection) {
            const foundationHeading = foundationSection.querySelector("[data-scene-heading]");
            const foundationBody = foundationSection.querySelector("[data-scene-body]");
            const copyTimeline = gsap.timeline({
              scrollTrigger: {
                id: "foundation-copy",
                trigger: foundationSection,
                start: "top 78%",
                end: "top 34%",
                scrub,
              },
            });
            copyTimeline
              .fromTo(
                foundationHeading,
                { autoAlpha: reduceMotion ? 0.6 : 0, y: reduceMotion ? 0 : 30 },
                { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
                0,
              )
              .fromTo(
                foundationBody,
                { autoAlpha: reduceMotion ? 0.6 : 0, y: reduceMotion ? 0 : 20 },
                { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out" },
                0.34,
              );
            cleanups.push(() => copyTimeline.kill());
          }

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
                stagger: reduceMotion ? 0 : 0.075,
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

          if (!reduceMotion) {
            select("[data-digital-crack]").forEach((crack, index) => {
              const tween = gsap.to(crack, {
                xPercent:
                  (index % 2 ? -1 : 1) *
                  (simplified
                    ? DEPTH_JOURNEY_CONFIG.motion.mobileParallax
                    : DEPTH_JOURNEY_CONFIG.motion.foundationParallax),
                scaleX: 1.18,
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
          }

          const setupScrollScene = (
            sectionSelector: string,
            sceneSelector: string,
            groupSelector: string,
            enhance: (timeline: gsap.core.Timeline) => void,
          ) => {
            const section = select(sectionSelector)[0] as HTMLElement | undefined;
            const scene = select(sceneSelector)[0] as HTMLElement | undefined;
            const groups = select(groupSelector) as HTMLElement[];
            if (!section || !scene || groups.length === 0) return;

            if (reduceMotion || tablet) {
              gsap.set(groups, { autoAlpha: 1, x: 0, y: 0, clearProps: "transform" });
              return;
            }

            gsap.set(groups, { autoAlpha: 0, y: reduceMotion ? 0 : 24 });
            gsap.set(groups[0], { autoAlpha: 1, y: 0 });

            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                id: `${section.id}-timeline`,
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub,
                invalidateOnRefresh: true,
              },
            });

            groups.slice(1).forEach((group, index) => {
              const previous = groups[index];
              const position =
                DEPTH_JOURNEY_CONFIG.motion.cardGroupStart +
                index * DEPTH_JOURNEY_CONFIG.motion.cardGroupGap;
              timeline
                .to(
                  previous,
                  {
                    autoAlpha: 0,
                    y: reduceMotion ? 0 : -24,
                    duration: DEPTH_JOURNEY_CONFIG.motion.cardRevealDuration,
                  },
                  position,
                )
                .to(
                  group,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: DEPTH_JOURNEY_CONFIG.motion.cardRevealDuration,
                  },
                  position + DEPTH_JOURNEY_CONFIG.motion.cardRevealDuration + 0.015,
                );
            });
            enhance(timeline);
            cleanups.push(() => {
              timeline.scrollTrigger?.kill();
              timeline.kill();
            });
          };

          setupScrollScene(
            "#depth-automation",
            "[data-automation-scene]",
            "[data-automation-group]",
            (timeline) => {
              const nodes = select("[data-workflow-node]");
              const paths = select("[data-workflow-path]");
              gsap.set(nodes, {
                autoAlpha: reduceMotion ? 0.6 : 0.35,
                scale: reduceMotion ? 1 : 0.94,
              });
              gsap.set(paths, {
                autoAlpha: reduceMotion ? 0.5 : 1,
                scaleX: reduceMotion ? 1 : desktop ? 0 : 1,
                scaleY: reduceMotion ? 1 : desktop ? 1 : 0,
                transformOrigin: desktop && dir === "rtl" ? "100% 0" : "0 0",
              });
              nodes.forEach((node, index) => {
                const position =
                  0.04 +
                  index *
                    (DEPTH_JOURNEY_CONFIG.motion.workflowDuration / Math.max(nodes.length, 1));
                if (index > 0) {
                  timeline.to(
                    nodes[index - 1],
                    {
                      autoAlpha: 0.7,
                      scale: reduceMotion ? 1 : 0.985,
                      borderColor: "rgba(255,255,255,.12)",
                      duration: 0.07,
                    },
                    position,
                  );
                }
                timeline.to(
                  node,
                  {
                    autoAlpha: 1,
                    scale: reduceMotion ? 1 : 1.025,
                    borderColor: "rgba(103,232,249,.42)",
                    duration: 0.09,
                  },
                  position,
                );
                if (paths[index]) {
                  timeline.to(
                    paths[index],
                    { autoAlpha: 1, scaleX: 1, scaleY: 1, duration: 0.09 },
                    position + 0.065,
                  );
                }
              });
              timeline.to("[data-network-grid]", { yPercent: -3, opacity: 0.66, duration: 0.9 }, 0);
            },
          );

          setupScrollScene(
            "#depth-intelligence",
            "[data-intelligence-scene]",
            "[data-intelligence-group]",
            (timeline) => {
              const modes = select("[data-ai-mode]");
              const neuralGlow = select("[data-neural-glow]");
              gsap.set(modes, { autoAlpha: 0, scale: 0.92 });
              gsap.set(modes[0], { autoAlpha: 1, scale: 1 });
              timeline
                .to(
                  "[data-neural-ring]",
                  {
                    rotation: reduceMotion ? 0 : DEPTH_JOURNEY_CONFIG.motion.aiCoreRotation,
                    stagger: 0.04,
                    duration: 1,
                    transformOrigin: "50% 50%",
                  },
                  0,
                )
                .fromTo(
                  "[data-neural-node]",
                  { autoAlpha: reduceMotion ? 0.6 : 0.25, scale: reduceMotion ? 1 : 0.7 },
                  {
                    autoAlpha: 1,
                    scale: reduceMotion ? 1 : 1.06,
                    stagger: reduceMotion ? 0 : 0.025,
                    duration: 0.5,
                  },
                  0.05,
                )
                .to(modes[0], { autoAlpha: 0, scale: 0.94, duration: 0.12 }, 0.22)
                .to(modes[1], { autoAlpha: 1, scale: 1, duration: 0.14 }, 0.375)
                .to(neuralGlow, { scale: 1.07, opacity: 0.92, duration: 0.22 }, 0.375)
                .to(modes[1], { autoAlpha: 0, scale: 0.94, duration: 0.12 }, 0.64)
                .to(modes[2], { autoAlpha: 1, scale: 1, duration: 0.14 }, 0.795)
                .to(neuralGlow, { scale: 0.98, opacity: 0.76, duration: 0.18 }, 0.795)
                .to(
                  "[data-neural-field]",
                  { yPercent: reduceMotion ? 0 : -4, scale: reduceMotion ? 1 : 1.025, duration: 1 },
                  0,
                );
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
            const logo = core.querySelector("[data-core-logo]");
            const eyebrow = core.querySelector("[data-core-eyebrow]");
            const heading = core.querySelector("[data-core-heading]");
            const body = core.querySelector("[data-core-body]");
            const actions = core.querySelector("[data-core-actions]");
            const finalLine = core.querySelector("[data-core-final]");
            const rings = core.querySelectorAll("[data-energy-ring]");
            const particles = core.querySelectorAll("[data-depth-particle]");
            const glow = core.querySelector("[data-energy-glow]");
            const bridge = core.querySelector("[data-core-bridge]");
            const revealTargets = [logo, eyebrow, heading, body, actions, finalLine].filter(
              Boolean,
            );

            if (simplified || reduceMotion) {
              gsap.set(revealTargets, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
              gsap.set(rings, { rotation: 0, scale: 1 });
              gsap.set(glow, { scale: 1.04, opacity: 0.78 });
            } else {
              gsap.set([logo, eyebrow, heading, body, actions, finalLine], { autoAlpha: 0 });
              gsap.set(logo, { scale: 0.82 });
              gsap.set([eyebrow, heading, body, actions], { y: 20 });
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
                  rings,
                  {
                    rotation: DEPTH_JOURNEY_CONFIG.motion.aiCoreRotation * 1.25,
                    scale: 1.035,
                    stagger: 0.04,
                    duration: 0.72,
                    transformOrigin: "50% 50%",
                  },
                  0,
                )
                .to(
                  particles,
                  {
                    y: -DEPTH_JOURNEY_CONFIG.motion.deepParallax,
                    stagger: 0.006,
                    duration: 0.78,
                  },
                  0,
                )
                .to(logo, { autoAlpha: 1, scale: 1, duration: 0.18 }, 0.12)
                .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.13 }, 0.27)
                .to(heading, { autoAlpha: 1, y: 0, duration: 0.18 }, 0.34)
                .to(body, { autoAlpha: 1, y: 0, duration: 0.17 }, 0.46)
                .to(actions, { autoAlpha: 1, y: 0, duration: 0.16 }, 0.63)
                .to(finalLine, { autoAlpha: 1, duration: 0.14 }, 0.77)
                .to(
                  glow,
                  {
                    scale: DEPTH_JOURNEY_CONFIG.motion.finalCoreBrightness,
                    opacity: 0.9,
                    duration: 0.18,
                  },
                  0.78,
                )
                .to(glow, { scale: 1.06, opacity: 0.7, duration: 0.16 }, 0.94)
                .to(bridge, { opacity: 1, duration: 0.16 }, 0.9);
              cleanups.push(() => {
                coreTimeline.scrollTrigger?.kill();
                coreTimeline.kill();
              });
            }
          }

          if (!reduceMotion) {
            select("[data-depth-section]").forEach((section) => {
              const particles = section.querySelectorAll("[data-depth-particle]");
              const tween = gsap.to(particles, {
                y: simplified
                  ? -DEPTH_JOURNEY_CONFIG.motion.mobileParallax
                  : -DEPTH_JOURNEY_CONFIG.motion.deepParallax,
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

          const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
          return () => {
            cancelAnimationFrame(refreshFrame);
            cleanups.forEach((cleanup) => cleanup());
          };
        },
      );
    }, root);

    return () => {
      media?.revert();
      context.revert();
    };
  }, [dir]);

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
