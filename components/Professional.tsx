"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Award,
  Search,
  Grid,
  List,
  Sparkles,
  ArrowUpDown,
  SlidersHorizontal,
  Check,
  Tag,
  Images,
  ZoomIn,
  ChevronDown,
  Layers,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// BRAND
// ─────────────────────────────────────────────────────────────
const BRAND = "#07518a";
const BRAND_LIGHT = "#0a6ab8";
const BRAND_GRADIENT = `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_LIGHT} 100%)`;
const IK_BASE = "https://ik.imagekit.io/waxuvuasch/Eventimages";
const PLACEHOLDER = "https://via.placeholder.com/600x450/e2e8f0/64748b?text=Photo";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface Event {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  date: string;
  featured?: boolean;
  tags?: string[];
}

type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc";
type ViewMode = "grid" | "list";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const EVENTS: Event[] = [

   {
  id: "Times power Women 2026",
  title: "Times Power Women 2026",
  description:
    "Brihaspathi supports Times Power Women 2026, celebrating leadership and empowerment.",
  images: [
"https://ik.imagekit.io/tsuss6ulm/Times%20Power%20Women/1.png",
"https://ik.imagekit.io/tsuss6ulm/Times%20Power%20Women/2.png",

  ],
  category: "expo",
  date: "2026-05-20", // Updated to current date
  featured: true,
  tags: ["AI", "IoT",  "Innovation", "TechIntelligence"],
},

   {
  id: "Tech Maha Impact",
  title: "Tech Maha Impact",
  description:
    "Proudly showcased innovative automation solutions, strengthening partnerships and industry presence.",
  images: [
"https://ik.imagekit.io/tsuss6ulm/Tech%20Maha%20Impact/IMG_4570.JPG.jpeg",
"https://ik.imagekit.io/tsuss6ulm/Tech%20Maha%20Impact/IMG_4628.JPG.jpeg",
"https://ik.imagekit.io/tsuss6ulm/Tech%20Maha%20Impact/IMG_4629.JPG.jpeg",
"https://ik.imagekit.io/tsuss6ulm/Tech%20Maha%20Impact/4K6A3671.JPG"
  ],
  category: "expo",
  date: "2026-05-20", // Updated to current date
  featured: true,
  tags: ["AI", "IoT",  "Innovation", "TechIntelligence"],
},

 {
  id: "Smart Home Expo",
  title: "Smart Home Expo 2026 mumbai",
  description:
    "Successful Mumbai expo participation highlighting innovation, technology, and partnerships",
  images: [
    "https://ik.imagekit.io/tsuss6ulm/Smart%20Home%20expo/3.png",
    "https://ik.imagekit.io/tsuss6ulm/Smart%20Home%20expo/2.png",
"https://ik.imagekit.io/tsuss6ulm/Smart%20Home%20expo/1.png"
  ],
  category: "expo",
  date: "2026-04-29", // Updated to current date
  featured: true,
  tags: ["AI", "IoT",  "Innovation", "TechIntelligence"],
},



  {
  id: "office-inauguration-2026",
  title: "New Office Space Inauguration",
  description:
    "Stepping into the future with our new state-of-the-art workspace, fully integrated with IoT and AI software intelligence systems to redefine productivity and innovation.",
  images: [
    "https://ik.imagekit.io/tsuss6ulm/New%20Office%20Images/5.png",
    "https://ik.imagekit.io/tsuss6ulm/New%20Office%20Images/6.png",
    "https://ik.imagekit.io/tsuss6ulm/New%20Office%20Images/7.png",
    "https://ik.imagekit.io/tsuss6ulm/New%20Office%20Images/8.png",
  ],
  category: "Milestone",
  date: "2026-04-08", // Updated to current date
  featured: true,
  tags: ["AI", "IoT", "SmartOffice", "Innovation", "TechIntelligence"],
},
  {
    id: "womens-day-2026",
    title: "Women's Day 2026",
    description:
      "May you always have the courage to choose yourself, the strength to follow your heart, and the grace to handle the journey.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/Womens%20day%202026/4.png",
      "https://ik.imagekit.io/tsuss6ulm/Womens%20day%202026/2.png",
      "https://ik.imagekit.io/tsuss6ulm/Womens%20day%202026/1.png",
      "https://ik.imagekit.io/tsuss6ulm/Womens%20day%202026/3.png",
    ],
    category: "Special Day",
    date: "2026-03-08",
    featured: true,
    tags: ["empowerment", "celebration", "team"],
  },
  {
    id: "independence-day",
    title: "Independence Day Celebrations",
    description:
      "A proud moment celebrating the spirit of freedom and patriotism. The Brihaspathi family united to honor our nation through flag hoisting, cultural events, and heartfelt tributes.",
    images: [
      `${IK_BASE}/Independencday%20Celebrations/1.jpeg`,
      `${IK_BASE}/Independencday%20Celebrations/2.jpeg`,
      `${IK_BASE}/Independencday%20Celebrations/3.jpeg`,
    ],
    category: "National",
    date: "2025-08-15",
    tags: ["patriotism", "culture", "tradition"],
  },
  {
    id: "conference-photos",
    title: "Conference Room Group Photos",
    description:
      "Moments from our internal meetings and brainstorming sessions — where ideas come alive and innovation takes shape.",
    images: [
      `${IK_BASE}/Conference%20room%20Group%20photos/WhatsApp%20Image%202025-09-16%20at%2014.43.05.jpeg`,
      `${IK_BASE}/Conference%20room%20Group%20photos/WhatsApp%20Image%202025-09-16%20at%2014.43.04.jpeg`,
    ],
    category: "Corporate",
    date: "2025-09-16",
    tags: ["meeting", "collaboration", "innovation"],
  },
  {
    id: "vinayaka-2025",
    title: "Vinayaka Chaturthi Celebrations 2025",
    description:
      "Brihaspathi Technologies celebrated Ganesh Chaturthi with devotion, prayers, and festive togetherness.",
    images: [
      `${IK_BASE}/Vinayaka%20Chaturthi%20Celebrations%20-%202025/1.jpeg`,
      `${IK_BASE}/Vinayaka%20Chaturthi%20Celebrations%20-%202025/2.jpeg`,
      `${IK_BASE}/Vinayaka%20Chaturthi%20Celebrations%20-%202025/3.jpeg`,
    ],
    category: "Festival",
    date: "2025-08-27",
    tags: ["festival", "tradition", "devotion"],
  },
  {
    id: "health-campaign",
    title: "Health Campaign",
    description:
      "Promoting healthy living through awareness, fitness, and preventive care.",
    images: [
      `${IK_BASE}/Health%20Campign/1.jpg`,
      `${IK_BASE}/Health%20Campign/2.jpg`,
      `${IK_BASE}/Health%20Campign/3.jpg`,
      `${IK_BASE}/Health%20Campign/4.jpg`,
    ],
    category: "Wellness",
    date: "2025-07-10",
    tags: ["health", "wellness", "awareness"],
  },
  {
    id: "mothers-day",
    title: "Mother's Day Celebration",
    description:
      "Celebrating the strength, love, and warmth of mothers with gratitude.",
    images: [
      `${IK_BASE}/Mother's%20day%20Celebration/1.jpeg`,
      `${IK_BASE}/Mother's%20day%20Celebration/2.jpeg`,
      `${IK_BASE}/Mother's%20day%20Celebration/3.jpeg`,
    ],
    category: "Special Day",
    date: "2025-05-11",
    tags: ["family", "gratitude", "celebration"],
  },
  {
    id: "awards",
    title: "Awards & Recognition",
    description:
      "Highlight moments from award ceremonies and recognitions celebrating excellence.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/Awards/1.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Awards/4.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Awards/5.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Awards/2.jpg",
    ],
    category: "Achievement",
    date: "2025-12-20",
    featured: true,
    tags: ["recognition", "excellence", "achievement"],
  },
  {
    id: "fathers-day",
    title: "Father's Day",
    description:
      "Celebrating the role of fathers with special moments and tributes.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/3.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/7.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/5.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/4.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/6.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/1.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/2.jpeg",
    ],
    category: "Special Day",
    date: "2025-06-15",
    tags: ["family", "appreciation", "celebration"],
  },
  {
    id: "womens-day",
    title: "Women's Day",
    description:
      "Honoring and celebrating women at Brihaspathi with empowerment and recognition.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/Womensday/4.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Womensday/6.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Womensday/3.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Womensday/5.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Womensday/2.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Womensday/1.jpeg",
    ],
    category: "Special Day",
    date: "2025-03-08",
    tags: ["empowerment", "women", "celebration"],
  },
  {
    id: "credai-expo",
    title: "Credai Expo",
    description:
      "Highlights from our participation at major expo events showcasing innovation.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/EXPO/CredaiExpo/4.jpg",
      "https://ik.imagekit.io/tsuss6ulm/EXPO/CredaiExpo/2.jpg",
      "https://ik.imagekit.io/tsuss6ulm/EXPO/CredaiExpo/3.jpg",
      "https://ik.imagekit.io/tsuss6ulm/EXPO/CredaiExpo/5.jpg",
    ],
    category: "Expo",
    date: "2025-11-05",
    tags: ["expo", "business", "networking"],
  },
  {
    id: "delhi-expo",
    title: "Delhi Expo",
    description:
      "Highlights from our participation at the prestigious Delhi expo.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/EXPO/DelhiExpo/1.JPG",
      "https://ik.imagekit.io/tsuss6ulm/EXPO/DelhiExpo/2.JPG",
      "https://ik.imagekit.io/tsuss6ulm/EXPO/DelhiExpo/3.JPG",
    ],
    category: "Expo",
    date: "2025-10-22",
    tags: ["expo", "delhi", "showcase"],
  },
  {
    id: "mens-day",
    title: "Men's Day",
    description:
      "Capturing the essence of Men's Day celebration with team spirit.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/New%20Compressed%20(zipped)%20Folder/3.JPG",
      "https://ik.imagekit.io/tsuss6ulm/New%20Compressed%20(zipped)%20Folder/5.JPG",
      "https://ik.imagekit.io/tsuss6ulm/New%20Compressed%20(zipped)%20Folder/2.JPG",
      "https://ik.imagekit.io/tsuss6ulm/New%20Compressed%20(zipped)%20Folder/4.JPG",
      "https://ik.imagekit.io/tsuss6ulm/New%20Compressed%20(zipped)%20Folder/6.JPG",
    ],
    category: "Special Day",
    date: "2025-11-19",
    tags: ["team", "celebration", "appreciation"],
  },
  {
    id: "diwali",
    title: "Diwali Celebrations",
    description:
      "Diwali celebrations full of lights, joy, and festive spirit across offices.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/D/3.JPG",
      "https://ik.imagekit.io/tsuss6ulm/D/4.JPG",
      "https://ik.imagekit.io/tsuss6ulm/D/2.JPG",
      "https://ik.imagekit.io/tsuss6ulm/D/6.JPG",
    ],
    category: "Festival",
    date: "2025-10-20",
    tags: ["festival", "lights", "tradition"],
  },
  {
    id: "tree-plantation",
    title: "Tree Plantation Drive",
    description:
      "Brihaspathi's green initiative — planting trees and nurturing the environment together.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/Tree%20Plantation/67.jpg?updatedAt=1770960427608",
      "https://ik.imagekit.io/tsuss6ulm/Tree%20Plantation/68.jpg?updatedAt=1770960427566",
      "https://ik.imagekit.io/tsuss6ulm/Tree%20Plantation/32.jpg?updatedAt=1770960427535",
      "https://ik.imagekit.io/tsuss6ulm/Tree%20Plantation/35.jpg?updatedAt=1770960427498",
    ],
    category: "Initiative",
    date: "2025-07-05",
    featured: true,
    tags: ["sustainability", "green", "environment"],
  },
  {
    id: "wild-waters",
    title: "Wild Waters Outing",
    description: "Team outing at Wild Waters — fun, bonding, and memorable moments.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/wild%20waters/26.jpg",
      "https://ik.imagekit.io/tsuss6ulm/wild%20waters/20.jpg",
      "https://ik.imagekit.io/tsuss6ulm/wild%20waters/28.jpg",
    ],
    category: "Team",
    date: "2025-06-28",
    tags: ["outing", "fun", "team-building"],
  },
  {
    id: "btl-gallery",
    title: "BTL Heritage Gallery",
    description:
      "A glimpse into Brihaspathi's journey — cherished moments and memories from over the years.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/20230329182143_IMG_8851.JPG",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/20230329182127_IMG_8850.JPG",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG-20210406-WA0100.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG-20210406-WA0087.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG-20210401-WA0101.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG_2388.JPG",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG_2387.JPG",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG-20170121-WA0035.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG-20170121-WA0010.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/WhatsApp%20Image%202026-02-13%20at%2011.49.02.jpeg",
    ],
    category: "Gallery",
    date: "2025-01-15",
    tags: ["heritage", "memories", "journey"],
  },
];

// ─────────────────────────────────────────────────────────────
// CATEGORY COLOR MAP
// ─────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Special Day": { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-400" },
  National: { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-400" },
  Corporate: { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-400" },
  Festival: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  Wellness: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-400" },
  Achievement: { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-400" },
  Expo: { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-400" },
  Initiative: { bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-400" },
  Team: { bg: "bg-cyan-50", text: "text-cyan-700", dot: "bg-cyan-400" },
  Gallery: { bg: "bg-slate-50", text: "text-slate-700", dot: "bg-slate-400" },
};

function getCategoryStyle(cat: string) {
  return (
    CATEGORY_COLORS[cat] ?? {
      bg: "bg-blue-50",
      text: "text-blue-700",
      dot: "bg-blue-400",
    }
  );
}

// ─────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function useKeyboard(
  onNext: () => void,
  onPrev: () => void,
  onClose: () => void,
  active: boolean
) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); onNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); onPrev(); }
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, onPrev, onClose, active]);
}

// ─────────────────────────────────────────────────────────────
// TILT CARD WRAPPER
// ─────────────────────────────────────────────────────────────
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// ACTIVE FILTER PILL
// ─────────────────────────────────────────────────────────────
function ActivePill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200"
    >
      {label}
      <button
        onClick={onRemove}
        className="w-4 h-4 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-2.5 h-2.5" />
      </button>
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────
// FILTER PANEL (Desktop Sidebar + Mobile Bottom Sheet)
// ─────────────────────────────────────────────────────────────
interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  categoryData: { name: string; count: number }[];
  activeCategories: Set<string>;
  onCategoryToggle: (cat: string) => void;
  allTags: string[];
  activeTags: Set<string>;
  onTagToggle: (tag: string) => void;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
  hasActiveFilters: boolean;
  onClearAll: () => void;
  isMobile: boolean;
}

function FilterPanel({
  isOpen,
  onClose,
  categoryData,
  activeCategories,
  onCategoryToggle,
  allTags,
  activeTags,
  onTagToggle,
  sortBy,
  onSortChange,
  hasActiveFilters,
  onClearAll,
  isMobile,
}: FilterPanelProps) {
  const sortOptions: { value: SortOption; label: string; icon: string }[] = [
    { value: "date-desc", label: "Newest First", icon: "↓" },
    { value: "date-asc", label: "Oldest First", icon: "↑" },
    { value: "title-asc", label: "Title A → Z", icon: "A" },
    { value: "title-desc", label: "Title Z → A", icon: "Z" },
  ];

  const panelContent = (
    <div className="flex flex-col h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: BRAND_GRADIENT }}>
            <SlidersHorizontal className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Filters</p>
            <p className="text-xs text-gray-400">Refine your results</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-red-500 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
            >
              Reset all
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Close filters"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-7">

        {/* Sort */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort by
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all ${
                  sortBy === opt.value
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center flex-shrink-0 ${
                    sortBy === opt.value ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {opt.icon}
                </span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            Category
          </h4>
          <div className="space-y-1.5">
            {categoryData.map((cat) => {
              const style = cat.name === "All" ? null : getCategoryStyle(cat.name);
              const isActive =
                activeCategories.has(cat.name) ||
                (cat.name === "All" && activeCategories.size === 0);
              return (
                <button
                  key={cat.name}
                  onClick={() => onCategoryToggle(cat.name)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all border-2 ${
                    isActive
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-transparent bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {style ? (
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${style.dot}`} />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-gradient-to-br from-blue-400 to-purple-400" />
                    )}
                    {cat.name}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? "bg-blue-200 text-blue-700" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" />
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const isActive = activeTags.has(tag);
                return (
                  <motion.button
                    key={tag}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onTagToggle(tag)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${
                      isActive
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-blue-600"
                    }`}
                  >
                    {isActive && <Check className="w-3 h-3" />}
                    #{tag}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    // Bottom Sheet
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col"
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1.5 rounded-full bg-gray-300" />
              </div>
              {panelContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop Slide-out Sidebar
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-30"
          />
          <motion.aside
            key="sidebar"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-40 flex flex-col border-l border-gray-100"
          >
            {panelContent}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// EVENT CARD – GRID
// ─────────────────────────────────────────────────────────────
interface CardProps {
  event: Event;
  index: number;
  onOpen: (event: Event, idx: number) => void;
  onTagClick: (tag: string) => void;
}

function GridCard({ event, index, onOpen, onTagClick }: CardProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const catStyle = getCategoryStyle(event.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.07, 0.5), type: "spring", stiffness: 100, damping: 14 }}
    >
      <TiltCard className="h-full">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-500 overflow-hidden border border-gray-100 h-full flex flex-col group">

          {/* Image */}
          <div
            className="aspect-[16/10] relative cursor-pointer overflow-hidden bg-gray-100"
            onClick={() => onOpen(event, 0)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onOpen(event, 0)}
            aria-label={`View gallery for ${event.title}`}
          >
            {!loaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            )}
            <img
              src={errored ? PLACEHOLDER : event.images[0]}
              alt={event.title}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => { setErrored(true); setLoaded(true); }}
            />

            {/* Hover glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="flex items-center gap-2 text-white text-sm font-semibold">
                <ZoomIn className="w-4 h-4" />
                View {event.images.length} Photos
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
              {event.featured ? (
                <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow flex items-center gap-1">
                  <Award className="w-3 h-3" /> Featured
                </span>
              ) : <span />}
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${catStyle.bg} ${catStyle.text} border border-white/70 shadow-sm`}>
                {event.category}
              </span>
            </div>

            {/* Photo count pill */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Images className="w-3.5 h-3.5" />
              {event.images.length}
            </div>
          </div>

          {/* Body */}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-blue-700 transition-colors line-clamp-1">
              {event.title}
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
              {event.description}
            </p>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {event.tags.slice(0, 3).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagClick(tag)}
                    className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            {/* Footer row */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>

              {/* Thumbnails */}
              <div className="flex -space-x-1.5">
                {event.images.slice(0, 3).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => onOpen(event, i)}
                    className="w-7 h-7 rounded-full overflow-hidden border-2 border-white hover:z-10 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label={`Open image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
                    />
                  </button>
                ))}
                {event.images.length > 3 && (
                  <button
                    onClick={() => onOpen(event, 3)}
                    className="w-7 h-7 rounded-full bg-blue-600 text-white text-[9px] font-bold border-2 border-white flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all focus:outline-none"
                    aria-label="View more images"
                  >
                    +{event.images.length - 3}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────
// EVENT CARD – LIST
// ─────────────────────────────────────────────────────────────
function ListCard({ event, index, onOpen, onTagClick }: CardProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const catStyle = getCategoryStyle(event.category);

  return (
    <motion.article
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.06, 0.4), type: "spring", stiffness: 110, damping: 16 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-400 overflow-hidden border border-gray-100 group"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div
          className="sm:w-52 md:w-60 h-48 sm:h-auto flex-shrink-0 relative cursor-pointer overflow-hidden bg-gray-100"
          onClick={() => onOpen(event, 0)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onOpen(event, 0)}
          aria-label={`View gallery for ${event.title}`}
        >
          {!loaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
          )}
          <img
            src={errored ? PLACEHOLDER : event.images[0]}
            alt={event.title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => { setErrored(true); setLoaded(true); }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
            <span className="text-white text-xs font-semibold flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" /> {event.images.length} Photos
            </span>
          </div>
          {event.featured && (
            <div className="absolute top-2.5 left-2.5">
              <span className="px-2 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold shadow flex items-center gap-1">
                <Award className="w-2.5 h-2.5" /> Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
            <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors flex-1 min-w-0 truncate">
              {event.title}
            </h3>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ${catStyle.bg} ${catStyle.text}`}>
              {event.category}
            </span>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
            {event.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {event.images.length} Photos
            </span>
          </div>

          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {event.tags.slice(0, 4).map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-1.5">
            {event.images.slice(0, 5).map((img, i) => (
              <button
                key={i}
                onClick={() => onOpen(event, i)}
                className="w-10 h-10 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-400 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={`View image ${i + 1}`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
                />
              </button>
            ))}
            {event.images.length > 5 && (
              <button
                onClick={() => onOpen(event, 5)}
                className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors focus:outline-none flex items-center justify-center"
              >
                +{event.images.length - 5}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────
interface LightboxProps {
  event: Event | null;
  imageIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (i: number) => void;
}

function Lightbox({ event, imageIndex, onClose, onNext, onPrev, onSelect }: LightboxProps) {
  useKeyboard(onNext, onPrev, onClose, !!event);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? onNext() : onPrev();
    }
    touchStartX.current = null;
  }

  if (!event) return null;

  const lightboxPlaceholder = "https://via.placeholder.com/1200x800/1e293b/94a3b8?text=Image+Unavailable";

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/95 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={`Photo gallery: ${event.title}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 bg-gradient-to-b from-black/60 to-transparent absolute top-0 left-0 right-0 z-10">
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base leading-tight">{event.title}</h3>
            <p className="text-gray-400 text-xs flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3 h-3" />
              {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm hidden sm:block">
              {imageIndex + 1} / {event.images.length}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Main Image Area */}
        <div className="flex-1 flex items-center justify-center relative px-14 sm:px-20 py-16">
          {/* Prev */}
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.93 }}
            onClick={onPrev}
            disabled={event.images.length <= 1}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </motion.button>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={imageIndex}
              src={event.images[imageIndex] ?? lightboxPlaceholder}
              alt={`${event.title} — photo ${imageIndex + 1}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl select-none"
              style={{ maxHeight: "calc(100vh - 200px)" }}
              onError={(e) => { (e.target as HTMLImageElement).src = lightboxPlaceholder; }}
              draggable={false}
            />
          </AnimatePresence>

          {/* Next */}
          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.93 }}
            onClick={onNext}
            disabled={event.images.length <= 1}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </motion.button>

          {/* Mobile counter */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center sm:hidden">
            <span className="px-3 py-1 rounded-full bg-black/50 text-white text-xs font-semibold">
              {imageIndex + 1} / {event.images.length}
            </span>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="bg-black/40 backdrop-blur-sm border-t border-white/10 px-4 py-3">
          <div className="flex gap-2 justify-center overflow-x-auto pb-0.5 max-w-5xl mx-auto">
            {event.images.map((img, i) => (
              <motion.button
                key={i}
                onClick={() => onSelect(i)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all focus:outline-none ${
                  i === imageIndex
                    ? "border-white scale-105 shadow-lg shadow-white/20"
                    : "border-transparent opacity-60 hover:opacity-90 hover:border-white/40"
                }`}
                style={{ width: 56, height: 56 }}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === imageIndex ? "true" : undefined}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = lightboxPlaceholder; }}
                />
              </motion.button>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-1.5 mt-2">
            {event.images.map((_, i) => (
              <button
                key={i}
                onClick={() => onSelect(i)}
                className={`rounded-full transition-all ${
                  i === imageIndex ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
const EventsShowcase: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchEvents() {
      try {
        const res = await fetch("/strapi/api/events?populate=*");
        if (!res.ok) throw new Error("Failed to fetch events");
        const json = await res.json();
        if (active && json.data) {
          const fetchedEvents: Event[] = json.data.map((item: any) => {
            const mainImg = item.mainImage?.url ? `/strapi${item.mainImage.url}` : "";
            const galleryImgs = item.eventGallery?.map((g: any) => `/strapi${g.url}`) || [];
            const allImages = mainImg ? [mainImg, ...galleryImgs] : galleryImgs;
            return {
              id: item.documentId || String(item.id),
              title: item.eventTitle || "Untitled",
              description: item.eventDescription || "",
              images: allImages,
              category: item.eventType || "Event",
              date: item.eventDate || new Date().toISOString().split("T")[0],
              featured: false,
              tags: [],
            };
          });
          setEvents(fetchedEvents);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchEvents();
    return () => { active = false; };
  }, []);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const debouncedSearch = useDebouncedValue(searchQuery, 300);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-aware header
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = selectedEvent ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedEvent]);

  const categoryData = useMemo(() => {
    const cats = Array.from(new Set(events.map((e) => e.category)));
    return ["All", ...cats].map((name) => ({
      name,
      count: name === "All" ? events.length : events.filter((e) => e.category === name).length,
    }));
  }, [events]);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    events.forEach((e) => e.tags?.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    let res = [...events];

    if (activeCategories.size > 0 && !activeCategories.has("All")) {
      res = res.filter((e) => activeCategories.has(e.category));
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase().trim();
      res = res.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (activeTags.size > 0) {
      res = res.filter((e) => e.tags?.some((t) => activeTags.has(t)));
    }

    res.sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "date-asc") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

    res.sort((a, b) => (a.featured && !b.featured ? -1 : !a.featured && b.featured ? 1 : 0));
    return res;
  }, [activeCategories, debouncedSearch, sortBy, activeTags]);

  const hasActiveFilters = useMemo(() => {
    const catFiltered = activeCategories.size > 0 && !activeCategories.has("All");
    return catFiltered || debouncedSearch.trim() !== "" || sortBy !== "date-desc" || activeTags.size > 0;
  }, [activeCategories, debouncedSearch, sortBy, activeTags]);

  const activeFilterCount = useMemo(() => {
    let c = 0;
    if (activeCategories.size > 0 && !activeCategories.has("All")) c++;
    if (debouncedSearch.trim()) c++;
    if (sortBy !== "date-desc") c++;
    if (activeTags.size > 0) c++;
    return c;
  }, [activeCategories, debouncedSearch, sortBy, activeTags]);

  const handleCategoryToggle = useCallback((cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (cat === "All") return new Set(["All"]);
      next.delete("All");
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next.size === 0 ? new Set(["All"]) : next;
    });
  }, []);

  const handleTagToggle = useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }, []);

  const openLightbox = useCallback((event: Event, idx: number) => {
    setSelectedEvent(event);
    setSelectedImageIdx(idx);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedEvent(null);
    setSelectedImageIdx(0);
  }, []);

  const nextImage = useCallback(() => {
    setSelectedImageIdx((prev) =>
      selectedEvent ? (prev === selectedEvent.images.length - 1 ? 0 : prev + 1) : prev
    );
  }, [selectedEvent]);

  const prevImage = useCallback(() => {
    setSelectedImageIdx((prev) =>
      selectedEvent ? (prev === 0 ? selectedEvent.images.length - 1 : prev - 1) : prev
    );
  }, [selectedEvent]);

  const clearAll = useCallback(() => {
    setActiveCategories(new Set(["All"]));
    setSearchQuery("");
    setSortBy("date-desc");
    setActiveTags(new Set());
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { font-family: 'DM Sans', system-ui, sans-serif; }
        h1, h2, h3 { font-family: 'Sora', system-ui, sans-serif; }
        .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .thumb-strip::-webkit-scrollbar { height: 4px; }
        .thumb-strip::-webkit-scrollbar-track { background: transparent; }
        .thumb-strip::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 2px; }
        .cat-scroll::-webkit-scrollbar { height: 0px; }
        .search-input::placeholder { color: #a0aec0; }
      `}</style>

      {/* ── HERO ── */}
      <header className="relative overflow-hidden pt-12 pb-10 px-4 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${BRAND} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${BRAND_LIGHT} 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: BRAND_GRADIENT }}
        />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200/60 bg-blue-50/80 mb-5"
            >
              <Sparkles className="w-4 h-4" style={{ color: BRAND }} />
              <span className="text-sm font-semibold text-blue-700">Our Culture & Milestones</span>
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent leading-tight"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              Moments That Matter
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Celebrating achievements, fostering connections, and building the Brihaspathi legacy through shared experiences.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-0 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm divide-x divide-gray-100"
            >
              {[
                { icon: Calendar, label: "Events", value: events.length },
                { icon: Users, label: "Moments", value: "500+" },
                { icon: Award, label: "Awards", value: "50+" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2.5 px-5 py-3">
                  <s.icon className="w-4.5 h-4.5 flex-shrink-0" style={{ color: BRAND }} />
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-400">{s.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ── STICKY TOOLBAR ── */}
      <div
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-200/80"
            : "bg-white/80 backdrop-blur-lg border-b border-gray-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 flex items-center gap-3">

            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, tags…"
                className="search-input w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:border-blue-400 text-sm transition-all"
                style={{ "--tw-ring-color": `${BRAND}33` } as React.CSSProperties}
                aria-label="Search events"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
            </div>

            {/* Sort – desktop only */}
            <div className="relative hidden sm:flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:border-blue-400 text-sm font-medium text-gray-700 cursor-pointer"
                aria-label="Sort events"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="title-asc">A → Z</option>
                <option value="title-desc">Z → A</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilterOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white shadow-md hover:shadow-lg transition-all"
              style={{ background: BRAND_GRADIENT }}
              aria-label="Open filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center shadow"
                >
                  {activeFilterCount}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Category Chip Row */}
          <div className="cat-scroll flex items-center gap-2 overflow-x-auto pb-3">
            {categoryData.map((cat) => {
              const style = cat.name !== "All" ? getCategoryStyle(cat.name) : null;
              const isActive =
                activeCategories.has(cat.name) ||
                (cat.name === "All" && activeCategories.size === 0);
              return (
                <motion.button
                  key={cat.name}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCategoryToggle(cat.name)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border-2 transition-all ${
                    isActive
                      ? "text-white border-transparent shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                  style={isActive ? { background: BRAND_GRADIENT } : {}}
                  aria-pressed={isActive}
                >
                  {style && !isActive && (
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
                  )}
                  {cat.name}
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold min-w-[18px] text-center ${
                      isActive ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Active Filter Pills */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center flex-wrap gap-2 pb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Active:</span>

                  <AnimatePresence>
                    {debouncedSearch.trim() && (
                      <ActivePill
                        key="search"
                        label={`"${debouncedSearch.trim()}"`}
                        onRemove={() => setSearchQuery("")}
                      />
                    )}
                    {Array.from(activeCategories)
                      .filter((c) => c !== "All")
                      .map((cat) => (
                        <ActivePill
                          key={cat}
                          label={cat}
                          onRemove={() => handleCategoryToggle(cat)}
                        />
                      ))}
                    {Array.from(activeTags).map((tag) => (
                      <ActivePill
                        key={tag}
                        label={`#${tag}`}
                        onRemove={() => handleTagToggle(tag)}
                      />
                    ))}
                    {sortBy !== "date-desc" && (
                      <ActivePill
                        key="sort"
                        label={`Sort: ${sortBy}`}
                        onRemove={() => setSortBy("date-desc")}
                      />
                    )}
                  </AnimatePresence>

                  <button
                    onClick={clearAll}
                    className="ml-1 text-xs font-semibold text-red-500 hover:text-red-600 underline underline-offset-2"
                  >
                    Clear all
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gray-100 flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No events found</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={clearAll}
              className="px-6 py-3 rounded-xl font-semibold text-white shadow hover:shadow-lg transition-all"
              style={{ background: BRAND_GRADIENT }}
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <>
            {/* Result count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-bold text-gray-900">{filteredEvents.length}</span> of{" "}
                {EVENTS.length} events
                {hasActiveFilters && (
                  <span className="ml-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    Filtered
                  </span>
                )}
              </p>
            </div>

            {/* Cards */}
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {filteredEvents.map((event, i) => (
                    <GridCard
                      key={event.id}
                      event={event}
                      index={i}
                      onOpen={openLightbox}
                      onTagClick={handleTagToggle}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {filteredEvents.map((event, i) => (
                    <ListCard
                      key={event.id}
                      event={event}
                      index={i}
                      onOpen={openLightbox}
                      onTagClick={handleTagToggle}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="mt-8 py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Want to relive a moment?</h3>
          <p className="text-gray-500 mb-7 text-sm leading-relaxed">
            Browse our complete archive or reach out to the culture team for high-resolution assets and event details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="px-7 py-3.5 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              style={{ background: BRAND_GRADIENT }}
            >
              View Full Archive
            </button>
            <button className="px-7 py-3.5 rounded-xl font-semibold border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors">
              Contact Culture Team
            </button>
          </div>
        </div>
      </footer>

      {/* ── FILTER PANEL ── */}
      <FilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        categoryData={categoryData}
        activeCategories={activeCategories}
        onCategoryToggle={handleCategoryToggle}
        allTags={allTags}
        activeTags={activeTags}
        onTagToggle={handleTagToggle}
        sortBy={sortBy}
        onSortChange={setSortBy}
        hasActiveFilters={hasActiveFilters}
        onClearAll={clearAll}
        isMobile={isMobile}
      />

      {/* ── LIGHTBOX ── */}
      <Lightbox
        event={selectedEvent}
        imageIndex={selectedImageIdx}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        onSelect={setSelectedImageIdx}
      />
    </div>
  );
};

export default EventsShowcase;