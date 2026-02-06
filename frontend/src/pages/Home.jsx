// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "../utils/api";
import { Landing } from "./Landing";
import OfferBanner from "./offer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all"); // all, men, women, kids
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/products"); // /api/products
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (cat) => {
    setLoading(true);
    setCategory(cat);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="container mx-auto p-4 bg-purple-50 min-h-screen">
      <Landing />

      {/* أقسام */}
      <div className="flex justify-center gap-4 mt-20 mb-10">
        {["all", "men", "women", "kids"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded transition ${
              category === cat ? "bg-[#8D5F8C] text-white" : "bg-gray-200"
            }`}
          >
            {cat === "all"
              ? "All"
              : cat === "men"
              ? "Men"
              : cat === "women"
              ? "Women"
              : "Kids"}
          </button>
        ))}
      </div>

      {/* قائمة المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // skeleton cards
          Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-white shadow rounded-lg p-4"
            >
              <div className="bg-gray-300 h-40 w-full rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))
        ) : filteredProducts.length === 0 ? (
          <p className="text-center col-span-full">لا توجد منتجات</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

      <OfferBanner />
    </div>
  );
};

export default Home;
