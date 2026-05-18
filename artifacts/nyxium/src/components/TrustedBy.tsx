import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const clients = [
  "AURA FINANCIAL", "STELLARIS DYNAMICS", "NEXUS HEALTH", "QUANTUM LOGISTICS",
  "OMNI GLOBAL", "MERIDIAN CAPITAL", "VANGUARD MOTORS", "CYGNUS AEROSPACE",
  "AURA FINANCIAL", "STELLARIS DYNAMICS", "NEXUS HEALTH", "QUANTUM LOGISTICS",
  "OMNI GLOBAL", "MERIDIAN CAPITAL", "VANGUARD MOTORS", "CYGNUS AEROSPACE",
];

export const TrustedBy = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spring = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const ySection = useTransform(spring, [0, 1], ["0px", "-30px"]);
  const opacity  = useTransform(spring, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ y: ySection, opacity }}
      className="py-14 border-y border-white/[0.04] overflow-hidden relative"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="text-center mb-6">
        <p className="text-[10px] font-mono text-white/25 tracking-[0.25em] uppercase">
          Trusted by forward-thinking enterprises
        </p>
      </div>

      {/* Ticker row 1 — left */}
      <div className="relative w-full flex overflow-x-hidden mb-4">
        <motion.div
          className="flex whitespace-nowrap gap-16 py-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
        >
          {clients.map((client, index) => (
            <div key={index} className="flex items-center gap-8 shrink-0">
              <span className="text-lg md:text-xl font-bold text-white/15 uppercase tracking-[0.15em]">
                {client}
              </span>
              <span className="w-1 h-1 rounded-full bg-blue-500/30 shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Ticker row 2 — right (opposite direction) */}
      <div className="relative w-full flex overflow-x-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-16 py-2"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 55 }}
        >
          {[...clients].reverse().map((client, index) => (
            <div key={index} className="flex items-center gap-8 shrink-0">
              <span className="text-sm font-medium text-white/10 uppercase tracking-[0.12em]">
                {client}
              </span>
              <span className="w-1 h-1 rounded-full bg-cyan-500/20 shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
