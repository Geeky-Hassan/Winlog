import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Reglo from './components/reglo';
import ProtectedRoute from './auth/ProtectedRoute';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Reglo />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
