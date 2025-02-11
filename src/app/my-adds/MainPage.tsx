"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiPhone, FiMessageSquare } from "react-icons/fi";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import { RootState } from "@/components/Store/Store";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import CustomLoader from "@/components/CustomLoader";

export default function MainPage() {
  const [favorites, setFavorites] = useState([]);
  const token = useSelector((state: RootState) => state.user.token);
  const [loading, setLoading] = useState(false);
  const id = useSelector((state: RootState) => state.user.id);
  const fetch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/getUserProducts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);

      console.log(response.data.data, "pak");
      setFavorites(response.data.data);
    } catch (err) {
      setLoading(false);

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
      console.log(response.data.data, "pak");
      toast.success("SuccessFully Deleted");
      fetch();
    } catch (err) {
      toast.error("Failed to add to favourites");
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Wrapper className="max-sm:pr-0">
      <div className="lg:p-6 w-full  max-lg:p-0">
        <h1 className="text-2xl font-bold mb-6">Your Ads</h1>
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg py-2 px-4 w-[30%] max-sm:w-52"
          />
        </div>

        {/* Favorites List */}
        <div className="flex flex-col gap-6">
          {favorites.map((item) => (
            <div
              // @ts-expect-error
              key={item.id}
              className="flex flex-row items-start p-4 rounded-lg w-full"
            >
              {/* Image */}
              {/* flex-shrink-0 */}
              <div className=" w-36 h-36 ">
                <Image
                  width={100}
                  height={100}
                  src={
                    // @ts-expect-error
                    item?.product &&
                    // @ts-expect-error
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${item?.product?.product_images[0].image_url}`
                  }
                  // @ts-expect-error
                  alt={item.product.name}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Details */}
              <div className="p-6 max-sm:pr-0 flex flex-col justify-center flex-1">
                <h2 className="text-base font-bold break-words max-w-[600px] max-sm:text-xs max-sm:w-48">
                  {/* @ts-ignore */}
                  {item.product.name}
                </h2>
                <h2 className="text-base font-bold text-purple-800 break-words max-w-[600px] max-sm:text-xs max-sm:w-48">
                  {/* @ts-ignore */}
                  {item.product.categories.name}
                </h2>
                <p className="mt-2 text-xs text-gray-500">
                  {/* @ts-ignore */}
                  {item.product.description.slice(0, 120)} ...
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <button className="flex items-center justify-center  gap-2    border  max-sm:w-[6rem] max-sm:h-[2rem] max-sm:px-1 px-3 py-3  rounded-lg bg-custom-gradient text-white w-[8rem] h-12 text-xs">
                    <FiPhone className="w-7 h-4" />
                    <p className="w-28 max-sm:text-[0.6rem]">
                      {/* @ts-expect-error */}
                      {item.product.users.phone}
                    </p>
                  </button>
                  <button className="flex items-center justify-center  gap-2  text-purple-500 border border-[#DC39FC] max-sm:w-[6rem] max-sm:h-[2rem] max-sm:px-0 px-3 py-3  rounded-lg hover:bg-purple-100 w-[8rem] h-12 text-xs ">
                    <FiMessageSquare />
                    <p className="max-sm:text-[0.45rem]"> Send Message</p>
                  </button>
                </div>
              </div>
              <div
                // @ts-expect-error
                onClick={() => remove(item.product_id)}
                className="text-red-700 text-4xl flex justify-center items-center cursor-pointer"
              >
                <IoIosRemoveCircleOutline />
              </div>
            </div>
          ))}
        </div>
      </div>
      {loading && <CustomLoader />}
    </Wrapper>
  );
}
