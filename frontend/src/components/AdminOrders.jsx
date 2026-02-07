// src/pages/AdminOrders.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// رابط السيرفر على Railway
const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  // جلب جميع الطلبات من السيرفر الجديد
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchOrders();
    }
  }, [user]);

  // تحديث حالة الطلب إلى "Completed"
  const handleStatusChange = async (orderId) => {
    try {
      const res = await axios.patch(
        `${API_URL}/api/admin/orders/${orderId}`,
        { status: "completed" },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // تحديث القائمة فوراً في الواجهة
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "completed" } : o))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("فشل في تحديث الحالة");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">لوحة إدارة الطلبات</h2>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-right">
                <th className="px-5 py-3 border-b-2">#</th>
                <th className="px-5 py-3 border-b-2">المستخدم</th>
                <th className="px-5 py-3 border-b-2">المنتجات</th>
                <th className="px-5 py-3 border-b-2">المجموع</th>
                <th className="px-5 py-3 border-b-2">طريقة الدفع</th>
                <th className="px-5 py-3 border-b-2">الحالة</th>
                <th className="px-5 py-3 border-b-2">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-5 border-b text-sm">{index + 1}</td>
                  <td className="px-5 py-5 border-b text-sm">
                    <p className="font-bold text-gray-900">{order.user?.name || "مستخدم غير معروف"}</p>
                    <p className="text-gray-600 text-xs">{order.user?.email}</p>
                  </td>
                  <td className="px-5 py-5 border-b text-sm">
                    {order.items.map((i, idx) => (
                      <div key={idx} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded mb-1 inline-block ml-1">
                        {i.product?.name} <span className="font-bold text-black">x{i.quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-5 py-5 border-b text-sm font-bold text-green-600">
                    {order.total} EGP
                  </td>
                  <td className="px-5 py-5 border-b text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {order.paymentMethod === 'cod' ? 'عند الاستلام' : order.paymentMethod}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status === "pending" ? "قيد الانتظار" : "تم التوصيل"}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b text-sm">
                    {order.status === "pending" && (
                      <button
                        onClick={() => handleStatusChange(order._id)}
                        className="bg-[#8D5F8C] text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition duration-200"
                      >
                        إتمام الطلب
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="text-center py-10 text-gray-500 font-bold">لا توجد طلبات حالياً</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;