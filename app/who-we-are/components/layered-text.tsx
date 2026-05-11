"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LayeredTextProps {
  lines?: Array<{ top: string; bottom: string }>;
  fontSize?: string;
  fontSizeMd?: string;
  lineHeight?: number;
  lineHeightMd?: number;
  className?: string;
}

export function LayeredText({
  lines = [
    { top: "\u00A0", bottom: "INFINITE" },
    { top: "INFINITE", bottom: "PROGRESS" },
    { top: "PROGRESS", bottom: "INNOVATION" },
    { top: "INNOVATION", bottom: "FUTURE" },
    { top: "FUTURE", bottom: "DREAMS" },
    { top: "DREAMS", bottom: "ACHIEVEMENT" },
    { top: "ACHIEVEMENT", bottom: "\u00A0" },
  ],
  fontSize = "72px",
  fontSizeMd = "36px",
  lineHeight = 60,
  lineHeightMd = 35,
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /** ✅ SAFE responsive state */
  const [isDesktop, setIsDesktop] = useState(false);

  /** Handle resize safely */
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const calculateTranslateX = (index: number) => {
    const baseOffsetDesktop = 35;
    const baseOffsetMobile = 18;
    const centerIndex = Math.floor(lines.length / 2);

    return {
      desktop: (index - centerIndex) * baseOffsetDesktop,
      mobile: (index - centerIndex) * baseOffsetMobile,
    };
  };

  /** GSAP hover animation (unchanged logic) */
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const paragraphs = container.querySelectorAll("p");

    timelineRef.current = gsap.timeline({ paused: true });

    timelineRef.current.to(paragraphs, {
      y: isDesktop ? -60 : -35,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
    });

    const enter = () => timelineRef.current?.play();
    const leave = () => timelineRef.current?.reverse();

    container.addEventListener("mouseenter", enter);
    container.addEventListener("mouseleave", leave);

    return () => {
      container.removeEventListener("mouseenter", enter);
      container.removeEventListener("mouseleave", leave);
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [lines, isDesktop]);

  return (
    <div
      ref={containerRef}
      className={`
        w-full max-w-full
        px-4 sm:px-6 lg:px-0
        py-16 sm:py-20 lg:py-24
        font-sans font-black uppercase antialiased
        tracking-[-1.5px] sm:tracking-[-2px]
        cursor-pointer select-none
        text-[#07518a]
        ${className}
      `}
      style={
        {
          fontSize,
          "--md-font-size": fontSizeMd,
        } as React.CSSProperties
      }
    >
      <ul className="list-none p-0 m-0 flex flex-col items-center">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index);
          const isEven = index % 2 === 0;

          return (
            <li
              key={index}
              className="overflow-hidden relative transition-transform duration-300"
              style={
                {
                  height: isDesktop
                    ? `${lineHeight}px`
                    : `${lineHeightMd}px`,
                  transform: isDesktop
                    ? `translateX(${translateX.desktop}px) skew(${
                        isEven ? "60deg, -30deg" : "0deg, -30deg"
                      }) scaleY(${isEven ? "0.66667" : "1.33333"})`
                    : `translateX(${translateX.mobile}px) skew(0deg, -20deg) scaleY(1)`,
                } as React.CSSProperties
              }
            >
              <p
                className="px-2 sm:px-3 whitespace-nowrap m-0 text-[28px] sm:text-[36px] md:text-[56px]"
                style={
                  {
                    height: isDesktop
                      ? `${lineHeight}px`
                      : `${lineHeightMd}px`,
                    lineHeight: isDesktop
                      ? `${lineHeight - 5}px`
                      : `${lineHeightMd - 4}px`,
                  } as React.CSSProperties
                }
              >
                {line.top}
              </p>

              <p
                className="px-2 sm:px-3 whitespace-nowrap m-0 text-[28px] sm:text-[36px] md:text-[56px]"
                style={
                  {
                    height: isDesktop
                      ? `${lineHeight}px`
                      : `${lineHeightMd}px`,
                    lineHeight: isDesktop
                      ? `${lineHeight - 5}px`
                      : `${lineHeightMd - 4}px`,
                  } as React.CSSProperties
                }
              >
                {line.bottom}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
