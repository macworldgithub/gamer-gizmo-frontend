"use client";
import PageHeader from "@/components/PageHeader";
import React from "react";
import HeroSection from "./HeroSection";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { StructuredData } from "@/components/StructuredData";
const Components = () => {
  const params = useSearchParams();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const canonical = `${siteUrl}/components`;

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Components and Accessories | GamerGizmo",
    description:
      "Browse Components and Accessories at GamerGizmo. Explore parts, peripherals, compare prices, and shop now in the UAE.",
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "GamerGizmo", url: siteUrl },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Components and Accessories", item: canonical },
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
    queryObject[param] = value ? value : "";
  });

  return (
    <div className="w-full">
      <StructuredData data={[collectionPage, breadcrumb]} />
      <PageHeader
        pageName="Components and Accessories"
        title="Components and Accessories"
      />
      <SearchBar categoryId="3" />
      <HeroSection query={queryObject} />
    </div>
  );
};

export default Components;
