import React from "react";
import Wrapper from "./Common/Wrapper/Wrapper";
import Image from "next/image";
import gpu from "../../public/images/consoles.png"


interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  imagePosition: "left" | "right";
}

const cards: CardProps[] = [
  {
    title: "Lorem Ipsum",
    description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum.",
    buttonText: "Explore Now",
    imagePosition: "left",
  },
  {
    title: "Lorem Ipsum",
    description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum.",
    buttonText: "Browse Now",
    imagePosition: "right",
  },
];

const CardComponent: React.FC = () => {
  return (
    <Wrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-6xl mx-auto mb-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-[#e8e3fc] flex flex-col sm:flex-row items-center justify-between p-6 shadow-md gap-6"
          >
            {/* Left Side (Image Section with 3 Overlapping Cards) */}
            {card.imagePosition === "left" && (
              <div className="relative flex-shrink-0 w-32 h-24 mx-4">
                <div className="absolute -left-4 top-2 w-24 h-24 bg-gray-300 rounded-lg transform -rotate-[6deg] border-white border-4">
                    <Image src={gpu} alt="Ads Banner" className="object-cover"/>
                </div>
                
                <div className="absolute left-12 top-2 w-24 h-24 bg-gray-300 rounded-lg transform rotate-[6deg] border-white border-4">
                <Image src={gpu} alt="Ads Banner" className="object-cover"/>
                </div>
                <div className="absolute left-6 top-0 w-20 h-28 bg-gray-300 rounded-lg border-white border-4">
                <Image src={gpu} alt="Ads Banner" className="object-cover"/>
                </div>
              </div>
            )}

            {/* Middle Content Section */}
            <div className="flex-1 text-center sm:text-left px-4">
              <h2 className="text-lg font-bold text-gray-900">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
              <button className="mt-4 px-4 py-1 bg-custom-gradient text-white rounded-md shadow-md">
                {card.buttonText}
              </button>
            </div>

            {/* Right Side (Image Section with 3 Overlapping Cards) */}
            {card.imagePosition === "right" && (
              <div className="relative flex-shrink-0 w-32 h-24 mx-4">
                <div className="absolute -left-4 top-2 w-24 h-24 bg-gray-300 rounded-lg transform -rotate-[6deg] border-white border-4">
                <Image src={gpu} alt="Ads Banner" className="object-cover"/>
                </div>
               
                <div className="absolute left-12 top-2 w-24 h-24 bg-gray-300 rounded-lg transform rotate-[6deg] border-white border-4">
                <Image src={gpu} alt="Ads Banner" className="object-cover"/>
                </div>
                <div className="absolute left-6 top-0 w-20 h-28 bg-gray-300 rounded-lg border-white border-4">
                <Image src={gpu} alt="Ads Banner" className="object-cover"/>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default CardComponent;
