"use client";

import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* --------------------------------
   GSAP DYNAMIC IMPORT (SSR SAFE)
---------------------------------- */

let gsap: any = null;
let ScrollTrigger: any = null;

if (typeof window !== "undefined") {
  // wrap in IIFE so TS is happy
  (async () => {
    try {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      gsap = gsapModule.gsap;
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
    } catch (err) {
      console.error("GSAP dynamic import failed:", err);
    }
  })();
}

/* --------------------------------
   TYPES
---------------------------------- */

export type Section = {
  id?: string;
  background: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  rightLabel?: ReactNode;
};

export type FullScreenFXAPI = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number;
  refresh: () => void;
};

export type FullScreenFXProps = {
  sections: Section[];
  className?: string;
  style?: CSSProperties;

  fontFamily?: string;
  header?: ReactNode;
  footer?: ReactNode;

  showProgress?: boolean;

  durations?: {
    change?: number;
    snap?: number;
  };

  colors?: {
    text?: string;
    overlay?: string;
    pageBg?: string;
    stageBg?: string;
  };

  /** Optional imperative API (not React ref, just a normal RefObject) */
  apiRef?: React.RefObject<FullScreenFXAPI | null>;
};

/* --------------------------------
   UTILS
---------------------------------- */
const clamp = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, n));

/* --------------------------------
   COMPONENT
---------------------------------- */

export function FullScreenScrollFX({
  sections,
  className,
  style,
  fontFamily = '"Rubik Wide", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  header,
  footer,
  showProgress = true,
  durations = { change: 0.7, snap: 800 },
  colors = {
    text: "rgba(245,245,245,0.92)",
    overlay: "rgba(0,0,0,0.35)",
    pageBg: "#ffffff",
    stageBg: "#000000",
  },
  apiRef,
}: FullScreenFXProps) {
  const total = sections.length;

  const [index, setIndex] = useState(0);

  const fixedSectionRef = useRef<HTMLDivElement | null>(null);
  const fixedRef = useRef<HTMLDivElement | null>(null);
  const bgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const progressFillRef = useRef<HTMLDivElement | null>(null);

  // pre-computed scroll targets
  const snapPositionsRef = useRef<number[]>([]);
  const scrollTriggerInstanceRef = useRef<any>(null);

  const changeDuration = durations.change ?? 0.7;
  const snapDuration = durations.snap ?? 800;

  /* --------------------------------
     SNAP POSITION CALC
  ---------------------------------- */

  const computeSnapPositions = useCallback(() => {
    const fs = fixedSectionRef.current;
    if (!fs) return;

    const top = fs.offsetTop;
    const height = fs.offsetHeight;

    const arr: number[] = [];
    for (let i = 0; i < total; i++) {
      arr.push(top + (height * i) / total);
    }
    snapPositionsRef.current = arr;
  }, [total]);

  /* --------------------------------
     PROGRAMMATIC GO TO
  ---------------------------------- */

  const internalGoTo = useCallback(
    (to: number, smooth = true) => {
      if (total === 0) return;
      const clamped = clamp(to, 0, total - 1);

      // update local index state
      setIndex(clamped);

      // move progress bar
      if (progressFillRef.current && total > 1) {
        const pct = (clamped / (total - 1)) * 100;
        progressFillRef.current.style.width = `${pct}%`;
      }

      // scroll position
      const positions = snapPositionsRef.current;
      const targetY =
        positions[clamped] ??
        positions[positions.length - 1] ??
        fixedSectionRef.current?.offsetTop ??
        0;

      if (typeof window !== "undefined") {
        window.scrollTo({
          top: targetY,
          behavior: smooth ? "smooth" : "auto",
        });
      }
    },
    [total]
  );

  /* --------------------------------
     EXPOSE IMPERATIVE API (via apiRef)
  ---------------------------------- */

  useEffect(() => {
    if (!apiRef) return;

    apiRef.current = {
      next: () => internalGoTo(index + 1),
      prev: () => internalGoTo(index - 1),
      goTo: (i: number) => internalGoTo(i),
      getIndex: () => index,
      refresh: () => {
        if (ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      },
    };
  }, [apiRef, index, internalGoTo]);

  /* --------------------------------
     GSAP + SCROLLTRIGGER SETUP
  ---------------------------------- */

  useEffect(() => {
    if (!gsap || !ScrollTrigger) return;

    const fs = fixedSectionRef.current;
    const fixed = fixedRef.current;

    if (!fs || !fixed) return;

    computeSnapPositions();

    // Fade backgrounds by index
    bgRefs.current.forEach((img, i) => {
      if (!img) return;
      gsap.set(img, {
        opacity: i === index ? 1 : 0,
        scale: 1,
      });
    });

    const st = ScrollTrigger.create({
      trigger: fs,
      start: "top top",
      end: "bottom bottom",
      pin: fixed,
      pinSpacing: true,
      scrub: 0, // we step per section, not continuous scrub
      onUpdate: (self: any) => {
        const newIndex = clamp(
          Math.floor(self.progress * total),
          0,
          Math.max(0, total - 1)
        );
        if (newIndex !== index) {
          // avoid infinite loop: we only update index, not scroll here
          setIndex(newIndex);

          // simple bg fade
          bgRefs.current.forEach((img, i) => {
            if (!img) return;
            gsap.to(img, {
              opacity: i === newIndex ? 1 : 0,
              duration: changeDuration,
              ease: "power2.out",
            });
          });

          // progress
          if (progressFillRef.current && total > 1) {
            const pct = (newIndex / (total - 1)) * 100;
            progressFillRef.current.style.width = `${pct}%`;
          }
        }
      },
    });

    scrollTriggerInstanceRef.current = st;

    const handleResize = () => {
      computeSnapPositions();
      ScrollTrigger.refresh();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
      st.kill();
    };
  }, [changeDuration, computeSnapPositions, index, total]);

  /* --------------------------------
     UPDATE BACKGROUND ON INDEX CHANGE
     (for initial render and goTo)
  ---------------------------------- */

  useEffect(() => {
    if (!gsap) return;

    bgRefs.current.forEach((img, i) => {
      if (!img) return;
      gsap.to(img, {
        opacity: i === index ? 1 : 0,
        duration: changeDuration,
        ease: "power2.out",
      });
    });
  }, [index, changeDuration]);

  /* --------------------------------
     CSS VARIABLES
  ---------------------------------- */

  const cssVars: CSSProperties = useMemo(
    () => ({
      "--fx-text": colors.text ?? "rgba(245,245,245,0.92)",
      "--fx-overlay": colors.overlay ?? "rgba(0,0,0,0.35)",
      "--fx-page-bg": colors.pageBg ?? "#ffffff",
      "--fx-stage-bg": colors.stageBg ?? "#000000",
      fontFamily,
    }),
    [colors.pageBg, colors.overlay, colors.stageBg, colors.text, fontFamily]
  );

  /* --------------------------------
     RENDER
  ---------------------------------- */

  return (
    <div
      className={`fx-root ${className ?? ""}`}
      style={{ ...(style || {}), ...cssVars }}
    >
      {/* SCROLLABLE WRAPPER */}
      <div className="fx-scroll">
        {/* BIG SECTION THAT DEFINES SCROLL RANGE */}
        <div className="fx-fixed-section" ref={fixedSectionRef}>
          {/* STICKY STAGE */}
          <div className="fx-fixed" ref={fixedRef}>
            {/* BACKGROUNDS */}
            <div className="fx-bgs" aria-hidden="true">
              {sections.map((s, i) => (
                <div className="fx-bg" key={s.id ?? i}>
               <img
  ref={(el) => {
    bgRefs.current[i] = el;
  }}
  src={s.background}
  alt=""
  className="fx-bg-img"
/>

                  <div className="fx-bg-overlay" />
                </div>
              ))}
            </div>

            {/* GRID LAYOUT */}
            <div className="fx-grid">
              {/* HEADER */}
              {header && <div className="fx-header">{header}</div>}

              {/* MAIN CONTENT */}
              <div className="fx-content">
                {/* LEFT COLUMN */}
                <div className="fx-col fx-col-left">
                  {sections.map((s, i) => (
                    <button
                      key={`L-${s.id ?? i}`}
                      type="button"
                      className={`fx-item ${
                        i === index ? "fx-item-active" : ""
                      }`}
                      onClick={() => internalGoTo(i)}
                    >
                      {s.leftLabel}
                    </button>
                  ))}
                </div>

                {/* CENTER TITLE */}
                <div className="fx-col fx-col-center">
                  <div className="fx-title-wrapper">
                    <h3 className="fx-title">
                      {sections[index]?.title ?? null}
                    </h3>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="fx-col fx-col-right">
                  {sections.map((s, i) => (
                    <button
                      key={`R-${s.id ?? i}`}
                      type="button"
                      className={`fx-item ${
                        i === index ? "fx-item-active" : ""
                      }`}
                      onClick={() => internalGoTo(i)}
                    >
                      {s.rightLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* FOOTER + PROGRESS */}
              <div className="fx-footer">
                {footer && <div className="fx-footer-text">{footer}</div>}
                {showProgress && total > 1 && (
                  <div className="fx-progress">
                    <div className="fx-progress-bar">
                      <div
                        className="fx-progress-fill"
                        ref={progressFillRef}
                      />
                    </div>
                    <div className="fx-progress-labels">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span>{String(total).padStart(2, "0")}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* END SPACER (so we can scroll past last pinned screen) */}
        <div style={{ height: "100vh" }} />
      </div>

      {/* INLINE STYLES */}
      <style jsx>{`
        .fx-root {
          width: 100%;
          background: var(--fx-page-bg);
          color: var(--fx-text);
          overflow: hidden;
        }

        .fx-scroll {
          width: 100%;
        }

        .fx-fixed-section {
          height: ${Math.max(1, total) * 100}vh;
          position: relative;
        }

        .fx-fixed {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background: var(--fx-stage-bg);
        }

        .fx-bgs {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
        }

        .fx-bg {
          position: absolute;
          inset: 0;
        }

        .fx-bg-img {
          position: absolute;
          inset: -10% 0 -10% 0;
          width: 100%;
          height: 120%;
          object-fit: cover;
          filter: brightness(0.8);
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .fx-bg-overlay {
          position: absolute;
          inset: 0;
          background: var(--fx-overlay);
        }

        .fx-grid {
          position: relative;
          z-index: 2;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          padding: 2.5rem 2rem 2.5rem 2rem;
          gap: 1.5rem;
        }

        .fx-header {
          grid-column: 1 / 13;
          text-align: center;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .fx-content {
          grid-column: 1 / 13;
          display: grid;
          grid-template-columns: 1.1fr 1.6fr 1.1fr;
          align-items: center;
          height: 60vh;
          gap: 1.5rem;
        }

        .fx-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .fx-col-left {
          align-items: flex-start;
        }
        .fx-col-right {
          align-items: flex-end;
        }
        .fx-col-center {
          align-items: center;
        }

        .fx-item {
          background: transparent;
          border: none;
          padding: 0.2rem 0;
          margin: 0.25rem 0;
          color: var(--fx-text);
          opacity: 0.4;
          font-size: clamp(0.9rem, 1.7vw, 1.2rem);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .fx-item-active {
          opacity: 1;
          transform: translateX(4px);
        }

        .fx-title-wrapper {
          text-align: center;
          max-width: 18ch;
        }

        .fx-title {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }

        .fx-footer {
          grid-column: 1 / 13;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-top: 1.5rem;
        }

        .fx-footer-text {
          font-size: clamp(1rem, 1.8vw, 1.3rem);
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .fx-progress {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          width: 220px;
        }

        .fx-progress-bar {
          height: 3px;
          width: 100%;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 999px;
          overflow: hidden;
        }

        .fx-progress-fill {
          width: 0%;
          height: 100%;
          background: var(--fx-text);
          transition: width 0.35s ease;
        }

        .fx-progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          margin-top: 0.25rem;
          opacity: 0.7;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .fx-grid {
            padding-inline: 1.3rem;
          }

          .fx-content {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
            height: auto;
          }

          .fx-col-left,
          .fx-col-right {
            align-items: center;
            order: 2;
          }

          .fx-col-center {
            order: 1;
            margin-bottom: 1.5rem;
          }

          .fx-title {
            font-size: clamp(2rem, 9vw, 3rem);
          }
        }
      `}</style>
    </div>
  );
}
