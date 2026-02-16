"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import createGlobe from "cobe"; // now works because of types/cobe.d.ts
import { motion, useInView } from "framer-motion";
import { MapPin, Globe2, CheckCircle2 } from "lucide-react";

/* =====================================================
   Types
===================================================== */
interface WeserveProps {
  locations?: string[];
  title?: string;
  subtitle?: string;
}

interface GlobeProps {
  className?: string;
  config?: any; // cobe requires any
}

/* Utility */
const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const BRAND_START = "from-sky-500";
const BRAND_END = "to-indigo-600";

/* =====================================================
   MAIN COMPONENT — NO TS ERRORS
===================================================== */
export default function Weserve({
  locations = ["India", "Dubai", "US"],
  title = "We serve",
  subtitle = "Global coverage. Local expertise.",
}: WeserveProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, {
    margin: "-20% 0px -20% 0px",
  });

  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(inView), [inView]);

  const cities = useMemo(() => {
    const seen = new Set<string>();
    return locations
      .map((c) => (c || "").trim())
      .filter(Boolean)
      .filter((c) =>
        seen.has(c.toLowerCase()) ? false : (seen.add(c.toLowerCase()), true)
      );
  }, [locations]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full mx-auto overflow-hidden rounded-3xl bg-slate-50 border border-gray-200 shadow-lg px-6 py-20 sm:px-10 md:px-16 md:py-28 lg:py-36 xl:py-44"
    >
      <div className="flex flex-col-reverse items-center justify-between gap-16 md:flex-row lg:gap-24 xl:gap-28">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center gap-8 w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }} // TS OK
            className="space-y-4"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
              <Globe2 className="h-4 w-4" /> Global Delivery
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900">
              {title}{" "}
              <span
                className={`text-[#07518a]`}
              >
                worldwide
              </span>
            </h2>

            <p className="max-w-prose text-base sm:text-lg text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          </motion.div>

          {/* Locations List */}
          <div className="mt-2">
            <p className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-indigo-500" /> Operating in
            </p>

            <ul className="grid gap-2 sm:grid-cols-2">
              {cities.map((place) => (
                <li
                  key={place}
                  className="group relative flex items-center gap-3 rounded-xl border border-slate-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur transition-transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span
                    className={`inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r ${BRAND_START} ${BRAND_END}`}
                  />
                  <span className="font-medium text-slate-900">{place}</span>
                  <MapPin className="ml-auto h-4 w-4 text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE: GLOBE */}
        <div className="relative w-full flex justify-center md:justify-end">
          <div className="relative w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] xl:w-[430px] aspect-square">
            <div className="absolute inset-0 scale-90 md:scale-100 lg:scale-105 xl:scale-110">
              <Globe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   GLOBE COMPONENT — 100% TS SAFE
===================================================== */

const GLOBE_CONFIG = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [0.98, 0.39, 0.08],
  glowColor: [1, 1, 1],
  markers: [
    { location: [21, 78], size: 0.07 },
    { location: [39.82, -98.57], size: 0.07 },
    { location: [25.27, 55.29], size: 0.07 },
  ],
};

export function Globe({ className, config = GLOBE_CONFIG }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phiRef = useRef(0);
  const dragAnchorRef = useRef<number | null>(null);
  const dragDeltaRef = useRef(0);
  const rotationRef = useRef(0);
  const sizeRef = useRef(0);

  const setCursor = (grab: boolean) => {
    if (canvasRef.current) canvasRef.current.style.cursor = grab ? "grabbing" : "grab";
  };

  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;
    sizeRef.current = canvasRef.current.offsetWidth;
  }, []);

  const handlePointerDown = (clientX: number) => {
    dragAnchorRef.current = clientX - dragDeltaRef.current;
    setCursor(true);
  };

  const handlePointerUp = () => {
    dragAnchorRef.current = null;
    setCursor(false);
  };

  const handleMove = (clientX: number) => {
    if (dragAnchorRef.current !== null) {
      const delta = clientX - dragAnchorRef.current;
      dragDeltaRef.current = delta;
      rotationRef.current = delta / 200;
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    handleResize();
    window.addEventListener("resize", handleResize);

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: sizeRef.current * 2,
      height: sizeRef.current * 2,
      onRender: (state: any) => {
        if (dragAnchorRef.current === null) {
          phiRef.current += 0.004;
        }
        state.phi = phiRef.current + rotationRef.current;
        state.width = sizeRef.current * 2;
        state.height = sizeRef.current * 2;
      },
    });

    requestAnimationFrame(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      globe.destroy();
    };
  }, [config, handleResize]);

  return (
    <div className={cn("absolute inset-0 mx-auto aspect-square w-full", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-200"
        onPointerDown={(e) => handlePointerDown(e.clientX)}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => e.touches[0] && handleMove(e.touches[0].clientX)}
      />
    </div>
  );
}
