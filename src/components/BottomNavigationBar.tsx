import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Store/Store";
import { dark } from "@mui/material/styles/createPalette";

const BottomNavigationBar = () => {
  const theme = useSelector((state: RootState) => state.Theme.theme);
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    if (theme === "day") {
      setBackgroundColor("bg-white");
    } else {
      setBackgroundColor("bg-black");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
        if (isDrawerOpen) {
          setIsDrawerOpen(false); // Close drawer when scrolling
        }
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDrawerOpen]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setFirstClick(true);
  };

  return (
    <div className={`flex justify-evenly items-center h-20  dark:bg-black`}>
      {/* <div> */}
      <Image
        src="/images/gameIcon.png"
        alt="logo-img"
        width={100}
        height={100}
        className="max-sm:w-[4rem] md:w-[2rem] md:ml-[0.2rem] lg:w-[5rem] md:h-[1.8rem] lg:h-12 max-sm:mx-auto"
      />
      {/* </div> */}
      <div className="hidden md:flex md:gap-5 md:pl-2 lg:gap-[2rem] font-bold md:text-[0.6rem] lg:text-[0.8rem] whitespace-nowrap text-navTextLight dark:text-white">
        <Link href="#">Laptops</Link>
        <Link href="#">Desktops</Link>
        <Link href="#">Store</Link>
        <Link href="#">Components</Link>
        <Link href="#">Blogs</Link>
        <Link href="#">About Us</Link>
        <Link href="#">Contact Us</Link>
        <Link href="#" className="text-secondaryColorLight">
          Inspection
        </Link>
      </div>

      <div className="md:hidden absolute left-0 ml-4 ">
        <button
          onClick={toggleDrawer}
          className="focus:outline-none text-black dark:text-white"
        >
          <div className="w-[1.6rem] h-[1.1rem]">
            <Image
              src="/images/drawerIcon.svg"
              alt="Drawer Icon"
              width={35}
              height={45}
              className="dark:invert"
            />
          </div>
        </button>

        {/* Drawer Menu */}
        {isDrawerOpen && (
          <div
            className={`flex-nowrap fixed left-0 bg-white dark:bg-black dark:text-white w-[10rem] h-screen z-50 bg-red flex flex-col items-center space-y-6 overflow-y-auto
                            ${
                              isDrawerOpen
                                ? "animate-slide-in"
                                : firstClick
                                ? "animate-slide-out"
                                : "hidden"
                            }`}
          >
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-secondaryColorLight">Ayla Imran</p>

            <Link
              href="#"
              className=" text-lg hover:text-gray-300 "
              onClick={() => setIsDrawerOpen(false)}
            >
              Laptops
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-gray-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              Desktops
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-gray-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              Store
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-gray-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              Components
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-gray-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              Blogs
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-gray-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="#"
              className=" text-lg hover:text-gray-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="#"
              className=" text-lg hover:text-gray-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              Inspection
            </Link>

            <div className="flex-col items-center mx-auto pl-0">
              <div className="w-[7rem] mx-auto h-10 bg-custom-gradient rounded-full flex justify-center items-center gap-2">
                <Image
                  src="/images/btnIcon.png"
                  className="w-[0.8rem]"
                  width={18}
                  height={18}
                  alt="btnIcon"
                />
                <p className="text-sm text-white">Post Your Ad</p>
              </div>

              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:flex md:justify-between items-center md:gap-[0.9rem]">
        <div className="md:w-[5rem] lg:max-w-[30rem] lg:min-w-[8rem] lg:ml-2 md:h-6 lg:h-10 md:ml-[0.1rem]  bg-custom-gradient rounded-full flex justify-center items-center gap-2">
          <Image
            src="/images/btnIcon.png"
            className="md:w-[0.6rem]"
            width={18}
            height={18}
            alt="btnIcon"
          />
          <p className="md:text-[0.5rem] lg:text-[0.7rem] font-bold text-white">
            Post Your Ad
          </p>
        </div>
        {/* <div className="flex space-x-4 items-center"> */}
        <Image
          src="/images/profile.png"
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full md:w-[1rem] lg:w-[1.8rem] md:mx-0"
        />
        <ThemeToggle />
      </div>
      {/* </div> */}
    </div>
  );
};

export default BottomNavigationBar;
