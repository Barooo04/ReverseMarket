import React from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
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
        <div className="nav-brand">ReverseMarket</div>
        <div className="nav-links">
          <a href="/" className={location.pathname === '/' ? 'active' : ''}>
            Dashboard
          </a>
          <a href="/azioni" className={location.pathname === '/azioni' ? 'active' : ''}>
            Azioni
          </a>
          <a href="/forex" className={location.pathname === '/forex' ? 'active' : ''}>
            Forex
          </a>
          <a href="/crypto" className={location.pathname === '/crypto' ? 'active' : ''}>
            Crypto
          </a>
          <a href="/analisi" className={location.pathname === '/analisi' ? 'active' : ''}>
            Analisi
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 