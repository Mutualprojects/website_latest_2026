"use client";

import React, { useMemo, useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

/* ========================================================
   📌 IMPORT ALL 29 CERTIFICATION IMAGES
======================================================== */

import Cert1 from "./certifiactions/1.png";
import Cert2 from "./certifiactions/2.png";
import Cert3 from "./certifiactions/3.png";
import Cert4 from "./certifiactions/4.png";
import Cert5 from "./certifiactions/5.png";
import Cert6 from "./certifiactions/6.png";
import Cert7 from "./certifiactions/7.png";
import Cert8 from "./certifiactions/8.png";
import Cert9 from "./certifiactions/9.png";
import Cert10 from "./certifiactions/10.png";
import Cert11 from "./certifiactions/11.png";
import Cert12 from "./certifiactions/12.png";
import Cert13 from "./certifiactions/13.png";
import Cert14 from "./certifiactions/14.png";
import Cert15 from "./certifiactions/15.png";
import Cert16 from "./certifiactions/16.png";
import Cert17 from "./certifiactions/17.png";
import Cert18 from "./certifiactions/18.png";
import Cert19 from "./certifiactions/19.png";
import Cert20 from "./certifiactions/20.png";
import Cert21 from "./certifiactions/21.png";
import Cert22 from "./certifiactions/22.png";
import Cert23 from "./certifiactions/23.png";
import Cert24 from "./certifiactions/24.png";
import Cert25 from "./certifiactions/25.png";
import Cert26 from "./certifiactions/26.png";
import Cert27 from "./certifiactions/27.png";
import Cert28 from "./certifiactions/28.png";
import Cert29 from "./certifiactions/29.png";

const IMAGES = [
  Cert1.src, Cert2.src, Cert3.src, Cert4.src, Cert5.src,
  Cert6.src, Cert7.src, Cert8.src, Cert9.src, Cert10.src,
  Cert11.src, Cert12.src, Cert13.src, Cert14.src, Cert15.src,
  Cert16.src, Cert17.src, Cert18.src, Cert19.src, Cert20.src,
  Cert21.src, Cert22.src, Cert23.src, Cert24.src, Cert25.src,
  Cert26.src, Cert27.src, Cert28.src, Cert29.src,
];

/* ========================================================
   📌 Split into 2 rows exactly
======================================================== */

function splitIntoTwoRows(arr: string[]) {
  const half = Math.ceil(arr.length / 2);
  return [arr.slice(0, half), arr.slice(half)];
}

/* ========================================================
   📌 Measure scroll width hook
======================================================== */

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

/* ========================================================
   📌 Marquee Row Component (smooth infinite scroll)
======================================================== */

function MarqueeRow({
  icons,
  direction = "left",
  speed = 55,
  size = 115,
  gap = 35,
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
          ["--gap" as any]: `${gap}px`,
          ["--size" as any]: `${size}px`,
        } as React.CSSProperties
      }
    >
      <motion.div
        className="flex items-center will-change-transform"
        style={{ x }}
        animate={controls}
      >
        {/* MAIN LANE */}
        <div
          ref={ref}
          className="flex items-center gap-[var(--gap)] pr-[var(--gap)]"
        >
          {repeated.map((src, index) => (
            <div
              key={`a-${index}`}
              className="relative"
              style={{ width: "var(--size)", height: "var(--size)" }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain grayscale group-hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>

        {/* DUPLICATE LANE */}
        <div
          className="flex items-center gap-[var(--gap)] pr-[var(--gap)]"
          aria-hidden="true"
        >
          {repeated.map((src, index) => (
            <div
              key={`b-${index}`}
              className="relative"
              style={{ width: "var(--size)", height: "var(--size)" }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain grayscale group-hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ========================================================
   📌 MAIN COMPONENT
======================================================== */

export default function CertificationsTwoRowMarquee() {
  const [row1, row2] = splitIntoTwoRows(IMAGES);

  return (
    <section className="w-full py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Our Certifications
      </h2>

      <div className="space-y-10">
        {/* Row 1 → scroll left */}
        <MarqueeRow
          icons={row1}
          direction="left"
          speed={60}
          size={115}
          gap={38}
        />

        {/* Row 2 → scroll right */}
        <MarqueeRow
          icons={row2}
          direction="right"
          speed={60}
          size={115}
          gap={38}
        />
      </div>
    </section>
  );
}
