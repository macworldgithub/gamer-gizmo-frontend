import Image from "next/image";
import React, { ReactNode } from "react";

interface PageHeadProps {
  pageName: string;
}

const PageHeader = ({ pageName }: PageHeadProps) => {
  return (
    <div className="w-[100%] lg:h-[100px]  h-[30%] bg-custom-gradient text-[white] font-bold max-sm:flex max-sm:justify-center ">
      <Image
        src={"/images/HeroArea.png"}
        width={0}
        height={0}
        sizes="100%"
        style={{ width: "100%", height: "100%", objectFit: "fill" }}
        alt="Hero Image"
      />
    </div>
  );
};

export default PageHeader;
