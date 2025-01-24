import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaSignOutAlt,
  FaHome,
  FaSignInAlt,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./Nav.css";
import {
  Dropdown,
  DropdownButton,
  InputGroup,
  FormControl,
  Button,
  Nav,
  Form,
} from "react-bootstrap";

const Test = ({ cartCount, isLoggedIn, setIsLoggedIn, updateCartCount }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const prevScrollPosRef = useRef(window.pageYOffset);

  // Handle category change
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      alert("Please enter a search term");
      return;
    }
    navigate(`/searcheditem?query=${searchQuery}&category=${selectedCategory}`);
    setSearchQuery("");
  };

  const handleLogin = async () => {
    navigate("/login");
  };
  // Handle logout functionality
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("usertoken");
      if (token) {
        await axios.post(
          "http://localhost:5000/user/userLogout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        localStorage.removeItem("usertoken");
        setIsLoggedIn(false);
        updateCartCount();
        navigate("/login");
        alert("Logged out successfully");
      } else {
        alert("No token found, user might already be logged out.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(
        prevScrollPosRef.current > currentScrollPos || currentScrollPos < 10
      );
      prevScrollPosRef.current = currentScrollPos;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav
        className={`navbar bg-body-tertiary fixed-top ${
          isVisible ? "visible" : "invisible"
        }`}
        style={{
          transition: "top 0.3s ease-in-out",
          top: isVisible ? "0" : "-60px",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            NEPALI-KALAKAR
          </Link>

          <Nav className="mx-auto">
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <InputGroup>
                <DropdownButton
                  id="category-dropdown"
                  title={
                    selectedCategory === "all" ? "Categories" : selectedCategory
                  }
                  variant="outline-primary"
                  className="category-dropdown me-2"
                  onSelect={handleCategorySelect}
                >
                  <Dropdown.Item eventKey="all">All Categories</Dropdown.Item>
                  <Dropdown.Item eventKey="Poncho And Sweater">
                    Poncho And Sweater
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="category2">Category 2</Dropdown.Item>
                  <Dropdown.Item eventKey="category3">Category 3</Dropdown.Item>
                  <Dropdown.Item eventKey="category4">Category 4</Dropdown.Item>
                </DropdownButton>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="me-2 search-input"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </InputGroup>
              <Button
                variant="outline-primary"
                type="submit"
                className="search-button"
              >
                <FaSearch />
                Search
              </Button>
            </Form>
          </Nav>

          <div className="d-flex utility-icons align-items-center gap-4 ms-auto">
            <Link
              to="/ShoppingCart"
              className="position-relative"
              title="View Cart"
            >
              <FaShoppingCart />
              <span className="cart-badge">{cartCount || 0}</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title fw-bold" id="offcanvasNavbarLabel">
                NEPALI-KALAKAR
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    className="nav-link active d-flex align-items-center gap-2"
                    to="/profile"
                    style={{ fontSize: "1.25rem" }}
                  >
                    <FaUser style={{ fontSize: "1.5rem" }} /> Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active d-flex align-items-center gap-2"
                    to="/"
                    style={{ fontSize: "1.25rem" }}
                  >
                    <FaHome style={{ fontSize: "1.5rem" }} />
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active d-flex align-items-center gap-2"
                    to="/product"
                    style={{ fontSize: "1.25rem" }}
                  >
                    <FaShoppingCart style={{ fontSize: "1.5rem" }} /> Product
                  </Link>
                </li>
                {isLoggedIn ? (
                  <li className="nav-item mt-3">
                    <Button
                      variant="outline-danger"
                      onClick={handleLogout}
                      className="d-flex align-items-center gap-2"
                      style={{ fontSize: "1.25rem" }}
                    >
                      <FaSignOutAlt style={{ fontSize: "1.5rem" }} />
                      Logout
                    </Button>
                  </li>
                ) : (
                  <li className="nav-item mt-3">
                    <Button
                      variant="outline-primary"
                      onClick={handleLogin}
                      className="d-flex align-items-center gap-2"
                      style={{ fontSize: "1.25rem" }}
                    >
                      <FaSignInAlt style={{ fontSize: "1.5rem" }} />
                      Sign In
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Test;
