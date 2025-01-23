import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CustomNavbar from "./Components/CustomNavbar";
import Footer from "./Components/Footer";
import Error from "./Components/Error";
import Scrolltotop from "./Components/Scrolltotop";
import axios from "axios";
import Explore from "./Components/Explore";
import HowToGetStarted from "./Components/HowToGetStarted";
const Herosection = lazy(() => import("./Components/Herosection"));
const Feature = lazy(() => import("./Components/Feature"));
const ProductLanding = lazy(() => import("./Components/ProductLanding"));
const SearchedItem = lazy(() => import("./Components/SearchedItem"));
const Digital = lazy(() => import("./Components/Digital"));
const LoginPage = lazy(() => import("./Components/LoginPage"));
const RegisterPage = lazy(() => import("./Components/RegisterPage"));
const Productdetail = lazy(() => import("./Components/Productdetail"));
const Product = lazy(() => import("./Components/Product"));
const ShoppingCart = lazy(() => import("./Components/ShoppingCart"));

function App() {
  const [cartCount, setCartCount] = useState(0);

  // Function to update the cart count
  const updateCartCount = async () => {
    try {
      const token = localStorage.getItem("usertoken");
      if (!token) return; // Return early if there's no token

      const response = await axios.get(
        "http://localhost:5000/user/countProductsInCart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.totalProducts !== undefined) {
        setCartCount(response.data.totalProducts);
      }
    } catch (error) {
      console.error("Error fetching cart product count:", error);
    }
  };

  // Call updateCartCount when the component mounts
  useEffect(() => {
    updateCartCount();
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <Router>
      <Scrolltotop />
      <div className="App app-container">
        <Error>
          <div style={{ width: "100%" }}>
            <CustomNavbar
              cartCount={cartCount}
              updateCartCount={updateCartCount}
            />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/searcheditem" element={<SearchedItem />} />
              <Route path="/product" element={<Product />} />
              <Route
                path="/productdetail"
                element={<Productdetail updateCartCount={updateCartCount} />}
              />
              <Route
                path="/ShoppingCart"
                element={<ShoppingCart updateCartCount={updateCartCount} />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/"
                element={
                  <>
                    <Herosection />
                    <Explore style={{ width: "80%" }} />
                    <Feature />
                    <Digital />
                    <ProductLanding />
                    <HowToGetStarted />
                  </>
                }
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </Suspense>
          <Footer />
        </Error>
      </div>
    </Router>
  );
}

export default App;
