import React from "react";
import Image from "next/image";
import { FaPhoneAlt, FaUser, FaWhatsapp } from "react-icons/fa";
import { formatDate } from "@/app/utils/formatDate";
import { MdOutlineMailLock, MdVerified } from "react-icons/md";
import { WhatsAppOutlined } from "@ant-design/icons";
import Verified from "../../../../public/images/Verified.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/components/Store/Store";
import Link from "next/link";
const Sellersdetails = ({ data }: any) => {
  const token = useSelector((state: RootState) => state.user.token);

  const profileUrl = data?.users?.profile
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${data?.users?.profile}`
    : null;
  console.log(data?.is_verified_by_admin, "verification");
  console.log(data, "no data");
  return (
    <div className="md:hidden w-full mt-4">
      <div className="dark:border-[#6345ED] dark:border dark:bg-black border-gray-300 rounded-lg p-2 bg-white shadow-md flex flex-col items-center">
        {token ? (
          <>
            {/* Heading */}
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
                Seller Details
              </h2>
            </div>

            {/* Horizontal Line */}
            <hr className="my-4 border-gray-300 w-full" />

            {/* Seller Information */}
            <div className="flex items-center mb-3 gap-2">
              {/* Seller Image */}
              {profileUrl ? (
                <img
                  src={profileUrl}
                  alt="User Avatar"
                  className="w-14 h-14 rounded-full"
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
                  {data?.users?.first_name} {data?.users?.last_name}
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
          </>
        ) : (
          <p className="text-center text-gray-800 dark:text-white">
            Please{" "}
            <span className="text-blue-600 font-semibold cursor-pointer">
              <Link
                href="/auth/login"
                className="text-secondaryColorDark font-bold  text-lg"
              >
                log in
              </Link>
            </span>{" "}
            to view seller details.
          </p>
        )}
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
