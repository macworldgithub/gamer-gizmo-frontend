"use client";
import React from "react";
import { useThemeStyles } from "@/theme/useThemeStyles";
import PageHeader from "@/components/PageHeader";
import CredentialSide from "./credentialsSide";
import PictureSide from "./pictureSide";
interface layoutProps {
  children: React.ReactNode;
}

const RegisterLayout = ({ children }: layoutProps) => {
  const themeStyles = useThemeStyles();

  return (
    <>
      <PageHeader pageName="Create An Account" />
      <div
        className={`h-max p-[2rem] max-sm:p-[1rem] bg-white dark:bg-customBg w-[100%] flex items-center justify-center`}
      >
        <div className="w-[75%]  max-md:w-[100%] md:h-max xl:h-[600px] lg:w-[1170px]  h-[550px] max-sm:h-[450px] mb-[80px]  rounded-[12px] flex ">
          <CredentialSide />
          <PictureSide />
        </div>
      </div>
    </>
  );
};

export default RegisterLayout;
