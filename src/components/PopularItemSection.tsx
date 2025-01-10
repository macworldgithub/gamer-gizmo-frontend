"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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
  explorePath:string;
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
    router.push( explorePath);   
  };

  return (
    // <div className="relative w-full">
    //   <div className="my-8 ">
    //     {/* Title and Explore Button */}
    //     <div className="flex justify-between max-sm:flex-col  max-sm:items-start mx-auto items-center mb-6">
    //       <div>
    //         <h2 className="text-2xl font-bold text-gray-900 dark:text-white max-sm:text-[1.1rem]">
    //           {title}
    //         </h2>
    //         <p className="text-gray-500 dark:text-white mt-2 text-sm max-sm:text-[0.6rem]">
    //           {subtitle}
    //         </p>
    //       </div>
    //       <button
    //         onClick={onExplore}
    //         className="bg-custom-gradient text-white px-4 py-2 rounded-full text-sm flex md:justify-end hover:bg-purple-600 max-sm:mt-3"
    //       >
    //         Explore More
    //       </button>
    //     </div>

    //     {/* Product Cards */}
    //     <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
    //       {products.map((product) => (
    //         <div
    //           key={product.id}
    //           className="dark:bg-black dark:text-white shadow-md rounded-lg overflow-hidden border border-gray-200"
    //         >
    //           {/* Product Image */}
    //           <Image
    //             src={product.imageUrl}
    //             alt={product.name}
    //             width={100}
    //             height={100}
    //             className="flex justify-center mx-auto mt-2 w-[12rem] h-[8rem] px-5"
    //           />
    //           {/* Product Details */}
    //           <div className="p-4">
    //             <h3 className="text-sm dark:text-white font-semibold text-gray-900 truncate">
    //               {product.name}
    //             </h3>
    //             <p className="text-xs text-gray-500 mt-1 truncate">
    //               {product.description}
    //             </p>
    //             <p className="text-purple-500 font-bold mt-2">
    //               {product.price}
    //             </p>
    //             <button className="bg-btnGray font-bold flex justify-center items-center mx-auto dark:bg-white dark:text-black text-white mt-2 w-[4rem] py-1 rounded-full text-sm hover:bg-purple-600">
    //               Buy
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>

    //     {/* Navigation Arrows - Centered below Cards */}
    //     <div className="flex justify-center gap-6 mt-6 lg:justify-end">
    //       <button className="bg-gray-100 dark:bg-[#161328] rounded-full w-11 h-11 border-gray-200 hover:bg-gray-300">
    //         <Image
    //           src="/images/arrowLeft.png"
    //           alt="Left Arrow"
    //           width={20}
    //           height={25}
    //           className="mx-auto"
    //         />
    //       </button>
    //       <button className="bg-custom-gradient rounded-full w-11 h-11 hover:bg-purple-700" onClick={handleExplore}>
    //         <Image
    //           src="/images/arrowRight.png"
    //           alt="Right Arrow"
    //           width={20}
    //           height={25}
    //           className="mx-auto"
    //         />
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
  {products.map((product) => (
    <div
      key={product.id}
      className="flex-none dark:bg-black dark:text-white shadow-md rounded-lg overflow-hidden border border-gray-200 max-sm:w-[40%] lg:w-[20%]"
    >
      {/* Product Image */}
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={100}
        height={100}
        className="flex justify-center mx-auto mt-2 w-[12rem] h-[8rem] px-5"
      />
      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-sm dark:text-white font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 truncate">
          {product.description}
        </p>
        <p className="text-purple-500 font-bold mt-2">
          {product.price}
        </p>
        <button className="bg-btnGray font-bold flex justify-center items-center mx-auto dark:bg-white dark:text-black text-white mt-2 w-[4rem] py-1 rounded-full text-sm hover:bg-purple-600">
          Buy
        </button>
      </div>
    </div>
  ))}
</div>
  );
};

export default PopularItemSection;
