import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#f8f7fa] via-[#eeecf0] to-[#e8e6ec] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8D5F8C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8D5F8C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left side - Text Content */}
          <div className="flex flex-col space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
            
            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Welcome To{" "}
                <span className="bg-gradient-to-r from-[#8D5F8C] to-[#9D6F9C] bg-clip-text text-transparent">
                  Moon Store
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">
                Shop Smarter, Live Better.
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Discover the latest trends at unbeatable prices. Fast delivery, 
              easy returns, and endless choice—your cart, your way!
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-2 justify-center lg:justify-start bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
                <svg className="w-5 h-5 text-[#8D5F8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-gray-700">Fast Delivery</span>
              </div>

                     {/* Easy Returns */}
              <div className="flex items-center gap-2 justify-center lg:justify-start bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
                <svg className="w-5 h-5 text-[#8D5F8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-gray-700">Easy Returns</span>
              </div>


                        {/* Secure Payment */}
              <div className="flex items-center gap-2 justify-center lg:justify-start bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
                <svg className="w-5 h-5 text-[#8D5F8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-gray-700">Secure Payment</span>
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
              <Link 
                to="/register"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#8D5F8C] to-[#9D6F9C] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg hover:shadow-xl hover:shadow-[#8D5F8C]/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop Now
              </Link>
              
              <Link 
                to="/men"
                className="inline-flex items-center justify-center border-2 border-[#8D5F8C] text-[#8D5F8C] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg hover:bg-[#8D5F8C] hover:text-white transition-all transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                View Trends
              </Link>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              
              {/* Decorative Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8D5F8C]/20 to-[#9D6F9C]/20 rounded-full blur-2xl scale-110 animate-pulse-slow"></div>
              
          

              {/* Floating Badge 1 */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 hidden sm:block animate-bounce-slow">
                <p className="text-xs font-bold text-gray-600">Special Offer</p>
                <p className="text-2xl font-extrabold text-[#8D5F8C]">50% OFF</p>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 hidden sm:block animate-bounce-slow-delay">
                <p className="text-xs font-bold text-gray-600">Free Shipping</p>
                <p className="text-sm font-bold text-[#8D5F8C]">Orders $50+</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-slow-delay {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-bounce-slow-delay {
          animation: bounce-slow-delay 3s ease-in-out infinite 0.5s;
        }
      `}</style>
    </section>
  );
};