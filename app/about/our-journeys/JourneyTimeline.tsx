"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Video,
  Radio,
  Globe,
  Award,
  Landmark,
  Cpu,
  Factory,
  MapPin,
  Layers,
  Sparkles,
  RefreshCw,
  Building2,
  ChevronLeft,
  ChevronRight,
  PieChart,
  ListOrdered,
} from "lucide-react";

export interface SheetDBEntry {
  Year: string;
  "Section / Category"?: string;
  "Client / Project": string;
  "Description / Details": string;
  "Location / Notes"?: string;
  Sector?: string;
  Images?: string;
  images?: string;
}

export interface YearGroup {
  year: string;
  projects: SheetDBEntry[];
}

const SHEETDB_API_URL = "https://sheetdb.io/api/v1/1n8lm57mnpuk6";

const FALLBACK_DATA: SheetDBEntry[] = [
  {
    Year: "2026",
    "Section / Category": "AI & Edge Computing",
    "Client / Project": "AI Video Analytics & Smart Solutions",
    "Description / Details": "Pioneering intelligent video analytics, AI edge gateways, object detection, and cloud-driven operational insights across enterprise infrastructure.",
    "Location / Notes": "Global Deployment",
    Sector: "Smart Infrastructure",
    Images: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
  },
  {
    Year: "2025",
    "Section / Category": "Education & Examination",
    "Client / Project": "Examination Surveillance (NEET / NTA)",
    "Description / Details": "Secured national entrance examinations with 65,000+ cameras for NEET, 8,500+ for Telangana State Board, and 4,500+ for MHCET in Maharashtra.",
    "Location / Notes": "Pan-India Examination Centers",
    Sector: "Education",
    Images: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
  },
  {
    Year: "2024",
    "Section / Category": "Democracy & Elections",
    "Client / Project": "Nationwide Election Webcasting",
    "Description / Details": "Deployed over 100,000 live streaming cameras across India for real-time election monitoring during General Elections.",
    "Location / Notes": "10+ States in India",
    Sector: "Elections",
    Images: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&auto=format&fit=crop&q=80",
  },
  {
    Year: "2023",
    "Section / Category": "Defense & Borders",
    "Client / Project": "Border Security Force (BSF) Deployment",
    "Description / Details": "Installed 674 high-grade surveillance cameras across sensitive international border checkpoints for enhanced perimeter vigilance.",
    "Location / Notes": "International Borders",
    Sector: "Border Security",
    Images: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80",
  },
  {
    Year: "2022",
    "Section / Category": "Manufacturing",
    "Client / Project": "In-House Manufacturing (Make in India)",
    "Description / Details": "Scaled in-house manufacturing aligned with Make in India—enabling faster service turnaround, spare availability, and quality-controlled assembly lines.",
    "Location / Notes": "Telangana Plant",
    Sector: "Industrial",
    Images: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80",
  },
  {
    Year: "2020",
    "Section / Category": "BFSI Security",
    "Client / Project": "Banking & ATM Security Infrastructure",
    "Description / Details": "Hardened ATM and bank branch security with AI video analytics, biometric access control, and centralized SOC integrations.",
    "Location / Notes": "Pan-India Financial Institutions",
    Sector: "Healthcare",
    Images: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=600&auto=format&fit=crop&q=80",
  },
  {
    Year: "2018",
    "Section / Category": "Wildlife & Conservation",
    "Client / Project": "Kaziranga National Park Surveillance",
    "Description / Details": "Deployed thermal optical imaging and ANPR systems to support wildlife conservation, anti-poaching perimeter protection, and rapid incident response.",
    "Location / Notes": "Assam, India",
    Sector: "Border Security",
    Images: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=600&auto=format&fit=crop&q=80",
  },
  {
    Year: "2016",
    "Section / Category": "Pan-India Expansion",
    "Client / Project": "Nationwide Surveillance Projects",
    "Description / Details": "Pan-India rollouts with compliance, multi-site audits, and a 24x7 Network Operations Center (NOC) for real-time monitoring at scale.",
    "Location / Notes": "National Coverage",
    Sector: "Enterprise",
    Images: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
  },
  {
    Year: "2014",
    "Section / Category": "Wireless & Network",
    "Client / Project": "Radio Technology Surveillance",
    "Description / Details": "Executed smart surveillance powered by licensed/unlicensed radio backhaul and power-efficient remote field nodes.",
    "Location / Notes": "Pan-State Operations",
    Sector: "Telecommunications",
    Images: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80",
  },
  {
    Year: "2012",
    "Section / Category": "Smart Cities",
    "Client / Project": "Visakhapatnam City Surveillance",
    "Description / Details": "Kick-off with Visakhapatnam Smart City—reliable CCTV coverage, central monitoring control rooms, and automated incident alerting.",
    "Location / Notes": "Visakhapatnam, AP",
    Sector: "Smart Infrastructure",
    Images: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80",
  },
  {
    Year: "2008-2012",
    "Section / Category": "Core Solutions",
    "Client / Project": "CCTV Surveillance Systems",
    "Description / Details": "Pioneered early CCTV deployments across regional infrastructure, establishing core competency in electronic safety and security systems.",
    "Location / Notes": "Visakhapatnam & Hyderabad",
    Sector: "Surveillance",
    Images: "",
  },
  {
    Year: "2006",
    "Section / Category": "Inception",
    "Client / Project": "Web Development & Marketing Services",
    "Description / Details": "Our Journey began with a strong foundation in web development and marketing services, paving the way for our expansion into the broader technology landscape.",
    "Location / Notes": "Hyderabad, Telangana",
    Sector: "Technology",
    Images: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
  },
];

const SECTOR_METADATA: Record<
  string,
  { color: string; bg: string; border: string; icon: React.ElementType }
> = {
  Surveillance: { color: "#07518a", bg: "bg-sky-50 text-[#07518a]", border: "border-sky-200", icon: Video },
  "Smart Infrastructure": { color: "#0891b2", bg: "bg-cyan-50 text-cyan-700", border: "border-cyan-200", icon: Globe },
  "Border Security": { color: "#dc2626", bg: "bg-red-50 text-red-700", border: "border-red-200", icon: Shield },
  Elections: { color: "#ea580c", bg: "bg-orange-50 text-orange-700", border: "border-orange-200", icon: Award },
  Education: { color: "#9333ea", bg: "bg-purple-50 text-purple-700", border: "border-purple-200", icon: Landmark },
  Industrial: { color: "#d97706", bg: "bg-amber-50 text-amber-700", border: "border-amber-200", icon: Factory },
  Technology: { color: "#2563eb", bg: "bg-blue-50 text-blue-700", border: "border-blue-200", icon: Cpu },
  Telecommunications: { color: "#059669", bg: "bg-emerald-50 text-emerald-700", border: "border-emerald-200", icon: Radio },
  Transportation: { color: "#0284c7", bg: "bg-sky-50 text-sky-700", border: "border-sky-200", icon: Building2 },
};

function getSectorMeta(sector?: string) {
  if (!sector || !SECTOR_METADATA[sector]) {
    return { color: "#07518a", bg: "bg-slate-100 text-[#07518a]", border: "border-slate-200", icon: Layers };
  }
  return SECTOR_METADATA[sector];
}

export default function JourneyTimeline() {
  const [rawData, setRawData] = useState<SheetDBEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"circular" | "timeline">("circular");

  const loadSheetData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(SHEETDB_API_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("API network response error");
      const json: SheetDBEntry[] = await res.json();
      const validEntries = json.filter(
        (item) => item.Year || item["Client / Project"] || item["Description / Details"]
      );
      if (validEntries.length > 0) {
        setRawData(validEntries);
      } else {
        setRawData(FALLBACK_DATA);
      }
    } catch (err) {
      console.warn("SheetDB fetch failed, using fallback timeline dataset:", err);
      setRawData(FALLBACK_DATA);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSheetData();
  }, []);

  const sortedRawData = useMemo(() => {
    if (!rawData.length) return FALLBACK_DATA;
    const copy = [...rawData];
    const firstYear = parseInt(copy[0]?.Year || "0", 10);
    const lastYear = parseInt(copy[copy.length - 1]?.Year || "0", 10);
    if (!isNaN(firstYear) && !isNaN(lastYear) && firstYear < lastYear) {
      return copy.reverse();
    }
    return copy;
  }, [rawData]);

  const yearGroups: YearGroup[] = useMemo(() => {
    if (!sortedRawData.length) return [];
    const map: Record<string, SheetDBEntry[]> = {};
    const yearOrder: string[] = [];

    sortedRawData.forEach((item) => {
      const y = (item.Year || "2026").trim();
      if (!map[y]) {
        map[y] = [];
        yearOrder.push(y);
      }
      map[y].push(item);
    });

    return yearOrder.map((y) => ({
      year: y,
      projects: map[y],
    }));
  }, [sortedRawData]);

  useEffect(() => {
    setActiveYearIndex(0);
  }, [yearGroups]);

  const currentYearGroup = yearGroups[activeYearIndex] || yearGroups[0] || { year: "2026", projects: [] };

  const getValidImage = (entry?: SheetDBEntry): string | null => {
    if (!entry) return null;
    const raw = entry.Images || entry.images;
    if (raw && typeof raw === "string" && raw.trim() !== "" && raw.trim() !== "-") {
      return raw.trim();
    }
    return null;
  };

  const yearCount = yearGroups.length || 1;
  const rotationDeg = -(activeYearIndex * 360) / yearCount;

  return (
    <div className="w-full bg-white text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans min-h-[80vh] flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Journey <span className="text-[#07518a]">In Innovation</span>
          </h2>
          <p className="mt-1 text-slate-600 text-xs sm:text-sm">
            Explore Brihaspathi&apos;s two decades of technology milestones (Latest 2026 to 2006).
          </p>

          <div className="mt-5 inline-flex items-center p-1.5 bg-slate-100 border border-slate-200 rounded-full shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode("circular")}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all duration-300 flex items-center gap-2 ${
                viewMode === "circular"
                  ? "bg-[#07518a] text-white shadow-md scale-105"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <PieChart size={15} />
              <span>Circular Radar View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all duration-300 flex items-center gap-2 ${
                viewMode === "timeline"
                  ? "bg-[#07518a] text-white shadow-md scale-105"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ListOrdered size={15} />
              <span>Timeline Stream View</span>
            </button>
          </div>

          {error && (
            <div className="mt-3 inline-flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <span>Loaded cached records</span>
              <button onClick={loadSheetData} className="underline font-semibold flex items-center gap-1">
                <RefreshCw size={11} /> Retry API
              </button>
            </div>
          )}
        </div>

        {loading && (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-[#07518a] rounded-full animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#07518a]">
              Loading Timeline...
            </p>
          </div>
        )}

        {!loading && yearGroups.length > 0 && (
          <AnimatePresence mode="wait">
            {viewMode === "circular" ? (
              <motion.div
                key="circular"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[75vh] w-full"
              >
                <div className="lg:col-span-5 flex flex-col items-center justify-center py-4">
                  <div className="relative w-[300px] sm:w-[360px] aspect-square rounded-full bg-[#07518a] flex items-center justify-center shadow-2xl shadow-[#07518a]/30 border-4 border-[#07518a]/20">
                    <div className="absolute inset-5 rounded-full border border-dashed border-white/30" />
                    
                    <div
                      className="absolute inset-0 rounded-full transition-transform duration-700 ease-out pointer-events-none"
                      style={{ transform: `rotate(${rotationDeg}deg)` }}
                    >
                      {yearGroups.map((yg, idx) => {
                        const angle = (idx * 360) / yearCount;
                        const isSelected = idx === activeYearIndex;

                        return (
                          <div
                            key={idx}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ transform: `rotate(${angle}deg)` }}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveYearIndex(idx);
                              }}
                              style={{
                                transform: `translateY(-${135}px) rotate(${-angle - rotationDeg}deg)`,
                              }}
                              className={`w-11 h-11 rounded-full flex flex-col items-center justify-center text-xs font-extrabold cursor-pointer pointer-events-auto transition-all duration-300 ${
                                isSelected
                                  ? "bg-white text-[#07518a] scale-125 shadow-lg shadow-black/40 border-2 border-cyan-400 font-black z-30"
                                  : "bg-white/95 text-[#07518a] hover:bg-white border border-white/50 hover:scale-110 shadow-sm"
                              }`}
                            >
                              <span>{yg.year.split("-")[0]}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="relative z-20 text-center p-3 bg-white border-4 border-[#07518a]/20 rounded-full w-36 h-36 flex flex-col items-center justify-center shadow-lg text-slate-900">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#07518a]">
                        Selected Era
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-[#07518a] my-0.5">
                        {currentYearGroup.year}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-600">
                        {currentYearGroup.projects.length} Deployment{currentYearGroup.projects.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setActiveYearIndex((prev) => (prev > 0 ? prev - 1 : yearGroups.length - 1))}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition flex items-center gap-1.5 shadow-sm"
                    >
                      <ChevronLeft size={16} /> Prev Year
                    </button>
                    <span className="text-xs font-mono font-black text-slate-500">
                      {activeYearIndex + 1} / {yearGroups.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveYearIndex((prev) => (prev < yearGroups.length - 1 ? prev + 1 : 0))}
                      className="px-4 py-2 rounded-xl bg-[#07518a] hover:bg-[#064273] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    >
                      Next Year <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col h-full">
                  <div className="flex items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1 rounded-xl text-sm font-black bg-[#07518a] text-white">
                        {currentYearGroup.year}
                      </span>
                      <h3 className="text-lg font-black text-slate-900">
                        Milestone Deployments
                      </h3>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {currentYearGroup.projects.length} Project{currentYearGroup.projects.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex-1 max-h-[75vh] overflow-y-auto space-y-4 pr-1.5 scrollbar-thin scrollbar-thumb-slate-300">
                    {currentYearGroup.projects.map((proj, pIdx) => {
                      const validImg = getValidImage(proj);
                      const meta = getSectorMeta(proj.Sector);

                      return (
                        <div
                          key={pIdx}
                          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            {proj.Sector && (
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${meta.bg} ${meta.border}`}>
                                {proj.Sector}
                              </span>
                            )}
                            {proj["Location / Notes"] && proj["Location / Notes"] !== "-" && (
                              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                                <MapPin size={12} className="text-[#07518a]" />
                                <span>{proj["Location / Notes"]}</span>
                              </div>
                            )}
                          </div>

                          <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#07518a] transition-colors leading-snug">
                            {proj["Client / Project"]}
                          </h4>

                          <div className="flex flex-col sm:flex-row gap-4 items-start">
                            {validImg && (
                              <div className="w-full sm:w-28 sm:h-24 h-40 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 shadow-sm bg-slate-50">
                                <img
                                  src={validImg}
                                  alt={proj["Client / Project"]}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
                              {proj["Description / Details"]}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full relative py-8"
              >
                <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#07518a] -translate-x-1/2 hidden md:block" />
                <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-[#07518a] md:hidden" />

                <div className="space-y-12 relative">
                  {sortedRawData.map((entry, idx) => {
                    const isLeft = idx % 2 === 0;
                    const validImg = getValidImage(entry);
                    const meta = getSectorMeta(entry.Sector);
                    const SectorIcon = meta.icon;

                    return (
                      <div
                        key={idx}
                        className={`relative flex flex-col md:flex-row items-center w-full ${
                          isLeft ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <div className="hidden md:block w-1/2" />

                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#07518a] text-white border-2 border-white shadow-md flex items-center justify-center">
                            <SectorIcon size={18} />
                          </div>
                        </div>

                        <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8">
                          <motion.div
                            initial={{ opacity: 0, x: isLeft ? -25 : 25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className={`bg-slate-50 border border-slate-200 p-6 relative shadow-sm hover:shadow-md transition-all duration-300 ${
                              isLeft
                                ? "md:rounded-l-[40px] md:rounded-r-none rounded-2xl"
                                : "md:rounded-r-[40px] md:rounded-l-none rounded-2xl"
                            }`}
                          >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07518a] text-white text-xs font-black mb-3">
                              <span>{entry.Year}</span>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              {entry.Sector && (
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${meta.bg} ${meta.border}`}>
                                  {entry.Sector}
                                </span>
                              )}
                              {entry["Location / Notes"] && entry["Location / Notes"] !== "-" && (
                                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                                  <MapPin size={12} className="text-[#07518a]" />
                                  <span>{entry["Location / Notes"]}</span>
                                </div>
                              )}
                            </div>

                            <h3 className="text-lg font-black text-[#07518a] mb-3 leading-snug">
                              {entry["Client / Project"]}
                            </h3>

                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                              {validImg && (
                                <div className="w-full sm:w-32 sm:h-28 h-40 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 shadow-sm bg-white">
                                  <img
                                    src={validImg}
                                    alt={entry["Client / Project"]}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
                                {entry["Description / Details"]}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
