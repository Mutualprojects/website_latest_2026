"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ── Types ─────────────────────────────────────────── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
  rewriteUsed?: boolean;
  isError?: boolean;
}

/* ── Config ─────────────────────────────────────────── */
const SERVER_URL = "https://chatbot-1-jwv1.onrender.com";

/* ── Helpers ─────────────────────────────────────────── */
function getTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

/* ── Simple Markdown Renderer ────────────────────────── */
function renderMarkdown(text: string): string {
  let s = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  s = s.replace(
    /```([\s\S]*?)```/g,
    (_: string, c: string) => `<pre><code>${c.trim()}</code></pre>`
  );
  s = s.replace(/`([^`]+)`/g, (_: string, c: string) => `<code>${c}</code>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  s = s.replace(/^[-•] (.+)$/gm, "<li>$1</li>");
  s = s.replace(/\n\n+/g, "</p><p>");
  s = s.replace(/\n/g, "<br/>");
  return `<p>${s}</p>`.replace(/<p>\s*<\/p>/g, "");
}

/* ── Bot SVG Icon ─────────────────────────────────────── */
const BotIcon = ({ size = 20, color = "white" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M9 11a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2m6 0a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2z" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MinimizeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Suggestion chips ─────────────────────────────────── */
const SUGGESTIONS = [
  { icon: "📚", label: "What topics are covered?", q: "What topics are covered in the knowledge base?" },
  { icon: "🗂️", label: "Summarise key info", q: "Give me a summary of the key information available." },
  { icon: "❓", label: "Common questions", q: "What are the most frequently asked questions?" },
  { icon: "🤝", label: "How can you help?", q: "How can you help me today?" },
];

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function BriChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId] = useState(() => uid()); // fallback for crypto.randomUUID
  const [showWelcome, setShowWelcome] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<{ role: string; content: string }[]>([]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open, scrollToBottom]);

  useEffect(() => {
    if (open) {
      setUnreadCount(0);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setShowWelcome(false);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: trimmed,
        time: getTime(),
      };
      setMessages((prev) => [...prev, userMsg]);

      const prevHistory = [...historyRef.current];
      historyRef.current = [...historyRef.current, { role: "user", content: trimmed }];

      setLoading(true);
      try {
        const res = await fetch(`${SERVER_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId,
            userText: trimmed,
            history: prevHistory,
            rewrite: true,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || `Server error ${res.status}`);
        }

        const answer = data.answer || "No response received.";
        const botMsg: Message = {
          id: uid(),
          role: "assistant",
          content: answer,
          time: getTime(),
          rewriteUsed: data.rewriteUsed === true,
        };
        setMessages((prev) => [...prev, botMsg]);
        historyRef.current = [...historyRef.current, { role: "assistant", content: answer }];

        if (!open) setUnreadCount((c) => c + 1);
      } catch (err) {
        const errMsg: Message = {
          id: uid(),
          role: "assistant",
          content: (err as Error).message || "Could not reach the server. Please check your connection.",
          time: getTime(),
          isError: true,
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setLoading(false);
        setTimeout(() => textareaRef.current?.focus(), 50);
      }
    },
    [loading, conversationId, open]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <>
      {/* ── Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .brichat-widget * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .brichat-widget ::-webkit-scrollbar { width: 4px; }
        .brichat-widget ::-webkit-scrollbar-track { background: transparent; }
        .brichat-widget ::-webkit-scrollbar-thumb { background: rgba(7,81,138,.2); border-radius: 4px; }

        @keyframes bc-fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bc-pop    { from { opacity:0; transform:scale(.85) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes bc-pulse  { 0%,100%{ transform:scale(1); box-shadow: 0 0 0 0 rgba(7,81,138,.4); } 50%{ transform:scale(1.05); box-shadow: 0 0 0 8px rgba(7,81,138,.0); } }
        @keyframes bc-dot    { 0%,80%,100%{ transform:scale(.5); opacity:.4; } 40%{ transform:scale(1); opacity:1; } }
        @keyframes bc-blink  { 0%,100%{ opacity:1; } 50%{ opacity:.3; } }
        @keyframes bc-badge  { from { transform:scale(0); } to { transform:scale(1); } }

        .bc-launcher {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 9999;
          animation: bc-fadeUp .5s ease;
        }

        .bc-launcher-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #07518a 0%, #0a6fbe 100%);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(7,81,138,.45), 0 2px 8px rgba(7,81,138,.3);
          transition: all .2s ease;
          animation: bc-pulse 3s ease-in-out infinite;
          position: relative;
        }
        .bc-launcher-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 40px rgba(7,81,138,.55);
          animation: none;
        }
        .bc-launcher-btn:active { transform: scale(.94); }

        .bc-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 20px;
          height: 20px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 800;
          color: white;
          animation: bc-badge .3s cubic-bezier(.175,.885,.32,1.275);
        }

        .bc-window {
          position: fixed;
          bottom: 96px;
          right: 24px;
          z-index: 9998;
          width: 380px;
          max-width: calc(100vw - 32px);
          height: 580px;
          max-height: calc(100vh - 120px);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: #f0f4f8;
          box-shadow: 0 20px 80px rgba(7,81,138,.22), 0 4px 20px rgba(0,0,0,.12);
          animation: bc-pop .3s cubic-bezier(.175,.885,.32,1.275);
          border: 1px solid rgba(7,81,138,.1);
        }

        .bc-window.minimized {
          height: 0;
          overflow: hidden;
          animation: none;
        }

        @media (max-width: 480px) {
          .bc-window {
            bottom: 0;
            right: 0;
            left: 0;
            width: 100%;
            max-width: 100%;
            height: 100dvh;
            max-height: 100dvh;
            border-radius: 0;
          }
          .bc-launcher {
            bottom: 16px;
            right: 16px;
          }
        }

        /* Header */
        .bc-header {
          flex-shrink: 0;
          background: linear-gradient(135deg, #03244a 0%, #07518a 60%, #0a6fbe 100%);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }
        .bc-header::before {
          content: '';
          position: absolute;
          top: -30px;
          right: -30px;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(56,189,248,.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .bc-header-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255,255,255,.12);
          border: 1.5px solid rgba(255,255,255,.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          backdrop-filter: blur(8px);
        }
        .bc-header-info { flex: 1; min-width: 0; }
        .bc-header-name {
          font-size: 14px;
          font-weight: 800;
          color: white;
          letter-spacing: -.3px;
        }
        .bc-header-name span { color: #38bdf8; }
        .bc-header-status {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 2px;
        }
        .bc-status-dot {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 6px #10b981;
          animation: bc-blink 2.4s ease-in-out infinite;
          flex-shrink: 0;
        }
        .bc-header-sub {
          font-size: 10px;
          color: rgba(255,255,255,.55);
          font-weight: 500;
        }
        .bc-header-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          position: relative;
          z-index: 1;
        }
        .bc-hbtn {
          width: 30px;
          height: 30px;
          border: none;
          background: rgba(255,255,255,.1);
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,.7);
          transition: all .15s;
        }
        .bc-hbtn:hover {
          background: rgba(255,255,255,.18);
          color: white;
        }

        /* Messages */
        .bc-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 0;
        }

        /* Welcome */
        .bc-welcome {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 8px 8px;
          animation: bc-fadeUp .4s ease;
        }
        .bc-welcome-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, #07518a 0%, #0a6fbe 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          box-shadow: 0 8px 28px rgba(7,81,138,.3);
        }
        .bc-welcome-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f1923;
          letter-spacing: -.5px;
          margin-bottom: 6px;
        }
        .bc-welcome-title span {
          background: linear-gradient(90deg, #07518a, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .bc-welcome-sub {
          font-size: 12px;
          color: #64748b;
          line-height: 1.6;
          max-width: 260px;
          margin-bottom: 16px;
        }
        .bc-chips {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          width: 100%;
        }
        .bc-chip {
          padding: 10px 10px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
          color: #0f1923;
          cursor: pointer;
          text-align: left;
          transition: all .18s;
          line-height: 1.4;
          box-shadow: 0 1px 4px rgba(0,0,0,.04);
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .bc-chip:hover {
          border-color: rgba(7,81,138,.3);
          background: rgba(7,81,138,.03);
          color: #07518a;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(7,81,138,.12);
        }
        .bc-chip-icon { font-size: 14px; }

        /* Message bubbles */
        .bc-msg {
          display: flex;
          gap: 8px;
          animation: bc-fadeUp .25s ease;
        }
        .bc-msg.user { flex-direction: row-reverse; }
        .bc-msg-avatar {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .bc-msg.bot .bc-msg-avatar {
          background: linear-gradient(135deg, #07518a 0%, #0a6fbe 100%);
          box-shadow: 0 2px 8px rgba(7,81,138,.25);
        }
        .bc-msg.user .bc-msg-avatar {
          background: linear-gradient(135deg, #475569, #334155);
          font-size: 11px;
          font-weight: 800;
          color: white;
        }
        .bc-msg-body { flex: 1; min-width: 0; max-width: 85%; }
        .bc-msg.user .bc-msg-body { display: flex; flex-direction: column; align-items: flex-end; }

        .bc-msg-meta {
          font-size: 9px;
          color: #94a3b8;
          font-weight: 600;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 5px;
          letter-spacing: .02em;
        }
        .bc-msg.user .bc-msg-meta { flex-direction: row-reverse; }
        .bc-rewrite-tag {
          font-size: 8px;
          font-weight: 700;
          padding: 1px 4px;
          background: rgba(7,81,138,.08);
          color: #07518a;
          border-radius: 3px;
          border: 1px solid rgba(7,81,138,.12);
          text-transform: uppercase;
          letter-spacing: .05em;
        }

        .bc-bubble {
          padding: 10px 13px;
          border-radius: 14px;
          font-size: 13px;
          line-height: 1.65;
          word-break: break-word;
        }
        .bc-msg.bot .bc-bubble {
          background: white;
          border: 1px solid #e2e8f0;
          border-top-left-radius: 4px;
          box-shadow: 0 1px 6px rgba(0,0,0,.05);
          color: #0f1923;
        }
        .bc-msg.user .bc-bubble {
          background: linear-gradient(135deg, #07518a 0%, #0a6fbe 100%);
          color: white;
          border-top-right-radius: 4px;
          box-shadow: 0 3px 12px rgba(7,81,138,.3);
        }
        .bc-bubble strong { font-weight: 700; }
        .bc-bubble em { font-style: italic; opacity: .75; }
        .bc-bubble code {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          background: rgba(7,81,138,.06);
          border: 1px solid rgba(7,81,138,.1);
          padding: 1px 4px;
          border-radius: 4px;
        }
        .bc-bubble pre {
          background: #0f1923;
          border-radius: 8px;
          padding: 10px;
          overflow-x: auto;
          margin: 8px 0;
        }
        .bc-bubble pre code {
          background: none;
          border: none;
          color: #bae6fd;
          padding: 0;
        }
        .bc-bubble ul, .bc-bubble ol { padding-left: 16px; margin: 4px 0; }
        .bc-bubble li { margin: 2px 0; }
        .bc-bubble p { margin: 5px 0; }
        .bc-bubble p:first-child { margin-top: 0; }
        .bc-bubble p:last-child { margin-bottom: 0; }

        /* Error bubble */
        .bc-error-bubble {
          padding: 10px 13px;
          background: rgba(239,68,68,.06);
          border: 1px solid rgba(239,68,68,.2);
          border-radius: 14px;
          border-top-left-radius: 4px;
          color: #b91c1c;
          font-size: 12px;
          line-height: 1.5;
        }

        /* Typing indicator */
        .bc-typing-bubble {
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .bc-dot {
          width: 6px;
          height: 6px;
          background: #94a3b8;
          border-radius: 50%;
          animation: bc-dot 1.4s ease-in-out infinite;
        }
        .bc-dot:nth-child(2) { animation-delay: .2s; }
        .bc-dot:nth-child(3) { animation-delay: .4s; }

        /* Input area */
        .bc-input-area {
          flex-shrink: 0;
          padding: 10px 12px 12px;
          background: #f0f4f8;
          border-top: 1px solid #e2e8f0;
        }
        .bc-input-wrap {
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          box-shadow: 0 2px 12px rgba(7,81,138,.08);
          display: flex;
          align-items: flex-end;
          gap: 0;
          padding: 4px 4px 4px 12px;
          transition: border-color .2s, box-shadow .2s;
        }
        .bc-input-wrap:focus-within {
          border-color: rgba(7,81,138,.4);
          box-shadow: 0 4px 20px rgba(7,81,138,.12), 0 0 0 3px rgba(7,81,138,.06);
        }
        .bc-textarea {
          flex: 1;
          border: none;
          outline: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          color: #0f1923;
          background: transparent;
          resize: none;
          min-height: 36px;
          max-height: 120px;
          padding: 8px 0;
          line-height: 1.5;
        }
        .bc-textarea::placeholder { color: #94a3b8; font-size: 13px; }
        .bc-send-btn {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #07518a 0%, #0a6fbe 100%);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all .2s;
          box-shadow: 0 3px 10px rgba(7,81,138,.35);
          margin: 2px;
        }
        .bc-send-btn:hover { transform: scale(1.06); box-shadow: 0 5px 16px rgba(7,81,138,.45); }
        .bc-send-btn:active { transform: scale(.94); }
        .bc-send-btn:disabled { opacity: .4; cursor: not-allowed; transform: none; box-shadow: none; }
        .bc-input-hint {
          text-align: center;
          font-size: 9.5px;
          color: rgba(100,116,139,.5);
          margin-top: 6px;
          letter-spacing: .02em;
        }
        .bc-input-hint strong { font-weight: 700; }

        /* Powered by */
        .bc-powered {
          text-align: center;
          font-size: 9px;
          color: rgba(100,116,139,.4);
          margin-top: 4px;
          letter-spacing: .05em;
          text-transform: uppercase;
        }
      `}</style>

      {/* ── Launcher Button ── */}
      <div className="brichat-widget bc-launcher">
        {!open && unreadCount > 0 && (
          <div className="bc-badge">{unreadCount > 9 ? "9+" : unreadCount}</div>
        )}
        <button
          className="bc-launcher-btn"
          onClick={() => {
            setOpen((o) => !o);
            setMinimized(false);
          }}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {open ? <CloseIcon /> : <BotIcon size={28} />}
        </button>
      </div>

      {/* ── Chat Window ── */}
      {open && (
        <div className={`brichat-widget bc-window${minimized ? " minimized" : ""}`}>
          {/* Header */}
          <div className="bc-header">
            <div className="bc-header-avatar">
              <BotIcon size={22} />
            </div>
            <div className="bc-header-info">
              <div className="bc-header-name">
                Bri<span>Chat</span>
              </div>
              <div className="bc-header-status">
                <div className="bc-status-dot" />
                <div className="bc-header-sub">Online · AI Assistant</div>
              </div>
            </div>
            <div className="bc-header-actions">
              <button
                className="bc-hbtn"
                onClick={() => setMinimized((m) => !m)}
                title={minimized ? "Expand" : "Minimize"}
              >
                {minimized ? <ChevronDownIcon /> : <MinimizeIcon />}
              </button>
              <button className="bc-hbtn" onClick={() => setOpen(false)} title="Close">
                <CloseIcon />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="bc-messages">
                {/* Welcome screen */}
                {showWelcome && (
                  <div className="bc-welcome">
                    <div className="bc-welcome-icon">
                      <BotIcon size={28} />
                    </div>
                    <div className="bc-welcome-title">
                      Hello! I'm <span>BriChat</span>
                    </div>
                    <div className="bc-welcome-sub">
                      Powered by Pinecone RAG & DeepSeek R1. Ask me anything from the knowledge base.
                    </div>
                    <div className="bc-chips">
                      {SUGGESTIONS.map((s) => (
                        <button key={s.q} className="bc-chip" onClick={() => sendMessage(s.q)}>
                          <span className="bc-chip-icon">{s.icon}</span>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map((msg) => (
                  <div key={msg.id} className={`bc-msg ${msg.role === "user" ? "user" : "bot"}`}>
                    <div className="bc-msg-avatar">
                      {msg.role === "assistant" ? <BotIcon size={14} /> : "You"}
                    </div>
                    <div className="bc-msg-body">
                      <div className="bc-msg-meta">
                        {msg.role === "assistant" ? "BriChat" : "You"} · {msg.time}
                        {msg.rewriteUsed && <span className="bc-rewrite-tag">✦ Refined</span>}
                      </div>
                      {msg.isError ? (
                        <div className="bc-error-bubble">{msg.content}</div>
                      ) : msg.role === "assistant" ? (
                        <div
                          className="bc-bubble"
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                        />
                      ) : (
                        <div className="bc-bubble">{msg.content}</div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div className="bc-msg bot">
                    <div className="bc-msg-avatar">
                      <BotIcon size={14} />
                    </div>
                    <div className="bc-msg-body">
                      <div className="bc-msg-meta">BriChat</div>
                      <div className="bc-bubble bc-typing-bubble">
                        <span className="bc-dot" />
                        <span className="bc-dot" />
                        <span className="bc-dot" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="bc-input-area">
                <div className="bc-input-wrap">
                  <textarea
                    ref={textareaRef}
                    className="bc-textarea"
                    placeholder="Ask me anything…"
                    rows={1}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    autoComplete="off"
                    spellCheck
                  />
                  <button
                    className="bc-send-btn"
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading}
                    aria-label="Send message"
                  >
                    <SendIcon />
                  </button>
                </div>
                <div className="bc-input-hint">
                  <strong>Enter</strong> to send · <strong>Shift+Enter</strong> for new line
                </div>
                <div className="bc-powered">Powered by Pinecone RAG · OpenRouter</div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}