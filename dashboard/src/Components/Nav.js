import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";

const Nav = () => {
  const navigation = useNavigate();
  const [activeLink, setActiveLink] = useState("");

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

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    navigation(`/${linkName}`);
  };

  return (
    <nav
      className="navbar navbar-dark fixed-top"
      style={{ backgroundColor: "#E7E3ED" }}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Brand Name */}
        <a className="navbar-brand" href="/">
          Admin Dashboard
        </a>

        {/* Offcanvas Content */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{ backgroundColor: "#E7E3ED" }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Admin Menu
            </h5>
            <button
              type="button"
              className="btn-close btn-close-dark"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body d-flex flex-column">
            <ul className="navbar-nav justify-start flex-grow-1 pe-3">
              {[
                "Dashboard",
                "Product",
                "ProductDetails",
                "Carousel",
                "Setting",
              ].map((linkName) => (
                <li className="nav-item" key={linkName}>
                  <button
                    className={`nav-link btn btn-link custom-nav-link ${
                      activeLink === linkName ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick(linkName)}
                  >
                    <i
                      className={`bi bi-${
                        linkName === "Dashboard"
                          ? "speedometer"
                          : linkName === "Product"
                          ? "cart-plus-fill"
                          : linkName === "ProductDetails"
                          ? "cart-fill"
                          : linkName === "Carousel"
                          ? "image"
                          : "gear-fill"
                      } pe-2`}
                    ></i>
                    {linkName}
                  </button>
                </li>
              ))}
            </ul>

            {/* Logout Button at the Bottom */}
            <div className="mt-auto p-3">
              <button className="btn btn-danger w-100" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right pe-2"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
