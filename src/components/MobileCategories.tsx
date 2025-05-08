import Wrapper from "@/components/Common/Wrapper/Wrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const categories = [
  { id: 1, image: "/images/newDesktops.webp", title: "Used Gaming PCs" },
  { id: 2, image: "/images/usedLaptops.webp", title: "Used Laptops" },
  {
    id: 3,
    image: "/images/used-pc.webp",
    title: "Used Components and Accessories",
  },
  { id: 4, image: "/images/newConsoles.webp", title: "Used Gaming Consoles" },
  { id: 5, image: "/images/newDesktops.webp", title: "New Gaming PCs" },
  { id: 6, image: "/images/usedLaptops.webp", title: "New Laptops" },
  {
    id: 7,
    image: "/images/newGamingParts.webp",
    title: "New Components and Accessories",
  },
  { id: 8, image: "/images/newConsoles.webp", title: "New Gaming Consoles" },
];

const categoryMap = {
  "Gaming PCs": "desktop",
  Laptops: "laptops",
  "Components and Accessories": "components",
  "Gaming Consoles": "console",
} as const;

const getCategoryLink = (category: string): string => {
  const isNew = category.startsWith("New");
  const condition = isNew ? 1 : 2;

  // Find matching category name
  const categoryName = (
    Object.keys(categoryMap) as (keyof typeof categoryMap)[]
  ).find((key) => category.includes(key));

  return categoryName
    ? `/${categoryMap[categoryName]}?condition=${condition}`
    : "#";
};

const MobileCategories = () => {
  return (
    <Wrapper>
      <div className="w-full flex justify-center pb-2 h-auto md:hidden">
        <div className="w-full grid grid-cols-3 gap-4 dark:border shadow-lg bg-[#FFFFFF] rounded-lg p-1 dark:bg-black dark:border-[#6345ED] sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={getCategoryLink(category.title)}
              className="flex flex-col items-center text-center rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-black"
            >
              <Image
                src={category.image}
                alt={category.title}
                width={40}
                height={34}
              />
              <h3 className=" text-black dark:text-white text-[0.6rem] ">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default MobileCategories;
