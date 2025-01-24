import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ updateCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("usertoken");
      if (!token) {
        setAuthError("User not authenticated. Please log in.");
        navigate("/login");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/user/cartdetail",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setCartItems(response.data.data);
        } else {
          setAuthError("Error fetching cart items.");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response);
          if (error.response.status === 401) {
            setAuthError("Authentication failed. Please log in again.");
          } else {
            setAuthError(
              `Error fetching cart items. ${error.response.data.message}`
            );
          }
        } else {
          console.error("Error:", error);
          setAuthError("Network error. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [navigate]);

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
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        alert(res.data.message);
        updateCartCount();
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error removing product:", error);
      setAuthError("Failed to remove product. Please try again.");
    }
  };

  // Calculate the total price
  const totalprice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleBuyAll = async () => {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      setAuthError("User not authenticated. Please log in.");
      return;
    }
    console.log(cartItems);
    try {
      // Send the cart items to the backend to process the purchase
      const res = await axios.post(
        "http://localhost:5000/user/UpdateCart",
        { cartItems },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        alert(res.data.message); // Show confirmation message
        updateCartCount(); // Update the cart count in the parent component (pass an empty array or updated data)
        navigate("/checkout", {
          state: { cartItems },
        });
      } else {
        alert("Error processing your purchase. Please try again.");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      setAuthError("Failed to complete purchase. Please try again.");
    }
  };

  if (authError) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <h2 className="text-danger">{authError}</h2>
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
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
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
        <Row className="mb-4 mt-3 justify-content-end">
          {cartItems.length > 0 && (
            <Col
              xs={12}
              lg={6}
              className="d-flex flex-column justify-content-end align-items-start align-items-lg-start"
            >
              <div className="d-flex justify-content-between fw-bold w-100">
                <span>SubTotal</span>
                <span>{`NPR. ${totalprice.toFixed(2)}`}</span>{" "}
              </div>
              <div>Tax included. Shipping calculated at checkout.</div>
              <div className="w-100 mt-3">
                <Button
                  variant="success"
                  onClick={handleBuyAll}
                  className="w-100 w-lg-auto"
                >
                  Buy All
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default ShoppingCart;
