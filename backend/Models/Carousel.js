import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  images: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Carousel = mongoose.model("Carousel", carouselSchema);
