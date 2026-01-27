import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Tools from './components/Tools';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import Security from './components/Security';
import CTA from './components/CTA';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <BackgroundEffects />
      <Navigation scrolled={scrolled} />
      <Hero />
      <Tools />
      <Benefits />
      <Pricing />
      <Security />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
