"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Calendar,
  Newspaper,
  BookOpen,
  Landmark,
  Briefcase,
  Video,
  FileText,
  Mic2,
  MessageSquare,
  Download,
  Zap,
  Cpu,
  Fingerprint,
  Wifi,
  Settings,
  VideoIcon,
  ChessKnight,
  Package,
  Sun,
  UserCheck,
  CheckSquare,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Import product data (adjust path as needed)
import { products } from "@/app/products/data";
import { FaKickstarter } from "react-icons/fa";

const STRAPI_ORIGIN = typeof window !== "undefined" ? "/strapi" : "http://183.82.117.36:2334";
const PRODUCTS_ENDPOINT = `${STRAPI_ORIGIN}/api/products`;

/* ========================= TYPES ========================= */
type InstallationItem = {
  id: number;
  name: string;
  slug: string;
  category: string;
  description?: string;
};

type AboutItem = {
  id: number;
  name: string;
  href: string;
};

type ResourceMenuItem = {
  id: number;
  name: string;
  href: string;
  description: string;
  icon: React.ElementType;
};

type ProductItem = {
  slug: string;
  name: string;
  tagline: string;
  bannerImage: string;
  // add other fields if needed
};

/* ========================= DATA ========================= */
const SOLAR_INSTALLATIONS_DATA: { items: InstallationItem[] } = {
  items: [
    {
      id: 1,
      name: "Smart Bus Solution",
      slug: "smart-bus-solution",
      category: "Smart Mobility",
      description: "Advanced public transport management",
    },
    {
      id: 2,
      name: "AI VMS – Video Management System",
      slug: "ai-vms-video-management-system",
      category: "AI Surveillance",
      description: "Intelligent video monitoring solutions",
    },
    {
      id: 3,
      name: "Solar EPC",
      slug: "solar-epc",
      category: "Renewable Energy",
      description: "Complete solar power solutions",
    },
    {
      id: 4,
      name: "Smart Biometric & Facial Recognition",
      slug: "smart-biometric-facial-recognition",
      category: "Biometrics",
      description: "Secure identity verification systems",
    },
    {
      id: 5,
      name: "ERP Software System",
      slug: "erp-software-system",
      category: "Software",
      description: "Enterprise resource planning",
    },
  ],
};

const ABOUT_MENU: AboutItem[] = [
  { id: 1, name: "About Us", href: "/about" },
  { id: 2, name: "Who We Are", href: "/who-we-are" },
  { id: 5, name: "Board of Directors", href: "/about/Board_of_directors" },
  { id: 8, name: "Advisory Board", href: "/advisors" },
  { id: 4, name: "Our Team", href: "/our-team" },
  { id: 3, name: "Our Journey", href: "/our-journey" },
  { id: 6, name: "Chairman & Managing Director", href: "/about/our-cmd" },
  { id: 7, name: "What Our Clients Said", href: "/testimonials" },
];

const RESOURCES_MENU: ResourceMenuItem[] = [
  {
    id: 1,
    name: "Our Events",
    href: "/our-events",
    description: "Latest corporate events and seminars.",
    icon: Calendar,
  },
  {
    id: 2,
    name: "Blogs",
    href: "/blogs",
    description: "Expert insights and industry trends.",
    icon: BookOpen,
  },
  {
    id: 3,
    name: "News",
    href: "/news",
    description: "Latest company updates and news.",
    icon: Newspaper,
  },
  {
    id: 4,
    name: "Govt. Projects",
    href: "/govt-projects",
    description: "Collaborations with government bodies.",
    icon: Landmark,
  },
  {
    id: 5,
    name: "Our Projects",
    href: "/our-projects",
    description: "Showcase of our diverse portfolio.",
    icon: Briefcase,
  },
  {
    id: 6,
    name: "Media",
    href: "/media",
    description: "Videos and images of our operations.",
    icon: Video,
  },
  {
    id: 7,
    name: "Videos",
    href: "/videos",
    description: "Corporate cinematic theater archive.",
    icon: VideoIcon,
  },
  {
    id: 8,
    name: "Case Studies",
    href: "/case-studies",
    description: "In-depth client success stories.",
    icon: FileText,
  },
  {
    id: 9,
    name: "Press Release",
    href: "/press-release",
    description: "Official statements and milestones.",
    icon: Mic2,
  },
  {
    id: 10,
    name: "Reviews",
    href: "/write-a-review",
    description: "Share your feedback with us.",
    icon: MessageSquare,
  },
  {
    id: 11,
    name: "Brochure",
    href: "/brochure",
    description: "Corporate profile and catalog.",
    icon: Download,
  },

 {
  id: 12,
  name: "Media Kit",
  href: "/media-kit",
  description: "Brand assets, logos, press materials, and media resources.",
  icon: Package,
}
];

// Convert products object to array
const PRODUCTS_LIST: ProductItem[] = Object.values(products);

function ProductIconOrImage({ bannerImage, name, slug, size = "large" }: { bannerImage?: any; name: string; slug: string; size?: "large" | "small" }) {
  const isLarge = size === "large";
  const iconSizeClass = isLarge ? "h-6 w-6" : "h-4 w-4";

  const getLucideIcon = () => {
    const lowerName = name.toLowerCase();
    const lowerSlug = slug.toLowerCase();
    if (lowerSlug.includes("solar") || lowerName.includes("solar")) return <Sun className={iconSizeClass} />;
    if (lowerSlug.includes("visitor") || lowerName.includes("visitor")) return <UserCheck className={iconSizeClass} />;
    if (lowerSlug.includes("hrms") || lowerName.includes("hr")) return <Briefcase className={iconSizeClass} />;
    if (lowerSlug.includes("task") || lowerName.includes("task")) return <CheckSquare className={iconSizeClass} />;
    if (lowerSlug.includes("security") || lowerName.includes("cctv")) return <ShieldCheck className={iconSizeClass} />;
    return <Package className={iconSizeClass} />;
  };

  if (bannerImage) {
    if (typeof bannerImage === "string") {
      return (
        <div className={`relative ${isLarge ? "h-12 w-12 rounded-xl" : "h-8 w-8 rounded-lg"} flex-shrink-0 overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bannerImage} alt={name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      );
    }
    return (
      <div className={`relative ${isLarge ? "h-12 w-12 rounded-xl" : "h-8 w-8 rounded-lg"} flex-shrink-0 overflow-hidden border border-gray-200 bg-gray-50`}>
        <Image
          src={bannerImage}
          alt={name}
          fill
          sizes={isLarge ? "48px" : "32px"}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${isLarge ? "h-12 w-12 rounded-xl" : "h-8 w-8 rounded-lg"} flex-shrink-0 overflow-hidden border border-[#07518a]/20 bg-[#07518a]/10 flex items-center justify-center text-[#07518a]`}>
      {getLucideIcon()}
    </div>
  );
}

/* ========================= COMPONENT ========================= */
export function NavigationMenuDemo() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showSolutionsMenu, setShowSolutionsMenu] = React.useState(false);
  const [showAboutMenu, setShowAboutMenu] = React.useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = React.useState(false);
  const [showProductsMenu, setShowProductsMenu] = React.useState(false);

  // Mobile accordion states
  const [mobileAboutOpen, setMobileAboutOpen] = React.useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = React.useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = React.useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = React.useState(false);

  const pathname = usePathname();

  // Dynamic products from Strapi
  const [strapiProducts, setStrapiProducts] = React.useState<ProductItem[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    axios
      .get(PRODUCTS_ENDPOINT, {
        params: {
          "populate[image]": true,
          "populate[category]": true,
        },
      })
      .then((res) => {
        if (cancelled) return;
        const data = res.data?.data;
        if (Array.isArray(data) && data.length > 0) {
          const fetchedList: ProductItem[] = data.map((item: any) => {
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
              slug: item.slug,
              name: item.title ?? item.name ?? "Product",
              tagline: item.description ?? item.tagline ?? "",
              bannerImage: imgUrl,
            };
          });
          setStrapiProducts(fetchedList);
        }
      })
      .catch((err) => {
        console.error("Error fetching mega menu products:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const finalProductsList = React.useMemo(() => {
    const staticList = Object.values(products).map((p) => ({
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      bannerImage: p.bannerImage,
    }));

    if (strapiProducts.length === 0) {
      return staticList;
    }

    const hasSpectra = strapiProducts.some((p) => p.slug === "solar-spectra");
    const merged = hasSpectra
      ? strapiProducts
      : [
          {
            slug: "solar-spectra",
            name: "Solar Spectra",
            tagline: "Portable Solar CCTV & Flood Light System (2-in-1)",
            bannerImage: "/mmr/solar-spectra-hero.png",
          },
          ...strapiProducts,
        ];

    staticList.forEach((sp) => {
      if (!merged.some((mp) => mp.slug === sp.slug)) {
        merged.push(sp);
      }
    });

    return merged;
  }, [strapiProducts]);

  const getProductHref = (slug: string) => {
    if (slug === "solar-spectra") return "/solar-spectra";
    if (
      slug === "visitor-management-system" ||
      slug === "hrms-software" ||
      slug === "task-management-system"
    ) {
      return `/products/${slug}`;
    }
    return `/product/${slug}`;
  };

  /* === Lock body scroll and reset menus on mobile open/close === */
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      setMobileAboutOpen(false);
      setMobileSolutionsOpen(false);
      setMobileResourcesOpen(false);
      setMobileProductsOpen(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const logoSrc = "/highbtlogo-tm-1.png";
  const headerBg = "bg-white border-b border-gray-200 text-[#07518a] shadow-sm";

  /* === Group solutions by category === */
  const groupedSolutions = React.useMemo(() => {
    const groups: Record<string, InstallationItem[]> = {};
    SOLAR_INSTALLATIONS_DATA.items.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, []);

  /* === Helper for Solutions Icons === */
  const getSolutionIcon = (category: string) => {
    switch (category) {
      case "Smart Mobility":
        return Wifi;
      case "AI Surveillance":
        return Video;
      case "Renewable Energy":
        return Zap;
      case "Biometrics":
        return Fingerprint;
      case "Software":
        return Cpu;
      default:
        return Settings;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${headerBg}`}
        style={{ transform: "translateZ(0)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* LOGO */}
            <Link href="/" className="flex-shrink-0 relative z-10 py-1.5 flex items-center">
              <Image
                src={logoSrc}
                alt="Brihaspathi Technologies Logo"
                width={240}
                height={70}
                className="w-auto h-10 sm:h-12 md:h-14 lg:h-16 object-contain transition-all duration-300 drop-shadow-sm"
                priority
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-start flex-nowrap whitespace-nowrap gap-1 lg:gap-3 shrink-0">
              {/* Home */}
              <Link
                href="/"
                className={`relative shrink-0 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-md ${
                  pathname === "/"
                    ? "text-[#07518a]"
                    : "text-[#07518a]/70 hover:text-[#07518a] hover:bg-[#07518a]/5"
                }`}
              >
                Home
                {pathname === "/" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#07518a]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>

              {/* Company / About Dropdown */}
              <div
                className="relative shrink-0 pb-2"
                onMouseEnter={() => setShowAboutMenu(true)}
                onMouseLeave={() => setShowAboutMenu(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-md ${
                    pathname.startsWith("/about")
                      ? "text-[#07518a]"
                      : "text-[#07518a]/70 hover:text-[#07518a] hover:bg-[#07518a]/5"
                  }`}
                >
                  Company
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showAboutMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showAboutMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full pt-2 min-w-[260px] z-[1100]"
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 overflow-hidden">
                        {ABOUT_MENU.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setShowAboutMenu(false)}
                            className="group flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:bg-[#07518a]/5 hover:text-[#07518a] transition-all duration-200"
                          >
                            <span className="font-medium">{item.name}</span>
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Products Mega Menu */}
              <div
                className="shrink-0 pb-2"
                onMouseEnter={() => setShowProductsMenu(true)}
                onMouseLeave={() => setShowProductsMenu(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-md ${
                    pathname.startsWith("/product") || pathname.startsWith("/products")
                      ? "text-[#07518a]"
                      : "text-[#07518a]/70 hover:text-[#07518a] hover:bg-[#07518a]/5"
                  }`}
                >
                  Products
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showProductsMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showProductsMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[92vw] max-w-6xl z-[1100] whitespace-normal"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex">
                        <div className="flex-1 p-6 flex flex-col justify-between max-h-[70vh] overflow-y-auto">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5 content-start">
                            {finalProductsList.map((product) => (
                              <motion.div
                                key={product.slug}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Link
                                  href={getProductHref(product.slug)}
                                  onClick={() => setShowProductsMenu(false)}
                                  className="group flex items-start gap-3.5 p-3.5 rounded-xl hover:bg-[#07518a]/5 transition-all duration-200 border border-transparent hover:border-[#07518a]/10 h-full"
                                >
                                  {/* Product Image or Lucide Icon */}
                                  <ProductIconOrImage bannerImage={product.bannerImage} name={product.name} slug={product.slug} size="large" />
                                  {/* Product Text */}
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 group-hover:text-[#07518a] transition-colors text-xs sm:text-sm mb-1 leading-snug whitespace-normal break-words">
                                      {product.name}
                                    </h4>
                                    <p className="text-[11px] text-gray-500 line-clamp-2 group-hover:text-gray-600 leading-relaxed whitespace-normal break-words">
                                      {product.tagline}
                                    </p>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>

                          {/* Footer Link for All Products */}
                          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between shrink-0">
                            <span className="text-[11px] font-medium text-gray-500">
                              Explore all solutions &amp; products
                            </span>
                            <Link
                              href="/product"
                              onClick={() => setShowProductsMenu(false)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#07518a] hover:text-[#04335a] transition-colors group"
                            >
                              <span>View All Products</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>

                        {/* Featured Section */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="w-[280px] shrink-0 relative overflow-hidden flex flex-col border-l border-gray-100 bg-gradient-to-b from-gray-50/50 to-white"
                        >
                          <div className="relative z-10 flex flex-col h-full p-6">
                            {/* Top Section with Rectangular Image */}
                            <div className="space-y-3">
                              <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                                BTL Products
                              </h4>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative aspect-[21/9] w-full rounded-lg overflow-hidden border border-gray-100 shadow-md"
                              >
                                <Image
                                  src="/colorful-illustration-computer-with-graphic-all-way-logo.png"
                                  alt="BTL Products"
                                  fill
                                  sizes="300px"
                                  className="object-cover"
                                />
                              </motion.div>
                            </div>

                            {/* Bottom Aligned Content */}
                            <div className="mt-auto space-y-4">
                              <div className="space-y-3">
                                <h5 className="text-[13px] font-bold text-[#07518a] flex items-center gap-2">
                                  Quality & Innovation
                                  <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#07518a] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#07518a]"></span>
                                  </span>
                                </h5>
                                <p className="text-[9px] text-gray-600 leading-relaxed font-medium">
                                  Engineering high-performance AI intelligence.
                                </p>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {["Hardware", "Software", "AI Ready"].map(
                                    (tag) => (
                                      <span
                                        key={tag}
                                        className="text-[8px] font-bold bg-white text-[#07518a] px-2 py-0.5 rounded-full border border-[#07518a]/10 shadow-sm transition-all cursor-default"
                                      >
                                        {tag}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions Mega Menu */}
              <div
                className="shrink-0 pb-2"
                onMouseEnter={() => setShowSolutionsMenu(true)}
                onMouseLeave={() => setShowSolutionsMenu(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-md ${
                    pathname.startsWith("/solutions")
                      ? "text-[#07518a]"
                      : "text-[#07518a]/70 hover:text-[#07518a] hover:bg-[#07518a]/5"
                  }`}
                >
                  Solutions
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showSolutionsMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showSolutionsMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[92vw] max-w-5xl z-[1100] whitespace-normal"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex">
                        <div className="flex-1 p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2">
                            {Object.entries(groupedSolutions).map(
                              ([category, items]) => (
                                <motion.div
                                  key={category}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-3">
                                    {category}
                                  </h4>
                                  <ul className="space-y-0.5">
                                    {items.map((item) => {
                                      const Icon = getSolutionIcon(
                                        item.category
                                      );
                                      return (
                                        <li key={item.id}>
                                          <Link
                                            href={`/solutions/${item.slug}`}
                                            onClick={() =>
                                              setShowSolutionsMenu(false)
                                            }
                                            className="group block p-2.5 rounded-xl hover:bg-[#07518a]/5 transition-all duration-200"
                                          >
                                            <div className="flex items-center gap-3">
                                              <div className="w-8 h-8 rounded-lg bg-[#07518a]/5 flex items-center justify-center text-[#07518a] group-hover:bg-[#07518a] group-hover:text-white transition-all duration-300">
                                                <Icon className="w-4 h-4" />
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-gray-800 group-hover:text-[#07518a] transition-colors text-[13px] truncate">
                                                  {item.name}
                                                </div>
                                              </div>
                                              <ArrowRight className="w-3.5 h-3.5 text-[#07518a] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
                                            </div>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </motion.div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Featured Section */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="w-[300px] relative overflow-hidden flex flex-col border-l border-gray-100 bg-gradient-to-b from-gray-50/50 to-white"
                        >
                          <div className="relative z-10 flex flex-col h-full p-6">
                            {/* Top Section with Rectangular Image */}
                            <div className="space-y-3">
                              <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                                BTL Solutions
                              </h4>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative aspect-[21/9] w-full rounded-lg overflow-hidden border border-gray-100 shadow-md"
                              >
                                <Image
                                  src="/hand-holding-bright-light-bulb-with-gears-symbolizing-innovation-creative-ideas-vector-illustration.png"
                                  alt="BTL Solutions"
                                  fill
                                  sizes="300px"
                                  className="object-cover"
                                />
                              </motion.div>
                            </div>

                            {/* Bottom Aligned Content */}
                            <div className="mt-auto space-y-4">
                              <div className="space-y-2">
                                <h5 className="text-[13px] font-bold text-[#07518a] flex items-center gap-2">
                                  Integrated Intelligence
                                  <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#07518a] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#07518a]"></span>
                                  </span>
                                </h5>
                                <p className="text-[9px] text-gray-600 leading-relaxed font-medium">
                                  Smart solutions for enterprise & gov.
                                </p>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {["Enterprise", "Smart City", "Security"].map(
                                    (tag) => (
                                      <span
                                        key={tag}
                                        className="text-[8px] font-bold bg-white text-[#07518a] px-2 py-0.5 rounded-full border border-[#07518a]/10 shadow-sm transition-all cursor-default"
                                      >
                                        {tag}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources Dropdown */}
              <div
                className="shrink-0 pb-2"
                onMouseEnter={() => setShowResourcesMenu(true)}
                onMouseLeave={() => setShowResourcesMenu(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-md ${
                    pathname.startsWith("/resources")
                      ? "text-[#07518a]"
                      : "text-[#07518a]/70 hover:text-[#07518a] hover:bg-[#07518a]/5"
                  }`}
                >
                  Resources
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showResourcesMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showResourcesMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[92vw] max-w-7xl z-[1100] whitespace-normal"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex">
                        <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 content-start">
                          {RESOURCES_MENU.map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.03 }}
                            >
                              <Link
                                href={item.href}
                                onClick={() => setShowResourcesMenu(false)}
                                className="group flex items-start gap-4 p-3.5 rounded-xl hover:bg-[#07518a]/5 transition-all duration-300 relative overflow-hidden border border-transparent hover:border-[#07518a]/10"
                              >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#07518a] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#07518a]/5 flex items-center justify-center text-[#07518a] group-hover:bg-[#07518a] group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                                  <item.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-gray-800 group-hover:text-[#07518a] transition-colors text-[13px] mb-0.5 leading-tight">
                                    {item.name}
                                  </div>
                                  <p className="text-[10px] text-gray-500 leading-normal group-hover:text-gray-700 transition-colors line-clamp-2">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>

                        {/* Featured Section */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="w-[280px] relative overflow-hidden flex flex-col border-l border-gray-100 bg-gradient-to-b from-gray-50/50 to-white"
                        >
                          <div className="relative z-10 flex flex-col h-full p-8">
                            {/* Top Section with Rectangular Image */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                                About BTL
                              </h4>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-100 shadow-lg"
                              >
                                <Image
                                  src="/3083.jpg"
                                  alt="BTL Technology"
                                  fill
                                  sizes="280px"
                                  className="object-cover"
                                />
                              </motion.div>
                            </div>

                            {/* Bottom Aligned Content */}
                            <div className="mt-auto space-y-8">
                              <div className="space-y-6">
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className="relative h-14 w-full flex items-center justify-start"
                                >
                                  <Image
                                    src="/highbtlogo-tm-1.png"
                                    alt="BTL Logo"
                                    width={180}
                                    height={50}
                                    className="w-auto h-full max-h-12 object-contain"
                                  />
                                </motion.div>

                                <div className="space-y-4">
                                  <h5 className="text-[15px] font-bold text-[#07518a] flex items-center gap-3">
                                    Intelligence in Motion
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#07518a] opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#07518a]"></span>
                                    </span>
                                  </h5>
                                  <p className="text-[10px] text-gray-600 leading-relaxed font-medium">
                                    Pioneering AI-driven intelligence solutions
                                    for a smarter and safer future.
                                  </p>

                                  <div className="flex flex-wrap gap-2 pt-2">
                                    {["AI Solutions", "Surveillance", "Innovation"].map(
                                      (tag) => (
                                        <span
                                          key={tag}
                                          className="text-[9px] font-bold bg-white text-[#07518a] px-3 py-1 rounded-full border border-[#07518a]/10 shadow-sm transition-all cursor-default"
                                        >
                                          {tag}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="pt-2">
                                <Link
                                  href="/brochure"
                                  onClick={() => setShowResourcesMenu(false)}
                                  className="w-full py-3.5 px-4 bg-[#07518a] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#07518a]/20 hover:shadow-xl hover:shadow-[#07518a]/30 transition-all flex items-center justify-center gap-2 group overflow-hidden relative"
                                >
                                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]" />
                                  <span className="relative z-10">
                                    Download Brochure
                                  </span>
                                  <Download className="w-4 h-4 relative z-10" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services */}
              <Link
                href="/services"
                className={`relative shrink-0 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-md ${
                  pathname.startsWith("/services")
                    ? "text-[#07518a]"
                    : "text-[#07518a]/70 hover:text-[#07518a] hover:bg-[#07518a]/5"
                }`}
              >
                Services
                {pathname.startsWith("/services") && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#07518a]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={`relative shrink-0 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-md ${
                  pathname === "/contact"
                    ? "text-[#07518a]"
                    : "text-[#07518a]/70 hover:text-[#07518a] hover:bg-[#07518a]/5"
                }`}
              >
                Contact
                {pathname === "/contact" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#07518a]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-[#07518a]/10"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU - Fixed Position */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-[999] md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-[1001] md:hidden overflow-y-auto shadow-2xl"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#07518a]">
                <div className="flex items-center gap-3">
                  <Image
                    src="/highbtlogo-white-tm.png"
                    alt="Brihaspathi Logo"
                    width={160}
                    height={50}
                    className="w-auto h-10 sm:h-11 object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="px-4 py-6 space-y-2">
                {/* Home */}
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    pathname === "/"
                      ? "bg-[#07518a] text-white shadow-lg"
                      : "text-gray-700 hover:bg-[#07518a]/5 active:bg-[#07518a]/10"
                  }`}
                >
                  Home
                  {pathname === "/" && <ArrowRight className="w-5 h-5" />}
                </Link>

                {/* About Us Accordion */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      pathname.startsWith("/about")
                        ? "bg-[#07518a]/10 text-[#07518a]"
                        : "text-gray-700 hover:bg-[#07518a]/5 active:bg-[#07518a]/10"
                    }`}
                  >
                    About Us
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        mobileAboutOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileAboutOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pl-2 pt-2 space-y-1">
                          {ABOUT_MENU.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-[#07518a] hover:bg-[#07518a]/5 rounded-lg transition-all active:bg-[#07518a]/10"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-[#07518a]"></div>
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Solutions Accordion */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      pathname.startsWith("/solutions")
                        ? "bg-[#07518a]/10 text-[#07518a]"
                        : "text-gray-700 hover:bg-[#07518a]/5 active:bg-[#07518a]/10"
                    }`}
                  >
                    Solutions
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        mobileSolutionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileSolutionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pl-2 pt-2 space-y-4">
                          {Object.entries(groupedSolutions).map(
                            ([category, items]) => (
                              <div key={category}>
                                <div className="px-4 py-2 text-xs font-bold text-[#07518a] uppercase tracking-wider">
                                  {category}
                                </div>
                                <div className="space-y-1">
                                  {items.map((item) => (
                                    <Link
                                      key={item.id}
                                      href={`/solutions/${item.slug}`}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-[#07518a] hover:bg-[#07518a]/5 rounded-lg transition-all active:bg-[#07518a]/10"
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#07518a]"></div>
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Products Accordion */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      pathname.startsWith("/product") || pathname.startsWith("/products")
                        ? "bg-[#07518a]/10 text-[#07518a]"
                        : "text-gray-700 hover:bg-[#07518a]/5 active:bg-[#07518a]/10"
                    }`}
                  >
                    Products
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        mobileProductsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pl-2 pt-2 space-y-1">
                          {finalProductsList.map((product) => (
                            <Link
                              key={product.slug}
                              href={getProductHref(product.slug)}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-[#07518a] hover:bg-[#07518a]/5 rounded-lg transition-all active:bg-[#07518a]/10"
                            >
                              <ProductIconOrImage bannerImage={product.bannerImage} name={product.name} slug={product.slug} size="small" />
                              <span>{product.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Resources Accordion */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:bg-[#07518a]/5 active:bg-[#07518a]/10 transition-all"
                  >
                    Resources
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        mobileResourcesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileResourcesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pl-2 pt-2 space-y-1">
                          {RESOURCES_MENU.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-start gap-4 px-4 py-3 text-sm text-gray-600 hover:text-[#07518a] hover:bg-[#07518a]/5 rounded-xl transition-all active:bg-[#07518a]/10"
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#07518a]/5 flex items-center justify-center text-[#07518a] mt-0.5">
                                <item.icon className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium text-gray-700">
                                  {item.name}
                                </span>
                                <span className="text-[11px] text-gray-500 leading-tight line-clamp-2">
                                  {item.description}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Services */}
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    pathname.startsWith("/services")
                      ? "bg-[#07518a] text-white shadow-lg"
                      : "text-gray-700 hover:bg-[#07518a]/5 active:bg-[#07518a]/10"
                  }`}
                >
                  Services
                  {pathname.startsWith("/services") && (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </Link>

                {/* Contact */}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    pathname === "/contact"
                      ? "bg-[#07518a] text-white shadow-lg"
                      : "text-gray-700 hover:bg-[#07518a]/5 active:bg-[#07518a]/10"
                  }`}
                >
                  Contact
                  {pathname === "/contact" && <ArrowRight className="w-5 h-5" />}
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}