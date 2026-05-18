import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const spring = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const yHeading = useTransform(spring, [0, 1], ["0px", "-50px"]);
  const yCards   = useTransform(spring, [0, 1], ["0px", "-25px"]);

  return (
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      <div className="section-line" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div style={{ y: yHeading }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
              <span className="text-xs font-mono text-white/50 tracking-widest uppercase">Case Studies</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transformation<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">at enterprise scale.</span>
            </h2>
            <p className="text-lg text-white/35 max-w-xl mx-auto">
              Real outcomes from real enterprises. Not projections, verified results.
            </p>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: yCards }} className="space-y-8">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }}
              className="group relative glass-panel rounded-2xl p-8 md:p-10 overflow-hidden
                hover:border-white/[0.14] transition-colors duration-500 cursor-default"
              style={{ willChange: "transform" }}
              data-testid={`card-case-${i}`}
            >
              {/* Accent glow on hover */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${c.accent}10, transparent 70%)` }}
              />
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-8 bottom-8 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(180deg, transparent, ${c.accent}60, transparent)` }}
              />

              <div className="relative z-10 grid md:grid-cols-[1fr,auto] gap-8 items-start">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium border"
                      style={{ color: c.accent, borderColor: `${c.accent}35`, background: `${c.accent}0d` }}
                    >
                      {c.industry}
                    </span>
                    <span className="text-xs text-white/25 font-mono">{c.client}</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-1.5">Challenge</p>
                      <p className="text-sm text-white/45 leading-relaxed">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-1.5">Outcome</p>
                      <p className="text-sm text-white/65 leading-relaxed">{c.outcome}</p>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col gap-6 md:gap-5 shrink-0 md:min-w-[120px]">
                  {c.metrics.map((m, j) => (
                    <div key={j} className="text-center md:text-right">
                      <p className="text-2xl md:text-3xl font-bold font-mono" style={{ color: c.accent }}>{m.value}</p>
                      <p className="text-[10px] text-white/25 font-mono uppercase tracking-wide mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-white/25"
                data-testid={`button-case-${i}`}
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-white/50" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
