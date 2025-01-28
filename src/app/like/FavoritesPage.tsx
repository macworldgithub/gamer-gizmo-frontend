
"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  
  const [items, setItems] = useState([
    {
      id: 1,
      title: "All Favorites",
      image: "/images/gpu.png",
      isDefault: true,
    },
    {
      id: 2,
      title: "All Favorites",
      image: "/images/gpu.png",
      isDefault: true,
    },
    {
      id: 3,
      title: "All Favorites",
      image: "/images/gpu.png",
      isDefault: true,
    },
    {
      id: 4,
      title: "All Favorites",
      image: "/images/gpu.png",
      isDefault: true,
    },
  ]);

  return (
    
    <div className="max-lg:hidden">
      <div className="ml-40 mt-20 p-4">
        <h2 className="text-2xl font-bold">My Favorites</h2>
        <p className="text-xl">
          Create a list to oraganize your favorites listings
        </p>
      </div>
      <div className="w-[25rem] border flex flex-col  h-4/6 overflow-y-auto mt-20 ml-40 rounded-b-3xl rounded-t-3xl  ">
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-xl font-semibold ">All Favorites</h2>
          <button className="text-blue-600 text-sm ">+ Create list</button>
        </div>

        <div className="">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center gap-10 bg-white border p-3  "
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                width={120}
                height={150}
                className="rounded"
              />
              {/* Content */}
              <div className=" ">
                <h3 className="text-lg font-bold truncate  w-32">
                  {item.title}
                </h3>
                <h3 className="text-lg font-medium text-gray-400 ">1 saves</h3>
                <h3 className="text-lg font-medium text-gray-400 ">private</h3>
              </div>

              {/* Default Button */}
              {item.isDefault && (
                <button className="bg-[#6345ED] text-white text-xs px-2 py-1 rounded-full -mt-14 ">
                  Default
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#C3B6FF4D] h-64 ">
          <div className="bg-white w-80 h-44 rounded-lg mx-auto mt-10 p-4 flex flex-col items-center justify-center">
            <Image
              src="/images/Heart.png"
              alt="Heart"
              width={40}
              height={40}
              className="mb-2"
            />
            <h4 className="font-bold mb-2">
              Create Your First Personalized List
            </h4>
            <p className="text-sm mb-4">Organize your favorite</p>
            <button className="border border-black text-bold px-6 py-2">
              Create List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
