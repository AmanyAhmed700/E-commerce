// src/pages/admin/ProductsAdmin.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const API_URL = "https://e-commerce-production-24e0.up.railway.app";

const ProductsAdmin = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", category: "" });
  const [newImage, setNewImage] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({ name: product.name, price: product.price, category: product.category });
    setNewImage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (id) => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      if (newImage) data.append("image", newImage);

      await axios.put(`${API_URL}/api/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setEditingId(null);
      setNewImage(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Products Management
      </h1>

      {/* 1. نسخة الموبايل (نظام الكروت) - تظهر فقط في الشاشات الصغيرة */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((p) => (
          <div key={p._id} className="border rounded-xl p-4 bg-gray-50 shadow-sm relative">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <img
                  src={`${API_URL}/uploads/${p.image}`}
                  alt={p.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-inner"
                />
                {editingId === p._id && (
                  <input
                    type="file"
                    onChange={(e) => setNewImage(e.target.files[0])}
                    className="text-[10px] w-20 mt-2"
                  />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                {editingId === p._id ? (
                  <>
                    <input name="name" value={formData.name} onChange={handleChange} className="w-full border p-1 rounded text-sm" />
                    <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full border p-1 rounded text-sm" />
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-1 rounded text-sm">
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="kids">Kids</option>
                    </select>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold text-gray-800">{p.name}</h3>
                    <p className="text-[#8D5F8C] font-bold">{p.price} EGP</p>
                    <span className="inline-block bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                      {p.category}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-3 pt-2 border-t">
              {editingId === p._id ? (
                <>
                  <button onClick={() => handleUpdate(p._id)} className="text-green-500 text-xl"><FaSave /></button>
                  <button onClick={() => setEditingId(null)} className="text-gray-400 text-xl"><FaTimes /></button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(p)} className="text-blue-500 text-xl"><FaEdit /></button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-400 text-xl"><FaTrash /></button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 2. نسخة الديسكتوب (الجدول التقليدي) - تظهر من شاشات MD فأكبر */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((p) => (
              <tr key={p._id} className="text-center hover:bg-gray-50 transition">
                <td className="px-4 py-4 flex flex-col items-center">
                  <img src={`${API_URL}/uploads/${p.image}`} alt={p.name} className="w-16 h-16 object-cover rounded shadow-sm mb-2" />
                  {editingId === p._id && <input type="file" onChange={(e) => setNewImage(e.target.files[0])} className="text-xs w-32" />}
                </td>
                <td className="px-4 py-4">
                  {editingId === p._id ? <input name="name" value={formData.name} onChange={handleChange} className="border px-2 py-1 rounded w-full" /> : <span className="font-medium text-gray-700">{p.name}</span>}
                </td>
                <td className="px-4 py-4">
                  {editingId === p._id ? <input type="number" name="price" value={formData.price} onChange={handleChange} className="border px-2 py-1 rounded w-full" /> : <span className="text-green-600 font-bold">{p.price} EGP</span>}
                </td>
                <td className="px-4 py-4">
                  {editingId === p._id ? (
                    <select name="category" value={formData.category} onChange={handleChange} className="border px-2 py-1 rounded w-full">
                      <option value="men">Men</option><option value="women">Women</option><option value="kids">Kids</option>
                    </select>
                  ) : <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">{p.category}</span>}
                </td>
                <td className="px-4 py-4 space-x-3">
                  {editingId === p._id ? (
                    <><button onClick={() => handleUpdate(p._id)} className="text-green-500 hover:text-green-700 text-xl"><FaSave /></button><button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600 text-xl"><FaTimes /></button></>
                  ) : (
                    <><button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-700 text-xl"><FaEdit /></button><button onClick={() => handleDelete(p._id)} className="text-red-400 hover:text-red-600 text-xl"><FaTrash /></button></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsAdmin;