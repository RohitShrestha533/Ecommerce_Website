import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
  },
  stockQuantity: { type: Number, required: true },
  images: { type: [String], required: true },
  status: {
    type: String,
    enum: ["active", "out of stock"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", productSchema);
