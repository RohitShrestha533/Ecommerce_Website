import { Order } from "../Models/Order.js";
import jwt from "jsonwebtoken";
export const createOrder = async (req, res) => {
  try {
    const { cartItems, shippingInfo, tc } = req.body;
    console.log(cartItems);
    console.log(shippingInfo);
    console.log(tc);

    const items = cartItems.map((item) => ({
      product: item.id,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    }));

    const order = new Order({
      user: req.user.userId,
      items,
      shippingInfo,
      paymentInfo: {
        method: "COD", // Modify as needed based on user input
      },
      totalPrice: tc,
      taxes: tc * 0.036,
      shippingCost: 100,
    });

    await order.save();
    res.status(200).json({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place the order.", error });
  }
};
export const orderhistory = async (req, res) => {
  try {
    // Find orders associated with the logged-in user
    const orders = await Order.find({ user: req.user.userId }).populate(
      "items.product",
      "name price images"
    ); // Populate the product details
    res
      .status(200)
      .json({ message: "Order history fetched successfully!", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch order history.", error });
  }
};
