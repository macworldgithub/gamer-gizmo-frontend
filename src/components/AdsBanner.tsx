import Image from "next/image";
import React from "react";
import banner from "../../public/images/HeroArea.png";
import Wrapper from "./Common/Wrapper/Wrapper";
const AdsBanner: React.FC = () => {
  return (
    <Wrapper>
    <div className="w-full h-28 max-w-6xl mx-auto bg-gray-300 overflow-hidden relative">
      <Image
        src={banner}
        alt="Banner"
        layout="fill"
        objectFit="cover"
      />
    </div>
    </Wrapper>
  );
};

export default AdsBanner;
