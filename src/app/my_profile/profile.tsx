import React from "react";
import Image from "next/image";
import profile from "../../../public/images/myprofile.png"
import camera from "../../../public/images/camera image.png"
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Person2Icon from '@mui/icons-material/Person2';

export default function ProfilePage() {
  return (
    <div className="w-full md:w-[80%] lg:w-[65%] xl:w-[45%] 2xl:w-[30%]">
      <div className="bg-white p-6 rounded-lg mt-8">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold max-md:text-md">My Profile</h1>
          <p className="text-black max-md:text-sm">Update your profile details here</p>
        </div>

        {/* Profile Picture Section */}
        <div className="flex items-center mb-6 max-md:hidden">
          <div className="relative">
            <Image
              src={profile}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full"
            />
            <Image
              src={camera}
              alt="Camera Icon"
              width={24}
              height={24}
              className="absolute bottom-0 right-0 bg-purple-600 p-1 rounded-full"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Muhammad Ahmed</h2>
            <p className="text-gray-500">Joined on January 2025</p>
          </div>
        </div>

        {/* Verification Badge Section */}
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
            <p className="text-purple-500 font-medium">Got a verified badge yet?</p>
          </div>
          <p className="text-sm text-gray-600 mt-1">Get more visibility and enhance your credibility.</p>
          <button className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-600">
            Get Started
          </button>
        </div>



        {/* Profile Name Section */}
        <div className="mb-8 flex gap-4 max-md:flex-col ">
          <div className="w-[35%] max-md:w-full">
          <h3 className="text-lg font-semibold max-md:text-md">Profile Name</h3>
          <p className="text-md text-black mb-4 max-md:text-sm">This is displayed on your profile</p>
          </div>
          <div className="w-[65%] max-md:w-full">
            <div>
              <fieldset className="border border-black-400 rounded-md w-full">
                <legend className="text-sm text-black-400 px-2 max-md:text-sm">First Name</legend>
                <input
                  type="text"
                  id="firstName"
                  defaultValue="Michel"
                  className="block w-full sm:text-sm p-2 max-md:text-sm"
                />
              </fieldset>
            </div>

            <div className="flex items-center mt-4">
              <fieldset className="border border-black-400 rounded-md w-full">
                <legend className="text-sm text-black-400 px-2 max-md:text-sm">Last Name</legend>
                <input
                  type="text"
                  id="lastName"
                  defaultValue="Smith"
                  className="block w-full sm:text-sm p-2 max-md:text-sm"
                />
              </fieldset>
            </div>
          </div>
          
        </div>

        {/* Account Details Section */}
        <div className="mb-8 ">
          <h2 className="text-lg font-semibold mb-1 max-md:text-md">Account details</h2>
          <p className="text-black-400 text-sm mb-4">This is not visible to other users</p>
          <div className=" space-y-4  ">
            {/* Date of Birth */}
            <div className="flex md:gap-14 max-md:flex-col">
            <div className="flex gap-3 w-[30%] max-md:w-full">
              <CalendarMonthOutlinedIcon fontSize="small" className="md:mt-1"/>
              <label className="block font-medium max-md:text-sm text-black-400 mb-2">Date of birth</label>
              </div>
              <div className="w-[70%] max-md:w-full">
              <fieldset className="border border-black-400 rounded-md">
                <legend className="text-sm text-black-400 px-2 max-md:text-sm">Date of Birth</legend>
                <input
                  type="date"
                  id="dob"
                  className="block w-full sm:text-sm p-2 max-md:text-sm"
                />
              </fieldset>
            </div>
            </div>

            {/* Nationality */}
            <div className="flex w-auto md:gap-14 max-md:flex-col">
            <div className="flex gap-3 w-[30%]">
              <LanguageOutlinedIcon fontSize="small" className="md:mt-1"/>
            <label className="block text-lg font-medium text-black-400 mb-2 max-md:text-sm">Nationality</label>
            </div>
            <div className="w-[70%] max-md:w-full">
              <fieldset className="border border-black-400 rounded-md w-full">
                <legend className="text-sm text-black-400 px-2 max-md:text-sm">Search Country</legend>
                <select
                  id="nationality"
                  className="block w-full sm:text-sm p-2 max-md:text-sm"
                >
                  <option value="">Search Country</option>
                  <option value="dubai">Dubai</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="india">India</option>
                </select>
              </fieldset>
              </div>
            </div>

            {/* Gender */}
            <div className="flex md:gap-14 max-md:flex-col">
            <div className="flex gap-3 w-[30%]">
              <Person2Icon fontSize="small" className="md:mt-1"/>
              <label className="block text-lg font-medium text-black-400 mb-2 max-md:text-sm">Gender</label>
              </div>
              <div className="w-[70%] max-md:w-full">
              <div className="flex sm:items-center sm:space-x-4 max-sm:flex-col m-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="text-purple-500 focus:ring-purple-500 max-md:text-sm"
                  />
                  <span className="ml-2 text-sm text-black-400">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="text-purple-500 focus:ring-purple-500 max-md:text-sm"
                  />
                  <span className="ml-2 text-sm text-black-400">Female</span>
                </label>
                </div>
                <div className="sm:items-center sm:space-x-4 max-sm:flex-col m-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="prefer-not-to-say"
                    className="text-purple-500 focus:ring-purple-500 max-md:text-sm"
                  />
                  <span className="ml-2 text-sm text-black-400 max-md:text-sm ">Prefer not to say</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        </div>
        {/* Save Changes Button */}
        <button
          type="submit"
          className="ml-auto  flex justify-end bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}
