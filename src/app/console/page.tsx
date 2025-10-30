"use client";
import PageHeader from "@/components/PageHeader";
import { useSearchParams } from "next/navigation";
import HeroSection from "./HeroSection";
import SearchBar from "@/components/SearchBar";
import { StructuredData } from "@/components/StructuredData";

const page = () => {
  const params = useSearchParams();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const canonical = `${siteUrl}/console`;

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Gaming Consoles | GamerGizmo",
    description:
      "Browse Gaming Consoles at GamerGizmo. Explore consoles, compare prices, and shop now in the UAE.",
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "GamerGizmo", url: siteUrl },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Gaming Consoles", item: canonical },
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
    <div>
      <div className="w-full">
        <StructuredData data={[collectionPage, breadcrumb]} />
        <PageHeader pageName="Consoles" title="Gaming Consoles" />
        <SearchBar categoryId="4"/>
        <HeroSection query={queryObject} />
      </div>
    </div>
  );
};

export default page;
