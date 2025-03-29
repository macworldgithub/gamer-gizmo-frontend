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
        "NFTs can be purchased on various marketplaces. Start by creating a crypto wallet, adding funds, and exploring platforms like OpenSea, Rarible, or Foundation.",
      src: "/images/profile.png",
    },
    {
      userName: "Cam Incoll",
      time: "5 minutes ago",
      question: "How to sell NFTs?",
      description:
        "To sell NFTs, mint your digital asset on a blockchain like Ethereum or Solana, list it on a marketplace, and set your desired price or auction.",
      src: "/images/profile.png",
    },
    {
      userName: "Cam Incoll",
      time: "5 minutes ago",
      question: "What are the benefits of NFTs?",
      description:
        "NFTs enable artists to monetize their work, ensure ownership authenticity, and provide unique experiences for collectors.",
      src: "/images/profile.png",
    },
    {
      userName: "Cam Incoll",
      time: "5 minutes ago",
      question: "What is the future of NFTs?",
      description:
        "NFTs are evolving beyond art, finding use cases in gaming, real estate, identity verification, and more, revolutionizing digital ownership.",
      src: "/images/profile.png",
    },
  ];

  return (
    <div className="space-y-8 bg-white dark:bg-black w-full py-6 max-w-4xl mx-auto">
      <Wrapper>
        <h1 className="text-3xl text-start font-bold max-sm:text-xl text-black dark:text-white max-sm:ml-4 md:pl-4 sm:pl-3 pb-3">
          Live Community
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-md:hidden w-full text-black dark:text-white">
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
        <div className="flex md:hidden overflow-x-auto scrollbar-hide">
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
