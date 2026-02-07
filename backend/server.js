import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";


dotenv.config();
connectDB();

const app = express();
// قائمة المواقع المسموح لها بالوصول للسيرفر
const allowedOrigins = [
  'https://amanyahmed700.github.io' // أضيفي رابط GitHub Pages هنا
];

console.log("CORS Updated V2")

app.use(cors({
  origin: true, // هذا سيجعل السيرفر يقبل من أي رابط يطلبه (GitHub أو غيره)
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.json({ ok: true }));

// الـ routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend listening on ${PORT}`));
