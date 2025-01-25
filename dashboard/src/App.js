import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Product from "./Components/Product";
import CarouselImage from "./Components/CaraouselImage";
import ProductDetail from "./Components/ProductDetail";
import LoginPage from "./Components/LoginPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import the context
import "./App.css";
const App = () => {
  const { authState } = useAuth(); // Use the auth state from context

  return (
    <Router>
      <div className="app-container">
        {authState.token && <Navbar />} {/* Show Navbar if authenticated */}
        <div className="content">
          <Routes>
            <Route path="/login" element={!authState.token && <LoginPage />} />
            <Route
              path="/register"
              element={!authState.token && <Register />}
            />
            <Route path="/Product" element={<Product />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route
              path="/ProductDetails"
              element={<ProtectedRoute element={<ProductDetail />} />}
            />
            <Route path="/Carousel" element={<CarouselImage />} />
            <Route path="/Setting" element={<Register />} />
            <Route
              path="/"
              element={
                authState.token ? (
                  <Navigate to="/Product" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
        {authState.token && <Footer />} {/* Show Footer if authenticated */}
      </div>
    </Router>
  );
};

// Named component to wrap App with AuthProvider
const AppWithProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithProvider;
