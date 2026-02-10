// src/pages/admin/AdminPanel.jsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const AdminPanel = () => {
  const [page, setPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // إغلاق السايدبار عند تغيير حجم الشاشة للديسكتوب
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // منع scroll في الصفحة عند فتح السايدبار على الموبايل
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 overflow-x-hidden">
      
      {/* 1. القائمة الجانبية (AdminSidebar) */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
        bg-[#8D5F8C] w-64 flex-shrink-0 shadow-xl
      `}>
        {/* زر الإغلاق داخل السايدبار (موبايل فقط) */}
        <div className="md:hidden flex justify-end p-4">
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close sidebar"
          >
            <IoClose size={24} />
          </button>
        </div>
        
        <AdminSidebar setPage={(p) => { setPage(p); setIsSidebarOpen(false); }} />
      </div>

      {/* 2. غطاء شفاف عند فتح المنيو في الموبايل */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* 3. منطقة المحتوى الرئيسية */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header الداشبورد */}
        <header className="bg-white shadow-sm p-3 sm:p-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            {/* زر المنيو يظهر فقط في الموبايل */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 md:hidden hover:bg-gray-200 transition-colors flex-shrink-0"
              aria-label="Open menu"
            >
              <HiMenuAlt2 size={24} /> 
            </button>
            
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 capitalize truncate">
              Admin Management / {page}
            </h2>
          </div>

          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <span className="hidden sm:inline text-xs md:text-sm text-gray-500 font-medium">
              Admin Mode
            </span>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#8D5F8C] rounded-full flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        {/* محتوى الصفحة المتغير */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-full">
            <Outlet context={{ setPage }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;