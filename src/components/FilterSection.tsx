import Image from "next/image";
import React, { useEffect, useState } from "react";
import SelectLabels from "./SelectLabels";

const FilterSection = () => {
  const [isVisible, setIsVisible] = useState(window.innerWidth > 768);
  const dropdownOptions = [
    { label: "Processor", options: ["lorem", "lorem"] },
    { label: "New Items", options: ["lorem", "lorem"] },
    { label: "Model", options: ["Gaming", "Electronics"] },
    { label: "Price Range", options: ["Low to High", "High to Low"] },
    { label: "Location", options: ["lorem", "lorem"] },
  ];

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
    <div className=" max-lg:min-h-[50%] w-full max-md:h-[50rem] md:lg:max-h-[75%]  bg-custom-gradient relative flex flex-col justify-center items-center overf py-14">
      {isVisible && (
        <div className="flex items-center bg-transparent rounded-full py-2 border border-gray-300 shadow-md p-2 w-[600px] h-[57px]">
          <i className="fas fa-search text-gray-500 mr-2"></i>
          <input
            type="text"
            placeholder="Find what do you want"
            className="outline-none bg-transparent text-white placeholder-white"
          />
        </div>
      )}

      <p className="text-white font-bold max-md:text-[1.4rem] md:text-[2.5rem] max-sm:whitespace-nowrap">
        A Premier Marketplace for Gamers
      </p>
      <p className="text-white font-bold max-md:text-[1.5rem] md:text-[2.5rem]">
        where Gamers gear up
      </p>
      <p className="text-white max-md:font-light md:font-medium md:text-lg max-md:text-xs">
        Shop a Wide Range of Accessories for Every Device
      </p>

      <SelectLabels />

      <div className="bg-black w-[191px] h-[55px] mt-5 rounded-full flex justify-center gap-3 items-center">
        <Image
          src="/images/arrowIcon.png"
          alt="Arrow-Icon"
          width={20}
          height={20}
          className=""
        />
        <p className="text-white">Explore More</p>
      </div>
    </div>
  );
};

export default FilterSection;
