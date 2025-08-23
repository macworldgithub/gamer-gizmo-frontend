"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";

interface Message {
  sender: string;
  text: string;
  productLink?: string;
}

export default function Bot() {
  const linkify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">${url}</a>`
  );
};

  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("sessionId");
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("sessionId", id);
      }
      return id;
    }
    return "";
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Your AI gaming buddy is ready. What are you looking for?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
const handleSend = async () => {
  if (!input.trim()) return;

  const currentInput = input;
  setInput("");

  setMessages((prev) => [...prev, { sender: "user", text: currentInput }]);
  setIsLoading(true);

  try {
    const res = await axios.post(
      "http://77.37.51.106:9009/query",
      { query: currentInput },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = res.data;

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: linkify(data.message), // 🔗 convert URLs to clickable links
        productLink: data.productLink,
      },
    ]);
  } catch (err) {
    console.error(err);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Failed to fetch response. Is the backend running?" },
    ]);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gradient-to-b from-gray-900 to-black ">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.png"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Main Layout */}
      <div className="relative max-md:p-10 max-md:mt-20 z-10 flex flex-col items-center px-4 py-8 md:px-8 min-h-screen">
        {/* Top Intro */}
        <div className="w-full max-w-3xl text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Image
              src="/images/boticon.png"
              alt="Chatbot Icon"
              width={80}
              height={80}
              className="rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome to GamerGizmo!
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            I’m GizmoCore, your AI gaming buddy. Whether you’re here to buy,
            sell, or just talk about gaming gear, I’m here to make it legendary
          </p>
        </div>

        {/* Chat Messages Area */}
        <div className="w-full max-w-4xl mt-6 space-y-4 bg-white/5  rounded-2xl shadow-xl backdrop-blur-md p-4 flex flex-col">
          {messages.map((msg, idx) => (
            // <div
            //   key={idx}
            //   className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg
            //   ${
            //     msg.sender === "user"
            //       ? "ml-auto mr-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
            //       : "mr-auto ml-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white"
            //   }`}
            // >
            //   {msg.text}
            // </div>
            <div
              key={idx}
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg
      ${
        msg.sender === "user"
          ? "ml-auto mr-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
          : "mr-auto ml-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white"
      }`}
              {...(msg.sender === "bot"
                ? { dangerouslySetInnerHTML: { __html: msg.text } }
                : {})}
            >
              {msg.sender === "user" ? msg.text : null}
            </div>
          ))}

          {isLoading && (
            <div className="max-w-[85%] mr-auto px-4 py-3 rounded-2xl text-sm md:text-base bg-gradient-to-r from-gray-700 to-gray-900 text-white animate-pulse">
              I am thinking...
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="w-full max-w-4xl mt-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask anything..."
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 md:py-4 rounded-full text-sm md:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <Image
              src="/images/Send.png"
              alt="Send Icon"
              width={40}
              height={40}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 transition-transform"
              onClick={handleSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
