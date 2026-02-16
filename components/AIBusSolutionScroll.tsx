"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Camera,
  Eye,
  MapPin,
  Cpu,
  Users,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Cloud,
  Activity,
  CctvIcon,
} from "lucide-react";

/* ================= CONFIG ================= */

const BRAND = "#07518a";

const SEQUENCES = [
  { path: "/ezgif-5f668c4663f113de-jpg", frames: 40 },
  { path: "/ezgif-5fca3c4a88f24fe3-jpg", frames: 48 },
];

const TOTAL_FRAMES = SEQUENCES.reduce((a, b) => a + b.frames, 0);

/* ================= FEATURES ================= */

const FEATURES = [
  {
    title: "AI CCTV Surveillance",
    desc: "Real-time monitoring with AI-based threat and intrusion detection inside and outside the bus.",
    icon: CctvIcon,
  },
  {
    title: "Driver Drowsiness Detection",
    desc: "Continuously analyzes driver behavior to detect fatigue and prevent accidents.",
    icon: Eye,
  },
  {
    title: "Real-Time GPS Tracking",
    desc: "Live location, speed, and route monitoring for fleet management and safety.",
    icon: MapPin,
  },
  {
    title: "IoT Connectivity",
    desc: "Seamless integration of onboard sensors, cameras, and control units.",
    icon: Cpu,
  },
  {
    title: "Passenger Experience System",
    desc: "Displays announcements, route info, and emergency alerts for passengers.",
    icon: Users,
  },
  {
    title: "Automatic Passenger Counting",
    desc: "AI-powered entry/exit detection for occupancy and analytics.",
    icon: Activity,
  },
  {
    title: "Alcohol Detection System",
    desc: "Ensures driver sobriety before and during vehicle operation.",
    icon: ShieldCheck,
  },
  {
    title: "Emergency & Panic Button",
    desc: "Instant alerts sent to command center and authorities during emergencies.",
    icon: AlertTriangle,
  },
  {
    title: "Fire Detection & Suppression",
    desc: "Early fire detection with automated suppression mechanisms.",
    icon: Flame,
  },
  {
    title: "Central Command & Analytics",
    desc: "Cloud-based dashboard for insights, alerts, and fleet intelligence.",
    icon: Cloud,
  },
];

/* ================= COMPONENT ================= */

export default function AIBusSolutionScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  /* ================= SCROLL ================= */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // #region agent log
  useEffect(() => {
    const el = containerRef.current;
    const prog = scrollYProgress.get();
    const bodyOverflow = typeof document !== "undefined" ? getComputedStyle(document.body).overflowX : "";
    fetch("http://127.0.0.1:7249/ingest/ad1dd0a5-8a7b-408d-bc6c-ad61b1117f6f", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "AIBusSolutionScroll.tsx:useScroll", message: "AIBusSolutionScroll mount", data: { scrollYProgress: prog, containerHeight: el?.offsetHeight, containerScrollHeight: el?.scrollHeight, windowWidth: typeof window !== "undefined" ? window.innerWidth : 0, bodyOverflowX: bodyOverflow }, timestamp: Date.now(), hypothesisId: "H1" }) }).catch(() => {});
  }, [scrollYProgress]);
  useEffect(() => {
    let last = 0;
    const unsub = scrollYProgress.on("change", (v) => {
      if (Date.now() - last < 400) return;
      last = Date.now();
      const el = containerRef.current;
      fetch("http://127.0.0.1:7249/ingest/ad1dd0a5-8a7b-408d-bc6c-ad61b1117f6f", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "AIBusSolutionScroll.tsx:scroll", message: "scroll change", data: { scrollYProgress: v, containerHeight: el?.offsetHeight, windowWidth: typeof window !== "undefined" ? window.innerWidth : 0 }, timestamp: Date.now(), hypothesisId: "H2" }) }).catch(() => {});
    });
    return () => unsub();
  }, [scrollYProgress]);
  // #endregion

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  /* Tilt removed (no mouse animations) */

  /* ================= PRELOAD ================= */

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let count = 0;

    SEQUENCES.forEach((seq) => {
      for (let i = 1; i <= seq.frames; i++) {
        const img = new Image();
        img.src = `${seq.path}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
        img.onload = () => {
          count++;
          if (count === TOTAL_FRAMES) {
            imagesRef.current = imgs;
            setLoaded(true);
          }
        };
        imgs.push(img);
      }
    });
  }, []);

  /* ================= CANVAS DRAW ================= */

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const render = () => {
      const index = Math.round(frameIndex.get());
      const img = imagesRef.current[index];
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );

      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const unsub = frameIndex.on("change", render);
    render();
    return () => unsub();
  }, [loaded, frameIndex]);

  /* ================= RESIZE ================= */

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* Mouse tilt removed (no mouse animations) */

  /* ================= RENDER ================= */

  return (
    <>
      {/* ================= CANVAS STORY ================= */}
      <section
        ref={containerRef}
        className="relative h-[500vh] bg-white text-black"
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen flex items-center justify-center"
          style={{ perspective: 1200 }}
        >
          {!loaded && (
            <div className="absolute h-10 w-10 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          )}

          <motion.canvas
            ref={canvasRef}
          />
        </div>

        <motion.h1
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]),
            color: BRAND,
          }}
          className="fixed inset-0 flex items-center justify-center
                     text-4xl md:text-6xl font-semibold text-center mb-72 ml-32 "
        >
          AI Bus Solution
        </motion.h1>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ color: BRAND }}
            className="text-3xl md:text-4xl font-semibold text-center mb-16"
          >
            Intelligent Features Powering Smart Buses
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-black/10 p-6 shadow-sm
                             hover:shadow-md transition bg-white"
                >
                  <Icon size={32} color={BRAND} />
                  <h3
                    className="mt-4 text-lg font-semibold"
                    style={{ color: BRAND }}
                  >
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm text-black/70">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
