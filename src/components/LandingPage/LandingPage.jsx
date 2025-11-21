import React from 'react';
import { HeroSection } from './HeroSection';
import { GlobeSection } from './GlobeSection';
import { Footer7 } from '../ui/footer-7';

function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <HeroSection />
      <GlobeSection />
      <Footer7 />
    </div>
  );
}

export default LandingPage;
