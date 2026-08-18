"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import {
  ArrowRight,
  Layers,
  Package,
  Search,
  Sparkles,
  ShieldCheck,
  Cpu,
  Zap,
  CheckCircle2,
  Lock,
  Eye,
  Server,
  Globe,
} from "lucide-react";

/**
 * Products listing page — strict two-tone system: brand blue (#07518a) + white.
 * Black/slate greys are used only for text legibility, never as a second accent.
 * Data is fetched live from Strapi.
 */

const STRAPI_ORIGIN = typeof window !== "undefined" ? "/strapi" : "http://183.82.117.36:2334";
const PRODUCTS_ENDPOINT = `${STRAPI_ORIGIN}/api/products`;

const BRAND = "#07518a";
const BRAND_TINT = "#eaf2f8";

/* ─────────────────────────── Types ─────────────────────────── */

interface StrapiImageFormat {
  url: string;
}

interface StrapiImage {
  url: string;
  formats?: {
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
  };
}

interface Category {
  title: string;
}

interface Seo {
  schema?: {
    "@graph"?: Array<{ "@type": string; featureList?: string[] }>;
  };
}

interface Product {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: StrapiImage[];
  category: Category | null;
  seo: Seo | null;
  berief_product?: any[];
}

/* ─────────────────────────── Feature Icon Helper ─────────────────────────── */

function getFeatureIcon(feature: string, index: number) {
  const f = feature.toLowerCase();
  if (f.includes("sec") || f.includes("guard") || f.includes("protect") || f.includes("auth")) {
    return <ShieldCheck className="h-4 w-4" />;
  }
  if (f.includes("ai") || f.includes("smart") || f.includes("intel")) {
    return <Sparkles className="h-4 w-4" />;
  }
  if (f.includes("cpu") || f.includes("proc") || f.includes("fast") || f.includes("speed")) {
    return <Cpu className="h-4 w-4" />;
  }
  if (f.includes("cloud") || f.includes("net") || f.includes("web") || f.includes("site")) {
    return <Globe className="h-4 w-4" />;
  }
  if (f.includes("data") || f.includes("server") || f.includes("store")) {
    return <Server className="h-4 w-4" />;
  }
  if (f.includes("eye") || f.includes("cam") || f.includes("vision") || f.includes("recog")) {
    return <Eye className="h-4 w-4" />;
  }
  if (f.includes("lock") || f.includes("key")) {
    return <Lock className="h-4 w-4" />;
  }

  const icons = [
    <ShieldCheck key="1" className="h-4 w-4" />,
    <Zap key="2" className="h-4 w-4" />,
    <Cpu key="3" className="h-4 w-4" />,
    <Sparkles key="4" className="h-4 w-4" />,
    <CheckCircle2 key="5" className="h-4 w-4" />,
  ];
  return icons[index % icons.length];
}

/* ─────────────────────────── Loading / empty states ─────────────────────────── */

function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 rounded-full border-4 border-slate-200 motion-safe:animate-spin"
          style={{ borderTopColor: BRAND }}
          aria-hidden
        />
        <p className="text-lg font-medium text-slate-500">
          Loading products &amp; solutions…
        </p>
      </div>
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white py-20 text-center">
      <Package className="mx-auto mb-4 h-14 w-14 text-slate-300" aria-hidden />
      <h3 className="mb-2 text-xl font-bold text-slate-900">
        No matching products
      </h3>
      <p className="mb-5 text-slate-500">
        Try adjusting your search or category filter.
      </p>
      <button
        onClick={onClear}
        className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:opacity-90"
        style={{ backgroundColor: BRAND }}
      >
        Clear filters
      </button>
    </div>
  );
}

/* ─────────────────────────── Product card ─────────────────────────── */

const SOLAR_SPECTRA_PRODUCT: Product = {
  id: 9999,
  title: "Portable Solar CCTV & Flood Light System",
  description: "AI-powered, 100% solar operated mobile surveillance tower with high-intensity LED flood lights and lithium battery backup.",
  slug: "solar-spectra",
  image: [
    {
      url: "/mmr/solar-spectra-hero.png",
    },
  ],
  category: {
    title: "Surveillance & Solar",
  },
  seo: {
    schema: {
      "@graph": [
        {
          "@type": "SoftwareApplication",
          featureList: ["Solar Powered", "2-in-1 CCTV & Light", "Lithium Battery", "Cloud VMS", "Off-Grid Ready"],
        },
      ],
    },
  },
  berief_product: [],
};

function ProductCard({ item }: { item: Product }) {
  const rawImgUrl =
    item.image?.[0]?.formats?.medium?.url ??
    item.image?.[0]?.formats?.small?.url ??
    item.image?.[0]?.url;

  const imgUrl = rawImgUrl
    ? (rawImgUrl.startsWith("http") || rawImgUrl.startsWith("/mmr") ? rawImgUrl : `${STRAPI_ORIGIN}${rawImgUrl}`)
    : null;

  const featureList: string[] =
    item.seo?.schema?.["@graph"]?.find(
      (g) => g["@type"] === "SoftwareApplication"
    )?.featureList ?? [];

  const categoryLabel = item.category?.title ?? "Product";

  const cardHref =
    item.slug === "solar-spectra"
      ? "/solar-spectra"
      : item.slug === "visitor-management-system" ||
        item.slug === "hrms-software" ||
        item.slug === "task-management-system"
      ? `/products/${item.slug}`
      : `/product/${item.slug}`;

  return (
    <Link
      href={cardHref}
      className="group relative flex h-[420px] w-full overflow-hidden rounded-[36px] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:h-[440px]"
    >
      {/* LEFT: Full brand blue tile with all white content */}
      <div
        className="relative flex w-[60%] flex-shrink-0 flex-col justify-between overflow-hidden p-7 sm:p-9"
        style={{ background: "linear-gradient(145deg, #07518a 0%, #04335a 100%)" }}
      >
        {/* Watermark */}
        <div
          className="pointer-events-none absolute -left-4 top-1/2 origin-left -translate-y-1/2 -rotate-90 select-none whitespace-nowrap text-[80px] font-black uppercase tracking-widest text-white/[0.06] sm:text-[100px]"
          aria-hidden
        >
          {categoryLabel}
        </div>

        {/* Category badge */}
        <span className="relative z-10 inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[2px] text-white/90">
          {categoryLabel}
        </span>

        {/* Title + description */}
        <div className="relative z-10 flex flex-col gap-3">
          <h3 className="line-clamp-2 text-2xl font-extrabold leading-tight text-white sm:text-[26px]">
            {item.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-white/70">
            {item.description}
          </p>
        </div>

        {/* Features + CTA */}
        <div className="relative z-10 flex flex-col gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-white/50">
            Features
          </span>
          <div className="flex flex-wrap gap-2">
            {(featureList.length > 0 ? featureList.slice(0, 5) : ["AI", "Security", "Speed"]).map(
              (feature, idx) => (
                <div
                  key={idx}
                  title={feature}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/25"
                >
                  {getFeatureIcon(feature, idx)}
                </div>
              )
            )}
          </div>
          <div
            className="mt-1 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-200 group-hover:shadow-xl"
            style={{ color: BRAND }}
          >
            View Product
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* RIGHT: Product image floating on light bg — no outer frame, bent rounded corners */}
      <div className="relative flex w-[40%] flex-shrink-0 items-center justify-center bg-[#eef5fb]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(ellipse at 60% 50%, #07518a33 0%, transparent 70%)" }}
        />
        {imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgUrl}
            alt={item.title}
            className="relative z-10 max-h-[82%] max-w-[82%] rounded-2xl object-contain drop-shadow-[0_16px_40px_rgba(7,81,138,0.22)] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_24px_50px_rgba(7,81,138,0.35)]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Layers className="h-16 w-16 text-[#07518a]/30" aria-hidden />
          </div>
        )}
      </div>
    </Link>
  );
}

/* ─────────────────────────── Main page ─────────────────────────── */


export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    axios
      .get(PRODUCTS_ENDPOINT, {
        params: {
          "populate[image]": true,
          "populate[category]": true,
          "populate[seo][populate][ogImage]": true,
          "populate[berief_product][populate]": "*",
        },
      })
      .then((res) => {
        if (!cancelled) setItems(res.data?.data ?? []);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const allItems = useMemo(() => {
    const list = [...items];
    if (typeof window !== "undefined") {
      const savedOrderRaw = localStorage.getItem("product_positions_order");
      if (savedOrderRaw) {
        try {
          const savedSlugs: string[] = JSON.parse(savedOrderRaw);
          if (Array.isArray(savedSlugs) && savedSlugs.length > 0) {
            list.sort((a, b) => {
              const idxA = savedSlugs.indexOf(a.slug);
              const idxB = savedSlugs.indexOf(b.slug);
              if (idxA !== -1 && idxB !== -1) return idxA - idxB;
              if (idxA !== -1) return -1;
              if (idxB !== -1) return 1;
              return 0;
            });
          }
        } catch (e) {
          console.error("Error reading saved product order on product page:", e);
        }
      }
    }
    const hasSpectra = list.some((i) => i.slug === "solar-spectra");
    return hasSpectra ? list : [...list, SOLAR_SPECTRA_PRODUCT];
  }, [items]);

  const heroProducts = useMemo(() => {
    return allItems.map((item) => {
      const rawImgUrl =
        item.image?.[0]?.formats?.medium?.url ??
        item.image?.[0]?.formats?.small?.url ??
        item.image?.[0]?.url;

      const imgUrl = rawImgUrl
        ? (rawImgUrl.startsWith("http") || rawImgUrl.startsWith("/mmr")
            ? rawImgUrl
            : `${STRAPI_ORIGIN}${rawImgUrl}`)
        : "/mmr/solar-spectra-hero.png";

      const href =
        item.slug === "solar-spectra"
          ? "/solar-spectra"
          : item.slug === "visitor-management-system" ||
            item.slug === "hrms-software" ||
            item.slug === "task-management-system"
          ? `/products/${item.slug}`
          : `/product/${item.slug}`;

      return {
        id: item.id,
        title: item.title,
        category: item.category?.title ?? "Enterprise Solution",
        image: imgUrl,
        href,
      };
    });
  }, [allItems]);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          allItems
            .map((item) => item.category?.title)
            .filter((title): title is string => Boolean(title))
        )
      ),
    [allItems]
  );

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allItems.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category?.title === activeCategory;
      const matchesSearch =
        query === "" ||
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.category?.title?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [allItems, activeCategory, searchQuery]);

  const clearFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
  };

  if (loading) return <LoadingState />;

  return (
    <main className="min-h-screen bg-white">
      {/* Animated Marquee Hero Section */}
      <AnimatedMarqueeHero
        tagline="Enterprise AI & Software Solutions"
        title={
          <>
            Security &amp; Software
            <br />
            Products
          </>
        }
        description="AI-driven facial recognition, visitor tracking, smart site security, and digital workspace platforms built for enterprise control."
        products={heroProducts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Body */}
      <div className="mx-auto max-w-7xl space-y-8 px-2 py-8 sm:px-4 lg:px-6">
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className="rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200"
              style={
                activeCategory === "all"
                  ? { backgroundColor: BRAND, color: "white" }
                  : { border: "1px solid #e2e8f0", color: "#475569" }
              }
            >
              All products ({allItems.length})
            </button>
            {categories.map((cat) => {
              const count = allItems.filter((i) => i.category?.title === cat).length;
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition-colors duration-200"
                  style={
                    active
                      ? { backgroundColor: BRAND, color: "white" }
                      : { border: "1px solid #e2e8f0", color: "#475569" }
                  }
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        )}

        {filteredItems.length === 0 ? (
          <EmptyState onClear={clearFilters} />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 xl:grid-cols-2">
            {filteredItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
