"use client";

import React, { useState } from "react";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import PageHeader from "@/components/PageHeader";
import PartsNames from "./device";
import PartsInfromation from "./info";
import Guide from "./guide";
import Image from "next/image";
import Features from "./pictureside";
import SubmissionButton from "./submit";
import Device from "./device";

const SellForMe = () => {
  const [deviceType, setDeviceType] = useState("");

  const handleDeviceSelect = (device: string) => {
    setDeviceType(device);
    console.log("Selected Device:", device);
  };

  return (
    <>
      <PageHeader pageName="sellforme" />
      <div className="dark:bg-[#1e1e2f] ">
        <Guide />
        <Wrapper>
          <div className="w-[100%] h-[100%] flex p-2 justify-around  ">
            <div className="w-[60%] max-sm:w-[100%] h-max shadow-combinedNight border rounded py-5 px-[5%] box-border my-10 flex flex-col  ">
              <h1 className="text-[0.8rem] font-medium dark:text-white">
                Let GamerGizmo experts take the difficulty out of selling your
                gaming PC! We will manage your ad and find the best possible
                deal for you. Choose what's best for you today.
              </h1>
              <div className="flex ">
                <PartsNames onDeviceSelect={handleDeviceSelect} />
                <PartsInfromation />
              </div>
              <SubmissionButton />
            </div>

            <Features />
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default SellForMe;
