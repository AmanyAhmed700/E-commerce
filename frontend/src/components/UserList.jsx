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
    <div className="p-3 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
        Users & Orders
      </h1>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >
            {/* User Info */}
            <div className="mb-3 pb-3 border-b border-gray-200">
              <h2 className="font-bold text-lg text-gray-800 mb-1">
                {u.name || "No Name"}
              </h2>
              <p className="text-sm text-gray-600">{u.email || "No Email"}</p>
            </div>

            {/* Orders */}
            {u.orders && u.orders.length > 0 ? (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 text-sm uppercase">
                  Orders ({u.orders.length})
                </h3>
                {u.orders.map((order, idx) => (
                  <div
                    key={order._id || idx}
                    className="bg-gray-50 rounded p-3 border border-gray-200"
                  >
                    {/* Order ID */}
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase">
                        Order ID
                      </span>
                      <p className="text-sm text-gray-700 break-all">
                        {order._id || "N/A"}
                      </p>
                    </div>

                    {/* Products */}
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase">
                        Products
                      </span>
                      {order.items && order.items.length > 0 ? (
                        <ul className="mt-1 space-y-1">
                          {order.items.map((item, i) => (
                            <li
                              key={item._id || i}
                              className="text-sm text-gray-700 flex items-start"
                            >
                              <span className="mr-2">•</span>
                              <span className="flex-1">
                                {item.product
                                  ? `${item.product.name} - ${item.price} EGP × ${item.quantity}`
                                  : `Product removed - ${item.price} EGP × ${item.quantity}`}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-400 mt-1">
                          No products
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400 text-sm">No orders yet</p>
              </div>
            )}
          </div>
        ))}

        {users.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No users found
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                Order ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                Products
              </th>
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
                            className="border border-gray-300 px-4 py-2 align-top font-medium"
                          >
                            {u.name || "No Name"}
                          </td>
                          <td
                            rowSpan={u.orders.length}
                            className="border border-gray-300 px-4 py-2 align-top"
                          >
                            {u.email || "No Email"}
                          </td>
                        </>
                      )}

                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                        {order._id || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.items && order.items.length > 0 ? (
                          <ul className="list-disc pl-5">
                            {order.items.map((item, i) => (
                              <li key={item._id || i} className="text-sm">
                                {item.product
                                  ? `${item.product.name} - ${item.price} EGP × ${item.quantity}`
                                  : `Product removed - ${item.price} EGP × ${item.quantity}`}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2">
                      {u.name || "No Name"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {u.email || "No Email"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-400">
                      No Orders
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-400">
                      -
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-8 text-gray-400 bg-white border border-gray-300 border-t-0">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;