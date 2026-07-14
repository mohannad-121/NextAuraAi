import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight, Network } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";
import { DepthIndicator } from "@/components/landing/DepthIndicator";
import {
  EnergyCore,
  EnvironmentalPlanes,
  NeuralCoreVisualization,
  ParticleLayer,
  ServiceCard,
  WorkflowVisualization,
} from "@/components/landing/DepthVisuals";
import {
  cinematicJourneyContent,
  type JourneyService,
  type JourneySectionContent,
} from "@/i18n/cinematicJourneyContent";
import { useLanguage } from "@/i18n/translations";
import { DEPTH_JOURNEY_CONFIG } from "@/components/landing/depthJourneyConfig";
import { useViewportActivity } from "@/hooks/use-viewport-activity";

type CinematicDepthJourneyProps = { onStartProject: () => void };

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const toFocusedServiceGroups = (groups: JourneyService[][]) => {
  const services = groups.flat();
  const visibleCount = DEPTH_JOURNEY_CONFIG.cards.visiblePerGroup;
  return Array.from({ length: Math.ceil(services.length / visibleCount) }, (_, index) =>
    services.slice(index * visibleCount, (index + 1) * visibleCount),
  );
};

function SectionHeading({
  copy,
  compact = false,
  foundationSweepActive,
}: {
  copy: JourneySectionContent;
  compact?: boolean;
  foundationSweepActive?: boolean;
}) {
  return (
    <header data-scene-copy className="relative z-10 max-w-[38rem] rtl:max-w-[41rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(5_8_20_/_0.48),transparent_74%)] blur-md"
      />
      <p
        className={`section-eyebrow ${foundationSweepActive !== undefined ? "digital-foundation-sweep" : ""}`}
        data-sweep-active={foundationSweepActive}
      >
        {copy.eyebrow}
      </p>
      <h2
        data-scene-heading
        className="mt-4 text-balance font-display text-[clamp(2.2rem,4.4vw,4.4rem)] font-semibold leading-[1.01] tracking-[-0.045em] text-white [text-shadow:0_3px_18px_rgb(0_0_0_/_0.34)] rtl:tracking-[-0.025em]"
      >
        {copy.title}
      </h2>
      <p
        data-scene-body
        className={`${compact ? "mt-4" : "mt-5"} max-w-[36rem] text-base leading-7 text-slate-200/85 sm:text-lg sm:leading-8`}
      >
        {copy.body}
      </p>
    </header>
  );
}

function FoundationSection({ copy }: { copy: JourneySectionContent }) {
  const services = copy.groups.flat();
  const { targetRef: sectionRef, isActive: isSweepActive } = useViewportActivity<HTMLElement>({
    rootMargin: "160px 0px",
    threshold: 0.05,
  });
  return (
    <section
      ref={sectionRef}
      id="depth-foundation"
      data-depth-section="foundation"
      className="foundation-section relative isolate overflow-hidden px-5 py-14 sm:px-8 md:py-18 lg:px-12 xl:py-20"
    >
      <EnvironmentalPlanes tone="foundation" />
      <ParticleLayer
        count={DEPTH_JOURNEY_CONFIG.particles.foundation}
        mobileCount={DEPTH_JOURNEY_CONFIG.particles.mobile}
        tone="earth"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading copy={copy} compact foundationSweepActive={isSweepActive} />
        <div
          data-foundation-group
          className="foundation-services-grid mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 lg:gap-5 xl:grid-cols-3"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} compact />
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="foundation-bottom-fade absolute inset-x-0 bottom-0 h-64" />
    </section>
  );
}

export function DigitalFoundationSection() {
  const { language, dir } = useLanguage();
  return (
    <div dir={dir}>
      <FoundationSection copy={cinematicJourneyContent[language].foundation} />
    </div>
  );
}

function AutomationSection({ copy }: { copy: ReturnType<typeof getCopy>["automation"] }) {
  const serviceGroups = toFocusedServiceGroups(copy.groups);
  return (
    <section
      id="depth-automation"
      data-depth-section="automation"
      className="depth-scroll-section relative isolate bg-[#08101f] xl:min-h-[var(--scene-scroll-height)]"
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
          className="absolute inset-0 bg-[radial-gradient(circle_at_76%_36%,rgb(37_99_235_/_0.13),transparent_36%),linear-gradient(180deg,#08101f,#080d1c_70%,#070b18)]"
        />
        <EnvironmentalPlanes tone="automation" />
        <ParticleLayer
          count={DEPTH_JOURNEY_CONFIG.particles.automation}
          mobileCount={DEPTH_JOURNEY_CONFIG.particles.mobile}
          tone="digital"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 xl:grid-cols-[0.72fr_1.28fr] xl:items-center xl:gap-16">
          <div>
            <SectionHeading copy={copy} />
            <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/65">
              <Network className="size-4" />
              {copy.workflowLabel}
            </div>
          </div>
          <div>
            <WorkflowVisualization labels={copy.workflow} ariaLabel={copy.workflowLabel} />
            <div className="depth-service-sequence relative mt-8 min-h-[14rem]">
              {serviceGroups.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  data-automation-group
                  className="absolute inset-0 grid content-start"
                >
                  {group.map((service) => (
                    <ServiceCard key={service.title} service={service} index={groupIndex} />
                  ))}
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
  const serviceGroups = toFocusedServiceGroups(copy.groups);
  return (
    <section
      id="depth-intelligence"
      data-depth-section="intelligence"
      className="depth-scroll-section relative isolate bg-[#070b19] xl:min-h-[var(--scene-scroll-height)]"
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
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_44%,rgb(34_211_238_/_0.1),transparent_33%),linear-gradient(180deg,#070b19,#070a18_72%,#060916)]"
        />
        <EnvironmentalPlanes tone="intelligence" />
        <ParticleLayer
          count={DEPTH_JOURNEY_CONFIG.particles.intelligence}
          mobileCount={DEPTH_JOURNEY_CONFIG.particles.mobile}
          tone="neural"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 xl:grid-cols-[1fr_0.9fr] xl:items-center xl:gap-16">
          <div>
            <SectionHeading copy={copy} />
            <div className="depth-service-sequence relative mt-8 min-h-[14rem]">
              {serviceGroups.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  data-intelligence-group
                  className="absolute inset-0 grid content-start"
                >
                  {group.map((service) => (
                    <ServiceCard key={service.title} service={service} index={groupIndex} />
                  ))}
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
      className="relative bg-[#050817] md:min-h-[var(--core-desktop-height)]"
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
          className="absolute inset-0 bg-[radial-gradient(circle_at_58%_46%,rgb(37_99_235_/_0.15),transparent_30%),linear-gradient(180deg,#050817,#060919_70%,#070a1c)]"
        />
        <EnvironmentalPlanes tone="core" />
        <ParticleLayer
          count={DEPTH_JOURNEY_CONFIG.particles.core}
          mobileCount={DEPTH_JOURNEY_CONFIG.particles.mobile}
          tone="core"
        />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
          <div
            data-core-copy
            className="relative z-20 order-2 max-w-[40rem] pb-6 text-center lg:order-1 lg:text-start rtl:lg:max-w-[43rem]"
          >
            <p data-core-eyebrow className="section-eyebrow">
              {copy.eyebrow}
            </p>
            <h2
              data-core-heading
              className="mt-5 text-balance font-display text-[clamp(2.4rem,4.8vw,4.8rem)] font-semibold leading-[0.99] tracking-[-0.048em] text-white rtl:tracking-[-0.025em]"
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

          const animatedDepthSections = (select("[data-depth-section]") as HTMLElement[]).filter(
            (section) => section.dataset.depthSection !== "foundation",
          );

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

            if (reduceMotion || tablet || simplified) {
              gsap.set(groups, { autoAlpha: 1, x: 0, y: 0, clearProps: "transform" });
              return;
            }

            gsap.set(groups, {
              autoAlpha: 0,
              y: DEPTH_JOURNEY_CONFIG.cards.revealDistance,
              scale: 0.99,
            });
            gsap.set(groups[0], { autoAlpha: 1, y: 0, scale: 1 });

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
                    autoAlpha: DEPTH_JOURNEY_CONFIG.cards.inactiveOpacity,
                    y: DEPTH_JOURNEY_CONFIG.cards.activeLift,
                    scale: 0.99,
                    duration: DEPTH_JOURNEY_CONFIG.motion.cardRevealDuration,
                  },
                  position,
                )
                .to(
                  group,
                  {
                    autoAlpha: 1,
                    y: 0,
                    scale: DEPTH_JOURNEY_CONFIG.cards.activeScale,
                    duration: DEPTH_JOURNEY_CONFIG.motion.cardRevealDuration,
                  },
                  position,
                )
                .to(
                  group,
                  { scale: 1, duration: DEPTH_JOURNEY_CONFIG.motion.cardRevealDuration },
                  position + DEPTH_JOURNEY_CONFIG.motion.cardRevealDuration,
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
            },
          );

          setupScrollScene(
            "#depth-intelligence",
            "[data-intelligence-scene]",
            "[data-intelligence-group]",
            (timeline) => {
              const neuralGlow = select("[data-neural-glow]");
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
                    scale: reduceMotion ? 1 : 1.025,
                    stagger: reduceMotion ? 0 : 0.025,
                    duration: 0.46,
                  },
                  0.05,
                )
                .to(neuralGlow, { scale: 1.035, opacity: 0.84, duration: 0.42 }, 0.28)
                .to(neuralGlow, { scale: 1, opacity: 0.72, duration: 0.3 }, 0.7);
            },
          );

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
            animatedDepthSections.forEach((section) => {
              section.querySelectorAll<HTMLElement>("[data-depth-plane]").forEach((plane) => {
                const planeName = plane.dataset.depthPlane as "background" | "midground";
                const baseDistance = DEPTH_JOURNEY_CONFIG.motion.planeParallax[planeName];
                const distance = simplified
                  ? baseDistance * DEPTH_JOURNEY_CONFIG.motion.planeParallax.mobileScale
                  : baseDistance;
                const planeTween = gsap.fromTo(
                  plane,
                  { y: distance * 0.35 },
                  {
                    y: -distance,
                    ease: "none",
                    scrollTrigger: {
                      trigger: section,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.8,
                    },
                  },
                );
                cleanups.push(() => planeTween.kill());
              });

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
