import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import StatsSection from '../components/home/StatsSection';
import SuccessStoriesSection from '../components/home/SuccessStoriesSection';
import CTASection from '../components/home/CTASection';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <SuccessStoriesSection />
      <CTASection />
      <Contact />
    </>
  );
}