// components/OurJourney.tsx
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import JourneyTimeline from "./JourneyTimeline";

/* =========
   TYPES
   ========= */
interface JourneyItem {
  id: string;
  year: number;
  title: string;
  summary: string;
  img?: string;
}

/* =========
   DATA
   ========= */
const IMG_URL =
  "https://tse1.mm.bing.net/th/id/OIP.PW1EFVspJJjLXFTLyiy-SAHaHa?pid=Api&P=0&h=180";

const JOURNEY_RAW: JourneyItem[] = [
  {
    id: "2006-Web Development",
    year: 2006,
    title: "Marketing Services And Web Development",
    summary:
      "our Journey began With a strong foundataion in web development and marketing Services paving the way for our expansion into the broder technology landscape",
    img: IMG_URL,
  },
  {
    id: "2012-city-surveillance",
    year: 2012,
    title: "City Surveillance – CCTV Camera",
    summary:
      "Kick-off with Visakhapatnam Smart City—reliable CCTV coverage, central monitoring, and alerting.",
    img: IMG_URL,
  },
  {
    id: "2014-radio-tech",
    year: 2014,
    title: "Surveillance with Radio Technology",
    summary:
      "Executed smart surveillance powered by licensed/unlicensed radio backhaul and power-efficient nodes.",
    img: IMG_URL,
  },
  {
    id: "2016-marketing-web",
    year: 2016,
    title: "Marketing Services & Web Development",
    summary:
      "Established a strong base in branding, web/app development, and digital outreach to support core roadmaps.",
    img: IMG_URL,
  },
  {
    id: "2016-nationwide-projects",
    year: 2016,
    title: "Nationwide Surveillance Projects",
    summary:
      "Pan-India rollouts with compliance, audits, and a 24×7 NOC for real-time monitoring at scale.",
    img: IMG_URL,
  },
  {
    id: "2018-kaziranga",
    year: 2018,
    title: "Kaziranga National Park",
    summary:
      "Deployed thermal and ANPR systems to support conservation, perimeter protection, and incident response.",
    img: IMG_URL,
  },
  {
    id: "2020-banking",
    year: 2020,
    title: "Banking Surveillance",
    summary:
      "Hardened ATM/branch security with AI video analytics, access control, and real-time SOC integrations.",
    img: IMG_URL,
  },
  {
    id: "2021-iot-breakthroughs",
    year: 2021,
    title: "IoT Innovation & Breakthroughs",
    summary:
      "Built remote device management and edge analytics gateways to solve complex field challenges with IoT.",
    img: IMG_URL,
  },
  {
    id: "2022-manufacturing",
    year: 2022,
    title: "Advancing into Manufacturing",
    summary:
      "Scaled in-house manufacturing aligned with Make in India—faster service, spares, and quality-controlled assembly lines.",
    img: IMG_URL,
  },
  {
    id: "2023-bsf",
    year: 2023,
    title: "Border Security Force",
    summary:
      "Executed critical projects for border security, covering sensitive checkpoints and land ports with ruggedized, always-on systems.",
    img: IMG_URL,
  },
  {
    id: "2024-election-webcasting",
    year: 2024,
    title: "Election Webcasting",
    summary:
      "Delivered nationwide election webcasting for General Elections, ensuring secure, reliable live streams and centralized monitoring.",
    img: IMG_URL,
  },
  {
    id: "2025 Examination Survilence",
    year: 2025,
    title: "Examination survilence",
    summary:
      "We have successfully expanded into education surveillance by installing 65,000+ cameras across India for NEET exams.",
    img: IMG_URL,
  },
];

/* =========
   ORDER DESC
   ========= */
const JOURNEY = [...JOURNEY_RAW].sort((a, b) => b.year - a.year);

const BRAND = "#07518a";

/* =========
   PARALLAX HOOK (FIXED)
   ========= */
function useParallax(
  ref: React.RefObject<HTMLLIElement | HTMLElement | null>
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 35%"],
  });

  return {
    contentY: useTransform(scrollYProgress, [0, 0.5, 1], [42, 0, -8]),
    contentOpacity: useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]),

    imageY: useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -4]),
    imageOpacity: useTransform(scrollYProgress, [0, 0.12, 1], [0, 1, 1]),
    imageScale: useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1]),
  };
}

/* =========
   TIMELINE ITEM
   ========= */
function TimelineItem({ j, index }: { j: JourneyItem; index: number }) {
  const liRef = useRef<HTMLLIElement | null>(null);
  const imageOnLeft = index % 2 === 1;

  const { contentY, contentOpacity, imageY, imageOpacity, imageScale } =
    useParallax(liRef);

  return (
    <li
      id={j.id}
      ref={liRef}
      className="relative scroll-mt-28 sm:scroll-mt-40 py-16 sm:py-24"
      style={{ contain: "content" }}
    >
      {/* Desktop bubble */}
      <div className="hidden lg:block sticky top-[32vh] h-0 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: BRAND,
              boxShadow: `0 0 0 8px #ffffff, 0 0 0 9px ${BRAND}40`,
            }}
          />
        </div>

        <div
          className={[
            "absolute top-1/2 -translate-y-1/2 h-px w-[min(140px,16vw)]",
            imageOnLeft ? "right-[calc(50%-1px)]" : "left-[calc(50%-1px)]",
          ].join(" ")}
          style={{ backgroundColor: `${BRAND}33` }}
        />

        {/* BUBBLE IMAGE */}
        <motion.div
          style={{
            y: imageY,
            opacity: imageOpacity,
            scale: imageScale,
          }}
          transition={{
            type: "tween",
            duration: 0.55,
            ease: "easeInOut", // FIXED
          }}
          className={[
            "absolute top-1/2 -translate-y-1/2 rounded-full bg-white overflow-hidden grid place-items-center",
            "h-24 w-24",
            imageOnLeft
              ? "right-[calc(50%+min(140px,16vw))]"
              : "left-[calc(50%+min(140px,16vw))]",
          ].join(" ")}
          role="img"
        >
          <img src={j.img} alt={j.title} className="h-full w-full object-cover" loading="lazy" />
        </motion.div>
      </div>

      {/* Mobile bubble */}
      <div className="lg:hidden relative mb-6">
        <div className="absolute left-1/2 -translate-x-1/2 top-5">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: BRAND,
              boxShadow: `0 0 0 6px #ffffff, 0 0 0 7px ${BRAND}40`,
            }}
          />
        </div>

        <motion.div
          style={{ y: imageY, opacity: imageOpacity, scale: imageScale }}
          transition={{
            type: "tween",
            duration: 0.5,
            ease: "easeInOut", // FIXED
          }}
          className={[
            "mx-auto rounded-full bg-white overflow-hidden grid place-items-center",
            "h-20 w-20",
            imageOnLeft ? "mr-auto" : "ml-auto",
          ].join(" ")}
        >
          <img src={j.img} alt={j.title} className="h-full w-full object-cover" />
        </motion.div>
      </div>

      {/* CONTENT */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        transition={{
          duration: 0.65,
          ease: "easeInOut", // FIXED
        }}
        className={[
          "relative mx-auto grid max-w-none items-start gap-6 lg:grid-cols-2",
          imageOnLeft ? "lg:pl-[min(54%,340px)]" : "lg:pr-[min(54%,340px)]",
        ].join(" ")}
      >
        <div
          className={
            imageOnLeft
              ? "lg:col-start-2 lg:text-left"
              : "lg:col-start-1 lg:text-right"
          }
        >
          <div
            className="text-4xl sm:text-5xl font-extrabold"
            style={{ color: BRAND }}
          >
            {j.year}
          </div>
          <h3 className="mt-3 text-2xl sm:text-3xl font-semibold text-neutral-900">
            {j.title}
          </h3>
          <p className="mt-3 max-w-prose text-neutral-600">{j.summary}</p>
        </div>
      </motion.div>
    </li>
  );
}

/* =========
   PARENT
   ========= */
const OurJourney = () => {
  return (
    <section id="our-journey" className="relative bg-white">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Dynamic SheetDB Interactive Dial Timeline */}
      <JourneyTimeline />

      {/* Header */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-20">
        <div className="text-center">
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wider"
            style={{
              borderColor: `${BRAND}22`,
              color: BRAND,
              background: "#ffffff",
            }}
          >
            Detailed Log
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
            Historical Roadmap
          </h2>
          <p className="mt-3 text-neutral-600">
            Start from <strong>{JOURNEY[0].year}</strong> and travel back to{" "}
            <strong>{JOURNEY[JOURNEY.length - 1].year}</strong>.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
          style={{ backgroundColor: `${BRAND}33` }}
        />
        <ol className="relative">
          {JOURNEY.map((j, i) => (
            <TimelineItem key={j.id} j={j} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default OurJourney;
