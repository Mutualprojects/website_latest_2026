"use client";

import { useEffect, useState, useCallback, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────── */

interface StrapiMedia {
  id: number;
  name: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
  url: string;
  mime: string;
}

interface NewsSection {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title?: string;
  tittle?: string;
  description?: string | null;
  type?: "national" | "state-wide" | null;
  press_icon_text?: string | null;
  image?: StrapiMedia[] | null;
  pdf?: StrapiMedia | null;
  press_icon?: StrapiMedia[] | null;
}

interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/* ─────────────────────────────────────────────────────────────────────
   CONFIG & HELPERS
───────────────────────────────────────────────────────────────────── */

const API_PROXY_PREFIX = "/strapi";
const IMAGE_BASE = API_PROXY_PREFIX;

const buildNewsSectionsUrl = (page: number) =>
  `${API_PROXY_PREFIX}/api/newsections?populate[image][populate]=*&populate[pdf][populate]=*&populate[press_icon][populate]=*&pagination[page]=${page}&pagination[pageSize]=25`;

const fetchNewsSections = async (page: number, signal?: AbortSignal) => {
  const url = buildNewsSectionsUrl(page);
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  return await response.json();
};

// Utility to flatten Strapi v4 nested responses (removes `data` and `attributes` wrappers)
const flattenStrapi = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(flattenStrapi);
  if (typeof obj === "object") {
    if ("data" in obj) return flattenStrapi(obj.data);
    if ("attributes" in obj) return { id: obj.id, ...flattenStrapi(obj.attributes) };
    const result: any = {};
    for (const key in obj) result[key] = flattenStrapi(obj[key]);
    return result;
  }
  return obj;
};

const cdn = (path?: string | null): string =>
  !path ? "" : path.startsWith("http") ? path : `${IMAGE_BASE}${path}`;

// Original quality for drawer - no compression
const originalOf = (item: NewsSection): string => {
  const img = item.image?.[0];
  if (!img) return "";
  return cdn(img.url);
};

// Card thumbnails - use large format
const thumbOf = (item: NewsSection): string => {
  const img = item.image?.[0];
  if (!img) return "";
  return cdn(img.formats?.large?.url ?? img.formats?.medium?.url ?? img.url);
};

const getPressIcon = (item: NewsSection): { src?: string; text?: string } => {
  const icon = item.press_icon?.[0];
  if (icon?.url) return { src: cdn(icon.url) };

  const text = item.press_icon_text?.trim();
  if (!text) return {};

  if (/^(https?:\/\/|\/\/|\/uploads\/|uploads\/)/i.test(text)) {
    const src = text.startsWith("http") || text.startsWith("//")
      ? text
      : text.startsWith("/")
      ? `${IMAGE_BASE}${text}`
      : `${IMAGE_BASE}/${text}`;
    return { src };
  }

  return { text };
};

const sortNationalFirst = (items: NewsSection[]): NewsSection[] =>
  [...items].sort((a, b) => {
    const rank = (t?: string | null) => (t === "national" ? 0 : 1);
    if (rank(a.type) !== rank(b.type)) return rank(a.type) - rank(b.type);
    return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();
  });

/* ─────────────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────────────── */

const Ico = {
  Globe: () => (
    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="10" cy="10" r="8" />
      <line x1="2" y1="10" x2="18" y2="10" />
      <path d="M10 2a15 15 0 0 1 4 8 15 15 0 0 1-4 8 15 15 0 0 1-4-8 15 15 0 0 1 4-8z" />
    </svg>
  ),
  MapPin: () => (
    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <polygon points="1 6 1 19 7 16 13 19 19 16 19 3 13 6 7 3 1 6" />
      <line x1="7" y1="3" x2="7" y2="16" />
      <line x1="13" y1="6" x2="13" y2="19" />
    </svg>
  ),
  Search: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="9" cy="9" r="6" />
      <line x1="14" y1="14" x2="19" y2="19" />
    </svg>
  ),
  Close: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <line x1="2" y1="2" x2="14" y2="14" />
      <line x1="14" y1="2" x2="2" y2="14" />
    </svg>
  ),
  Arrow: () => (
    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="1" y1="8" x2="15" y2="8" />
      <polyline points="9 2 15 8 9 14" />
    </svg>
  ),
  ChevL: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <polyline points="11 2 5 8 11 14" />
    </svg>
  ),
  ChevR: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <polyline points="5 2 11 8 5 14" />
    </svg>
  ),
  Grid: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="1" width="6" height="6" rx="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </svg>
  ),
  List: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="2" width="14" height="2.2" rx="1.1" />
      <rect x="1" y="6.9" width="14" height="2.2" rx="1.1" />
      <rect x="1" y="11.8" width="14" height="2.2" rx="1.1" />
    </svg>
  ),
  Expand: () => (
    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <polyline points="10 2 14 2 14 6" />
      <polyline points="6 14 2 14 2 10" />
      <line x1="14" y1="2" x2="9" y2="7" />
      <line x1="2" y1="14" x2="7" y2="9" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────────────────
   BADGE
───────────────────────────────────────────────────────────────────── */

function Badge({ type }: { type: "national" | "state-wide" }) {
  const isNat = type === "national";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
        isNat
          ? "bg-amber-50 text-amber-900 border border-amber-200"
          : "bg-blue-50 text-blue-900 border border-blue-200"
      }`}
    >
      <span className={`w-1 h-1 rounded-full ${isNat ? "bg-amber-500" : "bg-blue-500"}`} />
      {isNat ? "National" : "State-Wide"}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SKELETON
───────────────────────────────────────────────────────────────────── */

function Skeleton({ h = 210 }: { h?: number }) {
  return (
    <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-white border border-gray-100">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" style={{ height: h }} />
      <div className="p-4 space-y-2.5">
        <div className="h-2 bg-gray-200 rounded-full w-1/4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-3/5 animate-pulse" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   DETAIL DRAWER
───────────────────────────────────────────────────────────────────── */

function DetailDrawer({
  item,
  all,
  onClose,
  onNav,
}: {
  item: NewsSection;
  all: NewsSection[];
  onClose: () => void;
  onNav: (n: NewsSection) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgSrc = originalOf(item);
  const pressIcon = getPressIcon(item);
  const idx = all.findIndex((a) => a.id === item.id);
  const hasPrev = idx > 0;
  const hasNext = idx < all.length - 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNav(all[idx - 1]);
      if (e.key === "ArrowRight" && hasNext) onNav(all[idx + 1]);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [all, idx, hasPrev, hasNext, onClose, onNav]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [item.id]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-2xl bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-amber-100 bg-white">
          <div className="flex items-center gap-2.5">
            {item.type && <Badge type={item.type} />}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => hasPrev && onNav(all[idx - 1])}
              disabled={!hasPrev}
              className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-amber-400 hover:text-amber-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Ico.ChevL />
            </button>
            <span className="text-xs font-semibold text-gray-500 min-w-[3rem] text-center">
              {idx + 1} / {all.length}
            </span>
            <button
              onClick={() => hasNext && onNav(all[idx + 1])}
              disabled={!hasNext}
              className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-amber-400 hover:text-amber-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Ico.ChevR />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all ml-2"
            >
              <Ico.Close />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {/* Hero image - CENTERED and FULLY VISIBLE */}
          {imgSrc ? (
            <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center min-h-[20rem] p-4">
              <img
                src={imgSrc}
                  alt={item.image?.[0]?.alternativeText || item.title || item.tittle}
                className="w-full h-auto max-h-[32rem] object-contain"
                loading="eager"
              />
              {pressIcon.src ? (
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                  <img
                    src={pressIcon.src}
                    alt={pressIcon.text || item.title || item.tittle || "Press"}
                    className="h-5 max-w-[7rem] object-contain"
                    onError={(e) => {
                      const parent = (e.target as HTMLImageElement).closest("div");
                      if (parent) parent.style.display = "none";
                    }}
                  />
                </div>
              ) : pressIcon.text ? (
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg text-sm font-semibold text-slate-700">
                  {pressIcon.text}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              {pressIcon.src ? (
                <img
                  src={pressIcon.src}
                  alt={pressIcon.text || item.title || item.tittle || "Press"}
                  className="h-10 max-w-[10rem] object-contain opacity-40"
                  onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                />
              ) : pressIcon.text ? (
                <span className="text-sm font-semibold text-slate-700">{pressIcon.text}</span>
              ) : null}
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div className="h-0.5 w-9 bg-gradient-to-r from-amber-500 to-transparent rounded-full mb-4" />

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-6">
              {item.title || item.tittle}
            </h2>

            <div className="h-px bg-gray-200 mb-5" />

            {item.description ? (
              <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic">No description available.</p>
            )}

            {item.type && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                  Coverage Scope
                </div>
                <Badge type={item.type} />
              </div>
            )}

            {(pressIcon.src || pressIcon.text) && (
              <div className="mt-7 pt-5 border-t border-gray-200">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                  Published In
                </div>
                {pressIcon.src ? (
                  <img
                    src={pressIcon.src}
                    alt={pressIcon.text || item.title || item.tittle || "Press"}
                    className="h-7 max-w-[11rem] object-contain opacity-75"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                  />
                ) : (
                  <span className="text-sm font-semibold text-slate-700">{pressIcon.text}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="flex gap-2.5 px-5 py-3.5 border-t border-amber-100 bg-amber-50/30">
          <button
            onClick={() => hasPrev && onNav(all[idx - 1])}
            disabled={!hasPrev}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-amber-400 hover:text-amber-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Ico.ChevL /> Previous
          </button>
          <button
            onClick={() => hasNext && onNav(all[idx + 1])}
            disabled={!hasNext}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next <Ico.ChevR />
          </button>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   MASONRY CARD
───────────────────────────────────────────────────────────────────── */

function MasonryCard({ item, onClick }: { item: NewsSection; onClick: () => void }) {
  const [imgErr, setImgErr] = useState(false);
  const [logoErr, setLogoErr] = useState(false);
  const thumb = thumbOf(item);
  const pressIcon = getPressIcon(item);
  const hasImg = !!thumb && !imgErr;
  const isNat = item.type === "national";

  return (
    <div
      onClick={onClick}
      className={`break-inside-avoid mb-4 rounded-xl overflow-hidden bg-white border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
        isNat ? "border-amber-200" : "border-gray-200"
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Image */}
      {hasImg ? (
        <div className="relative overflow-hidden group">
          <img
            src={thumb}
          alt={item.image?.[0]?.alternativeText || item.title || item.tittle}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgErr(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
          {item.type && (
            <div className="absolute top-3 left-3">
              <Badge type={item.type} />
            </div>
          )}
          <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-900 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Ico.Expand />
          </div>
          {pressIcon.src && !logoErr ? (
            <div className="absolute bottom-2.5 right-2.5 bg-white/95 rounded-lg px-2 py-1 shadow-md">
              <img
                src={pressIcon.src}
                alt={pressIcon.text || item.title || item.tittle || "Press"}
                className="h-3.5 max-w-[4.5rem] object-contain"
                onError={() => setLogoErr(true)}
              />
            </div>
          ) : pressIcon.text ? (
            <div className="absolute bottom-2.5 right-2.5 bg-white/95 rounded-lg px-2 py-1 shadow-md text-[10px] font-semibold text-slate-700">
              {pressIcon.text}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="relative h-36 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              {pressIcon.src && !logoErr ? (
                <img
                  src={pressIcon.src}
                  alt={pressIcon.text || item.title || item.tittle || "Press"}
                  className="h-8 max-w-[7.5rem] object-contain opacity-30"
                  onError={() => setLogoErr(true)}
                />
              ) : pressIcon.text ? (
                <span className="text-sm font-semibold text-slate-700">{pressIcon.text}</span>
              ) : (
                <span className="text-6xl font-bold text-slate-900 opacity-5 select-none">
                  {((item.title || item.tittle) || "N")[0].toUpperCase()}
                </span>
              )}
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          {!hasImg && item.type && <Badge type={item.type} />}
          {isNat && (
            <span className="ml-auto flex items-center gap-1.5 text-[9px] font-bold text-amber-600 uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-amber-500" />
              Featured
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-3">
      {item.title || item.tittle}
        </h3>

        {item.description && (
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
            {item.description}
          </p>
        )}

        {(pressIcon.src || pressIcon.text) && (
          <div className="mt-3 text-xs text-slate-600 flex items-center gap-2">
            <span className="uppercase tracking-wide text-gray-500">Published In</span>
            {pressIcon.src ? (
              <img
                src={pressIcon.src}
                alt={pressIcon.text || item.title || item.tittle || "Press"}
                className="h-4 max-w-[5rem] object-contain"
              />
            ) : (
              <span className="font-semibold text-slate-700">{pressIcon.text}</span>
            )}
          </div>
        )}
        <div className="pt-3 mt-2 border-t border-amber-100">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-600 uppercase tracking-wider">
            Read Article <Ico.Arrow />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   LIST CARD
───────────────────────────────────────────────────────────────────── */

function ListCard({ item, onClick }: { item: NewsSection; onClick: () => void }) {
  const [imgErr, setImgErr] = useState(false);
  const [logoErr, setLogoErr] = useState(false);
  const thumb = thumbOf(item);
  const pressIcon = getPressIcon(item);
  const hasImg = !!thumb && !imgErr;

  return (
    <div
      onClick={onClick}
      className="flex mb-3 rounded-xl overflow-hidden bg-white border border-gray-200 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-200"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Image */}
      <div className="w-48 sm:w-52 flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 group">
        {hasImg ? (
          <img
            src={thumb}
          alt={item.image?.[0]?.alternativeText || item.title || item.tittle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {pressIcon.src && !logoErr ? (
              <img
                src={pressIcon.src}
                alt={pressIcon.text || item.title || item.tittle || "Press"}
                className="h-7 max-w-[6.5rem] object-contain opacity-30"
                onError={() => setLogoErr(true)}
              />
            ) : pressIcon.text ? (
              <span className="text-sm font-semibold text-slate-700">{pressIcon.text}</span>
            ) : (
            <span className="text-5xl font-bold text-slate-900 opacity-5">
              {((item.title || item.tittle) || "N")[0].toUpperCase()}
            </span>
            )}
          </div>
        )}
        {item.type && (
          <div className="absolute top-2 left-2">
            <Badge type={item.type} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col min-w-0">
        <div className="flex items-center justify-end mb-2 min-h-[1.25rem]">
          {pressIcon.src && !logoErr ? (
            <img
              src={pressIcon.src}
              alt={pressIcon.text || item.title || item.tittle || "Press"}
              className="h-4 max-w-[5rem] object-contain"
              onError={() => setLogoErr(true)}
            />
          ) : pressIcon.text ? (
            <span className="text-xs font-semibold text-slate-700">{pressIcon.text}</span>
          ) : null}
        </div>

        <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 mb-2">
      {item.title || item.tittle}
        </h3>

        {item.description && (
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
        )}

        {(pressIcon.src || pressIcon.text) && (
          <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-wide text-slate-500">
            <span className="font-bold text-gray-500">Published In</span>
            {pressIcon.src ? (
              <img
                src={pressIcon.src}
                alt={pressIcon.text || item.title || item.tittle || "Press"}
                className="h-4 max-w-[5rem] object-contain"
              />
            ) : (
              <span className="font-semibold text-slate-700">{pressIcon.text}</span>
            )}
          </div>
        )}
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-amber-600 uppercase tracking-wider">
          Read More <Ico.Arrow />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   PAGINATION
───────────────────────────────────────────────────────────────────── */

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (total <= 1) return null;

  const pages: (number | "…")[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("…");
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    if (current < total - 2) pages.push("…");
    pages.push(total);
  }

  return (
    <nav className="flex items-center gap-1.5">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="w-9 h-9 rounded-lg border-2 border-gray-200 bg-white flex items-center justify-center text-gray-600 font-semibold hover:border-amber-400 hover:text-amber-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <Ico.ChevL />
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="text-gray-400 text-sm px-1">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all ${
              p === current
                ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                : "border-gray-200 bg-white text-gray-700 hover:border-amber-400 hover:text-amber-600"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="w-9 h-9 rounded-lg border-2 border-gray-200 bg-white flex items-center justify-center text-gray-600 font-semibold hover:border-amber-400 hover:text-amber-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <Ico.ChevR />
      </button>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────── */

export default function NewsSections() {
  const [data, setData] = useState<NewsSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    pageSize: 25,
    pageCount: 1,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<"all" | "national" | "state-wide">("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeItem, setActiveItem] = useState<NewsSection | null>(null);

  const loadData = useCallback((p: number) => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    fetchNewsSections(p, ctrl.signal)
      .then((j) => {
        setData(flattenStrapi(j.data ?? []));
        setMeta(j.meta?.pagination || { page: 1, pageSize: 25, pageCount: 1, total: 0 });
      })
      .catch((e: any) => {
        if (e.name !== "AbortError") setError(e.message || "Failed to load.");
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    const cleanup = loadData(page);
    return cleanup;
  }, [page, loadData]);

  const changePage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sorted = sortNationalFirst(data);
  const filtered = sorted.filter((item) => {
    const matchType = activeType === "all" || item.type === activeType;
    const q = search.toLowerCase().trim();
    return (
      matchType &&
      (!q ||
        (item.title || item.tittle || "").toLowerCase().includes(q) ||
        (item.description ?? "").toLowerCase().includes(q))
    );
  });

  const counts = {
    all: data.length,
    national: data.filter((d) => d.type === "national").length,
    "state-wide": data.filter((d) => d.type === "state-wide").length,
  };

  const tabs: Array<{ key: "all" | "national" | "state-wide"; label: string }> = [
    { key: "all", label: "All Coverage" },
    { key: "national", label: "National" },
    { key: "state-wide", label: "State-Wide" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Detail Drawer */}
      {activeItem && (
        <DetailDrawer
          item={activeItem}
          all={filtered}
          onClose={() => setActiveItem(null)}
          onNav={setActiveItem}
        />
      )}

      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Brand */}
            <div className="flex items-center gap-2.5 mr-2">
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-amber-400 font-bold text-lg">
                P
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 leading-tight">Press Room</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Media</div>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-60 flex-shrink-0">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Ico.Search />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-9 py-2 text-sm border-2 border-gray-200 rounded-lg bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              )}
            </div>

            {/* Type Tabs */}
            <div className="flex gap-2">
              {tabs.map((t) => {
                const on = activeType === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActiveType(t.key)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border-2 transition-all ${
                      on
                        ? "bg-amber-50 border-amber-400 text-amber-900"
                        : "bg-white border-gray-200 text-gray-700 hover:border-amber-300"
                    }`}
                  >
                    {t.key === "national" && <Ico.Globe />}
                    {t.key === "state-wide" && <Ico.MapPin />}
                    {t.label}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        on ? "bg-amber-200 text-amber-900" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {counts[t.key]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Toggle */}
            <div className="ml-auto flex items-center gap-3">
              {!loading && (
                <span className="text-xs text-gray-600">
                  <span className="font-bold text-amber-600">{filtered.length}</span> article
                  {filtered.length !== 1 ? "s" : ""}
                </span>
              )}
              <div className="flex gap-1">
                <button
                  onClick={() => setView("grid")}
                  className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center transition-all ${
                    view === "grid"
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:border-amber-400"
                  }`}
                >
                  <Ico.Grid />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center transition-all ${
                    view === "list"
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:border-amber-400"
                  }`}
                >
                  <Ico.List />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading */}
        {loading && (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} h={[200, 250, 175, 270, 215, 195, 230, 160, 240, 210, 185, 255][i]} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl mb-4">
              ⚠
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Unable to load articles</h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md">{error}</p>
            <button
              onClick={() => loadData(page)}
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl mb-4">
              🔍
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
            <p className="text-sm text-gray-600 mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveType("all");
              }}
              className="px-6 py-2.5 bg-white border-2 border-amber-400 text-amber-700 text-sm font-semibold rounded-lg hover:bg-amber-50 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && filtered.length > 0 && (
          <>
            {view === "grid" ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                {filtered.map((item) => (
                  <MasonryCard key={item.id} item={item} onClick={() => setActiveItem(item)} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((item) => (
                  <ListCard key={item.id} item={item} onClick={() => setActiveItem(item)} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Pagination */}
      {!loading && !error && meta.pageCount > 1 && (
        <div className="flex flex-col items-center gap-3 py-10">
          <Pagination current={page} total={meta.pageCount} onChange={changePage} />
          <p className="text-xs text-gray-500">
            Page {page} of {meta.pageCount} · {meta.total} total articles
          </p>
        </div>
      )}

      {/* Footer */}
  
    </div>
  );
}