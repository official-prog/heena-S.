import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

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
      const progress = Math.min((Date.now() - start) / duration, 1);
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const spring = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const yHeading  = useTransform(spring, [0, 1], ["0px", "-60px"]);
  const yPipeline = useTransform(spring, [0, 1], ["0px", "-35px"]);
  const yMetrics  = useTransform(spring, [0, 1], ["0px", "-15px"]);

  return (
    <section id="products" ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      <div className="section-line" />
      {/* Ambient center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-blue-600/5 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        {/* Heading fastest parallax */}
        <motion.div style={{ y: yHeading }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-6">
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">AI Pipeline</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Intelligence in motion.
            </h2>
            <p className="text-lg text-white/35 max-w-xl mx-auto">
              Every enterprise insight travels through five stages of cognitive processing before it reaches your decision-makers.
            </p>
          </motion.div>
        </motion.div>

        {/* Pipeline mid parallax */}
        <motion.div style={{ y: yPipeline }} className="relative mb-24">
          {/* Desktop pipeline */}
          <div className="hidden md:flex items-center justify-between relative">
            <div className="absolute top-8 left-8 right-8 h-px overflow-hidden">
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="w-full h-full bg-gradient-to-r from-blue-500/50 via-cyan-400/50 to-blue-500/50"
              />
              {/* Animated pulse along line */}
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 2.5 }}
                className="absolute top-0 -left-4 w-8 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
              />
            </div>

            {stages.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="flex flex-col items-center relative z-10 w-44"
                data-testid={`stage-pipeline-${i}`}
              >
                <motion.div
                  animate={{ boxShadow: [`0 0 15px ${stage.color}20`, `0 0 30px ${stage.color}40`, `0 0 15px ${stage.color}20`] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border"
                  style={{
                    background: `radial-gradient(circle, ${stage.color}15, transparent)`,
                    borderColor: `${stage.color}35`,
                  }}
                >
                  <span className="text-xs font-mono font-bold" style={{ color: stage.color }}>{stage.id}</span>
                </motion.div>
                <h4 className="text-sm font-semibold text-white text-center mb-1">{stage.label}</h4>
                <p className="text-[11px] text-white/35 text-center leading-tight">{stage.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile pipeline */}
          <div className="md:hidden flex flex-col gap-4">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="flex items-center gap-4 glass-panel rounded-xl p-4"
              >
                <div className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center border"
                  style={{ borderColor: `${stage.color}35` }}>
                  <span className="text-xs font-mono font-bold" style={{ color: stage.color }}>{stage.id}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{stage.label}</h4>
                  <p className="text-xs text-white/35">{stage.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Metrics slowest parallax */}
        <motion.div style={{ y: yMetrics }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="glass-panel rounded-2xl p-6 text-center cursor-default"
                style={{ willChange: "transform" }}
                data-testid={`metric-stat-${i}`}
              >
                <div className="mb-2">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} inView={inView} />
                </div>
                <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">{metric.label}</p>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
