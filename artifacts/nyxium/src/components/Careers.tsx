import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

const values = [
  {
    title: "Build at the frontier",
    description: "You'll work on problems that don't have textbook solutions. We operate at the edge of what's technically possible.",
  },
  {
    title: "Ownership by default",
    description: "Every engineer owns their domain end-to-end. No waiting for approvals, no committees — just conviction and execution.",
  },
  {
    title: "Rigour meets creativity",
    description: "We believe the best AI systems are simultaneously scientifically rigorous and imaginatively designed.",
  },
  {
    title: "Impact at scale",
    description: "The work you do at Nyxium shapes how entire industries operate. Your models run in production. Your decisions matter.",
  },
];

const openRoles = [
  { title: "AI Research Engineer", team: "Research", level: "Senior" },
  { title: "Enterprise Solutions Architect", team: "Solutions", level: "Lead" },
  { title: "ML Infrastructure Engineer", team: "Platform", level: "Senior" },
  { title: "Product Designer — AI Systems", team: "Design", level: "Mid-Senior" },
  { title: "Applied Scientist — NLP", team: "Research", level: "Senior" },
  { title: "Enterprise Account Executive", team: "Sales", level: "Senior" },
];

export const Careers = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="careers" className="py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
              <span className="text-xs font-mono text-white/60 tracking-widest uppercase">Careers</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Build the future<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">from London.</span>
            </h2>
            <p className="text-lg text-white/40 mb-4 leading-relaxed">
              We're a team of researchers, engineers, and builders who believe AI is the most important technology of our generation.
            </p>
            <div className="flex items-center gap-2 mb-10 text-sm text-white/30">
              <MapPin className="w-4 h-4" />
              <span>Headquarters: London, EC2A — Shoreditch</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-panel rounded-xl p-5"
                  data-testid={`card-value-${i}`}
                >
                  <h4 className="text-sm font-semibold text-white mb-2">{v.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Open Roles */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">Open Positions</p>
            <div className="space-y-3">
              {openRoles.map((role, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center justify-between p-5 rounded-xl glass-panel hover:border-blue-500/20 hover:bg-blue-600/[0.04] transition-all duration-300 cursor-pointer"
                  data-testid={`button-role-${i}`}
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">{role.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-white/30 font-mono">{role.team}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-xs text-white/30 font-mono">{role.level}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-blue-500/30 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600/10 shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-blue-400 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-6 p-5 rounded-xl border border-dashed border-white/[0.08] text-center"
            >
              <p className="text-sm text-white/30 mb-3">Don't see your role? We hire for exceptional talent.</p>
              <button
                className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors"
                data-testid="button-open-application"
              >
                Send an open application
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
