// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components
// import "./App.css"; // Ensure styles are included here
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "bootstrap/dist/css/bootstrap.min.css";
// import CustomNavbar from "./Components/CustomNavbar";
// import Herosection from "./Components/Herosection";
// import Feature from "./Components/Feature";
// import ProductLanding from "./Components/ProductLanding";
// import SearchedItem from "./Components/SearchedItem"; // Example searched item page
// import Error from "./Components/Error"; // Assuming this is your error boundary
// import Footer from "./Components/Footer";
// import Digital from "./Components/Digital";
// import LoginPage from "./Components/LoginPage";

// function App() {
//   return (
//     <Router>
//       <div
//         className="App justify-center"
//         style={{
//           display: "flex",
//           minHeight: "100vh",
//           flexDirection: "column",
//           alignItems: "center",
//           width: "100%",
//           color: "white",
//         }}
//       >
//         <Error>
//           <div style={{ width: "80%" }}>
//             <CustomNavbar />
//           </div>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <>
//                   {/*  The home page section */}
//                   <Herosection style={{ width: "100%" }} />
//                   <ProductLanding />
//                   <Digital style={{ width: "100%" }} />
//                   <Feature />
//                 </>
//               }
//             />
//             <Route path="/searcheditem" element={<SearchedItem />} />
//             <Route path="/login" element={<LoginPage />} />
//           </Routes>
//           <Footer style={{ width: "100%" }} />
//         </Error>
//       </div>
//     </Router>
//   );
// }

// export default App;

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
import Digital from "./Components/Digital";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Error>
          <div style={{ width: "100%" }}>
            <CustomNavbar />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Home page section */}
                  <Herosection style={{ width: "100%" }} />
                  <ProductLanding />
                  <Digital style={{ width: "100%" }} />
                  <Feature />
                </>
              }
            />
            <Route path="/searcheditem" element={<SearchedItem />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          {/* Footer */}
          {/* <div style={{ marginTop: "auto" }}> */}
          <Footer style={{ width: "100%" }} />
          {/* </div> */}
        </Error>
      </div>
    </Router>
  );
}

export default App;
