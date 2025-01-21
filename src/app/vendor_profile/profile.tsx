"use client";
import React from "react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className=" min-h-screen">
      <div className="w-full bg-white p-6 md:max-w-2xl md:rounded-lg md:shadow-md mx-auto md:mt-10">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-gray-500">Update your profile details here</p>
        </div>

        {/* Profile Picture Section */}
        <div className="flex items-center mb-6 max-md:hidden lg:flex">
          <div className="relative">
            <Image
              src="/profile image.png"
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full"
            />
            <Image
              src="/camera button.png"
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

        {/* Profile Name Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold">Profile Name</h3>
          <p className="text-sm text-gray-500 mb-4">This is displayed on your profile</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <fieldset className="border border-gray-300 rounded-md w-full">
                <legend className="text-sm text-gray-400 px-2">First Name</legend>
                <input
                  type="text"
                  id="firstName"
                  defaultValue="Muhammad"
                  className="block w-full sm:text-sm p-2"
                />
              </fieldset>
            </div>

            <div className="flex items-center">
              <fieldset className="border border-gray-300 rounded-md w-full">
                <legend className="text-sm text-gray-400 px-2">Last Name</legend>
                <input
                  type="text"
                  id="lastName"
                  defaultValue="Ahmed"
                  className="block w-full sm:text-sm p-2"
                />
              </fieldset>
            </div>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-1">Account details</h2>
          <p className="text-gray-500 text-sm mb-4">This is not visible to other users</p>
          <div className="space-y-4">
            {/* Date of Birth */}
            <div>
              <fieldset className="border border-gray-300 rounded-md w-full">
                <legend className="text-sm text-gray-400 px-2">Date of Birth</legend>
                <input
                  type="date"
                  id="dob"
                  className="block w-full sm:text-sm p-2"
                />
              </fieldset>
            </div>

            {/* Nationality */}
            <div>
              <fieldset className="border border-gray-300 rounded-md w-full">
                <legend className="text-sm text-gray-400 px-2">Search Country</legend>
                <select
                  id="nationality"
                  className="block w-full sm:text-sm p-2"
                >
                  <option value="">Search Country</option>
                  <option value="dubai">Dubai</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="india">India</option>
                </select>
              </fieldset>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Gender</label>
              <div className="flex sm:items-center sm:space-x-4 max-sm:flex-col">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="text-purple-500 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="text-purple-500 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Female</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="prefer-not-to-say"
                    className="text-purple-500 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Prefer not to say</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
