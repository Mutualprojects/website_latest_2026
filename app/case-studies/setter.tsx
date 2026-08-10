"use client";
import { StaticImageData } from "next/image";
import { useState, useMemo, useRef, useEffect, useCallback, type ComponentType } from "react";
import {
  Search,
  X,
  ArrowUpRight,
  MapPin,
  SlidersHorizontal,
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
  Zap,
  ShieldCheck,
} from "lucide-react";

// FIXED: renamed banner variable to avoid conflict
const DEFAULT_BANNER = "./10292.jpg";
const API_BASE = "/strapi";
const PAGE_SIZE = 25;
const getApiUrl = (page = 1) =>
  `${API_BASE}/api/case-studies?populate[detail]=true&populate[image]=true&populate[sector]=true&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`;

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
  municipality: Landmark,
  construction: Wrench,
  miscellaneous: Grid3x3,
  power: Zap,
  energy: FlaskConical,
  security: ShieldCheck,
};

interface CaseStudy {
  id: number;
  name: string;
  role: string | null;
  city: string;
  company: string;
  avatar: string | StaticImageData;
  rating: number;
  quote: string | null;
  sector: string;
  sectorSlug: string;
  slug: string;
}

interface CaseStudiesPageProps {
  allCaseStudies?: CaseStudy[];
  sectors?: { name: string; slug: string }[];
  caseBannerImage?: string | StaticImageData;
}

function resolveImageUrl(image: any) {
  if (!image) return "";
  const url = image.url ?? image.attributes?.url;
  if (!url) return "";
  if (typeof url !== "string") return "";
  if (url.startsWith("http")) {
    if (url.startsWith("http://183.82.117.36:2334")) {
      return url.replace("http://183.82.117.36:2334", "/strapi");
    }
    if (url.startsWith("http://172.30.0.200:1334")) {
      return url.replace("http://172.30.0.200:1334", "/strapi");
    }
    return url;
  }
  if (url.startsWith("/")) {
    return `/strapi${url}`;
  }
  return url;
}

function normalizeSlug(raw: any) {
  const slug = typeof raw === "string" ? raw : String(raw ?? "");
  return slug.trim().toLowerCase() || "miscellaneous";
}

function useDebouncedValue(value: string, delay: number = 300): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function normalizeCaseStudy(item: any): CaseStudy {
  const record = item.attributes ?? item;
  const sectorData = record.sector?.data ?? record.sector;
  const imageData = record.image?.data ?? record.image;
  const firstImage = Array.isArray(imageData) ? imageData[0] : imageData;

  const rawSlug = sectorData?.attributes?.slug ?? sectorData?.slug ?? "miscellaneous";
  const sectorSlug = normalizeSlug(rawSlug);
  const sectorName = sectorData?.attributes?.title ?? sectorData?.title ?? "Miscellaneous";

  return {
    id: item.id ?? record.id,
    name: record.name ?? "",
    company: record.company ?? "",
    role: record.role ?? null,
    city: record.city ?? "",
    avatar: resolveImageUrl(firstImage),
    rating: Number(record.rating ?? 0),
    quote: record.quote ?? null,
    sector: sectorName,
    sectorSlug,
    slug: record.slug ?? "",
  };
}

export default function CaseStudiesPage({
  allCaseStudies: initialCaseStudies = [],
  sectors: initialSectors = [],
  caseBannerImage,
}: CaseStudiesPageProps) {
  const banner =
    typeof caseBannerImage === "string"
      ? caseBannerImage
      : caseBannerImage?.src || DEFAULT_BANNER;

  const [allCaseStudies, setAllCaseStudies] = useState<CaseStudy[]>(initialCaseStudies);
  const [sectors, setSectors] = useState<{ name: string; slug: string }[]>(initialSectors);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebouncedValue(searchQuery);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredCaseStudies = useMemo(() => {
    let filtered = allCaseStudies;

    if (selectedSector !== "all") {
      filtered = filtered.filter((cs) => cs.sectorSlug === selectedSector);
    }

    if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
      const q = debouncedSearchQuery.trim().toLowerCase();
      filtered = filtered.filter((cs) => {
        const searchableFields = [
          String(cs.name ?? ""),
          String(cs.company ?? ""),
          String(cs.sector ?? ""),
          String(cs.city ?? ""),
          String(cs.role ?? ""),
          String(cs.quote ?? ""),
        ];
        return searchableFields.some((field) => {
          const normalized = field.toLowerCase().trim();
          return normalized.includes(q);
        });
      });
    }

    return filtered;
  }, [allCaseStudies, selectedSector, debouncedSearchQuery]);

  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allCaseStudies.forEach((cs) => {
      counts[cs.sectorSlug] = (counts[cs.sectorSlug] || 0) + 1;
    });
    return counts;
  }, [allCaseStudies]);

  useEffect(() => {
    const fetchAllCaseStudies = async () => {
      try {
        setLoading(true);
        setError(null);

        const firstResponse = await fetch(getApiUrl(1));
        if (!firstResponse.ok) {
          throw new Error(`API request failed with status ${firstResponse.status}`);
        }

        const firstData = await firstResponse.json();
        const firstItems = Array.isArray(firstData?.data) ? (firstData.data as any[]) : [];
        const pagination = firstData?.meta?.pagination;
        const pageCount = Number(pagination?.pageCount ?? 1);

        let allItems = [...firstItems];

        if (pageCount > 1) {
          const pagePromises = [] as Promise<Response>[];
          for (let page = 2; page <= pageCount; page += 1) {
            pagePromises.push(fetch(getApiUrl(page)));
          }

          const pageResponses = await Promise.all(pagePromises);
          for (const response of pageResponses) {
            if (!response.ok) {
              throw new Error(`API request failed with status ${response.status}`);
            }
            const pageData = await response.json();
            if (Array.isArray(pageData?.data)) {
              allItems = allItems.concat(pageData.data);
            }
          }
        }

        const normalized = allItems.map(normalizeCaseStudy);
        setAllCaseStudies(normalized);

        const sectorMap = new Map<string, string>();
        normalized.forEach((item) => {
          sectorMap.set(item.sectorSlug, item.sector);
        });
        setSectors(
          Array.from(sectorMap.entries())
            .sort((a, b) => a[1].localeCompare(b[1]))
            .map(([slug, name]) => ({
              name,
              slug,
            }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load case studies");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCaseStudies();
  }, []);

  const handleSectorChange = (slug: string) => {
    setSelectedSector(normalizeSlug(slug));
    setIsMobileSidebarOpen(false);
    scrollContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeSectorName =
    selectedSector === "all"
      ? "All Case Studies"
      : sectors.find((s) => s.slug === selectedSector)?.name || "Case Studies";

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Search */}
      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ink)]/35" />
        <input
          type="text"
          placeholder="Search by title, company, or sector..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-[var(--line)] bg-white py-3 pl-10 pr-9 text-sm text-[var(--ink)] placeholder:text-[var(--ink)]/40 shadow-sm transition-colors focus:border-[var(--brand)] focus:outline-none focus:ring-4 focus:ring-[var(--brand)]/10"
          autoComplete="off"
          spellCheck="false"
          aria-label="Search case studies"
        />
        {searchQuery && (
          <button
            aria-label="Clear search"
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--ink)]/40 transition-colors hover:bg-[var(--ink)]/5 hover:text-[var(--ink)]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink)]/40">
        Browse by sector
      </p>

      <div className="cs-scroll -mr-1 flex-1 space-y-1 overflow-y-auto pr-1">
        <button
          onClick={() => handleSectorChange("all")}
          className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-all ${
            selectedSector === "all"
              ? "bg-[var(--brand)] text-white shadow-[0_8px_24px_-10px_rgba(7,81,138,0.7)]"
              : "text-[var(--ink)]/75 hover:bg-white hover:text-[var(--ink)]"
          }`}
        >
          <span className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                selectedSector === "all" ? "bg-white/15" : "bg-[var(--ink)]/[0.04] group-hover:bg-[var(--brand)]/10"
              }`}
            >
              <Grid3x3 className={`h-[18px] w-[18px] ${selectedSector === "all" ? "text-white" : "text-[var(--brand)]"}`} />
            </span>
            <span className="text-sm font-semibold">All Case Studies</span>
          </span>
          <span
            className={`tabular-nums rounded-md px-2 py-0.5 text-xs font-bold ${
              selectedSector === "all" ? "bg-white/20 text-white" : "bg-[var(--ink)]/[0.05] text-[var(--ink)]/55"
            }`}
          >
            {allCaseStudies.length}
          </span>
        </button>

        {sectors.map((sector) => {
          const sectorKey = normalizeSlug(sector.slug);
          const Icon = sectorIcons[sectorKey] || Grid3x3;
          const count = sectorCounts[sectorKey] || 0;
          const isActive = selectedSector === sectorKey;
          return (
            <button
              key={sectorKey}
              onClick={() => handleSectorChange(sectorKey)}
              aria-label={`Filter by ${sector.name}`}
              aria-pressed={isActive}
              className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all ${
                isActive
                  ? "bg-[var(--brand)] text-white shadow-[0_8px_24px_-10px_rgba(7,81,138,0.7)]"
                  : "text-[var(--ink)]/75 hover:bg-white hover:text-[var(--ink)]"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    isActive ? "bg-white/15" : "bg-[var(--ink)]/[0.04] group-hover:bg-[var(--brand)]/10"
                  }`}
                >
                  <Icon className={`h-[18px] w-[18px] ${isActive ? "text-white" : "text-[var(--brand)]"}`} />
                </span>
                <span className="text-sm font-medium">{sector.name}</span>
              </span>
              <span
                className={`tabular-nums rounded-md px-2 py-0.5 text-xs font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-[var(--ink)]/[0.05] text-[var(--ink)]/55"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="cs-root min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* ============ HERO ============ */}
      <section className="relative isolate flex h-[50vh] items-center overflow-hidden bg-[var(--ink)]">
        {/* faint banner photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${banner})` }}
        />
        {/* brand glow + depth */}
        <div className="absolute -left-[10%] top-[-30%] h-[70vh] w-[70vh] rounded-full bg-[var(--brand)] opacity-40 blur-[120px]" />
        <div className="absolute -right-[6%] bottom-[-30%] h-[55vh] w-[55vh] rounded-full bg-[#0a6fb8] opacity-25 blur-[120px]" />

        {/* light grey overlay (covers banner and glow) */}
        <div className="absolute inset-0 bg-gray-100/60" />

        {/* grain */}
        <div className="cs-grain absolute inset-0 opacity-[0.5]" />
        {/* hairline grid */}
        <div className="cs-gridlines absolute inset-0 opacity-[0.06]" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
          <div className="cs-rise max-w-3xl">
       

            {/* <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-[var(--brand)]/90 sm:text-lg">
              {allCaseStudies.length || 0} case studies across {sectors.length || 0} industries, all backed by live deployments and real results.
            </p> */}

            {/* stats */}
            <div className="mt-10 flex flex-wrap items-stretch gap-x-10 gap-y-6">
              <div>
                <p className="cs-display tabular-nums text-4xl font-semibold leading-none text-white sm:text-5xl">
                  {allCaseStudies.length || "\u2014"}
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
                  Case Studies
                </p>
              </div>
              <div className="w-px self-stretch bg-white/15" />
              <div>
                <p className="cs-display tabular-nums text-4xl font-semibold leading-none text-white sm:text-5xl">
                  {sectors.length || "\u2014"}
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
                  Industries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STICKY CONTEXT BAR + LAYOUT ============ */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div
          ref={scrollContainerRef}
          className="sticky top-0 z-30 -mx-4 flex items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--paper)]/85 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
        >
          <div className="min-w-0">
            <h2 className="cs-display truncate text-xl font-semibold tracking-[-0.01em] text-[var(--ink)] sm:text-2xl">
              {activeSectorName}
            </h2>
            <p className="text-xs text-[var(--ink)]/50 sm:text-sm">
              <span className="tabular-nums font-semibold text-[var(--ink)]/70">
                {filteredCaseStudies.length}
              </span>{" "}
              {filteredCaseStudies.length === 1 ? "result" : "results"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {(selectedSector !== "all" || debouncedSearchQuery) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleSectorChange("all");
                }}
                aria-label="Clear all filters"
                className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-xs font-semibold text-[var(--ink)]/70 transition-colors hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
              >
                <X className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-[var(--brand)] px-3.5 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_-12px_rgba(7,81,138,0.8)] transition-transform hover:-translate-y-0.5 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="gap-8 py-8 lg:grid lg:grid-cols-[290px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="cs-scroll sticky top-24 max-h-[calc(100vh-7.5rem)] overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--paper-2)] p-4">
              {SidebarContent()}
            </div>
          </aside>

          {/* Main */}
          <main className="min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="cs-skeleton overflow-hidden rounded-2xl border border-[var(--line)] bg-white"
                  >
                    <div className="h-44 bg-[var(--ink)]/[0.04]" />
                    <div className="space-y-3 p-5">
                      <div className="h-3 w-20 rounded bg-[var(--ink)]/[0.06]" />
                      <div className="h-5 w-3/4 rounded bg-[var(--ink)]/[0.08]" />
                      <div className="h-3 w-1/3 rounded bg-[var(--ink)]/[0.06]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--line)] bg-white py-24 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                  <X className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="cs-display text-2xl font-semibold text-[var(--ink)]">
                  Couldn&rsquo;t load case studies
                </h3>
                <p className="mt-2 max-w-sm text-sm text-[var(--ink)]/55">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 rounded-xl bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Retry
                </button>
              </div>
            ) : filteredCaseStudies.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--line)] bg-white py-24 text-center animate-in fade-in duration-200">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ink)]/[0.04]">
                  <Search className="h-8 w-8 text-[var(--ink)]/30" />
                </div>
                <h3 className="cs-display text-2xl font-semibold text-[var(--ink)]">
                  {debouncedSearchQuery ? "No results found" : "Start searching or browse sectors"}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-[var(--ink)]/55">
                  {debouncedSearchQuery
                    ? `No case studies match "${debouncedSearchQuery.trim()}". Try different keywords, company names, or sectors.`
                    : "Type in the search box above or select a sector to get started."}
                </p>
                {(selectedSector !== "all" || debouncedSearchQuery) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      handleSectorChange("all");
                    }}
                    className="mt-6 rounded-lg bg-[var(--brand)] px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCaseStudies.map((caseStudy, index) => (
                  <a
                    key={caseStudy.id}
                    href={`/case-studies/${caseStudy.sectorSlug}/${caseStudy.slug}`}
                    style={{ animationDelay: `${Math.min(index * 45, 450)}ms` }}
                    className="cs-card group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand)]/30 hover:shadow-[0_24px_50px_-24px_rgba(7,81,138,0.45)]"
                  >
                    {/* logo / image */}
                    <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[var(--paper-2)] p-7">
                      <img
                        src={
                          typeof caseStudy.avatar === "string"
                            ? caseStudy.avatar
                            : caseStudy.avatar.src
                        }
                        alt={caseStudy.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.06]"
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
                      <span className="absolute left-4 top-4 rounded-full border border-[var(--line)] bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand)] backdrop-blur-sm">
                        {caseStudy.sector}
                      </span>
                    </div>

                    {/* content */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="cs-display break-words text-sm sm:text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] text-[var(--ink)] transition-colors group-hover:text-[var(--brand)]">
                        {caseStudy.name}
                      </h3>

                      {caseStudy.city && (
                        <p className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-[var(--ink)]/70">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          {caseStudy.city}
                        </p>
                      )}

                      <div className="mt-auto flex items-center justify-between border-t border-[var(--line)] pt-4">
                        <span className="text-xs font-semibold text-[var(--ink)]/70 transition-colors group-hover:text-[var(--brand)]">
                          View case study
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ink)]/[0.04] text-[var(--ink)]/60 transition-all duration-300 group-hover:bg-[var(--brand)] group-hover:text-white">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>

                    {/* accent bar */}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ============ MOBILE DRAWER ============ */}
      {isMobileSidebarOpen && (
        <>
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-[var(--ink)]/50 backdrop-blur-sm lg:hidden"
          />
          <div className="cs-drawer fixed bottom-0 left-0 top-0 z-50 flex w-[84%] max-w-sm flex-col bg-[var(--paper-2)] shadow-2xl lg:hidden">
            <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
              <h2 className="cs-display text-lg font-semibold text-[var(--ink)]">Filters</h2>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="rounded-lg p-2 text-[var(--ink)]/60 transition-colors hover:bg-[var(--ink)]/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              {SidebarContent()}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap");

        .cs-root {
          --ink: #0c1322;
          --paper: #f5f4ef;
          --paper-2: #faf9f5;
          --brand: #07518a;
          --accent: #c98a3c;
          --line: rgba(12, 19, 34, 0.1);
          font-family: "DM Sans", system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .cs-display,
        .cs-italic {
          font-family: "DM Sans", system-ui, sans-serif;
        }

        .cs-grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
        }
        .cs-gridlines {
          background-image: linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        .cs-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .cs-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .cs-scroll::-webkit-scrollbar-thumb {
          background: rgba(12, 19, 34, 0.18);
          border-radius: 10px;
        }
        .cs-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--brand);
        }

        .cs-card {
          opacity: 0;
          animation: csUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes csUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cs-rise > * {
          opacity: 0;
          animation: csRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cs-rise > *:nth-child(1) { animation-delay: 0.05s; }
        .cs-rise > *:nth-child(2) { animation-delay: 0.15s; }
        .cs-rise > *:nth-child(3) { animation-delay: 0.25s; }
        .cs-rise > *:nth-child(4) { animation-delay: 0.35s; }
        @keyframes csRise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cs-drawer {
          animation: csSlide 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes csSlide {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        .cs-skeleton {
          animation: csPulse 1.4s ease-in-out infinite;
        }
        @keyframes csPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cs-card,
          .cs-rise > *,
          .cs-drawer,
          .cs-skeleton {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap");
      `}</style>
    </div>
  );
}