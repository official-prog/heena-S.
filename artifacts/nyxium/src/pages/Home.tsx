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

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
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
  );
}
