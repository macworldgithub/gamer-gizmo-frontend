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

const TopNav = () => {
  return (
    <div
      className={`max-md:w-full max-md:h-20 h-16 bg-white dark:bg-black max-md:mx-auto  flex max-md:justify-center lg:justify-between md:justify-center items-center  md:px-0 lg:px-10`}
    >
      {/* Dropdown Menus */}
      <div className="flex  md:space-x-4    max-md:gap-2 md:ml-[12%]">
        <div className="max-md:w-[4rem]  md:w-[6rem] max-md-h-5  md:h-10 bg-[#ffffff] rounded-md flex justify-center sm:ml-8 md:ml-28 items-center">
          <select className="w-full h-full bg-transparent max-sm:text-[0.7rem] sm:text-sm text-black rounded-md max-sm:px-1 px-2 outline-none">
            <option value="ethereum">Ethereum</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="solana">Solana</option>
          </select>
        </div>
        <div className="max-sm:w-[4rem]  sm:w-[5rem] md:w-[6rem] md:h-10 bg-[#ffffff] rounded-md flex justify-center items-center">
          <select className="w-full h-full bg-transparent max-sm:text-xs sm:text-sm text-black rounded-md max-sm:px-0 px-2 outline-none">
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
      </div>
      {/* Live Streaming Section */}
      <div className="flex items-center max-sm:mr-2 mr-[20%]">
        <div className="flex max-sm:block justify-center items-center">
          <p className="text-navTextLight lg:text-[1rem] w-max text-wrap max-md:text-[0.5rem] md:text-base  text-center   md:mr-5">
            Live Streaming Coming Soon
          </p>
          <div className="px-4 tracking-wider max-sm:w-[5rem]  w-44 max-sm:h-8 h-[2rem] md:h-12 ml-2 mr-8 py-1 flex justify-center items-center text-[0.6rem] md:text-lg bg-custom-gradient text-white rounded-md">
            05:29:32:48
          </div>
        </div>
        <div className="flex  gap-3">
          <FontAwesomeIcon
            icon={faFacebookF}
            className="z-10"
            color="#4267B2"
          />
          <FontAwesomeIcon icon={faTwitter} className="z-10" color="#a0a4a7" />
          <FontAwesomeIcon
            icon={faInstagram}
            className="z-10"
            color="#a0a4a7"
          />
          <FontAwesomeIcon icon={faGlobe} className="z-10" color="#a0a4a7" />
          <FontAwesomeIcon icon={faLinkedin} className="z-10" color="#a0a4a7" />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
