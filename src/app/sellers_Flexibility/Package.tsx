import React from "react";
import Image from "next/image";
const features = [
  {
    id: 1,
    title: "MONTHLY CREDITS",
    description:
      "Design your monthly package and use your credits as you need throughout the month.",
  },
  {
    id: 2,
    title: "NUMBER OF PCS",
    description:
      "We help dealers achieve their sales targets, whether they sold 10 or 500 cars per month.",
  },
  {
    id: 3,
    title: "SPEED OF SELLING",
    description:
      "No matter how fast your sales turnover is, we can design the right package that matches your sales targets.",
  },
  {
    id: 4,
    title: "LEVEL OF EXPOSURE",
    description:
      "Not all cars enjoy the same demand intensity from buyers so you can opt for other ways to capture more eyes.",
  },
];

const LeftRightContent = () => {
  return (

    <div className="min-h-screen flex flex-col lg:flex-row items-center lg:items-start bg-[#F4F2FE] dark:bg-secondaryBlack p-6 overflow-hidden">

      <div className="lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0 pt-12 dark:text-white">
        <Image
          src="/images/menfeatures.png"
          alt="menFeatures"
          width={400}
          height={400}
          className="w-full h-auto max-w-md lg:max-w-lg dark:invert"
        />
      </div>

      <div className="lg:w-1/2 max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Match your package to your needs & stay in control.
        </h2>
        <div className="space-y-6">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-start space-x-4 ">

              <div className="flex-shrink-0 w-6 h-6 lg:w-6 lg:h-6">
                <Image
                  src="/images/Star.png"
                  alt="Star"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-white">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftRightContent;
