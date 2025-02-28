"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InitializeUserData } from "@/components/Store/Slicer/LoginSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { detectPlatform } from "@/app/utils/detectPlatform";
import { getLocation } from "@/app/utils/getLocation";
import axiosInstance from "@/app/utils/axios";
import ForgotPasswordModal from "./ForgotPasswordModal";

const CredentialSide = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [platform, setPlatform] = useState("");
  const [region, setRegion] = useState("");
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const loginUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`;
  const logOutUserAccount = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logoutOtherAccounts`;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await axiosInstance.post(loginUrl, {
          name: username,
          password: password,
          platform,
          region,
        });
        console.log("Response:", response);

        if (response.status === 200 || response.status === 201) {
          toast.success("Login successful!", {
            icon: <FaCheckCircle style={{ color: "#dc39fc" }} />,
          });
          dispatch(InitializeUserData(response.data));
          setTimeout(() => {
            router.push(`/`);
          }, 3000);
        } else {
          toast.error(response.data.message || "Login failed failed", {});
        }
        console.log("API Response:", response.data);
      } catch (error: any) {
        console.error("Error during Login:", error);
        if (Array.isArray(error.response?.data?.message)) {
          for (let i = 0; error.response?.data?.message.length > i; i++) {
            toast.error(
              error.response?.data?.message[i] ||
                "An error occurred. Please try again."
            );
          }
        } else {
          if (
            error.response?.data?.message ==
            "You have reached max account logins"
          ) {
            setShowAccountsModal(true);
            setAccounts(error.response?.data.accounts);
          } else if (
            error.response?.data?.message ==
            "User is not Verified, Email is sent to the registerd email"
          ) {
            toast.error(
              error.response?.data?.message ||
                "An error occurred. Please try again."
            );
            setTimeout(() => {
              router.push(`/auth/otp?email=${username}`);
            }, 3000);
          } else {
            toast.error(
              error.response?.data?.message ||
                "An error occurred. Please try again."
            );
          }
        }
      }
    } else {
      toast.error("Please Fill the fields");
    }
  };
  const LogoutExistingAccount = async (acc: any) => {
    try {
      const response = await axiosInstance.post(logOutUserAccount, {
        token: acc.token,
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Confirmation Sent to Registered Email", {
          icon: <FaCheckCircle style={{ color: "#dc39fc" }} />,
        });
        setTimeout(() => {
          setShowAccountsModal(false);
          // router.push(`/auth/logout-otp`);
        }, 3000);
      } else {
        toast.error(response.data.message || "Registration failed", {});
      }
      console.log("API Response:", response.data);
    } catch (error: any) {
      console.error("Error during signup:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };
  useEffect(() => {
    const fetch = async () => {
      let loc = await getLocation();
      // @ts-expect-error
      setRegion(loc);
    };
    let res = detectPlatform();
    fetch();
    setPlatform(res);
  }, []);

  return (
    <div
      id="loginCredentials"
      className={`flex dark:shadow-combinedNight shadow-combinedDay max-sm:h-max rounded-l-[12px] flex-col w-[60%] max-md:w-[100%] dark:bg-black  items-center gap-5 max-sm:gap-2 box-border   max-sm:mb-[300px] p-10 `}
    >
      <div className="w-[100%] mb-7 max-sm:mb-3">
        <h1
          className={`text-[2rem] max-sm:text-[1.5rem] font-bold text-left text-black dark:text-white `}
        >
          Login Your Account
        </h1>
      </div>
      <input
        type="text"
        className={`w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
        placeholder="User name or email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={`w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={`w-[100%] text-black dark:text-white`}>
        <label htmlFor="rememberMe">
          <input type="radio" id="rememberMe" />
          <span id="customRadio"></span> Remember Me
        </label>
      </div>

      <div className="w-[100%]  h-max">
        <button
          onClick={handleLogin}
          className=" bg-custom-gradient  text-white w-[100%] py-2 rounded-full flex justify-center "
        >
          <Image
            className=" mt-1 mr-1"
            src={"/images/send.svg"}
            width={16}
            height={13}
            alt="login"
          />
          Sign In
        </button>
      </div>

      <Link
        className="text-[#DC39FC] hover:underline  hover:text-secondaryColorLight"
        href="/auth/register"
      >
        Register me
      </Link>
      <button
        className="text-[#DC39FC] hover:underline hover:text-secondaryColorLight"
        onClick={() => setIsModalOpen(true)}
      >
        Forgot Password?
      </button>

      <ForgotPasswordModal open={isModalOpen} handleClose={handleModalClose} />

      {/* <div className=" relative mt-3">
        <div className=" text-white bg-[#DC39FC] flex justify-center items-center rounded absolute top-[-10px] right-[75px] w-[50px] h-[30px]">
          or
        </div>
        <div className="flex mt-1 gap-2 bg-customPurple px-8 py-7">
          <Image src={"/images/fb.svg"} alt="facebook" width={40} height={40} />
          <Image
            src={"/images/ln.svg"}
            alt="instagram"
            width={40}
            height={40}
          />
          <Image src={"/images/tw.svg"} alt="twitter" width={40} height={40} />
        </div>
      </div> */}
      {showAccountsModal && (
        <div className="absolute z-[9] text-black  backdrop-blur-sm top-0 left-0  overflow-hidden h-screen w-full flex justify-center items-center">
          <div className="bg-white md:px-12 flex justify-center flex-col items-center py-10 rounded-xl shadow-xl px-4 w-fit">
            <h1 className="font-bold text-xl">Max Account Login Reached</h1>
            <div className="mt-4 ">
              <p className="font-semibold mb-3 text-center">
                Following Accounts are logged in currently
              </p>
              <div className="flex flex-col gap-2 justify-between">
                {accounts &&
                  accounts.length > 0 &&
                  accounts.map((e) => (
                    <div className="flex gap-4 ">
                      <div className="flex ">
                        {/* @ts-expect-error */}
                        <p>{e.region},</p>
                        {/* @ts-expect-error */}
                        <p>{e.platform} </p>
                      </div>
                      <div className="flex italic">
                        {/* @ts-expect-error */}
                        <p>{new Date(e.created_at).toLocaleString()}</p>
                      </div>
                      <div className="flex italic">
                        <button
                          onClick={() => LogoutExistingAccount(e)}
                          className=" bg-red-600 text-white  rounded-lg  px-4 text-sm"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <button
              className="mt-7 bg-red-600 text-white  rounded-lg px-12 py-2"
              onClick={() => setShowAccountsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialSide;
