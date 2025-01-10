"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { colors } from "@mui/material";

const credentialSlide = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //   e.preventDefault();

  //   if (formData.password !== formData.confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4001/auth/signup",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       alert("Registration successful!");
  //     } else {
  //       alert(response.data.message || "Registration failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during signup:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  // };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   // Frontend validation for password match
  //   if (formData.password !== formData.confirmPassword) {
  //     toast.error("Passwords do not match", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4001/auth/signup",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       toast.success("Registration successful!", {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });

  //       setTimeout(() => {
  //         router.push("/Auth/otp"); // Redirect to OTP screen
  //       }, 3000);
  //     }
  //   } catch (error: any) {
  //     console.error("Error during signup:", error);

  //     const errorMessage =
  //       error.response?.data?.message || "An error occurred. Please try again.";

  //     // Display the backend error message
  //     if (Array.isArray(errorMessage)) {
  //       // If the error message is an array (e.g., validation errors)
  //       errorMessage.forEach((msg) => {
  //         toast.error(msg, {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //         });
  //       });
  //     } else {
  //       // Single error message
  //       toast.error(errorMessage, {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //     }
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error("password must be atleast 6 characters long", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4001/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response);

      if (response.status === 200 || response.status === 201) {
        toast.success("Registration successful! OTP has been sent to email", {
          icon: <FaCheckCircle style={{ color: "#dc39fc" }} />,
        });
      } else {
        toast.error(response.data.message || "Registration failed", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error: any) {
      console.error("Error during signup:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div
      id="loginCredentials"
      className="flex dark:shadow-combinedNight shadow-combinedDay max-sm:h-max rounded-l-[12px] flex-col w-[60%] max-md:w-[100%] dark:bg-black items-center gap-5 max-sm:gap-2 box-border max-sm:mb-[300px] p-10"
    >
      <div className="w-[100%] mb-7 max-sm:mb-3">
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
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2 dark:border-customPurpleBorder focus:outline-none"
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
            <input type="radio" id="rememberMe" />
            <span id="customRadio"></span> I accept the{" "}
            <p className="underline text-linksColor font-medium pl-1">
              Terms and Condition
            </p>
          </label>
        </div>
        <div className="w-[100%] h-max py-4">
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
          href="/Auth/login"
          className="w-[100%] text-linksColor flex justify-center"
        >
          <h2 className="underline">Already have an account</h2>
        </Link>
      </form>
      <ToastContainer
        hideProgressBar={false}
        autoClose={3000}
        progressClassName="progress-bar"
        position="top-right"
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    </div>
  );
};

export default credentialSlide;
