// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "../utils/api";
import { Landing } from "./Landing";
import OfferBanner from "./offer";
import { IoIosWoman } from "react-icons/io";
import { IoIosMan } from "react-icons/io";
import { FaChild } from "react-icons/fa";

const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Landing Section */}
      <Landing />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Category Filter Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            Shop By Category
          </h2>
          
  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 p-4">
  {[
    { 
      id: "all", 
      label: "All Products", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      )
    },
{
  id: "men",
  label: "Men",
  icon: (
<IoIosMan />
  )
},

  {
  id: "women",
  label: "Women",
  icon: (
 


<IoIosWoman />
  )
},

{
  id: "kids",
  label: "Kids",
  icon: (
  <FaChild />
  )
}

  ].map((cat) => (
    <button
      key={cat.id}
      onClick={() => handleCategoryChange(cat.id)}
      className={`
        flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold 
        transition-all duration-300 transform hover:scale-105 active:scale-95
        ${
          category === cat.id
            ? "bg-gradient-to-r from-[#8D5F8C] to-[#9D6F9C] text-white shadow-lg shadow-[#8D5F8C]/30"
            : "bg-white text-gray-600 hover:text-[#8D5F8C] hover:bg-gray-50 shadow-sm border border-gray-100"
        }
      `}
    >
      {/* عرض الأيقونة */}
      <span className={category === cat.id ? "text-white" : "text-[#8D5F8C]"}>
        {cat.icon}
      </span>
      <span className="text-sm sm:text-base whitespace-nowrap">{cat.label}</span>
    </button>
  ))}
</div>
        </div>

        {/* Products Count & Info */}
        {!loading && (
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm sm:text-base text-gray-600">
                {category === "all" ? (
                  <>
                    Showing <span className="font-semibold text-gray-800">{products.length}</span> products
                  </>
                ) : (
                  <>
                    Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> {category} products
                  </>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {loading ? (
            // Loading Skeleton
            Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="bg-gray-200 h-48 sm:h-56 md:h-64 w-full"></div>
                
                {/* Content Skeleton */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                </div>
              </div>
            ))
          ) : filteredProducts.length === 0 ? (
            // Empty State
            <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-20">
              <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-md mx-auto text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-500">
                  {category === "all" 
                    ? "We're working on adding amazing products. Check back soon!"
                    : `No products available in the ${category} category yet.`
                  }
                </p>
              </div>
            </div>
          ) : (
            // Products
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>

      {/* Offer Banner */}
      <OfferBanner />
    </div>
  );
};

export default Home;