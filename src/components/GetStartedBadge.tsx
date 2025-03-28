"use client";
import React from "react";
import NicUploadModal from "./Modals/NicUploadModal";

const GetStartedBadge = () => {
  const [openNicModal, setOpenNicModal] = React.useState(false);

  return (
    <div>
      {/* {!profileData.is_admin_verified && ( */}
      <div className="bg-bluishBorder p-4 rounded-lg pb-8 flex flex-row max-md:gap-2 md:gap-4 w-full justify-center items-center px-8">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-purple-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-purple-500 font-medium md:text-lg max-md:text-[0.4rem]">
            Got a verified badge yet?
          </p>
        </div>
        <p className="md:text-sm max-md:text-[0.4rem] text-black ">
          Get more visibility and enhance your credibility.
        </p>
        {/* {!profileData.applied_for_verification ? ( */}
        <button
          onClick={() => setOpenNicModal(true)}
          className=" bg-purple-500 text-white max-md:px-1 max-md:text-[0.6rem] max-md:w-36 px-4 py-2 max-md:text-xs rounded-md md:text-sm hover:bg-purple-600"
        >
          Get Started
        </button>
        {/* ) : ( */}
        <p className="text-black font-bold md:text-md max-md:text-[0.4rem]">
          Applied for verification, Wait for admin to verify
        </p>
        {/* )} */}
      </div>
      {/* )} */}
      <NicUploadModal
        openNicModal={openNicModal}
        // setRefetch={setRefetch}
        // refetch={refetch}
        setOpenNicModal={setOpenNicModal}
      />
    </div>
  );
};

export default GetStartedBadge;
