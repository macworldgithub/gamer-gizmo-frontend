import React from "react";
import Image from "next/image";
import Wrapper from "@/components/Common/Wrapper/Wrapper"

const features = [
  {
    id: 1,
    title: "FEATURED ADS",
    description:
      "Get up to 4x more views when you feature your ads for 7 days. Recommended for popular cars in high supply.",
  },
  {
    id: 2,
    title: "PROMOTED ADS",
    description:
      "Get up to 12x more views when you promote your ads for 7 days. Recommended for flagship models and halo cars.",
  },
];

const AdFeatures = () => {
  return (

    <Wrapper>
    <div className=" flex flex-col lg:flex-row items-center lg:items-start bg-gray-50 p-4 lg:p-6 dark:bg-black">

      <div className="lg:w-1/2 w-full p-4 mt-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          More views, more leads.
        </h2>
        <div className="space-y-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex items-start space-x-3 lg:space-x-4"
            >
          
              <div className="flex-shrink-0 w-6 h-6 lg:w-6 lg:h-6 dark:bg-black">
                <Image
                  src="/images/Star.png" 
                  alt="Star Icon"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm lg:text-base dark:text-white">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-1/2 w-full flex justify-center items-center mt-6 lg:mt-0 px-4 dark:bg-black bg-white ">
        <Image
          src="/images/Laptop.png" 
          alt="Ad Features"
          width={600} 
          height={400}
          className="w-full h-auto max-w-md lg:max-w-lg "
        />
      </div>
    </div>
    </Wrapper>
  );
};

export default AdFeatures;
