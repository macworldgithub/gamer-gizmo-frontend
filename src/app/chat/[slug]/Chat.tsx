import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const Chat = ({ onSelectChat }: { onSelectChat: (id: number) => void }) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const chats = [
    {
      id: 1,
      title: "AMD Radeon RX 580",
      message: "Hi, yes it is",
      sender: "Seller",
      image: "/images/graphicCard.png",
      sellerImage: "/images/profile.png",
    },
    {
      id: 2,
      title: "AMDPC RX 1000",
      message: "Hello, it's me seller",
      sender: "Seller",
      image: "/images/graphicCard.png",
      sellerImage: "/images/profile.png",
    },
    {
      id: 3,
      title: "AMD Laptop RX 8760",
      message: "This is your PC",
      sender: "Seller",
      image: "/images/graphicCard.png",
      sellerImage: "/images/profile.png",
    },
  ];

  return (
    <div className="w-full md:w-[25%] xl:[30% ] h-screen p-4 border border-black rounded-lg bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Chats</h2>
        <button className="text-sm text-gray-500 hover:text-black">Edit</button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-3">
        <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["Buying", "Selling", "Read", "Unread"].map((filter) => (
          <button key={filter} className="px-3 py-1 text-xs font-medium border border-black rounded-lg hover:bg-gray-200">
            {filter}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex-1 pr-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-200 relative ${
              selectedChat === chat.id ? "bg-gray-100" : "bg-white"
            }`}
            onClick={() => {
              setSelectedChat(chat.id);
              onSelectChat(chat.id);
            }}
          >
            {selectedChat === chat.id && <div className="absolute left-0 top-0 h-full w-1 bg-[#dc39fc] rounded-md"></div>}
            <img src={chat.image} alt="Chat" className="w-12 h-12 rounded-md object-cover" />
            <div>
              <h3 className="font-bold text-sm md:text-base">{chat.title}</h3>
              <p className="text-xs text-gray-700 font-semibold">{chat.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <img src={chat.sellerImage} alt="Seller" className="w-5 h-5 rounded-full object-cover" />
                <span className="text-xs text-gray-700 font-semibold">{chat.sender}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
