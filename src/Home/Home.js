import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [indiciEuropei] = useState([
    {
      nome: 'FTSE MIB',
      ultimo: '33.939,25',
      variazione: '+0,85%',
      max: '33.962,00',
      min: '33.647,50',
      timestamp: '17:35:00'
    },
    {
      nome: 'DAX 40',
      ultimo: '18.163,05',
      variazione: '+0,32%',
      max: '18.178,47',
      min: '18.089,34',
      timestamp: '17:35:00'
    },
    {
      nome: 'CAC 40',
      ultimo: '8.164,35',
      variazione: '+0,45%',
      max: '8.170,22',
      min: '8.125,18',
      timestamp: '17:35:00'
    },
  ]);

  const [indiciUSA] = useState([
    {
      nome: 'S&P 500',
      ultimo: '5.234,18',
      variazione: '+0,56%',
      max: '5.245,23',
      min: '5.198,85',
      timestamp: '17:35:00'
    },
    {
      nome: 'Nasdaq',
      ultimo: '16.428,82',
      variazione: '-0,25%',
      max: '16.449,52',
      min: '16.379,45',
      timestamp: '17:35:00'
    },
    {
      nome: 'Dow Jones',
      ultimo: '39.282,33',
      variazione: '+0,68%',
      max: '39.299,20',
      min: '39.122,50',
      timestamp: '17:35:00'
    },
  ]);

  const [forex] = useState([
    {
      nome: 'EUR/USD',
      ultimo: '1,0831',
      variazione: '-0,12%',
      max: '1,0845',
      min: '1,0822',
      timestamp: '17:35:00'
    },
    {
      nome: 'GBP/USD',
      ultimo: '1,2642',
      variazione: '+0,25%',
      max: '1,2658',
      min: '1,2612',
      timestamp: '17:35:00'
    },
    {
      nome: 'USD/JPY',
      ultimo: '151,42',
      variazione: '+0,32%',
      max: '151,55',
      min: '151,12',
      timestamp: '17:35:00'
    },
  ]);

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="nav-brand">ReverseMarket</div>
        <div className="nav-links">
          <a href="#" className="active">Dashboard</a>
          <a href="#">Azioni</a>
          <a href="#">Forex</a>
          <a href="#">Crypto</a>
          <a href="#">Analisi</a>
        </div>
        <div className="nav-auth">
          <button className="login-btn">Accedi</button>
          <button className="signup-btn">Registrati</button>
        </div>
      </nav>

      <div className="home-container">
        <header className="home-header">
          <h1>Dashboard Mercati Globali</h1>
          <p>Monitora in tempo reale l'andamento dei mercati finanziari</p>
        </header>

        <div className="markets-grid">
          <section className="indices-section">
            <h2>Indici Europei</h2>
            <div className="table-container">
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
                  {indiciEuropei.map((indice, index) => (
                    <tr key={index}>
                      <td className="indice-nome">{indice.nome}</td>
                      <td>{indice.ultimo}</td>
                      <td className={indice.variazione.includes('+') ? 'positivo' : 'negativo'}>
                        {indice.variazione}
                      </td>
                      <td>{indice.max}</td>
                      <td>{indice.min}</td>
                      <td>{indice.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="indices-section">
            <h2>Indici USA</h2>
            <div className="table-container">
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
                  {indiciUSA.map((indice, index) => (
                    <tr key={index}>
                      <td className="indice-nome">{indice.nome}</td>
                      <td>{indice.ultimo}</td>
                      <td className={indice.variazione.includes('+') ? 'positivo' : 'negativo'}>
                        {indice.variazione}
                      </td>
                      <td>{indice.max}</td>
                      <td>{indice.min}</td>
                      <td>{indice.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="indices-section">
            <h2>Forex Principali</h2>
            <div className="table-container">
              <table className="indices-table">
                <thead>
                  <tr>
                    <th>Coppia</th>
                    <th>Ultimo</th>
                    <th>Var %</th>
                    <th>Max</th>
                    <th>Min</th>
                    <th>Ora</th>
                  </tr>
                </thead>
                <tbody>
                  {forex.map((coppia, index) => (
                    <tr key={index}>
                      <td className="indice-nome">{coppia.nome}</td>
                      <td>{coppia.ultimo}</td>
                      <td className={coppia.variazione.includes('+') ? 'positivo' : 'negativo'}>
                        {coppia.variazione}
                      </td>
                      <td>{coppia.max}</td>
                      <td>{coppia.min}</td>
                      <td>{coppia.timestamp}</td>
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

export default Home;