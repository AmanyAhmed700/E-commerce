// src/pages/admin/AdminPanel.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const AdminPanel = () => {
  // ملاحظة: الـ setPage قد تستخدمينها إذا كان الـ Sidebar يعتمد على State داخلية 
  // ولكن غالباً الـ Outlet سيتولى عرض المكونات بناءً على الرابط (URL)
  const [page, setPage] = useState("dashboard"); 

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* القائمة الجانبية للأدمن */}
      <AdminSidebar setPage={setPage} />

      {/* المحتوى المتغير بناءً على الصفحة المختارة */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700 capitalize">
            Admin Management / {page}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Admin Mode</span>
            <div className="w-8 h-8 bg-[#8D5F8C] rounded-full flex items-center justify-center text-white">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {/* هنا سيتم عرض المكونات مثل AdminDashboard أو ManageProducts */}
          <div className="container mx-auto">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;