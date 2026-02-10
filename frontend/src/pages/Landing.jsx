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
              {[
                { icon: "🚚", text: "Fast Delivery" },
                { icon: "↩️", text: "Easy Returns" },
                { icon: "💳", text: "Secure Payment" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 justify-center lg:justify-start bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
                  <span className="text-xl">{feature.icon}</span>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
              <Link 
                to="/#products"
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
              
              {/* Main Image */}
              <div className="relative z-10 bg-white/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3081/3081840.png" 
                  alt="Shopping Illustration" 
                  className="w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>

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