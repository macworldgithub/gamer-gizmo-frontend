import React from "react";
import Image from "next/image";

const Guide = () => {
  return (
    <div className="w-[100%] bg-[#f9f9f9]  px-10 m py-[1rem] flex justify-center  box-border">
      <div className="  text-center flex flex-col justify-center items-center">
        <h1 className="text-[2.5rem] text-customPurpleBorder font-medium">
          Sell Your Pc With three Simple Steps!
        </h1>
        <h1 className="text-[1rem] font-normal mb-2">
          it's free and take less than a minute
        </h1>
        <div className="flex gap-4  max-sm:flex max-sm:flex-col">
          <div className="flex items-center gap-3">
            <Image
              src={"/images/product.png"}
              alt="productimage"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "50px", height: "50px" }}
            />
            <p className="text-[0.8rem] font-light">
              Enter Your Pc Information
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={"/images/images.png"}
              alt="productimage"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "50px", height: "50px" }}
            />
            <p className="text-[0.8rem] font-light">Upload Photos & videos</p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={"/images/pricetag.png"}
              alt="productimage"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "50px", height: "50px" }}
            />
            <p className="text-[0.8rem] font-light">
              Enter Your Selling Price{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
