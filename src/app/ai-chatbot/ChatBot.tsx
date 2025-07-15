"use client";

import { useState } from "react";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const askBot = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMessage = input;
    setInput("");

    try {
      const res = await fetch(
        `http://localhost:3000/ai/ask?q=${encodeURIComponent(userMessage)}`
      );
      const data = await res.json();
      setMessages((prev) => [...prev, { user: userMessage, bot: data.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { user: userMessage, bot: "Error reaching server." },
      ]);
    }

    setLoading(false);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") askBot();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-black">AI Chatbot</h1>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {messages.map((msg, i) => (
            <div key={i}>
              <div className="text-right mb-1">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block">
                  {msg.user}
                </span>
              </div>
              <div className="text-left text-black">
                <span className="bg-gray-200 px-4 py-2 rounded-lg inline-block ">
                  {msg.bot}
                </span>
              </div>
            </div>
          ))}
          {loading && <p className="text-gray-500 text-sm">Bot is typing...</p>}
        </div>

        <div className="flex gap-2 mt-4 ">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Type a question..."
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black dark:text-black"
          />
          <button
            onClick={askBot}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
