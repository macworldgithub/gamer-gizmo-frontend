import PageHeader from "@/components/PageHeader";
import React from "react";
import HeroSection from "./HeroSection";

const page = () => {
  return (
    <div className="w-full">
      <PageHeader pageName="Desktops" title="Desktops" />
      <HeroSection />
    </div>
  );
};

export default page;
