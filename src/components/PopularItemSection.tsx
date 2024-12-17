import Image from "next/image";
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
}

const PopularItemSection: React.FC<SectionProps> = ({
  title,
  subtitle,
  products,
  onExplore,
}) => {
  return (
    <div className="relative mx-auto max-md:w-[60rem] md:w-[50rem] lg:w-[80rem] ">
      <div className="my-8 px-4 py-5">
        <div className="flex lg:justify-between max-sm:flex-col max-sm:items-start mx-auto items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 max-sm:text-[0.8rem]">
              {title}
            </h2>
            <p className="text-gray-500 text-sm max-sm:text-[0.5rem]">
              {subtitle}
            </p>
          </div>
          <button
            onClick={onExplore}
            className="bg-custom-gradient  text-white px-4 py-2 rounded-full text-sm hover:bg-purple-600 sm:absolute right-[33em] md:ml-56 sm:ml-20 md:absolute md:right-[16em]  lg:absolute lg:right-[23.5%] max-sm:mt-3 "
          >
            Explore More
          </button>
        </div>
        <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 max-sm:w-[15rem] sm:w-[30rem] md:w-[35rem] max-lg:w-[30rem] lg:w-[60rem]">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-black dark:text-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <Image
                src={product.imageUrl}
                alt="Left Arrow"
                width={100}
                height={100}
                className="flex justify-center mx-auto mt-2 w-[12rem] h-[8rem] px-5"
              />
              <div className="p-4 relative w-[100%] ">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {product.description}
                </p>
                <p className="text-purple-500 font-bold mt-2">
                  {product.price}
                </p>
                <div className="flex justify-end">
                  <button className="rounded-full w-3 absolute left-[50rem]">
                    <Image
                      src="/images/arrowLeft.png"
                      alt="Left Arrow"
                      width={35}
                      height={45}
                      // className='w-[1.6rem] h-[1.1rem]'
                    />
                  </button>
                  <button>
                    <Image
                      src="/images/arrowRight.png"
                      alt="Right Arrow"
                      width={35}
                      height={45}
                      // className='w-[1.6rem] h-[1.1rem]'
                    />
                  </button>
                </div>
                <button className="bg-btnGray flex justify-center items-center mx-auto text-white mt-2 w-[4rem] py-1 rounded-md text-sm hover:bg-purple-600">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    // <div className="relative mx-auto max-md:w-[60rem] md:w-[50rem] lg:w-[80rem]">
    //   <div className="my-8 px-4 py-5">
    //     <div className="flex flex-wrap justify-between items-center mb-6">
    //       <div>
    //         <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    //         <p className="text-gray-500 text-sm">{subtitle}</p>
    //       </div>
    //       <div className="mt-4 lg:mt-0">
    //         <button
    //           onClick={onExplore}
    //           className="bg-custom-gradient text-white px-4 py-2 rounded-full text-sm hover:bg-purple-600"
    //         >
    //           Explore More
    //         </button>
    //       </div>
    //     </div>

    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    //       {products.map((product) => (
    //         <div
    //           key={product.id}
    //           className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
    //         >
    //           <Image
    //             src={product.imageUrl}
    //             alt="Product Image"
    //             width={100}
    //             height={100}
    //             className="flex justify-center mx-auto mt-2 w-[12rem] h-[8rem]"
    //           />
    //           <div className="p-4">
    //             <h3 className="text-sm font-semibold text-gray-900 truncate">
    //               {product.name}
    //             </h3>
    //             <p className="text-xs text-gray-500 mt-1 truncate">
    //               {product.description}
    //             </p>
    //             <p className="text-purple-500 font-bold mt-2">{product.price}</p>
    //             <button className="bg-btnGray flex justify-center items-center mx-auto text-white mt-2 w-[4rem] py-1 rounded-md text-sm hover:bg-purple-600">
    //               Buy
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default PopularItemSection;
