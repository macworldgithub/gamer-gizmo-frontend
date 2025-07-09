"use client";
import { useEffect, useState } from "react";
import ChatBox from "./chatBox";
import axios from "axios";
import { RootState } from "@/components/Store/Store";
import { useSelector } from "react-redux";
import TopChats from "./TopChats";
type CommunityType = {
  name: string;
  description?: string;
};
export default function Chat({
  communityId,
  fallbackName,
}: {
  communityId?: string;
  communityData?: { name: string; description?: string } | null;
  fallbackName?: string;
}) {
  const [communityData, setCommunityData] = useState<CommunityType | null>(
    null
  );
  const token = useSelector((state: RootState) => state?.user?.token);
  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/${communityId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCommunityData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch community", err);
      }
    };

    fetchCommunityData();
  }, [communityId]);
  return (
    <div className="w-full flex gap-6 max-md:flex-col  dark:bg-black">
      <div className="bg-custom-gradient text-white min-h-screen flex flex-col items-center w-[60%] ml-10 p-6 max-md:w-[80%]">
        <h2 className="text-3xl font-bold  text-neon-green">
          {/* {communityData?.name ? `🎮 ${communityData.name} Community` : '🎮 Community Chat'} */}
          {communityData?.name || fallbackName
            ? `🎮 ${communityData?.name || fallbackName} `
            : "🎮 Community Chat"}
        </h2>
        {/* ✅ Description added below the name */}
        {communityData?.description && (
          <p className="text-sm text-gray-200 text-center max-w-xl mb-4">
            {communityData.description}
          </p>
        )}
        <ChatBox communityChatId={communityId} />
      </div>
      <div className="w-[30%] ">
        <TopChats token={token} limit={10} />
      </div>
    </div>
  );
}
