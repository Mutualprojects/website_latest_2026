"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import InteractiveDiagram from "@/components/InteractiveDiagram";
import {
    Sun,
    ShieldCheck,
    BatteryCharging,
    Monitor,
    Truck,
    Shield,
    Rocket,
    Building2,
    Factory,
    HardHat,
    Pickaxe,
    ShieldAlert,
    Building,
    AlertTriangle,
    Users,
    Anchor,
    DollarSign,
    Clock,
    Activity,
    Move,
    Leaf,
    Wrench,
    Cpu,
    Camera,
    Lightbulb,
    CheckCircle2,
    ChevronDown,
    Download,
    Send,
    X,
    Check,
    ArrowRight,
    Video,
    Crosshair
} from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   FONTS — Standardized on DM Sans for premium, 
   fluid product-level legibility across screens.
───────────────────────────────────────────── */
const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-dm-sans"
});

const display = dmSans;
const body = dmSans;
const mono = dmSans;

/* ─────────────────────────────────────────────
   CONFIG & DATA DEFINITIONS
───────────────────────────────────────────── */
const FRAME_COUNT = 20;
const ORIGINAL_MAX_FRAMES = 20;
const SCRUB = 0.5;

const BRAND = "#07518a";
const AMBER = "#e8960c";

// Static image shown behind the canvas at all times. It acts as the
// guaranteed-visible base layer — if the frame sequence images 404 or
// fail to decode (wrong path, missing asset folder, slow network), this
// is what the person actually sees instead of a flat black/gray canvas.
const HERO_FALLBACK_IMAGE = "/mmr/solar-spectra-hero.png";

const frameSrc = (index1Based: number): string => {
    const mappedFrame = Math.round((index1Based - 1) * ((ORIGINAL_MAX_FRAMES - 1) / (FRAME_COUNT - 1)) + 1);
    const num = String(mappedFrame).padStart(3, "0");
    return encodeURI(`/magnific_a-premium-3d-product-rend_9Z3ZQkCNYZ_frames (1)/magnific_a-premium-3d-product-rend_9Z3ZQkCNYZ_frames/frame_${num}.png`);
};

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, cw: number, ch: number) {
    if (!img.complete || img.naturalWidth === 0) return;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    ctx.save();
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, sx, sy, sw, sh);
    ctx.restore();
}

const TARGET_INDUSTRIES = [
    { title: "Construction Sites", desc: "Protect raw materials, machinery & track project progress continuously.", icon: HardHat, tag: "High Security" },
    { title: "Manufacturing Industries", desc: "Monitor outdoor inventory yards and perimeter boundaries wire-free.", icon: Factory, tag: "Industrial" },
    { title: "Highway & Infrastructure", desc: "Roadway expansion, bridge builds, and remote infrastructure surveillance.", icon: Building2, tag: "Infrastructure" },
    { title: "Mining Areas", desc: "Off-grid, high-durability monitoring for rugged, remote excavation terrain.", icon: Pickaxe, tag: "Rugged Off-Grid" },
    { title: "Defense & Border Security", desc: "Tactical perimeter defense, border surveillance, and intrusion detection.", icon: ShieldAlert, tag: "Tactical Defense" },
    { title: "Smart Cities", desc: "Urban expansion safety, temporary public monitoring, and municipal works.", icon: Building, tag: "Urban Safety" },
    { title: "Renewable Energy Plants", desc: "Protect solar farms, wind turbine parks, and remote substations.", icon: Sun, tag: "Clean Tech" },
    { title: "Disaster Management", desc: "Emergency illumination, search-and-rescue ops, and temporary command posts.", icon: AlertTriangle, tag: "Emergency Ops" },
    { title: "Events & Public Gatherings", desc: "Crowd control, temporary illumination, and high-volume venue safety.", icon: Users, tag: "Temporary Venue" },
    { title: "Ports & Logistics", desc: "Maritime yards, container storage, and shipping terminal security.", icon: Anchor, tag: "Maritime & Supply" }
];

const KEY_FEATURES = [
    { title: "100% Solar Powered", desc: "Dual high-efficiency monocrystalline panels for completely autonomous, zero-electricity operation.", icon: Sun, badge: "Eco-Friendly" },
    { title: "Integrated AI CCTV", desc: "Supports PTZ / fixed AI cameras with real-time motion detection, intruder alerts, and tracking.", icon: Camera, badge: "AI Powered" },
    { title: "High-Intensity LED Flood", desc: "High-lumen ultra-bright floodlights providing powerful daylight illumination after dark.", icon: Lightbulb, badge: "High Lumen" },
    { title: "Lithium Battery Backup", desc: "Long-life 24V 100Ah lithium storage bank ensuring uninterrupted day & night power.", icon: BatteryCharging, badge: "24/7 Continuous" },
    { title: "Remote Monitoring", desc: "Live video streaming, recording playback, and PTZ control via mobile, VMS, or command centre.", icon: Monitor, badge: "Cloud VMS" },
    { title: "Portable Trailer Design", desc: "Towable mobile trailer structure designed for effortless transport and rapid relocation.", icon: Truck, badge: "Mobile Tower" },
    { title: "IP65 Weatherproof", desc: "Rugged outdoor build engineered to withstand heavy rain, dust, extreme heat, and wind.", icon: Shield, badge: "All-Weather" },
    { title: "Quick Installation", desc: "Plug-and-play deployment — active surveillance and lighting within minutes of arrival.", icon: Rocket, badge: "Plug & Play" }
];

const KEY_BENEFITS = [
    { title: "Reduce Operational Costs", desc: "Eliminate electricity bills, fuel expenses, and generator dependency completely.", icon: DollarSign, stat: "100% Zero Fuel Cost" },
    { title: "Rapid Deployment", desc: "Install and start monitoring within minutes with zero civil works or trenching.", icon: Clock, stat: "< 15 Mins Setup" },
    { title: "24×7 Surveillance", desc: "Continuous monitoring day and night with ultra-reliable lithium battery backup.", icon: Activity, stat: "Non-Stop Protection" },
    { title: "Easy Mobility", desc: "Move the towable system effortlessly wherever temporary security is required.", icon: Move, stat: "Tow Anywhere" },
    { title: "Sustainable Solution", desc: "Runs completely on clean, renewable solar energy to reduce carbon footprint.", icon: Leaf, stat: "Zero Emission" },
    { title: "Low Maintenance", desc: "Minimal servicing required, with heavy-duty industrial components built to last.", icon: Wrench, stat: "Long Lifespan" }
];

const TECH_SPECS = [
    { feature: "Solar Panels", spec: "2 × 550Wp Monocrystalline" },
    { feature: "Battery", spec: "24V 100Ah Lithium" },
    { feature: "Charge Controller", spec: "MPPT 60A" },
    { feature: "Camera", spec: "PTZ / Fixed AI Camera" },
    { feature: "Lighting", spec: "High-Lumen LED Flood Lights" },
    { feature: "Protection", spec: "IP65 Weatherproof" },
    { feature: "Structure", spec: "Trailer Mounted" },
    { feature: "Monitoring", spec: "Remote Access & VMS Support" }
];

const APPLICATIONS = [
    "Temporary Surveillance", "Construction Site Security", "Highway Monitoring", "Mining Operations",
    "Public Events", "Disaster Response", "Border Surveillance", "Industrial Security",
    "Smart City Projects", "Outdoor Infrastructure Monitoring"
];

const WHY_CHOOSE = [
    "AI-Powered Surveillance", "Completely Solar Operated", "Integrated CCTV + Flood Light",
    "Plug-and-Play Deployment", "Remote Monitoring Support", "Rugged Outdoor Design",
    "Eco-Friendly Operation", "Trusted Brihaspathi Technology"
];

const FAQS = [
    { q: "Can the system work without electricity?", a: "Yes. It operates entirely on solar power with a lithium battery backup for continuous day and night operation." },
    { q: "Does it support PTZ cameras?", a: "Yes. The system supports both PTZ and fixed AI CCTV cameras based on project requirements." },
    { q: "Is it suitable for temporary deployments?", a: "Absolutely. The trailer-mounted design enables quick transportation and rapid installation." },
    { q: "Can I monitor the cameras remotely?", a: "Yes. Live video, recording, and playback can be accessed through mobile devices, VMS software, or centralised command centres." },
    { q: "Is the system weatherproof?", a: "Yes. The complete system is built to IP65 protection for reliable outdoor performance." }
];

/* ─────────────────────────────────────────────
   SIGNATURE ELEMENT — viewfinder corner brackets.
───────────────────────────────────────────── */
function ViewfinderCorners({
    className = "",
    color = BRAND,
    size = 18,
    strokeWidth = 1.75
}: {
    className?: string;
    color?: string;
    size?: number;
    strokeWidth?: number;
}) {
    const s = size;
    return (
        <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
            <svg width={s} height={s} viewBox="0 0 20 20" fill="none" className="absolute -top-px -left-px">
                <path d="M1 9V1H9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
            </svg>
            <svg width={s} height={s} viewBox="0 0 20 20" fill="none" className="absolute -top-px -right-px">
                <path d="M11 1H19V9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
            </svg>
            <svg width={s} height={s} viewBox="0 0 20 20" fill="none" className="absolute -bottom-px -left-px">
                <path d="M1 11V19H9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
            </svg>
            <svg width={s} height={s} viewBox="0 0 20 20" fill="none" className="absolute -bottom-px -right-px">
                <path d="M11 19H19V11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
            </svg>
        </div>
    );
}

/* Count-up stat readout — fires once when scrolled into view */
function StatReadout({ value, className = "" }: { value: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [display_, setDisplay] = useState(value);

    useEffect(() => {
        if (!inView) return;
        const match = value.match(/[\d.]+/);
        if (!match || match.index === undefined) {
            setDisplay(value);
            return;
        }
        const num = parseFloat(match[0]);
        const prefix = value.slice(0, match.index);
        const suffix = value.slice(match.index + match[0].length);
        const isInt = Number.isInteger(num);
        const controls = animate(0, num, {
            duration: 1,
            ease: "easeOut",
            onUpdate: (v) => {
                setDisplay(`${prefix}${isInt ? Math.round(v) : v.toFixed(1)}${suffix}`);
            }
        });
        return () => controls.stop();
    }, [inView, value]);

    return (
        <span ref={ref} className={className}>
            {display_}
        </span>
    );
}

/* Section eyebrow */
function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07518a]/[0.06] border border-[#07518a]/20 text-[#07518a] text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ fontFamily: "var(--font-mono)" }}
        >
            <Crosshair className="w-3 h-3" />
            {children}
        </div>
    );
}

/* ─────────────────────────────────────────────
   GSAP SCROLL REVEAL — wraps a section's heading
   block (eyebrow / title / intro copy) so the
   overlay text animates in on scroll, distinct
   from the per-card Framer Motion reveals below.
───────────────────────────────────────────── */
function RevealBlock({
    children,
    className = "",
    delay = 0,
    y = 28
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    y?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches) {
            gsap.set(el, { opacity: 1, y: 0 });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { opacity: 0, y },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    delay,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, ref);

        return () => ctx.revert();
    }, [delay, y]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

/* Glass overlay panel — the shared "card floating over the live background" treatment
   used for every content block. Kept deliberately translucent (not solid) so the
   Spectra chassis stays visible behind every section, not just the hero. */
function GlassPanel({
    children,
    className = "",
    id
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) {
    return (
        <div
            id={id}
            className={`relative mx-4 sm:mx-8 lg:mx-0 lg:ml-10 xl:ml-20 my-10 sm:my-14 lg:my-24 max-w-2xl rounded-[28px] border border-slate-200 bg-white shadow-md px-6 sm:px-9 py-9 sm:py-12 text-slate-900 ${className}`}
        >
            {children}
        </div>
    );
}

/* Full-width standalone section — used for content that lives below the
   interactive diagram, outside the sticky-overlay stack. Keeps the same
   dark, translucent card language as GlassPanel so the page reads as one
   continuous system, just laid out across the full page width instead of
   constrained to the narrow column over the chassis. */
function ContentSection({
    id,
    className = "",
    children
}: {
    id?: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className={`relative z-10 py-16 lg:py-24 bg-white border-b border-slate-200 ${className}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8 text-slate-900">{children}</div>
        </section>
    );
}

type ModalType = "demo" | "brochure" | null;

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function MMRPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);
    const heroFrameRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);

    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [frameLoadFailed, setFrameLoadFailed] = useState(false);
    const [frameIdx, setFrameIdx] = useState(1);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [reticle, setReticle] = useState({ x: 50, y: 50, active: false });

    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        interest: "Live Demo",
        message: ""
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
            setModalType(null);
            setFormData({ name: "", email: "", phone: "", company: "", interest: "Live Demo", message: "" });
        }, 3000);
    };

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduceMotion(mq.matches);
        const h = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
        mq.addEventListener("change", h);
        return () => mq.removeEventListener("change", h);
    }, []);

    useEffect(() => {
        if (reduceMotion) return;
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 2
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
        return () => {
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
            lenis.destroy();
        };
    }, [reduceMotion]);

    /* Subtle headline parallax (desktop hover only) */
    useEffect(() => {
        if (reduceMotion) return;
        if (!window.matchMedia("(hover: hover)").matches) return;
        const onMove = (e: MouseEvent) => {
            if (!heroContentRef.current) return;
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            gsap.to(heroContentRef.current, { x: nx * 8, y: ny * 5, duration: 1.2, ease: "power3.out" });
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, [reduceMotion]);

    /* Reticle tracks the cursor over the live background — reinforces "this is a camera" */
    const handleFrameMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setReticle({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
            active: true
        });
    }, []);

    /* Canvas frame sequence — scrubs across the ENTIRE content stack, so the
       chassis visibly reacts as the person scrolls through every section,
       not just the first screen. CSS `sticky` (not GSAP pin) keeps the
       background locked to the viewport; ScrollTrigger only drives frames.

       IMPORTANT: the canvas is transparent (alpha: true) and only ever
       paints once a frame has actually decoded. If every frame image
       fails to load (wrong path, missing asset folder, etc.) the canvas
       is hidden entirely via `frameLoadFailed`, and the static
       HERO_FALLBACK_IMAGE underneath is what's visible — so the
       background is never just a flat, empty rectangle. */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 3);
        const sizeCanvas = () => {
            const w = canvas.clientWidth || window.innerWidth;
            const h = canvas.clientHeight || window.innerHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
        };
        sizeCanvas();

        const images: HTMLImageElement[] = new Array(FRAME_COUNT);
        const seq = { frame: 1 };
        let loadedCount = 0;
        let successCount = 0;
        let cancelled = false;

        const render = (fidx?: number) => {
            const i = Math.round(fidx ?? seq.frame) - 1;
            const clamped = Math.max(0, Math.min(i, FRAME_COUNT - 1));
            const img = images[clamped];
            if (!img?.complete || img.naturalWidth === 0) return;
            const w = canvas.clientWidth || window.innerWidth;
            const h = canvas.clientHeight || window.innerHeight;
            ctx.clearRect(0, 0, w, h);
            drawCover(ctx, img, w, h);
            setFrameIdx(clamped + 1);
        };

        const loadOne = (arrayIdx: number): Promise<void> =>
            new Promise((resolve) => {
                const img = new Image();
                img.decoding = "async";
                img.fetchPriority = arrayIdx < 20 ? "high" : "low";
                if (arrayIdx < 10) img.loading = "eager";
                img.src = frameSrc(arrayIdx + 1);
                const done = (ok: boolean) => {
                    loadedCount++;
                    if (ok) successCount++;
                    if (!cancelled) {
                        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                        if (loadedCount === FRAME_COUNT) {
                            setLoaded(true);
                            if (successCount === 0) setFrameLoadFailed(true);
                        }
                    }
                    resolve();
                };
                img.onload = () => done(img.naturalWidth > 0);
                img.onerror = () => done(false);
                images[arrayIdx] = img;
            });

        (async () => {
            const firstBatchSize = Math.min(10, FRAME_COUNT);
            const firstBatch = Array.from({ length: firstBatchSize }, (_, k) => k);
            await Promise.all(firstBatch.map(loadOne));
            if (cancelled) return;

            // Fail fast: if nothing in the first batch decoded, don't wait
            // for the rest — show the static fallback immediately.
            if (successCount === 0) {
                setFrameLoadFailed(true);
            } else {
                render(1);
            }

            const remainingCount = Math.max(0, FRAME_COUNT - firstBatchSize);
            const remaining = Array.from({ length: remainingCount }, (_, k) => k + firstBatchSize);

            for (let b = 0; b < remaining.length; b += 40) {
                if (cancelled) return;
                await Promise.all(remaining.slice(b, b + 40).map(loadOne));
                if (!cancelled && successCount > 0) render();
            }
        })();

        let scrollAnim: gsap.core.Tween | null = null;
        if (!reduceMotion) {
            scrollAnim = gsap.to(seq, {
                frame: FRAME_COUNT,
                ease: "none",
                scrollTrigger: {
                    trigger: stackRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: SCRUB
                    // no `pin` — CSS `sticky` on the background layer handles that,
                    // so it releases naturally once the content stack ends.
                },
                onUpdate: () => render()
            });
        }

        const onResize = () => {
            sizeCanvas();
            render();
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelled = true;
            window.removeEventListener("resize", onResize);
            scrollAnim?.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [reduceMotion]);

    const scrollToSection = useCallback((id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const openDemo = () => setModalType("demo");
    const openDemoWithInterest = (interest: string) => {
        setFormData((f) => ({ ...f, interest }));
        setModalType("demo");
    };

    return (
        <div
            className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-white text-slate-900 selection:bg-[#07518a] selection:text-white`}
            style={{ fontFamily: "var(--font-body)" }}
        >
            {/* ─────────────────────────────────────────────
          STACK — full-bleed sticky Spectra background with
          every content section scrolling over it as an
          overlay. Both children share the same grid cell via
          explicit col/row placement, so the background stays
          pinned to the viewport for the full height of the
          content column beneath it.
      ───────────────────────────────────────────── */}
            <div ref={stackRef} className="relative grid grid-cols-1">
                {/* Live background layer — sticky, 100vh, full width */}
                <div
                    ref={heroFrameRef}
                    onMouseMove={handleFrameMove}
                    onMouseLeave={() => setReticle((r) => ({ ...r, active: false }))}
                    className="col-start-1 row-start-1 sticky top-0 h-screen w-full overflow-hidden bg-white z-0"
                >
                    {/* Base layer — ALWAYS rendered, on every breakpoint. This is
                        the guaranteed-visible background: the frame-sequence canvas
                        draws on top of it once (and only if) frames actually load. */}
                    <img
                        src={HERO_FALLBACK_IMAGE}
                        alt="Brihaspathi Spectra Mobile Solar CCTV"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <canvas
                        ref={canvasRef}
                        className={`absolute inset-0 w-full h-full object-cover ${frameLoadFailed ? "hidden" : "hidden lg:block"}`}
                    />

                    {/* Depth + legibility gradients — kept light so the chassis
                        reads clearly through the overlay panels further down. */}
                    <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.06)] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent lg:from-transparent pointer-events-none" />

                    <div className="hidden lg:block">
                        <ViewfinderCorners color="#0b1220" size={26} className="opacity-35 !inset-6" />
                    </div>

                    {/* cursor-tracking reticle — desktop interactive flourish */}
                    {reticle.active && !reduceMotion && (
                        <div
                            className="hidden lg:block absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-150"
                            style={{ left: `${reticle.x}%`, top: `${reticle.y}%` }}
                        >
                            <Crosshair className="w-10 h-10 text-slate-800" strokeWidth={1.5} />
                        </div>
                    )}

                    {!loaded && !frameLoadFailed && (
                        <div className="hidden lg:flex absolute inset-0 items-center justify-center bg-white/60 backdrop-blur-sm">
                            <div className="text-center space-y-2" style={{ fontFamily: "var(--font-mono)" }}>
                                <div className="text-3xl font-semibold text-slate-700">{loadingProgress}%</div>
                                <div className="text-[10px] uppercase tracking-widest text-slate-600 font-medium">Loading footage</div>
                            </div>
                        </div>
                    )}

                    {!frameLoadFailed && (
                        <div
                            className="hidden lg:flex absolute bottom-6 right-6 z-20 items-center gap-1.5 text-xs text-slate-700 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200 shadow-lg"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            <span className="font-semibold text-slate-800">{String(frameIdx).padStart(3, "0")}</span>
                            <span className="text-slate-500">/</span>
                            <span>{FRAME_COUNT}</span>
                        </div>
                    )}

                    <div
                        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[11px] font-semibold text-slate-800 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200 shadow-lg"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        SPECTRA CHASSIS
                    </div>
                </div>

                {/* Content layer — overlays the sticky background, scrolls normally.
                    A spacer takes the place of the old in-flow hero block, keeping
                    scroll distances (and the frame-scrub math) unchanged now that
                    the hero copy itself lives inside the sticky layer above. */}
                <div className="col-start-1 row-start-1 relative z-10">
                    {/* ── Hero content ── lives in the normal scrolling content
                        layer (not the sticky background), inside a full-viewport
                        wrapper so it visually reads as "docked over the chassis"
                        for the first screen, then scrolls away naturally like any
                        other section once the person keeps scrolling — instead of
                        staying pinned and overlapping everything beneath it. */}
                    <div className="relative h-screen flex flex-col justify-end lg:justify-center">
                        <div
                            ref={heroContentRef}
                            className="flex flex-col items-start px-4 sm:px-8 lg:px-0 pb-8 sm:pb-10 lg:pb-0 lg:h-[20vh] lg:min-h-[220px] lg:justify-center"
                        >
                            <div className="w-full sm:max-w-xl lg:w-[40%] lg:min-w-[420px] lg:ml-10 xl:ml-20 rounded-[28px] border border-slate-200 bg-white shadow-md px-6 sm:px-9 py-7 sm:py-8 lg:py-6 space-y-4 lg:space-y-3 text-slate-900">
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07518a]/[0.06] border border-[#07518a]/20 text-[#07518a] text-[11px] font-semibold uppercase tracking-[0.14em]"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    <Crosshair className="w-3 h-3" />
                                    2-in-1 Mobile Tower · Off-Grid Ready
                                </div>

                                <h1
                                    className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-semibold text-slate-900 leading-[1.08] tracking-tight"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Portable Solar CCTV{" "}
                                    <span className="text-[#7cc0ee]">&amp; Flood Light</span> System
                                </h1>

                                <p className="text-base md:text-lg font-medium text-slate-800">
                                    Smart surveillance. Powerful illumination. Anywhere the grid doesn&apos;t reach.
                                </p>

                                <p className="hidden lg:block text-sm text-slate-600 leading-relaxed">
                                    AI-powered, solar-operated mobile surveillance with integrated CCTV, high-intensity LED flood
                                    lights, lithium battery backup, and real-time remote monitoring — deployed in minutes.
                                </p>

                                <div className="flex flex-wrap items-center gap-4 pt-1">
                                    <Link
                                        href="/contact"
                                        className="group inline-flex items-center gap-2.5 px-6 py-3 lg:px-7 lg:py-3.5 rounded-xl bg-[#07518a] hover:bg-[#0a6bb3] text-white font-semibold text-sm lg:text-base shadow-lg shadow-[#07518a]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                    >
                                        <span>Contact Us</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => scrollToSection("about-section")}
                            className="mt-4 mb-6 lg:mb-0 lg:absolute lg:bottom-4 lg:right-6 mx-auto lg:mx-0 flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors self-center lg:self-auto"
                        >
                            <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                                Scroll to explore
                            </span>
                            <ChevronDown className="w-4 h-4 animate-bounce" />
                        </button>
                    </div>

                    {/* ── About ── */}
                    <GlassPanel id="about-section" className="space-y-6">
                        <RevealBlock className="space-y-4">
                            <Eyebrow>About the Product</Eyebrow>
                            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                                Intelligent Security for Remote &amp; Off-Grid Locations
                            </h2>
                            <p className="text-lg text-slate-800 leading-relaxed">
                                The <strong className="font-semibold text-slate-900">Brihaspathi Spectra Series</strong> is a portable
                                solar-powered CCTV and flood light system built for rapid deployment in temporary and remote locations.
                            </p>
                            <p className="text-base text-slate-600 leading-relaxed">
                                Combining intelligent surveillance, high-lumen lighting, and renewable energy into a single mobile unit,
                                it provides uninterrupted security without depending on conventional power sources.
                            </p>
                        </RevealBlock>

                        <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                                    <div className="p-2.5 rounded-xl bg-[#07518a] text-white shrink-0"><Sun className="w-5 h-5" /></div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm">100% Solar Operated</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Continuous power, zero electricity cost.</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                                    <div className="p-2.5 rounded-xl bg-[#07518a] text-white shrink-0"><Camera className="w-5 h-5" /></div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm">CCTV + Flood Light (2-in-1)</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">High-lumen lighting with AI smart cameras.</p>
                                    </div>
                                </div>
                            </div>

                        <div className="space-y-3 pt-2">
                            {[
                                { label: "Rapid Setup", title: "Plug-and-Play Mobility", note: "No civil works, trenching, or grid dependency", icon: Rocket, accent: BRAND },
                                { label: "Continuous Backup", title: "Lithium Battery Storage", note: "24V 100Ah long-life day & night battery", icon: BatteryCharging, accent: BRAND },
                                { label: "Cloud VMS Support", title: "Real-Time Remote Access", note: "Mobile, desktop & command centre streams", icon: Monitor, accent: BRAND }
                            ].map((row, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-[#07518a]/40 hover:shadow-md transition-all">
                                    <div>
                                        <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: row.accent, fontFamily: "var(--font-mono)" }}>
                                            {row.label}
                                        </div>
                                        <div className="text-lg font-semibold text-slate-900 mt-1" style={{ fontFamily: "var(--font-display)" }}>
                                            {row.title}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">{row.note}</div>
                                    </div>
                                    <row.icon className="w-8 h-8 shrink-0" style={{ color: row.accent }} />
                                </div>
                            ))}
                        </div>
                    </GlassPanel>

                    {/* ── Key Features ── */}
                    <GlassPanel className="space-y-8">
                        <RevealBlock className="space-y-4">
                            <Eyebrow>Engineered Features</Eyebrow>
                            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                                Key Features
                            </h2>
                            <p className="text-slate-600 text-base">
                                Renewable solar energy, high-lumen floodlights, and advanced AI CCTV — in one chassis.
                            </p>
                        </RevealBlock>

                        <div className="grid sm:grid-cols-2 gap-5">
                            {KEY_FEATURES.map((feat, idx) => {
                                const IconComp = feat.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 14 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.35, delay: (idx % 4) * 0.06 }}
                                        className="group relative rounded-2xl bg-slate-50 p-5 border border-slate-200 hover:border-[#07518a]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-lg overflow-hidden"
                                    >
                                        <ViewfinderCorners color={BRAND} size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="p-3 rounded-xl bg-[#07518a]/10 text-[#07518a] group-hover:scale-110 transition-transform">
                                                    <IconComp className="w-6 h-6" />
                                                </div>
                                                <span
                                                    className="text-[10px] font-semibold text-[#07518a] bg-[#07518a]/10 border border-[#07518a]/20 px-2.5 py-0.5 rounded-full"
                                                    style={{ fontFamily: "var(--font-mono)" }}
                                                >
                                                    {feat.badge}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#07518a] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                                                                {feat.title.includes("CCTV") || feat.title.toLowerCase().includes("camera") ? (
                                                                    <span className="inline-flex items-center gap-2">
                                                                        <Camera className="w-4 h-4 text-[#07518a]" />
                                                                        <span>{feat.title}</span>
                                                                    </span>
                                                                ) : (
                                                                    feat.title
                                                                )}
                                            </h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                                        </div>
                                        <div className="mt-5 pt-3 border-t border-slate-200 flex items-center text-xs font-semibold text-slate-600">
                                            <Check className="w-4 h-4 mr-1 text-[#07518a]" /> Standard system component
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </GlassPanel>

                    {/* Small bottom spacer so the last panel clears the sticky
                        background before it releases */}
                    <div className="h-10 lg:h-20" />
                </div>
            </div>

            {/* ─────────────────────────────────────────────
          AFTER THE STACK — interactive diagram appears once
          every content section has been scrolled through,
          as its own regular full-width section.
      ───────────────────────────────────────────── */}
            <section className="relative z-10 py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
                <InteractiveDiagram />
            </section>

            {/* ─────────────────────────────────────────────
          TARGET INDUSTRIES — moved below the interactive
          diagram; only About + Key Features stay in the
          sticky overlay stack over the chassis.
      ───────────────────────────────────────────── */}
            <ContentSection>
                <RevealBlock className="space-y-4">
                    <Eyebrow>Target Industries</Eyebrow>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                        Designed for Every Critical Environment
                    </h2>
                    <p className="text-slate-600 text-base max-w-2xl">
                        Engineered to secure and illuminate high-value assets across diverse off-grid operations.
                    </p>
                </RevealBlock>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {TARGET_INDUSTRIES.map((ind, idx) => {
                        const IconComp = ind.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.35, delay: (idx % 3) * 0.05 }}
                                whileHover={{ y: -4 }}
                                className="group relative rounded-2xl bg-white border border-slate-200 hover:border-[#07518a]/40 p-5 flex flex-col justify-between transition-colors duration-300 hover:shadow-lg overflow-hidden"
                            >
                                <ViewfinderCorners color={BRAND} size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="p-2.5 rounded-xl bg-[#07518a]/10 text-[#07518a] group-hover:bg-[#07518a] group-hover:text-white transition-colors">
                                            <IconComp className="w-5 h-5" />
                                        </div>
                                        <span
                                            className="text-[10px] font-semibold text-[#07518a] bg-[#07518a]/10 px-2 py-0.5 rounded-full"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            {ind.tag}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-slate-900 group-hover:text-amber-400 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                                            {ind.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{ind.desc}</p>
                                    </div>
                                </div>

                                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs text-[#07518a] font-semibold">
                                    <span>Deploy Ready</span>
                                    <CheckCircle2 className="w-4 h-4 text-[#07518a]" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </ContentSection>

            {/* ─────────────────────────────────────────────
          KEY BENEFITS
      ───────────────────────────────────────────── */}
            <ContentSection>
                <RevealBlock className="space-y-4">
                    <Eyebrow>Business Value</Eyebrow>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                        Key Benefits
                    </h2>
                    <p className="text-slate-600 text-base max-w-2xl">Unmatched operational efficiency, mobility, and zero energy cost.</p>
                </RevealBlock>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {KEY_BENEFITS.map((ben, idx) => {
                        const IconComp = ben.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                                className="rounded-2xl bg-white border border-slate-200 p-6 hover:border-[#07518a]/50 transition-all duration-300 space-y-4 hover:shadow-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="p-3.5 rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                                        <IconComp className="w-6 h-6" />
                                    </div>
                                    <StatReadout
                                        value={ben.stat}
                                        className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                                        {ben.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{ben.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </ContentSection>

            {/* ─────────────────────────────────────────────
          TECHNICAL SPECS
      ───────────────────────────────────────────── */}
            <ContentSection className="bg-[#0d1526]">
                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    <RevealBlock className="space-y-5">
                        <Eyebrow>Technical Highlights</Eyebrow>
                        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                            System Specifications
                        </h2>
                        <p className="text-slate-600 text-base leading-relaxed">
                            Industrial-grade hardware engineered to withstand severe weather while delivering continuous
                            surveillance performance.
                        </p>

                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-[#07518a] shrink-0" />
                                <div>
                                    <h4 className="text-slate-900 font-semibold text-sm">IP65 Weatherproof</h4>
                                    <p className="text-slate-600 text-xs">Dustproof &amp; heavy rain resistant</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Cpu className="w-6 h-6 text-[#07518a] shrink-0" />
                                <div>
                                    <h4 className="text-slate-900 font-semibold text-sm">MPPT 60A Charge Controller</h4>
                                    <p className="text-slate-600 text-xs">High-efficiency solar charge management</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setModalType("brochure")}
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow-md transition-all"
                        >
                            <Download className="w-4 h-4" />
                            <span>Download Complete Spec Sheet</span>
                        </button>
                    </RevealBlock>

                    <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                        <div className="bg-slate-100 px-5 py-3 flex items-center justify-between text-slate-700 font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                            <span className="text-xs uppercase tracking-wider">Feature</span>
                            <span className="text-xs uppercase tracking-wider">Specification</span>
                        </div>
                        <div className="divide-y divide-slate-200">
                            {TECH_SPECS.map((spec, idx) => (
                                <div key={idx} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#07518a] shrink-0" />
                                        <span className="font-medium text-slate-800 text-sm flex items-center gap-2">
                                            {spec.feature === "Camera" ? <Camera className="w-4 h-4 text-[#07518a]" /> : null}
                                            <span>{spec.feature}</span>
                                        </span>
                                    </div>
                                    <span
                                        className="inline-block px-3 py-1 rounded-lg bg-[#eff6ff] border border-[#cfe0ff] text-[#07518a] font-semibold text-xs text-right"
                                        style={{ fontFamily: "var(--font-mono)" }}
                                    >
                                        {spec.spec}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* ─────────────────────────────────────────────
          APPLICATIONS
      ───────────────────────────────────────────── */}
            <ContentSection>
                <RevealBlock className="space-y-4">
                    <Eyebrow>Applications</Eyebrow>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                        Perfect For
                    </h2>
                    <p className="text-slate-600 text-base max-w-2xl">Tailored for temporary, off-grid, and critical infrastructure locations.</p>
                </RevealBlock>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {APPLICATIONS.map((app, idx) => (
                        <div
                            key={idx}
                            className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#07518a]/50 transition-all duration-300 flex items-center gap-3 hover:shadow-md"
                        >
                            <div className="w-2 h-2 rounded-full bg-[#07518a] group-hover:scale-125 transition-transform shrink-0" />
                            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{app}</span>
                        </div>
                    ))}
                </div>
            </ContentSection>

            {/* ─────────────────────────────────────────────
          WHY CHOOSE
      ───────────────────────────────────────────── */}
            <ContentSection>
                <RevealBlock className="space-y-4">
                    <Eyebrow>Why Choose Spectra</Eyebrow>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                        Why Choose Brihaspathi Spectra?
                    </h2>
                    <p className="text-slate-600 text-base max-w-2xl">Backed by over two decades of technology innovation and nationwide deployment.</p>
                </RevealBlock>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {WHY_CHOOSE.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#07518a]/50 transition-all duration-300 flex items-start gap-3 group hover:shadow-md"
                        >
                            <div className="p-2 rounded-xl bg-[#07518a] text-white shrink-0 group-hover:scale-110 transition-transform">
                                <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#07518a] transition-colors">{item}</h4>
                                <p className="text-xs text-slate-500 mt-1">Verified Spectra advantage</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ContentSection>

            {/* ─────────────────────────────────────────────
          FAQ
      ───────────────────────────────────────────── */}
            <ContentSection>
                <RevealBlock className="space-y-4">
                    <Eyebrow>Got Questions?</Eyebrow>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                        Frequently Asked Questions
                    </h2>
                </RevealBlock>

                <div className="space-y-3 max-w-3xl">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openFaq === idx;
                        return (
                            <div key={idx} className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-colors hover:border-[#07518a]/50 shadow-sm">
                                <button
                                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                                    className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07518a] focus-visible:ring-offset-2 rounded-2xl"
                                >
                                    <span className="font-semibold text-sm sm:text-base text-slate-900 pr-4">{faq.q}</span>
                                    <div className={`p-1.5 rounded-full transition-all duration-300 shrink-0 ${isOpen ? "rotate-180 bg-[#07518a] text-white" : "bg-slate-100 text-slate-500"}`}>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                                            <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed">{faq.a}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </ContentSection>

            {/* ─────────────────────────────────────────────
          NEXT SECTION SLOT — placeholder for the additional
          data arrays you mentioned. Drop the two arrays in
          above (near TECH_SPECS etc.) and map them here the
          same way the sections above do.
      ───────────────────────────────────────────── */}
            {/*
            <ContentSection className="bg-white">
                <RevealBlock className="space-y-4">
                    <Eyebrow>Section Name</Eyebrow>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                        Heading
                    </h2>
                </RevealBlock>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {YOUR_NEW_ARRAY.map((item, idx) => ( ... ))}
                </div>
            </ContentSection>
            */}

            {/* ─────────────────────────────────────────────
          FINAL CTA
      ───────────────────────────────────────────── */}
            <section className="relative z-10 py-20 lg:py-28 overflow-hidden bg-[#07518a] text-white">
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
                        backgroundSize: "48px 48px"
                    }}
                />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-semibold uppercase tracking-[0.14em]"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Deploy Security Anywhere
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                        Ready to Secure Your Remote Locations?
                    </h2>

                    <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
                        Deploy the Brihaspathi Spectra Series for reliable surveillance and illumination anywhere.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#07518a] font-semibold text-base shadow-xl hover:bg-slate-100 hover:-translate-y-0.5 transition-all"
                        >
                            <span>Contact Us</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={() => openDemoWithInterest("Price Quote")}
                            className="px-8 py-4 rounded-xl bg-transparent text-white border border-white/40 font-semibold text-base hover:bg-white/10 transition-all"
                        >
                            Get a Quote
                        </button>
                    </div>
                </div>
            </section>

            {/* ─────────────────────────────────────────────
          LEAD MODAL
      ───────────────────────────────────────────── */}
            <AnimatePresence>
                {modalType && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 16 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-lg rounded-3xl bg-[#0b1220] border border-white/10 p-6 sm:p-8 shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setModalType(null)}
                                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-slate-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {formSubmitted ? (
                                <div className="py-12 text-center space-y-4">
                                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                        <Check className="w-8 h-8 stroke-[3]" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>Thank You!</h3>
                                    <p className="text-white/60 text-sm">
                                        Your request for <strong className="text-amber-400">{modalType === "demo" ? formData.interest : "Brochure Download"}</strong>{" "}
                                        has been received. Our team will contact you shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    <div>
                                        <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                                            Brihaspathi Spectra
                                        </div>
                                        <h3 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                                            {modalType === "demo" ? "Request a Demo or Quote" : "Download Product Brochure"}
                                        </h3>
                                        <p className="text-xs text-white/60 mt-1">Portable Mobile Solar CCTV &amp; Flood Light System (2-in-1)</p>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        {modalType === "demo" && (
                                            <div>
                                                <label className="block text-xs font-semibold text-white/70 mb-1">I&apos;m interested in</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {["Live Demo", "Price Quote", "Technical Consultation"].map((opt) => (
                                                        <button
                                                            type="button"
                                                            key={opt}
                                                            onClick={() => setFormData({ ...formData, interest: opt })}
                                                            className={`flex-1 min-w-[100px] text-xs font-semibold px-2 py-2 rounded-lg border transition-colors ${formData.interest === opt
                                                                ? "bg-amber-500 border-amber-500 text-white"
                                                                : "bg-black/40 border-white/10 text-white/70 hover:border-amber-500/50"
                                                                }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-xs font-semibold text-white/70 mb-1">Full Name *</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-[#07518a] text-sm"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-semibold text-white/70 mb-1">Email Address *</label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-[#07518a] text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-white/70 mb-1">Phone Number *</label>
                                                <input
                                                    required
                                                    type="tel"
                                                    placeholder="+91 98765 43210"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-[#07518a] text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-white/70 mb-1">Company / Organization</label>
                                            <input
                                                type="text"
                                                placeholder="Company Name"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-[#07518a] text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-white/70 mb-1">Requirements / Site Location</label>
                                            <textarea
                                                rows={3}
                                                placeholder="Tell us about your project requirements..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-[#07518a] text-sm resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span>Submit Request</span>
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}