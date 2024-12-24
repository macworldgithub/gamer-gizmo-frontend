import React from "react";
import Image from "next/image";

const CredentialSide = () => {
  return (
    <div
      id="loginCredentials"
      className={`flex dark:shadow-combinedNight shadow-combinedDay  max-sm:h-max rounded-l-[12px] flex-col w-[60%] max-md:w-[100%] dark:bg-black  items-center gap-5 max-sm:gap-2 box-border   max-sm:mb-[300px] p-10 `}
    >
      <div className="w-[100%] mb-7 max-sm:mb-3">
        <h1
          className={`text-[2rem] max-sm:text-[1.5rem] font-bold text-left text-black dark:text-white `}
        >
          Create An Account
        </h1>
      </div>
      <div className="flex max-sm:gap-2 w-[100%] justify-between max-sm:flex-col">
        <input
          className={`w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
          placeholder="First Name"
        />
        <input
          className={`w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
          placeholder="Last Name"
        />
      </div>
      <div className="flex w-[100%] max-sm:gap-2 justify-between max-sm:flex-col">
        <input
          className={`w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
          placeholder="Phone Number"
        />
        <input
          className={`w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
          placeholder="User Name"
        />
      </div>
      <input
        className={`w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
        placeholder="Email Address"
      />
      <div className="flex w-[100%] max-sm:gap-2 justify-between max-sm:flex-col">
        <input
          className={`w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
          placeholder="password"
        />
        <input
          className={`w-[49%] max-sm:w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
          placeholder="re-password"
        />
      </div>
      <div className={`w-[100%] text-black dark:text-white  `}>
        <label htmlFor="rememberMe" className="flex">
          <input type="radio" id="rememberMe" />
          <span id="customRadio"></span> I accept the{" "}
          <p className=" underline text-linksColor font-medium pl-1">
            Terms and Condition
          </p>
        </label>
      </div>
      <div className="w-[100%]  h-max">
        <button className=" bg-custom-gradient  text-white w-[100%] py-2 rounded-full flex justify-center ">
          <Image
            className=" mt-1 mr-1"
            src={"/images/send.svg"}
            width={16}
            height={13}
            alt="login"
          />
          Register Now
        </button>
      </div>
      <div className="w-[100%] text-linksColor flex justify-center">
        <h2 className=" underline">Already have an account</h2>
      </div>
    </div>
  );
};

export default CredentialSide;
