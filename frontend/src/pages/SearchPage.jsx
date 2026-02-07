// src/pages/SearchPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

// رابط السيرفر على Railway
const API_URL = "https://e-commerce-production-24e0.up.railway.app";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
  const query = useQuery().get("query");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query) {
      // 1. استبدال localhost برابط السيرفر في Railway
      fetch(`${API_URL}/api/products/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => {
          // 2. معالجة البيانات لتصحيح روابط الصور قبل حفظها في الـ State
          const updatedProducts = data.map((product) => ({
            ...product,
            image: product.image?.startsWith("http://localhost")
              ? product.image.replace("http://localhost:5000", API_URL)
              : product.image,
          }));
          setProducts(updatedProducts);
        })
        .catch((err) => console.error("Search error:", err));
    }
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Search results for: <span className="text-[#8D5F8C]">"{query}"</span>
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found.</p>
      )}
    </div>
  );
}