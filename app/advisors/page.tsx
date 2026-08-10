"use client";

import React, { useState, useEffect } from "react";
import { Linkedin, X, Loader2, AlertCircle, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Advisor {
  id: string;
  numericId: number;
  name: string;
  bio: string;
  order: number;
  linkedin: string;
  photo: string;
}

const BG_IMAGE =
  "/13312327_v748-toon-94.jpg";

export default function AdvisorsPage() {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  // ============================================================================
  // FETCH DATA WITH FALLBACK CASCADE
  // ============================================================================

  useEffect(() => {
    const loadAdvisors = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoints = [
          { url: "/strapi/api/advisors?populate=*", base: "/strapi" },
          { url: "http://183.82.117.36:2334/api/advisors?populate=*", base: "http://183.82.117.36:2334" },
          { url: "http://172.30.0.200:1334/api/advisors?populate=*", base: "http://172.30.0.200:1334" },
        ];

        let data = null;
        let fetchedBaseUrl = "";

        for (const ep of endpoints) {
          try {
            const res = await fetch(ep.url);
            if (res.ok) {
              data = await res.json();
              if (data && data.data && data.data.length > 0) {
                fetchedBaseUrl = ep.base;
                break;
              }
            }
          } catch (e) {
            console.error(`Failed to fetch from ${ep.url}:`, e);
          }
        }

        if (!data || !data.data || data.data.length === 0) {
          throw new Error("No advisors data found.");
        }

        const rawAdvisors = data.data.map((item: any) => {
          const attrs = item.attributes || item;

          // Image mapping for 'profile' field
          const profileData = attrs.profile || attrs.photo || attrs.image;
          const firstProfile = Array.isArray(profileData) ? profileData[0] : profileData;
          let photoUrl = "";
          if (firstProfile) {
            const url = firstProfile.url || (firstProfile.attributes && firstProfile.attributes.url) || "";
            if (url.startsWith("http")) {
              photoUrl = url;
            } else {
              photoUrl = `${fetchedBaseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
            }
          }

          // Clean values
          const name = (attrs.name || "").trim();
          const bio = (attrs.bio || "").trim();
          let linkedin = (attrs.linkdin_link || attrs.linkedin || "").trim();

          if (linkedin && linkedin.toLowerCase() !== "gg" && !linkedin.startsWith("http")) {
            linkedin = `https://www.linkedin.com/in/${linkedin}`;
          } else if (linkedin.toLowerCase() === "gg") {
            linkedin = "";
          }

          return {
            id: item.documentId || String(item.id),
            numericId: item.id,
            name,
            bio,
            linkedin,
            photo: photoUrl,
            order: typeof attrs.order === "number" ? attrs.order : 99,
          };
        });

        // Sort by order ascending
        rawAdvisors.sort((a: any, b: any) => a.order - b.order);
        setAdvisors(rawAdvisors);
      } catch (err: any) {
        setError(err.message || "Failed to load Board Advisors.");
      } finally {
        setLoading(false);
      }
    };

    loadAdvisors();
  }, []);

  // Escape key to close off-canvas
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedAdvisor(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Lock scroll when off-canvas is active
  useEffect(() => {
    if (selectedAdvisor) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedAdvisor]);

  // ============================================================================
  // LOADING STATE UI
  // ============================================================================

  if (loading) {
    return (
      <div
        className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "'Outfit', 'Segoe UI', system-ui, sans-serif",
        }}
      >
        <div className="absolute inset-0 bg-white/92 backdrop-blur-[4px] z-0" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#07518a] animate-spin" />
          <h3 className="text-lg font-semibold tracking-tight text-[#07518a] animate-pulse">
            Loading Advisory Council...
          </h3>
        </div>
      </div>
    );
  }

  // ============================================================================
  // ERROR STATE UI
  // ============================================================================

  if (error) {
    return (
      <div
        className="w-full h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden text-center"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "'Outfit', 'Segoe UI', system-ui, sans-serif",
        }}
      >
        <div className="absolute inset-0 bg-white/92 backdrop-blur-[4px] z-0" />
        <div className="relative z-10 max-w-md p-8 rounded-3xl bg-white/90 backdrop-blur border border-red-200/50 shadow-2xl flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#07518a]">Failed to Load Council</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-6 py-2.5 rounded-full text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#07518a" }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen relative flex flex-col"
      style={{
        backgroundColor: "#f8fafc",
        fontFamily: "'Outfit', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* ── HERO BANNER SECTION (60vh) ─────────────────────────────────── */}
      <div
        className="w-full h-[60vh] relative flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "url('/diverse-businesspeople-having-meeting.jpg')",
        }}
      >
        {/* Soft dark-blue overlay for high class look and text contrast */}
        <div className="absolute inset-0 bg-[#07365c]/70 backdrop-blur-[1px] z-0" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            <Users size={14} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 drop-shadow-md">
            Board Advisors
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-light max-w-2xl mx-auto">
            Distinguished leaders and industry visionaries providing strategic  to guide Brihaspathi Technologies toward institutional excellence.
          </p>
        </div>
      </div>

      {/* ── ADVISORS GRID SECTION ───────────────────────────────────────── */}
      <div
        className="w-full py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white relative"
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            .card-perspective {
              perspective: 1200px;
            }
            .card-inner {
              position: relative;
              width: 100%;
              height: 480px;
              transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              transform-style: preserve-3d;
            }
            .card-front, .card-back {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              border-radius: 1.5rem;
              overflow: hidden;
            }
            .card-back {
              transform: rotateY(180deg);
            }
            @media (hover: hover) {
              .card-perspective:hover .card-inner {
                transform: rotateY(180deg);
              }
            }
            .card-perspective.flipped .card-inner {
              transform: rotateY(180deg);
            }
            
            /* Custom scrollbar for back card text */
            .back-bio-scroll::-webkit-scrollbar {
              width: 4px;
            }
            .back-bio-scroll::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.05);
              border-radius: 4px;
            }
            .back-bio-scroll::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.25);
              border-radius: 4px;
            }
            .back-bio-scroll::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.4);
            }
          `
        }} />

        {/* Subtle background image overlay for cohesive brand design */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04] pointer-events-none z-0"
          style={{ backgroundImage: `url(${BG_IMAGE})` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {advisors.map((advisor) => {
              const photoUrlSrc = advisor.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(advisor.name)}&background=07518a&color=fff&size=256`;
              const isFlipped = flippedCardId === advisor.id;

              return (
                <motion.div
                  key={advisor.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                  className={`card-perspective group cursor-pointer h-[480px] w-full ${isFlipped ? "flipped" : ""}`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setFlippedCardId(isFlipped ? null : advisor.id);
                    } else {
                      setSelectedAdvisor(advisor);
                    }
                  }}
                >
                  <div className="card-inner">
                    {/* FRONT SIDE */}
                    <div className="card-front bg-white border border-[#07518a]/10 shadow-[0_8px_30px_rgb(7,81,138,0.04)] flex flex-col justify-between">
                      {/* Front Photo */}
                      <div className="h-[320px] w-full overflow-hidden bg-[#07518a]/5 relative">
                        <img
                          src={photoUrlSrc}
                          alt={advisor.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Subtle top-down overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07518a]/10 to-transparent pointer-events-none" />
                      </div>
                      {/* Front Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[#07518a] transition-colors group-hover:text-[#05406e] truncate">
                            {advisor.name}
                          </h3>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#07518a]/5 text-[9px] font-bold text-[#07518a] uppercase tracking-wider mt-1 border border-[#07518a]/10">
                            Board Advisor
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-[10px] font-bold text-[#07518a]/80 uppercase tracking-wider flex items-center gap-1">
                            Hover to Read Bio
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="card-back bg-gradient-to-br from-[#07518a] to-[#05365c] text-white p-6 flex flex-col justify-between shadow-2xl">
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-white truncate">{advisor.name}</h3>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold text-white/90 uppercase tracking-wider mb-4 border border-white/20">
                          Board Advisor
                        </span>
                        <div className="w-10 h-[2px] bg-white/40 mb-4 rounded-full" />
                        <p className="text-white/90 text-sm leading-relaxed max-h-[220px] overflow-y-auto pr-2 back-bio-scroll">
                          {advisor.bio}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAdvisor(advisor);
                          }}
                          className="text-[10px] font-bold uppercase tracking-wider text-[#07518a] bg-white hover:bg-slate-100 px-4 py-2 rounded-full transition-colors"
                        >
                          Full Bio
                        </button>
                        {advisor.linkedin && (
                          <a
                            href={advisor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-[#0077b5] transition-colors"
                            aria-label={`${advisor.name} LinkedIn`}
                          >
                            <Linkedin size={15} />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ============================================================================
      // OFF-CANVAS SLIDE-IN PANEL (DRAWER)
      // ============================================================================ */}
      <AnimatePresence>
        {selectedAdvisor && (
          <>
            {/* Backdrop lock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAdvisor(null)}
              className="fixed inset-0 z-40 bg-[#07518a]/20 backdrop-blur-[6px]"
            />

            {/* Off-canvas panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white shadow-[0_0_50px_rgba(7,81,138,0.25)] border-l border-[#07518a]/15 z-50 overflow-y-auto flex flex-col"
            >
              {/* Header inside Panel */}
              <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#07518a]">
                  Profile Details
                </span>
                <button
                  onClick={() => setSelectedAdvisor(null)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
                  aria-label="Close panel"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body Content */}
              <div className="p-8 sm:p-10 flex-1 flex flex-col">
                {/* Visual headshot */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-[#07518a]/15 shadow-xl mb-6 flex-shrink-0 bg-[#07518a]/5">
                  <img
                    src={selectedAdvisor.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedAdvisor.name)}&background=07518a&color=fff&size=256`}
                    alt={selectedAdvisor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Meta details */}
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07518a] tracking-tight leading-tight mb-2">
                    {selectedAdvisor.name}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#07518a]/5 text-[10px] font-bold text-[#07518a] uppercase tracking-wider border border-[#07518a]/10">
                    Board Advisor
                  </span>
                </div>

                {/* Divider line */}
                <div className="w-16 h-[3px] bg-[#07518a]/35 rounded-full mb-6" />

                {/* Biography details */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 flex-1">
                  {selectedAdvisor.bio}
                </p>

                {/* CTAs */}
                {selectedAdvisor.linkedin && (
                  <a
                    href={selectedAdvisor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full text-white bg-[#0077b5] hover:bg-[#006097] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#0077b5]/10 mt-auto"
                  >
                    <Linkedin size={16} />
                    <span>Connect on LinkedIn</span>
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
