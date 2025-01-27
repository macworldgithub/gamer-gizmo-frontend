import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Person2Icon from "@mui/icons-material/Person2";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { LuFileUser } from "react-icons/lu";
const EditProfileModal = ({ openEditModal, setOpenEditModal }: any) => {
  const [formData, setFormData] = useState({
    username: "Khan234",
    firstName: "Khan",
    lastName: "Khan",
    email: "abc@gmail.com",
    country: "Dubai",
    gender: "Male",
    address: "SOME ADDRESS",
    dob: "1990-01-01", // Initial value for DOB
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const handleSave = () => {
    const newErrors: any = {};
    Object.keys(formData).forEach((key) => {
      // @ts-expect-error
      if (!formData[key]) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Updated Profile Data:", formData);
    setOpenEditModal(false); // Close modal on save
  };

  return (
    <div
      className={`fixed inset-0 transition-all duration-200 bg-black bg-opacity-50 flex justify-center items-center z-50 ${
        openEditModal ? "block" : "hidden"
      }`}
    >
      <div className="bg-white transition-all duration-200 rounded-lg p-8 w-full max-w-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form className="space-y-4">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="flex items-center gap-3 mt-1">
              <FaUser className="text-gray-500" />
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          {/* First Name Field */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <div className="flex items-center gap-3 mt-1">
              <LuFileUser className="text-gray-500" />
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name Field */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div className="flex items-center gap-3 mt-1">
              <LuFileUser className="text-gray-500" />
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* DOB Field */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <div className="flex items-center gap-3 mt-1">
              <CalendarMonthOutlinedIcon className="text-gray-500" />
              <input
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          {/* Country Field */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <div className="flex items-center gap-3 mt-1">
              <LanguageOutlinedIcon className="text-gray-500" />
              <input
                id="country"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>

          {/* Gender Field */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <div className="flex items-center gap-3 mt-1">
              <Person2Icon className="text-gray-500" />
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <div className="flex items-center gap-3 mt-1">
              <FaLocationDot className="text-gray-500" />
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setOpenEditModal(false)}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
