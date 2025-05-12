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

  if (hasAd2 && hasAd3) {
    return (
      <div className="w-full  flex max-md:gap-2 md:gap-6 mt-[3rem] max-w-5xl max-lg:ml-4 mx-auto mb-2">
        <LiveAdSection
          category="Home"
          adId={2}
          className="md:w-1/2 max-md:w-[45%] md:h-52 max-md:h-40"
        />
        <LiveAdSection
          category="Home"
          adId={3}
          className="md:w-1/2 max-md:w-[45%] mr-5 md:h-52 max-md:h-40"
        />
      </div>
    );
  } else {
    return <CardComponent />;
  }
};

export default ConditionalLiveAds;
