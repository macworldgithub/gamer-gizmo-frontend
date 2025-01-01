"use client";

import BrowseVideos from "@/components/BrowseVideos";
import CategoriesComponent from "@/components/CategoriesComponent";
import FilterSection from "@/components/FilterSection";
import LiveCommunity from "@/components/LiveCommunity";
import PopularMainSection from "@/components/PopularMainSection";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden dark:bg-[#0D0D12]">
      <FilterSection />
      <CategoriesComponent />
      <PopularMainSection />
      <LiveCommunity />
      <BrowseVideos />
    </div>
  );
}
