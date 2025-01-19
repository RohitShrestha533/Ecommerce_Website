import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import AdminRoutes from "./Routes/AdminRoute.js";
import { ConnectDB } from "./Database/ConnectDB.js";

import path from "path";
import { fileURLToPath } from "url";

// Get current directory from the file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now use __dirname for static files

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Generate OTP function
function generateOTP() {
  return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
}
// Create the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or any other service you prefer
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
// Send OTP to user's email
const sendOTP = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP for Password Reset",
    text: `Your OTP for password reset is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("OTP sent: " + info.response);
    }
  });
};
let otpStorage = {}; // This will hold the OTP temporarily (usually you store this in a database)
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).send({ message: "User not found" });
  }
  const otp = generateOTP();
  otpStorage[email] = otp; // Store OTP temporarily

  // Send OTP to user's email
  sendOTP(email, otp);

  res.json({ message: "OTP sent to your email" });
});
// Endpoint for verifying OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otpStorage[email] === otp) {
    res.json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/admin", AdminRoutes);
// app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server is running on port ${PORT}`);
});
