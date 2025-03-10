import FeaturesSection from "@/components/FeaturesSection";
import React from "react";
import Download_app from "./Download_app";


const Page = () => {
  const features = [
    {
      icon: "/images/chartline.png",
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

    <>
    <div className="w-full bg-white">
      <FeaturesSection
        features={features}
        title="Manage your PC shop on the go!"
        showButton={true}
        buttonText="Learn More"
        buttonLink="/learn-more"
      />
      <Download_app/>
    </div>
      
      </>
  );
};

export default Page;
