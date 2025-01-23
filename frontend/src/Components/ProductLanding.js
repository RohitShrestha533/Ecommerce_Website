import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ProductLanding = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/user/productsdetail"
        );
        console.log(response.data); // Log the response structure
        if (response.status === 200) {
          setProducts(response.data.data.reverse() || []);
        } else {
          alert("Product fetch failed!");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate("/productdetail", { state: { product } });
  };
  const product = () => {
    navigate("/product");
  };

  return (
    <div
      className="container-fluid align-content-center"
      style={{ width: "80%" }}
    >
      <h2 className="text-black my-5">Product Details</h2>
      <div className="row d-flex flex-wrap justify-content-between ">
        {products.length > 0 ? (
          products.slice(0, 6).map((product, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 text-black p-2"
              style={{
                borderRadius: "8px",
              }}
              onClick={() => handleProductClick(product)} // Add click handler
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "5px",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  backgroundColor: "white", // Add background color for each slide
                }}
              >
                {product.images && product.images.length > 0 && (
                  <img
                    src={`http://localhost:5000/${product.images[0]}`}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "350px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                )}
                <p className="fw-bolder">{product.name}</p>
                <p className="fw-bolder">NPR {product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products available.</p>
        )}
        {products.length > 0}
        {
          <div className="d-flex justify-content-center mb-4">
            <button
              className="btn btn-dark text-white border-5 p-2"
              onClick={product}
            >
              View all
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default ProductLanding;
