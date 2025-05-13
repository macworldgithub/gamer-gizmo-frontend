import React from "react";
import Wrapper from "./Common/Wrapper/Wrapper";
import Image from "next/image";
import gpu from "../../public/images/consoles.webp";
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  imagePosition: "left" | "right";
  link: string; // Added link property
}

// const cards: CardProps[] = [
//   {
//     title: "Boost your brand visibility",
//     description: "Advertise with GamerGizmo today!",
//     buttonText: "Explore Now",
//     imagePosition: "left",
//     link: "/advertisement",
//   },
//   {
//     title: "Boost your brand visibility",
//     description: "Advertise with GamerGizmo today!",
//     buttonText: "Explore Now",
//     imagePosition: "right",
//     link: "/advertisement",
//   },
// ];

const cardData = {
  left: {
    imagePosition: "left",
    title: "Boost your brand visibility",
    description: "Advertise with GamerGizmo today!.",
    buttonText: "Learn More",
    link: "/advertisement",
  },
  right: {
    imagePosition: "right",
    title: "Boost your brand visibility",
    description: "Advertise with GamerGizmo today!",
    buttonText: "Explore Now",
    link: "/advertisement",
  },
};
interface CardComponentProps {
  position: "left" | "right";
  className?: string;
}
const CardComponent: React.FC<CardComponentProps> = ({
  position,
  className,
}) => {
  const card = cardData[position];

  return (
    <Wrapper>
      <div
        className={`bg-[#e8e3fc] flex flex-col lg:flex-row items-center justify-between p-6 shadow-md max-lg:gap-0 lg:gap-6  md:h-52 max-md:h-40 ${className}`}
      >
        {/* Image Left */}
        {card.imagePosition === "left" && (
          <div className="relative flex-shrink-0  w-24 h-24 mb-4 lg:mb-0">
            <div className="absolute -left-4 top-2 w-24 h-24 bg-gray-300 rounded-lg transform -rotate-[6deg] border-white border-4">
              <Image src={gpu} alt="Ads Banner" className="object-cover" />
            </div>
            <div className="absolute left-12 top-2 w-24 h-24 bg-gray-300 rounded-lg transform rotate-[6deg] border-white border-4">
              <Image src={gpu} alt="Ads Banner" className="object-cover" />
            </div>
            <div className="absolute left-6 top-0 w-20 h-28 bg-gray-300 rounded-lg border-white border-4">
              <Image src={gpu} alt="Ads Banner" className="object-cover" />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 text-center lg:text-left pl-0 lg:pl-11">
          <h2 className="lg:text-lg md:text-sm font-bold text-gray-900">
            {card.title}
          </h2>

          <p className="text-gray-600 hidden md:block md:text-xs md:w-56 mx-auto lg:mx-0">
            {card.description}
          </p>

          <div className="mt-2">
            <Link
              href={card.link}
              className="max-lg:mt-0 lg:mt-4 px-4 py-1 bg-custom-gradient text-white rounded-md shadow-md inline-block"
            >
              {card.buttonText}
            </Link>
          </div>
        </div>

        {/* Image Right */}
        {card.imagePosition === "right" && (
          <div className="relative flex-shrink-0 w-32 h-24  mx-4 mt-4 lg:mt-0">
            <div className="absolute -left-4 top-2 w-24 h-24 bg-gray-300 rounded-lg transform -rotate-[6deg] border-white border-4">
              <Image src={gpu} alt="Ads Banner" className="object-cover" />
            </div>
            <div className="absolute left-12 top-2 w-24 h-24 bg-gray-300 rounded-lg transform rotate-[6deg] border-white border-4">
              <Image src={gpu} alt="Ads Banner" className="object-cover" />
            </div>
            <div className="absolute left-6 top-0 w-20 h-28 bg-gray-300 rounded-lg border-white border-4">
              <Image src={gpu} alt="Ads Banner" className="object-cover" />
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default CardComponent;
