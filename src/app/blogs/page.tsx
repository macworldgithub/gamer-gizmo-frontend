import React from "react";
import type { Metadata } from "next";
import UsBlogs from "./UsBlogs";
import PageHeader from "@/components/PageHeader";

import ItemCard from "./ItemCard";
import LiveAdSection from "@/components/LiveAd";
import GetStartedBadge from "@/components/GetStartedBadge";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Blogs | GamerGizmo",
  description:
    "Explore the latest gaming news, reviews, and guides from GamerGizmo.",
  alternates: { canonical: "/blogs" },
  robots: { index: true, follow: true },
};

const page = () => {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const canonical = `${siteUrl}/blogs`;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "GamerGizmo Blogs",
    description:
      "Explore the latest gaming news, reviews, and guides from GamerGizmo.",
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: "Gamer Gizmo",
      url: siteUrl,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Blogs", item: canonical },
    ],
  };
  return (
    <div className="w-full bg-white dark:bg-black">
      <StructuredData data={[blogSchema, breadcrumb]} />
      <PageHeader pageName={"Blogs"} title="Blogs" />
      <Wrapper className="flex w-full mt-4 gap-3">
        <LiveAdSection
          category="Blogs"
          //@ts-ignore
          adId={1}
          className="w-1/2 md:h-52 max-md:h-40"
        />
        <LiveAdSection
          category="Blogs"
          //@ts-ignore
          adId={2}
          className="w-1/2 md:h-52 max-md:h-40 "
        />
      </Wrapper>

      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        {/* Left Section (UsBlogs) */}
        <div className="w-full md:w-2/3">
          <UsBlogs />
        </div>

        {/* Right Section (ItemCard) */}
        <div className="w-full md:w-1/3 sm:mt-0 max-sm:mt-4 md:mt-5">
          <ItemCard />
        </div>
      </div>
      <Wrapper className="flex w-full mt-4 gap-3">
        <LiveAdSection
          category="Blogs"
          adId={3}
          className="w-1/2 md:h-52 max-md:h-40 "
        />
        <LiveAdSection
          category="Blogs"
          adId={4}
          className="w-1/2 md:h-52 max-md:h-40"
        />
      </Wrapper>
      <div className="mt-12 flex w-full justify-center">
        <GetStartedBadge />
      </div>
    </div>
  );
};

export default page;
