// app/community-chat/[id]/ClientWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/components/Store/Store";
import Chat from "@/app/community/ChatCompoenent";

export default function ChatClientWrapper({ communityId }: { communityId: string }) {
    const token = useSelector((state: RootState) => state.user.token);
    const [communityData, setCommunityData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const fetchCommunityDetails = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/messages/CommunityChatId=${communityId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCommunityData(data);
            } catch (error) {
                console.error("❌ Failed to fetch community:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommunityDetails();
    }, [token, communityId]);

    if (loading) return <p className="text-center mt-10">Loading community...</p>;

    return <Chat communityId={communityId} communityData={communityData} />;
}
