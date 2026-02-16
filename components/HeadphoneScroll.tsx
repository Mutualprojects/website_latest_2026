"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";
import {
  Camera,
  Wifi,
  Signal,
  Cpu,
  Shield,
  Cloud,
  Cctv,
} from "lucide-react";

/* ================= CONFIG ================= */

const TOTAL_FRAMES = 40;
const FRAME_PATH = "/ezgif-583a785376998657-jpg";

/* ================= FEATURES ================= */

const features = [
  {
    icon: Cctv,
    title: "AI-Powered Surveillance",
    desc: "Real-time detection & alerts",
  },
  {
    icon: Wifi,
    title: "WiFi & 4G",
    desc: "Always connected",
  },
  {
    icon: Signal,
    title: "SIM Support",
    desc: "Remote installations",
  },
  {
    icon: Cpu,
    title: "Edge AI",
    desc: "Local processing",
  },
  {
    icon: Shield,
    title: "Secure Data",
    desc: "End-to-end encryption",
  },
  {
    icon: Cloud,
    title: "Cloud Backup",
    desc: "30 days storage",
  },
];

/* ================= COMPONENT ================= */

export default function HeadphoneScroll() {
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
    const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    fetch("http://127.0.0.1:7249/ingest/ad1dd0a5-8a7b-408d-bc6c-ad61b1117f6f", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "HeadphoneScroll.tsx:useScroll", message: "HeadphoneScroll mount", data: { scrollYProgress: prog, containerHeight: el?.offsetHeight, containerScrollHeight: el?.scrollHeight, windowWidth: typeof window !== "undefined" ? window.innerWidth : 0, bodyOverflowX: bodyOverflow, prefersReducedMotion: reducedMotion }, timestamp: Date.now(), hypothesisId: "H1" }) }).catch(() => {});
    if (reducedMotion) fetch("http://127.0.0.1:7249/ingest/ad1dd0a5-8a7b-408d-bc6c-ad61b1117f6f", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "HeadphoneScroll.tsx", message: "prefers-reduced-motion", data: { prefersReducedMotion: true }, timestamp: Date.now(), hypothesisId: "H4" }) }).catch(() => {});
  }, [scrollYProgress]);
  useEffect(() => {
    let last = 0;
    const unsub = scrollYProgress.on("change", (v) => {
      if (Date.now() - last < 400) return;
      last = Date.now();
      const el = containerRef.current;
      fetch("http://127.0.0.1:7249/ingest/ad1dd0a5-8a7b-408d-bc6c-ad61b1117f6f", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "HeadphoneScroll.tsx:scroll", message: "scroll change", data: { scrollYProgress: v, containerHeight: el?.offsetHeight, windowWidth: typeof window !== "undefined" ? window.innerWidth : 0 }, timestamp: Date.now(), hypothesisId: "H2" }) }).catch(() => {});
    });
    return () => unsub();
  }, [scrollYProgress]);
  // #endregion

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  /* ================= TILT ================= */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useTransform(mouseX, [-1, 1], [-6, 6]);
  const rotateX = useTransform(mouseY, [-1, 1], [6, -6]);

  /* ================= PRELOAD ================= */

  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          setLoaded(true);
        }
      };
      imgs.push(img);
    }
  }, []);

  /* ================= DRAW ================= */

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

  /* ================= TEXT TIMINGS ================= */

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const featuresOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.75],
    [0, 1]
  );

  /* ================= RENDER ================= */

  return (
    <section ref={containerRef} className="relative h-[420vh] bg-black ">
      {/* Sticky Canvas */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex items-center justify-center "
        style={{ perspective: 1200 }}
      >
        {!loaded && (
          <div className="absolute h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white " />
        )}

        <motion.canvas
          ref={canvasRef}
          // style={{
          //   rotateX,
          //   rotateY,
          //   // transformStyle: "",
          // }}
        />
      </div>

      {/* Title */}
      <motion.h1
        style={{ opacity: titleOpacity }}
        className="fixed inset-0 flex items-center justify-center text-4xl md:text-6xl lg:text-7xl font-semibold text-white text-center pointer-events-none"
      >
        BTL Smart Surveillance
      </motion.h1>

      {/* FEATURES OVERLAY */}
      <motion.div
        style={{ opacity: featuresOpacity }}
        className="fixed inset-0 flex items-center justify-center px-6 pointer-events-none mt-96"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.05 }}
              className="pointer-events-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 text-white"
            >
              <f.icon className="mb-2 h-6 w-6 text-white/80" />
              <h3 className="text-sm font-semibold">{f.title}</h3>
              <p className="text-xs text-white/70">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useMotionValue,
//   AnimatePresence,
// } from "framer-motion";

// /* ================= CONFIG ================= */

// // Frame folders
// const SEQUENCES = [
//   {
//     path: "/ezgif-5f668c4663f113de-jpg",
//     frames: 40,
//   },
//   {
//     path: "/ezgif-5fca3c4a88f24fe3-jpg",
//     frames: 48,
//   },
// ];

// const TOTAL_FRAMES = SEQUENCES.reduce((a, b) => a + b.frames, 0);

// /* ================= COMPONENT ================= */

// export default function HeadphoneScroll() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const stickyRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const audioRef = useRef<HTMLAudioElement>(null);

//   const imagesRef = useRef<HTMLImageElement[]>([]);
//   const [loaded, setLoaded] = useState(false);
//   const [isHovering, setIsHovering] = useState(false);
//   const [showSpecs, setShowSpecs] = useState(false);
//   const [currentSpec, setCurrentSpec] = useState(0);
//   const [audioPlaying, setAudioPlaying] = useState(false);

//   /* ================= SCROLL ================= */

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   const frameIndex = useTransform(
//     scrollYProgress,
//     [0, 1],
//     [0, TOTAL_FRAMES - 1]
//   );

//   /* ================= TILT ================= */

//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const rotateY = useTransform(mouseX, [-1, 1], [-8, 8]);
//   const rotateX = useTransform(mouseY, [-1, 1], [-8, 8]);

//   /* ================= SPECS ================= */

//   const specs = [
//     { title: "40mm Titanium Drivers", icon: "🎵" },
//     { title: "Active Noise Cancellation", icon: "🔇" },
//     { title: "30hr Battery Life", icon: "🔋" },
//     { title: "Hi-Res Audio Certified", icon: "✨" },
//   ];

//   /* ================= PRELOAD FRAMES ================= */

//   useEffect(() => {
//     const images: HTMLImageElement[] = [];
//     let loadedCount = 0;

//     SEQUENCES.forEach((seq) => {
//       for (let i = 1; i <= seq.frames; i++) {
//         const img = new Image();
//         img.src = `${seq.path}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
//         img.onload = () => {
//           loadedCount++;
//           if (loadedCount === TOTAL_FRAMES) {
//             imagesRef.current = images;
//             setLoaded(true);
//           }
//         };
//         images.push(img);
//       }
//     });
//   }, []);

//   /* ================= DRAW CANVAS ================= */

//   useEffect(() => {
//     if (!loaded) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");
//     if (!canvas || !ctx) return;

//     const render = () => {
//       const index = Math.round(frameIndex.get());
//       const img = imagesRef.current[index];
//       if (!img) return;

//       const { width, height } = canvas;
//       ctx.clearRect(0, 0, width, height);

//       const scale = Math.min(width / img.width, height / img.height);
//       const x = (width - img.width * scale) / 2;
//       const y = (height - img.height * scale) / 2;

//       ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
//     };

//     const unsub = frameIndex.on("change", render);
//     render();
//     return () => unsub();
//   }, [loaded, frameIndex]);

//   /* ================= RESIZE ================= */

//   useEffect(() => {
//     const resize = () => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
//       canvas.width = window.innerWidth * devicePixelRatio;
//       canvas.height = window.innerHeight * devicePixelRatio;
//       canvas.style.width = "100%";
//       canvas.style.height = "100%";
//     };
//     resize();
//     window.addEventListener("resize", resize);
//     return () => window.removeEventListener("resize", resize);
//   }, []);

//   /* ================= MOUSE MOVE ================= */

//   useEffect(() => {
//     const move = (e: MouseEvent) => {
//       if (!stickyRef.current) return;
//       const r = stickyRef.current.getBoundingClientRect();
//       mouseX.set(((e.clientX - r.left) / r.width) * 2 - 1);
//       mouseY.set(((e.clientY - r.top) / r.height) * 2 - 1);
//     };

//     const el = stickyRef.current;
//     el?.addEventListener("mousemove", move);
//     el?.addEventListener("mouseleave", () => {
//       mouseX.set(0);
//       mouseY.set(0);
//     });

//     return () => {
//       el?.removeEventListener("mousemove", move);
//     };
//   }, [mouseX, mouseY]);

//   /* ================= SPEC ROTATION ================= */

//   useEffect(() => {
//     if (!showSpecs) return;
//     const id = setInterval(
//       () => setCurrentSpec((i) => (i + 1) % specs.length),
//       2500
//     );
//     return () => clearInterval(id);
//   }, [showSpecs]);

//   /* ================= OPACITY ================= */

//   const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
//   const leftOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
//   const rightOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
//   const ctaOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

//   /* ================= AUDIO ================= */

//   const handleCTAClick = () => {
//     if (!audioRef.current) return;
//     audioRef.current.currentTime = 0;
//     audioRef.current.play();
//     setAudioPlaying(true);
//     setTimeout(() => setAudioPlaying(false), 3000);
//   };

//   /* ================= RENDER ================= */

//   return (
//     <section ref={containerRef} className="relative h-[400vh] bg-[#050505]">
//       <audio ref={audioRef} src="/path-to-your-demo-sound.mp3" />

//       <div
//         ref={stickyRef}
//         className="sticky top-0 h-screen w-full flex items-center justify-center"
//         style={{ perspective: 1200 }}
//       >
//         {!loaded && (
//           <div className="absolute animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" />
//         )}

//         <motion.canvas
//           ref={canvasRef}
//           style={{ rotateX, rotateY }}
//           animate={{ scale: isHovering ? 1.05 : 1 }}
//           transition={{ duration: 0.3 }}
//         />
//       </div>

//       <motion.h1
//         style={{ opacity: titleOpacity }}
//         className="fixed inset-0 flex items-center justify-center text-white text-6xl font-semibold z-30"
//         onClick={() => setShowSpecs(!showSpecs)}
//       >
//         Zenith X. Pure Sound.
//       </motion.h1>

//       <motion.div
//         style={{ opacity: ctaOpacity }}
//         className="fixed inset-0 flex items-center justify-center z-40"
//       >
//         <motion.button
//           onClick={handleCTAClick}
//           className="px-10 py-5 border border-white/40 rounded-full text-white text-xl"
//           whileHover={{ scale: 1.1 }}
//         >
//           🎧 Hear Everything
//         </motion.button>
//       </motion.div>

//       <AnimatePresence>
//         {audioPlaying && (
//           <motion.div
//             className="fixed top-6 right-6 text-white bg-white/10 px-4 py-2 rounded-full"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             Playing Demo
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }
// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useMotionValue,
//   AnimatePresence,
// } from "framer-motion";

// /* ================= CONFIG ================= */

// const SEQUENCES = [
//   { path: "/ezgif-5f668c4663f113de-jpg", frames: 40 },
//   { path: "/ezgif-5fca3c4a88f24fe3-jpg", frames: 48 },
// ];

// const TOTAL_FRAMES = SEQUENCES.reduce((a, b) => a + b.frames, 0);

// /* ================= FEATURES ================= */

// const FEATURES = [
//   "AI CCTV Surveillance",
//   "Driver Drowsiness & Behavior Monitoring",
//   "Real-Time GPS Tracking",
//   "IoT Connectivity",
//   "Passenger Experience Systems",
//   "Automatic Passenger Counting",
//   "Alcohol Detection System",
//   "Panic Button & Emergency Alerts",
//   "Fire Suppression System",
//   "Big Data & Command Control Center",
// ];

// /* ================= COMPONENT ================= */

// export default function HeadphoneScroll() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const stickyRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const imagesRef = useRef<HTMLImageElement[]>([]);
//   const [loaded, setLoaded] = useState(false);

//   /* ================= SCROLL ================= */

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   const frameIndex = useTransform(
//     scrollYProgress,
//     [0, 1],
//     [0, TOTAL_FRAMES - 1]
//   );

//   /* ================= TILT ================= */

//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const rotateY = useTransform(mouseX, [-1, 1], [-6, 6]);
//   const rotateX = useTransform(mouseY, [-1, 1], [-6, 6]);

//   /* ================= ACTIVE FEATURE ================= */

//   const activeFeatureIndex = useTransform(
//     scrollYProgress,
//     [0, 1],
//     [0, FEATURES.length - 1]
//   );

//   /* ================= PRELOAD FRAMES ================= */

//   useEffect(() => {
//     const imgs: HTMLImageElement[] = [];
//     let count = 0;

//     SEQUENCES.forEach((seq) => {
//       for (let i = 1; i <= seq.frames; i++) {
//         const img = new Image();
//         img.src = `${seq.path}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
//         img.onload = () => {
//           count++;
//           if (count === TOTAL_FRAMES) {
//             imagesRef.current = imgs;
//             setLoaded(true);
//           }
//         };
//         imgs.push(img);
//       }
//     });
//   }, []);

//   /* ================= DRAW CANVAS ================= */

//   useEffect(() => {
//     if (!loaded) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");
//     if (!canvas || !ctx) return;

//     const render = () => {
//       const index = Math.round(frameIndex.get());
//       const img = imagesRef.current[index];
//       if (!img) return;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const scale = Math.min(
//         canvas.width / img.width,
//         canvas.height / img.height
//       );
//       const x = (canvas.width - img.width * scale) / 2;
//       const y = (canvas.height - img.height * scale) / 2;

//       ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
//     };

//     const unsub = frameIndex.on("change", render);
//     render();
//     return () => unsub();
//   }, [loaded, frameIndex]);

//   /* ================= RESIZE ================= */

//   useEffect(() => {
//     const resize = () => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
//       canvas.width = window.innerWidth * devicePixelRatio;
//       canvas.height = window.innerHeight * devicePixelRatio;
//       canvas.style.width = "100%";
//       canvas.style.height = "100%";
//     };
//     resize();
//     window.addEventListener("resize", resize);
//     return () => window.removeEventListener("resize", resize);
//   }, []);

//   /* ================= MOUSE MOVE ================= */

//   useEffect(() => {
//     const move = (e: MouseEvent) => {
//       if (!stickyRef.current) return;
//       const r = stickyRef.current.getBoundingClientRect();
//       mouseX.set(((e.clientX - r.left) / r.width) * 2 - 1);
//       mouseY.set(((e.clientY - r.top) / r.height) * 2 - 1);
//     };

//     const el = stickyRef.current;
//     el?.addEventListener("mousemove", move);
//     el?.addEventListener("mouseleave", () => {
//       mouseX.set(0);
//       mouseY.set(0);
//     });

//     return () => el?.removeEventListener("mousemove", move);
//   }, [mouseX, mouseY]);

//   /* ================= RENDER ================= */

//   return (
//     <section ref={containerRef} className="relative h-[600vh] bg-white">
//       <div
//         ref={stickyRef}
//         className="sticky top-0 h-screen w-full flex items-center justify-center"
//         style={{ perspective: 1200 }}
//       >
//         {!loaded && (
//           <div className="absolute h-8 w-8 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
//         )}

//         <motion.canvas
//           ref={canvasRef}
//           style={{ rotateX, rotateY }}
//           className="z-10"
//         />

//         {/* Feature Overlay */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={Math.round(activeFeatureIndex.get())}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -30 }}
//             className="absolute bottom-20 bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-md"
//           >
//             <h3 className="text-gray-900 text-lg font-medium">
//               {FEATURES[Math.round(activeFeatureIndex.get())]}
//             </h3>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }
