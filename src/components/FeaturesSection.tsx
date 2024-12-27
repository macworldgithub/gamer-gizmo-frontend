import React from "react";

interface Feature {
  icon: React.ReactNode; // Icon can be a React component or any JSX
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  title: string;
  showButton?: boolean; // Optional prop for showing the button
  buttonText?: string;
  buttonLink?: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features,
  title,
  showButton = false, // Default value is false
  buttonText = "Learn More", // Default button text
  buttonLink = "#", // Default button link
}) => {
  return (
    <section className="bg-white py-10 px-5">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Title */}
        <h1 className="text-3xl font-bold mb-8">{title}</h1>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg shadow-lg"
            >
              {/* Feature Icon */}
              <div className="text-purple-500 text-4xl mb-4">
                {feature.icon}
              </div>
              {/* Feature Title */}
              <h2 className="text-lg font-semibold mb-2">{feature.title}</h2>
              {/* Feature Description */}
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Optional Button */}
        {showButton && (
          <div className="mt-8">
            <a
              href={buttonLink}
              className="px-6 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition"
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
