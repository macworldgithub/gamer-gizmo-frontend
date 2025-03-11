"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/app/utils/formatDate";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { WhatsAppOutlined } from "@ant-design/icons";
import { MdVerified } from "react-icons/md";
import Verified from "../../../../public/images/Verified.svg";
import { useRouter } from "next/navigation";

const Rightsection = ({ data }: any) => {
  const [quantity, setQuantity] = useState(2);
  const router = useRouter();
  const profileUrl = data?.users?.profile
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${data?.users?.profile}`
    : null;
  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  console.log(data, "data");

  return (
    <div className=" max-md:hidden py-10 flex flex-col  justify-center items-start gap-8 pl-2">
      {/* First Card (Price & Quantity) */}
      <div className=" h-fit border-gray-300 rounded-lg p-6 w-72  bg-white shadow-md flex flex-col justify-between dark:bg-black">
        {/* Price Heading */}
        <h1 className="text-2xl font-bold text-purple-600 text-center md:text-3xl">
          AED {data.price}
        </h1>
        {/* Horizontal Divider */}
        {/* <hr className="my-6 border-gray-300 w-full " /> */}
        {/* Quantity Selector */}
        {/* <div className="flex items-center justify-center w-fit mx-auto border border-purple-500 rounded-md overflow-hidden mb-4">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center font-bold text-purple-600 hover:bg-purple-100 transition rounded-l-md"
          >
            -
          </button>

          <span className="w-10 h-8 flex items-center justify-center font-bold text-purple-600 border-x border-purple-500">
            {quantity}
          </span>

          <button
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center font-bold text-purple-600 hover:bg-purple-100 transition rounded-r-md"
          >
            +
          </button>
        </div> */}
        {/* <div className="space-y-4">
          <button className="flex items-center justify-center w-3/4 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 shadow-md hover:scale-105 transform transition md:py-3">
            <Image
              src="/images/addcart.png"
              alt="Cart Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            BUY NOW
          </button>

          <button className="flex items-center justify-center w-3/4 mx-auto text-purple-600 border border-purple-600 font-bold py-2 hover:bg-purple-100 transition md:py-3">
            Add to Cart
          </button>
        </div>
*/}{" "}
      </div>

      {/* Seller Details Section */}
      <div className="dark:bg-black  border-gray-300 rounded-lg p-6 w-72 h-fit bg-white shadow-md flex flex-col items-center">
        <div className="flex justify-center gap-2 items-center">
          <div className=" flex items-center  justify-center flex-col gap-1">
            {data?.is_verified_by_admin ? (
              <>
                <MdVerified />
                <p className="text-purple-600 font-bold text-[0.6rem]">
                  Verified
                </p>
              </>
            ) : (
              <p className="text-red-500 font-bold text-[0.6rem]">
                Not Verified
              </p>
            )}
          </div>
          <h2 className="text-center text-lg font-bold text-gray-800 dark:text-white">
            Seller Details
          </h2>
        </div>

        {/* Horizontal Line */}
        <hr className="my-4 border-gray-300 w-full" />

        {/* Seller Information */}
        <div className="flex items-center mb-6 gap-2">
          {/* Seller Image */}
          {/* <Image
            src={
              data?.users?.profile
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${data?.users?.profile}`
                : "/images/person.png"
            }
            alt="kk"
            width={40}
            height={40}
            className="rounded-full mr-4"
          /> */}
          {profileUrl ? (
            <img
              src={profileUrl}
              alt="User Avatar"
              className="w-11 h-11    rounded-full"
              onError={(e) => {
                //@ts-ignore
                e.target.onerror = null;
                //@ts-ignore

                e.target.style.display = "none";
              }}
            />
          ) : (
            <FaUser className="w-8 h-8 text-gray-500" />
          )}
          {/* Seller Name and Member Since */}
          <div className="text-left">
            <p className="text-gray-800 font-semibold dark:text-white">
              {data?.users?.first_name} {data?.users?.last_name} ({" "}
              {data?.users?.gender})
            </p>
            <p className="text-gray-500 text-sm dark:text-[#969696]">
              Member Since {formatDate(data?.users?.created_at)}
            </p>
          </div>
        </div>
        <div className="text-sm text-black"></div>
        {/* Icons Row */}
        <div className="flex flex-col justify-center gap-2 items-center space-x-6 mb-6 dark:invert">
          <a
            href={`https://wa.me/${data?.users?.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 text-black cursor-pointer"
          >
            <WhatsAppOutlined />
            <div className="text-sm">{data?.users?.phone}</div>
          </a>

          {/* Email Link */}
          <a
            href={`mailto:${data?.users?.email}`}
            className="flex gap-4 text-black cursor-pointer"
          >
            <MdOutlineMailLock />
            <div className="text-sm">{data?.users?.email}</div>
          </a>
        </div>
        <button
          onClick={() => router.push(`/chat/234432432`)}
          className="bg-purple-600 py-2 text-white w-full flex justify-center items-center gap-4"
        >
          Start a Chat
          <IoChatbubbleEllipses />
        </button>

        {/* Footer Text */}
        {/* <p className="text-center text-sm text-gray-600 mb-2 dark:text-white">
          See if your friends know this seller
        </p>
        <p className="text-center text-sm text-blue-600 font-semibold cursor-pointer hover:underline">
          Connect with Facebook
        </p> */}
      </div>

      {/* Third Card (Buy From GamerGizmo) */}
      <div className="dark:bg-black border-gray-300 rounded-lg p-6 w-64 h-64 bg-white shadow-md flex flex-col items-center">
        <Image
          src="/images/trawly.png"
          alt="Cart Icon"
          width={60}
          height={80}
        />
        <h2 className=" text-center text-sm font-bold text-purple-600 mt-4">
          Buy From GamerGizmo and Get
        </h2>
        <ul className="mt-4 text-black text-center space-y-1 dark:text-white">
          <li>1. 100% Genuine Products</li>
          <li className="-ml-8">2. Hassle Free Buying</li>{" "}
          {/* Adjusted position */}
          <li>3. Money Back Guarantee</li>
        </ul>
      </div>
    </div>
  );
};

export default Rightsection;
