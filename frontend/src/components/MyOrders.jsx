import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.token) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/myorders", { headers: { Authorization: `Bearer ${user.token}` } });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Products</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Payment Method</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="bg-white">
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">
                <ul className="list-disc pl-5">
                  {order.items.map((item) => (
                    <li key={item.product._id}>{item.product.name} - {item.price} EGP x {item.quantity}</li>
                  ))}
                </ul>
              </td>
              <td className="border px-4 py-2">{order.total} EGP</td>
              <td className="border px-4 py-2">{order.paymentMethod}</td>
              <td className="border px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
