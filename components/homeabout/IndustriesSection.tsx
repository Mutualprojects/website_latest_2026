"use client";

import React, { useState } from "react";
import { motion, Transition } from "framer-motion";
import Image from "next/image";

/* ---------------- BRAND ---------------- */
const BRAND = "#07518a";

/* ---------------- HELPERS ---------------- */
const EASING: Transition["ease"] = [0.22, 1, 0.36, 1] as const;

const MOTION_TIMING: Transition = {
  duration: 0.9,
  ease: EASING,
};

const randomDelay = (index: number, min = 0.1, max = 0.25) =>
  (index * 0.12) % (max - min) + min;

const softMonoGradient = (color: string, opacity: number) =>
  `linear-gradient(
    135deg,
    ${color}${Math.floor(opacity * 255).toString(16)} 0%,
    transparent 100%
  )`;

/* ---------------- TYPES ---------------- */
type Industry = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

/* ---------------- DATA ---------------- */
const INDUSTRIES: Industry[] = [
  {
    slug: "government",
    title: "Government",
    image: "https://ik.imagekit.io/tsuss6ulm/Industries/govt.jpeg",
    description:
      "Scalable AI intelligence enhances public safety, crisis response, and digital governance.",
  },
  {
    slug: "banking",
    title: "Banking & BFSI",
    image: "https://ik.imagekit.io/tsuss6ulm/Industries/bank.png",
    description:
      "AI-powered monitoring protects ATMs, branches, and transactions while reducing fraud.",
  },
  {
    slug: "manufacturing",
    title: "Industrial",
    image: "/industries/industrial.png",
    description:
      "AI-driven automation improves productivity, predicts failures, and reduces downtime in modern manufacturing environments.",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    image: "https://ik.imagekit.io/tsuss6ulm/Industries/hospital.jpeg",
    description:
      "AI assists patient monitoring, anomaly detection, and infection control for better outcomes.",
  },
  {
    slug: "defence",
    title: "Defence & Security",
    image: "https://ik.imagekit.io/tsuss6ulm/Industries/defence.avif",
    description:
      "Real-time surveillance analytics enable rapid threat detection and mission readiness in high-security zones.",
  },
  {
    slug: "transport",
    title: "Transport",
    image: "/industries/transport.png",
    description:
      "AI-powered solutions for metro, rail, and urban transit—enhancing safety, operations, and passenger experience.",
  },
];

/* ---------------- IMAGE WITH FALLBACK ---------------- */
function IndustryImage({ src, alt }: { src: string; alt: string }) {
  const [useFallback, setUseFallback] = useState(false);
  if (useFallback) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover transition-transform duration-700 group-hover:scale-105"
      unoptimized
      onError={() => setUseFallback(true)}
    />
  );
}

/* ---------------- COMPONENT ---------------- */
export default function IndustriesWeServeSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
          Industries We <span className="text-[#07518a]">Serve</span>
        </h2>

        <p className="text-center text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto mb-14 sm:mb-20">
          Premium AI-powered solutions designed to transform every major sector.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {INDUSTRIES.map((item, index) => {
            const isOdd = index % 2 !== 0;

            return (
              <motion.div
                key={item.slug}
                initial={{
                  opacity: 0,
                  x: isOdd ? 40 : -40,
                  y: 40,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  ...MOTION_TIMING,
                  delay: randomDelay(index),
                }}
                viewport={{ once: true, amount: 0.25 }}
              >
                {/* CARD */}
                <div className="relative group">

                  {/* BACKGROUND LAYERS — disabled rotation on mobile */}
                  <div
                    className="
                      absolute inset-0 rounded-3xl
                      hidden sm:block rotate-6
                      group-hover:rotate-3 transition-transform duration-500
                    "
                    style={{ background: softMonoGradient(BRAND, 0.14) }}
                  />
                  <div
                    className="
                      absolute inset-0 rounded-3xl
                      hidden sm:block -rotate-6
                      group-hover:-rotate-3 transition-transform duration-500
                    "
                    style={{ background: softMonoGradient(BRAND, 0.1) }}
                  />

                  {/* MAIN CARD */}
                  <div
                    className="
                      relative rounded-3xl overflow-hidden bg-white
                      shadow-xl transition-all duration-500
                      group-hover:-translate-y-3
                    "
                  >
                    {/* IMAGE */}
                    <div className="aspect-[4/3] w-full min-h-[200px] overflow-hidden relative bg-gray-100">
                      <IndustryImage src={item.image} alt={item.title} />

                      {/* HOVER OVERLAY (DESKTOP ONLY) */}
                      <div
                        className="
                          absolute inset-0 hidden sm:flex
                          bg-black/70 opacity-0
                          group-hover:opacity-100
                          transition-opacity duration-500
                          items-center justify-center p-6
                        "
                      >
                        <p className="text-white text-sm leading-relaxed text-center">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 sm:p-8 text-center">
                      <h3 className="text-lg sm:text-2xl font-bold text-[#07518a] mb-2">
                        {item.title}
                      </h3>

                      {/* MOBILE DESCRIPTION */}
                      <p className="text-xs sm:hidden text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
