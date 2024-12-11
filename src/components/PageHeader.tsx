import React, { ReactNode } from "react";

interface PageHeadProps {
  pageName: string;
}

const PageHeader = ({ pageName }: PageHeadProps) => {
  return (
    <div className="w-[100%]  h-[30%] bg-custom-gradient text-[white] text-[55px] font-bold">
      <p className="lg:ml-[26rem]">{pageName}</p>
    </div>
  );
};

export default PageHeader;
