"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import Wrapper from "./Common/Wrapper/Wrapper";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  images: any;
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleExplore = () => {
    router.push(explorePath);
  };

  const handleCardClick = (productId: number, index: number) => {
    setSelectedCard(productId);

    // Scroll the container to the selected card
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / products.length;
      const scrollTo = cardWidth * index;

      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-6 sm:px-6 md:px-10 lg:px-12">
      <div className="my-8">
        <Wrapper className="max-sm:pr-2 max-sm:pl-0">
          {/* <div className="flex justify-between max-sm:flex-col max-sm:items-start items-center mb-4  lg:pr-6"> */}
          <div className="flex justify-between items-center mb-2">
            {/* <div className=""> */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white max-sm:text-[0.8rem]">
              {title}
            </h2>
            {/* </div> */}
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
          {/* </div> */}
        </Wrapper>
        {/* Product Section */}
        <Wrapper className="max-sm:mx-0 max-sm:pl-0 max-sm:pr-0">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 max-sm:gap-[0.5rem] overflow-x-auto scrollbar-hide"
          >
            {products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={product.id}
                  onClick={() => handleCardClick(product.id, index)}
                  className={`flex-none dark:bg-black dark:text-white shadow-md rounded-lg overflow-hidden border border-gray-200 w-[55%] max-sm:w-[23%]  sm:w-[40%] md:w-[35%] lg:w-[18.5%] transition-transform duration-500 ease-in-out  ${
                    selectedCard === product.id
                      ? "shadow-xl shadow-white bg-white"
                      : "shadow-md shadow-gray-200"
                  }`}
                >
                  <div className="relative w-full h-36  bg-black max-sm:h-[2.2rem]">
                    {product?.images && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product?.images[0]?.image_url}`}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg hover:scale-105 transition-all duration-300 mx-auto"
                      />
                    )}
                  </div>

                  <div className="p-3  max-sm:pt-0">
                    <h3 className="text-sm dark:text-white font-semibold text-gray-900 truncate max-md:text-xs max-sm:text-[0.6rem] max-sm:mb-0">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 max-sm:my-0 truncate max-md:text-[0.8rem] max-sm:text-[0.4rem]">
                      {product.description}
                    </p>
                    <p className="text-purple-500 font-bold mt-2 sm:mt-1 max-sm:mt-0   max-sm:text-[0.4rem]">
                      {product.price} AED
                    </p>
                    <button
                      onClick={() => {
                        router.push(`/product-details/${product.id}`);
                      }}
                      className="bg-btnGray font-bold flex justify-center items-center mx-auto dark:bg-white dark:text-black hover:text-white text-gray-500 mt-2 max-sm:mt-0 px-3 py-1 rounded-full text-xs hover:bg-purple-600 max-md:w-[3rem] max-sm:h-4 max-md:py-0.5 max-sm:w-[2.1rem] max-sm:py-0.1 max-sm:text-[0.6rem]"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-red-600">No Product To display</div>
            )}
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default PopularItemSection;
