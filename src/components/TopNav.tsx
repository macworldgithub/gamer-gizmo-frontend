"use client";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { FaTiktok, FaYoutube } from "react-icons/fa";

const TopNav = () => {
  return (
    <div
      className={`max-md:w-full max-md:h-20 h-16 bg-gray-50 max-md:justify-between flex max-md:px-4 lg:justify-between md:justify-between items-center  md:px-5 lg:px-10`}
    >
      <Link href="/">
        <img
          src="/images/gameIcon.webp"
          alt="logo-img"
          width={100}
          height={100}
          className="max-sm:w-[2rem] sm:w-[2.5rem] md:w-[2rem]  lg:w-[5rem] md:h-[1.8rem] lg:h-12 max-sm:mx-auto"
        />
      </Link>
      {/* Dropdown Menus */}
      {/* <div className="flex  md:space-x-4  max-sm:gap-1  max-md:gap-2 md:ml-[12%]"> */}
      {/* <div className="max-md:w-[4rem]  md:w-[6rem] max-md-h-5  md:h-10 bg-[#ffffff] rounded-md flex justify-center sm:ml-8 md:ml-28 items-center">
          <select className="w-full h-full bg-transparent  max-md:text-[0.6rem] text-black rounded-md max-sm:px-1 px-2 outline-none">
            <option value="ethereum">Ethereum</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="solana">Solana</option>
          </select>
        </div> */}
      <div className="max-sm:w-[4rem]  sm:w-[5rem] md:w-[6rem] md:h-10 bg-[#ffffff] rounded-md flex justify-center items-center dark:bg-secondaryBlack dark:text-white">
        <select className="w-full h-full bg-transparent max-md:text-[0.6rem] text-black rounded-md max-sm:px-0 px-2 outline-none">
          <option value="english" className="text-black">
            English
          </option>
          <option value="arabic" className="text-black">
            Arabic
          </option>
        </select>
      </div>
      {/* </div> */}
      {/* Live Streaming Section */}
      <div className="flex items-center justify-between max-sm:mr-2 sm:mr-6">
        <div className="flex max-sm:block justify-center items-center max-sm:mr-4 sm:gap-4 mr-6">
          <p className="text-navTextLight  lg:text-[1rem] w-max text-wrap max-md:text-[0.5rem] md:text-sm  text-center   md:mr-5">
            Live Streaming Coming Soon
          </p>
          {/* <div className="px-4 tracking-wider max-sm:w-[4rem] sm:w-[5rem] sm:h-6 md:w-28 max-sm:h-6 h-[2rem] md:h-8 ml-2 mr-8 py-1 flex justify-center items-center text-[0.6rem] md:text-sm bg-custom-gradient text-white rounded-md max-sm:text-[0.5rem]">
            05:29:32:48
          </div> */}
        </div>
        <div className="flex max-md:gap-2 xl:pr-64 items-center  gap-3 max-sm:pr-4 sm:gap-4 max-sm:gap-2">
          <a
            href="https://www.facebook.com/profile.php?id=61573613765643"
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 max-sm:w-2"
          >
            <FontAwesomeIcon
              icon={faFacebookF}
              color="#4267B2"
              size="lg"
              className="hover:text-blue-400 "
            />
          </a>
          <a
            href="https://www.youtube.com/@GamerGizmo_Official"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-300 transition-colors"
          >
            <FaYoutube size={22} />
          </a>
          <a
            href="https://www.tiktok.com/@gamergizmo_official"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <FaTiktok size={22} className="text-black hover:text-gray-500" />
          </a>

          <a
            href="https://www.instagram.com/gamergizmo_official?utm_source=qr&igsh=eWdrMmpkMjEyc3p6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="z-10 max-sm:w-5 hover:text-red-300 "
              color="#E1306C"
              size="lg"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
