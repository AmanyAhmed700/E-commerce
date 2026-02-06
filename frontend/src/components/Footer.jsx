import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.svg";

const Footer = () => {
  return (
    <footer className="bg-[#8D5F8C] text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        
        {/* Logo and Address */}
        <div className="flex flex-col items-start">
           <Link to="/" className="text-2xl font-bold text-white">
        <img src={logo} alt="Logo" className="h-12  text-white" />
        </Link>
        <div className="mt-3 p-7">
         
          <p>   123  Street, Cairo, Egypt</p>
            <p> +20 1000 000 000 <br /> </p>
            <p> youremail@gmail.com</p>
          
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold mb-2 text-2xl">Quick Links</h3>
          <div className="mt-2 p-7 flex flex-col gap-2">
          <a href="/terms" className="hover:underline ">Terms & Conditions</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Amany Ahmed. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
