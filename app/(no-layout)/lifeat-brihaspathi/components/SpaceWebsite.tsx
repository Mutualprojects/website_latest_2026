// 'use client';

// import React, { useRef, useEffect } from 'react';
// import Samuel from './Samuel';

// const SpaceWebsite: React.FC = () => {
//   const pageContainerRef = useRef<HTMLDivElement>(null);
//   const horizontalContainerRef = useRef<HTMLDivElement>(null);
//   const panelsContainerRef = useRef<HTMLDivElement>(null);
//   const leftMenuRef = useRef<HTMLDivElement>(null);
//   const menuBtnRef = useRef<HTMLButtonElement>(null);
//   const copyEmailBtnRef = useRef<HTMLButtonElement>(null);
//   const copyTooltipRef = useRef<HTMLSpanElement>(null);

//   useEffect(() => {
//     // DOM elements - using refs where possible, querySelector for arrays
//     const pageContainer = pageContainerRef.current;
//     const horizontalContainer = horizontalContainerRef.current;
//     const panelsContainer = panelsContainerRef.current;
//     const panels = document.querySelectorAll(".panel");
//     const progressFill = document.querySelector(".nav-progress-fill");
//     const navText = document.querySelectorAll(".nav-text")[1];
//     const parallaxElements = document.querySelectorAll(".parallax");
//     const leftMenu = leftMenuRef.current;
//     const menuBtn = menuBtnRef.current;
//     const sectionNavItems = document.querySelectorAll(".section-nav-item");
//     const videoBackground = document.querySelector(".video-background");
//     const copyEmailBtn = copyEmailBtnRef.current;
//     const copyTooltip = copyTooltipRef.current;



     
//     // Constants
//     const SMOOTH_FACTOR = 0.065;
//     const WHEEL_SENSITIVITY = 1.0;
//     const PANEL_COUNT = panels.length;
//     const MENU_WIDTH = 250;
//     const MENU_COLLAPSED_WIDTH = 60;
//     const PARALLAX_INTENSITY = 0.5; // Controls strength of parallax effect

//     // State variables
//     let targetX = 0;
//     let currentX = 0;
//     let currentProgress = 0;
//     let targetProgress = 0;
//     let panelWidth = window.innerWidth;
//     let maxScroll = (PANEL_COUNT - 1) * panelWidth;
//     let isAnimating = false;
//     let currentPanel = 0;
//     let lastPanel = -1;
//     let menuExpanded = false;

//     // Touch variables
//     let isDragging = false;
//     let startX = 0;
//     let startScrollX = 0;
//     let velocityX = 0;
//     let lastTouchX = 0;
//     let lastTouchTime = 0;

//     // Helper functions
//     const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
//     const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

//     // Copy email functionality
//     if (copyEmailBtn && copyTooltip) {
//       copyEmailBtn.addEventListener("click", () => {
//         const email = document.querySelector(".email")?.textContent || '';
//         navigator.clipboard.writeText(email).then(() => {
//           copyTooltip.classList.add("active");
//           setTimeout(() => {
//             copyTooltip.classList.remove("active");
//           }, 2000);
//         });
//       });
//     }

//     // Menu animation - add entrance animation for menu items
//     const animateMenuItems = (show: boolean) => {
//       sectionNavItems.forEach((item, index) => {
//         if (show) {
//           setTimeout(() => {
//             (item as HTMLElement).classList.add("animate-in");
//           }, 50 + index * 30);
//         } else {
//           (item as HTMLElement).classList.remove("animate-in");
//         }
//       });
//     };

//     // Toggle menu expansion with animation
//     if (menuBtn) {
//       menuBtn.addEventListener("click", () => {
//         menuExpanded = !menuExpanded;
//         if (leftMenu) leftMenu.classList.toggle("expanded");
//         document.body.classList.toggle("menu-expanded");
//         if (menuExpanded) {
//           setTimeout(() => {
//             animateMenuItems(true);
//           }, 150);
//         } else {
//           animateMenuItems(false);
//         }
//         // Update dimensions after menu animation
//         setTimeout(() => {
//           updateDimensions(false);
//         }, 400);
//       });
//     }

//     // Improved parallax effect with more subtle movement
//     const updateParallax = () => {
//       parallaxElements.forEach((element) => {
//         if (!element) return;
//         const speed = Number.parseFloat((element as HTMLElement).dataset.speed || '0.2');
//         // Make parallax much more subtle (reduced from 0.5 to 0.2)
//         const PARALLAX_INTENSITY_LOCAL = 0.2;
//         // Calculate the horizontal movement based on scroll position
//         // Use negative values for the parallax effect
//         const moveX = -currentX * speed * PARALLAX_INTENSITY_LOCAL;
//         // Apply translation to create parallax effect
//         (element as HTMLElement).style.transform = `translateX(${moveX}px)`;
//       });
//     };

//     // Update dimensions on resize
//     const updateDimensions = (animate = true) => {
//       // Calculate panel width based on current window width
//       panelWidth = window.innerWidth;
//       maxScroll = (PANEL_COUNT - 1) * panelWidth;
//       // Keep the current panel centered
//       targetX = currentPanel * panelWidth;
//       currentX = targetX;
//       // Update panel widths
//       panels.forEach((panel) => {
//         (panel as HTMLElement).style.width = `${panelWidth}px`;
//       });
//       // Apply transform with or without transition
//       if (animate && panelsContainer) {
//         panelsContainer.classList.add("transitioning");
//         setTimeout(() => {
//           panelsContainer.classList.remove("transitioning");
//         }, 400);
//       }
//       if (panelsContainer) {
//         panelsContainer.style.transform = `translateX(-${currentX}px)`;
//       }
//       // Force parallax update
//       updateParallax();
//     };

//     // Navigate to section when clicking nav item
//     sectionNavItems.forEach((item) => {
//       item.addEventListener("click", () => {
//         const index = Number.parseInt((item as HTMLElement).getAttribute("data-index") || '0');
//         // Set target position to that panel
//         targetX = index * panelWidth;
//         // Update active class
//         sectionNavItems.forEach((navItem) => {
//           (navItem as HTMLElement).classList.remove("active");
//         });
//         (item as HTMLElement).classList.add("active");
//         // Start animation
//         startAnimation();
//         // Close menu on mobile or after navigation
//         if (window.innerWidth < 768 && menuExpanded) {
//           menuExpanded = false;
//           if (leftMenu) leftMenu.classList.remove("expanded");
//           document.body.classList.remove("menu-expanded");
//           animateMenuItems(false);
//           // Update dimensions after menu closes
//           setTimeout(() => {
//             updateDimensions(false);
//           }, 400);
//         }
//       });
//     });

//     // Split text elements with staggered animation
//     const splitTexts = document.querySelectorAll(".split-text");
//     splitTexts.forEach((text) => {
//       const words = (text as HTMLElement).textContent?.split(" ") || [];
//       (text as HTMLElement).innerHTML = words
//         .map((word) => `<span class="word">${word}</span>`)
//         .join(" ");
//       // Add delay to each word
//       const wordElements = (text as HTMLElement).querySelectorAll(".word");
//       wordElements.forEach((word, index) => {
//         (word as HTMLElement).style.transitionDelay = `${index * 0.02}s`;
//       });
//     });

//     // Update page counter
//     const updatePageCount = () => {
//       const currentPanelIndex = Math.round(currentX / panelWidth) + 1;
//       const formattedIndex = currentPanelIndex.toString().padStart(2, "0");
//       const totalPanels = PANEL_COUNT.toString().padStart(2, "0");
//       if (navText) navText.textContent = `${formattedIndex} / ${totalPanels}`;
//       // Update active section in navigation
//       sectionNavItems.forEach((item, index) => {
//         if (index === currentPanelIndex - 1) {
//           (item as HTMLElement).classList.add("active");
//         } else {
//           (item as HTMLElement).classList.remove("active");
//         }
//       });
//     };

//     // Update progress bar
//     const updateProgress = () => {
//       targetProgress = currentX / maxScroll;
//       currentProgress = lerp(
//         currentProgress,
//         targetProgress,
//         SMOOTH_FACTOR * 1.5
//       );
//       if (progressFill) {
//         (progressFill as HTMLElement).style.transform = `scaleX(${currentProgress})`;
//       }
//     };

//     // Update active panel with fixed visibility for backwards navigation
//     const updateActivePanel = () => {
//       currentPanel = Math.round(currentX / panelWidth);
//       if (currentPanel !== lastPanel) {
//         // First remove was-active class from all panels
//         panels.forEach((panel) => {
//           (panel as HTMLElement).classList.remove("was-active");
//         });
//         // Mark previously active panel
//         if (lastPanel >= 0 && panels[lastPanel]) {
//           (panels[lastPanel] as HTMLElement).classList.remove("active");
//         }
//         // Set new active panel
//         if (panels[currentPanel]) {
//           (panels[currentPanel] as HTMLElement).classList.add("active");
//         }
//         // Ensure all previous panels remain visible when scrolling back
//         for (let i = 0; i < panels.length; i++) {
//           if (i < currentPanel) {
//             (panels[i] as HTMLElement).classList.add("visited");
//           } else {
//             (panels[i] as HTMLElement).classList.remove("visited");
//           }
//         }
//         lastPanel = currentPanel;
//       }
//     };

//     // Animation loop
//     const animate = () => {
//       // Smooth scrolling with lerp
//       currentX = lerp(currentX, targetX, SMOOTH_FACTOR);
//       if (panelsContainer) {
//         panelsContainer.style.transform = `translateX(-${currentX}px)`;
//       }
//       // Update progress and navigation
//       updateProgress();
//       updatePageCount();
//       updateActivePanel();
//       updateParallax();
//       if (Math.abs(targetX - currentX) > 0.1 || isAnimating) {
//         requestAnimationFrame(animate);
//       } else {
//         isAnimating = false;
//       }
//     };

//     // Start animation
//     const startAnimation = () => {
//       if (!isAnimating) {
//         isAnimating = true;
//         requestAnimationFrame(animate);
//       }
//     };

//     // Event handlers
//     const handleWheel = (e: WheelEvent) => {
//       e.preventDefault();
//       targetX = clamp(targetX + e.deltaY * WHEEL_SENSITIVITY, 0, maxScroll);
//       startAnimation();
//     };

//     const handleMouseDown = (e: MouseEvent) => {
//       if (e.target instanceof Element && (e.target.closest(".left-menu") || e.target.closest(".copy-email")))
//         return; // Don't drag when clicking menu or copy button
//       isDragging = true;
//       startX = e.clientX;
//       startScrollX = currentX;
//       lastTouchX = e.clientX;
//       lastTouchTime = Date.now();
//       document.body.style.cursor = "grabbing";
//       e.preventDefault();
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isDragging) return;
//       const dx = e.clientX - startX;
//       targetX = clamp(startScrollX - dx, 0, maxScroll);
//       const currentTime = Date.now();
//       const timeDelta = currentTime - lastTouchTime;
//       if (timeDelta > 0) {
//         const touchDelta = lastTouchX - e.clientX;
//         velocityX = (touchDelta / timeDelta) * 15;
//       }
//       lastTouchX = e.clientX;
//       lastTouchTime = currentTime;
//       startAnimation();
//     };

//     const handleMouseUp = () => {
//       if (!isDragging) return;
//       isDragging = false;
//       document.body.style.cursor = "grab";
//       if (Math.abs(velocityX) > 0.5) {
//         targetX = clamp(targetX + velocityX * 8, 0, maxScroll);
//       }
//       const nearestPanel = Math.round(targetX / panelWidth);
//       targetX = nearestPanel * panelWidth;
//       startAnimation();
//     };

//     const handleTouchStart = (e: TouchEvent) => {
//       if (e.target instanceof Element && (e.target.closest(".left-menu") || e.target.closest(".copy-email")))
//         return; // Don't drag when touching menu
//       isDragging = true;
//       startX = e.touches[0].clientX;
//       startScrollX = currentX;
//       lastTouchX = e.touches[0].clientX;
//       lastTouchTime = Date.now();
//     };

//     const handleTouchMove = (e: TouchEvent) => {
//       if (!isDragging) return;
//       const dx = e.touches[0].clientX - startX;
//       targetX = clamp(startScrollX - dx, 0, maxScroll);
//       const currentTime = Date.now();
//       const timeDelta = currentTime - lastTouchTime;
//       if (timeDelta > 0) {
//         const touchDelta = lastTouchX - e.touches[0].clientX;
//         velocityX = (touchDelta / timeDelta) * 12;
//       }
//       lastTouchX = e.touches[0].clientX;
//       lastTouchTime = currentTime;
//       e.preventDefault();
//       startAnimation();
//     };

//     const handleTouchEnd = () => {
//       if (!isDragging) return;
//       isDragging = false;
//       if (Math.abs(velocityX) > 0.5) {
//         targetX = clamp(targetX + velocityX * 6, 0, maxScroll);
//       }
//       const nearestPanel = Math.round(targetX / panelWidth);
//       targetX = nearestPanel * panelWidth;
//       startAnimation();
//     };

//     // Event listeners
//     if (horizontalContainer) {
//       horizontalContainer.addEventListener("wheel", handleWheel, {
//         passive: false
//       });
//       horizontalContainer.addEventListener("mousedown", handleMouseDown);
//       horizontalContainer.addEventListener("touchstart", handleTouchStart, {
//         passive: true
//       });
//       horizontalContainer.addEventListener("touchmove", handleTouchMove, {
//         passive: false
//       });
//       horizontalContainer.addEventListener("touchend", handleTouchEnd, {
//         passive: true
//       });
//     }

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);
//     window.addEventListener("resize", () => {
//       updateDimensions();
//     });

//     // Make sure parallax elements are loaded
//     parallaxElements.forEach((img) => {
//       if ((img as HTMLImageElement).tagName === "IMG") {
//         const image = img as HTMLImageElement;
//         if (image.complete) {
//           // Image already loaded
//           image.classList.add("loaded");
//         } else {
//           // Wait for image to load
//           image.addEventListener("load", () => {
//             image.classList.add("loaded");
//           });
//         }
//       }
//     });

//     // Video background
//     if (videoBackground) {
//       (videoBackground as HTMLVideoElement).playbackRate = 0.6;
//     }

//     // Initialize
//     updateDimensions();
//     updateActivePanel();
//     updatePageCount();
//     startAnimation();
//     // Initial animation for first panel
//     setTimeout(() => {
//       if (panels[0]) (panels[0] as HTMLElement).classList.add("active");
//       if (sectionNavItems[0]) (sectionNavItems[0] as HTMLElement).classList.add("active");
//     }, 100);
//     // Force parallax update on load
//     setTimeout(() => {
//       updateParallax();
//     }, 200);

//     // Cleanup
//     return () => {
//       if (horizontalContainer) {
//         horizontalContainer.removeEventListener("wheel", handleWheel);
//         horizontalContainer.removeEventListener("mousedown", handleMouseDown);
//         horizontalContainer.removeEventListener("touchstart", handleTouchStart);
//         horizontalContainer.removeEventListener("touchmove", handleTouchMove);
//         horizontalContainer.removeEventListener("touchend", handleTouchEnd);
//       }
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//       window.removeEventListener("resize", () => updateDimensions());
//       if (menuBtn) menuBtn.removeEventListener("click", () => {});
//       if (copyEmailBtn) copyEmailBtn.removeEventListener("click", () => {});
//     };
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url("https://fonts.googleapis.com/css2?family=Boldonse:wght@400;600;700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
//         :root {
//           /* Colors */
//           --color-primary: #0a0a0a;
//           --color-secondary: #161616;
//           --color-accent: #ff2c2c;
//           --color-text: #f5f5f5;
//           --color-text-muted: rgba(245, 245, 245, 0.7);
//           --color-border: rgba(255, 255, 255, 0.05);
//           --color-overlay: rgba(0, 0, 0, 0.5);
//           /* Typography */
//           --font-primary: "Inter", sans-serif;
//           --font-display: "Boldonse", serif;
//           --font-serif: "EB Garamond", serif;
//           --text-xs: 0.7rem;
//           --text-sm: 0.875rem;
//           --text-base: 1rem;
//           --text-lg: 1.2rem;
//           --text-xl: 1.5rem;
//           --text-2xl: 2rem;
//           --text-3xl: 3rem;
//           --text-mega: clamp(7rem, 15vw, 12rem);
//           /* Spacing */
//           --space-1: 0.25rem;
//           --space-2: 0.5rem;
//           --space-3: 0.75rem;
//           --space-4: 1rem;
//           --space-5: 1.5rem;
//           --space-6: 2rem;
//           --space-8: 3rem;
//           --space-10: 4rem;
//           --space-12: 6rem;
//           /* Layout */
//           --menu-width: 250px;
//           --menu-collapsed-width: 60px;
//           --panel-padding: 5%;
//           /* Animations */
//           --transition-fast: 0.2s ease;
//           --transition-medium: 0.3s ease;
//           --transition-slow: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
//           --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
//           --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
//           --word-stagger-delay: 0.02s;
//         }
//         * {
//         margin: 0;
                
//           padding: 0;
//           box-sizing: border-box;
//         }
//         body {
 
//           font-family: var(--font-primary);
//           font-weight: 400;
//           overflow: hidden;
//           cursor: grab;
//           background-color: var(--color-primary);
//           color: var(--color-text);
//           position: relative;
//         }
//         body:active {
//           cursor: grabbing;
//         }
//         /* Left menu styles with enhanced animations */
//         .left-menu {
//           position: fixed;
//           left: 0;
//           top: 0;
//           height: 100vh;
//           width: var(--menu-collapsed-width);
//           background-color: #111;
//           z-index: 100;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           border-right: 1px solid var(--color-border);
//           transition: width var(--transition-slow);
//           overflow: hidden;
//         }
//         .left-menu.expanded {
//           width: var(--menu-width);
//           box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
//         }
//         /* Push menu implementation */
//         body.menu-expanded .page-container {
//           left: var(--menu-width);
//         }
//         .page-container {
//           position: fixed;
//           top: 0;
//           left: var(--menu-collapsed-width);
//           right: 0;
//           bottom: 0;
//           transition: left var(--transition-slow);
//         }
//         .left-menu-top {
//           position: absolute;
//           top: var(--space-5);
//           left: 0;
//           width: 100%;
//           display: flex;
//           justify-content: center;
//           z-index: 101;
//         }
//         .left-menu-middle {
//           position: absolute;
//           top: 50%;
//           left: 0;
//           width: 100%;
//           display: flex;
//           justify-content: center;
//           transform: translateY(-50%);
//         }
//         .logo {
//           font-family: var(--font-display);
//           font-weight: 700;
//           letter-spacing: 2px;
//           font-size: var(--text-lg);
//           color: var(--color-text);
//           white-space: nowrap;
//           transform: rotate(-90deg);
//           transition: transform var(--transition-slow), opacity var(--transition-medium);
//         }
//         .left-menu.expanded .logo {
//           opacity: 0;
//           transform: rotate(-90deg) translateY(20px);
//         }
//         .menu-btn {
//           width: 24px;
//           height: 20px;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           cursor: pointer;
//           z-index: 200;
//           background: transparent;
//           border: none;
//           padding: 0;
//         }
//         .menu-btn span {
//           display: block;
//           width: 100%;
//           height: 2px;
//           background-color: var(--color-text);
//           transition: transform var(--transition-medium),
//             opacity var(--transition-medium);
//         }
//         .left-menu.expanded .menu-btn span:nth-child(1) {
//           transform: translateY(9px) rotate(45deg);
//         }
//         .left-menu.expanded .menu-btn span:nth-child(2) {
//           opacity: 0;
//         }
//         .left-menu.expanded .menu-btn span:nth-child(3) {
//           transform: translateY(-9px) rotate(-45deg);
//         }
//         /* Section navigation styles with enhanced animations */
//         .section-nav {
//           position: absolute;
//           left: 0;
//           top: 0;
//           width: 100%;
//           height: 100%;
//           opacity: 0;
//           visibility: hidden;
//           transition: opacity var(--transition-medium),
//             visibility var(--transition-medium);
//           display: flex;
//           flex-direction: column;
//           align-items: flex-start;
//           justify-content: center;
//           padding-left: var(--menu-collapsed-width);
//           padding-right: var(--space-5);
//           background-color: #111;
//         }
//         .left-menu.expanded .section-nav {
//           opacity: 1;
//           visibility: visible;
//         }
//         .section-nav-item {
//           font-family: var(--font-display);
//           font-weight: 400;
//           color: var(--color-text);
//           text-decoration: none;
//           margin: var(--space-3) 0;
//           font-size: var(--text-sm);
//           opacity: 0;
//           transition: opacity var(--transition-slow), transform var(--transition-slow),
//             color var(--transition-fast);
//           cursor: pointer;
//           transform: translateX(-20px);
//           display: flex;
//           align-items: center;
//           width: 100%;
//         }
//         .section-nav-item.animate-in {
//           opacity: 0.7;
//           transform: translateX(0);
//           transition-timing-function: var(--ease-out-back);
//         }
//         .section-nav-item:hover {
//           opacity: 1;
//           color: var(--color-accent);
//         }
//         .section-nav-item.active {
//           opacity: 1;
//           color: var(--color-accent);
//         }
//         .section-nav-item-number {
//           font-family: var(--font-display);
//           font-weight: 700;
//           font-size: var(--text-xs);
//           opacity: 0.6;
//           margin-right: var(--space-3);
//           min-width: 20px;
//           transform: translateX(-10px);
//           transition: transform var(--transition-medium),
//             opacity var(--transition-medium);
//         }
//         .section-nav-item.animate-in .section-nav-item-number,
//         .section-nav-item:hover .section-nav-item-number {
//           transform: translateX(0);
//           opacity: 0.8;
//         }
//         /* Improved staggered animation of menu items */
//         .left-menu.expanded .section-nav-item:nth-child(1) {
//           transition-delay: 0.05s;
//         }
//         .left-menu.expanded .section-nav-item:nth-child(2) {
//           transition-delay: 0.08s;
//         }
//         .left-menu.expanded .section-nav-item:nth-child(3) {
//           transition-delay: 0.11s;
//         }
//         .left-menu.expanded .section-nav-item:nth-child(4) {
//           transition-delay: 0.14s;
//         }
//         .left-menu.expanded .section-nav-item:nth-child(5) {
//           transition-delay: 0.17s;
//         }
//         .left-menu.expanded .section-nav-item:nth-child(6) {
//           transition-delay: 0.2s;
//         }
//         .left-menu.expanded .section-nav-item:nth-child(7) {
//           transition-delay: 0.23s;
//         }
//         .left-menu.expanded .section-nav-item:nth-child(8) {
//           transition-delay: 0.26s;
//         }
//         .left-menu.expanded .section-nav-item:nth-child(9) {
//           transition-delay: 0.29s;
//         }
//         /* Horizontal container */
//         .horizontal-container {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//         }
//         .panels-container {
//           position: absolute;
//           top: 0;
//           left: 0;
//           height: 100%;
//           display: flex;
//           will-change: transform;
//         }
//         .panels-container.transitioning {
//           transition: transform var(--transition-slow);
//         }
//         .panel {
        
//           position: relative;
//           height: 100vh;
//           overflow: hidden;
//         }
//         /* Split panel layout */
//         .panel-split {
//           display: flex;
//         }
//         .panel-left,
//         .panel-right {
//           width: 50%;
//           height: 100%;
//           position: relative;
//           overflow: hidden;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           padding: var(--panel-padding);
//         }
//         .panel-left {
//           background-color: #121212;
//           color: var(--color-text);
//         }
//         .panel-right {
//           background-color: var(--color-secondary);
//           color: var(--color-text);
//         }
//         /* Common image wrapper for parallax effect */
//         .image-wrapper {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           overflow: hidden;
//         }
//         /* Full background panel layout */
//         .panel-full {
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .panel-full-background {
//           position: absolute;
//           width: 110%;
//           height: 110%;
//           object-fit: cover;
//           z-index: 1;
//           will-change: transform;
//           filter: brightness(0.7);
//         }
//         .panel-full-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-color: var(--color-overlay);
//           z-index: 2;
//         }
//         .panel-full-content {
//           position: relative;
//           z-index: 3;
//           width: 80%;
//           max-width: 800px;
//           color: var(--color-text);
//           opacity: 0;
//           transform: translateY(30px);
//           transition: opacity 0.6s var(--ease-out-expo),
//             transform 0.6s var(--ease-out-expo);
//         }
//         /* Video panel styles */
//         .panel-video {
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//         }
//         .video-background {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           min-width: 100%;
//           min-height: 100%;
//           width: auto;
//           height: auto;
//           transform: translate(-50%, -50%);
//           z-index: 1;
//           object-fit: cover;
//         }
//         .panel-video-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-color: rgba(0, 0, 0, 0.6);
//           z-index: 2;
//         }
//         .panel-video-content {
//           position: relative;
//           z-index: 3;
//           width: 80%;
//           max-width: 800px;
//           color: var(--color-text);
//           text-align: center;
//           opacity: 0;
//           transform: translateY(30px);
//           transition: opacity 0.6s var(--ease-out-expo),
//             transform 0.6s var(--ease-out-expo);
//         }
//         /* Contact panel styles - Improved */
//         .panel-contact {
//           position: relative;
//           background-color: var(--color-primary);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .contact-container {
//           width: 80%;
//           max-width: 800px;
//           text-align: center;
//         }
//         .contact-content {
//           position: relative;
//           opacity: 0;
//           transform: translateY(30px);
//           transition: opacity 0.6s var(--ease-out-expo),
//             transform 0.6s var(--ease-out-expo);
//         }
//         .contact-name {
//           font-size: clamp(6rem, 15vw, 10rem);
//           color: var(--color-text) !important;
//           margin-bottom: var(--space-12);
//           line-height: 1;
//           font-weight: 900;
//           text-transform: uppercase;
//           letter-spacing: -0.03em;
//         }
//         .email-wrapper {
//           position: relative;
//           display: inline-flex;
//           align-items: center;
//           gap: var(--space-3);
//           background-color: rgba(255, 255, 255, 0.05);
//           padding: var(--space-4) var(--space-6);
//           border-radius: 30px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//           transition: transform var(--transition-medium),
//             background-color var(--transition-medium);
//         }
//         .email-wrapper:hover {
//           background-color: rgba(255, 255, 255, 0.08);
//           transform: translateY(-2px);
//         }
//         .email {
//           font-family: var(--font-display);
//           font-size: var(--text-2xl);
//           color: var(--color-text);
//           text-decoration: none;
//           transition: color var(--transition-fast);
//         }
//         .email:hover {
//           color: var(--color-accent);
//         }
//         .copy-email {
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: var(--color-text);
//           opacity: 0.7;
//           padding: var(--space-2);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//           transition: opacity var(--transition-fast),
//             background-color var(--transition-fast), transform var(--transition-fast);
//         }
//         .copy-email:hover {
//           opacity: 1;
//           background-color: rgba(255, 255, 255, 0.1);
//           transform: scale(1.1);
//         }
//         .copy-email:active {
//           transform: scale(0.95);
//         }
//         .copy-tooltip {
//           position: absolute;
//           bottom: -30px;
//           left: 50%;
//           transform: translateX(-50%);
//           background-color: var(--color-accent);
//           color: white;
//           padding: var(--space-1) var(--space-3);
//           border-radius: 4px;
//           font-size: var(--text-xs);
//           opacity: 0;
//           visibility: hidden;
//           transition: opacity var(--transition-medium),
//             visibility var(--transition-medium);
//         }
//         .copy-tooltip.active {
//           opacity: 1;
//           visibility: visible;
//         }
//         /* Animation effects */
//         .panel-content {
//           width: 90%;
//           opacity: 0;
//           transform: translateY(30px);
//           transition: opacity 0.6s var(--ease-out-expo),
//             transform 0.6s var(--ease-out-expo);
//           overflow: visible;
//         }
//         .panel.active .panel-content,
//         .panel.active .panel-full-content,
//         .panel.active .panel-video-content,
//         .panel.active .contact-content {
//           opacity: 1;
//           transform: translateY(0);
//         }
//         .panel.visited .panel-content,
//         .panel.visited .panel-full-content,
//         .panel.visited .panel-video-content,
//         .panel.visited .contact-content {
//           opacity: 0.7;
//           transform: translateY(0);
//         }
//         .word {
//           display: inline-block;
//           opacity: 0;
//           transform: translateY(15px);
//           transition: opacity 0.4s var(--ease-out-expo),
//             transform 0.4s var(--ease-out-expo);
//         }
//         .panel.active .word {
//           opacity: 1;
//           transform: translateY(0);
//         }
//         .panel.visited .word {
//           opacity: 0.7;
//           transform: translateY(0);
//         }
//         /* Text elements */
//         .chapter {
//           text-transform: uppercase;
//           margin-bottom: var(--space-6);
//           font-size: var(--text-sm);
//           letter-spacing: -0.03em;
//           color: var(--color-accent);
//         }
//         .title {
//           font-family: var(--font-display);
//           font-size: clamp(2.5rem, 5vw, 3.5rem);
//           margin-bottom: var(--space-6);
//           letter-spacing: -0.03em;
//           line-height: 1.3;
//           font-weight: 700;
//           color: var(--color-text);
//           width: 100%;
//         }
//         .subtitle {
//           font-family: var(--font-display);
//           font-size: clamp(1.5rem, 3vw, 2rem);
//           margin-bottom: var(--space-8);
//           letter-spacing: -0.03em;
//           line-height: 1;
//           font-weight: 400;
//           color: var(--color-text);
//         }
//         .space-text {
//           font-family: var(--font-display);
//           font-size: clamp(6rem, 15vw, 10rem);
//           line-height: 1;
//           font-weight: 900;
//           letter-spacing: -0.03em;
//           text-transform: uppercase;
//           margin-bottom: var(--space-6);
//           color: var(--color-accent);
//         }
//         .beyond-text {
//           font-family: var(--font-display);
//           font-size: clamp(6rem, 15vw, 10rem);
//           line-height: 1;
//           font-weight: 900;
//           text-transform: uppercase;
//           color: var(--color-accent);
//           margin-bottom: var(--space-6);
//           letter-spacing: -0.03em;
//         }
//         .mega-text {
//           font-family: var(--font-display);
//           font-size: var(--text-mega);
//           line-height: 0.9;
//           font-weight: 900;
//           text-transform: uppercase;
//           color: var(--color-accent);
//           margin-bottom: var(--space-6);
//           letter-spacing: -0.05em;
//           text-shadow: 0 0 20px rgba(255, 44, 44, 0.3);
//         }
//         .text {
//           font-size: clamp(0.9rem, 1.2vw, 1.1rem);
//           line-height: 1.4;
//           letter-spacing: normal;
//           color: var(--color-text);
//           width: 100%;
//         }
//         .text p {
//           margin-bottom: var(--space-5);
//         }
//         .quote {
//           font-size: var(--text-lg);
//           margin-bottom: var(--space-5);
//           line-height: 1.4;
//           position: relative;
//           font-style: italic;
//           color: var(--color-text);
//           letter-spacing: -0.03em;
//           max-width: 100%;
//         }
//         .author {
//           font-size: var(--text-sm);
//           margin-bottom: var(--space-6);
//           color: var(--color-accent);
//         }
//         .image-container {
//           width: 100%;
//           max-width: 450px;
//           height: 300px;
//           margin-bottom: var(--space-6);
//           position: relative;
//           overflow: hidden;
//           transform: translateZ(0);
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
//           border-radius: 4px;
//         }
//         .image-container .image-wrapper {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           overflow: hidden;
//         }
//         .image-container img {
//           width: 110%;
//           height: 110%;
//           object-fit: cover;
//           will-change: transform;
//         }
//         /* Editorial layout with improved image handling */
//         .editorial-split {
//           display: grid;
//           grid-template-columns: 1.2fr 0.8fr;
//           height: 100%;
//         }
//         .editorial-content {
//           padding: var(--panel-padding);
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           background-color: var(--color-primary);
//         }
//         .editorial-image {
//           height: 100%;
//           position: relative;
//           overflow: hidden;
//         }
//         .editorial-image .image-wrapper {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           overflow: hidden;
//         }
//         .editorial-image img {
//           width: 110%;
//           height: 110%;
//           object-fit: cover;
//           filter: brightness(0.8);
//           will-change: transform;
//         }
//         .panel-fixed {
//           position: relative;
//           height: 100vh;
//           overflow: hidden;
//         }
//         .panel-fixed-image {
//           width: 110%;
//           height: 110%;
//           object-fit: cover;
//           filter: brightness(0.7);
//           will-change: transform;
//         }
//         .panel-fixed-content {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           background-color: rgba(0, 0, 0, 0.5);
//           color: white;
//           z-index: 2;
//           padding: 0;
//         }
//         /* Parallax effects */
//         .parallax {
//           will-change: transform;
//           transition: opacity var(--transition-medium);
//           opacity: 0;
//         }
//         .parallax.loaded {
//           opacity: 1;
//         }
//         /* Navigation */
//         .navigation {
//           position: fixed;
//           bottom: var(--space-6);
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex;
//           align-items: center;
//           gap: var(--space-6);
//           z-index: 100;
//           color: white;
//           mix-blend-mode: difference;
//         }
//         .nav-progress {
//           width: 150px;
//           height: 2px;
//           background-color: rgba(255, 255, 255, 0.3);
//           position: relative;
//           overflow: hidden;
//           border-radius: 2px;
//         }
//         .nav-progress-fill {
//           position: absolute;
//           top: 0;
//           left: 0;
//           height: 100%;
//           width: 100%;
//           background-color: white;
//           transform-origin: left;
//           transform: scaleX(0);
//           will-change: transform;
//         }
//         .nav-text {
//           font-size: var(--text-xs);
//           text-transform: uppercase;
//           letter-spacing: 1px;
//         }
//         /* Left/Right labels */
//         .direction-label {
//           text-transform: uppercase;
//           font-size: var(--text-xs);
//           letter-spacing: 1px;
//           margin-bottom: var(--space-2);
//           color: var(--color-accent);
//         }
//         /* Last section fixes */
//         .conversation-section {
//           width: 100%;
//           display: flex;
//           flex-direction: column;
//           align-items: flex-start;
//         }
//         .quote-container {
//           position: relative;
//           margin-top: var(--space-4);
//           padding-left: var(--space-4);
//           border-left: 3px solid var(--color-accent);
//           width: 100%;
//         }
//         .full-quote {
//           font-family: var(--font-serif);
//           font-style: italic;
//           font-size: var(--text-base);
//           line-height: 1.5;
//           margin-bottom: var(--space-5);
//           width: 100%;
//         }
//         .conclusion-text {
//           margin-top: var(--space-5);
//           padding: var(--space-5);
//           background-color: rgba(255, 44, 44, 0.08);
//           border-left: 3px solid var(--color-accent);
//           width: 100%;
//           border-radius: 0 4px 4px 0;
//         }
//         @media (max-width: 768px) {
//           .panel-split {
//             flex-direction: column;
//           }
//           .panel-left,
//           .panel-right {
//             width: 100%;
//             height: 50%;
//             padding: var(--space-6);
//           }
//           .panel-content,
//           .panel-full-content {
//             width: 95%;
//           }
//           .title {
//             font-size: var(--text-2xl);
//           }
//           .subtitle {
//             font-size: var(--text-xl);
//           }
//           .image-container {
//             height: 180px;
//           }
//           .editorial-split {
//             grid-template-columns: 1fr;
//             grid-template-rows: 1fr 1fr;
//           }
//           .mega-text {
//             font-size: clamp(4rem, 15vw, 8rem);
//           }
//           .contact-name {
//             font-size: clamp(4rem, 12vw, 8rem);
//             margin-bottom: var(--space-8);
//           }
//           .email-wrapper {
//             flex-direction: column;
//             padding: var(--space-3);
//           }
//           .email {
//             font-size: var(--text-xl);
//           }
//           .copy-email {
//             margin-top: var(--space-2);
//           }
//         }
//       `}</style>
//       {/* Left Menu */}
//       <div className="left-menu  " ref={leftMenuRef}>
//         <div className="left-menu-top ">
//           <button className="menu-btn" ref={menuBtnRef} aria-label="Toggle menu">
//             <span></span>
//             <span></span>
//             <span></span>
//           </button>
//         </div>
//         <div className="left-menu-middle">
//           <div className="logo">Ai</div>
//         </div>
//         <div className="section-nav">
//           <a className="section-nav-item" data-index="0">
//             <span className="section-nav-item-number">01</span>
//             <span>Introduction</span>
//           </a>
//           <a className="section-nav-item" data-index="1">
//             <span className="section-nav-item-number">02</span>
//             <span>Matthew</span>
//           </a>
//           <a className="section-nav-item" data-index="2">
//             <span className="section-nav-item-number">03</span>
//             <span>Beyond</span>
//           </a>
//           <a className="section-nav-item" data-index="3">
//             <span className="section-nav-item-number">04</span>
//             <span>Rick</span>
//           </a>
//           <a className="section-nav-item" data-index="4">
//             <span className="section-nav-item-number">05</span>
//             <span>Cosmos</span>
//           </a>
//           <a className="section-nav-item" data-index="5">
//             <span className="section-nav-item-number">06</span>
//             <span>Dialogue</span>
//           </a>
//           <a className="section-nav-item" data-index="6">
//             <span className="section-nav-item-number">07</span>
//             <span>Infinite</span>
//           </a>
//           <a className="section-nav-item" data-index="7">
//             <span className="section-nav-item-number">08</span>
//             <span>Vision</span>
//           </a>
//           <a className="section-nav-item" data-index="8">
//             <span className="section-nav-item-number">09</span>
//             <span>Contact</span>
//           </a>
//         </div>
//       </div>
//       <div className="page-container" ref={pageContainerRef}>
//         <div className="horizontal-container" ref={horizontalContainerRef}>
//           <div className="panels-container" ref={panelsContainerRef}>
//             {/* First panel: Editorial split */}
//             <section className="panel panel-split editorial-split" data-index="0">
//               <div className="editorial-content">
//                 <div className="panel-content">
//                   <div className="chapter"> </div>
//                   <h1 className="title split-text">When you look up at the stars, you're really looking at the past. Our time here is brief, but our gaze is eternal</h1>
                
//                   <div className="text">
//                     <p className="split-text">The vast emptiness of space offers us perspective. It reminds us how small we are in the grand scheme of things. Yet somehow, that doesn't diminish us – it elevates our existence into something miraculous.</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="editorial-image">
//                 <div className="image-wrapper">
//                   <img src="https://cdn.cosmos.so/996569d5-2f19-40e9-9504-af3009286f9f.jpeg" alt="Space perspective" className="parallax" data-speed="0.3" />
//                 </div>
//               </div>
//             </section>
//             {/* Second panel: Full background */}
//             <section className="panel panel-full" data-index="1">
//               <div className="image-wrapper">
//                 <img src="https://cdn.cosmos.so/6828e15d-6b7e-4116-ba62-99493fa821cf.jpeg" alt="Cave opening" className="panel-full-background parallax" data-speed="0.2" />
//               </div>
//               <div className="panel-full-overlay"></div>
//               <div className="panel-full-content">
//                 <div className="chapter">Matthew</div>
//                 <h2 className="title split-text">The universe doesn't care about our plans. It only rewards our presence</h2>
//                 <div className="text">
//                   <p className="split-text">We think we know what's out there, but man, we've barely scratched the surface. It's like we're children opening our eyes for the first time. Every discovery is just the beginning of ten thousand more questions.</p>
//                 </div>
//               </div>
//             </section>
//             {/* Third panel: Fixed panel */}
//             <section className="panel panel-fixed" data-index="2">
//               <div className="image-wrapper">
//                 <img src="https://cdn.cosmos.so/47895928-9611-45a3-b94d-0d8ef8ac02dc.jpeg" alt="Galaxy view" className="panel-fixed-image parallax" data-speed="0.25" />
//               </div>
//               <div className="panel-fixed-content">
//                 <div className="space-text">BEYOND</div>
//               </div>
//             </section>
//             {/* Fourth panel: Editorial split reversed */}
//             <section className="panel panel-split editorial-split" data-index="3">
//               <div className="editorial-image">
//                 <div className="image-wrapper">
//                   <img src="https://cdn.cosmos.so/a28a9abc-6d7a-4160-a44b-2d9968c689c6.jpeg" alt="Space explorer" className="parallax" data-speed="0.3" />
//                 </div>
//               </div>
//               <div className="editorial-content">
//                 <div className="panel-content">
//                   <div className="chapter">Rick</div>
//                   <h2 className="title split-text">Silence is the canvas where the universe reveals itself</h2>
//                   <div className="text">
//                     <p className="split-text">There's something profound about the emptiness. It's not empty at all. It's full of potential. The space between things – that's where the magic happens. We're drawn to explore not because we want to conquer, but because we yearn to understand.</p>
//                   </div>
//                 </div>
//               </div>
//             </section>
//             {/* Fifth panel: Full background with COSMOS */}
//             <section className="panel panel-full" data-index="4">
//               <div className="image-wrapper">
//                 <img src="https://cdn.cosmos.so/e3817e25-3312-43ea-b666-75aa0bc4b5ae.jpeg" alt="Deep space" className="panel-full-background parallax" data-speed="0.2" />
//               </div>
//               <div className="panel-full-overlay"></div>
//               <div className="panel-full-content">
//                 <div className="beyond-text">COSMOS</div>
//                 <div className="text">
//                   <p className="split-text">Sometimes I think about how every atom in our bodies was forged in the heart of a dying star. We're not just in the universe – the universe is in us. That connection, that's what drives us forward.</p>
//                 </div>
//               </div>
//             </section>
//             {/* Sixth panel: Split with quotes */}
//             <section className="panel panel-split" data-index="5">
//               <div className="panel-left">
//                 <div className="panel-content">
//                   <div className="direction-label">Matthew</div>
//                   <div className="quote-container">
//                     <div className="quote">"I've always approached the cosmos with a sense of wonder. It's like looking at your reflection in a mirror that stretches into infinity. You see yourself, but you also see beyond yourself."</div>
//                     <div className="author">INTERSTELLAR, 2014</div>
//                   </div>
//                   <div className="image-container">
//                     <div className="image-wrapper">
//                       <img src="https://cdn.cosmos.so/f22462ad-b33d-448d-aa08-cfbbbe79ef42.jpeg" alt="Space journey" className="parallax" data-speed="0.15" />
//                     </div>
//                   </div>
//                   <div className="conclusion-text">
//                     <p className="split-text">Looking out there is really looking in here. The questions we ask about the stars are really questions about ourselves.</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="panel-right">
//                 <div className="panel-content">
//                   <div className="direction-label">Rick</div>
//                   <div className="quote-container">
//                     <div className="quote">"Great art creates space. Great space creates perspective. When we stand at the edge of the known, that's where true creativity begins."</div>
//                     <div className="author">CREATIVE PROCESS, 2022</div>
//                   </div>
//                   <div className="full-quote">
//                     "The universe doesn't rush, yet everything gets done. That's the paradox we're trying to understand – infinite patience paired with constant evolution."
//                   </div>
//                   <div className="text">
//                     <p className="split-text">What we discover out there transforms everything down here. Each revelation about a distant galaxy reshapes how we see ourselves on this pale blue dot.</p>
//                   </div>
//                 </div>
//               </div>
//             </section>
//             {/* Seventh panel: New big text with image */}
//             <section className="panel panel-full" data-index="6">
//               <div className="image-wrapper">
//                 <img src="https://cdn.cosmos.so/ee8be9fb-15f6-4f3b-a13f-309cbf5453c2.jpeg" alt="Space infinite" className="panel-full-background parallax" data-speed="0.3" />
//               </div>
//               <div className="panel-full-overlay"></div>
//               <div className="panel-full-content">
//                 <div className="mega-text">INFINITE</div>
//                 <div className="text">
//                   <p className="split-text">The universe expands in all directions at once, infinitely complex and infinitely simple. We are but a momentary gathering of stardust, witnessing the cosmic dance.</p>
//                 </div>
//               </div>
//             </section>
//             {/* Eighth panel: Video with text */}
//             <section className="panel panel-video" data-index="7">
//               <video className="video-background" autoPlay loop muted playsInline>
//                 <source src="https://cdn.cosmos.so/fdfc1996-66fd-4536-8d36-0ad173a4acff.mp4" type="video/mp4" />
//               </video>
//               <div className="panel-video-overlay"></div>
//               <div className="panel-video-content">
//                 <div className="mega-text">VISION</div>
//               </div>
//             </section>
//             {/* Ninth panel: Contact */}
//             <section className="panel panel-contact" data-index="8">
//               <div className="contact-container">
//                 <div className="contact-content">
//                   <div className="space-text contact-name">GET IN TOUCH</div>
//                   <div className="email-wrapper">
//                     <a href="mailto:hi@filip.fyi" className="email">hi@filip.fyi</a>
//                     <button className="copy-email" ref={copyEmailBtnRef} title="Copy email" aria-label="Copy email to clipboard">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//                         <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//                       </svg>
//                     </button>
//                     <span className="copy-tooltip" ref={copyTooltipRef}>Copied!</span>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//       <div className="navigation">
//         <div className="nav-text">SCROLL</div>
//         <div className="nav-progress">
//           <div className="nav-progress-fill"></div>
//         </div>
//         <div className="nav-text">01 / 09</div>
//       </div>
//     </>
//   );
// };

// export default SpaceWebsite; 
'use client';

import React, { useRef, useEffect } from 'react';

const SpaceWebsite: React.FC = () => {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const copyEmailBtnRef = useRef<HTMLButtonElement>(null);
  const copyTooltipRef = useRef<HTMLSpanElement>(null);

  const panelsData = [
    {
      index: 0,
      type: 'editorial-split',
      title: 'Innovative Solutions for a Connected, Secure and Sustainable Future',
      subtitle: '',
      text: [
        'Founded in 2006, Brihaspathi Technologies Limited is a leading provider of cutting-edge technology solutions. From E-Security Solutions, Home Automation, and AI-driven Software Development to IoT, IT Products, and ELV Solutions, we deliver innovation that transforms industries.'
      ],
      chapter: 'Introduction',
      image: '/Whisk_5f44db53a347c01b3d041e24c4587e94dr.jpeg',
      accentColor: '#0066cc',
    },
    {
      index: 1,
      type: 'full',
      title: 'About Us: The Guru of Tomorrow\'s Technology',
      subtitle: '',
      text: [
        'With a relentless commitment to excellence and innovation, Brihaspathi Technologies has become a trusted name in the tech sector. Backed by a dynamic team of 300+ professionals, we thrive on challenges. Our Mission: To design state-of-the-art security solutions. Our Vision: To lead the surveillance industry with innovative, integrated solutions.'
      ],
      chapter: 'Our Story',
      backgroundImage: '/Whisk_209c1a81361d077a8ea40c8fc4458d3edr.jpeg',
      overlay: true,
    },
    {
      index: 2,
      type: 'fixed',
      title: 'Our Journey',
      subtitle: '',
      text: [
        'From web development in 2006 to deploying 100,000+ cameras in 2024 elections, our milestones include border security, Kaziranga National Park surveillance, and examination systems for NEET, MHCET, and more. Continuing with greater milestones ahead.'
      ],
      chapter: 'Timeline',
      backgroundImage: '/Whisk_2fd88cb10bd8851962847528a683158bdr.jpeg',
      overlay: true,
    },
    {
      index: 3,
      type: 'editorial-split-reverse',
      title: 'Software Products & Services',
      subtitle: '',
      text: [
        'Web Design & Development, Domain & Hosting, IoT Applications, App Development. E-Communication: Seamlessly connect via SMS, WhatsApp, RCS, IVR, AI Chatbots. Features include notifications, advertising, reminders, and more for high engagement.'
      ],
      chapter: 'Digital Solutions',
      image: '/Whisk_2a744f09f8b1503b895428a322dd19f7dr.jpeg',
    },
    {
      index: 4,
      type: 'full',
      title: 'BIZ TRACK - ERP: First Ever Automation Centric Application',
      subtitle: 'For Enterprise, Small & Medium Businesses',
      text: [
        'CRM adapts to your needs. Sales enable 24/7 connectivity. Procurement optimizes inventory. Marketing unites teams. Accounting streamlines finances. Services enhance satisfaction. HR focuses on employee happiness. Manufacturing empowers automation.'
      ],
      chapter: 'Enterprise Tools',
      backgroundImage: '/Whisk_5c9218462b91433b43d49a612d745b2fdr.jpeg',
      overlay: true,
    },
    {
      index: 5,
      type: 'split',
      title: 'Security Products & Renewable Energy Solutions',
      subtitle: '',
      textLeft: [
        'CCTV Surveillance, Biometric Access, IP PBX/EPABX, Fire/Burglar Alarms, VTS/GPS Tracking. Committed to powering a greener future with solar rooftop solutions and Solar Smart Poles featuring CCTV, WiFi, LED, and more.'
      ],
      textRight: [
        'Projects: 5MW Solar by REIL, MEDA schools, 990kW TGSRTC. Solar Smart Pole: Standalone surveillance powered by solar for urban safety.'
      ],
      chapter: 'Secure & Sustainable',
      imageLeft: '/Whisk_5c9218462b91433b43d49a612d745b2fdr.jpeg',
      imageRight: '/Whisk_5c9218462b91433b43d49a612d745b2fdr.jpeg',
    },
    {
      index: 6,
      type: 'full',
      title: 'IT & Telecommunication | Sector Wise Excellence',
      subtitle: '',
      text: [
        'End-to-end IT/Telecom: Fiber Optics, Servers, Routers. Excellence in CCTV for Government (ECI, DRDO), Banks (Union, Canara), Defence, Commercial, Industrial, Residential. Video Management System with real-time detection, ANPR, Face Recognition.'
      ],
      chapter: 'Infrastructure & Sectors',
      backgroundImage: '/Whisk_e4aaf651996ed1ba6e249356f70a51e7eg.png',
      overlay: true,
    },
    {
      index: 7,
      type: 'video',
      title: 'Advanced Solutions: Smart Bus, In-Car Surveillance, AI Biometric',
      subtitle: '',
      text: [
        'Smart Bus: AI CCTV, GPS, Breath Analyzer, Big Data. In-Car: Facial Recognition, License Plate, Evidence Export. AI Biometric with Aadhaar: Contactless attendance for schools/govt. ANWI Laptops, TrinAI Cameras, Technorack Enclosures.'
      ],
      chapter: 'Innovation Hub',
      videoSrc: 'https://ik.imagekit.io/tsuss6ulm/corpo%20video%202%20-.mp4',
      overlay: true,
    },
    {
      index: 8,
      type: 'contact',
      title: 'Achievements & Why Brihaspathi?',
      subtitle: '',
      text: [
        '15,000+ Customers, 2M+ Cameras Installed, 1,200+ Projects. Achievements: 100K+ Election Cameras, NEET/MHCET Surveillance, BSF Borders, Kaziranga Park. Why Us: 20+ Years, Experienced Team, Client-Centric, Innovation, Competitive Pricing.'
      ],
      chapter: 'Our Impact',
      email: 'info@brihaspathi.com',
      backgroundImage: 'https://via.placeholder.com/1920x1080/6600cc/ffffff?text=Achievements+&+Milestones',
      overlay: true,
    },
  ];

  useEffect(() => {
    // DOM elements
    const pageContainer = pageContainerRef.current;
    const horizontalContainer = horizontalContainerRef.current;
    const panelsContainer = panelsContainerRef.current;
    const panels = document.querySelectorAll(".panel");
    const progressFill = document.querySelector(".nav-progress-fill");
    const navText = document.querySelectorAll(".nav-text")[1];
    const parallaxElements = document.querySelectorAll(".parallax");
    const videoBackground = document.querySelector(".video-background");
    const copyEmailBtn = copyEmailBtnRef.current;
    const copyTooltip = copyTooltipRef.current;

    // Constants
    const SMOOTH_FACTOR = 0.065;
    const WHEEL_SENSITIVITY = 1.0;
    const PANEL_COUNT = panelsData.length;
    const PARALLAX_INTENSITY = 0.5;

    // State variables
    let targetX = 0;
    let currentX = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    let panelWidth = window.innerWidth;
    let maxScroll = (PANEL_COUNT - 1) * panelWidth;
    let isAnimating = false;
    let currentPanel = 0;
    let lastPanel = -1;

    // Touch variables
    let isDragging = false;
    let startX = 0;
    let startScrollX = 0;
    let velocityX = 0;
    let lastTouchX = 0;
    let lastTouchTime = 0;

    // Helper functions
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
    const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

    // Copy email functionality
    if (copyEmailBtn && copyTooltip) {
      copyEmailBtn.addEventListener("click", () => {
        const email = document.querySelector(".email")?.textContent || '';
        navigator.clipboard.writeText(email).then(() => {
          copyTooltip.classList.add("active");
          setTimeout(() => {
            copyTooltip.classList.remove("active");
          }, 2000);
        });
      });
    }

    // Parallax update
    const updateParallax = () => {
      parallaxElements.forEach((element) => {
        if (!element) return;
        const speed = Number.parseFloat((element as HTMLElement).dataset.speed || '0.2');
        const moveX = -currentX * speed * 0.2;
        (element as HTMLElement).style.transform = `translateX(${moveX}px)`;
      });
    };

    // Update dimensions
    const updateDimensions = (animate = true) => {
      panelWidth = window.innerWidth;
      maxScroll = (PANEL_COUNT - 1) * panelWidth;
      targetX = currentPanel * panelWidth;
      currentX = targetX;
      panels.forEach((panel) => {
        (panel as HTMLElement).style.width = `${panelWidth}px`;
      });
      if (animate && panelsContainer) {
        panelsContainer.classList.add("transitioning");
        setTimeout(() => {
          panelsContainer.classList.remove("transitioning");
        }, 400);
      }
      if (panelsContainer) {
        panelsContainer.style.transform = `translateX(-${currentX}px)`;
      }
      updateParallax();
    };

    // Split text
    const splitTexts = document.querySelectorAll(".split-text");
    splitTexts.forEach((text) => {
      const words = (text as HTMLElement).textContent?.split(" ") || [];
      (text as HTMLElement).innerHTML = words
        .map((word) => `<span class="word">${word}</span>`)
        .join(" ");
      const wordElements = (text as HTMLElement).querySelectorAll(".word");
      wordElements.forEach((word, index) => {
        (word as HTMLElement).style.transitionDelay = `${index * 0.02}s`;
      });
    });

    // Update page count
    const updatePageCount = () => {
      const currentPanelIndex = Math.round(currentX / panelWidth) + 1;
      const formattedIndex = currentPanelIndex.toString().padStart(2, "0");
      const totalPanels = PANEL_COUNT.toString().padStart(2, "0");
      if (navText) navText.textContent = `${formattedIndex} / ${totalPanels}`;
    };

    // Update progress
    const updateProgress = () => {
      targetProgress = currentX / maxScroll;
      currentProgress = lerp(
        currentProgress,
        targetProgress,
        SMOOTH_FACTOR * 1.5
      );
      if (progressFill) {
        (progressFill as HTMLElement).style.transform = `scaleX(${currentProgress})`;
      }
    };

    // Update active panel
    const updateActivePanel = () => {
      currentPanel = Math.round(currentX / panelWidth);
      if (currentPanel !== lastPanel) {
        panels.forEach((panel) => {
          (panel as HTMLElement).classList.remove("was-active");
        });
        if (lastPanel >= 0 && panels[lastPanel]) {
          (panels[lastPanel] as HTMLElement).classList.remove("active");
        }
        if (panels[currentPanel]) {
          (panels[currentPanel] as HTMLElement).classList.add("active");
        }
        for (let i = 0; i < panels.length; i++) {
          if (i < currentPanel) {
            (panels[i] as HTMLElement).classList.add("visited");
          } else {
            (panels[i] as HTMLElement).classList.remove("visited");
          }
        }
        lastPanel = currentPanel;
      }
    };

    // Animation loop
    const animate = () => {
      currentX = lerp(currentX, targetX, SMOOTH_FACTOR);
      if (panelsContainer) {
        panelsContainer.style.transform = `translateX(-${currentX}px)`;
      }
      updateProgress();
      updatePageCount();
      updateActivePanel();
      updateParallax();
      if (Math.abs(targetX - currentX) > 0.1 || isAnimating) {
        requestAnimationFrame(animate);
      } else {
        isAnimating = false;
      }
    };

    // Start animation
    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(animate);
      }
    };

    // Event handlers
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetX = clamp(targetX + e.deltaY * WHEEL_SENSITIVITY, 0, maxScroll);
      startAnimation();
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest(".copy-email"))
        return;
      isDragging = true;
      startX = e.clientX;
      startScrollX = currentX;
      lastTouchX = e.clientX;
      lastTouchTime = Date.now();
      document.body.style.cursor = "grabbing";
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      targetX = clamp(startScrollX - dx, 0, maxScroll);
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTouchTime;
      if (timeDelta > 0) {
        const touchDelta = lastTouchX - e.clientX;
        velocityX = (touchDelta / timeDelta) * 15;
      }
      lastTouchX = e.clientX;
      lastTouchTime = currentTime;
      startAnimation();
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      document.body.style.cursor = "grab";
      if (Math.abs(velocityX) > 0.5) {
        targetX = clamp(targetX + velocityX * 8, 0, maxScroll);
      }
      const nearestPanel = Math.round(targetX / panelWidth);
      targetX = nearestPanel * panelWidth;
      startAnimation();
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.target instanceof Element && e.target.closest(".copy-email"))
        return;
      isDragging = true;
      startX = e.touches[0].clientX;
      startScrollX = currentX;
      lastTouchX = e.touches[0].clientX;
      lastTouchTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      targetX = clamp(startScrollX - dx, 0, maxScroll);
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTouchTime;
      if (timeDelta > 0) {
        const touchDelta = lastTouchX - e.touches[0].clientX;
        velocityX = (touchDelta / timeDelta) * 12;
      }
      lastTouchX = e.touches[0].clientX;
      lastTouchTime = currentTime;
      e.preventDefault();
      startAnimation();
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      if (Math.abs(velocityX) > 0.5) {
        targetX = clamp(targetX + velocityX * 6, 0, maxScroll);
      }
      const nearestPanel = Math.round(targetX / panelWidth);
      targetX = nearestPanel * panelWidth;
      startAnimation();
    };

    // Event listeners
    if (horizontalContainer) {
      horizontalContainer.addEventListener("wheel", handleWheel, { passive: false });
      horizontalContainer.addEventListener("mousedown", handleMouseDown);
      horizontalContainer.addEventListener("touchstart", handleTouchStart, { passive: true });
      horizontalContainer.addEventListener("touchmove", handleTouchMove, { passive: false });
      horizontalContainer.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", () => {
      updateDimensions();
    });

    // Image load for parallax
    parallaxElements.forEach((img) => {
      if ((img as HTMLImageElement).tagName === "IMG") {
        const image = img as HTMLImageElement;
        if (image.complete) {
          image.classList.add("loaded");
        } else {
          image.addEventListener("load", () => {
            image.classList.add("loaded");
          });
        }
      }
    });

    // Video
    if (videoBackground) {
      (videoBackground as HTMLVideoElement).playbackRate = 0.6;
    }

    // Initialize
    updateDimensions();
    updateActivePanel();
    updatePageCount();
    startAnimation();
    setTimeout(() => {
      if (panels[0]) (panels[0] as HTMLElement).classList.add("active");
    }, 100);
    setTimeout(() => {
      updateParallax();
    }, 200);

    // Cleanup
    return () => {
      if (horizontalContainer) {
        horizontalContainer.removeEventListener("wheel", handleWheel);
        horizontalContainer.removeEventListener("mousedown", handleMouseDown);
        horizontalContainer.removeEventListener("touchstart", handleTouchStart);
        horizontalContainer.removeEventListener("touchmove", handleTouchMove);
        horizontalContainer.removeEventListener("touchend", handleTouchEnd);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", () => updateDimensions());
      if (copyEmailBtn) copyEmailBtn.removeEventListener("click", () => {});
    };
  }, [panelsData]);

  // Render dynamic panels
  const renderPanel = (panelData: any, index: number) => {
    const { type, title, subtitle, text, chapter, image, backgroundImage, overlay, textLeft, textRight, videoSrc, email, imageLeft, imageRight } = panelData;
    let panelClass = `panel ${type}`;
    if (type === 'editorial-split-reverse') panelClass += ' editorial-split';

    return (
      <section key={index} className={panelClass} data-index={index}>
        {type === 'editorial-split' && (
          <>
            <div className="editorial-content">
              <div className="panel-content">
                {chapter && <div className="chapter">{chapter}</div>}
                {title && <h1 className="title split-text">{title}</h1>}
                {subtitle && <h2 className="subtitle split-text">{subtitle}</h2>}
                <div className="text">
                  {text?.map((p: string, i: number) => <p key={i} className="split-text">{p}</p>)}
                </div>
              </div>
            </div>
            <div className="editorial-image">
              <div className="image-wrapper">
                <img src={image} alt={title} className="parallax" data-speed="0.3" />
              </div>
            </div>
          </>
        )}
        {type === 'full' && (
          <>
            <div className="image-wrapper">
              <img src={backgroundImage} alt={title} className="panel-full-background parallax" data-speed="0.2" />
            </div>
            {overlay && <div className="panel-full-overlay"></div>}
            <div className="panel-full-content">
              {chapter && <div className="chapter">{chapter}</div>}
              {title && <h2 className="title split-text">{title}</h2>}
              {subtitle && <h2 className="subtitle split-text">{subtitle}</h2>}
              <div className="text">
                {text?.map((p: string, i: number) => <p key={i} className="split-text">{p}</p>)}
              </div>
            </div>
          </>
        )}
        {type === 'fixed' && (
          <>
            <div className="image-wrapper">
              <img src={backgroundImage} alt={title} className="panel-fixed-image parallax" data-speed="0.25" />
            </div>
            <div className="panel-fixed-content">
              <div className="space-text">{title}</div>
              <div className="text">
                {text?.map((p: string, i: number) => <p key={i} className="split-text">{p}</p>)}
              </div>
            </div>
          </>
        )}
        {type === 'editorial-split-reverse' && (
          <>
            <div className="editorial-image">
              <div className="image-wrapper">
                <img src={image} alt={title} className="parallax" data-speed="0.3" />
              </div>
            </div>
            <div className="editorial-content">
              <div className="panel-content">
                {chapter && <div className="chapter">{chapter}</div>}
                {title && <h2 className="title split-text">{title}</h2>}
                {subtitle && <h2 className="subtitle split-text">{subtitle}</h2>}
                <div className="text">
                  {text?.map((p: string, i: number) => <p key={i} className="split-text">{p}</p>)}
                </div>
              </div>
            </div>
          </>
        )}
        {type === 'split' && (
          <>
            <div className="panel-left">
              <div className="panel-content">
                {chapter && <div className="chapter">{chapter}</div>}
                {title && <h2 className="title split-text">{title}</h2>}
                <div className="text">
                  {textLeft?.map((p: string, i: number) => <p key={i} className="split-text">{p}</p>)}
                </div>
                <div className="image-container">
                  <div className="image-wrapper">
                    <img src={imageLeft} alt="Left" className="parallax" data-speed="0.15" />
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-right">
              <div className="panel-content">
                <div className="text">
                  {textRight?.map((p: string, i: number) => <p key={i} className="split-text">{p}</p>)}
                </div>
                <div className="image-container">
                  <div className="image-wrapper">
                    <img src={imageRight} alt="Right" className="parallax" data-speed="0.15" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {type === 'video' && (
          <>
            <video className="video-background" autoPlay loop muted playsInline>
              <source src={videoSrc} type="video/mp4" />
            </video>
            <div className="panel-video-overlay"></div>
            <div className="panel-video-content">
              {chapter && <div className="chapter">{chapter}</div>}
              {title && <h2 className="title split-text">{title}</h2>}
              <div className="text">
                {text?.map((p: string, i: number) => <p key={i} className="split-text">{p}</p>)}
              </div>
            </div>
          </>
        )}
        {type === 'contact' && (
          <>
            <div className="image-wrapper">
              <img src={backgroundImage} alt={title} className="panel-full-background parallax" data-speed="0.2" />
            </div>
            {overlay && <div className="panel-full-overlay"></div>}
            <div className="panel-full-content">
              {title && <div className="space-text contact-name">{title}</div>}
              <div className="text">
                {text?.map((p: string, i: number) => <p key={i} className="split-text">{p}</p>)}
              </div>
              {email && (
                <div className="email-wrapper">
                  <a href={`mailto:${email}`} className="email">{email}</a>
                  <button className="copy-email" ref={copyEmailBtnRef} title="Copy email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                  <span className="copy-tooltip" ref={copyTooltipRef}>Copied!</span>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    );
  };

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");
        :root {
          --color-primary: #ffffff;
          --color-secondary: #f8f9fa;
          --color-accent: #0066cc;
          --color-text: #001122;
          --color-text-muted: rgba(0, 17, 34, 0.8);
          --color-border: rgba(0, 17, 34, 0.1);
          --color-overlay: rgba(255, 255, 255, 0.4);
          --font-primary: "Inter", sans-serif;
          --text-xs: 0.7rem;
          --text-sm: 0.875rem;
          --text-base: 1rem;
          --text-lg: 1.2rem;
          --text-xl: 1.5rem;
          --text-2xl: 2rem;
          --text-3xl: 3rem;
          --text-mega: clamp(7rem, 15vw, 12rem);
          --space-1: 0.25rem;
          --space-2: 0.5rem;
          --space-3: 0.75rem;
          --space-4: 1rem;
          --space-5: 1.5rem;
          --space-6: 2rem;
          --space-8: 3rem;
          --space-10: 4rem;
          --space-12: 6rem;
          --panel-padding: 5%;
          --transition-fast: 0.2s ease;
          --transition-medium: 0.3s ease;
          --transition-slow: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* KEY FIX: Isolate the component styles to only affect its own container */
        .space-website-container {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 100vh;
          background-color: var(--color-primary);
          overflow: hidden;
          cursor: grab;
        }
        
        .space-website-container:active {
          cursor: grabbing;
        }
        
        /* Isolated body styles only for this component */
        .space-website-container * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: var(--font-primary);
          font-weight: 400;
        }
        
        /* Horizontal container and panels */
        .page-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        
        .horizontal-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .panels-container {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          display: flex;
          will-change: transform;
        }
        
        .panels-container.transitioning {
          transition: transform var(--transition-slow);
        }
        
        .panel {
          position: relative;
          height: 100vh;
          overflow: hidden;
          flex-shrink: 0;
        }
        
        .panel-split {
          display: flex;
        }
        
        .panel-left,
        .panel-right {
          width: 50%;
          height: 100%;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--panel-padding);
        }
        
        .panel-left {
          background-color: var(--color-primary);
          color: var(--color-text);
        }
        
        .panel-right {
          background-color: var(--color-secondary);
          color: var(--color-text);
        }
        
        .image-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .panel-full {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .panel-full-background {
          position: absolute;
          width: 110%;
          height: 110%;
          object-fit: cover;
          z-index: 1;
          will-change: transform;
          filter: brightness(1.1);
        }
        
        .panel-full-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--color-overlay);
          z-index: 2;
        }
        
        .panel-full-content {
          position: relative;
          z-index: 3;
          width: 80%;
          max-width: 800px;
          color: var(--color-text);
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
        }
        
        .panel-video {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .video-background {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          transform: translate(-50%, -50%);
          z-index: 1;
          object-fit: cover;
        }
        
        .panel-video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.6);
          z-index: 2;
        }
        
        .panel-video-content {
          position: relative;
          z-index: 3;
          width: 80%;
          max-width: 800px;
          color: var(--color-text);
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
        }
        
        .contact-name {
          font-size: clamp(6rem, 15vw, 10rem);
          color: var(--color-accent) !important;
          margin-bottom: var(--space-12);
          line-height: 1;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
        }
        
        .email-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: var(--space-3);
          background-color: rgba(0, 102, 204, 0.05);
          padding: var(--space-4) var(--space-6);
          border-radius: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: transform var(--transition-medium), background-color var(--transition-medium);
          border: 1px solid rgba(0, 102, 204, 0.1);
        }
        
        .email-wrapper:hover {
          background-color: rgba(0, 102, 204, 0.08);
          transform: translateY(-2px);
        }
        
        .email {
          font-family: var(--font-primary);
          font-size: var(--text-2xl);
          color: var(--color-text);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        
        .email:hover {
          color: var(--color-accent);
        }
        
        .copy-email {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text);
          opacity: 0.7;
          padding: var(--space-2);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: opacity var(--transition-fast), background-color var(--transition-fast), transform var(--transition-fast);
        }
        
        .copy-email:hover {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.05);
          transform: scale(1.1);
        }
        
        .copy-email:active {
          transform: scale(0.95);
        }
        
        .copy-tooltip {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--color-accent);
          color: white;
          padding: var(--space-1) var(--space-3);
          border-radius: 4px;
          font-size: var(--text-xs);
          opacity: 0;
          visibility: hidden;
          transition: opacity var(--transition-medium), visibility var(--transition-medium);
        }
        
        .copy-tooltip.active {
          opacity: 1;
          visibility: visible;
        }
        
        .panel-content {
          width: 90%;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
          overflow: visible;
        }
        
        .panel.active .panel-content,
        .panel.active .panel-full-content,
        .panel.active .panel-video-content {
          opacity: 1;
          transform: translateY(0);
        }
        
        .panel.visited .panel-content,
        .panel.visited .panel-full-content,
        .panel.visited .panel-video-content {
          opacity: 0.7;
          transform: translateY(0);
        }
        
        .word {
          display: inline-block;
          opacity: 0;
          transform: translateY(15px);
          transition: opacity 0.4s var(--ease-out-expo), transform 0.4s var(--ease-out-expo);
        }
        
        .panel.active .word {
          opacity: 1;
          transform: translateY(0);
        }
        
        .panel.visited .word {
          opacity: 0.7;
          transform: translateY(0);
        }
        
        .chapter {
          text-transform: uppercase;
          margin-bottom: var(--space-6);
          font-size: var(--text-sm);
          letter-spacing: -0.03em;
          color: var(--color-accent);
        }
        
        .title {
          font-family: var(--font-primary);
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          margin-bottom: var(--space-6);
          letter-spacing: -0.03em;
          line-height: 1.3;
          font-weight: 700;
          color: var(--color-text);
          width: 100%;
        }
        
        .subtitle {
          font-family: var(--font-primary);
          font-size: clamp(1.5rem, 3vw, 2rem);
          margin-bottom: var(--space-8);
          letter-spacing: -0.03em;
          line-height: 1;
          font-weight: 400;
          color: var(--color-text);
        }
        
        .space-text {
          font-family: var(--font-primary);
          font-size: clamp(6rem, 15vw, 10rem);
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          margin-bottom: var(--space-6);
          color: var(--color-accent);
        }
        
        .text {
          font-size: clamp(0.9rem, 1.2vw, 1.1rem);
          line-height: 1.4;
          letter-spacing: normal;
          color: var(--color-text-muted);
          width: 100%;
        }
        
        .text p {
          margin-bottom: var(--space-5);
        }
        
        .image-container {
          width: 100%;
          max-width: 450px;
          height: 300px;
          margin-bottom: var(--space-6);
          position: relative;
          overflow: hidden;
          transform: translateZ(0);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
        
        .image-container .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .image-container img {
          width: 110%;
          height: 110%;
          object-fit: cover;
          will-change: transform;
        }
        
        .editorial-split {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          height: 100%;
        }
        
        .editorial-split-reverse {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          height: 100%;
        }
        
        .editorial-content {
          padding: var(--panel-padding);
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: var(--color-primary);
        }
        
        .editorial-image {
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        
        .editorial-image .image-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .editorial-image img {
          width: 110%;
          height: 110%;
          object-fit: cover;
          filter: brightness(1.0);
          will-change: transform;
        }
        
        .panel-fixed {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }
        
        .panel-fixed-image {
          width: 110%;
          height: 110%;
          object-fit: cover;
          filter: brightness(1.0);
          will-change: transform;
        }
        
        .panel-fixed-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.5);
          color: var(--color-text);
          z-index: 2;
          padding: 0;
        }
        
        .parallax {
          will-change: transform;
          transition: opacity var(--transition-medium);
          opacity: 0;
        }
        
        .parallax.loaded {
          opacity: 1;
        }
        
        .navigation {
          position: fixed;
          bottom: var(--space-6);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: var(--space-6);
          z-index: 100;
          color: var(--color-text);
        }
        
        .nav-progress {
          width: 150px;
          height: 2px;
          background-color: rgba(0, 17, 34, 0.3);
          position: relative;
          overflow: hidden;
          border-radius: 2px;
        }
        
        .nav-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: var(--color-accent);
          transform-origin: left;
          transform: scaleX(0);
          will-change: transform;
        }
        
        .nav-text {
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-text);
        }
        
        /* Enhanced mobile responsiveness */
        @media (max-width: 1024px) {
          .panel-full-content,
          .panel-video-content {
            width: 90%;
          }
          
          .editorial-split,
          .editorial-split-reverse {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .space-website-container {
            cursor: default;
          }
          
          .horizontal-container {
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
          }
          
          .panels-container {
            height: auto;
            min-height: 100vh;
          }
          
          .panel {
            height: auto;
            min-height: 100vh;
            width: 100vw;
          }
          
          .panel-split {
            flex-direction: column;
          }
          
          .panel-left,
          .panel-right {
            width: 100%;
            height: 50%;
            padding: var(--space-6);
          }
          
          .panel-content,
          .panel-full-content,
          .panel-video-content {
            width: 95%;
            padding: var(--space-4);
          }
          
          .title {
            font-size: var(--text-2xl);
          }
          
          .subtitle {
            font-size: var(--text-xl);
          }
          
          .space-text {
            font-size: clamp(3rem, 10vw, 6rem);
          }
          
          .image-container {
            height: 180px;
            max-width: 100%;
          }
          
          .editorial-split,
          .editorial-split-reverse {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
          }
          
          .editorial-content {
            padding: var(--space-6);
          }
          
          .contact-name {
            font-size: clamp(4rem, 12vw, 8rem);
            margin-bottom: var(--space-8);
          }
          
          .email-wrapper {
            flex-direction: column;
            padding: var(--space-3);
            gap: var(--space-2);
          }
          
          .email {
            font-size: var(--text-xl);
          }
          
          .copy-email {
            margin-top: var(--space-2);
          }
          
          .navigation {
            flex-direction: column;
            gap: var(--space-4);
            bottom: var(--space-4);
          }
          
          .nav-progress {
            width: 120px;
          }
        }
        
        @media (max-width: 480px) {
          :root {
            --panel-padding: 3%;
            --space-6: 1.5rem;
            --space-8: 2rem;
          }
          
          .panel-left,
          .panel-right {
            height: auto;
            min-height: 40vh;
            padding: var(--space-4);
          }
          
          .title {
            font-size: 1.75rem;
          }
          
          .subtitle {
            font-size: 1.25rem;
          }
          
          .text {
            font-size: 0.95rem;
          }
          
          .image-container {
            height: 150px;
          }
          
          .navigation {
            bottom: var(--space-2);
          }
          
          .nav-text {
            font-size: 0.6rem;
          }
          
          .nav-progress {
            width: 100px;
            height: 1px;
          }
        }
      `}</style>
      
      {/* KEY FIX: Wrapped everything in a container div to isolate styles */}
      <div className="space-website-container">
        <div className="page-container" ref={pageContainerRef}>
          <div className="horizontal-container" ref={horizontalContainerRef}>
            <div className="panels-container" ref={panelsContainerRef}>
              {panelsData.map((panelData, index) => renderPanel(panelData, index))}
            </div>
          </div>
        </div>
        <div className="navigation">
          <div className="nav-text">SCROLL</div>
          <div className="nav-progress">
            <div className="nav-progress-fill"></div>
          </div>
          <div className="nav-text">01 / 09</div>
        </div>
      </div>
    </>
  );
};

export default SpaceWebsite;