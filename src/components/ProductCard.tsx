import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
const ProductCard = ({ product }: any) => {
  const [isFav, setIsFav] = useState(true);
  const router = useRouter();
  return (
    <div
      key={product.id}
      className={`flex-none relative dark:bg-black dark:text-white shadow-md rounded-lg overflow-hidden border border-gray-200 w-[55%] max-sm:w-[23%]  sm:w-[40%] md:w-[35%] lg:w-[18.5%] transition-transform duration-500 ease-in-out  ${"shadow-xl shadow-white bg-white"}`}
    >
      <div
        className={
          "hover:cursor-pointer z-20 top-2 right-2 absolute hover:text-red-600"
        }
      >
        <MdFavorite size={24} />
      </div>
      <div className="relative w-full h-32  bg-black max-sm:h-[2.2rem]">
        {product?.images && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${
              product?.images[0]?.image_url || "/logo.png"
            }`}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg hover:scale-105 transition-all duration-300 mx-auto"
          />
        )}
      </div>

      <div className="p-3  max-sm:pt-0">
        <h3 className="text-sm dark:text-white font-semibold text-gray-900 truncate max-md:text-xs max-sm:text-[0.6rem] max-sm:mb-0">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 max-sm:my-0 truncate max-md:text-[0.8rem] max-sm:text-[0.4rem]">
          {product.description}
        </p>
        <p className="text-purple-500 font-bold mt-2 sm:mt-1 max-sm:mt-0   max-sm:text-[0.4rem]">
          {product.price} AED
        </p>
        <div className="flex items-center">
          <button
            onClick={() => {
              router.push(`/product-details/${product.id}`);
            }}
            className="bg-btnGray font-bold flex justify-center items-center mx-auto dark:bg-white dark:text-black hover:text-white text-gray-500 mt-2 max-sm:mt-0 px-3 py-1 rounded-full text-xs hover:bg-purple-600 max-md:w-[3rem] max-sm:h-4 max-md:py-0.5 max-sm:w-[2.1rem] max-sm:py-0.1 max-sm:text-[0.6rem]"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
