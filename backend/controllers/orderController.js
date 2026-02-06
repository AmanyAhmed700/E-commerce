import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// 🛒 إنشاء طلب
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // تأكد أن paymentMethod موجود وصحيح
    const { paymentMethod, phone } = req.body;

    if (!["card", "cash", "vodafone"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    if (paymentMethod === "vodafone" && !phone) {
      return res.status(400).json({ message: "Vodafone number required" });
    }

    const order = new Order({
      user: userId,
      items,
      total,
      paymentMethod,
      status: "pending",
      ...(paymentMethod === "vodafone" && { phone }),
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🧾 طلبات المستخدم
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 👨‍💼 جميع الطلبات للـ Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 👨‍💼 تحديث حالة الطلب للـ Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "completed", "cancelled"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
