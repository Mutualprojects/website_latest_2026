// app/components/IndiaBranchesMap.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { X, MapPin, Navigation } from "lucide-react";
import india from "../heroimages/91527425_India.jpg";

type Side = "left" | "right" | "top" | "bottom";

type ApiBranch = {
  id?: string;
  State: string;
  City: string;
  Office: string;
  CompanyName: string;
  Address: string;
  GMB: string;
  "GMB Shared": string;
  "Google Maps": string;
  "Embed Map": string;
};

type Branch = {
  id: string;
  name: string;
  top: number; // % from top of the map container
  left: number; // % from left of the map container
  side: Side; // where to place the outside label
  isHeadOffice: boolean;
  address: string;
  googleMapsUrl?: string;
  embedMap?: string;
};

const CITY_COORDINATES: Record<string, { top: number; left: number; side: Side }> = {
  "Hyderabad": { top: 60, left: 44, side: "left" },
  "Visakpathnam": { top: 61, left: 55, side: "right" },
  "Vijayawada": { top: 65, left: 49, side: "right" },
  "Kurnool": { top: 70, left: 42, side: "right" },
  "Bengaluru": { top: 82, left: 39, side: "left" },
  "Mumbai": { top: 55, left: 34, side: "left" },
  "West Bengal": { top: 47, left: 61, side: "right" },
  "Kolkata": { top: 47, left: 61, side: "right" },
  "Patna": { top: 38, left: 59, side: "top" },
  "Guwahati": { top: 35, left: 70, side: "right" },
  "Bhopal": { top: 47, left: 42, side: "left" },
};

export default function IndiaBranchesMap() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBranches() {
      try {
        const res = await fetch("/api/branches");
        if (!res.ok) throw new Error("Failed to fetch branches from proxy");
        const data: ApiBranch[] = await res.json();

        const mappedBranches: Branch[] = data.map((item) => {
          let rawCity = (item.City || "").trim();
          let rawState = (item.State || "").trim();
          
          // Fix data entry where City is "West Bengal" and State is "Kolkata"
          if (rawCity === "West Bengal" && rawState === "Kolkata") {
            rawCity = "Kolkata";
            rawState = "West Bengal";
          }

          let cityKey = rawCity;
          // Normalize special cases
          if (rawCity === "Bengaluru") cityKey = "Bengaluru";
          else if (rawCity === "Kolkata" || rawState === "Kolkata" || rawState === "West Bengal") cityKey = "Kolkata";

          const coords = CITY_COORDINATES[cityKey] || { top: 50, left: 50, side: "right" };

          return {
            id: item.id || rawCity.toLowerCase().replace(/\s+/g, "-") || "unknown",
            name: rawCity ? rawCity.toUpperCase() : "UNKNOWN",
            top: coords.top,
            left: coords.left,
            side: coords.side,
            isHeadOffice: (item.Office || "").toLowerCase().includes("head office"),
            address: item.Address || "",
            googleMapsUrl: item["Google Maps"] || undefined,
            embedMap: item["Embed Map"] || undefined,
          };
        });

        setBranches(mappedBranches);
        // Set head office as default active
        const ho = mappedBranches.find(b => b.isHeadOffice);
        if (ho) setActiveId(ho.id);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBranches();
  }, []);

  const active = useMemo(
    () => branches.find((b) => b.id === activeId) ?? null,
    [activeId, branches]
  );

  // Close mobile drawer with Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="w-full">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 md:grid-cols-[1fr_400px]">
        {/* Map card */}
        <div className="relative rounded-3xl bg-white shadow-lg ring-1 ring-slate-200/60 overflow-hidden md:overflow-visible transition-all">
          <div className="absolute left-6 top-6 z-20 rounded-full bg-white/90 backdrop-blur-md px-5 py-2 text-sm font-bold tracking-wide text-slate-800 shadow-sm ring-1 ring-slate-200">
            Our Presence
          </div>

          <div
            className="relative h-[60vh] min-h-[480px] md:h-[70vh] md:min-h-[600px] w-full"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("button")) return;
              setActiveId(null);
            }}
          >
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                <p className="text-slate-500 font-medium animate-pulse">Loading Map...</p>
              </div>
            ) : (
              <>
                <Image
                  src={india}
                  alt="India map"
                  fill
                  priority
                  className="object-contain opacity-95"
                />

                {/* Pins overlay */}
                <div className="absolute inset-0 z-10">
                  {branches.map((b) => (
                    <Pin
                      key={b.id}
                      b={b}
                      active={activeId === b.id}
                      hovered={hoveredId === b.id}
                      onHover={(id) => setHoveredId(id)}
                      onLeave={() => setHoveredId(null)}
                      onOpen={() => setActiveId(b.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Side panel (desktop) */}
        <aside className="hidden md:block">
          <div className="sticky top-24 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl h-fit max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 transition-all">
            <BranchDetails branch={active} onClose={() => setActiveId(null)} />
          </div>
        </aside>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 block rounded-t-3xl border-t border-slate-200/80 bg-white p-6 shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.15)] md:hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${active ? "translate-y-0" : "translate-y-full"
          }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto max-w-3xl max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <BranchDetails branch={active} onClose={() => setActiveId(null)} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- subcomponents ---------------- */

function extractIframeSrc(iframeStr: string) {
  const match = iframeStr.match(/src="([^"]+)"/);
  return match ? match[1] : null;
}

function BranchDetails({
  branch,
  onClose,
}: {
  branch: Branch | null;
  onClose: () => void;
}) {
  if (!branch) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-4 opacity-60">
        <div className="p-4 rounded-full bg-slate-50">
          <MapPin className="w-10 h-10 text-slate-400" />
        </div>
        <p className="text-base text-slate-500 font-medium">Select a location on the map<br />to view branch details.</p>
      </div>
    );
  }

  const isHeadOffice = branch.isHeadOffice;
  const mapSrc = branch.embedMap ? extractIframeSrc(branch.embedMap) : null;

  return (
    <div className="space-y-6 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
            {branch.name}
          </h3>
          {isHeadOffice && (
            <span className="inline-flex mt-2 items-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-[11px] font-bold text-white shadow-sm uppercase tracking-wider">
              Head Office
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors md:hidden text-slate-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className={`rounded-2xl p-5 text-sm relative overflow-hidden transition-all duration-300 ${isHeadOffice
          ? "bg-gradient-to-br from-orange-50 to-amber-50/40 border border-orange-200/60 shadow-sm"
          : "bg-slate-50 border border-slate-200/60 shadow-sm"
          }`}
      >
        <div className="relative z-10 flex gap-3.5">
          <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${isHeadOffice ? 'text-orange-500' : 'text-slate-400'}`} />
          <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">{branch.address}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {branch.googleMapsUrl && (
          <a
            href={branch.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <Navigation className="w-4 h-4 group-hover:animate-bounce" />
            Get Directions
          </a>
        )}
      </div>

      {mapSrc && (
        <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-slate-100 h-[240px] relative group">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 z-10"
          ></iframe>
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-0">
            <div className="animate-pulse w-8 h-8 rounded-full bg-slate-200"></div>
          </div>
        </div>
      )}
    </div>
  );
}

function Pin({
  b,
  active,
  hovered,
  onHover,
  onLeave,
  onOpen,
}: {
  b: Branch;
  active: boolean;
  hovered: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  onOpen: () => void;
}) {
  const strokeClass = b.isHeadOffice ? "text-orange-600" : "text-slate-400";
  const innerDotClass = b.isHeadOffice ? "fill-orange-500" : "fill-slate-600";
  const scaleClass = active ? "scale-125" : "scale-100 group-hover:scale-110";

  // responsive offsets for label lines using clamp()
  const H_OFF = "clamp(72px, 8vw, 140px)"; // left/right
  const V_OFF = "clamp(40px, 6vw, 80px)"; // top

  const showTip = hovered || active;

  return (
    <div className="absolute z-20 transition-all duration-500 ease-out" style={{ top: `${b.top}%`, left: `${b.left}%`, zIndex: active ? 50 : 20 }}>
      <button
        tabIndex={0}
        onMouseEnter={() => onHover(b.id)}
        onMouseLeave={onLeave}
        onFocus={() => onHover(b.id)}
        onBlur={onLeave}
        onClick={onOpen}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
        aria-label={`Open details for ${b.name}`}
        className="group relative -translate-x-1/2 -translate-y-1/2 rounded-full p-2 outline-none ring-2 ring-transparent focus:ring-orange-400/50 transition-all"
      >
        {/* gentle ping for H.O or active */}
        {(b.isHeadOffice || active) && (
          <span className="pointer-events-none absolute -inset-1 rounded-full bg-orange-500/30 animate-ping duration-1000" />
        )}
        {active && (
          <span className="pointer-events-none absolute -inset-0 rounded-full bg-orange-400/40 animate-pulse" />
        )}

        {/* WHITE LOCATION MARKER (teardrop) */}
        <svg
          viewBox="0 0 24 24"
          className={`h-9 w-9 drop-shadow-md transition-transform duration-300 ${scaleClass}`}
        >
          <path
            d="M12 2c-4.4 0-8 3.3-8 7.4 0 5.1 7.1 12 7.4 12.3.3.3.8.3 1.1 0C12.9 21.4 20 14.5 20 9.4 20 5.3 16.4 2 12 2z"
            fill="#ffffff"
            stroke="currentColor"
            strokeWidth="1.5"
            className={strokeClass}
          />
          <circle cx="12" cy="10" r="2.5" className={innerDotClass} />
        </svg>

        {/* Small tooltip by the marker (works on mobile & desktop) */}
        <div className={`absolute left-1/2 top-[-14px] -translate-x-1/2 -translate-y-full transition-all duration-300 ${showTip ? 'opacity-100 transform-none' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          <span className="rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-bold tracking-wide text-white shadow-lg whitespace-nowrap">
            {b.name}
          </span>
          {/* Tooltip arrow */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
        </div>

        {/* CALLOUTS (outside the silhouette) — desktop only */}
        {/* LEFT */}
        {b.side === "left" && (
          <>
            <span
              className={`pointer-events-none absolute top-1/2 right-full hidden h-[1.5px] bg-gradient-to-l from-orange-400 to-orange-400/0 md:block transition-all duration-500 origin-right ${showTip ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
              style={{ width: H_OFF }}
            />
            <span
              className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-xs font-bold tracking-widest text-slate-700 md:block transition-all duration-500 ${showTip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
              style={{ right: `calc(100% + 12px + ${H_OFF})` }}
            >
              {b.name}
            </span>
          </>
        )}

        {/* RIGHT */}
        {b.side === "right" && (
          <>
            <span
              className={`pointer-events-none absolute top-1/2 left-full hidden h-[1.5px] bg-gradient-to-r from-orange-400 to-orange-400/0 md:block transition-all duration-500 origin-left ${showTip ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
              style={{ width: H_OFF }}
            />
            <span
              className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-xs font-bold tracking-widest text-slate-700 md:block transition-all duration-500 ${showTip ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{ left: `calc(100% + 12px + ${H_OFF})` }}
            >
              {b.name}
            </span>
          </>
        )}

        {/* TOP */}
        {b.side === "top" && (
          <>
            <span
              className={`pointer-events-none absolute left-1/2 bottom-full hidden w-[1.5px] bg-gradient-to-t from-orange-400 to-orange-400/0 md:block transition-all duration-500 origin-bottom ${showTip ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
              style={{ height: V_OFF }}
            />
            <span
              className={`pointer-events-none absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-xs font-bold tracking-widest text-slate-700 md:block transition-all duration-500 ${showTip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ bottom: `calc(100% + 10px + ${V_OFF})` }}
            >
              {b.name}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
