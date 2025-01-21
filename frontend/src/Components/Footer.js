import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 w-100 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center mb-3">
            <h5>Stay Connected With Our Email Updates</h5>
            <form className="d-flex justify-content-center mt-3">
              <input
                type="email"
                className="form-control w-50"
                placeholder="Enter your email"
              />
              <button type="submit" className="btn btn-primary ml-2">
                SIGN UP
              </button>
            </form>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 col-md-3 col-sm-6 text-center mb-3 mb-md-0">
            <div className="d-flex justify-content-center">
              <a href="/" className="text-white mx-2 text-decoration-none">
                <i className="bi bi-facebook text-white"></i>
              </a>
              <a href="/" className="text-white mx-2 text-decoration-none">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="/" className="text-white mx-2 text-decoration-none">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="/" className="text-white mx-2 text-decoration-none">
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>

          {/* Products Section */}
          <div className="col-12 col-md-3 col-sm-6 mb-3 mb-md-0">
            <h5>Products</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  New products
                </a>
              </li>
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Best sales
                </a>
              </li>
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Our Company Section */}
          <div className="col-12 col-md-3 col-sm-6 mb-3 mb-md-0">
            <h5>Our Company</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Delivery
                </a>
              </li>
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Legal Notice
                </a>
              </li>
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="/" className="text-white text-decoration-none">
                  About us
                </a>
              </li>
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Secure Payment
                </a>
              </li>
            </ul>
          </div>

          {/* Ecommerce Information Section */}
          <div className="col-12 col-md-3 col-sm-6 mb-3 mb-md-0">
            <h5>Ecommerce Information</h5>
            <ul className="list-unstyled">
              <li>PUSPA RAJ - Nepali local Store</li>
              <li>Nepal</li>
              <li>Phone: 9866959525</li>
              <li>
                Email:{" "}
                <a
                  href="mailto:pusparaj@gmail.com"
                  className="text-white text-decoration-none"
                >
                  pusparaj@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p>&copy; 2025 - Ecommerce Website</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
