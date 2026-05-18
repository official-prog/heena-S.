import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

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

const partners = ["NVIDIA", "Google Cloud", "Microsoft Azure", "AWS", "Databricks", "Snowflake", "Hugging Face", "PyTorch"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const spring = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const yHeading = useTransform(spring, [0, 1], ["0px", "-50px"]);
  const yGrid    = useTransform(spring, [0, 1], ["0px", "-25px"]);
  const yPartner = useTransform(spring, [0, 1], ["0px", "-10px"]);

  return (
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      <div className="section-line" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.018)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Heading */}
        <motion.div style={{ y: yHeading }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6">
              <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">Technology</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              The full spectrum<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">of AI capability.</span>
            </h2>
            <p className="text-lg text-white/35 max-w-xl mx-auto">
              Nyxium brings together the most powerful AI disciplines, unified under one enterprise-grade platform.
            </p>
          </motion.div>
        </motion.div>

        {/* Tech grid */}
        <motion.div style={{ y: yGrid }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20"
          >
            {technologies.map((tech, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }}
                className="group glass-panel rounded-2xl p-6 cursor-default transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
                style={{ willChange: "transform" }}
                data-testid={`card-tech-${i}`}
              >
                {/* Hover corner glow */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${tech.color}15, transparent)` }}
                />

                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${tech.color}18, ${tech.color}06)`,
                    border: `1px solid ${tech.color}28`,
                  }}
                >
                  <span className="text-xs font-mono font-bold" style={{ color: tech.color }}>{tech.abbr}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{tech.name}</h3>
                <p className="text-xs text-white/35 leading-relaxed">{tech.description}</p>

                {/* Glow border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 0 1px ${tech.color}22` }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Partners */}
        <motion.div style={{ y: yPartner }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center"
          >
            <p className="text-[10px] font-mono text-white/20 tracking-[0.25em] uppercase mb-8">Technology Partners</p>
            <div className="flex flex-wrap justify-center gap-4">
              {partners.map((partner, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="px-5 py-2.5 rounded-lg bg-white/[0.025] border border-white/[0.05] text-xs font-mono text-white/25
                    hover:text-white/55 hover:border-white/[0.10] hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                >
                  {partner}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
