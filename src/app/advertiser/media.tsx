import React from "react";
import Gamer from "../../../public/images/Gamer.png";
import Rectangle1 from "../../../public/images/Rectangle1.png";
import Rectangle2 from "../../../public/images/Rectangle2.png";
import Image from "next/image";

function MediaPack() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-full px-4 md:px-8">
     
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row items-center md:items-start dark:bg-[#1e1e2f]">
        <div className="p-4 w-full md:w-[50%]">
          <Image src={Gamer} alt="GamerGizmo Advertising" className="mb-6 mx-auto md:mx-0" />
          <h3 className="text-lg font-bold mb-2 text-center md:text-left dark:text-white ">
            GamerGizmo Advertising
          </h3>
          <h3 className="text-[#6345ED] font-bold underline text-center md:text-left ">
            Media Pack
          </h3>
          <p className="text-center md:text-left dark:text-white">2025</p>
        </div>
        <Image src={Rectangle1} alt="Media pack" className="w-full md:w-[50%] h-auto md:h-full " />
      </div>

    
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row items-center md:items-start dark:bg-[#1e1e2f]">
        <div className="p-4 w-full md:w-[50%]">
          <Image src={Gamer} alt="GamerGizmo Advertising" className="mb-6 mx-auto md:mx-0" />
          <h3 className="text-lg font-bold mb-2 text-center md:text-left dark:text-white">
            GamerGizmo Advertising
          </h3>
          <h3 className="text-[#6345ED] font-bold underline text-center md:text-left">
            Ad Specs
          </h3>
          <p className="text-center md:text-left dark:text-white">2025</p>
        </div>
        <Image src={Rectangle2} alt="Ad specs" className="w-full md:w-[50%] h-auto md:h-full" />
      </div>
    </div>
  );
}

export default MediaPack;
