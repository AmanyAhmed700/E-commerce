// src/pages/ProductDetails.jsx
import { useState, useEffect, useRef } from "react";
import  useParams from "react-router-dom";
import axios from "axios";

// رابط السيرفر على Railway
const API_URL = "https://e-commerce-production-24e0.up.railway.app";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, visible: false });
  const [zoomRatio, setZoomRatio] = useState(2);
  const imgRef = useRef(null);
     


  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // 1. تعديل الرابط لجلب بيانات المنتج من Railway
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        
        // 2. تصحيح رابط الصورة داخل بيانات المنتج (لو كان مخزناً بـ localhost)
        const updatedProduct = {
          ...res.data,
          image: res.data.image?.startsWith("http://localhost") 
            ? res.data.image.replace("http://localhost:5000/uploads/", "") 
            : res.data.image
        };
        
        setProduct(updatedProduct);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.onload = () => {
        const img = imgRef.current;
        const rect = img.getBoundingClientRect();
        const ratio = img.naturalWidth / rect.width;
        setZoomRatio(ratio > 1 ? ratio : 2);
      };
    }
  }, [product]);

  if (!product) return <h2 className="text-center mt-10 text-2xl font-semibold">Loading...</h2>;

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const lensSize = 120;
    let x = e.clientX - rect.left - lensSize / 2;
    let y = e.clientY - rect.top - lensSize / 2;
    if (x > rect.width - lensSize) x = rect.width - lensSize;
    if (x < 0) x = 0;
    if (y > rect.height - lensSize) y = rect.height - lensSize;
    if (y < 0) y = 0;
    setLensPos({ x, y, visible: true, rect, lensSize });
  };

  const handleMouseLeave = () => {
    setLensPos((prev) => ({ ...prev, visible: false }));
  };

  // الرابط النهائي للصورة المستخدم في العرض والـ Zoom
  const finalImageUrl = `${API_URL}/uploads/${product.image}`;

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Main Image */}
      <div
        className="relative w-full h-[550px] border rounded-xl shadow-xl overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={finalImageUrl} // تم التعديل هنا
          alt={product.name}
          className="w-full h-full object-contain"
        />
        {lensPos.visible && (
          <div
            className="absolute border-4 border-purple-500 bg-white/40 rounded-full"
            style={{
              width: lensPos.lensSize + "px",
              height: lensPos.lensSize + "px",
              left: lensPos.x + "px",
              top: lensPos.y + "px",
            }}
          ></div>
        )}
      </div>

      {/* Zoomed Image */}
      <div className="w-full h-[300px] md:h-[550px] md:block">
        {lensPos.visible && (
          <div
            className="w-full h-full bg-no-repeat rounded-xl shadow-inner"
            style={{
              backgroundImage: `url(${finalImageUrl})`, // تم التعديل هنا
              backgroundSize: `${lensPos.rect.width * zoomRatio}px ${
                lensPos.rect.height * zoomRatio
              }px`,
              backgroundPosition: `-${lensPos.x * zoomRatio}px -${
                lensPos.y * zoomRatio
              }px`,
            }}
          ></div>
        )}
      </div>

      {/* Product Info */}
      <div className="md:col-span-2 mt-6 bg-gray-50 p-8 rounded-xl shadow-inner space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          {product.name}
        </h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center gap-4">
          <p className="text-3xl font-bold text-black">{product.price} EGP</p>
          <span className="text-sm text-gray-500 line-through">
            {product.price + 200} EGP
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-4">



        </div>

        {/* Shipping & Payment Info Icons */}
        <div className="pt-4 space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h1l1 2h13l1-2h1m-1 0l3 6H4l3-6m10 0V6a2 2 0 00-2-2H7a2 2 0 00-2 2v4" />
            </svg>
            Free delivery within 2–3 days
          </p>
          <p className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M4 10l16 0M10 20l0-16" />
            </svg>
            14 days easy return
          </p>
          <p className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m16.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l1.414-1.414M6.05 6.05L4.636 7.464" />
            </svg>
            Secure payment
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;