"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════════════════
   INNER-SCROLL 3D BOOK (STYLISH INNER SCROLLBAR & EXPANDED 450VH TRAVEL)
   
   - Fixed 100vh component with dedicated inner scroll (overflow-y: auto)
   - Custom styled inner scrollbar for intuitive user feedback
   - Expanded 450vh inner scroll runway so the full book flip is unhurried
   - Clean matched frames:
       Cover (Img 1) -> 40 Under 40 (Img 2) -> Article Spread (Img 3)
   - Reverses smoothly when scrolling back up
 ══════════════════════════════════════════════════════════════════════════ */

export default function ScrollBook() {
  const innerScrollRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const page0Ref = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const book = bookRef.current;
    const pg0 = page0Ref.current;
    const pg1 = page1Ref.current;
    const side = sideRef.current;
    const glow = glowRef.current;
    const scrollEl = innerScrollRef.current;
    if (!scrollEl || !book || !pg0 || !pg1) return;

    const clamp = (v: number, lo: number, hi: number) =>
      Math.max(lo, Math.min(hi, v));
    const norm = (v: number, lo: number, hi: number) =>
      clamp((v - lo) / (hi - lo), 0, 1);

    const caps = scrollEl.querySelectorAll<HTMLElement>(".sb-cap");
    const dots = scrollEl.querySelectorAll<HTMLElement>(".sb-dot");

    const updateStage = (p: number) => {
      let idx = 0;
      if (p >= 0.70) idx = 2;       // Milestones & Media (Article Spread)
      else if (p >= 0.30) idx = 1;  // Cover Moment (Fortune 40 Under 40)
      else idx = 0;                    // Opening the Chapter

      caps.forEach((c, i) => c.classList.toggle("sb-cap--on", i === idx));
      dots.forEach((d, i) => d.classList.toggle("sb-dot--on", i === idx));

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
      gsap.set(book, { scale: 1 + 0.02 * zEnd, rotateY: -3 * zEnd });
      if (glow) gsap.set(glow, { opacity: 0.85 * zEnd });
    };

    // Set initial fully-visible state
    gsap.set(book, { scale: 1, opacity: 1, rotateY: 0 });
    gsap.set(pg0, { rotateY: 0, z: 4 });
    gsap.set(pg1, { rotateY: 0, z: 2 });
    if (side) gsap.set(side, { opacity: 1, x: 0 });
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
            {/* TEXT COLUMN */}
            <div ref={sideRef} className="sb-text-col">
              <header className="sb-header">
                <span className="sb-eyebrow">Our Journey</span>
                <h2 className="sb-title">
                  A Chapter of <em>Excellence</em>
                </h2>
                <div className="sb-title-rule" aria-hidden />
              </header>

              <div className="sb-caps">
                <div className="sb-cap sb-cap--on">
                  <span className="sb-capno">01</span>
                  <h3 className="sb-cap-title">Fortune India Feature</h3>
                  <p className="sb-cap-body">
                    Brihaspathi Technologies takes center stage in Fortune India&apos;s
                    August 2026 edition, highlighting groundbreaking technology
                    milestones, industry leadership, and nation-building innovation across India.
                  </p>
                </div>
                <div className="sb-cap">
                  <span className="sb-capno">02</span>
                  <h3 className="sb-cap-title">40 Under 40 Honors</h3>
                  <p className="sb-cap-body">
                    Recognized among India&apos;s brightest young business leaders,
                    celebrating visionary tech entrepreneurship, enterprise security solutions,
                    and transformative engineering leadership shaping the country&apos;s digital future.
                  </p>
                </div>
                <div className="sb-cap">
                  <span className="sb-capno">03</span>
                  <h3 className="sb-cap-title">Critical Infrastructure Leader</h3>
                  <p className="sb-cap-body">
                    Engineering the backbone of India&apos;s infrastructure with 90+ major
                    government projects across 15 states, 15,000+ clients, and 55,000+
                    surveillance deployments nationwide under Rajasekhar Papolu&apos;s leadership.
                  </p>
                </div>
              </div>

              <div className="sb-dots" aria-hidden>
                <span className="sb-dot sb-dot--on" />
                <span className="sb-dot" />
                <span className="sb-dot" />
              </div>

              <div className="sb-meta">
                <span className="sb-meta-line" aria-hidden />
                <span>Fortune India · August 2026 Edition</span>
              </div>
            </div>

            {/* BOOK COLUMN */}
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
          min-height: 520px;
          overflow-y: auto;
          overflow-x: hidden;
          background: #ffffff;
          /* Custom styled inner scrollbar */
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
          min-height: 520px;
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
          max-width: 1480px;
          margin: 0 auto;
          display: flex;
          align-items: stretch;
          gap: clamp(1rem, 3vw, 3rem);
          padding: clamp(.4rem, 1.5vh, 1rem) clamp(1rem, 4vw, 4rem);
        }

        .sb-text-col {
          position: relative;
          width: 70%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .sb-header {
          position: relative; z-index: 2;
          text-align: left;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: .4rem;
          margin-bottom: clamp(.5rem, 1.5vh, 1.1rem);
        }
        .sb-eyebrow {
          font-family: Georgia, serif;
          font-size: clamp(.6rem, 1vw, .8rem);
          letter-spacing: .52em;
          text-transform: uppercase;
          color: #07518a;
        }
        .sb-title {
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(1.5rem, 3.4vw, 2.9rem);
          font-weight: 700;
          color: hsl(220,25%,14%);
          letter-spacing: -.018em;
          line-height: 1.08;
        }
        .sb-title em {
          font-style: italic;
          font-weight: 700;
          color: #07518a;
        }
        .sb-title-rule {
          width: clamp(48px, 7vw, 84px);
          height: 3px;
          background: linear-gradient(to right, #07518a, #2f9bd8, transparent);
          border-radius: 2px;
          margin-top: .15rem;
        }

        .sb-caps {
          position: relative;
          flex: 1;
          width: 100%;
          min-height: 0;
        }
        .sb-cap {
          position: absolute;
          left: 0; right: 0; top: 50%;
          transform: translateY(calc(-50% + 18px));
          opacity: 0;
          pointer-events: none;
          transition: opacity .55s ease, transform .55s ease;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: .55rem;
        }
        .sb-cap--on {
          opacity: 1;
          transform: translateY(-50%);
        }
        .sb-capno {
          font-family: Georgia, serif;
          font-size: clamp(2.2rem, 4.6vw, 4.2rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: .02em;
          color: rgba(7,81,138,.13);
        }
        .sb-cap-title {
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 700;
          color: #07518a;
          line-height: 1.15;
        }
        .sb-cap-body {
          margin: 0;
          max-width: 48ch;
          font-family: Georgia, serif;
          font-size: clamp(.85rem, 1.5vw, 1.05rem);
          color: hsl(220,18%,34%);
          line-height: 1.7;
        }

        .sb-dots {
          display: flex;
          align-items: center;
          gap: .55rem;
          margin-top: clamp(.8rem, 2vh, 1.5rem);
        }
        .sb-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: hsl(220,20%,84%);
          transition: all .35s ease;
        }
        .sb-dot--on {
          width: 26px;
          border-radius: 999px;
          background: #07518a;
        }

        .sb-meta {
          display: flex;
          align-items: center;
          gap: .6rem;
          margin-top: clamp(.7rem, 1.8vh, 1.2rem);
          font-family: Georgia, serif;
          font-size: clamp(.58rem, .95vw, .72rem);
          letter-spacing: .34em;
          text-transform: uppercase;
          color: #07518a;
        }
        .sb-meta-line {
          width: 36px; height: 1px;
          background: #07518a;
          opacity: .55;
        }

        .sb-stage {
          position: relative; z-index: 2;
          width: 30%;
          min-width: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1700px;
          perspective-origin: 50% 46%;
          overflow: visible;
        }

        .sb-glow {
          position: absolute;
          top: 50%; left: 50%;
          width: min(80vw, 560px);
          height: min(80vw, 560px);
          transform: translate(-50%, -50%);
          background: radial-gradient(circle,
            hsla(46,95%,62%,.32) 0%,
            hsla(215,70%,60%,.12) 42%,
            transparent 68%);
          filter: blur(28px);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
        }

        .sb-book {
          position: relative;
          height: min(66vh, 66dvh, 560px);
          width:  min(46vh, 46dvh, 382px);
          min-height: 280px;
          min-width:  200px;
          transform-style: preserve-3d;
          transform-origin: center center;
          opacity: 0;
        }

        .sb-spine {
          position: absolute;
          height: 100%; left: 0; top: 0; width: 18px;
          background: linear-gradient(to right,
            hsl(220,20%,20%) 0%,
            hsl(220,16%,34%) 55%,
            hsl(220,18%,24%) 100%);
          transform: translate3d(-1px, 0, -18px);
          border-radius: 4px 0 0 4px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          box-shadow: -3px 0 12px rgba(0,0,0,.18);
        }
        .sb-spine-txt {
          writing-mode: vertical-rl;
          font-family: Georgia, serif;
          font-size: 6.5px;
          letter-spacing: .24em;
          color: hsl(220,14%,62%);
          text-transform: uppercase;
          transform: rotate(180deg);
          white-space: nowrap;
        }

        .sb-shadow {
          position: absolute;
          bottom: -28px; left: 4%; width: 92%; height: 28px;
          background: radial-gradient(ellipse 88% 55% at 50% 0%,
            rgba(0,0,0,.22) 0%, transparent 100%);
          filter: blur(10px);
          z-index: -1; pointer-events: none;
        }

        .sb-backboard {
          position: absolute; inset: 0;
          border-radius: 2px 9% 9% 2px;
          overflow: hidden;
          background: #fafafa;
          z-index: 0;
          box-shadow:
            4px 6px 40px rgba(0,0,0,.18),
            1px 1px 0 rgba(255,255,255,.04) inset;
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
            2px 0 20px rgba(0,0,0,.09),
            inset -1px 0 0 rgba(0,0,0,.06);
        }

        .sb-half--b {
          transform: rotateY(180deg);
          border-radius: 9% 2px 2px 9%;
          background: hsl(44,28%,96%);
          box-shadow:
            -2px 0 20px rgba(0,0,0,.09),
            inset 1px 0 0 rgba(0,0,0,.06);
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
        .sb-cover-veil {
          position: absolute; inset: 0;
          background:
            linear-gradient(to bottom,
              rgba(5,10,22,.08) 0%,
              rgba(5,10,22,.04) 32%,
              rgba(5,10,22,.52) 72%,
              rgba(5,10,22,.80) 100%);
        }
        .sb-cover-text {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding: clamp(.9rem, 3vmin, 2rem);
          gap: .44rem;
        }
        .sb-cover-year-badge {
          position: absolute;
          top: clamp(.65rem,2vmin,1.1rem);
          right: clamp(.65rem,2vmin,1.1rem);
          font-family: Georgia, serif;
          font-size: clamp(.48rem,1vmin,.68rem);
          letter-spacing: .46em;
          text-transform: uppercase;
          color: rgba(198,224,255,.74);
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(200,222,255,.20);
          border-radius: 3px;
          padding: .18em .52em;
          backdrop-filter: blur(6px);
        }
        .sb-wordmark { width: min(84%,215px); }
        .sb-cover-sub {
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(.38rem,1vmin,.66rem);
          letter-spacing: .34em;
          text-transform: uppercase;
          color: rgba(182,215,255,.68);
        }
        .sb-shine {
          position: absolute; inset: 0;
          background: linear-gradient(
            112deg,
            transparent 40%,
            rgba(255,255,255,.055) 50%,
            transparent 60%);
          pointer-events: none;
        }

        .sb-endpaper {
          position: relative;
          width: 100%; height: 100%;
          border-radius: 9% 2px 2px 9%;
          background: hsl(44, 30%, 96%);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
        }
        .sb-ep-inner {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: .5rem; text-align: center;
        }
        .sb-ep-svg { display: block; }
        .sb-ep-brand {
          font-family: Georgia, serif;
          font-weight: 700;
          font-size: clamp(.7rem, 1.4vw, .95rem);
          letter-spacing: .35em;
          color: #07518a;
          margin-top: .3rem;
        }
        .sb-ep-sub {
          font-family: Georgia, serif;
          font-size: clamp(.45rem, .9vw, .6rem);
          letter-spacing: .4em;
          color: hsl(220,16%,55%);
        }

        .sb-mat {
          width: 88%; height: 88%;
          display: flex; align-items: center; justify-content: center;
          background: hsl(44,24%,96%);
          border-radius: 5px;
          box-shadow:
            0 0 0 10px hsl(44,20%,94%),
            0 0 0 11px rgba(0,0,0,.055),
            0 10px 38px rgba(20,30,55,.12),
            0 2px 6px rgba(0,0,0,.06);
        }
        .sb-mat-frame {
          position: relative;
          width: 93%; height: 88%;
          overflow: hidden;
          border-radius: 3px;
          box-shadow:
            0 0 0 1px rgba(0,0,0,.08),
            0 5px 20px rgba(0,0,0,.15);
        }
        .sb-inner-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          user-select: none; pointer-events: none;
        }
        .sb-inner-cap {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: .5rem .75rem;
          background: linear-gradient(to top, rgba(0,0,0,.70), transparent);
          font-family: Georgia, serif;
          font-style: italic;
          font-size: clamp(.42rem,1.05vmin,.7rem);
          color: rgba(255,255,255,.90);
          letter-spacing: .04em;
          margin: 0;
        }

        .sb-editorial-back {
          position: relative;
          width: 100%; height: 100%;
          border-radius: 9% 2px 2px 9%;
          background: hsl(44, 28%, 95%);
          display: flex; align-items: center; justify-content: center;
          padding: clamp(1rem, 2.5vmin, 2rem);
        }
        .sb-ed-inner {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; gap: .6rem;
        }
        .sb-ed-tag {
          font-family: Georgia, serif;
          font-size: clamp(.48rem, 1vw, .62rem);
          letter-spacing: .38em;
          color: #07518a;
          font-weight: 700;
        }
        .sb-ed-rule {
          width: 40px; height: 1.5px;
          background: #07518a; opacity: 0.5;
        }
        .sb-ed-quote {
          margin: 0;
          font-family: Georgia, serif;
          font-style: italic;
          font-size: clamp(.72rem, 1.4vw, .95rem);
          color: hsl(220, 22%, 24%);
          line-height: 1.5;
          max-width: 22ch;
        }
        .sb-ed-url {
          font-family: Georgia, serif;
          font-size: clamp(.42rem, .85vw, .55rem);
          letter-spacing: .3em;
          color: hsl(220, 16%, 50%);
          text-transform: uppercase;
        }

        .sb-pnum {
          position: absolute; bottom: .65rem;
          font-family: Georgia, serif;
          font-size: max(.58rem,.9vmin);
          color: hsl(220,16%,52%);
          z-index: 5; pointer-events: none;
        }
        .sb-pnum--r { right: .8rem; }
        .sb-pnum--l { left: .8rem; }

        .sb-progress {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
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
          font-size: clamp(.56rem,.95vw,.7rem);
          letter-spacing: .28em;
          text-transform: uppercase;
          color: hsl(220,16%,52%);
          text-align: center;
          flex-shrink: 0;
          animation: sbpulse 2.8s ease-in-out infinite;
        }
        @keyframes sbpulse {
          0%,100% { opacity: .65; }
          50%      { opacity: 1;   }
        }

        @media (max-width: 900px) {
          .sb-layout {
            flex-direction: column;
            gap: .5rem;
            padding: .5rem 1.25rem;
          }
          .sb-text-col {
            width: 100%;
            flex: none;
            text-align: left;
            padding-top: .25rem;
          }
          .sb-header { margin-bottom: .35rem; }
          .sb-caps { flex: none; min-height: 0; }
          .sb-cap-title { font-size: clamp(1.15rem, 5vw, 1.6rem); }
          .sb-capno { font-size: clamp(1.6rem, 7vw, 2.4rem); }
          .sb-cap-body { font-size: clamp(.78rem, 2.6vw, .92rem); }
          .sb-dots { margin-top: .5rem; }
          .sb-meta { margin-top: .45rem; }
          .sb-stage {
            width: 100%;
            min-width: 0;
            flex: 1;
          }
          .sb-book {
            height: min(44vh,44dvh,340px);
            width:  min(31vh,31dvh,240px);
            min-height: 0;
            min-width:  0;
          }
        }
        @media (max-width: 480px) {
          .sb-title { font-size: clamp(1.3rem, 6vw, 1.7rem); }
          .sb-book {
            height: min(46vh,46dvh,360px);
            width:  min(33vh,33dvh,255px);
          }
        }
        @media (max-height: 560px) and (orientation: landscape) {
          .sb-header { display: none; }
          .sb-dots, .sb-meta { display: none; }
          .sb-book {
            height: min(72vh,72dvh,330px);
            width:  min(51vh,51dvh,232px);
          }
        }

        @supports (height: 100dvh) {
          .sb-sticky { height: 100dvh; }
        }
      `}</style>
    </>
  );
}