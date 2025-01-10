"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Wrapper from "./Common/Wrapper/Wrapper";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface SectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  onExplore: () => void;
  explorePath: string;
}

const PopularItemSection: React.FC<SectionProps> = ({
  title,
  subtitle,
  products,
  onExplore,
  explorePath,
}) => {
  const router = useRouter();
  const handleExplore = () => {
    router.push(explorePath);
  };

  return (

    <div >
      <div className="my-8 ">
        <Wrapper>
          <div className="flex justify-between max-sm:flex-col  max-sm:items-start mx-auto items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white max-sm:text-[1.1rem]">
                {title}
              </h2>
              <p className="text-gray-500 dark:text-white mt-2 md:text-sm sm:text-[0.8] max-sm:text-[0.6rem]">
                {subtitle}
              </p>
            </div>
            <button
              onClick={onExplore}
              className="bg-custom-gradient text-white px-4 py-2 rounded-full text-sm max-sm:text-[0.6rem] flex md:justify-end  hover:bg-purple-600 max-sm:mt-3"
            >
              Explore More
            </button>
          </div>
        </Wrapper>
       
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none dark:bg-black dark:text-white shadow-md rounded-lg overflow-hidden border border-gray-200 max-md:w-[40%]  md:w-[25%] lg:w-[20%]"
            >
              {/* Main Content */}
              <div className="relative w-full h-[12rem] max-md:h-[10rem] max-sm:h-[8rem]">
                {/* Product Image */}
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg px-1"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 max-md:p-2 max-sm:p-1">
                <h3 className="text-sm dark:text-white font-semibold text-gray-900 truncate max-md:text-xs max-sm:text-[0.7rem]">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 truncate max-md:text-[0.8rem] max-sm:text-[0.6rem]">
                  {product.description}
                </p>
                <p className="text-purple-500 font-bold mt-2 max-md:mt-1 max-sm:text-[0.8rem]">
                  {product.price}
                </p>
                <button className="bg-btnGray font-bold flex justify-center items-center mx-auto dark:bg-white dark:text-black text-white mt-2 w-[4rem] py-1 rounded-full text-sm hover:bg-purple-600 max-md:w-[3rem] max-md:py-0.5 max-sm:w-[2.5rem] max-sm:py-0.5 max-sm:text-[0.6rem]">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end  gap-6 mt-6 lg:justify-end">
          
          <button
            className="bg-custom-gradient rounded-full w-10 h-10 hover:bg-purple-700 mr-5"
            onClick={handleExplore}
          >
            <Image
              src="/images/arrowRight.png"
              alt="Right Arrow"
              width={20}
              height={25}
              className="mx-auto "
            />
          </button>
        </div>
      </div>

    </div>
   

  );
};

export default PopularItemSection;
