import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedin,
  faYoutube,
  faTwitter,
  faSquareGooglePlus,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import SpecificationsTable from "./specification";
import Buynow from "./buynow";
import Sellersdetails from "./sellersdetail";
import { formatDate } from "@/app/utils/formatDate";
import ProductImageSwiper from "@/components/ProductImageSwiper";
import { CiUser } from "react-icons/ci";
import { FaRegComment, FaUser } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { getSpecifications } from "@/app/utils/getSpecifications";
import { getRelevantFields } from "@/app/utils/specificationFields";


const ProductDetails = ({ data, refetch, seReftech }: any) => {
  const [activeTab, setActiveTab] = useState("overview");
  const totalReviewsCount = data?.product_reviews?.length || 0;
  const specifications = getSpecifications(data);
  // Function to select the correct specifications based on category_id
  const categorySpecifications = () => {
    switch (data?.categories?.id) {
      case 1: // Laptops
        return data?.laptops?.[0];
      case 2: // Personal Computers
        return data?.personal_computers?.[0];
      case 3: // Components
        return data?.components?.[0];
      case 4: // Gaming Consoles
        return data?.gaming_console?.[0];
      default:
        return null;
    }
  };

  const hasValidSpecifications = () => {
    const categoryData = categorySpecifications();
    const relevantFields = getRelevantFields(data?.categories?.id);

    if (!categoryData || relevantFields.length === 0) return false;

    return relevantFields.some((field: any) => {
      const value = field.includes(".")
        //@ts-ignore
        ? field.split(".").reduce((obj, key) => obj?.[key], categoryData)
        : categoryData[field];
      return value && value !== "Not Available" && value.toString().trim() !== "";
    });
  };


  console.log(data, "ppo");
  return (
    <>
    <div className="flex flex-col items-start mx-8 2xl:item-center">
            <p className="text-sm md:text-2xl mt-8 text-start max-md:text-[0.9rem] font-bold text-gray-800 mb-2 dark:text-white">
              {data?.name}
            </p>
          </div>
    <div className="w-full flex flex-col justify-center items-center">
      
      {/* Image Section */}
      
      <div className="w-full flex justify-center items-center h-auto">
        {data?.product_images && (
          <ProductImageSwiper
            seReftech={seReftech}
            refetch={refetch}
            data={data}
          />
        )}
      </div>

      {/* Details Section */}
      <div className="w-full max-w-5xl bg-white p-6 mt-6 dark:bg-black">
        {/* <div className="flex flex-col justify-center items-start">
          <div className="w-full flex justify-start mt-4 mb-7">
            <div className="w-full flex justify-between items-center bg-white shadow-md dark:bg-black">
              
              <div className="flex items-center md:gap-1">
                <div className="text-purple-600">
                  <CiUser size={22} className="max-md:w-8 max-md:h-4" />
                </div>
                <div className="text-gray-700 font-medium max-md:text-[0.7rem] dark:text-white">
                  {data?.users?.first_name} {data?.users?.last_name}
                </div>
              </div>

              
              <div className="flex items-center max-md:gap-1  md:gap-3">
                <div className="text-purple-600 ">
                  <SlCalender size={18} className="max-md:w-6 max-md:h-3" />
                </div>
                <div className="text-gray-700 font-medium dark:text-white max-md:text-[0.7rem]">
                  {formatDate(data?.created_at)}
                </div>
              </div>

             
              <div className="flex items-center max-md:gap-0 md:gap-2">
                <div className="text-purple-600 ">
                  <FaRegComment size={20} className="max-md:w-8 max-md:h-4" />
                </div>
                <div className="text-gray-700 font-medium dark:text-white max-md:text-[0.7rem]">
                  Reviews ({totalReviewsCount})
                </div>
              </div>
            </div>
          </div>
          
        </div> */}

        {/* <Buynow data={data} /> */}
        {/* <h1 className=" text-2xl font-bold text-purple-600 text-left mt-4  md:text-2xl">
          AED {data?.price ?? "N/A"}
        </h1> */}
<div className="flex gap-4">
  {/* Stock Card */}
  <div className="bg-white shadow-md rounded-lg p-4 text-center w-40 h-24 flex flex-col justify-center">
    <h1 className="font-semibold text-sm">STOCK</h1>
    <p className="mt-2 dark:text-white text-black font-semibold">
      {data?.stock}
    </p>
  </div>

  {/* Condition Card */}
  <div className="bg-white shadow-md rounded-lg p-4 text-center w-40 h-24 flex flex-col justify-center">
    <h1 className="font-semibold text-sm">CONDITION</h1>
    <p className="mt-2 dark:text-white text-black font-semibold">
      {data?.condition === 1
        ? "New"
        : data?.condition === 2
        ? "Used"
        : data?.condition === 3
        ? "Like New"
        : data?.condition === 4
        ? "Refurbished"
        : "Unknown"}
    </p>
  </div>
</div>



        {/* <div className="flex items-center">
          <h1 className="font-bold text-secondaryColorLight text-lg">Stock:</h1>
          <p className="ml-3 dark:text-white text-black font-semibold">
            {data?.stock}
          </p>
        </div>
        <div className="flex items-center">
          <h1 className="font-bold text-secondaryColorLight text-lg">
            Condition:
          </h1>
          <div className="ml-3 dark:text-white text-black font-semibold">
            <p>
              {data?.condition === 1
                ? "New"
                : data?.condition === 2
                  ? "Used"
                  : data?.condition === 3
                    ? "Like New"
                    : data?.condition === 4
                      ? "Refurbished"
                      : "Unknown"}
            </p>
          </div>
        </div> */}
        {/* Tags and Share Section */}
        <div className="flex flex-col lg:flex-row justify-between border-t border-gray-200 mt-6 pt-4 gap-6">
          <div className="flex flex-col items-start">
            <h1 className="text-black font-bold text-lg mb-5 dar  k:text-white">
              Popular Tags
            </h1>
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`${activeTab === "overview"
                  ? "bg-purple-600 text-white"
                  : "dark:text-white bg-secondaryColorLight text-black"
                  } w-28 px-4 py-2 rounded-md text-sm flex justify-center hover:bg-purple-600`}
              >
                Overview
              </button>

              {hasValidSpecifications() && (
                <button
                  onClick={() => setActiveTab("specifications")}
                  className={`${activeTab === "specifications"
                    ? "bg-purple-600 text-white"
                    : "dark:text-white bg-secondaryColorLight text-black"
                    } w-28 px-4 py-2 rounded-md text-sm flex justify-center hover:bg-purple-600`}
                >
                  Specifications
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
            <span className="text-gray-600 font-semibold dark:text-white">
              Share Post:
            </span>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/profile.php?id=61573613765643"
                target="_blank"
                rel="noopener noreferrer"
                className="z-10 max-sm:w-2"
              >
                <div className="bg-blue-600 w-7 h-8 rounded-md text-center flex justify-center items-center">
                  <FontAwesomeIcon icon={faFacebookF} color="#ffffff" />
                </div>
              </a>

              <a href="https://www.instagram.com/gamergizmo_official?utm_source=qr&igsh=eWdrMmpkMjEyc3p6" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="z-10 max-sm:w-8 h-8 hover:text-red-800 "
                  color="#E1306C"
                />
              </a>
              <a
                href="https://www.youtube.com/@GamerGizmo_Official"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <div className="bg-btnGray w-7 h-8 rounded-md text-center flex justify-center items-center">
                  <FontAwesomeIcon icon={faYoutube} color="#000000" />
                </div>
              </a>

            </div>
          </div>
        </div>

        {/* Conditional Rendering */}
        {activeTab === "overview" && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {data?.name}
            </h2>
            <div className="flex-col justify-start gap-2 items-center">
              <h4 className="font-bold mt-2">Product Description : </h4>
              <p className="lg:text-sm md:text-sm text-gray-600  dark:text-white text-[11px]">
                {data?.description}
              </p>
            </div>
          </div>
        )}
        {activeTab === "specifications" && <SpecificationsTable data={data} />}

        <Sellersdetails data={data} />
      </div>
    </div>
    </>
  );
};

export default ProductDetails;
