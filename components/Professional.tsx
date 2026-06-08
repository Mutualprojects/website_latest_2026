"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Camera,
  Search,
  RefreshCw,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────
const BRAND = "#07518a";
const ACCENT = "#b48a4a";
const INK = "#0a0a0a";
const INK_DIM = "#6b6b6b";
const INK_FAINT = "#a0a0a0";
const PAPER = "#ffffff";
const RULE = "#ececec";
const RULE_SOFT = "#f4f4f4";

const BLANK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 4'><rect width='5' height='4' fill='%23f4f4f4'/></svg>";

// ─────────────────────────────────────────────────────────────
// SEEDED RNG (for stable, reshuffle-able scatter positions)
// ─────────────────────────────────────────────────────────────
class SeededRandom {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
}

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface MediaFormat { url: string; width?: number; height?: number; }
interface MediaItem {
  url: string;
  formats?: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  };
}
interface Event {
  id: string;
  title: string;
  description: string;
  images: MediaItem[];
  category: string;
  date: string;
  featured?: boolean;
}

// ─────────────────────────────────────────────────────────────
// IMAGE HELPERS
// ─────────────────────────────────────────────────────────────
function pickSrc(img: MediaItem | undefined, target: "thumb" | "card" | "full"): string {
  if (!img) return BLANK;
  const f = img.formats ?? {};
  let path: string | undefined;
  if (target === "thumb") path = f.thumbnail?.url || f.small?.url || f.medium?.url || img.url;
  else if (target === "card") path = f.medium?.url || f.small?.url || f.large?.url || img.url;
  else path = f.large?.url || f.medium?.url || img.url;
  if (!path) return BLANK;
  return path.startsWith("http") ? path : `/strapi${path}`;
}
function cardSrcSet(img: MediaItem | undefined): string | undefined {
  if (!img?.formats) return undefined;
  const parts: string[] = [];
  const add = (f: MediaFormat | undefined, w: number) => {
    if (!f?.url) return;
    const url = f.url.startsWith("http") ? f.url : `/strapi${f.url}`;
    parts.push(`${url} ${w}w`);
  };
  add(img.formats.small, 500);
  add(img.formats.medium, 750);
  add(img.formats.large, 1000);
  return parts.length ? parts.join(", ") : undefined;
}

// ─────────────────────────────────────────────────────────────
// CATEGORY DOTS
// ─────────────────────────────────────────────────────────────
const CATEGORY_DOTS: Record<string, string> = {
  "Special Day": "#c64a6b",
  National: "#c47138",
  Corporate: BRAND,
  Festival: "#b48a4a",
  Wellness: "#3f8b6c",
  Achievement: "#7a5ea8",
  Expo: "#3d6fa7",
  Initiative: "#318e94",
  Team: "#2a8fa3",
  Gallery: "#6b6f7a",
};
const getDot = (cat: string) => CATEGORY_DOTS[cat] ?? BRAND;

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function formatDate(d: string, opts?: Intl.DateTimeFormatOptions) {
  try {
    return new Date(d).toLocaleDateString(
      "en-US",
      opts ?? { month: "short", day: "numeric", year: "numeric" }
    );
  } catch { return d; }
}

// ─────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────
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

function useIdlePreload(urls: string[]) {
  useEffect(() => {
    if (!urls.length) return;
    const w = window as any;
    const ric: (cb: () => void) => number =
      w.requestIdleCallback || ((cb: () => void) => window.setTimeout(cb, 200));
    const id = ric(() => {
      urls.slice(0, 12).forEach((u) => {
        const img = new Image();
        img.decoding = "async";
        img.src = u;
      });
    });
    return () => {
      const cancel = w.cancelIdleCallback || window.clearTimeout;
      cancel(id);
    };
  }, [urls]);
}

// ─────────────────────────────────────────────────────────────
// EYEBROW
// ─────────────────────────────────────────────────────────────
function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase ${className}`}
      style={{ letterSpacing: "0.22em", color: INK_DIM }}
    >
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO IMAGE STACK — responsive scatter, fed by fetched events
// ─────────────────────────────────────────────────────────────
//
// Design size: a 520x520 canvas. Cards sit at fixed pixel positions
// inside it. The whole canvas is then transform-scaled to fit whatever
// container it lives in — so the layout looks identical at every size,
// it just gets smaller. No re-layout, no math drift, no clipping.
//
function HeroImageStack({
  events,
  onCardClick,
  seed = 73219,
}: {
  events: Event[];
  onCardClick?: (event: Event) => void;
  seed?: number;
}) {
  const cards = events.slice(0, 5);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSeed, setCurrentSeed] = useState(seed);
  const prefersReducedMotion = useReducedMotion();

  // Card dimensions at 1x (the "design" scale)
  const CARD_W = 210;
  const CARD_H = 265;
  const DESIGN_W = 520; // canvas width at 1x

  // Watch container width → set scale
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      const s = Math.min(1, Math.max(0.42, w / DESIGN_W));
      setScale(s);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Reveal when in view
  useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  // Seeded scatter positions
  const positions = useMemo(() => {
    const rng = new SeededRandom(currentSeed);
    return cards.map(() => ({
      x: rng.range(-110, 110),
      y: rng.range(-75, 75),
      rotation: rng.range(-14, 14),
      sc: rng.range(0.92, 1.05),
    }));
  }, [cards.length, currentSeed]);

  // Reshuffle
  const reshuffle = useCallback(() => {
    setCurrentSeed(Math.floor(Math.random() * 1_000_000));
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 80);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.05, staggerChildren: 0.16 } },
  };
  const cardVariants = {
    hidden: { x: 0, y: 0, rotate: 0, scale: 0.85, opacity: 0 },
    visible: (custom: { x: number; y: number; rotation: number; sc: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: custom.rotation,
      scale: custom.sc,
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0.25 }
        : { type: "spring", stiffness: 95, damping: 18 } as any,
    }),
  };

  if (cards.length === 0) {
    return (
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ aspectRatio: "1 / 1", background: RULE_SOFT, borderRadius: 2 }}
      />
    );
  }

  return (
    <div ref={containerRef} className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
      {/* Scaled inner canvas */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative"
          style={{
            width: DESIGN_W,
            height: DESIGN_W,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {cards.map((event, i) => {
            const pos = positions[i];
            if (!pos) return null;
            return (
              <motion.div
                key={`${event.id}-${currentSeed}`}
                className="absolute cursor-pointer"
                variants={cardVariants}
                custom={pos}
                onClick={() => onCardClick?.(event)}
                whileHover={prefersReducedMotion ? undefined : { scale: pos.sc * 1.05, y: pos.y - 4, transition: { duration: 0.2 } }}
                style={{
                  left: "50%",
                  top: "50%",
                  marginLeft: -(CARD_W + 24) / 2,  // half of full polaroid width
                  marginTop: -(CARD_H + 56) / 2,   // half of full polaroid height (img + caption)
                  zIndex: cards.length - i,
                  willChange: "transform",
                }}
              >
                <div
                  className="bg-white"
                  style={{
                    padding: "10px 10px 28px 10px",
                    border: `1px solid ${RULE}`,
                    boxShadow: "0 22px 50px rgba(10,10,10,0.18), 0 4px 12px rgba(10,10,10,0.08)",
                    borderRadius: 2,
                  }}
                >
                  <div
                    className="overflow-hidden"
                    style={{ width: CARD_W, height: CARD_H, background: RULE_SOFT }}
                  >
                    <img
                      src={pickSrc(event.images[0], "card")}
                      srcSet={cardSrcSet(event.images[0])}
                      sizes="240px"
                      alt={event.title}
                      loading="eager"
                      decoding="async"
                      {...{ fetchPriority: "high" as any }}
                      className="w-full h-full object-cover"
                      onError={(e) => ((e.target as HTMLImageElement).src = BLANK)}
                      draggable={false}
                    />
                  </div>
                  <div
                    className="mt-2 text-center text-[11px] tabular-nums px-2"
                    style={{ color: INK_DIM, fontWeight: 500, letterSpacing: "0.04em", maxWidth: CARD_W }}
                  >
                    <span
                      className="inline-block max-w-full overflow-hidden whitespace-nowrap"
                      style={{ textOverflow: "ellipsis" }}
                    >
                      {event.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Reshuffle button */}
      <button
        onClick={reshuffle}
        aria-label="Reshuffle the stack"
        className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 flex items-center gap-1.5 px-3 py-2 rounded-full transition-all hover:scale-105 z-20"
        style={{
          background: PAPER,
          border: `1px solid ${RULE}`,
          color: INK,
          boxShadow: "0 6px 14px rgba(10,10,10,0.08)",
        }}
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span className="text-[10.5px] uppercase tracking-[0.2em] font-semibold">Shuffle</span>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// EVENT CARD
// ─────────────────────────────────────────────────────────────
function EventCard({
  event,
  index,
  onOpen,
  eager,
}: {
  event: Event;
  index: number;
  onOpen: (event: Event, idx: number) => void;
  eager: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const first = event.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
      className="group cursor-pointer"
      onClick={() => onOpen(event, 0)}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "5 / 4", background: RULE_SOFT, borderRadius: 2 }}
      >
        {!loaded && <div className="absolute inset-0" style={{ background: RULE_SOFT }} />}
        <img
          src={errored ? BLANK : pickSrc(first, "card")}
          srcSet={errored ? undefined : cardSrcSet(first)}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt={event.title}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          {...(eager ? { fetchPriority: "high" as any } : {})}
          onLoad={() => setLoaded(true)}
          onError={() => { setErrored(true); setLoaded(true); }}
          className="w-full h-full object-cover ev-card-img"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.35s ease, transform 0.9s cubic-bezier(.2,.7,.2,1)",
          }}
        />

        {event.images.length > 1 && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10.5px] font-semibold flex items-center gap-1.5"
            style={{
              background: "rgba(10,10,10,0.78)",
              backdropFilter: "blur(6px)",
              color: "white",
              letterSpacing: "0.04em",
            }}
          >
            <Camera className="w-3 h-3" />
            {event.images.length}
          </div>
        )}

        {event.featured && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold"
            style={{ background: ACCENT, color: "white", letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            Featured
          </div>
        )}
      </div>

      <div className="pt-4">
        <div className="flex items-center gap-3 mb-1.5">
          <Eyebrow>
            <span className="tabular-nums" style={{ color: INK_FAINT }}>
              N°&thinsp;{String(index + 1).padStart(2, "0")}
            </span>
            <span style={{ color: RULE }}>/</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: getDot(event.category) }} />
              {event.category}
            </span>
          </Eyebrow>
        </div>

        <h3
          className="text-[19px] sm:text-[20px] leading-[1.22] mb-1.5"
          style={{ color: INK, fontWeight: 700, letterSpacing: "-0.012em" }}
        >
          {event.title}
        </h3>
        <p className="text-[13.5px] leading-[1.65] line-clamp-2" style={{ color: INK_DIM }}>
          {event.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] tabular-nums" style={{ color: INK_FAINT, letterSpacing: "0.04em" }}>
            {formatDate(event.date)}
          </span>
          <span
            className="inline-flex items-center gap-1 text-xs font-medium transition-all opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
            style={{ color: BRAND }}
          >
            View
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div>
      <div className="animate-pulse" style={{ aspectRatio: "5 / 4", background: RULE_SOFT, borderRadius: 2 }} />
      <div className="pt-4 space-y-2">
        <div className="h-3 w-24 animate-pulse rounded" style={{ background: RULE_SOFT }} />
        <div className="h-5 w-3/4 animate-pulse rounded" style={{ background: RULE_SOFT }} />
        <div className="h-3 w-full animate-pulse rounded" style={{ background: RULE_SOFT }} />
        <div className="h-3 w-1/2 animate-pulse rounded" style={{ background: RULE_SOFT }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LIGHTBOX — frosted blur backdrop, prominent close button
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
  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) (diff > 0 ? onNext() : onPrev());
    touchStartX.current = null;
  }

  useEffect(() => {
    if (!event) return;
    const next = event.images[(imageIndex + 1) % event.images.length];
    const prev = event.images[(imageIndex - 1 + event.images.length) % event.images.length];
    [next, prev].forEach((img) => {
      if (!img) return;
      const i = new Image();
      i.decoding = "async";
      i.src = pickSrc(img, "full");
    });
  }, [event, imageIndex]);

  if (!event) return null;
  const current = event.images[imageIndex];

  function onBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-50 flex flex-col"
        style={{
          background: "rgba(10,10,10,0.58)",
          backdropFilter: "blur(22px) saturate(160%)",
          WebkitBackdropFilter: "blur(22px) saturate(160%)",
        }}
        role="dialog" aria-modal="true" aria-label={event.title}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
        onClick={onBackdropClick}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between gap-4 px-5 sm:px-10 pt-5 sm:pt-7 pb-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="min-w-0 pr-2">
            <Eyebrow className="!text-white/65">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: getDot(event.category) }} />
                {event.category}
              </span>
              <span className="opacity-40">·</span>
              {formatDate(event.date, { month: "long", day: "numeric", year: "numeric" })}
            </Eyebrow>
            <h3
              className="text-base sm:text-2xl mt-1.5 leading-tight truncate text-white"
              style={{ fontWeight: 700, letterSpacing: "-0.012em" }}
            >
              {event.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <span
              className="hidden sm:inline-flex items-center gap-1 text-xs tabular-nums px-3 py-1.5 rounded-full text-white/80"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <span className="text-white font-semibold">{String(imageIndex + 1).padStart(2, "0")}</span>
              <span className="opacity-50">/</span>
              <span>{String(event.images.length).padStart(2, "0")}</span>
            </span>

            <div className="flex items-center gap-2">
              <span
                className="hidden sm:inline-block text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-md text-white/65"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                Esc
              </span>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={onClose}
                aria-label="Close gallery"
                className="relative flex items-center justify-center rounded-full transition-colors"
                style={{
                  width: 48, height: 48,
                  background: PAPER, color: INK,
                  boxShadow: "0 10px 28px rgba(0,0,0,0.32)",
                }}
              >
                <X className="w-5 h-5" strokeWidth={2.4} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Image area */}
        <div
          className="flex-1 flex items-center justify-center relative px-4 sm:px-20 py-3 sm:py-6"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={onPrev}
            disabled={event.images.length <= 1}
            aria-label="Previous"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 rounded-full disabled:opacity-20 z-10 flex items-center justify-center"
            style={{
              width: 48, height: 48,
              background: "rgba(255,255,255,0.92)", color: INK,
              boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
            }}
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.4} />
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.img
              key={imageIndex}
              src={pickSrc(current, "full")}
              alt={`${event.title} — frame ${imageIndex + 1}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
              className="max-w-full max-h-full object-contain select-none rounded-sm"
              style={{
                maxHeight: "calc(100vh - 240px)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 6px 18px rgba(0,0,0,0.30)",
              }}
              draggable={false}
              decoding="async"
              onError={(e) => ((e.target as HTMLImageElement).src = BLANK)}
            />
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={onNext}
            disabled={event.images.length <= 1}
            aria-label="Next"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 rounded-full disabled:opacity-20 z-10 flex items-center justify-center"
            style={{
              width: 48, height: 48,
              background: "rgba(255,255,255,0.92)", color: INK,
              boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
            }}
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.4} />
          </motion.button>

          <div className="absolute bottom-1 left-0 right-0 flex justify-center sm:hidden pointer-events-none">
            <span
              className="px-3 py-1 rounded-full text-[11px] tabular-nums text-white"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
            >
              {String(imageIndex + 1).padStart(2, "0")}
              <span className="opacity-50 mx-1">/</span>
              {String(event.images.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="px-5 sm:px-10 pb-5 sm:pb-7 pt-3" onClick={(e) => e.stopPropagation()}>
          {event.description && (
            <p className="text-sm leading-relaxed max-w-3xl mx-auto text-center mb-4 hidden sm:block text-white/80">
              {event.description}
            </p>
          )}
          <div className="flex gap-2 justify-center overflow-x-auto pb-1 max-w-5xl mx-auto">
            {event.images.map((img, i) => (
              <button
                key={i}
                onClick={() => onSelect(i)}
                className="flex-shrink-0 overflow-hidden transition-all rounded-sm"
                style={{
                  width: 52, height: 52,
                  border: `2px solid ${i === imageIndex ? "white" : "rgba(255,255,255,0.18)"}`,
                  opacity: i === imageIndex ? 1 : 0.5,
                  boxShadow: i === imageIndex ? "0 6px 18px rgba(0,0,0,0.4)" : "none",
                }}
                aria-label={`Frame ${i + 1}`}
              >
                <img
                  src={pickSrc(img, "thumb")}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => ((e.target as HTMLImageElement).src = BLANK)}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN
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
          const fetched: Event[] = json.data.map((item: any) => {
            const toMedia = (m: any): MediaItem | null =>
              m?.url ? { url: m.url, formats: m.formats } : null;

            const main = toMedia(item.mainImage);
            const gallery: MediaItem[] = (item.eventGallery || [])
              .map(toMedia)
              .filter(Boolean) as MediaItem[];
            const allImages: MediaItem[] = main ? [main, ...gallery] : gallery;

            return {
              id: item.documentId || String(item.id),
              title: item.eventTitle || "Untitled",
              description: item.eventDescription || "",
              images: allImages,
              category: item.eventType || "Event",
              date: item.eventDate || new Date().toISOString().split("T")[0],
              featured: false,
            };
          });
          setEvents(fetched);
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

  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 240, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedEvent]);

  const sortedEvents = useMemo(() => {
    const list = [...events];
    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    list.sort((a, b) => (a.featured && !b.featured ? -1 : !a.featured && b.featured ? 1 : 0));
    return list;
  }, [events]);

  const totalPhotos = useMemo(
    () => events.reduce((sum, e) => sum + e.images.length, 0),
    [events]
  );
  const chapterCount = useMemo(
    () => new Set(events.map((e) => e.category)).size,
    [events]
  );

  const preloadUrls = useMemo(
    () => sortedEvents.slice(6, 18).map((e) => pickSrc(e.images[0], "card")).filter(Boolean),
    [sortedEvents]
  );
  useIdlePreload(preloadUrls);

  const openLightbox = useCallback((event: Event, idx: number) => {
    setSelectedEvent(event); setSelectedImageIdx(idx);
  }, []);
  const closeLightbox = useCallback(() => {
    setSelectedEvent(null); setSelectedImageIdx(0);
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

  const openFromStack = useCallback((event: Event) => {
    setSelectedEvent(event);
    setSelectedImageIdx(0);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen" style={{ background: PAPER, color: INK }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        html, body, * { font-family: 'DM Sans', system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .group:hover .ev-card-img { transform: scale(1.05); }
      `}</style>

      {/* Scroll progress hairline */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX: progressX, background: BRAND }}
      />

      {/* ╔══════════════════════════════════════════════════════════
          MASTHEAD
          ══════════════════════════════════════════════════════════ */}
      <header className="relative">
        <div
          className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-7 pb-3 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${RULE}` }}
        >
          <Eyebrow>
            <span style={{ color: BRAND, fontWeight: 800 }}>Brihaspathi</span>
            <span style={{ color: RULE }}>—</span>
            The Culture Archive
          </Eyebrow>
          <Eyebrow>Folio · {currentYear}</Eyebrow>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-12 sm:pt-16 sm:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT — copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}
            className="lg:col-span-6"
          >
            <Eyebrow className="mb-6">
              <span style={{ color: BRAND }}>No. 01</span>
              <span style={{ color: RULE }}>·</span>
              A photographic record
            </Eyebrow>

            <h1
              className="leading-[0.92] mb-7"
              style={{
                fontSize: "clamp(44px, 8.2vw, 112px)",
                fontWeight: 900,
                letterSpacing: "-0.038em",
                color: INK,
              }}
            >
              Made of
              <br />
              moments<span style={{ color: BRAND }}>.</span>
            </h1>

            <p className="max-w-xl text-[15px] sm:text-[16px] leading-[1.7]" style={{ color: INK_DIM }}>
              The people, the milestones, and the quiet in-between days that
              add up to what we call <span style={{ color: INK, fontWeight: 600 }}>Brihaspathi</span>.
              An open archive of the year &mdash; arranged, indexed, and free to wander.
            </p>

            <div
              className="mt-10 pt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3"
              style={{ borderTop: `1px solid ${RULE}` }}
            >
              <div>
                <span className="tabular-nums" style={{ color: INK, fontSize: "clamp(28px, 3.6vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {loading ? "—" : String(events.length).padStart(2, "0")}
                </span>
                <span className="ml-2 text-[10.5px] uppercase tracking-[0.22em]" style={{ color: INK_DIM }}>stories</span>
              </div>
              <span style={{ color: RULE }}>/</span>
              <div>
                <span className="tabular-nums" style={{ color: INK, fontSize: "clamp(28px, 3.6vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {loading ? "—" : totalPhotos}
                </span>
                <span className="ml-2 text-[10.5px] uppercase tracking-[0.22em]" style={{ color: INK_DIM }}>photographs</span>
              </div>
              <span style={{ color: RULE }}>/</span>
              <div>
                <span className="tabular-nums" style={{ color: INK, fontSize: "clamp(28px, 3.6vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {String(chapterCount).padStart(2, "0")}
                </span>
                <span className="ml-2 text-[10.5px] uppercase tracking-[0.22em]" style={{ color: INK_DIM }}>chapters</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — scattered image stack (responsive) */}
          <div className="lg:col-span-6">
            <div className="mx-auto w-full max-w-[520px]">
              <HeroImageStack events={sortedEvents} onCardClick={openFromStack} />
              <p className="text-center mt-5 sm:mt-6 text-[10.5px] uppercase tracking-[0.24em]" style={{ color: INK_DIM }}>
                A handful from the archive
                <span className="mx-2" style={{ color: RULE }}>·</span>
                Tap any frame
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ╔══════════════════════════════════════════════════════════
          CONTENT
          ══════════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-6 mb-10"
          style={{ borderBottom: `1px solid ${RULE}` }}
        >
          <div>
            <Eyebrow className="mb-2">— The Index —</Eyebrow>
            <h2
              className="leading-[1.05]"
              style={{
                fontSize: "clamp(24px, 3.4vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: INK,
              }}
            >
              Every story, in order.
            </h2>
          </div>
          <Eyebrow>
            {loading
              ? "Loading…"
              : (
                <>
                  <span className="tabular-nums text-[15px]" style={{ color: INK, letterSpacing: 0, fontWeight: 700 }}>
                    {String(events.length).padStart(2, "0")}
                  </span>
                  <span className="ml-1">entries</span>
                </>
              )}
          </Eyebrow>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : sortedEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 max-w-md mx-auto"
          >
            <div
              className="w-14 h-14 mx-auto mb-6 flex items-center justify-center"
              style={{ border: `1px solid ${RULE}`, borderRadius: 4 }}
            >
              <Search className="w-5 h-5" style={{ color: INK_DIM }} />
            </div>
            <h3 className="text-3xl mb-3" style={{ color: INK, fontWeight: 800, letterSpacing: "-0.025em" }}>
              An empty folio.
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: INK_DIM }}>
              No stories have been added yet. Check back soon.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {sortedEvents.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                onOpen={openLightbox}
                eager={i < 6}
              />
            ))}
          </div>
        )}
      </main>

      {/* ╔══════════════════════════════════════════════════════════
          COLOPHON
          ══════════════════════════════════════════════════════════ */}
      <footer className="mt-10 py-16 px-5 sm:px-8" style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow className="mb-5">— Colophon —</Eyebrow>
          <h3
            className="mb-5 leading-[1.06]"
            style={{ fontSize: "clamp(28px, 4.5vw, 48px)", color: INK, letterSpacing: "-0.028em", fontWeight: 800 }}
          >
            Looking for a moment we may have missed?
          </h3>
          <p className="mb-8 leading-relaxed text-[15px]" style={{ color: INK_DIM }}>
            Reach the culture team for high-resolution prints, named credits, or to submit
            a frame for a future folio.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="px-7 py-3.5 text-sm font-medium transition-all hover:opacity-90"
              style={{ background: INK, color: PAPER, borderRadius: 999 }}
            >
              Open the full archive
            </button>
            <button
              className="px-7 py-3.5 text-sm font-medium transition-colors hover:bg-[#f7f7f7]"
              style={{ border: `1px solid ${RULE}`, color: INK, borderRadius: 999, background: PAPER }}
            >
              Email the culture team
            </button>
          </div>
          <p className="mt-10 text-[10.5px] uppercase tracking-[0.22em]" style={{ color: INK_DIM }}>
            Brihaspathi · Folio No. 01 · Compiled {currentYear}
          </p>
        </div>
      </footer>

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