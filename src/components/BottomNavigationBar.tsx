"use client";
import { RootState } from "@/app/Store/Store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

const BottomNavigationBar = () => {
  const isLogin = useSelector((state: RootState) => state.login.isLoggedIn);
  const theme = useSelector((state: RootState) => state.Theme.theme);
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  // const onMouseEnter = () => {
  //   setIsDropdownOpen(true);
  // };

  // const onMouseout = () => {
  //   setIsDropdownOpen(false);
  // };

  return (
    <div className={`flex justify-evenly items-center h-20  dark:bg-[#0D0D12]`}>
      <Link href="/">
        <Image
          src="/images/gameIcon.png"
          alt="logo-img"
          width={100}
          height={100}
          className="max-sm:w-[4rem] md:w-[2rem] md:ml-[0.2rem] lg:w-[5rem] md:h-[1.8rem] lg:h-12 max-sm:mx-auto"
        />
      </Link>

      <div className="hidden md:flex md:gap-5 md:pl-2 lg:gap-[2rem] font-bold md:text-[0.6rem]  lg:text-[0.8rem] whitespace-nowrap text-navTextLight dark:text-white">
        <Link href="/desktop">Desktops</Link>
        <Link href="/laptops">Laptops</Link>
        <Link href="/console-screen">Store</Link>
        <Link href="/usedparts">Components</Link>
        <Link href="/console-screen">Blogs</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/details" className="text-secondaryColorLight">
          Inspection
        </Link>
      </div>

      <div className="hidden md:flex md:justify-between items-center md:gap-[0.9rem]">
        {/* Post Your Ad Button */}
        <Link href="/postadd">
          <div className="md:w-[5rem] lg:max-w-[30rem] lg:min-w-[8rem] lg:ml-2 md:h-6 lg:h-10 md:ml-[0.1rem] bg-custom-gradient rounded-full flex justify-center items-center gap-2 cursor-pointer">
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
        </Link>

        {/* Profile and Dropdown */}
        {isLogin ? (
          <div
            className="relative"
           
          >
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full md:w-[1rem] lg:w-[1.8rem] md:mx-0 cursor-pointer"
              onClick={() =>{setIsDropdownOpen(!isDropdownOpen)}}
            />
            {isDropdownOpen && (
              <div
                className="absolute top-[120%] left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md w-40 mt-2 z-50"
              >
                <ul className="py-2 text-sm text-black grid justify-center underline ">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/card">Card</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/favorites">Favorite</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/orders">Order</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link href="/Auth/login">
            <div className="md:w-[5rem] lg:max-w-[30rem] lg:min-w-[8rem] lg:ml-2 md:h-6 lg:h-10 md:ml-[0.1rem] bg-custom-gradient rounded-full flex justify-center items-center gap-2 cursor-pointer">
              <Image
                src="/images/btnIcon.png"
                className="md:w-[0.6rem]"
                width={18}
                height={18}
                alt="btnIcon"
              />
              <p className="md:text-[0.5rem] lg:text-[0.7rem] font-bold text-white">
                Login
              </p>
            </div>
          </Link>
        )}

        <ThemeToggle />
      </div>
    </div>
  );
};

export default BottomNavigationBar;
