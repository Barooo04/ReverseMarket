import React, { useState } from 'react';
import './Analisi.css';
import Navbar from '../../components/Navbar/Navbar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analisi = () => {
  const [timeFrame, setTimeFrame] = useState('1D');
  
  const datiGrafici = {
    '1D': [
      { time: '9:00', valore: 33800 },
      { time: '10:00', valore: 33950 },
      { time: '11:00', valore: 33920 },
      { time: '12:00', valore: 34100 },
      { time: '13:00', valore: 34050 },
      { time: '14:00', valore: 34200 },
      { time: '15:00', valore: 34150 },
      { time: '16:00', valore: 34300 },
      { time: '17:00', valore: 34250 },
    ],
    '1W': [
      { time: 'Lun', valore: 33800 },
      { time: 'Mar', valore: 34100 },
      { time: 'Mer', valore: 34300 },
      { time: 'Gio', valore: 34200 },
      { time: 'Ven', valore: 34250 },
    ],
    '1M': [
      { time: '1 Mar', valore: 33500 },
      { time: '8 Mar', valore: 33800 },
      { time: '15 Mar', valore: 34100 },
      { time: '22 Mar', valore: 34300 },
      { time: '29 Mar', valore: 34250 },
    ],
    '1Y': [
      { time: 'Apr 23', valore: 32000 },
      { time: 'Lug 23', valore: 32800 },
      { time: 'Ott 23', valore: 33500 },
      { time: 'Gen 24', valore: 34000 },
      { time: 'Apr 24', valore: 34250 },
    ],
  };

  const [analisiFondamentali] = useState([
    {
      asset: 'ENEL',
      settore: 'Energia',
      pe: '12.5',
      dividendo: '3.2%',
      raccomandazione: 'Acquista',
      ora: '17:35:00'
    },
    {
      asset: 'APPLE',
      settore: 'Tech',
      pe: '28.3',
      dividendo: '0.5%',
      raccomandazione: 'Mantieni',
      ora: '17:35:00'
    },
    {
      asset: 'TESLA',
      settore: 'Auto',
      pe: '65.7',
      dividendo: '0%',
      raccomandazione: 'Vendi',
      ora: '17:35:00'
    }
  ]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">{label}</p>
          <p className="tooltip-value">
            Prezzo: <span className="value">{payload[0].value.toLocaleString('it-IT')} €</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="analisi-container">
        <div className="analisi-header">
          <h1>Analisi di Mercato</h1>
          <div className="market-status">
            <div className="status-indicator">
              <span className="status-dot"></span>
              Mercati Aperti
            </div>
            <div className="time">17:35:00 CET</div>
          </div>
        </div>

        <div className="analisi-grid">
          {/* Market Overview */}
          <div className="market-overview">
            <h2>Panoramica dei Mercati</h2>
            <div className="overview-cards">
              <div className="overview-card">
                <h3>Indici Principali</h3>
                <ul>
                  <li>
                    <span>FTSE MIB</span>
                    <span className="positivo">+0.85%</span>
                  </li>
                  <li>
                    <span>S&P 500</span>
                    <span className="positivo">+0.56%</span>
                  </li>
                  <li>
                    <span>NASDAQ</span>
                    <span className="negativo">-0.25%</span>
                  </li>
                </ul>
              </div>
              <div className="overview-card">
                <h3>Commodities</h3>
                <ul>
                  <li>
                    <span>Oro</span>
                    <span className="positivo">+1.2%</span>
                  </li>
                  <li>
                    <span>Petrolio WTI</span>
                    <span className="negativo">-0.8%</span>
                  </li>
                  <li>
                    <span>Gas Naturale</span>
                    <span className="positivo">+2.1%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Analysis */}
          <div className="technical-analysis">
            <div className="analysis-header">
              <h2>Analisi Tecnica</h2>
              <div className="chart-controls">
                <button 
                  className={`time-frame ${timeFrame === '1D' ? 'active' : ''}`}
                  onClick={() => setTimeFrame('1D')}
                >
                  1D
                </button>
                <button 
                  className={`time-frame ${timeFrame === '1W' ? 'active' : ''}`}
                  onClick={() => setTimeFrame('1W')}
                >
                  1W
                </button>
                <button 
                  className={`time-frame ${timeFrame === '1M' ? 'active' : ''}`}
                  onClick={() => setTimeFrame('1M')}
                >
                  1M
                </button>
                <button 
                  className={`time-frame ${timeFrame === '1Y' ? 'active' : ''}`}
                  onClick={() => setTimeFrame('1Y')}
                >
                  1Y
                </button>
              </div>
            </div>
            <div className="analysis-content">
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={datiGrafici[timeFrame]} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#00c3ff"
                      tick={{ fill: '#fff' }}
                    />
                    <YAxis 
                      stroke="#00c3ff"
                      tick={{ fill: '#fff' }}
                      domain={['dataMin - 100', 'dataMax + 100']}
                      tickFormatter={(value) => value.toLocaleString('it-IT')}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="valore" 
                      stroke="#00c3ff" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 8, fill: '#00c3ff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="indicators">
                <div className="indicator-group">
                  <h3>Indicatori Tecnici</h3>
                  <ul>
                    <li>RSI (14): <span className="neutral">54.2</span></li>
                    <li>MACD: <span className="positivo">Bullish</span></li>
                    <li>Media Mobile 200: <span className="positivo">Sopra</span></li>
                    <li>Bollinger Bands: <span className="neutral">Neutrale</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Fundamental Analysis */}
          <div className="fundamental-analysis">
            <h2>Analisi Fondamentale</h2>
            <div className="analysis-table">
              <table>
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Settore</th>
                    <th>P/E</th>
                    <th>Dividendo</th>
                    <th>Raccomandazione</th>
                    <th>Ora</th>
                  </tr>
                </thead>
                <tbody>
                  {analisiFondamentali.map((analisi, index) => (
                    <tr key={index}>
                      <td>{analisi.asset}</td>
                      <td>{analisi.settore}</td>
                      <td>{analisi.pe}</td>
                      <td>{analisi.dividendo}</td>
                      <td className={
                        analisi.raccomandazione === 'Acquista' ? 'positivo' :
                        analisi.raccomandazione === 'Vendi' ? 'negativo' : 'neutral'
                      }>
                        {analisi.raccomandazione}
                      </td>
                      <td>{analisi.ora}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Market Reports */}
          <div className="market-reports">
            <h2>Report di Mercato</h2>
            <div className="reports-grid">
              <div className="report-card">
                <h3>Analisi Settimanale</h3>
                <p>Il mercato azionario mostra segnali di forza, supportato dai dati macroeconomici positivi e dalle aspettative di taglio dei tassi...</p>
                <a href="#" className="read-more">Leggi tutto</a>
              </div>
              <div className="report-card">
                <h3>Focus Settoriale</h3>
                <p>Il settore tecnologico continua a guidare il rally, con particolare interesse verso le aziende focalizzate sull'intelligenza artificiale...</p>
                <a href="#" className="read-more">Leggi tutto</a>
              </div>
              <div className="report-card">
                <h3>Previsioni Mercato</h3>
                <p>Le prospettive per il prossimo trimestre rimangono positive, nonostante le preoccupazioni sull'inflazione e le tensioni geopolitiche...</p>
                <a href="#" className="read-more">Leggi tutto</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analisi; 