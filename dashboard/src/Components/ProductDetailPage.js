import React from "react";
// import { useLocation } from "react-router-dom";
// import Nav from "./Nav";
const ProductDetailPage = (selectedProduct) => {
  //   const location = useLocation();

  //   const [sidebarVisible, setSidebarVisible] = useState(true);
  //   const { product } = location.state || {};
  //   const { product } = selectedProduct;

  //   if (!product) {
  //     return <div>Product data not found.</div>;
  //   }
  //   const toggleSidebar = () => {
  //     setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
  //   };
  return (
    <div>
      {/* {sidebarVisible && <Nav />} */}

      <div
        className="container p-0 m-0"
        style={{
          width: "100%",
          backgroundColor: "#E7E3ED",
          overflowX: "hidden",
        }}
      >
        {/* <nav
          className="navbar navbar-light bg-white shadow-sm p-3 mb-5"
          style={{
            height: "100px",
            width: "100%",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <button
            className="navbar-toggler no-border "
            type="button"
            onClick={toggleSidebar}
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <span className="navbar-brand">E-Commerce Dashboard</span>
        </nav> */}
        {/* <div
          className="card shadow-sm p-4 m-4"
          style={{ backgroundColor: "white" }}
        >
          <h2 className="fw-bolder mb-5"> Product Details</h2>
          <div>
            <h1>Product Details</h1>
            <p>
              <strong>Name:</strong> {product.name}
            </p>
            <p>
              <strong>Price:</strong> {product.price}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Stock Quantity:</strong> {product.stockQuantity}
            </p>
            <p>
              <strong>Image:</strong> {product.images}
            </p>
            <p>
              <strong>Status:</strong> {product.status}
            </p>
          </div>
        </div> */}
        <div
          className="flex card shadow-sm p-4 m-4 mb-0"
          style={{
            backgroundColor: "white",
          }}
        >
          <p>Copyright © 2025 Ecommerce. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
