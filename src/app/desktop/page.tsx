"use client";
import PageHeader from "@/components/PageHeader";
import React from "react";
import HeroSection from "./HeroSection";
import { useSearchParams } from "next/navigation";
import FilterSection from "@/components/FilterSection";
import SearchBar from "@/components/SearchBar";
const page = () => {
  const params = useSearchParams();

  // Define an object with the possible query parameters
  const queryParams = [
    "processor",
    "storage",
    "location",
    "condition",
    "gpu",
    "ram",
    "price",
  ];

  // Initialize an object to store the parameters
  const queryObject = {};

  // Loop through the queryParams array and extract each one from URL search params
  queryParams.forEach((param) => {
    const value = params.get(param);
    // @ts-expect-error
    queryObject[param] = value ? value : "";
  });

  return (
    <div className="w-full">
      <PageHeader pageName="Desktops" title="Gaming PCs" />
      <SearchBar categoryId="2"/>
      <HeroSection query={queryObject} />
    </div>
  );
};

export default page;
