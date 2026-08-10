"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

/* ─── Brand Tokens ─── */
const BRAND = {
  blue: "#07518a",
  blueDark: "#063f6b",
  white: "#ffffff",
};

/* ─── Types ─── */
interface AssetItem {
  id: string;
  label: string;
  desc: string;
  src: string;
  filename: string;
  bg: string;
  tag: string;
  tagColor: string;
  tagText: string;
}

interface ColorItem {
  name: string;
  hex: string;
  rgb: string;
  pantone: string;
  role: string;
  border?: boolean;
}

interface NavItem {
  id: string;
  label: string;
}

/* ─── Data ─── */
const LOGOS: AssetItem[] = [
  {
    id: "color",
    label: "Color Logo",
    desc: "Primary brand mark – use on white / light backgrounds",
    src: "/btl-logo-color.png",
    filename: "BTL-Logo-Color.png",
    bg: "#ffffff",
    tag: "PRIMARY",
    tagColor: "#07518a",
    tagText: "#ffffff",
  },
  {
    id: "white",
    label: "White Logo",
    desc: "Reversed – use on dark or coloured backgrounds",
    src: "/btl-logo-white.png",
    filename: "BTL-Logo-White.png",
    bg: "linear-gradient(135deg,#07518a,#063f6b)",
    tag: "REVERSED",
    tagColor: "#ffffff",
    tagText: "#07518a",
  },

];

const MD_ASSET: AssetItem = {
  id: "md",
  label: "Chairman & Managing Director",
  desc: "Official portrait of Managing Director, transparent PNG background",
  src: "/btl-md-headshot.png",
  filename: "BTL-MD-Headshot-Transparent.png",
  bg: "linear-gradient(135deg,#07518a,#063f6b)",
  tag: "OFFICIAL",
  tagColor: "#063f6b",
  tagText: "#ffffff",
};

const COLORS: ColorItem[] = [
  { name: "BTL Blue", hex: "#07518a", rgb: "7,81,138", pantone: "301 C", role: "Primary" },
  { name: "Blue Dark", hex: "#063f6b", rgb: "6,63,107", pantone: "302 C", role: "Primary" },
  { name: "Pure White", hex: "#ffffff", rgb: "255,255,255", pantone: "White", role: "Primary", border: true },
  { name: "Sky Blue", hex: "#3b82c4", rgb: "59,130,196", pantone: "660 C", role: "Supporting" },
  { name: "Steel Gray", hex: "#475569", rgb: "71,85,105", pantone: "431 C", role: "Supporting" },
  { name: "Light Tint", hex: "#eef4f9", rgb: "238,244,249", pantone: "656 C", role: "Supporting", border: true },
];

const STATS = [
  { v: 2006, l: "Founded", suffix: "" },
  { v: 500, l: "Professionals", suffix: "+" },
  { v: 20, l: "Years Excellence", suffix: "+" },
  { v: 0, l: "ISO Certified", suffix: "", text: "ISO" },
];

const NAV: NavItem[] = [
  { id: "logos", label: "Logos" },
  { id: "leadership", label: "Leadership" },
  { id: "colours", label: "Colours" },
  { id: "type", label: "Typography" },
  { id: "press", label: "Press" },
  { id: "contact", label: "Contact" },
];

/* ─── Helpers ─── */
function downloadFile(src: string, filename: string) {
  const link = document.createElement("a");
  link.href = src;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadPng(src: string, filename: string) {
  downloadFile(src, filename.endsWith(".png") ? filename : filename + ".png");
}

function downloadAllLogos() {
  LOGOS.forEach((logo, i) => {
    setTimeout(() => downloadPng(logo.src, logo.filename), i * 350);
  });
  notify("Downloading full logo pack…");
}

function goTo(href: string) {
  window.location.href = href;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function notify(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("btl-toast", { detail: message }));
}

/* ─── Scroll-reveal hook ─── */
function useVisible(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Scroll-spy hook ─── */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ─── Count-up hook ─── */
function useCountUp(target: number, run: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run || target === 0) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
}

/* ─── Toast ─── */
function Toast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setMsg(detail);
      const t = setTimeout(() => setMsg(null), 1800);
      return () => clearTimeout(t);
    };
    window.addEventListener("btl-toast", handler);
    return () => window.removeEventListener("btl-toast", handler);
  }, []);

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] pointer-events-none transition-all duration-300"
      style={{
        opacity: msg ? 1 : 0,
        transform: `translate(-50%, ${msg ? "0" : "12px"})`,
      }}
    >
      <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#07518a] text-white text-sm font-semibold shadow-2xl">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        {msg}
      </div>
    </div>
  );
}

/* ─── Sticky Section Nav ─── */
function SectionNav() {
  const active = useActiveSection(NAV.map((n) => n.id));
  return (
    <div className="sticky top-0 z-40 backdrop-blur-md bg-white/85 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <nav className="flex gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-3">
          {NAV.map((n) => {
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => scrollToId(n.id)}
                className="relative whitespace-nowrap px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95"
                style={{
                  background: isActive ? "#07518a" : "transparent",
                  color: isActive ? "#ffffff" : "#475569",
                }}
              >
                {n.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

/* ─── Back to Top ─── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#07518a] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-[#063f6b] active:scale-90"
      style={{
        opacity: show ? 1 : 0,
        transform: `translateY(${show ? "0" : "16px"})`,
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

/* ─── Stats Bar (with count-up) ─── */
function StatsBar() {
  const { ref, visible } = useVisible(0.4);
  return (
    <div ref={ref} className="border-b border-slate-200 bg-[#07518a]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map((s) => (
          <StatItem key={s.l} stat={s} run={visible} />
        ))}
      </div>
    </div>
  );
}

function StatItem({ stat, run }: { stat: typeof STATS[number]; run: boolean }) {
  const count = useCountUp(stat.v, run);
  const display = stat.text ? stat.text : `${count}${stat.suffix}`;
  return (
    <div>
      <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{display}</div>
      <div className="text-xs text-white/70 mt-1 uppercase tracking-wider">{stat.l}</div>
    </div>
  );
}

/* ─── Asset Card ─── */
function AssetCard({ item, large }: { item: AssetItem; large?: boolean }) {
  const { ref, visible } = useVisible();
  const [hovered, setHovered] = useState(false);

  const handleDownload = useCallback(() => {
    downloadPng(item.src, item.filename);
    notify(`Downloaded ${item.filename}`);
  }, [item.src, item.filename]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
      className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-[#07518a]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Image area */}
      <div
        className={`relative flex items-center justify-center overflow-hidden ${large ? "h-64 sm:h-72" : "h-48 sm:h-52"}`}
        style={{ background: item.bg }}
      >
        {/* Tag */}
        <span
          className="absolute top-3 left-3 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full z-10"
          style={{ background: item.tagColor, color: item.tagText }}
        >
          {item.tag}
        </span>

        {/* Image */}
        <Image
          src={item.src}
          alt={item.label}
          width={large ? 260 : 200}
          height={large ? 240 : 140}
          className={`object-contain transition-transform duration-500 ${hovered ? "scale-105" : "scale-100"} ${large ? "max-h-60 sm:max-h-64" : "max-h-36 sm:max-h-40"}`}
          priority
        />

        {/* Hover download overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 px-4 text-center"
          style={{
            opacity: hovered ? 1 : 0,
            background: "rgba(7,81,138,0.92)",
            backdropFilter: "blur(4px)",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <p className="text-[11px] text-white/80 font-medium tracking-wide uppercase break-all">{item.filename}</p>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-[#07518a] bg-white hover:bg-slate-100 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PNG
          </button>
          <p className="text-[10px] text-white/60">Transparent Background</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-base text-slate-900">{item.label}</h3>
        <p className="text-xs text-slate-500 mt-1 flex-1 leading-relaxed">{item.desc}</p>
        <button
          onClick={handleDownload}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border border-[#07518a]/30 bg-[#07518a]/5 hover:bg-[#07518a] hover:text-white transition-all text-[#07518a] active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PNG
        </button>
      </div>
    </div>
  );
}

/* ─── Color Swatch ─── */
function ColorSwatch({ c }: { c: ColorItem }) {
  const { ref, visible } = useVisible(0.1);
  const [copied, setCopied] = useState(false);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      <button
        onClick={() => {
          navigator.clipboard.writeText(c.hex);
          setCopied(true);
          notify(`Copied ${c.hex}`);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="block w-full h-24 relative cursor-pointer group"
        style={{ background: c.hex, borderBottom: c.border ? "1px solid #e2e8f0" : "none" }}
        aria-label={`Copy ${c.hex}`}
      >
        <span
          className="absolute top-2.5 left-2.5 text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: c.role === "Primary" ? "#07518a" : "#475569", color: "#fff" }}
        >
          {c.role.toUpperCase()}
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: c.hex === "#ffffff" || c.hex === "#eef4f9" ? "#07518a" : "#ffffff" }}
        >
          {copied ? "✓ Copied" : "Click to copy"}
        </span>
      </button>
      <div className="p-3">
        <p className="font-semibold text-sm text-slate-900">{c.name}</p>
        <p className="mt-2 text-[11px] font-mono text-slate-500">{c.hex}</p>
        <p className="text-[10px] text-slate-400 mt-1">RGB {c.rgb}</p>
        <p className="text-[10px] text-slate-400">PMS {c.pantone}</p>
      </div>
    </div>
  );
}

/* ─── Section Fade wrapper ─── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useVisible(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════ PAGE ═══════════════════════════════════════ */
export default function MediaKitPage() {
  const copyAllHex = () => {
    const text = COLORS.map((c) => `${c.name}: ${c.hex}`).join("\n");
    navigator.clipboard.writeText(text);
    notify("All hex codes copied");
  };

  return (
    <main
      className="min-h-screen bg-white text-slate-900"
      style={{ fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)" }}
    >
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 sm:pt-28 pb-14 sm:pb-16 px-5 sm:px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef4f9] via-white to-white" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[820px] h-[300px] sm:h-[420px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "rgba(7,81,138,0.12)" }}
        />

        <div className="relative max-w-5xl mx-auto">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-[#07518a]/20 text-[#07518a] bg-[#07518a]/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#07518a] animate-pulse" />
              Official Brand Resource
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-5 leading-tight text-slate-900">
              BTL{" "}
              <span style={{ color: "#07518a" }}>Media Kit</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              Official logos, brand colours, leadership portraits, and guidelines for{" "}
              <strong className="text-slate-900">Brihaspathi Technologies Limited</strong>. Everything you need to represent the brand accurately.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-10">
              <button
                onClick={downloadAllLogos}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all shadow-lg hover:bg-[#063f6b] active:scale-95"
                style={{ background: "#07518a" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Logo Pack
              </button>
              <button
                onClick={() => scrollToId("colours")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:border-[#07518a] hover:text-[#07518a] text-slate-700 font-semibold transition-all active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                Explore Brand Colours
              </button>
            </div>

            {/* Live logo preview strip */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {LOGOS.map((logo) => (
                <button
                  key={logo.id}
                  onClick={() => scrollToId("logos")}
                  className="group relative w-24 h-16 sm:w-28 sm:h-18 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center transition-all hover:border-[#07518a]/50 hover:-translate-y-1 hover:shadow-md active:scale-95"
                  style={{ background: logo.bg }}
                  aria-label={logo.label}
                >
                  <Image
                    src={logo.src}
                    alt={logo.label}
                    width={80}
                    height={40}
                    className="object-contain max-h-10 px-2"
                  />
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Sticky Section Nav ── */}
      <SectionNav />

      {/* ── Stats Bar ── */}
      <StatsBar />

      {/* ── Logo Assets ── */}
      <section id="logos" className="scroll-mt-20 py-16 sm:py-20 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-[#07518a]">Logo Assets</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-slate-900">Official Logo Variations</h2>
                <p className="text-slate-500 text-sm mt-2">
                  Hover any card to reveal the download button. All files are transparent PNG.
                </p>
              </div>
              <button
                onClick={downloadAllLogos}
                className="self-start sm:self-auto shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#07518a] text-white text-sm font-semibold hover:bg-[#063f6b] transition-all active:scale-95 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download All
              </button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOGOS.map((logo) => (
              <AssetCard key={logo.id} item={logo} />
            ))}
          </div>

          {/* Usage rules */}
          <FadeIn delay={200}>
            <div className="mt-8 rounded-2xl border border-[#07518a]/20 bg-[#07518a]/5 p-6">
              <h3 className="font-semibold text-[#07518a] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                Logo Usage Guidelines
              </h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
                <div className="space-y-2">
                  <p className="flex gap-2"><span className="text-[#07518a] font-bold">✓</span>Maintain minimum clear space around the logo</p>
                  <p className="flex gap-2"><span className="text-[#07518a] font-bold">✓</span>Use white logo on dark or coloured backgrounds</p>
                  <p className="flex gap-2"><span className="text-[#07518a] font-bold">✓</span>Use colour or mono logo on light backgrounds</p>
                </div>
                <div className="space-y-2">
                  <p className="flex gap-2"><span className="text-[#063f6b] font-bold">✗</span>Do not stretch or distort the logo</p>
                  <p className="flex gap-2"><span className="text-[#063f6b] font-bold">✗</span>Do not alter the logo colours</p>
                  <p className="flex gap-2"><span className="text-[#063f6b] font-bold">✗</span>Do not place on busy or clashing backgrounds</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MD Portrait ── */}
      <section id="leadership" className="scroll-mt-20 py-16 sm:py-20 px-5 sm:px-6 bg-[#f7f9fb]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#07518a]">Leadership</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-2 text-slate-900">Managing Director Portrait</h2>
            <p className="text-slate-500 text-sm mb-10">
              Official approved headshot for press and media use. Hover to download transparent PNG.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="max-w-xs w-full mx-auto lg:mx-0">
              <AssetCard item={MD_ASSET} large />
            </div>

            <FadeIn delay={150}>
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                <h3 className="font-semibold text-sm text-slate-900 mb-3">Usage Policy</h3>
                <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside leading-relaxed">
                  <li>Use only for editorial and press coverage of BTL</li>
                  <li>Do not crop, filter, or alter the portrait</li>
                  <li>Credit: <em className="text-slate-700">Brihaspathi Technologies Limited</em></li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Brand Colours ── */}
      <section id="colours" className="scroll-mt-20 py-16 sm:py-20 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-[#07518a]">Brand Identity</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-slate-900">Colour Palette</h2>
                <p className="text-slate-500 text-sm mt-2">
                  Built on <strong className="text-[#07518a]">BTL Blue</strong> and white. Click any swatch to copy its hex.
                </p>
              </div>
              <button
                onClick={copyAllHex}
                className="self-start sm:self-auto shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#07518a]/30 bg-[#07518a]/5 text-[#07518a] text-sm font-semibold hover:bg-[#07518a] hover:text-white transition-all active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Copy All Hex
              </button>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {COLORS.map((c) => (
              <ColorSwatch key={c.hex} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Typography ── */}
      <section id="type" className="scroll-mt-20 py-16 sm:py-20 px-5 sm:px-6 bg-[#f7f9fb]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#07518a]">Brand Identity</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-10 text-slate-900">Typography</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-7">
              <div className="mb-4 flex flex-wrap items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900">DM Sans</span>
                <span className="text-xs text-[#07518a] font-semibold tracking-wider uppercase">Primary Typeface</span>
              </div>
              <div className="space-y-2 border-t border-slate-100 pt-4">
                {[
                  { w: "700", label: "Bold / Headlines", sample: "Innovation Redefined" },
                  { w: "600", label: "SemiBold / Sub-heads", sample: "Empowering Technology" },
                  { w: "500", label: "Medium / UI Labels", sample: "Smart Solutions" },
                  { w: "400", label: "Regular / Body", sample: "Brihaspathi Technologies Limited delivers cutting-edge AI and e-security solutions." },
                ].map((t) => (
                  <div key={t.w} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-slate-100 last:border-0">
                    <span className="text-[10px] text-slate-400 w-full sm:w-40 shrink-0 uppercase tracking-wider">{t.label}</span>
                    <p className="text-base sm:text-lg text-slate-800" style={{ fontWeight: t.w }}>{t.sample}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Company Boilerplate ── */}
      <section id="press" className="scroll-mt-20 py-16 sm:py-20 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#07518a]">Press &amp; Media</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-10 text-slate-900">Company Boilerplate</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Short (50 words)",
                text: "Brihaspathi Technologies Limited (BTL) is a leading Indian technology company specialising in AI, e-security, IoT, and renewable energy. Founded in 2006 and ISO certified, BTL empowers governments and enterprises with innovative, connected, and sustainable technology solutions.",
              },
              {
                title: "Full Boilerplate (100 words)",
                text: "Brihaspathi Technologies Limited (BTL) is a premier Indian technology company with over 18 years of expertise in AI-driven solutions, e-security systems, IoT infrastructure, smart governance, and renewable energy. Founded in 2006, BTL is ISO certified and serves government institutions, enterprises, and organisations nationwide. With a team of 500+ professionals and a commitment to innovation, BTL delivers end-to-end digital transformation — from smart classrooms and election management to advanced surveillance and solar energy platforms. Headquartered in India, BTL shapes a connected, secure, and sustainable future.",
              },
            ].map((b) => (
              <FadeIn key={b.title}>
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm text-slate-900">{b.title}</h3>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(b.text);
                        notify("Boilerplate copied");
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg border border-[#07518a]/30 bg-[#07518a]/5 hover:bg-[#07518a] hover:text-white text-[#07518a] transition-all active:scale-95"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{b.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section id="contact" className="scroll-mt-20 py-16 sm:py-20 px-5 sm:px-6 bg-[#f7f9fb]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div
              className="rounded-3xl p-8 sm:p-10 text-center"
              style={{ background: "linear-gradient(135deg,#07518a,#063f6b)" }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Media &amp; Press Inquiries</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                For interviews, additional assets, or permission requests, reach our communications team.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <button
                  onClick={() => goTo("mailto:info@brihaspathi.com")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[#07518a] bg-white font-semibold transition-all shadow-lg hover:bg-slate-100 active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  info@brihaspathi.com
                </button>
                <button
                  onClick={() => goTo("/contact")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/40 hover:bg-white/10 text-white font-semibold transition-all active:scale-95"
                >
                  Contact Page →
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="text-center py-10 text-xs text-slate-400 border-t border-slate-100">
        © {new Date().getFullYear()} Brihaspathi Technologies Limited. All brand assets are proprietary and protected.
      </div>

      {/* Floating UI */}
      <BackToTop />
      <Toast />
    </main>
  );
}