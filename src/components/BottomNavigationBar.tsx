"use client";
import { RootState } from "@/app/Store/Store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BottomNavigationBar = () => {
  const isLogin = useSelector((state: RootState) => state.login.isLoggedIn);
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
    <div className={`flex justify-evenly items-center h-20  dark:bg-[#0D0D12]`}>
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
        <Link href="/console-screen">Laptops</Link>
        <Link href="/console-screen">Desktops</Link>
        <Link href="/console-screen">Store</Link>
        <Link href="/console-screen">Components</Link>
        <Link href="/console-screen">Blogs</Link>
        <Link href="/console-screen">About Us</Link>
        <Link href="/console-screen">Contact Us</Link>
        <Link href="/console-screen" className="text-secondaryColorLight">
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
            className={`flex-nowrap fixed left-0  dark:bg-black dark:text-white w-[10rem] h-screen z-50 bg-red flex flex-col items-center space-y-6 overflow-y-auto
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
              <Link href="/postadd">
                <div className="w-[7rem] mx-auto h-10 bg-custom-gradient rounded-full flex justify-center items-center gap-2 cursor-pointer">
                  <Image
                    src="/images/btnIcon.png"
                    className="w-[0.8rem]"
                    width={18}
                    height={18}
                    alt="btnIcon"
                  />
                  <span className="text-sm text-white">Post Your Ad</span>
                </div>
              </Link>

              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:flex md:justify-between items-center md:gap-[0.9rem]">
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

        {/* <Image
          src="/images/profile.png"
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full md:w-[1rem] lg:w-[1.8rem] md:mx-0"
        /> */}
        {isLogin ? (
          // Show the profile image if logged in
          <Image
            src="/images/profile.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full md:w-[1rem] lg:w-[1.8rem] md:mx-0"
          />
        ) : (
          // Show the login button if not logged in
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
      {/* </div> */}
    </div>
  );
};

export default BottomNavigationBar;
