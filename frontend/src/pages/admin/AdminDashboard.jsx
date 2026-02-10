// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

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
      if (!user?.token) return;
      
      try {
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
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-gray-800">
        Admin Dashboard / لوحة التحكم
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {/* Total Users Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-lg transform hover:scale-105 transition-transform">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold opacity-90">
            Total Users
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold mt-1 sm:mt-2">
            {stats.usersCount}
          </p>
          <p className="text-xs sm:text-sm opacity-80 mt-1">
            إجمالي المستخدمين
          </p>
        </div>
        
        {/* Total Products Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-lg transform hover:scale-105 transition-transform">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold opacity-90">
            Total Products
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold mt-1 sm:mt-2">
            {stats.productsCount}
          </p>
          <p className="text-xs sm:text-sm opacity-80 mt-1">
            إجمالي المنتجات
          </p>
        </div>
        
        {/* Total Orders Card */}
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-lg transform hover:scale-105 transition-transform sm:col-span-2 lg:col-span-1">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold opacity-90">
            Total Orders
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold mt-1 sm:mt-2">
            {stats.ordersCount}
          </p>
          <p className="text-xs sm:text-sm opacity-80 mt-1">
            إجمالي الطلبات
          </p>
        </div>
      </div>

      {/* Additional Info Section (Optional) */}
      <div className="mt-6 sm:mt-8 bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
          Quick Stats Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Users</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                {stats.usersCount}
              </p>
            </div>
            <div className="text-3xl sm:text-4xl text-blue-500">👥</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Products</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {stats.productsCount}
              </p>
            </div>
            <div className="text-3xl sm:text-4xl text-green-500">📦</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Orders</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                {stats.ordersCount}
              </p>
            </div>
            <div className="text-3xl sm:text-4xl text-yellow-500">🛒</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;