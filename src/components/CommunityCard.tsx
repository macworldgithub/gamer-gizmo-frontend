"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { format } from "date-fns";

const Community = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/Chat/messages`
        );
        // ✅ Get the last 4 messages
        setMessages(response.data.slice(-4));
      } catch (error) {
        console.error("Failed to fetch community messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-md:gap-2 md:gap-4 p-2">
      {messages.map((msg: any) => (
        <div
          //@ts-ignore
          key={msg.id}
          className="border border-purple-300 rounded-lg max-md:p-1 p-2 overflow-hidden shadow-sm dark:bg-black bg-white"
        >
          <div className="flex justify-start items-center space-x-3">
            <div className="max-sm:w-5 max-sm:h-6 w-10 h-10 rounded-md overflow-hidden">
              <Image
                //@ts-ignore
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${msg.users.profile}`}
                width={40}
                height={40}
                alt="profile-pic"
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold dark:text-white text-black text-sm">
                {msg.users.username}
              </p>
              <p className="max-md:text-[0.6rem] md:text-xs text-gray-500">
                {format(new Date(msg.created_at), "hh:mm a, MMM dd")}
              </p>
            </div>
          </div>
          <h3 className="mt-4 text-black md:text-base max-sm:text-[0.7rem] sm:text-sm text-start dark:text-white truncate">
            {msg.content}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Community;
