import React from "react";
import { motion } from "framer-motion";

export const TrustedBy = () => {
  const clients = [
    "AURA FINANCIAL", "STELLARIS DYNAMICS", "NEXUS HEALTH", "QUANTUM LOGISTICS", 
    "OMNI GLOBAL", "MERIDIAN CAPITAL", "VANGUARD MOTORS", "CYGNUS AEROSPACE",
    "AURA FINANCIAL", "STELLARIS DYNAMICS", "NEXUS HEALTH", "QUANTUM LOGISTICS"
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-background/50 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-mono text-white/40 tracking-[0.2em] uppercase">Trusted by forward-thinking enterprises</p>
      </div>
      
      <div className="relative w-full flex overflow-x-hidden">
        {/* Left/Right Gradients for smooth fade out */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div 
          className="flex whitespace-nowrap gap-16 py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40
          }}
        >
          {clients.map((client, index) => (
            <div key={index} className="flex items-center justify-center shrink-0">
              <span className="text-xl md:text-2xl font-bold text-white/20 uppercase tracking-wider font-sans">
                {client}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
