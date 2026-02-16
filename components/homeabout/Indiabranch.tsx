// app/components/IndiaBranchesMap.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import india from "../heroimages/91527425_India.jpg"
type Side = "left" | "right" | "top" | "bottom";

type Branch = {
  id: string;
  name: string;
  top: number; // % from top of the map container
  left: number; // % from left of the map container
  side?: Side; // where to place the outside label
  isHeadOffice?: boolean;
  info?: string;
};

/** Office addresses and pin coordinates for India map */
const branches: Branch[] = [
  // North
  {
    id: "delhi",
    name: "DELHI",
    top: 27,
    left: 38,
    side: "top",
    info: "201 A Block, Naurang House, Connaught Lane, K G Marg, New Delhi, Delhi 110001",
  },
  {
    id: "chandigarh",
    name: "CHANDIGARH",
    top: 25,
    left: 35,
    side: "top",
    info: "WorkYard Coworking Spaces, Phase-2, Plot No. 337, Industrial & Business Park, Chandigarh 160002",
  },
  {
    id: "lucknow",
    name: "LUCKNOW",
    top: 32,
    left: 42,
    side: "top",
    info: "H No. 554-GA/277, Alambagh Road, Guru Nanak Nagar, Lucknow, Uttar Pradesh 226005",
  },
  {
    id: "palampur",
    name: "PALAMPUR",
    top: 22,
    left: 38,
    side: "left",
    info: "Palampur Tehsil, Near Income Tax Office, Behind Toy Store, Palampur, Kangra, Himachal Pradesh 176061",
  },

  // Central
  {
    id: "mp",
    name: "BHOPAL",
    top: 47,
    left: 42,
    side: "left",
    info: "LIG-G-01, Bawadia Kala, Fortune Glory Ext 2, Rohit Nagar, Bhopal, Madhya Pradesh 462026",
  },

  // East / NE
  {
    id: "patna",
    name: "PATNA",
    top: 38,
    left: 59,
    side: "top",
    info: "Khesra No. 173, 1174/569, C-249, Ward No. 23, S P Sinha Path, East Boring Canal Road, Kotwali, Patna, Bihar 800001",
  },
  {
    id: "kolkata",
    name: "KOLKATA",
    top: 47,
    left: 61,
    side: "right",
    info: "Floor No. 5, H No. 83, S P Mukherjee Road, Devi Market, Kolkata, West Bengal 700026",
  },
  {
    id: "guwahati",
    name: "GUWAHATI",
    top: 35,
    left: 70,
    side: "right",
    info: "Udayan Vihar, Dalbari, Bishnu Rabha Byelane, Guwahati, Kamrup Metropolitan, Assam 781171",
  },

  // South
  {
    id: "bangalore",
    name: "BENGALURU",
    top: 82,
    left: 39,
    side: "left",
    info: "1st Floor, A52, RPR Complex, Kamadenu Nagar, Bengaluru, Karnataka 560016",
  },
  {
    id: "chennai",
    name: "CHENNAI",
    top: 80,
    left: 45,
    side: "right",
    info: "2nd Floor, New Door No. 32, Old Door No. 117, Plot No. C 10, Ravilla Towers, W Block, 3rd Avenue, Anna Nagar, Chennai, Tamil Nadu 600040",
  },
  {
    id: "kurnool",
    name: "KURNOOL",
    top: 70,
    left: 42,
    side: "right",
    info: "45/204-A1-3, Near KNR High School, Venkata Ramana Colony Road, Ashok Nagar, Kurnool, Andhra Pradesh 518005",
  },

  // West
  {
    id: "navi-mumbai",
    name: "NAVI MUMBAI",
    top: 55,
    left: 34,
    side: "left",
    info: "13th Floor, Plot No. 12, Sector 10, CBD Belapur, Navi Mumbai, Thane, Maharashtra 400614",
  },

  // Head Office (orange) — same address as contact page
  {
    id: "hyderabad",
    name: "HYDERABAD (H.O)",
    top: 60,
    left: 44,
    side: "left",
    isHeadOffice: true,
    info: "5th Floor, 7-1-621/259, Sahithi Arcade, Beside S R Nagar Police Station, S R Nagar, Hyderabad, Telangana 500038",
  },
];

export default function IndiaBranchesMap() {
  const [activeId, setActiveId] = useState<string | null>("hyderabad");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const active = useMemo(
    () => branches.find((b) => b.id === activeId) ?? null,
    [activeId]
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
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-[1fr_380px]">
        {/* Map card — NO overflow hidden so labels can sit outside the silhouette */}
        <div className="relative rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="absolute left-4 top-4 z-20 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700 ring-1 ring-slate-200">
            Branches
          </div>

          {/* Real image as background layer */}
          <div
            className="relative h-[55vh] min-h-[420px] md:h-[60vh] md:min-h-[520px] w-full"
            // click empty space to clear selection (desktop)
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("button")) return;
              setActiveId(null);
            }}
          >
            <Image
              src={india} // <-- keep this filename in /public
              alt="India map"
              fill
              priority
              className="object-contain"
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
          </div>
        </div>

        {/* Side panel (desktop) */}
        <aside className="hidden rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm md:block">
          <BranchDetails branch={active} onClose={() => setActiveId(null)} />
        </aside>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 block rounded-t-2xl border-t border-slate-200 bg-white p-4 shadow-2xl md:hidden transition-transform duration-300 ${
          active ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto max-w-3xl">
          <BranchDetails branch={active} onClose={() => setActiveId(null)} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- subcomponents ---------------- */

function BranchDetails({
  branch,
  onClose,
}: {
  branch: Branch | null;
  onClose: () => void;
}) {
  if (!branch)
    return <p className="text-sm text-slate-500">Tap a pin to view details.</p>;
  const isHeadOffice = branch.isHeadOffice === true;
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold tracking-tight">
          {branch.name}
          {isHeadOffice && (
            <span className="ml-2 rounded-full bg-orange-200 px-2 py-0.5 text-xs font-bold text-orange-800 uppercase tracking-wide">
              Head Office
            </span>
          )}
        </h3>
        <button
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 md:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div
        className={`rounded-xl border p-3.5 text-sm ${
          isHeadOffice
            ? "border-orange-300 bg-orange-50/90 text-slate-700 ring-1 ring-orange-200"
            : "rounded-lg border-slate-200 bg-slate-50 text-slate-700"
        }`}
      >
        {branch.info ?? "Branch information."}
      </div>
    </div>
  );
}

/** White location-marker pin + responsive callouts.
 *  Directions/lines logic UNCHANGED; only visuals/responsiveness enhanced.
 */
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
  // stroke color via currentColor; inner dot via fill classes
  const strokeClass = b.isHeadOffice ? "text-orange-500" : "text-slate-300";
  const innerDotClass = b.isHeadOffice ? "fill-orange-500" : "fill-slate-600";

  // responsive offsets for label lines using clamp()
  const H_OFF = "clamp(72px, 8vw, 140px)"; // left/right
  const V_OFF = "clamp(40px, 6vw, 80px)"; // top

  const showTip = hovered || active; // tooltip by the marker

  return (
    <div className="absolute" style={{ top: `${b.top}%`, left: `${b.left}%` }}>
      <button
        tabIndex={0}
        onMouseEnter={() => onHover(b.id)}
        onMouseLeave={onLeave}
        onFocus={() => onHover(b.id)}
        onBlur={onLeave}
        onClick={onOpen}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
        aria-label={`Open details for ${b.name}`}
        className="group relative -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5 outline-none ring-2 ring-transparent focus:ring-slate-400"
      >
        {/* gentle ping for H.O or active */}
        {(b.isHeadOffice || active) && (
          <span className="pointer-events-none absolute -inset-1 rounded-full bg-orange-400/30 animate-ping" />
        )}

        {/* WHITE LOCATION MARKER (teardrop) */}
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 drop-shadow-sm transition-transform group-hover:scale-110"
        >
          {/* pin shape */}
          <path
            d="M12 2c-4.4 0-8 3.3-8 7.4 0 5.1 7.1 12 7.4 12.3.3.3.8.3 1.1 0C12.9 21.4 20 14.5 20 9.4 20 5.3 16.4 2 12 2z"
            fill="#ffffff"
            stroke="currentColor"
            strokeWidth="1.5"
            className={strokeClass}
          />
          {/* center dot */}
          <circle cx="12" cy="10" r="2" className={innerDotClass} />
        </svg>

        {/* Small tooltip by the marker (works on mobile & desktop) */}
        {showTip && (
          <span className="absolute left-1/2 top-[-10px] -translate-x-1/2 -translate-y-full rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white shadow md:top-[-6px]">
            {b.name}
          </span>
        )}

        {/* CALLOUTS (outside the silhouette) — desktop only, SAME directions/logic */}
        {/* LEFT */}
        {b.side === "left" && (
          <>
            <span
              className="pointer-events-none absolute top-1/2 right-full hidden h-px bg-orange-400 md:block"
              style={{ width: H_OFF }}
            />
            <span
              className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[11px] font-semibold tracking-wide text-slate-800 md:block"
              style={{ right: `calc(100% + 8px + ${H_OFF})` }}
            >
              {b.name}
            </span>
          </>
        )}

        {/* RIGHT */}
        {b.side === "right" && (
          <>
            <span
              className="pointer-events-none absolute top-1/2 left-full hidden h-px bg-orange-400 md:block"
              style={{ width: H_OFF }}
            />
            <span
              className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[11px] font-semibold tracking-wide text-slate-800 md:block"
              style={{ left: `calc(100% + 8px + ${H_OFF})` }}
            >
              {b.name}
            </span>
          </>
        )}

        {/* TOP */}
        {b.side === "top" && (
          <>
            <span
              className="pointer-events-none absolute left-1/2 bottom-full hidden w-px bg-orange-400 md:block"
              style={{ height: V_OFF }}
            />
            <span
              className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold tracking-wide text-slate-800 md:block"
              style={{ bottom: `calc(100% + 6px + ${V_OFF})` }}
            >
              {b.name}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
