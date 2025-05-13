"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LiveAdSection from "@/components/LiveAd";
import CardComponent from "@/components/CardComponent";

const ConditionalLiveAds = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/fetch?page=Home`
        );
        setAds(response.data || []);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const hasAd2 = ads.some((ad) => ad?.ad_id === 2);
  const hasAd3 = ads.some((ad) => ad?.ad_id === 3);

  if (loading) return <p className="text-center">Loading ads...</p>;

  return (
    <div className="w-full flex  mt-[3rem]   mx-auto mb-2">
      {/* Left Side */}
      {hasAd2 ? (
        <LiveAdSection
          category="Home"
          adId={2}
          className="md:w-[80%] max-md:w-[45%] md:h-52 max-md:h-40"
        />
      ) : (
        <CardComponent
          position="left"
          className="md:w-[50%] max-sm:w-[18rem] max-sm:mx-auto max-md:w-[100%] max-md:h-60 md:h-60 lg:h-52"
        />
      )}

      {/* Right Side */}
      {hasAd3 ? (
        <LiveAdSection
          category="Home"
          adId={3}
          className="md:w-[80%] max-md:w-[45%] mr-5 md:h-52 max-md:h-40"
        />
      ) : (
        <CardComponent
          position="right"
          className="md:w-[50%] max-sm:hidden max-md:w-[100%] max-lg:h-72  max-md:h-60 md:h-60 lg:h-52"
        />
      )}
    </div>
  );
};

export default ConditionalLiveAds;
