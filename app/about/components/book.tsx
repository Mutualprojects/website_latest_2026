"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════════════════
   SCROLL ARCHITECTURE  — 280 vh total, white background
   
   wrapper  = 380vh  (280vh pinned scroll travel + 100vh panel)
   sticky   = 100vh  (locked to viewport — what you actually see)
   
   Zone 0   0  → 35vh   book scales in  0.60 → 1.00
   Zone 1   35 → 105vh  page[0] flips   front cover → img-2 visible (70vh travel)
   Zone 2   105→ 175vh  page[1] flips   inner page  → img-3 visible (70vh travel)
   Zone 3   175→ 255vh  book CLOSES     page[1] folds shut, then page[0] (cover) — 3D book folds closed
   Zone 4   255→ 280vh  ENDING FRAME    closed book tilts back, soft glow + caption fade in

   Image mapping
   ─ book-img-1.jpeg  → FRONT COVER  (full-bleed photo)
   ─ book-img-2.jpeg  → INNER PAGE   (matted / editorial frame)
   ─ book-img-3.jpeg  → BACK COVER   (full-bleed photo)
 ══════════════════════════════════════════════════════════════════════════ */

export default function ScrollBook() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const page0Ref = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const wrap = wrapRef.current;
    const book = bookRef.current;
    const pg0 = page0Ref.current;
    const pg1 = page1Ref.current;
    const side = sideRef.current;
    const glow = glowRef.current;
    const card = cardRef.current;
    if (!wrap || !book || !pg0 || !pg1) return;

    const vh = () => window.visualViewport?.height ?? window.innerHeight;

    const ctx = gsap.context(() => {

      /* ── Side Content Reveal (reveals as book opens) ───────────── */
      if (side) {
        gsap.fromTo(side,
          { opacity: 0, x: 50, scale: 0.94 },
          {
            opacity: 1, x: 0, scale: 1, ease: "none",
            scrollTrigger: {
              trigger: wrap,
              scrub: 1.2,
              start: () => `top+=${vh() * 0.35}`,
              end: () => `top+=${vh() * 0.85}`,
            },
          }
        );
      }

      /* ── Zone 0 · Scale in 0.60 → 1.00 ─────────────────────────── */
      gsap.fromTo(book,
        { scale: 0.60, opacity: 0 },
        {
          scale: 1, opacity: 1, ease: "none",
          scrollTrigger: {
            trigger: wrap,
            scrub: 1.6,
            start: "top top",
            end: () => `+=${vh() * 0.35}`,
          },
        }
      );

      /* ── Zone 1 · page[0] flips  0° → -180° ────────────────────── */
      gsap.set(pg0, { z: 4 });

      // rotation
      gsap.to(pg0, {
        rotateY: -180, ease: "none",
        scrollTrigger: {
          trigger: wrap,
          scrub: 1.6,
          start: () => `top+=${vh() * 0.35}`,
          end: () => `top+=${vh() * 1.05}`,
        },
      });
      // z-arc (page lifts mid-flip for realism)
      gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          scrub: 1.6,
          start: () => `top+=${vh() * 0.35}`,
          end: () => `top+=${vh() * 1.05}`,
        },
      })
        .to(pg0, { z: 50, ease: "sine.in", duration: 0.5 })
        .to(pg0, { z: -4, ease: "sine.out", duration: 0.5 });

      /* ── Zone 2 · page[1] flips  0° → -180° ────────────────────── */
      gsap.set(pg1, { z: 2 });

      gsap.to(pg1, {
        rotateY: -180, ease: "none",
        scrollTrigger: {
          trigger: wrap,
          scrub: 1.6,
          start: () => `top+=${vh() * 1.05}`,
          end: () => `top+=${vh() * 1.75}`,
        },
      });
      gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          scrub: 1.6,
          start: () => `top+=${vh() * 1.05}`,
          end: () => `top+=${vh() * 1.75}`,
        },
      })
        .to(pg1, { z: 50, ease: "sine.in", duration: 0.5 })
        .to(pg1, { z: -2, ease: "sine.out", duration: 0.5 });

      /* ── Zone 3 · BOOK CLOSES (folds shut like a real book) ────── */
      /* page[1] folds back first (top sheet), then page[0] (cover)   */

      // 3a · page[1] closes  -180° → 0°  (inner page sweeps back right-half)
      gsap.to(pg1, {
        rotateY: 0, ease: "power2.inOut",
        scrollTrigger: {
          trigger: wrap,
          scrub: 1.6,
          start: () => `top+=${vh() * 1.75}`,
          end: () => `top+=${vh() * 2.15}`,
        },
      });
      gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          scrub: 1.6,
          start: () => `top+=${vh() * 1.75}`,
          end: () => `top+=${vh() * 2.15}`,
        },
      })
        .fromTo(pg1, { z: -2 }, { z: 55, ease: "sine.in", duration: 0.5 })
        .to(pg1, { z: 5, ease: "sine.out", duration: 0.5 });

      // 3b · page[0] closes  -180° → 0°  (cover folds over everything)
      gsap.to(pg0, {
        rotateY: 0, ease: "power2.inOut",
        scrollTrigger: {
          trigger: wrap,
          scrub: 1.6,
          start: () => `top+=${vh() * 2.15}`,
          end: () => `top+=${vh() * 2.55}`,
        },
      });
      gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          scrub: 1.6,
          start: () => `top+=${vh() * 2.15}`,
          end: () => `top+=${vh() * 2.55}`,
        },
      })
        .fromTo(pg0, { z: -4 }, { z: 60, ease: "sine.in", duration: 0.5 })
        .to(pg0, { z: 6, ease: "sine.out", duration: 0.5 });

      /* ── Zone 4 · ENDING FRAME (book folds shut, #07518a card rises) ── */
      gsap.to(book, {
        scale: 0.55, y: 36, rotateY: 8, opacity: 0.4, ease: "power2.inOut",
        scrollTrigger: {
          trigger: wrap,
          scrub: 1.6,
          start: () => `top+=${vh() * 2.55}`,
          end: () => `top+=${vh() * 2.80}`,
        },
      });

      if (card) {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.82, y: 34 },
          {
            opacity: 1, scale: 1, y: 0, ease: "power2.out",
            scrollTrigger: {
              trigger: wrap,
              scrub: 1.6,
              start: () => `top+=${vh() * 2.52}`,
              end: () => `top+=${vh() * 2.80}`,
            },
          }
        );
      }

      if (glow) {
        gsap.fromTo(glow,
          { opacity: 0 },
          {
            opacity: 1, ease: "none",
            scrollTrigger: {
              trigger: wrap,
              scrub: 1.2,
              start: () => `top+=${vh() * 2.5}`,
              end: () => `top+=${vh() * 2.8}`,
            },
          }
        );
      }

      /* ── Stage captions + dots (crossfade per zone) ──────────── */
      const caps = gsap.utils.toArray<HTMLElement>(".sb-cap");
      const dots = gsap.utils.toArray<HTMLElement>(".sb-dot");
      const zoneEnds = [0.125, 0.375, 0.625, 0.91, 1.01];

      const setStage = (progress: number) => {
        let i = 0;
        while (i < zoneEnds.length && progress >= zoneEnds[i]) i++;
        const idx = Math.min(4, i);
        caps.forEach((c, k) => c.classList.toggle("sb-cap--on", k === idx));
        dots.forEach((d, k) => d.classList.toggle("sb-dot--on", k === idx));
      };

      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: () => `top+=${vh() * 2.8}`,
        onUpdate: (self) => setStage(self.progress),
        onRefresh: (self) => setStage(self.progress),
      });
      setStage(0);

      /* ── Progress bar fill (tracks full 280vh scroll travel) ────── */
      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: () => `top+=${vh() * 2.8}`,
        scrub: true,
        onUpdate: (self) => {
          const fill = document.getElementById("sb-prog-fill");
          if (fill) fill.style.width = `${self.progress * 100}%`;
        },
      });

      /* ── Refresh on viewport resize ──────────────────────────────── */
      const refresh = () => ScrollTrigger.refresh();
      window.visualViewport?.addEventListener("resize", refresh);
      window.addEventListener("orientationchange", refresh);

      return () => {
        window.visualViewport?.removeEventListener("resize", refresh);
        window.removeEventListener("orientationchange", refresh);
      };
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ══════════════════ SCROLL WRAPPER (380vh) ═════════════════ */}
      <div ref={wrapRef} className="sb-wrap">

        {/* ─── STICKY PANEL (100vh — what user sees) ─────────────── */}
        <div ref={stickRef} className="sb-sticky">

          {/* Subtle background texture */}
          <div className="sb-bg-texture" aria-hidden />

          {/* ── Split layout: text (70%) + book (30%) ───────────── */}
          <div className="sb-layout">

            {/* ── TEXT COLUMN (70%) ─────────────────────────────── */}
            <div className="sb-text-col">

              {/* Section header — left aligned */}
              <header className="sb-header">
                <span className="sb-eyebrow">Our Journey</span>
                <h2 className="sb-title">
                  A Chapter of <em>Excellence</em>
                </h2>
                <div className="sb-title-rule" aria-hidden />
              </header>

              {/* Stage captions (crossfade per scroll zone) */}
              <div className="sb-caps">
                <div className="sb-cap sb-cap--on">
                  <span className="sb-capno">01</span>
                  <h3 className="sb-cap-title">Opening the Chapter</h3>
                  <p className="sb-cap-body">
                    The Brihaspathi story of 2026 begins — a year of milestones,
                    coverage and records. Turn the page to walk through it.
                  </p>
                </div>
                <div className="sb-cap">
                  <span className="sb-capno">02</span>
                  <h3 className="sb-cap-title">A Cover Moment</h3>
                  <p className="sb-cap-body">
                    Featured on Fortune India, August 2026 — a defining page in
                    the company&apos;s journey to the front.
                  </p>
                </div>
                <div className="sb-cap">
                  <span className="sb-capno">03</span>
                  <h3 className="sb-cap-title">Milestones &amp; Media</h3>
                  <p className="sb-cap-body">
                    From features to records, every frame adds another line to
                    the story we keep writing every year.
                  </p>
                </div>
                <div className="sb-cap">
                  <span className="sb-capno">04</span>
                  <h3 className="sb-cap-title">Turning the Page</h3>
                  <p className="sb-cap-body">
                    Every chapter closes to make room for the next one — watch
                    the book fold shut, just like the year did.
                  </p>
                </div>
                <div className="sb-cap">
                  <span className="sb-capno">05</span>
                  <h3 className="sb-cap-title">The Story Continues</h3>
                  <p className="sb-cap-body">
                    The next chapter is already being written. Stay with us as
                    Brihaspathi keeps turning the pages.
                  </p>
                </div>
              </div>

              {/* Stage dots */}
              <div className="sb-dots" aria-hidden>
                <span className="sb-dot sb-dot--on" />
                <span className="sb-dot" />
                <span className="sb-dot" />
                <span className="sb-dot" />
                <span className="sb-dot" />
              </div>

              {/* Meta line */}
              <div className="sb-meta">
                <span className="sb-meta-line" aria-hidden />
                <span>2026 · Milestones &amp; Media</span>
              </div>

            </div>{/* /sb-text-col */}

            {/* ── BOOK COLUMN (30%) ──────────────────────────────── */}
            <div className="sb-stage">

              {/* Soft ending glow (fades in as book closes) */}
              <div className="sb-glow" ref={glowRef} aria-hidden />

            <div ref={bookRef} className="sb-book">

              {/* Spine */}
              <div className="sb-spine" aria-hidden>
                <span className="sb-spine-txt">BRIHASPATHI · 2026</span>
              </div>

              {/* Ambient drop shadow */}
              <div className="sb-shadow" aria-hidden />

              {/* Back board (permanently behind all pages) */}
              <div className="sb-backboard" aria-hidden />

              {/* ══ PAGE 0 · FRONT COVER / CREAM INSERT ════════════ */}
              <div ref={page0Ref} className="sb-page" style={{ zIndex: 4 }}>

                {/* FRONT ─ img-1 (cover photo, full-bleed) */}
                <div className="sb-half sb-half--f">
                  <div className="sb-cover-shell">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/book-img-1.jpeg"
                      alt="Brihaspathi – Cover Feature"
                      className="sb-cover-img"
                      draggable={false}
                    />
                    {/* gradient veil for text readability */}
                    <div className="sb-cover-veil" aria-hidden />
                    {/* text overlay */}
                    <div className="sb-cover-text">
                      <span className="sb-cover-year-badge">2026</span>
                      <svg viewBox="0 0 230 60" className="sb-wordmark">
                        <defs>
                          <linearGradient id="cwg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.97)" />
                            <stop offset="100%" stopColor="rgba(200,225,255,0.90)" />
                          </linearGradient>
                        </defs>
                        <text x="50%" y="50%" dominantBaseline="middle"
                          textAnchor="middle" fontFamily="Georgia,serif"
                          fontWeight="700" fontSize="21" fill="url(#cwg)"
                          letterSpacing="3.6">BRIHASPATHI</text>
                        <line x1="22" y1="45" x2="208" y2="45"
                          stroke="rgba(190,218,255,0.52)" strokeWidth="0.7" />
                        <text x="50%" y="83%" textAnchor="middle"
                          fontFamily="Georgia,serif" fontSize="8.5"
                          fill="rgba(205,228,255,0.80)" letterSpacing="5.8">
                          TECHNOLOGIES
                        </text>
                      </svg>
                      <p className="sb-cover-sub">Milestones &amp; Media</p>
                    </div>
                    {/* subtle diagonal shine */}
                    <div className="sb-shine" aria-hidden />
                  </div>
                </div>

                {/* BACK ─ cream endpaper (inside of cover) */}
                <div className="sb-half sb-half--b">
                  <div className="sb-endpaper">
                    <svg viewBox="0 0 90 90" width="70" height="70" className="sb-ep-svg">
                      <circle cx="45" cy="45" r="40" fill="none"
                        stroke="hsl(220,16%,72%)" strokeWidth="0.8" opacity=".5" />
                      <circle cx="45" cy="45" r="30" fill="none"
                        stroke="hsl(220,16%,72%)" strokeWidth="0.5" opacity=".4" />
                      <line x1="45" y1="5" x2="45" y2="85"
                        stroke="hsl(220,16%,72%)" strokeWidth="0.5" opacity=".4" />
                      <line x1="5" y1="45" x2="85" y2="45"
                        stroke="hsl(220,16%,72%)" strokeWidth="0.5" opacity=".4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* ══ PAGE 1 · INNER (img-2) / BACK COVER (img-3) ════ */}
              <div ref={page1Ref} className="sb-page" style={{ zIndex: 2 }}>

                {/* FRONT ─ img-2 inner editorial page */}
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
                      <p className="sb-inner-cap">Fortune India &bull; Aug 2026</p>
                    </div>
                  </div>
                  <span className="sb-pnum sb-pnum--r">1</span>
                </div>

                {/* BACK ─ img-3 back cover (full-bleed) */}
                <div className="sb-half sb-half--b">
                  <div className="sb-back-shell">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/book-img-3.jpeg"
                      alt="Brihaspathi – Back Cover"
                      className="sb-back-img"
                      draggable={false}
                    />
                    <div className="sb-back-veil" aria-hidden />
                    <div className="sb-back-text">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/btl-logo-color.png"
                        alt="BTL"
                        className="sb-back-logo"
                      />
                      <p className="sb-back-url">www.brihaspathi.com</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>{/* /sb-book */}

            {/* ── Ending: #07518a closing card ───────────────────── */}
            <div className="sb-close-card" ref={cardRef}>
              <div className="sb-close-card-inner">
                <span className="sb-close-tag">2026 · Milestones &amp; Media</span>
                <div className="sb-close-word">BRIHASPATHI</div>
                <div className="sb-close-rule" aria-hidden />
                <h3 className="sb-close-title">The Story Continues</h3>
                <p className="sb-close-body">
                  Every milestone is a page turned — the next chapter is
                  already being written.
                </p>
                <span className="sb-close-sub">TECHNOLOGIES</span>
              </div>
            </div>

          </div>{/* /sb-stage */}

          </div>{/* /sb-layout */}

          {/* ── Scroll progress bar ─────────────────────────────── */}
          <div className="sb-progress" aria-hidden>
            <div className="sb-progress-fill" id="sb-prog-fill" />
          </div>

          {/* ── Scroll hint ─────────────────────────────────────── */}
          <p className="sb-hint">Scroll to turn the pages</p>

        </div>{/* /sb-sticky */}
      </div>{/* /sb-wrap */}

      {/* ══════════════════════════ STYLES ═══════════════════════════ */}
      <style>{`
        /* ── Box sizing ────────────────────────────────────────────── */
        .sb-wrap *, .sb-wrap *::before, .sb-wrap *::after {
          box-sizing: border-box;
        }

        /* ══ OUTER WRAPPER — 380vh (280vh pinned scroll travel + 100vh panel) ═ */
        .sb-wrap {
          position: relative;
          width: 100%;
          height: 380vh;
          background: #ffffff;
        }

        /* ══ STICKY PANEL — exactly 100vh visible area ══════════════ */
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

        /* ── Subtle dot-grid texture (light, elegant) ──────────────── */
        .sb-bg-texture {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(
            circle, hsl(220,18%,82%) 1px, transparent 1px
          );
          background-size: 28px 28px;
          opacity: .38;
        }

        /* ══ SPLIT LAYOUT — text 70% / book 30% ═════════════════════ */
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

        /* ── Text column (70%) ──────────────────────────────────────── */
        .sb-text-col {
          position: relative;
          width: 70%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        /* ── Header (left aligned) ──────────────────────────────────── */
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
          background: linear-gradient(to right,
            #07518a, #2f9bd8, transparent);
          border-radius: 2px;
          margin-top: .15rem;
        }

        /* ── Stage captions (crossfade per zone) ────────────────────── */
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

        /* ── Stage dots ─────────────────────────────────────────────── */
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

        /* ── Meta line ──────────────────────────────────────────────── */
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

        /* ── Book column / stage (30%) ──────────────────────────────── */
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

        /* ── Ending glow (behind the closed book) ───────────────────── */
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

        /* ── Ending: #07518a closing card ──────────────────────────── */
        .sb-close-card {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 9;
          width: min(88%, 320px);
          aspect-ratio: 3 / 4;
          border-radius: 14px;
          opacity: 0;
          pointer-events: none;
          background:
            radial-gradient(120% 90% at 80% -10%,
              rgba(255,255,255,.14) 0%, transparent 50%),
            linear-gradient(158deg,
              #07518a 0%, #053a63 55%, #032b4c 100%);
          box-shadow:
            0 30px 70px rgba(3,32,61,.38),
            0 10px 24px rgba(3,32,61,.25),
            inset 0 1px 0 rgba(255,255,255,.16);
          border: 1px solid rgba(150,200,255,.16);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1.2rem, 3vmin, 2rem);
        }
        .sb-close-card::before {
          content: "";
          position: absolute; inset: 10px;
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 8px;
          pointer-events: none;
        }
        .sb-close-card-inner {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: .5rem;
          padding: .5rem;
          animation: sbfloat 5.5s ease-in-out infinite;
        }
        @keyframes sbfloat {
          0%,100% { transform: translateY(-4px); }
          50%     { transform: translateY(4px); }
        }
        .sb-close-tag {
          font-family: Georgia, serif;
          font-size: clamp(.5rem, 1.1vw, .62rem);
          letter-spacing: .34em;
          text-transform: uppercase;
          color: rgba(210,232,255,.75);
        }
        .sb-close-word {
          font-family: Georgia, serif;
          font-weight: 700;
          font-size: clamp(1rem, 2.4vw, 1.4rem);
          letter-spacing: .34em;
          color: #ffffff;
        }
        .sb-close-rule {
          width: 54px; height: 1px;
          background: linear-gradient(to right,
            transparent, #ffd88a, transparent);
          margin: .1rem 0;
        }
        .sb-close-title {
          margin: 0;
          font-family: Georgia, serif;
          font-style: italic;
          font-size: clamp(1.1rem, 2.6vw, 1.6rem);
          color: #ffe9b8;
          line-height: 1.2;
        }
        .sb-close-body {
          margin: 0;
          max-width: 24ch;
          font-family: Georgia, serif;
          font-size: clamp(.68rem, 1.4vw, .82rem);
          color: rgba(235,244,255,.85);
          line-height: 1.6;
        }
        .sb-close-sub {
          font-family: Georgia, serif;
          font-size: clamp(.46rem, 1vw, .56rem);
          letter-spacing: .42em;
          text-transform: uppercase;
          color: rgba(190,220,255,.62);
          margin-top: .2rem;
        }

        /* ── Book ────────────────────────────────────────────────────── */
        .sb-book {
          position: relative;
          /* A4 ratio 1:1.41  — tall book format, sized for 30% column */
          height: min(66vh, 66dvh, 560px);
          width:  min(46vh, 46dvh, 382px);
          min-height: 280px;
          min-width:  200px;
          transform-style: preserve-3d;
          transform-origin: center center;
          /* entry state — GSAP animates opacity/scale in */
          opacity: 0;
        }

        /* ── Spine ───────────────────────────────────────────────────── */
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

        /* ── Book shadow (on white bg) ───────────────────────────────── */
        .sb-shadow {
          position: absolute;
          bottom: -28px; left: 4%; width: 92%; height: 28px;
          background: radial-gradient(ellipse 88% 55% at 50% 0%,
            rgba(0,0,0,.22) 0%, transparent 100%);
          filter: blur(10px);
          z-index: -1; pointer-events: none;
        }

        /* ── Back board ──────────────────────────────────────────────── */
        .sb-backboard {
          position: absolute; inset: 0;
          border-radius: 2px 9% 9% 2px;
          background:
            linear-gradient(145deg,
              rgba(12,18,32,.62) 0%, rgba(8,12,22,.88) 100%),
            url('/book-img-3.jpeg') center / cover no-repeat;
          z-index: 0;
          box-shadow:
            4px 6px 40px rgba(0,0,0,.18),
            1px 1px 0   rgba(255,255,255,.04) inset;
        }

        /* ── Pages ───────────────────────────────────────────────────── */
        .sb-page {
          position: absolute; inset: 0;
          transform-style: preserve-3d;
          transform-origin: left center;
          transform: rotateY(0deg);
          will-change: transform;
        }

        /* ── Page halves ─────────────────────────────────────────────── */
        .sb-half {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }

        /* Front half — default face */
        .sb-half--f {
          transform: rotateY(0deg);
          border-radius: 2px 9% 9% 2px;
          background: #fafafa;
          box-shadow:
            2px 0 20px rgba(0,0,0,.09),
            inset -1px 0 0 rgba(0,0,0,.06);
        }

        /* Back half — pre-rotated so it shows correctly when page flips */
        .sb-half--b {
          transform: rotateY(180deg);
          border-radius: 9% 2px 2px 9%;
          background: hsl(220,15%,96%);
          box-shadow:
            -2px 0 20px rgba(0,0,0,.09),
            inset 1px 0 0 rgba(0,0,0,.06);
        }

        /* Warm ruled paper for inner page */
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

        /* ══ FRONT COVER ─────────────────────────────────────────────── */
        .sb-cover-shell {
          position: absolute; inset: 0;
          overflow: hidden;
          border-radius: 2px 9% 9% 2px;
        }
        .sb-cover-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          user-select: none; pointer-events: none;
          transform: scale(1.05);
          transition: transform 10s ease;
        }
        .sb-cover-shell:hover .sb-cover-img { transform: scale(1.10); }
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

        /* ══ ENDPAPER (inside front cover) — photographic preview ─────── */
        .sb-endpaper {
          position: relative;
          width: 100%; height: 100%;
          overflow: hidden;
          border-radius: 9% 2px 2px 9%;
          background: url('/book-img-2.jpeg') center / cover no-repeat;
          display: flex; align-items: center; justify-content: center;
        }
        /* soft cream veil so it reads as an endpaper, not a duplicate page */
        .sb-endpaper::before {
          content: "";
          position: absolute; inset: 0;
          background: hsl(44,30%,95%);
          opacity: .82;
        }
        .sb-ep-svg { position: relative; z-index: 1; display: block; }

        /* ══ INNER PAGE (img-2) ──────────────────────────────────────── */
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
          transition: transform 8s ease;
        }
        .sb-mat-frame:hover .sb-inner-img { transform: scale(1.04); }
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
        .sb-pnum {
          position: absolute; bottom: .65rem;
          font-family: Georgia, serif;
          font-size: max(.58rem,.9vmin);
          color: hsl(220,16%,52%);
          z-index: 5; pointer-events: none;
        }
        .sb-pnum--r { right: .8rem; }

        /* ══ BACK COVER (img-3) ──────────────────────────────────────── */
        .sb-back-shell {
          position: absolute; inset: 0;
          overflow: hidden;
          border-radius: 9% 2px 2px 9%;
        }
        .sb-back-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          user-select: none; pointer-events: none;
          transform: scale(1.05);
          transition: transform 10s ease;
        }
        .sb-back-shell:hover .sb-back-img { transform: scale(1.10); }
        .sb-back-veil {
          position: absolute; inset: 0;
          background: linear-gradient(to top,
            rgba(4,8,18,.82) 0%,
            rgba(4,8,18,.28) 50%,
            rgba(4,8,18,.08) 100%);
        }
        .sb-back-text {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding: clamp(.9rem, 3vmin, 2rem);
          gap: .5rem;
        }
        .sb-back-logo {
          width: min(42%,100px);
          object-fit: contain; opacity: .92;
          filter: drop-shadow(0 2px 14px rgba(0,0,0,.55));
        }
        .sb-back-url {
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(.37rem,.88vmin,.6rem);
          letter-spacing: .32em;
          text-transform: uppercase;
          color: rgba(185,215,255,.62);
        }

        /* ── Progress bar ────────────────────────────────────────────── */
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
          background: linear-gradient(to right,
            #07518a, #2f9bd8);
          border-radius: 0 2px 2px 0;
          transition: width .15s linear;
        }

        /* ── Scroll hint ─────────────────────────────────────────────── */
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

        /* ── Responsive ──────────────────────────────────────────────── */
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
          .sb-close-card {
            width: min(60%, 270px);
          }
        }
        @media (max-width: 480px) {
          .sb-title { font-size: clamp(1.3rem, 6vw, 1.7rem); }
          .sb-book {
            height: min(46vh,46dvh,360px);
            width:  min(33vh,33dvh,255px);
          }
          .sb-close-card {
            width: min(66%, 240px);
          }
        }
        @media (max-height: 560px) and (orientation: landscape) {
          .sb-header { display: none; }
          .sb-dots, .sb-meta { display: none; }
          .sb-book {
            height: min(72vh,72dvh,330px);
            width:  min(51vh,51dvh,232px);
          }
          .sb-close-card {
            width: min(42vh, 230px);
          }
        }

        /* dvh override */
        @supports (height: 100dvh) {
          .sb-sticky { height: 100dvh; }
        }
      `}</style>
    </>
  );
}