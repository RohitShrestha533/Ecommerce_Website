import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to the Product model
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
    shippingInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentInfo: {
      method: {
        type: String,
        enum: ["COD", "Esewa", "Khalti", "Card", "BankTransfer"], // Payment methods
        default: "COD",
      },
      status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
      },
      transactionId: { type: String, default: null }, // Optional: For Esewa, Khalti, etc.
    },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "canceled"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0, // Calculated based on items and shipping cost
    },
    shippingCost: {
      type: Number,
      required: true,
      default: 100, // Flat shipping cost
    },
    taxes: {
      type: Number,
      required: true,
      default: 0, // 3.6% tax or similar
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Pre-save hook to calculate totalPrice before saving
orderSchema.pre("save", function (next) {
  const itemsTotal = this.items.reduce((acc, item) => acc + item.total, 0); // Sum of all items
  this.taxes = itemsTotal * 0.036; // 3.6% tax
  this.totalPrice = itemsTotal + this.shippingCost + this.taxes; // Total price calculation
  next();
});

export const Order = mongoose.model("Order", orderSchema);
