"use client";
import PageHeader from "@/components/PageHeader";
import React from "react";
import LaptopHeroSection from "./LaptopHeroSection";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { StructuredData } from "@/components/StructuredData";

const page = () => {
  const params = useSearchParams();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const canonical = `${siteUrl}/laptops`;

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Laptops | GamerGizmo",
    description:
      "Browse Laptops at GamerGizmo. Explore gaming laptops, compare prices, and shop now in the UAE.",
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "GamerGizmo", url: siteUrl },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Laptops", item: canonical },
    ],
  };

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
      <StructuredData data={[collectionPage, breadcrumb]} />
      <div className="w-full">
        <PageHeader pageName="Laptops" title="Laptops" />
        <SearchBar  categoryId="1"/>
        <LaptopHeroSection query={queryObject} />
      </div>
    </div>
  );
};

export default page;
