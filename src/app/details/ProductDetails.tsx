import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedin,
  faYoutube,
  faTwitter,
  faSquareGooglePlus,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import SpecificationsTable from "./specification";
import Buynow from "./buynow";
import Sellersdetails from "./sellersdetail";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("overview"); // State to track active tab

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* Image Section */}
      <div className="w-full flex justify-center items-center h-auto">
        <Image
          src="/images/graphicCard.png"
          alt="graphic-card"
          width={600}
          height={400}
        />
      </div>

      {/* Details Section */}
      <div className="w-full max-w-5xl bg-white p-6 mt-6 dark:bg-black">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full flex justify-start mt-4 mb-7">
            <div className="w-full flex justify-between items-center bg-white shadow-md dark:bg-black">
              {/* User Info */}
              <div className="flex items-center space-x-2">
                <div className="text-purple-600">
                  <i className="fas fa-user"></i>
                </div>
                <div className="text-gray-700 font-medium dark:text-white">
                  Dale J. Barnes
                </div>
              </div>

              {/* Date Info */}
              <div className="flex items-center space-x-2">
                <div className="text-purple-600">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="text-gray-700 font-medium dark:text-white">
                  05 Jan 2022
                </div>
              </div>

              {/* Comments */}
              <div className="flex items-center space-x-2">
                <div className="text-purple-600">
                  <i className="fas fa-comment-alt"></i>
                </div>
                <div className="text-gray-700 font-medium dark:text-white">
                  Comments (5)
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-sm md:text-xl max-md:text-[0.9rem] font-bold text-gray-800 mb-4 dark:text-white">
              AMD Radeon RX 580 GTS XXX Edition Graphics Card, S Version, 8GB
              DDR5 256 Bit Memory, Dual Bios, 2304 Stream Processor, 1386MHz
              OC+, PCI-E, HDMI, DisplayPort | RX-58085D6
            </p>
            <p className="text-sm text-gray-500 mt-2 text-start dark:text-[#616161]">
              <span className="font-semibold">Warranty:</span> 1 Year &nbsp;
              <span>
                Effortless warranty claims with global coverage; shipping costs
                are on us.
              </span>
            </p>
          </div>
        </div>

        <Buynow/>

        {/* Tags and Share Section */}
        <div className="flex flex-col lg:flex-row justify-between border-t border-gray-200 mt-6 pt-4 gap-6">
          <div className="flex flex-col items-start">
            <h1 className="text-black font-bold text-lg mb-5 dark:text-white">
              Popular Tags
            </h1>
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`${
                  activeTab === "overview"
                    ? "bg-purple-600 text-white"
                    : "dark:text-white bg-secondaryColorLight text-black"
                } w-28 px-4 py-2 rounded-md text-sm flex justify-center hover:bg-purple-600`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`${
                  activeTab === "specifications"
                    ? "bg-purple-600 text-white"
                    : "dark:text-white bg-secondaryColorLight text-black"
                } w-28 px-4 py-2 rounded-md text-sm flex justify-center hover:bg-purple-600`}
              >
                Specifications
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
            <span className="text-gray-600 font-semibold dark:text-white">
              Share Post:
            </span>
            <div className="flex space-x-3">
              <Link href="#" className="text-white">
                <div className="bg-blue-600 w-7 h-8 rounded-md text-center flex justify-center items-center">
                  <FontAwesomeIcon icon={faFacebookF} color="#ffffff" />
                </div>
              </Link>
              <Link href="#" className="text-white">
                <div className="bg-btnGray w-7 h-8 rounded-md text-center flex justify-center items-center">
                  <FontAwesomeIcon icon={faLinkedin} color="#000000" />
                </div>
              </Link>
              <Link href="#" className="text-white">
                <div className="bg-btnGray w-7 h-8 rounded-md text-center flex justify-center items-center">
                  <FontAwesomeIcon icon={faYoutube} color="#000000" />
                </div>
              </Link>
              <Link href="#" className="text-white">
                <div className="bg-btnGray w-7 h-8 rounded-md text-center flex justify-center items-center">
                  <FontAwesomeIcon icon={faTwitter} color="#000000" />
                </div>
              </Link>
              <Link href="#" className="text-white">
                <div className="bg-btnGray w-7 h-8 rounded-md text-center flex justify-center items-center">
                  <FontAwesomeIcon icon={faSquareGooglePlus} color="#000000" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Conditional Rendering */}
        {activeTab === "overview" && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              AMD Radeon RX 580
            </h2>
            <p className="lg:text-sm md:text-sm text-gray-600 mt-2 dark:text-white text-[11px]">
              With an overclocked core and memory, based on AMD's Polaris
              architecture, and AMD LiquidVR ready, the XFX Force Radeon RX 580
              GTS XXX Edition Graphics Card allows you to have the full virtual
              reality experience. Not only for gaming, the Radeon RX 580
              supports APIs such as OpenCL and OpenGL. These APIs can take
              advantage of the GPU's 2304 Stream Processors to accelerate
              parallel computing tasks, taking some of the processing load off
              the CPU.
            </p>
          </div>
        )}
        {activeTab === "specifications" && <SpecificationsTable />}

        <Sellersdetails/>
      </div>


    </div>
  );
};

export default ProductDetails;
