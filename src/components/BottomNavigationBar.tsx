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
import { FaCartPlus, FaRegUserCircle } from "react-icons/fa";
import { Dropdown } from "antd";
import { CiLogout } from "react-icons/ci";
import { clearUserData } from "./Store/Slicer/LoginSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { LuPanelLeftClose } from "react-icons/lu";
import { LiaAdSolid } from "react-icons/lia";
const BottomNavigationBar = () => {
  const isLogin = useSelector((state: RootState) => state.user.token != null);
  const token = useSelector((state: RootState) => state.user.token);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("");
  const theme = useSelector((state: RootState) => state.Theme.theme);
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const profile = useSelector((state: RootState) => state.user.profile);
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  useEffect(() => {
    if (theme === "day") {
      setBackgroundColor("bg-white");
    } else {
      setBackgroundColor("bg-black");
    }
  }, [theme]);

  const handleTabClick = (tab: string) => setActiveTab(tab);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
        if (isDrawerOpen) {
          setIsDrawerOpen(false);
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
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logoutUser`,
        { token: token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        dispatch(clearUserData());
        router.push("/auth/login");
        toast.success("Successfully Logged Out");
      } else {
        // Optional fallback
        dispatch(clearUserData());
        router.push("/auth/login");
        toast.error("Token invalid or already removed. Logged out.");
      }
    } catch (err) {
      // Handle invalid token or any other error
      dispatch(clearUserData());
      router.push("/auth/login");
      toast.error(
        "Session expired or invalid token. You have been logged out."
      );
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setFirstClick(true);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p className="font-bold text-red-700"> My Account</p>,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      icon: <CgProfile />,
      label: (
        <Link onClick={() => setIsDrawerOpen(false)} href="/profile">
          Profile
        </Link>
      ),
    },
    {
      icon: <LiaAdSolid className="size-5" />,
      key: "3",
      label: (
        <Link onClick={() => setIsDrawerOpen(false)} href="/my-adds">
          My Ads
        </Link>
      ),
    },
    {
      key: "4",

      icon: <MdOutlineFavorite />,
      label: (
        <Link onClick={() => setIsDrawerOpen(false)} href="/favourites">
          Favourites
        </Link>
      ),
    },
    {
      key: "5",

      icon: <FaCartPlus />,
      label: (
        <Link onClick={() => setIsDrawerOpen(false)} href="/Add-to-Cart">
          My Cart Items{" "}
        </Link>
      ),
    },
    {
      key: "6",

      icon: (
        <Image
          src="/images/purchase-order.png"
          alt="Orders"
          width={20}
          height={20}
        />
      ),
      label: (
        <Link onClick={() => setIsDrawerOpen(false)} href="/order">
          My Orders
        </Link>
      ),
    },
    {
      key: "7",
      label: <p className="font-bold text-red-700">Logout</p>,
      icon: <CiLogout color={"#b91c1c"} />,
      onClick: () => {
        LogoutUser();
      },
    },
  ];

  const tabs = [
    { name: "Gaming PCs", href: "/desktop" },
    { name: "Laptops", href: "/laptops" },
    { name: "Gaming Consoles", href: "/console" },
    { name: "Components and Accessories", href: "/components" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
    { name: "About Us", href: "/about" },
    { name: "Store", href: "/store" },
    { name: "Inspection", href: "/Inspection" },
  ];

  return (
    //desktop
    <div className={`flex justify-evenly items-center h-20  dark:bg-[#0D0D12]`}>
      {/* </div> */}
      <div className="hidden md:flex md:gap-3 lg:gap-[.9rem] xl:gap-8 font-bold md:text-[0.5rem]  lg:text-[0.8rem]  whitespace-nowrap text-navTextLight dark:text-white">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            onClick={() => handleTabClick(tab.name)}
            className={`${
              activeTab === tab.name ? "text-secondaryColorLight" : ""
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
      {/* Mobile drawer */}
      <div className="md:hidden absolute  left-0 ml-4 ">
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
          <>
            <div
              className="fixed  inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 "
              onClick={() => setIsDrawerOpen(false)} // Close drawer when clicking outside
            ></div>
            <div
              className={`flex-nowrap fixed top-0 left-0 text-black dark:bg-black bg-white dark:text-white w-[10rem] h-[100vh] z-50 bg-red flex flex-col items-center space-y-6 max-sm:gap-2 max-sm:space-y-2 pt-1 overflow-y-auto
                            ${
                              isDrawerOpen
                                ? "animate-slide-in"
                                : firstClick
                                ? "animate-slide-out"
                                : "hidden"
                            }`}
            >
              <div onClick={() => setIsDrawerOpen(false)}>
                <LuPanelLeftClose
                  size={28}
                  color="black"
                  className="my-4 dark:invert"
                />
              </div>
              {isLogin ? (
                //Mobile Profile Icon
                <div className="shadow-md flex  shadow-blue-500/50 rounded-full w-10 h-10 justify-center items-center">
                  <Dropdown className="shadow-2xl" menu={{ items }}>
                    {profile ? (
                      <Image
                        //@ts-ignore
                        src={profile}
                        alt="Profile"
                        width={50}
                        height={50}
                        className="w-full h-full object-cover rounded-full  hover:cursor-pointer"
                      />
                    ) : (
                      <span className="cursor-pointer">
                        <FaRegUserCircle className="text-3xl text-secondaryColorLight" />
                      </span>
                    )}
                  </Dropdown>
                </div>
              ) : (
                <Link href="/auth/login" onClick={() => setIsDrawerOpen(false)}>
                  <div className="w-[5rem] h-8 bg-custom-gradient rounded-full flex justify-center gap-2 items-center cursor-pointer">
                    <Image
                      src="/images/btnIcon.png"
                      className="md:w-[0.6rem]"
                      width={14}
                      height={14}
                      alt="btnIcon"
                    />
                    <p className="text-xs font-bold text-white">Login</p>
                  </div>
                </Link>
              )}
              {username && (
                <p className="text-secondaryColorLight">{username}</p>
              )}
              <Link
                href="/desktop"
                className="text-sm  hover:text-secondaryColorDark"
                onClick={() => setIsDrawerOpen(false)}
              >
                Gaming PCs
              </Link>
              <Link
                href="/laptops"
                className=" text-sm  hover:text-secondaryColorDark "
                onClick={() => setIsDrawerOpen(false)}
              >
                Laptops
              </Link>

              <Link
                href="/console"
                className="text-sm  hover:text-secondaryColorDark"
                onClick={() => setIsDrawerOpen(false)}
              >
                Gaming Consoles
              </Link>
              <Link
                href="/components"
                className="text-sm  hover:text-secondaryColorDark text-center"
                onClick={() => setIsDrawerOpen(false)}
              >
                Components and Accessories
              </Link>
              <Link
                href="/blogs"
                className="text-sm  hover:text-secondaryColorDark"
                onClick={() => setIsDrawerOpen(false)}
              >
                Blogs
              </Link>

              <Link
                href="/contact"
                className=" text-sm  hover:text-secondaryColorDark"
                onClick={() => setIsDrawerOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                className="text-sm"
                href="/about"
                onClick={() => setIsDrawerOpen(false)}
              >
                About Us
              </Link>
              <Link
                className="text-sm"
                href="/store"
                onClick={() => setIsDrawerOpen(false)}
              >
                Store
              </Link>

              <Link
                href="/Inspection"
                className=" text-sm  hover:text-secondaryColorDark"
                onClick={() => setIsDrawerOpen(false)}
              >
                Inspection
              </Link>

              <div className="flex-col items-center mx-auto pl-0">
                <Link href="/publish-ad" onClick={() => setIsDrawerOpen(false)}>
                  <div className="w-[6rem] mx-auto h-8 bg-custom-gradient rounded-full flex justify-center items-center gap-2 cursor-pointer">
                    <Image
                      src="/images/btnIcon.png"
                      className="w-[0.6rem]"
                      width={14}
                      height={14}
                      alt="btnIcon"
                    />
                    <span className="text-[0.6rem] text-white ">
                      Post Your Ad
                    </span>
                  </div>
                </Link>

                <ThemeToggle />
              </div>
            </div>
          </>
        )}
      </div>
      {/* Desktop and Laptop */}
      <div className="hidden md:flex md:justify-between items-center lg:gap-4 xl:gap-8 md:gap-[0.5rem]">
        <Link href="/publish-ad">
          <div
            className="md:w-[5rem] lg:max-w-[30rem]  lg:min-w-[6rem]  md:h-8 lg:h-10 md:ml-[0.1rem] bg-custom-gradient rounded-full 
            flex justify-center items-center gap-2 cursor-pointer"
          >
            <Image
              src="/images/btnIcon.png"
              className="md:w-[0.6rem] hide-at-1024-1026"
              width={18}
              height={18}
              alt="btnIcon"
            />
            <p className="md:text-[0.5rem] lg:text-[0.7rem] font-bold text-white">
              Post Your Ad
            </p>
          </div>
        </Link>

        {isLogin ? (
          //Desktop and Laptop Profile Icon
          <div className="w-10 h-10 shadow-md shadow-blue-500/50 rounded-full flex justify-center items-center overflow-hidden">
            <Dropdown className="shadow-2xl" menu={{ items }}>
              {profile ? (
                <Image
                  //@ts-ignore
                  src={profile}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-full hover:cursor-pointer"
                />
              ) : (
                <span>
                  <FaRegUserCircle className="text-2xl  text-secondaryColorLight" />
                </span>
              )}
            </Dropdown>
          </div>
        ) : (
          <Link href="/auth/login">
            <div className="md:w-[5rem] lg:max-w-[30rem] lg:min-w-[8rem] lg:ml-2  md:h-6 lg:gap-3 lg:h-10 md:ml-[0.1rem] bg-custom-gradient rounded-full flex justify-center items-center gap-2 cursor-pointer">
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
