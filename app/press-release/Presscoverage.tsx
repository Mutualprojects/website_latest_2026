"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import bg_press from "./immerse-yourself-nostalgia-yesteryears-with-generative-portrayal-words-quotwow.jpg";

// ─── Types ────────────────────────────────────────────────────────────
interface PressItem {
  No: string;
  "Publisher Name": string;
  Links: string;
  Heading: string;
  "Image Link": string;
}

interface ArticleGroup {
  heading: string;
  publishers: PressItem[];
}

// ─── Helper: group articles by heading ───────────────────────────────
function groupByHeading(items: PressItem[]): ArticleGroup[] {
  const map = new Map<string, PressItem[]>();
  for (const item of items) {
    if (!item.Heading || !item["Publisher Name"]) continue;
    const key = item.Heading.trim();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }
  return Array.from(map.entries()).map(([heading, publishers]) => ({
    heading,
    publishers,
  }));
}

// ─── Publisher Card ───────────────────────────────────────────────────
function PublisherCard({ item, index }: { item: PressItem; index: number }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={item.Links}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl ${
        hovered ? "border-[#07518a] shadow-[#07518a]/20" : "border-[#e4edf5] shadow-sm"
      }`}
      style={{
        animation: `fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) forwards`,
        animationDelay: `${index * 55}ms`,
        opacity: 0,
      }}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#07518a] to-[#07518a]/70 transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Logo area */}
      <div
        className={`flex h-24 items-center justify-center border-b p-5 transition-colors ${
          hovered ? "bg-[#f0f6fc] border-[#e4edf5]" : "bg-[#f8fafd] border-[#e4edf5]"
        }`}
      >
        {!imgError && item["Image Link"] ? (
          <img
            src={item["Image Link"]}
            alt={item["Publisher Name"]}
            onError={() => setImgError(true)}
            className="max-h-14 w-auto object-contain"
          />
        ) : (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#07518a] to-[#07518a]/80 font-serif text-2xl font-bold text-white">
            {item["Publisher Name"].charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col justify-between gap-2 p-4">
        <span className="font-sans text-sm font-semibold leading-tight text-[#0f2236] line-clamp-2">
          {item["Publisher Name"]}
        </span>
        <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#07518a] transition-all group-hover:gap-2">
          Read Article
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6h8M7 3l3 3-3 3"
              stroke="#07518a"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

// ─── Article Section ──────────────────────────────────────────────────
function ArticleSection({ group, idx }: { group: ArticleGroup; idx: number }) {
  return (
    <section
      className="mt-16 opacity-0"
      style={{
        animation: `fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards`,
        animationDelay: `${idx * 100}ms`,
      }}
    >
      {/* Section header */}
      <div className="mb-6 flex items-start gap-4 border-b border-[#e4edf5] pb-5">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#07518a] font-sans text-xs font-bold text-white shadow-md">
          {String(idx + 1).padStart(2, "0")}
        </div>
        <h2 className="flex-1 font-serif text-lg font-bold text-[#0f2236] sm:text-xl md:text-2xl">
          {group.heading}
        </h2>
        <div className="mt-1 flex-shrink-0 whitespace-nowrap rounded-full border border-[#07518a]/20 bg-[#07518a]/5 px-3.5 py-1 text-xs font-semibold text-[#07518a]">
          {group.publishers.length} {group.publishers.length === 1 ? "Source" : "Sources"}
        </div>
      </div>

      {/* Publishers grid */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {group.publishers.map((item, i) => (
          <PublisherCard key={`${item["Publisher Name"]}-${i}`} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Skeleton Loader ──────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="mt-16">
      {[0, 1].map((s) => (
        <div key={s} className="mt-14">
          <div className="mb-6 flex items-center gap-4 border-b border-[#e4edf5] pb-5">
            <div className="h-9 w-9 animate-pulse rounded-xl bg-[#e4edf5]" />
            <div className="h-5 w-2/5 animate-pulse rounded bg-[#e4edf5]" />
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-2xl bg-[#e4edf5]"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────
export default function PressCoverage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<ArticleGroup[]>([]);
  const [totalPublications, setTotalPublications] = useState(0);
  const [uniqueSources, setUniqueSources] = useState(0);

  // For counter animation
  const [displayCounts, setDisplayCounts] = useState({
    publications: 0,
    articles: 0,
    sources: 0,
  });

  // Fetch and group data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://sheetdb.io/api/v1/h6vfyfkd9ovqg");
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data: PressItem[] = await res.json();

        const grouped = groupByHeading(data);
        setGroups(grouped);

        const pubs = data.filter((d) => d["Publisher Name"]).length;
        setTotalPublications(pubs);

        const unique = new Set(data.map((d) => d["Publisher Name"]).filter(Boolean)).size;
        setUniqueSources(unique);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Animate counters when data is ready
  useEffect(() => {
    if (loading) return;

    const final = {
      publications: totalPublications,
      articles: groups.length,
      sources: uniqueSources,
    };

    const duration = 1000; // ms
    const steps = 30;
    const stepTime = duration / steps;

    const animateCounter = (key: keyof typeof final, start: number, end: number) => {
      let current = start;
      const increment = end / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setDisplayCounts((prev) => ({ ...prev, [key]: Math.floor(current) }));
      }, stepTime);
    };

    animateCounter("publications", 0, final.publications);
    animateCounter("articles", 0, final.articles);
    animateCounter("sources", 0, final.sources);
  }, [loading, totalPublications, groups.length, uniqueSources]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* 4px brand top bar */}
      <div className="h-1 bg-gradient-to-r from-[#07518a] via-[#07518a]/70 to-[#07518a]" />

      {/* Hero Section with background image */}
      <div
        className="relative border-b border-[#dce8f0] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg_press.src})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20"
        >
          {/* Badge */}
        

          {/* Title */}
          <h1 className="font-serif text-4xl font-bold leading-tight text-[#0a1f33] sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
            Press  <span className="text-[#07518a]">Releases</span> 
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-md text-sm text-[#5a7285] sm:text-base">
            Explore our coverage across India&apos;s leading print and digital publications.
          </p>

          {/* Stats (only show when data loaded) */}
          {!loading && !error && (
            <div className="mt-10 flex overflow-hidden rounded-2xl border border-[#dce8f0] bg-[#f4f8fb]">
              {[
                { value: displayCounts.publications, label: "Publications" },
                { value: displayCounts.articles, label: "Articles" },
                { value: displayCounts.sources, label: "Unique Sources" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`px-6 py-4 text-center sm:px-8 sm:py-5 ${
                    i < 2 ? "border-r border-[#dce8f0]" : ""
                  }`}
                >
                  <div className="font-serif text-3xl font-bold text-[#07518a] sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#7a9aae]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Main content area */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {loading && <Skeleton />}

        {error && (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-300 bg-red-50 text-2xl text-red-600">
              ✕
            </div>
            <p className="font-serif text-2xl font-bold text-[#0a1f33]">
              Unable to load data
            </p>
            <p className="text-sm text-[#7a9aae]">{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          groups.map((group, idx) => (
            <ArticleSection key={group.heading} group={group} idx={idx} />
          ))}

        {/* Footer */}
     
      </div>
    </>
  );
}