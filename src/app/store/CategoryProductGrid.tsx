"use client";

import Wrapper from "@/components/Common/Wrapper/Wrapper";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CategoryProductGrid = ({
  categoryId,
  categoryName,
}: {
  categoryId: number;
  categoryName: string;
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll`,
          {
            params: {
              category_id: categoryId,
              is_store_product: "true",
            },
          }
        );
        setProducts(response.data?.data?.slice(0, 6) || []);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Wrapper className="max-md:mx-0 max-md:px-0">
      <div className="w-full flex items-center justify-between mt-[0.8rem] mb-1 ">
        <h2 className="text-xl max-sm:text-sm font-bold text-black dark:text-white">
          {categoryName}
        </h2>

        {products.length > 0 && (
          <button
            className="bg-custom-gradient rounded-full w-10 h-10  max-lg:w-6 max-lg:h-6 hover:bg-purple-700"
            onClick={() => router.push(`/store/category=${categoryId}`)}
          >
            <Image
              src="/images/arrowRight.png"
              alt="Right Arrow"
              width={20}
              height={25}
              className="mx-auto max-lg:w-[10px] max-lg:h-[10px]"
            />
          </button>
        )}
      </div>

      <div className="flex w-full justify-between items-center mb-1 ">
        {products.length > 0 ? (
          <div className="flex overflow-x-hidden gap-4 w-[100%] max-md:gap-1">
            {products.map((product: any) => (
              <div
                key={product.id}
                className="flex-shrink-0 dark:bg-black  max-sm:w-[34%] sm:w-[28%] md:w-52 lg:w-44  rounded-lg shadow-lg md:p-2 max-sm:p-1 sm:p-2 border border-gray-300 "
              >
                <Image
                  src={
                    product.images?.length > 0
                      ? `${product.images[0].image_url}`
                      : "/gameIcon.webp"
                  }
                  alt={product.name || "Product image"}
                  width={100}
                  height={100}
                  className=" md:h-24 rounded mx-auto max-sm:h-16 sm:h-20 md:w-40 sm:w-32"
                />
                <h3 className="md:text-xs max-sm:text-[0.6rem] sm:text-[0.8rem] text-black dark:text-white w-full truncate font-medium ">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-xs truncate">
                  {product.description}
                </p>
                <p className="text-purple-500 font-bold  text-xs">
                  AED {product.price}
                </p>
                <button
                  className="mt-1 max-md:w-20 max-md:h-6  md:w-20 bg-custom-gradient text-white p-1 rounded-full text-xs w-full "
                  onClick={() => router.push(`/product-details/${product.id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-xs mt-2">
            No products to display
            {/* for {categoryName} */}
          </p>
        )}
      </div>
    </Wrapper>
  );
};

export default CategoryProductGrid;
