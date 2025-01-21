import bcrypt from "bcrypt";
const saltRounds = 10;
import { Admin } from "../Models/Admin.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Product } from "../Models/Product.js";
import { Carousel } from "../Models/Carousel.js";

// const userToken = jwt.sign(
//   { userId: user._id, role: "user" },
//   process.env.JWT_SECRET_KEY,
//   { expiresIn: "1h" }
// );

// For admins

export const adminRegister = async (req, res) => {
  const { email, phone, password, confirmPassword } = req.body;

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).send({ message: "Phone number must be 10 digits." });
  }

  if (password != confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match." });
  }
  const oldAdmin = await Admin.findOne({
    $or: [{ email: email }, { phone: phone }],
  });

  if (oldAdmin) {
    return res.status(400).send({ message: "admin already exist" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await Admin.create({
      email: email,
      phone,
      password: hashedPassword,
      Dob: null,
      gender: null,
      fullname: null,
    });
    res.send({ status: "ok", data: "Admin Created" });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

//login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  let admin,
    role = "admin";
  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  if (role === "admin") {
    admin = await Admin.findOne({ email });
  }

  if (!admin) {
    console.log("not");
    return res.status(404).send({ message: "Admin not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, admin.password);

  if (!isPasswordCorrect) {
    return res.status(400).send({ message: "Incorrect password" });
  }

  try {
    if (admin && isPasswordCorrect) {
      const token = jwt.sign(
        { adminId: admin._id, role: "admin" },
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

export const adminLogout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully" });
};

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Timestamp the file to prevent name clashes

    // Check if file already exists
    const filePath = path.join("uploads", fileName);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (!err) {
        // If file already exists, skip upload
        return cb(new Error("File already exists"), false);
      }
      cb(null, fileName); // Proceed with upload
    });
  },
});

const upload = multer({ storage: storage }).array("images"); // 'images' is the key for the files

export const addproduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Error uploading images: " + err.message });
    }

    const { name, description, price, category, stockQuantity } = req.body;

    // Ensure all required fields are provided
    if (!name || !description || !price || !category || !stockQuantity) {
      return res.status(400).send({ message: "Missing required fields." });
    }

    const imagePaths = req.files ? req.files.map((file) => file.path) : [];
    if (imagePaths.length === 0) {
      return res.status(400).send({ message: "No images uploaded." });
    }

    try {
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        stockQuantity,
        images: imagePaths,
      });

      await newProduct.save();
      res.status(200).json({ message: "Product added successfully!" });
    } catch (error) {
      console.error("Error saving product:", error);
      res.status(500).json({ message: "Error saving product." });
    }
  });
};
export const Carouselimg = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Error uploading images: " + err.message });
    }

    const imagePaths = req.files ? req.files.map((file) => file.path) : [];
    if (imagePaths.length === 0) {
      return res.status(400).send({ message: "No images uploaded." });
    }
    try {
      const newCarousel = new Carousel({
        images: imagePaths,
      });

      await newCarousel.save();
      res.status(200).json({ message: "Carousel Image added successfully!" });
    } catch (error) {
      console.error("Error saving Carousel Image:", error);
      res.status(500).json({ message: "Error saving Carousel Image." });
    }
  });
};
export const productsdetail = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(200).json({
        message: "No products found",
        data: [],
      });
    }
    console.log(products);
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
export const carouselsdetail = async (req, res) => {
  try {
    const carouselsimage = await Carousel.find();

    if (carouselsimage.length === 0) {
      return res.status(200).json({
        message: "No carousels image found",
        data: [],
      });
    }
    console.log(carouselsimage);
    return res.status(200).json({
      message: "Products fetched successfully",
      carouselsimage,
    });
  } catch (error) {
    console.error("Error fetching carousels image:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateproductdetail = async (req, res) => {
  try {
    const { id } = req.params;
    const prod = req.body;
    console.log(prod);
    const { name, price, stockQuantity, status, description } = prod;
    console.log("hoii", name, price, stockQuantity, status, description);
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        stockQuantity,
        status,
        description,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ message: "Server error. Could not update product." });
  }
};

export const updateproductimage = async (req, res) => {
  let imagePaths = [];
  console.log("giot it");
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Error uploading images: " + err.message });
    }

    // If files are uploaded, map their paths
    imagePaths = req.files ? req.files.map((file) => file.path) : [];
  });

  try {
    const { id } = req.params;

    // Fetch the product by ID to get the current images
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If no new images were uploaded, use the existing images
    const updatedImages =
      imagePaths.length > 0
        ? [...product.images, ...imagePaths]
        : product.images;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: updatedImages,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product image updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product image:", error);
    return res
      .status(500)
      .json({ message: "Server error. Could not update product image." });
  }
};

// export const updateproductdetail = async (req, res) => {
//   let imagePaths = [];

//   // Make sure that the formData is parsed correctly
//   const productDetails = JSON.parse(req.body.productDetails); // Parse the JSON string from req.body

//   // Extract product data from the parsed productDetails
//   const { name, price, description, stockQuantity, category, status } =
//     productDetails;
//   console.log(productDetails);
//   console.log(name, price, description, stockQuantity);
//   try {
//     // First handle the file upload, multer will process it in the 'upload' middleware
//     upload(req, res, async (err) => {
//       if (err) {
//         return res
//           .status(500)
//           .send({ message: "Error uploading images: " + err.message });
//       }

//       // If files are uploaded, map their paths
//       imagePaths = req.files ? req.files.map((file) => file.path) : [];

//       // If the upload is successful, now proceed with updating the product
//       const { id } = req.params;

//       // Fetch the product by ID to get the current images
//       const product = await Product.findById(id);

//       if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//       }

//       // If no new images were uploaded, use the existing images
//       const updatedImages =
//         imagePaths.length > 0
//           ? [...product.images, ...imagePaths]
//           : product.images;

//       // Update the product details
//       const updatedProduct = await Product.findByIdAndUpdate(
//         id,
//         {
//           name,
//           price,
//           stockQuantity,
//           status,
//           images: updatedImages, // Append new images if any, else retain old images
//           description,
//           category,
//         },
//         { new: true } // Return the updated product
//       );

//       // Return the updated product with success message
//       return res.status(200).json({
//         message: "Product updated successfully",
//         data: updatedProduct,
//       });
//     });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error. Could not update product." });
//   }
// };
