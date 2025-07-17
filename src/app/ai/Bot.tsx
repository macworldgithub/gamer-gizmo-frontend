"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Bot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm Synthio. Ask me anything..." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // Fake Synthio response after delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "I'm working on your request..." },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="relative h-screen text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between px-4 py-6">
        {/* Top Area: Bot Info & Intro */}
        <div className="w-full max-w-4xl space-y-6">
          <div>
            <Image
              src="/images/boticon.png"
              alt="Bot Icon"
              width={120}
              height={120}
              className="sm:w-[120px] sm:h-[120px]"
            />
          </div>

          <h1 className="text-4xl sm:text-4xl font-extrabold drop-shadow-lg">
            Welcome Gamer!
          </h1>

          <div className="text-base sm:text-lg md:text-2xl leading-relaxed text-white/90 space-y-2 drop-shadow-sm">
            <p>
              I'm <strong>Synthio</strong>, your gaming companion and
              GamerGizmo's mindful AI.
            </p>
            <p>
              Ask me anything — from top-tier PCs to epic consoles and
              components.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "...best PCs in UAE",
              "...Gaming Consoles",
              "...Upcoming",
              "...Lorem Ipsum",
              "...Gaming Gear",
              "...Custom Builds",
            ].map((label, i) => (
              <button
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-xs sm:text-lg md:text-xl hover:bg-white hover:text-black transition"
                onClick={() => {
                  setInput(label);
                  handleSend();
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Middle Area: Chat Messages */}
        <div className="w-full max-w-3xl flex-1 overflow-y-auto py-4 space-y-3 mt-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm sm:text-base md:text-lg ${
                msg.sender === "user"
                  ? "ml-auto bg-white/20 text-white backdrop-blur-md"
                  : "mr-auto bg-white/10 text-white backdrop-blur-md"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Bottom Input */}
        <div className="w-full max-w-3xl relative">
          <input
            type="text"
            placeholder="Ask anything..."
            className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white px-4 py-3 md:py-4 rounded-full text-sm sm:text-lg md:text-2xl placeholder-white focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Image
            src="/images/Send.png"
            alt="Send Icon"
            width={44}
            height={44}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-10 md:h-10 cursor-pointer"
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
}
