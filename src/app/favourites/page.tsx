"use client";
import React, { useLayoutEffect } from "react";
import FavoritesPage from "./FavoritesPage";
import MainPage from "./MainPage";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import { RootState } from "@/components/Store/Store";
import { useSelector } from "react-redux";
import { StructuredData } from "@/components/StructuredData";

import { redirect } from "next/navigation";
const page = () => {
  const token = useSelector((state: RootState) => state.user.token);

  useLayoutEffect(() => {
    if (!token) {
      return redirect("/auth/login");
    }
  }, []);
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const canonical = `${siteUrl}/favourites`;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Favourites | GamerGizmo",
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "GamerGizmo", url: siteUrl },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Favourites", item: canonical },
    ],
  };

  return (
    <div className="flex w-[100%]  min-h-screen dark:bg-black">
      <StructuredData data={[webPage, breadcrumb]} />
      {/* <div className="lg:w-[40rem] xl:w-[35rem] max-lg:hidden max-lg:w-0">
        <FavoritesPage />
      </div> */}
      <div className="w-full">
        <MainPage />
      </div>
    </div>
  );    
};

export default page;
