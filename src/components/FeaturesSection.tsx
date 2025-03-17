import Image from "next/image";
import Link from "next/link";
import React from "react";
import Wrapper from "./Common/Wrapper/Wrapper";

interface Feature {
  icon: string;
  title?: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  title: string;
  showButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features,
  title,
  showButton = false,
  buttonText = "Learn More",
  buttonLink = "#",
}) => {
  return (
    <Wrapper>
      <section className="bg-white py-6 px-5 w-full mb-4">
        {/* <div className="max-w-7xl mx-auto text-center"> */}
        {/* Section Title */}
        {/* <h1 className="text-3xl font-bold mb-8">{title}</h1> */}
        {title && (
          <div className="text-center mb-4">
            <h1 className="max-md:text-lg md:text-3xl font-bold">{title}</h1>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-3 rounded-lg "
            >
              {/* Feature Icon */}
              <Image
                src={feature.icon}
                alt={feature.title || "Feature Icon"}
                width={64}
                height={64}
              />
              {/* Feature Title */}
              {feature.title && (
                <h2 className="text-lg max-md:text-sm font-semibold mb-1">
                  {feature.title}
                </h2>
              )}
              {/* Feature Description */}
              <p className="text-gray-600 max-md:text-xs max-md:w-36 md:w-56">
                {feature.description}
              </p>
              {showButton && (
                <div className="mt-8 w-[11rem] h-[3rem] bg-custom-gradient  rounded-lg text-center flex justify-center items-center">
                  <Link href={buttonLink} passHref>
                    {/* <a className="px-6 py-2 text-white bg-custom-gradient hover:bg-purple-600 transition rounded-lg"> */}
                    {buttonText}
                    {/* </a> */}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Optional Button */}
        {/* </div> */}
      </section>
    </Wrapper>
  );
};

export default FeaturesSection;
