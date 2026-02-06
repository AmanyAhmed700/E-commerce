import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaPlusCircle, FaBox } from "react-icons/fa";

const AdminSidebar = ({ setPage }) => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded mb-2 ${
      isActive ? "bg-[#8D5F8C] text-white" : "hover:bg-[#ba8fb9] text-gray-700"
    }`;

  return (
    <div className="w-64 bg-white border border-gray-300 p-4 shadow-lg min-h-screen">
      <h2 className="text-xl font-bold mb-6 text-gray-600">
        Admin Dashboard
      </h2>
      <nav>
        <NavLink
          to="/admin/dashboard"
          className={linkClasses}
          onClick={() => setPage("dashboard")}
        >
          <FaTachometerAlt /> Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={linkClasses}
          onClick={() => setPage("users")}
        >
          <FaUsers /> Users
        </NavLink>

        <NavLink
          to="/admin/add-product"
          className={linkClasses}
          onClick={() => setPage("products")}
        >
          <FaPlusCircle /> Add Product
        </NavLink>

        <NavLink
          to="/admin/products"
          className={linkClasses}
          onClick={() => setPage("productsAdmin")}
        >
          <FaBox /> All Products
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
