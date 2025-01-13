import Wrapper from "@/components/Common/Wrapper/Wrapper";
import Image from "next/image";
import React from "react";

const categories = [
  {
    id: 1,
    image: "/images/used-pc.png",
    title: "Used Gaming PC Parts",
  },
  {
    id: 2,
    image: "/images/newConsoles.png",
    title: "Used Gaming Consoles",
  },
  { id: 3, image: "/images/usedDesktops.png", title: "Used Desktop" },
  {
    id: 4,
    image: "/images/usedAccessories.png",
    title: "Used Gaming Accessories",
  },
  { id: 5, image: "/images/usedLaptops.png", title: "Used Laptops" },
  { id: 6, image: "/images/usedLaptops.png", title: "New Laptops" },
  { id: 7, image: "/images/newGamingParts.png", title: "New Gaming PC Parts" },
  { id: 8, image: "/images/newConsoles.png", title: "New Gaming Consoles" },
  { id: 9, image: "/images/usedAccessories.png", title: "New Gaming Accessories" },
  { id: 10, image: "/images/newDesktops.png", title: "New Desktops" },
  {
    id: 11,
    image: "/images/customization.png",
    title: "Customization & Gaming Gears",
  },
];

const MobileCategories = () => {
  return (
    <Wrapper>
      <div className="w-full flex justify-center py-10  h-auto  md:hidden">
        <div className="w-full  grid grid-cols-3 gap-4 dark:border shadow-lg bg-[#FFFFFF] rounded-lg p-6 dark:bg-black dark:border-[#6345ED] sm:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center text-center  rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-black"
            >
              <Image
                src={category.image}
                alt={category.title}
                width={34}
                height={34}
                // className="mb-4 sm:w-10 sm:h-10 md:w-14 md:h-14"
              />
              <h3 className="font-medium text-black dark:text-white text-[0.7rem] mt-1">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default MobileCategories;
