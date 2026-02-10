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

  // إغلاق المنيو عند الضغط على Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

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
        <div className="flex justify-between items-center h-16 sm:h-20 gap-4">
          
          {/* 1. Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center group">
            <img src={logo} alt="Moon Logo" className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-105" />
          </Link>

          {/* 2. Search Bar - Desktop */}
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
                  <Link to="/login" className="p-2 hover:bg-white/10 rounded-full transition">
                    <HiOutlineUser className="h-7 w-7"/>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Link to="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition">
              <HiOutlineShoppingCart className="h-6 w-6" />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.items.length}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="p-1.5 hover:bg-white/10 rounded-full transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX className="h-7 w-7" /> : <HiMenu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40 animate-fade-in"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Dropdown Menu */}
          <div className="absolute top-16 sm:top-20 left-0 right-0 mx-4 bg-white shadow-2xl md:hidden z-50 rounded-2xl overflow-hidden animate-slide-down">
            
            {/* Search Bar - Mobile */}
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white text-gray-800 placeholder-gray-400 border border-gray-300 px-4 py-3 pr-12 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-[#8D5F8C] focus:border-transparent transition-all text-sm"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8D5F8C] transition-colors"
                >
                  <HiSearch className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Navigation Links */}
            <div className="p-4 space-y-1">
              <Link 
                to="/men" 
                className="flex items-center justify-between px-4 py-3.5 text-gray-800 font-medium rounded-xl hover:bg-gradient-to-r hover:from-[#8D5F8C]/5 hover:to-[#8D5F8C]/10 transition-all group"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-base">Men's Collection</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#8D5F8C] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link 
                to="/women" 
                className="flex items-center justify-between px-4 py-3.5 text-gray-800 font-medium rounded-xl hover:bg-gradient-to-r hover:from-[#8D5F8C]/5 hover:to-[#8D5F8C]/10 transition-all group"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-base">Women's Collection</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#8D5F8C] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link 
                to="/kids" 
                className="flex items-center justify-between px-4 py-3.5 text-gray-800 font-medium rounded-xl hover:bg-gradient-to-r hover:from-[#8D5F8C]/5 hover:to-[#8D5F8C]/10 transition-all group"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-base">Kids Collection</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#8D5F8C] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-4"></div>

            {/* Auth Section */}
            <div className="p-4">
              {user ? (
                <button 
                  onClick={() => { logout(); setMenuOpen(false); }} 
                  className="w-full bg-gradient-to-r from-red-50 to-red-100 text-red-600 py-3.5 px-4 rounded-xl font-semibold hover:from-red-100 hover:to-red-200 transition-all shadow-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </span>
                </button>
              ) : (
                <div className="space-y-2.5">
                  <Link 
                    to="/login" 
                    className="block w-full bg-gradient-to-r from-[#8D5F8C] to-[#9D6F9C] text-white py-3.5 px-4 rounded-xl font-semibold text-center shadow-lg shadow-[#8D5F8C]/30 hover:shadow-xl hover:shadow-[#8D5F8C]/40 transform hover:-translate-y-0.5 transition-all" 
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login
                    </span>
                  </Link>
                  <Link 
                    to="/register" 
                    className="block w-full bg-white text-[#8D5F8C] border-2 border-[#8D5F8C]/20 py-3.5 px-4 rounded-xl font-semibold text-center hover:bg-[#8D5F8C]/5 hover:border-[#8D5F8C]/40 transition-all" 
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Register
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}