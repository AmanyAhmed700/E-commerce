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
      setTimeout(() => setMessage(""), 3000);
      
    } catch (err) {
      console.error(err);
      setMessage("❌ Error occurred while adding the product");
    }
  };

  return (
    // التعديل هنا: إضافة overflow-x-hidden ومنع الـ flex من ضغط العناصر
    <div className="min-h-screen w-full bg-gray-100 p-2 sm:p-4 flex flex-col items-center overflow-x-hidden">
      
      {/* Container للفورم يضمن عدم خروجه عن الشاشة */}
      <div className="w-full max-w-lg mt-10"> 
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 sm:p-8 rounded-xl shadow-xl w-full box-border border border-gray-200"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
            Add New Product
          </h2>

          {message && (
            <div className={`mb-4 p-3 rounded text-center text-sm ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D5F8C] transition-all"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D5F8C] transition-all"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category (men / women / kids)"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D5F8C] transition-all"
              required
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C] transition-all"
            />
            
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm text-gray-600 mb-1 font-medium">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-4 file:py-2 file:px-3 file:rounded-full file:border-0 file:bg-purple-50 file:text-[#8D5F8C] hover:file:bg-purple-100 transition-all cursor-pointer"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#8D5F8C] text-white py-3 rounded-xl hover:bg-[#724a71] transition-all font-bold shadow-md active:scale-95 mt-4"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;