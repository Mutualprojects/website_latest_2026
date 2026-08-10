"use client";

import React, { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"visible" | "hidden">("visible");

  // Helper to resolve cookie domain dynamically for localhost vs production (brihaspathi.com)
  const getCookieDomain = (): string => {
    if (typeof window === "undefined") return "";
    const hostname = window.location.hostname;
    // Don't set domain for localhost/development IPs
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.includes("192.168.")) {
      return "";
    }
    // Set domain for production
    return hostname.endsWith("brihaspathi.com") ? "domain=.brihaspathi.com" : "";
  };

  useEffect(() => {
    setMounted(true);
    
    // Check if user has already made a choice
    if (typeof document !== "undefined") {
      const hasConsent = document.cookie.split('; ').find(row => row.startsWith('cookie_consent='));
      if (hasConsent) {
        setStatus("hidden");
      }
    }
  }, []);

  if (!mounted || status === "hidden") return null;

  const handleChoice = (choice: "accepted" | "rejected") => {
    if (typeof document !== "undefined") {
      const expiry = 7 * 24 * 60 * 60; // 7 days
      const domain = getCookieDomain();
      const domainParam = domain ? `${domain};` : "";

      // Store choice in first-party cookie with proper domain parameters
      document.cookie = `cookie_consent=${choice}; max-age=${expiry}; path=/; ${domainParam} SameSite=Lax`;
      console.log("Consent saved:", choice, "with domain parameters:", domainParam);
    }
    setStatus("hidden");
  };

  return (
    <AnimatePresence>
      {status === "visible" && (
        <>
          {/* 1. Fullscreen Focus Dimmer Overlay - forces user concentration on the banner first */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-[3px] pointer-events-auto"
          />

          {/* 2. Slide-up Cookie Consent Container */}
          <motion.div
            initial={{ opacity: 0, y: 180, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 120, scale: 0.98 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1] // Custom premium easeOut cubic-bezier for a slow, elegant rise
            }}
            className="fixed inset-x-0 bottom-0 z-[999] flex justify-center px-0 pb-0 sm:px-6 sm:pb-6"
          >
            {/* Main Glassmorphic Panel */}
            <div
              role="dialog"
              aria-label="Cookie consent banner"
              aria-live="polite"
              className="w-full sm:max-w-2xl bg-[#080a0e]/95 border-t border-white/10 sm:border border-white/10 rounded-t-2xl sm:rounded-2xl p-5 sm:p-7 shadow-[0_-15px_40px_rgba(0,0,0,0.6),0_30px_70px_rgba(7,81,138,0.3)] backdrop-blur-2xl relative overflow-hidden"
            >
              {/* Pulsating glowing Top line accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#07518a] to-transparent opacity-95 animate-pulse" />

              <div className="flex flex-col gap-5 sm:flex-row sm:items-start relative z-10">
                
                {/* Header Icon with rotational hover */}
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.05 }}
                  className="hidden sm:flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gradient-to-tr from-[#07518a]/15 to-[#07518a]/35 border border-[#07518a]/20 text-[#4fa3e3] shadow-[0_0_20px_rgba(7,81,138,0.25)]"
                >
                  <Cookie className="h-6 w-6" strokeWidth={1.5} />
                </motion.div>

                <div className="flex-1">
                  {/* Title */}
                  <h2 className="text-[1.05rem] font-semibold text-white tracking-tight flex items-center gap-2">
                    <span className="sm:hidden flex h-6 w-6 items-center justify-center rounded-full bg-[#07518a]/20 text-[#4fa3e3] text-xs">
                      <Cookie className="h-3.5 w-3.5" />
                    </span>
                    Your Privacy Choice
                  </h2>

                  {/* Description */}
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-stone-400">
                    We use cookies and similar technologies to ensure the website functions properly, 
                    analyze website traffic, and improve your browsing experience. Essential cookies are always enabled. 
                    With your consent, we may also use analytics cookies to understand how visitors interact with our website. 
                    You can accept, reject, or manage your cookie preferences at any time. For more information, please read our{" "}
                    <Link href="/privacy-policy" className="text-white hover:text-[#4fa3e3] underline underline-offset-4 decoration-[#07518a] hover:decoration-[#4fa3e3] transition-colors font-medium">
                      Cookie Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-white hover:text-[#4fa3e3] underline underline-offset-4 decoration-[#07518a] hover:decoration-[#4fa3e3] transition-colors font-medium">
                      Privacy Policy
                    </Link>
                    .
                  </p>

                  {/* Footer Buttons */}
                  <div className="mt-5 flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center sm:justify-start">
                    
                    {/* Reject Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChoice("rejected")}
                      className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-stone-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none sm:w-auto"
                    >
                      Reject
                    </motion.button>

                    {/* Accept Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(7, 81, 138, 0.45)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChoice("accepted")}
                      className="w-full rounded-full bg-gradient-to-r from-[#07518a] to-[#0a66ad] px-7 py-2.5 text-xs font-medium uppercase tracking-wider text-white shadow-md transition-all hover:from-[#0a66ad] hover:to-[#0d7ac8] focus:outline-none sm:w-auto sm:ml-auto"
                    >
                      Accept
                    </motion.button>

                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
