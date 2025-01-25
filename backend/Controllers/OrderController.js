import { Order } from "../Models/Order.js";
import { Product } from "../Models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { cartItems, shippingInfo, tc } = req.body;
    console.log(cartItems);
    console.log(shippingInfo);
    console.log(tc);

    const items = [];
    for (const cartItem of cartItems) {
      const product = await Product.findById(cartItem.id); // Fetch product details

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${cartItem.id} not found.` });
      }

      if (product.stockQuantity < cartItem.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product '${product.name}'. Available quantity: ${product.stockQuantity}.`,
        });
      }

      items.push({
        product: product._id,
        quantity: cartItem.quantity,
        price: cartItem.price,
        total: cartItem.price * cartItem.quantity,
      });

      // Deduct stock
      product.stockQuantity -= cartItem.quantity;

      // Update product status if stockQuantity is zero
      if (product.stockQuantity === 0) {
        product.status = "out of stock";
      }

      await product.save(); // Save updated product
    }

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
      orderStatus: "confirmed",
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

export const cancelorder = async (req, res) => {
  const { orderId, items } = req.body;

  try {
    // Update order status
    await Order.findByIdAndUpdate(orderId, { orderStatus: "canceled" });

    // Update product stock
    for (const item of items) {
      const product = await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stockQuantity: item.quantity },
      });
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${cartItem.id} not found.` });
      }
      if (product.stockQuantity > 0) {
        product.status = "out of stock";
      }
      await product.save();
    }

    res.status(200).json({ message: "Order canceled successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel order." });
  }
};
