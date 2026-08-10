"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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
  Sparkles,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  ArrowRight,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";

// ─────────────────────────────────────────────
// Speech API type shims (not in default TS lib)
// ─────────────────────────────────────────────
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type MessageRole = "user" | "assistant";

interface Message {
  id?: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  feedback?: "like" | "dislike" | null;
}

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
}

// ─────────────────────────────────────────────
// Constants & Color Tokens
// ─────────────────────────────────────────────
const BRAND = "#07518a";
const BRAND_LIGHT = "#0a7fd4";

const CATEGORIZED_PROMPTS = [
  {
    category: "Services",
    icon: "🚀",
    text: "What services does Brihaspathi offer?",
  },
  {
    category: "AI Solutions",
    icon: "⚡",
    text: "Tell me about your AI & Software solutions",
  },
  {
    category: "Contact",
    icon: "📞",
    text: "How can I contact your support & business team?",
  },
  {
    category: "Projects",
    icon: "💼",
    text: "Showcase your key client projects & products",
  },
];

const LANGUAGES = [
  { name: "English", code: "en", flag: "🇬🇧" },
  { name: "Hindi", code: "hi", flag: "🇮🇳" },
  { name: "Telugu", code: "te", flag: "🇮🇳" },
  { name: "Tamil", code: "ta", flag: "🇮🇳" },
  { name: "Malayalam", code: "ml", flag: "🇮🇳" },
  { name: "Kannada", code: "kn", flag: "🇮🇳" },
  { name: "Marathi", code: "mr", flag: "🇮🇳" },
  { name: "Gujarati", code: "gu", flag: "🇮🇳" },
  { name: "Bengali", code: "bn", flag: "🇮🇳" },
  { name: "Punjabi", code: "pa", flag: "🇮🇳" },
];

// Map each supported language to a BCP-47 locale for the Web Speech API
// (used for both microphone recognition and text-to-speech playback).
const SPEECH_LANG_MAP: Record<string, string> = {
  English: "en-US",
  Hindi: "hi-IN",
  Telugu: "te-IN",
  Tamil: "ta-IN",
  Malayalam: "ml-IN",
  Kannada: "kn-IN",
  Marathi: "mr-IN",
  Gujarati: "gu-IN",
  Bengali: "bn-IN",
  Punjabi: "pa-IN",
};

// ─────────────────────────────────────────────
// Markdown & Link Sanitizer
// ─────────────────────────────────────────────
const formatMessageText = (text: string): string => {
  let formatted = text;

  // Escape basic HTML tags to prevent XSS
  formatted = formatted
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks: ```code```
  formatted = formatted.replace(
    /```([\s\S]*?)```/g,
    `<pre class="my-2 p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800"><code>$1</code></pre>`
  );

  // Inline code: `code`
  formatted = formatted.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded text-xs font-mono border border-slate-200">$1</code>'
  );

  // Bold markdown
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-slate-900'>$1</strong>");

  // Italic markdown
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // List bullet conversion (lines starting with - or *)
  formatted = formatted.replace(/^[\s]*[-*]\s+(.*)$/gm, "<li class='ml-4 list-disc my-0.5'>$1</li>");

  // Auto linkify http/https URLs
  formatted = formatted.replace(
    /(https?:\/\/[^\s<]+)/g,
    `<a href="$1" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-[#07518a] hover:text-[#0a7fd4] font-medium underline underline-offset-2 break-all group transition-colors">$1</a>`
  );

  // Line breaks
  formatted = formatted.replace(/\n/g, "<br/>");

  return formatted;
};

// ─────────────────────────────────────────────
// TypeReveal Component
// ─────────────────────────────────────────────
const TypeReveal: React.FC<{ text: string; speed?: number; onTick?: () => void }> = ({
  text,
  speed = 10,
  onTick,
}) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, ++i));
        onTick?.();
      } else {
        clearInterval(timer);
        setDone(true);
        onTick?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, onTick]);

  return (
    <div
      className="leading-relaxed text-sm text-slate-800"
      dangerouslySetInnerHTML={{
        __html: formatMessageText(done ? text : displayed),
      }}
    />
  );
};

// ─────────────────────────────────────────────
// Typing Indicator Component
// ─────────────────────────────────────────────
const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-1.5 px-2 py-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-[#07518a]/70"
        animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: i * 0.18,
          ease: "easeInOut",
        }}
      />
    ))}
    <span className="text-xs text-slate-400 font-medium ml-1">Thinking…</span>
  </div>
);

// ─────────────────────────────────────────────
// Message Bubble Component
// ─────────────────────────────────────────────
const MessageBubble: React.FC<{
  message: Message;
  index: number;
  onCopy: () => void;
  copied: boolean;
  onFeedback: (type: "like" | "dislike") => void;
  isLatestAssistant: boolean;
  onSpeak?: () => void;
  isSpeaking?: boolean;
  speechAvailable?: boolean;
  onRevealTick?: () => void;
}> = ({
  message,
  onCopy,
  copied,
  onFeedback,
  isLatestAssistant,
  onSpeak,
  isSpeaking,
  speechAvailable,
  onRevealTick,
}) => {
    const isUser = message.role === "user";

    return (
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""} group`}
      >
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${isUser
            ? "bg-gradient-to-br from-[#07518a] to-[#0a7fd4] text-white ring-2 ring-white"
            : "bg-gradient-to-br from-slate-800 to-slate-900 text-white ring-2 ring-slate-100"
            }`}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Bubble Container */}
        <div className={`flex flex-col gap-1 max-w-[84%] sm:max-w-[78%] ${isUser ? "items-end" : "items-start"}`}>
          {/* Name / Role label */}
          <span className="text-[11px] font-medium text-slate-400 px-1">
            {isUser ? "You" : "AI Assistant"}
          </span>

          {/* Message Box */}
          <div
            className={`relative px-4 py-3 shadow-sm transition-all duration-200 ${isUser
              ? "bg-gradient-to-br from-[#07518a] to-[#0a7fd4] text-white rounded-2xl rounded-tr-xs"
              : "bg-white text-slate-800 rounded-2xl rounded-tl-xs border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              }`}
          >
            {isUser ? (
              <div
                className="leading-relaxed text-sm"
                dangerouslySetInnerHTML={{ __html: formatMessageText(message.content) }}
              />
            ) : isLatestAssistant ? (
              <TypeReveal text={message.content} onTick={onRevealTick} />
            ) : (
              <div
                className="leading-relaxed text-sm text-slate-800"
                dangerouslySetInnerHTML={{
                  __html: formatMessageText(message.content),
                }}
              />
            )}
          </div>

          {/* Timestamp + Actions Toolbar */}
          <div className={`flex items-center gap-2 px-1 text-[11px] text-slate-400 ${isUser ? "flex-row-reverse" : ""}`}>
            <span>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            {!isUser && (
              <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                {speechAvailable && (
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onSpeak}
                    className={`p-1 rounded-md transition-colors ${isSpeaking
                      ? "text-[#07518a] bg-[#07518a]/10"
                      : "text-slate-400 hover:bg-slate-200/60 hover:text-slate-700"
                      }`}
                    title={isSpeaking ? "Stop reading" : "Read aloud"}
                    aria-label="Read message aloud"
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onCopy}
                  className="p-1 rounded-md hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Copy message"
                  aria-label="Copy message"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onFeedback("like")}
                  className={`p-1 rounded-md transition-colors ${message.feedback === "like"
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-slate-400 hover:bg-slate-200/60 hover:text-slate-700"
                    }`}
                  title="Helpful"
                  aria-label="Mark helpful"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onFeedback("dislike")}
                  className={`p-1 rounded-md transition-colors ${message.feedback === "dislike"
                    ? "text-rose-500 bg-rose-50"
                    : "text-slate-400 hover:bg-slate-200/60 hover:text-slate-700"
                    }`}
                  title="Not helpful"
                  aria-label="Mark not helpful"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

// ─────────────────────────────────────────────
// Welcome Screen Component
// ─────────────────────────────────────────────
const WelcomeScreen: React.FC<{ onPrompt: (p: string) => void }> = ({ onPrompt }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="flex flex-col items-center justify-center min-h-[340px] py-4 text-center px-2"
  >
    {/* Animated AI Badge */}
    <div className="relative mb-3">
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#07518a] via-[#0863aa] to-[#0a7fd4] flex items-center justify-center shadow-lg shadow-[#07518a]/25 text-white"
      >
        <Sparkles className="w-7 h-7" />
      </motion.div>
    </div>

    <h3 className="text-xl font-bold text-slate-800 tracking-tight">
      How can I help you today? 👋
    </h3>
    <p className="text-xs text-slate-500 max-w-[280px] mt-1 mb-5 leading-relaxed">
      Ask any question about our services and solutions. Answers are concise and under 50 words.
    </p>

    {/* Prompt suggestion cards */}
    <div className="w-full space-y-2 text-left">
      <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase px-1">
        Suggested Prompts
      </p>
      {CATEGORIZED_PROMPTS.map((item) => (
        <motion.button
          key={item.text}
          whileHover={{ scale: 1.01, x: 3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onPrompt(item.text)}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200/80 bg-white hover:border-[#07518a]/40 hover:bg-[#07518a]/[0.03] transition-all duration-200 shadow-xs group"
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <span className="text-base flex-shrink-0">{item.icon}</span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 group-hover:text-[#07518a] truncate transition-colors">
                {item.text}
              </p>
              <span className="text-[10px] text-slate-400 font-medium">
                {item.category}
              </span>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#07518a] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </motion.button>
      ))}
    </div>
  </motion.div>
);

// Helper to read cookies
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

// ─────────────────────────────────────────────
// Main ChatPanel Component
// ─────────────────────────────────────────────
const ChatPanel: React.FC<ChatPanelProps> = ({ open, onClose }) => {
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [language, setLanguage] = useState("English");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [atBottom, setAtBottom] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // ── Voice: Speech-to-Text (mic input) ──
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // ── Voice: Text-to-Speech (spoken replies) ──
  const [ttsSupported, setTtsSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const prevHistoryLenRef = useRef(0);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Session ID and stored chat history
  useEffect(() => {
    const storedCookie = getCookie("br_session_id");
    const storedLocal = localStorage.getItem("br_session_id");
    const stored = storedCookie || storedLocal;
    const id =
      stored ||
      (typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 15));

    // Persist to cookie (30 days expiry) & localStorage
    document.cookie = `br_session_id=${encodeURIComponent(id)}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    if (!storedLocal) {
      localStorage.setItem("br_session_id", id);
    }
    setSessionId(id);

    const savedHistory = localStorage.getItem(`brichat_history_${id}`);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch { }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (sessionId && history.length > 0) {
      localStorage.setItem(`brichat_history_${sessionId}`, JSON.stringify(history));
    }
  }, [history, sessionId]);

  // Dynamic height adjustment for textarea
  useEffect(() => {
    if (textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [input]);

  // Scroll to bottom helper
  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (atBottom) scrollToBottom();
  }, [history, sending, atBottom, scrollToBottom]);

  // Auto scroll on element size or content changes
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      if (atBottom) {
        scrollToBottom();
      }
    });

    for (const child of Array.from(el.children)) {
      observer.observe(child);
    }
    observer.observe(el);

    return () => observer.disconnect();
  }, [atBottom, scrollToBottom, history, sending]);

  // Handle scroll position detection
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 70;
    setAtBottom(nearBottom);
  };

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => textareaRef.current?.focus(), 250);
    }
  }, [open]);

  // Escape key listener to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // ── Set up browser Speech Recognition (mic → text) once on mount ──
  useEffect(() => {
    const SpeechRecognitionCtor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setSpeechSupported(false);
      return;
    }

    setSpeechSupported(true);
    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = SPEECH_LANG_MAP[language] || "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => {
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep recognition language in sync with the chosen response language
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = SPEECH_LANG_MAP[language] || "en-US";
    }
  }, [language]);

  // Check Text-to-Speech support once on mount
  useEffect(() => {
    setTtsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  // Stop any mic/speech activity when the panel closes
  useEffect(() => {
    if (!open) {
      recognitionRef.current?.stop?.();
      setIsListening(false);
      if (ttsSupported) window.speechSynthesis.cancel();
      setSpeakingIndex(null);
    }
  }, [open, ttsSupported]);

  const toggleMic = () => {
    if (!recognitionRef.current || sending) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }
    try {
      recognitionRef.current.lang = SPEECH_LANG_MAP[language] || "en-US";
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err: any) {
      console.error("Could not start voice recognition:", err);
      if (err.name === "InvalidStateError") {
        // It's already running in the background, just sync the state
        setIsListening(true);
      } else {
        setIsListening(false);
      }
    }
  };

  // Speak a given message's text aloud; toggles off if it's already speaking
  const speakMessage = useCallback(
    (text: string, index: number) => {
      if (!ttsSupported) return;

      if (speakingIndex === index) {
        window.speechSynthesis.cancel();
        setSpeakingIndex(null);
        return;
      }

      window.speechSynthesis.cancel();
      const plainText = text.replace(/<[^>]*>/g, "");
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.lang = SPEECH_LANG_MAP[language] || "en-US";
      utterance.onend = () => setSpeakingIndex(null);
      utterance.onerror = () => setSpeakingIndex(null);
      setSpeakingIndex(index);
      window.speechSynthesis.speak(utterance);
    },
    [ttsSupported, speakingIndex, language]
  );

  // Auto-read the latest assistant reply aloud when the toggle is on
  useEffect(() => {
    if (!ttsEnabled || !ttsSupported) {
      prevHistoryLenRef.current = history.length;
      return;
    }
    if (history.length > prevHistoryLenRef.current) {
      const lastIdx = history.length - 1;
      const last = history[lastIdx];
      if (last && last.role === "assistant") {
        speakMessage(last.content, lastIdx);
      }
    }
    prevHistoryLenRef.current = history.length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, ttsEnabled, ttsSupported]);

  // Send Message Logic
  const sendMessage = async (text?: string) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || sending) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    setInput("");
    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };

    const updatedHistory = [...history, userMessage];
    setHistory(updatedHistory);
    setSending(true);
    setAtBottom(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language,
        }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: "assistant",
        content:
          data.answer ||
          data.error ||
          "I apologize, I could not complete your request. Please try again.",
        timestamp: Date.now(),
      };
      setHistory((prev) => [...prev, botMessage]);
    } catch (err: any) {
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          role: "assistant",
          content: "⚠️ Network connection issue. Please check your internet and try again.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const clearChat = () => {
    setHistory([]);
    if (sessionId) localStorage.removeItem(`brichat_history_${sessionId}`);
    if (ttsSupported) window.speechSynthesis.cancel();
    setSpeakingIndex(null);
  };

  const copyMessage = (index: number) => {
    const msg = history[index];
    if (msg) {
      navigator.clipboard.writeText(msg.content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleFeedback = (index: number, type: "like" | "dislike") => {
    setHistory((prev) =>
      prev.map((msg, i) =>
        i === index
          ? { ...msg, feedback: msg.feedback === type ? null : type }
          : msg
      )
    );
  };

  const exportChat = () => {
    if (history.length === 0) return;
    const textLog = history
      .map(
        (msg) =>
          `[${new Date(msg.timestamp).toLocaleString()}] ${msg.role === "user" ? "User" : "AI Assistant"
          }:\n${msg.content}\n`
      )
      .join("\n----------------------------------------\n\n");

    const blob = new Blob([textLog], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const latestAssistantIdx = history.reduce(
    (acc, msg, idx) => (msg.role === "assistant" ? idx : acc),
    -1
  );

  const selectedLangObj = LANGUAGES.find((l) => l.name === language) || LANGUAGES[0];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40"
            aria-hidden="true"
          />

          {/* Centered Middle Chat Panel Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            role="dialog"
            aria-label="AI Assistant Panel"
            className={`relative z-50 flex flex-col bg-slate-50 border border-slate-200/80 shadow-2xl overflow-hidden transition-all duration-300 w-full ${isExpanded
              ? "max-w-4xl h-[88vh] rounded-3xl"
              : "max-w-2xl h-[650px] max-h-[88vh] rounded-3xl"
              }`}
            style={{
              boxShadow:
                "0 25px 60px -15px rgba(7, 81, 138, 0.25), 0 10px 25px -5px rgba(0, 0, 0, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header Bar ── */}
            <div
              className="px-4 py-3.5 flex items-center justify-between flex-shrink-0 select-none border-b border-white/10"
              style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_LIGHT} 100%)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#07518a]" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-base leading-tight">
                    AI Assistant
                  </h2>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1 text-white">
                {/* Maximize / Minimize toggle (Desktop) */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="hidden sm:flex p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                  title={isExpanded ? "Collapse window" : "Expand window"}
                  aria-label="Toggle window size"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </motion.button>

                {history.length > 0 && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={exportChat}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                      title="Export transcript"
                      aria-label="Export transcript"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={clearChat}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                      title="Clear chat"
                      aria-label="Clear chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </>
                )}

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* ── Sub-Header: Language Selector & Status ── */}
            <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200/70 flex-shrink-0 gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Globe className="w-3.5 h-3.5 text-[#07518a]" />
                <span>Response Language:</span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Auto-read replies toggle */}
                {ttsSupported && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      setTtsEnabled((prev) => {
                        const next = !prev;
                        if (!next) {
                          window.speechSynthesis.cancel();
                          setSpeakingIndex(null);
                        }
                        return next;
                      });
                    }}
                    className={`flex items-center gap-1 text-xs font-semibold rounded-lg px-2 py-1 border transition-colors shadow-xs ${ttsEnabled
                      ? "text-white bg-[#07518a] border-[#07518a]"
                      : "text-[#07518a] bg-[#07518a]/5 border-[#07518a]/20 hover:bg-[#07518a]/10"
                      }`}
                    title={ttsEnabled ? "Auto-read replies: On" : "Auto-read replies: Off"}
                    aria-label="Toggle auto-read replies"
                  >
                    {ttsEnabled ? (
                      <Volume2 className="w-3.5 h-3.5" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5" />
                    )}
                  </motion.button>
                )}

                {/* Language Dropdown Button */}
                <div className="relative">
                  <button
                    onClick={() => setLangOpen((v) => !v)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#07518a] bg-[#07518a]/5 border border-[#07518a]/20 rounded-lg px-2.5 py-1 hover:bg-[#07518a]/10 transition-colors shadow-xs"
                    aria-label="Select language"
                  >
                    <span>{selectedLangObj.flag}</span>
                    <span>{selectedLangObj.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {langOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1.5 w-40 max-h-48 overflow-y-auto bg-white rounded-xl border border-slate-200 shadow-xl z-20 p-1"
                      >
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.name}
                            onClick={() => {
                              setLanguage(lang.name);
                              setLangOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-colors ${language === lang.name
                              ? "bg-[#07518a] text-white font-medium"
                              : "hover:bg-slate-100 text-slate-700"
                              }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </span>
                            {language === lang.name && (
                              <Check className="w-3.5 h-3.5" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* ── Chat Messages Container ── */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth min-h-0 bg-slate-50/50"
            >
              {history.length === 0 ? (
                <WelcomeScreen onPrompt={(p) => sendMessage(p)} />
              ) : (
                history.map((msg, index) => (
                  <MessageBubble
                    key={msg.id || index}
                    index={index}
                    message={msg}
                    onCopy={() => copyMessage(index)}
                    copied={copiedIndex === index}
                    onFeedback={(type) => handleFeedback(index, type)}
                    isLatestAssistant={index === latestAssistantIdx}
                    onSpeak={() => speakMessage(msg.content, index)}
                    isSpeaking={speakingIndex === index}
                    speechAvailable={ttsSupported}
                    onRevealTick={scrollToBottom}
                  />
                ))
              )}

              {/* Bot thinking indicator */}
              {sending && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-md">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-xs px-4 py-2.5 shadow-sm border border-slate-200/80">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              {/* Scroll to Bottom Floating Pill */}
              <AnimatePresence>
                {!atBottom && (
                  <motion.button
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    onClick={() => {
                      setAtBottom(true);
                      scrollToBottom();
                    }}
                    className="sticky bottom-2 mx-auto flex items-center gap-1.5 bg-[#07518a] text-white border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-medium shadow-lg hover:bg-[#0a7fd4] transition-all"
                  >
                    <span>Scroll to latest</span>
                    <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                  </motion.button>
                )}
              </AnimatePresence>

              <div ref={chatEndRef} />
            </div>

            {/* ── Input Box Section ── */}
            <div className="flex-shrink-0 border-t border-slate-200/80 bg-white p-3 space-y-2">
              {/* Context prompt chips if conversation exists */}
              {history.length > 0 && !sending && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase flex-shrink-0">
                    Quick:
                  </span>
                  {CATEGORIZED_PROMPTS.slice(0, 3).map((item) => (
                    <button
                      key={item.text}
                      onClick={() => sendMessage(item.text)}
                      className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#07518a]/10 hover:text-[#07518a] text-slate-600 text-[11px] whitespace-nowrap border border-slate-200/60 transition-colors flex-shrink-0"
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              )}

              {/* Listening status strip */}
              {isListening && (
                <div className="flex items-center gap-1.5 px-1 text-[11px] font-medium text-[#07518a]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#07518a] opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#07518a]" />
                  </span>
                  <span>Listening… speak now</span>
                </div>
              )}

              {/* Textarea & Send */}
              <div className="flex items-end gap-2 bg-slate-100/80 border border-slate-300/80 rounded-2xl p-2 focus-within:border-[#07518a] focus-within:ring-2 focus-within:ring-[#07518a]/20 focus-within:bg-white transition-all">
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
                  placeholder={
                    isListening
                      ? "Listening…"
                      : "Ask anything..."
                  }
                  rows={1}
                  className="flex-1 min-h-[28px] max-h-[120px] resize-none bg-transparent px-1 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                  aria-label="Message input field"
                  disabled={sending}
                />

                {/* Clear input button if typed */}
                {input.length > 0 && (
                  <button
                    onClick={() => setInput("")}
                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors rounded-full"
                    title="Clear text"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Mic Button (Speech-to-Text) */}
                {speechSupported && (
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={toggleMic}
                    disabled={sending}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isListening
                      ? "bg-rose-500 text-white shadow-md animate-pulse"
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      } ${sending ? "opacity-50 cursor-not-allowed" : ""}`}
                    aria-label={isListening ? "Stop voice input" : "Start voice input"}
                    title={isListening ? "Stop recording" : "Speak your message"}
                  >
                    {isListening ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </motion.button>
                )}

                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => sendMessage()}
                  disabled={sending || !input.trim()}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${sending || !input.trim()
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-br from-[#07518a] to-[#0a7fd4] text-white shadow-md hover:shadow-lg"
                    }`}
                  aria-label="Send message"
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </motion.button>
              </div>

              {/* Sub-text footer note */}
              <div className="flex items-center justify-between px-1 text-[10px] text-slate-400">
                <span>Press Enter ↵ to send • Shift+Enter for new line</span>
                <span className="hidden sm:inline">Powered by Brihaspathi</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChatPanel;