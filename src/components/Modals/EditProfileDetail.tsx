import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Person2Icon from "@mui/icons-material/Person2";
import { FaPhoneAlt } from "react-icons/fa";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { LuFileUser } from "react-icons/lu";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { toast } from "react-toastify";
type FormDataType = {
  first_name: string;
  last_name: string;
  phone: string;
  dob: string; // ISO 8601 format or formatted date string (yyyy-MM-dd)
  gender: "male" | "female" | "other"; // Define specific gender values
  address: string | null; // Allow null for optional fields
};
const EditProfileModal = ({
  openEditModal,
  setOpenEditModal,
  setRefetch,
  refetch,
}: any) => {
  const [formData, setFormData] = useState<FormDataType>({
    first_name: "",
    last_name: "",
    phone: "",
    dob: "2004-05-24T00:00:00.000Z",
    gender: "male",
    address: null,
  });
  const [errors, setErrors] = useState<any>({});
  const token = useSelector((state: RootState) => state.user.token);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };
  const fetchProfileData = async () => {
    let res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getUserData`,
      {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      }
    );

    setFormData({
      first_name: res.data.data.first_name,
      last_name: res.data.data.last_name,
      phone: res.data.data.phone,
      dob: res.data.data.dob,
      gender: res.data.data.gender,
      address: res.data.data.address,
    });
  };
  useEffect(() => {
    fetchProfileData();
  }, [refetch]);
  const handleSave = async () => {
    const newErrors: any = {};
    ["first_name", "last_name", "phone", "dob", "gender"].forEach((key) => {
      // @ts-ignore
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
    let res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/updateUserData`,
      formData,
      {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      }
    );
    if (res.status == 201) {
      toast.success("Successfully updated");
      setRefetch(!refetch);
      setTimeout(() => {
        setOpenEditModal(false);
      }, 1000);
    } else {
      toast.error("Error updating, Please Try Again");
    }
  };

  if (!openEditModal) return null;
  return (
    <div
      className={`fixed inset-0 transition-all text-black  duration-200 bg-black bg-opacity-50 flex justify-center items-center z-50 ${
        openEditModal ? "block" : "hidden"
      }`}
    >
      <div className="bg-white transition-all duration-200 rounded-lg p-8 w-full max-w-md shadow-md dark:bg-[#1e1e2f]">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">
          Edit Profile
        </h2>
        <form className="space-y-4 ">
          {/* Username Field */}
          {/* <div>
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
          </div> */}

          {/* First Name Field */}
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              First Name
            </label>
            <div className="flex items-center gap-3 mt-1">
              <LuFileUser className="text-gray-500" />
              <input
                id="first_name"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-black"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.first_name}</p>
            )}
          </div>

          {/* Last Name Field */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Last Name
            </label>
            <div className="flex items-center gap-3 mt-1">
              <LuFileUser className="text-gray-500" />
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-black"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.last_name}</p>
            )}
          </div>

          {/* DOB Field */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Date of Birth
            </label>
            <div className="flex items-center gap-3 mt-1">
              <CalendarMonthOutlinedIcon className="text-gray-500" />
              <input
                id="dob"
                type="date"
                name="dob"
                value={
                  formData.dob
                    ? formatDate(formData.dob) // Converts to correct format
                    : ""
                }
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-black"
              />
            </div>
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 dark:text-white"
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
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-black"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Phone
            </label>
            <div className="flex items-center gap-3 mt-1">
              <FaPhoneAlt className="text-gray-500" />
              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-black"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Address
            </label>
            <div className="flex items-center gap-3 mt-1">
              <FaLocationDot className="text-gray-500" />
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address ? formData.address : ""}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-black"
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
