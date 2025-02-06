"use client";

import React, { useState } from "react";
import Image from "next/image";

const Buynow = ({ data }: any) => {
  const [quantity, setQuantity] = useState(2);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="dark:border-[#6345ED] dark:border md:hidden mt-4 h-72 border-gray-300 rounded-lg p-6 w-full bg-white shadow-md flex flex-col justify-between dark:bg-black">
      {/* Price Heading */}

      {/* Horizontal Divider */}
      {/* <hr className="my-6 border-gray-300 w-full " /> */}

      {/* <div className="flex items-center justify-center w-fit mx-auto border border-purple-500 rounded-md overflow-hidden mb-4">
   
        <button
          onClick={handleDecrement}
          className="w-8 h-8 flex items-center justify-center font-bold text-purple-600 hover:bg-purple-100 transition rounded-l-md"
        >
          -
        </button>


        <span className="w-10 h-8 flex items-center justify-center font-bold text-purple-600 border-x border-purple-500">
          {quantity}
        </span>

      
        <button
          onClick={handleIncrement}
          className="w-8 h-8 flex items-center justify-center font-bold text-purple-600 hover:bg-purple-100 transition rounded-r-md"
        >
          +
        </button>
      </div> */}

      {/* Buttons Section */}
      {/* <div className="space-y-4">
        <button className="flex items-center justify-center w-3/4 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 shadow-md hover:scale-105 transform transition md:py-3">
          <Image
            src="/images/addcart.png"
            alt="Cart Icon"
            width={20}
            height={20}
            className="mr-2"
          />
          BUY NOW
        </button>

        <button className="flex items-center justify-center w-3/4 mx-auto text-purple-600 border border-purple-600 font-bold py-2 hover:bg-purple-100 transition md:py-3">
          Add to Cart
        </button>
      </div> */}
    </div>
  );
};
export default Buynow;
