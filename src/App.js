import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Azioni from './pages/Azioni/Azioni';
import Forex from './pages/Forex/Forex';
import Crypto from './pages/Crypto/Crypto';
import Analisi from './pages/Analisi/Analisi';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/azioni" element={<Azioni />} />
          <Route path="/forex" element={<Forex />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/analisi" element={<Analisi />} />
        </Routes>
        <Footer />
   
    </Router>
  );
}

export default App;
