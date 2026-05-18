import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    industry: "Financial Services",
    client: "Meridian Capital Group",
    challenge: "Legacy risk modeling infrastructure couldn't keep pace with market volatility, leading to delayed hedging decisions and significant exposure.",
    outcome: "Deployed Nyxium Predictive Engine across 14 trading desks, enabling real-time risk recalculation with 99.3% accuracy.",
    metrics: [
      { value: "340%", label: "ROI in 18 months" },
      { value: "94ms", label: "Risk recalc latency" },
      { value: "$2.1B", label: "Assets protected" },
    ],
    accent: "#3b82f6",
  },
  {
    industry: "Healthcare",
    client: "Nexus Health Systems",
    challenge: "Clinical documentation consumed 40% of physician time, reducing patient-facing hours and contributing to burnout across a 12-hospital network.",
    outcome: "Nyxium NLP Classifier automated clinical note generation and ICD coding, freeing physicians for high-value care activities.",
    metrics: [
      { value: "60%", label: "Admin time reduced" },
      { value: "4.2M", label: "Records processed/day" },
      { value: "99.7%", label: "Coding accuracy" },
    ],
    accent: "#22d3ee",
  },
  {
    industry: "Manufacturing",
    client: "Vanguard Industrial",
    challenge: "Unplanned downtime at 8 global facilities cost an estimated $180M annually, with reactive maintenance creating cascading production delays.",
    outcome: "Predictive maintenance models trained on sensor telemetry now anticipate failures 72 hours ahead with 94% recall.",
    metrics: [
      { value: "83%", label: "Downtime reduction" },
      { value: "72hr", label: "Failure prediction" },
      { value: "$147M", label: "Annual savings" },
    ],
    accent: "#3b82f6",
  },
];

export const CaseStudies = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
            <span className="text-xs font-mono text-white/60 tracking-widest uppercase">Case Studies</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transformation<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">at enterprise scale.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Real outcomes from real enterprises. Not projections — verified results.
          </p>
        </motion.div>

        <div className="space-y-8">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative glass-panel rounded-2xl p-8 md:p-10 overflow-hidden hover:border-white/[0.15] transition-all duration-500"
              data-testid={`card-case-${i}`}
            >
              {/* Accent glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `radial-gradient(circle, ${c.accent}10, transparent)` }}
              />

              <div className="relative z-10 grid md:grid-cols-[1fr,auto] gap-8 items-start">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium border"
                      style={{ color: c.accent, borderColor: `${c.accent}40`, background: `${c.accent}10` }}
                    >
                      {c.industry}
                    </span>
                    <span className="text-xs text-white/30 font-mono">{c.client}</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">Challenge</p>
                      <p className="text-sm text-white/50 leading-relaxed">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">Outcome</p>
                      <p className="text-sm text-white/70 leading-relaxed">{c.outcome}</p>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col gap-6 md:gap-4 shrink-0">
                  {c.metrics.map((m, j) => (
                    <div key={j} className="text-center md:text-right">
                      <p className="text-2xl md:text-3xl font-bold font-mono" style={{ color: c.accent }}>{m.value}</p>
                      <p className="text-xs text-white/30 font-mono uppercase tracking-wide mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-white/30"
                data-testid={`button-case-${i}`}
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-white/60" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
