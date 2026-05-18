import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stages = [
  { id: "01", label: "Data Collection", sub: "Unified ingestion across 200+ sources", color: "#3b82f6" },
  { id: "02", label: "Processing", sub: "Real-time normalization & enrichment", color: "#22d3ee" },
  { id: "03", label: "Model Training", sub: "Distributed neural network optimization", color: "#3b82f6" },
  { id: "04", label: "Insight Generation", sub: "Probabilistic reasoning & pattern recognition", color: "#22d3ee" },
  { id: "05", label: "Business Action", sub: "Automated decision & workflow execution", color: "#3b82f6" },
];

const metrics = [
  { value: 99.7, suffix: "%", label: "Inference Accuracy" },
  { value: 2.4, suffix: "ms", label: "Avg Latency" },
  { value: 340, suffix: "%", label: "ROI Uplift" },
  { value: 4.2, suffix: "M", label: "Records/Day" },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(parseFloat((value * eased).toFixed(value % 1 !== 0 ? 1 : 0)));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="text-3xl md:text-4xl font-bold text-white font-mono tabular-nums">
      {display}{suffix}
    </span>
  );
}

export const AiInAction = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-6">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">AI Pipeline</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Intelligence in motion.
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Every enterprise insight travels through five stages of cognitive processing before it reaches your decision-makers.
          </p>
        </motion.div>

        {/* Pipeline */}
        <div className="relative mb-24">
          <div className="hidden md:flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-8 left-8 right-8 h-px">
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-gradient-to-r from-blue-500/60 via-cyan-400/60 to-blue-500/60 w-full"
              />
            </div>

            {stages.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center relative z-10 w-40"
                data-testid={`stage-pipeline-${i}`}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border"
                  style={{
                    background: `radial-gradient(circle, ${stage.color}20, transparent)`,
                    borderColor: `${stage.color}40`,
                    boxShadow: `0 0 20px ${stage.color}20`,
                  }}
                >
                  <span className="text-xs font-mono font-bold" style={{ color: stage.color }}>{stage.id}</span>
                </div>
                <h4 className="text-sm font-semibold text-white text-center mb-1">{stage.label}</h4>
                <p className="text-[11px] text-white/40 text-center leading-tight">{stage.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile: vertical pipeline */}
          <div className="md:hidden flex flex-col gap-4">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 glass-panel rounded-xl p-4"
              >
                <div
                  className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center border"
                  style={{ borderColor: `${stage.color}40`, boxShadow: `0 0 15px ${stage.color}20` }}
                >
                  <span className="text-xs font-mono font-bold" style={{ color: stage.color }}>{stage.id}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{stage.label}</h4>
                  <p className="text-xs text-white/40">{stage.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="glass-panel rounded-2xl p-6 text-center"
              data-testid={`metric-stat-${i}`}
            >
              <div className="mb-2">
                <AnimatedCounter value={metric.value} suffix={metric.suffix} inView={inView} />
              </div>
              <p className="text-xs text-white/40 font-mono uppercase tracking-widest">{metric.label}</p>
              <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
