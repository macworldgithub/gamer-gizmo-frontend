"use client";

import Wrapper from "@/components/Common/Wrapper/Wrapper";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

//@ts-ignore
const ProductGrid = () => {
  const { category } = useParams();
  //@ts-ignore
  const decodedCategory = decodeURIComponent(category || ""); // Decode URL encoding
  const categoryId = decodedCategory.split("=")[1] || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();
  const router = useRouter();
  const categoryNamesMap: Record<string, string> = {
    "1": "Laptops",
    "2": "Gaming PCS",
    "3": "Components",
    "4": "Gaming Consoles",
  };

  const categoryName = categoryNamesMap[categoryId] || "Unknown Category";
  console.log("Resolved Category Name:", categoryName);

  console.log(categoryName, "ojl");

  useEffect(() => {
    //@ts-ignore
    // const id = category?.split("D") ? category?.split("D")[1] : 1;
    const id = categoryId;
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll`,
          {
            params: {
              category_id: id,
              is_store_product: "true",
            },
          }
        );
        setProducts(response.data?.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className=" dark:bg-[#1e1e2f]">
      <Wrapper>
        <div className="w-full mx-auto mt-3 mb-4 ">
          <h1 className="font-bold mb-2 ml-1 dark:text-white text-black">
            {categoryName}
          </h1>
          <div className="flex flex-wrap  md:gap-2 sm:gap-[0.3rem] max-sm:gap-[0.6rem] text-black">
            {products.map((product: any) => (
              <div
                key={product.id}
                className=" dark:bg-black w-56 max-sm:w-40 sm:w-44 md:w-48 rounded-lg shadow-lg p-4 max-md:p-2 relative border border-gray-300 text-black"
              >
                <Image
                  src={
                    product.images?.length > 0
                      ? `${product.images[0].image_url}`
                      : "/gameIcon.webp"
                  }
                  alt={product.name}
                  width={100}
                  height={100}
                  className="w-full h-28 max-sm:h-16 rounded mx-auto"
                />

                <h3 className="text-sm max-md:text-[0.5rem] text-black dark:text-white w-full truncate font-medium">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-[0.6rem] truncate w-full">
                  {product.description}
                </p>
                <p className="text-purple-500 font-bold text-[0.6rem]">
                  AED {product.price}
                </p>
                <button
                  onClick={() => router.push(`/product-details/${product.id}`)}
                  className=" dark:bg-gray-300 bg-custom-gradient md:text-[0.6rem] sm:text-[0.7rem] max-sm:text-[0.4rem] flex justify-center items-center text-white px-2 py-1 max-sm:px-[0.25rem]  rounded-full"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductGrid;
