"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { RootState } from "@/components/Store/Store";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL);

export default function ChatBox() {
  const user_id = useSelector((state: RootState) => state.user.id);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [firstTime,setFirstTime]=useState(true)
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
  >([]);const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("fetchMessages");

    socket.on("loadMessages", (msgs) => {
        setMessages(msgs); 
        if (msgs.length < 10) setHasMore(false);
        setIsFetching(false);
      })
    socket.on("loadMoreMessages", (msgs) => {
        console.log(msgs,"loaal")
        setMessages((prev) => [...msgs, ...prev]); 
        if (msgs.length < 10) setHasMore(false);
        setIsFetching(false);
      })

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("loadMessages");
      socket.off("loadMoreMessages");
    };
  }, []);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth",block:"end"});

    }
  }, []);
  const loadMoreMessages = () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);
  // Get the current scroll position
  const chatBox = chatRef.current;
  const previousScrollHeight = chatBox?.scrollHeight || 0;
    const oldestMessageId = messages.length > 0 ? messages[0].id : 0; // Use 0 as fallback
    socket.emit("fetchMoreMessages", { lastMessageId: oldestMessageId });
    setTimeout(() => {
        if (chatBox) {
          chatBox.scrollTop = chatBox.scrollHeight - previousScrollHeight;
        }
      }, 100);
  };
  useEffect(() => {
    if (lastMessageRef.current&&firstTime) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      setFirstTime(false)
    }
  }, [messages]);
  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("sendMessage", { sender_id: user_id, content: input });
      setInput("");
    }
  };

 

  return (
    <div className="w-full absolute flex justify-center flex-col items-center my-4">
   

      <div ref={chatRef}  className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg h-[500px] overflow-y-scroll mt-4">
    <div onClick={()=>loadMoreMessages()} className=" w-full flex justify-center items-center hover:cursor-pointer">
      {hasMore?isFetching ? <p className="text-gray-400 text-center">Loading...</p>:
        <p className="text-black text-center bg-gray-100 px-4 text-xs py-1 rounded-xl ">

        Fetch Older Messages
        </p>
        :<p className="text-gray-400 text-center">You have reached at the end of chat</p>}
        </div>
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">
            No messages yet. Be the first to chat!
          </p>
        ) : (
          messages.map((msg,index) => (
            <div
              key={msg.id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={`flex  mb-4 ${
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
              <div className={`flex-1 flex w-full ${msg.sender_id==user_id? "items-end": "items-start"}  flex-col `}>
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
                  
                </div>
                <p className={`bg-gray-700 ${msg.sender_id==user_id? "text-right": "text-left"} p-2 w-full rounded-md mt-1`}>
                  {msg?.content}
                </p>
                <span className="text-gray-400 text-xs">
                    {format(new Date(msg?.created_at), "hh:mm a, MMM dd")}
                  </span>
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
