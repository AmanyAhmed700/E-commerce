// src/pages/Kids.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const Kids = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/products?category=kids`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#8D5F8C] to-[#9D6F9C] text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 sm:mb-3">
            Kids Collection
          </h1>
          <p className="text-center text-white/90 text-sm sm:text-base md:text-lg">
            Discover amazing products for your little ones
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {loading ? (
          // Loading State
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#8D5F8C] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-md mx-auto text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Yet</h3>
              <p className="text-gray-500 mb-6">
                We're working on adding amazing products for kids. Check back soon!
              </p>
            </div>
          </div>
        ) : (
          // Products Grid
          <>
            {/* Products Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm sm:text-base text-gray-600">
                <span className="font-semibold text-gray-800">{products.length}</span> 
                {products.length === 1 ? " product" : " products"} found
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Kids;