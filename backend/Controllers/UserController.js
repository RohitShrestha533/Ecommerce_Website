import bcrypt from "bcrypt";
const saltRounds = 10;
import { Product } from "../Models/Product.js";
import { User } from "../Models/User.js";
import { Cart } from "../Models/Cart.js";
import jwt from "jsonwebtoken";
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
    // Fetch the user's cart by their user ID and only active carts
    const cart = await Cart.findOne({
      user: req.user.userId,
      status: "active",
    }).populate({
      path: "items.product", // Make sure 'product' is the reference to the Product schema
      select: "name price images", // Fetch only necessary fields from Product model
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty." });
    }

    // Extract the items from the cart to match the structure expected by the frontend
    const cartItems = cart.items.map((item) => ({
      id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.images[0], // Assuming images is an array and you're using the first image
    }));
    // console.log(cartItems);
    res.status(200).json({
      message: "Cart retrieved successfully.",
      data: cartItems, // Send only the necessary fields to the frontend
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch cart.", error: error.message });
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
