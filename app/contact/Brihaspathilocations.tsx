"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, ExternalLink, Loader2, AlertCircle, Building2 } from "lucide-react";

const API_URL = "/api/branches";
const BRAND = "#07518a";

interface Location {
  State: string;
  City: string;
  Office: string;
  CompanyName: string;
  Address: string;
  GMB: string;
  "GMB Shared": string;
  "Google Maps": string;
  "Embed Map": string;
}

// ─────────────────────────────────────────────
// StateBadge Component
// ─────────────────────────────────────────────
function StateBadge({ state }: { state: string }) {
  return (
    <span
      className="inline-block rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide"
      style={{
        background: `${BRAND}15`,
        color: BRAND,
        border: `1px solid ${BRAND}30`,
      }}
    >
      {state}
    </span>
  );
}

// ─────────────────────────────────────────────
// OfficeBadge Component - Displays Office type in Brand Color #07518a
// ─────────────────────────────────────────────
function OfficeBadge({ office }: { office: string }) {
  if (!office || office.trim() === "") return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide"
      style={{
        background: `${BRAND}10`,
        border: `1px solid ${BRAND}30`,
      }}
    >
      <Building2 size={12} style={{ color: BRAND }} />
      <span style={{ color: BRAND }}>{office}</span>
    </span>
  );
}

// ─────────────────────────────────────────────
// MapEmbed Component
// ─────────────────────────────────────────────
function MapEmbed({ embedHtml, city }: { embedHtml: string; city: string }) {
  const [show, setShow] = useState(false);

  if (!embedHtml) return null;

  const match = embedHtml.match(/src="([^"]+)"/);
  const src = match ? match[1].replace("&amp;", "&") : null;
  if (!src) return null;

  return (
    <div className="mt-4">
      <button
        onClick={() => setShow((prev) => !prev)}
        aria-expanded={show}
        aria-controls={`map-${city}`}
        className="w-full flex items-center justify-start gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 border focus:outline-none focus:ring-2"
        style={{
          background: show ? BRAND : "#fff",
          color: show ? "#fff" : BRAND,
          borderColor: BRAND,
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 3px ${BRAND}30`;
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        }}
      >
        <MapPin size={16} />
        {show ? "Hide Map" : "View Location Map"}
      </button>

      {show && (
        <div
          id={`map-${city}`}
          className="mt-3 overflow-hidden rounded-xl border border-slate-200 shadow-lg transition-all duration-300"
          style={{ boxShadow: `0 4px 20px ${BRAND}15` }}
        >
          <iframe
            src={src}
            width="100%"
            height="240"
            className="border-0 block"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${city}`}
          />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// LocationCard Component - FIXED BORDER (no hover border changes)
// ─────────────────────────────────────────────
function LocationCard({ loc, index }: { loc: Location; index: number }) {
  const hasOfficeType = loc.Office && loc.Office.trim() !== "";

  return (
    <article
      className="relative overflow-hidden rounded-2xl p-7 h-full flex flex-col transition-shadow duration-300 focus-within:ring-2"
      style={{
        background: "rgba(255, 255, 255, 0.98)",
        border: `1px solid ${BRAND}25`,
        borderLeft: `4px solid ${BRAND}`,
        boxShadow: `0 2px 12px ${BRAND}08`,
        animation: "fadeSlideUp 0.5s ease both",
        animationDelay: `${index * 70}ms`,
        textAlign: "left",
      }}
      tabIndex={0}
      onFocus={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${BRAND}20`;
        (e.currentTarget as HTMLElement).style.borderColor = `${BRAND}40`;
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 12px ${BRAND}08`;
        (e.currentTarget as HTMLElement).style.borderColor = `${BRAND}25`;
      }}
    >
      {/* India Map Background Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/map-india-administrative-regions-india-map.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.05,
        }}
      />

      {/* Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(${BRAND}10 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col flex-1" style={{ textAlign: "left" }}>
        {/* Header Section - Left Aligned */}
        <div className="flex items-start gap-3.5 mb-4" style={{ textAlign: "left" }}>
          <div
            className="w-13 h-13 rounded-xl flex items-center justify-center flex-shrink-0 border-2"
            style={{
              background: `${BRAND}10`,
              borderColor: `${BRAND}25`,
              color: BRAND,
            }}
          >
            <MapPin size={24} />
          </div>
          <div style={{ textAlign: "left" }}>
            {/* City Name in Brand Color #07518a */}
            <h3
              className="m-0 font-bold leading-tight tracking-tight"
              style={{
                fontSize: "clamp(18px, 4vw, 22px)",
                color: BRAND,
                fontFamily: "'DM Sans', sans-serif",
                textAlign: "left",
              }}
            >
              {loc.City?.trim()}
            </h3>
            {/* Badges Row - Left Aligned: State + Office Type */}
            <div className="mt-1.5 flex items-center gap-2 flex-wrap" style={{ textAlign: "left" }}>
              <StateBadge state={loc.State} />
              {hasOfficeType && <OfficeBadge office={loc.Office} />}
            </div>
          </div>
        </div>

        {/* Company Name in Brand Color #07518a - Displayed in Card */}
        {loc.CompanyName && (
          <p
            className="m-0 mb-2 font-semibold"
            style={{
              fontSize: "clamp(12px, 3vw, 13px)",
              color: BRAND,
              fontFamily: "'DM Sans', sans-serif",
              textAlign: "left",
            }}
          >
            {loc.CompanyName}
          </p>
        )}

        {/* Address - Left Aligned */}
        <p
          className="m-0 mb-5 leading-relaxed flex-1 whitespace-pre-line"
          style={{
            fontSize: "clamp(13px, 3vw, 14px)",
            color: "#475569",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            textAlign: "left",
            lineHeight: "1.6",
          }}
        >
          {loc.Address}
        </p>

        {/* Action Buttons - Left Aligned */}
        <div className="flex flex-col gap-2.5 mt-auto" style={{ textAlign: "left" }}>
          {loc["Google Maps"] && loc["Google Maps"].trim() !== "" && (
            <a
              href={loc["Google Maps"]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${loc.City} in Google Maps`}
              className="inline-flex items-center justify-start gap-2 text-sm font-semibold rounded-lg px-4 py-3 no-underline transition-all duration-200 focus:outline-none focus:ring-2"
              style={{
                background: BRAND,
                color: "#fff",
                boxShadow: `0 3px 10px ${BRAND}25`,
                fontFamily: "'DM Sans', sans-serif",
                textAlign: "left",
                width: "fit-content",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.95";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 5px 16px ${BRAND}35`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 3px 10px ${BRAND}25`;
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 0 3px ${BRAND}40`;
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 3px 10px ${BRAND}25`;
              }}
            >
              <ExternalLink size={14} />
              <span>Open in Google Maps</span>
            </a>
          )}
        </div>

        {/* Map Embed */}
        <MapEmbed embedHtml={loc["Embed Map"] ?? ""} city={loc.City?.trim() || ""} />
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────
// Loading Skeleton - Fixed border style
// ─────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-7 animate-pulse"
      style={{
        background: "rgba(255, 255, 255, 0.98)",
        border: `1px solid ${BRAND}25`,
        borderLeft: `4px solid ${BRAND}`,
        textAlign: "left",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/map-india-administrative-regions-india-map.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.04,
        }}
      />
      <div className="relative z-10" style={{ textAlign: "left" }}>
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className="w-13 h-13 rounded-xl border-2 flex-shrink-0"
            style={{
              background: `${BRAND}10`,
              borderColor: `${BRAND}25`,
            }}
          />
          <div className="flex-1" style={{ textAlign: "left" }}>
            <div className="h-5 w-[60%] rounded mb-2" style={{ background: `${BRAND}10` }} />
            <div className="h-5 w-[40%] rounded-full" style={{ background: `${BRAND}10` }} />
          </div>
        </div>
        <div className="h-4 w-[70%] rounded mb-2" style={{ background: `${BRAND}10` }} />
        <div className="h-3.5 w-full rounded mb-2" style={{ background: `${BRAND}10` }} />
        <div className="h-3.5 w-[85%] rounded mb-6" style={{ background: `${BRAND}10` }} />
        <div className="h-11 w-[180px] rounded-lg" style={{ background: `${BRAND}10` }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function BrihaspathiLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    axios
      .get<Location[]>(API_URL)
      .then((res) => {
        if (isMounted) {
          setLocations(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch locations:", err);
        if (isMounted) {
          setError("Unable to load location data. Please refresh the page.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: ${BRAND}40; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${BRAND}60; }
        
        * { box-sizing: border-box; }
        body { 
          margin: 0; 
          padding: 0; 
          font-family: 'DM Sans', sans-serif; 
          text-align: left; 
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        .locations-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        @media (min-width: 768px) {
          .locations-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        
        @media (min-width: 1024px) {
          .locations-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        a:focus, button:focus, [tabindex]:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${BRAND}40;
          border-radius: 8px;
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div
        className="min-h-screen relative"
        style={{
          background: `linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)`,
          color: BRAND,
          fontFamily: "'DM Sans', sans-serif",
          textAlign: "left",
        }}
      >
        {/* Global India Map Background */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "url('/map-india-administrative-regions-india-map.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.03,
          }}
        />

        {/* Subtle Global Pattern */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(${BRAND}08 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10">

          <div className="flex flex-col gap-2 items-center">

            {/* Heading */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="text-[#07518a] text-4xl font-bold">
                Find Us
              </span>

              <span className="text-4xl font-bold  text-[#07518a]">
                Near You
              </span>

              {/* Animated dot */}
              {/* <span className="w-2 h-2 bg-[#07518a] rounded-full animate-pulse"></span> */}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed max-w-md text-center">
              Browse all our offices and branches. Click any location to open it instantly in Google Maps and get directions easily.
            </p>

          </div>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-5 py-5 md:py-10">
            {loading && (
              <div className="text-center py-20" role="status" aria-live="polite">
                <div
                  className="inline-flex items-center justify-center gap-3 font-medium"
                  style={{ color: BRAND, fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Loader2 className="animate-spin" size={20} />
                  <span>Loading office locations...</span>
                </div>
                <div className="locations-grid mt-10">
                  {[...Array(6)].map((_, i) => (
                    <LoadingSkeleton key={i} />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div
                className="max-w-lg mx-auto rounded-xl p-6 flex items-center justify-center gap-3"
                style={{
                  background: `${BRAND}08`,
                  border: `1px solid ${BRAND}30`,
                  color: BRAND,
                  fontFamily: "'DM Sans', sans-serif",
                }}
                role="alert"
              >
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {!loading && !error && locations.length === 0 && (
              <div className="text-center py-20" style={{ color: "#475569" }}>
                <MapPin
                  size={48}
                  className="mx-auto mb-4"
                  style={{ color: BRAND, opacity: 0.6 }}
                />
                <p
                  className="text-lg font-bold mb-2"
                  style={{ color: BRAND, fontFamily: "'DM Sans', sans-serif" }}
                >
                  No locations available
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Please check back later
                </p>
              </div>
            )}

            {!loading && !error && locations.length > 0 && (
              <div className="locations-grid">
                {locations.map((loc, i) => (
                  <LocationCard key={`${loc.City}-${loc.Address}-${i}`} loc={loc} index={i} />
                ))}
              </div>
            )}
          </main>

          {/* Footer */}

        </div>
      </div>
    </>
  );
}