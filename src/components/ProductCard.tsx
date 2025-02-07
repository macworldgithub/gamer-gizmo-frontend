import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import { toast } from "react-toastify";
const ProductCard = ({ product, seReftech, refetch }: any) => {
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
      if (response.status == 201) {
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
      toast.success("SuccessFully Deleted");
      seReftech(!refetch);
    } catch (err) {
      toast.error("Failed to add to favourites");
    }
  };
  console.log(product, "product");
  return (
    <div
      key={product.id}
      className={`flex-none relative dark:bg-black dark:text-white shadow-md rounded-lg overflow-hidden border border-gray-200 w-[55%] max-sm:w-[23%]  sm:w-[40%] md:w-[35%] lg:w-[18.5%] transition-transform duration-500 ease-in-out`}
    >
      <div
        onClick={() =>
          product.fav ? remove(product.id) : AddToLike(product.id)
        }
        className={`hover:cursor-pointer  z-20 top-2 right-2 absolute ${
          product.fav ? "text-red-600" : "text-white "
        } hover:text-red-600`}
      >
        <MdFavorite size={24} className="max-sm:h-4" />
      </div>
      <div className="relative w-full h-24  bg-black max-sm:h-[2.2rem]">
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

      <div className="p-3  max-sm:pt-0">
        <h3 className="text-sm dark:text-white font-semibold text-gray-900 truncate max-md:text-xs max-sm:text-[0.6rem] max-sm:mb-0">
          {product.name}
        </h3>
        <p className="text-xs texzt-gray-500 mt-1 max-sm:my-0 truncate max-md:text-[0.8rem] max-sm:text-[0.4rem]">
          {product.description}
        </p>
        <p className="text-purple-500 font-bold   max-sm:text-[0.4rem]">
          {product.price} AED
        </p>
        <div className="flex items-center">
          <button
            onClick={() => {
              router.push(`/product-details/${product.id}`);
            }}
            className="bg-btnGray font-bold flex justify-center items-center mx-auto dark:bg-white dark:text-black hover:text-white text-gray-500 mt-2 max-sm:mt-0 px-3 py-1 rounded-full text-xs hover:bg-purple-600 max-md:w-[3rem] max-sm:h-4 max-md:py-0.5 max-sm:w-[4rem] max-sm:py-0.1 "
          >
            <p className="max-sm:text-[0.4rem]"> View Details</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
