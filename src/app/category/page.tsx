"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
  icon?: any;
}

const Page: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const defaultIcon = "/images/pcParts.jpg";

  const router = useRouter();
  const categoryMapping: Record<string, { path: string; icon: string }> = {
    Desktops: { path: "/", icon: "/images/desktopImage.jpg" },
    Laptops: { path: "/laptops", icon: "/images/LaptopImage.png" },
    Components: { path: "/", icon: "/images/components.jpg" },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/categories/getAll"
        );
        if (response.data && response.data.data) {
          const fetchedCategories = response.data.data.map((category: any) => ({
            ...category,
            icon:
              category.icon ||
              categoryMapping[category.name]?.icon ||
              "/images/default.jpg",
          }));
          setCategories(fetchedCategories);
        } else {
          setCategories([]);
        }
      } catch (err) {
        setError("Failed to fetch categories.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    const targetCategory = categoryMapping[categoryName] || {
      path: "/",
      icon: "/images/default.jpg",
    };
    router.push(targetCategory.path);
  };

  return (
    <div className="w-full mx-auto px-4 py-8 dark:text-white bg-white dark:bg-secondaryBlack">
      <h1 className="text-center max-md:text-lg md:text-2xl font-bold">
        Hello, what are you listing today?
      </h1>
      <p className="text-center text-gray-500 dark:text-white max-md:text-sm mt-2">
        Select the area that best suits your ad
      </p>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-center text-red-500 mt-4">{error}</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-500 mt-4 dark:text-white">
          No categories found.
        </p>
      ) : (
        <div className="md:w-[50rem] max-md:w-[20rem] mx-auto grid max-md:grid-cols-2 md:grid-cols-3  gap-4 mt-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center justify-center border  hover:bg-gray-200 dark:hover:bg-gray-400  border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer transition duration-200"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative  max-md:w-16 max-md:h-16 md:w-32 md:h-32  max-md:mb-0 md:mb-4 ">
                <Image
                  src={category.icon}
                  alt={category.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg bg-none bg-opacity-0"
                />
              </div>
              <h2 className="md:text-lg max-md:text-sm font-medium text-gray-800 max-md:mt-0 md:mt-4 dark:text-white truncate">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
