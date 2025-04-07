import Wrapper from "@/components/Common/Wrapper/Wrapper";
import Image from "next/image";
import React from "react";

const categories = [
  {
    id: 1,
    image: "/images/Used Gaming PC Parts.png",
    title: "Used Components and accessories",
  },
  {
    id: 2,
    image: "/images/Used Gaming Consoles.png",
    title: "Used Gaming Consoles",
  },
  { id: 3, image: "/images/Used Desktop.png", title: "Used Desktop" },
  { id: 4, image: "/images/Gaming4.png", title: "Used Gaming Accessories" },
  { id: 5, image: "/images/laptop5.png", title: "Used Laptop" },
  {
    id: 6,
    image: "/images/pc_part6.png",
    title: "New Components and accessories",
  },
  { id: 7, image: "/images/console7.png", title: "New Gaming Consoles" },
  { id: 8, image: "/images/desktop8.png", title: "New Desktops" },
  {
    id: 9,
    image: "/images/setting9.png",
    title: "Customization & Gaming Gears",
  },
];

const GamingCategories = () => {
  return (
    <div className="w-full flex justify-center py-10 bg-gray-50 h-auto dark:bg-black max-lg:w-[90%] max-lg:mx-auto">
      <div className="w-full max-w-6xl grid grid-cols-3 gap-6 border bg-[#FFFFFF] rounded-lg p-6 dark:bg-black dark:border-[#6345ED] sm:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center text-center p-4 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-black"
          >
            <Image
              src={category.image}
              alt={category.title}
              width={48}
              height={48}
              className="mb-4 sm:w-10 sm:h-10 md:w-14 md:h-14 "
            />
            <h3 className="text-sm font-medium text-[#14161B] dark:text-white sm:text-xs md:text-sm">
              {category.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamingCategories;
