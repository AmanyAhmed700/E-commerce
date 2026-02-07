// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// الرابط الجديد الخاص بالسيرفر على Railway
const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // تغيير الرابط هنا ليخاطب Railway
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      // دمج user مع token بشكل سليم
      const userData = { ...res.data.user, token: res.data.token };

      login(userData); // حفظ user + token في الـ Context والـ LocalStorage

      // التحويل حسب الدور
      if (userData.role === "admin") {
        navigate("/admin/dashboard"); // تأكدي من المسار الصحيح للـ Dashboard
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition duration-500 hover:scale-[1.01]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">تسجيل الدخول</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#8D5F8C] outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#8D5F8C] outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8D5F8C] text-white py-3 rounded-lg font-bold hover:bg-[#6d496c] shadow-md transition duration-300 transform active:scale-95"
          >
            دخول
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          ليس لديك حساب؟ 
          <span 
            onClick={() => navigate("/register")} 
            className="text-[#8D5F8C] cursor-pointer font-bold hover:underline ml-1"
          >
            سجل الآن
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;