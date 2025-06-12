"use client";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { RootState } from "@/components/Store/Store";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Image from "next/image";
import { BsSend } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";

export default function CommunityChatBox() {
  const user_id = useSelector((state: RootState) => state.user.id);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [firstTime, setFirstTime] = useState(true);
  const [messages, setMessages] = useState<
    {
      id: number;
      sender_id: number | null;
      admin_id: number | null;
      content: string;
      created_at: string;
      is_admin: boolean;
      users: { profile_picture: string | null; username: string; profile: string };
    }[]
  >([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_BASE_URL!, {
      query: { userId: user_id ? String(user_id) : "" },
    });

    const socket = socketRef.current;

    socket.emit("communityFetchMessages");

    socket.on("communityLoadMessages", (msgs) => {
      setMessages(msgs);
      if (msgs.length < 10) setHasMore(false);
      setIsFetching(false);
    });

    socket.on("communityLoadMoreMessages", (msgs) => {
      setMessages((prev) => [...msgs, ...prev]);
      if (msgs.length < 10) setHasMore(false);
      setIsFetching(false);
    });

    socket.on("communityReceiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("communityReceiveMessage");
      socket.off("communityLoadMessages");
      socket.off("communityLoadMoreMessages");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user_id]);

  useEffect(() => {
    if (lastMessageRef.current && firstTime) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      setFirstTime(false);
    }
  }, [messages, firstTime]);

  const loadMoreMessages = () => {
    if (isFetching || !hasMore || !socketRef.current) return;
    setIsFetching(true);
    const chatBox = chatRef.current;
    const previousScrollHeight = chatBox?.scrollHeight || 0;
    const oldestMessageId = messages.length > 0 ? messages[0].id : 0;
    socketRef.current.emit("communityFetchMoreMessages", { lastMessageId: oldestMessageId });

    setTimeout(() => {
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight - previousScrollHeight;
      }
    }, 100);
  };

  const sendMessage = () => {
    if (!user_id) {
      alert("Please log in to send messages.");
      return;
    }
    if (input.trim() && socketRef.current) {
      socketRef.current.emit("communitySendMessage", {
        sender_id: user_id,
        content: input,
        is_admin: false,
      });
      setInput("");
    }
  };

  return (
    <div className="w-full flex flex-col items-center my-8">
      <div
        className="w-full max-w-4xl h-[70vh] bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-xl flex flex-col"
        ref={chatRef}
      >
        <div
          onClick={loadMoreMessages}
          className="w-full flex justify-center items-center cursor-pointer text-sm mb-4"
        >
          {hasMore ? (
            isFetching ? (
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            ) : (
              <p className="text-blue-500 hover:underline bg-gray-100 dark:bg-zinc-700 px-4 py-1 rounded-xl transition-colors duration-200">
                Load Older Messages
              </p>
            )
          ) : (
            <p className="text-gray-400 dark:text-gray-500">
              You have reached the start of the chat
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {messages.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center mt-4">
              No messages yet. Be the first to chat!
            </p>
          ) : (
            messages.map((msg, index) => {
              const isSender = msg.sender_id === user_id || msg.admin_id === user_id;
              const profilePicture = msg.users?.profile_picture || msg.users?.profile;

              return (
                <div
                  key={msg.id}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                  className={`flex w-full my-2 ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex flex-col p-3 rounded-xl shadow-md ${isSender
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white rounded-bl-none"
                      } max-w-[75%] space-y-1`}
                  >
                    <div className={`flex items-center gap-2 ${isSender ? "flex-row-reverse" : ""}`}>
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-300 dark:bg-zinc-600 flex-shrink-0">
                        {profilePicture ? (
                          <Image
                            src={profilePicture}
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <FaRegUserCircle className="text-3xl text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="font-semibold">
                          {msg.is_admin
                            ? `🔴 Admin: ${msg?.users?.username}`
                            : msg?.users?.username}
                        </span>
                        <span className="text-xs text-black dark:text-gray-400">
                          {format(new Date(msg?.created_at), "hh:mm a, MMM dd")}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm break-words mt-1">
                      {msg?.content}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="w-full p-4 mt-4 flex items-center space-x-2 bg-gray-100 dark:bg-zinc-900 rounded-lg">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white text-gray-800"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-6 py-2 bg-custom-gradient flex items-center justify-center gap-2 text-black rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <BsSend className="text-lg" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
