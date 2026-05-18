import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { Solutions } from "@/components/Solutions";
import { AiInAction } from "@/components/AiInAction";
import { PlatformShowcase } from "@/components/PlatformShowcase";
import { CaseStudies } from "@/components/CaseStudies";
import { TechStack } from "@/components/TechStack";
import { Careers } from "@/components/Careers";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AmbientBackground } from "@/components/AmbientBackground";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      {/* Global scroll progress indicator */}
      <ScrollProgressBar />

      {/* Global ambient background fixed, scroll-reactive parallax orbs */}
      <AmbientBackground />

      {/* All content sits above the ambient layer */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <TrustedBy />
          <Solutions />
          <AiInAction />
          <PlatformShowcase />
          <CaseStudies />
          <TechStack />
          <Careers />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
