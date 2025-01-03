import React from "react";
import PartsInfromation from "./info";
import PartsNames from "./parts";
import Wrapper from "@/components/Common/Wrapper/Wrapper";

const LaptopInformation = () => {
  return (
    // <Wrapper>
    <div className="md:w-[65%] max-md:w-full h-max shadow-combinedNight border rounded py-5 px-[5%] box-border my-10 flex flex-col ">
      <Wrapper>
        <h1 className="text-[1.5rem] font-semibold">Laptop Information </h1>
        <h1 className="text-[0.8rem] font-medium">
          (All Marked Fields are Mandatory)
        </h1>
        <div className="flex">
          <PartsNames />
          <PartsInfromation />
        </div>
      </Wrapper>
    </div>
    // </Wrapper>
  );
};

export default LaptopInformation;
