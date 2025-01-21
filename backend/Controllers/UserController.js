import bcrypt from "bcrypt";
const saltRounds = 10;
import { Product } from "../Models/Product.js";
import { User } from "../Models/User.js";
export const productsdetail = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(200).json({
        message: "No products found",
        data: [],
      });
    }
    console.log("user", products);
    return res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const userRegister = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password != confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match." });
  }
  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.status(400).send({ message: "user already exist" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await User.create({
      email: email,
      password: hashedPassword,
    });
    res.status(200).send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

export const searchproduct = async (req, res) => {
  try {
    const { query, category } = req.query;

    // Step 1: Try to match by category and name
    let products = await Product.find({
      category: { $regex: category, $options: "i" },
      name: { $regex: query, $options: "i" },
    });

    // Initialize an array to store additional products
    let additionalProducts = [];

    // If no products are found, search for products across all categories by product name
    if (products.length === 0) {
      additionalProducts = await Product.find({
        name: { $regex: query, $options: "i" }, // Search only by name across all categories
      });
    }

    // Append the additional products to the original products array
    products = [...products, ...additionalProducts];

    // Remove duplicates based on the product _id
    const uniqueProducts = products.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t._id.toString() === value._id.toString())
    );

    // Return the search results
    if (uniqueProducts.length > 0) {
      return res.status(200).json({ data: uniqueProducts });
    } else {
      return res.status(200).json({ message: "No products found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
