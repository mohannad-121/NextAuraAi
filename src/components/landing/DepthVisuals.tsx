import type { JourneyService } from "@/i18n/cinematicJourneyContent";
import { DEPTH_JOURNEY_CONFIG } from "@/components/landing/depthJourneyConfig";
import type { CSSProperties } from "react";

type ParticleLayerProps = {
  count: number;
  mobileCount?: number;
  tone?: "earth" | "digital" | "neural" | "core";
};

export function ParticleLayer({ count, mobileCount = 8, tone = "digital" }: ParticleLayerProps) {
  const colors = {
    earth: "bg-[#d6b9a5]",
    digital: "bg-cyan-200 shadow-[0_0_5px_rgb(34_211_238_/_0.2)]",
    neural: "bg-violet-200 shadow-[0_0_5px_rgb(99_102_241_/_0.2)]",
    core: "bg-violet-100 shadow-[0_0_6px_rgb(139_92_246_/_0.24)]",
  };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          data-depth-particle
          className={`absolute rounded-full motion-reduce:hidden ${colors[tone]} ${index >= mobileCount ? "hidden md:block" : ""}`}
          style={{
            left: `${(index * 37 + 11) % 96}%`,
            top: `${(index * 53 + 7) % 92}%`,
            width: `${1 + (index % 2)}px`,
            height: `${1 + (index % 2)}px`,
            opacity: 0.08 + (index % 4) * 0.04,
          }}
        />
      ))}
    </div>
  );
}

type EnvironmentTone = "foundation" | "automation" | "intelligence" | "core";

/** Two restrained planes preserve continuity without competing with section content. */
export function EnvironmentalPlanes({ tone }: { tone: EnvironmentTone }) {
  return (
    <div
      aria-hidden="true"
      className={`depth-environment depth-environment-${tone} pointer-events-none absolute inset-0 overflow-hidden`}
    >
      <div data-depth-plane="background" className="depth-plane depth-plane-background">
        <span />
      </div>
      <div data-depth-plane="midground" className="depth-plane depth-plane-midground">
        <span />
      </div>
    </div>
  );
}

export function ServiceCard({ service, index }: { service: JourneyService; index: number }) {
  return (
    <article
      data-service-card
      className="depth-service-module group relative min-h-44 p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 motion-reduce:transform-none sm:p-7"
      style={
        {
          "--depth-card-brightness": DEPTH_JOURNEY_CONFIG.cards.brightness,
        } as CSSProperties
      }
    >
      <div className="relative z-10 mb-6 flex items-center gap-4">
        <span className="depth-module-index grid size-9 shrink-0 place-items-center text-xs font-semibold text-violet-100">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span aria-hidden="true" className="depth-module-rail h-px flex-1" />
      </div>
      <h3 className="relative z-10 text-balance text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl">
        {service.title}
      </h3>
      <p className="relative z-10 mt-3 text-sm leading-6 text-slate-200/85">
        {service.description}
      </p>
    </article>
  );
}

export function WorkflowVisualization({
  labels,
  ariaLabel,
}: {
  labels: string[];
  ariaLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="depth-workflow-environment relative px-4 py-7 md:px-6 md:py-9"
    >
      <ol className="sr-only">
        {labels.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ol>
      <div
        aria-hidden="true"
        className="relative flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-0"
      >
        {labels
          .filter(
            (_, index) => index === 0 || index === 2 || index === 3 || index === labels.length - 1,
          )
          .map((label, index, visibleLabels) => (
            <div key={label} className="contents">
              <div
                data-workflow-node
                data-workflow-index={index}
                className="workflow-node relative z-10 flex min-h-20 flex-1 items-center justify-center px-4 text-center text-xs font-semibold leading-4 text-slate-100 md:min-h-24"
              >
                <span
                  data-workflow-status
                  className="workflow-status absolute start-3 top-3 size-1.5 rounded-full"
                />
                {label}
              </div>
              {index < visibleLabels.length - 1 ? (
                <div
                  data-workflow-path
                  className="workflow-path relative mx-auto h-7 w-px overflow-visible md:mx-0 md:h-px md:w-7 lg:w-10"
                >
                  <span
                    data-workflow-line
                    className="workflow-line absolute inset-0 origin-top md:origin-left"
                  />
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
}

const neuralNodes = Array.from({ length: 8 }, (_, index) => ({
  left: 10 + ((index * 29) % 80),
  top: 9 + ((index * 43) % 82),
  size: 3 + (index % 3) * 2,
}));

export function NeuralCoreVisualization() {
  return (
    <div
      aria-hidden="true"
      className="neural-organism relative mx-auto aspect-square w-full max-w-[31rem]"
    >
      <div
        data-neural-glow
        className="absolute inset-[12%] bg-[radial-gradient(ellipse,rgb(34_211_238_/_0.16),rgb(124_58_237_/_0.14)_38%,transparent_72%)] blur-xl"
      />
      <div data-neural-core className="neural-seed absolute inset-[31%] grid place-items-center">
        <svg className="h-[58%] w-[58%]" viewBox="0 0 100 100">
          <path d="M18 50 34 27 55 36 78 20 84 48 69 73 43 80 22 66Z" />
          <path d="M34 27 43 80M55 36 69 73M18 50 84 48M22 66 78 20" />
          {[
            { x: 18, y: 50 },
            { x: 34, y: 27 },
            { x: 55, y: 36 },
            { x: 78, y: 20 },
            { x: 84, y: 48 },
            { x: 69, y: 73 },
            { x: 43, y: 80 },
            { x: 22, y: 66 },
          ].map((node) => (
            <circle key={`${node.x}-${node.y}`} cx={node.x} cy={node.y} r="2.4" />
          ))}
        </svg>
      </div>
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
      >
        <path
          data-neural-ring
          className="neural-filament neural-filament-cyan"
          d="M8 42 C14 14 43 7 58 22 C72 35 94 25 91 54 C88 78 62 94 42 82 C23 71 2 72 8 42Z"
        />
        <path
          data-neural-ring
          className="neural-filament neural-filament-violet"
          d="M17 25 C37 4 65 18 70 37 C76 58 99 65 76 82 C59 95 39 78 25 70 C7 60 2 41 17 25Z"
        />
        <path
          className="neural-filament neural-filament-muted"
          d="M12 62 C29 52 26 28 45 18 M55 84 C61 66 82 61 89 40 M19 39 C34 41 44 57 48 78 M52 17 C54 38 71 45 84 72"
        />
      </svg>
      {neuralNodes.map((node, index) => (
        <span
          key={index}
          data-neural-node
          className={`absolute rounded-full bg-cyan-100 shadow-[0_0_8px_rgb(34_211_238_/_0.38)] motion-reduce:hidden ${index >= 4 ? "hidden md:block" : ""}`}
          style={{
            left: `${node.left}%`,
            top: `${node.top}%`,
            width: node.size,
            height: node.size,
          }}
        />
      ))}
    </div>
  );
}

export function EnergyCore({ logoAlt }: { logoAlt: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[38rem]">
      <div aria-hidden="true" className="core-convergence-field">
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} style={{ rotate: `${index * 90}deg` }} />
        ))}
      </div>
      <div
        data-energy-ray
        className="absolute left-1/2 top-1/2 h-[10%] w-[110%] -translate-x-1/2 -translate-y-1/2 rotate-12 bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent blur-xl"
      />
      <div
        data-energy-ring
        className="absolute inset-[4%] rounded-full border border-violet-300/10"
      />
      <div
        data-energy-ring
        className="absolute inset-[24%] rounded-full border border-violet-200/20"
      />
      <div
        data-energy-glow
        className="absolute inset-[19%] rounded-full bg-[radial-gradient(circle,rgb(224_231_255_/_0.32)_0%,rgb(59_130_246_/_0.24)_24%,rgb(124_58_237_/_0.2)_48%,transparent_72%)] blur-2xl"
      />
      <div className="absolute inset-[31%] rounded-full border border-white/15 bg-[#050714]/82 shadow-[inset_0_0_45px_rgb(139_92_246_/_0.2),0_0_65px_rgb(37_99_235_/_0.3)]" />
      <img
        data-core-logo
        src="/brand/nextaura-logo.svg"
        alt={logoAlt}
        className="absolute left-1/2 top-1/2 z-10 h-auto w-[34%] -translate-x-1/2 -translate-y-1/2 object-contain"
      />
    </div>
  );
}
