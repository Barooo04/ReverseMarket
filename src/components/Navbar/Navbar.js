import React from 'react';
import './Navbar.css';

const Navbar = () => {
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
          <a href="/">Dashboard</a>
          <a href="/azioni">Azioni</a>
          <a href="/forex">Forex</a>
          <a href="/crypto">Crypto</a>
          <a href="/analisi">Analisi</a>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 