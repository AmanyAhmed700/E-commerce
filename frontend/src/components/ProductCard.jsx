import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const getImageUrl = () => {
    if (!product.image) return "/placeholder.png";
    if (product.image.startsWith("http")) {
      return product.image.replace("http://localhost:5000", API_URL);
    }
    return `${API_URL}/uploads/${product.image}`;
  };

  return (
    // التعديل: جعل خلفية الكارد بيضاء بالكامل "bg-white" لدمج خلفية الصورة مع الكارد
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex flex-col items-center hover:shadow-md transition-shadow">
      
      <Link to={`/product/${product._id}`} className="w-full text-center group">
        {/* التعديل: وضع الصورة داخل حاوية بخلفية رمادية فاتحة جداً لإعطائها مظهراً احترافياً */}
        <div className="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
          <img
            src={getImageUrl()}
            alt={product.name}
            // التعديل: استخدام mix-blend-multiply لدمج الخلفية البيضاء للصورة مع خلفية الحاوية
            className="w-full h-full object-contain mix-blend-multiply transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <h2 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-[#8D5F8C] transition">
          {product.name}
        </h2>
      </Link>

      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{product.category}</p>
      <p className="text-xl font-bold mb-4 text-[#8D5F8C]">{product.price} <span className="text-sm">EGP</span></p>

      <button
        onClick={() => addToCart(product._id, 1)}
        className="w-full bg-[#f3f4f6] text-gray-700 font-medium py-2.5 rounded-lg hover:bg-[#8D5F8C] hover:text-white transition-colors duration-300 shadow-sm"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;