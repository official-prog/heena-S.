import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ParticleNetwork } from "./ui/ParticleNetwork";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yForeground = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const transitionConfig = { ease: [0.22, 1, 0.36, 1], duration: 0.9 };

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Particle Network */}
      <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0">
        <ParticleNetwork />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
      </motion.div>

      <div className="container relative z-20 px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          style={{ y: yForeground, opacity }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Nyxium OS 4.0 Now Live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
          >
            Intelligence <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary/80 to-cyan-400">at Scale</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.3 }}
            className="text-lg md:text-xl text-white/60 mb-10 max-w-xl font-light leading-relaxed"
          >
            We build next-generation AI infrastructure for the world's most ambitious enterprises. Transform your operations with cognitive automation and predictive intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8 glow-accent">
              Deploy Nyxium
            </Button>
            <Button size="lg" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 h-14 px-8 backdrop-blur-md">
              Read the Whitepaper
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating UI Elements */}
        <motion.div 
          style={{ y: yForeground, opacity }}
          className="hidden lg:block relative h-[600px] w-full perspective-1000"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-0 w-[400px] glass-panel rounded-xl p-6 z-20 transform rotate-y-[-10deg] rotate-x-[5deg]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider">Neural Inference</h3>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
              </div>
            </div>
            <div className="space-y-4">
              {[78, 92, 64, 88].map((val, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70">Model Node 0{i+1}</span>
                    <span className="text-cyan-400 font-mono">{val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                      className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-0 w-[320px] glass-panel rounded-xl p-6 z-30 transform rotate-y-[15deg] rotate-x-[10deg]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="text-primary font-bold">4.2M</span>
              </div>
              <div>
                <h4 className="text-sm text-white font-medium">Ops Processed</h4>
                <p className="text-xs text-white/50">per second</p>
              </div>
            </div>
            <div className="h-24 w-full flex items-end gap-2 mt-4">
              {[40, 60, 45, 80, 55, 90, 70, 100].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: 1 + i * 0.1 }}
                  className="w-full bg-white/10 rounded-t-sm"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
