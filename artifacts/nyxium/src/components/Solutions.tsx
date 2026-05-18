import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Zap, ArrowUpRight, Database, Layers } from "lucide-react";

const solutions = [
  {
    icon: Brain,
    label: "01",
    title: "Enterprise AI",
    description: "Deploy production-grade AI systems across your entire enterprise stack. From LLM integrations to custom neural architectures, we build intelligence that scales.",
    metrics: "340% avg ROI",
    color: "blue",
  },
  {
    icon: Zap,
    label: "02",
    title: "Intelligent Automation",
    description: "Replace brittle rule-based workflows with adaptive AI agents that learn, reason, and execute across your most complex business processes.",
    metrics: "60% cost reduction",
    color: "cyan",
  },
  {
    icon: Layers,
    label: "03",
    title: "SaaS Transformation",
    description: "Embed AI-native capabilities into your existing SaaS platforms. Predictive features, intelligent UX, and automated decision-making — shipped in weeks.",
    metrics: "12x faster deployment",
    color: "blue",
  },
  {
    icon: Database,
    label: "04",
    title: "Data Intelligence",
    description: "Transform raw enterprise data into strategic intelligence. Real-time analytics, anomaly detection, and predictive modeling at petabyte scale.",
    metrics: "4.2M records/day",
    color: "cyan",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function SolutionCard({ solution, index }: { solution: typeof solutions[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const Icon = solution.icon;
  const isBlue = solution.color === "blue";

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      animate={hovered ? { rotateX: mousePos.y * -8, rotateY: mousePos.x * 8 } : { rotateX: 0, rotateY: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative group cursor-default"
      data-testid={`card-solution-${index}`}
    >
      <div
        className={`relative h-full rounded-2xl p-8 transition-all duration-500 overflow-hidden
          bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm
          ${hovered ? (isBlue ? "border-blue-500/30 shadow-[0_0_40px_rgba(37,99,235,0.12)]" : "border-cyan-400/30 shadow-[0_0_40px_rgba(6,182,212,0.12)]") : ""}`}
      >
        {/* Corner accent */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${isBlue ? "bg-blue-600/10" : "bg-cyan-400/10"}`} />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isBlue ? "bg-blue-600/20 border border-blue-500/30" : "bg-cyan-400/20 border border-cyan-400/30"}`}>
              <Icon className={`w-5 h-5 ${isBlue ? "text-blue-400" : "text-cyan-400"}`} />
            </div>
            <span className="text-xs font-mono text-white/20">{solution.label}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 font-sans">{solution.title}</h3>
          <p className="text-sm text-white/50 leading-relaxed flex-1">{solution.description}</p>

          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
            <span className={`text-sm font-mono font-medium ${isBlue ? "text-blue-400" : "text-cyan-400"}`}>
              {solution.metrics}
            </span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${hovered ? (isBlue ? "bg-blue-600/20 border-blue-500/40" : "bg-cyan-400/20 border-cyan-400/40") : "border-white/10"}`}>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/60" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const Solutions = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solutions" className="py-32 bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 bg-radial-gradient from-blue-950/20 via-transparent to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6">
            <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">Core Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Built for enterprise.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Designed for scale.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Four interconnected capability pillars that together form an end-to-end AI transformation engine.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {solutions.map((solution, i) => (
            <SolutionCard key={i} solution={solution} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
