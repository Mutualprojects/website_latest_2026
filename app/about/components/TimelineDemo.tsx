"use client";

import React, { useState } from "react";
import { Timeline } from "./timeline";
import Image from "next/image";
import { motion } from "framer-motion";

/* ================= IMAGES ================= */

import img2006 from "./journey_images/team-members-engaged-computer-work-with-gears-icons-symbolizing-innovation.png";
import img2014 from "./journey_images/cartoon-man-robot-with-sign-that-says-radio.png";
import img2019 from "./journey_images/elephant-silhouette-with-panorama.png";
import img2024 from "./journey_images/vote-ballot-box-people-putting-pepper-vote-into-box-election-concept-democracy-freedom-speech-justice-voting-opinion-referendum-poll-choice-event-vector-illustration.png";

import imgntonl from "./journey_images/91527425_India.jpg";
import bank_survilence from "./journey_images/security-system-surveillance-cameras-background-with-cityscape-blue-sky-realistic-vector.png";
import industry from "./journey_images/labor-substitution-abstract-concept-vector-illustration.png";
import border from "./journey_images/soldiers-performance-combat-mission-silhouette-soldiers-are-fighting-battle.png";
import smart_survilence from "./journey_images/cc-camera-technology-design-vector-illustration-eps10-graphic.png";
import Examination_Surveillance from "./journey_images/guard-service-man-sitting-control-panel-watching-surveillance-camera-videos-monitors-cctv-control-room-vector-illustration-security-system-worker-spying-supervision-concept.png";
import img2026Ai from "./journey_images/business-teamwork-people-finding-new-solutions-generating-generating-ideas.png";
import img2026Tech from "./journey_images/iot-internet-things-devices-connectivity-concepts-network-flat-style-with-people.png";

/* ================= TYPES ================= */

/** Internal shape used by all card / grouping components */
interface ProjectEntry {
  Year: string;
  "Section / Category": string;
  "Client / Project": string;
  "Description / Details": string;
  "Location / Notes": string;
  Sector: string;
  images: string;
}

/** Shape returned by the SheetDB API (note: capital-I "Images") */
interface ApiProjectEntry {
  Year: string;
  "Section / Category": string;
  "Client / Project": string;
  "Description / Details": string;
  "Location / Notes": string;
  Sector: string;
  Images: string;
}

/* ================= API CONFIG ================= */

const SHEETDB_API_URL = "https://sheetdb.io/api/v1/1n8lm57mnpuk6";

/* ================= DESIGN TOKENS ================= */
/*
  Subject: a 2006-founded electronic security / surveillance company whose
  work spans elections, border defence, judiciary and rail. The brief
  material is essentially a live "deployment log" — so the visual language
  borrows from a monitoring console: dark instrument panels, a cyan "signal"
  accent standing in for a scan-line / live-feed indicator, and monospace
  data labels for anything numeric or timestamp-like. Cards stay light and
  editorial so the underlying content (client, sector, location) reads fast.
*/
const INK = "#0a1420";        // console panel / dark surfaces
const BRAND = "#07518a";      // primary brand blue (unchanged)
const BRAND_DEEP = "#052f52"; // deep navy for gradients
const SIGNAL = "#22d3ee";     // live / scan accent
const PAPER = "#f8fafc";      // cool paper background
const STEEL = "#5b6b7d";      // muted slate for secondary text

/* ================= SECTOR COLORS ================= */

const SECTOR_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Elections: { bg: "rgba(234,88,12,0.08)", text: "#ea580c", border: "rgba(234,88,12,0.2)" },
  "Border Security": { bg: "rgba(220,38,38,0.08)", text: "#dc2626", border: "rgba(220,38,38,0.2)" },
  Healthcare: { bg: "rgba(16,185,129,0.08)", text: "#10b981", border: "rgba(16,185,129,0.2)" },
  Industrial: { bg: "rgba(245,158,11,0.08)", text: "#f59e0b", border: "rgba(245,158,11,0.2)" },
  Judiciary: { bg: "rgba(109,40,217,0.08)", text: "#6d28d9", border: "rgba(109,40,217,0.2)" },
  "Smart Infrastructure": { bg: "rgba(6,182,212,0.08)", text: "#06b6d4", border: "rgba(6,182,212,0.2)" },
  Transportation: { bg: "rgba(59,130,246,0.08)", text: "#3b82f6", border: "rgba(59,130,246,0.2)" },
  Railways: { bg: "rgba(75,85,99,0.08)", text: "#4b5563", border: "rgba(75,85,99,0.2)" },
  "Renewable Energy": { bg: "rgba(34,197,94,0.08)", text: "#22c55e", border: "rgba(34,197,94,0.2)" },
  "Defence / Renewable": { bg: "rgba(132,204,22,0.08)", text: "#84cc16", border: "rgba(132,204,22,0.2)" },
  Education: { bg: "rgba(14,165,233,0.08)", text: "#0ea5e9", border: "rgba(14,165,233,0.2)" },
  "Examination Monitoring": { bg: "rgba(168,85,247,0.08)", text: "#a855f7", border: "rgba(168,85,247,0.2)" },
  Religious: { bg: "rgba(251,146,60,0.08)", text: "#fb923c", border: "rgba(251,146,60,0.2)" },
};

function getSectorColor(sector: string) {
  return (
    SECTOR_COLORS[sector] || {
      bg: "rgba(7,81,138,0.08)",
      text: "#07518a",
      border: "rgba(7,81,138,0.2)",
    }
  );
}

/* ================= GLOBAL STYLE (fonts + keyframes) ================= */

function BrandStyle() {
  return (
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap");
      .bt-display {
        font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
      }
      .bt-mono {
        font-family: "JetBrains Mono", ui-monospace, "SFMono-Regular", monospace;
        letter-spacing: 0.08em;
      }
      @keyframes bt-scan {
        0% {
          transform: translateY(-100%);
        }
        100% {
          transform: translateY(340%);
        }
      }
      @keyframes bt-blink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.25;
        }
      }
      @keyframes bt-pulse-ring {
        0% {
          transform: scale(0.55);
          opacity: 0.55;
        }
        100% {
          transform: scale(2.4);
          opacity: 0;
        }
      }
      @keyframes bt-skeleton-pulse {
        0%, 100% {
          opacity: 0.4;
        }
        50% {
          opacity: 0.8;
        }
      }
      .bt-corner {
        position: absolute;
        width: 14px;
        height: 14px;
        opacity: 0;
        transition: opacity 0.25s ease;
      }
      .group:hover .bt-corner {
        opacity: 1;
      }
    `}</style>
  );
}

/* ================= SKELETON CARD (loading placeholder) ================= */

function SkeletonCard() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div
        className="w-full"
        style={{
          height: "160px",
          background: "linear-gradient(110deg, #f0f0f0 8%, #e8e8e8 18%, #f0f0f0 33%)",
          animation: "bt-skeleton-pulse 1.8s ease-in-out infinite",
        }}
      />
      <div className="flex flex-col gap-3 p-5">
        <div
          className="h-5 w-20 rounded-full"
          style={{
            background: "#e8e8e8",
            animation: "bt-skeleton-pulse 1.8s ease-in-out infinite 0.1s",
          }}
        />
        <div
          className="h-4 w-3/4 rounded"
          style={{
            background: "#e8e8e8",
            animation: "bt-skeleton-pulse 1.8s ease-in-out infinite 0.2s",
          }}
        />
        <div
          className="h-3 w-full rounded"
          style={{
            background: "#f0f0f0",
            animation: "bt-skeleton-pulse 1.8s ease-in-out infinite 0.3s",
          }}
        />
        <div
          className="h-3 w-1/2 rounded"
          style={{
            background: "#f0f0f0",
            animation: "bt-skeleton-pulse 1.8s ease-in-out infinite 0.4s",
          }}
        />
      </div>
    </div>
  );
}

/* ================= PROJECT CARD ================= */

function ProjectCard({ project, index }: { project: ProjectEntry; index: number }) {
  const color = getSectorColor(project.Sector);
  const hasImage = project.images && project.images.trim() !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
      style={{ borderColor: color.border }}
    >
      {/* accent edge */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: color.text }} />

      {hasImage ? (
        <div className="relative w-full overflow-hidden" style={{ height: "160px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.images}
            alt={project["Client / Project"]}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }}
          />
          {/* scan-line sweep on hover — literal nod to the subject matter, kept subtle */}
          <div
            className="absolute left-0 right-0 h-8 opacity-0 group-hover:opacity-70 transition-opacity duration-200 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, ${SIGNAL}55, transparent)`,
              animation: "bt-scan 1.6s linear infinite",
            }}
          />
          {/* viewfinder corner brackets */}
          <span
            className="bt-corner top-2 left-2 border-t-2 border-l-2"
            style={{ borderColor: SIGNAL }}
          />
          <span
            className="bt-corner top-2 right-2 border-t-2 border-r-2"
            style={{ borderColor: SIGNAL }}
          />
          <span
            className="bt-corner bottom-2 left-2 border-b-2 border-l-2"
            style={{ borderColor: SIGNAL }}
          />
          <span
            className="bt-corner bottom-2 right-2 border-b-2 border-r-2"
            style={{ borderColor: SIGNAL }}
          />
        </div>
      ) : (
        <div
          className="w-full flex items-center justify-center bt-mono text-[10px] uppercase tracking-widest"
          style={{ height: "56px", backgroundColor: color.bg, color: color.text }}
        >
          No feed image on file
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        <span
          className="self-start mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase bt-mono"
          style={{ backgroundColor: color.bg, color: color.text, border: `1px solid ${color.border}` }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color.text }} />
          {project.Sector}
        </span>

        <h4 className="bt-display font-semibold text-sm leading-snug text-neutral-900 mb-1 line-clamp-2">
          {project["Client / Project"]}
        </h4>

        <p className="text-xs text-neutral-600 leading-relaxed flex-1 line-clamp-3">
          {project["Description / Details"]}
        </p>

        {project["Location / Notes"] && project["Location / Notes"] !== "-" && (
          <div className="mt-3 flex items-center gap-1.5">
            <svg className="w-3 h-3 flex-shrink-0" style={{ color: color.text }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[10px] font-medium bt-mono" style={{ color: color.text }}>
              {project["Location / Notes"]}
            </span>
          </div>
        )}

        {project["Section / Category"] && project["Section / Category"].trim() !== "" && (
          <div className="mt-3 pt-3 border-t border-neutral-100">
            <span className="text-[10px] text-neutral-400 uppercase bt-mono">
              {project["Section / Category"].trim()}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ================= YEAR PROJECTS SECTION ================= */

function YearProjects({ projects }: { year: string; projects: ProjectEntry[] }) {
  const [expanded, setExpanded] = useState(false);
  const INITIAL_SHOW = 4;
  const shown = expanded ? projects : projects.slice(0, INITIAL_SHOW);
  const hasMore = projects.length > INITIAL_SHOW;

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {shown.map((project, i) => (
          <ProjectCard key={`${project["Client / Project"]}-${i}`} project={project} index={i} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold bt-mono transition-all duration-200 hover:shadow-md"
            style={{ color: BRAND, backgroundColor: "rgba(7,81,138,0.06)", border: "1px solid rgba(7,81,138,0.2)" }}
          >
            {expanded ? "Collapse" : `+${projects.length - INITIAL_SHOW} more records`}
            <svg
              className="w-4 h-4 transition-transform duration-200"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

/* ================= CUSTOM HOOK: FETCH PROJECTS FROM SHEETDB ================= */

function useSheetDbProjects() {
  const [projects, setProjects] = React.useState<ProjectEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [retryCount, setRetryCount] = React.useState(0);

  const fetchProjects = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(SHEETDB_API_URL);
      if (!res.ok) {
        throw new Error(`API returned ${res.status}: ${res.statusText}`);
      }
      const data: ApiProjectEntry[] = await res.json();

      // Map API "Images" (capital I) → internal "images" (lowercase i)
      const mapped: ProjectEntry[] = data.map((item) => ({
        Year: item.Year || "",
        "Section / Category": item["Section / Category"] || "",
        "Client / Project": item["Client / Project"] || "",
        "Description / Details": item["Description / Details"] || "",
        "Location / Notes": item["Location / Notes"] || "",
        Sector: item.Sector || "",
        images: item.Images || "",
      }));

      setProjects(mapped);
    } catch (err) {
      console.error("SheetDB fetch failed:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects, retryCount]);

  const retry = React.useCallback(() => {
    setRetryCount((c) => c + 1);
  }, []);

  return { projects, loading, error, retry };
}

/* ================= API PROJECTS SECTION ================= */

function ApiProjectsSection() {
  const { projects, loading, error, retry } = useSheetDbProjects();

  const grouped = projects.reduce<Record<string, ProjectEntry[]>>((acc, p) => {
    const yr = p.Year || "Unknown";
    if (!acc[yr]) acc[yr] = [];
    acc[yr].push(p);
    return acc;
  }, {});

  const sortedYears = Object.keys(grouped).sort((a, b) => {
    const yearA = parseInt(a.split("-")[0]);
    const yearB = parseInt(b.split("-")[0]);
    return (yearB || 0) - (yearA || 0);
  });

  return (
    <div className="w-full" style={{ backgroundColor: PAPER }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase bt-mono mb-5"
            style={{ color: SIGNAL, backgroundColor: INK }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: SIGNAL, animation: "bt-blink 1.6s ease-in-out infinite" }}
            />
            Live Deployment Log
          </div>
          <h2 className="bt-display text-3xl sm:text-5xl font-bold tracking-tight mb-3" style={{ color: INK }}>
            Projects, by year
          </h2>
          <p className="text-neutral-500 text-base max-w-xl mx-auto">
            Every milestone deployment on record — from border outposts to solar rooftops —
            across India and beyond.
          </p>
        </motion.div>

        {/* ── Loading skeleton state ── */}
        {loading && (
          <div className="space-y-16">
            {[1, 2, 3].map((group) => (
              <div key={group}>
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="rounded-xl px-5 py-2.5"
                    style={{
                      width: "100px",
                      height: "44px",
                      background: "#e8e8e8",
                      animation: "bt-skeleton-pulse 1.8s ease-in-out infinite",
                    }}
                  />
                  <div className="flex-1">
                    <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${BRAND}22, transparent)` }} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((card) => (
                    <SkeletonCard key={card} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Error state with retry ── */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: "rgba(220,38,38,0.08)" }}
            >
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="bt-display text-xl font-bold text-neutral-800 mb-2">
              Signal Lost
            </h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-md">
              Unable to connect to the deployment database. This may be a temporary network issue.
            </p>
            <p className="text-xs text-red-400 bt-mono mb-6">
              {error}
            </p>
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold bt-mono transition-all duration-200 hover:shadow-lg active:scale-95"
              style={{ color: "#fff", backgroundColor: BRAND }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retry Connection
            </button>
          </motion.div>
        )}

        {/* ── Year-wise project groups ── */}
        {!loading && !error && (
          <div className="space-y-16">
            {sortedYears.map((year, yi) => {
              const yearProjects = grouped[year];
              const sectorCount = new Set(yearProjects.map((p) => p.Sector)).size;
              return (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: yi * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-4 mb-1">
                    <div
                      className="flex items-center justify-center rounded-xl px-5 py-2.5 bt-display font-bold text-xl sm:text-2xl text-white flex-shrink-0"
                      style={{ backgroundColor: INK, boxShadow: `0 8px 24px ${BRAND_DEEP}33` }}
                    >
                      {year}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${BRAND}66, transparent)` }} />
                      <span className="block mt-1.5 text-[10px] uppercase bt-mono" style={{ color: STEEL }}>
                        {yearProjects.length} record{yearProjects.length !== 1 ? "s" : ""} · {sectorCount} sector
                        {sectorCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <YearProjects year={year} projects={yearProjects} />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Console-style stats summary */}
        {!loading && !error && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 rounded-2xl overflow-hidden"
            style={{ backgroundColor: INK, boxShadow: `0 20px 50px ${BRAND_DEEP}40` }}
          >
            <div
              className="flex items-center justify-between px-6 py-3 border-b"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <span className="bt-mono text-[10px] uppercase text-white/40">System Summary</span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: SIGNAL, animation: "bt-blink 1.6s ease-in-out infinite" }}
                />
                <span className="bt-mono text-[10px] uppercase" style={{ color: SIGNAL }}>
                  Live
                </span>
              </span>
            </div>
            <div className="flex flex-wrap gap-6 justify-around text-center px-6 py-8 sm:py-10">
              {[
                { label: "Total Records", value: projects.length },
                { label: "Years Active", value: sortedYears.length },
                { label: "Sectors Covered", value: new Set(projects.map((p) => p.Sector)).size },
                { label: "Reach", value: "Pan-India" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1.5">
                  <span className="bt-display text-3xl sm:text-4xl font-bold text-white">{stat.value}</span>
                  <span className="text-[10px] text-white/45 font-semibold uppercase bt-mono">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ================= MAIN EXPORT ================= */

export function TimelineDemo() {
  const data = [
    {
      title: "2026 — AI Video Analytics & AI Solutions",
      content: (
        <div className="flex flex-col lg:flex-row w-full gap-8">
          <div className="flex flex-col sm:flex-row gap-6 flex-1">
            <div className="relative w-full sm:w-[280px] flex-shrink-0">
              <Image
                src={img2026Ai}
                alt="AI and innovation solutions"
                className="rounded-xl object-cover"
                style={{ height: "260px", width: "100%" }}
              />
            </div>
            <div className="relative w-full sm:w-[280px] flex-shrink-0">
              <Image
                src={img2026Tech}
                alt="AI and IoT technology"
                className="rounded-xl object-cover"
                style={{ height: "260px", width: "100%" }}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="bt-display font-semibold mb-3" style={{ color: BRAND }}>
              AI Video Analytics & AI Solutions
            </p>
            <p className="text-sm leading-relaxed text-neutral-800">
              Today we focus on intelligent video analytics, AI-driven insights, and
              software-led solutions that make surveillance smarter and operations
              more efficient across security, retail, and smart infrastructure.
            </p>
            <ul className="list-disc ml-5 text-sm text-neutral-800 mt-3 space-y-1">
              <li>AI-powered video analytics and object detection</li>
              <li>Cloud and edge AI solutions</li>
              <li>Integration with IoT and smart city platforms</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <Image
            src={Examination_Surveillance}
            alt="Examination Surveillance"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="bt-display font-semibold mb-3" style={{ color: BRAND }}>
            Examination Surveillance
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            We expanded into nationwide education surveillance to support
            high-stakes examinations with secure monitoring systems.
          </p>
          <ul className="list-disc ml-5 text-sm text-neutral-800 mt-3 space-y-1">
            <li>65,000+ cameras for NEET examinations (NTA)</li>
            <li>8,500+ cameras for Telangana State Board exams</li>
            <li>4,500+ cameras for MHCET exams in Maharashtra</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <Image
            src={img2024}
            alt="Election Webcasting"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="bt-display font-semibold mb-4" style={{ color: BRAND }}>
            Election Webcasting
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Deployed over 100,000 cameras across India for real-time election
            monitoring during the General Elections.
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <Image
            src={border}
            alt="Border Surveillance"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="bt-display font-semibold mb-4" style={{ color: BRAND }}>
            Border Security Force (BSF)
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Installed 674 surveillance cameras across sensitive international
            border locations.
          </p>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <Image
            src={industry}
            alt="Manufacturing"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="bt-display font-semibold mb-4" style={{ color: BRAND }}>
            Advancing into Manufacturing
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Transitioned into in-house manufacturing aligned with Make in India.
          </p>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div>
          <Image
            src={bank_survilence}
            alt="Bank Surveillance"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="bt-display font-semibold mb-4" style={{ color: BRAND }}>
            Banking Surveillance
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Strengthened security across banks and ATMs with intelligent CCTV.
          </p>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div>
          <Image
            src={img2019}
            alt="Kaziranga"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="bt-display font-semibold mb-4" style={{ color: BRAND }}>
            Kaziranga National Park
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Deployed thermal & ANPR systems for wildlife protection.
          </p>
        </div>
      ),
    },
    {
      title: "2016",
      content: (
        <div>
          <Image
            src={imgntonl}
            alt="Nationwide"
            className="rounded-lg"
            style={{ height: "300px", width: "300px" }}
          />
          <p className="bt-display font-semibold mb-4" style={{ color: BRAND }}>
            Nationwide Surveillance
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Expanded large-scale surveillance deployments across India.
          </p>
        </div>
      ),
    },
    {
      title: "2014",
      content: (
        <div>
          <Image
            src={img2014}
            alt="Radio Surveillance"
            className="rounded-lg"
            style={{ height: "300px", width: "500px" }}
          />
          <p className="bt-display font-semibold mb-4" style={{ color: BRAND }}>
            Radio-Based Surveillance
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Enabled monitoring in remote sand mines using radio communication.
          </p>
        </div>
      ),
    },
    {
      title: "2012",
      content: (
        <div>
          <Image
            src={smart_survilence}
            alt="City Surveillance"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="bt-display font-semibold mb-4" style={{ color: BRAND }}>
            City Surveillance (Smart City)
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Implemented CCTV systems for urban safety and command centers.
          </p>
        </div>
      ),
    },
    {
      title: "2006",
      content: (
        <div>
          <Image
            src={img2006}
            alt="Web Development"
            className="rounded-lg"
            style={{ height: "300px", width: "300px" }}
          />
          <p className="bt-display font-semibold mb-4" style={{ color: BRAND }}>
            Web Development & Digital Marketing
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Started with scalable web platforms and digital branding solutions.
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <BrandStyle />

      {/* ── Existing static timeline — completely unchanged ── */}
      <section className="w-full">
        <Timeline data={data} />
      </section>

      {/* ── Signature transition: a signal pulse, marking the hand-off from
           narrated history to the live, queryable project log ── */}
      <div className="relative py-10" style={{ backgroundColor: PAPER }}>
        <div className="relative max-w-7xl mx-auto px-6 flex items-center gap-6">
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${BRAND}40)` }} />
          <div className="relative flex items-center justify-center w-10 h-10 flex-shrink-0">
            <span
              className="absolute inset-0 rounded-full"
              style={{ border: `1px solid ${SIGNAL}`, animation: "bt-pulse-ring 2.4s ease-out infinite" }}
            />
            <span
              className="absolute inset-0 rounded-full"
              style={{ border: `1px solid ${SIGNAL}`, animation: "bt-pulse-ring 2.4s ease-out infinite 1.2s" }}
            />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BRAND }} />
          </div>
          <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${BRAND}40)` }} />
        </div>
        <p className="text-center bt-mono text-[10px] uppercase mt-3" style={{ color: STEEL }}>
          Deployment log — live feed below
        </p>
      </div>

      {/* ── Live API project cards ── */}
      <ApiProjectsSection />
    </>
  );
}

export default TimelineDemo;