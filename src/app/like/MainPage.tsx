"use client";
import { useState } from "react";
import Image from "next/image";
import { FiPhone, FiMessageSquare } from "react-icons/fi";
import Wrapper from "@/components/Common/Wrapper/Wrapper";

export default function MainPage() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "AMD Radeon RX 580 GTS XXX Edition Graphics Card, S Version, 8GB DDR5 256 Bit Memory, Dual Bios, 2304 Stream Processor, 1386MHz OC+, PCI-E, HDMI, DisplayPort | RX-580S85DD6",

      warranty:
        "1 Year - Effortless warranty claims with global coverage; shipping costs are on us.",
      phone: "+971 123 456...",
      image: "/images/gpu.png",
    },
    {
      id: 2,
      name: "AMD Radeon RX 580 GTS XXX Edition Graphics Card, S Version, 8GB DDR5 256 Bit Memory, Dual Bios, 2304 Stream Processor, 1386MHz OC+, PCI-E, HDMI, DisplayPort | RX-580S85DD6",

      warranty:
        "1 Year - Effortless warranty claims with global coverage; shipping costs are on us.",
      phone: "+971 123 456...",
      image: "/images/gpu.png",
    },
    {
      id: 3,
      name: "AMD Radeon RX 580 GTS XXX Edition Graphics Card, S Version, 8GB DDR5 256 Bit Memory, Dual Bios, 2304 Stream Processor, 1386MHz OC+, PCI-E, HDMI, DisplayPort | RX-580S85DD6",

      warranty:
        "1 Year - Effortless warranty claims with global coverage; shipping costs are on us.",
      phone: "+971123456...",
      image: "/images/gpu.png",
    },
  ]);

  return (
    <Wrapper>
      <div className=" p-6 lg:mt-52">
        <h1 className="text-2xl font-bold mb-6">All Favorites</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className=" border border-gray-300 rounded-lg py-2 px-4 "
          />
        </div>

        {/* Favorites List */}
        <div className="grid grid-cols-1 gap-6">
          {favorites.map((item) => (
            <div key={item.id} className="flex items-start">
              {/* Image */}
              <div className="relative w-48 h-48 ">
                <div className="max-lg:w-[80px] max-sm:h-[20px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="object-contain max-sm:w-[10px] "
                    layout="fill"
                  />
                </div>

                {/* Save and Heart Icons */}
                <div className="absolute  flex gap-2">
                  <Image
                    src="/images/Save .png"
                    alt="Save"
                    width={24}
                    height={24}
                    className="w-6 h-6 cursor-pointer"
                  />
                  <Image
                    src="/images/Heart.png"
                    alt="Heart"
                    width={24}
                    height={24}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1">
                <h2 className="text-xl font-bold break-words max-w-[600px] max-lg:text-md max-md:text-sm">
                  {item.name}
                </h2>

                <p className="mt-2 text-xs text-gray-500 max-sm:hidden">
                  {item.warranty}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <button className="flex items-center gap-2 text-sm text-white bg-custom-gradient px-5 py-3 rounded-lg hover:bg-purple-600 max-sm:px-3 max-sm:py-2 max-sm:w-[8rem] max-sm:text-xs
                  
                  ">
                    <FiPhone />
                    {item.phone}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-purple-500 border border-[#DC39FC] px-3 py-3 rounded-lg hover:bg-purple-100 max-sm:px-3 max-sm:py-2 max-sm:w-[8rem]  max-sm:text-xs ">
                    <FiMessageSquare />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
