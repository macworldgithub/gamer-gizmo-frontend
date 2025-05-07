"use client";

import React, { useState } from "react";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import PageHeader from "@/components/PageHeader";
import PartsNames from "./device";
import Guide from "./guide";
import Features from "./pictureside";
import SubmissionButton from "./submit";
import PartsInformation from "./info";
import PcInspectionForm from "./PcInspectionForm";

const SellForMe = () => {
  const [deviceType, setDeviceType] = useState("");

  const handleDeviceSelect = (device: string) => {
    setDeviceType(device);
    console.log("Selected Device:", device);
  };

  const [adInformation, setAdInformation] = useState<Record<string, string>>(
    {}
  );
  return (
    <>
      <PageHeader pageName="sellforme" />
      <div className="dark:bg-[#1e1e2f] ">
        <Guide />
        <Wrapper>
          <div className="w-[100%] h-[100%] flex p-2 justify-around  ">
            <div className="w-[60%] max-sm:w-[100%] h-max shadow-combinedNight border rounded py-5 px-[5%] box-border my-10 flex flex-col  ">
              <h1 className="font-bold text-lg text-center pb-2 text-secondaryColorDark">
                Book Your PC Inspection
              </h1>
              <h1 className="text-[0.8rem] font-medium dark:text-white text-black">
                PC Inspection, Hassle-Free! Buy with confidence and avoid costly
                surprises with GamerGizmo’s expert PC inspections. Get a
                detailed hardware check to ensure you’re getting the best
                performance and value every time!
              </h1>
              <div className="flex">
                {/* <PartsNames onDeviceSelect={handleDeviceSelect} /> */}
                <PcInspectionForm />
                {/* <PartsInformation adInformation={adInformation} setAdInformation={setAdInformation} /> */}
              </div>
              {/* <SubmissionButton /> */}
            </div>

            <Features />
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default SellForMe;
