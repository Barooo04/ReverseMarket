import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ReverseMarket</h3>
          <p>La tua piattaforma per l'analisi dei mercati finanziari</p>
        </div>
        
        <div className="footer-section">
          <h3>Contatti</h3>
          <p>Email: info@reversemarket.com</p>
          <p>Telefono: +39 02 1234567</p>
        </div>
        
        <div className="footer-section">
          <h3>Link Utili</h3>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/termini">Termini e Condizioni</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Seguici</h3>
          <div className="social-links">
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Telegram</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ReverseMarket. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
};

export default Footer; 