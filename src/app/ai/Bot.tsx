
"use client";
import React, { useState, useRef } from "react";
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
      (url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">${url}</a>`
    );
  };

  const formatBotResponse = (text: string) => {
    // Convert URLs to links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let formattedText = text.replace(
      urlRegex,
      (url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">${url}</a>`
    );

    // Format bold text (**text**)
    formattedText = formattedText.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-bold">$1</strong>'
    );

    // Format section headers (text ending with colon)
    formattedText = formattedText.replace(
      /^(.*?:)\s*$/gm,
      '<div class="font-bold text-lg mt-4 mb-2 text-blue-300">$1</div>'
    );

    // Format product listings (lines starting with - 👉)
    formattedText = formattedText.replace(
      /^(- 👉.*)(<a.*<\/a>)/gm,
      '<div class="flex flex-col mb-2 pl-2 border-l-2 border-blue-500">$1$2</div>'
    );

    // Add line breaks
    formattedText = formattedText.replace(/\n/g, "<br />");

    return formattedText;
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
      text: "I am ready. What are you looking for?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const currentInput = input;
    setInput("");

    setMessages((prev) => [...prev, { sender: "user", text: currentInput }]);
    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://www.bot.gamergizmo.com/query",
        { query: currentInput },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data;

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: formatBotResponse(data.message),
          productLink: data.productLink,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Failed to fetch response. Is the backend running?",
        },
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
            I'm Jarvis, your AI gaming buddy. Whether you're here to buy,
            sell, or just talk about gaming gear, I'm here to make it legendary
          </p>
        </div>

        {/* Chat Messages Area */}
        <div className="w-full max-w-4xl mt-6 space-y-4 bg-white/5 rounded-2xl shadow-xl backdrop-blur-md p-4 flex flex-col max-h-[500px] overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg, idx) => (
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
            ))
          ) : (
            <div className="text-gray-400 text-center py-10">
              👋 Start the conversation by asking something!
            </div>
          )}

          {isLoading && (
            <div className="max-w-[85%] mr-auto px-4 py-3 rounded-2xl text-sm md:text-base bg-gradient-to-r from-gray-700 to-gray-900 text-white animate-pulse">
              I am thinking...
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="w-full max-w-4xl mt-4">
          <div className="relative flex items-center">
            <textarea
              placeholder="Ask anything..."
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 md:py-4 rounded-2xl text-sm md:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none min-h-[50px] max-h-[150px] pr-12"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
              rows={1}
            />
            <Image
              src="/images/Send.png"
              alt="Send Icon"
              width={40}
              height={40}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 transition-transform z-10"
              onClick={handleSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
