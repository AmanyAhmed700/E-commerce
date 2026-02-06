import React from "react";
import offerImg from "../assets/dddd.jpeg";

const OfferBanner = () => {
  return (
    <div className="relative rounded-lg shadow-lg overflow-hidden my-8 group">
      {/* الصورة */}
      <img
        src={offerImg}
        alt="Special Offer"
        className="w-full h-80 md:h-96 object-contain bg-white transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay للنصوص */}
      <div className="absolute inset-0 bg-black/40 flex flex-col md:flex-row justify-between items-center p-4 md:p-6">
        {/* نص على اليمين */}
        <div className="text-white max-w-xs mb-6 md:mb-0 text-center md:text-left opacity-90 group-hover:opacity-100 transition-opacity duration-500">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">Mega Sale!</h2>
          <p className="text-sm md:text-base mb-2">
            Shop Smarter, Live Better.
          </p>
        </div>

        {/* نص على اليسار */}
        <div className="text-white max-w-xs text-center md:text-right opacity-90 group-hover:opacity-100 transition-opacity duration-500">
          <h3 className="text-xl md:text-3xl font-bold mb-2">
            Kids Collection
          </h3>
          <p className="text-sm md:text-base">
            Fast delivery • Easy returns • Smooth shopping
          </p>
        </div>
      </div>

      {/* عبارة على منتصف الصورة + الزر */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-5xl font-extrabold text-white drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity duration-500 text-center">
          OFFER 50% OFF
        </h1>
        <button className="mt-4 bg-[#8D5F8C] px-5 py-2 rounded hover:bg-gray-400 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default OfferBanner;
