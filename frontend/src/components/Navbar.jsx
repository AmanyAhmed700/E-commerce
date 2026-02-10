import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo1.svg";
import { HiMenu, HiX, HiSearch, HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateCount, setAnimateCount] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (cart.items.length > 0) {
      setAnimateCount(true);
      const timer = setTimeout(() => setAnimateCount(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cart.items.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-[#8D5F8C] text-white sticky top-0 z-[100] w-full shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          
          {/* 1. Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center group">
            <img src={logo} alt="Moon Logo" className="h-12 w-auto transition-transform group-hover:scale-105" />
            <span className="hidden sm:block ml-2 text-2xl font-bold tracking-wider uppercase font-serif">Moon</span>
          </Link>

          {/* 2. Search Bar (تعديل العرض ليكون متناسقاً) */}
          <div className="flex-1 max-w-xl hidden sm:block">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/70 border border-white/30 px-5 py-2 rounded-full 
                           focus:outline-none focus:bg-white focus:text-[#8D5F8C] focus:placeholder-gray-400 transition-all"
              />
              <button type="submit" className="absolute right-4 top-2.5 text-white group-focus-within:text-[#8D5F8C]">
                <HiSearch className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* 3. Desktop Navigation & Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-5 font-medium">
              <Link to="/men" className="hover:text-white/80 transition">Men</Link>
              <Link to="/women" className="hover:text-white/80 transition">Women</Link>
              <Link to="/kids" className="hover:text-white/80 transition">Kids</Link>
            </div>

            <div className="h-6 w-[1px] bg-white/30"></div>

            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <Link to="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition">
                <HiOutlineShoppingCart className="h-7 w-7" />
                {cart.items.length > 0 && (
                  <span className={`absolute top-0 right-0 bg-white text-[#8D5F8C] text-[10px] font-bold w-5 h-5 
                                    flex items-center justify-center rounded-full shadow-sm
                                    ${animateCount ? "scale-125" : "scale-100"} transition-transform`}>
                    {cart.items.length}
                  </span>
                )}
              </Link>

              {/* User / Auth Section */}
              {user ? (
                <div className="flex items-center gap-3">
                  <button onClick={logout} className="bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-lg text-sm transition">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="p-2 hover:bg-white/10 rounded-full transition"><HiOutlineUser className="h-7 w-7"/></Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {/* أيقونة البحث للموبايل */}
             <Link to="/search" className="sm:hidden p-2"><HiSearch className="h-6 w-6" /></Link>
             <Link to="/cart" className="relative p-2"><HiOutlineShoppingCart className="h-6 w-6" />
                {cart.items.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.items.length}</span>}
             </Link>
             <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
               {menuOpen ? <HiX className="h-8 w-8" /> : <HiMenu className="h-8 w-8" />}
             </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Side/Top Menu Overlay */}
     {/* 4. Mobile Top Menu Overlay */}
{menuOpen && (
  <div className="absolute top-20 left-0 w-full bg-white shadow-2xl md:hidden z-50 animate-fade-in-down rounded-b-3xl">
    <div className="flex flex-col py-4 px-4 space-y-2">
      
      {/* الروابط الأساسية بشكل كروت صغيرة ناعمة */}
      <Link 
        to="/men" 
        className="text-gray-700 text-lg font-medium px-4 py-3 rounded-2xl hover:bg-[#8D5F8C]/10 hover:text-[#8D5F8C] transition-all flex justify-between items-center"
        onClick={() => setMenuOpen(false)}
      >
        Men <span>→</span>
      </Link>
      
      <Link 
        to="/women" 
        className="text-gray-700 text-lg font-medium px-4 py-3 rounded-2xl hover:bg-[#8D5F8C]/10 hover:text-[#8D5F8C] transition-all flex justify-between items-center"
        onClick={() => setMenuOpen(false)}
      >
        Women <span>→</span>
      </Link>
      
      <Link 
        to="/kids" 
        className="text-gray-700 text-lg font-medium px-4 py-3 rounded-2xl hover:bg-[#8D5F8C]/10 hover:text-[#8D5F8C] transition-all flex justify-between items-center"
        onClick={() => setMenuOpen(false)}
      >
        Kids <span>→</span>
      </Link>

      {/* قسم الأزرار في الأسفل */}
      <div className="mt-4 p-2 bg-gray-50 rounded-2xl space-y-3">
        {user ? (
          <button 
            onClick={() => { logout(); setMenuOpen(false); }} 
            className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold hover:bg-red-100 transition-colors"
          >
            Logout
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to="/login" 
              className="bg-[#8D5F8C] text-white py-3 rounded-xl font-bold text-center shadow-md shadow-[#8D5F8C]/20" 
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-white text-[#8D5F8C] border border-[#8D5F8C]/20 py-3 rounded-xl font-bold text-center" 
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
)}
    </nav>
  );
}