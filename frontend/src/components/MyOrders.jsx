// src/pages/MyOrders.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// رابط السيرفر على Railway
const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.token) return;

    const fetchOrders = async () => {
      try {
        // تغيير الرابط من localhost إلى Railway
        const res = await axios.get(`${API_URL}/api/orders/myorders`, { 
          headers: { Authorization: `Bearer ${user.token}` } 
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching my orders:", err);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Orders / طلباتي</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b-2">
              <tr className="text-left text-gray-700 uppercase text-sm tracking-wider">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Products</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 text-xs font-mono text-gray-500">#{order._id}</td>
                  <td className="px-6 py-4">
                    <ul className="space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700">
                          <span className="font-semibold">{item.product?.name || "Product"}</span> 
                          <span className="text-gray-400 mx-2">x</span>
                          {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">{order.total} EGP</td>
                  <td className="px-6 py-4 text-sm capitalize">{order.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "completed" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status === "pending" ? "قيد الانتظار" : "تم التوصيل"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;