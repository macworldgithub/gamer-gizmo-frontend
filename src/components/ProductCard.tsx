"use client"
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { formatDistanceToNow } from "date-fns";

type ProductImage = {
  id: number;
  product_id: number;
  image_url: string;
  created_at: string;
};

type Product = {
  images: string[];
};

const ProductCard = ({ product, seReftech, refetch, isColumn, hasPremiumBadge }: any) => {


  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(product, "my product");
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.token);
  const id = useSelector((state: RootState) => state.user.id);


  useEffect(() => {
    console.log("Active Index Updated:", activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (thumbsSwiper) {
      setThumbsSwiper(thumbsSwiper);
    }
  }, [thumbsSwiper]);

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

  //@ts-ignore
  const getImageUrl = (imgUrl) => {
    return imgUrl.startsWith("http")
      ? imgUrl
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${imgUrl}`;
  };
  const productImages = useMemo(() => product?.images || [], [product]);

  return (
    <>
      {isColumn ? (
        <div>
          <div className="flex flex-col md:flex-row p-4 w-full">
            <div className="relative max-md:w-80  md:w-[26%]">
      
              <Swiper
                key={product?.id}

                modules={[Pagination, Autoplay, Thumbs]}
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  waitForTransition: false,
                }}
                loop={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="rounded-lg overflow-hidden"
              >
                {productImages.map((img: ProductImage, index: number) => {
                  const imageUrl = getImageUrl(img?.image_url);
                  console.log("Image URL:", imageUrl);

                  return (
                    <SwiperSlide key={index}>
                      <div className="max-md:w-[200px] mx-auto  max-md:h-[200px] md:w-[300px] md:h-[200px] relative">
                        <Image
                          src={imageUrl}
                          // src={'/images/amazon.png'}
                          alt={`Product image ${index + 1}`}
                          layout="fill"

                          className="rounded-lg bg-gray-200"
                          onLoadingComplete={() => console.log(`Loaded: ${imageUrl}`)}
                          onError={(e) => {
                            console.error("Image failed to load:", imageUrl);
                            e.currentTarget.src = "/gameIcon.png";
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}

              </Swiper>

              {/* Favorite Icon */}
              <div
                onClick={() =>
                  product.fav ? remove(product.id) : AddToLike(product.id)
                }
                className={`absolute top-2 right-2  z-10 cursor-pointer ${product.fav ? "text-red-600 " : "text-purple-200"
                  } hover:text-red-600 `}
              >
                <MdFavorite size={24} className="" />
              </div>
            </div>

            {/* Right Side - Car Details */}
            <div className="w-full md:w-[40%] md:pl-12  flex flex-col ">
              {/* Car Info */}
              <div className="flex flex-col gap-1 max-md:mx-auto md:mx-0">
                <div className="flex justify-between items-center">
                <p className="text-black font-bold max-md:text-sm dark:text-white md:text-xl ">
                  {product.name}
                </p>
                {hasPremiumBadge && (
                <span className=" bg-yellow-500 max-md:hidden text-white text-[0.6rem] font-bold p-1  rounded">
                  Premium
                </span>
              )}
                </div>
              
                <p className="text-gray-700 dark:text-gray-100 text-sm max-md:hidden">
                  {product.description.length > 50
                    ? `${product.description.slice(0, 50)}......`
                    : product.description}
                </p>

                <h2 className="text-md font-semibold text-secondaryColorLight">
                  AED {product.price}
                </h2>
                {hasPremiumBadge && (
                <span className=" bg-yellow-500 md:hidden w-14 flex justify-center items-center text-white text-[0.6rem] font-bold p-1  rounded">
                  Premium
                </span>
              )}
                <p className="text-secondaryColorLight text-xs">
                  {formatDistanceToNow(new Date(product.created_at), {
                    addSuffix: true,
                  })}
                </p>
              
                {/* View Details Button */}
                <button
                  onClick={() => router.push(`/product-details/${product.id}`)}
                  className="mt-4 max-md:px-0  md:px-4 py-2 w-36 text-sm  bg-purple-600 text-white font-bold rounded-lg hover:bg-gray-200 hover:text-secondaryColorDark transition-all"
                >
                  View Details
                </button>
              </div>


            </div>
          </div>
        </div>
      ) : (
        <div
          key={product.id}
          className={`flex-none relative  dark:bg-black dark:text-white shadow-md rounded-lg overflow-hidden border border-gray-200 w-[55%] max-sm:w-[30%] sm:w-[50%] md:w-[35%] lg:w-[18.5%] transition-transform duration-500  ease-in-out`}
        >
          <div
            onClick={() =>
              product.fav ? remove(product.id) : AddToLike(product.id)
            }
            className={`hover:cursor-pointer z-20 top-2 right-2 absolute ${product.fav ? "text-red-600" : "text-white "
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
      )}
    </>
  );
};

export default ProductCard;
