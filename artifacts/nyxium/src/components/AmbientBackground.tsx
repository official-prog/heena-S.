import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const AmbientBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const spring = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  const orb1Y = useTransform(spring, [0, 1], ["0%", "-40%"]);
  const orb2Y = useTransform(spring, [0, 1], ["0%", "-25%"]);
  const orb3Y = useTransform(spring, [0, 1], ["0%", "-55%"]);
  const orb4Y = useTransform(spring, [0, 1], ["0%", "-20%"]);
  const gridY  = useTransform(spring, [0, 1], ["0%", "-8%"]);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Slow-moving grid */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </motion.div>

      {/* Orb 1 top left, moves fast */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
        animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.18, 0.12] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-blue-600 blur-[160px]" />
      </motion.div>

      {/* Orb 2 right side, medium speed */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[30vh] -right-60 w-[500px] h-[500px] rounded-full"
        animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      >
        <div className="w-full h-full rounded-full bg-cyan-500 blur-[140px]" />
      </motion.div>

      {/* Orb 3 center-bottom, fast */}
      <motion.div
        style={{ y: orb3Y }}
        className="absolute top-[70vh] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
        animate={{ scale: [1, 1.06, 1], opacity: [0.06, 0.11, 0.06] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      >
        <div className="w-full h-full rounded-full bg-blue-700 blur-[150px]" />
      </motion.div>

      {/* Orb 4 lower left, slow */}
      <motion.div
        style={{ y: orb4Y }}
        className="absolute top-[120vh] -left-32 w-[450px] h-[450px] rounded-full"
        animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="w-full h-full rounded-full bg-indigo-600 blur-[130px]" />
      </motion.div>

      {/* Orb 5 deep down */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[200vh] right-1/4 w-[400px] h-[400px] rounded-full"
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      >
        <div className="w-full h-full rounded-full bg-cyan-600 blur-[120px]" />
      </motion.div>
    </div>
  );
};
