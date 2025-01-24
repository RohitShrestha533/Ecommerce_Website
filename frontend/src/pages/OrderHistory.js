import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, Card, Button, Collapse } from "react-bootstrap";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // State to manage Collapse for item details

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem("usertoken");
        const response = await axios.get(
          "http://localhost:5000/user/orderhistory",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch order history.");
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Order History</h2>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loading && !error && orders.length === 0 && (
        <p className="text-center">No orders found</p>
      )}

      <div className="row">
        {orders.map((order) => (
          <div key={order._id} className="col-12 mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="card-title">Order ID: {order._id}</h5>

                <p className="card-text">Status: {order.status || "Pending"}</p>

                <h6 className="mt-3">Items:</h6>
                <Button
                  variant="primary"
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                >
                  View Items
                </Button>

                <Collapse in={open}>
                  <div className="mt-3">
                    <ul className="list-unstyled">
                      {order.items.map((item) => {
                        return (
                          <li
                            key={item._id}
                            className="d-flex align-items-center mb-3"
                          >
                            <Image
                              src={`http://localhost:5000/${item.product.images}`}
                              rounded
                              className="me-3 img-fluid"
                              style={{ maxWidth: "100px" }}
                            />
                            <div>
                              <p className="mb-0">{item.product.name}</p>
                              <p className="mb-0">Price: ${item.price}</p>
                              <p className="mb-0">Quantity: {item.quantity}</p>
                            </div>
                          </li>
                        );
                      })}
                      <p>Taxes: ${order.taxes}</p>
                      <p>Shipping Cost: ${order.shippingCost}</p>
                      <p>Total Price: ${order.totalPrice}</p>
                    </ul>
                  </div>
                </Collapse>

                <div className="d-flex justify-content-between mt-3">
                  <Button variant="secondary" size="sm">
                    Track Order
                  </Button>
                  <Button variant="danger" size="sm">
                    Cancel Order
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
