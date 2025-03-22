import React, { FC, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Thumbs } from "swiper/modules";
import { MdFavorite } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import { toast } from "react-toastify";

interface ProductImage {
  image_url: string;
}

interface Data {
  product_images: ProductImage[];
  id: string;
  fav: boolean;
}

interface ProductImageSwiperProps {
  data: Data;
  seReftech: any;
  refetch: any;
}

const ProductImageSwiper: FC<ProductImageSwiperProps> = ({
  data,
  seReftech,
  refetch,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = useSelector((state: RootState) => state.user.token);
  const id = useSelector((state: RootState) => state.user.id);

  const AddToLike = async (prodId: any) => {
    try {
      if (!token) {
        toast.error("Login to add to favourites");
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
      toast.success("Successfully removed from favourites");
      seReftech(!refetch);
    } catch (err) {
      toast.error("Failed to remove from favourites");
    }
  };

  if (!data?.product_images?.length) return null;

  return (
    <div className="relative w-full lg:w-[500px] mx-auto mt-8">
      {/* Favorite Icon */}
      <div
        onClick={() => (data.fav ? remove(data.id) : AddToLike(data.id))}
        className={`hover:cursor-pointer absolute z-20 top-2 right-2 ${data.fav ? "text-red-600" : "text-gray-300"
          } hover:text-red-600`}
      >
        <MdFavorite size={34} className="max-sm:h-4" />
      </div>

      {/* Main Swiper */}
      <Swiper
        modules={[Pagination, Autoplay, Thumbs]}
        spaceBetween={10}
        slidesPerView={1}
        // pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Track active index
        className="rounded-lg overflow-hidden "
      >
        {data.product_images.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex justify-center items-center px-9 dark:bg-black">
              <Image
                src={`${baseUrl}/${item.image_url}`}
                alt={`product-image-${idx}`}
                width={700}
                height={500}

                className="object-cover md:object-contain h-[400px] max-sm:h-[250px] w-full"

              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}


      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={Math.min(data.product_images.length, 4)}
        watchSlidesProgress
        className="my-2 flex justify-center items-center"
      >
        {data.product_images.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={`${baseUrl}/${item.image_url}`}
              alt={`thumbnail-image-${idx}`}
              width={65}
              height={65}
              className={`mx-auto h-[70px] w-[70px] object-cover border-2 rounded-md cursor-pointer 
          transition-all duration-200 hover:scale-105 
          ${activeIndex === idx ? "border-purple-400" : "border-gray-300"}
          max-sm:h-[50px] max-sm:w-[50px]`}
            />
          </SwiperSlide>
        ))}
      </Swiper>




      {/* <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        
        slidesPerView={data.product_images.length < 4 ? data.product_images.length : 4}
        watchSlidesProgress
        className="mt-2 "
      >
        {data.product_images.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={`${baseUrl}/${item.image_url}`}
              alt={`thumbnail-image-${idx}`} 
              width={80}
              height={60}
              className={`md:h-[80px] md:w-[80px] max-md:h-[55px] max-md:w-[55px] object-cover border-2 rounded-md  cursor-pointer max-sm:w-20 max-lg:mt-3  ${activeIndex === idx ? "border-customPurpleBorder" : "border-gray-300"
                }`} // Highlight active thumbnail
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
};

export default ProductImageSwiper;
