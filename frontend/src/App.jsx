import "./App.css";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import TeamDetails from "./Components/TeamDetails";
import AuthCallback from "./Components/AuthCallback";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Forgot_Password from "./Components/Forgot_Password";
import ResetPassword from "./Components/ResetPassword";

function App() {
  const [initialPath] = useState(window.location.pathname);

  return (
    <Router basename="/">
      <Routes>
        <Route
          path="/"
          element={
            initialPath === "/" ? <Navigate to="/login" replace /> : null
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<Forgot_Password />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />


        <Route path="/teams/:teamId" element={<TeamDetails />} />
        <Route
          path="*"
          element={
            initialPath !== "/" ? <Navigate to="/login" replace /> : null
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
