import React, { useState, useEffect } from 'react';
import './Futures.css';
import Navbar from '../components/Navbar/Navbar';

const TABS = [
  { key: 'prezzo', label: 'Prezzo' },
];

const FUTURES_LIST = [
  { nome: 'FTSE MIB', simbolo: 'FTSEMIB', endpoint: 'ftsemib', mese: 'Giu 2025' },
  { nome: 'US 30', simbolo: 'YM', endpoint: 'us30', mese: 'Giu 2025' },
  { nome: 'US 500', simbolo: 'ES', endpoint: 'us500', mese: 'Giu 2025' },
  { nome: 'US Tech 100', simbolo: 'NQ', endpoint: 'nasdaq100', mese: 'Giu 2025' },
  { nome: 'US 2000', simbolo: 'RTY', endpoint: 'us2000', mese: 'Giu 2025' },
  { nome: 'S&P 500 VIX', simbolo: 'VX', endpoint: 'vix', mese: 'Mag 2025' },
  { nome: 'DAX', simbolo: 'FDAX', endpoint: 'dax', mese: 'Giu 2025' },
  { nome: 'CAC 40', simbolo: 'FCE', endpoint: 'cac40', mese: 'Mag 2025' },
  { nome: 'FTSE 100', simbolo: 'Z', endpoint: 'ftse100', mese: 'Giu 2025' },
  { nome: 'Euro Stoxx 50', simbolo: 'FESX', endpoint: 'eurostoxx50', mese: 'Giu 2025' },
  { nome: 'SMI', simbolo: 'FSMI', endpoint: 'smi', mese: 'Giu 2025' },
  { nome: 'IBEX 35', simbolo: 'IBEX', endpoint: 'ibex35', mese: 'Mag 2025' },
];

// Imposta la base URL in base all'ambiente
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://reversemarketbackend.onrender.com'
  : 'http://localhost:3001';

const formatNumber = (num) => {
  if (num === undefined || num === null || isNaN(num)) return 'N/A';
  return num.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const Futures = () => {
  const [selectedTab, setSelectedTab] = useState('prezzo');
  const [futures, setFutures] = useState([]);

  useEffect(() => {
    const fetchFutures = async () => {
      const results = await Promise.all(
        FUTURES_LIST.map(async (fut) => {
          try {
            const res = await fetch(`${BASE_URL}/api/futures/${fut.endpoint}`);
            const data = await res.json();
            return {
              nome: fut.nome,
              mese: fut.mese,
              ultimo: formatNumber(data.regularMarketPrice),
              massimo: formatNumber(data.regularMarketDayHigh),
              minimo: formatNumber(data.regularMarketDayLow),
              var: data.regularMarketChange ? formatNumber(data.regularMarketChange) : 'N/A',
              varPerc: data.regularMarketChangePercent !== undefined && data.regularMarketChangePercent !== null
                ? (data.regularMarketChangePercent > 0 ? '+' : '') + data.regularMarketChangePercent.toFixed(2) + '%'
                : 'N/A',
              ora: data.regularMarketTime
                ? new Date(data.regularMarketTime * 1000).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                : '',
            };
          } catch (e) {
            return {
              nome: fut.nome,
              mese: fut.mese,
              ultimo: 'N/A',
              massimo: 'N/A',
              minimo: 'N/A',
              var: 'N/A',
              varPerc: 'N/A',
              ora: '',
            };
          }
        })
      );
      setFutures(results);
    };
    fetchFutures();
    const interval = setInterval(fetchFutures, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      <div className="futures-container">
        <header className="futures-header">
          <h1>Indici future in tempo reale</h1>
        </header>

        <div className="futures-tabs">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`futures-tab${selectedTab === tab.key ? ' active' : ''}`}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="futures-grid">
          <section className="futures-section">
            <div className="table-container">
              <table className="futures-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Mese</th>
                    <th>Ultimo</th>
                    <th>Massimo</th>
                    <th>Minimo</th>
                    <th>Var.</th>
                    <th>Var. %</th>
                    <th>Ora</th>
                  </tr>
                </thead>
                <tbody>
                  {futures.map((future, index) => (
                    <tr key={index}>
                      <td className="future-nome">{future.nome}</td>
                      <td>{future.mese}</td>
                      <td className={future.nome === 'S&P 500 VIX' ? 'negativo' : 'positivo'}>{future.ultimo}</td>
                      <td className={future.nome === 'S&P 500 VIX' ? 'negativo' : 'positivo'}>{future.massimo}</td>
                      <td className={future.nome === 'S&P 500 VIX' ? 'negativo' : 'positivo'}>{future.minimo}</td>
                      <td className={future.nome === 'S&P 500 VIX' ? 'negativo' : 'positivo'}>{future.var}</td>
                      <td className={future.nome === 'S&P 500 VIX' ? 'negativo' : 'positivo'}>{future.varPerc}</td>
                      <td>{future.ora}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Futures; 