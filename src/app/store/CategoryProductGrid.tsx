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
        setProducts(response.data?.data?.slice(0, 4) || []);
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
    <Wrapper>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-bold  dark:text-white">{categoryName}</h2>

        {products.length > 0 && (
          <button
            className="bg-custom-gradient rounded-full w-10 h-10 max-lg:w-6 max-lg:h-6 hover:bg-purple-700"
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

      <div className="flex justify-between items-center mb-6">
  {products.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product: any) => (
        <div
          key={product.id}
          className="dark:bg-black rounded-lg shadow-lg p-4 border border-gray-300"
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
            className="w-full h-32 rounded mx-auto"
          />
          <h3 className="text-sm text-black dark:text-white w-full truncate font-medium mt-1">
            {product.name}
          </h3>
          <p className="text-gray-400 text-xs truncate">
            {product.description}
          </p>
          <p className="text-purple-500 font-bold mt-1 text-xs">
            ${product.price}
          </p>
          <button className="mt-1 bg-custom-gradient text-white p-1 rounded-full text-xs w-full">
            View Details
          </button>
        </div>
      ))}
    </div>
  ) : (
      
      <p className="text-red-500 text-xs mt-2">No products available
         for {categoryName}
      </p>
  )}
</div>

    </Wrapper>
  );
};

export default CategoryProductGrid;
