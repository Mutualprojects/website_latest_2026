"use client";

import React, { useState } from "react";
import Image from "next/image";
import ChatPanel from "@/components/Chatpanel";
import chaticon from "../public/magnific_i-waant-the-bot-main-colo_3Gi7d6sREY.png";
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
        className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-transparent border-0 outline-none focus:outline-none ${
          isChatOpen
            ? "hidden sm:flex"
            : "animate-bounce-slow"
        }`}
        aria-label={isChatOpen ? "Close chat" : "Open chat assistant"}
      >
        <Image
          src={isChatOpen ? chatclose : chaticon}
          alt={isChatOpen ? "Close chat" : "AI Chatbot Assistant"}
          width={128}
          height={128}
          priority
          className={`object-contain transition-all duration-300 ${
            isChatOpen
              ? "w-10 h-10 sm:w-12 sm:h-12"
              : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
          }`}
        />
      </button>

      {/* Chat Panel */}
      <ChatPanel open={isChatOpen} onClose={handleCloseChat} />
    </>
  );
};

export default ChatButton;