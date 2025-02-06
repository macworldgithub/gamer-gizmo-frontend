"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import LiveCommunity from "./LiveCommunity";

const Footer = () => {
  return (
    <div className=" w-full h-auto bg-white dark:bg-black">
      <div className="">
        <LiveCommunity />
      </div>

      <div className="bg-footerBlack h-auto">
        {/* Footer Main Section */}
        <div className="pt-32 pb-10 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 ">
          {/* Logo & Description */}
          <div className="">
            <Link href="/">
              <Image
                src="/images/gameIcon.png"
                width={100}
                height={100}
                alt="Logo"
                className="mb-2"
              />
            </Link>

            <p className="text-sm max-w-xs leading-relaxed text-start md:text-xs">
              “Gamer Gizmo – Your ultimate destination for gaming gear, laptops,
              and accessories. Level up your gaming experience with ease.”
            </p>
            <div className="flex mt-4">
              <Link href="#" className="text-white mx-2">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="z-10"
                  color="#4267B2"
                />
              </Link>
              <Link href="#" className="text-white mx-2">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="z-10"
                  color="#a0a4a7"
                />
              </Link>
              <Link href="#" className="text-white mx-2">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="z-10"
                  color="#a0a4a7"
                />
              </Link>
            </div>
          </div>

          {/* Marketplace */}
          <div className="text-start">
            <h3 className="font-bold mb-4 text-[1.2rem] ">Marketplace</h3>
            <ul className="space-y-2 text-sm md:text-xs">
              <li>Gaming Gear</li>
              <li>Consoles</li>
              <li>Gaming PCs</li>
              <li>Laptops</li>
              <li>Used Components</li>
              <li>Accessories</li>
              <li>
                <Link
                  href="/advertising"
                  className="text-blue-500 hover:underline no-underline text-inherit"
                >
                  Advertising
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-start">
            <h3 className="mb-4 text-[1.2rem] font-bold">Supports</h3>
            <ul className="space-y-2 text-sm md:text-xs">
              <li>Terms & Conditions</li>
              <li>24/7 Supports</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start">
            <div className="text-start ">
              <h3 className="mb-4 text-[1.2rem] font-bold">Contact</h3>
              <p className="text-sm md:text-xs">
                Email: support@gamergizmo.com
                <br />
                Phone: +123 456 7890
              </p>
            </div>
            <div className="mt-4">
              <Link href="/about">
                <h3 className="font-bold">About Us</h3>
              </Link>
            </div>
          </div>

          <div className="text-start">
            <h4 className="mb-2 text-[1.2rem] font-bold"> News & Post</h4>
            <div className="flex items-start space-x-4 mb-4">
              <Image
                src="/images/footerImg.png"
                alt="footer-image"
                width={40}
                height={40}
              />
              <div>
                <p className="text-sm md:text-xs">
                  Boost Your Gaming Setup with These Hacks
                </p>
                <Link href="#" className="text-xs underline">
                  Read More
                </Link>
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
                <p className="text-sm">
                  Boost Your Gaming Setup with These Hacks
                </p>
                <Link href="#" className="text-xs underline">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center border-t border-gray-800 py-4 text-sm">
          © Copyright 2021 - All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
