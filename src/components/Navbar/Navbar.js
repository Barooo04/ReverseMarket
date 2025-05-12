import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Home/reverselogoinvert.png';

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
        <div className="nav-brand">
          <img src={logo} alt="ReverseMarket Logo" className="nav-logo" />
        </div>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/futures" className={location.pathname === '/futures' ? 'active' : ''}>
            Futures
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 