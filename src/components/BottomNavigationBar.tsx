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
import { LuPanelLeftClose } from "react-icons/lu";

const BottomNavigationBar = () => {
  const isLogin = useSelector((state: RootState) => state.user.token != null);
  const token = useSelector((state: RootState) => state.user.token);
  const router = useRouter();
  const theme = useSelector((state: RootState) => state.Theme.theme);
  const profile = useSelector((state: RootState) => state.user.profile);
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (theme === "day") {
      document.body.classList.add("bg-white");
      document.body.classList.remove("bg-black");
    } else {
      document.body.classList.add("bg-black");
      document.body.classList.remove("bg-white");
    }
  }, [theme]);

  // Maintain active tab selection on page reload
  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  const LogoutUser = async () => {
    try {
      let res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logoutUser`,
        { token },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status == 201) {
        dispatch(clearUserData());
        router.push("/auth/login");
        toast.success("Successfully Logged Out");
      } else {
        toast.error("Failed to Logout");
      }
    } catch (err) {
      toast.error("Failed to Logout");
    }
  };

  const items: MenuProps["items"] = [
    { key: "1", label: "My Account", disabled: true },
    { type: "divider" },
    {
      key: "2",
      icon: <CgProfile />,
      label: <Link href="/profile">Profile</Link>,
    },
    {
      icon: <FaCartPlus />,
      key: "3",
      label: <Link href="/my-adds">My Ads</Link>,
    },
    {
      key: "4",
      icon: <MdOutlineFavorite />,
      label: <Link href="/favourites">Favourites</Link>,
    },
    {
      key: "5",
      label: <p className="font-bold text-red-700">Logout</p>,
      icon: <CiLogout color={"#b91c1c"} />,
      onClick: LogoutUser,
    },
  ];

  const tabs = [
    { name: "Desktops", href: "/desktop" },
    { name: "Laptops", href: "/laptops" },
    { name: "Consoles", href: "/console" },
    { name: "Components", href: "/usedparts" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
    { name: "About Us", href: "/about" },
    { name: "Inspection", href: "/Inspection" },
  ];

  return (
    <div className="flex justify-evenly items-center h-20 dark:bg-[#0D0D12]">
      <div className="hidden md:flex md:gap-5 md:pl-2 lg:gap-[2rem] font-bold md:text-[0.6rem] lg:text-[0.8rem] whitespace-nowrap text-navTextLight dark:text-white">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            onClick={() => handleTabClick(tab.name)}
            className={`${
              activeTab === tab.name ? "text-secondaryColorLight font-bold" : ""
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex md:justify-between items-center md:gap-[0.9rem]">
        <Link href="/publish-ad">
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

        {isLogin ? (
          <div className="shadow-md flex shadow-blue-500/50 rounded-full justify-center items-center">
            <Dropdown className="shadow-2xl" menu={{ items }}>
              <Image
                src={
                  profile != null
                    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${profile}`
                    : "/images/profile.png"
                }
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
