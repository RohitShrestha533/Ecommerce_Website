import React, { useState } from "react";
import axios from "axios";

const Product = ({ toggleSidebar }) => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    images: [], // Array to hold image files
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setProductDetails({
      ...productDetails,
      images: [...files], // Store the selected files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append product details to the form data
    Object.keys(productDetails).forEach((key) => {
      if (key !== "images") {
        formData.append(key, productDetails[key]);
      }
    });

    // Append image files to the form data
    productDetails.images.forEach((image) => {
      formData.append("images", image); // This allows multiple files to be uploaded
    });

    try {
      // Send the form data to the server
      const response = await axios.post(
        "http://localhost:5000/admin/addproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("Product saved successfully!");
        setProductDetails({
          name: "",
          description: "",
          price: "",
          category: "",
          stockQuantity: "",
          images: [""],
        });
      } else {
        alert("Product failed !", response.error);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product.");
    }
  };

  return (
    <div
      className="container p-0 m-0"
      style={{
        width: "100%",
        backgroundColor: "#E7E3ED",
        overflowX: "hidden",
      }}
    >
      <nav
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
          onClick={toggleSidebar} // Toggle sidebar when clicked
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand">E-Commerce Dashboard</span>
      </nav>
      <div
        className="card shadow-sm p-4 m-4"
        style={{ backgroundColor: "white" }}
      >
        <h2 className="fw-bolder mb-5">Add Product Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-lg-6 col-md-12">
              <label
                className="form-label  "
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                style={{ height: "60px" }}
                name="name"
                value={productDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-6 col-md-12">
              <label
                className="form-label"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Category
              </label>
              <input
                type="text"
                className="form-control"
                style={{ height: "60px" }}
                name="category"
                value={productDetails.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-6 col-md-12">
              <label
                className="form-label"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Price
              </label>
              <input
                type="number"
                className="form-control"
                style={{ height: "60px" }}
                name="price"
                value={productDetails.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-6 col-md-12">
              <label
                className="form-label"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Stock Quantity
              </label>
              <input
                type="number"
                className="form-control"
                style={{ height: "60px" }}
                name="stockQuantity"
                value={productDetails.stockQuantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-6 col-md-12">
              <label
                className="form-label"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Product Images
              </label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
                multiple // Allow multiple files to be selected
              />
            </div>
            <div className="col-lg-6 col-md-12">
              <label
                className="form-label"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Description
              </label>
              <textarea
                className="form-control"
                name="description"
                value={productDetails.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </div>
      <div
        className="flex  card shadow-sm p-4 m-4 mb-0"
        style={{
          backgroundColor: "white",
        }}
      >
        <p>Copyright © 2025 Ecommerce. All rights reserved</p>
      </div>
    </div>
  );
};

export default Product;
