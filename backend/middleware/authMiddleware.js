import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ التأكد من وجود التوكن وصلاحيته
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // ناخد التوكن من الـ header
      token = req.headers.authorization.split(" ")[1];

      // نفك التوكن
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // نجيب المستخدم من قاعدة البيانات (بدون الباسورد)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "المستخدم غير موجود" });
      }

      next();
    } catch (err) {
      console.error("Auth Error:", err.message);
      return res.status(401).json({ message: "غير مصرح، التوكن غير صالح" });
    }
  } else {
    return res.status(401).json({ message: "لا يوجد توكن، الدخول مرفوض" });
  }
};

// ✅ التأكد من أن المستخدم مدير
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "غير مصرح كأدمن" });
  }
};
