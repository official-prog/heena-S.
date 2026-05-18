import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Unified AI orchestration layer across all enterprise systems",
  "Real-time model performance monitoring and auto-retraining",
  "Enterprise-grade security with SOC 2 Type II compliance",
  "Sub-10ms inference latency with global edge deployment",
  "No-code workflow builder for non-technical stakeholders",
  "Seamless integration with existing ERP and CRM infrastructure",
];

function DashboardMockup({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full max-w-[540px] glass-panel-strong rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8),0_0_80px_rgba(37,99,235,0.08)]">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.05]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-5 rounded-md bg-white/[0.04] flex items-center px-3">
            <span className="text-[10px] text-white/25 font-mono">nyxium.ai/dashboard Production</span>
          </div>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-400/80 animate-pulse" />
      </div>

      <div className="p-5 space-y-4">
        {/* Metric row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Active Models", value: "24", trend: "+3", color: "#3b82f6" },
            { label: "Inference/s", value: "42K", trend: "+18%", color: "#22d3ee" },
            { label: "Accuracy", value: "99.7%", trend: "+0.2%", color: "#3b82f6" },
          ].map((m, i) => (
            <div key={i} className="bg-white/[0.025] rounded-xl p-3 border border-white/[0.05]">
              <p className="text-[9px] font-mono text-white/25 uppercase tracking-wider mb-1">{m.label}</p>
              <p className="text-base font-bold text-white font-mono">{m.value}</p>
              <p className="text-[10px] font-mono mt-0.5 text-green-400">{m.trend}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white/[0.025] rounded-xl p-4 border border-white/[0.05]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Neural Throughput 24h</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono text-cyan-400">Live</span>
            </div>
          </div>
          <div className="h-24 flex items-end gap-1">
            {[30, 50, 38, 65, 52, 75, 60, 88, 70, 95, 78, 100, 82, 91, 75, 96, 83, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformOrigin: "bottom",
                  height: `${h}%`,
                  background: `linear-gradient(180deg, ${i > 12 ? "#22d3ee" : "#3b82f6"} 0%, rgba(37,99,235,0.1) 100%)`,
                  opacity: 0.5 + (i / 18) * 0.5,
                }}
                className="flex-1 rounded-t-sm"
              />
            ))}
          </div>
        </div>

        {/* Model list */}
        <div className="space-y-2">
          {[
            { name: "NLP Classifier v3.2", status: "Active", load: 87, color: "#3b82f6" },
            { name: "Vision Analyzer", status: "Active", load: 62, color: "#22d3ee" },
            { name: "Predictive Engine", status: "Training", load: 34, color: "#3b82f6" },
          ].map((model, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/[0.018] rounded-lg p-3 border border-white/[0.04]">
              <div className={`w-2 h-2 rounded-full shrink-0 ${model.status === "Active" ? "bg-green-400 animate-pulse" : "bg-yellow-400"}`} />
              <span className="text-xs text-white/60 flex-1 font-mono">{model.name}</span>
              <span className={`text-[10px] font-mono ${model.status === "Active" ? "text-green-400" : "text-yellow-400"}`}>{model.status}</span>
              <div className="w-16 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${model.load}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.2 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: model.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const PlatformShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const spring = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });

  // Foreground dashboard moves more
  const yDashboard = useTransform(spring, [0, 1], ["0px", "-80px"]);
  // Text moves less
  const yText = useTransform(spring, [0, 1], ["0px", "-35px"]);

  return (
    <section id="enterprise" ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      <div className="section-line" />
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-blue-600/5 blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-cyan-400/4 blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Dashboard foreground, moves faster */}
          <motion.div
            style={{ y: yDashboard }}
            className="flex justify-center lg:justify-end order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -12, 0], rotateZ: [-0.3, 0.3, -0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform" }}
              >
                <DashboardMockup inView={inView} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text background, moves slower */}
          <motion.div
            style={{ y: yText }}
            className="order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6">
                <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">The Platform</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                One platform.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Infinite intelligence.
                </span>
              </h2>
              <p className="text-lg text-white/35 mb-10 leading-relaxed">
                Nyxium OS is the operating layer for enterprise AI, a unified control plane that orchestrates every model, workflow, and data stream across your organisation.
              </p>

              <ul className="space-y-4">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-white/55 leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(37,99,235,0.6)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium text-sm
                    shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-colors duration-300 hover:bg-blue-500"
                  data-testid="button-explore-platform"
                >
                  Explore the Platform
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
