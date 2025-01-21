import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: null },
  roles: {
    type: [String],
    default: ["buyer"],
  },
  address: { type: String, default: null },
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  profilePicture: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
