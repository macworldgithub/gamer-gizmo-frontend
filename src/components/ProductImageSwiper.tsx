import React, { FC } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductImage {
  image_url: string;
}

interface Data {
  product_images: ProductImage[];
}

interface ProductImageSwiperProps {
  data: Data;
}

const ProductImageSwiper: FC<ProductImageSwiperProps> = ({ data }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!data?.product_images?.length) return null;

  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      {/* Icons overlay */}
      <div className="flex space-x-4 justify-between z-10 mt-10 mb-4 max-md:px-2">
        <button className="hover:bg-gray-100">
          <FaRegHeart
            size={25}
            className=" text-purple-600 hover:text-red-900"
          />
        </button>
        <button className="p-2 ">
          <FaRegBookmark size={25} className="text-gray-600" />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="rounded-lg overflow-hidden"
      >
        {data.product_images.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex justify-center items-center bg-white dark:bg-black">
              <Image
                src={`${baseUrl}/${item.image_url}`}
                alt={`product-image-${idx}`}
                width={500}
                height={200}
                className="object-cover max-md:h-[2%]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageSwiper;
