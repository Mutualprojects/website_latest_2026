// /app/about/our-cmd/components/Achivements.tsx
"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import collageImage from "./ET Industry Achievers - Post Event 26-03-2026-12.png";
import newspaperImage from "./ET Industry Achievers - Post Event 26-03-2026-31.jpg.jpeg";

export default function Achivements() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="achievements-section"
      style={{
        position: "relative",
        minHeight: "130vh",
        width: "100%",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        background: "transparent",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        className="achievements-container"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          minHeight: "100vh",
          alignItems: "stretch",
        }}
      >
        {/* ══════════════════════════════════════════════════
             LEFT — 30% brand colour panel with text + image
            ══════════════════════════════════════════════════ */}
        <div
          className="achievements-left-panel"
          style={{
            flex: "0 0 30%",
            maxWidth: "30%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(20px, 3vw, 40px)",
            padding: "clamp(32px, 5vw, 72px) clamp(20px, 3vw, 48px)",
            background: "linear-gradient(160deg, #7B1F1F 0%, #4A0E0E 60%, #2E0808 100%)",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          {/* decorative gold top-line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "3px",
              background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            }}
          />

          {/* decorative gold bottom-line */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "10%",
              right: "10%",
              height: "3px",
              background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            }}
          />

          {/* subtle radial glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* ── HEADING TEXT ── */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ position: "relative", zIndex: 1, textAlign: "center" }}
          >
            {/* gold label */}
            <p
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "clamp(9px, 0.75vw, 12px)",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: "clamp(10px, 1.2vw, 18px)",
              }}
            >
              ET Industry Achievers
            </p>

            {/* thin gold divider */}
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#C9A84C",
                margin: "0 auto clamp(12px, 1.5vw, 22px)",
                opacity: 0.7,
              }}
            />

            {/* main headline */}
            <h2
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "clamp(16px, 1.6vw, 26px)",
                fontWeight: 700,
                lineHeight: 1.25,
                color: "#FFFFFF",
                margin: 0,
                marginBottom: "clamp(10px, 1.2vw, 18px)",
              }}
            >
              Honouring{" "}
              <span style={{ color: "#C9A84C" }}>Visionary Leaders</span>{" "}
              and Their Contributions
            </h2>

            {/* sub headline */}
            <p
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "clamp(12px, 1vw, 16px)",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.75)",
                margin: 0,
                marginBottom: "clamp(14px, 1.8vw, 24px)",
              }}
            >
              At the{" "}
              <span
                style={{
                  color: "#C9A84C",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}
              >
                2nd Edition
              </span>{" "}
              of the ET Industry Achievers
            </p>

            {/* thin gold divider */}
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#C9A84C",
                margin: "0 auto",
                opacity: 0.7,
              }}
            />
          </motion.div>

          {/* ── COLLAGE IMAGE ── */}
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -120, opacity: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 3",
              borderRadius: "clamp(8px, 1vw, 14px)",
              overflow: "hidden",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.3), 0 16px 48px rgba(0,0,0,0.55)",
              border: "2px solid rgba(201,168,76,0.3)",
              zIndex: 1,
            }}
          >
            <Image
              src={collageImage}
              alt="ET Industry Achievers Event Collage"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="(max-width: 768px) 90vw, 30vw"
            />
            {/* warm overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 60%, rgba(74,14,14,0.45) 100%)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* bottom badge */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(9px, 0.7vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.65)",
              margin: 0,
            }}
          >
            Telangana &amp; AP · 2025–26
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════════════
             RIGHT — 70% full newspaper image
            ══════════════════════════════════════════════════ */}
        <motion.div
          className="achievements-right-panel"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }
          }
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          style={{
            flex: "1 1 70%",
            position: "relative",
            minHeight: "100vh",
            overflow: "hidden",
          }}
        >
          <Image
            src={newspaperImage}
            alt="ET Industry Achievers – Honouring Visionary Leaders, Telangana & AP 2025-26"
            fill
            className="achievements-newspaper-img"
            style={{
              objectFit: "cover",
              objectPosition: "top center",
            }}
            priority
            sizes="(max-width: 768px) 100vw, 70vw"
          />
          {/* left-edge blend into brand colour */}
          <div
            className="achievements-gradient-overlay"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(74,14,14,0.55) 0%, rgba(74,14,14,0.15) 12%, transparent 28%)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </div>

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 1024px) {
          .achievements-section {
            min-height: 100vh !important;
          }
          .achievements-left-panel {
            flex: 0 0 38% !important;
            max-width: 38% !important;
          }
          .achievements-right-panel {
            flex: 1 1 62% !important;
          }
        }
        @media (max-width: 768px) {
          .achievements-section {
            min-height: auto !important;
            padding: 0 !important;
          }
          .achievements-container {
            flex-direction: column !important;
            min-height: auto !important;
          }
          .achievements-left-panel {
            display: none !important;
          }
          .achievements-right-panel {
            flex: 1 1 100% !important;
            max-width: 100% !important;
            width: 100% !important;
            min-height: auto !important;
            aspect-ratio: 3977 / 4487 !important;
          }
          .achievements-newspaper-img {
            object-fit: contain !important;
          }
          .achievements-gradient-overlay {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}