import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

// 1. إضافة رابط Railway
const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    usersCount: 0,
    productsCount: 0,
    ordersCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // التأكد من وجود التوكن وأن المستخدم هو Admin (اختياري حسب حماية السيرفر عندك)
      if (!user?.token) return;

      try {
        // 2. تغيير الرابط هنا باستخدام API_URL
        const res = await axios.get(`${API_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard / لوحة التحكم</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold opacity-80">Total Users</h2>
          <p className="text-4xl font-bold mt-2">{stats.usersCount}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold opacity-80">Total Products</h2>
          <p className="text-4xl font-bold mt-2">{stats.productsCount}</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold opacity-80">Total Orders</h2>
          <p className="text-4xl font-bold mt-2">{stats.ordersCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;