import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Product from "./Product";
const Navs = () => {
  const navigation = useNavigate();
  const [activeContent, setActiveContent] = useState("Dashboard");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("admintoken");

      if (token) {
        await axios.post(
          "http://localhost:5000/admin/adminLogout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.removeItem("admintoken");
        navigation("/login", { replace: true });
        alert("Logged out successfully");
      } else {
        alert("No token found, user might already be logged out.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to log out. Please try again.";
      alert(errorMessage);
    }
  };

  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return <div>Dashboard</div>;
      case "AddProduct":
        return <Product toggleSidebar={toggleSidebar} />;
      case "ProductDetails":
        return <div>ProductDetails</div>;
      case "Setting":
        return <div>Setting</div>;
      default:
        return (
          <div>
            <h2>Welcome</h2>
            <p>Select an option from the sidebar.</p>
          </div>
        );
    }
  };
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#E7E3ED",
      }}
    >
      {/* Main Content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          className="d-flex flex-column "
          style={{
            width: sidebarVisible ? "16%" : "0",
            height: "100%",
            backgroundColor: "white",
            paddingTop: "20px",
            overflow: "hidden",
            position: "relative",
            justifyContent: "space-between",
            transition: "width 0.2s ease",
          }}
        >
          {/* Navigation Links */}
          <ul className="nav flex-column">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "55px",
                fontSize: "larger", // Correct way to use font size
                fontWeight: "bold",
              }}
            >
              <button
                style={{
                  fontSize: "larger",
                  fontWeight: 500,
                  textDecoration: "none",
                  border: "none",
                  background: "none",
                }}
                onClick={() => setActiveContent("Dashboard")}
              >
                Super Admin
              </button>
              {/* <i className="bi bi-list pe-3"></i> */}
            </div>
            {sidebarVisible && <hr />}
            <li
              className="nav-item "
              onClick={() => setActiveContent("Dashboard")}
            >
              <button className="nav-link  btn btn-link">
                <i className="bi bi-speedometer pe-2"></i> Dashboard
              </button>
            </li>

            <li
              className="nav-item "
              onClick={() => setActiveContent("AddProduct")}
            >
              <button className="nav-link  btn btn-link">
                <i className="bi bi-cart-plus-fill pe-2"></i> Product
              </button>
            </li>
            <li
              className="nav-item "
              onClick={() => setActiveContent("ProductDetails")}
            >
              <button className="nav-link  btn btn-link">
                <i className="bi bi-cart-fill pe-2"></i> Product Details
              </button>
            </li>

            <li
              className="nav-item "
              onClick={() => setActiveContent("Setting")}
            >
              <button className="nav-link  btn btn-link">
                <i className="bi bi-gear-fill pe-2"></i> Setting
              </button>
            </li>
          </ul>

          <div className="p-3">
            <button className="btn btn-danger w-100" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right pe-2"></i>
              Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div
          className="p-0"
          style={{
            flex: 1,
            width: !sidebarVisible ? "100%" : "calc(100% - 16%)", // Adjust content width based on sidebar visibility
            transition: "width 0.1s ease", // Smooth transition for content width
            overflowY: "auto",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Navs;
