"use client";

import React, { useMemo, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

/* ================= Types ================= */
export type WhyItem = {
  title: string;
  highlight?: string;
  description: string;
  points?: string[];
  imageSrc: string | StaticImageData;
};

type Props = {
  items?: WhyItem[];
  title?: string;
  brandHex?: string;
};

/* ================= Images ================= */
import Nationwide from "./Testimonialimages/nationawide.png";
import Expertise from "./Testimonialimages/expertise-1.png";
import Trusted from "./Testimonialimages/end-to-end-1.png";
import Innovation from "./Testimonialimages/innovation-1.png";

/* ================= Default Data ================= */
const DEFAULT_ITEMS: WhyItem[] = [
  {
    title: "Nationwide Presence",
    description:
      "With operational reach across India, we deliver projects consistently across geographies while maintaining uniform quality, governance, and execution standards.",
    points: [
      "Pan-India execution capability",
      "Urban, semi-urban & rural deployments",
      "Dedicated regional operations teams",
    ],
    imageSrc: Nationwide,
  },
  {
    title: "End-to-End Expertise",
    highlight: "Concept to Completion",
    description:
      "We manage the entire project lifecycle — from advisory and design to deployment, integration, and long-term operations.",
    points: [
      "Consulting & solution architecture",
      "System integration & rollout",
      "Operations & lifecycle management",
    ],
    imageSrc: Expertise,
  },
  {
    title: "Trusted by Leading PSUs",
    description:
      "Recognized as a dependable partner for large-scale, mission-critical public sector and government initiatives.",
    points: [
      "Strict compliance & governance",
      "Transparent execution practices",
      "Long-term institutional partnerships",
    ],
    imageSrc: Trusted,
  },
  {
    title: "Innovation",
    highlight: "Built for Tomorrow",
    description:
      "We continuously invest in advanced technologies to future-proof solutions and support evolving business needs.",
    points: [
      "AI & analytics-driven platforms",
      "Scalable & modular architectures",
      "Security-first solution design",
    ],
    imageSrc: Innovation,
  },
];

/* ================= Motion Helpers ================= */
const appear = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

function useParallax(
  ref: React.RefObject<HTMLDivElement | null>,
  distance = 120
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 20%", "end 20%"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return useSpring(raw, {
    stiffness: 110,
    damping: 22,
    mass: 0.6,
  });
}

function useImageFloat(ref: React.RefObject<HTMLDivElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 25%"],
  });

  return useTransform(scrollYProgress, [0, 1], [-14, 14]);
}

/* ================= Panel ================= */
function Panel({
  item,
  brandHex,
}: {
  item: WhyItem;
  brandHex: string;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const y = useParallax(panelRef, 40);
  const imgY = useImageFloat(imageRef);

  return (
    <motion.div
      ref={panelRef}
      style={{ y }}
      {...appear(0.1)}
      className="w-full"
    >
      {/* IMAGE — fixed height so all icons same size */}
      <motion.div
        ref={imageRef}
        style={{ y: imgY }}
        className="relative w-full h-[72px] sm:h-[80px] md:h-[88px]"
      >
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          className="object-contain object-left px-4 md:px-6"
          priority
        />
      </motion.div>

      {/* CONTENT */}
      <div className="mt-8 flex gap-6">
        {/* Accent */}
        <div
          className="w-[3px] rounded-full"
          style={{ backgroundColor: brandHex }}
        />

        <div className="max-w-xl">
          <h3
            className="text-2xl md:text-3xl font-semibold leading-tight"
            style={{ color: brandHex }}
          >
            {item.title}
          </h3>

          {item.highlight && (
            <p
              className="mt-1 text-xs md:text-sm uppercase tracking-widest font-semibold"
              style={{ color: brandHex }}
            >
              {item.highlight}
            </p>
          )}

          <p className="mt-4 text-gray-700 text-base md:text-lg leading-relaxed">
            {item.description}
          </p>

          {item.points && (
            <ul className="mt-5 space-y-3">
              {item.points.map((pt, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-700 text-sm md:text-base"
                >
                  <span
                    className="mt-2 h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: brandHex }}
                  />
                  {pt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ================= Lane ================= */
function Lane({
  items,
  brandHex,
  travel,
  offsetTop = 0,
  align = "start",
}: {
  items: WhyItem[];
  brandHex: string;
  travel: number;
  offsetTop?: number;
  align?: "start" | "end";
}) {
  const laneRef = useRef<HTMLDivElement | null>(null);
  const y = useParallax(laneRef, travel);

  return (
    <motion.div
      ref={laneRef}
      style={{ y }}
      className={`flex flex-col gap-28 ${
        align === "end" ? "items-end" : ""
      }`}
    >
      {offsetTop > 0 && <div style={{ height: offsetTop }} />}

      {items.map((it, i) => (
        <div key={i} className="w-full max-w-[640px]">
          <Panel item={it} brandHex={brandHex} />
        </div>
      ))}
    </motion.div>
  );
}

/* ================= MAIN ================= */
export default function WhyChooseBrihaspathi({
  items,
  title = "Why Brihaspathi?",
  brandHex = "#07518a",
}: Props) {
  const data = useMemo(() => items ?? DEFAULT_ITEMS, [items]);

  const left: WhyItem[] = [];
  const right: WhyItem[] = [];

  data.forEach((it, i) => (i % 2 === 0 ? left.push(it) : right.push(it)));

  return (
    <section className="relative bg-white py-28 px-6 md:px-16 ">
      <motion.h2
        {...appear(0)}
        className="text-3xl md:text-4xl font-semibold text-center text-black"
      >
        {title}
      </motion.h2>

      <motion.p
        {...appear(0.1)}
        className="mt-4 max-w-2xl mx-auto text-center text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed"
      >
        Trusted by governments, defence forces, and enterprises across India. We
        combine scale, innovation, and end-to-end delivery to turn complex
        requirements into reliable outcomes.
      </motion.p>

      <div className="mx-auto max-w-7xl mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <Lane items={left} brandHex={brandHex} travel={140} offsetTop={100} />
          <Lane items={right} brandHex={brandHex} travel={180} align="end" />
        </div>
      </div>
    </section>
  );
}
