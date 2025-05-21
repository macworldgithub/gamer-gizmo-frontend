"use client";
import React from "react";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const cartItems = [
  {
    id: 1,
    title: "Elden Ring",
    price: 59.99,
    quantity: 1,
    image: "/images/gaming.jpg",
  },
  {
    id: 2,
    title: "Call of Duty: Warzone",
    price: 49.99,
    quantity: 2,
    image: "/images/gaming.jpg",
  },
];

export default function AddToCart() {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className=" relative bg-gradient-to-b  bg-white dark:bg-secondaryBlack text-white font-sans px-4 py-6">
      <div className="flex gap-3 mb-3 justify-center items-center">
        <div>
          <FaCartPlus className="size-6 text-secondaryColorDark" />
        </div>
        <h1 className="text-3xl max-md:text-xl font-bold  text-center text-secondaryColorDark tracking-wide">
          Your Gaming Cart
        </h1>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto max-md:mx-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-[#121212] rounded-2xl shadow-lg p-4 gap-4 border border-gray-800 hover:border-green-500 transition"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
              className="rounded-xl w-24 h-24 object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl max-md:text-sm font-semibold ">
                {item.title}
              </h2>
              <p className="text-sm text-gray-400 ">${item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2 space-x-3">
                <button className="bg-gray-800 p-2 rounded hover:bg-gray-700">
                  <FaMinus className="text-red-400" />
                </button>
                <span className="text-lg font-bold">{item.quantity}</span>
                <button className="bg-gray-800 p-2 rounded hover:bg-gray-700">
                  <FaPlus className="text-green-400" />
                </button>
              </div>
            </div>
            <button className="text-red-500 hover:text-red-600 transition">
              <FaTrash size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className=" bottom-0 mt-10 left-0 right-0 bg-[#1f1f1f] border-t border-gray-700 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400 ">Total</p>
            <p className="text-2xl font-bold text-secondaryColorLight">
              ${total.toFixed(2)}
            </p>
          </div>
          <button className="bg-custom-gradient text-black px-6 py-3 rounded-xl font-bold text-lg transition transform hover:scale-105 shadow-lg">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
