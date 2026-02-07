// src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

// رابط السيرفر على Railway
const API_URL = "https://e-commerce-production-24e0.up.railway.app";

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    if (!user || !user.token) return setCart({ items: [] });

    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCart(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) return alert("Please log in to add items to your cart");
    try {
      const res = await axios.post(
        `${API_URL}/api/cart`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCart(res.data);
      alert("Added to cart! 🛒"); // إضافة تأكيد للمستخدم
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/cart/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(
        `${API_URL}/api/cart/${productId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const refreshCart = () => setCart({ items: [] });

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);