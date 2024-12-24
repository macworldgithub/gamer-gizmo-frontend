import React from "react";
import PartsInfromation from "./info";
import PartsNames from "./parts";

const LaptopInformation = () => {
  return (
    <div className="w-[65%] h-max shadow-combinedNight border rounded py-5 px-[5%] box-border my-10 flex flex-col ">
      <h1 className="text-[1.5rem] font-semibold">Laptop Information </h1>
      <h1 className="text-[0.8rem] font-medium">
        (All Marked Fields are Mandatory)
      </h1>
      <div className="flex">
        <PartsNames />
        <PartsInfromation />
      </div>
    </div>
  );
};

export default LaptopInformation;
