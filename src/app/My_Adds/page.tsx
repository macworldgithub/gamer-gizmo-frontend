"use client";
import { useState } from "react";
import NoAds from "./NoAds";
import AdList from "./AdList";

export default function Add() {
  const [ads, setAds] = useState([
    {
      id: 2,
      title: "AMD Radeon RX 580 GTS XXX Edition Graphics Card, S Version, 8GB DDR5 256 Bit Memory, Dual Bios, 2304 Stream Processor, 1386MHz OC+, PCI-E, HDMI, DisplayPort | RX-580S85DD6",
      status: "Active",
      price: "551.00",
      views: 10,
      calls: 5,
      chats: 3,
      likes: 8,
      image: "/images/gpu.png",
    },
    {
      id: 2,
      title: "AMD Radeon RX 580 GTS XXX Edition Graphics Card, S Version, 8GB DDR5 256 Bit Memory, Dual Bios, 2304 Stream Processor, 1386MHz OC+, PCI-E, HDMI, DisplayPort | RX-580S85DD6",
      status: "Not Posted",
      price: "551.00",
      views: 10,
      calls: 5,
      chats: 3,
      likes: 8,
      image: "/images/gpu.png",
    }
    
  ]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 max-lg:mx-4">My Ads</h2>
        {ads.length === 0 ? <NoAds /> : <AdList ads={ads} />}
      </div>
    </div>
  );
}
