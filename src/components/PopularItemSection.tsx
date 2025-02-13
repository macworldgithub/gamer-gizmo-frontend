"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import Wrapper from "./Common/Wrapper/Wrapper";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  // images: any;
}

interface SectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  onExplore: () => void;
  explorePath: string;
  seReftech: any;
  refetch: any;
}

const PopularItemSection: React.FC<SectionProps> = ({
  title,
  subtitle,
  products,
  onExplore,
  seReftech,
  refetch,
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
    <div className="px-6 sm:px-6 md:px-10 lg:px-12 ">
      <div className="my-3">
        <Wrapper className="max-sm:pr-2 max-sm:pl-0">
          {/* <div className="flex justify-between max-sm:flex-col max-sm:items-start items-center mb-4  lg:pr-6"> */}
          <div className="flex justify-between items-center mb-2">
            {/* <div className=""> */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white max-sm:text-[0.8rem]">
              {title}
            </h2>
            {/* </div> */}
            <div className="flex justify-end lg:pr-7 ">
              <button
                className="bg-custom-gradient rounded-full w-10 h-10 max-lg:w-6 max-lg:h-6 hover:bg-purple-700 "
                onClick={handleExplore}
              >
                <Image
                  src="/images/arrowRight.png"
                  alt="Right Arrow"
                  width={20}
                  height={25}
                  className="mx-auto max-lg:w-[10px] max-lg:h-[10px]"
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
                <ProductCard
                  seReftech={seReftech}
                  refetch={refetch}
                  product={product}
                />
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
