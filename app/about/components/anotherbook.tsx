"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════════════════
   HIGH-QUALITY CENTERED 3D BOOK SHOWCASE (100VH STICKY VIEWER)
   
   - Fixed 100vh component with dedicated inner scroll (overflow-y: auto)
   - Extra Large High-Definition 3D Book centered on screen
   - Clean 3D Page Flip animation (Cover -> Inner Page -> Backboard Spread)
   - Reverses smoothly when scrolling back up
 ══════════════════════════════════════════════════════════════════════════ */

export default function AnotherScrollBook() {
  const innerScrollRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const page0Ref = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const book = bookRef.current;
    const pg0 = page0Ref.current;
    const pg1 = page1Ref.current;
    const glow = glowRef.current;
    const scrollEl = innerScrollRef.current;
    if (!scrollEl || !book || !pg0 || !pg1) return;

    const clamp = (v: number, lo: number, hi: number) =>
      Math.max(lo, Math.min(hi, v));
    const norm = (v: number, lo: number, hi: number) =>
      clamp((v - lo) / (hi - lo), 0, 1);

    const updateStage = (p: number) => {
      const fill = scrollEl.querySelector<HTMLElement>("#sb-prog-fill");
      if (fill) fill.style.width = `${p * 100}%`;
    };

    const onScroll = () => {
      const max = scrollEl.scrollHeight - scrollEl.clientHeight;
      if (max <= 0) return;
      const p = scrollEl.scrollTop / max;

      updateStage(p);

      // Phase 1: Cover (Page 0) flips open (p: 0.10 -> 0.45)
      const z0 = norm(p, 0.10, 0.45);
      const r0 = -180 * z0;
      const z0arc = z0 < 0.5 ? 4 + 46 * (z0 / 0.5) : 50 - 46 * ((z0 - 0.5) / 0.5);
      gsap.set(pg0, { rotateY: r0, z: z0arc });

      // Phase 2: Page 1 flips open (p: 0.45 -> 0.80)
      const z1 = norm(p, 0.45, 0.80);
      const r1 = -180 * z1;
      const z1arc = z1 < 0.5 ? 2 + 48 * (z1 / 0.5) : 50 - 48 * ((z1 - 0.5) / 0.5);
      gsap.set(pg1, { rotateY: r1, z: z1arc });

      // Phase 3: Resting open spread with ambient glow (p: 0.80 -> 1.00)
      const zEnd = norm(p, 0.80, 1.00);
      gsap.set(book, { scale: 1 + 0.03 * zEnd, rotateY: -3 * zEnd });
      if (glow) gsap.set(glow, { opacity: 0.85 * zEnd });
    };

    // Set initial fully-visible state
    gsap.set(book, { scale: 1, opacity: 1, rotateY: 0 });
    gsap.set(pg0, { rotateY: 0, z: 4 });
    gsap.set(pg1, { rotateY: 0, z: 2 });
    if (glow) gsap.set(glow, { opacity: 0 });
    updateStage(0);

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* ══ OUTER: fixed 100vh with inner scroll container ══ */}
      <div ref={innerScrollRef} className="sb-outer">
        {/* Expanded phantom height (450vh) for long, comfortable scroll travel */}
        <div className="sb-phantom" aria-hidden />

        {/* Sticky UI Panel — stays fixed while inner scrolling */}
        <div className="sb-sticky">
          <div className="sb-bg-texture" aria-hidden />

          <div className="sb-layout">
            {/* CENTERED HIGH-DEFINITION 3D BOOK */}
            <div className="sb-stage">
              <div className="sb-glow" ref={glowRef} aria-hidden />

              <div ref={bookRef} className="sb-book">
                <div className="sb-spine" aria-hidden>
                  <span className="sb-spine-txt">BRIHASPATHI · 2026</span>
                </div>
                <div className="sb-shadow" aria-hidden />

                {/* BACKBOARD: Article Spread (Photo 3) */}
                <div className="sb-backboard">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/book-img-3.jpeg"
                    alt="Brihaspathi – Infrastructure Feature"
                    className="sb-backboard-img"
                    draggable={false}
                  />
                </div>

                {/* PAGE 0 (FRONT COVER - Photo 1) */}
                <div ref={page0Ref} className="sb-page" style={{ zIndex: 4 }}>
                  <div className="sb-half sb-half--f">
                    <div className="sb-cover-shell">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/book-img-1.jpeg"
                        alt="Brihaspathi – Cover Feature"
                        className="sb-cover-img"
                        draggable={false}
                      />
                    </div>
                  </div>

                  <div className="sb-half sb-half--b">
                    <div className="sb-endpaper">
                      <div className="sb-ep-inner">
                        <svg viewBox="0 0 100 100" width="56" height="56" className="sb-ep-svg">
                          <circle cx="50" cy="50" r="44" fill="none" stroke="#07518a" strokeWidth="0.8" opacity="0.3" />
                          <circle cx="50" cy="50" r="32" fill="none" stroke="#07518a" strokeWidth="0.5" opacity="0.25" />
                          <path d="M50 15 L50 85 M15 50 L85 50" stroke="#07518a" strokeWidth="0.5" opacity="0.25" />
                        </svg>
                        <span className="sb-ep-brand">BRIHASPATHI</span>
                        <span className="sb-ep-sub">FORTUNE INDIA · AUG 2026</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PAGE 1 (INNER PAGE - Photo 2 / Fortune 40 Under 40) */}
                <div ref={page1Ref} className="sb-page" style={{ zIndex: 2 }}>
                  <div className="sb-half sb-half--f sb-half--paper">
                    <div className="sb-mat">
                      <div className="sb-mat-frame">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/book-img-2.jpeg"
                          alt="Fortune India Aug 2026"
                          className="sb-inner-img"
                          draggable={false}
                        />
                        <p className="sb-inner-cap">Fortune India &bull; 40 Under 40</p>
                      </div>
                    </div>
                    <span className="sb-pnum sb-pnum--r">1</span>
                  </div>

                  <div className="sb-half sb-half--b">
                    <div className="sb-editorial-back">
                      <div className="sb-ed-inner">
                        <span className="sb-ed-tag">NATIONAL IMPACT</span>
                        <div className="sb-ed-rule" />
                        <p className="sb-ed-quote">
                          &ldquo;90+ Government &amp; Enterprise Projects Across 15 Indian States&rdquo;
                        </p>
                        <span className="sb-ed-url">www.brihaspathi.com</span>
                      </div>
                      <span className="sb-pnum sb-pnum--l">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sb-progress" aria-hidden>
            <div className="sb-progress-fill" id="sb-prog-fill" />
          </div>

          <p className="sb-hint">Scroll inside to turn pages ↓</p>
        </div>
      </div>

      <style>{`
        .sb-outer *, .sb-outer *::before, .sb-outer *::after {
          box-sizing: border-box;
        }

        /* ══ OUTER CONTAINER — 100vh with inner scroll ═══════════════ */
        .sb-outer {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          min-height: 560px;
          overflow-y: auto;
          overflow-x: hidden;
          background: #ffffff;
          scrollbar-width: thin;
          scrollbar-color: #07518a rgba(7,81,138,0.08);
        }
        .sb-outer::-webkit-scrollbar {
          width: 8px;
        }
        .sb-outer::-webkit-scrollbar-track {
          background: rgba(7, 81, 138, 0.08);
          border-radius: 4px;
        }
        .sb-outer::-webkit-scrollbar-thumb {
          background: #07518a;
          border-radius: 4px;
        }
        .sb-outer::-webkit-scrollbar-thumb:hover {
          background: #053a63;
        }

        /* Phantom height — 450vh inner scroll space */
        .sb-phantom {
          position: absolute;
          top: 0; left: 0;
          width: 1px;
          height: 450vh;
          pointer-events: none;
        }

        /* Sticky panel stays fixed while inner scroll runs */
        .sb-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          min-height: 560px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #ffffff;
          isolation: isolate;
        }

        .sb-bg-texture {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(
            circle, hsl(220,18%,82%) 1px, transparent 1px
          );
          background-size: 28px 28px;
          opacity: .38;
        }

        .sb-layout {
          position: relative; z-index: 2;
          flex: 1;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(.5rem, 2vh, 1.5rem);
        }

        .sb-stage {
          position: relative; z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 2000px;
          perspective-origin: 50% 50%;
          overflow: visible;
        }

        .sb-glow {
          position: absolute;
          top: 50%; left: 50%;
          width: min(90vw, 750px);
          height: min(90vw, 750px);
          transform: translate(-50%, -50%);
          background: radial-gradient(circle,
            hsla(46,95%,62%,.38) 0%,
            hsla(215,70%,60%,.18) 45%,
            transparent 70%);
          filter: blur(36px);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
        }

        /* ══ HIGH-QUALITY LARGER 3D BOOK DIMENSIONS ═════════════════════ */
        .sb-book {
          position: relative;
          height: min(78vh, 78dvh, 720px);
          width:  min(55vh, 55dvh, 500px);
          min-height: 360px;
          min-width:  250px;
          transform-style: preserve-3d;
          transform-origin: center center;
          opacity: 0;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.3);
        }

        .sb-spine {
          position: absolute;
          height: 100%; left: 0; top: 0; width: 24px;
          background: linear-gradient(to right,
            hsl(220,20%,18%) 0%,
            hsl(220,16%,36%) 55%,
            hsl(220,18%,22%) 100%);
          transform: translate3d(-1px, 0, -24px);
          border-radius: 4px 0 0 4px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          box-shadow: -4px 0 16px rgba(0,0,0,.22);
        }
        .sb-spine-txt {
          writing-mode: vertical-rl;
          font-family: Georgia, serif;
          font-size: 8px;
          letter-spacing: .26em;
          color: hsl(220,14%,68%);
          text-transform: uppercase;
          transform: rotate(180deg);
          white-space: nowrap;
        }

        .sb-shadow {
          position: absolute;
          bottom: -36px; left: 3%; width: 94%; height: 36px;
          background: radial-gradient(ellipse 90% 60% at 50% 0%,
            rgba(0,0,0,.28) 0%, transparent 100%);
          filter: blur(14px);
          z-index: -1; pointer-events: none;
        }

        .sb-backboard {
          position: absolute; inset: 0;
          border-radius: 2px 9% 9% 2px;
          overflow: hidden;
          background: #fafafa;
          z-index: 0;
          box-shadow:
            6px 10px 50px rgba(0,0,0,.22),
            1px 1px 0 rgba(255,255,255,.05) inset;
        }
        .sb-backboard-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          user-select: none; pointer-events: none;
        }

        .sb-page {
          position: absolute; inset: 0;
          transform-style: preserve-3d;
          transform-origin: left center;
          transform: rotateY(0deg);
          will-change: transform;
        }

        .sb-half {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }

        .sb-half--f {
          transform: rotateY(0deg);
          border-radius: 2px 9% 9% 2px;
          background: #fafafa;
          box-shadow:
            3px 0 24px rgba(0,0,0,.11),
            inset -1px 0 0 rgba(0,0,0,.07);
        }

        .sb-half--b {
          transform: rotateY(180deg);
          border-radius: 9% 2px 2px 9%;
          background: hsl(44,28%,96%);
          box-shadow:
            -3px 0 24px rgba(0,0,0,.11),
            inset 1px 0 0 rgba(0,0,0,.07);
        }

        .sb-half--paper {
          background:
            repeating-linear-gradient(
              0deg,
              transparent              0 1.25rem,
              hsla(220,22%,60%,.10) 1.25rem calc(1.25rem + 1px),
              transparent              calc(1.25rem + 1px)
            ) 0 1.5rem / 100% 100% no-repeat,
            hsl(44,30%,98%);
        }

        .sb-cover-shell {
          position: absolute; inset: 0;
          overflow: hidden;
          border-radius: 2px 9% 9% 2px;
        }
        .sb-cover-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          user-select: none; pointer-events: none;
        }

        .sb-endpaper {
          position: relative;
          width: 100%; height: 100%;
          border-radius: 9% 2px 2px 9%;
          background: hsl(44, 30%, 96%);
          display: flex; align-items: center; justify-content: center;
          padding: 1.8rem;
        }
        .sb-ep-inner {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: .6rem; text-align: center;
        }
        .sb-ep-svg { display: block; }
        .sb-ep-brand {
          font-family: Georgia, serif;
          font-weight: 700;
          font-size: clamp(.8rem, 1.6vw, 1.1rem);
          letter-spacing: .35em;
          color: #07518a;
          margin-top: .3rem;
        }
        .sb-ep-sub {
          font-family: Georgia, serif;
          font-size: clamp(.5rem, 1.1vw, .7rem);
          letter-spacing: .4em;
          color: hsl(220,16%,55%);
        }

        .sb-mat {
          width: 90%; height: 90%;
          display: flex; align-items: center; justify-content: center;
          background: hsl(44,24%,96%);
          border-radius: 6px;
          box-shadow:
            0 0 0 12px hsl(44,20%,94%),
            0 0 0 13px rgba(0,0,0,.06),
            0 12px 42px rgba(20,30,55,.14),
            0 3px 8px rgba(0,0,0,.07);
        }
        .sb-mat-frame {
          position: relative;
          width: 94%; height: 90%;
          overflow: hidden;
          border-radius: 4px;
          box-shadow:
            0 0 0 1px rgba(0,0,0,.09),
            0 6px 24px rgba(0,0,0,.18);
        }
        .sb-inner-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          user-select: none; pointer-events: none;
        }
        .sb-inner-cap {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: .6rem .85rem;
          background: linear-gradient(to top, rgba(0,0,0,.75), transparent);
          font-family: Georgia, serif;
          font-style: italic;
          font-size: clamp(.5rem,1.2vmin,.8rem);
          color: rgba(255,255,255,.92);
          letter-spacing: .04em;
          margin: 0;
        }

        .sb-editorial-back {
          position: relative;
          width: 100%; height: 100%;
          border-radius: 9% 2px 2px 9%;
          background: hsl(44, 28%, 95%);
          display: flex; align-items: center; justify-content: center;
          padding: clamp(1.2rem, 2.8vmin, 2.4rem);
        }
        .sb-ed-inner {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; gap: .7rem;
        }
        .sb-ed-tag {
          font-family: Georgia, serif;
          font-size: clamp(.55rem, 1.2vw, .72rem);
          letter-spacing: .38em;
          color: #07518a;
          font-weight: 700;
        }
        .sb-ed-rule {
          width: 45px; height: 1.5px;
          background: #07518a; opacity: 0.5;
        }
        .sb-ed-quote {
          margin: 0;
          font-family: Georgia, serif;
          font-style: italic;
          font-size: clamp(.82rem, 1.6vw, 1.1rem);
          color: hsl(220, 22%, 24%);
          line-height: 1.5;
          max-width: 22ch;
        }
        .sb-ed-url {
          font-family: Georgia, serif;
          font-size: clamp(.48rem, 1vw, .65rem);
          letter-spacing: .3em;
          color: hsl(220, 16%, 50%);
          text-transform: uppercase;
        }

        .sb-pnum {
          position: absolute; bottom: .75rem;
          font-family: Georgia, serif;
          font-size: max(.62rem,1vmin);
          color: hsl(220,16%,52%);
          z-index: 5; pointer-events: none;
        }
        .sb-pnum--r { right: .9rem; }
        .sb-pnum--l { left: .9rem; }

        .sb-progress {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 4px;
          background: hsl(220,16%,90%);
          z-index: 5;
          flex-shrink: 0;
        }
        .sb-progress-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(to right, #07518a, #2f9bd8);
          border-radius: 0 2px 2px 0;
          transition: width .15s linear;
        }

        .sb-hint {
          position: relative; z-index: 3;
          margin: 0;
          padding-bottom: clamp(.5rem,1.5vh,.9rem);
          font-family: Georgia, serif;
          font-size: clamp(.6rem,1vw,.75rem);
          letter-spacing: .28em;
          text-transform: uppercase;
          color: hsl(220,16%,50%);
          text-align: center;
          flex-shrink: 0;
          animation: sbpulse 2.8s ease-in-out infinite;
        }
        @keyframes sbpulse {
          0%,100% { opacity: .65; }
          50%      { opacity: 1;   }
        }

        @media (max-width: 900px) {
          .sb-book {
            height: min(65vh, 65dvh, 520px);
            width: min(46vh, 46dvh, 360px);
          }
        }
        @media (max-width: 480px) {
          .sb-book {
            height: min(62vh, 62dvh, 460px);
            width: min(44vh, 44dvh, 320px);
          }
        }

        @supports (height: 100dvh) {
          .sb-sticky { height: 100dvh; }
        }
      `}</style>
    </>
  );
}