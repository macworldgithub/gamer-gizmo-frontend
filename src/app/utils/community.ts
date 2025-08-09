
"use client";
import { RootState } from "@/components/Store/Store";
import axios from "axios";
import { useSelector } from "react-redux";

export async function fetchCommunityDetails(communityId: string) {
  console.log(communityId, "communityId in fetchCommunityDetails");

  // Retrieve token (adjust if you store it elsewhere)
  const token = useSelector((state: RootState) => state.user.token);
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/messages/CommunityChatId=${communityId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Axios unwraps JSON for you
  } catch (err: any) {
    console.error("Failed to fetch community details:", err);
    throw new Error(
      err.response?.data?.message || "Failed to fetch community details"
    );
  }
}
