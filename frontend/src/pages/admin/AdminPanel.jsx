// src/pages/admin/AdminPanel.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
// الخطأ كان هنا: HiMenuAlt-2
import { HiMenuAlt2 } from "react-icons/hi";// أيقونة لفتح المنيو في الموبايل

const AdminPanel = () => {
  const [page, setPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // التحكم في ظهور السايدبار بالموبايل

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 overflow-x-hidden">
      
      {/* 1. القائمة الجانبية (AdminSidebar) */}
      {/* نستخدم كلاسات تحكم لظهور السايدبار في الموبايل كـ Overlay */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
        bg-[#8D5F8C] w-64 flex-shrink-0 shadow-xl
      `}>
        <AdminSidebar setPage={(p) => { setPage(p); setIsSidebarOpen(false); }} />
      </div>

      {/* 2. غطاء شفاف عند فتح المنيو في الموبايل لإغلاقه عند الضغط في الخارج */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 3. منطقة المحتوى الرئيسية */}
      <div className="flex-1 flex flex-col min-w-0"> {/* min-w-0 تمنع تمدد العناصر المرنة خارج الحاوية */}
        
        {/* Header الداشبورد */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* زر المنيو يظهر فقط في الموبايل */}
         <button 
  onClick={() => setIsSidebarOpen(true)}
  className="p-2 rounded-lg bg-gray-100 text-gray-600 md:hidden hover:bg-gray-200"
>
  {/* تحديث الاسم هنا أيضاً */}
  <HiMenuAlt2 size={24} /> 
</button>
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 capitalize truncate">
              Admin / {page}
            </h2>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <span className="hidden sm:inline text-sm text-gray-500 font-medium">Admin Mode</span>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#8D5F8C] rounded-full flex items-center justify-center text-white font-bold shadow-sm">
              A
            </div>
          </div>
        </header>

        {/* محتوى الصفحة المتغير */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-full">
             <Outlet context={{ setPage }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;