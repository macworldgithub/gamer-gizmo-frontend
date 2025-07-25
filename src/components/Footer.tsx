"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LiveCommunity from "./LiveCommunity";
import TermsAndConditionModal from "./Modals/TermsAndConditionModal";
import { FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (routeName: string) => {
    router.push(routeName);
  };

  return (
    <div className="w-full h-auto bg-white dark:bg-black">
      <div className="">{pathname !== "/all-communities" && <LiveCommunity />}</div>

      <div className="bg-footerBlack h-auto">
        {/* Footer Main Section */}
        <div className="pt-32 pb-10 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="">
            <Link href="/">
              <Image
                src="/images/gameIcon.webp"
                width={100}
                height={100}
                alt="Logo"
                className="mb-2"
              />
            </Link>

            <p className="text-sm max-w-xs leading-relaxed text-start md:text-xs">
              “GamerGizmo – Your ultimate destination for gaming gear, laptops,
              and accessories. Level up your gaming experience with ease.”
            </p>
            <div className="flex items-center gap-4 mt-4">
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
                  className="hover:text-blue-400"
                />
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
                <FaTiktok
                  size={22}
                  className="hover:text-gray-500 max-md:size-0"
                />
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div className="text-start">
            <h3 className="font-bold mb-4 text-[1.2rem] text-secondaryColorDark">
              Marketplace
            </h3>
            <ul className="space-y-2 text-sm md:text-xs">
              <li
                className="cursor-pointer hover:text-secondaryColorDark"
                onClick={() => handleNavigate("desktop")}
              >
                Gaming PCs
              </li>
              <li
                className="cursor-pointer hover:text-secondaryColorDark"
                onClick={() => handleNavigate("laptops")}
              >
                Laptops
              </li>
              <li
                className="cursor-pointer hover:text-secondaryColorDark"
                onClick={() => handleNavigate("console")}
              >
                Gaming Consoles
              </li>
              <li
                className="cursor-pointer hover:text-secondaryColorDark"
                onClick={() => handleNavigate("components")}
              >
                Components and Accessories
              </li>
              <li>
                <Link
                  href="/advertising"
                  className="  hover:text-secondaryColorDark"
                >
                  Advertising
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-start">
            <h3 className="mb-4 text-[1.2rem] font-bold text-secondaryColorDark">
              Supports
            </h3>
            <ul className="space-y-2 text-sm md:text-xs">
              <li
                className="cursor-pointer hover:text-secondaryColorDark"
                onClick={() => setShowModal(true)}
              >
                Terms & Conditions
              </li>
              <li className="cursor-pointer hover:text-secondaryColorDark">
                24/7 Supports
              </li>
              {/* <li className="cursor-pointer hover:text-secondaryColorDark">Privacy Policy</li> */}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start text-secondaryColorDark">
            <div className="text-start">
              <h3 className="mb-4 text-[1.2rem] font-bold">Contact</h3>
              <a
                href="mailto:support@gamergizmo.com"
                className="text-sm break-words hover:text-secondaryColorDark text-white"
              >
                support@gamergizmo.com
              </a>
              <br />
              <a
                href="tel:+923318551070"
                className="text-sm text-white hover:text-secondaryColorDark"
              >
                +971555795213
              </a>
            </div>
            <div className="mt-4">
              <Link href="/about">
                <h3 className="font-bold">About Us</h3>
              </Link>
            </div>
          </div>

          {/* <div className="text-start">
            <h4 className="mb-2 text-[1.2rem] font-bold text-secondaryColorDark">News & Post</h4>
            <div className="flex items-start space-x-4 mb-4">
              <Image
                src="/images/footerImg.png"
                alt="footer-image"
                width={40}
                height={40}
              />
              <div>
                <p className="text-sm md:text-xs  hover:text-secondaryColorDark" >Boost Your Gaming Setup with These Hacks</p>
                <Link href="#" className="text-xs underline hover:text-secondaryColorDark">Read More</Link>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Image
                src="/images/footerImg.png"
                alt="footer-image"
                width={40}
                height={40}
              />
              <div>
                <p className="text-sm hover:text-secondaryColorDark">Boost Your Gaming Setup with These Hacks</p>
                <Link href="#" className="text-xs underline hover:text-secondaryColorDark">Read More</Link>
              </div>
            </div>
          </div> */}
        </div>

        {/* Footer Bottom */}
        <div className="text-center border-t border-gray-800 py-4 text-sm">
          © Copyright 2025 - All Rights Reserved
        </div>
      </div>
      <TermsAndConditionModal
        openEditModal={showModal}
        setOpenEditModal={setShowModal}
      />
    </div>
  );
};

export default Footer;
