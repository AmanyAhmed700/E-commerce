import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo1.svg";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateCount, setAnimateCount] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // تأثير عند تغير عدد المنتجات في الكارت
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
    }
  };

  return (
    <nav className="bg-[#8D5F8C] text-white px-4 py-3 flex justify-between items-center h-20 w-full relative 
                shadow-sm shadow-gray-500 border-t-1 border-white ">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-white flex items-center">
        <img src={logo} alt="Logo" className="h-12" />
      </Link>

      {/* 🔍 Search Bar - Always Visible (Responsive) */}
 <form
  onSubmit={handleSearch}
  className="flex items-center w-full sm:w-2/3 md:w-1/3 lg:w-1/2 mx-2 
             max-w-[600px] min-w-[150px]"
>
  <div className="flex items-center bg-white rounded-full px-3 py-1 w-full shadow-sm">
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex-1 text-black px-2 py-1 rounded-l-full focus:outline-none 
                 text-sm sm:text-base bg-transparent min-w-0"
    />
    {/* أيقونة السيرش دايمًا موجودة */}
    <button
      type="submit"
      className="flex items-center justify-center text-[#8D5F8C] hover:text-gray-600"
    >
      <HiSearch className="h-5 w-5 sm:h-6 sm:w-6" />
    </button>
  </div>
</form>




      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4 items-center">
        <Link to="/men" className="hover:underline text-xl">Men</Link>
        <Link to="/women" className="hover:underline text-xl">Women</Link>
        <Link to="/kids" className="hover:underline text-xl">Kids</Link>

        <Link to="/cart" className="relative hover:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 8h14l-1.5 12h-11L5 8zm3-3a2 2 0 114 0m0 0a2 2 0 114 0"
            />
          </svg>
          {cart.items.length > 0 && (
            <span
              className={`absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full
                ${animateCount ? "scale-125 transition-transform duration-300" : "scale-100 transition-transform duration-300"}`}
            >
              {cart.items.length}
            </span>
          )}
        </Link>

        {user ? (
          <button onClick={logout} className="ml-4 bg-[#660b1d] px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="ml-4 bg-white text-[#8D5F8C] px-3 py-1 rounded hover:bg-[#c4a9c4] hover:text-white">Login</Link>
            <Link to="/register" className="ml-2 bg-white text-[#8D5F8C] px-3 py-1 rounded hover:bg-[#c4a9c4] hover:text-white">Register</Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX className="h-8 w-8" /> : <HiMenu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-200 shadow-md flex flex-col items-center md:hidden z-50 py-2">
          <Link to="/men" className="w-full text-center text-black py-2 border-b border-gray-600 hover:underline" onClick={() => setMenuOpen(false)}>Men</Link>
          <Link to="/women" className="w-full text-center text-black py-2 border-b border-gray-600 hover:underline" onClick={() => setMenuOpen(false)}>Women</Link>
          <Link to="/kids" className="w-full text-center text-black py-2 border-b border-gray-600 hover:underline" onClick={() => setMenuOpen(false)}>Kids</Link>
          
          <Link to="/cart" className="relative w-full text-center text-black py-2 hover:text-gray-200" onClick={() => setMenuOpen(false)}>
            Cart
            {cart.items.length > 0 && (
              <span className={`absolute -top-2 -right-2 -[#8D5F8C] text-white text-xs font-bold w-5 h-5 flex items-center justify-center
                ${animateCount ? "scale-125 transition-transform duration-300" : "scale-100 transition-transform duration-300"}`}>
                {cart.items.length}
              </span>
            )}
          </Link>

          {user ? (
            <button onClick={() => { logout(); setMenuOpen(false); }} className="w-full text-center bg-[#660b1d] text-white py-2 border-b border-black rounded-b">Logout</button>
          ) : (
            <>
              <Link to="/login" className="w-full text-center bg-[#8D5F8C] text-white py-2 border-b border-black hover:bg-[#8D5F8C]" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="w-full text-center bg-white text-[#8D5F8C] py-2 hover:bg-gray-100 rounded-b" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
