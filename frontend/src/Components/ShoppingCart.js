// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Image, Button, Spinner } from "react-bootstrap";
// import axios from "axios";

// const ShoppingCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [authError, setAuthError] = useState(null); // For handling authentication errors
//   const [loading, setLoading] = useState(true); // For loading state

//   // Fetch cart items from the backend with authentication
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       const token = localStorage.getItem("usertoken"); // Get the JWT token from localStorage or cookies

//       if (!token) {
//         setAuthError("User not authenticated. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "http://localhost:5000/user/cartdetail",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
//             },
//           }
//         );
//         setCartItems(response.data.data);
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           setAuthError("Authentication failed. Please log in again.");
//         } else {
//           setAuthError("Error fetching cart items. Please try again.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const handleQuantityChange = (id, delta) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//           : item
//       )
//     );
//   };

//   const handleRemove = (id) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   if (authError) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center min-vh-100">
//         <div className="text-center">
//           <h2 className="text-danger">{authError}</h2>
//           <p>
//             <Button href="/login" variant="primary">
//               Log In
//             </Button>
//           </p>
//         </div>
//       </Container>
//     );
//   }

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center min-vh-100">
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   return (
//     <Container className="d-flex justify-content-center align-items-center">
//       <div className="w-auto" style={{ maxWidth: "1200px", minWidth: "80%" }}>
//         <h2 className="text-center mb-4">Shopping Cart</h2>
//         <Row className="mb-2">
//           <Col>
//             <strong>Product</strong>
//           </Col>
//           <Col>
//             <strong>Price</strong>
//           </Col>
//           <Col>
//             <strong>Quantity</strong>
//           </Col>
//           <Col>
//             <strong>Total</strong>
//           </Col>
//         </Row>

//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <Row
//               key={item.id}
//               className="align-items-center mb-3 border-bottom pb-2"
//             >
//               <Col>
//                 <Row className="align-items-center">
//                   <Col xs={12} md={6}>
//                     <Image
//                       src={`http://localhost:5000/${item.image}`}
//                       rounded
//                       className="me-3 img-fluid"
//                       style={{ maxWidth: "100px" }}
//                     />
//                   </Col>
//                   <Col xs={12} md={6}>
//                     <span>{item.name}</span>
//                     {item.price && (
//                       <small className="text-muted d-block">
//                         Size: {item.price}
//                       </small>
//                     )}
//                     <Button
//                       variant="link"
//                       size="sm"
//                       className="p-0 text-danger"
//                       onClick={() => handleRemove(item.id)}
//                     >
//                       Remove
//                     </Button>
//                   </Col>
//                 </Row>
//               </Col>

//               <Col>NPR. {item.price.toFixed(2)}</Col>
//               <Col>
//                 <div className="d-flex align-items-center">
//                   <Button
//                     variant="outline-secondary"
//                     size="sm"
//                     onClick={() => handleQuantityChange(item.id, -1)}
//                     className="me-2"
//                   >
//                     -
//                   </Button>
//                   <span>{item.quantity}</span>
//                   <Button
//                     variant="outline-secondary"
//                     size="sm"
//                     onClick={() => handleQuantityChange(item.id, 1)}
//                     className="ms-2"
//                   >
//                     +
//                   </Button>
//                 </div>
//               </Col>
//               <Col>Rs. {(item.price * item.quantity).toFixed(2)}</Col>
//             </Row>
//           ))
//         ) : (
//           <h4>No items in the cart.</h4>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default ShoppingCart;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const ShoppingCart = ({ updateCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [authError, setAuthError] = useState(null); // For handling authentication errors
  const [loading, setLoading] = useState(true); // For loading state

  // Fetch cart items from the backend with authentication
  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("usertoken"); // Get the JWT token from localStorage or cookies

      if (!token) {
        setAuthError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/user/cartdetail",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );
        setCartItems(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setAuthError("Authentication failed. Please log in again.");
        } else {
          setAuthError("Error fetching cart items. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = async (id) => {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      setAuthError("User not authenticated. Please log in.");
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:5000/user/removeProductFromCart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        alert(res.data.message);
        updateCartCount();
        // Remove item from the state after successful deletion
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error removing product:", error);
      setAuthError("Failed to remove product. Please try again.");
    }
  };

  if (authError) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <h2 className="text-danger">{authError}</h2>
          <p>
            <Button href="/login" variant="primary">
              Log In
            </Button>
          </p>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="w-auto" style={{ maxWidth: "1200px", minWidth: "80%" }}>
        <h2 className="text-center mb-4">Shopping Cart</h2>
        <Row className="mb-2">
          <Col>
            <strong>Product</strong>
          </Col>
          <Col>
            <strong>Price</strong>
          </Col>
          <Col>
            <strong>Quantity</strong>
          </Col>
          <Col>
            <strong>Total</strong>
          </Col>
        </Row>

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Row
              key={item.id}
              className="align-items-center mb-3 border-bottom pb-2"
            >
              <Col>
                <Row className="align-items-center">
                  <Col xs={12} md={6}>
                    <Image
                      src={`http://localhost:5000/${item.image}`}
                      rounded
                      className="me-3 img-fluid"
                      style={{ maxWidth: "100px" }}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <span>{item.name}</span>
                    {item.price && (
                      <small className="text-muted d-block">
                        Size: {item.price}
                      </small>
                    )}
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 text-danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Col>

              <Col>NPR. {item.price.toFixed(2)}</Col>
              <Col>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="me-2"
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="ms-2"
                  >
                    +
                  </Button>
                </div>
              </Col>
              <Col>Rs. {(item.price * item.quantity).toFixed(2)}</Col>
            </Row>
          ))
        ) : (
          <h4>No items in the cart.</h4>
        )}
      </div>
    </Container>
  );
};

export default ShoppingCart;
