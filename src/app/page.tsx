"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import BrowseVideos from "@/components/BrowseVideos";
import CategoriesComponent from "@/components/CategoriesComponent";
import FilterSection from "@/components/FilterSection";
import LiveCommunity from "@/components/LiveCommunity";
import MobileCategories from "@/components/MobileCategories";
import PopularMainSection from "@/components/PopularMainSection";

export default function HomePage() {
  useEffect(() => {
    console.log("useEffect triggered");
    if (typeof window !== "undefined") {
      toast.dismiss(); // Dismiss any existing toasts before showing a new one
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
      <FilterSection  />
      <CategoriesComponent />
      <PopularMainSection />
      <BrowseVideos />
    </div>
  );
}
