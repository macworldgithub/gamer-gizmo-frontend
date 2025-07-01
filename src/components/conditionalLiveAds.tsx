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
    <div className={`bg-[#e8e3fc] p-4 rounded-lg shadow-md flex flex-col lg:flex-row items-center justify-between gap-2 ${className}`}>
      {/* Image Left */}
      {card.imagePosition === "left" && (
        <div className="relative flex-shrink-0 w-24 h-24">
          <div className="absolute -left-4 top-2 w-20 h-20 bg-gray-300 rounded-lg transform -rotate-[6deg] border-4 border-white">
            <Image src={gpu} alt="Ads Banner" className="object-cover" />
          </div>
          <div className="absolute left-10 top-2 w-20 h-20 bg-gray-300 rounded-lg transform rotate-[6deg] border-4 border-white">
            <Image src={gpu} alt="Ads Banner" className="object-cover" />
          </div>
          <div className="absolute left-4 top-0 w-16 h-24 bg-gray-300 rounded-lg border-4 border-white">
            <Image src={gpu} alt="Ads Banner" className="object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="text-center lg:text-left flex-1 px-2">
        <h2 className="text-lg font-bold text-gray-900">{card.title}</h2>
        <p className="text-gray-600 mt-1 text-sm">
          {card.description}
        </p>
        <div className="mt-3 flex justify-center lg:justify-start">
          <Link
            href={card.link}
            className="px-4 py-2 bg-custom-gradient text-white rounded-md shadow-md hover:scale-105 transition-all text-sm"
          >
            {card.buttonText}
          </Link>
        </div>
      </div>

      {/* Image Right */}
      {card.imagePosition === "right" && (
        <div className="relative flex-shrink-0 w-24 h-24">
          <div className="absolute -left-4 top-2 w-20 h-20 bg-gray-300 rounded-lg transform -rotate-[6deg] border-4 border-white">
            <Image src={gpu} alt="Ads Banner" className="object-cover" />
          </div>
          <div className="absolute left-10 top-2 w-20 h-20 bg-gray-300 rounded-lg transform rotate-[6deg] border-4 border-white">
            <Image src={gpu} alt="Ads Banner" className="object-cover" />
          </div>
          <div className="absolute left-4 top-0 w-16 h-24 bg-gray-300 rounded-lg border-4 border-white">
            <Image src={gpu} alt="Ads Banner" className="object-cover" />
          </div>
        </div>
      )}
    </div>
  );

};

export default ConditionalLiveAds;
