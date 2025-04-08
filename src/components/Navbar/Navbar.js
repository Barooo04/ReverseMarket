import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/azioni" className={location.pathname === '/azioni' ? 'active' : ''}>
            Azioni
          </Link>
          <Link to="/forex" className={location.pathname === '/forex' ? 'active' : ''}>
            Forex
          </Link>
          <Link to="/crypto" className={location.pathname === '/crypto' ? 'active' : ''}>
            Crypto
          </Link>
          <Link to="/analisi" className={location.pathname === '/analisi' ? 'active' : ''}>
            Analisi
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 