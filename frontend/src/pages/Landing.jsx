import React from "react";

export const Landing = () => {
  return (
    <div className="bg-[rgb(238,237,240)] min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-12">
      {/* Left side - text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Welcome To Moon Store
        </h1>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700">
          Shop Smarter, Live Better. <br />
          Discover the latest trends at unbeatable prices. <br />
          Fast delivery, easy returns, and endless choice—your cart, your way!
        </p>
        <button className="bg-[#8D5F8C]  text-white px-6 py-3 rounded-md w-40 mx-auto md:mx-0 hover:bg-[#b78ab6] transition">
          Shop Now
        </button>
      </div>


    </div>
  );
};
