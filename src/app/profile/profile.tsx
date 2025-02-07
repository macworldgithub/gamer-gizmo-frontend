"use client";
import React, { useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import profile from "../../../public/images/person.png";
import camera from "../../../public/images/camera image.png";
import Verified from "../../../public/images/Verified.svg";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { MdEdit } from "react-icons/md";
import Person2Icon from "@mui/icons-material/Person2";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import ResetPasswordModal from "@/components/Modals/ResetPasswordModal";
import EditPasswordModal from "@/components/Modals/EditProfileDetail";
import { redirect } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/components/Store/Store";
import { formatDate } from "../utils/formatDate";
import NicUploadModal from "@/components/Modals/NicUploadModal";
import ProfilePicUploadModal from "@/components/Modals/ProfilePicUploadModal";
import { InitializeUserData } from "@/components/Store/Slicer/LoginSlice";
import { useDispatch } from "react-redux";
export default function ProfilePage() {
  const dispatch = useDispatch();
  const [openPassModal, setOpenPassModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const [openNicModal, setOpenNicModal] = React.useState(false);
  const [refetch, setRefetch] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    id: 0,
    username: "",
    email: "",
    first_name: "",
    applied_for_verification: false,
    last_name: "",
    is_email_verified: true,
    is_seller: false,
    created_at: "2025-01-20T08:44:21.512Z",
    phone: "",
    is_admin_verified: false,
    dob: "2004-05-24T00:00:00.000Z",
    gender: "male",
    address: null,
    nic_front_image: null,
    nic_back_image: null,
    profile: "",
  });
  const token = useSelector((state: RootState) => state.user.token);
  useLayoutEffect(() => {
    if (!token) {
      return redirect("/auth/login");
    }
  }, []);
  const fetchProfileData = async () => {
    let res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getUserData`,
      {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      }
    );
    dispatch(InitializeUserData({ ...res.data.data }));
    setProfileData(res.data.data || {});
  };
  useEffect(() => {
    fetchProfileData();
  }, [refetch]);
  // console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}${profileData.profile}`);
  return (
    <div className="w-full text-black ">
      <div className="bg-white p-6 rounded-lg mt-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold max-md:text-md">My Profile</h1>
          <p className="text-black max-md:text-sm">
            Update your profile details here
          </p>
        </div>

        <div className="flex w-full  items-center mb-6 max-md:hidden">
          <div className="relative">
            <Image
              src={
                profileData.profile != null
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${profileData.profile}`
                  : profile
              }
              alt="Profile"
              width={100}
              height={100}
              className=" rounded-full"
            />
            <Image
              src={camera}
              onClick={() => setOpenProfileModal(true)}
              alt="Camera Icon"
              width={24}
              height={24}
              className="absolute cursor-pointer shadow-lg bottom-0 right-0 bg-purple-600 p-1 rounded-full"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">
              {profileData.first_name} {profileData.last_name}{" "}
            </h2>
            <p className="text-gray-500">
              Joined on {formatDate(profileData.created_at)}
            </p>
          </div>
          {profileData.is_admin_verified && (
            <div className=" flex items-center ml-7 justify-center flex-col gap-1">
              <Image alt="verified" src={Verified} height={50} width={50} />
              <p className="text-purple-600 font-bold text-lg">Verified</p>
            </div>
          )}
          <button
            onClick={() => setOpenEditModal(true)}
            className="ml-auto md:w-auto flex justify-center items-center gap-3 px-6 py-2 bg-gradient-to-r from-[#DC39FC] to-[#6345ED] text-white rounded-full shadow hover:shadow-md focus:outline-none"
          >
            <MdEdit color="white" />
            Edit Profile
          </button>
        </div>

        {!profileData.is_admin_verified && (
          <div className="bg-purple-50 p-4 rounded-lg mb-8 max-md:hidden">
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
              <p className="text-purple-500 font-medium">
                Got a verified badge yet?
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Get more visibility and enhance your credibility.
            </p>
            {!profileData.applied_for_verification ? (
              <button
                onClick={() => setOpenNicModal(true)}
                className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-600"
              >
                Get Started
              </button>
            ) : (
              <p className="text-black font-bold text-lg">
                Applied for verification, Wait for admin to verify
              </p>
            )}
          </div>
        )}

        {/* Profile Name Section */}
        <div className="mb-8 ">
          <div className="w-[35%] max-md:w-full">
            <h3 className="text-lg font-semibold max-md:text-md">
              Profile Name
            </h3>
          </div>
          <div className="space-y-4 mt-2">
            <div className="flex md:gap-14 max-md:flex-col">
              <div className="flex gap-3 w-[30%] max-md:w-full">
                <FaUser fontSize="large" className="md:mt-1" />
                <label className="block font-medium max-md:text-sm text-black-400 mb-2">
                  User Name
                </label>
              </div>
              <div className="w-[70%] max-md:w-full">
                <fieldset className="rounded-md">
                  <p>{profileData.username}</p>
                </fieldset>
              </div>
            </div>
            <div className="flex md:gap-14 max-md:flex-col">
              <div className="flex gap-3 w-[30%] max-md:w-full">
                <MdEmail fontSize="large" className="md:mt-1" />
                <label className="block font-medium max-md:text-sm text-black-400 mb-2">
                  Email
                </label>
              </div>
              <div className="w-[70%] max-md:w-full">
                <fieldset className="rounded-md">
                  <p>{profileData.email}</p>
                </fieldset>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="mb-8 ">
          <h2 className="text-lg font-semibold mb-1 max-md:text-md">
            Account details
          </h2>

          <div className=" space-y-4 mt-2 ">
            {/* Date of Birth */}
            <div className="flex md:gap-14 max-md:flex-col">
              <div className="flex gap-3 w-[30%] max-md:w-full">
                <CalendarMonthOutlinedIcon
                  fontSize="small"
                  className="md:mt-1"
                />
                <label className="block font-medium max-md:text-sm text-black-400 mb-2">
                  Date of birth
                </label>
              </div>
              <div className="w-[70%] max-md:w-full">
                <fieldset className="rounded-md">
                  <p>{formatDate(profileData.dob)}</p>
                </fieldset>
              </div>
            </div>
            {/* Date of Birth */}
            <div className="flex md:gap-14 max-md:flex-col">
              <div className="flex gap-3 w-[30%] max-md:w-full">
                <CalendarMonthOutlinedIcon
                  fontSize="small"
                  className="md:mt-1"
                />
                <label className="block font-medium max-md:text-sm text-black-400 mb-2">
                  Phone
                </label>
              </div>
              <div className="w-[70%] max-md:w-full">
                <p>{profileData.phone}</p>
              </div>
            </div>

            {/* Gender */}
            <div className="flex md:gap-14 max-md:flex-col">
              <div className="flex gap-3 w-[30%]">
                <Person2Icon fontSize="small" className="md:mt-1" />
                <label className="block text-lg font-medium text-black-400 mb-2 max-md:text-sm">
                  Gender
                </label>
              </div>
              <div className="w-[70%] max-md:w-full">
                <p>{profileData.gender}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8 ">
          <h2 className="text-lg font-semibold mb-1 max-md:text-md">
            Account Address
          </h2>

          <div className=" space-y-4  ">
            {/* Date of Birth */}
            <div className="flex md:gap-14 max-md:flex-col">
              <div className="flex gap-3 w-[30%] max-md:w-full">
                <FaLocationDot fontSize="large" className="md:mt-1" />
                <label className="block font-medium max-md:text-sm text-black-400 mb-2">
                  Address
                </label>
              </div>
              <div className="w-[70%] max-md:w-full">
                <fieldset className=" rounded-md">
                  <p>{profileData.address ? profileData.address : "N/A"}</p>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8 ">
          <h2 className="text-lg font-semibold mb-1 max-md:text-md">
            Security
          </h2>

          <div className=" space-y-4  ">
            <div className="flex md:gap-14 max-md:flex-col">
              <div className="flex gap-3 w-[30%] max-md:w-full">
                <RiLockPasswordFill fontSize="large" className="md:mt-1" />
                <label className="block font-medium max-md:text-sm text-black-400 mb-2">
                  Password
                </label>
              </div>
              <div className="w-[70%] max-md:w-full">
                <button
                  onClick={() => setOpenPassModal(true)}
                  className="md:w-auto px-6 py-2 bg-gradient-to-r from-[#DC39FC] to-[#6345ED] text-white rounded-full shadow hover:shadow-md focus:outline-none"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResetPasswordModal
        openPassModal={openPassModal}
        setOpenPassModal={setOpenPassModal}
      />
      <EditPasswordModal
        openEditModal={openEditModal}
        setRefetch={setRefetch}
        refetch={refetch}
        profileData={profileData}
        setOpenEditModal={setOpenEditModal}
      />
      <NicUploadModal
        openNicModal={openNicModal}
        setRefetch={setRefetch}
        refetch={refetch}
        setOpenNicModal={setOpenNicModal}
      />
      <ProfilePicUploadModal
        openProfileModal={openProfileModal}
        setRefetch={setRefetch}
        refetch={refetch}
        setOpenProfileModal={setOpenProfileModal}
      />
    </div>
  );
}
