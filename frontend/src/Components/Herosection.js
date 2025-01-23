import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Herosection = () => {
  const [productImages, setProductImages] = useState([]); // To store all product images
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Current image index for cycling
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch product data and extract images
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/carouselsdetail"
        );

        if (response.status === 200) {
          const allImages = [];
          response.data.carouselsimage.forEach((product) => {
            if (product.images && product.images.length > 0) {
              product.images.forEach((image) => {
                allImages.push(`http://localhost:5000/${image}`);
              });
            }
          });

          setProductImages(allImages);
        } else {
          alert("Product fetch failed!");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Cycle through images every 3 seconds
  useEffect(() => {
    if (productImages.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % productImages.length
        );
      }, 4000);

      return () => clearInterval(intervalId); // Cleanup on component unmount
    }
  }, [productImages]);

  return (
    <div
      className="hero-section position-relative "
      style={{
        width: "80%",
        backgroundColor: "white", // Set background color for the entire section
      }}
    >
      {productImages.length > 0 ? (
        <div
          style={{
            height: "100vh", // Ensure the div matches the viewport height
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E4E4E4", // Set background color for the div containing the image
          }}
        >
          <img
            src={productImages[currentImageIndex]} // Display the current image
            alt={`Product ${currentImageIndex + 1}`}
            className="img-fluid"
            style={{
              height: "100%",
              maxWidth: "100%",
              objectFit: "cover", // Ensure the image fits without distortion
            }}
          />
        </div>
      ) : (
        <p>Loading images...</p>
      )}
      <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
      <Container
        className="position-absolute top-50 start-50 translate-middle text-center text-white"
        style={{
          zIndex: 2,
        }}
      >
        <h1 className="display-4 fw-bold">Discover Artisanal Treasures</h1>
        <p className="lead">Explore Unique Handcrafted Creations</p>
        <Button variant="light" size="lg" onClick={() => navigate("/product")}>
          Shop Now
        </Button>
      </Container>
    </div>
  );
};

export default Herosection;
