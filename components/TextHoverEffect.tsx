"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

/**
 * TextHoverEffect — scroll-triggered color-reveal text
 * @param text      the text to display
 * @param duration  animation speed (optional)
 * @param className additional Tailwind classes
 */
export const TextHoverEffect = ({
  text,
  duration = 0.4,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  // --- scroll trigger ---
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.4, once: false });
  const controls = useAnimation();

  // When the section comes into view, trigger animation
  useEffect(() => {
    if (inView) {
      controls.start({ strokeDashoffset: 0 });
    } else {
      controls.start({ strokeDashoffset: 1000 });
    }
  }, [inView, controls]);

  // simple drifting mask (auto-moves slightly)
  useEffect(() => {
    const interval = setInterval(() => {
      const cx = `${50 + Math.sin(Date.now() / 1000) * 10}%`;
      const cy = `${50 + Math.cos(Date.now() / 1000) * 10}%`;
      setMaskPosition({ cx, cy });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 300 250"
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none uppercase ${className ?? ""}`}
      >
        <defs>
          {/* Gradient for stroke reveal */}
          <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="25%" stopColor="#07518a" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="75%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          {/* Moving radial mask */}
          <radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="25%"
            cx={maskPosition.cx}
            cy={maskPosition.cy}
            style={{ transition: `cx ${duration}s ease-out, cy ${duration}s ease-out` }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>

          <mask id="textMask">
            <rect width="100%" height="100%" fill="url(#revealMask)" />
          </mask>
        </defs>

        {/* Base outline (light grey) */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          className="fill-transparent stroke-neutral-300 font-[helvetica] text-7xl font-bold opacity-40"
        >
          {text}
        </text>

        {/* Animated stroke drawing */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          stroke="#07518a"
          className="fill-transparent font-[helvetica] text-7xl font-bold"
          initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
          animate={controls}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {text}
        </motion.text>

        {/* Gradient color reveal */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="url(#textGradient)"
          strokeWidth="0.3"
          mask="url(#textMask)"
          className="fill-transparent font-[helvetica] text-7xl font-bold"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};
