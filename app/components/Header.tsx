// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, ChevronDown } from "lucide-react";
// import useSWR from "swr";
// import { SplineScene } from "@/components/splite";

// /* === BRAND === */
// const BRAND = "#07518a";
// const WHITE_LOGO = "/highbtlogo white- tm.png";
// const BLUE_LOGO = "/highbtlogo tm (1).png"; 



// /* === TYPES === */
// interface MenuItem {
//   label: string;
//   to: string;
// }

// interface MenuConfig {
//   name: string;
//   label: string;
//   to?: string;
//   mega?: boolean;
//   submenu?: MenuItem[];
// }

// interface CategoryData {
//   title: string;
//   slug: string;
//   type: string;
//   items: Array<{
//     title: string;
//     slug: string;
//     image?: string;
//   }>;
// }

// interface StrapiItem {
//   title: string;
//   slug: string;
//   image?: {
//     url: string;
//   };
//   category?: {
//     title: string;
//     slug: string;
//     type: string;
//   };
// }

// interface StrapiResponse {
//   data: StrapiItem[];
// }

// /* === API Fetcher === */
// const fetcher = (url: string): Promise<StrapiResponse> =>
//   fetch(url).then((res) => res.json());

// /* === MEGA MENU COMPONENT (SHADCN STYLE) === */
// const MegaMenu: React.FC<{
//   isOpen: boolean;
//   data: CategoryData[];
//   categoryType: string;
//   onClose: () => void;
// }> = ({ isOpen, data, categoryType, onClose }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 10 }}
//         transition={{ duration: 0.2 }}
//         className="absolute left-1/2 top-full z-[90] mt-3 w-screen max-w-6xl -translate-x-1/2"
//         onMouseLeave={onClose}
//       >
//         {/* <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
//             {data.map((category) => (
//               <div key={category.slug} className="space-y-3">
//                 <h3 className="text-sm font-semibold text-[#07518a] uppercase tracking-wide">
//                   {category.title}
//                 </h3>
//                 <ul className="space-y-2">
//                   {category.items.map((item) => (
//                     <li key={item.slug}>
//                       <Link
//                         href={`/${categoryType}s/${category.slug}/${item.slug}`}
//                         onClick={onClose}
//                         className="group block rounded-md p-2 transition-colors hover:bg-gray-50"
//                       >
//                         <div className="text-sm font-medium text-gray-900 group-hover:text-[#07518a]">
//                           {item.title}
//                         </div>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div> */}
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// /* === SMALL DROPDOWN MENU (SHADCN STYLE) === */
// const SmallMenu: React.FC<{
//   isOpen: boolean;
//   items: MenuItem[];
//   onClose: () => void;
// }> = ({ isOpen, items, onClose }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0, y: 6 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 6 }}
//         transition={{ duration: 0.2 }}
//         className="absolute left-1/2 top-full z-[90] mt-3 w-60 -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
//         onMouseLeave={onClose}
//       >
//         <ul className="space-y-1">
//           {items.map((item) => (
//             <li key={item.to}>
//               <Link
//                 href={item.to}
//                 onClick={onClose}
//                 className="block rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#07518a]"
//               >
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// /* === MOBILE MENU === */
// const MobileMenu: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   menu: MenuConfig[];
//   pathname: string | null;
//   megaData: CategoryData[];
// }> = ({ isOpen, onClose, menu, pathname, megaData }) => {
//   const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 z-[98] bg-black/50 backdrop-blur-sm"
//             onClick={onClose}
//           />

//           {/* Menu */}
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 30, stiffness: 300 }}
//             className="fixed right-0 top-0 z-[99] h-full w-[85%] max-w-sm bg-white shadow-2xl"
//           >
//             <div className="flex h-full flex-col">
//               {/* Header */}
//               <div className="flex items-center justify-between border-b border-gray-200 p-6">
//                 <Image src={BLUE_LOGO} alt="Logo" width={150} height={40} />
//                 <button
//                   onClick={onClose}
//                   className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
//                   aria-label="Close menu"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Menu Items */}
//               <div className="flex-1 overflow-y-auto p-6">
//                 <div className="space-y-2">
//                   {menu.map((m) => (
//                     <div key={m.name}>
//                       {m.submenu || m.mega ? (
//                         <>
//                           <button
//                             onClick={() =>
//                               setExpandedMenu(
//                                 expandedMenu === m.name ? null : m.name
//                               )
//                             }
//                             className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-100"
//                           >
//                             {m.label}
//                             <ChevronDown
//                               className={`h-4 w-4 transition-transform ${
//                                 expandedMenu === m.name ? "rotate-180" : ""
//                               }`}
//                             />
//                           </button>
//                           <AnimatePresence>
//                             {expandedMenu === m.name && (
//                               <motion.div
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: "auto", opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 transition={{ duration: 0.2 }}
//                                 className="overflow-hidden pl-4"
//                               >
//                                 {m.submenu ? (
//                                   m.submenu.map((sub) => (
//                                     <Link
//                                       key={sub.to}
//                                       href={sub.to}
//                                       onClick={onClose}
//                                       className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-[#07518a]"
//                                     >
//                                       {sub.label}
//                                     </Link>
//                                   ))
//                                 ) : m.mega ? (
//                                   <div className="space-y-3 py-2">
//                                     {megaData
//                                       .filter(
//                                         (c: CategoryData) =>
//                                           c.type === m.name.slice(0, -1)
//                                       )
//                                       .map((category) => (
//                                         <div key={category.slug}>
//                                           <div className="px-4 py-1 text-xs font-semibold uppercase text-[#07518a]">
//                                             {category.title}
//                                           </div>
//                                           {category.items.map((item) => (
//                                             <Link
//                                               key={item.slug}
//                                               href={`/${
//                                                 m.name === "products"
//                                                   ? "product"
//                                                   : "service"
//                                               }s/${category.slug}/${item.slug}`}
//                                               onClick={onClose}
//                                               className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-[#07518a]"
//                                             >
//                                               {item.title}
//                                             </Link>
//                                           ))}
//                                         </div>
//                                       ))}
//                                   </div>
//                                 ) : null}
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </>
//                       ) : (
//                         <Link
//                           href={m.to || "#"}
//                           onClick={onClose}
//                           className={`block rounded-lg px-4 py-3 font-medium transition-colors ${
//                             pathname === m.to
//                               ? "bg-[#07518a]/10 text-[#07518a]"
//                               : "text-gray-700 hover:bg-gray-100"
//                           }`}
//                         >
//                           {m.label}
//                         </Link>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// /* === HEADER COMPONENT === */
// export default function Header() {
//   const pathname = usePathname();
//    const isHome = pathname === "/";
//   const [bgProgress, setBgProgress] = useState<number>(0);
//   const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
//   const [mobileOpen, setMobileOpen] = useState<boolean>(false);
//   const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

//   /* === STRAPI API DATA === */
//   const { data: apiData } = useSWR<StrapiResponse>(
//     "http://172.30.0.200:1334/api/items?populate[0]=image&populate[1]=category",
//     fetcher
//   );

//   /* === Format Mega Menu Data === */
//   const megaData = useMemo<CategoryData[]>(() => {
//     if (!apiData?.data) return [];
//     const grouped: Record<string, CategoryData> = {};

//     apiData.data.forEach((item: StrapiItem) => {
//       const cat = item.category;
//       if (!cat?.slug) return;

//       if (!grouped[cat.slug]) {
//         grouped[cat.slug] = {
//           title: cat.title,
//           slug: cat.slug,
//           type: cat.type,
//           items: [],
//         };
//       }

//       grouped[cat.slug].items.push({
//         title: item.title,
//         slug: item.slug,
//         image: item.image?.url,
//       });
//     });

//     return Object.values(grouped);
//   }, [apiData]);

//   /* === Scroll Animation === */
//   useEffect(() => {
//     const handleScroll = () => {
//       setBgProgress(Math.min(1, window.scrollY / 140));
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // REVERSED: Initially white (bgProgress = 0), then blue when scrolled
//   const onDark = bgProgress >= 0.45;

//   /* === Static Menus === */
//   const menu: MenuConfig[] = [
//     { name: "home", label: "Home", to: "/" },
//     { name: "products", label: "Products", mega: true },
//     { name: "services", label: "Services", mega: true },
//     {
//       name: "solutions",
//       label: "Solutions",
//       submenu: [
//         { label: "AI Video Analytics", to: "/solutions/video-analytics" },
//         { label: "Access Control", to: "/solutions/access-control" },
//         { label: "Smart Retail", to: "/solutions/smart-retail" },
//         { label: "Smart Bus", to: "/solutions/smart-bus" },
//       ],
//     },
//     {
//       name: "about",
//       label: "About",
//       submenu: [
//         { label: "Who We Are", to: "/about/who-we-are" },
//         { label: "Our Journey", to: "/about/our-journey" },
//         { label: "Our Managing Director", to: "/about/founder" },
//         { label: "Board of Directors", to: "/about/boardofdirectors" },
//         { label: "Our Team", to: "/about/ourteam" },
//       ],
//     },
//     { name: "contact", label: "Contact", to: "/contact" },
//   ];

//   const active = menu.find((m) => m.to && pathname?.startsWith(m.to)) || menu[0];

//   /* === Hover Events === */
//   const handleMouseEnter = (name: string) => {
//     if (hoverTimeout.current) {
//       clearTimeout(hoverTimeout.current);
//     }
//     hoverTimeout.current = setTimeout(() => setDropdownOpen(name), 80);
//   };

//   const handleMouseLeave = () => {
//     if (hoverTimeout.current) {
//       clearTimeout(hoverTimeout.current);
//     }
//     hoverTimeout.current = setTimeout(() => setDropdownOpen(null), 150);
//   };

//   /* === Cleanup on unmount === */
//   useEffect(() => {
//     return () => {
//       if (hoverTimeout.current) {
//         clearTimeout(hoverTimeout.current);
//       }
//     };
//   }, []);

//   return (
//     <>
//       {/* Scroll Progress Bar */}
//       <motion.div
//         className="fixed left-0 top-0 z-[100] h-[4px] w-full origin-left "
//         style={{
//           background: BRAND,
//           scaleX: bgProgress,
//           opacity: bgProgress > 0.02 ? 1 : 0,
//         }}
//       />

//       {/* Header - REVERSED: white initially, blue on scroll */}
//       <nav className="fixed top-0 w-full h-[85px] z-[95] backdrop-blur-md ">
//         <div
//           className="absolute inset-0 -z-10 transition-all duration-300 "
//           style={{
//             background: onDark ? BRAND : "transparent",

//           }}
//         />

//         <div className="max-w-[1400px] mx-auto h-full px-6 flex items-center justify-between ">
//           {/* Logo - REVERSED: blue initially, white on scroll */}
//           <Link href="/" className="flex items-center">
//             <Image
//               src={onDark ? WHITE_LOGO : BLUE_LOGO}
//               alt="Logo"
//               width={220}
//               height={50}
//               priority
//             />
//           </Link>

//           {/* Desktop Nav - REVERSED: dark text initially, white on scroll */}
//           <div className="hidden lg:flex items-center gap-3 ">
//             {menu.map((m) => (
//               <div
//                 key={m.name}
//                 className="relative"
//                 onMouseEnter={() => handleMouseEnter(m.name)}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <Link
//                   href={m.to || "#"}
//                   className={`flex items-center gap-1 px-4 py-2 font-medium transition-all duration-200 ${
//                     onDark
//                       ? active.name === m.name
//                         ? "text-white"
//                         : "text-white/90 hover:text-white"
//                       : active.name === m.name
//                       ? "text-[#07518a]"
//                       : "text-gray-700 hover:text-[#07518a]"
//                   }`}
//                 >
//                   {m.label}
//                   {(m.submenu || m.mega) && (
//                     <ChevronDown
//                       className={`w-4 h-4 transition-transform duration-200 ${
//                         dropdownOpen === m.name ? "rotate-180" : ""
//                       }`}
//                     />
//                   )}
//                 </Link>

//                 {/* Mega Menu */}
//                 {m.mega && (
//                   <MegaMenu
//                     isOpen={dropdownOpen === m.name}
//                     data={megaData.filter(
//                       (c: CategoryData) => c.type === m.name.slice(0, -1)
//                     )}
//                     categoryType={m.name === "products" ? "product" : "service"}
//                     onClose={() => setDropdownOpen(null)}
//                   />
//                 )}

//                 {/* Small Menu */}
//                 {m.submenu && (
//                   <SmallMenu
//                     isOpen={dropdownOpen === m.name}
//                     items={m.submenu}
//                     onClose={() => setDropdownOpen(null)}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Mobile Icon - REVERSED: dark initially, white on scroll */}
//           <button
//             onClick={() => setMobileOpen(true)}
//             className={`lg:hidden p-2 rounded-md transition-colors ${
//               onDark
//                 ? "text-white hover:bg-white/10"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`}
//             aria-label="Open menu"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <MobileMenu
//         isOpen={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//         menu={menu}
//         pathname={pathname}
//         megaData={megaData}
//       />

//       {/* Spacer */}
    
     
//     </>
//   );
// }

// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, ChevronDown } from "lucide-react";
// import useSWR from "swr";

// /* === BRAND === */
// const BRAND = "#07518a";
// const WHITE_LOGO = "/highbtlogo white- tm.png";
// const BLUE_LOGO = "/highbtlogo tm (1).png";

// /* === TYPES === */
// interface MenuItem {
//   label: string;
//   to: string;
// }

// interface MenuConfig {
//   name: string;
//   label: string;
//   to?: string;
//   mega?: boolean;
//   submenu?: MenuItem[];
// }

// interface CategoryData {
//   title: string;
//   slug: string;
//   type: string;
//   items: Array<{
//     title: string;
//     slug: string;
//     image?: string;
//   }>;
// }

// interface StrapiItem {
//   title: string;
//   slug: string;
//   image?: {
//     url: string;
//   };
//   category?: {
//     title: string;
//     slug: string;
//     type: string;
//   };
// }

// interface StrapiResponse {
//   data: StrapiItem[];
// }

// /* === API Fetcher === */
// const fetcher = (url: string): Promise<StrapiResponse> =>
//   fetch(url).then((res) => res.json());

// /* === MEGA MENU === */
// const MegaMenu: React.FC<{
//   isOpen: boolean;
//   data: CategoryData[];
//   categoryType: string;
//   onClose: () => void;
// }> = ({ isOpen, onClose }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 10 }}
//         transition={{ duration: 0.2 }}
//         className="absolute left-1/2 top-full z-[90] mt-3 w-screen max-w-6xl -translate-x-1/2"
//         onMouseLeave={onClose}
//       />
//     )}
//   </AnimatePresence>
// );

// /* === SMALL MENU === */
// const SmallMenu: React.FC<{
//   isOpen: boolean;
//   items: MenuItem[];
//   onClose: () => void;
// }> = ({ isOpen, items, onClose }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0, y: 6 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 6 }}
//         transition={{ duration: 0.2 }}
//         className="absolute left-1/2 top-full z-[90] mt-3 w-60 -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
//         onMouseLeave={onClose}
//       >
//         <ul className="space-y-1">
//           {items.map((item) => (
//             <li key={item.to}>
//               <Link
//                 href={item.to}
//                 onClick={onClose}
//                 className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#07518a]"
//               >
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// /* === MOBILE MENU === */
// const MobileMenu: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   menu: MenuConfig[];
//   pathname: string | null;
//   megaData: CategoryData[];
// }> = ({ isOpen, onClose, menu, pathname, megaData }) => {
//   const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             className="fixed inset-0 z-[98] bg-black/50 backdrop-blur-sm"
//             onClick={onClose}
//           />

//           <motion.div
//             className="fixed right-0 top-0 z-[99] h-full w-[85%] max-w-sm bg-white shadow-2xl"
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//           >
//             {/* mobile content unchanged */}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// /* === HEADER === */
// export default function Header() {
//   const pathname = usePathname() || "/";
//   const isHome = pathname === "/";

//   const [bgProgress, setBgProgress] = useState(0);
//   const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

//   const { data: apiData } = useSWR<StrapiResponse>(
//     "http://172.30.0.200:1334/api/items?populate[0]=image&populate[1]=category",
//     fetcher
//   );

//   useEffect(() => {
//     const onScroll = () =>
//       setBgProgress(Math.min(1, window.scrollY / 140));
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // ✅ FINAL FIX
//   const onDark = !isHome || bgProgress >= 0.45;

//   return (
//     <>
//       <motion.div
//         className="fixed top-0 left-0 z-[100] h-[4px] w-full origin-left"
//         style={{ scaleX: bgProgress, background: BRAND }}
//       />

//       <nav className="fixed top-0 z-[95] h-[85px] w-full backdrop-blur-md">
//         <div
//           className="absolute inset-0 -z-10 transition-all duration-300"
//           style={{ background: onDark ? BRAND : "transparent" }}
//         />

//         <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6">
//           <Image
//             src={onDark ? WHITE_LOGO : BLUE_LOGO}
//             alt="Logo"
//             width={220}
//             height={50}
//           />
//         </div>
//       </nav>
//     </>
//   );
// }
"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { SplineSceneBasic } from "@/components/Aidemo";

export default function HeaderHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <header
      id="home"
      ref={sectionRef}
      className="relative w-full overflow-hidden h-[100vh] flex items-center"
    >
      <SplineSceneBasic />
    </header>
  );
}
