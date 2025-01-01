import FeaturesSection from "@/components/FeaturesSection";
import React from "react";

const page = () => {
  const features = [
    {
      icon: "/images/performance.png",
      title: "Track your overall performance",
      description:
        "Robust listing plans with smart add-ons to turbocharge your PC sales.",
    },
    {
      icon: "/images/database.png",
      title: "View your credit usage",
      description:
        "Connect with UAE's largest online audience with our bespoke advertising solutions.",
    },
    {
      icon: "/images/listings.png",
      title: "See your live listings",
      description:
        "Versatile plans & premium products to boost your gaming leads.",
    },
  ];
  return (
    <div className="w-full bg-white">
      <FeaturesSection
        features={features}
        title="Manage your PC shop on the go!"
        showButton={true}
        buttonText="Learn More"
        buttonLink="/learn-more"
      />
    </div>
  );
};

export default page;
