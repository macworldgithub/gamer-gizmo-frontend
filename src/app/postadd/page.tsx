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

const PostAdd = () => {
  return (
    <>
      <PageHeader pageName="postyouradd" />

      <div id="layout" className="pb-[5rem]">
        <Guide />
        <Wrapper>
          <div className="w-[100%] h-max flex justify-center items-center flex-col">
            <LaptopInformation />
            <UploadPhotos />
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default PostAdd;
