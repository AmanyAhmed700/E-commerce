import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// رابط السيرفر على Railway
const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // دالة لتجهيز رابط الصورة بشكل صحيح
  const getImageUrl = () => {
    if (!product.image) return "/placeholder.png";
    
    // إذا كان الرابط القادم من الداتابيز يبدأ بـ http (زي localhost) هنبدله برابط Railway
    if (product.image.startsWith("http")) {
      return product.image.replace("http://localhost:5000", API_URL);
    }
    
    // إذا كان القادم هو اسم الصورة فقط (مثلاً image.jpg) هنضيف له المسار الكامل
    return `${API_URL}/uploads/${product.image}`;
  };

  return (
    <div className="border rounded shadow p-4 flex flex-col items-center">
      {/* الصورة + الاسم يفتحوا صفحة التفاصيل */}
      <Link to={`/product/${product._id}`} className="w-full text-center">
        <img
          src={getImageUrl()}
          alt={product.name}
          className="w-40 h-40 object-cover mb-4 hover:scale-105 transition-transform mx-auto"
        />
        <h2 className="text-lg font-semibold mb-2 hover:text-[#8D5F8C] transition">
          {product.name}
        </h2>
      </Link>

      <p className="text-gray-600 mb-2">{product.category}</p>
      <p className="font-bold mb-2">{product.price} EGP</p>

      {/* زرار إضافة للسلة */}
      <button
        onClick={() => addToCart(product._id, 1)}
        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-[#8D5F8C] transition"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;