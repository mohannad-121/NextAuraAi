import { motion } from "framer-motion";
import { Activity, Bot, CalendarClock, Dumbbell, Salad, TrendingUp } from "lucide-react";

type CaseStudyDemoProps = {
  tr: any;
};

export function CaseStudyDemo({ tr }: CaseStudyDemoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 36, rotateY: -8 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative perspective-card"
    >
      <div className="absolute -inset-5 rounded-3xl blur-3xl opacity-45" style={{ background: "var(--gradient-primary)" }} />
      <div className="relative overflow-hidden rounded-3xl glass glow-border p-3 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-400/70" />
            <div className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <div className="h-2 w-2 rounded-full bg-green-400/70" />
          </div>
          <span className="text-[0.7rem] text-muted-foreground sm:text-xs">{tr.caseStudy.dashboardUrl}</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-border/60 bg-background/55 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{tr.caseStudy.today}</div>
                <div className="mt-2 font-display text-xl font-bold sm:text-2xl">{tr.caseStudy.plan}</div>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/20">
                <Dumbbell className="h-6 w-6 text-cyan" />
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              {tr.caseStudy.workouts.map(([name, sets]: [string, string], i: number) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-card/30 px-3 py-3 text-sm"
                >
                  <span>{name}</span>
                  <span className="text-gradient font-mono font-semibold">{sets}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[72, 84, 58].map((height, index) => (
                <div key={height} className="flex h-20 items-end rounded-xl border border-border/50 bg-card/30 p-2">
                  <motion.div className="w-full rounded-lg" style={{ background: "var(--gradient-primary)" }} initial={{ height: "16%" }} whileInView={{ height: `${height}%` }} viewport={{ once: true }} transition={{ delay: 0.25 + index * 0.1 }} />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Bot className="h-4 w-4 text-cyan" />
                AI Coach
              </div>
              <motion.p
                className="typing-line text-sm leading-6 text-muted-foreground"
                initial={{ width: "35%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.3 }}
              >
                {tr.caseStudy.coach}
              </motion.p>
            </div>

            {[
              [Salad, tr.caseStudy.features[2], "2,450 kcal"],
              [CalendarClock, tr.caseStudy.features[4], "5 days"],
              [TrendingUp, tr.caseStudy.features[3], "88%"],
              [Activity, tr.caseStudy.features[5], "Live"],
            ].map(([Icon, label, value]: any, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-card/45 p-3 text-sm"
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-cyan" />
                  {label}
                </span>
                <span className="font-mono text-gradient">{value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
