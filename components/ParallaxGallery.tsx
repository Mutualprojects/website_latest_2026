"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, ArrowUpRight } from "lucide-react";

const IMAGES = [
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/1.png?updatedAt=1773746411211",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/12.png?updatedAt=1773746411858",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/13.png?updatedAt=1773746412012",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/4.png?updatedAt=1773746412091",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/5.png?updatedAt=1773746412121",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/11.png?updatedAt=1773746412137",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/14.png?updatedAt=1773746412201",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/7.png?updatedAt=1773746412287",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/8.png?updatedAt=1773746412303",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/9.png?updatedAt=1773746412344",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/6.png?updatedAt=1773746412390",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/10.png?updatedAt=1773746412435",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/2.png?updatedAt=1773746412506",
  "https://ik.imagekit.io/tsuss6ulm/Untitled%20design%20(3)/3.png?updatedAt=1773746412540",
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .font-playfair  { font-family: 'Playfair Display', Georgia, serif; }
  .font-mono      { font-family: 'DM Mono', monospace; }
  .font-jakarta   { font-family: 'Plus Jakarta Sans', sans-serif; }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  :root {
    --gold: #C9A84C;
    --gold-dim: rgba(201,168,76,0.15);
    --surface: #0C0C0C;
    --border: rgba(255,255,255,0.08);
    --border-strong: rgba(255,255,255,0.18);
  }

  @keyframes line-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes fade-up { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

  .line-grow { transform-origin: left; animation: line-grow 1.2s cubic-bezier(.22,1,.36,1) forwards; }
  .fade-up { animation: fade-up 0.9s cubic-bezier(.22,1,.36,1) both; }
`;

/* ─────────────────────────── LIGHTBOX ─────────────────────────── */
interface LightboxProps {
  images: string[];
  current: number;
  onClose: () => void;
  onNav: (dir: number) => void;
  onSelect: (index: number) => void;
}

function Lightbox({ images, current, onClose, onNav, onSelect }: LightboxProps) {
  const [loaded, setLoaded] = useState(false);
  const [dir, setDir] = useState(0);

  const nav = (d: number) => { setDir(d); onNav(d); setLoaded(false); };
  const pick = (i: number) => { setDir(i > current ? 1 : -1); onSelect(i); setLoaded(false); };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const variants = {
    enter: () => ({ opacity: 0, scale: 1.06, filter: "blur(12px)" }),
    center: { opacity: 1, scale: 1, filter: "blur(0px)", zIndex: 1 },
    exit: () => ({ opacity: 0, scale: 0.94, filter: "blur(12px)", zIndex: 0 }),
  };

  const pct = `${String(current + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#050505", display: "flex", flexDirection: "column",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* ── IMAGE LAYER ── */}
      <div style={{ position: "absolute", inset: 0 }}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            custom={dir}
            variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onLoad={() => setLoaded(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none" }}
            alt=""
          />
        </AnimatePresence>
        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(5,5,5,0.75) 0%, transparent 30%, transparent 60%, rgba(5,5,5,0.9) 100%)",
        }} />
        {/* Left/Right darkening panels */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(5,5,5,0.5) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.5) 100%)",
        }} />
      </div>

      {!loaded && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.12)",
            borderTopColor: "#C9A84C",
            animation: "spin 0.9s linear infinite",
          }} />
        </div>
      )}

      {/* ── HEADER BAR ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 50,
          padding: "28px 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 900,
            color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase",
            lineHeight: 1,
          }}>
            The Mansion
          </div>
          <div style={{
            marginTop: 6,
            height: 1, background: "#C9A84C",
            transformOrigin: "left", animation: "line-grow 1s ease both",
            width: "100%",
          }} />
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9, color: "rgba(201,168,76,0.8)",
            letterSpacing: "0.4em", textTransform: "uppercase",
            marginTop: 6,
          }}>
            Private Collection
          </div>
        </div>

        {/* Counter + Close */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "clamp(12px, 1.5vw, 16px)", color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.3em",
          }}>
            <span style={{ color: "#fff", fontSize: "1.4em", fontWeight: 500 }}>
              {String(current + 1).padStart(2, "0")}
            </span>
            {" "}<span style={{ color: "rgba(255,255,255,0.25)" }}>/</span>{" "}
            {String(images.length).padStart(2, "0")}
          </div>
          <button
            onClick={onClose}
            style={{
              width: 48, height: 48, border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%", background: "rgba(255,255,255,0.06)",
              color: "#fff", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>

      {/* ── SIDE NAV ── */}
      {[{ dir: -1, side: "left", Icon: ChevronLeft }, { dir: 1, side: "right", Icon: ChevronRight }].map(({ dir: d, side, Icon }) => (
        <button
          key={side}
          onClick={() => nav(d)}
          style={{
            position: "absolute", top: "50%", [side]: 32,
            transform: "translateY(-50%)",
            zIndex: 50, background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.3)", transition: "color 0.3s",
            display: "none",
          }}
          className="nav-btn"
          onMouseEnter={e => e.currentTarget.style.color = "#fff"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
        >
          <Icon size={56} strokeWidth={1.5} />
        </button>
      ))}

      {/* ── FOOTER ── */}
      <motion.div
        initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 50,
          padding: "24px 40px 36px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
        }}
      >
        {/* Progress bar */}
        <div style={{ width: "100%", maxWidth: 600, height: 1, background: "rgba(255,255,255,0.1)", position: "relative" }}>
          <motion.div
            style={{ position: "absolute", left: 0, top: 0, height: "100%", background: "#C9A84C", transformOrigin: "left" }}
            animate={{ scaleX: (current + 1) / images.length }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Thumbnails */}
        <div
          className="no-scrollbar"
          style={{
            display: "flex", gap: 8, overflowX: "auto", maxWidth: "100%",
            padding: "4px 0",
          }}
        >
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => pick(i)}
              whileHover={{ y: -6, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                flexShrink: 0,
                width: i === current ? 80 : 60,
                height: 60,
                borderRadius: 4,
                overflow: "hidden",
                border: i === current ? "1.5px solid #C9A84C" : "1.5px solid rgba(255,255,255,0.1)",
                opacity: i === current ? 1 : 0.45,
                cursor: "pointer",
                background: "none",
                padding: 0,
                transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </motion.button>
          ))}
        </div>

        {/* Mobile nav */}
        <div style={{ display: "flex", gap: 20 }}>
          {[{ d: -1, Icon: ChevronLeft }, { d: 1, Icon: ChevronRight }].map(({ d, Icon }) => (
            <button
              key={d}
              onClick={() => nav(d)}
              style={{
                width: 48, height: 48, borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Icon size={20} strokeWidth={2} />
            </button>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 768px) {
          .nav-btn { display: flex !important; }
        }
      `}</style>
    </motion.div>
  );
}

/* ─────────────────────────── GRID CARD ─────────────────────────── */
interface CardProps {
  src: string;
  index: number;
  onClick: () => void;
  featured?: boolean;
}

function Card({ src, index, onClick, featured }: CardProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => { if (imgRef.current?.complete) setLoaded(true); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.04, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      style={{
        position: "relative", overflow: "hidden",
        cursor: "pointer", background: "#111",
        aspectRatio: featured ? "16/10" : "1/1",
        gridColumn: featured ? "span 2" : undefined,
        gridRow: featured ? "span 2" : undefined,
      }}
    >
      {!loaded && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }} />
      )}
      <motion.img
        ref={imgRef}
        src={src}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease",
        }}
        alt=""
      />

      {/* Hover Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.4) 50%, transparent 100%)",
          display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "24px 20px",
        }}
      >
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 9, letterSpacing: "0.45em",
          color: "#C9A84C", textTransform: "uppercase", marginBottom: 8,
        }}>
          {String(index + 1).padStart(2, "0")} — View
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: featured ? 22 : 16, fontWeight: 700,
            color: "#fff", letterSpacing: "0.04em",
          }}>
            {featured ? "The Mansion" : `Gallery ${String(index + 1).padStart(2, "0")}`}
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
          }}>
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </div>
        </div>
      </motion.div>

      {/* Gold corner accent on featured */}
      {featured && (
        <div style={{
          position: "absolute", top: 20, left: 20,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{ width: 28, height: 1.5, background: "#C9A84C" }} />
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 8, letterSpacing: "0.5em",
            color: "#C9A84C", textTransform: "uppercase",
          }}>
            Featured
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────── MAIN ─────────────────────────── */
export default function MansionGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const nav = useCallback((dir: number) => {
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return ((prev + dir) % IMAGES.length + IMAGES.length) % IMAGES.length;
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") nav(-1);
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, nav]);

  return (
    <div style={{
      background: "#050505", minHeight: "100vh", color: "#fff",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <style>{STYLES}</style>

      {/* ── HERO HEADER ── */}
      <header style={{ padding: "80px 40px 48px", maxWidth: 1600, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: "#C9A84C" }} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10, letterSpacing: "0.55em",
              color: "#C9A84C", textTransform: "uppercase",
            }}>
              Private Collection — 2025
            </span>
          </div>

          {/* Main title */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(52px, 9vw, 120px)",
              fontWeight: 900, lineHeight: 0.9,
              color: "#fff", textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}>
              The<br />
              <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.25)" }}>
                Mansion
              </span>
            </h1>

            <div style={{ maxWidth: 280, paddingBottom: 8 }}>
              <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 16 }} />
              <p style={{
                fontSize: 13, lineHeight: 1.7,
                color: "rgba(255,255,255,0.45)", fontWeight: 400,
              }}>
                An immersive private gallery. Fourteen curated works presented in their full architectural grandeur.
              </p>
              <div style={{
                marginTop: 20,
                fontFamily: "'DM Mono', monospace",
                fontSize: 10, letterSpacing: "0.4em",
                color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
              }}>
                {IMAGES.length} Works
              </div>
            </div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: 1, background: "rgba(255,255,255,0.08)",
              marginTop: 48, transformOrigin: "left",
            }}
          />
        </motion.div>
      </header>

      {/* ── GRID ── */}
      <main style={{ padding: "0 40px 80px", maxWidth: 1600, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
        }}>
          {IMAGES.map((src, i) => (
            <Card
              key={src}
              src={src}
              index={i}
              featured={i === 0}
              onClick={() => open(i)}
            />
          ))}
        </div>
      </main>

      {/* ── FOOTER STRIP ── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "28px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 9, letterSpacing: "0.5em",
          color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
        }}>
          The Mansion — All Rights Reserved
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 16, height: 1, background: "#C9A84C" }} />
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9, letterSpacing: "0.4em",
            color: "#C9A84C", textTransform: "uppercase",
          }}>
            Private Gallery
          </div>
        </div>
      </footer>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={IMAGES}
            current={lightboxIndex}
            onClose={close}
            onNav={nav}
            onSelect={setLightboxIndex}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @media (max-width: 900px) {
          div[style*="repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          header, main, footer { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </div>
  );
}