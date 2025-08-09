"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";

// Define the Message interface
interface Message {
  sender: string;
  text: string;
  productLink?: string; // Optional productLink property
}

export default function Bot() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Your AI gaming buddy is ready. What are you looking for?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when new messages are added
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);


  const handleSend = async () => {
    if (!input.trim()) return;

    // Clear input immediately
    const currentInput = input;
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: currentInput }]);
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/ask`,
        {
          params: { q: currentInput },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response.data.reply,
          productLink: response.data.productLink,
        },
      ]);
    } catch (error) {
      console.error("Error fetching API:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gradient-to-b from-gray-900 to-black ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          className="opacity-20"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-4 py-8 md:px-8">
        {/* Top Area: Bot Info & Intro */}
        <div className="w-full max-w-3xl space-y-2 text-center">
          <div className="relative mx-auto w-24 h-24 md:w-32 md:h-24">
            <Image
              src="/images/boticon.png"
              alt="Bot Icon"
              layout="fill"
              objectFit="contain"
              className="rounded-full shadow-lg animate-pulse"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-fade-in">
            Welcome to GamerGizmo!
          </h1>

          <div className="text-base md:text-xl leading-relaxed text-white/90 space-y-4 drop-shadow-sm max-w-2xl mx-auto">
            <p className="animate-slide-up text-base">
              I’m GizmoCore, your AI gaming buddy.
              Whether you’re here to buy, sell, or just talk about gaming gear, I’m here to make it legendary.
            </p>

          </div>
        </div>

        {/* Middle Area: Chat Messages */}
        <div className="w-full max-w-4xl flex-1 overflow-y-auto py-6 space-y-4 mt-8 bg-white/5 rounded-2xl shadow-xl backdrop-blur-md">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm md:text-base transition-all duration-300 ${msg.sender === "user"
                  ? "ml-auto mr-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                  : "mr-auto  ml-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white"
                } shadow-md hover:shadow-lg`}
            >
              {msg.text.split("\n").map((line, i) => (
                <p key={i} className="mb-2 last:mb-0">
                  {line.startsWith("🛒") ? (
                    <a
                      href={line.match(/\[View Product\]\((.*?)\)/)?.[1]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-100 underline transition-colors"
                    >
                      {line.replace(/\[View Product\]\(.*?\)/, "").trim()}
                    </a>
                  ) : (
                    line
                  )}
                </p>
              ))}
              {msg.productLink && (
                <a
                  href={msg.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-100 underline text-sm mt-2 inline-block"
                >
                  View Product
                </a>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="max-w-[85%] mr-auto px-4 py-3 rounded-2xl text-sm md:text-base bg-gradient-to-r from-gray-700 to-gray-900 text-white animate-pulse">
              I am thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input */}
        <div className="w-full max-w-4xl relative mt-6">
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 transition-transform"
              onClick={handleSend}
            />
          </div>
        </div>
      </div>

      {/* Tailwind Animation Styles */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
