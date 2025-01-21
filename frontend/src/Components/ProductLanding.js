import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductLanding = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="container-fluid">
      <h2 className="text-black my-5">Product Details</h2>
      <div className="row justify-content-center">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-3 text-black m-3 p-2"
              style={{
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "5px",
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
      </div>
    </div>
  );
};

export default ProductLanding;
