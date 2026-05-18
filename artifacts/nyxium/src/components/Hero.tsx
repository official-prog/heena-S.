import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionTemplate,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { ParticleNetwork } from "./ui/ParticleNetwork";

const ease = [0.22, 1, 0.36, 1] as const;

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  /* ── Velocity-driven motion blur ── */
  const velocity = useVelocity(scrollY);
  const rawBlur = useTransform(velocity, [-2500, 0, 2500], [6, 0, 6]);
  const blur = useSpring(rawBlur, { stiffness: 80, damping: 20 });
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  /* ── Parallax layers (foreground moves faster than background) ── */
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Layer 0 — deepest bg (particle net)
  const yBg      = useTransform(progress, [0, 1], ["0%",   "20%"]);
  // Layer 1 — mid ambient orbs
  const yMid     = useTransform(progress, [0, 1], ["0%",   "35%"]);
  // Layer 2 — text column
  const yText    = useTransform(progress, [0, 1], ["0%",   "55%"]);
  // Layer 3 — foreground cards (fastest)
  const yCards   = useTransform(progress, [0, 1], ["0%",   "75%"]);

  const opacity  = useTransform(progress, [0, 0.85], [1, 0]);
  const scale    = useTransform(progress, [0, 1],    [1, 0.97]);

  const transitionIn = { ease, duration: 0.9 };

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background pt-20"
    >
      {/* ── Background: particle net — slowest layer ── */}
      <motion.div
        style={{ y: yBg, willChange: "transform" }}
        className="absolute inset-0 z-0"
      >
        <ParticleNetwork />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-10" />
      </motion.div>

      {/* ── Mid ambient layer: radial glows ── */}
      <motion.div
        style={{ y: yMid, willChange: "transform" }}
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
        {/* Subtle horizontal scan line */}
        <motion.div
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
        />
      </motion.div>

      {/* ── Floating ambient orbs (deep parallax) ── */}
      <motion.div
        style={{ y: yMid, willChange: "transform" }}
        className="absolute inset-0 z-[2] pointer-events-none"
      >
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-2 h-2 rounded-full bg-blue-400/40"
        />
        <motion.div
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-40 right-20 w-1.5 h-1.5 rounded-full bg-cyan-400/30"
        />
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, -25, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-40 left-1/4 w-1 h-1 rounded-full bg-blue-300/50"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-white/10"
        />
      </motion.div>

      {/* ── Main content container ── */}
      <div className="container relative z-20 px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">

        {/* ── Text column — mid-speed parallax + motion blur ── */}
        <motion.div
          style={{ y: yText, opacity, scale, filter: blurFilter, willChange: "transform, filter" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionIn, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Nyxium OS 4.0 Now Live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionIn, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
          >
            Intelligence<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-cyan-400">
              at Scale
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionIn, delay: 0.3 }}
            className="text-lg md:text-xl text-white/50 mb-10 max-w-xl font-light leading-relaxed"
          >
            We build next-generation AI infrastructure for the world's most ambitious enterprises.
            Transform your operations with cognitive automation and predictive intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionIn, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white text-base h-14 px-8 shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:shadow-[0_0_50px_rgba(37,99,235,0.7)] transition-shadow duration-300"
              data-testid="button-deploy"
            >
              Deploy Nyxium
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08] h-14 px-8 backdrop-blur-md"
              data-testid="button-whitepaper"
            >
              Read the Whitepaper
            </Button>
          </motion.div>

          {/* Stat row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transitionIn, delay: 0.7 }}
            className="mt-12 flex items-center gap-8"
          >
            {[
              { val: "340%", label: "Avg ROI" },
              { val: "99.7%", label: "Accuracy" },
              { val: "2.4ms", label: "Latency" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-xl font-bold text-white font-mono">{s.val}</p>
                <p className="text-[11px] text-white/30 font-mono uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Card column — fastest parallax + motion blur ── */}
        <motion.div
          style={{ y: yCards, opacity, filter: blurFilter, willChange: "transform, filter" }}
          className="hidden lg:block relative h-[600px] w-full"
        >
          {/* Card 1 — Neural Inference */}
          <motion.div
            animate={{ y: [0, -18, 0], rotateZ: [-0.5, 0.5, -0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 right-0 w-[400px] glass-panel rounded-2xl p-6 z-20"
            style={{ transformStyle: "preserve-3d", perspective: 1000, willChange: "transform" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest">Neural Inference</h3>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-white/15" />
              </div>
            </div>
            <div className="space-y-3.5">
              {[78, 92, 64, 88].map((val, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Model Node 0{i + 1}</span>
                    <span className="text-cyan-400 font-mono">{val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_40px_rgba(37,99,235,0.05)]" />
          </motion.div>

          {/* Card 2 — Ops Processed */}
          <motion.div
            animate={{ y: [0, 22, 0], rotateZ: [0.3, -0.3, 0.3] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-16 left-0 w-[320px] glass-panel rounded-2xl p-6 z-30"
            style={{ willChange: "transform" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <span className="text-[11px] text-blue-400 font-mono font-bold">4.2M</span>
              </div>
              <div>
                <h4 className="text-sm text-white font-semibold">Ops Processed</h4>
                <p className="text-xs text-white/35">per second</p>
              </div>
            </div>
            <div className="h-20 w-full flex items-end gap-1.5">
              {[35, 55, 42, 72, 50, 85, 63, 100, 78, 92].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: 1 + i * 0.08, ease }}
                  style={{
                    transformOrigin: "bottom",
                    height: `${h}%`,
                    background: `linear-gradient(180deg, ${i > 6 ? "#22d3ee" : "#3b82f6"} 0%, rgba(37,99,235,0.15) 100%)`,
                    opacity: 0.6 + (i / 10) * 0.4,
                  }}
                  className="flex-1 rounded-t-sm"
                />
              ))}
            </div>
          </motion.div>

          {/* Card 3 — Live Accuracy badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[42%] left-[15%] glass-panel rounded-xl px-4 py-3 z-40 flex items-center gap-3"
            style={{ willChange: "transform" }}
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-white font-mono">99.7%</p>
              <p className="text-[10px] text-white/35 uppercase tracking-widest">Accuracy</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-30 pointer-events-none" />

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
};
