import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const ProductsAdmin = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [newImage, setNewImage] = useState(null);

  // جلب كل المنتجات
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
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
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
    });
    setNewImage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // تحديث المنتج
  const handleUpdate = async (id) => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      if (newImage) {
        data.append("image", newImage);
      }

      await axios.put(`http://localhost:5000/api/products/${id}`, data, {
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
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="border px-4 py-2 flex flex-col items-center">
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  alt={p.name}
                  className="w-20 h-20 object-cover mb-2"
                />
                {editingId === p._id && (
                  <input
                    type="file"
                    onChange={(e) => setNewImage(e.target.files[0])}
                    className="border px-2 py-1"
                  />
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === p._id ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  p.name
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === p._id ? (
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  p.price
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === p._id ? (
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </select>
                ) : (
                  p.category
                )}
              </td>
              <td className="border px-4 py-2 space-x-2">
                {editingId === p._id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(p._id)}
                      className="text-green-500 hover:text-green-700 text-xl"
                      title="Save"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                      title="Cancel"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-500 hover:text-blue-700 text-xl"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsAdmin;
