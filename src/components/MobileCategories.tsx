import Wrapper from "@/components/Common/Wrapper/Wrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const categories = [
  { id: 1, image: "/images/used-pc.png", title: "Used Gaming PC Parts" },
  { id: 2, image: "/images/newConsoles.png", title: "Used Gaming Consoles" },
  { id: 3, image: "/images/usedDesktops.png", title: "Used Gaming PCs" },
  { id: 4, image: "/images/usedLaptops.png", title: "Used Laptops" },
  { id: 5, image: "/images/usedLaptops.png", title: "New Laptops" },
  { id: 6, image: "/images/newGamingParts.png", title: "New Gaming PC Parts" },
  { id: 7, image: "/images/newConsoles.png", title: "New Gaming Consoles" },
  { id: 8, image: "/images/newDesktops.png", title: "New Gaming PCs" },
];

const categoryMap = {
  "Gaming PCs": "desktop",
  Laptops: "laptops",
  "Gaming PC Parts": "usedparts",
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
      <div className="w-full flex justify-center py-10 h-auto md:hidden">
        <div className="w-full grid grid-cols-3 gap-4 dark:border shadow-lg bg-[#FFFFFF] rounded-lg p-6 dark:bg-black dark:border-[#6345ED] sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={getCategoryLink(category.title)}
              className="flex flex-col items-center text-center rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-black"
            >
              <Image
                src={category.image}
                alt={category.title}
                width={34}
                height={34}
              />
              <h3 className="font-medium text-black dark:text-white text-[0.7rem] mt-1">
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
