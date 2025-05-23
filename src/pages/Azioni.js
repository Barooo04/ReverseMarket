import React, { useEffect, useState } from 'react';
import '../Home/Home.css';
import Navbar from '../components/Navbar/Navbar';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://reversemarketbackend.onrender.com'
  : 'http://localhost:3001';

const fetchTopItalia = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/top10italia?sort=var`);
    return await res.json();
  } catch {
    return [];
  }
};

const fetchTopUsa = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/top10usa?sort=var`);
    return await res.json();
  } catch {
    return [];
  }
};

// Hook per rilevare se siamo su mobile
const useIsMobile = (breakpoint = 900) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
};

const renderCompactList = (dati) => (
  <ul className="compact-indices-list">
    {dati.map((azione, idx) => {
      // Se il nome è troppo lungo, va a capo dopo 18 caratteri
      const nome = azione.nome.length > 18
        ? <span>{azione.nome.slice(0, 18)}<wbr />{azione.nome.slice(18)}</span>
        : azione.nome;
      return (
        <li className="compact-indice-item azioni-mobile-item" key={idx}>
          <span className="compact-indice-nome azioni-mobile-nome">{nome}</span>
          <span className="compact-indice-var positivo azioni-mobile-var">{azione.varPercent}%</span>
        </li>
      );
    })}
  </ul>
);

const renderTable = (titolo, dati, isMobile) => (
  <section className="indices-section">
    <h2>{titolo}</h2>
    <div className="table-container">
      {isMobile ? renderCompactList(dati) : (
        <table className="indices-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="hide-mobile">Simbolo</th>
              <th className="hide-mobile">Ultimo</th>
              <th className="hide-mobile">Max</th>
              <th className="hide-mobile">Min</th>
              <th>Var %</th>
              <th className="hide-mobile">Volume</th>
              <th className="hide-mobile">Ora</th>
            </tr>
          </thead>
          <tbody>
            {dati.map((azione, idx) => (
              <tr key={idx}>
                <td className="indice-nome">{azione.nome}</td>
                <td className="hide-mobile">{azione.simbolo}</td>
                <td className="positivo hide-mobile">{azione.ultimo}</td>
                <td className="positivo hide-mobile">{azione.massimo}</td>
                <td className="positivo hide-mobile">{azione.minimo}</td>
                <td className="positivo">{azione.varPercent}%</td>
                <td className="positivo hide-mobile">{azione.volume?.toLocaleString()}</td>
                <td className="positivo hide-mobile">{azione.ora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </section>
);

const Azioni = () => {
  const [topItalia, setTopItalia] = useState([]);
  const [topUsa, setTopUsa] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const [datiItalia, datiUsa] = await Promise.all([
        fetchTopItalia(),
        fetchTopUsa()
      ]);
      if (isMounted) {
        setTopItalia(datiItalia);
        setTopUsa(datiUsa);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      <div className="home-container">
        <header className="home-header">
          <h1>Top 10 Azioni</h1>
          <p>Le migliori azioni in tempo reale su Italia e USA</p>
        </header>
        <div className="markets-grid">
          {renderTable('Top 10 Italia', topItalia, isMobile)}
          {renderTable('Top 10 USA', topUsa, isMobile)}
        </div>
      </div>
    </div>
  );
};

export default Azioni; 