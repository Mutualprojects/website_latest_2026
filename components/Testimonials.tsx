"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

/* =============================== Types =============================== */
export type Testimonial = {
  quote: string;
  name: string; // e.g., Registrar, Director, Managing Director
  designation: string; // e.g., Telangana High Court, AMD, DCCB Bank (Telangana & AP)
  src?: string; // kept for compatibility (not displayed)
};

/* ====================== Inserted Testimonials ====================== */
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Registrar",
    designation: "Telangana High Court",
    quote:
      "We are impressed with the professionalism and expertise demonstrated by the Brihaspathi Technologies Limited team during the installation process. They were efficient, knowledgeable, and ensured minimal disruption to our Live Streaming Operations.",
  },
  {
    name: "Management",
    designation: "DCCB Bank (Telangana & AP)",
    quote:
      "We wanted to have effective control on our ATMs across the state, and we called for tenders for installation of CCTV cameras. Brihaspathi Technologies Limited offered us details of all brands and products that helped us to finalize the best one. Our ATMs are greatly safe now, than ever.",
  },
  {
    name: "Managing Director",
    designation: "IDA Bollaram",
    quote:
      "Overall, we are extremely satisfied with the CCTV project delivered by Brihaspathi Technologies Limited. It has exceeded our expectations in terms of performance, reliability and value for money.",
  },
  {
    name: "Director",
    designation: "AMD",
    quote:
      "We appreciate the thorough training provided by Brihaspathi Technologies Limited on how to use and maintain the CCTV system. Their technicians took the time to ensure that our staff were comfortable with operating the equipment.",
  },
];

/* ===================== Component ===================== */
type Props = {
  items?: Testimonial[] | null; // if empty/null -> fallback to DEFAULT_TESTIMONIALS
  brandColor?: string; // default #07518a
  intervalMs?: number; // per-slide duration
  className?: string;
  title?: string;
  subtitle?: string;
};

export default function Testimonials({
  items,
  brandColor = "#07518a",
  intervalMs = 5000,
  className,
  title = "Testimonials",
  subtitle = "What our customers are saying",
}: Props) {
  // Use provided items if non-empty, else default set
  const data = useMemo<Testimonial[]>(
    () =>
      Array.isArray(items) && items.length > 0 ? items : DEFAULT_TESTIMONIALS,
    [items]
  );

  const total = data.length;
  const [active, setActive] = useState(0);

  // Clamp active index if data length changes
  useEffect(() => {
    if (active >= total) setActive(0);
  }, [total, active]);

  // autoplay only while in viewport & tab visible
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, {
    once: false,
    margin: "-20% 0px -20% 0px",
    amount: 0.3,
  });
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Progress bar
  const progress = useMotionValue(0);
  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);
  const rafRef = useRef<number | null>(null);
  const lastTs = useRef<number | null>(null);

  const resetProgress = useCallback(() => {
    lastTs.current = null;
    progress.set(0);
  }, [progress]);

  const step = useCallback(
    (ts: number) => {
      // if no slides, do nothing
      if (total === 0) return;

      if (lastTs.current == null) lastTs.current = ts;
      const dt = ts - lastTs.current;
      lastTs.current = ts;

      const inc = dt / intervalMs; // fill 0→1 over intervalMs
      const next = Math.min(1, progress.get() + inc);
      progress.set(next);

      if (next >= 1) {
        setActive((a) => (a + 1) % total);
        resetProgress();
      } else {
        rafRef.current = requestAnimationFrame(step);
      }
    },
    [intervalMs, progress, resetProgress, total]
  );

  // Start/stop RAF loop depending on visibility & inView
  useEffect(() => {
    const shouldPlay = inView && tabVisible && total > 0;
    if (shouldPlay) {
      rafRef.current = requestAnimationFrame(step);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTs.current = null;
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTs.current = null;
    };
  }, [inView, tabVisible, step, total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setActive((prev) => (prev + 1) % total);
    resetProgress();
  }, [total, resetProgress]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setActive((prev) => (prev - 1 + total) % total);
    resetProgress();
  }, [total, resetProgress]);

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev]);

  // Swipe support
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  // Safe current item
  const current = total > 0 ? data[active] : null;

  return (
    <section
      ref={sectionRef as any}
      className={[
        "relative w-full bg-gradient-to-b from-white to-slate-50 bg-white",
        "grid-bg",
        className || "",
      ].join(" ")}
      aria-label="Testimonials"
    >
      {/* ======= Heading ======= */}
      <div className="mx-auto max-w-4xl px-6 pt-14 text-center sm:pt-16">
        <h2
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{ color: brandColor }}
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            {subtitle}
          </p>
        ) : null}
        <div
          className="mx-auto mt-4 h-1 w-24 rounded-full"
          style={{ background: brandColor }}
        />
      </div>

      {/* ======= Centered Carousel ======= */}
      <div
        className="mx-auto max-w-3xl px-6 pb-16 pt-10 text-center"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {current ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
              className="flex flex-col items-center"
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ background: brandColor }}
              >
                <Quote className="h-4 w-4" />
                Featured testimonial
              </div>

              <h3 className="mt-5 text-2xl font-bold text-slate-900 dark:text-slate-50 sm:text-3xl">
                {current.name}
              </h3>
              <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
                {current.designation}
              </p>

              <motion.blockquote className="relative mt-6 w-full rounded-2xl bg-white p-5 text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/60 dark:text-slate-300 dark:ring-slate-700 sm:p-6">
                <span
                  aria-hidden
                  className="absolute -left-2 -top-2 inline-flex h-8 w-8 items-center justify-center rounded-xl text-white"
                  style={{ background: brandColor }}
                >
                  <Quote className="h-4 w-4" />
                </span>
                <p className="text-base leading-relaxed sm:text-lg">
                  “{current.quote}”
                </p>
              </motion.blockquote>

              {/* Progress bar */}
              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <motion.div
                  className="h-full"
                  style={{
                    width: barWidth,
                    background: brandColor,
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          // Fallback if no testimonials at all
          <div className="rounded-xl border border-dashed p-10 text-center text-slate-500">
            No testimonials available.
          </div>
        )}

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            disabled={total === 0}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 dark:bg-slate-800 dark:hover:bg-slate-700"
            style={{
              color: brandColor,
              boxShadow: `0 0 0 1px ${brandColor}20 inset`,
            }}
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            disabled={total === 0}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 dark:bg-slate-800 dark:hover:bg-slate-700"
            style={{
              color: brandColor,
              boxShadow: `0 0 0 1px ${brandColor}20 inset`,
            }}
          >
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <nav
            aria-label="Testimonials pagination"
            className="ml-1 flex items-center gap-2 sm:ml-2 sm:gap-3"
          >
            {Array.from({ length: total }).map((_, i) => {
              const activeDot = i === active;
              return (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    if (total === 0) return;
                    setActive(i);
                    resetProgress();
                  }}
                  className={[
                    "h-2.5 rounded-full transition-all",
                    activeDot ? "w-6" : "w-2.5 opacity-60 hover:opacity-100",
                  ].join(" ")}
                  style={{
                    background: activeDot ? brandColor : `${brandColor}66`,
                  }}
                />
              );
            })}
          </nav>
        </div>
      </div>

      {/* Subtle animated grid BG */}
      <style>{`
        @keyframes grid-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .grid-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(226,232,240,0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226,232,240,0.6) 1px, transparent 1px);
          background-size: 3rem 3rem;
          animation: grid-move 40s linear infinite alternate;
          opacity: 0.35;
          pointer-events: none;
        }
        :root.dark .grid-bg::before {
          background-image:
            linear-gradient(to right, rgba(30,41,59,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(30,41,59,0.8) 1px, transparent 1px);
          opacity: 0.25;
        }
      `}</style>
    </section>
  );
}
