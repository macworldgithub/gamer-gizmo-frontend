import React, { FC } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaHeart, FaBookmark } from "react-icons/fa";

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
    <div className="relative w-full max-w-[600px] mx-auto">
      {/* Icons overlay */}
      <div className="flex space-x-4 justify-between z-10 mt-10">
        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
          <FaHeart className="text-red-500" />
        </button>
        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
          <FaBookmark className="text-gray-600" />
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
            <div className="flex justify-center items-center bg-white">
              <Image
                src={`${baseUrl}/${item.image_url}`}
                alt={`product-image-${idx}`}
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageSwiper;
