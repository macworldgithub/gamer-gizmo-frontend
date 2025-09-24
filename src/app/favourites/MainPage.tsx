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
import { useRouter } from "next/navigation";

export default function MainPage() {
  const [favorites, setFavorites] = useState([]);

  const token = useSelector((state: RootState) => state.user.token);
  const [loading, setLoading] = useState(false);
  const id = useSelector((state: RootState) => state.user.id);
  const router = useRouter();

  const fetch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/favourite/getAll?userId=${id}`,
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
      <div className="lg:p-6 w-full max-lg:p-0 dark:bg-secondaryBlack bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
          All Favorites
        </h1>

        {/* Check if there are any favorites */}
        {favorites.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg text-black  font-medium">
              No favorites found.
            </p>
            <p className="text-sm">
              Start adding products to your favorites to see them here!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {favorites.map((item: any) => (
              <div
                key={item.id}
                className="flex shadow-lg flex-row items-start p-4 rounded-lg w-full dark:bg-bluishBorder"
                // onClick={() =>
                //   router.push(
                //     `/products/${encodeURIComponent(
                //       item.product_name.replace(/\s+/g, "-").toLowerCase()
                //     )}/${item.product_id}`
                //   )
                // }
                onClick={() =>
                  router.push(
                    `/products/${encodeURIComponent(
                      item.product.name.replace(/\s+/g, "-").toLowerCase()
                    )}/${item.product_id}`
                  )
                }
              >
                {/* Image */}
                <div className="w-36 h-36">
                  <Image
                    width={100}
                    height={100}
                    src={
                      item?.product &&
                      `${item?.product?.product_images[0].image_url}`
                    }
                    alt={item.product.name}
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Details */}
                <div className="p-6 max-sm:pr-0 flex flex-col justify-center flex-1">
                  <h2 className="text-base font-bold break-words max-w-[600px] max-sm:text-xs max-sm:w-48 text-black cursor-pointer hover:text-secondaryColorLight">
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
                    {/* <button className="flex items-center justify-center gap-2 border max-sm:w-[6rem] max-sm:h-[2rem] max-sm:px-1 px-3 py-3 rounded-lg bg-custom-gradient text-white w-[8rem] h-12 text-xs">
                      <FiPhone className="w-7 h-4" />
                      <p className="w-28 max-sm:text-[0.6rem]">
                 
                        {item.product.users.phone}
                      </p>
                    </button> */}

                    <a href={`tel:${item.product.users.phone}`}>
                      <button className="flex items-center justify-center gap-2 border max-sm:w-[6rem] max-sm:h-[2rem] max-sm:px-1 px-3 py-3 rounded-lg bg-custom-gradient text-white w-[8rem] h-12 text-xs">
                        <FiPhone className="w-7 h-4" />
                        <p className="w-28 max-sm:text-[0.6rem]">
                          {item.product.users.phone}
                        </p>
                      </button>
                    </a>
                  </div>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(item.product_id);
                  }}
                  className="text-red-700 text-4xl flex justify-center items-center cursor-pointer"
                >
                  <IoIosRemoveCircleOutline />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {loading && <CustomLoader />}
    </Wrapper>
  );
}
