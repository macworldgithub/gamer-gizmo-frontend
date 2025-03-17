import React from "react";
import DownloadApp from "../advertising/sellersvisibility/Download_app";
import StatsCards from "../advertising/StatsCards";
import ServiceCards from "../advertiser/card";
import FeaturesSection from "@/components/FeaturesSection";
import BuisnessInquiries from "@/components/BuisnessInquiries";
import Card from "./card";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const cardContent = {
    title: "Not on GamerGizmo yet?",
    description:
      "Talk to us. We’ll show you how we can add value to your marketing ecosystem. There’s a reason hundreds of dealers in the UAE already trust us.",
    note: "",
  };

  const features = [
    {
      icon: "/images/Chartline.png",
      title: "Highly Target Audience",
      description: "Market directly to gamers & tech buyers",
    },
    {
      icon: "/images/database.png",
      title: "Maximum Visibility",
      description: "Get featured on high-traffic pages .",
    },
    {
      icon: "/images/listings.png",
      title: "Affordable and Effective",
      description: "Choose from budget-friendly ad packages",
    },
  ];

  return (
    <div>
      <FeaturesSection
        features={features}
        title="Manage your PC shop on the go!"
        //  showButton={false}
      />
      <Card />
      <div className="container mx-auto px-8 lg:px-1 my-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          <div className="flex flex-col gap-4 lg:gap-6 lg:pr-12 lg:pl-8 lg:py-6">
            <h2 className="text-xl md:text-2xl font-bold">How it works</h2>

            <p className="text-gray-600 dark:text-white ">
              1- Select your Ad package - Choose from flexible plans
              <br />
              2- Submit your Ad - Upload your banner & product details
              <br />
              3- Get Approved & Go Live! - Ads reviewed & published within 24
              hours
            </p>
          </div>
          <div className="flex justify-center lg:pr-16">
            <Image
              src="/images/Laptop.png"
              alt="Showroom branding preview"
              className="w-full max-w-sm rounded-lg shadow-lg"
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>

      <div className=" text-center">
        <h2 className="md:text-3xl max-md:text-lg font-semibold text-gray-800 mb-3 ">
          Ready to reach thousand of gamers?
        </h2>

        <div className="flex justify-center items-center gap-4 mb-6">
          <Link href="/publish-ad">
            <button className="bg-custom-gradient max-md:w-64 hover:bg-none hover:text-black hover:outline-dashed md:w-80 rounded-md max-md:text-sm md:text-base p-1  text-white">
              Start Advertising Now
            </button>
          </Link>
        </div>
      </div>

      {/* <DownloadApp /> */}
      <BuisnessInquiries cardContent={cardContent} />
    </div>
  );
};

export default page;
