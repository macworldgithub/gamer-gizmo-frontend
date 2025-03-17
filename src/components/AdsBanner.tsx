import Image from "next/image";
import React from "react";
import banner from "../../public/images/HeroArea.png";
import Wrapper from "./Common/Wrapper/Wrapper";
const AdsBanner: React.FC = () => {
  return (
    <Wrapper>
      <div className="w-full h-28 max-w-6xl mx-auto bg-gray-300 overflow-hidden flex flex-col justify-center items-center relative max-md:mt-4">
        {/* <Image src={banner} alt="Banner" layout="fill" objectFit="cover" />
         */}
        <h1 className="text-center font-bold">Boost Your Brand Visibility</h1>
        <p className="text-center text-gray-700">
          Advertise with gamergizmo today!
        </p>
      </div>
    </Wrapper>
  );
};

export default AdsBanner;
