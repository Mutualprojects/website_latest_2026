"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useAnimationControls,
  Variants,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

import {
  RadioTower,
  Home,
  Lightbulb,
  Network,
  Brain,
  Cctv,
  LucideIcon,
} from "lucide-react";

import Secure from "../app/images/sollutionimages/only-b-logo-white-2.png";

/* BRAND */
const BRAND = "#07518A";

/* Desktop reference grid */
const BASE_VW = 1200;
const BASE_VH = 600;

interface NodeSpec {
  id: string;
  label: string;
  x: number;
  y: number;
  Icon: LucideIcon;
}

const BASE_NODES: NodeSpec[] = [
  { id: "esec", label: "E-Security", x: 430, y: 120, Icon: Cctv },
  { id: "it", label: "IT / Telecom", x: 980, y: 90, Icon: RadioTower },
  { id: "home", label: "Home Automation", x: 1060, y: 310, Icon: Home },
  { id: "elv", label: "ELV Solutions", x: 900, y: 480, Icon: Lightbulb },
  { id: "iot", label: "Internet of Things", x: 360, y: 520, Icon: Network },
  { id: "ai", label: "AI-driven Software", x: 210, y: 360, Icon: Brain },
];

function curve(x: number, y: number, cx: number, cy: number) {
  const dx = x - cx;
  const dy = y - cy;
  return `M ${cx},${cy} Q ${cx + dx * 0.55},${cy + dy * 0.55} ${x},${y}`;
}

/* Motion Variants */
const nodeVariant: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.9 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.25 + i * 0.08, type: "spring" },
  }),
};

const centerOrb: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, type: "spring" },
  },
};

const pathVariant = (i: number): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 0.9,
    transition: { duration: 1.5, delay: 0.1 + i * 0.07 },
  },
});

/* MAIN COMPONENT */
export default function AnimatedCapabilitiesOrbit() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(wrapRef, { once: true });
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  const [center, setCenter] = useState({ cx: 600, cy: 300 });
  const [scale, setScale] = useState(1);

  /* Center + Scale Recalculation */
  useEffect(() => {
    function update() {
      const box = wrapRef.current?.getBoundingClientRect();
      if (!box) return;

      const w = box.width;
      const h = box.height;

      setCenter({ cx: w / 2, cy: h / 2 });

      // smooth scale mapping
      if (w < 480) setScale(0.45);
      else if (w < 768) setScale(0.7);
      else if (w < 1024) setScale(0.85);
      else setScale(1);
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Orbit animation start */
  useEffect(() => {
    if (isInView) controls.start("show");
  }, [isInView]);

  /* Mouse tilt */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const tiltX = useTransform(my, [-0.5, 0.5], [10, -10]);
  const tiltY = useTransform(mx, [-0.5, 0.5], [-10, 10]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  const NODES = BASE_NODES.map((n) => ({
    ...n,
    x: center.cx + (n.x - BASE_VW / 2) * scale,
    y: center.cy + (n.y - BASE_VH / 2) * scale,
  }));

  return (
    <section className="w-full py-14 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: BRAND }}>
          Our Capabilities
        </h2>
      </div>

      {/* ORBIT WRAPPER (centered) */}
      <div className="w-full flex justify-center mt-10">
        <motion.div
          ref={wrapRef}
          onMouseMove={onMove}
          className="relative overflow-hidden"
          style={{
            width: "100%",
            maxWidth: "900px",
            height: "520px",
            rotateX: reduceMotion ? 0 : tiltX,
            rotateY: reduceMotion ? 0 : tiltY,
          }}
        >
          {/* SVG Orbit */}
          <svg width="100%" height="100%" style={{ overflow: "visible" }}>
            {NODES.map((n, i) => (
              <motion.path
                key={i}
                d={curve(n.x, n.y, center.cx, center.cy)}
                stroke={BRAND}
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
                variants={pathVariant(i)}
                initial="hidden"
                animate={controls}
              />
            ))}

            {/* CENTER ORB */}
            <motion.g
              variants={centerOrb}
              initial="hidden"
              animate={controls}
            >
              <circle
                cx={center.cx}
                cy={center.cy}
                r={90 * scale}
                fill="none"
                stroke={BRAND}
                strokeOpacity="0.15"
                strokeWidth={18 * scale}
              />

              <circle
                cx={center.cx}
                cy={center.cy}
                r={60 * scale}
                fill={BRAND}
              />

              <image
                href={Secure.src}
                x={center.cx - 30 * scale}
                y={center.cy - 30 * scale}
                width={60 * scale}
                height={60 * scale}
              />
            </motion.g>
          </svg>

          {/* NODE ICONS */}
          {NODES.map((n, i) => (
            <motion.div
              key={n.id}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={nodeVariant}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: n.x, top: n.y }}
            >
              <div
                className="rounded-full shadow-lg flex items-center justify-center"
                style={{
                  width: scale * 70,
                  height: scale * 70,
                  backgroundColor: BRAND,
                }}
              >
                <n.Icon color="white" size={scale * 28} />
              </div>

              {/* Hide labels on mobile */}
              <p
                className="mt-2 text-sm font-semibold hidden md:block"
                style={{ color: BRAND }}
              >
                {n.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
