

// "use client";
// import { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import { RootState } from "@/components/Store/Store";
// import { useSelector } from "react-redux";
// import { format } from "date-fns";
// import Image from "next/image";
// import { BsSend } from "react-icons/bs";

// const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL);
// // const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
// //   transports: ['websocket', 'polling']
// // });


// export default function ChatBox() {
//   const user_id = useSelector((state: RootState) => state.user.id);
//   const chatRef = useRef<HTMLDivElement | null>(null);
//   const lastMessageRef = useRef<HTMLDivElement | null>(null);
//   const [firstTime, setFirstTime] = useState(true);
//   const [messages, setMessages] = useState<
//     {
//       id: number;
//       sender_id: number;
//       content: string;
//       created_at: string;
//       is_admin: boolean;
//       admin_id: number | null;
//       users: { profile: string; username: string };
//     }[]
//   >([]);
//   const [isFetching, setIsFetching] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     socket.emit("fetchMessages");

//     socket.on("loadMessages", (msgs) => {
//       setMessages(msgs);
//       if (msgs.length < 10) setHasMore(false);
//       setIsFetching(false);
//     });

//     socket.on("loadMoreMessages", (msgs) => {
//       setMessages((prev) => [...msgs, ...prev]);
//       if (msgs.length < 10) setHasMore(false);
//       setIsFetching(false);
//     });

//     socket.on("receiveMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("loadMessages");
//       socket.off("loadMoreMessages");
//     };
//   }, []);

//   useEffect(() => {
//     if (lastMessageRef.current && firstTime) {
//       lastMessageRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "end",
//       });
//       setFirstTime(false);
//     }
//   }, [messages]);

//   const loadMoreMessages = () => {
//     if (isFetching || !hasMore) return;
//     setIsFetching(true);
//     const chatBox = chatRef.current;
//     const previousScrollHeight = chatBox?.scrollHeight || 0;
//     const oldestMessageId = messages.length > 0 ? messages[0].id : 0;
//     socket.emit("fetchMoreMessages", { lastMessageId: oldestMessageId });

//     setTimeout(() => {
//       if (chatBox) {
//         chatBox.scrollTop = chatBox.scrollHeight - previousScrollHeight;
//       }
//     }, 100);
//   };

//   const sendMessage = () => {
//     if (input.trim()) {
//       socket.emit("sendMessage", { sender_id: user_id, content: input });
//       setInput("");
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-center my-4">
//       {/* Chat Container */}
//       <div
//         className="w-full max-w-7xl bg-white dark:bg-black p-4 rounded-lg shadow-md border border-gray-200 h-[60%] overflow-y-scroll relative"
//         ref={chatRef}
//       >
//         {/* Load More Messages */}
//         <div
//           onClick={loadMoreMessages}
//           className="w-full flex justify-center items-center cursor-pointer text-sm"
//         >
//           {hasMore ? (
//             isFetching ? (
//               <p className="text-gray-500">Loading...</p>
//             ) : (
//               <p className="text-gray-600 bg-gray-100 px-4 py-1 rounded-xl">
//                 Fetch Older Messages
//               </p>
//             )
//           ) : (
//             <p className="text-gray-400">
//               You have reached the start of the chat
//             </p>
//           )}
//         </div>

//         {/* Chat Messages */}
//         {messages.length === 0 ? (
//           <p className="text-gray-500 text-center mt-4">
//             No messages yet. Be the first to chat!
//           </p>
//         ) : (
//           messages.map((msg, index) => (
//             <div
//               key={msg.id}
//               ref={index === messages.length - 1 ? lastMessageRef : null}
//               className={`flex w-full my-4 ${msg.sender_id === user_id
//                 ? "justify-end"
//                 : "justify-start border border-secondaryColorLight"
//                 }`}
//             >
//               <div
//                 className={`flex items-end gap-3 max-w-[75%] p-3 rounded-lg ${msg.sender_id === user_id
//                   ? "bg-secondaryColorLight text-white"
//                   : "   text-gray-800 dark:text-white"
//                   }`}
//               >
//                 {/* Profile Image (only for others) */}
//                 {/* {msg.sender_id !== user_id && ( */}
//                 <Image
//                   src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${msg?.users?.profile}`}
//                   alt="Profile"
//                   width={40}
//                   height={40}
//                   className="w-10 h-10 rounded-full border border-gray-300"
//                 />
//                 {/* )} */}

//                 {/* Message Content */}
//                 <div>
//                   <span
//                     className={`block font-semibold text-sm ${msg.sender_id === user_id
//                       ? "text-white"
//                       : msg.is_admin
//                         ? "text-red-500"
//                         : "text-gray-700 dark:text-gray-300"
//                       }`}
//                   >
//                     {msg.is_admin
//                       ? `🔴 Admin: ${msg?.users?.username}`
//                       : msg?.users?.username}
//                   </span>
//                   <p className="text-sm mt-1">{msg?.content}</p>
//                   <span
//                     className={`block text-xs mt-1 ${msg.sender_id === user_id
//                       ? "text-white"
//                       : "text-gray-500 dark:text-gray-400"
//                       }`}
//                   >
//                     {format(new Date(msg?.created_at), "hh:mm a, MMM dd")}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//         {/* Message Input */}
//         <div className="w-full  mt-4 flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="p-2  w-full border border-gray-400 rounded-md dark:text-black text-black"
//             onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button
//             onClick={sendMessage}
//             className="px-6 py-2 bg-custom-gradient flex items-center justify-center gap-2 text-black rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//           >
//             <BsSend />
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { RootState } from "@/components/Store/Store";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Image from "next/image";
import { BsSend } from "react-icons/bs";

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
      users: { profile_picture: string | null; username: string };
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
    <div className="w-full flex flex-col items-center my-4">
      <div
        className="w-full max-w-7xl bg-white dark:bg-black p-4 rounded-lg shadow-md border border-gray-200 h-[60vh] overflow-y-scroll relative"
        ref={chatRef}
      >
        <div
          onClick={loadMoreMessages}
          className="w-full flex justify-center items-center cursor-pointer text-sm"
        >
          {hasMore ? (
            isFetching ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <p className="text-gray-600 bg-gray-100 px-4 py-1 rounded-xl">
                Fetch Older Messages
              </p>
            )
          ) : (
            <p className="text-gray-400">
              You have reached the start of the chat
            </p>
          )}
        </div>

        {messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">
            No messages yet. Be the first to chat!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg.id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={`flex w-full my-4 ${
                (msg.sender_id === user_id || msg.admin_id === user_id)
                  ? "justify-end"
                  : "justify-start border border-secondaryColorLight"
              }`}
            >
              <div
                className={`flex items-end gap-3 max-w-[75%] p-3 rounded-lg ${
                  (msg.sender_id === user_id || msg.admin_id === user_id)
                    ? "bg-secondaryColorLight text-white"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                <Image
                  src={msg.users?.profile_picture || "https://via.placeholder.com/40"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <div>
                  <span
                    className={`block font-semibold text-sm ${
                      (msg.sender_id === user_id || msg.admin_id === user_id)
                        ? "text-white"
                        : msg.is_admin
                        ? "text-red-500"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {msg.is_admin
                      ? `🔴 Admin: ${msg.users?.username}`
                      : msg.users?.username}
                  </span>
                  <p className="text-sm mt-1">{msg.content}</p>
                  <span
                    className={`block text-xs mt-1 ${
                      (msg.sender_id === user_id || msg.admin_id === user_id)
                        ? "text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {format(new Date(msg.created_at), "hh:mm a, MMM dd")}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="w-full mt-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-2 w-full border border-gray-400 rounded-md dark:text-black text-black"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-6 py-2 bg-custom-gradient flex items-center justify-center gap-2 text-black rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <BsSend />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
