import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Navbar from '../components/Navbar/Navbar';

const symbolNameMap = {
  '^FCHI': 'CAC 40',
  '^AEX': 'AEX',
  'FTSEMIB.MI': 'FTSE MIB',
  '^BFX': 'BEL 20',
  '^PSI20': 'PSI 20',
  '^FTSE': 'FTSE 100',
  '^FTMC': 'FTSE 250',
  '^GDAXI': 'DAX 40',
  '^SSMI': 'SMI',
  '^IBEX': 'IBEX 35',
  '^GSPC': 'S&P 500',
  '^IXIC': 'Nasdaq',
  '^DJI': 'Dow Jones',
  '^VIX': 'S&P 500 VIX',
};

const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://reversemarketbackend.onrender.com'
  : 'http://localhost:3001';

const IndiceDetail = () => {
  const { symbol } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`[DEBUG] Richiesta dati per ${symbol}`);
        const res = await fetch(`${BASE_URL}/api/history/${encodeURIComponent(symbol)}`);
        const json = await res.json();
        console.log(`[DEBUG] Risposta ricevuta:`, json);
        
        if (Array.isArray(json) && json.length > 0) {
          const formattedData = json.map(d => ({
            date: d.date,
            close: parseFloat(d.close)
          })).filter(d => !isNaN(d.close));
          
          console.log(`[DEBUG] Dati formattati:`, formattedData);
          setData(formattedData);
        } else {
          console.error(`[ERROR] Dati non validi:`, json);
          setError('Dati non disponibili');
        }
      } catch (e) {
        console.error(`[ERROR] Errore nel caricamento dati:`, e);
        setError('Errore nel caricamento dati');
      }
      setLoading(false);
    };
    fetchHistory();
  }, [symbol]);

  return (
    <div className="page-container">
      <Navbar />
      <div className="home-container">
        <h2 style={{ color: '#00c3ff', marginBottom: 24 }}>{symbolNameMap[symbol] || symbol}</h2>
        {loading ? (
          <p>Caricamento dati...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="date" minTickGap={30} tick={{ fill: '#aaa', fontSize: 12 }} />
              <YAxis domain={['auto', 'auto']} tick={{ fill: '#aaa', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#111', border: '1px solid #00ff00', color: '#fff' }} labelStyle={{ color: '#00ff00' }} />
              <Line type="monotone" dataKey="close" stroke="#00ff00" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default IndiceDetail; 