import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Unified AI orchestration layer across all enterprise systems",
  "Real-time model performance monitoring and auto-retraining",
  "Enterprise-grade security with SOC 2 Type II compliance",
  "Sub-10ms inference latency with global edge deployment",
  "No-code workflow builder for non-technical stakeholders",
  "Seamless integration with existing ERP and CRM infrastructure",
];

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[520px] glass-panel rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8),0_0_60px_rgba(37,99,235,0.1)]">
      {/* Top Bar */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-5 rounded-md bg-white/[0.04] flex items-center px-3">
            <span className="text-[10px] text-white/30 font-mono">nyxium.ai/dashboard</span>
          </div>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="p-5 space-y-4">
        {/* Metric Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Active Models", value: "24", trend: "+3" },
            { label: "Inference/s", value: "42K", trend: "+18%" },
            { label: "Accuracy", value: "99.7%", trend: "+0.2%" },
          ].map((m, i) => (
            <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-wider mb-1">{m.label}</p>
              <p className="text-base font-bold text-white font-mono">{m.value}</p>
              <p className="text-[10px] text-green-400 font-mono mt-0.5">{m.trend}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Neural Throughput</span>
            <span className="text-[10px] font-mono text-cyan-400">Live</span>
          </div>
          <div className="h-20 flex items-end gap-1.5">
            {[35, 52, 41, 68, 55, 78, 62, 88, 72, 95, 80, 100, 85, 92, 76, 98].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 rounded-t-sm"
                style={{
                  background: `linear-gradient(180deg, ${i > 10 ? "#22d3ee" : "#3b82f6"} 0%, rgba(37,99,235,0.2) 100%)`,
                  opacity: 0.7 + (i / 16) * 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Model List */}
        <div className="space-y-2">
          {[
            { name: "NLP Classifier v3", status: "Active", load: 87, color: "blue" },
            { name: "Vision Analyzer", status: "Active", load: 62, color: "cyan" },
            { name: "Predictive Engine", status: "Training", load: 34, color: "blue" },
          ].map((model, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
              <div className={`w-2 h-2 rounded-full ${model.status === "Active" ? "bg-green-400" : "bg-yellow-400"} animate-pulse`} />
              <span className="text-xs text-white/70 flex-1 font-mono">{model.name}</span>
              <span className={`text-[10px] font-mono ${model.status === "Active" ? "text-green-400" : "text-yellow-400"}`}>{model.status}</span>
              <div className="w-16 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${model.load}%` }}
                  transition={{ duration: 1.5, delay: 0.2 * i }}
                  className={`h-full rounded-full ${model.color === "blue" ? "bg-blue-500" : "bg-cyan-400"}`}
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
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yForeground = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yBackground = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="enterprise" ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-cyan-400/5 blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Dashboard side */}
          <motion.div
            style={{ y: yForeground }}
            className="flex justify-center lg:justify-end order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <DashboardMockup />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            style={{ y: yBackground }}
            className="order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6">
                <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">The Platform</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                One platform.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Infinite intelligence.</span>
              </h2>
              <p className="text-lg text-white/40 mb-10 leading-relaxed">
                Nyxium OS is the operating layer for enterprise AI — a unified control plane that orchestrates every model, workflow, and data stream across your organization.
              </p>

              <ul className="space-y-4">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-white/60 leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                <button
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)]"
                  data-testid="button-explore-platform"
                >
                  Explore the Platform
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
