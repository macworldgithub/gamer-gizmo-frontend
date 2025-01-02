import Image from "next/image";
import React from "react";
const features = [
  {
    id: 1,
    title: "USE MONTHLY CREDITS",
    description:
      "Take actions related to your business such as adding new listings, refreshing listings, featuring and promoting existing listings.",
  },
  {
    id: 2,
    title: "VIEW PERFORMANCE",
    description:
      "Get an instant view of your account's overall performance or that of a particular listing, and make informed decisions accordingly.",
  },
  {
    id: 3,
    title: "SEE AND MANAGE LISTINGS",
    description:
      "Browse your inventory of live listings and take actions like editing prices or deleting listings for cars that already sold.",
  },
];

export default function Home() {
  return (
    
    <div className=" bg-gray-50 px-4 flex flex-col items-center dark:bg-secondaryBlack py-12">
      <h1 className="text-xl md:text-3xl font-bold text-gray-800 text-center mb-10 dark:text-white">
        Manage your online car showroom <br className="hidden md:block" />
        anytime, anywhere
      </h1>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`flex items-start space-x-4 ${index === 3 ? "md:col-span-2" : ""
              }`}
          >
            <Image
              src="/images/Star.png"
              alt="Star"
              width={24}
              height={24}
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {feature.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed dark:text-white">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}
