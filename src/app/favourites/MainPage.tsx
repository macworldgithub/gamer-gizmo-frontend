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
    <Wrapper className="max-sm:pr-0">
      <div className="lg:p-6 w-full  max-lg:p-0 lg:mt-52">
        <h1 className="text-2xl font-bold mb-6">All Favorites</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg py-2 px-4 w-[30%] max-sm:w-52"
          />
        </div>

        {/* Favorites List */}
        <div className="flex flex-col gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="flex flex-row items-start p-4 rounded-lg w-full"
            >
              {/* Image */}
              {/* flex-shrink-0 */}
              <div className=" w-36 h-36 ">
                <Image
                  width={100}
                  height={100}
                  src={item.image}
                  alt={item.name}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Details */}
              <div className="p-6 max-sm:pr-0 flex flex-col justify-center flex-1">
                <h2 className="text-base font-bold break-words max-w-[600px] max-sm:text-xs max-sm:w-48">
                  {item.name}
                </h2>
                <p className="mt-2 text-xs text-gray-500">{item.warranty}</p>
                <div className="mt-4 flex items-center gap-2">
                  <button className="flex items-center justify-center  gap-2    border  max-sm:w-[6rem] max-sm:h-[2rem] max-sm:px-1 px-3 py-3  rounded-lg bg-custom-gradient text-white w-[8rem] h-12 text-xs">
                    <FiPhone className="w-7 h-4" />
                    <p className="w-28 max-sm:text-[0.6rem]">{item.phone}</p>
                  </button>
                  <button className="flex items-center justify-center  gap-2  text-purple-500 border border-[#DC39FC] max-sm:w-[6rem] max-sm:h-[2rem] max-sm:px-0 px-3 py-3  rounded-lg hover:bg-purple-100 w-[8rem] h-12 text-xs ">
                    <FiMessageSquare />
                    <p className="max-sm:text-[0.45rem]"> Send Message</p>
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
