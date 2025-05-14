import React from "react";
import Wrapper from "./Common/Wrapper/Wrapper";
import Image from "next/image";
import gpu from "../../public/images/consoles.webp";
import Link from "next/link";

interface CardComponentProps {
  position: "left" | "right";
  className?: string;
}

const cardData = {
  left: {
    title: "Boost your brand visibility",
    description: "Advertise with GamerGizmo today!",
    buttonText: "Explore Now",
    link: "/advertisement",
  },
  right: {
    title: "Boost your brand visibility",
    description: "Advertise with GamerGizmo today!",
    buttonText: "Explore Now",
    link: "/advertisement",
  },
};

const CardComponent: React.FC<CardComponentProps> = ({
  position,
  className,
}) => {
  const card = cardData[position];

  return (
    <div
      className={`bg-[#e8e3fc] flex flex-col items-center justify-center  rounded-md shadow-md ${className}`}
    >
      {/* Image Stack */}
      <div className="relative w-32 h-28 mb-4">
        {/* Left-rotated */}
        <div className="absolute -left-6 top-2 w-24 h-24 bg-gray-300 rounded-lg transform -rotate-[6deg] border-white border-4">
          <Image
            src={gpu}
            alt="Ad Image"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        {/* Right-rotated */}
        <div className="absolute left-12 top-2 w-24 h-24 bg-gray-300 rounded-lg transform rotate-[6deg] border-white border-4">
          <Image
            src={gpu}
            alt="Ad Image"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        {/* Center */}
        <div className="absolute left-6 top-0 w-20 h-28 bg-gray-300 rounded-lg border-white border-4 z-10">
          <Image
            src={gpu}
            alt="Ad Image"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>

      {/* Text */}
      <div className="text-center">
        <h2 className="text-base md:text-lg font-bold  text-gray-900">
          {card.title}
        </h2>
        <p className="text-gray-600 text-xs md:text-sm mt-1 mb-3 md:mb-4">
          {card.description}
        </p>

        <Link
          href={card.link}
          className="px-4 py-1 bg-custom-gradient text-white rounded-md shadow-md text-sm"
        >
          {card.buttonText}
        </Link>
      </div>
    </div>
  );
};

export default CardComponent;
