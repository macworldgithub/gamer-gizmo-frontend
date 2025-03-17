import React, { FC } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import { toast } from "react-toastify";

interface ProductImage {
  image_url: string;
}

interface Data {
  product_images: ProductImage[];
}

interface ProductImageSwiperProps {
  data: any;
  seReftech: any;
  refetch: any;
}

const ProductImageSwiper: FC<ProductImageSwiperProps> = ({
  data,
  seReftech,
  refetch,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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
  if (!data?.product_images?.length) return null;

  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      {/* Icons overlay */}
      <div className="flex space-x-4 justify-between z-10 mt-10 mb-4 max-md:px-2">
        <div
          onClick={() => (data.fav ? remove(data.id) : AddToLike(data.id))}
          className={`hover:cursor-pointer   z-20 top-2 right-2 absolute ${
            data.fav ? "text-red-600" : "text-gray-300 "
          } hover:text-red-600`}
        >
          <MdFavorite size={34} className="max-sm:h-4" />
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, // Slide every 3 seconds
          disableOnInteraction: false, // Keeps autoplay even after user interaction
        }}
        loop={true}
        className="rounded-lg overflow-hidden"
      >
        {data.product_images.map((item: any, idx: any) => (
          <SwiperSlide key={idx}>
            <div className="flex justify-center items-center px-9 bg-white dark:bg-black">
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
