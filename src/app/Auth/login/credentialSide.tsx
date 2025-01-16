// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { setLogin } from "@/app/Redux/LoginSlice";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/app/utils/axios";
// import { platform } from "os";

// const CredentialSide = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const loginUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`;

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     platform: "windows",
//   });
//   const [error, setError] = useState("");

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async () => {
//     const { username, password } = formData;

//     if (!username || !password) {
//       setError("Please fill in both username and password.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.post(loginUrl, {
//         name: username,
//         password,
//         platform: platform,
//       });

//       if (response.status === 200) {
//         const { token, is_verified } = response.data;

//         if (!is_verified) {
//           router.push("/Auth/otp"); // Redirect to OTP screen for verification
//         } else {
//           dispatch(setLogin(true)); // Update login state in Redux
//           localStorage.setItem("token", token); // Save token for future requests
//           router.push("/route"); // Redirect to the desired route
//         }
//       }
//     } catch (error: any) {
//       if (error.response && error.response.data) {
//         const message = error.response.data.message;
//         setError(typeof message === "string" ? message : message.join(", "));
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     }
//   };
//   return (
//     <div
//       id="loginCredentials"
//       className={`flex dark:shadow-combinedNight shadow-combinedDay max-sm:h-max rounded-l-[12px] flex-col w-[60%] max-md:w-[100%] dark:bg-black  items-center gap-5 max-sm:gap-2 box-border   max-sm:mb-[300px] p-10 `}
//     >
//       <div className="w-[100%] mb-7 max-sm:mb-3">
//         <h1
//           className={`text-[2rem] max-sm:text-[1.5rem] font-bold text-left text-black dark:text-white `}
//         >
//           Login Your Account
//         </h1>
//       </div>
//       <input
//         type="text"
//         className={`w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
//         placeholder="User name or email"
//         name="username"
//         value={formData.username}
//         onChange={handleInputChange}
//       />
//       <input
//         className={`w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
//         type="password"
//         placeholder="Password"
//         name="password"
//         value={formData.password}
//         onChange={handleInputChange}
//       />
//       <div className={`w-[100%] text-black dark:text-white`}>
//         <label htmlFor="rememberMe">
//           <input type="radio" id="rememberMe" />
//           <span id="customRadio"></span> Remember Me
//         </label>
//       </div>

//       <div className="w-[100%]  h-max">
//         <button
//           onClick={handleLogin}
//           className=" bg-custom-gradient  text-white w-[100%] py-2 rounded-full flex justify-center "
//         >
//           <Image
//             className=" mt-1 mr-1"
//             src={"/images/send.svg"}
//             width={16}
//             height={13}
//             alt="login"
//           />
//           Sign In
//         </button>
//       </div>

//       <Link className="text-[#DC39FC] underline" href="/Auth/register">
//         Register me
//       </Link>
//       <div className=" relative mt-3">
//         <div className=" text-white bg-[#DC39FC] flex justify-center items-center rounded absolute top-[-10px] right-[75px] w-[50px] h-[30px]">
//           or
//         </div>
//         <div className="flex mt-1 gap-2 bg-customPurple px-8 py-7">
//           <Image src={"/images/fb.svg"} alt="facebook" width={40} height={40} />
//           <Image
//             src={"/images/ln.svg"}
//             alt="instagram"
//             width={40}
//             height={40}
//           />
//           <Image src={"/images/tw.svg"} alt="twitter" width={40} height={40} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CredentialSide;
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { setLogin } from "@/app/Redux/LoginSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios";
import { toast } from "react-toastify";

const CredentialSide = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Construct the login URL
  const loginUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`;
  console.log("Login URL:", loginUrl); // Debugging log to check if the URL is correct

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    platform: "windows",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const { username, password, platform } = formData;

    if (!username || !password) {
      setError("Please fill in both username and password.");
      toast.error("Please fill in both username and password.");
      return;
    }

    // Debugging log for form data
    console.log("Form data to be sent:", { username, password, platform });

    try {
      // Log the URL and data for debugging purposes
      console.log("Making POST request to:", loginUrl);
      const response = await axiosInstance.post(loginUrl, {
        name: username,
        password,
        platform,
      });

      // Log the entire response for debugging
      console.log("Response received:", response);

      if (response.status === 200) {
        const { token, is_verified } = response.data;
        console.log("Token received:", token);
        console.log("Is verified:", is_verified);

        if (!is_verified) {
          toast.info("Verification email sent. Please check your inbox.");
          setTimeout(() => {
            router.push("/Auth/otp");
          }, 3000);
        } else {
          dispatch(setLogin(true));
          localStorage.setItem("token", token);
          router.push("/");
          toast.success("Login successful!");
        }
      }
    } catch (error: any) {
      // Log the error response for debugging
      console.error("Error occurred during login:", error);

      if (error.response && error.response.data) {
        const message = error.response.data.message;
        console.error("API Error message:", message);
        setError(typeof message === "string" ? message : message.join(", "));
        toast.error(typeof message === "string" ? message : message.join(", "));
      } else {
        setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred."); // Show generic error in toast
      }
    }
  };
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
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <input
        className={`w-[100%] p-3 rounded bg-customPurple dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none`}
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
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

      <Link className="text-[#DC39FC] underline" href="/Auth/register">
        Register me
      </Link>
      <div className=" relative mt-3">
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
      </div>
    </div>
  );
};

export default CredentialSide;
