// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// رابط السيرفر على Railway
const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const UserList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.token) return;

      try {
        // تم تغيير الرابط هنا ليعمل على السيرفر الأونلاين
        const res = await axios.get(
          `${API_URL}/api/admin/users`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users & Orders</h1>
      <div className="overflow-x-auto"> {/* إضافة Scroll لو الجدول كبير */}
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Products</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <React.Fragment key={u._id}>
                {u.orders && u.orders.length > 0 ? (
                  u.orders.map((order, idx) => (
                    <tr
                      key={order._id || idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {/* Name & email only once per user */}
                      {idx === 0 && (
                        <>
                          <td
                            rowSpan={u.orders.length}
                            className="border px-4 py-2 align-top font-medium"
                          >
                            {u.name || "No Name"}
                          </td>
                          <td
                            rowSpan={u.orders.length}
                            className="border px-4 py-2 align-top"
                          >
                            {u.email || "No Email"}
                          </td>
                        </>
                      )}

                      <td className="border px-4 py-2 text-sm text-gray-600">
                        {order._id || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {order.items && order.items.length > 0 ? (
                          <ul className="list-disc pl-5">
                            {order.items.map((item, i) => (
                              <li key={item._id || i} className="text-sm">
                                {item.product
                                  ? `${item.product.name} - ${item.price} EGP x ${item.quantity}`
                                  : `Product removed - ${item.price} EGP x ${item.quantity}`}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white">
                    <td className="border px-4 py-2">{u.name || "No Name"}</td>
                    <td className="border px-4 py-2">{u.email || "No Email"}</td>
                    <td className="border px-4 py-2 text-gray-400">No Orders</td>
                    <td className="border px-4 py-2">-</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;