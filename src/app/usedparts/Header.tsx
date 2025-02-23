"use client";
import PageHeader from "@/components/PageHeader";
import React from "react";
import Image from "next/image";
// import PopularItemSection from "@/components/PopularItemSection";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import Inspection from "@/components/Inspection";
import SelectLabels from "@/components/SelectLabels";
import CardItem from "./CardItem";

const usedConsoles = [
  {
    id: 1,
    name: "Radeon RX 580 OC...",
    description: "Powerful graphics card for gaming...",
    price: "AED 551.00",
    imageUrl: "/images/gpu.png",
  },
  {
    id: 2,
    name: "Asus ROG Hyperion...",
    description: "High-performance computer case...",
    price: "AED 1914.95",
    imageUrl: "/images/gpu2.png",
  },
  {
    id: 3,
    name: "MSI PRO B760M-E...",
    description:
      "The PRO Series is tailored to professionals from all walks of life. The lineup features... ",
    price: "AED 1914.95",
    imageUrl: "/images/gpu3.png",
  },
  {
    id: 4,
    name: "Bloody W95 Max RGB",
    description:
      "The A4Tech W95 Max Bloody mouse is the optimal solution for those looking for a high-quality and productive mouse",
    price: "AED 1914.95",
    imageUrl: "/images/gpu4.png",
  },
  {
    id: 5,
    name: "Corsair VENGEANCE",
    description:
      "CORSAIR VENGEANCE RGB PRO Series DDR4 overclocked memory lights up your PC with mesmerizing ...",
    price: "AED 1914.95",
    imageUrl: "/images/gpu5.png",
  },
  {
    id: 1,
    name: "Radeon RX 580 OC...",
    description: "Powerful graphics card for gaming...",
    price: "AED 551.00",
    imageUrl: "/images/gpu.png",
  },
  {
    id: 2,
    name: "Asus ROG Hyperion...",
    description: "High-performance computer case...",
    price: "AED 1914.95",
    imageUrl: "/images/gpu2.png",
  },
  {
    id: 3,
    name: "MSI PRO B760M-E...",
    description:
      "The PRO Series is tailored to professionals from all walks of life. The lineup features... ",
    price: "AED 1914.95",
    imageUrl: "/images/gpu3.png",
  },
  {
    id: 4,
    name: "Bloody W95 Max RGB",
    description:
      "The A4Tech W95 Max Bloody mouse is the optimal solution for those looking for a high-quality and productive mouse",
    price: "AED 1914.95",
    imageUrl: "/images/gpu4.png",
  },
  {
    id: 5,
    name: "Corsair VENGEANCE",
    description:
      "CORSAIR VENGEANCE RGB PRO Series DDR4 overclocked memory lights up your PC with mesmerizing ...",
    price: "AED 1914.95",
    imageUrl: "/images/gpu5.png",
  },
  {
    id: 1,
    name: "Radeon RX 580 OC...",
    description: "Powerful graphics card for gaming...",
    price: "AED 551.00",
    imageUrl: "/images/gpu.png",
  },
  {
    id: 2,
    name: "Asus ROG Hyperion...",
    description: "High-performance computer case...",
    price: "AED 1914.95",
    imageUrl: "/images/gpu2.png",
  },
  {
    id: 3,
    name: "MSI PRO B760M-E...",
    description:
      "The PRO Series is tailored to professionals from all walks of life. The lineup features... ",
    price: "AED 1914.95",
    imageUrl: "/images/gpu3.png",
  },
  {
    id: 4,
    name: "Bloody W95 Max RGB",
    description:
      "The A4Tech W95 Max Bloody mouse is the optimal solution for those looking for a high-quality and productive mouse",
    price: "AED 1914.95",
    imageUrl: "/images/gpu4.png",
  },
  {
    id: 5,
    name: "Corsair VENGEANCE",
    description:
      "CORSAIR VENGEANCE RGB PRO Series DDR4 overclocked memory lights up your PC with mesmerizing ...",
    price: "AED 1914.95",
    imageUrl: "/images/gpu5.png",
  },
];

const Header = () => {
  return (
    <div className="bg-white dark:bg-black">
      {/* Page Header */}
      <PageHeader pageName="Used-Gaming-PC-Parts" title="Gaming PCs Parts" />

      {/* Main Content */}
      <div className=" lg:py-28 max-lg:py-4 bg-[#F9F9F9] h-auto dark:bg-secondaryBlack dark:text-white">
        <div className="flex flex-col lg:flex-row relative justify-around items-center max-w-6xl mx-auto space-y-8 md:space-y-0">
          <div className=" lg:absolute -top-44 lg:mt-3">
            <SelectLabels />
          </div>
          {/* Free Ad Section */}
          <div className="dark:bg-secondaryBlack  dark:text-white text-gray-800  flex justify-center gap-3 max-md:flex-col max-md:items-center">
            <div className="text-center">
              <div className="flex justify-center mb-3  ">
                <Image
                  src="/images/adds.png"
                  alt="Free Ad"
                  width={50}
                  height={50}
                />
              </div>
              <h3 className="md:text-xl font-semibold max-md:text-lg">
                Free Ad
              </h3>
              <p className=" md:text-base max-md:text-xs break-words md:max-w-xs max-md:px-8">
                Post your ads for free in 30 seconds at a better price.
              </p>
            </div>

            {/* Genuine Buyer Section */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Image
                  src="/images/handshake.png"
                  alt="Genuine Buyer"
                  width={50}
                  height={50}
                />
              </div>
              <h3 className="md:text-xl font-semibold max-md:text-lg">
                Genuine Buyer
              </h3>
              <p className="text-gray-600 dark:text-white md:text-base max-md:text-xs break-words md:max-w-xs max-md:px-8">
                Get authentic offers from verified buyers at a better price.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Image
                  src="/images/adds.png"
                  alt="Sell Faster"
                  width={50}
                  height={50}
                />
              </div>
              <h3 className="md:text-xl font-semibold max-md:text-lg">
                Sell Faster
              </h3>
              <p className="text-gray-600 dark:text-white md:text-base max-md:text-xs break-words md:max-w-xs max-md:px-8">
                Sell your product faster than others at a better price.
              </p>
            </div>
          </div>

          {/* Call-to-Action Button */}
          <div className="text-center">
            <button className="bg-custom-gradient text-white  w-36 h-12 rounded-full shadow-md text-sm ">
              Sell Your Product
            </button>
          </div>
        </div>
      </div>
      <div className="py-10  dark:bg-black">
        <Wrapper>
          <div className="w-full h-auto dark:bg-black">
            <CardItem
              title="Popular in New Gaming PC Parts"
              subtitle="Choose your necessary gaming items from this category."
              products={usedConsoles}
              onExplore={() => console.log("Explore Used Consoles")}
              explorePath=""
            />
          </div>
        </Wrapper>
      </div>
      <Inspection />
    </div>
  );
};

export default Header;
