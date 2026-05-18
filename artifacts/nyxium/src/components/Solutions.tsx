import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
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
    description: "Embed AI-native capabilities into your existing SaaS platforms. Predictive features, intelligent UX, and automated decision-making shipped in weeks.",
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
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function SolutionCard({ solution, index }: { solution: typeof solutions[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
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
      animate={hovered ? { rotateX: mousePos.y * -8, rotateY: mousePos.x * 8, y: -6 } : { rotateX: 0, rotateY: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000, willChange: "transform" }}
      className="relative group cursor-default"
      data-testid={`card-solution-${index}`}
    >
      <div className={`relative h-full rounded-2xl p-8 transition-all duration-500 overflow-hidden
          bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm
          ${hovered ? (isBlue ? "border-blue-500/30 shadow-[0_20px_60px_rgba(37,99,235,0.12)]" : "border-cyan-400/30 shadow-[0_20px_60px_rgba(6,182,212,0.12)]") : "shadow-[0_4px_24px_rgba(0,0,0,0.3)]"}`}
      >
        {/* Corner radial glow */}
        <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"} ${isBlue ? "bg-blue-600/12" : "bg-cyan-400/12"}`} />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isBlue ? "bg-blue-600/15 border border-blue-500/25" : "bg-cyan-400/15 border border-cyan-400/25"}`}>
              <Icon className={`w-5 h-5 ${isBlue ? "text-blue-400" : "text-cyan-400"}`} />
            </div>
            <span className="text-xs font-mono text-white/15">{solution.label}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>
          <p className="text-sm text-white/45 leading-relaxed flex-1">{solution.description}</p>

          <div className="mt-8 pt-6 border-t border-white/[0.05] flex items-center justify-between">
            <span className={`text-sm font-mono font-medium ${isBlue ? "text-blue-400" : "text-cyan-400"}`}>{solution.metrics}</span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300
              ${hovered ? (isBlue ? "bg-blue-600/20 border-blue-500/40" : "bg-cyan-400/20 border-cyan-400/40") : "border-white/[0.08]"}`}>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/50" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const Solutions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const spring = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const yHeading = useTransform(spring, [0, 1], ["0px", "-40px"]);
  const yCards   = useTransform(spring, [0, 1], ["0px", "-20px"]);

  return (
    <section id="solutions" ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      <div className="section-line" />
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.025)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Heading parallax layer */}
        <motion.div style={{ y: yHeading }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6">
              <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">Core Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Built for enterprise.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Designed for scale.</span>
            </h2>
            <p className="text-lg text-white/35 max-w-xl mx-auto">
              Four interconnected capability pillars that together form an end-to-end AI transformation engine.
            </p>
          </motion.div>
        </motion.div>

        {/* Cards parallax layer moves slightly slower */}
        <motion.div style={{ y: yCards }}>
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
        </motion.div>
      </div>
    </section>
  );
};
