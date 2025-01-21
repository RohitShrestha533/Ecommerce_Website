import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

const ProductDetail = ({ toggleSidebar }) => {
  const [productDetails, setProductDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null); // To hold the selected product
  const itemsPerPage = 5; // Number of items per page
  const [tempImages, setTempImages] = useState([]); // Temporary images state

  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("admintoken");
        const response = await axios.get(
          "http://localhost:5000/admin/productsdetail",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setProductDetails(response.data.data);
        } else {
          alert("Product fetch failed!");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleNameClick = (product) => {
    setSelectedProduct(product); // Set the selected product on click
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      Object.keys(selectedProduct).forEach((key) => {
        if (key !== "images") {
          formData.append(key, selectedProduct[key]);
        }
      });
      if (tempImages.length > 0) {
        Array.from(tempImages).forEach((image) => {
          formData.append("images", image); // Append each image file
        });
      }

      console.log(formData);
      console.log(selectedProduct);
      const token = localStorage.getItem("admintoken");
      if (tempImages.length > 0) {
        const response = await axios.put(
          `http://localhost:5000/admin/updateproductimage/${selectedProduct._id}`, // Assuming the product ID is available
          formData,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Product image updated successfully!");
          setIsEditing(false);
          setTempImages([]);
        } else {
          alert("Failed to update product details.");
        }
      }
      const response2 = await axios.put(
        `http://localhost:5000/admin/updateproductdetail/${selectedProduct._id}`, // Assuming the product ID is available
        selectedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Correct content type for form data
          },
        }
      );

      if (response2.status === 200) {
        alert("Product details updated successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to update product details.");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error updating product details. Please try again.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productDetails.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productDetails.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setTempImages(files); // Store the selected files in tempImages
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // To track the current image
  const [imageCount, setImageCount] = useState(0); // To store the total number of images

  useEffect(() => {
    if (
      selectedProduct &&
      selectedProduct.images &&
      selectedProduct.images.length > 0
    ) {
      setImageCount(selectedProduct.images.length); // Set the number of images available
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (imageCount > 1) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount); // Update image index every 3 seconds
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [imageCount]);
  return (
    <div
      className="container p-0 m-0"
      style={{ width: "100%", backgroundColor: "#E7E3ED", overflowX: "hidden" }}
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
          onClick={toggleSidebar}
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand">E-Commerce Dashboard</span>
      </nav>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row-reverse",
          paddingRight: "50px",
          gap: "4px",
        }}
      >
        {selectedProduct ? (
          <button
            className="btn btn-link p-0"
            style={{
              textDecoration: "none",
              color: "red",
              fontSize: "1.25rem",
            }}
          >
            <span style={{ fontSize: "1.5rem", color: "black" }}>&gt;</span>{" "}
            Product info
          </button>
        ) : (
          <span></span>
        )}

        <button
          className="btn btn-link p-0"
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "1.5rem",
          }}
          onClick={() => setSelectedProduct("")}
        >
          Products
        </button>
      </div>

      {!selectedProduct ? (
        <div
          className="card shadow-sm p-4 m-4"
          style={{ backgroundColor: "white" }}
        >
          <h2 className="fw-bolder mb-5">Products</h2>
          <table className="table table-striped">
            <thead style={{ backgroundColor: "#DDDFE9" }}>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Images</th>
                <th>Category</th>
                <th>Stock Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={item._id}
                  style={{
                    backgroundColor: index % 2 === 1 ? "#DDDFE9" : "white",
                    height: "70px",
                  }}
                >
                  <td>
                    <button
                      className="btn btn-link p-0"
                      style={{
                        textDecoration: "none",
                        color: "green",
                        fontSize: "1.25rem",
                      }}
                      onClick={() => handleNameClick(item)}
                    >
                      {item.name}
                    </button>
                  </td>
                  <td>{item.price}</td>
                  <td>{item.images.length}</td>
                  <td>{item.category}</td>
                  <td>{item.stockQuantity}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Component */}
          <Pagination>
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      ) : (
        <div className="container  p-4 m-4 ">
          <div className="row ">
            <div
              className="col-10 justify-center card col-sm-10 col-md-10 col-lg-4 m-3 p-0"
              style={{ height: "auto" }}
            >
              {selectedProduct.images && selectedProduct.images.length > 0 ? (
                <img
                  src={`http://localhost:5000/${
                    selectedProduct.images[
                      imageCount > 1 ? currentImageIndex : 0
                    ]
                  }`}
                  alt={`Product  ${imageCount > 1 ? currentImageIndex + 1 : 1}`}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div
              className="col-10 col-sm-10 col-md-10 col-lg-7 bg-white m-3 p-2"
              style={{ height: "auto", borderRadius: "8px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 className="fw-bolder m-2">Product Details</h2>
                <div>
                  {isEditing ? (
                    <>
                      <button
                        className="btn btn-success p-2 m-2"
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-danger p-2 m-2"
                        onClick={() => {
                          setIsEditing(false);
                          setSelectedProduct((prevProduct) => ({
                            ...prevProduct,
                          }));
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-success p-2 m-2"
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <hr />
              <div>
                <div className="row">
                  <div className="col-6">
                    <strong>Name:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={selectedProduct.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                    ) : (
                      selectedProduct.name
                    )}
                  </div>
                  <div className="col-6">
                    <strong>Price:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="number"
                        name="price"
                        value={selectedProduct.price}
                        onChange={handleChange}
                        className="form-control"
                      />
                    ) : (
                      selectedProduct.price
                    )}
                  </div>
                  <div className="col-6">
                    {isEditing ? (
                      <input
                        type="file"
                        name="images"
                        className="form-control"
                        onChange={handleImageChange}
                        multiple // Allow multiple files to be selected
                      />
                    ) : (
                      <strong>Status: {selectedProduct.status}</strong>
                    )}
                  </div>
                  <div className="col-6">
                    <strong>Stock Quantity:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="number"
                        name="stockQuantity"
                        value={selectedProduct.stockQuantity}
                        onChange={handleChange}
                        className="form-control"
                      />
                    ) : (
                      selectedProduct.stockQuantity
                    )}
                  </div>
                  <div className="col-12">
                    <strong>Description:</strong>{" "}
                    {isEditing ? (
                      <textarea
                        type="text"
                        name="description"
                        value={selectedProduct.description}
                        onChange={handleChange}
                        className="form-control"
                      />
                    ) : (
                      selectedProduct.description
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="flex card shadow-sm p-4 m-4 mb-0"
        style={{ backgroundColor: "white" }}
      >
        <p>Copyright © 2025 Ecommerce. All rights reserved</p>
      </div>
    </div>
  );
};

export default ProductDetail;
