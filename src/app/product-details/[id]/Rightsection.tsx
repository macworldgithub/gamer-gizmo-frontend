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
import { useSelector } from "react-redux";
import { RootState } from "@/components/Store/Store";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Rightsection = ({ data }: any) => {
  const token = useSelector((state: RootState) => state.user.token);
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
  const MoveToChatScreen = () => {
    if (!token) {
      toast.error("Please Login First ");
      return;
    } else {
      router.push(`/chat/234432432`);
    }
  };
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
      <div className="dark:bg-black border-gray-300 rounded-lg p-6 w-72 h-fit bg-white shadow-md flex flex-col items-center">
        {data?.is_store_product ? (
          <>
            {/* Display Gamer Gizmo for Store Products */}
            <h2 className="text-center text-lg font-bold text-gray-800 dark:text-white">
              Gamer Gizmo
            </h2>

            {/* WhatsApp & Email Icons with Fixed Contact Info */}
            <div className="flex flex-col justify-center gap-2 items-center space-x-6 mt-4 dark:invert">
              <a
                href="https://wa.me/971555795213"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 text-black cursor-pointer"
              >
                <WhatsAppOutlined />
                <div className="text-sm">+971555795213</div>
              </a>

              <a
                href="mailto:support@gamergizmo.com"
                className="flex gap-4 text-black cursor-pointer"
              >
                <MdOutlineMailLock />
                <div className="text-sm">support@gamergizmo.com</div>
              </a>
            </div>
          </>
        ) : token ? (
          <>
            {/* Verified or Not Verified */}
            <div className="flex justify-center gap-2 items-center">
              <div className="flex items-center justify-center flex-col gap-1">
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
                Posted by
              </h2>
            </div>

            {/* Horizontal Line */}
            <hr className="my-4 border-gray-300 w-full" />

            {/* Seller Information */}
            <div className="flex items-center mb-6 gap-2">
              {/* Seller Image */}
              {profileUrl ? (
                <img
                  src={profileUrl}
                  alt="User Avatar"
                  className="w-11 h-11 rounded-full"
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
                  {data?.users?.first_name || "Unknown"}{" "}
                  {data?.users?.last_name || ""} ({data?.users?.gender || "N/A"}
                  )
                </p>
                <p className="text-gray-500 text-sm dark:text-[#969696]">
                  Member Since {formatDate(data?.users?.created_at)}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col justify-center gap-2 items-center space-x-6 mb-6 dark:invert">
              <a
                href={`https://wa.me/${data?.users?.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 text-black cursor-pointer"
              >
                <WhatsAppOutlined />
                <div className="text-sm">{data?.users?.phone || "N/A"}</div>
              </a>

              <a
                href={`mailto:${data?.users?.email}`}
                className="flex gap-4 text-black cursor-pointer"
              >
                <MdOutlineMailLock />
                <div className="text-sm">{data?.users?.email || "N/A"}</div>
              </a>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-800 dark:text-white">
            Please{" "}
            <span className="text-blue-600 font-semibold cursor-pointer">
              <Link
                href="/auth/login"
                className="text-secondaryColorDark font-bold text-lg"
              >
                log in
              </Link>
            </span>{" "}
            to view seller details.
          </p>
        )}
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
