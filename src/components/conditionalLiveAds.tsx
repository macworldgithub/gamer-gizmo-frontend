"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LiveAdSection from "@/components/LiveAd";
import CardComponent from "@/components/CardComponent";
import Wrapper from "./Common/Wrapper/Wrapper";

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
    <Wrapper>
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 px-4 mt-10">
        {/* Left Card or Ad */}
        {hasAd2 ? (
          <LiveAdSection
            category="Home"
            adId={2}
            className="w-full lg:w-[45%] h-[240px]"
          />
        ) : (
          <CardComponent
            position="left"
            className="w-full lg:w-[45%] h-[240px]"
          />
        )}

        {/* Right Card or Ad */}
        {hasAd3 ? (
          <LiveAdSection
            category="Home"
            adId={3}
            className="w-full lg:w-[45%] h-[240px]"
          />
        ) : (
          <CardComponent
            position="right"
            className="w-full lg:w-[45%] h-[240px]"
          />
        )}
      </div>
    </Wrapper>
  );

};

export default ConditionalLiveAds;