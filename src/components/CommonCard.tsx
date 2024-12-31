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
    <div className=" bg-white text-black dark:text:white w-full max-md:ml-5 h-[25em] border border-pinkishBorder dark:text-white p-6 rounded-lg shadow-lg flex flex-col gap-4 dark:bg-black ">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-base">{description}</p>
      <small className="text-sm ">{note}</small>
    </div>
    // </Wrapper>
  );
};

export default CommonCard;

