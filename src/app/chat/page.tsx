"use client"

import React, { useState } from "react";
import Chat from "./Chat";
import ChatWindow from "./ChatWindow";

const chats = [
  {
    id: 1,
    title: "AMD Radeon RX 580",
    message: "Hi, yes it is",
    sender: "Seller",
    image: "/images/graphicCard.png",
    price: "AED 350",
    location: "Al Furjan, Dubai, UAE Today",
  },
  {
    id: 2,
    title: "AMDPC RX 1000",
    message: "Hello, it's me seller",
    sender: "Seller",
    image: "/images/graphicCard.png",
    price: "AED 400",
    location: "Downtown Dubai, UAE Today",
  },
  {
    id: 3,
    title: "AMD Laptop RX 8760",
    message: "This is your PC",
    sender: "Seller",
    image: "/images/graphicCard.png",
    price: "AED 500",
    location: "Jumeirah, Dubai, UAE Today",
  },
];

const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState(chats[0]); 

  return (
    <>
    <div className="font-bold text-4xl my-4 ml-10">
        Chats
    </div>
    <div className="flex justify-center">
      <Chat onSelectChat={(id) => setSelectedChat(chats.find(chat => chat.id === id) || chats[0])} />
      <ChatWindow chat={selectedChat} />
    </div>
    </>
  );
};

export default ChatsPage;
