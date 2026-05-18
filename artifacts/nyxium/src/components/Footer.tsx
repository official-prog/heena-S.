import React from "react";
import { motion } from "framer-motion";

const footerLinks = {
  "Platform": ["Nyxium OS", "Enterprise AI", "Automation", "Data Intelligence", "Security"],
  "Solutions": ["Financial Services", "Healthcare", "Manufacturing", "Retail", "Energy"],
  "Company": ["About", "Careers", "Press", "Partners", "Blog"],
  "Legal": ["Privacy Policy", "Terms of Service", "Security", "Compliance", "Cookies"],
};

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/[0.06] pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <span className="font-mono text-2xl font-bold text-blue-400 tracking-tighter">NYX</span>
              <span className="font-sans text-2xl font-bold text-white tracking-tighter">IUM</span>
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs mb-6">
              The operating layer for enterprise AI. Transforming how the world's most ambitious organisations think, operate, and scale.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/25 font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />
              <span>Systems operational, 99.99% uptime</span>
            </div>
            <p className="text-xs text-white/20 font-mono mt-3">
              1 Shoreditch High Street<br />London, E1 6PE, United Kingdom
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/35 hover:text-white/70 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 font-mono">
            &copy; 2025 Nyxium Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/20 font-mono">
            <span>Registered in England & Wales</span>
            <span>|</span>
            <span>Company No. 14821937</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
