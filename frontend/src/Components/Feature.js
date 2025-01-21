import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper component
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper"; // Corrected import for Swiper v8+
import axios from "axios";

const Feature = () => {
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
    <div className="container-fluid" style={{ width: "80%" }}>
      <h2 className="text-black my-5">Product Details</h2>
      {products.length > 0 ? (
        <Swiper
          spaceBetween={20} // Reduced space between slides for small screens
          slidesPerView={3} // Default slidesPerView for large screens
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 1500, // Set the time interval between slides (in milliseconds)
            disableOnInteraction: false, // Keep autoplay even when interacting with the swiper
          }}
          modules={[Autoplay]} // Include Autoplay module here
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            0: { slidesPerView: 1 },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div
                className="col text-black m-3 p-2"
                style={{
                  borderRadius: "8px",
                  backgroundColor: "white", // Add background color for each slide
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "5px",
                  }}
                >
                  {product.images && product.images.length > 0 && (
                    <img
                      src={`http://localhost:5000/${product.images[0]}`}
                      alt={product.name}
                      className="img-fluid" // Ensure the image is responsive
                      style={{
                        height: "350px",
                        objectFit: "contain", // Ensure image fits within the box
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  <p className="fw-bolder fs-6">{product.name}</p>
                  <p className="fw-bolder fs-6">NPR {product.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center">No products available.</p>
      )}
    </div>
  );
};

export default Feature;
