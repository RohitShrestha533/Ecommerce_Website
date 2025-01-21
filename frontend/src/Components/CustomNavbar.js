import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  InputGroup,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./Nav.css";

const CustomNavbar = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize navigate

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

    // Check if search input is empty
    if (searchQuery.trim() === "") {
      alert("Please enter a search term");
      return;
    }

    // Navigate to the searched item page with the search query and selected category
    console.log(
      `Searching for "${searchQuery}" in category: ${selectedCategory}`
    );
    navigate(`/searcheditem?query=${searchQuery}&category=${selectedCategory}`);
    setSearchQuery("");
  };

  return (
    <Navbar className="navbar p-3 w-100" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" className="fw-bold">
          PUSPA JHUKEGA NAHI
        </Navbar.Brand>

        {/* Center Search Form with Category Dropdown */}
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
                value={searchQuery} // Bind search query to form input
                onChange={handleSearchChange} // Update search query state
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

        <Nav className="ms-auto utility-icons align-items-center gap-4">
          <Link to="/cart" className="position-relative">
            <FaShoppingCart />
            <span className="cart-badge">2</span>
          </Link>
          <Link to="/register">
            <FaUser />
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
