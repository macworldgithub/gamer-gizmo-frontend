import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TopChat {
  id: number;
  name: string;
  description: string;
  wallpaper: string | null;
  created_at: string;
  message_count: number;
  latest_message: {
    content: string;
    created_at: string;
    users: {
      username: string;
      profile_picture: string | null;
    };
  } | null;
}

interface Props {
  token: string | null;
  limit?: number;
}

const getTimeAgoOrDate = (dateString: string): string => {
  const now = new Date();
  const postedDate = new Date(dateString);
  const diffMs = now.getTime() - postedDate.getTime();

  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  if (diffHours < 24) {
    if (diffHours === 0 && minutes === 0) return "Just now";
    if (diffHours === 0)
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${diffHours} hour${diffHours > 1 ? "s" : ""}${
      minutes > 0 ? ` ${minutes} minute${minutes > 1 ? "s" : ""}` : ""
    } ago`;
  }

  return postedDate.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const TopChats: React.FC<Props> = ({ token, limit = 10 }) => {
  const [chats, setChats] = useState<TopChat[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTopChats = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/top-chats`,
          {
            params: { limit },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setChats(response.data.data);
      } catch (error) {
        console.error("Failed to fetch top chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopChats();
  }, [limit, token]);

  return (
    <div className="max-w-2xl mx-auto px-4 ">
      <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white">
        🔥 Top Community Chats
      </h1>
      {chats.length > 0 ? (
        <div className="space-y-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => router.push(`/community-chat/${chat.id}`)}
              className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow  hover:shadow-md transition-shadow cursor-pointer border  border-secondaryColorDark
                hover:bg-gray-50 dark:hover:bg-zinc-700"
            >
              <div className="flex justify-between md:flex-col  items-start">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-black md:text-sm dark:text-white">
                    {chat?.name}
                  </h3>

                  <div className="flex flex-col space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                      {chat.description}
                    </p>

                    {chat?.latest_message && (
                      <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">
                        <span className="font-medium">
                          {chat.latest_message.users.username}
                        </span>
                        {`: ${chat.latest_message.content}`}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-400 mt-1 min-w-max ml-3 max-lg:ml-0 whitespace-nowrap">
                  {chat.latest_message
                    ? getTimeAgoOrDate(chat.latest_message.created_at)
                    : getTimeAgoOrDate(chat.created_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <p className="text-sm text-gray-500">No top chats found.</p>
      )}
      {/* {chats.length > 0 ? (
        <div className="grid grid-cols-1  max-md:grid-cols-3 gap-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => router.push(`/community-chat/${chat.id}`)}
              className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow hover:shadow-md transition-shadow cursor-pointer border border-secondaryColorDark hover:bg-gray-50 dark:hover:bg-zinc-700"
            >
              <div className="flex justify-between md:flex-col items-start">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-black md:text-sm dark:text-white">
                    {chat?.name}
                  </h3>

                  <div className="flex flex-col space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                      {chat.description}
                    </p>

                    {chat?.latest_message && (
                      <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">
                        <span className="font-medium">
                          {chat.latest_message.users.username}
                        </span>
                        {`: ${chat.latest_message.content}`}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-400 mt-1 min-w-max ml-3 max-lg:ml-0 whitespace-nowrap">
                  {chat.latest_message
                    ? getTimeAgoOrDate(chat.latest_message.created_at)
                    : getTimeAgoOrDate(chat.created_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <p className="text-sm text-gray-500">No top chats found.</p>
      )} */}
    </div>
  );
};

export default TopChats;
