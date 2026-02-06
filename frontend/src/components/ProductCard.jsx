 import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded shadow p-4 flex flex-col items-center">
      {/* الصورة + الاسم يفتحوا صفحة التفاصيل */}
      <Link to={`/product/${product._id}`} className="w-full text-center">
        <img
          src={
            product.image
              ? `http://localhost:5000/uploads/${product.image}`
              : "/placeholder.png"
          }
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
