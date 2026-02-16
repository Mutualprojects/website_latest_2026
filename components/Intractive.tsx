// // 'use client';

// // import React, { useEffect, useRef, useState, useCallback } from 'react';
// // import { Card, CardContent } from '@/components/ui/card';
// // import Image, { StaticImageData } from 'next/image';
// // import { ChevronLeft, ChevronRight } from 'lucide-react';

// // /* ---------------- SLIDE DATA ---------------- */
// // import Bussolution from '@/components/Sollutionimages/image.png';

// // type Slide = {
// //   title: string;
// //   description: string;
// //   image: StaticImageData | string;
// //   bgColor: string;
// //   textColor: string;
// // };

// // const slidesData: Slide[] = [
// //   {
// //     title: 'Generate Code with AI',
// //     description:
// //       'Describe your logic in plain English and watch as the AI generates clean, efficient code in seconds.',
// //     image: Bussolution,
// //     bgColor: '#07518a',
// //     textColor: '#ffffff',
// //   },
// //   {
// //     title: 'Debug and Refactor Smarter',
// //     description:
// //       'Paste your buggy code and let the AI identify errors, suggest improvements, and refactor it.',
// //     image:
// //       'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop',
// //     bgColor: '#ffffff',
// //     textColor: '#07518a',
// //   },
// //   {
// //     title: 'Learn New Languages, Instantly',
// //     description:
// //       'Translate code snippets between languages and understand new paradigms instantly.',
// //     image:
// //       'https://images.unsplash.com/photo-1608306448197-e83633f1261c?q=80&w=1974&auto=format&fit=crop',
// //     bgColor: '#07518a',
// //     textColor: '#ffffff',
// //   },
// //   {
// //     title: 'Automate Your Workflow',
// //     description:
// //       'From documentation to unit tests, let AI handle repetitive tasks.',
// //     image:
// //       'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
// //     bgColor: '#ffffff',
// //     textColor: '#07518a',
// //   },
// // ];

// // export function ScrollingFeatureShowcase() {
// //   const containerRef = useRef<HTMLDivElement | null>(null);
// //   const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
// //   const isScrollingRef = useRef(false);

// //   const touchStartY = useRef<number | null>(null);
// //   const touchEndY = useRef<number | null>(null);

// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [isUserScrolling, setIsUserScrolling] = useState(false);
// //   const [windowHeight, setWindowHeight] = useState(0);

// //   const totalSlides = slidesData.length;

// //   /* ---------- RESPONSIVE WINDOW HEIGHT ---------- */
// //   useEffect(() => {
// //     const updateWindowHeight = () => {
// //       setWindowHeight(window.innerHeight);
// //     };

// //     updateWindowHeight();
// //     window.addEventListener('resize', updateWindowHeight);
// //     return () => window.removeEventListener('resize', updateWindowHeight);
// //   }, []);

// //   /* ---------- SCROLL HANDLER ---------- */
// //   useEffect(() => {
// //     const container = containerRef.current;
// //     if (!container || !windowHeight) return;

// //     const onScroll = () => {
// //       if (isScrollingRef.current) return;

// //       const scrollPosition = container.scrollTop;
// //       const index = Math.round(scrollPosition / windowHeight);
      
// //       const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
      
// //       if (clampedIndex !== activeIndex) {
// //         setActiveIndex(clampedIndex);
// //         setIsUserScrolling(true);
// //       }

// //       if (autoScrollTimer.current) {
// //         clearTimeout(autoScrollTimer.current);
// //       }
      
// //       autoScrollTimer.current = setTimeout(() => {
// //         setIsUserScrolling(false);
// //       }, 1500);
// //     };

// //     container.addEventListener('scroll', onScroll, { passive: true });
    
// //     return () => {
// //       container.removeEventListener('scroll', onScroll);
// //       if (autoScrollTimer.current) {
// //         clearTimeout(autoScrollTimer.current);
// //       }
// //     };
// //   }, [totalSlides, windowHeight, activeIndex]);

// //   /* ---------- AUTO SCROLL ---------- */
// //   useEffect(() => {
// //     if (isUserScrolling || activeIndex >= totalSlides - 1 || !windowHeight) return;
    
// //     const container = containerRef.current;
// //     if (!container) return;

// //     const timer = setTimeout(() => {
// //       container.scrollTo({
// //         top: (activeIndex + 1) * windowHeight,
// //         behavior: 'smooth',
// //       });
// //     }, 3200);

// //     return () => clearTimeout(timer);
// //   }, [activeIndex, isUserScrolling, totalSlides, windowHeight]);

// //   /* ---------- TOUCH (MOBILE SWIPE) ---------- */
// //   const handleTouchStart = (e: React.TouchEvent) => {
// //     touchStartY.current = e.touches[0].clientY;
// //   };

// //   const handleTouchMove = (e: React.TouchEvent) => {
// //     touchEndY.current = e.touches[0].clientY;
// //   };

// //   const handleTouchEnd = () => {
// //     if (touchStartY.current === null || touchEndY.current === null) return;

// //     const delta = touchStartY.current - touchEndY.current;

// //     if (Math.abs(delta) > 60) {
// //       if (delta > 0 && activeIndex < totalSlides - 1) {
// //         scrollToIndex(activeIndex + 1);
// //       }
// //       if (delta < 0 && activeIndex > 0) {
// //         scrollToIndex(activeIndex - 1);
// //       }
// //     }

// //     touchStartY.current = null;
// //     touchEndY.current = null;
// //   };

// //   /* ---------- NAVIGATION FUNCTIONS ---------- */
// //   const scrollToIndex = useCallback((index: number) => {
// //     if (index < 0 || index >= totalSlides) return;
    
// //     const container = containerRef.current;
// //     if (!container || !windowHeight) return;
    
// //     isScrollingRef.current = true;
    
// //     container.scrollTo({
// //       top: index * windowHeight,
// //       behavior: 'smooth',
// //     });
    
// //     setActiveIndex(index);
// //     setIsUserScrolling(true);
    
// //     if (autoScrollTimer.current) {
// //       clearTimeout(autoScrollTimer.current);
// //     }
    
// //     autoScrollTimer.current = setTimeout(() => {
// //       setIsUserScrolling(false);
// //       isScrollingRef.current = false;
// //     }, 1000);
// //   }, [totalSlides, windowHeight]);

// //   const goToNextSlide = useCallback(() => {
// //     const nextIndex = activeIndex + 1;
// //     if (nextIndex < totalSlides) {
// //       scrollToIndex(nextIndex);
// //     }
// //   }, [activeIndex, totalSlides, scrollToIndex]);

// //   const goToPrevSlide = useCallback(() => {
// //     const prevIndex = activeIndex - 1;
// //     if (prevIndex >= 0) {
// //       scrollToIndex(prevIndex);
// //     }
// //   }, [activeIndex, scrollToIndex]);

// //   /* ---------- KEYBOARD NAVIGATION ---------- */
// //   useEffect(() => {
// //     const handleKeyDown = (e: KeyboardEvent) => {
// //       if (e.key === 'ArrowDown' || e.key === ' ') {
// //         e.preventDefault();
// //         goToNextSlide();
// //       } else if (e.key === 'ArrowUp') {
// //         e.preventDefault();
// //         goToPrevSlide();
// //       } else if (e.key === 'Home') {
// //         e.preventDefault();
// //         scrollToIndex(0);
// //       } else if (e.key === 'End') {
// //         e.preventDefault();
// //         scrollToIndex(totalSlides - 1);
// //       } else if (e.key >= '1' && e.key <= '9') {
// //         const num = parseInt(e.key);
// //         if (num <= totalSlides) {
// //           scrollToIndex(num - 1);
// //         }
// //       }
// //     };

// //     window.addEventListener('keydown', handleKeyDown);
// //     return () => window.removeEventListener('keydown', handleKeyDown);
// //   }, [goToNextSlide, goToPrevSlide, scrollToIndex, totalSlides]);

// //   /* ---------- DYNAMIC STYLE ---------- */
// //   const dynamicStyles: React.CSSProperties = {
// //     backgroundColor: slidesData[activeIndex]?.bgColor || '#07518a',
// //     color: slidesData[activeIndex]?.textColor || '#ffffff',
// //     transition: 'background-color 0.6s ease, color 0.6s ease',
// //   };

// //   /* ---------------- RENDER ---------------- */
// //   return (
// //     <div
// //       ref={containerRef}
// //       className="h-screen w-full overflow-y-auto scroll-smooth"
// //       style={{ 
// //         scrollbarWidth: 'none', 
// //         msOverflowStyle: 'none',
// //         WebkitOverflowScrolling: 'touch'
// //       }}
// //       onTouchStart={handleTouchStart}
// //       onTouchMove={handleTouchMove}
// //       onTouchEnd={handleTouchEnd}
// //     >
// //       {/* Hide scrollbar for all browsers */}
// //       <style jsx>{`
// //         div::-webkit-scrollbar {
// //           display: none;
// //         }
// //       `}</style>

// //       <div style={{ height: `${totalSlides * 100}vh` }}>
// //         <div
// //           className="sticky top-0 h-screen flex items-center justify-center px-4 md:px-0"
// //           style={dynamicStyles}
// //         >
// //           {/* DESKTOP CHEVRON BUTTONS */}
// //           <button
// //             onClick={goToPrevSlide}
// //             disabled={activeIndex === 0}
// //             className={`hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ${
// //               activeIndex === 0
// //                 ? 'opacity-30 cursor-not-allowed'
// //                 : 'opacity-80 hover:opacity-100 hover:scale-110 active:scale-95'
// //             }`}
// //             style={{ 
// //               backgroundColor: slidesData[activeIndex]?.textColor || '#ffffff',
// //               color: slidesData[activeIndex]?.bgColor || '#07518a'
// //             }}
// //             aria-label="Previous slide"
// //           >
// //             <ChevronLeft size={28} />
// //           </button>

// //           <button
// //             onClick={goToNextSlide}
// //             disabled={activeIndex === totalSlides - 1}
// //             className={`hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ${
// //               activeIndex === totalSlides - 1
// //                 ? 'opacity-30 cursor-not-allowed'
// //                 : 'opacity-80 hover:opacity-100 hover:scale-110 active:scale-95'
// //             }`}
// //             style={{ 
// //               backgroundColor: slidesData[activeIndex]?.textColor || '#ffffff',
// //               color: slidesData[activeIndex]?.bgColor || '#07518a'
// //             }}
// //             aria-label="Next slide"
// //           >
// //             <ChevronRight size={28} />
// //           </button>

// //           <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl h-full">
// //             {/* LEFT COLUMN - CONTENT */}
// //             <div className="relative flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 lg:border-r lg:border-black/10">
// //               {/* MOBILE: Header with pagination */}
// //               <div className="lg:hidden flex justify-between items-center mb-8 pt-8">
// //                 <div className="flex gap-1.5">
// //                   {slidesData.map((_, i) => (
// //                     <button
// //                       key={i}
// //                       onClick={() => scrollToIndex(i)}
// //                       className={`h-1 rounded-full transition-all duration-300 ${
// //                         i === activeIndex
// //                           ? 'w-6'
// //                           : 'w-3 opacity-40'
// //                       }`}
// //                       style={{
// //                         backgroundColor: slidesData[activeIndex]?.textColor || '#ffffff'
// //                       }}
// //                       aria-label={`Go to slide ${i + 1}`}
// //                     />
// //                   ))}
// //                 </div>
// //                 <div className="text-sm font-mono">
// //                   <span className="font-bold">{activeIndex + 1}</span>
// //                   <span className="opacity-60">/{totalSlides}</span>
// //                 </div>
// //               </div>

// //               {/* DESKTOP: Pagination Dots */}
// //               <div className="hidden lg:flex absolute top-8 lg:top-16 left-8 lg:left-16 gap-2">
// //                 {slidesData.map((_, i) => (
// //                   <button
// //                     key={i}
// //                     onClick={() => scrollToIndex(i)}
// //                     className={`h-1 rounded-full transition-all duration-300 ${
// //                       i === activeIndex
// //                         ? 'w-8 lg:w-12'
// //                         : 'w-4 lg:w-6 opacity-50 hover:opacity-80'
// //                     }`}
// //                     style={{
// //                       backgroundColor: slidesData[activeIndex]?.textColor || '#ffffff'
// //                     }}
// //                     aria-label={`Go to slide ${i + 1}`}
// //                   />
// //                 ))}
// //               </div>

// //               {/* Slide Content */}
// //               <div className="relative h-auto lg:h-64 mb-12 lg:mb-0">
// //                 {slidesData.map((slide, i) => (
// //                   <div
// //                     key={i}
// //                     className={`absolute inset-0 transition-all duration-500 ${
// //                       i === activeIndex
// //                         ? 'opacity-100 translate-y-0'
// //                         : 'opacity-0 translate-y-6'
// //                     }`}
// //                   >
// //                     <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
// //                       {slide.title}
// //                     </h2>
// //                     <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-2xl opacity-90">
// //                       {slide.description}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* CTA Button */}
// //               <div className="lg:absolute lg:bottom-16 lg:left-16 mt-8 lg:mt-0">
// //                 <a
// //                   href="#get-started"
// //                   className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold uppercase tracking-wide hover:opacity-90 active:opacity-80 transition text-center text-sm sm:text-base"
// //                   style={{
// //                     backgroundColor: slidesData[activeIndex]?.textColor || '#ffffff',
// //                     color: slidesData[activeIndex]?.bgColor || '#07518a'
// //                   }}
// //                 >
// //                   Get Started
// //                 </a>
// //               </div>

// //               {/* DESKTOP: Slide Counter */}
// //               <div className="hidden lg:block absolute bottom-16 right-16">
// //                 <div className="text-base lg:text-lg font-mono">
// //                   <span className="text-2xl font-bold">{activeIndex + 1}</span>
// //                   <span className="opacity-50"> / {totalSlides}</span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* RIGHT COLUMN - IMAGE (DESKTOP ONLY) */}
// //             <div className="hidden lg:flex items-center justify-center p-4 lg:p-8">
// //               <Card className="w-full h-full max-h-[80vh] overflow-hidden shadow-2xl">
// //                 <CardContent className="p-0 h-full">
// //                   <div
// //                     className="h-full w-full transition-transform duration-700 ease-out"
// //                     style={{
// //                       transform: `translateY(-${activeIndex * 100}%)`,
// //                     }}
// //                   >
// //                     {slidesData.map((slide, i) => (
// //                       <div key={i} className="relative h-full w-full">
// //                         <Image
// //                           src={slide.image}
// //                           alt={slide.title}
// //                           fill
// //                           className="object-cover lg:object-contain"
// //                           priority={i === 0}
// //                           sizes="(max-width: 1024px) 100vw, 50vw"
// //                           unoptimized={typeof slide.image === 'string' && slide.image.startsWith('http')}
// //                         />
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             </div>

// //             {/* MOBILE: Image Carousel */}
// //             <div className="lg:hidden w-full mt-8 mb-16">
// //               <Card className="w-full h-64 sm:h-80 md:h-96 overflow-hidden shadow-xl">
// //                 <CardContent className="p-0 h-full">
// //                   <div className="relative h-full w-full">
// //                     {slidesData.map((slide, i) => (
// //                       <div
// //                         key={i}
// //                         className={`absolute inset-0 transition-opacity duration-500 ${
// //                           i === activeIndex ? 'opacity-100' : 'opacity-0'
// //                         }`}
// //                       >
// //                         <Image
// //                           src={slide.image}
// //                           alt={slide.title}
// //                           fill
// //                           className="object-cover"
// //                           priority={i === 0}
// //                           sizes="100vw"
// //                           unoptimized={typeof slide.image === 'string' && slide.image.startsWith('http')}
// //                         />
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           </div>

// //           {/* MOBILE NAVIGATION CONTROLS */}
// //           <div className="lg:hidden absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4 bg-black/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
// //             <button
// //               onClick={goToPrevSlide}
// //               disabled={activeIndex === 0}
// //               className={`p-2 rounded-full transition-all ${
// //                 activeIndex === 0
// //                   ? 'opacity-30 cursor-not-allowed'
// //                   : 'opacity-80 hover:opacity-100 active:scale-95'
// //               }`}
// //               style={{
// //                 backgroundColor: slidesData[activeIndex]?.textColor || '#ffffff',
// //                 color: slidesData[activeIndex]?.bgColor || '#07518a'
// //               }}
// //               aria-label="Previous slide"
// //             >
// //               <ChevronLeft size={20} />
// //             </button>

// //             <div className="flex gap-1.5 sm:gap-2">
// //               {slidesData.map((_, i) => (
// //                 <button
// //                   key={i}
// //                   onClick={() => scrollToIndex(i)}
// //                   className={`h-2 w-2 rounded-full transition-all ${
// //                     i === activeIndex ? 'opacity-100' : 'opacity-30'
// //                   }`}
// //                   style={{
// //                     backgroundColor: slidesData[activeIndex]?.textColor || '#ffffff'
// //                   }}
// //                   aria-label={`Go to slide ${i + 1}`}
// //                 />
// //               ))}
// //             </div>

// //             <button
// //               onClick={goToNextSlide}
// //               disabled={activeIndex === totalSlides - 1}
// //               className={`p-2 rounded-full transition-all ${
// //                 activeIndex === totalSlides - 1
// //                   ? 'opacity-30 cursor-not-allowed'
// //                   : 'opacity-80 hover:opacity-100 active:scale-95'
// //               }`}
// //               style={{
// //                 backgroundColor: slidesData[activeIndex]?.textColor || '#ffffff',
// //                 color: slidesData[activeIndex]?.bgColor || '#07518a'
// //               }}
// //               aria-label="Next slide"
// //             >
// //               <ChevronRight size={20} />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* EXTRA SPACE FOR SCROLLING (DESKTOP ONLY) */}
// //       <div className="hidden lg:block h-[80vh] bg-white" />
      
// //       {/* MOBILE: End indicator */}
// //       <div className="lg:hidden h-20 flex items-center justify-center">
// //         <div className="text-sm text-gray-400">Swipe up for more</div>
// //       </div>
// //     </div>
// //   );
// // } 
// 'use client';

// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
// } from 'react';
// import Image from 'next/image';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { allSolutions } from '@/app/solutions/data';

// /* ================= COMPONENT ================= */

// export function ScrollingFeatureShowcase() {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
//   const isScrollingRef = useRef(false);

//   const touchStartY = useRef<number | null>(null);
//   const touchEndY = useRef<number | null>(null);

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [windowHeight, setWindowHeight] = useState(0);
//   const [isUserScrolling, setIsUserScrolling] = useState(false);

//   const slides = allSolutions || [];
//   const totalSlides = slides.length;

//   /* ================= WINDOW HEIGHT ================= */

//   useEffect(() => {
//     const updateHeight = () => setWindowHeight(window.innerHeight);
//     updateHeight();
//     window.addEventListener('resize', updateHeight);
//     return () => window.removeEventListener('resize', updateHeight);
//   }, []);

//   /* ================= SCROLL HANDLER ================= */

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container || !windowHeight) return;

//     const onScroll = () => {
//       if (isScrollingRef.current) return;

//       const index = Math.round(container.scrollTop / windowHeight);
//       const clamped = Math.max(0, Math.min(index, totalSlides - 1));

//       if (clamped !== activeIndex) {
//         setActiveIndex(clamped);
//         setIsUserScrolling(true);
//       }

//       if (autoScrollTimer.current) clearTimeout(autoScrollTimer.current);

//       autoScrollTimer.current = setTimeout(() => {
//         setIsUserScrolling(false);
//       }, 1200);
//     };

//     container.addEventListener('scroll', onScroll, { passive: true });
//     return () => container.removeEventListener('scroll', onScroll);
//   }, [windowHeight, totalSlides, activeIndex]);

//   /* ================= AUTO SCROLL ================= */

//   useEffect(() => {
//     if (isUserScrolling || activeIndex >= totalSlides - 1) return;

//     const timer = setTimeout(() => {
//       scrollToIndex(activeIndex + 1);
//     }, 3500);

//     return () => clearTimeout(timer);
//   }, [activeIndex, isUserScrolling]);

//   /* ================= NAVIGATION ================= */

//   const scrollToIndex = useCallback(
//     (index: number) => {
//       if (index < 0 || index >= totalSlides) return;
//       const container = containerRef.current;
//       if (!container || !windowHeight) return;

//       isScrollingRef.current = true;

//       container.scrollTo({
//         top: index * windowHeight,
//         behavior: 'smooth',
//       });

//       setActiveIndex(index);

//       setTimeout(() => {
//         isScrollingRef.current = false;
//       }, 900);
//     },
//     [windowHeight, totalSlides]
//   );

//   const goNext = () => scrollToIndex(activeIndex + 1);
//   const goPrev = () => scrollToIndex(activeIndex - 1);

//   /* ================= TOUCH SUPPORT ================= */

//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartY.current = e.touches[0].clientY;
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     touchEndY.current = e.touches[0].clientY;
//   };

//   const handleTouchEnd = () => {
//     if (touchStartY.current === null || touchEndY.current === null) return;

//     const delta = touchStartY.current - touchEndY.current;

//     if (Math.abs(delta) > 60) {
//       if (delta > 0) goNext();
//       if (delta < 0) goPrev();
//     }

//     touchStartY.current = null;
//     touchEndY.current = null;
//   };

//   /* ================= KEYBOARD SUPPORT ================= */

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'ArrowDown' || e.key === ' ') {
//         e.preventDefault();
//         goNext();
//       } else if (e.key === 'ArrowUp') {
//         e.preventDefault();
//         goPrev();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [activeIndex]);

//   if (!slides.length) return null;

//   const activeSlide = slides[activeIndex];

//   const bgColor = activeIndex % 2 === 0 ? '#07518a' : '#ffffff';
//   const textColor = activeIndex % 2 === 0 ? '#ffffff' : '#07518a';

//   const dynamicStyles: React.CSSProperties = {
//     backgroundColor: bgColor,
//     color: textColor,
//     transition: 'background-color 0.6s ease, color 0.6s ease',
//   };

//   /* ================= RENDER ================= */

//   return (
//     <div
//       ref={containerRef}
//       className="h-screen w-full overflow-y-auto scroll-smooth"
//       style={{
//         scrollbarWidth: 'none',
//         msOverflowStyle: 'none',
//         WebkitOverflowScrolling: 'touch',
//       }}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <style jsx>{`
//         div::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>

//       <div style={{ height: `${totalSlides * 100}vh` }}>
//         <div
//           className="sticky top-0 h-screen flex items-center justify-center px-6"
//           style={dynamicStyles}
//         >
//           {/* NAVIGATION BUTTONS */}
//           <button
//             onClick={goPrev}
//             disabled={activeIndex === 0}
//             className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all"
//             style={{
//               backgroundColor: textColor,
//               color: bgColor,
//               opacity: activeIndex === 0 ? 0.3 : 1,
//             }}
//           >
//             <ChevronLeft size={28} />
//           </button>

//           <button
//             onClick={goNext}
//             disabled={activeIndex === totalSlides - 1}
//             className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all"
//             style={{
//               backgroundColor: textColor,
//               color: bgColor,
//               opacity: activeIndex === totalSlides - 1 ? 0.3 : 1,
//             }}
//           >
//             <ChevronRight size={28} />
//           </button>

//           <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl h-full">
            
//             {/* LEFT SIDE */}
//             <div className="relative flex flex-col justify-center px-4 lg:px-12">

//               <div className="mb-10">
//                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-500">
//                   {activeSlide.title}
//                 </h2>

//                 <p className="mt-6 text-lg md:text-xl max-w-xl opacity-90">
//                   {activeSlide.subsections?.[0]?.description ||
//                     'Enterprise-grade scalable solution engineered for modern infrastructure.'}
//                 </p>
//               </div>

//               {/* Feature Points */}
//               {activeSlide.subsections?.[0]?.subPoints && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
//                   {activeSlide.subsections[0].subPoints
//                     .slice(0, 4)
//                     .map((point: any, i: number) => (
//                       <div key={i}>
//                         <h4 className="font-semibold text-base">
//                           {point.title}
//                         </h4>
//                         <p className="text-sm opacity-80 mt-1">
//                           {point.description}
//                         </p>
//                       </div>
//                     ))}
//                 </div>
//               )}

//               {/* Slide Counter */}
//               <div className="absolute bottom-12 right-12 hidden lg:block font-mono text-lg">
//                 <span className="text-2xl font-bold">
//                   {activeIndex + 1}
//                 </span>
//                 <span className="opacity-50"> / {totalSlides}</span>
//               </div>
//             </div>

//             {/* RIGHT SIDE IMAGE */}
//             <div className="hidden lg:flex items-center justify-center p-8">
//               <Card className="w-full h-full max-h-[80vh] overflow-hidden shadow-2xl">
//                 <CardContent className="p-0 h-full">
//                   <div
//                     className="h-full w-full transition-transform duration-700 ease-out"
//                     style={{
//                       transform: `translateY(-${activeIndex * 100}%)`,
//                     }}
//                   >
//                     {slides.map((slide: any, i: number) => (
//                       <div key={i} className="relative h-full w-full">
//                         <Image
//                           src={
//                             slide.mainimage ||
//                             slide.subsections?.[0]?.image
//                           }
//                           alt={slide.title}
//                           fill
//                           className="object-cover"
//                           priority={i === 0}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="hidden lg:block h-[80vh] bg-white" />
//     </div>
//   );
// } 
'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { allSolutions } from '@/app/solutions/data';

export function ScrollingFeatureShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const autoScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);

  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const slides = allSolutions || [];
  const totalSlides = slides.length;

  /* ================= WINDOW HEIGHT ================= */

  useEffect(() => {
    const updateHeight = () => setWindowHeight(window.innerHeight);
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  /* ================= INTERSECTION OBSERVER ================= */

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ================= SCROLL LISTENER ================= */

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !windowHeight) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const index = Math.round(container.scrollTop / windowHeight);
      const clamped = Math.max(0, Math.min(index, totalSlides - 1));

      if (clamped !== activeIndex) {
        setActiveIndex(clamped);
      }

      setIsUserScrolling(true);

      if (autoScrollTimer.current) clearTimeout(autoScrollTimer.current);

      autoScrollTimer.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 1200);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => container.removeEventListener('scroll', handleScroll);
  }, [windowHeight, totalSlides, activeIndex]);

  /* ================= AUTO PLAY ================= */

  useEffect(() => {
    if (!isInView || isUserScrolling || totalSlides <= 1) return;

    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);

    autoPlayTimer.current = setTimeout(() => {
      const next = activeIndex === totalSlides - 1 ? 0 : activeIndex + 1;
      scrollToIndex(next);
    }, 4000);

    return () => {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    };
  }, [activeIndex, isInView, isUserScrolling]);

  /* ================= SCROLL FUNCTION ================= */

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!containerRef.current || !windowHeight) return;

      isScrollingRef.current = true;

      containerRef.current.scrollTo({
        top: index * windowHeight,
        behavior: 'smooth',
      });

      setActiveIndex(index);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 900);
    },
    [windowHeight]
  );

  const goNext = () => {
    const next = activeIndex === totalSlides - 1 ? 0 : activeIndex + 1;
    scrollToIndex(next);
  };

  const goPrev = () => {
    const prev = activeIndex === 0 ? totalSlides - 1 : activeIndex - 1;
    scrollToIndex(prev);
  };

  /* ================= TOUCH SUPPORT ================= */

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartY.current === null || touchEndY.current === null) return;

    const delta = touchStartY.current - touchEndY.current;

    if (Math.abs(delta) > 60) {
      delta > 0 ? goNext() : goPrev();
    }

    touchStartY.current = null;
    touchEndY.current = null;
  };

  /* ================= KEYBOARD ================= */

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isInView) return;

      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, isInView]);

  if (!slides.length) return null;

  const activeSlide = slides[activeIndex];

  const bgColor = activeIndex % 2 === 0 ? '#07518a' : '#ffffff';
  const textColor = activeIndex % 2 === 0 ? '#ffffff' : '#07518a';

  return (
    <section ref={sectionRef} className="relative w-full">
      <div
        ref={containerRef}
        className="h-screen w-full overflow-y-auto scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div style={{ height: `${totalSlides * 100}vh` }}>
          <div
            className="sticky top-0 h-screen flex items-center justify-center transition-all duration-700"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {/* NAV BUTTONS */}
            <button
              onClick={goPrev}
              className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full"
              style={{ backgroundColor: textColor, color: bgColor }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goNext}
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full"
              style={{ backgroundColor: textColor, color: bgColor }}
            >
              <ChevronRight size={24} />
            </button>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-[1400px] px-6">

              {/* LEFT CONTENT */}
              <div className="flex flex-col justify-center space-y-6">

                {/* Reduced Title Size */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-bold leading-tight transition-all duration-500">
                  {activeSlide.title}
                </h2>

                <p className="text-base sm:text-lg lg:text-lg opacity-90 max-w-2xl">
                  {activeSlide.subsections?.[0]?.description ||
                    'Enterprise-grade scalable solution engineered for modern infrastructure.'}
                </p>

                {/* Feature Points */}
                {activeSlide.subsections?.[0]?.subPoints && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {activeSlide.subsections[0].subPoints
                      .slice(0, 4)
                      .map((point: any, i: number) => (
                        <div key={i}>
                          <h4 className="font-semibold text-sm">
                            {point.title}
                          </h4>
                          <p className="text-xs opacity-80">
                            {point.description}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* RIGHT IMAGE */}
              <div className="hidden lg:flex items-center justify-center">
                <Card className="w-full h-[65vh] overflow-hidden shadow-2xl border-0">
                  <CardContent className="p-0 h-full">
                    <div
                      className="h-full w-full transition-transform duration-700"
                      style={{
                        transform: `translateY(-${activeIndex * 100}%)`,
                      }}
                    >
                      {slides.map((slide: any, i: number) => (
                        <div key={i} className="relative h-full w-full">
                          <Image
                            src={
                              slide.mainimage ||
                              slide.subsections?.[0]?.image ||
                              '/placeholder.jpg'
                            }
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority={i === 0}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* COUNTER */}
            <div className="hidden lg:flex absolute bottom-8 right-8 items-center gap-4">
              <div className="font-mono text-lg">
                <span className="text-2xl font-bold">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="opacity-50">
                  {' '}
                  / {String(totalSlides).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
