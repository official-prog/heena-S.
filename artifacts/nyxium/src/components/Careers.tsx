import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

const values = [
  { title: "Build at the frontier", description: "You'll work on problems that don't have textbook solutions. We operate at the edge of what's technically possible." },
  { title: "Ownership by default", description: "Every engineer owns their domain end-to-end. No waiting for approvals, no committees — just conviction and execution." },
  { title: "Rigour meets creativity", description: "We believe the best AI systems are simultaneously scientifically rigorous and imaginatively designed." },
  { title: "Impact at scale", description: "The work you do at Nyxium shapes how entire industries operate. Your models run in production. Your decisions matter." },
];

const openRoles = [
  { title: "AI Research Engineer", team: "Research", level: "Senior" },
  { title: "Enterprise Solutions Architect", team: "Solutions", level: "Lead" },
  { title: "ML Infrastructure Engineer", team: "Platform", level: "Senior" },
  { title: "Product Designer — AI Systems", team: "Design", level: "Mid-Senior" },
  { title: "Applied Scientist — NLP", team: "Research", level: "Senior" },
  { title: "Enterprise Account Executive", team: "Sales", level: "Senior" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const Careers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const spring = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const yLeft  = useTransform(spring, [0, 1], ["0px", "-50px"]);
  const yRight = useTransform(spring, [0, 1], ["0px", "-30px"]);

  return (
    <section id="careers" ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      <div className="section-line" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">

          {/* Left column — fastest */}
          <motion.div style={{ y: yLeft }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
                <span className="text-xs font-mono text-white/50 tracking-widest uppercase">Careers</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Build the future<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">from London.</span>
              </h2>
              <p className="text-lg text-white/35 mb-4 leading-relaxed">
                We're a team of researchers, engineers, and builders who believe AI is the most important technology of our generation.
              </p>
              <div className="flex items-center gap-2 mb-10 text-sm text-white/25">
                <MapPin className="w-4 h-4" />
                <span>Headquarters: London, EC2A — Shoreditch</span>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid sm:grid-cols-2 gap-5"
              >
                {values.map((v, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -3, transition: { duration: 0.25 } }}
                    className="glass-panel rounded-xl p-5 cursor-default"
                    style={{ willChange: "transform" }}
                    data-testid={`card-value-${i}`}
                  >
                    <h4 className="text-sm font-semibold text-white mb-2">{v.title}</h4>
                    <p className="text-xs text-white/35 leading-relaxed">{v.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right column — slower */}
          <motion.div style={{ y: yRight }}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.25em] mb-6">Open Positions</p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="space-y-3"
              >
                {openRoles.map((role, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="group flex items-center justify-between p-5 rounded-xl glass-panel
                      hover:border-blue-500/20 hover:bg-blue-600/[0.03] transition-colors duration-300 cursor-pointer"
                    style={{ willChange: "transform" }}
                    data-testid={`button-role-${i}`}
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors duration-200">{role.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-white/25 font-mono">{role.team}</span>
                        <span className="w-1 h-1 rounded-full bg-white/15" />
                        <span className="text-xs text-white/25 font-mono">{role.level}</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/[0.08] group-hover:border-blue-500/30 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600/10 shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/35 group-hover:text-blue-400 transition-colors duration-200" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-6 p-5 rounded-xl border border-dashed border-white/[0.07] text-center"
              >
                <p className="text-sm text-white/25 mb-3">Don't see your role? We hire for exceptional talent.</p>
                <button
                  className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  data-testid="button-open-application"
                >
                  Send an open application
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
