import React from "react";
import Image from "next/image";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { formatDate } from "@/app/utils/formatDate";
import { MdOutlineMailLock } from "react-icons/md";
import { WhatsAppOutlined } from "@ant-design/icons";
const Sellersdetails = ({ data }: any) => {
  console.log(data, "no data");
  return (
    <div className="md:hidden w-full mt-4">
      <div className="dark:border-[#6345ED] dark:border dark:bg-black border-gray-300 rounded-lg p-2 h-80 bg-white shadow-md flex flex-col items-center ">
        {/* Heading */}
        <h2 className="text-center text-lg font-bold text-gray-800 dark:text-white">
          Seller Details
        </h2>

        {/* Horizontal Line */}
        <hr className="my-4 border-gray-300  w-full" />

        {/* Seller Information */}
        <div className="flex items-center mb-3">
          {/* Seller Image */}
          <Image
            src="/images/person.png"
            alt="Seller Image"
            width={40}
            height={40}
            className="rounded-full mr-4"
          />
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
        <div className="flex flex-col justify-center  items-center space-x-6 mb-2 dark:invert">
          <div className="flex gap-4 text-black">
            <WhatsAppOutlined />
            <div className="text-sm">{data?.users?.phone}</div>
          </div>

          <div className="flex gap-4 text-black">
            <MdOutlineMailLock />
            <div className="text-sm">{data?.users?.email}</div>
          </div>
        </div>
        {/* Icons Row */}
        <div className="flex justify-center items-center space-x-6 mb-6 dark:invert">
          {/* <Image
            src="/images/Cellphone.png"
            alt="Cellphone Icon"
            width={30}
            height={30}
          /> */}
          <FaWhatsapp size={32} />
          <Image
            src="/images/Message.png"
            alt="Message Icon"
            width={30}
            height={30}
          />

          <Image
            src="/images/facebook.png"
            alt="Facebook Icon"
            width={30}
            height={30}
          />
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-600 mb-2 dark:text-white">
          See if your friends know this seller
        </p>
        {/* Connect with Facebook */}
        <p className="text-center text-sm text-blue-600 font-semibold cursor-pointer hover:underline">
          Connect with Facebook
        </p>
      </div>

      {/* Third Card (Buy From GamerGizmo) */}
      <div className="dark:border-[#6345ED] dark:border mt-3 dark:bg-black border-gray-300 rounded-lg p-6 h-72 bg-white shadow-md flex flex-col items-center">
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

export default Sellersdetails;
