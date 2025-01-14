// components/CommunityCard.tsx
import Image from "next/image";
import React from "react";

interface CommunityCardProps {
  userName: string;
  time: string;
  question: string;
  description: string;
  src: string;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  userName,
  time,
  question,
  description,
  src,
}) => {
  return (
    <div className="border border-purple-300 rounded-lg p-4 shadow-sm mx-3 max-md:w-72 scrollbar-hide">
      <div className="flex justify-start items-center space-x-3 max-md:space-x-0 max-md:w-48">
        <div className="w-10 h-10 rounded-md max-md:w-7">
          <Image src={src} width={100} height={100} alt="profile-pic" />
        </div>
        <div className="">
          <p className="font-semibold dark:text-white text-black max-md:text-sm max-md:pl-4">
            {userName}
          </p>
          <p className="text-sm text-gray-500 max-md:text-[0.6rem]">{time}</p>
        </div>
      </div>
      <h3 className="mt-4 max-md:mt-1 text-black text-lg font-semibold max-md:text-sm text-start dark:text-white">
        {question}
      </h3>
      <p className="mt-2 text-start text-gray-600 max-md:text-[0.6rem] md:text-[0.85rem]">
        {description}
      </p>
      <div className="flex justify-end space-x-4 mt-4 text-sm text-gray-500">
        <button className="flex items-center space-x-1 hover:text-purple-500 max-md:text-xs">
          <span>Reply</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-purple-500 max-md:text-xs">
          <span>Like</span>
        </button>
      </div>
    </div>
  );
};

export default CommunityCard;
