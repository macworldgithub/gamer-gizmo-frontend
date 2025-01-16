import React from "react";

const SellSection = () => {
    return (
      <div>
        <h1 className="sm:text-xs md:text-xl font-semibold text-center text-gray-800 mb-6 pt-4 dark:text-white">
            Sell Your PCs, Laptops and Gaming Accessories On Gamezen and Get the Best Price
          </h1>       
        <div className="w-full max-w-6xl border flex justify-center py-10 bg-gray-50 rounded-lg lg:ml-14 dark:bg-black max-lg:w-[90%] max-lg:mx-auto dark:border-[#6345ED] ">
       
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-[#6345ED] mb-4 md:text-3xl">
                Post your Ad on GamerGizmo
              </h2>
              <ul className="text-gray-600 text-sm space-y-2 mb-6 dark:text-white md:text-2xl">
                <li className="flex items-center justify-center space-x-2">
                  <span className="text-[#DC39FC]">✔</span>
                  <span>Post your Ad for Free in 3 Easy Steps</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <span className="text-[#DC39FC]">✔</span>
                  <span>Sell your component at the Best Price</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <span className="text-[#DC39FC]">✔</span>
                  <span>Get Genuine offers from Verified Buyers</span>
                </li>
              </ul>
              <button className="md:w-auto px-6 py-2 bg-gradient-to-r from-[#DC39FC] to-[#6345ED] text-white rounded-full shadow hover:shadow-lg focus:outline-none">
                Post Your Ad
              </button>
            </div>
  
            <div className="relative flex items-center justify-center text-gray-400">
              <span className="absolute inset-0 h-px bg-gray-300"></span>
              <span className="bg-white px-3 text-sm">Or</span>
            </div>
  
            {/* Sell For Me Section */}
            <div className="text-center">
              <h2 className="text-lg font-semibold text-[#6345ED] mb-4 md:text-3xl">
                Try GamerGizmo Sell For Me
              </h2>
              <ul className="text-gray-600 text-sm space-y-2 mb-6 dark:text-white md:text-2xl">
                <li className="flex items-center justify-center space-x-2">
                  <span className="text-[#DC39FC]">✔</span>
                  <span>We ensure sale & secure Transaction</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <span className="text-[#DC39FC]">✔</span>
                  <span>We Bargain for and share the Best offer</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <span className="text-[#DC39FC]">✔</span>
                  <span>Dedicated Sales Expert to sell your component</span>
                </li>
              </ul>
              <button className=" md:w-auto px-6 py-2 bg-gradient-to-r from-[#DC39FC] to-[#6345ED] text-white rounded-full shadow hover:shadow-lg focus:outline-none">
                Buy for Gamergizmo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SellSection;
