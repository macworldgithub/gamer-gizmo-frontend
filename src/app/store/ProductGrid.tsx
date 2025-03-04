"use client";

import Wrapper from "@/components/Common/Wrapper/Wrapper";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  images: ProductImage[];
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <Wrapper>
      <div className="w-full  mx-auto mt-3 mb-4">
        {products.length === 0 ? (
          <p className="text-center text-gray-400">No products available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-2 sm:gap-[0.3rem] max-sm:gap-[0.6rem] ">
            {products.map((product) => (
              <div
                key={product?.id}
                className="dark:bg-black  rounded-lg shadow-lg p-4 max-md:p-2 relative border border-gray-300"
              >
                <Image
                  src={
                    product.images?.length > 0
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.images[0].image_url}`
                      : "/gameIcon.png"
                  }
                  alt={product.name || "Product image"}
                  width={100}
                  height={100}
                  className="w-full h-32 max-sm:h-16   rounded mx-auto"
                />

                <h3 className="text-sm max-md:text-[0.5rem] text-black dark:text-white w-full truncate  font-medium mt-1">
                  {product?.name}
                </h3>
                <p className="text-gray-400   text-[0.6rem]  truncate w-full">
                  {product?.description}
                </p>
                <p className="text-purple-500 font-bold mt-1 text-[0.6rem]">
                  ${product.price}
                </p>
                <button className="mt-1 dark:bg-gray-300 bg-custom-gradient md:text-[0.5rem]  sm:text-[0.7rem] max-sm:text-[0.45rem] flex justify-center items-center text-white p-1 max-sm:p-[0.15rem] rounded-full">
                  View Details
                </button>
                {/* <button className="absolute top-3 right-3 text-white">
                  ❤️
                </button> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ProductGrid;
