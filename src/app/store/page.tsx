"use client";
import PageHeader from "@/components/PageHeader";
import ProductContainer from "./ProductContainer";
import { StructuredData } from "@/components/StructuredData";

const page = () => {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const canonical = `${siteUrl}/store`;

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GamerGizmo Store",
    description:
      "Browse categories and products at GamerGizmo Store. Explore gaming PCs, laptops, consoles, and components in the UAE.",
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "GamerGizmo", url: siteUrl },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Store", item: canonical },
    ],
  };
  return (
    <div className="dark:bg-secondaryBlack">
      <div className="">
        <StructuredData data={[collectionPage, breadcrumb]} />
        <PageHeader pageName="Store" title="GamerGizmo Store" />
      </div>
      <div>
        <ProductContainer />
      </div>
    </div>
  );
};

export default page;
