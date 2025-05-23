import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const euronextConfig = [
  { nome: 'CAC 40', endpoint: 'cac40' },
  { nome: 'AEX', endpoint: 'aex' },
  { nome: 'FTSE MIB', endpoint: 'ftsemib' },
  { nome: 'BEL 20', endpoint: 'bel20' },
  { nome: 'PSI 20', endpoint: 'psi20' },
];

const lseConfig = [
  { nome: 'FTSE 100', endpoint: 'ftse100' },
  { nome: 'FTSE 250', endpoint: 'ftse250' },
];

const deutscheBorseConfig = [
  { nome: 'DAX 40', endpoint: 'dax40' },
];

const swissConfig = [
  { nome: 'SMI', endpoint: 'smi' },
];

const bmeConfig = [
  { nome: 'IBEX 35', endpoint: 'ibex35' },
];

const usaConfig = [
  { nome: 'S&P 500', endpoint: 'sp500' },
  { nome: 'Nasdaq', endpoint: 'nasdaq' },
  { nome: 'Dow Jones', endpoint: 'dowjones' },
  { nome: 'S&P 500 VIX', endpoint: 'vix' },
];

// Imposta la base URL in base all'ambiente
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://reversemarketbackend.onrender.com'
  : 'http://localhost:3001';

const fetchIndice = async (endpoint) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/${endpoint}`);
    return data;
  } catch (error) {
    return null;
  }
};

const useIndici = (config, timeZone = 'Europe/Rome') => {
  const [dati, setDati] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchAll = async () => {
      const now = new Date();
      const oraLocale = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', timeZone });
      const results = await Promise.all(
        config.map(async (indice) => {
          const data = await fetchIndice(indice.endpoint);
          if (!data || data.status === 'error') {
            return { nome: indice.nome, nonDisponibile: true, timestamp: oraLocale };
          }
          return {
            nome: indice.nome,
            ultimo: data.regularMarketPrice ?? '-',
            variazione: data.regularMarketChangePercent !== undefined ? `${data.regularMarketChangePercent.toFixed(2)}%` : '-',
            max: data.regularMarketDayHigh ?? '-',
            min: data.regularMarketDayLow ?? '-',
            timestamp: oraLocale,
            nonDisponibile: false
          };
        })
      );
      if (isMounted) {
        setDati(results);
      }
    };
    fetchAll();
    const interval = setInterval(fetchAll, 2000);
    return () => { isMounted = false; clearInterval(interval); };
  }, [config, timeZone]);
  return dati;
};

// Hook per rilevare se siamo su mobile
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
};

const symbolMap = {
  'CAC 40': '^FCHI',
  'AEX': '^AEX',
  'FTSE MIB': 'FTSEMIB.MI',
  'BEL 20': '^BFX',
  'PSI 20': '^PSI20',
  'FTSE 100': '^FTSE',
  'FTSE 250': '^FTMC',
  'DAX 40': '^GDAXI',
  'SMI': '^SSMI',
  'IBEX 35': '^IBEX',
  'S&P 500': '^GSPC',
  'Nasdaq': '^IXIC',
  'Dow Jones': '^DJI',
  'S&P 500 VIX': '^VIX',
};

const renderCompactList = (dati, handleRowClick) => (
  <ul className="compact-indices-list">
    {dati.map((indice, idx) => (
      <li
        className="compact-indice-item"
        key={idx}
        style={{ cursor: symbolMap[indice.nome] ? 'pointer' : 'default' }}
        onClick={() => symbolMap[indice.nome] && handleRowClick(symbolMap[indice.nome])}
      >
        <span className="compact-indice-nome">{indice.nome}</span>
        {indice.nonDisponibile ? (
          <span style={{ color: 'gray', flex: '0 0 60%', textAlign: 'right', fontSize: '0.98rem' }}>Non disponibile</span>
        ) : (
          <>
            <span className={`compact-indice-ultimo${indice.nome === 'S&P 500 VIX' ? ' negativo' : ' positivo'}`}>{indice.ultimo}</span>
            <span className={`compact-indice-var${indice.nome === 'S&P 500 VIX' ? ' negativo' : ' positivo'}`}>{indice.variazione}</span>
          </>
        )}
      </li>
    ))}
  </ul>
);

const renderTable = (titolo, dati, isMobile, handleRowClick) => (
  <section className="indices-section">
    <h2>{titolo}</h2>
    <div className="table-container">
      {isMobile ? renderCompactList(dati, handleRowClick) : (
        <table className="indices-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ultimo</th>
              <th>Var %</th>
              <th>Max</th>
              <th>Min</th>
              <th>Ora</th>
            </tr>
          </thead>
          <tbody>
            {dati.map((indice, index) => (
              <tr key={index} style={{ cursor: symbolMap[indice.nome] ? 'pointer' : 'default' }} onClick={() => symbolMap[indice.nome] && handleRowClick(symbolMap[indice.nome])}>
                <td className="indice-nome" data-label="Nome">{indice.nome}</td>
                {indice.nonDisponibile ? (
                  <td colSpan={5} style={{ textAlign: 'center', color: 'gray' }}>Non disponibile</td>
                ) : (
                  <>
                    <td className={indice.nome === 'S&P 500 VIX' ? 'negativo' : 'positivo'} data-label="Ultimo">{indice.ultimo}</td>
                    <td className={indice.nome === 'S&P 500 VIX' ? 'negativo' : 'positivo'} data-label="Var %">{indice.variazione}</td>
                    <td className={indice.nome === 'S&P 500 VIX' ? 'negativo' : 'positivo'} data-label="Max">{indice.max}</td>
                    <td className={indice.nome === 'S&P 500 VIX' ? 'negativo' : 'positivo'} data-label="Min">{indice.min}</td>
                    <td className={indice.nome === 'S&P 500 VIX' ? 'negativo' : 'positivo'} data-label="Ora">{indice.timestamp}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </section>
);

const DisclaimerPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="disclaimer-overlay">
      <div className="disclaimer-popup">
        <button className="disclaimer-close" onClick={onClose}>×</button>
        <h2>DISCLAIMER</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  const euronext = useIndici(euronextConfig, 'Europe/Rome');
  const lse = useIndici(lseConfig, 'Europe/London');
  const deutscheBorse = useIndici(deutscheBorseConfig, 'Europe/Berlin');
  const swiss = useIndici(swissConfig, 'Europe/Zurich');
  const bme = useIndici(bmeConfig, 'Europe/Madrid');
  const usa = useIndici(usaConfig, 'America/New_York');
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisclaimer(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleRowClick = (symbol) => {
    navigate(`/indice/${encodeURIComponent(symbol)}`);
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="home-container">
        <DisclaimerPopup isOpen={showDisclaimer} onClose={() => setShowDisclaimer(false)} />
        <header className="home-header">
          <h1>Dashboard Mercati Globali</h1>
          <p>La tua piattaforma per l'analisi comportamentale dei mercati finanziari, la piattaforma per stare sempre in serenità</p>
        </header>
        <div className="markets-grid">
          {renderTable('Euronext', euronext, isMobile, handleRowClick)}
          {renderTable('USA', usa, isMobile, handleRowClick)}
          {renderTable('London Stock Exchange (LSE) – Regno Unito', lse, isMobile, handleRowClick)}
          {renderTable('Deutsche Börse (Xetra/Francoforte) – Germania', deutscheBorse, isMobile, handleRowClick)}
          {renderTable('SIX Swiss Exchange – Svizzera', swiss, isMobile, handleRowClick)}
          {renderTable('BME – Borsa di Madrid (Spagna)', bme, isMobile, handleRowClick)}
        </div>
      </div>
    </div>
  );
};

export default Home;