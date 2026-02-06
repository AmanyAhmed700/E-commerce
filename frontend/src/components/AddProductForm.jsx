import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

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
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("image", imageFile);

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage("✅ Product added successfully");
      setForm({ name: "", price: "", category: "", description: "" });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error occurred while adding the product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl transform hover:scale-[1.02] transition duration-300 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

        {message && <p className="mb-4 text-center text-red-500">{message}</p>}

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (men / women / kids)"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#8D5F8C] text-white py-3 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
