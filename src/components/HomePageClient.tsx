"use client";

import BrowseVideos from "@/components/BrowseVideos";
import CategoriesComponent from "@/components/CategoriesComponent";
import FilterSection from "@/components/FilterSection";
import LiveCommunity from "@/components/LiveCommunity";
import MobileCategories from "@/components/MobileCategories";
import PopularMainSection from "@/components/PopularMainSection";
import { useSelector } from "react-redux";
import { RootState } from "@/components/Store/Store";
import CardComponent from "@/components/CardComponent";
import AdsBanner from "@/components/AdsBanner";
import LiveAdSection from "@/components/LiveAd";
import ConditionalLiveAds from "@/components/conditionalLiveAds";

export default function HomePageClient() {
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.id);


  return (
    <div className="overflow-x-hidden dark:bg-[#0D0D12]">
      <MobileCategories />
      <FilterSection />
      <div className="bg-[#F4F2FE] flex justify-center dark:bg-secondaryBlack pt-4">
        <LiveAdSection
          category="Home"
          adId={1}
          className="md:w-1/2 max-md:w-[80%]  md:h-52  max-md:h-40 mx-auto"
        />
      </div>
      <CategoriesComponent />
      <div className="mt-8">
        <ConditionalLiveAds />
      </div>
      <PopularMainSection />
      <BrowseVideos />
    </div>
  );
}
