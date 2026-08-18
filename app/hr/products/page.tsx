"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent,
  KeyboardSensor, PointerSensor, closestCenter,
  defaultDropAnimationSideEffects, useSensor, useSensors,
} from "@dnd-kit/core";
import {
  SortableContext, arrayMove, rectSortingStrategy,
  sortableKeyboardCoordinates, useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical, Package, Search, Save, RotateCcw,
  CheckCircle2, AlertCircle, ArrowUpRight, Sun, UserCheck, Briefcase, CheckSquare, ShieldCheck,
  Eye, Move, Sparkles, Layers, Shield
} from "lucide-react";
import Sidebar from "../dashboard/Sidebar";

const STRAPI_ORIGIN = typeof window !== "undefined" ? "/strapi" : "http://183.82.117.36:2334";
const PRODUCTS_ENDPOINT = `${STRAPI_ORIGIN}/api/products`;
const LOCAL_STORAGE_ORDER_KEY = "product_positions_order";

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category?: string;
  bannerImage?: string;
  position: number;
}

// ── FONT LOADER ──
function useFonts() {
  useEffect(() => {
    if (document.getElementById("hr-fonts")) return;
    const l = document.createElement("link");
    l.id = "hr-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(l);
  }, []);
}

// ── SORTABLE PRODUCT CARD ──
function SortableProductCard({
  product,
  dragMode,
  isOverlay,
  dndRef,
  dndStyle,
  dragAttr,
  dragListeners,
}: {
  product: ProductItem;
  dragMode: boolean;
  isOverlay?: boolean;
  dndRef?: (node: HTMLElement | null) => void;
  dndStyle?: React.CSSProperties;
  dragAttr?: any;
  dragListeners?: any;
}) {
  const getLucideIcon = () => {
    const lowerName = product.name.toLowerCase();
    const lowerSlug = product.slug.toLowerCase();
    if (lowerSlug.includes("solar") || lowerName.includes("solar")) return <Sun className="h-5 w-5" />;
    if (lowerSlug.includes("visitor") || lowerName.includes("visitor")) return <UserCheck className="h-5 w-5" />;
    if (lowerSlug.includes("hrms") || lowerName.includes("hr")) return <Briefcase className="h-5 w-5" />;
    if (lowerSlug.includes("task") || lowerName.includes("task")) return <CheckSquare className="h-5 w-5" />;
    if (lowerSlug.includes("security") || lowerName.includes("cctv")) return <ShieldCheck className="h-5 w-5" />;
    return <Package className="h-5 w-5" />;
  };

  return (
    <div
      ref={dndRef}
      style={dndStyle}
      className={`
        relative group rounded-2xl overflow-hidden bg-white border border-slate-200/90 
        transition-all duration-300 ease-out flex flex-col justify-between p-5 min-h-[220px]
        ${isOverlay ? "shadow-2xl ring-4 ring-[#07518a]/30 scale-[1.03] z-50 bg-white/95 backdrop-blur-xl border-[#07518a]" : "hover:shadow-xl hover:border-[#07518a]/30 hover:-translate-y-1"}
      `}
    >
      {/* Top Bar: Rank Badge + Icon / Drag handle */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-[#07518a] text-white font-extrabold text-xs tracking-wider shadow-sm flex items-center gap-1">
            <span className="text-[10px] opacity-75 font-normal">POS</span> #{product.position + 1}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
            {product.category || "Solution"}
          </span>
        </div>

        {dragMode && !isOverlay && (
          <div
            {...(dragAttr ?? {})}
            {...(dragListeners ?? {})}
            className="cursor-grab active:cursor-grabbing p-2 rounded-xl bg-slate-100 hover:bg-[#07518a] text-slate-500 hover:text-white transition-colors duration-200 flex items-center gap-1"
            title="Drag to reorder position"
          >
            <GripVertical size={16} />
            <span className="text-[10px] font-bold uppercase tracking-wider pr-1 hidden sm:inline">Drag</span>
          </div>
        )}
      </div>

      {/* Middle: Thumbnail + Details */}
      <div className="flex items-start gap-4 my-2">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center relative text-[#07518a]">
          {product.bannerImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.bannerImage} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            getLucideIcon()
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-[#07518a] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-medium leading-relaxed">
            {product.tagline || "No description provided."}
          </p>
        </div>
      </div>

      {/* Footer info bar */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
        <span className="font-mono text-[10px] text-slate-500 truncate max-w-[150px]">
          slug: {product.slug}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#07518a] bg-[#07518a]/5 px-2 py-0.5 rounded-md">
          <Sparkles size={10} /> Active Mega Menu
        </span>
      </div>
    </div>
  );
}

function SortableItemWrapper({
  product,
  dragMode,
}: {
  product: ProductItem;
  dragMode: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: product.id, disabled: !dragMode });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <SortableProductCard
      product={product}
      dragMode={dragMode}
      dndRef={setNodeRef}
      dndStyle={style}
      dragAttr={attributes}
      dragListeners={listeners}
    />
  );
}

// ── MAIN PAGE COMPONENT ──
export default function HRProductsPage() {
  useFonts();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vacanciesCount, setVacanciesCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dragMode, setDragMode] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Authenticate HR token
  useEffect(() => {
    const token = localStorage.getItem("hr_token");
    if (!token) {
      router.push("/hr/login");
      return;
    }
    fetchMetaData(token);
    fetchProducts();
    setMounted(true);
  }, [router]);

  const fetchMetaData = async (tk: string) => {
    try {
      const headers = { Authorization: `Bearer ${tk}` };
      const res = await axios.get("/strapi/api/job-openings", { headers });
      setVacanciesCount(res.data?.data?.length || 0);
    } catch (err) {
      console.error("Meta fetch error:", err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(PRODUCTS_ENDPOINT, {
        params: {
          "populate[image]": true,
          "populate[category]": true,
        },
      });
      const data = res.data?.data;

      let fetchedList: ProductItem[] = [];
      if (Array.isArray(data) && data.length > 0) {
        fetchedList = data.map((item: any, idx: number) => {
          const rawImgUrl =
            item.image?.[0]?.formats?.small?.url ??
            item.image?.[0]?.formats?.medium?.url ??
            item.image?.[0]?.url;
          const imgUrl = rawImgUrl
            ? (rawImgUrl.startsWith("http") || rawImgUrl.startsWith("/mmr")
                ? rawImgUrl
                : `${STRAPI_ORIGIN}${rawImgUrl}`)
            : undefined;

          return {
            id: String(item.id || item.slug || idx),
            slug: item.slug,
            name: item.title ?? item.name ?? "Product",
            tagline: item.description ?? item.tagline ?? "",
            category: item.category?.title ?? item.category?.name ?? "Solution",
            bannerImage: imgUrl,
            position: idx,
          };
        });
      }

      // Add Solar Spectra fallback if missing
      if (!fetchedList.some((p) => p.slug === "solar-spectra")) {
        fetchedList.push({
          id: "solar-spectra",
          slug: "solar-spectra",
          name: "Solar Spectra",
          tagline: "Portable Solar CCTV & Flood Light System (2-in-1)",
          category: "Renewable & Surveillance",
          bannerImage: "/mmr/solar-spectra-hero.png",
          position: fetchedList.length,
        });
      }

      // Read saved custom position order from localStorage
      const savedOrderRaw = localStorage.getItem(LOCAL_STORAGE_ORDER_KEY);
      if (savedOrderRaw) {
        try {
          const savedSlugs: string[] = JSON.parse(savedOrderRaw);
          if (Array.isArray(savedSlugs) && savedSlugs.length > 0) {
            fetchedList.sort((a, b) => {
              const idxA = savedSlugs.indexOf(a.slug);
              const idxB = savedSlugs.indexOf(b.slug);
              if (idxA !== -1 && idxB !== -1) return idxA - idxB;
              if (idxA !== -1) return -1;
              if (idxB !== -1) return 1;
              return a.position - b.position;
            });
          }
        } catch (e) {
          console.error("Error parsing saved product order:", e);
        }
      }

      // Re-index position numbers
      const orderedList = fetchedList.map((p, i) => ({ ...p, position: i }));
      setProducts(orderedList);
    } catch (err) {
      console.error("Error fetching products in HR panel:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    setProducts((prevItems) => {
      const oldIndex = prevItems.findIndex((item) => item.id === active.id);
      const newIndex = prevItems.findIndex((item) => item.id === over.id);
      const newArray = arrayMove(prevItems, oldIndex, newIndex);
      return newArray.map((item, idx) => ({ ...item, position: idx }));
    });
  };

  const handleSavePositions = async () => {
    setIsSaving(true);
    try {
      const orderedSlugs = products.map((p) => p.slug);
      localStorage.setItem(LOCAL_STORAGE_ORDER_KEY, JSON.stringify(orderedSlugs));

      // Attempt sync with Strapi API using HR Token if supported
      const token = localStorage.getItem("hr_token");
      if (token) {
        try {
          await Promise.all(
            products.map((p, idx) => {
              if (p.id && !p.id.includes("solar-spectra")) {
                return axios.put(
                  `${PRODUCTS_ENDPOINT}/${p.id}`,
                  { data: { order: idx } },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
              }
              return Promise.resolve();
            })
          );
        } catch (apiErr) {
          console.warn("Strapi API order sync warning (local storage updated):", apiErr);
        }
      }

      setSaveNotification("Product positions successfully saved & synchronized across Mega Menu and Products Page!");
      setTimeout(() => setSaveNotification(null), 4000);
    } catch (err) {
      console.error("Failed to save product positions:", err);
      setSaveNotification("Error saving position order.");
      setTimeout(() => setSaveNotification(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetOrder = () => {
    localStorage.removeItem(LOCAL_STORAGE_ORDER_KEY);
    fetchProducts();
    setSaveNotification("Reset product positions to default API ordering.");
    setTimeout(() => setSaveNotification(null), 3000);
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q))
    );
  }, [products, searchQuery]);

  if (!mounted) return null;

  const SW = collapsed ? 68 : 248;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:6px; height:6px }
        ::-webkit-scrollbar-thumb { background:#CBD5E1; border-radius:10px }
        body { margin: 0; overflow: hidden; }
        
        @media(max-width:900px){
          .sidebar { transform: translateX(-100%)!important }
          .sidebar.open { transform: translateX(0)!important }
          .main-content-area { margin-left:0!important }
        }
      `}</style>

      <div style={{ display: "flex", height: "100vh", width: "100vw", background: "#F8FAFC", fontFamily: "DM Sans, sans-serif", position: "relative", overflow: "hidden" }}>

        {/* HR SIDEBAR */}
        <Sidebar
          activeTab="Products"
          onTabChange={() => router.push("/hr/dashboard")}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          vacanciesCount={vacanciesCount}
        />

        {/* MAIN AREA */}
        <main style={{ marginLeft: SW, flex: 1, display: "flex", flexDirection: "column", height: "100vh", transition: "margin-left 0.28s ease", position: "relative" }}>

          {/* Sticky Header */}
          <header style={{ height: 72, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(25px)", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", flexShrink: 0, position: "sticky", top: 0, zIndex: 900 }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#07518a]/10 text-[#07518a]">
                <Package size={22} />
              </div>
              <div>
                <h1 style={{ fontFamily: "DM Sans", fontWeight: 800, fontSize: 18, color: "#0F172A", letterSpacing: "-0.5px", margin: 0 }}>
                  Products Mega Menu Reordering
                </h1>
                <p className="text-xs text-slate-500 font-medium margin-0">
                  Drag and drop products to customize display positions in the Navigation Mega Menu &amp; Products Page
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleResetOrder}
                className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Reset to default order"
              >
                <RotateCcw size={14} /> Reset
              </button>

              <button
                onClick={handleSavePositions}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl border border-transparent bg-[#07518a] hover:bg-[#04335a] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save size={15} /> {isSaving ? "Saving..." : "Save Product Positions"}
              </button>
            </div>
          </header>

          {/* Body Content Container */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

            {/* Notification Banner */}
            <AnimatePresence>
              {saveNotification && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <span>{saveNotification}</span>
                  </div>
                  <button onClick={() => setSaveNotification(null)} className="text-emerald-600 hover:text-emerald-900 text-xs font-bold">
                    Dismiss
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Control Bar: Search & Mode Selector */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products by title or slug..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07518a]/30 focus:border-[#07518a]"
                />
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs font-bold text-slate-500 mr-1">Reorder Mode:</span>
                <button
                  onClick={() => setDragMode(!dragMode)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    dragMode
                      ? "bg-[#07518a] text-white border-transparent shadow-md"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  {dragMode ? <Move size={14} /> : <Eye size={14} />}
                  <span>{dragMode ? "Drag Reorder ON" : "View Mode"}</span>
                </button>
              </div>
            </div>

            {/* Main Products Reorder Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-sm">
                <div className="w-8 h-8 border-3 border-[#07518a] border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-xs font-bold text-slate-600">Loading products catalog...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
                <AlertCircle size={32} className="mx-auto text-slate-400 mb-2" />
                <h3 className="text-sm font-bold text-slate-700">No products found</h3>
                <p className="text-xs text-slate-500 mt-1">Try clearing your search query.</p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={(e) => setActiveId(String(e.active.id))}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={filteredProducts.map((p) => p.id)} strategy={rectSortingStrategy}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredProducts.map((product) => (
                      <SortableItemWrapper key={product.id} product={product} dragMode={dragMode} />
                    ))}
                  </div>
                </SortableContext>

                <DragOverlay
                  dropAnimation={{
                    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0.4" } } }),
                  }}
                >
                  {activeId ? (
                    <SortableProductCard
                      product={products.find((p) => p.id === activeId) || products[0]}
                      dragMode={false}
                      isOverlay
                    />
                  ) : null}
                </DragOverlay>
              </DndContext>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
