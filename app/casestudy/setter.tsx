"use client";
import { StaticImageData } from "next/image";
import React, { useState, useMemo, useRef, type ComponentType } from "react";
import {
  Search,
  X,
  ChevronRight,
  Menu,
  GraduationCap,
  Stethoscope,
  Banknote,
  Factory,
  Landmark,
  Church,
  Home,
  ShoppingCart,
  Wrench,
  FlaskConical,
  Laptop,
  Grid3x3,
} from "lucide-react";

const BRAND_COLOR = "#07518a";

// FIXED: renamed banner variable to avoid conflict
const DEFAULT_BANNER =
  "./10292.jpg";

const sectorIcons: Record<string, ComponentType<{ className?: string; size?: number }>> = {
  education: GraduationCap,
  examinations: Grid3x3,
  healthcare: Stethoscope,
  banking: Banknote,
  industrial: Factory,
  government: Landmark,
  religious: Church,
  realestate: Home,
  retail: ShoppingCart,
  manufacturing: Wrench,
  research: FlaskConical,
  it: Laptop,
  miscellaneous: Grid3x3,
};

interface CaseStudy {
  id: number;
  name: string;
  role: string;
  city: string;
  company: string;
  avatar: string | StaticImageData;
  rating: number;
  quote: string;
  sector: string;
  sectorSlug: string;
  slug: string;
}

interface CaseStudiesPageProps {
  allCaseStudies: CaseStudy[];
  sectors: { name: string; slug: string }[];
  caseBannerImage?: string | StaticImageData;
}

export default function CaseStudiesPage({
  allCaseStudies,
  sectors,
  caseBannerImage,
}: CaseStudiesPageProps) {
  const banner =
    typeof caseBannerImage === "string"
      ? caseBannerImage
      : caseBannerImage?.src || DEFAULT_BANNER;

  const [selectedSector, setSelectedSector] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredCaseStudies = useMemo(() => {
    let filtered = allCaseStudies;

    if (selectedSector !== "all") {
      filtered = filtered.filter((cs) => cs.sectorSlug === selectedSector);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (cs) =>
          cs.name.toLowerCase().includes(q) ||
          cs.city.toLowerCase().includes(q) ||
          cs.company.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [allCaseStudies, selectedSector, searchQuery]);

  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allCaseStudies.forEach((cs) => {
      counts[cs.sectorSlug] = (counts[cs.sectorSlug] || 0) + 1;
    });
    return counts;
  }, [allCaseStudies]);

  const handleSectorChange = (slug: string) => {
    setSelectedSector(slug);
    setIsMobileSidebarOpen(false);
    scrollContainerRef.current?.scrollTo(0, 0);
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#07518a] focus:border-[#07518a]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-gray-200 rounded-full p-1"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-2">
          <button
            onClick={() => handleSectorChange("all")}
            className={`w-full px-4 py-4 flex items-center justify-between rounded-xl ${
              selectedSector === "all"
                ? "bg-gradient-to-r from-[#07518a] to-[#064a7d] text-white shadow-lg"
                : "bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                  selectedSector === "all"
                    ? "bg-white/20"
                    : "bg-[#07518a]/10"
                }`}
              >
                <Grid3x3
                  className={`w-5 h-5 ${
                    selectedSector === "all" ? "text-white" : "text-[#07518a]"
                  }`}
                />
              </div>
              <span className="font-semibold text-sm">All Case Studies</span>
            </div>
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                selectedSector === "all"
                  ? "bg-white/20 text-white"
                  : "bg-[#07518a]/10 text-[#07518a]"
              }`}
            >
              {allCaseStudies.length}
            </span>
          </button>

          <div className="space-y-1 pt-2">
            {sectors.map((sector) => {
              const Icon = sectorIcons[sector.slug] || Grid3x3;
              const count = sectorCounts[sector.slug] || 0;
              const isActive = selectedSector === sector.slug;

              return (
                <button
                  key={sector.slug}
                  onClick={() => handleSectorChange(sector.slug)}
                  className={`w-full px-4 py-3.5 flex items-center justify-between rounded-xl ${
                    isActive
                      ? "bg-gradient-to-r from-[#07518a] to-[#064a7d] text-white shadow-lg"
                      : "bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isActive ? "bg-white/20" : "bg-[#07518a]/10"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-white" : "text-[#07518a]"
                        }`}
                      />
                    </div>
                    <span className="font-medium text-sm">{sector.name}</span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#07518a]/10 text-[#07518a]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="h-screen relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${banner})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/20 " />

     
      </div>

      {/* Main Content Section */}
      <div className="h-screen flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 flex-shrink-0 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-xl">
          <div className="h-full p-6">
            <SidebarContent />
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {isMobileSidebarOpen && (
          <>
            <div
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <div className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-[#07518a] to-[#064a7d] text-white">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="h-[calc(100%-73px)] p-4">
                <SidebarContent />
              </div>
            </div>
          </>
        )}

        {/* Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Header */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-r from-[#07518a] to-[#064a7d] shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-1">
                  {selectedSector === "all"
                    ? "All Case Studies"
                    : sectors.find((s) => s.slug === selectedSector)?.name || "Case Studies"}
                </h2>
                <p className="text-white/90 text-sm">
                  {filteredCaseStudies.length}{" "}
                  {filteredCaseStudies.length === 1 ? "result" : "results"} found
                </p>
              </div>

              <div className="flex items-center gap-3">
                {selectedSector !== "all" && (
                  <button
                    onClick={() => handleSectorChange("all")}
                    className="text-sm text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium flex items-center gap-2 backdrop-blur-sm transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                )}
                <button
                  onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                  className="lg:hidden p-2.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Menu className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 lg:px-8 py-8"
          >
            <div className="max-w-7xl mx-auto">
              {filteredCaseStudies.length === 0 ? (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6 shadow-inner">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No case studies found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCaseStudies.map((caseStudy) => (
                    <a
                      key={caseStudy.id}
                      href={`/casestudy/${caseStudy.sectorSlug}/${caseStudy.slug}`}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#07518a]/30 hover:-translate-y-1 flex flex-col"
                    >
                      {/* Image */}
                      <div className="relative h-48 bg-white overflow-hidden flex items-center justify-center p-6 border-b-4 border-gray-100">
                        <img
                          src={
                            typeof caseStudy.avatar === "string"
                              ? caseStudy.avatar
                              : caseStudy.avatar.src
                          }
                          alt={caseStudy.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              const fallback = document.createElement("div");
                              fallback.className =
                                "w-full h-full flex items-center justify-center text-[#07518a] text-5xl font-bold";
                              fallback.textContent = caseStudy.name.charAt(0);
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-gradient-to-br from-[#07518a] to-[#064a7d] p-6 flex flex-col">
                        <div className="mb-3">
                          <span className="inline-block text-xs font-bold text-white/80 bg-white/20 px-3 py-1 rounded-full">
                            {caseStudy.sector}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 min-h-[3.5rem] leading-tight">
                          {caseStudy.name}
                        </h3>

                        {caseStudy.city && (
                          <p className="text-sm text-white/80 mb-4 flex items-center gap-2">
                            <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                            {caseStudy.city}
                          </p>
                        )}

                        <div className="mt-auto flex items-center gap-2 text-white font-semibold text-sm pt-4 border-t border-white/20">
                          <span>View Details</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #07518a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #064a7d;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}