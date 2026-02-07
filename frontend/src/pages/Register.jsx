import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// الرابط الجديد الخاص بالسيرفر على Railway
const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // تم تغيير الرابط هنا ليتصل بالسيرفر الأونلاين
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      // تأكدي من استلام التوكن والبيانات بشكل صحيح
      const userData = res.data; 

      // تخزين البيانات في context و localStorage
      login(userData);

      // التحويل بعد التسجيل بناءً على الرتبة
      if (userData.user?.role === "admin" || userData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "حدث خطأ أثناء التسجيل");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">إنشاء حساب جديد</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">الاسم الكامل</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#8D5F8C] outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#8D5F8C] outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#8D5F8C] outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8D5F8C] text-white py-3 rounded-lg font-bold hover:bg-[#6d496c] shadow-md transition duration-300"
          >
            إنشاء حساب
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;