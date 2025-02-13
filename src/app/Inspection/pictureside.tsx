import React from "react";
import Image from "next/image";

const Features = () => {
  return (
    <div className="w-[30%] max-sm:hidden h-max border-customPurpleBorder border rounded py-[5%] px-[1%] box-border my-10 flex flex-col items-center ">
      <Image src={"/images/CPU.png"} alt="cpu" width={100} height={100} />
      <div className="w-[100%]  flex flex-col items-center gap-3">
        <h1 className=" text-customPurpleBorder text-center ">
          let Gamer Gizmo Help you to sell your Computer
        </h1>
        <div className="flex text-[#333333] dark:text-white w-[80%] h-max ">
          <Image
            src={"/images/check.png"}
            width={20}
            height={20}
            alt="tick"
            style={{ objectFit: "cover", width: "20px", height: "20px" }}
          />
          <p className="w-[100%]">Dedicated Sales Expert to Sell your PC.</p>
        </div>

        <div className="flex text-[#333333] w-[80%] dark:text-white h-max ">
          <Image
            src={"/images/check.png"}
            width={20}
            height={20}
            alt="tick"
            style={{ objectFit: "cover", width: "20px", height: "20px" }}
          />
          <p className="w-[100%]">
            We Bargain for you and share the Best Offer dsdds.
          </p>
        </div>
        <div className="flex text-[#333333] dark:text-white w-[80%] h-max ">
          <Image
            src={"/images/check.png"}
            width={20}
            height={20}
            alt="tick"
            style={{ objectFit: "cover", width: "20px", height: "20px" }}
          />
          <p className="w-[100%]">We ensure Safe & Secure Transaction.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
