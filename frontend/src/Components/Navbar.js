import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import "./Nav.css";

const CustomNavbar = () => {
  return (
    <Navbar className="navbar p-3" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold">
          PUSPA BHAI
        </Navbar.Brand>
        <Nav className="mx-auto nav-links d-none d-lg-flex">
          <Form className="d-flex me-3">
            <FormControl
              type="text"
              placeholder="Search"
              className="me-2  search-input"
            />
            <Button variant="outline-primary" className="search-button">
              <FaSearch />
            </Button>
          </Form>
          {/* <Nav.Link href="#product">Product</Nav.Link>
          <Nav.Link href="#category">Category</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link> */}
        </Nav>

        {/* Utility Icons and Search Input */}
        <Nav className="ms-auto utility-icons align-items-center gap-4 mr-5 pr-5">
          {/* <Form className="d-flex me-3">
            <FormControl
              type="text"
              placeholder="Search"
              className="me-2  search-input"
            />
            <Button variant="outline-primary" className="search-button">
              <FaSearch />
            </Button>
          </Form> */}

          {/* Other Utility Icons */}
          <Nav.Link href="#cart" className="position-relative">
            <FaShoppingCart />
            <span className="cart-badge">2</span>
          </Nav.Link>
          <Nav.Link href="#account">
            <FaUser />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

// .navbar {
//     background-color: white; /* Set background color */
//   }

//   .navbar .nav-links .nav-link {
//     color: black;
//     font-weight: 500;
//     margin: 0 15px;
//     text-decoration: none;
//   }

//   .navbar .nav-links .nav-link:hover {
//     color: #007bff; /* Hover effect */
//   }

//   .utility-icons .nav-link {
//     color: black;
//     position: relative;
//   }

//   .utility-icons .nav-link:hover {
//     color: #007bff;
//   }

//   .cart-badge {
//     position: absolute;
//     top: -5px;
//     right: -10px;
//     background-color: red;
//     color: white;
//     border-radius: 50%;
//     font-size: 12px;
//     padding: 2px 6px;
//     font-weight: bold;
//   }

//   .search-input {
//     border-radius: 20px;
//     border: 1px solid #ddd;
//     padding: 5px 10px;
//     width: 200px;
//   }

//   .search-input:focus {
//     border-color: #007bff;
//     box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
//     outline: none;
//   }

//   .search-button {
//     border-radius: 50%;
//     /* padding: 7px; */
//   }

//   @media (max-width: 992px) {
//     .nav-links {
//       display: none; /* Hide center nav links on smaller screens */
//     }

//     .search-input {
//       width: 150px; /* Adjust width for smaller screens */
//     }
//   }
