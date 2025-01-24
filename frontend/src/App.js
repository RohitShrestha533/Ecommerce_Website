import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from "./Components/Footer";
import Error from "./Components/Error";
import Scrolltotop from "./Components/Scrolltotop";
import axios from "axios";
import Explore from "./Components/Explore";
import HowToGetStarted from "./Components/HowToGetStarted";
import Navbar from "./Components/Navbar";
import SignupPage from "./Components/SignupPage";
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
import CheckOutPage from "./pages/CheckOutPage";
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

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      setIsLoggedIn(true);
      updateCartCount();
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to update the cart count
  const updateCartCount = async () => {
    try {
      const token = localStorage.getItem("usertoken");
      if (!token) return;

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
  useEffect(() => {
    if (cartCount !== 0) {
      updateCartCount();
    }
  }, [cartCount]);

  return (
    <Router>
      <Scrolltotop />
      <div className="App app-container">
        <Error>
          <div style={{ width: "100%", height: "60px" }}>
            <Navbar
              cartCount={cartCount}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
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
              <Route path="/checkout" element={<CheckOutPage />} />
              <Route
                path="/login"
                element={
                  <LoginPage
                    setIsLoggedIn={setIsLoggedIn}
                    isLoggedIn={isLoggedIn}
                    updateCartCount={updateCartCount}
                  />
                }
              />
              <Route
                path="/signup"
                element={<SignupPage isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/forgot-password"
                element={<ForgotPasswordPage isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/register"
                element={<RegisterPage isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/"
                element={
                  <>
                    <Herosection />
                    <Feature />
                    <Explore style={{ width: "80%" }} />
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
};

export default App;
