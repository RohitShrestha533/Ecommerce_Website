import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import Axios for HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Productdetail = ({ updateCartCount }) => {
  const location = useLocation();
  const { product } = location.state || {}; // Get product details from state
  const navigate = useNavigate(); // Initialize useNavigate

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Keep track of the selected image index
  const [isHovered, setIsHovered] = useState(false); // Track if the image is being hovered
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!product) {
    return <p>No product details available.</p>;
  }

  const handleImageClick = (index) => {
    setSelectedImageIndex(index); // Update the selected image index when a smaller image is clicked
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDecrease = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleIncrease = () => setQuantity((q) => q + 1);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("usertoken");
      console.log(token);
      if (!token) {
        alert("please login first");
        navigate("/login");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/user/Addtocart",
        {
          productId: product._id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`, // Include authentication token if required
          },
        }
      );

      if (response.status === 200) {
        alert("Item added to cart successfully!");
        updateCartCount();
      } else {
        alert("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
      alert("An error occurred while adding the item to the cart.");
    }
  };
  return (
    <div
      className="container my-5"
      style={{ minHeight: "90vh", marginTop: "60px" }}
    >
      <div className="row">
        {/* Left side - Main Image with Slider */}
        <div
          className={`col-12 col-md-6 ${
            !isSmallScreen ? "position-sticky" : ""
          }`}
          style={{ top: "20px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="position-relative">
            {/* Main Image */}
            <img
              src={`http://localhost:5000/${product.images[selectedImageIndex]}`} // Main image based on index
              alt={product.name}
              className="img-fluid"
              style={{
                border: isSmallScreen ? "2px solid #000" : "none", // Border for small screen
                borderRadius: "8px",
                width: "100%",
                height: "300px",
                objectFit: "contain",
              }}
            />

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
            {product.images.map((image, index) => (
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
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Content */}
        <div
          className={`col-12 col-md-6 ${isSmallScreen ? "" : ""}`} // No overflow scrolling here
          style={{
            padding: isSmallScreen ? "3px" : "15px",
            margin: isSmallScreen ? "5px" : "",
            minHeight: "300px", // Set minHeight to match the large image's height
          }}
        >
          <h2>{product.name}</h2>
          <p>
            <strong>Price:</strong> Rs. {product.price} <s>Rs. </s>{" "}
            <span className="text-danger">Save %</span>
          </p>
          <p>Size: </p>
          <label htmlFor="quantity" className="me-2">
            Quantity:
          </label>
          <div className="row my-3 align-items-center">
            {/* Quantity Selector */}
            <div className="col-12 col-md-5 col-lg-4 d-flex align-items-center">
              <div className="input-group">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleDecrease}
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="text"
                  value={quantity}
                  readOnly
                  className="form-control text-center"
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="col-12 col-md-7 col-lg-8 mt-3 mt-md-0">
              <button
                className="btn btn-outline-dark w-100"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>

          {/* Buy Now Button */}
          <div className="row">
            <div className="col-12">
              <button
                className="btn w-100"
                style={{
                  backgroundColor: "#1773B0",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "1rem",
                  transition: "all 0.3s ease", // Smooth transition for hover effects
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#14588A"; // Darker shade on hover
                  e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)"; // Shadow effect
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#1773B0"; // Original color
                  e.target.style.boxShadow = "none"; // Remove shadow
                }}
              >
                Buy now
              </button>
            </div>
          </div>

          <div className="mt-3">
            <h4>Description</h4>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Productdetail = () => {
//   const location = useLocation();
//   const { product } = location.state || {};
//   const navigate = useNavigate();

//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth <= 768);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (!product) {
//     return <p>No product details available.</p>;
//   }

//   const handleImageClick = (index) => {
//     setSelectedImageIndex(index);
//   };

//   const handlePrev = () => {
//     setSelectedImageIndex((prevIndex) =>
//       prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     setSelectedImageIndex((prevIndex) =>
//       prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handleDecrease = () => setQuantity((q) => Math.max(q - 1, 1));
//   const handleIncrease = () => setQuantity((q) => q + 1);

//   const handleAddToCart = async () => {
//     try {
//       const token = localStorage.getItem("usertoken");
//       if (!token) {
//         alert("Please login first");
//         navigate("/login");
//         return;
//       }
//       const response = await axios.post(
//         "http://localhost:5000/user/Addtocart",
//         {
//           productId: product._id,
//           quantity: quantity,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Item added to cart successfully!");
//       } else {
//         alert("Failed to add item to cart.");
//       }
//     } catch (error) {
//       console.error("Error adding item to cart:", error.message);
//       alert("An error occurred while adding the item to the cart.");
//     }
//   };

//   const handleBuyNow = () => {
//     // Navigate directly to the checkout page or payment gateway
//     alert("Proceeding to checkout!");
//     navigate("/checkout", {
//       state: { product, quantity },
//     });
//   };

//   return (
//     <div className="container my-5">
//       <div className="row">
//         <div className="col-12 col-md-6">
//           <div className="position-relative">
//             <img
//               src={`http://localhost:5000/${product.images[selectedImageIndex]}`}
//               alt={product.name}
//               className="img-fluid"
//               style={{
//                 borderRadius: "8px",
//                 width: "100%",
//                 height: "300px",
//                 objectFit: "contain",
//               }}
//             />
//             {isHovered && (
//               <>
//                 <button
//                   className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y"
//                   onClick={handlePrev}
//                   style={{ borderRadius: "50%" }}
//                 >
//                   &#8249;
//                 </button>
//                 <button
//                   className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y"
//                   onClick={handleNext}
//                   style={{ borderRadius: "50%" }}
//                 >
//                   &#8250;
//                 </button>
//               </>
//             )}
//           </div>

//           <div className="d-flex mt-2 justify-content-center">
//             {product.images.map((image, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleImageClick(index)}
//                 style={{
//                   cursor: "pointer",
//                   margin: "0 5px",
//                   border:
//                     selectedImageIndex === index
//                       ? "2px solid #007bff"
//                       : "2px solid #ddd",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <img
//                   src={`http://localhost:5000/${image}`}
//                   alt={`Product ${index + 1}`}
//                   className="img-fluid"
//                   style={{ width: "60px", height: "60px", objectFit: "cover" }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="col-12 col-md-6">
//           <h2>{product.name}</h2>
//           <p>
//             <strong>Price:</strong> Rs. {product.price}
//           </p>
//           <div className="row my-3 align-items-center">
//             <label htmlFor="quantity" className="me-2">
//               Quantity:
//             </label>
//             <div className="d-flex align-items-center">
//               <button
//                 className="btn btn-outline-secondary me-2"
//                 onClick={handleDecrease}
//               >
//                 −
//               </button>
//               <span>{quantity}</span>
//               <button
//                 className="btn btn-outline-secondary ms-2"
//                 onClick={handleIncrease}
//               >
//                 +
//               </button>
//             </div>
//           </div>
//           <button
//             className="btn btn-outline-dark w-100 mb-2"
//             onClick={handleAddToCart}
//           >
//             Add to cart
//           </button>
//           <button
//             className="btn w-100"
//             style={{
//               backgroundColor: "#1773B0",
//               color: "white",
//               fontWeight: "bold",
//               borderRadius: "1rem",
//               transition: "all 0.3s ease",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = "#14588A";
//               e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = "#1773B0";
//               e.target.style.boxShadow = "none";
//             }}
//             onClick={handleBuyNow}
//           >
//             Buy now
//           </button>
//           <div className="mt-3">
//             <h4>Description</h4>
//             <p>{product.description}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Productdetail;
