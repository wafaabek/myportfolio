// app/page.tsx
'use client';

import { useState } from 'react';
import { CustomCursor } from '@/components/custom-cursor';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { SkillsSection } from '@/components/skills-section';
import { ProjectsSection } from '@/components/projects-section';
import { ExperienceSection } from '@/components/experience-section';
import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { FloatingButtons } from '@/components/floating-buttons';
import IntroSection from '@/components/intro-section';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <AboutSection />
      {/*<ContactSection />*/}
      <Footer />
      <FloatingButtons />
      {showIntro && <IntroSection onEnter={() => setShowIntro(false)} />}
    </>
  );
}