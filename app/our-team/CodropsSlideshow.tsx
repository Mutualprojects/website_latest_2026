"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { OrgPerson } from "./TeamGrid";

interface Props {
  people: OrgPerson[];
  personPhoto: (url?: string) => string;
}

const CHARS = "abcdefghijklmnopqrstuvwxyz.,^".split("");
const rnd = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;

function scrambleIn(el: HTMLElement) {
  const text = el.dataset.text || el.textContent || "";
  el.dataset.text = text;
  let ticks = 0;
  const maxTicks = 4;

  const iv = setInterval(() => {
    ticks++;
    if (ticks < maxTicks) {
      el.textContent = text
        .split("")
        .map((ch) => (ch === " " ? " " : CHARS[rnd(0, CHARS.length - 1)]))
        .join("");
    } else {
      el.textContent = text;
      clearInterval(iv);
    }
  }, 20);

  return () => clearInterval(iv);
}

export default function CodropsSlideshow({ people, personPhoto }: Props) {
  const [cur, setCur] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const cleanupRef = useRef<(() => void) | null>(null);

  const total = people.length;
  const wrap = useCallback((i: number) => ((i % total) + total) % total, [total]);

  // scramble current title on change
  useEffect(() => {
    if (cleanupRef.current) cleanupRef.current();
    const el = titleRefs.current[cur];
    if (el) {
      cleanupRef.current = scrambleIn(el);
    }
  }, [cur]);

  const navigate = useCallback((dir: "next" | "prev") => {
    if (animating) return;
    setAnimating(true);
    setCur((c) => wrap(dir === "next" ? c + 1 : c - 1));
    setTimeout(() => setAnimating(false), 220);
  }, [animating, wrap]);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate, closePanel]);

  if (!people.length) return null;

  const activePerson = people[cur];

  // Build the 5 visible indices: [-2, -1, 0, +1, +2] relative to current
  const slots = [-2, -1, 0, 1, 2];

  return (
    <>
      <div className="cds-root">
        {/* Deco bar behind center */}
        <div className="cds-deco" />

        {/* 5-card carousel */}
        <div className="cds-track">
          {slots.map((offset) => {
            const idx = wrap(cur + offset);
            const person = people[idx];
            const isCur = offset === 0;

            return (
              <div
                key={`${offset}`}
                className={`cds-card cds-card--${offset < 0 ? "left" : offset > 0 ? "right" : "center"}${Math.abs(offset) === 2 ? " cds-card--far" : Math.abs(offset) === 1 ? " cds-card--near" : ""}`}
                onClick={() => {
                  if (offset < 0) navigate("prev");
                  else if (offset > 0) navigate("next");
                  else openPanel();
                }}
                style={{ cursor: isCur ? "zoom-in" : "pointer" }}
              >
                {/* Photo */}
                <div className="cds-card__photo">
                  <img
                    src={personPhoto(person.photo)}
                    alt={person.name}
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="cds-card__overlay" />
                  {/* Name badge on non-center */}
                  {!isCur && (
                    <div className="cds-card__badge">
                      <span>{person.name}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Center slide info — below the cards */}
        <div className="cds-info">
          <span className="cds-info__num">
            ★ &nbsp;{String(cur + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <h3
            ref={(el) => { titleRefs.current[cur] = el; }}
            className="cds-info__name"
            data-text={activePerson.name}
          >
            {activePerson.name}
          </h3>
          <p className="cds-info__role">{activePerson.designation}</p>
          <button className="cds-info__view" onClick={openPanel}>
            View Profile &nbsp;→
          </button>
        </div>

        {/* Vertical side text */}
        <p className="cds-side">{activePerson.designation}</p>

        {/* Nav arrows */}
        <button className="cds-nav cds-nav--prev" onClick={() => navigate("prev")} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#07518a" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button className="cds-nav cds-nav--next" onClick={() => navigate("next")} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#07518a" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        {/* Progress dots */}
        <div className="cds-dots">
          {people.map((_, i) => (
            <button
              key={i}
              className={`cds-dot${i === cur ? " cds-dot--active" : ""}`}
              onClick={() => { if (!animating) { const d = i - cur; if (d !== 0) navigate(d > 0 ? "next" : "prev"); } }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Detail Panel ── */}
      <div className={`cds-panel${panelOpen ? " cds-panel--open" : ""}`} aria-hidden={!panelOpen}>
        <div className="cds-panel__backdrop" onClick={closePanel} />
        <div className="cds-panel__drawer">
          <button className="cds-panel__close" onClick={closePanel} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div className="cds-panel__photo-wrap">
            <img src={personPhoto(activePerson.photo)} alt={activePerson.name} className="cds-panel__photo" />
          </div>
          <div className="cds-panel__body">
            <span className="cds-panel__eyebrow">Brihaspathi Technologies</span>
            <h2 className="cds-panel__name">{activePerson.name}</h2>
            <p className="cds-panel__role">{activePerson.designation}</p>
            <div className="cds-panel__line" />
            <p className="cds-panel__bio">
              {activePerson.bio || "A distinguished leader driving innovation and excellence at Brihaspathi Technologies Limited."}
            </p>
            {activePerson.linkedin && (
              <a href={activePerson.linkedin} target="_blank" rel="noopener noreferrer" className="cds-panel__li">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
                Connect on LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* ── ROOT ── */
        .cds-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 60px 0 80px;
          font-family: 'Open Sans Condensed','Open Sans',sans-serif;
          color: #1e293b;
        }

        /* ── DECO ── */
        .cds-deco {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -55%);
          width: 20vw;
          max-width: 300px;
          height: 55%;
          background: linear-gradient(180deg, rgba(7, 81, 138, 0.06) 0%, rgba(7, 81, 138, 0.02) 100%);
          border-radius: 4px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── TRACK: 5 cards side by side ── */
        .cds-track {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 14px;
          width: 100%;
          padding: 0 20px;
          position: relative;
          z-index: 2;
          margin-bottom: 36px;
        }

        /* ── CARD BASE ── */
        .cds-card {
          flex-shrink: 0;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          transition: transform 0.2s cubic-bezier(.16,1,.3,1),
                      opacity 0.2s ease,
                      width 0.2s cubic-bezier(.16,1,.3,1),
                      height 0.2s cubic-bezier(.16,1,.3,1),
                      box-shadow 0.2s ease;
        }

        /* CENTER */
        .cds-card--center {
          width: clamp(180px, 22vw, 280px);
          height: clamp(260px, 38vh, 420px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06);
          transform: scale(1) translateY(0);
          z-index: 5;
        }
        .cds-card--center:hover {
          box-shadow: 0 30px 60px rgba(7,81,138,0.2), 0 20px 40px rgba(0,0,0,0.12);
          transform: scale(1.025) translateY(-4px);
        }

        /* NEAR (±1) */
        .cds-card--near {
          width: clamp(130px, 16vw, 200px);
          height: clamp(200px, 29vh, 330px);
          opacity: 0.75;
          transform: scale(0.92) translateY(24px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
          z-index: 4;
        }
        .cds-card--near:hover { opacity: 0.95; transform: scale(0.94) translateY(20px); }

        /* FAR (±2) */
        .cds-card--far {
          width: clamp(90px, 11vw, 145px);
          height: clamp(140px, 20vh, 240px);
          opacity: 0.45;
          transform: scale(0.78) translateY(52px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
          z-index: 3;
        }
        .cds-card--far:hover { opacity: 0.65; }

        /* Photo fills card */
        .cds-card__photo {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .cds-card__photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.7s cubic-bezier(.25,1,.5,1);
        }
        .cds-card--center:hover .cds-card__photo img { transform: scale(1.06); }

        /* Gradient overlay */
        .cds-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.4) 100%);
          pointer-events: none;
        }

        /* Name badge on side cards */
        .cds-card__badge {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 10px 8px 8px;
          background: linear-gradient(transparent, rgba(0,0,0,0.75));
          text-align: center;
        }
        .cds-card__badge span {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #ffffff;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── INFO BELOW CENTER ── */
        .cds-info {
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .cds-info__num {
          display: block;
          font-size: 0.68em;
          letter-spacing: 0.28em;
          color: #07518a;
          margin-bottom: 10px;
          font-weight: 600;
        }
        .cds-info__name {
          font-size: clamp(1.3rem, 3vw, 2rem);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 8px;
          color: #0f172a;
          min-height: 1.2em;
        }
        .cds-info__name span { display: inline-block; }
        .cds-info__role {
          font-size: 0.88rem;
          color: #64748b;
          font-weight: 400;
          letter-spacing: 0.05em;
          margin: 0 0 18px;
        }
        .cds-info__view {
          background: transparent;
          border: 1px solid #07518a;
          color: #07518a;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 9px 22px;
          border-radius: 100px;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .cds-info__view:hover { background: #07518a; color: #fff; border-color: #07518a; }

        /* ── VERTICAL SIDE TEXT ── */
        .cds-side {
          position: absolute;
          left: 24px;
          top: 50%;
          transform: translateY(-50%) rotate(180deg);
          writing-mode: vertical-rl;
          color: #07518a;
          font-size: 0.68em;
          letter-spacing: 0.1em;
          opacity: 0.75;
          pointer-events: none;
          white-space: nowrap;
          z-index: 10;
          max-height: 40vh;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 768px) { .cds-side { display: none; } }

        /* ── NAV ── */
        .cds-nav {
          position: absolute;
          top: 40%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 50%;
          width: 46px; height: 46px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          padding: 0;
        }
        .cds-nav:hover { background: rgba(7,81,138,0.1); border-color: #07518a; }
        .cds-nav--prev { left: 16px; }
        .cds-nav--next { right: 16px; }

        /* ── DOTS ── */
        .cds-dots {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 7px;
          z-index: 20;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 80%;
        }
        .cds-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(0,0,0,0.15);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s, transform 0.3s;
          flex-shrink: 0;
        }
        .cds-dot--active { background: #07518a; transform: scale(1.5); }

        /* ── PANEL ── */
        .cds-panel {
          position: fixed;
          inset: 0;
          z-index: 9000;
          pointer-events: none;
        }
        .cds-panel--open { pointer-events: auto; }
        .cds-panel__backdrop {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.4s ease;
        }
        .cds-panel--open .cds-panel__backdrop { background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); }

        .cds-panel__drawer {
          position: absolute;
          top: 0; right: 0;
          width: min(480px, 100vw);
          height: 100%;
          background: #ffffff;
          border-left: 1px solid rgba(0,0,0,0.08);
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(.77,0,.175,1);
          display: flex; flex-direction: column;
          box-shadow: -20px 0 50px rgba(0,0,0,0.1);
        }
        .cds-panel--open .cds-panel__drawer { transform: translateX(0); }

        .cds-panel__close {
          position: absolute; top: 18px; right: 18px; z-index: 2;
          background: rgba(0,0,0,0.06);
          border: none; border-radius: 50%;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #0f172a;
          transition: background 0.2s, color 0.2s, transform 0.3s;
        }
        .cds-panel__close:hover { background: #07518a; color: #fff; transform: rotate(90deg); }

        .cds-panel__photo-wrap { position: relative; width: 100%; aspect-ratio: 4/3; flex-shrink: 0; overflow: hidden; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .cds-panel__photo { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }

        .cds-panel__body { padding: 28px 28px 40px; flex: 1; }
        .cds-panel__eyebrow { display: block; font-size: 0.62em; letter-spacing: 0.3em; text-transform: uppercase; color: #07518a; margin-bottom: 12px; font-weight: 700; }
        .cds-panel__name { font-size: 1.8rem; font-weight: 700; color: #0f172a; margin: 0 0 6px; letter-spacing: 0.06em; text-transform: uppercase; }
        .cds-panel__role { color: #07518a; font-size: 0.9rem; font-weight: 500; margin: 0; }
        .cds-panel__line { height: 1px; background: linear-gradient(90deg, #07518a, transparent); margin: 20px 0; opacity: 0.3; }
        .cds-panel__bio { color: #475569; font-size: 0.95rem; line-height: 1.85; margin: 0 0 28px; font-family: 'Open Sans', sans-serif; font-weight: 400; }
        .cds-panel__li {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px; background: #0077b5; color: #fff;
          border-radius: 100px; font-size: 0.85rem; font-weight: 600;
          text-decoration: none; transition: transform 0.2s, box-shadow 0.2s;
        }
        .cds-panel__li:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(0,119,181,0.3); }

        /* Mobile */
        @media (max-width: 640px) {
          .cds-track { gap: 8px; }
          .cds-card--far { display: none; }
          .cds-card--center { width: 55vw; height: 38vh; }
          .cds-card--near { width: 28vw; height: 28vh; }
        }
      `}</style>
    </>
  );
}
