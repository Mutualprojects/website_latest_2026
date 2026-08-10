"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { OrgPerson } from "./TeamGrid";

interface TeamHeroProps {
  people: OrgPerson[];
  personPhoto: (url?: string) => string;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Deterministic pseudo-random generator seeded by index, so every image gets
// a unique-but-stable animation signature (no hydration mismatches).
function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function rangeFromSeed(seed: number, min: number, max: number) {
  return min + seededRandom(seed) * (max - min);
}

export default function TeamHero({ people, personPhoto }: TeamHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!containerRef.current || people.length === 0) return;

    // --- Lenis smooth scroll, wired into GSAP's ticker + ScrollTrigger ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
    }
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    // --- Per-image 3D scroll-triggered reveal, each with unique timing ---
    const ctx = gsap.context(() => {
      tileRefs.current.forEach((el, index) => {
        if (!el) return;

        const rotateX = rangeFromSeed(index * 3 + 1, -55, 55);
        const rotateY = rangeFromSeed(index * 3 + 2, -55, 55);
        const z = rangeFromSeed(index * 3 + 3, -400, -150);
        const x = rangeFromSeed(index * 3 + 4, -120, 120);
        const y = rangeFromSeed(index * 3 + 5, 80, 220);
        const duration = rangeFromSeed(index * 5 + 1, 0.9, 1.6);
        const delay = rangeFromSeed(index * 5 + 2, 0, 0.3);

        gsap.set(el, {
          opacity: 0,
          x,
          y,
          z,
          rotateX,
          rotateY,
          transformPerspective: 1200,
          transformOrigin: "center center",
        });

        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 40%",
            toggleActions: "play none none reverse",
            scrub: false,
          },
        });

        // Subtle continuous tilt tied to scroll position (removed y offset to keep grid flush)
        gsap.to(el, {
          rotateX: index % 3 === 0 ? 4 : -4,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [people]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white overflow-hidden p-[10px]"
      style={{ perspective: "1400px" }}
    >
      <div className="relative w-full">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[10px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {people.map((member, index) => (
            <div
              key={member.id}
              style={{ perspective: "1200px" }}
            >
              <div
                ref={(el) => {
                  tileRefs.current[index] = el;
                }}
                className="group relative w-full aspect-[4/5] overflow-hidden bg-slate-900 will-change-transform"
              >
                <img
                  src={personPhoto(member.photo)}
                  alt=""
                  className="w-full h-full object-cover grayscale-[20%] scale-[1.03] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}

          {people.length === 0 && (
            <div className="col-span-full flex items-center justify-center text-slate-500 text-sm py-24">
              &nbsp;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}