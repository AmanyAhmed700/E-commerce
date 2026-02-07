import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// أضيفي رابط السيرفر هنا أيضاً
const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-20">Please log in to view your cart</h2>
        <button
          onClick={() => navigate("/login")}
          className="px-20 py-3 bg-[#8D5F8C] text-white rounded hover:bg-gray-600 transition"
        >
          Log In
        </button>
      </div>
    );
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <div className="text-center py-10">
           <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col md:flex-row justify-between items-center border p-7 rounded shadow-sm"
            >
              <div className="flex items-center gap-4">
                {item.product.image && (
                  <img
                    // تم تغيير السطر هنا ليعمل مع السيرفر أونلاين
                    src={`${API_URL}/uploads/${item.product.image}`}
                    alt={item.product.name}
                    className="w-40 h-40 object-cover rounded shadow"
                  />
                )}
                <div>
                  <h2 className="font-bold text-lg">{item.product.name}</h2>
                  <p className="text-gray-600">{item.product.price} EGP</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.product._id, Number(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1"
                />
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 mt-6">
            <h2 className="text-2xl font-bold">Total: {total} EGP</h2>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full md:w-auto bg-[#8D5F8C] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition shadow-lg"
            >
              Go to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;