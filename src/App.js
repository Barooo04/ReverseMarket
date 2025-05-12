import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Footer from './components/Footer/Footer';
import Futures from './Futures/Futures';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/futures" element={<Futures />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
