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
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      
      {/* Image Section - Takes 50% of card height */}
      <Link to={`/product/${product._id}`} className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-50 overflow-hidden flex-shrink-0">
        <img
          src={getImageUrl()}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply p-4 transform group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Content Section - Takes 50% of card height */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        
        {/* Product Name */}
        <Link to={`/product/${product._id}`} className="mb-auto">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#8D5F8C] transition-colors duration-200">
            {product.name}
          </h2>
        </Link>

        {/* Price & Add to Cart Section */}
        <div className="mt-auto space-y-3">
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-bold text-[#8D5F8C]">
              {product.price}
            </span>
            <span className="text-sm text-gray-500 font-medium">EGP</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product._id, 1)}
            className="w-full bg-gradient-to-r from-[#8D5F8C] to-[#9D6F9C] text-white font-semibold py-2.5 sm:py-3 rounded-lg hover:from-[#7D4F7C] hover:to-[#8D5F8C] active:scale-95 transform transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;