"use client";
import React from "react";
import Image from "next/image";

const PictureSide = () => {
  return (
    <div className="w-[40%]  max-md:hidden rounded rounded-r-[12px] overflow-hidden">
      <Image
        src={"/images/loginPagePicture.png"}
        alt="login picture"
        width={0}
        height={0}
        sizes="100%"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default PictureSide;
