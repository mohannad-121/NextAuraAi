import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";
import { CinematicHero } from "@/components/landing/CinematicHero";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

type HeroUndergroundJourneyProps = { onStartProject: () => void };

const DESKTOP_PIN_DISTANCE = 2.1;
const MOBILE_PIN_DISTANCE = 1.65;
const DESKTOP_VIDEO_ZOOM = 1.12;
const MOBILE_VIDEO_ZOOM = 1.08;
const DESKTOP_VIDEO_RISE = -6;
const MOBILE_VIDEO_RISE = -4;

const surfaceDust = Array.from({ length: 10 }, (_, index) => ({
  left: (index * 31 + 7) % 96,
  bottom: 2 + ((index * 17) % 24),
  size: 1 + (index % 3),
  opacity: 0.18 + (index % 4) * 0.08,
}));

const undergroundDust = Array.from({ length: 20 }, (_, index) => ({
  left: (index * 37 + 9) % 96,
  top: 10 + ((index * 43) % 82),
  size: 1 + (index % 3),
  opacity: 0.16 + (index % 5) * 0.07,
}));

const stoneFragments = Array.from({ length: 12 }, (_, index) => ({
  left: 4 + ((index * 29) % 91),
  top: 10 + ((index * 13) % 30),
  width: 8 + (index % 4) * 5,
  height: 5 + (index % 3) * 4,
  rotate: -28 + ((index * 19) % 58),
}));

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function HeroUndergroundJourney({ onStartProject }: HeroUndergroundJourneyProps) {
  const rootRef = useRef<HTMLElement>(null);
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].underground;

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    let media: gsap.MatchMedia | undefined;

    const context = gsap.context(() => {
      const select = gsap.utils.selector(root);
      const stage = select("[data-underground-stage]")[0] as HTMLElement | undefined;
      const camera = select("[data-underground-camera]")[0] as HTMLElement | undefined;
      const videoFrame = select("[data-hero-video-frame]")[0] as HTMLElement | undefined;
      const video = select("[data-hero-video]")[0] as HTMLVideoElement | undefined;
      const heading = select("[data-hero-heading]");
      const support = select("[data-hero-support]");
      const scrollCue = select("[data-hero-scroll]");
      const vignette = select("[data-underground-vignette]");
      const surfaceParticles = select("[data-surface-dust]");
      const backdrop = select("[data-underground-backdrop]");
      const soilStack = select("[data-soil-stack]");
      const surfaceEdge = select("[data-soil-surface]");
      const topSoil = select("[data-soil-top]");
      const compactSoil = select("[data-soil-compact]");
      const stones = select("[data-soil-stone]");
      const foundationLabel = select("[data-foundation-label]");
      const deepParticles = select("[data-underground-dust]");

      if (!stage || !camera || !videoFrame || !video || !soilStack.length) return;

      gsap.set(soilStack, { yPercent: 105, force3D: true });
      gsap.set([vignette, surfaceParticles, backdrop, foundationLabel, deepParticles], {
        autoAlpha: 0,
      });
      gsap.set(foundationLabel, { y: 22 });

      media = gsap.matchMedia();
      media.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (matchContext) => {
          const conditions = matchContext.conditions as {
            isMobile: boolean;
            reduceMotion: boolean;
          };
          const { isMobile, reduceMotion } = conditions;
          const pinDistance = isMobile ? MOBILE_PIN_DISTANCE : DESKTOP_PIN_DISTANCE;
          const videoZoom = reduceMotion
            ? 1.055
            : isMobile
              ? MOBILE_VIDEO_ZOOM
              : DESKTOP_VIDEO_ZOOM;
          const videoRise = reduceMotion ? -2 : isMobile ? MOBILE_VIDEO_RISE : DESKTOP_VIDEO_RISE;

          const setActive = (active: boolean) => {
            root.dataset.journeyActive = active ? "true" : "false";
            if (active) void video.play().catch(() => undefined);
            else video.pause();
          };

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: "hero-underground-transition",
              trigger: root,
              start: "top top",
              end: () => `+=${window.innerHeight * pinDistance}`,
              pin: stage,
              pinSpacing: true,
              scrub: reduceMotion ? true : 0.45,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onEnter: () => setActive(true),
              onEnterBack: () => setActive(true),
              onLeave: () => setActive(false),
              onLeaveBack: () => setActive(false),
            },
          });

          timeline
            .addLabel("surface", 0)
            .to(videoFrame, { scale: videoZoom, yPercent: videoRise, duration: 0.7 }, 0)
            .to(scrollCue, { autoAlpha: 0, y: -8, duration: 0.1 }, 0.08)
            .to(support, { autoAlpha: 0, y: -18, duration: 0.2, stagger: 0.012 }, 0.12)
            .to(vignette, { autoAlpha: 0.72, duration: 0.32 }, 0.12)
            .to(
              surfaceParticles,
              { autoAlpha: 0.64, yPercent: -42, duration: 0.32, stagger: 0.004 },
              0.22,
            )
            .to(heading, { autoAlpha: 0, y: -24, duration: 0.22, stagger: 0.018 }, 0.31)
            .addLabel("crossing", 0.42)
            .to(backdrop, { autoAlpha: 1, duration: 0.3 }, 0.48)
            .to(soilStack, { yPercent: -16, duration: 0.57 }, 0.42)
            .to(surfaceEdge, { yPercent: -145, duration: 0.42 }, 0.43)
            .to(topSoil, { yPercent: -76, duration: 0.46 }, 0.44)
            .to(compactSoil, { yPercent: -38, duration: 0.48 }, 0.46)
            .to(
              stones,
              {
                yPercent: -105,
                rotation: (index) => (index % 2 === 0 ? 18 : -16),
                duration: 0.46,
                stagger: 0.006,
              },
              0.44,
            )
            .to(deepParticles, { autoAlpha: 0.62, y: -18, duration: 0.3, stagger: 0.004 }, 0.7)
            .addLabel("foundation", 0.82)
            .to(foundationLabel, { autoAlpha: 1, y: 0, duration: 0.18 }, 0.82);

          if (!reduceMotion && !isMobile) {
            timeline
              .to(camera, { x: 1.5, y: -1, rotation: 0.025, duration: 0.015 }, 0.55)
              .to(camera, { x: -1.25, y: 0.8, rotation: -0.02, duration: 0.015 }, 0.565)
              .to(camera, { x: 0.7, y: -0.4, rotation: 0.01, duration: 0.015 }, 0.58)
              .to(camera, { x: 0, y: 0, rotation: 0, duration: 0.02 }, 0.595);
          }

          return () => {
            setActive(false);
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        },
      );
    }, root);

    return () => {
      media?.revert();
      context.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative isolate bg-[#0d0b12]" dir={dir}>
      <div
        data-underground-stage
        className="relative h-[100svh] min-h-[760px] overflow-hidden bg-[#020617] sm:min-h-[820px] lg:min-h-[100svh]"
      >
        <div data-underground-camera className="relative h-full w-full overflow-hidden">
          <CinematicHero onStartProject={onStartProject} />

          <div
            data-underground-vignette
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgb(2_2_8_/_0.22)_67%,rgb(2_2_8_/_0.82)_100%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[24] h-[38vh] overflow-hidden"
          >
            {surfaceDust.map((particle, index) => (
              <span
                key={`surface-${index}`}
                data-surface-dust
                className={`absolute rounded-full bg-[#c7a58a] shadow-[0_0_8px_rgb(167_139_250_/_0.35)] ${index >= 4 ? "hidden md:block" : ""}`}
                style={{
                  left: `${particle.left}%`,
                  bottom: `${particle.bottom}%`,
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                }}
              />
            ))}
          </div>

          <div
            data-underground-backdrop
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[26] bg-[radial-gradient(circle_at_68%_28%,rgb(124_58_237_/_0.22),transparent_36%),radial-gradient(circle_at_25%_74%,rgb(34_211_238_/_0.08),transparent_28%),linear-gradient(180deg,#2a1724_0%,#181318_46%,#0b0e15_100%)]"
          />

          <div
            data-soil-stack
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 overflow-hidden bg-[radial-gradient(circle_at_70%_32%,rgb(124_58_237_/_0.16),transparent_36%),linear-gradient(180deg,#24161e_0%,#171217_48%,#090d14_100%)] shadow-[0_-38px_90px_rgb(107_57_136_/_0.22)]"
            style={{
              clipPath:
                "polygon(0 9%, 5% 5%, 11% 8%, 18% 3%, 25% 7%, 34% 4%, 43% 9%, 52% 3%, 61% 7%, 70% 4%, 80% 9%, 89% 5%, 100% 8%, 100% 100%, 0 100%)",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgb(255_255_255_/_0.025)_0_1px,transparent_1.5px),radial-gradient(circle_at_72%_64%,rgb(167_139_250_/_0.05)_0_1px,transparent_1.5px)] bg-[size:34px_34px,48px_48px]" />

            <div
              data-soil-compact
              className="absolute inset-x-0 top-[17%] h-[43%] bg-[radial-gradient(circle_at_16%_34%,#5a3c3d_0_2px,transparent_3px),radial-gradient(circle_at_70%_65%,#402a31_0_3px,transparent_4px),linear-gradient(180deg,#3a252d,#201820)] bg-[size:42px_38px,58px_52px,auto]"
              style={{
                clipPath:
                  "polygon(0 7%, 9% 2%, 18% 6%, 29% 1%, 42% 5%, 55% 0, 68% 6%, 81% 2%, 92% 7%, 100% 3%, 100% 100%, 0 100%)",
              }}
            />

            <div
              data-soil-top
              className="absolute inset-x-0 top-[7%] h-[25%] bg-[radial-gradient(circle_at_18%_35%,#8b6250_0_2px,transparent_3px),radial-gradient(circle_at_72%_52%,#6f4c46_0_2px,transparent_3px),linear-gradient(180deg,#694a43,#3d2930)] bg-[size:36px_32px,52px_46px,auto]"
              style={{
                clipPath:
                  "polygon(0 9%, 8% 4%, 17% 8%, 27% 2%, 39% 7%, 51% 1%, 63% 6%, 76% 3%, 88% 9%, 100% 4%, 100% 100%, 0 100%)",
              }}
            />

            <div
              data-soil-surface
              className="absolute inset-x-0 top-[3.5%] h-[11%] bg-[linear-gradient(180deg,#392231_0%,#754a4d_44%,#5a3a3f_100%)] shadow-[0_-12px_34px_rgb(168_85_247_/_0.18)]"
              style={{
                clipPath:
                  "polygon(0 38%, 6% 8%, 13% 30%, 21% 0, 30% 34%, 39% 12%, 48% 42%, 58% 5%, 68% 31%, 78% 10%, 88% 40%, 95% 14%, 100% 32%, 100% 100%, 0 100%)",
              }}
            />

            {stoneFragments.map((stone, index) => (
              <span
                key={`stone-${index}`}
                data-soil-stone
                className="absolute rounded-[45%_55%_48%_52%] border border-white/5 bg-[#211a20] shadow-[inset_0_1px_3px_rgb(255_255_255_/_0.08),0_4px_8px_rgb(0_0_0_/_0.28)]"
                style={{
                  left: `${stone.left}%`,
                  top: `${stone.top}%`,
                  width: stone.width,
                  height: stone.height,
                  rotate: `${stone.rotate}deg`,
                }}
              />
            ))}

            <div className="absolute left-[10%] top-[58%] h-px w-[34%] -rotate-[14deg] bg-gradient-to-r from-transparent via-violet-300/35 to-transparent shadow-[0_0_12px_rgb(167_139_250_/_0.25)]" />
            <div className="absolute right-[8%] top-[68%] h-px w-[28%] rotate-[18deg] bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent shadow-[0_0_10px_rgb(34_211_238_/_0.18)]" />
            <div className="absolute left-[38%] top-[82%] h-px w-[24%] rotate-[6deg] bg-gradient-to-r from-transparent via-violet-300/25 to-transparent" />

            {undergroundDust.map((particle, index) => (
              <span
                key={`deep-${index}`}
                data-underground-dust
                className={`absolute rounded-full bg-[#c7b5c9] shadow-[0_0_7px_rgb(139_92_246_/_0.28)] ${index >= 8 ? "hidden md:block" : ""}`}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                }}
              />
            ))}
          </div>

          <div
            data-foundation-label
            className="pointer-events-none absolute inset-0 z-50 grid place-items-center px-6 text-center"
          >
            <div>
              <div className="mx-auto mb-5 h-px w-16 bg-gradient-to-r from-violet-500 to-cyan-300" />
              <h2 className="text-balance font-display text-[clamp(2.2rem,6vw,5.4rem)] font-semibold tracking-[-0.045em] text-white [text-shadow:0_4px_24px_rgb(0_0_0_/_0.45)]">
                {copy.foundation}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative min-h-[100svh] overflow-hidden bg-[radial-gradient(circle_at_62%_20%,rgb(124_58_237_/_0.15),transparent_34%),radial-gradient(circle_at_24%_70%,rgb(34_211_238_/_0.055),transparent_24%),linear-gradient(180deg,#151117_0%,#0b0e15_72%,#050817_100%)]"
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#171217] to-transparent" />
        <div className="absolute left-[12%] top-[28%] h-px w-[38%] -rotate-[9deg] bg-gradient-to-r from-transparent via-violet-300/20 to-transparent" />
        <div className="absolute right-[10%] top-[58%] h-px w-[31%] rotate-[13deg] bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent" />
        {undergroundDust.slice(0, 12).map((particle, index) => (
          <span
            key={`continuation-${index}`}
            className="absolute rounded-full bg-slate-200/25 shadow-[0_0_7px_rgb(139_92_246_/_0.22)]"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </div>
    </section>
  );
}
