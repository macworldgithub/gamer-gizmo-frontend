"use client";
import React from "react";
import Image from "next/image";
import Wrapper from "@/components/Common/Wrapper/Wrapper";

const ExclusiveCards = () => {
  const services = [
    {
      icon: "/images/context.png",
      title: "Contextual Targeting",
      description:
        "Connect within in-market consumers within specific categories",
    },
    {
      icon: "/images/audience.png",
      title: "Audience Targeting",
      description:
        "Target 120+ first party audience segments with high relevancy and intent to buy",
    },
    {
      icon: "/images/geo.png",
      title: "Geo Targeting",
      description: "Localize by emirates or go hyper local to the neighborhood",
    },
    {
      icon: "/images/platform.png",
      title: "Platform Targeting",
      description: "Reach any user, anywhere, anytime, on any device",
    },
    {
      icon: "/images/keyword.png",
      title: "Keyword Targeting",
      description: "Target users searching by specific keywords",
    },
  ];

  return (
    <Wrapper>
      <div className="w-full py-10 dark:bg-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center rounded-lg w-full max-w-sm mx-auto"
            >
              <Image
                src={service.icon}
                className="text-4xl mb-4 dark:invert"
                width={100}
                height={100}
                alt={service.title}
              />
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                {service.title}
              </h3>
              <p className="text-gray-500 text-base mb-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 justify-center">
          {services.slice(3).map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center rounded-lg w-full max-w-sm mx-auto"
            >
              <Image
                src={service.icon}
                className="text-4xl mb-4 dark:invert"
                width={100}
                height={100}
                alt={service.title}
              />
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                {service.title}
              </h3>
              <p className="text-gray-500 text-base mb-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default ExclusiveCards;
