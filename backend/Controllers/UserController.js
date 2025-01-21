import { Product } from "../Models/Product.js";
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

// Search products based on query and category
// export const searchproduct = async (req, res) => {
//   try {
//     const { query, category } = req.query;

//     const searchQuery = {};

//     if (query) {
//       searchQuery.name = { $regex: query, $options: "i" };
//     }

//     if (category && category !== "all") {
//       searchQuery.category = category;
//     }

//     // Find matching products
//     const products = await Product.find(searchQuery);

//     if (!products) {
//       return res.status(404).json({ message: "No products found" });
//     }
//     res.status(200).json({ data: products });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
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
