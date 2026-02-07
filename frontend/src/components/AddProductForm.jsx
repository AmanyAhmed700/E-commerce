import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// رابط السيرفر على Railway
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
      formData.append("category", form.category.toLowerCase().trim()); // تحويل الفئة لنص صغير لضمان الفلترة الصحيحة
      formData.append("description", form.description);
      formData.append("image", imageFile);

      // تم تغيير localhost إلى API_URL
      await axios.post(`${API_URL}/api/products`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage("✅ Product added successfully");
      setForm({ name: "", price: "", category: "", description: "" });
      setImageFile(null);
      
      // مسح رسالة النجاح بعد 3 ثوانٍ
      setTimeout(() => setMessage(""), 3000);
      
    } catch (err) {
      console.error(err);
      setMessage("❌ Error occurred while adding the product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl transform hover:scale-[1.01] transition duration-300 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>

        {message && (
          <div className={`mb-4 p-3 rounded text-center ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
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
            className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category (men / women / kids)"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]"
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded h-24 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]"
          />
          
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8D5F8C] text-white py-3 rounded-lg hover:bg-[#6d496c] transition duration-300 font-bold shadow-lg mt-4"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;