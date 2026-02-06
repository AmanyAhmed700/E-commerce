import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js"; // لو عندك موديل للطلبات

// ✅ Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean(); // .lean() لتسهيل إضافة الطلبات

    // إرفاق الطلبات لكل مستخدم
    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({ user: user._id }).populate("items.product");
        return { ...user, orders };
      })
    );

    res.json({ users: usersWithOrders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add product
export const addProduct = async (req, res) => {
  try {
    const { name, price, category, image } = req.body;

    const product = new Product({
      name,
      price,
      category,
      image,
    });

    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();

    res.json({ usersCount, productsCount, ordersCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};