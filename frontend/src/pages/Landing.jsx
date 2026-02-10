import React from "react";

export const Landing = () => {
  return (
    <section className="bg-[rgb(238,237,240)] min-h-[calc(100vh-64px)] flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between w-full">
        
        {/* Left side - Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left space-y-8 order-2 md:order-1 mt-10 md:mt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Welcome To <span className="text-[#8D5F8C]">Moon Store</span>
          </h1>
          
          <div className="space-y-4">
            <p className="text-lg sm:text-xl font-medium text-gray-800">
              Shop Smarter, Live Better.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0">
              Discover the latest trends at unbeatable prices. Fast delivery, 
              easy returns, and endless choice—your cart, your way!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-[#8D5F8C] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#724a71] shadow-lg hover:shadow-xl transition-all active:scale-95">
              Shop Now
            </button>
            <button className="border-2 border-[#8D5F8C] text-[#8D5F8C] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#8D5F8C] hover:text-white transition-all">
              View Trends
            </button>
          </div>
        </div>

        {/* Right side - Illustration/Image Placeholder */}
        <div className="w-full md:w-5/12 order-1 md:order-2">
          <div className="relative">
            {/* دائرة خلفية للزينة */}
            <div className="absolute -inset-4 bg-[#8D5F8C] opacity-10 rounded-full blur-3xl"></div>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3081/3081840.png" 
              alt="Shopping Illustration" 
              className="relative w-full max-w-[400px] mx-auto drop-shadow-2xl animate-pulse-slow"
            />
          </div>
        </div>

      </div>
    </section>
  );
};