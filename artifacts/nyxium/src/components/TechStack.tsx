import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const technologies = [
  { name: "Large Language Models", abbr: "LLM", description: "GPT-4, Claude, Llama & proprietary fine-tuned variants", color: "#3b82f6" },
  { name: "Computer Vision", abbr: "CV", description: "Object detection, segmentation, visual inspection at scale", color: "#22d3ee" },
  { name: "Natural Language Processing", abbr: "NLP", description: "Semantic search, entity extraction, sentiment analysis", color: "#3b82f6" },
  { name: "Neural Networks", abbr: "NN", description: "Deep learning architectures for structured & unstructured data", color: "#22d3ee" },
  { name: "Predictive Analytics", abbr: "PA", description: "Time-series forecasting, anomaly detection, demand modeling", color: "#3b82f6" },
  { name: "Edge AI", abbr: "EA", description: "On-device inference for latency-critical industrial applications", color: "#22d3ee" },
  { name: "Reinforcement Learning", abbr: "RL", description: "Autonomous agents that optimize through environmental feedback", color: "#3b82f6" },
  { name: "Knowledge Graphs", abbr: "KG", description: "Semantic data modeling for enterprise knowledge management", color: "#22d3ee" },
];

const partners = [
  "NVIDIA", "Google Cloud", "Microsoft Azure", "AWS", "Databricks", "Snowflake", "Hugging Face", "PyTorch"
];

export const TechStack = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6">
            <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">Technology</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The full spectrum<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">of AI capability.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Nyxium brings together the most powerful AI disciplines, unified under one enterprise-grade platform.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group glass-panel rounded-2xl p-6 cursor-default transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              style={{ willChange: "transform" }}
              data-testid={`card-tech-${i}`}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}08)`,
                  border: `1px solid ${tech.color}30`,
                  boxShadow: `0 0 20px ${tech.color}10`,
                }}
              >
                <span className="text-xs font-mono font-bold" style={{ color: tech.color }}>{tech.abbr}</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{tech.name}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{tech.description}</p>

              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px ${tech.color}25` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-8">Technology Partners</p>
          <div className="flex flex-wrap justify-center gap-6">
            {partners.map((partner, i) => (
              <div
                key={i}
                className="px-5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-white/30 hover:text-white/60 hover:border-white/[0.12] transition-all duration-300"
              >
                {partner}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
