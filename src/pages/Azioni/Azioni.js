import React, { useState, useEffect } from 'react';
import './Azioni.css';
import Navbar from '../../components/Navbar/Navbar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartWrapper = ({ children, data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Caricamento grafico...</div>;
  }

  if (!data || data.length === 0) {
    return <div>Nessun dato disponibile</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      {children}
    </ResponsiveContainer>
  );
};

const Azioni = () => {
  const [azioniPopolari] = useState([
    {
      simbolo: 'ENI.MI',
      nome: 'Eni SpA',
      prezzo: '15.23',
      variazione: '+1.2%',
      volume: '2.5M',
      capitalizzazione: '49.8B'
    },
    {
      simbolo: 'ISP.MI',
      nome: 'Intesa Sanpaolo',
      prezzo: '3.12',
      variazione: '-0.5%',
      volume: '15.2M',
      capitalizzazione: '58.2B'
    },
    {
      simbolo: 'TIT.MI',
      nome: 'Telecom Italia',
      prezzo: '0.28',
      variazione: '+2.8%',
      volume: '125.6M',
      capitalizzazione: '6.1B'
    }
  ]);

  // Dati di esempio per il grafico FTSE MIB
  const [datiGrafico] = useState([
    { time: '9:00', valore: 33800 },
    { time: '10:00', valore: 33950 },
    { time: '11:00', valore: 33920 },
    { time: '12:00', valore: 34100 },
    { time: '13:00', valore: 34050 },
    { time: '14:00', valore: 34200 },
    { time: '15:00', valore: 34150 },
    { time: '16:00', valore: 34300 },
    { time: '17:00', valore: 34250 },
  ]);

  return (
    <div className="page-container">
      <Navbar />
      <div className="azioni-container">
        <div className="azioni-header">
          <h1>Mercato Azionario</h1>
          <div className="market-status">
            <span className="status-dot online"></span>
            Mercato Aperto
          </div>
        </div>

        <div className="azioni-grid">
          {/* Sezione Grafico Principale */}
          <div className="chart-section">
            <h2>FTSE MIB - Andamento Giornaliero</h2>
            <div className="chart-container">
              <ChartWrapper data={datiGrafico}>
                <LineChart data={datiGrafico}>
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
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0a0a0a',
                      border: '1px solid #00c3ff',
                      borderRadius: '4px'
                    }}
                    labelStyle={{ color: '#00c3ff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="valore" 
                    stroke="#00c3ff" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8, fill: '#00c3ff' }}
                  />
                </LineChart>
              </ChartWrapper>
            </div>
          </div>

          {/* Sezione Azioni Popolari */}
          <div className="popular-stocks">
            <h2>Azioni Più Scambiate</h2>
            <div className="stocks-table">
              <table>
                <thead>
                  <tr>
                    <th>Simbolo</th>
                    <th>Nome</th>
                    <th>Prezzo</th>
                    <th>Var %</th>
                    <th>Volume</th>
                    <th>Cap.</th>
                  </tr>
                </thead>
                <tbody>
                  {azioniPopolari.map((azione, index) => (
                    <tr key={index}>
                      <td>{azione.simbolo}</td>
                      <td>{azione.nome}</td>
                      <td>€{azione.prezzo}</td>
                      <td className={azione.variazione.includes('+') ? 'positivo' : 'negativo'}>
                        {azione.variazione}
                      </td>
                      <td>{azione.volume}</td>
                      <td>€{azione.capitalizzazione}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sezione Analisi di Mercato */}
          <div className="market-analysis">
            <h2>Analisi di Mercato</h2>
            <div className="analysis-cards">
              <div className="analysis-card">
                <h3>Settori in Evidenza</h3>
                <ul>
                  <li>Energia: <span className="positivo">+2.5%</span></li>
                  <li>Bancario: <span className="positivo">+1.8%</span></li>
                  <li>Tech: <span className="negativo">-0.7%</span></li>
                </ul>
              </div>
              <div className="analysis-card">
                <h3>Indicatori Tecnici</h3>
                <ul>
                  <li>RSI: 58.2</li>
                  <li>MACD: Positivo</li>
                  <li>Media Mobile 200: Sopra</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sezione Notizie */}
          <div className="market-news">
            <h2>Ultime Notizie</h2>
            <div className="news-list">
              <div className="news-item">
                <span className="news-time">10:30</span>
                <p>Telecom Italia: CDA approva piano industriale 2024-2026</p>
              </div>
              <div className="news-item">
                <span className="news-time">09:45</span>
                <p>Eni: nuova scoperta di gas nel Mediterraneo orientale</p>
              </div>
              <div className="news-item">
                <span className="news-time">09:15</span>
                <p>Intesa Sanpaolo: risultati primo trimestre superiori alle attese</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Azioni; 