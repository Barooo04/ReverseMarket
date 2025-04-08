import React, { useState } from 'react';
import './Forex.css';
import Navbar from '../../components/Navbar/Navbar';

const Forex = () => {
  const [majorPairs] = useState([
    {
      coppia: 'EUR/USD',
      bid: '1.0831',
      ask: '1.0833',
      spread: '0.0002',
      variazione: '-0.12%',
      trend: 'ribasso'
    },
    {
      coppia: 'GBP/USD',
      bid: '1.2642',
      ask: '1.2644',
      spread: '0.0002',
      variazione: '+0.25%',
      trend: 'rialzo'
    },
    {
      coppia: 'USD/JPY',
      bid: '151.42',
      ask: '151.44',
      spread: '0.02',
      variazione: '+0.32%',
      trend: 'rialzo'
    }
  ]);

  return (
    <div className="page-container">
      <Navbar />
      <div className="forex-container">
        <div className="forex-header">
          <h1>Forex Trading</h1>
          <div className="session-indicator">
            <div className="session active">
              <span className="dot"></span>
              Tokyo
            </div>
            <div className="session">
              <span className="dot"></span>
              London
            </div>
            <div className="session active">
              <span className="dot"></span>
              New York
            </div>
          </div>
        </div>

        <div className="forex-grid">
          {/* Heat Map */}
          <div className="heatmap-section">
            <h2>Currency Strength Heat Map</h2>
            <div className="heatmap-grid">
              <div className="currency-strength strong">USD <span>+1.2%</span></div>
              <div className="currency-strength weak">EUR <span>-0.8%</span></div>
              <div className="currency-strength medium">GBP <span>+0.3%</span></div>
              <div className="currency-strength strong">JPY <span>+0.9%</span></div>
              <div className="currency-strength weak">CHF <span>-0.5%</span></div>
              <div className="currency-strength medium">AUD <span>+0.1%</span></div>
            </div>
          </div>

          {/* Major Pairs */}
          <div className="major-pairs">
            <h2>Coppie Principali</h2>
            <div className="pairs-table">
              <table>
                <thead>
                  <tr>
                    <th>Coppia</th>
                    <th>Bid</th>
                    <th>Ask</th>
                    <th>Spread</th>
                    <th>Var %</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {majorPairs.map((pair, index) => (
                    <tr key={index}>
                      <td>{pair.coppia}</td>
                      <td>{pair.bid}</td>
                      <td>{pair.ask}</td>
                      <td>{pair.spread}</td>
                      <td className={pair.variazione.includes('+') ? 'positivo' : 'negativo'}>
                        {pair.variazione}
                      </td>
                      <td>
                        <span className={`trend-indicator ${pair.trend}`}></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Technical Analysis */}
          <div className="technical-analysis">
            <h2>Analisi Tecnica EUR/USD</h2>
            <div className="analysis-grid">
              <div className="indicator-card">
                <h3>Indicatori</h3>
                <ul>
                  <li>RSI (14): <span className="neutral">54.2</span></li>
                  <li>MACD: <span className="positivo">Bullish Cross</span></li>
                  <li>Stochastic: <span className="negativo">Overbought</span></li>
                </ul>
              </div>
              <div className="indicator-card">
                <h3>Supporti/Resistenze</h3>
                <ul>
                  <li>R2: <span>1.0950</span></li>
                  <li>R1: <span>1.0880</span></li>
                  <li>S1: <span>1.0800</span></li>
                  <li>S2: <span>1.0750</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Economic Calendar */}
          <div className="economic-calendar">
            <h2>Calendario Economico</h2>
            <div className="calendar-events">
              <div className="event high-impact">
                <span className="event-time">14:30</span>
                <span className="event-flag">🇺🇸</span>
                <span className="event-name">Non-Farm Payrolls</span>
                <span className="event-impact">Alto Impatto</span>
              </div>
              <div className="event medium-impact">
                <span className="event-time">15:45</span>
                <span className="event-flag">🇪🇺</span>
                <span className="event-name">BCE Interest Rate Decision</span>
                <span className="event-impact">Medio Impatto</span>
              </div>
              <div className="event low-impact">
                <span className="event-time">16:00</span>
                <span className="event-flag">🇬🇧</span>
                <span className="event-name">Manufacturing PMI</span>
                <span className="event-impact">Basso Impatto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forex;