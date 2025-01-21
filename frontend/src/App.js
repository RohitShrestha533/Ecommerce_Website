import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components
import "./App.css"; // Ensure styles are included here
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./Components/CustomNavbar";
import Herosection from "./Components/Herosection";
import Feature from "./Components/Feature";
import ProductLanding from "./Components/ProductLanding";
import SearchedItem from "./Components/SearchedItem"; // Example searched item page
import Error from "./Components/Error"; // Assuming this is your error boundary
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <div
        className="App justify-center"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          color: "white",
        }}
      >
        <Error>
          <div className="childAPP" style={{ width: "80%" }}>
            <CustomNavbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {/*  The home page section */}
                    <ProductLanding />
                    <Herosection />
                    <Feature />
                  </>
                }
              />
              <Route path="/searcheditem" element={<SearchedItem />} />
            </Routes>
          </div>
          <Footer style={{ width: "100%" }} />
        </Error>
      </div>
    </Router>
  );
}

export default App;
