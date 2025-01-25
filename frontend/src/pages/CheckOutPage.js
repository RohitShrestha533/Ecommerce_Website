import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Image,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CheckOutPage = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartItems || [];

  if (!cartItems || cartItems.length === 0) {
    return (
      <Alert variant="warning">
        Your cart is empty. Please add some items to proceed.
      </Alert>
    );
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("usertoken");
    if (!token) {
      setOrderStatus("Please log in to complete the order.");
      setLoading(false);
      return;
    }

    console.log("cart info ", cartItems);
    console.log("shipping info ", shippingInfo);
    const tc = totalPrice * 1.036 + 100;
    console.log("totalproce info ", tc);
    try {
      const response = await axios.post(
        "http://localhost:5000/user/checkout",
        { cartItems, shippingInfo, tc },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setOrderStatus("Order placed successfully!");
        setTimeout(() => navigate("/orderhistory"), 2000);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setOrderStatus("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 mb-5 " style={{ width: "80%" }}>
      <Row>
        {/* Cart Summary on Small Screens */}
        <Col xs={12} className="d-md-none mb-3">
          <Button
            className=" btn btn-outline-none btn-block w-100 dropdown-toggle"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#cartSummary"
            aria-expanded="false"
            aria-controls="cartSummary"
          >
            View Cart Summary
          </Button>
          <div className="collapse" id="cartSummary">
            <CartSummary cartItems={cartItems} total={totalPrice} />
          </div>
        </Col>

        {/* Checkout Form */}
        <Col md={7}>
          <h2 className="text-center mb-4">Checkout</h2>
          {orderStatus && (
            <Alert
              variant={
                orderStatus === "Order placed successfully!"
                  ? "success"
                  : "danger"
              }
            >
              {orderStatus}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPaymentMethod" className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                name="paymentMethod"
                value={shippingInfo.paymentMethod || "COD"} // Default to COD
                onChange={handleInputChange}
                required
              >
                <option value="COD">Cash on Delivery (COD)</option>
                <option value="Esewa">Esewa</option>
                <option value="Khalti">Khalti</option>
                <option value="Card">Credit/Debit Card</option>
                <option value="BankTransfer">Bank Transfer</option>
              </Form.Select>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </Form>
        </Col>

        {/* Cart Summary on Large Screens */}
        <Col md={5} className="d-none d-md-block">
          <CartSummary cartItems={cartItems} total={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

const CartSummary = ({ cartItems, total }) => (
  <div className="border p-3">
    <h4>Cart Summary</h4>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item, index) => (
          <tr key={index}>
            <td>
              <Image
                src={`http://localhost:5000/${item.image}`}
                alt={item.name}
                style={{ maxWidth: "50px" }}
              />
            </td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>NPR {(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <hr />
    <Table striped bordered hover>
      <tbody>
        <tr>
          <td>SubTotal</td>
          <td className="text-end">NPR {total.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Shipping</td>
          <td className="text-end">NPR 100</td>
        </tr>
        <tr>
          <td>
            <strong>Total</strong>
          </td>
          <td className="text-end">
            <strong>NPR {(1.036 * total + 100).toFixed(2)}</strong>
          </td>
        </tr>
        <tr>
          <td colSpan="2" className="text-start">
            <small>Including NPR {(0.036 * total).toFixed(2)} in taxes</small>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default CheckOutPage;
