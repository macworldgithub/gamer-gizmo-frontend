"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import { FaRegUserCircle } from "react-icons/fa";

const Community = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.user.token);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);

        // const token = useSelector((state: RootState) => state.user.token);
        if (!token) {
          throw new Error("Token not found in Redux state");
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/messages`;
        console.log("Fetching from URL:", apiUrl);

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Full API response:", response);
        console.log("Response data:", response.data);

        console.log("Response data length:", response.data?.length);

        const lastFourMessages = response.data.slice(-4);
        console.log("Last 4 messages:", lastFourMessages);

        setMessages(lastFourMessages);
        setError(null);
      } catch (error: any) {
        console.error("Failed to fetch community messages:", error);
        setError(error.message || "Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);


  if (loading) {
    return (
      <div className="grid grid-cols-2 b sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-md:gap-2 md:gap-4 p-2">
        <div className="border border-purple-300 rounded-lg max-md:p-1 p-2 overflow-hidden shadow-sm dark:bg-black bg-white">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-2 b sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-md:gap-2 md:gap-4 p-2">
        <div className="border border-purple-300 rounded-lg max-md:p-1 p-2 overflow-hidden shadow-sm dark:bg-black bg-white">
          <p className="text-center text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="grid grid-cols-2 b sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-md:gap-2 md:gap-4 p-2">
        <div className="border border-purple-300 rounded-lg max-md:p-1 p-2 overflow-hidden shadow-sm dark:bg-black bg-white">
          <p className="text-center">No messages found</p>
        </div>
      </div>
    );
  }

  console.log("Rendering messages:", messages);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {messages.map((msg: any) => {
        const profilePicture = msg.users?.profile_picture;
        console.log("Rendering message:", msg);
        return (
          <div
            //@ts-ignore
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
          </div>
        );
      })}
    </div>
  );
};

export default Community;
