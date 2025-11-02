"use client";

import React, { useEffect, useRef, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:4000/api/chat";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const addMessage = (msg) => setMessages((s) => [...s, msg]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setError(null);

    const userMsg = { id: Date.now().toString(), sender: "user", text };
    addMessage(userMsg);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(
          errBody?.error || `Request failed with status ${res.status}`
        );
      }

      const data = await res.json();
      const botText = data?.reply || "(no reply)";

      addMessage({ id: Date.now().toString(), sender: "bot", text: botText });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
    <h1 className="text-2xl text-center p-4">Learn With Gemini Ai</h1>
      <div className="flex flex-col dark:shadow-blue-600  justify-center shadow-sm mt-6 md:w-2xl min-h-80 rounded-2xl border p-4 mx-auto">
        <div className="w-full  shadow-lg rounded-2xl flex flex-col overflow-hidden">
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 h-[500px]"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-5xl text-sm whitespace-pre-line shadow-sm ${
                    m.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-gray-400 text-sm">typing...</div>
            )}
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 text-center text-sm py-1">
              {error}
            </div>
          )}

          <div className="flex border-t">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 resize-none p-3 outline-none text-sm h-16"
            />
            <button
              onClick={send}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 m-2 rounded-xl disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
