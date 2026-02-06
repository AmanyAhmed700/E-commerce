// backend/routes/productRoutes.js
import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
    searchProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// إضافة منتج (يدعم رفع صور متعددة)
router.post("/", protect, admin, upload.single("image"), createProduct);


// جلب كل المنتجات
router.get("/", getProducts);
router.get("/search", searchProducts);

// جلب منتج واحد
router.get("/:id", getProductById);

// تعديل منتج مع صور
router.put("/:id", protect, admin, upload.single("image"), updateProduct);


// حذف منتج
router.delete("/:id", protect, admin, deleteProduct);


// 🔎 Search products


export default router;
