"use client";
import React, { useState } from "react";
import Image from "next/image";

import axiosInstance from "@/app/utils/axios";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import TermsAndConditionModal from "@/components/Modals/TermsAndConditionModal";

const credentialSlide = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [terms, setTerms] = useState("off");
  const signupUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(terms);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    // Ensure terms are accepted
    if (terms !== "on") {
      toast.error("Please accept terms and conditions");
      return;
    }
  
    // Username validation (at least 3 characters)
    if (formData.username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }
  
    // Password validation
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    // Phone number validation (International format)
    const phoneRegex = /^\+\d{1,3}\d{6,14}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error(
        "Invalid phone number! Use international format (e.g., +923001234567)"
      );
      return;
    }
  
    // **Date of Birth Validation** (Must be at least 18 years old)
    const dobDate = new Date(formData.dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    const dayDiff = today.getDate() - dobDate.getDate();
  
    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
  
    if (age < 18) {
      toast.error("You must be at least 18 years old to register");
      return;
    }
  
    try {
      const response = await axiosInstance.post(signupUrl, {
        ...formData,
        dob: dobDate,
      });
  
      console.log("Response:", response);
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Registration successful! OTP has been sent to email", {
          icon: <FaCheckCircle style={{ color: "#dc39fc" }} />,
        });
        setTimeout(() => {
          router.push(`/auth/otp?email=${formData.email}`);
        }, 3000);
      } else {
        toast.error(response.data.message || "Registration failed");
      }
      console.log("API Response:", response.data);
    } catch (error: any) {
      console.error("Error during signup:", error);
  
      // Show backend error messages properly
      if (error.response?.data?.message) {
        const errorMessage = error.response.data.message;
  
        if (Array.isArray(errorMessage)) {
          errorMessage.forEach((msg) => toast.error(msg));
        } else {
          toast.error(errorMessage || "An error occurred. Please try again.");
        }
  
        console.log(errorMessage);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div
      id="loginCredentials"
      className="flex dark:shadow-combinedNight shadow-combinedDay  rounded-l-[12px] flex-col w-[60%] max-md:w-[100%] dark:bg-black items-center gap-5 max-sm:gap-2 box-border max-sm:mb-[10px] p-10"
    >
      <div className="w-[100%] mb-2">
        <h1 className="text-[2rem] max-sm:text-[1.5rem] font-bold text-left text-black dark:text-white">
          Create An Account
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full py-2">
        <div className="flex max-sm:gap-2 w-[100%] justify-between max-sm:flex-col py-2">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2 dark:border-customPurpleBorder focus:outline-none"
            placeholder="First Name"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2 dark:border-customPurpleBorder focus:outline-none"
            placeholder="Last Name"
          />
        </div>
        <div className="flex w-[100%] max-sm:gap-2 justify-between max-sm:flex-col py-4">
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2 dark:border-customPurpleBorder focus:outline-none"
            placeholder="Phone Number"
          />
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2 dark:border-customPurpleBorder focus:outline-none"
            placeholder="User Name"
          />
        </div>
        <div className="flex max-sm:gap-2 w-[100%] justify-between max-sm:flex-col py-2">
          {/* Gender Dropdown */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2 dark:border-customPurpleBorder focus:outline-none"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Date of Birth Picker */}
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2 dark:border-customPurpleBorder focus:outline-none"
          />
        </div>

        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-[100%] p-3 mt-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2 dark:border-customPurpleBorder focus:outline-none"
          placeholder="Email Address"
        />
        <div className="flex w-[100%] max-sm:gap-2 justify-between max-sm:flex-col py-4">
          <input
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2 dark:border-customPurpleBorder focus:outline-none"
            placeholder="Password"
            type="password"
          />
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2 dark:border-customPurpleBorder focus:outline-none"
            placeholder="Re-Password"
            type="password"
          />
        </div>
        <div className="w-[100%] text-black dark:text-white py-2">
          <label htmlFor="rememberMe" className="flex">
            <input
              type="radio"
              id="rememberMe"
              onChange={(e) => setTerms(e.target.value)}
            />
            <span id="customRadio"></span> I accept the{" "}
            <p
              onClick={() => setShowModal(true)}
              className="underline text-linksColor hover:cursor-pointer font-medium pl-1"
            >
              Terms and Condition
            </p>
          </label>
        </div>
        <div className="w-[100%] py-4">
          <button
            type="submit"
            className="bg-custom-gradient text-white w-[100%] py-2 rounded-full flex justify-center"
          >
            <Image
              className="mt-1 mr-1"
              src="/images/send.svg"
              width={16}
              height={13}
              alt="login"
            />
            Register Now
          </button>
        </div>
        <Link
          href="/auth/login"
          className="w-[100%] text-linksColor flex justify-center"
        >
          <h2 className="underline">Already have an account</h2>
        </Link>
      </form>
      <TermsAndConditionModal
        openEditModal={showModal}
        setOpenEditModal={setShowModal}
      />
    </div>
  );
};

export default credentialSlide;
