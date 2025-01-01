"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { setLogin } from "@/app/Redux/LoginSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const CredentialSide = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username && password) {
      dispatch(setLogin(true)); 
router.push('/')
    }
  };
  return (
    <div
      id="loginCredentials"
      className={`flex dark:shadow-combinedNight shadow-combinedDay max-sm:h-max rounded-l-[12px] flex-col w-[60%] max-md:w-[100%] dark:bg-black  items-center gap-5 max-sm:gap-2 box-border   max-sm:mb-[300px] p-10 `}
    >
      <div className="w-[100%] mb-7 max-sm:mb-3">
        <h1
          className={`text-[2rem] max-sm:text-[1.5rem] font-bold text-left text-black dark:text-white `}
        >
          Login Your Account
        </h1>
      </div>
      <input
      type="text"
        className={`w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
        placeholder="User name or email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={`w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={`w-[100%] text-black dark:text-white`}>
        <label htmlFor="rememberMe">
          <input type="radio" id="rememberMe" />
          <span id="customRadio"></span> Remember Me
        </label>
      </div>
    
      <div className="w-[100%]  h-max">
        <button onClick={handleLogin} className=" bg-custom-gradient  text-white w-[100%] py-2 rounded-full flex justify-center ">
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
    
      
      <Link className="text-[#DC39FC] underline" href="/Auth/register">Register me</Link>
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
