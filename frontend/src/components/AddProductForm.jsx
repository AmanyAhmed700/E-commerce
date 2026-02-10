import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const AddProductForm = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", price: "", category: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return setMessage("Please upload a product image");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category.toLowerCase().trim());
      formData.append("description", form.description);
      formData.append("image", imageFile);

      await axios.post(`${API_URL}/api/products`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage("✅ Product added successfully");
      setForm({ name: "", price: "", category: "", description: "" });
      setImageFile(null);
      
      // إعادة تعيين input الملف
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
      
      setTimeout(() => setMessage(""), 3000);
      
    } catch (err) {
      console.error(err);
      setMessage("❌ Error occurred while adding the product");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-3 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100"
        >
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
              Add New Product
            </h2>
            <p className="text-xs sm:text-sm text-center text-gray-500">
              Fill in the details to add a new product to your store
            </p>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg text-center text-sm sm:text-base font-medium ${
              message.includes("✅") 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {message}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4 sm:space-y-5">
            
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D5F8C] focus:border-transparent transition-all text-sm sm:text-base"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (EGP) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D5F8C] focus:border-transparent transition-all text-sm sm:text-base"
                required
                min="0"
                step="0.01"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D5F8C] focus:border-transparent transition-all text-sm sm:text-base bg-white"
                required
              >
                <option value="">Select category</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter product description (optional)"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D5F8C] focus:border-transparent transition-all resize-none text-sm sm:text-base"
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Image <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-600
                             file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 
                             file:rounded-full file:border-0 
                             file:text-xs sm:file:text-sm file:font-semibold
                             file:bg-[#8D5F8C]/10 file:text-[#8D5F8C] 
                             hover:file:bg-[#8D5F8C]/20 
                             file:cursor-pointer cursor-pointer
                             focus:outline-none focus:ring-2 focus:ring-[#8D5F8C] focus:border-transparent transition-all"
                  required
                />
              </div>
              <p className="mt-1.5 text-xs text-gray-500">
                Accepted formats: JPG, PNG, WEBP (Max 5MB)
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#8D5F8C] to-[#9D6F9C] text-white py-3 sm:py-3.5 px-4 rounded-xl 
                         hover:from-[#7D4F7C] hover:to-[#8D5F8C] 
                         transition-all duration-200 font-bold text-sm sm:text-base
                         shadow-lg shadow-[#8D5F8C]/30 hover:shadow-xl hover:shadow-[#8D5F8C]/40
                         active:scale-95 transform
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8D5F8C]
                         mt-6 sm:mt-8"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;