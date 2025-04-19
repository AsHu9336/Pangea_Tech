import "./App.css";
import Login from "./Components/Login";
import Home from './Components/Home'
import Register from "./Components/Register";
import TeamDetails from "./Components/TeamDetails";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth/callback" element={<Login />} />
        <Route path="/teams/:teamId" element={<TeamDetails />} />
        
      </Routes>
    </Router>
  );
}

export default App;
