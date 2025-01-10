"use client";
import React, { useState } from "react";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "@/app/Redux/ThemeSlice";

// const [isDarkMode,setDa]
const ThemeToggle = () => {
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);
  //@ts-ignore
  const theme = useSelector((state) => state.Theme.theme);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      window.dispatchEvent(new Event("storage"));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      window.dispatchEvent(new Event("storage"));
    }

    // dispatch(changeTheme());
  };
  return (
    <div
      className="relative  md:w-[5rem] lg:max-w-[9rem] lg:min-w-[7rem] md:h-[2rem] lg:h-[3rem] bg-white rounded-full  flex justify-between items-center  p-1 max-md:my-6 cursor-pointer shadow-md shadow-blue-500/50"
      onClick={handleToggle}
    >
      {/* Icons */}
      <div className="absolute md:left-[0.8rem] lg:left-[1.28rem] max-md:left-[1rem] flex items-center space-x-12 w-36">
        <FontAwesomeIcon icon={faSun} className="z-10 " color="#000000" />
        {/* color={isDarkMode ? 'white' : 'black'} */}
      </div>
      <div className="absolute md:left-[3rem] lg:left-[63%] max-md:left-[3.7rem] flex max-lg:items-center  w-[8rem]">
        <FontAwesomeIcon
          icon={faMoon}
          className="z-10"
          color={`${
            localStorage.getItem("theme") === "dark" ? "#ffffff" : "#000000"
          }`}
        />
        {/* style={{ color: isDarkMode ? 'white' : 'black' }} */}
      </div>
      <div
        className={`lg:w-[3rem] md:w-[2rem] max-md:w-[2.5rem] max-md:h-[1.7rem] md:h-[1.5rem] lg:h-[2rem] bg-custom-gradient rounded-full transform transition-all duration-300 ${
          localStorage.getItem("theme") === "dark"
            ? "translate-x-[100%]"
            : "translate-x-0"
        }`}
      />
    </div>
  );
};

export default ThemeToggle;
