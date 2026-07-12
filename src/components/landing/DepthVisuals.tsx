import { BrainCircuit, Check, Database, FileText, MessageCircle, Sparkles } from "lucide-react";
import type { JourneyService } from "@/i18n/cinematicJourneyContent";

type ParticleLayerProps = {
  count: number;
  mobileCount?: number;
  tone?: "earth" | "digital" | "neural" | "core";
};

export function ParticleLayer({ count, mobileCount = 8, tone = "digital" }: ParticleLayerProps) {
  const colors = {
    earth: "bg-[#c8a98f] shadow-[0_0_8px_rgb(167_139_250_/_0.24)]",
    digital: "bg-cyan-200 shadow-[0_0_8px_rgb(34_211_238_/_0.34)]",
    neural: "border border-cyan-200/55 bg-violet-200/60 shadow-[0_0_9px_rgb(99_102_241_/_0.32)]",
    core: "bg-violet-100 shadow-[0_0_10px_rgb(139_92_246_/_0.45)]",
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
            width: `${1 + (index % 3)}px`,
            height: `${1 + (index % 3)}px`,
            opacity: 0.12 + (index % 5) * 0.065,
          }}
        />
      ))}
    </div>
  );
}

export function ServiceCard({ service, index }: { service: JourneyService; index: number }) {
  return (
    <article
      data-service-card
      className="group relative min-h-44 overflow-hidden rounded-[1.4rem] border border-white/9 bg-[linear-gradient(145deg,rgb(17_20_31_/_0.93),rgb(8_10_18_/_0.86))] p-6 shadow-[inset_0_1px_rgb(255_255_255_/_0.045),0_20px_60px_rgb(0_0_0_/_0.26)] backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-violet-300/20 hover:shadow-[inset_0_1px_rgb(255_255_255_/_0.06),0_24px_65px_rgb(24_16_48_/_0.34)] motion-reduce:transform-none"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/45 to-transparent"
      />
      <div className="mb-7 flex items-center justify-between gap-4">
        <span className="grid size-9 place-items-center rounded-xl border border-violet-300/15 bg-violet-400/10 text-xs font-semibold text-violet-200">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-gradient-to-r from-violet-300/20 to-transparent"
        />
      </div>
      <h3 className="text-balance text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-300/75">{service.description}</p>
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
      className="relative rounded-[2rem] border border-cyan-200/10 bg-[#070a16]/90 p-5 shadow-[inset_0_0_50px_rgb(34_211_238_/_0.03),0_30px_90px_rgb(0_0_0_/_0.36)] backdrop-blur-sm md:p-7"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_0%,rgb(34_211_238_/_0.1),transparent_42%)]"
      />
      <ol className="sr-only">
        {labels.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ol>
      <div
        aria-hidden="true"
        className="relative flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-0"
      >
        {labels.map((label, index) => (
          <div key={label} className="contents">
            <div
              data-workflow-node
              data-workflow-index={index}
              className="relative z-10 flex min-h-20 flex-1 items-center justify-center rounded-2xl border border-white/10 bg-[#0c1323]/95 px-3 text-center text-[0.68rem] font-semibold leading-4 text-slate-100 shadow-[0_10px_35px_rgb(0_0_0_/_0.3)] md:min-h-28"
            >
              <span
                data-workflow-status
                className="absolute start-3 top-3 size-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgb(34_211_238_/_0.7)]"
              />
              {label}
            </div>
            {index < labels.length - 1 ? (
              <div
                data-workflow-path
                className="relative mx-auto h-7 w-px overflow-hidden bg-cyan-200/15 md:mx-0 md:h-px md:w-7 lg:w-10"
              >
                <span
                  data-workflow-line
                  className="absolute inset-0 origin-top bg-gradient-to-b from-cyan-300 via-violet-400 to-transparent shadow-[0_0_9px_rgb(34_211_238_/_0.5)] md:origin-left md:bg-gradient-to-r"
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

const neuralNodes = Array.from({ length: 16 }, (_, index) => ({
  left: 10 + ((index * 29) % 80),
  top: 9 + ((index * 43) % 82),
  size: 3 + (index % 3) * 2,
}));

export function NeuralCoreVisualization() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[31rem]">
      <div
        data-neural-ring
        className="absolute inset-[8%] rounded-full border border-cyan-200/15"
      />
      <div
        data-neural-ring
        className="absolute inset-[17%] rounded-full border border-violet-300/20"
      />
      <div
        data-neural-ring
        className="absolute inset-[25%] rounded-full border border-cyan-300/20"
      />
      <div
        data-neural-glow
        className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgb(34_211_238_/_0.16),rgb(124_58_237_/_0.14)_40%,transparent_72%)] blur-xl"
      />
      <div className="absolute inset-[31%] grid place-items-center rounded-full border border-white/15 bg-[#090d1b]/85 shadow-[0_0_70px_rgb(99_102_241_/_0.35),inset_0_0_35px_rgb(34_211_238_/_0.13)] backdrop-blur-md">
        <BrainCircuit className="size-14 text-cyan-100 sm:size-20" strokeWidth={1.2} />
      </div>
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-35"
        viewBox="0 0 100 100"
      >
        <path
          d="M14 34 Q31 12 50 30 T86 33"
          fill="none"
          stroke="url(#neural-gradient)"
          strokeWidth=".35"
        />
        <path
          d="M12 66 Q33 88 51 67 T90 62"
          fill="none"
          stroke="url(#neural-gradient)"
          strokeWidth=".35"
        />
        <path
          d="M23 17 Q29 50 12 78 M77 13 Q69 49 91 82"
          fill="none"
          stroke="url(#neural-gradient)"
          strokeWidth=".3"
        />
        <defs>
          <linearGradient id="neural-gradient">
            <stop stopColor="#67e8f9" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      {neuralNodes.map((node, index) => (
        <span
          key={index}
          data-neural-node
          className={`absolute rounded-full border border-white/20 bg-cyan-200 shadow-[0_0_11px_rgb(34_211_238_/_0.55)] motion-reduce:hidden ${index >= 9 ? "hidden md:block" : ""}`}
          style={{
            left: `${node.left}%`,
            top: `${node.top}%`,
            width: node.size,
            height: node.size,
          }}
        />
      ))}
      <div
        data-ai-mode
        data-ai-mode-index="0"
        className="absolute left-[2%] top-[40%] grid size-12 place-items-center rounded-2xl border border-violet-300/20 bg-[#0b1020]/90 text-violet-200"
      >
        <MessageCircle className="size-5" />
      </div>
      <div
        data-ai-mode
        data-ai-mode-index="1"
        className="absolute right-[3%] top-[23%] grid size-12 place-items-center rounded-2xl border border-cyan-300/20 bg-[#0b1020]/90 text-cyan-100"
      >
        <FileText className="size-5" />
      </div>
      <div
        data-ai-mode
        data-ai-mode-index="2"
        className="absolute bottom-[10%] left-[46%] grid size-12 place-items-center rounded-2xl border border-blue-300/20 bg-[#0b1020]/90 text-blue-100"
      >
        <Database className="size-5" />
      </div>
    </div>
  );
}

export function EnergyCore({ logoAlt }: { logoAlt: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[38rem]">
      <div
        data-energy-ray
        className="absolute left-1/2 top-1/2 h-[10%] w-[110%] -translate-x-1/2 -translate-y-1/2 rotate-12 bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent blur-xl"
      />
      <div
        data-energy-ray
        className="absolute left-1/2 top-1/2 h-[10%] w-[110%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] bg-gradient-to-r from-transparent via-violet-400/20 to-transparent blur-xl"
      />
      <div
        data-energy-ring
        className="absolute inset-[4%] rounded-full border border-violet-300/10"
      />
      <div
        data-energy-ring
        className="absolute inset-[14%] rounded-full border border-cyan-200/15"
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
      <Sparkles className="absolute right-[18%] top-[20%] size-5 text-cyan-100/70" />
      <Check className="absolute bottom-[20%] left-[18%] size-4 text-violet-100/55" />
    </div>
  );
}
