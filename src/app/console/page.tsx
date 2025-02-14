"use client";
import PageHeader from "@/components/PageHeader";
import { useSearchParams } from "next/navigation";
import HeroSection from "./HeroSection";

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
    <div>
      <div className="w-full">
        <PageHeader pageName="Consoles" title="consoles" />
        <HeroSection query={queryObject} />
      </div>
    </div>
  );
};

export default page;
