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
    <div className="flex h-full w-full max-w-md flex-col overflow-hidden rounded-lg border">
      <div className="border-b bg-gray-100 p-4">
        <h2 className="text-xl font-bold">Messenger</h2>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-end space-x-2 ${
                message.sender === "You"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <Avatar>
                <AvatarImage src="/path-to-avatar.jpg" alt="User Avatar" />
                <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-2 ${
                  message.sender === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="border-t bg-gray-100 p-4">
        <div className="flex space-x-2">
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow"
          />
          <Button
            type="submit"
            className="w-fit bg-blue-500 text-white hover:bg-blue-600"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Messenger;
