import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bot,
  Send,
  Loader2,
  X,
  Globe,
  Copy,
  Check,
  Trash2,
  Download,
} from "lucide-react";

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------
type MessageRole = "user" | "assistant";

interface Message {
  role: MessageRole;
  content: string;
  timestamp: number;
}

interface ChatResponse {
  answer: string;
}

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
}

// ----------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------
const BRAND = "#07518a";
const CHAT_API = "https://chatbot-2-1lpb.onrender.com";

// ----------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------
const safeHtml = (text: string): string => {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return escaped.replace(
    /(https?:\/\/[^\s)]+)(?=\)|\s|$)/g,
    `<a href="$1" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline text-blue-400">$1</a>`
  );
};

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------
const TypeReveal: React.FC<{ text: string; speed?: number }> = ({
  text,
  speed = 15,
}) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, ++i));
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span dangerouslySetInnerHTML={{ __html: safeHtml(displayed) }} />;
};

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1">
    {[0, 150, 300].map((delay, i) => (
      <div
        key={i}
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
    <span className="text-gray-500 text-sm ml-2">AI is typing...</span>
  </div>
);

const MessageBubble: React.FC<{
  message: Message;
  onCopy: () => void;
  copied: boolean;
}> = ({ message, onCopy, copied }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : ""} group`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
          isUser ? "text-white" : "bg-gradient-to-br from-gray-700 to-gray-800 text-white"
        }`}
        style={isUser ? { background: `linear-gradient(135deg, ${BRAND} 0%, #0a6bb5 100%)` } : {}}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </motion.div>
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[80%]`}>
        <div
          className={`rounded-2xl px-3 py-2 shadow-sm ${
            isUser
              ? "text-white rounded-tr-md"
              : "bg-white text-gray-800 rounded-tl-md border border-gray-100"
          }`}
          style={
            isUser
              ? { background: `linear-gradient(135deg, ${BRAND} 0%, #0a6bb5 100%)` }
              : {}
          }
        >
          {isUser ? (
            <span
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: safeHtml(message.content) }}
            />
          ) : (
            <TypeReveal text={message.content} />
          )}
        </div>
        <div className={`flex items-center gap-1 mt-1 ${isUser ? "flex-row-reverse" : ""}`}>
          <span className="text-xs text-gray-400">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {!isUser && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100"
              aria-label="Copy message"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 text-gray-400" />
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------
const ChatPanel: React.FC<ChatPanelProps> = ({ open, onClose }) => {
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [language, setLanguage] = useState("English");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const languages = [
    "English",
    "Hindi",
    "Telugu",
    "Tamil",
    "Malayalam",
    "Kannada",
    "Marathi",
    "Gujarati",
    "Bengali",
    "Punjabi",
    "Odia",
    "Urdu",
  ];

  // Load session and history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("br_session_id");
    const id =
      stored ||
      (typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 15));
    if (!stored) localStorage.setItem("br_session_id", id);
    setSessionId(id);

    const savedHistory = localStorage.getItem(`chat_history_${id}`);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load chat history:", e);
      }
    }
  }, []);

  // Persist history to localStorage
  useEffect(() => {
    if (sessionId && history.length > 0) {
      localStorage.setItem(`chat_history_${sessionId}`, JSON.stringify(history));
    }
  }, [history, sessionId]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 100) + "px";
    }
  }, [input]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, typing]);

  // Send message
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    setInput("");
    const userMessage: Message = {
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };
    const updatedHistory = [...history, userMessage];
    setHistory(updatedHistory);
    setSending(true);
    setTyping(true);

    try {
      const { data } = await axios.post<ChatResponse>(
        `${CHAT_API}/chat`,
        {
          conversationId: sessionId,
          userText: `Translate and respond in ${language} language. User says: ${trimmed}`,
          history: updatedHistory,
        },
        { timeout: 30000 }
      );
      const botMessage: Message = {
        role: "assistant",
        content: data.answer || "Sorry, I could not process that.",
        timestamp: Date.now(),
      };
      setHistory((prev) => [...prev, botMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        role: "assistant",
        content: `⚠️ ${error.response?.data?.message || error.message || "Network error. Please try again."}`,
        timestamp: Date.now(),
      };
      setHistory((prev) => [...prev, errorMessage]);
    } finally {
      setSending(false);
      setTyping(false);
    }
  };

  const clearChat = () => {
    setHistory([]);
    if (sessionId) {
      localStorage.removeItem(`chat_history_${sessionId}`);
    }
  };

  const copyMessage = (index: number) => {
    const message = history[index];
    if (message) {
      navigator.clipboard.writeText(message.content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const exportChat = () => {
    const chatText = history
      .map(
        (msg) =>
          `[${new Date(msg.timestamp).toLocaleString()}] ${msg.role === "user" ? "You" : "AI"}: ${msg.content}`
      )
      .join("\n\n");

    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-end p-4 right-6 bottom-20"
        >
          {/* Backdrop without blur */}
          <div
            className="absolute "
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 300, damping: 30 },
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
              transition: { duration: 0.2 },
            }}
            className="relative w-full max-w-lg bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "80vh" }}
          >
            {/* Header */}
            <div
              className="px-5 py-3 text-white flex items-center justify-between shadow-md"
              style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, #0a6bb5 100%)`,
              }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Bot className="w-8 h-8" />
                </motion.div>
                <div>
                  <h2 className="font-bold text-lg">AI Assistant</h2>
                  <p className="text-xs opacity-90 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Responding in <strong>{language}</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {history.length > 0 && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={exportChat}
                      className="p-1.5 rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                      aria-label="Export chat"
                      title="Export chat"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={clearChat}
                      className="p-1.5 rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                      aria-label="Clear chat"
                      title="Clear chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Language selector */}
            <div className="px-5 py-2 flex items-center justify-end gap-2 bg-white/80 border-b border-gray-200">
              <Globe className="w-4 h-4 text-gray-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#07518a] focus:border-[#07518a] bg-white shadow-sm cursor-pointer"
                aria-label="Select language"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {history.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mb-4"
                  >
                    <Bot className="w-16 h-16 text-[#07518a] mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      Welcome!
                    </h3>
                    <p className="text-sm text-gray-600 max-w-xs">
                      I'm your AI assistant. Choose a language above and start chatting.
                    </p>
                  </motion.div>
                </div>
              )}

              {history.map((msg, index) => (
                <MessageBubble
                  key={index}
                  message={msg}
                  onCopy={() => copyMessage(index)}
                  copied={copiedIndex === index}
                />
              ))}

              {typing && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm bg-gradient-to-br from-gray-700 to-gray-800 text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white rounded-2xl px-3 py-2 shadow-sm border border-gray-100">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="relative mb-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder={`Message in ${language}...`}
                  rows={1}
                  className="w-full min-h-[44px] max-h-[100px] resize-none rounded-xl border-2 border-gray-200 px-4 py-2.5 pr-12 focus:outline-none focus:border-[#07518a] focus:ring-2 focus:ring-[#07518a]/20 text-gray-800 shadow-sm transition-all text-sm"
                  aria-label="Message input"
                  disabled={sending}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={sending || !input.trim()}
                  className={`absolute right-2 bottom-2 w-9 h-9 rounded-lg flex items-center justify-center shadow-md transition-all ${
                    sending || !input.trim()
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "text-white hover:shadow-lg"
                  }`}
                  style={
                    !sending && input.trim()
                      ? { background: `linear-gradient(135deg, ${BRAND} 0%, #0a6bb5 100%)` }
                      : {}
                  }
                  aria-label="Send message"
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Enter to send • Shift+Enter new line</span>
                <span>ID: {sessionId.slice(0, 6)}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatPanel;