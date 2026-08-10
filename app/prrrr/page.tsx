"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Camera,
  Activity,
  Battery,
  Wifi,
  Compass,
  Shield,
  Eye,
  Sliders,
  ChevronDown,
} from "lucide-react";

/* ================= CONFIG ================= */
const TOTAL_FRAMES = 51;
const FRAME_PATH = "/ezgif-855bb4ab14b0b1ae-jpg";

export default function SolarTrailerShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderRef = useRef<() => void>(() => {});
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Easing values
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const [activeFrame, setActiveFrame] = useState<number>(0);

  /* ================= PRELOAD IMAGES ================= */
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    const handleLoad = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      if (loadedCount === TOTAL_FRAMES) {
        imagesRef.current = imgs;
        setLoaded(true);
      }
    };

    const handleError = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      if (loadedCount === TOTAL_FRAMES) {
        imagesRef.current = imgs;
        setLoaded(true);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
      img.onload = handleLoad;
      img.onerror = handleError;
      imgs.push(img);
    }
  }, []);

  /* ================= WHEEL & SWIPE CAPTURE ================= */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Increase/decrease target frame index based on wheel scroll delta
      targetFrameRef.current = Math.min(
        Math.max(targetFrameRef.current + e.deltaY * 0.04, 0),
        TOTAL_FRAMES - 1
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Mobile Touch Swipe Handling
  const touchStartYRef = useRef<number>(0);
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY; // positive when swiping up

      targetFrameRef.current = Math.min(
        Math.max(targetFrameRef.current + deltaY * 0.08, 0),
        TOTAL_FRAMES - 1
      );
      touchStartYRef.current = currentY;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  /* ================= PHYSICS SMOOTHING & RENDER LOOP ================= */
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      // Linear interpolation LERP (12% easing per frame)
      if (Math.abs(diff) < 0.001) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        currentFrameRef.current += diff * 0.12;
      }

      // Redraw canvas
      if (renderRef.current) {
        renderRef.current();
      }

      // Update state for HUD elements (integer representation only)
      const idx = Math.min(
        Math.max(Math.round(currentFrameRef.current), 0),
        TOTAL_FRAMES - 1
      );

      setActiveFrame((prev) => {
        if (prev !== idx) {
          return idx;
        }
        return prev;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  /* ================= DRAW CANVAS FRAME ================= */
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const render = () => {
      const progress = currentFrameRef.current;
      const baseFrame = Math.floor(progress);
      const nextFrame = Math.min(baseFrame + 1, TOTAL_FRAMES - 1);
      const mixRatio = progress - baseFrame;

      const imgBase = imagesRef.current[baseFrame];
      const imgNext = imagesRef.current[nextFrame];

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const drawScaled = (img: HTMLImageElement) => {
        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      };

      if (imgBase) {
        ctx.globalAlpha = 1 - mixRatio;
        drawScaled(imgBase);
      }

      if (imgNext && mixRatio > 0) {
        ctx.globalAlpha = mixRatio;
        drawScaled(imgNext);
      }

      ctx.globalAlpha = 1.0;
    };

    renderRef.current = render;
    render();
  }, [loaded]);

  /* ================= HANDLE VIEWPORT RESIZE ================= */
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      if (renderRef.current) {
        renderRef.current();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [loaded]);

  /* ================= TELEMETRY VALUES MAP ================= */
  const telemetry = useMemo(() => {
    const frame = activeFrame;
    const solarOutput = frame < 10 ? 40 : frame < 20 ? Math.round(40 + (frame - 10) * 72) : 760;
    const batteryVolt = (12.2 + (solarOutput / 760) * 1.4).toFixed(1);
    const batteryPercent = Math.min(80 + Math.round((frame / 50) * 15), 100);
    const mastHeight = frame < 30 ? 2.0 : frame < 42 ? parseFloat((2.0 + ((frame - 30) / 12) * 4.0).toFixed(1)) : 6.0;
    const cameraPan = Math.round((frame / 50) * 360);
    const signalDbm = -65 + Math.round(Math.sin(frame * 0.4) * 8);

    let currentSystemCode = "SYS.STABLE";
    let diagnosticAlert = "ALL SYSTEMS NOMINAL";
    if (frame >= 10 && frame < 20) {
      currentSystemCode = "PV.CHARGE_OPTIMIZING";
      diagnosticAlert = "SOLAR INTENSITY MAXIMIZING";
    } else if (frame >= 20 && frame < 32) {
      currentSystemCode = "LED.ARRAY_ACTIVE";
      diagnosticAlert = "PERIMETER ILLUMINATION LOAD HIGH";
    } else if (frame >= 32 && frame < 42) {
      currentSystemCode = "MAST.ELEVATING";
      diagnosticAlert = "TELESCOPIC HEIGHT EXTENDING";
    } else if (frame >= 42) {
      currentSystemCode = "SYS.AUTONOMOUS";
      diagnosticAlert = "OFF-GRID COMMAND LOCK ENGAGED";
    }

    return {
      solarOutput,
      batteryVolt,
      batteryPercent,
      mastHeight,
      cameraPan,
      signalDbm,
      currentSystemCode,
      diagnosticAlert,
    };
  }, [activeFrame]);

  /* ================= SLIDE ANNOTATION SYSTEM ================= */
  const currentSlide = useMemo(() => {
    const frame = activeFrame;
    if (frame < 10) {
      return {
        step: "01",
        label: "TACTICAL PLATFORM OVERVIEW",
        title: "BTL SST-51 Mobile Security Unit",
        desc: "Designed for immediate security deployment in demanding terrain. Full perimeter surveillance engineered with zero emission and zero maintenance grid dependency.",
      };
    } else if (frame < 20) {
      return {
        step: "02",
        label: "SOLAR ENERGY HARVESTER",
        title: "Monocrystalline Solar Array",
        desc: "Dual high-efficiency panels generate continuous electricity. Pivot joints allow manual angle customization to harness maximum sunlight irrespective of local coordinates.",
      };
    } else if (frame < 32) {
      return {
        step: "03",
        label: "ILLUMINATING SECURITY SHIELD",
        title: "High-Lumen Perimeter Floodlights",
        desc: "Four industrial LED floodlights guarantee full illumination in absolute darkness. Features automated dawn-dusk triggers and manual override capabilities.",
      };
    } else if (frame < 42) {
      return {
        step: "04",
        label: "ELEVATED COMMAND OPTICS",
        title: "6-Meter Telescopic Winch Mast",
        desc: "Telescoping carbon-steel mast extends high-definition PTZ dome cameras up to 6 meters. Enables clear sightlines over tree crowns and physical obstructions.",
      };
    } else {
      return {
        step: "05",
        label: "SECURE AUTONOMOUS BANK",
        title: "Fortified Cabinet & Stabilizer Base",
        desc: "Lockable anti-vandal cabinets store deep-cycle GEL batteries supplying 5 days backup power. Heavy-duty drop-leg jack stabilizers ensure structural integrity in high wind loads.",
      };
    }
  }, [activeFrame]);

  return (
    <div className="relative h-screen w-screen bg-black text-white font-sans overflow-hidden select-none">
      <head>
        <title>BTL Mobile Solar Surveillance Trailer | Interactive Showcase</title>
        <meta
          name="description"
          content="Interact with the full deconstruct sequence of BTL SST-51 mobile solar CCTV trailer with interactive live-scrolling metrics, dynamic HUD diagnostics and full screen auto-play."
        />
      </head>

      {/* 1. INITIAL LOADER SCREEN */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 px-6"
          >
            <div className="relative flex flex-col items-center max-w-md w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-amber-500 animate-ping" />
                  <span className="text-xl font-bold uppercase tracking-wider text-white">
                    BTL Systems
                  </span>
                </div>
              </motion.div>

              <h2 className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-widest text-center">
                Preloading Tactical Asset Sequence
              </h2>

              <div className="w-full bg-zinc-900 border border-zinc-800 rounded-full h-2.5 overflow-hidden mb-4 relative">
                <motion.div
                  className="bg-gradient-to-r from-amber-400 to-blue-500 h-full rounded-full"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>

              <div className="flex justify-between w-full text-xs text-zinc-500 font-mono">
                <span>INDEXING FRAMES (01-51)</span>
                <span className="text-amber-500 font-bold">{loadProgress}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. PERSISTENT INTERACTIVE CANVAS CONTAINER */}
      <div className="relative h-full w-full bg-black">
        
        {/* Viewport Viewfinder Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none border-[12px] border-black flex flex-col justify-between">
          <div className="absolute inset-x-12 inset-y-12 border border-white/5 flex items-center justify-center">
            
            {/* Center reticle */}
            <div className="relative h-12 w-12 flex items-center justify-center">
              <div className="absolute h-0.5 w-5 bg-white/20" />
              <div className="absolute h-5 w-0.5 bg-white/20" />
              <div className="h-1.5 w-1.5 rounded-full border border-white/30" />
            </div>

            {/* Scale indicators */}
            <div className="absolute top-2 inset-x-1/2 -translate-x-1/2 flex items-center gap-1 opacity-20 text-[9px] font-mono">
              <span>180°</span>
              <div className="w-4 h-0.5 bg-white" />
              <span>N</span>
              <div className="w-4 h-0.5 bg-white" />
              <span>180°</span>
            </div>

            <div className="absolute left-2 inset-y-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-20 text-[9px] font-mono">
              <span>90°</span>
              <div className="h-4 w-0.5 bg-white" />
              <span>W</span>
              <div className="h-4 w-0.5 bg-white" />
              <span>90°</span>
            </div>
          </div>

          {/* Top panel metrics */}
          <div className="w-full flex justify-between items-center p-4 border-b border-white/5 bg-gradient-to-b from-black to-transparent">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider font-semibold text-zinc-300">
                  STATUS: {telemetry.currentSystemCode}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-zinc-500 text-[10px] font-mono border-l border-zinc-800 pl-4">
                <Activity className="h-3.5 w-3.5 text-zinc-600" />
                DIAG: {telemetry.diagnosticAlert}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded">
                FRAME {String(activeFrame + 1).padStart(2, "0")}/51
              </div>
            </div>
          </div>

          {/* Bottom panel metrics */}
          <div className="w-full flex justify-between items-end p-4 border-t border-white/5 bg-gradient-to-t from-black to-transparent">
            <div className="text-[9px] font-mono text-zinc-500">
              LAT: 17°25'32\"N | LNG: 78°25'13\"E | ALT: 542M
            </div>
            <div className="text-[9px] font-mono text-zinc-500">
              SYSTEM REF ID: BTL-SST-51-TACTICAL
            </div>
          </div>
        </div>

        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 select-none pointer-events-none"
        />

        {/* 3. TACTICAL HUD FLOATING PANELS */}
        {/* Left Stats Panel */}
        <div className="absolute top-24 left-6 z-30 max-w-[280px] w-full hidden md:block">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md p-5 rounded-xl shadow-2xl relative"
          >
            <div className="absolute -top-px -left-px h-2.5 w-2.5 border-t border-l border-amber-500" />
            <div className="absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r border-amber-500" />

            <h4 className="text-[10px] font-mono uppercase tracking-widest text-amber-500 mb-3.5 flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              Diagnostic Metrics
            </h4>

            <div className="flex flex-col gap-2.5 text-xs font-mono">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500 uppercase">Load Mode</span>
                <span className="text-zinc-200">SOLAR LOAD</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500 uppercase">PV Harvest</span>
                <span className="text-amber-400 font-bold">{telemetry.solarOutput} W</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500 uppercase">Mast Extension</span>
                <span className="text-zinc-200 font-bold">{telemetry.mastHeight}M</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500 uppercase">PTZ Pan</span>
                <span className="text-zinc-200">{telemetry.cameraPan}°</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Stats Panel */}
        <div className="absolute top-24 right-6 z-30 max-w-[280px] w-full hidden md:block">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md p-5 rounded-xl shadow-2xl relative"
          >
            <div className="absolute -top-px -right-px h-2.5 w-2.5 border-t border-r border-amber-500" />
            <div className="absolute -bottom-px -left-px h-2.5 w-2.5 border-b border-l border-amber-500" />

            <h4 className="text-[10px] font-mono uppercase tracking-widest text-amber-500 mb-3.5 flex items-center gap-1.5">
              <Battery className="h-3.5 w-3.5" />
              Energy Reservoir
            </h4>

            <div className="flex flex-col gap-2.5 text-xs font-mono">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500 uppercase">Battery Level</span>
                <span className="text-green-400 font-bold">{telemetry.batteryPercent}%</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500 uppercase">Voltage</span>
                <span className="text-zinc-200">{telemetry.batteryVolt} V</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500 uppercase">Uplink Signal</span>
                <span className="text-zinc-200 font-semibold">{telemetry.signalDbm} dBm</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500 uppercase">Net Connection</span>
                <span className="text-blue-400 flex items-center gap-1.5">
                  <Wifi className="h-3.5 w-3.5" />
                  4G / LTE
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Left description text block with AnimatePresence */}
        <div className="absolute left-6 right-6 bottom-8 sm:left-12 sm:bottom-12 md:left-20 md:bottom-16 max-w-xl w-full z-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl relative"
            >
              <div className="absolute -top-px -left-px h-2.5 w-2.5 border-t border-l border-amber-500" />
              <div className="absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r border-amber-500" />

              <span className="text-[10px] tracking-widest text-amber-500 uppercase font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Phase {currentSlide.step} // {currentSlide.label}
              </span>
              <h2 className="text-2xl sm:text-3.5xl font-extrabold text-white mt-3 mb-2 tracking-tight">
                {currentSlide.title}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-light mb-1">
                {currentSlide.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Right timeline progress bar */}
        <div className="absolute right-6 bottom-8 sm:right-12 sm:bottom-12 md:right-20 md:bottom-16 z-30">
          <div className="hidden sm:flex flex-col justify-center bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md h-14 px-6 rounded-xl shadow-lg relative min-w-[200px]">
            <div className="absolute -top-px -right-px h-2.5 w-2.5 border-t border-r border-amber-500" />
            <div className="absolute -bottom-px -left-px h-2.5 w-2.5 border-b border-l border-amber-500" />
            
            <div className="flex justify-between text-[9px] font-mono text-zinc-500 mb-1.5">
              <span>DECONSTRUCT POSITION</span>
              <span>FRAME {activeFrame + 1}/51</span>
            </div>
            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-full h-1 overflow-hidden relative">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-75"
                style={{ width: `${(activeFrame / (TOTAL_FRAMES - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Guide Indicator */}
        {activeFrame === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30 text-zinc-500"
          >
            <span className="text-[9px] font-mono uppercase tracking-widest mb-1.5">Scroll Mouse Wheel / Swipe to reveal</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </motion.div>
        )}

      </div>
    </div>
  );
}
