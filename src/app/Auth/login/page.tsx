"use client";
import React from "react";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import CredentialSide from "./credentialSide";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

const Login = () => {
  const theme = useSelector((state: any) => state.Theme.theme);
  return (
    <>
      <PageHeader pageName="Login" />
      <div
        className={`h-max p-[5rem] max-sm:p-[1rem] ${
          theme === "day" ? "bg-white" : "bg-black"
        }  w-[100%] flex items-center justify-center`}
      >
        <div className="w-[75%] max-md:w-[100%] md:h-max xl:h-[550px] lg:w-[1170px]  h-[550px] max-sm:h-[450px] mb-[80px]  rounded-[12px] flex ">
          <CredentialSide />

          <div className="w-[40%]  max-md:hidden rounded rounded-r-[12px] overflow-hidden">
            <Image
              src={"/images/loginPagePicture.png"}
              alt="login picture"
              width={0}
              height={0}
              sizes="100%"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
