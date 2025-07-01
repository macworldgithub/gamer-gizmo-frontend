// // app/community-chat/[id]/ClientWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/components/Store/Store";
import Chat from "@/app/community/ChatCompoenent";
import { useSearchParams } from "next/navigation";

// export default function ChatClientWrapper({ communityId }: { communityId: string }) {
//     const token = useSelector((state: RootState) => state.user.token);
//     const [communityData, setCommunityData] = useState<any>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!token) return;

//         const fetchCommunityDetails = async () => {
//             try {
//                 const { data } = await axios.get(
//                     `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/messages/CommunityChatId=${communityId}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );
//                 console.log(data, "Community data fetched successfully");
//                 setCommunityData(data);
//             } catch (error) {
//                 console.error("❌ Failed to fetch community:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCommunityDetails();
//     }, [token, communityId]);

//     if (loading) return <p className="text-center mt-10">Loading community...</p>;

//     return <Chat communityId={communityId} communityData={communityData} />;
// }
export default function ChatClientWrapper({ communityId }: { communityId: string }) {
    const searchParams = useSearchParams();
    const communityName = searchParams.get("name");
    const token = useSelector((state: RootState) => state.user.token);
    const [communityData, setCommunityData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const fetchCommunityDetails = async () => {
            try {
                // Correct endpoint to fetch community details
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/messages/${communityId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCommunityData(data.data); // Assuming your API returns { data: { ...communityData } }
            } catch (error) {
                console.error("❌ Failed to fetch community:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommunityDetails();
    }, [token, communityId]);

    if (loading) return <p className="text-center mt-10">Loading community...</p>;
    //@ts-ignore
    return <Chat communityId={communityId} communityData={communityData} fallbackName={communityName} />;
}