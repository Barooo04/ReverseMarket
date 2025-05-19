import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Home/reverselogoinvert.png';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHamburgerClick = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <div className="neon-stripes">
        <div className="neon-stripe"></div>
        <div className="neon-stripe"></div>
        <div className="neon-stripe"></div>
        <div className="neon-stripe"></div>
        <div className="neon-stripe"></div>
      </div>

      <nav className="navbar">
        <div className="nav-brand">
          <img src={logo} alt="ReverseMarket Logo" className="nav-logo" />
        </div>
        <button className="hamburger" onClick={handleHamburgerClick} aria-label="Menu">
          {menuOpen ? (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="10" y1="10" x2="30" y2="30" stroke="#00c3ff" strokeWidth="4" strokeLinecap="round" />
              <line x1="30" y1="10" x2="10" y2="30" stroke="#00c3ff" strokeWidth="4" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="8" y1="12" x2="32" y2="12" stroke="#00c3ff" strokeWidth="4" strokeLinecap="round" />
              <line x1="8" y1="20" x2="32" y2="20" stroke="#00c3ff" strokeWidth="4" strokeLinecap="round" />
              <line x1="8" y1="28" x2="32" y2="28" stroke="#00c3ff" strokeWidth="4" strokeLinecap="round" />
            </svg>
          )}
        </button>
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={handleLinkClick}>
            Dashboard
          </Link>
          <Link to="/futures" className={location.pathname === '/futures' ? 'active' : ''} onClick={handleLinkClick}>
            Futures
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 