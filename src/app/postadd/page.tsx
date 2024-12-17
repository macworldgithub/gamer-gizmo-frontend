import PageHeader from "@/components/PageHeader";
import React from "react";
import Image from "next/image";
import Guide from "./guide";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
PageHeader;

const PostAdd = () => {
  return (
    <>
      <PageHeader pageName="postyouradd" />

      <div id="layout" className="pb-[5rem]">
        <Guide />
        <Wrapper>
          <div className="w-[100%] h-max shadow-combinedDay  border rounded p-5">
            <h1 className="text-[1.5rem] font-semibold">Laptop Information </h1>
            <h1 className="text-[0.8rem] font-medium">
              (All Marked Fields are Mandatory)
            </h1>
            <div className="w-[30%] py-5 gap-2 items-end h-max  flex flex-col">
              <span>
                City
                <input className=" p-2 rounded  dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none" />{" "}
              </span>
              <span>
                Pic Info
                <input className=" p-2 rounded  dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none" />{" "}
              </span>
              <span>
                Graphics Card{" "}
                <input className=" p-2 rounded  dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none" />{" "}
              </span>
              <span>
                RAM
                <input className=" p-2 rounded  dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none" />{" "}
              </span>
              <span>
                Storage{" "}
                <input className=" p-2 rounded  dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none" />{" "}
              </span>
              <span>
                LCD Size{" "}
                <input className=" p-2 rounded  dark:bg-black font-bold text-black dark:text-white border-2  dark:border-customPurpleBorder  focus:outline-none" />{" "}
              </span>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default PostAdd;
