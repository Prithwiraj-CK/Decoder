import React, { useState } from 'react';

const Navigation = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src="DecoderLogo.jpg" alt="SOL Decoder" className="logo-image" />
            <span className="logo-text">SOL DECODER</span>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#tools" className="nav-link" onClick={closeMobileMenu}>Tools</a>
            <a href="#benefits" className="nav-link" onClick={closeMobileMenu}>Benefits</a>
            <a href="#pricing" className="nav-link" onClick={closeMobileMenu}>Pricing</a>
            <a href="https://x.com/SOL_Decoder" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={closeMobileMenu}>
              Twitter
            </a>
            <a href="https://discord.gg/7PRvrGZrVq" target="_blank" rel="noopener noreferrer" className="nav-cta" onClick={closeMobileMenu}>
              Join Discord
            </a>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>
    </>
  );
};

export default Navigation;
