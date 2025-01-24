import bcrypt from "bcrypt";
const saltRounds = 10;
import { Product } from "../Models/Product.js";
import { User } from "../Models/User.js";
import { Cart } from "../Models/Cart.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const productsdetail = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(200).json({
        message: "No products found",
        data: [],
      });
    }
    // console.log("user", products);
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
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.status(400).send({ message: "user already exist" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await User.create({
      name,
      email: email,
      password: hashedPassword,
    });
    res.status(200).send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let user;
  let role = "user";

  user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).send({ message: "Incorrect password" });
  }

  try {
    if (user && isPasswordCorrect) {
      const token = jwt.sign(
        { userId: user._id, role: role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );

      res.status(200).send({
        status: 200,
        message: "Login successful",
        token,
      });
    } else {
      res.status(400).send({ status: 400, message: "Invalid credentials" });
    }
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

export const cartdetail = async (req, res) => {
  try {
    // Fetch the active cart for the user
    const cart = await Cart.findOne({
      user: req.user.userId,
      status: "active",
    }).populate({
      path: "items.product",
      model: "Product", // Ensure this matches your Product model name
      select: "name price images",
    });

    // console.log(cart); // Log the populated cart to check if product details are there

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty." });
    }

    // Log the cart to inspect its structure
    // console.log(cart);

    // Map over the items and extract necessary details
    const cartItems = cart.items
      .map((item) => {
        if (!item.product) {
          // Log a message if the product is missing
          console.error("Missing product for cart item:", item);
          return null; // Or return a default object with minimal information
        }

        return {
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image:
            item.product.images && item.product.images.length > 0
              ? item.product.images[0]
              : null, // Safely get image
        };
      })
      .filter((item) => item !== null); // Filter out any null values (in case some items were missing products)

    // If there are no valid cart items after filtering
    if (cartItems.length === 0) {
      return res.status(404).json({ message: "No valid items in the cart." });
    }

    res.status(200).json({ data: cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      message: "Failed to fetch cart.",
      error: error.message || "Unknown error",
    });
  }
};

export const Addtocart = async (req, res) => {
  // console.log("hi");
  if (!req.user || !req.user.userId) {
    return res.status(401).send({ message: "User not authenticated" });
  }
  const { productId, quantity } = req.body; // Extract productId and quantity
  const userId = req.user.userId; // Assuming you have authentication middleware
  // console.log(req.user.userId);
  try {
    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      // If product exists in the cart, update the quantity and total
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].total =
        cart.items[existingItemIndex].price *
        cart.items[existingItemIndex].quantity;
    } else {
      // If product doesn't exist in the cart, add a new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price, // Assuming the price comes from the Product model
        total: product.price * quantity,
      });
    }

    // Save the cart
    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const userLogout = async (req, res) => {
  res.clearCookie("usertoken");
  res.status(200).send({ message: "Logged out successfully" });
};
export const removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.params; // Get the product ID from the URL params

    // Find the cart by the user's ID and status 'active'
    const cart = await Cart.findOne({
      user: req.user.userId,
      status: "active",
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    // Find the product in the cart items array and remove it
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart." });
    }

    // Remove the product from the cart items array
    cart.items.splice(itemIndex, 1);

    // Recalculate the totalPrice after removing the product
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.total, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Product removed from cart.", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({
      message: "Failed to remove product from cart.",
      error: error.message,
    });
  }
};

export const countProductsInCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.userId,
      status: "active",
    });

    if (!cart) {
      return res.status(200).json({ message: "No active cart found." });
    }

    if (!cart.items || cart.items.length === 0) {
      return res
        .status(200)
        .json({ message: "No products in the cart.", totalProducts: 0 });
    }

    return res.status(200).json({
      message: "Count of unique products retrieved successfully.",
      totalProducts: cart.items.length,
    });
  } catch (error) {
    console.error("Error during cart aggregation:", error);
    res.status(500).json({
      message: "Failed to count products in the cart.",
      error: error.message,
    });
  }
};
export const changepassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    console.log(email, newPassword);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const UpdateCart = async (req, res) => {
  const userId = req.user.userId; // Assuming user ID is available from JWT or session
  const cartItems = req.body.cartItems; // The cart items sent in the request

  try {
    // Map cart items to fetch product details and calculate totals
    const updatedItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.id); // Find the product by ID

        if (!product) {
          throw new Error(`Product with ID ${item.id} not found`);
        }

        return {
          product: product._id, // Reference the product by its _id
          quantity: item.quantity,
          price: product.price, // Get the price from the product
          total: product.price * item.quantity, // Calculate total price for this item
        };
      })
    );

    // Find the user's existing cart, or create a new one
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        user: userId,
        items: updatedItems,
        totalPrice: updatedItems.reduce((acc, item) => acc + item.total, 0), // Calculate total cart price
      });
    } else {
      // If cart exists, update the items and total price
      cart.items = updatedItems;
      cart.totalPrice = updatedItems.reduce((acc, item) => acc + item.total, 0); // Recalculate total price
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart); // Return the updated cart
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(400).json({ error: error.message }); // Send an error message if anything goes wrong
  }
};
