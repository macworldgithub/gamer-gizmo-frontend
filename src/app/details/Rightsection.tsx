"use client"; 

import React, { useState } from "react";
import Image from "next/image";

const Rightsection = () => {
  const [quantity, setQuantity] = useState(1); 

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 flex flex-col justify-center items-center gap-8">
      {/* First Card (Price & Quantity) */}
      <div className="border border-gray-300 rounded-lg p-6 w-72 bg-white shadow-md flex flex-col justify-between">
        {/* Price Heading */}
        <h1 className="text-2xl font-bold text-purple-600 text-center md:text-3xl">
          AED 551.00
        </h1>

        {/* Horizontal Divider */}
        <hr className="my-6 border-gray-300 w-full" />

        {/* Quantity Selector */}
        <div className="flex items-center justify-center w-fit mx-auto border border-purple-500 rounded-md overflow-hidden mb-4">
          {/* Decrement Button */}
          <button
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center font-bold text-purple-600 hover:bg-purple-100 transition rounded-l-md"
          >
            -
          </button>

          {/* Quantity Display */}
          <span className="w-10 h-8 flex items-center justify-center font-bold text-purple-600 border-x border-purple-500">
            {quantity}
          </span>

          {/* Increment Button */}
          <button
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center font-bold text-purple-600 hover:bg-purple-100 transition rounded-r-md"
          >
            +
          </button>
        </div>

        {/* Buttons Section */}
        <div className="space-y-4">
          {/* Buy Now Button */}
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

          {/* Add to Cart Button */}
          <button className="flex items-center justify-center w-3/4 mx-auto text-purple-600 border border-purple-600 font-bold py-2 hover:bg-purple-100 transition md:py-3">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Seller Details Section */}
      <div className="border border-gray-300 rounded-lg p-6 w-72 bg-white shadow-md flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-center text-lg font-bold text-gray-800">
          Seller Details
        </h2>

        {/* Horizontal Line */}
        <hr className="my-4 border-gray-300 w-full" />

        {/* Seller Information */}
        <div className="flex items-center mb-6">
          {/* Seller Image */}
          <Image
            src="/images/person.png" 
            alt="Seller Image"
            width={40}
            height={40}
            className="rounded-full mr-4"
          />
          {/* Seller Name and Member Since */}
          <div className="text-left">
            <p className="text-gray-800 font-semibold">Shamsher Alikhan</p>
            <p className="text-gray-500 text-sm">Member Since Nov 26, 2022</p>
          </div>
        </div>

        {/* Icons Row */}
        <div className="flex justify-center items-center space-x-6 mb-6">
          <Image
            src="/images/cellphone.png"
            alt="Cellphone Icon"
            width={30}
            height={30}
          />

          <Image
            src="/images/message.png"
            alt="Message Icon"
            width={30}
            height={30}
          />

          <Image
            src="/images/facebook.png"
            alt="Facebook Icon"
            width={30}
            height={30}
          />
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-600 mb-2">
          See if your friends know this seller
        </p>
        {/* Connect with Facebook */}
        <p className="text-center text-sm text-blue-600 font-semibold cursor-pointer hover:underline">
          Connect with Facebook
        </p>
      </div>

      {/* Third Card (Buy From GamerGizmo) */}
      <div className="border border-gray-300 rounded-lg p-6 w-72 bg-white shadow-md flex flex-col items-center">
        <Image
          src="/images/trawly.png"
          alt="Cart Icon"
          width={60}
          height={80}
        />
        <h2 className="text-center text-sm font-bold text-purple-600 mt-4">
          Buy From GamerGizmo and Get
        </h2>
        <ul className="mt-4 text-black text-center space-y-1">
          <li>1. 100% Genuine Products</li>
          <li className="-ml-8">2. Hassle Free Buying</li>{" "}
          {/* Adjusted position */}
          <li>3. Money Back Guarantee</li>
        </ul>
      </div>
    </div>
  );
};

export default Rightsection;
