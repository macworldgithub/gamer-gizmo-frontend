import React from "react";
import Wrapper from "./Common/Wrapper/Wrapper";

interface CardProps {
  title: string;
  description: string;
  note: string;
  bannerShow: boolean;
  bannerCount?: number;
}

const CommonCard: React.FC<CardProps> = ({
  title,
  description,
  note,
  bannerShow,
  bannerCount = 1,
}) => {
  return (
    // <Wrapper>
    <div>
      <div className=" bg-white text-black dark:text:white w-full max-md:ml-5 border border-pinkishBorder dark:text-white max-md:p-6 md:p-14 rounded-lg shadow-lg flex flex-col justify-center items-center gap-4 dark:bg-black">
        <h2 className="md:text-3xl max-md:text-center font-bold">{title}</h2>
        <p className="md:text-base text-center max-md:text-xs">{description}</p>
        <small className="text-sm">{note}</small>
      </div>
      {/* </Wrapper> */}

      {bannerShow &&
        Array.from({ length: bannerCount }).map((_, index) => (
          <div
            key={index}
            className="border mt-2 h-32 dark:text-white border-pinkishBorder flex flex-col items-center justify-center"
          >
            <p className="font-bold text-black dark:text-white">
              Boost Your Brand Visibility
            </p>
            <p className="text-black dark:text-white">
              Advertise with gamergizmo today!
            </p>
          </div>
        ))}
    </div>
  );
};

export default CommonCard;
