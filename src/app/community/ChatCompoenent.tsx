"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { formatDate } from "../utils/formatDate";
// import { format } from "date-fns";
import { RootState } from "@/components/Store/Store";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Image from "next/image";

const socket = io("http://localhost:890");

export default function Chat() {
  const user_id = useSelector((state: RootState) => state.user.id);

  const [messages, setMessages] = useState<
    {
      id: number;
      sender_id: number;
      content: string;
      created_at: string;
      is_admin: boolean;
      admin_id: number | null;
      users: { profile: string; username: string };
    }[]
  >([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    socket.emit("fetchMessages");

    socket.on("loadMessages", (msgs) => {
      setMessages(msgs);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("loadMessages");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("sendMessage", { sender_id: user_id, content: input });
      setInput("");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
      {/* Chat Header */}
      <h2 className="text-3xl font-bold mb-4 text-neon-green">
        🎮 Gaming Community Chat
      </h2>

      {/* Chat Box */}
      <div className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg h-[500px] overflow-y-auto mt-4">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">
            No messages yet. Be the first to chat!
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start mb-4 ${
                msg.is_admin ? "border-l-4 border-red-500 pl-2" : ""
              }`}
            >
              {/* Profile Picture */}
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${msg?.users?.profile}`}
                alt="Profile"
                width={100}
                height={100}
                className="w-12 h-12 rounded-full mr-3 border-2 border-blue-500"
              />

              {/* Message Content */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span
                    className={`font-bold ${
                      msg.is_admin ? "text-red-400" : "text-blue-400"
                    }`}
                  >
                    {msg.is_admin
                      ? `🔴 Admin: ${msg?.users?.username}`
                      : msg?.users?.username}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {format(new Date(msg?.created_at), "hh:mm a, MMM dd")}
                  </span>
                </div>
                <p className="bg-gray-700 p-2 rounded-md mt-1">
                  {msg?.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="w-full max-w-2xl mt-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border w-full rounded-md text-black"
        />
        <button
          onClick={sendMessage}
          className="md:w-auto px-6 py-2 -ml-3 bg-gradient-to-r from-[#DC39FC] to-[#6345ED] text-white  shadow hover:shadow-md focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}
