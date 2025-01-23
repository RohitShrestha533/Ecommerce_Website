import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Nav from "./Components/Nav";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import ProductDetail from "./Components/ProductDetail";
import ProductDetailPage from "./Components/ProductDetailPage";
import LoginPage from "./Components/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

const App = () => {
  const token = localStorage.getItem("admintoken");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/nav" element={<Nav />} />
        <Route
          path="/nav/*"
          element={
            <ProtectedRoute isAuthenticated={!!token}>
              <Nav />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Nav />} />
        <Route path="/product-detail" element={<ProductDetailPage />} />
        <Route path="*" element={<Navigate to={token ? "/nav" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
