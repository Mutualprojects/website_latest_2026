"use client";

import React, { useState } from "react";
import Image from "next/image";
import ChatPanel from "@/components/Chatpanel";
import chaticon from "./friendly-ai-chatbot-robot-waving-with-speech-bubble-transparent-background.png";
import chatclose from "./cancel-3d-icon-rejection-mark-wrong-symbol-no-sign.png";

const ChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-2 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 mb-0 ${
          isChatOpen ? "bg-white" : "bg-[#07518a]"
        }`}
        aria-label={isChatOpen ? "Close chat" : "Open chat"}
      >
        <Image
          src={isChatOpen ? chatclose : chaticon}
          alt={isChatOpen ? "Close chat" : "AI Chatbot"}
          width={40}
          height={40}
          priority
          className="object-contain"
        />
      </button>

      {/* Chat Panel */}
      <ChatPanel open={isChatOpen} onClose={handleCloseChat} />
    </>
  );
};

export default ChatButton;