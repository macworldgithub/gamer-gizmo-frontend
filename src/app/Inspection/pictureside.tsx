import React from "react";
import Image from "next/image";

const Features = () => {
  const features = [
    "Comprehensive PC Inspection: We check hardware, performance, and condition.",
    "Certified Health Report: Receive an official GamerGizmo certificate detailing your PC’s status.",
    "Sell with Confidence: Boost buyer trust with verified performance insights.",
    "No Surprises, Just Assurance: Know your PC’s true value before you list it."
  ];
  return (
    <div className="w-[30%] max-sm:hidden h-max border-customPurpleBorder border rounded py-[5%] px-[1%] box-border my-10 flex flex-col items-center ">
      <Image src={"/images/CPU.png"} alt="cpu" width={100} height={100} />
      <div className="w-[100%]  flex flex-col items-center gap-3">
        <h1 className=" text-customPurpleBorder text-center ">
          let Gamer Gizmo Help you to sell your Computer
        </h1>
        <div className="flex flex-col gap-4">
      {features.map((feature, index) => (
        <div key={index} className="flex text-[#333333] dark:text-white w-[80%] h-max">
          <Image
            src={"/images/check.png"}
            width={20}
            height={20}
            alt="tick"
            style={{ objectFit: "cover", width: "20px", height: "20px" }}
          />
          <p className="w-[100%] text-base dark:text-white">{feature}</p>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
};

export default Features;
