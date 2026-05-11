"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { TimelineDemo } from "../about/components/TimelineDemo";

const BRAND = "#07518a";
const banner_image = "/355737.jpg";

/* ========= Floating background (same as Board of Directors) ========= */
function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 300 + i * 100,
            height: 300 + i * 100,
            backgroundColor: `${BRAND}${i === 0 ? "08" : i === 1 ? "05" : "03"}`,
            left: `${10 + i * 30}%`,
            top: `${20 + i * 25}%`,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12 + i * 4,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1] as const,
          }}
        />
      ))}
    </div>
  );
}

export default function Page() {
  const headerRef = useRef<HTMLElement>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-neutral-50 to-white">
      {/* ========= Hero (About-style) ========= */}
      <section
        className="relative min-h-[50vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${banner_image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/70 to-white/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07518a]/85 via-[#07518a]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-white max-w-2xl"
          >
            <div className="text-xs tracking-[0.3em] uppercase mb-4 text-blue-100">
              Since 2006
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Our Journey
            </h1>
            <p className="mt-6 text-blue-100 text-base sm:text-lg leading-relaxed">
              From web development and marketing to national-scale surveillance, IoT,
              and AI—explore the milestones that define Brihaspathi as the Guru of
              Tomorrow&apos;s Technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========= Main content (same layout as About sub-pages) ========= */}
      <main className="relative pt-12 sm:pt-16 pb-16">
        <FloatingShapes />

        {/* Page header with transitions (Board of Directors style) */}
        <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.header
            ref={headerRef}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              hidden: {},
            }}
            className="mb-12 text-center md:mb-16"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const }}
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{
                color: BRAND,
                backgroundColor: "rgba(7,81,138,0.1)",
                border: "1px solid rgba(7,81,138,0.2)",
              }}
            >
              Milestones
            </motion.div>

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
              style={{ color: BRAND }}
            >
              A Roadmap of Growth
            </motion.h2>

            <motion.div
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="mx-auto mt-4 h-1 w-24 rounded-full origin-center"
              style={{ backgroundColor: BRAND }}
            />

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 sm:text-lg"
            >
              From our roots in 2006 to nationwide surveillance, elections,
              and AI—every step has built toward a smarter, safer future.
            </motion.p>
          </motion.header>
        </section>

        {/* Timeline (existing TimelineDemo) */}
        <div className="relative">
          <TimelineDemo />
        </div>
      </main>
    </div>
  );
}
