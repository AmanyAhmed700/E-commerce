// backend/routes/adminRoutes.js
import express from "express";
import { 
  getAllUsers, 
  addProduct, 
  getStats 
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all users (Admin only)
router.get("/users", protect, admin, getAllUsers);

// ✅ Add product (Admin only)
router.post("/products", protect, admin, addProduct);

// ✅ Get dashboard stats (Admin only)
router.get("/stats", protect, admin, getStats);

export default router;
