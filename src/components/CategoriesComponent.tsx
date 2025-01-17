

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Wrapper from "./Common/Wrapper/Wrapper";

const CategoriesComponent = () => {
  // Custom Hook for Media Query
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
  };

  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  // const CategoriesComponent = () => {
  const category = [
    "Used Desktops",
    "Used Laptops",
    "Used Gaming PC Parts",
    "Used Gaming Consoles",
    "Used Gaming Accessories",
    "New Desktops",
    "New Laptops",
    "New Gaming PC Parts",
    "New Gaming Consoles",
    "Customization & Gaming Gears",
  ];

  const offeringList = [
    { name: "Headphones", price: "237 AED", image: "/images/headphones.png" },
    { name: "Mouse", price: "237 AED", image: "/images/mouse.png" },
    { name: "Keyboard", price: "237 AED", image: "/images/keyboard.png" },
    { name: "Earbuds", price: "237 AED", image: "/images/earbuds.png" },
    { name: "Controller", price: "237 AED", image: "/images/controller.png" },
    { name: "Mousepad", price: "237 AED", image: "/images/mousepad.png" },
  ];

  return (
    <div className="mb-36 max-md:mb-12 text-black">
      <div className="bg-[#f4f2fe] dark:text-white dark:bg-[#1e1e2f] md:relative  py-12 w-full max-sm:h-auto sm:h-auto md:h-[65rem] lg:h-[52rem]">
        <h1 className=" text-center md:text-[1.5rem] font-bold">
          Level Up Your Gaming Gear - Buy, Sell, and
        </h1>
        <h1 className="text-center md:text-[1.5rem] font-bold mb-3">
          Upgrade with GamerGizmo!
        </h1>

        {/* Main Container */}
        <Wrapper>
          <div className="w-full mx-auto bg-white dark:bg-black dark:text-white text-black shadow-lg rounded-xl max-lg:p-2 md:p-6 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center md:items-center max-md:items-center gap-6">
            {/* Left Section */}
            <div className="flex-1 justify-start md:px-8 ">
              <h2 className="text-xl font-bold text-purple-700 mb-4">
                Post your Ad on GamerGizmo
              </h2>
              <ul className="text-sm space-y-2 mb-6">
                <li className="flex items-center  gap-2">
                  <span className="text-secondaryColorDark">✔</span>
                  Post your Ad for Free in 3 Easy Steps
                </li>
                <li className="flex items-center  gap-2">
                  <span className="text-secondaryColorDark">✔</span>
                  Sell your component at the Best Price
                </li>
                <li className="flex items-center  gap-2">
                  <span className="text-secondaryColorDark">✔</span>
                  Get Genuine offers from Verified Buyers
                </li>
              </ul>
              <button className="bg-custom-gradient text-white py-2 px-6 rounded-full hover:opacity-90">
                Post Your Ad
              </button>
            </div>

            {/* Separator */}
            <div className="flex lg:flex-col md:mx-auto items-center">
              <div className="lg:w-px lg:h-16 w-28 h-px  bg-gray-300"></div>
              <div className="text-gray-500 font-medium my-2">Or</div>
              <div className="lg:w-px lg:h-16 w-28 h-px bg-gray-300"></div>
            </div>

            {/* Right Section */}
            <div className="flex-1 justify-start md:px-8 lg:ml-16 max-md:pl-8">
              <h2 className="text-xl font-bold text-purple-700 mb-4">
                Try GamerGizmo Sell For Me
              </h2>
              <ul className="text-sm space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-secondaryColorDark">✔</span>
                  We ensure Safe & Secure Transaction
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondaryColorDark">✔</span>
                  We Bargain for and share the Best offer
                </li>
                <li className="flex items-center  gap-2">
                  <span className="text-secondaryColorDark">✔</span>
                  Dedicated Sales Expert to sell your Component
                </li>
              </ul>
              <button className="bg-custom-gradient text-white py-2 mb-2 px-8  rounded-full hover:opacity-90">
                Buy For GamerGizmo
              </button>
            </div>
          </div>
        </Wrapper>

        {/* Categories Section */}
        {/* <Wrapper className="max:md-hidden"> */}
        <div className="md:relative flex justify-center items-center w-full mt-16 max-md:hidden">
          <div className="w-full max-w-[1200px] rounded-xl z-20 shadow-lg p-8 bg-white dark:bg-black text-black">
            <h2 className="text-2xl sm:pl-[0.9rem] md:pl-[calc(8%+10px)] lg:pl-[calc(4%+20px)]  font-bold max-sm:text-center text-start mb-6 dark:text-white">
              Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
              {category.map((item, index) => (
                <div
                  key={index}
                  className="w-full max-w-[15rem] border border-gray-200 bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center"
                >
                  <h2 className="text-[0.9rem] font-bold text-center mb-4">
                    {item}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* </Wrapper> */}
      </div>

      {/* Offering Section */}
      <Wrapper className="">
        <div className=" max-sm:px-1 text-black max-md:h-auto relative h-auto bg-white dark:bg-black shadow-xl w-full rounded-lg p-8 gap-6 mx-auto mt-72 max-sm:mt-10">
          <div className="flex justify-between md:pr-8 max-md:flex-col items-center mb-8">
            <h2 className="text-2xl max-md:text-base max-md:whitespace-nowrap md:pl-10 dark:text-white font-bold">
              GamerGizmo Offering
            </h2>
            <button className="flex justify-center max-md:py-2 items-center max-sm:w-[7rem] max-sm:h-[2.6rem] gap-2 bg-custom-gradient text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg">
              <Image
                src="/images/arrowIcon.png"
                alt="Arrow-Icon"
                width={16}
                height={16}
                className="text-[0.2rem]"
              />
              <span className="max-sm:text-xs whitespace-nowrap text-center">
                Explore More
              </span>
            </button>
          </div>

          {isSmallScreen ? (
            

            <Swiper
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet-custom",
                bulletActiveClass: "swiper-pagination-bullet-active-custom",
              }}
              modules={[Pagination]}
              className="mySwiper"
              spaceBetween={10} 
              slidesPerView={2.5} 
            >
              {offeringList.map((item, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <div className="border rounded-lg p-2 flex flex-col items-center dark:bg-black shadow-md hover:shadow-lg w-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain mb-2"
                    />
                    <h3 className="text-xs font-semibold mb-1 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{item.price}</p>
                    <button className="bg-btnGray font-bold flex justify-center items-center mx-auto dark:bg-white dark:text-black text-white mt-2 w-[4rem] py-1 rounded-full text-xs hover:bg-purple-600 max-md:w-[3rem] max-md:py-0.5 max-sm:w-[2.5rem] max-sm:py-0.5 max-sm:text-[0.6rem]">
                      Buy
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {offeringList.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex flex-col items-center dark:bg-black shadow-md hover:shadow-lg"
                >
                  <div className="">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain mb-4"
                    />
                  </div>
                  <h3 className="text-sm font-semibold mb-2 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{item.price}</p>
                  <button className="bg-[#E8E3FC] w-24 h-8 font-bold text-black text-sm px-4 py-2 rounded-full hover:bg-purple-600">
                    Buy
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default CategoriesComponent;
