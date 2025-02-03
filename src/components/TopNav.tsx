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

const TopNav = () => {
  return (
    <div
      className={`max-md:w-full max-md:h-20 h-16 bg-gray-50 max-md:justify-between   flex max-md:px-4 lg:justify-between md:justify-between items-center  md:px-5 lg:px-10`}
    >
      <Link href="/">
        <Image
          src="/images/gameIcon.png"
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
      <div className="max-sm:w-[4rem]  sm:w-[5rem] md:w-[6rem] md:h-10 bg-[#ffffff] rounded-md flex justify-center items-center">
        <select className="w-full h-full bg-transparent max-md:text-[0.6rem] text-black rounded-md max-sm:px-0 px-2 outline-none">
          <option value="english">English</option>
          <option value="french">Arabic</option>
        </select>
      </div>
      {/* </div> */}
      {/* Live Streaming Section */}
      <div className="flex items-center justify-between max-sm:mr-2 sm:mr-6">
        <div className="flex max-sm:block justify-center items-center max-sm:mr-4 sm:gap-4">
          <p className="text-navTextLight lg:text-[1rem] w-max text-wrap max-md:text-[0.5rem] md:text-sm  text-center   md:mr-5">
            Live Streaming Coming Soon
          </p>
          <div className="px-4 tracking-wider max-sm:w-[4rem] sm:w-[5rem] sm:h-6 md:w-28 max-sm:h-6 h-[2rem] md:h-8 ml-2 mr-8 py-1 flex justify-center items-center text-[0.6rem] md:text-sm bg-custom-gradient text-white rounded-md max-sm:text-[0.5rem]">
            05:29:32:48
          </div>
        </div>
        <div className="flex max-md:gap-2 xl:pr-64 gap-3 max-sm:pr-4 sm:gap-4 max-sm:gap-2">
          <FontAwesomeIcon
            icon={faFacebookF}
            className="z-10 max-sm:w-2"
            color="#4267B2"
          />
          <FontAwesomeIcon
            icon={faTwitter}
            className="z-10 max-sm:w-3"
            color="#a0a4a7"
          />
          <FontAwesomeIcon
            icon={faInstagram}
            className="z-10 max-sm:w-3"
            color="#a0a4a7"
          />
          <FontAwesomeIcon
            icon={faGlobe}
            className="z-10 max-sm:w-3"
            color="#a0a4a7"
          />
          <FontAwesomeIcon
            icon={faLinkedin}
            className="z-10 max-sm:w-3"
            color="#a0a4a7"
          />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
