import React, { useState } from 'react';
import './Crypto.css';
import Navbar from '../../components/Navbar/Navbar';

const Crypto = () => {
  const [topCrypto] = useState([
    {
      nome: 'Bitcoin',
      simbolo: 'BTC',
      prezzo: '65,832.45',
      variazione24h: '+2.5%',
      marketCap: '1.28T',
      volume24h: '42.5B'
    },
    {
      nome: 'Ethereum',
      simbolo: 'ETH',
      prezzo: '3,245.78',
      variazione24h: '-1.2%',
      marketCap: '389.5B',
      volume24h: '15.2B'
    },
    {
      nome: 'Solana',
      simbolo: 'SOL',
      prezzo: '142.65',
      variazione24h: '+5.8%',
      marketCap: '62.8B',
      volume24h: '4.1B'
    }
  ]);

  return (
    <div className="page-container">
      <Navbar />
      <div className="crypto-container">
        <div className="crypto-header">
          <h1>Crypto Market</h1>
          <div className="market-metrics">
            <div className="metric">
              <span>Market Cap Totale</span>
              <h3>$2.45T</h3>
            </div>
            <div className="metric">
              <span>Volume 24h</span>
              <h3>$125.8B</h3>
            </div>
            <div className="metric">
              <span>Dominanza BTC</span>
              <h3>52.3%</h3>
            </div>
          </div>
        </div>

        <div className="crypto-grid">
          {/* Market Overview */}
          <div className="market-overview">
            <h2>Panoramica del Mercato</h2>
            <div className="overview-cards">
              <div className="overview-card gainers">
                <h3>Top Gainers 24h</h3>
                <ul>
                  <li>
                    <span>SOL</span>
                    <span className="positivo">+5.8%</span>
                  </li>
                  <li>
                    <span>AVAX</span>
                    <span className="positivo">+4.2%</span>
                  </li>
                  <li>
                    <span>DOT</span>
                    <span className="positivo">+3.9%</span>
                  </li>
                </ul>
              </div>
              <div className="overview-card losers">
                <h3>Top Losers 24h</h3>
                <ul>
                  <li>
                    <span>DOGE</span>
                    <span className="negativo">-4.5%</span>
                  </li>
                  <li>
                    <span>SHIB</span>
                    <span className="negativo">-3.8%</span>
                  </li>
                  <li>
                    <span>XRP</span>
                    <span className="negativo">-2.1%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Top Cryptocurrencies */}
          <div className="top-crypto">
            <h2>Top Criptovalute</h2>
            <div className="crypto-table">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Simbolo</th>
                    <th>Prezzo</th>
                    <th>24h %</th>
                    <th>Market Cap</th>
                    <th>Volume 24h</th>
                  </tr>
                </thead>
                <tbody>
                  {topCrypto.map((crypto, index) => (
                    <tr key={index}>
                      <td>{crypto.nome}</td>
                      <td>{crypto.simbolo}</td>
                      <td>${crypto.prezzo}</td>
                      <td className={crypto.variazione24h.includes('+') ? 'positivo' : 'negativo'}>
                        {crypto.variazione24h}
                      </td>
                      <td>${crypto.marketCap}</td>
                      <td>${crypto.volume24h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Market Sentiment */}
          <div className="market-sentiment">
            <h2>Sentiment di Mercato</h2>
            <div className="sentiment-grid">
              <div className="sentiment-card">
                <h3>Fear & Greed Index</h3>
                <div className="fear-greed-meter">
                  <div className="meter-value" style={{ '--value': '65%' }}>65</div>
                  <span className="meter-label">Greed</span>
                </div>
              </div>
              <div className="sentiment-card">
                <h3>Trend BTC</h3>
                <div className="trend-indicators">
                  <div className="indicator">
                    <span>RSI</span>
                    <span className="value neutral">58</span>
                  </div>
                  <div className="indicator">
                    <span>MACD</span>
                    <span className="value positivo">Bullish</span>
                  </div>
                  <div className="indicator">
                    <span>Volume</span>
                    <span className="value positivo">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* News Feed */}
          <div className="crypto-news">
            <h2>Ultime News</h2>
            <div className="news-feed">
              <div className="news-item">
                <span className="news-time">2h fa</span>
                <h4>Bitcoin supera i $65,000 dopo l'approvazione degli ETF</h4>
                <p>Il mercato reagisce positivamente all'approvazione degli ETF spot su Bitcoin...</p>
              </div>
              <div className="news-item">
                <span className="news-time">4h fa</span>
                <h4>Ethereum completa l'upgrade Dencun</h4>
                <p>L'upgrade porta miglioramenti significativi alla scalabilità della rete...</p>
              </div>
              <div className="news-item">
                <span className="news-time">6h fa</span>
                <h4>Solana raggiunge nuovo massimo del 2024</h4>
                <p>La crescita dell'ecosistema DeFi spinge SOL a nuovi massimi...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crypto; 