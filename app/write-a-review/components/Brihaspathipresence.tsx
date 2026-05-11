"use client";

import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import axios from "axios";
import {
  MapPin,
  Star,
  ExternalLink,
  Building2,
  LayoutGrid,
  AlignJustify,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Branch {
  State: string;
  City: string;
  "Maps Reviews Links": string;
  Ratings: string;
}

interface RatingConfig {
  bg: string;
  light: string;
  text: string;
  label: string;
  ring: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const API_URL = "https://sheetdb.io/api/v1/tu8odzpux7cf5";

const FALLBACK_DATA: Branch[] = [
  {
    State: "Telangana",
    City: "Hyderabad",
    "Maps Reviews Links":
      "https://www.google.com/search?q=Brihaspathi+Technologies+Limited+Reviews",
    Ratings: "4.8",
  },
  {
    State: "Andhra Pradesh",
    City: "Vizag",
    "Maps Reviews Links":
      "https://www.google.com/search?q=Brihaspathi+Technologies+Visakhapatnam+Reviews",
    Ratings: "4.5",
  },
  {
    State: "Andhra Pradesh",
    City: "Vijayawada",
    "Maps Reviews Links":
      "https://www.google.com/search?q=Brihaspathi+Technologies+Vijayawada+Reviews",
    Ratings: "3.7",
  },
  {
    State: "Andhra Pradesh",
    City: "Kurnool",
    "Maps Reviews Links":
      "https://www.google.com/maps/place/Brihaspathi+Technologies+Kurnool",
    Ratings: "3.4",
  },
  {
    State: "Maharashtra",
    City: "Mumbai",
    "Maps Reviews Links":
      "https://www.google.com/search?q=Brihaspathi+Technologies+Mumbai+Reviews",
    Ratings: "4.5",
  },
  {
    State: "West Bengal",
    City: "Kolkata",
    "Maps Reviews Links":
      "https://www.google.com/search?q=Brihaspathi+Technologies+Kolkata+Reviews",
    Ratings: "4.4",
  },
  {
    State: "Bihar",
    City: "Patna",
    "Maps Reviews Links":
      "https://www.google.com/search?q=Brihaspathi+Technologies+Patna+Reviews",
    Ratings: "3.6",
  },
  {
    State: "Assam",
    City: "Guwahati",
    "Maps Reviews Links":
      "https://www.google.com/search?q=Brihaspathi+Technologies+Assam+Reviews",
    Ratings: "5",
  },
  {
    State: "Madhya Pradesh",
    City: "Bhopal",
    "Maps Reviews Links":
      "https://www.google.com/maps/place/Brihaspathi+Technologies+Limited+(Bhopal)",
    Ratings: "4.4",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getRatingConfig(r: number): RatingConfig {
  if (r >= 4.8)
    return { bg: "#22c55e", light: "#14532d", text: "#86efac", label: "Excellent", ring: "#22c55e" };
  if (r >= 4.5)
    return { bg: "#60a5fa", light: "#1e3a8a", text: "#93c5fd", label: "Very Good", ring: "#60a5fa" };
  if (r >= 4.0)
    return { bg: "#22d3ee", light: "#164e63", text: "#67e8f9", label: "Good", ring: "#22d3ee" };
  if (r >= 3.5)
    return { bg: "#fbbf24", light: "#713f12", text: "#fcd34d", label: "Average", ring: "#fbbf24" };
  return { bg: "#f87171", light: "#7f1d1d", text: "#fca5a5", label: "Fair", ring: "#f87171" };
}

// ─── StarRating ───────────────────────────────────────────────────────────────

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <Star
            key={i}
            size={size}
            fill={filled || half ? "#fbbf24" : "transparent"}
            stroke={filled || half ? "#fbbf24" : "#94a3b8"}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}

// ─── PinSVG (Kept for Timeline View) ──────────────────────────────────────────

function PinSVG({ color, rating, iconColor = "#ffffff" }: { color: string; rating: number; iconColor?: string }) {
  return (
    <svg width="56" height="72" viewBox="0 0 56 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="28" cy="67" rx="10" ry="3.5" fill="rgba(0,0,0,0.2)" />
      <path
        d="M28 2C15.85 2 6 11.85 6 24c0 15.5 22 44 22 44S50 39.5 50 24C50 11.85 40.15 2 28 2z"
        fill={color}
      />
      <circle cx="28" cy="24" r="14" fill="white" fillOpacity="0.15" />
      <circle cx="28" cy="24" r="11" fill="#07518a" fillOpacity="0.98" />
      <text
        x="28"
        y="28.5"
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="700"
        fill="#ffffff"
        fontFamily="'DM Sans','Segoe UI',sans-serif"
      >
        {rating}
      </text>
    </svg>
  );
}

// ─── BranchCard (Grid View) - Using Neumorphic Design ──────────────

function BranchCard({ branch, index }: { branch: Branch; index: number }) {
  const r = parseFloat(branch.Ratings);
  const cfg = getRatingConfig(r);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        border: "none",
        borderRadius: 24,
        padding: "24px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff, inset 0 0 0 2px #07518a"
          : "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Rank badge */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#07518a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          fontWeight: 900,
          color: "#ffffff",
          zIndex: 10,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {index + 1}
      </div>

      {/* Main Map Icon */}
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 18,
          background: "#f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          boxShadow: "inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff",
        }}
      >
        <MapPin size={24} color="#07518a" fill="#07518a" fillOpacity={0.1} />
      </div>

      <h3
        style={{
          fontSize: 16,
          fontWeight: 900,
          color: "#000000",
          margin: "0 0 6px 0",
          textAlign: "center",
          letterSpacing: "-0.01em",
        }}
      >
        {branch.City}
      </h3>

      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#000000",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 4,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          opacity: 0.7,
        }}
      >
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#07518a" }} />
        {branch.State}
      </div>

      {/* Ratings Section */}
      <div
        style={{
          width: "100%",
          background: "#f8fafc",
          borderRadius: 16,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          boxShadow: "inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#000000" }}>{branch.Ratings}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#000000", opacity: 0.5 }}>/ 5.0</span>
        </div>
        <StarRating rating={r} size={15} />
      </div>

      <a
        href={branch["Maps Reviews Links"]}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: 18,
          width: "100%",
          padding: "11px 0",
          borderRadius: 14,
          background: "#ffffff",
          color: "#000000",
          textDecoration: "none",
          fontSize: 12,
          fontWeight: 900,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          border: "2px solid transparent",
          backgroundImage: "linear-gradient(#fff, #fff), linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          position: "relative",
          letterSpacing: "0.02em",
          boxSizing: "border-box",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
        }}
      >
        <MapPin size={13} color="#4285F4" fill="#4285F4" fillOpacity={0.1} />
        Rate & Review
        <div style={{ display: "flex", gap: 1.5, marginLeft: 2 }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4285F4" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#EA4335" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#FBBC05" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#34A853" }} />
        </div>
        <ExternalLink size={12} color="#000000" strokeWidth={2.5} />
      </a>
    </div>
  );
}

// ─── TimelineView (UNCHANGED - still uses custom PinSVG) ──────────────────────

function TimelineView({ data }: { data: Branch[] }) {
  return (
    <div style={{ width: "100%", overflowX: "auto", padding: "28px 32px 36px" }}>
      <div style={{ position: "relative", minWidth: 860 }}>
        {/* Horizontal line */}
        <div
          style={{
            position: "absolute",
            left: 48,
            right: 48,
            top: 107,
            height: 3,
            background: "linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%)",
            borderRadius: 99,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 6,
            alignItems: "flex-start",
          }}
        >
          {data.map((branch, i) => {
            const r = parseFloat(branch.Ratings);
            const cfg = getRatingConfig(r);
            return (
              <div
                key={`tl-${i}`}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <PinSVG color={cfg.bg} rating={r} />
                <div
                  style={{ width: 2, height: 12, background: cfg.bg, opacity: 0.42 }}
                />
                <div
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    background: cfg.bg,
                    border: "2.5px solid white",
                    outline: `2.5px solid ${cfg.ring}`,
                    marginBottom: 12,
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#0f172a",
                    textAlign: "center",
                    marginBottom: 2,
                    lineHeight: 1.2,
                  }}
                >
                  {branch.City}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#94a3b8",
                    textAlign: "center",
                    marginBottom: 6,
                    fontWeight: 500,
                  }}
                >
                  {branch.State}
                </div>
                <StarRating rating={r} size={10} />
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: cfg.text,
                    marginTop: 3,
                    marginBottom: 8,
                  }}
                >
                  {r} ★
                </div>
                <a
                  href={branch["Maps Reviews Links"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 10,
                    color: cfg.text,
                    background: cfg.light,
                    padding: "4px 9px",
                    borderRadius: 7,
                    textDecoration: "none",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <ExternalLink size={9} />
                  Reviews
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Loader ───────────────────────────────────────────────────────────────────

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "72px 0",
        gap: 12,
        color: "#64748b",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          border: "2.5px solid #e2e8f0",
          borderTopColor: "#07518a",
          borderRadius: "50%",
          animation: "bpSpin 0.7s linear infinite",
        }}
      />
      Loading branch data…
      <style>{`@keyframes bpSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function BrihaspathiPresence() {
  const [data, setData] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "timeline">("grid");
  const [screenW, setScreenW] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const onResize = () => setScreenW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ─── AXIOS FETCH ───────────────────────────────────────────────────────────
  useEffect(() => {
    axios.get<Branch[]>(API_URL)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setData(response.data);
        } else {
          setData(FALLBACK_DATA);
        }
      })
      .catch(() => {
        // Fallback on any error
        setData(FALLBACK_DATA);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const isMobile = screenW < 480;
  const isTablet = screenW >= 480 && screenW < 768;
  const isDesktop = screenW >= 768;

  const gridCols = "repeat(3, 1fr)";

  const outerPad = isMobile ? "12px 10px" : isTablet ? "18px 16px" : "28px 28px";

  return (
    <div
      style={{
        fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif",
        background: "#e0e5ec",
        minHeight: "100vh",
        padding: outerPad,
        boxSizing: "border-box",
      }}
    >
      {/* ── NEW REVIEW CTA SECTION ────────────────────────────────────────── */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 30,
          padding: isMobile ? "30px 20px" : "50px 40px",
          marginBottom: 30,
          textAlign: "center",
          boxShadow: "20px 20px 60px #bec8d4, -20px -20px 60px #ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 6,
            background: "linear-gradient(90deg, #07518a, #3b82f6, #07518a)",
          }}
        />

        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 20 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={isMobile ? 24 : 32} fill="#fbbf24" stroke="#fbbf24" />
          ))}
        </div>

        <h2
          style={{
            fontSize: isMobile ? 24 : 36,
            fontWeight: 900,
            color: "#1e293b",
            margin: "0 0 16px 0",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Your Review Makes a Difference
        </h2>

        <p
          style={{
            fontSize: isMobile ? 14 : 17,
            color: "#64748b",
            maxWidth: 700,
            margin: "0 auto",
            lineHeight: 1.6,
            fontWeight: 500,
          }}
        >
          Loved our service? Pick your nearest branch and leave us a quick Google review — it only takes 30 seconds and means everything to us.
        </p>
      </div>

      {/* ── HEADER (Original transformed) ─────────────────────────────────── */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 20,
          padding: isMobile ? "16px 14px" : "22px 26px",
          marginBottom: 20,
          boxShadow: "9px 9px 16px #d1d9e6, -9px -9px 16px #ffffff",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: "linear-gradient(135deg,#1e40af,#3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(59,130,246,0.4)",
            }}
          >
            <Building2 size={22} color="#ffffff" />
          </div>

          {/* Title */}
          {/* <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontSize: isMobile ? 15 : 20,
                fontWeight: 800,
                color: "#1e293b",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Brihaspathi Technologies
            </h1>
            <p
              style={{
                fontSize: isMobile ? 11 : 12,
                color: "#64748b",
                margin: 0,
                marginTop: 2,
                fontWeight: 500,
              }}
            >
              Our Nationwide Presence
            </p>
          </div> */}

          {/* View toggle (desktop only) */}
          {isDesktop && (
            <div
              style={{
                display: "flex",
                gap: 4,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid #1e6b9e",
                borderRadius: 12,
                padding: 4,
                flexShrink: 0,
              }}
            >
              {(
                [
                  { key: "grid" as const, Icon: LayoutGrid, label: "Grid" },
                  { key: "timeline" as const, Icon: AlignJustify, label: "Timeline" },
                ]
              ).map(({ key, Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "7px 14px",
                    borderRadius: 9,
                    border: "none",
                    background: view === key ? "#07518a" : "transparent",
                    color: view === key ? "#ffffff" : "#64748b",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── LOADING ────────────────────────────────────────────────────────── */}
      {loading && <Loader />}

      {/* ── CONTENT ────────────────────────────────────────────────────────── */}
      {!loading && (
        <>
          {view === "timeline" && isDesktop ? (
            <div
              style={{
                background: "#ffffff",
                borderRadius: 20,
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                overflow: "hidden",
                marginBottom: 14,
              }}
            >
              <TimelineView data={data} />
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: gridCols,
                gap: isMobile ? 10 : 14,
                marginBottom: 14,
              }}
            >
              {data.map((branch, i) => (
                <BranchCard
                  key={`${branch.City}-${i}`}
                  branch={branch}
                  index={i}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}