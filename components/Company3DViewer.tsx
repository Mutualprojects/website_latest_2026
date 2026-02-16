"use client";

import { motion } from "framer-motion";
import { Maximize2, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";

export default function Company3DViewer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  const modelUrl = `https://sketchfab.com/models/9e37209ad8e5499d92f7aea52b5c88b7/embed?ui_theme=dark&autostart=1&camera=0${
    autoRotate ? "&autospin=0.2" : ""
  }`;

  const handleFullscreen = () => {
    iframeRef.current?.requestFullscreen();
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#050b14] to-[#0a1a2f] py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,81,138,0.25),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Smart Surveillance <br />
            <span className="text-[#4fa3ff]">3D Camera System</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 max-w-xl">
            Explore our next-generation surveillance camera in immersive 3D.
            Designed for enterprise-grade security, real-time monitoring, and
            future-ready infrastructure.
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white hover:bg-white/10 transition"
            >
              <RotateCcw size={18} />
              {autoRotate ? "Stop Rotation" : "Auto Rotate"}
            </button>

            <button
              onClick={handleFullscreen}
              className="flex items-center gap-2 rounded-full bg-[#07518a] px-6 py-3 text-white hover:bg-[#0a6ab8] transition"
            >
              <Maximize2 size={18} />
              Fullscreen
            </button>
          </div>
        </motion.div>

        {/* RIGHT 3D VIEWER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Loader */}
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 rounded-xl">
              <div className="animate-spin h-10 w-10 border-4 border-[#07518a] border-t-transparent rounded-full" />
            </div>
          )}

          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              ref={iframeRef}
              title="CC Camera 3D Model"
              src={modelUrl}
              className="w-full h-full"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              onLoad={() => setLoading(false)}
            />
          </div>

          {/* Brand tag */}
          <div className="absolute -bottom-4 right-6 bg-[#07518a] text-white px-4 py-1 text-sm rounded-full shadow-lg">
            Powered by Brihaspathi
          </div>
        </motion.div>
      </div>
    </section>
  );
}
