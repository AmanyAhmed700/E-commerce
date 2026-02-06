import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    total: Number,
    paymentMethod: { type: String, enum: ["card", "cash", "vodafone"], default: "cash" },
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
    phone: String, // للـ Vodafone
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
