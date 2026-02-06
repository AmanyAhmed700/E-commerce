// src/pages/admin/AdminPanel.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const AdminPanel = () => {
  const [page, setPage] = useState("dashboard"); // users, products, dashboard

  return (
    <div className="flex min-h-screen">
      <AdminSidebar setPage={setPage} />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
