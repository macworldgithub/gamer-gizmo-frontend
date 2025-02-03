import PageHeader from "@/components/PageHeader";
import React from "react";
import LaptopHeroSection from "./LaptopHeroSection";

const page = () => {
  return (
    <div>
      <div className="w-full">
        <PageHeader pageName="Laptops" title="Laptops" />
        <LaptopHeroSection />
      </div>
    </div>
  );
};

export default page;
