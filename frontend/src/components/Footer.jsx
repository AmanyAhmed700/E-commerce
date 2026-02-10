import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.svg";

const Footer = () => {
  return (
    <footer className="bg-[#8D5F8C] text-white py-10 px-6 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* 1. القسم الأول: اللوجو والوصف */}
        <div className="flex flex-col items-start space-y-4">
          <Link to="/" className="transition-opacity hover:opacity-80">
            <img src={logo} alt="Moon Logo" className="h-12 w-auto brightness-0 invert" />
          </Link>
         <p className="text-gray-100 text-sm leading-relaxed max-w-xs">
  Moon Store is your first destination for the latest fashion trends, offering high quality and competitive prices.
</p>

        </div>

        {/* 2. القسم الثاني: معلومات التواصل */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold border-b border-white/20 pb-2 w-fit">Contact Us</h3>
          <div className="space-y-3 text-sm text-gray-100">
            <div className="flex items-center gap-3">
              123 Street, Cairo, Egypt
            </div>
            <div className="flex items-center gap-3">
             +20 1000 000 000 000 000
            </div>
            <div className="flex items-center gap-3">
             youremail@gmail.com
            </div>
          </div>
        </div>

        {/* 3. القسم الثالث: الروابط السريعة (فوق بعضها) */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold border-b border-white/20 pb-2 w-fit">Quick Links</h3>
          <nav className="flex flex-col space-y-3 text-sm">
            <Link to="/" className="hover:translate-x-2 transition-transform duration-200">Home</Link>
            <Link to="/men" className="hover:translate-x-2 transition-transform duration-200">Men Fashion</Link>
            <Link to="/women" className="hover:translate-x-2 transition-transform duration-200">Women Fashion</Link>
            <Link to="/" className="hover:translate-x-2 transition-transform duration-200">Privacy Policy</Link>
            <Link to="/" className="hover:translate-x-2 transition-transform duration-200">Terms & Conditions</Link>
          </nav>
        </div>

      </div>

      {/* خط فاصل */}
      <div className="max-w-6xl mx-auto text-center border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-200">
        <p className="text-center">© {new Date().getFullYear()} Amany Ahmed. All rights reserved.</p>
       
      </div>
    </footer>
  );
};

export default Footer;