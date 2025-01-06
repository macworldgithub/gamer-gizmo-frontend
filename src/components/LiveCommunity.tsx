// pages/LiveCommunity.tsx
import React from "react";
import CommunityCard from "../components/CommunityCard";
import Wrapper from "./Common/Wrapper/Wrapper";

interface CardData {
  userName: string;
  time: string;
  question: string;
  description: string;
  src: string;
}

const LiveCommunity: React.FC = () => {
  const cardsData: CardData[] = [
    {
      userName: "Cam Incoll",
      time: "5 minutes ago",
      question: "How to buy NFTs?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...",
      src: "/images/mouse.png",
    },
    {
      userName: "Cam Incoll",
      time: "5 minutes ago",
      question: "How to sell NFTs?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...",
      src: "/images/profile.png",
    },
    {
      userName: "Cam Incoll",
      time: "5 minutes ago",
      question: "How to sell NFTs?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...",
      src: "/images/profile.png",
    },
    {
      userName: "Cam Incoll",
      time: "5 minutes ago",
      question: "How to sell NFTs?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...",
      src: "/images/mouse.png",
    },
  ];

  return (
    <div className="space-y-8 bg-white dark:bg-black w-full py-6">
      <Wrapper>
        <h1 className="text-3xl text-start font-bold max-sm:text-xl text-black dark:text-white max-sm:ml-4 md:pl-4 sm:pl-3 pb-3">
          Live Community
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full text-black dark:text-white">
          {cardsData.map((card, index) => (
            <CommunityCard
              key={index}
              userName={card.userName}
              time={card.time}
              question={card.question}
              description={card.description}
              src={card.src}
            />
          ))}
        </div>
        <div className="flex justify-end max-md:justify-center mt-8">
          <button className="px-6 py-2 w-[10rem] h-[3rem] bg-custom-gradient  text-white text-center text-xs font-semibold rounded-full shadow hover:opacity-90">
            Join Live Community
          </button>
        </div>
      </Wrapper>
    </div>
  );
};

export default LiveCommunity;
