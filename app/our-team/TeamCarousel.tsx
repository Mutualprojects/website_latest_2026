"use client";
import { useState, useEffect, useCallback, TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

// ==================== CONFIG ====================
// Default `/strapi` is rewritten in next.config.ts to the real Strapi host so HTTPS sites
// do not block http:// API calls (mixed content). Override with NEXT_PUBLIC_STRAPI_URL if needed.
const STRAPI_LEGACY_HTTP = "/cms-api";
const STRAPI_BASE = "/strapi";
// Use pagination[pageSize]=100 to retrieve all members (currently 32) in one request.
// Sorted by the 'order' field and image populated.
const API_URL = `${STRAPI_BASE}/api/members?sort=order&populate=image&pagination[pageSize]=100`;

// ==================== TYPES ====================
interface StrapiImage {
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

interface ApiMember {
  id: number;
  tittle: string;           // name
  designation: string;
  About: string;            // bio
  linkdin: string | null;   // linkedin URL (note the spelling)
  order: number;
  image?: StrapiImage | null;
}

export type OrgPerson = {
  id: number;
  name: string;
  designation: string;
  bio: string;
  linkedin?: string;
  photo: string; // original (full‑size) image URL, or fallback
};

type CardPosition =
  | "center"
  | "left-1"
  | "left-2"
  | "right-1"
  | "right-2"
  | "hidden";

// ==================== HELPER ====================
function buildImageUrl(image?: StrapiImage | null): string {
  if (!image || !image.url) return "";
  const url = image.url;
  if (url.startsWith("http")) {
    if (url.startsWith(STRAPI_LEGACY_HTTP)) {
      return `${STRAPI_BASE}${url.slice(STRAPI_LEGACY_HTTP.length)}`;
    }
    return url;
  }
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${STRAPI_BASE}${path}`;
}

// ==================== COMPONENT ====================
const TeamCarousel = () => {
  const [teamMembers, setTeamMembers] = useState<OrgPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false);

  const minSwipeDistance = 50;

  // ========== DATA FETCHING ==========
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMembers() {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        const members: ApiMember[] = json?.data;
        if (!Array.isArray(members)) throw new Error("Invalid API response");

        const transformed: OrgPerson[] = members.map((m) => ({
          id: m.id,
          name: m.tittle,
          designation: m.designation,
          bio: m.About,
          linkedin: m.linkdin || undefined,
          photo: buildImageUrl(m.image),
        }));

        setTeamMembers(transformed);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
    return () => controller.abort();
  }, []);

  // ========== CAROUSEL LOGIC ==========
  const getCardPosition = useCallback(
    (index: number): CardPosition => {
      if (!teamMembers.length) return "hidden";
      const offset =
        (index - currentIndex + teamMembers.length) % teamMembers.length;

      if (offset === 0) return "center";
      if (offset === 1) return "right-1";
      if (offset === 2) return "right-2";
      if (offset === teamMembers.length - 1) return "left-1";
      if (offset === teamMembers.length - 2) return "left-2";
      return "hidden";
    },
    [currentIndex, teamMembers.length]
  );

  const getCardTransform = (position: CardPosition): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: "absolute",
      transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    };

    const transforms: Record<CardPosition, React.CSSProperties> = {
      center: {
        transform: "scale(1.1) translateZ(0)",
        zIndex: 40,
        opacity: 1,
        filter: "grayscale(0%)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      },
      "left-1": {
        transform: "translateX(-280px) scale(0.9) translateZ(-100px)",
        zIndex: 30,
        opacity: 0.9,
        filter: "grayscale(100%)",
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3)",
      },
      "left-2": {
        transform: "translateX(-500px) scale(0.8) translateZ(-300px)",
        zIndex: 20,
        opacity: 0.7,
        filter: "grayscale(100%)",
        boxShadow: "0 15px 30px -12px rgba(0, 0, 0, 0.2)",
      },
      "right-1": {
        transform: "translateX(280px) scale(0.9) translateZ(-100px)",
        zIndex: 30,
        opacity: 0.9,
        filter: "grayscale(100%)",
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3)",
      },
      "right-2": {
        transform: "translateX(500px) scale(0.8) translateZ(-300px)",
        zIndex: 20,
        opacity: 0.7,
        filter: "grayscale(100%)",
        boxShadow: "0 15px 30px -12px rgba(0, 0, 0, 0.2)",
      },
      hidden: {
        opacity: 0,
        pointerEvents: "none" as const,
        zIndex: 10,
        transform: "scale(0.7)",
      },
    };

    return { ...baseStyles, ...transforms[position] };
  };

  const handleNext = useCallback(() => {
    if (isAnimating || !teamMembers.length) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, teamMembers.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating || !teamMembers.length) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
    );
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, teamMembers.length]);

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex || !teamMembers.length) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setShowFullBio(false);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setShowFullBio(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoPlay && teamMembers.length > 0) {
      interval = setInterval(() => {
        handleNext();
      }, 6000);
    }

    return () => clearInterval(interval);
  }, [autoPlay, handleNext, teamMembers.length]);

  // ========== LOADING / ERROR ==========
  if (loading) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Loading Team
          </p>
        </div>
      </div>
    );
  }

  if (error || !teamMembers.length) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <p className="text-sm text-red-500">
          {error ?? "No team members available"}
        </p>
      </div>
    );
  }

  const currentMember = teamMembers[currentIndex];

  // ========== RENDER ==========
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden py-8 px-4"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <h1
          className="text-7xl md:text-9xl font-black text-center uppercase tracking-tighter pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8, 42, 123, 0.35) 30%, rgba(255, 255, 255, 0) 76%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Our Team
        </h1>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-blue-900 to-transparent"></div>
      </motion.div>

      {/* Stats (static) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-6 mt-8 mb-4"
      >
        <div className="text-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-blue-900">
            {teamMembers.length}+
          </div>
          <div className="text-sm text-gray-600">members</div>
        </div>
        <div className="text-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-blue-900">100+</div>
          <div className="text-sm text-gray-600">years combined experience</div>
        </div>
        <div className="text-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-blue-900">15+</div>
          <div className="text-sm text-gray-600">Departments</div>
        </div>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-7xl h-[500px] mt-8 md:mt-12 perspective-1000">
        {/* Navigation Arrows */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 text-blue-900 flex items-center justify-center text-2xl font-bold shadow-2xl hover:bg-white transition-all border border-blue-200"
          aria-label="Previous team member"
        >
          ‹
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 text-blue-900 flex items-center justify-center text-2xl font-bold shadow-2xl hover:bg-white transition-all border border-blue-200"
          aria-label="Next team member"
        >
          ›
        </motion.button>

        {/* Carousel Track */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            {teamMembers.map((member, index) => {
              const position = getCardPosition(index);
              const transformStyle = getCardTransform(position);

              if (position === "hidden") return null;

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: transformStyle.opacity,
                    scale: position === "center" ? 1.1 : 0.8,
                    x: transformStyle.transform?.toString().includes("translateX")
                      ? parseFloat(
                          transformStyle.transform
                            .toString()
                            .match(/translateX\(([-\d.]+)px\)/)?.[1] || "0"
                        )
                      : 0,
                    z: transformStyle.zIndex,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden cursor-pointer border-4 border-white"
                  style={transformStyle}
                  onClick={() => handleDotClick(index)}
                >
                  <div className="relative w-full h-full group">
                    {/* Image with gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <img
                      src={
                        member.photo ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member.name
                        )}&background=082A7B&color=fff&size=256`
                      }
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-800 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member.name
                        )}&background=082A7B&color=fff&size=256`;
                      }}
                    />

                    {/* Overlay info */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-blue-200 mb-3">
                        {member.designation}
                      </p>
                      <div className="flex items-center gap-2">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <FaLinkedin className="text-white text-lg" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Center card indicator */}
                    {position === "center" && (
                      <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-green-500 animate-pulse z-30"></div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Member Info Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl mt-12 px-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="md:flex">
              {/* Left side - Profile */}
              <div className="md:w-1/3 bg-gradient-to-br from-blue-900 to-blue-700 p-8 text-white">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 mb-4">
                    <img
                      src={
                        currentMember.photo ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          currentMember.name
                        )}&background=fff&color=082A7B&size=256`
                      }
                      alt={currentMember.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          currentMember.name
                        )}&background=fff&color=082A7B&size=256`;
                      }}
                    />
                  </div>
                  <motion.h2
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold text-center mb-2"
                  >
                    {currentMember.name}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ delay: 0.2 }}
                    className="text-blue-200 text-center text-sm font-medium mb-6"
                  >
                    {currentMember.designation}
                  </motion.p>

                  {currentMember.linkedin && (
                    <a
                      href={currentMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                    >
                      <FaLinkedin className="text-xl" />
                      <span>View LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right side - Bio */}
              <div className="md:w-2/3 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <FaQuoteLeft className="text-blue-900 text-xl" />
                  <h3 className="text-lg font-semibold text-blue-900">
                    Professional Profile
                  </h3>
                  <FaQuoteRight className="text-blue-900 text-xl ml-auto" />
                </div>

                <div
                  className={`text-gray-700 leading-relaxed ${
                    !showFullBio ? "max-h-48 overflow-hidden" : ""
                  }`}
                >
                  <p>{currentMember.bio}</p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="text-blue-900 hover:text-blue-700 font-medium flex items-center gap-2"
                  >
                    {showFullBio ? "Show Less" : "Read Full Bio"}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        showFullBio ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div className="text-sm text-gray-500">
                    {currentIndex + 1} / {teamMembers.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-4xl">
        {teamMembers.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-900 scale-125"
                : "bg-blue-900/20 hover:bg-blue-900/40"
            }`}
            aria-label={`Go to ${teamMembers[index].name}`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Auto-rotate</span>
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              autoPlay ? "bg-blue-900" : "bg-gray-300"
            }`}
            aria-label={autoPlay ? "Pause auto rotation" : "Start auto rotation"}
          >
            <motion.div
              className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
              animate={{ x: autoPlay ? 36 : 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </button>
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <span>‹</span>
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            Next
            <span>›</span>
          </motion.button>
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center text-sm text-gray-500 space-y-1"
      >
        <p className="flex items-center justify-center gap-2">
          <span className="hidden md:inline">← →</span>
          <span>Use arrows, swipe, or click dots to navigate</span>
        </p>
        <p>Click on any team member card to select</p>
      </motion.div>
    </div>
  );
};

export default TeamCarousel;