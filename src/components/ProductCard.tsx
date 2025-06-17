"use client";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { RootState } from "./Store/Store";

type ProductImage = {
  id: number;
  product_id: number;
  image_url: string;
  created_at: string;
};

type Product = {
  images: string[];
};

const ProductCard = ({
  product,
  seReftech,
  refetch,
  isColumn,
  hasPremiumBadge,
}: any) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const AddToLike = async (prodId: any) => {
    if (isLoading) return; // Prevent further clicks if loading

    try {
      if (!token) {
        toast.error("Login To add to favourites");
        return;
      }

      setIsLoading(true); // Disable icon when API call is made

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
    } finally {
      setIsLoading(false); // Enable the icon after the response
    }
  };

  const remove = async (prod: any) => {
    if (isLoading) return; // Prevent further clicks if loading

    try {
      setIsLoading(true); // Disable icon when API call is made

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/favourite/removeFavourite?userId=${id}&productId=${prod}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Successfully Deleted");
        seReftech(!refetch);
      }
    } catch (err) {
      toast.error("Failed to add to favourites");
    } finally {
      setIsLoading(false); // Enable the icon after the response
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
          <div className="flex flex-col sm:flex-row  container">
            <div className="relative max-md:w-80  max-sm:w-[100vw]  md:w-[26%]">
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
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="rounded-lg overflow-hidden"
              >
                {productImages.map((img: ProductImage, index: number) => {
                  const imageUrl = getImageUrl(img?.image_url);

                  return (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() =>
                          router.push(`/product-details/${product.id}`)
                        }
                        className="max-md:w-[70%] sm:mx-0 mx-auto  max-md:h-[200px] md:w-[300px] md:h-[200px] relative cursor-pointer"
                      >
                        <Image
                          src={imageUrl}
                          alt={`Product image ${index + 1}`}
                          layout="fill"
                          className="rounded-lg bg-gray-200"
                          onLoadingComplete={() =>
                            console.log(`Loaded: ${imageUrl}`)
                          }
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Favorite Icon */}
              <div
                onClick={async () => {
                  if (isLoading) return;

                  try {
                    if (product.fav) {
                      await remove(product.id);
                    } else {
                      await AddToLike(product.id);
                    }
                  } catch (error) {
                    console.error("Error toggling favorite:", error);
                  }
                }}
                className={`absolute top-2 max-sm:right-20 right-2 z-10 cursor-pointer ${product.fav ? "text-red-600" : "text-purple-200"
                  } ${isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-red-600"
                  }`}
              >
                <MdFavorite size={24} />
              </div>
            </div>

            {/* Right Side - Car Details */}
            <div className="w-full  md:w-[40%] md:pl-12  flex flex-col max-md:w-full">
              <div className="flex flex-col gap-1 max-md:mx-auto md:mx-0">
                {/* <div className="flex justify-start max-sm:flex-col items-center"> */}
                {/* <p
                  className="text-black   font-bold max-md:text-sm sm:w-64 dark:text-white md:text-[0.9rem]  cursor-pointer"
                  onClick={() =>
                    router.push(`/product-details/${product.id}`)
                  }
                >
                  {product.name}
                </p> */}
                <p
                  className="text-black font-bold max-md:text-sm sm:w-64 dark:text-white md:text-[0.9rem] cursor-pointer truncate"
                  onClick={() => router.push(`/product-details/${product.id}`)}
                  title={product.name} // optional: shows full name on hover
                >
                  {product.name}
                </p>

                {product?.is_featured && (
                  <span className=" bg-yellow-500 w-12 text-white text-[0.6rem] font-bold p-1 rounded">
                    Premium
                  </span>
                )}

                {/* </div> */}

                <p className="text-gray-700 dark:text-gray-100 md:pr-[3rem] text-xs max-md:hidden">
                  {product.description.length > 50
                    ? `${product.description.slice(0, 50)}......`
                    : product.description}
                </p>

                <h2 className="text-md font-semibold text-secondaryColorLight">
                  AED {Number(product.price).toLocaleString()}
                </h2>

                {/* {product?.is_featured && (
                  <span className=" bg-yellow-500 md:hidden w-14 flex justify-center items-center text-white text-[0.6rem] font-bold p-1  rounded">
                    Premium
                  </span>
                )} */}
                <p className="text-secondaryColorLight text-xs">
                  {formatDistanceToNow(new Date(product.created_at), {
                    addSuffix: true,
                  })}
                </p>

                <button
                  onClick={() => router.push(`/product-details/${product.id}`)} // View Details button routing
                  className="mt-4 max-md:px-0  md:px-4 py-2 w-36 max-md:w-20 text-sm max-md:text-[0.7rem] max-sm:py-1 bg-purple-600 text-white font-bold rounded-lg hover:bg-gray-200 hover:text-secondaryColorDark transition-all"
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
          <div
            onClick={() => router.push(`/product-details/${product.id}`)} // Added routing on image click
            className="relative w-full h-24  bg-black max-sm:h-[50px]"
          >
            {product?.images?.[0]?.image_url && (
              <Image
                src={getImageUrl(product.images[0].image_url)}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="rounded-t-lg hover:scale-105 transition-all duration-300 mx-auto"
              />
            )}
          </div>

          <div className="px-3 pb-[6px]  dark:bg-[#1e1e2f]">
            <h3
              className="text-sm dark:text-white font-semibold text-gray-900 truncate max-md:text-xs max-sm:text-[8px] cursor-pointer"
              onClick={() => router.push(`/product-details/${product.id}`)} // Added routing on title click
            >
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 truncate max-md:text-[0.8rem] max-sm:text-[0.4rem]">
              {product.description}
            </p>
            <p className="text-purple-500 font-bold max-sm:text-[0.4rem]">
              {Number(product.price).toLocaleString()} AED
            </p>
            <div className="flex items-center">
              <button
                onClick={() => router.push(`/product-details/${product.id}`)} // View Details button routing
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
