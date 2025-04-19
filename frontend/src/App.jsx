import "./App.css";
import Login from "./Components/Login";
import Home from './Components/Home'
import Register from "./Components/Register";
import TeamDetails from "./Components/TeamDetails";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE_URL = "https://pangea-tech-backend.onrender.com";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token with backend
      fetch(`${API_BASE_URL}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }
        })
        .catch(error => {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div className="text-center mt-8">Loading...</div>;
    }
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  // Auth Route component (for login/register when already authenticated)
  const AuthRoute = ({ children }) => {
    if (loading) {
      return <div className="text-center mt-8">Loading...</div>;
    }
    return isAuthenticated ? <Navigate to="/home" replace /> : children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={
          <AuthRoute>
            <Login setIsAuthenticated={setIsAuthenticated} />
          </AuthRoute>
        } />
        
        <Route path="/register" element={
          <AuthRoute>
            <Register setIsAuthenticated={setIsAuthenticated} />
          </AuthRoute>
        } />
        
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        <Route path="/auth/callback" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        
        <Route path="/teams/:teamId" element={
          <ProtectedRoute>
            <TeamDetails />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
