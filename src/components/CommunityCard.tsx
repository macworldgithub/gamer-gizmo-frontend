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
    <div className="border border-purple-300 rounded-lg p-4 shadow-sm mx-3">
      <div className="flex justify-start items-center space-x-3">
        <div className="w-10 h-10 bg-gray-300 rounded-md">
          <Image src={src} width={100} height={100} alt="profile-pic" />
        </div>
        <div>
          <p className="font-semibold dark:text-white">{userName}</p>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-start dark:text-white">
        {question}
      </h3>
      <p className="mt-2 text-start text-gray-600">{description}</p>
      <div className="flex justify-end space-x-4 mt-4 text-sm text-gray-500">
        <button className="flex items-center space-x-1 hover:text-purple-500">
          <span>Reply</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-purple-500">
          <span>Like</span>
        </button>
      </div>
    </div>
  );
};

export default CommunityCard;
