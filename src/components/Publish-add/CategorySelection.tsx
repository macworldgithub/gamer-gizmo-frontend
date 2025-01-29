import React from "react";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";

interface Category {
  id: number;
  name: string;
  icon?: string;
}
const CategorySelection = ({ setSelectedCategory, selectCategory }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.user.token);
  const categoryIconMapping: Record<string, string> = {
    Desktops: "/images/desktopImage.jpg",
    Laptops: "/images/LaptopImage.png",
    Components: "/images/components.jpg",
    Accessories: "/images/accessories.jpg",
    Default: "/images/default.jpg",
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.data) {
        setCategories(response.data.data);
      } else {
        setCategories([]);
      }
    } catch (err) {
      setCategoryError("Failed to fetch categories.");
    } finally {
      setLoadingCategories(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="w-full text-black  text-center">
      <h2 className="text-lg font-bold">Select Category</h2>
      {loadingCategories ? (
        <p>Loading categories...</p>
      ) : categoryError ? (
        <p className="text-red-500">{categoryError}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 max-sm:w-[70%] sm:w-[60%]  md:w-full lg:w-[80%] xl:w-[60%] max-sm:gap-3 gap-14 mt-6 mx-auto">
          {categories.map((category) => (
            <div
              key={category?.id}
              onClick={() => {
                setSelectedCategory(category);
              }}
              className={clsx(
                "p-2 border rounded-lg cursor-pointer text-center",
                selectCategory.id === category.id
                  ? "bg-custom-gradient text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-400"
              )}
            >
              <div className="relative w-36 h-36 max-md:w-28 max-md:h-28 max-sm:h-16 max-sm:w-16 mx-auto mb-4">
                <img
                  src={
                    category?.icon ||
                    categoryIconMapping[category.name] ||
                    categoryIconMapping["Default"]
                  }
                  alt={category.name}
                  className="rounded-lg object-contain w-full h-full"
                />
              </div>
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelection;
