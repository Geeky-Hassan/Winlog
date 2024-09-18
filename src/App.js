import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reglo from "./components/reglo";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import ABrags from "./pages/ABrags";
import UBrag from "./pages/Update";
import DBrag from "./pages/DBrags";
import RBrag from "./pages/RevBrag";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<Reglo />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/brags"
            element={<ProtectedRoute element={<ABrags />} />}
          />
          <Route
            path="/upbrags"
            element={<ProtectedRoute element={<UBrag />} />}
          />
          <Route
            path="/delbrags"
            element={<ProtectedRoute element={<DBrag />} />}
          />
          <Route
            path="/revbrags"
            element={<ProtectedRoute element={<RBrag />} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
