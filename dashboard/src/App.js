import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Components/Nav";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import LoginPage from "./Components/LoginPage";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

const App = () => {
  const token = localStorage.getItem("admintoken");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/nav/*"
          element={
            <ProtectedRoute isAuthenticated={!!token}>
              <Nav />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={token ? "/nav" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
