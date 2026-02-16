"use client";

import React, { useMemo, useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

const LOGOS_DIR = "/certificate-logos";

/**
 * Certification logos in public/certificate-logos/
 * (ISO 9001, ISO 14001, ISO 45001, ISO 27001, ISO 20000-1, CMMI, GeM, RAILTEL)
 */
const CERT_LOGO_FILES = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
];

const LOGO_PATHS = CERT_LOGO_FILES.map((f) => `${LOGOS_DIR}/${f}`);

function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [w, setW] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const measure = () => setW(ref.current!.scrollWidth);
    measure();
    const obs = new ResizeObserver(measure);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return { ref, width: w };
}

function MarqueeRow({
  icons,
  direction = "left",
  speed = 55,
  size = 100,
  gap = 32,
}: {
  icons: string[];
  direction?: "left" | "right";
  speed?: number;
  size?: number;
  gap?: number;
}) {
  const reduce = useReducedMotion();
  const repeated = useMemo(() => [...icons, ...icons], [icons]);
  const controls = useAnimationControls();
  const x = useMotionValue(0);

  const { ref, width } = useElementWidth<HTMLDivElement>();
  const [paused, setPaused] = useState(false);

  React.useEffect(() => {
    if (reduce || width === 0) return;

    let cancel = false;

    async function loop() {
      while (!cancel && !paused) {
        await controls.start({
          x: direction === "left" ? -width : 0,
          transition: { duration: width / speed, ease: "linear" },
        });

        controls.set({
          x: direction === "left" ? 0 : -width,
        });
      }
    }
    loop();

    return () => {
      cancel = true;
      controls.stop();
    };
  }, [width, paused, direction, speed, reduce]);

  return (
    <div
      className="relative overflow-hidden w-full select-none group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={
        {
          ["--gap" as string]: `${gap}px`,
          ["--size" as string]: `${size}px`,
        } as React.CSSProperties
      }
    >
      <motion.div
        className="flex items-center will-change-transform"
        style={{ x }}
        animate={controls}
      >
        <div
          ref={ref}
          className="flex items-center gap-[var(--gap)] pr-[var(--gap)]"
        >
          {repeated.map((src, index) => (
            <div
              key={`a-${index}`}
              className="relative flex-shrink-0"
              style={{ width: "var(--size)", height: "var(--size)" }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain"
                sizes="100px"
                unoptimized
              />
            </div>
          ))}
        </div>

        <div
          className="flex items-center gap-[var(--gap)] pr-[var(--gap)] flex-shrink-0"
          aria-hidden="true"
        >
          {repeated.map((src, index) => (
            <div
              key={`b-${index}`}
              className="relative flex-shrink-0"
              style={{ width: "var(--size)", height: "var(--size)" }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain"
                sizes="100px"
                unoptimized
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function CertificationsStrip() {
  if (LOGO_PATHS.length === 0) return null;

  return (
    <section className="w-full py-12 md:py-14 bg-gray-50/80">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 px-4">
        Our Certifications
      </h2>
      <div className="w-full">
        <MarqueeRow
          icons={LOGO_PATHS}
          direction="left"
          speed={55}
          size={100}
          gap={32}
        />
      </div>
    </section>
  );
}
