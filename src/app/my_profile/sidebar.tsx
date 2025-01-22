"use client"
import { useState } from 'react';

export default function Sidebar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <div className="hidden md:block w-64 h-96 bg-white shadow-lg md:ml-24 mt-10 rounded-lg border">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
      </div>
      <div className="p-4">
        {/* Profile Section */}
        <div>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center justify-between w-full py-2 px-3 rounded-lg hover:bg-gray-200"
          >
            <span className="font-medium">Profile</span>
            <span>{isProfileOpen ? '-' : '+'}</span>
          </button>
          {isProfileOpen && (
            <div className="pl-6 mt-2">
              <p className="py-2 hover:underline cursor-pointer">Basic Info</p>
              <p className="py-2 hover:underline cursor-pointer">My Addresses</p>
            </div>
          )}
        </div>

        {/* Account Section */}
        <div className="mt-4">
          <button
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className="flex items-center justify-between w-full py-2 px-3 rounded-lg hover:bg-gray-200"
          >
            <span className="font-medium">Account</span>
            <span>{isAccountOpen ? '-' : '+'}</span>
          </button>
          {isAccountOpen && (
            <div className="pl-6 mt-2">
              <p className="py-2 hover:underline cursor-pointer">Phone Numbers</p>
            </div>
          )}
        </div>

        {/* Security Section */}
        <div className="mt-4">
          <p className="py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer">Security</p>
        </div>
      </div>
    </div>
  );
}
