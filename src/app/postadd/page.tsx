import PageHeader from "@/components/PageHeader";
import React from "react";
import Image from "next/image";
import Guide from "./guide";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import { Select, MenuItem } from "@mui/material";
import PartsNames from "./parts";
import PartsInfromation from "./info";
import LaptopInformation from "./laptopinfo";
import UploadPhotos from "./uploadphotos";
import ContactInformation from "./contact";
import SubmissionButton from "./submit";

const PostAdd = () => {
  return (
    <>
      <PageHeader pageName="postyouradd" />

      <div id="layout" className="dark:bg-black">
        <Guide />
        <Wrapper>
          <div className="w-[100%] pb-5 dark:text-white h-max flex justify-center items-center flex-col">
            <LaptopInformation />
            <UploadPhotos />
            <ContactInformation />
            <SubmissionButton />
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default PostAdd;
