import express from "express";
import { Order } from "../Models/Order.js";
import { User } from "../Models/User.js";
import { Product } from "../Models/Product.js";

const router = express.Router();

router.get("/revenue", async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $match: { orderStatus: "confirmed" }, // Only include confirmed orders
      },
      {
        $group: {
          _id: { $week: "$createdAt" }, // Group by week
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by week (ascending)
      },
    ]);

    // Find the range of weeks from the first to the last week
    const startWeek = Math.min(...orders.map((order) => order._id));
    const endWeek = Math.max(...orders.map((order) => order._id));

    // Create an array with all weeks in the range, and set revenue to 0 for weeks without data
    const fullData = [];
    for (let week = startWeek; week <= endWeek; week++) {
      const orderData = orders.find((order) => order._id === week);
      fullData.push({
        week: `Week ${week}`,
        totalRevenue: orderData ? orderData.totalRevenue : 0,
      });
    }

    // Format the data for the frontend
    const labels = fullData.map((data) => data.week);
    const data = fullData.map((data) => data.totalRevenue);

    res.json({ labels, data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching revenue data" });
  }
});

// Get total sales for this month
router.get("/total-sales", async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date().setDate(1)) },
          orderStatus: "confirmed",
        },
      }, // Match orders for this month
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    ]);

    res.json({ totalSales: totalSales[0]?.totalSales || 0 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total sales" });
  }
});

// Get total orders for this month
router.get("/total-orders", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(1)) }, // Orders from this month
      orderStatus: "confirmed", // Filter for confirmed orders
    });

    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total orders" });
  }
});

// Get total customers
router.get("/total-customers", async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments();

    res.json({ totalCustomers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total customers" });
  }
});

// Get top-selling products
router.get("/top-products", async (req, res) => {
  try {
    const products = await Order.aggregate([
      // Match orders that have status "confirmed"
      {
        $match: { orderStatus: "confirmed" },
      },
      { $unwind: "$items" }, // Flatten items in the order
      {
        $match: { "items.product": { $ne: null } }, // Ensure that products exist
      },
      {
        $group: {
          _id: "$items.product", // Group by product ID
          totalSold: { $sum: "$items.quantity" }, // Sum the quantities sold
        },
      },
      {
        $sort: { totalSold: -1 }, // Sort by total quantity sold (descending)
      },
      { $limit: 10 }, // Limit to top 3 products
      {
        $lookup: {
          from: "products", // Join with products collection
          localField: "_id", // Match product ID
          foreignField: "_id", // Foreign key in products collection
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" }, // Unwind the resulting product details
      {
        $project: {
          productName: "$productDetails.name", // Include product name
          sold: "$totalSold", // Include total sold
        },
      },
    ]);

    res.json(products); // Send top products as response
  } catch (error) {
    res.status(500).json({ message: "Error fetching top products" });
  }
});

export default router;
