import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Reglo from './components/reglo';
import Home from './pages/Home';
import ABrags from './pages/ABrags';
import ProtectedRoute from './auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    <Toaster />
    <Router>
      <Routes>
        <Route path="/login" element={<Reglo />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/brags" element={<ProtectedRoute element={<ABrags />} />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
