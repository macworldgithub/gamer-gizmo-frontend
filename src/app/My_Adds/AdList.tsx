"use client";
import { CiPhone } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { TbMessages } from "react-icons/tb";

export default function AdList({ ads }) {
  return (
    <div className="m-4">
      <div className="flex justify-between items-center bg-black text-white w-fit px-4 py-1 rounded-full mb-4">
        <span className="font-medium text-lg">All Ads ({ads.length})</span>
      </div>

      {ads.map((ad) => (
        <div
          key={ad.id}
          className="flex flex-col lg:flex-row items-center rounded-lg p-8 lg:p-6 mb-6"
        >
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full lg:w-28 h-28 rounded-lg object-cover mb-4 lg:mb-0"
          />
          <div className="flex-1 px-0 lg:px-6">
            <h3 className="font-bold text-lg max-md:text-[12px] leading-6 break-words">{ad.title}</h3>
            <div className="flex flex-wrap items-center text-gray-500 text-sm space-x-4 mt-2">
              <span className="flex items-center gap-1">
                <IoEyeOutline size={20} /> Views ({ad.views})
              </span>
              <span className="flex items-center gap-1">
                <CiPhone size={20} /> Calls ({ad.calls})
              </span>
              <span className="flex items-center gap-1">
                <TbMessages size={20} /> Chats ({ad.chats})
              </span>
              <span className="flex items-center gap-1">
                <FaRegHeart size={20} /> Likes ({ad.likes})
              </span>
              <span className="font-bold text-purple-600 mt-2 lg:mt-0">
                AED <span className="text-2xl">{ad.price}</span>
              </span>
            </div>
          </div>
          <div className="flex flex-row  items-center justify-between w-full lg:w-auto gap-12 mt-4 ">
              <div
              className={`px-4 py-1 text-sm font-medium rounded-full ${
                ad.status === "Active" ? "bg-blue-500 text-white" : "bg-black text-white"
              }`}
            >
              {ad.status}
            </div>
            <div className="flex flex-row lg:flex-col gap-2">
              <button className="px-4 lg:px-6 border border-black font-bold rounded-full hover:bg-gray-200">
                Edit
              </button>
              <button className="px-4 lg:px-6 text-[#ff0000] border border-[#ff0000] font-bold rounded-full hover:bg-red-100">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
