import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Footer from './components/Footer/Footer';
import Futures from './Futures/Futures';
import IndiceDetail from './pages/IndiceDetail';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/futures" element={<Futures />} />
          <Route path="/indice/:symbol" element={<IndiceDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
