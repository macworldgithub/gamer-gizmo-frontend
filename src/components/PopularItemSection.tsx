

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleExplore = () => {
    router.push(explorePath);
  };

  const handleCardClick = (productId: number) => {
    setSelectedCard(productId);
  };

  return (
    <div className="px-6 sm:px-6 md:px-10 lg:px-12">
      <div className="my-8">
        <Wrapper className="max-sm:pr-2 max-sm:pl-0">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white max-sm:text-[0.8rem]">
              {title}
            </h2>
            <div className="flex justify-end lg:pr-7">
              <button
                className="bg-custom-gradient rounded-full w-10 h-10 hover:bg-purple-700 "
                onClick={handleExplore}
              >
                <Image
                  src="/images/arrowRight.png"
                  alt="Right Arrow"
                  width={20}
                  height={25}
                  className="mx-auto"
                />
              </button>
            </div>
          </div>
        </Wrapper>

     
        <Wrapper className="max-sm:mx-0 max-sm:pl-0 max-sm:pr-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleCardClick(product.id)}
                className={`dark:bg-black dark:text-white p-1 max-sm:w-[8rem]  shadow-md rounded-lg overflow-hidden border border-gray-200 transition-transform duration-500 ease-in-out ${
                  selectedCard === product.id
                    ? "shadow-xl shadow-white bg-white"
                    : "shadow-md shadow-gray-200"
                }`}
              >
                <div className="relative w-full h-40 max-sm:h-16">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-t-lg mx-auto"
                  />
                </div>

                <div className=" max-sm:p-0   md:p-0 lg:p-3">
                  <h3 className="text-sm lg:text-xs md:text-xs dark:text-white font-semibold text-gray-900 truncate max-md:text-xs max-sm:text-[0.7rem] max-sm:mb-0 md:mt-0 lg:mt-0">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1  lg:text-xs md:text-[0.6rem] max-sm:my-0 truncate max-md:text-[0.8rem] max-sm:text-[0.4rem]  md:mt-0">
                    {product.description}
                  </p>
                  <p className="text-purple-500 font-bold mt-2 sm:mt-1 max-sm:mt-0 max-sm:text-[0.4rem] md:text-xs  lg:text-xs  ">
                    {product.price}
                  </p>
                  <button className="bg-btnGray md:w-[3rem] lg:w-[4rem] font-bold flex justify-center items-center mx-auto dark:bg-white dark:text-black text-gray-500 mt-2 max-sm:mt-0 w-[4rem] py-1 rounded-full text-xs hover:bg-purple-600 max-md:w-[3rem] max-sm:h-4 max-md:py-0.5 max-sm:w-[2.1rem] max-sm:py-0.1 max-sm:text-[0.6rem]  md:text-[0.6rem] lg:text-xs ">
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default PopularItemSection;
