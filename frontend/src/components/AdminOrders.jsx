import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  // جلب جميع الطلبات
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // تحديث حالة الطلب
  const handleStatusChange = async (orderId) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/admin/orders/${orderId}`,
        { status: "completed" },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? res.data.order : o))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">جميع الطلبات</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-center">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">المستخدم</th>
              <th className="border px-4 py-2">البريد</th>
              <th className="border px-4 py-2">المنتجات</th>
              <th className="border px-4 py-2">المجموع</th>
              <th className="border px-4 py-2">طريقة الدفع</th>
              <th className="border px-4 py-2">الحالة</th>
              <th className="border px-4 py-2">تحديث</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{order.user.name}</td>
                <td className="border px-4 py-2">{order.user.email}</td>
                <td className="border px-4 py-2">
                  {order.items.map((i) => (
                    <div key={i.product}>{i.product.name} x{i.quantity}</div>
                  ))}
                </td>
                <td className="border px-4 py-2">{order.total}</td>
                <td className="border px-4 py-2">{order.paymentMethod}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleStatusChange(order._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      إتمام
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
