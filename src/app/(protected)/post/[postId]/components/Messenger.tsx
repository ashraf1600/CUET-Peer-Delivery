"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
}

const Messenger: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello there!", sender: "User1", timestamp: new Date() },
    { id: 2, text: "Hi! How are you?", sender: "You", timestamp: new Date() },
    { id: 3, text: "I was wondering if you could help me with something?", sender: "User1", timestamp: new Date() },
  ]);

  const [messageText, setMessageText] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "You",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  return (
    <div className="flex h-full w-full max-w-md flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <h2 className="text-lg font-semibold text-gray-800">Messenger</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex max-w-xs md:max-w-md ${message.sender === "You" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/default-avatar.png" alt="User Avatar" />
                <AvatarFallback className="text-xs">
                  {message.sender.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div
                className={`mx-2 flex flex-col ${message.sender === "You" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`rounded-2xl px-3 py-2 ${
                    message.sender === "You"
                      ? "bg-blue-500 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <span className="mt-1 text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 bg-gray-50 p-3">
        <div className="flex items-center space-x-2">
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow rounded-full bg-white px-4 py-2 text-sm"
          />
          <Button
            type="submit"
            className="h-10 w-10 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Messenger;