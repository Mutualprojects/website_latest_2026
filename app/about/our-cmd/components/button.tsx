"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends HTMLMotionProps<"button"> {
  text?: string;
  variant?: "dark" | "light";
  showArrow?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export default function PremiumButton({
  text = "Launch Now",
  variant = "light",
  showArrow = true,
  className,
  href,
  target,
  rel,
  ...props
}: PremiumButtonProps) {
  const isDark = variant === "dark";

  // Use motion.a if href is provided, otherwise motion.button
  const Component = href ? motion.a : motion.button;

  // Combine attributes and type cast to any to support both a/button attributes
  const componentProps = {
    whileHover: "hover",
    whileTap: "tap",
    initial: "initial",
    className: cn(
      "relative group overflow-visible flex items-center justify-center gap-3 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 select-none cursor-pointer",
      isDark
        ? "bg-[#0b0c10] text-white border border-white/5 shadow-2xl hover:bg-[#12131a]"
        : "bg-white text-slate-900 border border-slate-100 shadow-xl hover:shadow-2xl hover:bg-slate-50",
      className
    ),
    ...(href ? { href, target, rel } : {}),
    ...props,
  } as any;

  return (
    <>
      {/* Injecting keyframe animation for the shimmering gradient border */}
      <style jsx global>{`
        @keyframes border-shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .neon-gradient-bg {
          background: linear-gradient(
            90deg,
            #d946ef, /* Magenta */
            #8b5cf6, /* Purple */
            #06b6d4, /* Cyan */
            #3b82f6, /* Blue */
            #d946ef  /* Magenta */
          );
          background-size: 200% 200%;
          animation: border-shimmer 6s linear infinite;
        }
      `}</style>

      <Component {...componentProps}>
        {/* Glow behind the button (visible on hover) */}
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10 pointer-events-none neon-gradient-bg",
            isDark ? "scale-95 group-hover:scale-105" : "scale-90 group-hover:scale-100"
          )}
        />

        {/* TOP GLOWING BORDER */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-[1.5px] overflow-visible pointer-events-none">
          {/* Main glowing line */}
          <span className="absolute inset-0 rounded-full neon-gradient-bg opacity-85 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Extended blur line for glow effect */}
          <span className="absolute inset-0 rounded-full neon-gradient-bg blur-[3px] opacity-75 group-hover:opacity-100 group-hover:blur-[5px] transition-all duration-300" />
        </span>

        {/* BOTTOM GLOWING BORDER */}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-[1.5px] overflow-visible pointer-events-none">
          {/* Main glowing line */}
          <span className="absolute inset-0 rounded-full neon-gradient-bg opacity-85 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Extended blur line for glow effect */}
          <span className="absolute inset-0 rounded-full neon-gradient-bg blur-[3px] opacity-75 group-hover:opacity-100 group-hover:blur-[5px] transition-all duration-300" />
        </span>

        {/* Button Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {text}
        </span>

        {showArrow && (
          <motion.span
            variants={{
              initial: { x: 0, scale: 1 },
              hover: { x: 4, scale: 1.05 },
              tap: { x: 2, scale: 0.95 }
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="relative z-10 flex items-center justify-center"
          >
            <ArrowRight
              className={cn(
                "w-4 h-4 transition-colors duration-300",
                isDark ? "text-cyan-400 group-hover:text-cyan-300" : "text-cyan-600 group-hover:text-cyan-500"
              )}
              strokeWidth={2.5}
            />
          </motion.span>
        )}
      </Component>
    </>
  );
}
