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
import { FaRegComment, FaRegShareSquare, FaUser } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { getSpecifications } from "@/app/utils/getSpecifications";
import { getRelevantFields } from "@/app/utils/specificationFields";
import ShareProductModal from "@/components/Modals/ShareProductModal";

const ProductDetails = ({ data, refetch, seReftech }: any) => {
  // const [activeTab, setActiveTab] = useState("false");
  const [modalOpen, setModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSpecOpen, setIsSpecOpen] = useState(false);
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

  const handleSpecClick = () => {
    setIsSpecOpen((prev) => !prev); // Toggle state
  };
  const hasValidSpecifications = () => {
    const categoryData = categorySpecifications();
    const relevantFields = getRelevantFields(data?.categories?.id);

    if (!categoryData || relevantFields.length === 0) return false;

    return relevantFields.some((field: any) => {
      const value = field.includes(".")
        ? //@ts-ignore
        field.split(".").reduce((obj, key) => obj?.[key], categoryData)
        : categoryData[field];
      return (
        value && value !== "Not Available" && value.toString().trim() !== ""
      );
    });
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsShareModalOpen(false);
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

        <div className="w-full flex justify-center items-center h-auto bg-gray-200 max-w-3xl ">
          {data?.product_images && (
            <ProductImageSwiper
              seReftech={seReftech}
              refetch={refetch}
              data={data}
            />
          )}
        </div>

        {/* Details Section */}
        <div className="w-full max-w-4xl bg-white p-6 mt-6 dark:bg-black">
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

          <button
            className=" text-black 
              dark:text-white  
               w-fit py-2 rounded-md font-semibold text-2xl flex justify-center "
          >
            Item overview
          </button>

          <div className="flex gap-4 mt-4 max-md:grid grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 max-sm:gap-x-6">
            {/* Stock Card */}
            {data?.stock && (
              <div className="bg-custom-gradient dark:bg-secondaryBlack text-white shadow-md rounded-lg p-4 max-sm:p-2 text-center w-40 h-24 flex flex-col justify-center max-sm:w-36">
                <h1 className="font-semibold text-sm max-sm:text-xs">STOCK</h1>
                <p className="mt-2 text-white font-semibold text-xs">
                  {data?.stock}
                </p>
              </div>
            )}

            {data?.models && data?.models?.name !== "Other" && (
              <div className="bg-custom-gradient dark:bg-secondaryBlack text-white shadow-md rounded-lg p-4 text-center w-40 h-24 flex flex-col justify-center max-sm:p-2 max-sm:w-36">
                <h1 className="font-semibold text-sm max-sm:text-xs">MODEL</h1>

                <p className="mt-2 text-white font-semibold text-xs">
                  {data?.models?.name}
                </p>
              </div>
            )}

            {data?.brands && (
              <div className="bg-custom-gradient dark:bg-secondaryBlack text-white shadow-md rounded-lg p-4 text-center w-40 h-24 flex flex-col justify-center max-sm:p-2 max-sm:w-36">
                <h1 className="font-semibold text-sm max-sm:text-xs">BRAND</h1>
                <p className="mt-2  text-white font-semibold text-xs">
                  {data?.brands?.name}
                </p>
              </div>
            )}

            {/* Condition Card */}
            {data?.condition && (
              <div className="bg-custom-gradient dark:bg-secondaryBlack text-white shadow-md rounded-lg p-4 text-center w-40 h-24 max-sm:w-36 flex flex-col justify-center max-sm:p-2">
                <h1 className="font-semibold text-sm max-sm:text-xs">
                  CONDITION
                </h1>
                <p className="mt-2 text-white font-semibold text-xs">
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
            )}
          </div>

          {/* Tags and Share Section */}
          <div className="flex flex-col lg:flex-row justify-between border-t border-gray-200 mt-6 pt-4 gap-6">
            <div className="flex flex-col items-start">
              {/* <h1 className="text-black font-bold text-lg mb-5 dar  k:text-white">
                Popular Tags
              </h1> */}
              <div className="flex gap-6">
                {hasValidSpecifications() && (
                  <button
                    onClick={handleSpecClick}
                    className={`w-fit px-4 py-2 rounded-md text-sm flex justify-center 
      ${isSpecOpen
                        ? "border border-black dark:bg-white dark:hover:bg-purple-600 border-dotted hover:bg-gray-100 text-black font-bold text-lg" // Active (open) state
                        : "bg-purple-600 text-white border  hover:bg-black border-gray-400  hover:text-white" // Default (closed) state
                      }`}
                  >
                    {isSpecOpen
                      ? "Hide Additional Details"
                      : "Additional Details"}
                  </button>
                )}
              </div>
            </div>
            {/* <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
              <span className="text-gray-600 font-semibold dark:text-white">
                Share Post:
              </span>
              <div className="flex space-x-3 max-sm:gap-4">
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

                <a
                  href="https://www.instagram.com/gamergizmo_official?utm_source=qr&igsh=eWdrMmpkMjEyc3p6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
            </div> */}
            <div className="flex hover:bg-secondaryColorDark gap-2 bg-gray-200 justify-center items-center rounded-md w-36">
              <FaRegShareSquare size={20}/>
              <button onClick={() => setModalOpen(true)} className=" rounded-md">
                Share Product
              </button>
            </div>

            {/* Modal Component */}
            <ShareProductModal open={modalOpen} onClose={() => setModalOpen(false)} />

          </div>

          {/* Conditional Rendering */}
          {/* {activeTab === "overview" && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {data?.name}
              </h2>
             
            </div>
          )} */}

          {isSpecOpen && <SpecificationsTable data={data} />}

          <div className="flex-col justify-start gap-2 items-center mt-4">
            <h4 className="dark:text-white font-bold my-2 text-2xl ">
              Product Description
            </h4>
            <p className="lg:text-sm md:text-sm text-gray-600  dark:text-white text-[11px]">
              {data?.description}
            </p>
          </div>


          <Sellersdetails data={data} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
