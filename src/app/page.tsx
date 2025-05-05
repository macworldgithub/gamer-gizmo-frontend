"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
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

export default function HomePage() {
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    console.log("useEffect triggered");
    if (typeof window !== "undefined") {
      toast.dismiss();
      toast.info(
        "🚧 Our website is online, but some features are still under development. Stay tuned for updates! 🚀",
        {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          progressClassName: "",
          className: "custom-toast-info",
        }
      );
    }
  }, []);

  return (
    <div className="overflow-x-hidden dark:bg-[#0D0D12]">
      <MobileCategories />
      <FilterSection />
      <div className="bg-[#F4F2FE] flex justify-center  dark:bg-secondaryBlack pt-4">
        {/* <AdsBanner/> */}
        <LiveAdSection
          category="Home"
          adId={1}
          className="md:w-1/2 max-md:w-[45%]  md:h-52 max-md:h-40 mx-auto"
        />
      </div>
      <CategoriesComponent />
      {/* <CardComponent /> */}
      <div className="mt-8">
        <ConditionalLiveAds />
      </div>
      <PopularMainSection />
      <BrowseVideos />
    </div>
  );
}
