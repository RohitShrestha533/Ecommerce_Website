import bcrypt from "bcrypt";
const saltRounds = 10;
import { Admin } from "../Models/Admin.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Product } from "../Models/Product.js";

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
        { expiresIn: "1h" }
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
