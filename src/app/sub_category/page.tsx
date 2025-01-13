"use client";

import BrowseVideos from "@/components/BrowseVideos";
import PopularMainSection from "@/components/PopularMainSection";
import GamingCategories from "./Categories";
import SellSection from "./post_your_adds";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden dark:bg-[#0D0D12]">
   <GamingCategories/>
   <SellSection/>
      <PopularMainSection />
    
      <BrowseVideos />
    </div>
  );
}
