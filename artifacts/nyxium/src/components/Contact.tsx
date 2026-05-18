import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { Send, Globe, Linkedin, Twitter } from "lucide-react";

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const spring = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const yGlow    = useTransform(spring, [0, 1], ["0px", "-80px"]);
  const yContent = useTransform(spring, [0, 1], ["0px", "-40px"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section ref={sectionRef} className="py-36 bg-background relative overflow-hidden">
      <div className="section-line" />

      {/* Ambient glow — moves fastest (deepest layer) */}
      <motion.div
        style={{ y: yGlow }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[900px] h-[400px] rounded-full bg-blue-600/6 blur-[140px]" />
      </motion.div>
      {/* Secondary glow */}
      <motion.div
        style={{ y: yGlow }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[500px] h-[200px] rounded-full bg-cyan-500/4 blur-[100px]"
        />
      </motion.div>

      {/* Content */}
      <motion.div style={{ y: yContent }} className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">Enterprise Consultation</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05] cinematic-text">
            Ready to transform<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white/80 to-cyan-400">
              your enterprise?
            </span>
          </h2>

          <p className="text-lg text-white/35 mb-12 max-w-xl mx-auto leading-relaxed">
            Join the global enterprises already running Nyxium. Our solutions team will design a transformation roadmap tailored to your industry and scale.
          </p>

          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-12"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                required
                className="flex-1 px-5 py-4 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white
                  placeholder:text-white/20 text-sm outline-none focus:border-blue-500/40 focus:bg-white/[0.06]
                  transition-all duration-300 font-mono"
                data-testid="input-email"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(37,99,235,0.7)" }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-blue-600 text-white
                  font-semibold text-sm transition-colors duration-300 shrink-0
                  shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                data-testid="button-request-demo"
              >
                <span>Request Demo</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg mx-auto mb-12 p-6 rounded-xl border border-blue-500/25 bg-blue-600/[0.06] text-center"
            >
              <p className="text-blue-300 font-medium">Thank you. Our enterprise team will be in touch within 24 hours.</p>
            </motion.div>
          )}

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 text-[10px] font-mono text-white/18"
          >
            {["SOC 2 Type II", "ISO 27001", "GDPR Compliant", "Enterprise SLA"].map((badge, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400/40" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex justify-center gap-4 mt-16"
        >
          {[
            { icon: Globe, label: "Website" },
            { icon: Linkedin, label: "LinkedIn" },
            { icon: Twitter, label: "Twitter / X" },
          ].map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={i}
                href="#"
                aria-label={social.label}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="w-10 h-10 rounded-full border border-white/[0.07] flex items-center justify-center
                  text-white/25 hover:text-white/60 hover:border-white/[0.18] transition-colors duration-300"
                data-testid={`link-social-${i}`}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};
