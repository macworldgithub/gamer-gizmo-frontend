"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
const CredentialSide = () => {
  const theme = useSelector((state: any) => state.Theme.theme);

  const [headingTextColor, setHeadingTextColor] = useState("text-black");
  const [borderColor, setBorderColor] = useState("");

  useEffect(() => {
    if (theme === "day") {
      setHeadingTextColor("text-black");
      setBorderColor("shadow-combinedDay");
    } else {
      setHeadingTextColor("text-white");
      setBorderColor("shadow-combinedNight");
    }
  }, [theme]);

  return (
    <div
      id="loginCredentials"
      className={`flex  ${borderColor} flex-col w-[60%] max-md:w-[100%]  items-center gap-5 max-sm:gap-2 box-border   max-sm:mb-[300px] p-10 `}
    >
      <div className="w-[100%] mb-7 max-sm:mb-3">
        <h1
          className={`text-[2rem] max-sm:text-[1.5rem] font-bold text-left ${headingTextColor} `}
        >
          Login Your Account
        </h1>
      </div>
      <input
        className="w-[100%] p-3 rounded bg-customPurple font-bold"
        placeholder="User name or email"
      />
      <input
        className="w-[100%] p-3 rounded bg-customPurple font-bold"
        placeholder="Password"
      />
      <div className={`w-[100%] ${headingTextColor}`}>
        <input type="radio" /> Remember Me
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
