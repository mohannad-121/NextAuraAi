import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/translations";
import { FitCoachDemo } from "@/components/landing/FitCoachDemo";
import { PremiumSectionTitle } from "@/components/landing/PremiumSectionTitle";

type CaseStudyProps = {
  onStartProject: () => void;
};

export function CaseStudy({ onStartProject }: CaseStudyProps) {
  const { tr, dir } = useLanguage();
  const featureCards = tr.caseStudy.features.slice(0, 4);

  return (
    <section id="work" className="mixed-section relative overflow-hidden py-16 md:py-28">
      <div
        className="absolute inset-x-0 top-24 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div className="mx-auto max-w-[88rem] px-5 sm:px-6 xl:px-8">
        <PremiumSectionTitle
          eyebrow={tr.caseStudy.eyebrow}
          title={tr.caseStudy.titleA}
          accent={tr.caseStudy.titleB}
          subtitle={tr.caseStudy.desc}
          align={dir === "rtl" ? "right" : "left"}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[0.82fr_1.35fr] lg:items-center xl:gap-16"
        >
          <div className={`min-w-0 ${dir === "rtl" ? "text-right" : "text-left"}`}>
            <div className="grid gap-5">
              <div className="rounded-3xl border border-border/60 bg-card/45 p-6 backdrop-blur-xl sm:p-7">
                <div className="text-base font-semibold text-foreground">
                  {tr.caseStudy.problem}
                </div>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  {tr.caseStudy.problemText}
                </p>
              </div>
              <div className="rounded-3xl border border-primary/30 bg-primary/10 p-6 backdrop-blur-xl sm:p-7">
                <div className="text-base font-semibold text-foreground">
                  {tr.caseStudy.solution}
                </div>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  {tr.caseStudy.solutionText}
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {featureCards.map((feature: string, index: number) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-2xl border border-border/60 bg-background/45 p-5 text-sm backdrop-blur"
                >
                  <span className="font-mono text-xs text-cyan">0{index + 1}</span>
                  <div className="mt-2 text-base font-semibold leading-7">{feature}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:max-w-md">
              <a
                href="https://fit-coach-ai-frontend.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm"
              >
                {tr.caseStudy.viewProject}
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={onStartProject}
                className="btn-ghost inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-sm"
              >
                {tr.caseStudy.request}
              </button>
            </div>
          </div>

          <FitCoachDemo tr={tr} />
        </motion.div>
      </div>
    </section>
  );
}
