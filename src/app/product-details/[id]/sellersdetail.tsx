import React from "react";
import Image from "next/image";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { formatDate } from "@/app/utils/formatDate";
import { MdOutlineMailLock } from "react-icons/md";
import { WhatsAppOutlined } from "@ant-design/icons";
import Verified from "../../../../public/images/Verified.svg";
const Sellersdetails = ({ data }: any) => {
  console.log(data, "no data");
  return (
    <div className="md:hidden w-full mt-4">
      <div className="dark:border-[#6345ED] dark:border dark:bg-black border-gray-300 rounded-lg p-2  bg-white shadow-md flex flex-col items-center ">
        {/* Heading */}
        <div className="flex justify-center gap-2 items-center">
          <div className=" flex items-center  justify-center flex-col gap-1">
            <Image alt="verified" src={Verified} height={20} width={20} />
            <p className="text-purple-600 font-bold text-[0.6rem]">Verified</p>
          </div>
          <h2 className="text-center text-lg font-bold text-gray-800 dark:text-white">
            Seller Details
          </h2>
        </div>

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
        <div className="flex flex-col justify-center items-center space-x-6 mb-2 dark:invert">
          {/* WhatsApp Number */}
          <div className="flex gap-4 text-black">
            <a
              href={`https://wa.me/${data?.users?.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppOutlined size={5} />
            </a>
            <a
              href={`https://wa.me/${data?.users?.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-[0.6rem] text-gray-700">
                {data?.users?.phone}
              </div>
            </a>
          </div>

          {/* Email */}
          <div className="flex gap-4 text-black">
            <a
              href={`mailto:${data?.users?.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdOutlineMailLock size={15} />
            </a>
            <a
              href={`mailto:${data?.users?.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-[0.6rem] text-gray-700">
                {data?.users?.email}
              </div>
            </a>
          </div>
        </div>
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
