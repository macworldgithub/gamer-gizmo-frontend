"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useThemeStyles } from "@/theme/useThemeStyles";
const CredentialSide = () => {
  const themeStyles = useThemeStyles();

  return (
    <div
      id="loginCredentials"
      className={`flex ${themeStyles.borderColor} max-sm:h-max rounded-l-[12px] flex-col w-[60%] max-md:w-[100%] ${themeStyles.loginBackgroundColor}  items-center gap-5 max-sm:gap-2 box-border   max-sm:mb-[300px] p-10 `}
    >
      <div className="w-[100%] mb-7 max-sm:mb-3">
        <h1
          className={`text-[2rem] max-sm:text-[1.5rem] font-bold text-left ${themeStyles.headingTextColor} `}
        >
          Login Your Account
        </h1>
      </div>
      <input
        className={`w-[100%] p-3 rounded ${themeStyles.inputBackgroundColor} font-bold ${themeStyles.inputTextColor} border-2 ${themeStyles.inputBorderColor}  focus:outline-none`}
        placeholder="User name or email"
      />
      <input
        className={`w-[100%] p-3 rounded ${themeStyles.inputBackgroundColor} font-bold ${themeStyles.inputTextColor} border-2 ${themeStyles.inputBorderColor} focus:outline-none`}
        placeholder="Password"
      />
      <div className={`w-[100%] ${themeStyles.headingTextColor}`}>
        <label htmlFor="rememberMe">
          <input type="radio" id="rememberMe" />
          <span id="customRadio"></span> Remember Me
        </label>
      </div>
      <div className="w-[100%]  h-max">
        <button className=" bg-custom-gradient  text-white w-[100%] py-2 rounded-full flex justify-center ">
          <Image
            className=" mt-1 mr-1"
            src={"/images/send.svg"}
            width={16}
            height={13}
            alt="login"
          />
          Sign In
        </button>
      </div>
      <h2 className="text-[#DC39FC] underline">Register me</h2>
      <div className=" relative mt-3">
        <div className=" text-white bg-[#DC39FC] flex justify-center items-center rounded absolute top-[-10px] right-[75px] w-[50px] h-[30px]">
          or
        </div>
        <div className="flex mt-1 gap-2 bg-customPurple px-8 py-7">
          <Image src={"/images/fb.svg"} alt="facebook" width={40} height={40} />
          <Image
            src={"/images/ln.svg"}
            alt="instagram"
            width={40}
            height={40}
          />
          <Image src={"/images/tw.svg"} alt="twitter" width={40} height={40} />
        </div>
      </div>
    </div>
  );
};

export default CredentialSide;
