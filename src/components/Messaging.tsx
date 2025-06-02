"use client";

import React, { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const sampleMessages: Message[] = [
  {
    id: "1",
    sender: "Alice",
    content: "Hi everyone!",
    timestamp: new Date(),
  },
  {
    id: "2",
    sender: "Bob",
    content: "Hello Alice!",
    timestamp: new Date(),
  },
];

export default function Messaging() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      sender: "You",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Messaging</h2>
      <div className="flex-1 overflow-auto mb-4 border rounded p-4 space-y-3 border-gray-300 dark:border-gray-700">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-1">
            <div className="text-sm font-semibold">{msg.sender}</div>
            <div className="text-gray-800">{msg.content}</div>
            <div className="text-xs text-gray-500">
              {msg.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
