import Image from "next/image";
import React, { ReactNode } from "react";
import Wrapper from "./Common/Wrapper/Wrapper";

interface PageHeadProps {
  pageName?: string;
}

const PageHeader = ({ pageName }: PageHeadProps) => {
  return (
    <div className="relative">
      <div className="w-[100%] lg:h-[250px]  h-[140px] bg-custom-gradient text-[white] font-bold max-sm:flex max-sm:justify-center ">
        <Image
          src={"/images/HeroArea.png"}
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
          alt="Hero Image"
        />
      </div>
      <Wrapper>
        <div className="absolute  top-12 lg:top-24 text-3xl lg:text-5xl text-white font-bold">
          <h1>{pageName}</h1>
        </div>
      </Wrapper>
    </div>
  );
};

export default PageHeader;
