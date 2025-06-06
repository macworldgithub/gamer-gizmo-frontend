import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Wrapper from "./Common/Wrapper/Wrapper";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CategoriesComponent = () => {
  const router = useRouter();
  // Custom Hook for Media Query
  const useMediaQuery = (query: any) => {
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

  const handleClick = (routeName: string) => {
    router.push(routeName);
  };

  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  // const CategoriesComponent = () => {
  const categories = [
    "Used Gaming PCs",
    "Used Laptops",
    "Used Components and Accessories",
    "Used Gaming Consoles",
    "New Gaming PCs",
    "New Laptops",
    "New Components and Accessories",
    "New Gaming Consoles",
  ];

  const categoryMap = {
    "Gaming PCs": "desktop",
    Laptops: "laptops",
    "Components and Accessories": "components",
    "Gaming Consoles": "console",
  } as const;

  const getCategoryLink = (category: string): string => {
    // Extract condition based on "New" or "Used"
    const isNew = category.startsWith("New");
    const condition = isNew ? 1 : 2;

    // Find the matching key in categoryMap
    const categoryName = (
      Object.keys(categoryMap) as (keyof typeof categoryMap)[]
    ).find((key) => category.includes(key));

    // Construct the link
    return categoryName
      ? `/${categoryMap[categoryName]}?condition=${condition}`
      : "#";
  };

  const offeringList = [
    { name: "Headphones", price: "237 AED", image: "/images/headphones.png" },
    { name: "Mouse", price: "237 AED", image: "/images/mouse.png" },
    { name: "Keyboard", price: "237 AED", image: "/images/keyboard.png" },
    { name: "Earbuds", price: "237 AED", image: "/images/earbuds.png" },
    { name: "Controller", price: "237 AED", image: "/images/controller.png" },
    { name: "Mousepad", price: "237 AED", image: "/images/mousepad.png" },
  ];

  return (
    <div className=" max-md:mb-0 text-black">
      <div className="bg-[#f4f2fe] dark:text-white dark:bg-[#1e1e2f] md:relative pt-6 w-full max-sm:h-auto sm:h-auto md:h-[65rem] lg:h-[42rem]">
        <h1 className=" text-center md:text-[1.5rem] font-bold">
          Level Up Your Gaming Gear - Buy, Sell, and
        </h1>
        <h1 className="text-center md:text-[1.5rem] font-bold mb-2">
          Upgrade with GamerGizmo!
        </h1>

        {/* Main Container */}
        <Wrapper>
          <div className="w-full mx-auto bg-white dark:bg-black dark:text-white text-black shadow-lg rounded-xl max-lg:p-2 md:p-6  flex flex-col lg:flex-row items-start lg:items-center md:items-center max-md:items-center gap-6">
            {/* Left Section */}
            <div className="flex-1 justify-start md:px-8 lg:ml-16 max-md:px-4 ">
              <h2 className="text-xl font-bold text-purple-700 mb-4">
                Post your Ad on GamerGizmo
              </h2>
              <ul className="text-sm space-y-2 mb-4">
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
              <button
                className="bg-custom-gradient text-white py-2 text-sm px-4 rounded-full hover:opacity-90"
                onClick={() => handleClick("/publish-ad")}
              >
                Post Your Ad
              </button>
            </div>

            {/* Separator */}
            <div className="flex lg:flex-col md:mx-auto items-center ">
              <div className="lg:w-px lg:h-16 w-28 h-px  bg-gray-300"></div>
              <div className="text-gray-500 font-medium my-2">Or</div>
              <div className="lg:w-px lg:h-16 w-28 h-px bg-gray-300"></div>
            </div>

            {/* Right Section */}
            <div className="flex-1 justify-start md:px-8 lg:ml-16 max-md:px-4 ">
              <h2 className="text-xl font-bold text-purple-700 mb-4">
                GamerGizmo Offering
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
              <button
                className="bg-custom-gradient text-white py-2 mb-2 px-4 text-sm  rounded-full hover:opacity-90"
                onClick={() => handleClick("/store")}
              >
                Buy From GamerGizmo
              </button>
            </div>
          </div>
        </Wrapper>

        {/* Categories Section */}
        {/* <Wrapper className="max:md-hidden"> */}
        <div className="md:relative flex justify-center items-center w-full md:py-4 md:px-8 max-md:hidden">
          <div className="w-full max-w-[1200px] rounded-xl z-20 shadow-lg p-8 bg-white dark:bg-black text-black">
            <h2 className="text-2xl sm:pl-[0.9rem] md:pl-[calc(8%+10px)] lg:pl-[calc(4%+20px)]  font-bold max-sm:text-center text-start mb-6 dark:text-white">
              Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={getCategoryLink(category)}
                  className="w-full max-w-[15rem] h-[6.5rem] border border-gray-200 bg-custom-gradient p-4 rounded-lg shadow-md flex flex-col justify-center items-center text-white no-underline overflow-hidden"
                >
                  <h2 className="text-[1rem] w-48 text-center font-bold leading-tight ">
                    {category}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* </Wrapper> */}
      </div>

      {/* Offering Section */}
      {/* <Wrapper className=" xl:mt-4 lg:mt-[5rem] md:mt-[5rem] max-md:m-0 md:mb-6"> */}
      {/* <div className=" max-sm:px-1 text-black max-md:h-auto relative h-auto  dark:bg-black shadow-xl w-full rounded-lg p-8 gap-6 max-sm:gap-0 mx-auto  max-sm:mt-10"> */}
      {/* <div className="flex justify-between md:pr-8 max-md:flex-col items-center mb-8">
            <h2 className="text-2xl max-md:text-base max-md:whitespace-nowrap md:pl-10 dark:text-white font-bold">
              GamerGizmo Offering
            </h2>
            <button className="flex max-sm:mt-4 justify-center max-md:py-2 items-center max-sm:w-[7rem] max-sm:h-[2.6rem] gap-2 bg-custom-gradient text-white px-4 max-sm:px-0 py-2 rounded-full shadow-md hover:shadow-lg">
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
          </div> */}

      {/* {isSmallScreen ? (
            <Swiper
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet-custom",
                bulletActiveClass: "swiper-pagination-bullet-active-custom",
              }}
              modules={[Pagination]}
              className="mySwiper"
              spaceBetween={10}
              slidesPerView={4}
            >
              {offeringList.map((item, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <div className="border rounded-lg flex flex-col items-center dark:bg-black shadow-md hover:shadow-lg w-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-9 object-contain "
                    />
                    <h3 className="text-[0.7rem] font-semibold dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 ">{item.price}</p>
                    <button className="bg-btnGray  font-bold flex justify-center items-center mx-auto dark:bg-white dark:text-black text-gray-400 mt-1 w-[4rem]  rounded-full text-xs hover:bg-purple-600 max-md:w-[3rem] max-md:py-0.5 max-sm:w-[2rem] max-sm:py-0.2 max-sm:text-[0.6rem] mb-2">
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
          )} */}
      {/* </div> */}
      {/* </Wrapper> */}
    </div>
  );
};

export default CategoriesComponent;
