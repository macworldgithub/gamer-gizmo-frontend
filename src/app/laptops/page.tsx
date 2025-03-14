"use client";
import PageHeader from "@/components/PageHeader";
import React from "react";
import LaptopHeroSection from "./LaptopHeroSection";
import { useSearchParams } from "next/navigation";
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
    queryObject[param] = value ? value : ""; // If no value, set to an empty string
  });

  return (
    <div>
      <div className="w-full">
        <PageHeader pageName="Laptops" title="Laptops" />
        <SearchBar  categoryId="1"/>
        <LaptopHeroSection query={queryObject} />
      </div>
    </div>
  );
};

export default page;
