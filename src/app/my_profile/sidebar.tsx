"use client";
import { useState } from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Person2Icon from '@mui/icons-material/Person2';
import LockIcon from '@mui/icons-material/Lock';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
export default function Sidebar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (<div>
    <div className=" text-center">
    <h2 className="text-2xl font-semibold">Profile Settings</h2>
  </div>
    <div className="hidden md:block w-64 max-w-xs bg-white shadow-lg rounded-lg border mt-4 md:ml-4 lg:ml-0 md:h-80">
     
      <div className="p-4"> 
        {/* Profile Section */}
        <div>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex justify-between w-full py-2 px-3 rounded-lg hover:bg-gray-200"
          >
            <div className="flex gap-3">
            <Person2Icon/>
            <span className="font-medium">Profile</span>
            </div>
            <span>{isProfileOpen ? <ArrowDropUpOutlinedIcon/> : <ArrowDropDownIcon/>}</span>
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
            className="flex justify-between w-full py-2 px-3 rounded-lg hover:bg-gray-200"
          >
            <div className="flex gap-3">
            <SettingsOutlinedIcon/>
            <span className="font-medium">Account</span>
            </div>
            <span>{isAccountOpen ? <ArrowDropUpOutlinedIcon/> : <ArrowDropDownIcon/>}</span>
          </button>
          {isAccountOpen && (
            <div className="pl-6 mt-2">
              <p className="py-2 hover:underline cursor-pointer">Phone Numbers</p>
            </div>
          )}
        </div>

        {/* Security Section */}
        <div className="mt-4 flex hover:bg-gray-200 rounded-lg ml-3">
         <LockIcon/>
          <p className="px-3 cursor-pointer">Security</p>
        </div>
      </div>
    </div>
    </div>
  );
}
