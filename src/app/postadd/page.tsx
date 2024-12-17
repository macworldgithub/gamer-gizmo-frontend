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
                <input className=" border-customPurpleBorder" />{" "}
              </span>
              <span>
                Pic Info <input />{" "}
              </span>
              <span>
                Graphics Card <input />{" "}
              </span>
              <span>
                RAM
                <input />{" "}
              </span>
              <span>
                Storage <input />{" "}
              </span>
              <span>
                LCD Size <input />{" "}
              </span>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default PostAdd;
