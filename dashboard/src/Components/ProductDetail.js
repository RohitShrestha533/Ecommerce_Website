import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
const ProductDetail = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempImages, setTempImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const itemsPerPage = 5;
  const handleNameClick = (item) => {
    setSelectedProduct(item);
  };

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

  useEffect(() => {
    if (
      selectedProduct &&
      selectedProduct.images &&
      selectedProduct.images.length > 0
    ) {
      setImageCount(selectedProduct.images.length);
    }
  }, [selectedProduct]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (imageCount > 1) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [imageCount]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          formData.append("images", image);
        });
      }

      const token = localStorage.getItem("admintoken");

      if (tempImages.length > 0) {
        const response = await axios.put(
          `http://localhost:5000/admin/updateproductimage/${selectedProduct._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
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
        `http://localhost:5000/admin/updateproductdetail/${selectedProduct._id}`,
        selectedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setTempImages(files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productDetails.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productDetails.length / itemsPerPage);

  return (
    <div
      className="container-fluid p-0 m-0"
      style={{ width: "100%", backgroundColor: "#E7E3ED", overflowX: "hidden" }}
    >
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
        <div className="container-fluid p-4 m-4 ">
          <div className="row ">
            <div
              className={`col-10 justify-center card col-sm-10 col-md-10 col-lg-4 m-3 p-0 ${
                !isSmallScreen ? "position-sticky" : ""
              }`}
              style={{ height: "auto", top: "20px" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="position-relative">
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  <img
                    src={`http://localhost:5000/${selectedProduct.images[selectedImageIndex]}`}
                    alt={selectedProduct.name}
                    className="card-img-top"
                    style={{
                      border: isSmallScreen ? "2px solid #000" : "none", // Border for small screen
                      borderRadius: "8px",
                      width: "100%",
                      height: "300px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <p>No images available</p>
                )}

                {/* Navigation Arrows */}
                {isHovered && (
                  <>
                    <button
                      className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y"
                      onClick={handlePrev}
                      style={{
                        zIndex: 10,
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        fontSize: "24px",
                        backgroundColor: "white",
                        border: "2px solid #007bff",
                        color: "#007bff",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "black")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "white")
                      }
                    >
                      &#8249;
                    </button>
                    <button
                      className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y"
                      onClick={handleNext}
                      style={{
                        zIndex: 10,
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        fontSize: "24px",
                        backgroundColor: "white",
                        border: "2px solid #007bff",
                        color: "#007bff",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "black")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "white")
                      }
                    >
                      &#8250;
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails below the main image */}
              <div className="d-flex mt-2 justify-content-center">
                {selectedProduct.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageClick(index)} // Update main image on click
                    style={{
                      cursor: "pointer",
                      margin: "0 5px",
                      border:
                        selectedImageIndex === index
                          ? "2px solid #007bff"
                          : "2px solid #ddd", // Highlight border for selected image
                      borderRadius: "8px",
                    }}
                  >
                    <img
                      src={`http://localhost:5000/${image}`} // Thumbnail image
                      alt={`Product  ${index + 1}`}
                      className="img-fluid"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
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
    </div>
  );
};

export default ProductDetail;
