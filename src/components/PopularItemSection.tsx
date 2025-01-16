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

  return (
    <div className="px-6 sm:px-6 md:px-10 lg:px-12">
      <div className="my-8">
        <Wrapper className="max-sm:px-2">
          <div className="flex justify-between max-sm:flex-col max-sm:items-start items-center mb-4 lg:pr-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white max-sm:text-[1rem]">
                {title}
              </h2>
              <p className="text-gray-500 dark:text-white mt-2 md:text-sm sm:text-[0.8rem] max-sm:text-[0.6rem]">
                {subtitle}
              </p>
            </div>
            <button
              onClick={onExplore}
              className="bg-custom-gradient text-white px-4 py-2 rounded-full text-sm max-sm:text-[0.6rem] hover:bg-purple-600 max-sm:mt-3"
            >
              Explore More
            </button>
          </div>
        </Wrapper>

        {/* Product Section */}
        <Wrapper className="max-sm:mx-0 max-sm:pl-0 max-sm:pr-0">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedCard(product.id)}
                className={`flex-none dark:bg-black dark:text-white shadow-md rounded-lg overflow-hidden border border-gray-200 w-[55%] max-sm:w-[35%] sm:w-[40%] md:w-[35%] lg:w-[18.5%] ${
                  selectedCard === product.id
                    ? "shadow-xl shadow-white bg-white "
                    : "shadow-md shadow-gray-200"
                }`}
              >
                <div
                  className="relative w-full h-40 max-sm:h-[4rem] 
               "
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-t-lg mx-auto"
                  />
                </div>

                <div className="p-3 max-sm:pt-1">
                  <h3 className="text-sm dark:text-white font-semibold text-gray-900 truncate max-md:text-xs max-sm:text-[0.6rem]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 max-sm:mt-0 truncate max-md:text-[0.7rem] max-sm:text-[0.5rem]">
                    {product.description}
                  </p>
                  <p className="text-purple-500 font-bold mt-2 sm:mt-1 max-sm:mt-0  max-sm:text-[0.5rem]">
                    {product.price}
                  </p>
                  <button className="bg-btnGray font-bold flex justify-center items-center mx-auto dark:bg-white dark:text-black text-white mt-2 w-[4rem] py-1 rounded-full text-xs hover:bg-purple-600 max-md:w-[3rem] max-md:py-0.5 max-sm:w-[2.5rem] max-sm:py-0.5 max-sm:text-[0.6rem]">
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end lg:pr-7 mt-3">
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
        </Wrapper>
      </div>
    </div>
  );
};

export default PopularItemSection;
