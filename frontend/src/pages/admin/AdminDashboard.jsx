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
    /* تعديل: إضافة w-full و overflow-x-hidden لضمان عدم خروج المحتوى عن الشاشة.
       استخدام flex-1 للتأكد من أن المحتوى يأخذ المساحة المتبقية فقط بجانب السايدبار.
    */
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen w-full box-border">
      
      {/* العناوين: نصغر الخط في الموبايل text-2xl */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 break-words">
          Admin Dashboard / لوحة التحكم
        </h1>
      </header>
      
      {/* الـ Grid: 
         grid-cols-1 تجعل الكروت تحت بعضها في الموبايل (يحل مشكلة الاختفاء).
         sm:grid-cols-2 للشاشات المتوسطة.
         lg:grid-cols-3 للشاشات الكبيرة.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* كرت المستخدمين */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-lg font-semibold opacity-90">Total Users</h2>
          <p className="text-3xl sm:text-4xl font-bold mt-2">{stats.usersCount}</p>
        </div>
        
        {/* كرت المنتجات */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-lg font-semibold opacity-90">Total Products</h2>
          <p className="text-3xl sm:text-4xl font-bold mt-2">{stats.productsCount}</p>
        </div>
        
        {/* كرت الطلبات */}
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-lg font-semibold opacity-90">Total Orders</h2>
          <p className="text-3xl sm:text-4xl font-bold mt-2">{stats.ordersCount}</p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;