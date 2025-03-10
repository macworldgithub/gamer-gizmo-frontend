import Image from "next/image";
import React, { useEffect, useState } from "react";
import SelectLabels from "./SelectLabels";

const FilterSection = () => {
  const [isVisible, setIsVisible] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="w-[100%] h-auto bg-cover dark:bg-black bg-black bg-[url('/images/curve.png')] max-md:hidden">
      <div className="max-lg:min-h-[50%] sm:h-auto w-full max-md:h-[50rem] max-xl:max-h-[75%] pt-7 pb-4 bg-curve-light dark:bg-curve-dark relative flex flex-col justify-center items-center  bg-cover bg-center bg-no-repeat ">
        <p className="text-white font-bold max-md:text-[1.4rem] md:text-[2.5rem] max-sm:whitespace-nowrap">
          A Premier Marketplace for Gamers
        </p>
        <p className="text-white font-bold max-md:text-[1.4rem] md:text-[2.5rem] mb-2">
          where Gamers gear up
        </p>
        <p className="text-white max-md:font-light md:font-medium md:text-lg max-md:text-xs mb-2">
          Shop a Wide Range of Accessories for Every Device
        </p>
        {/* {isVisible && (
          <div className="flex items-center bg-transparent rounded-full py-2 border border-gray-300 shadow-md p-2 w-[600px] h-[57px] mb-4">
            <i className="fas fa-search text-gray-500 mr-2"></i>
            <input
              type="text"
              placeholder="Find what  you want"
              className="flex-1 outline-none bg-transparent text-white placeholder-white"
            />
          </div>
        )} */}

        <SelectLabels route="search-product" />
        {/* <div className="bg-black dark:bg-custom-gradient w-[191px] h-[55px] mt-5 rounded-full flex justify-center gap-3 items-center">
          <Image
            src="/images/arrowIcon.png"
            alt="Arrow-Icon"
            width={20}
            height={20}
            className=""
          />
          <p className="text-white">Explore More</p>
        </div> */}
      </div>
    </div>
  );
};

export default FilterSection;
