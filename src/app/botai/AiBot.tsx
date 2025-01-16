"use client";
import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen">
      <div className="relative h-full flex justify-center items-center text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/background.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>

        <div className="relative text-center sm:text-left max-w-4xl px-4 z-10 flex flex-col items-center sm:items-start justify-center h-full">
          <div className="mb-4 sm:mb-6">
            <Image
              src="/images/boticon.png"
              alt="Bot Icon"
              width={80}
              height={80}
              className="sm:w-[120px] sm:h-[120px]"
            />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">
            Welcome Gamer!
          </h1>

          <div className="text-base sm:text-xl md:text-3xl leading-relaxed space-y-3 sm:space-y-4 mb-6 sm:mb-8 ">
            <p>
              I'm Synthio, your gaming companion and GamerGizmo's mindful AI.
            </p>
            <p>
              From top-tier PCs to epic gaming consoles and components, Synthio
              is here to help you find the perfect gear to level up your game.
            </p>
          </div>

          <p className="text-sm sm:text-lg md:text-3xl  mb-4 sm:mb-6 ">
            Let’s get started! What are you looking for today?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 ">
            <button className="bg-transparent border-2 border-white px-4 py-2 rounded-full text-xs sm:text-lg md:text-2xl">
              ...best PCs in UAE
            </button>
            <button className="bg-transparent border-2 border-white px-4 py-2 rounded-full text-xs sm:text-lg md:text-2xl">
              ...Gaming Consoles
            </button>
            <button className="bg-transparent border-2 border-white px-4 py-2 rounded-full text-xs sm:text-lg md:text-2xl">
              ...Upcoming
            </button>
            <button className="bg-transparent border-2 border-white px-4 py-2 rounded-full text-xs sm:text-lg md:text-2xl">
              ...Lorem Ipsum
            </button>
            <button className="bg-transparent border-2 border-white px-4 py-2 rounded-full text-xs sm:text-lg md:text-2xl">
              ...Gaming Consoles
            </button>
            <button className="bg-transparent border-2 border-white px-4 py-2 rounded-full text-xs sm:text-lg md:text-xl">
              ...Lorem Ipsum LoremIpsum
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center sm:justify-start w-full relative">
            <div className="relative md:w-5/6">
              <input
                type="text"
                placeholder="Ask anything..."
                className="bg-transparent border-2 border-white text-white w-full px-4 py-2 sm:py-4 rounded-full text-xs sm:text-lg md:text-2xl placeholder-white focus:outline-none  "
              />
              <Image
                src="/images/Send.png"
                alt="Send Icon"
                width={20}
                height={20}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 md:w-[44px] md:h-[44px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
