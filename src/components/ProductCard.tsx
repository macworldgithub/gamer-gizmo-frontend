import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import { toast } from "react-toastify";

const ProductCard = ({ product, seReftech, refetch, isColumn }: any) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.token);
  const id = useSelector((state: RootState) => state.user.id);

  const AddToLike = async (prodId: any) => {
    try {
      if (!token) {
        toast.error("Login To add to favourites");
        return;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/favourite/addToFavourite`,
        {
          userId: id?.toString(),
          productId: prodId.toString(),
        }
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        seReftech(!refetch);
      }
    } catch (err) {
      toast.error("Failed to add to favourites");
    }
  };

  const remove = async (prod: any) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/favourite/removeFavourite?userId=${id}&productId=${prod}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Successfully Deleted");
      seReftech(!refetch);
    } catch (err) {
      toast.error("Failed to add to favourites");
    }
  };

  return (
    <>
      {
        isColumn ? (
          <div>Hello world</div>
        ): (
          <div
          key={product.id}
          className={`flex-none relative  dark:bg-black dark:text-white shadow-md rounded-lg overflow-hidden border border-gray-200 w-[55%] max-sm:w-[30%] sm:w-[50%] md:w-[35%] lg:w-[18.5%] transition-transform duration-500  ease-in-out`}
        >
          <div
            onClick={() =>
              product.fav ? remove(product.id) : AddToLike(product.id)
            }
            className={`hover:cursor-pointer z-20 top-2 right-2 absolute ${
              product.fav ? "text-red-600" : "text-white "
            } hover:text-red-600`}
          >
            <MdFavorite size={24} className="max-sm:h-4" />
          </div>
          <div className="relative w-full h-24  bg-black max-sm:h-[50px]">
            {product?.images && (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product?.images[0]?.image_url}`}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="rounded-t-lg hover:scale-105 transition-all duration-300 mx-auto"
                onError={(e) => (e.currentTarget.src = "/gameIcon.png")}
              />
            )}
          </div>
    
          <div className="px-3 pb-[6px]">
            <h3 className="text-sm dark:text-white font-semibold text-gray-900 truncate max-md:text-xs max-sm:text-[8px] ">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 truncate max-md:text-[0.8rem] max-sm:text-[0.4rem]">
              {product.description}
            </p>
            <p className="text-purple-500 font-bold max-sm:text-[0.4rem]">
              {product.price} AED
            </p>
            <div className="flex items-center">
              <button
                onClick={() => {
                  router.push(`/product-details/${product.id}`);
                }}
                className="bg-btnGray font-bold flex justify-center items-center mx-auto dark:bg-white dark:text-black hover:text-white text-gray-500 mt-2 px-3 md:py-1 rounded-full text-xs hover:bg-purple-600 dark:hover:bg-purple-600"
              >
                <p className="max-sm:text-[5px]"> View Details</p>
              </button>
            </div>
          </div>
        </div>
        )
      }

    </>

  );
};

export default ProductCard;
