"use client";
import { RootState } from "@/components/Store/Store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SettingOutlined } from "@ant-design/icons";
import { MdOutlineFavorite } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import type { MenuProps } from "antd";
import { FaCartPlus } from "react-icons/fa";
import { Dropdown } from "antd";
import { CiLogout } from "react-icons/ci";
import { clearUserData } from "./Store/Slicer/LoginSlice";
import axios from "axios";
import { toast } from "react-toastify";
const BottomNavigationBar = () => {
  const isLogin = useSelector((state: RootState) => state.user.token != null);
  const token = useSelector((state: RootState) => state.user.token);
  const router = useRouter();
  const theme = useSelector((state: RootState) => state.Theme.theme);
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const dispatch = useDispatch();
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
  const LogoutUser = async () => {
    try {
      console.log(token, "token");
      let res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logoutUser`,
        {
          token: token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token
          },
        }
      );
      if (res.status == 201) {
        dispatch(clearUserData());
        router.push("/auth/login");
        toast.success("SuccessFully Logout");
      } else {
        toast.error("Failed to Logout");
      }
    } catch (err) {
      toast.error("Failed to Logout");
    }
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setFirstClick(true);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      icon: <CgProfile />,
      label: <Link href="/profile">Profile</Link>,
    },
    {
      icon: <FaCartPlus />,
      key: "3",
      label: "Cart",
    },
    {
      key: "4",

      icon: <MdOutlineFavorite />,
      label: "Favourites",
    },
    {
      key: "5",
      icon: <SettingOutlined />,
      label: "Orders",
    },
    {
      key: "6",
      label: <p className="font-bold text-red-700">Logout</p>,
      icon: <CiLogout color={"#b91c1c"} />,
      onClick: () => {
        LogoutUser();
      },
    },
  ];
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
      {/* </div> */}
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
            className={`flex-nowrap fixed left-0 text-black dark:bg-black bg-white dark:text-white w-[10rem] h-[85vh] z-50 bg-red flex flex-col items-center space-y-6 max-sm:gap-1 max-sm:space-y-2  overflow-y-auto
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
              href="/desktop"
              className="text-lg hover:text-gray-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              Desktops
            </Link>
            <Link
              href="/laptops"
              className=" text-lg  hover:text-gray-300 "
              onClick={() => setIsDrawerOpen(false)}
            >
              Laptops
            </Link>

            <Link
              href="#"
              className="text-lg hover:text-gray-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              Store
            </Link>
            <Link
              href="/usedparts"
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
              href="/contact"
              className=" text-lg hover:text-gray-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="/details"
              className=" text-lg hover:text-gray-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              Inspection
            </Link>

            <div className="flex-col items-center mx-auto pl-0">
              <Link href="/publish-add">
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
        <Link href="/publish-add">
          <div className="md:w-[5rem] lg:max-w-[30rem] lg:min-w-[8rem] lg:ml-2 md:h-6 lg:h-10 md:ml-[0.1rem] bg-custom-gradient rounded-full flex justify-center items-center gap-2 cursor-pointer">
            <Image
              src="/images/btnIcon.png"
              className="md:w-[0.6rem]"
              width={18}
              height={18}
              alt="btnIcon"
            />
            <p className="md:text-[0.5rem] lg:text-[0.7rem] font-bold text-white">
              Post Your Add
            </p>
          </div>
        </Link>

        {isLogin ? (
          <div className="shadow-md flex  shadow-blue-500/50 rounded-full justify-center items-center">
            <Dropdown className="shadow-2xl" menu={{ items }}>
              <Image
                src="/images/profile.png"
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full hover:cursor-pointer md:w-[1rem] lg:w-[2.3rem] md:mx-0"
              />
            </Dropdown>
          </div>
        ) : (
          <Link href="/auth/login">
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
