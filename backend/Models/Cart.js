import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
          default: function () {
            return this.price * this.quantity; // Calculate total price for each item
          },
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "checked_out"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Pre-save hook to update totalPrice before saving the cart
cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + item.total, 0); // Recalculate totalPrice
  next();
});

export const Cart = mongoose.model("Cart", cartSchema);
