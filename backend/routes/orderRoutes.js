import express from "express";
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🛒 User
router.post("/", protect, createOrder);          // إنشاء طلب
router.get("/myorders", protect, getMyOrders);   // طلبات المستخدم

// 👨‍💼 Admin
router.get("/", protect, admin, getAllOrders);   // جميع الطلبات
router.put("/:id", protect, admin, updateOrderStatus); // تحديث حالة الطلب

export default router;
