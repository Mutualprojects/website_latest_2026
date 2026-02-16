"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";


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
  {id:1, name:"About us",href:"/about"},
  { id: 2, name: "Who We Are", href: "/about/who-we-are" },
  { id: 5, name: "Board of Directors", href: "/about/Board_of_directors" },
  { id: 4, name: "Our Team", href: "/about/our-team" },
  { id: 3, name: "Our Journey", href: "/about/ourjourney" },
  { id: 6, name: "Chairman & Managing Director", href: "/about/our-cmd" },
];

const RESOURCES_MENU: AboutItem[] = [
  { id: 1, name: "Our Events", href: "/ourevents" },
  { id: 2, name: "News", href: "/news" },
  { id: 7, name: "Government Projects", href: "/govt-projects" },
  { id: 3, name: "Our Projects", href: "/our-projects" },
  { id: 4, name: "Media", href: "/media" },
  { id: 5, name: "Case Studies", href: "/casestudy" },
  { id: 6, name: "CSR Initiatives", href: "/resources/csr" },
];

/* ========================= COMPONENT ========================= */
export function NavigationMenuDemo() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showSolutionsMenu, setShowSolutionsMenu] = React.useState(false);
  const [showAboutMenu, setShowAboutMenu] = React.useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = React.useState(false);

  // Mobile accordion states
  const [mobileAboutOpen, setMobileAboutOpen] = React.useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = React.useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = React.useState(false);

  const pathname = usePathname();

  /* === Lock body scroll and reset menus on mobile open/close === */
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      // Reset all accordion states when mobile menu opens
      setMobileAboutOpen(false);
      setMobileSolutionsOpen(false);
      setMobileResourcesOpen(false);
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${headerBg}`}
        style={{ transform: "translateZ(0)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* LOGO */}
            <Link href="/" className="flex-shrink-0 relative z-10">
              <Image
                src={logoSrc}
                alt="Company Logo"
                width={140}
                height={45}
                className="h-10 md:h-12 w-auto transition-all duration-300"
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

              {/* About Us Dropdown */}
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
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAboutMenu ? "rotate-180" : ""}`} />
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

              {/* Solutions Mega Menu */}
              <div
                className="relative shrink-0 pb-2"
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
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showSolutionsMenu ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {showSolutionsMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-screen max-w-5xl z-[1100]"
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-8 overflow-hidden">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                          {Object.entries(groupedSolutions).map(([category, items]) => (
                            <motion.div
                              key={category}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* <div className="flex items-center gap-2 mb-4">
                                <div className="h-1 w-8 bg-[#07518a] rounded-full"></div>
                                <h3 className="font-bold text-[#07518a] text-sm uppercase tracking-wide">
                                  {category}
                                </h3>
                              </div> */}
                              <ul className="space-y-3">
                                {items.map((item) => (
                                  <li key={item.id}>
                                    <Link
                                      href={`/solutions/${item.slug}`}
                                      className="group block p-3 rounded-lg hover:bg-[#07518a]/5 transition-all duration-200"
                                    >
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                          <div className="font-semibold text-gray-900 group-hover:text-[#07518a] transition-colors mb-1">
                                            {item.name}
                                          </div>
                                          {item.description && (
                                            <div className="text-xs text-gray-500 group-hover:text-gray-600">
                                              {item.description}
                                            </div>
                                          )}
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-[#07518a] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0 mt-1" />
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* View All Solutions CTA */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <Link
                            href="/solutions"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#07518a] text-white font-semibold rounded-lg hover:bg-[#064374] transition-all duration-200 group"
                          >
                            View All Solutions
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources Dropdown */}
              <div
                className="relative shrink-0 pb-2"
                onMouseEnter={() => setShowResourcesMenu(true)}
                onMouseLeave={() => setShowResourcesMenu(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-md ${
                    "text-[#07518a]/70 hover:text-[#07518a] hover:bg-[#07518a]/5"
                  }`}
                >
                  Resources
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showResourcesMenu ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {showResourcesMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full pt-2 min-w-[240px] z-[1100]"
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 overflow-hidden">
                        {RESOURCES_MENU.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
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

              {/* Services */}
              <Link
                href="/our-services"
                className={`relative shrink-0 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-md ${
                  pathname === "/our-services" || pathname.startsWith("/our-services")
                    ? "text-[#07518a]"
                    : "text-[#07518a]/70 hover:text-[#07518a] hover:bg-[#07518a]/5"
                }`}
              >
                Services
                {(pathname === "/our-services" || pathname.startsWith("/our-services")) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#07518a]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>

              {/* Products */}
              {/* <Link
                href="/product"
                className={`relative px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-md ${
                  pathname === "/product"
                    ? "text-[#07518a]"
                    : "text-[#07518a]/70 hover:text-[#07518a] hover:bg-[#07518a]/5"
                }`}
              >
                Products
                {pathname === "/product" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#07518a]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link> */}

              {/* Contact - Regular Link */}
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
                    alt="Logo"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
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
                          {Object.entries(groupedSolutions).map(([category, items]) => (
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

                {/* Services */}
                <Link
                  href="/our-services"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    pathname === "/our-services" || pathname.startsWith("/our-services")
                      ? "bg-[#07518a] text-white shadow-lg"
                      : "text-gray-700 hover:bg-[#07518a]/5 active:bg-[#07518a]/10"
                  }`}
                >
                  Services
                  {(pathname === "/our-services" || pathname.startsWith("/our-services")) && <ArrowRight className="w-5 h-5" />}
                </Link>

                {/* Products */}
                <Link
                  href="/product"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    pathname === "/product"
                      ? "bg-[#07518a] text-white shadow-lg"
                      : "text-gray-700 hover:bg-[#07518a]/5 active:bg-[#07518a]/10"
                  }`}
                >
                  Products
                  {pathname === "/product" && <ArrowRight className="w-5 h-5" />}
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