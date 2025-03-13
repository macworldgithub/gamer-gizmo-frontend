import React from "react";
import Wrapper from "./Common/Wrapper/Wrapper";

interface CardProps {
  title: string;
  description: string;
  note: string;
}

const CommonCard: React.FC<CardProps> = ({ title, description, note }) => {
  return (
    // <Wrapper>
    <div className=" bg-white text-black dark:text:white w-full max-md:ml-5 border border-pinkishBorder dark:text-white max-md:p-6 md:p-14 rounded-lg shadow-lg flex flex-col justify-center items-center gap-4 dark:bg-black">
      <h2 className="md:text-3xl max-md:text-center font-bold">{title}</h2>
      <p className="md:text-base text-center max-md:text-xs">{description}</p>
      <small className="text-sm">{note}</small>



    </div>
    // </Wrapper>
  );
};

export default CommonCard;

