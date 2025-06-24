
"use client";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { RootState } from "@/components/Store/Store";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Image from "next/image";
import { BsSend } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";

type Reaction = {
  id: number;
  emoji_type: string;
  user_id: number;
  username: string;
  created_at: string;
};

type Message = {
  id: number;
  sender_id: number | null;
  admin_id: number | null;
  content: string;
  created_at: string;
  is_admin: boolean;
  users: { profile_picture: string | null; username: string; profile: string };
  reactions?: Reaction[];
};

export default function CommunityChatBox({ communityChatId }: any) {
  const user_id = useSelector((state: RootState) => state.user.id);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [firstTime, setFirstTime] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [input, setInput] = useState("");
  const [activeReactionMsgId, setActiveReactionMsgId] = useState(null);


  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_BASE_URL!, {
      query: { userId: user_id ? String(user_id) : "" },
    });
    const socket = socketRef.current;

    socket.emit("communityFetchMessages", { communityChatId: Number(communityChatId) });
    socket.on("communityLoadMessages", (msgs: Message[]) => {
      setMessages(msgs);
      if (msgs.length < 10) setHasMore(false);
      setIsFetching(false);
    });
    socket.on("communityLoadMoreMessages", (msgs: Message[]) => {
      setMessages((prev) => [...msgs, ...prev]);
      if (msgs.length < 10) setHasMore(false);
      setIsFetching(false);
    });
    // socket.on("communityReceiveMessage", (message: Message) => {
    //   setMessages((prev) => [...prev, message]);
    // });
    socket.on("communityReceiveMessage", (message: Message) => {
      // Only add if message belongs to current community
      //@ts-ignore
      if (message.community_chat_id === Number(communityChatId)) {
        setMessages((prev) => [...prev, message]);
      }
    });
    socket.on("messageReactionUpdated", (data: { messageId: number; reactions: Reaction[] }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === data.messageId ? { ...msg, reactions: data.reactions } : msg
        )
      );
    });

    return () => {
      socket.off("communityReceiveMessage");
      socket.off("communityLoadMessages");
      socket.off("communityLoadMoreMessages");
      // socket.off("communityUpdateReactions");
      socket.off("messageReactionUpdated");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user_id]);

  useEffect(() => {
    if (lastMessageRef.current && firstTime) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      setFirstTime(false);
    }
  }, [messages, firstTime]);

  const loadMoreMessages = () => {
    if (isFetching || !hasMore || !socketRef.current) return;
    setIsFetching(true);
    const oldestMessageId = messages.length > 0 ? messages[0].id : 0;

    socketRef.current.emit("communityFetchMoreMessages", {
      communityChatId: Number(communityChatId),
      lastMessageId: oldestMessageId
    });
  };

  const sendMessage = () => {
    if (!user_id) { alert("Please log in to send messages."); return; }
    if (input.trim() && socketRef.current) {
      socketRef.current.emit("communitySendMessage", {
        content: input,
        is_admin: false,
        community_chat_id: Number(communityChatId) 
      });
      setInput("");
    }
  };

  const handleReact = (messageId: number, emoji: string) => {
    if (!user_id || !socketRef.current) return;

    const message = messages.find(msg => msg.id === messageId);
    const userReaction = message?.reactions?.find(r => r.user_id === user_id);

    if (userReaction) {
      if (userReaction.emoji_type === emoji) {
        // Clicked same emoji - delete reaction
        handleDeleteReaction(userReaction.id, messageId);
      } else {
        // Clicked different emoji - update reaction
        handleUpdateReaction(userReaction.id, messageId, emoji);
      }
    } else {
      // No existing reaction - add new one
      setMessages(prev => prev.map(msg => {
        if (msg.id === messageId) {
          const newReaction = {
            id: Date.now(), // Temporary ID
            emoji_type: emoji,
            user_id: user_id,
            username: "You",
            created_at: new Date().toISOString()
          };

          return {
            ...msg,
            reactions: [...(msg.reactions || []), newReaction]
          };
        }
        return msg;
      }));

      socketRef.current.emit("toggleMessageReaction", {
        messageId,
        emoji
      });
    }
    setActiveReactionMsgId(null);
  };

  const handleUpdateReaction = (reactionId: number, messageId: number, newEmoji: string) => {
    if (!user_id || !socketRef.current) return;

    // Optimistically update the reaction
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          reactions: (msg.reactions || []).map(r =>
            r.id === reactionId ? { ...r, emoji_type: newEmoji } : r
          )
        };
      }
      return msg;
    }));

    socketRef.current.emit("updateMessageReaction", {
      reactionId,
      newEmoji
    });
  };

  const handleDeleteReaction = (reactionId: number, messageId: number) => {
    if (!user_id || !socketRef.current) return;

    // Optimistically remove the reaction
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          reactions: (msg.reactions || []).filter(r => r.id !== reactionId)
        };
      }
      return msg;
    }));

    socketRef.current.emit("deleteMessageReaction", {
      reactionId
    });
  };
  return (
    <div className="w-full flex flex-col items-center my-8 max-md:my-2">
      <div ref={chatRef} className="w-full  h-[70vh] bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-xl flex flex-col">
        {/* Load more messages section */}
        <div onClick={loadMoreMessages} className="w-full flex justify-center items-center cursor-pointer text-sm mb-4">
          {hasMore ? (isFetching ? (
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          ) : (
            <p className="text-blue-500 hover:underline bg-gray-100 dark:bg-zinc-700 px-4 py-1 rounded-xl transition-colors duration-200">
              Load Older Messages
            </p>
          )) : (
            <p className="text-gray-400 dark:text-gray-500">You have reached the start of the chat</p>
          )}
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center mt-4">
              No messages yet. Be the first to chat!
            </p>
          ) : messages.map((msg: any, index) => {
            const isSender = msg.sender_id === user_id || msg.admin_id === user_id;
            const profilePicture = msg.users.profile_picture || msg.users.profile;
            const messageTime = format(new Date(msg.created_at), "h:mm a");
            const messageDate = format(new Date(msg.created_at), "MMM d");

            return (
              <div
                key={msg.id}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[85%] gap-3 ${isSender ? "flex-row-reverse" : ""}`}>

                  <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-zinc-600 flex items-center justify-center">
                    {profilePicture ? (
                      <Image
                        src={profilePicture}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <FaRegUserCircle className="text-3xl text-gray-500 dark:text-gray-400" />
                    )}
                  </div>

                  {/* Message content */}
                  <div className="flex flex-col gap-1">
                    {/* Message bubble */}
                    <div
                      className="group relative"
                      onClick={() => setActiveReactionMsgId(activeReactionMsgId === msg.id ? null : msg.id)}
                    >
                      <div
                        className={`flex flex-col p-3 rounded-2xl shadow-sm cursor-pointer transition-colors duration-150
                              ${isSender
                            ? "bg-blue-500 text-white rounded-br-none hover:bg-blue-600"
                            : "bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-white rounded-bl-none hover:bg-gray-200 dark:hover:bg-zinc-600"}`}
                      >
                        {/* Sender info */}
                        <div className="flex items-center gap-2">
                          <span className={`font-medium text-sm ${isSender ? "text-blue-100" : "text-gray-700 dark:text-gray-300"}`}>
                            {msg.is_admin ? `🔴 ${msg.users.username}` : msg.users.username}
                          </span>
                          <span className={`text-xs ${isSender ? "text-blue-200" : "text-gray-500 dark:text-gray-400"}`}>
                            {messageTime}
                          </span>
                        </div>



                        <p className="text-sm break-words break-all mt-1 whitespace-pre-wrap">{msg.content}</p>


                        {msg.reactions?.length > 0 && (
                          <div className={`flex gap-1 mt-2 flex-wrap ${isSender ? "justify-end" : "justify-start"}`}>
                            {Object.entries(
                              msg.reactions.reduce((acc: Record<string, { count: number, userReacted: boolean }>, curr: any) => {
                                if (!acc[curr.emoji_type]) {
                                  acc[curr.emoji_type] = { count: 0, userReacted: false };
                                }
                                acc[curr.emoji_type].count++;
                                if (curr.user_id === user_id) {
                                  acc[curr.emoji_type].userReacted = true;
                                }
                                return acc;
                              }, {})
                            ).map(([emoji, data]: any) => (
                              <span
                                key={emoji}
                                className={`text-xs px-2 py-0.5 rounded-full cursor-pointer
          ${isSender ? "bg-blue-400 text-white" : "bg-gray-300 dark:bg-zinc-600"}
          ${data.userReacted ? "ring-1 ring-blue-500" : ""}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (data.userReacted) {
                                    // If user already reacted with this emoji, open reaction modal
                                    setActiveReactionMsgId(msg.id);
                                  } else {
                                    // If not, add this reaction
                                    handleReact(msg.id, emoji);
                                  }
                                }}
                              >
                                {emoji} {data.count}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Emoji reaction options (keep functionality exactly the same) */}

                    {activeReactionMsgId === msg.id && (
                      <div
                        className={`flex gap-2 p-1  rounded-full shadow-md w-44 bg-white dark:bg-zinc-700
      ${isSender ? "justify-end" : "justify-start"}`}
                      >
                        {["❤️", "😂", "🔥", "👍", "😢"].map((emoji) => (
                          <span
                            key={emoji}
                            className="cursor-pointer text-lg hover:scale-110 mx-auto transition-transform"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReact(msg.id, emoji);
                            }}
                          >
                            {emoji}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message input (keep exactly the same) */}
        <div className="w-full p-4 mt-4 flex items-center space-x-2 bg-gray-100 dark:bg-zinc-900 rounded-lg">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 p-3 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white text-gray-800"
          />
          <button
            onClick={sendMessage}
            className="px-6 max-md:px-2 py-2 bg-custom-gradient flex items-center max-md:w-14 justify-center gap-2 text-black rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <BsSend className="text-lg max-md:hidden" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

