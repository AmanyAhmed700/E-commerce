// src/pages/Kids.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

// رابط السيرفر على Railway
const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const Kids = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // تغيير الرابط من localhost إلى Railway
        const res = await axios.get(`${API_URL}/api/products?category=kids`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Kids Section</h1>
      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products available in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            // تصحيح رابط الصورة ليعمل على الإنترنت بدلاً من جهازك الشخصي
            const updatedProduct = {
              ...product,
              image: product.image?.startsWith("http://localhost") 
                ? product.image.replace("http://localhost:5000", API_URL)
                : product.image
            };

            return <ProductCard key={product._id} product={updatedProduct} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Kids;