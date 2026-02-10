// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const UserList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.token) return;
      try {
        const res = await axios.get(`${API_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [user]);

  return (
    <div className="p-2 sm:p-6 w-full max-w-full overflow-x-hidden">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Users & Orders Details
      </h1>

      {/* 1. نسخة الموبايل (نظام الكروت) - تظهر فقط في الشاشات الصغيرة جداً */}
      <div className="block lg:hidden space-y-4">
        {users.map((u) => (
          <div key={u._id} className="bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3 border-b pb-2">
              <div>
                <p className="font-bold text-[#8D5F8C]">{u.name || "No Name"}</p>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>
              <span className="bg-purple-100 text-[#8D5F8C] text-[10px] px-2 py-1 rounded-full font-bold">
                {u.orders?.length || 0} Orders
              </span>
            </div>

            {u.orders && u.orders.length > 0 ? (
              <div className="space-y-3">
                {u.orders.map((order) => (
                  <div key={order._id} className="bg-gray-50 p-2 rounded-lg border border-dashed">
                    <p className="text-[10px] font-mono text-gray-400 mb-1">ID: {order._id}</p>
                    <ul className="text-sm space-y-1">
                      {order.items.map((item, i) => (
                        <li key={i} className="flex justify-between border-b border-gray-100 last:border-0 pb-1">
                          <span>{item.product?.name || "Removed"} <span className="text-gray-400">x{item.quantity}</span></span>
                          <span className="font-medium">{item.price} EGP</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No orders yet</p>
            )}
          </div>
        ))}
      </div>

      {/* 2. نسخة الديسكتوب (الجدول التقليدي) - تظهر في الشاشات الكبيرة */}
      <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-[#8D5F8C] text-white">
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Products Summary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <React.Fragment key={u._id}>
                {u.orders && u.orders.length > 0 ? (
                  u.orders.map((order, idx) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      {idx === 0 && (
                        <>
                          <td rowSpan={u.orders.length} className="px-4 py-4 align-top font-semibold text-gray-700 border-r">
                            {u.name}
                          </td>
                          <td rowSpan={u.orders.length} className="px-4 py-4 align-top text-gray-600 border-r">
                            {u.email}
                          </td>
                        </>
                      )}
                      <td className="px-4 py-4 text-xs font-mono text-gray-400">
                        {order._id}
                      </td>
                      <td className="px-4 py-4">
                        <ul className="space-y-1">
                          {order.items.map((item, i) => (
                            <li key={i} className="text-sm text-gray-700">
                              <span className="font-medium">{item.product?.name}</span> 
                              <span className="text-gray-400 ml-2">({item.quantity} x {item.price} EGP)</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white">
                    <td className="px-4 py-4 font-semibold">{u.name}</td>
                    <td className="px-4 py-4">{u.email}</td>
                    <td className="px-4 py-4 text-gray-300 italic">No Orders</td>
                    <td className="px-4 py-4 text-center">-</td>
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