import React from "react";
import Image from "next/image";
import RulesOfUploading from "./rules";

const UploadPhotos = () => {
  return (
    <div className="w-[65%] h-max shadow-combinedNight border rounded py-5 px-[5%] box-border my-10 flex flex-col ">
      <h1 className="text-[1.5rem] font-semibold mb-2">Upload Photos </h1>
      <div className="w-[100%] h-max border-customPurpleBorder border-dashed border rounded py-2">
        <div className="flex  w-[100%] h-max items-center justify-center gap-4 max-sm:flex-col max-sm:gap-2">
          <Image
            src={"/images/product.png"}
            alt="productimage"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "50px", height: "50px", marginBottom: "15px" }}
          />
          <div className="flex flex-col">
            <button className="w-max text-nowrap h-[50px] bg-custom-gradient p-5 text-center flex justify-center items-center text-white rounded-[50px]">
              <p>+ Add Photos/Videos</p>
            </button>
            <p className="text-[10px] mt-1 ml-5">(max limit 5mb)</p>
          </div>
        </div>
        <RulesOfUploading />
      </div>
    </div>
  );
};

export default UploadPhotos;
