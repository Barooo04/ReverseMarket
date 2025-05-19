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
        <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={handleHamburgerClick} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
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