const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        price: Number,
        quantity: { type: Number, min: 1 }
      }
    ],
    shipping: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
