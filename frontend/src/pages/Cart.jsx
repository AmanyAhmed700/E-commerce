// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col md:flex-row justify-between items-center border p-7 rounded"
            >
              <div className="flex items-center gap-4">
                {item.product.image && (
                  <img
                    src={`http://localhost:5000/uploads/${item.product.image}`}
                    alt={item.product.name}
                    className="w-40 h-40 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="font-bold">{item.product.name}</h2>
                  <p>{item.product.price} EGP</p>
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
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h2 className="text-xl font-bold mt-4">Total: {total} EGP</h2>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-2 w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
           Start payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
