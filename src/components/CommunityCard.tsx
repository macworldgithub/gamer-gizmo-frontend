"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import { FaRegUserCircle } from "react-icons/fa";

interface Reaction {
  id: number;
  emoji_type: string;
  user_id: number;
  username: string;
  created_at: string;
}

interface User {
  username: string;
  profile_picture: string | null;
}

interface Message {
  id: number;
  content: string;
  is_admin: boolean;
  sender_id: number;
  admin_id: number | null;
  created_at: string;
  users: User;
  reactions: Reaction[];
  reaction_counts: Record<string, number>;
  total_reactions: number;
}

const Community = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!token) {
          throw new Error("Token not found in Redux state");
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/top-reacted`;
        console.log("Making request to:", apiUrl);

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Full response:", response);
        console.log("Response data:", response.data);

        // Handle different possible response structures
        let messagesData: Message[] = [];

        if (Array.isArray(response.data)) {
          messagesData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          messagesData = response.data.data;
        } else if (response.data && Array.isArray(response.data.messages)) {
          messagesData = response.data.messages;
        } else {
          console.error("Unexpected response format:", response.data);
          throw new Error(
            `Invalid response format. Expected array but got: ${typeof response.data}`
          );
        }

        if (messagesData.length === 0) {
          console.warn("Received empty messages array");
        }

        setMessages(messagesData);
      } catch (error: any) {
        console.error("Failed to fetch community messages:", error);
        setError(
          error.message ||
          "Failed to fetch messages. Please try again later."
        );
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-md:gap-2 md:gap-4 p-2">
        <div className="border border-purple-300 rounded-lg max-md:p-1 p-2 overflow-hidden shadow-sm dark:bg-black bg-white">
          <p className="text-center">Loading community messages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 p-4">
        <div className="border border-red-300 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
          <p className="text-center text-red-500 dark:text-red-300">
            Error: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="grid grid-cols-1 p-4">
        <div className="border border-purple-300 rounded-lg p-4 dark:bg-zinc-800 bg-white">
          <p className="text-center">No community messages found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {messages.map((msg) => {
        const profilePicture = msg.users?.profile_picture;
        return (
          <div
            key={msg.id}
            className="border border-purple-300 rounded-lg p-4 overflow-hidden shadow-md dark:bg-zinc-800 bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                {profilePicture ? (
                  <Image
                    src={profilePicture}
                    width={40}
                    height={40}
                    alt="profile-pic"
                    className="rounded-full object-cover"
                    unoptimized={profilePicture?.startsWith("blob:")}
                  />
                ) : (
                  <FaRegUserCircle className="text-4xl text-gray-400 dark:text-gray-500" />
                )}
              </div>
              <div>
                <p className="font-semibold dark:text-white text-black text-base">
                  {msg.users.username}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(msg.created_at), "hh:mm a, MMM dd")}
                </p>
              </div>
            </div>
            <h3 className="mt-4 text-black text-sm text-start dark:text-white line-clamp-3">
              {msg.content}
            </h3>

            {msg.total_reactions > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {Object.entries(msg.reaction_counts).map(([emoji, count]) => (
                  <span
                    key={emoji}
                    className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                  >
                    {emoji} × {count}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Community;