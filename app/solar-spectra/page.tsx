"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { DM_Sans } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import {
    Sun, ShieldCheck, BatteryCharging, Monitor, Truck, Shield, Rocket, Building2,
    Factory, HardHat, Pickaxe, ShieldAlert, Building, AlertTriangle, Users, Anchor,
    DollarSign, Clock, Activity, Move, Leaf, Wrench, Cpu, Camera, Lightbulb,
    CheckCircle2, ChevronDown, Download, Send, X, Check, ArrowRight, Video, Crosshair,
    Loader2
} from "lucide-react";

// Dynamic imports for better code splitting
const InteractiveDiagram = dynamic(() => import("@/components/InteractiveDiagram"), {
    loading: () => <div className="h-96 bg-slate-100 animate-pulse" />,
    ssr: false
});

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   FONTS — Optimized with preload
───────────────────────────────────────────── */
const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-dm-sans",
    display: "swap",
    preload: true
});

const display = dmSans;
const body = dmSans;
const mono = dmSans;

/* ─────────────────────────────────────────────
   CONFIG & DATA DEFINITIONS
───────────────────────────────────────────── */
const FRAME_COUNT = 20;
const ORIGINAL_MAX_FRAMES = 20;
const SCRUB = 0.8; // Increased for smoother scrolling
const BRAND = "#07518a";
const AMBER = "#e8960c";
const HERO_FALLBACK_IMAGE = "/mmr/solar-spectra-hero.png";

const frameSrc = (index1Based: number): string => {
    const mappedFrame = Math.round((index1Based - 1) * ((ORIGINAL_MAX_FRAMES - 1) / (FRAME_COUNT - 1)) + 1);
    const num = String(mappedFrame).padStart(3, "0");
    return `/solar-spectra-frames/frame_${num}.webp`;
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
   MEMOIZED COMPONENTS FOR PERFORMANCE
───────────────────────────────────────────── */

const ViewfinderCorners = memo(function ViewfinderCorners({
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
            <svg width={s} height={s} viewBox="0 0 20 20" fill="none" className="absolute -top-px -left-px" aria-hidden>
                <path d="M1 9V1H9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
            </svg>
            <svg width={s} height={s} viewBox="0 0 20 20" fill="none" className="absolute -top-px -right-px" aria-hidden>
                <path d="M11 1H19V9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
            </svg>
            <svg width={s} height={s} viewBox="0 0 20 20" fill="none" className="absolute -bottom-px -left-px" aria-hidden>
                <path d="M1 11V19H9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
            </svg>
            <svg width={s} height={s} viewBox="0 0 20 20" fill="none" className="absolute -bottom-px -right-px" aria-hidden>
                <path d="M11 19H19V11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
            </svg>
        </div>
    );
});

const StatReadout = memo(function StatReadout({ value, className = "" }: { value: string; className?: string }) {
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
            duration: 1.2,
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
});

const Eyebrow = memo(function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07518a]/[0.06] border border-[#07518a]/20 text-[#07518a] text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ fontFamily: "var(--font-mono)" }}
        >
            <Crosshair className="w-3 h-3" aria-hidden />
            {children}
        </div>
    );
});

const RevealBlock = memo(function RevealBlock({
    children,
    className = "",
    delay = 0,
    y = 28,
    duration = 0.9
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    duration?: number;
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
                    duration,
                    delay,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        end: "top 30%",
                        toggleActions: "play none none reverse",
                        scrub: 0.3
                    }
                }
            );
        }, ref);

        return () => ctx.revert();
    }, [delay, y, duration]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
});

const GlassPanel = memo(function GlassPanel({
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
            className={`relative mx-4 sm:mx-8 lg:mx-0 lg:ml-10 xl:ml-20 my-10 sm:my-14 lg:my-24 max-w-2xl rounded-[28px] border border-slate-200 bg-white/90 backdrop-blur-sm shadow-md px-6 sm:px-9 py-9 sm:py-12 text-slate-900 ${className}`}
        >
            {children}
        </div>
    );
});

const ContentSection = memo(function ContentSection({
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
});

type ModalType = "demo" | "brochure" | null;

/* ─────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────── */
export default function MMRPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);
    const heroFrameRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const scrollTargetRef = useRef<HTMLDivElement>(null);

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

    const handleFormSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
            setModalType(null);
            setFormData({ name: "", email: "", phone: "", company: "", interest: "Live Demo", message: "" });
        }, 3000);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduceMotion(mq.matches);
        const h = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
        mq.addEventListener("change", h);
        return () => mq.removeEventListener("change", h);
    }, []);

    // Optimized Lenis with smoother scrolling
    useEffect(() => {
        if (reduceMotion) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.5,
            infinite: false
        });

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
            lenis.destroy();
        };
    }, [reduceMotion]);

    // Parallax effect on headline with smooth tracking
    useEffect(() => {
        if (reduceMotion) return;
        if (!window.matchMedia("(hover: hover)").matches) return;

        let rafId: number;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const onMove = (e: MouseEvent) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 2 * 8;
            targetY = (e.clientY / window.innerHeight - 0.5) * 2 * 5;
        };

        const animateParallax = () => {
            if (!heroContentRef.current) return;
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;
            gsap.set(heroContentRef.current, {
                x: currentX,
                y: currentY,
                ease: "power1.out"
            });
            rafId = requestAnimationFrame(animateParallax);
        };

        window.addEventListener("mousemove", onMove);
        animateParallax();

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(rafId);
        };
    }, [reduceMotion]);

    const handleFrameMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setReticle({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
            active: true
        });
    }, []);

    // Optimized Canvas animation with frame blending
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: false });
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let frameRequestId: number | null = null;
        let isAnimating = false;

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
        let currentFrame = 1;
        let targetFrame = 1;
        let isRendering = false;

        const render = (fidx?: number) => {
            if (isRendering) return;
            isRendering = true;

            const frameVal = fidx ?? seq.frame;
            const i = Math.round(frameVal) - 1;
            const clamped = Math.max(0, Math.min(i, FRAME_COUNT - 1));
            const img = images[clamped];

            if (img?.complete && img.naturalWidth > 0) {
                const w = canvas.clientWidth || window.innerWidth;
                const h = canvas.clientHeight || window.innerHeight;
                ctx.clearRect(0, 0, w, h);
                drawCover(ctx, img, w, h);

                // Smooth dark/grey ambient overlay for last 2 frames (when flood lights light up)
                const overlayStartFrame = FRAME_COUNT - 2; // Frame 18 (out of 20)
                if (frameVal > overlayStartFrame) {
                    const factor = Math.min(1, Math.max(0, (frameVal - overlayStartFrame) / 2));

                    ctx.save();
                    // Dark grey / slate ambient shade for realistic night floodlight atmosphere
                    ctx.fillStyle = `rgba(15, 23, 42, ${0.40 * factor})`;
                    ctx.fillRect(0, 0, w, h);

                    // Radial vignette focusing spotlight intensity towards center
                    const vignette = ctx.createRadialGradient(
                        w * 0.5, h * 0.45, Math.min(w, h) * 0.2,
                        w * 0.5, h * 0.5, Math.max(w, h) * 0.85
                    );
                    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
                    vignette.addColorStop(0.6, `rgba(15, 23, 42, ${0.30 * factor})`);
                    vignette.addColorStop(1, `rgba(7, 12, 22, ${0.60 * factor})`);

                    ctx.fillStyle = vignette;
                    ctx.fillRect(0, 0, w, h);
                    ctx.restore();
                }

                setFrameIdx(clamped + 1);
            }

            isRendering = false;
        };

        const loadOne = (arrayIdx: number): Promise<void> =>
            new Promise((resolve) => {
                const img = new window.Image();
                img.decoding = "async";
                img.fetchPriority = arrayIdx < 10 ? "high" : "low";
                if (arrayIdx < 5) img.loading = "eager";
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
            const firstBatchSize = Math.min(5, FRAME_COUNT);
            const firstBatch = Array.from({ length: firstBatchSize }, (_, k) => k);
            await Promise.all(firstBatch.map(loadOne));
            if (cancelled) return;

            if (successCount === 0) {
                setFrameLoadFailed(true);
            } else {
                render(1);
            }

            const remainingCount = Math.max(0, FRAME_COUNT - firstBatchSize);
            const remaining = Array.from({ length: remainingCount }, (_, k) => k + firstBatchSize);

            for (let b = 0; b < remaining.length; b += 30) {
                if (cancelled) return;
                await Promise.all(remaining.slice(b, b + 30).map(loadOne));
                if (!cancelled && successCount > 0) render();
            }
        })();

        // Improved scroll animation with smoother interpolation
        let scrollAnim: gsap.core.Tween | null = null;
        if (!reduceMotion) {
            scrollAnim = gsap.to(seq, {
                frame: FRAME_COUNT,
                ease: "none",
                scrollTrigger: {
                    trigger: stackRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: SCRUB,
                    invalidateOnRefresh: true,
                    onUpdate: () => {
                        if (!cancelled && !isRendering) {
                            render();
                        }
                    }
                }
            });
        }

        const onResize = () => {
            sizeCanvas();
            if (!cancelled) render();
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelled = true;
            window.removeEventListener("resize", onResize);
            scrollAnim?.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
            if (frameRequestId) cancelAnimationFrame(frameRequestId);
        };
    }, [reduceMotion]);

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const lenis = document.querySelector('.lenis') as any;
            if (lenis) {
                lenis.scrollTo(element, {
                    offset: -80,
                    duration: 1.2
                });
            } else {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, []);

    const openDemo = useCallback(() => setModalType("demo"), []);
    const openDemoWithInterest = useCallback((interest: string) => {
        setFormData((f) => ({ ...f, interest }));
        setModalType("demo");
    }, []);

    const memoizedFeatures = useMemo(() => KEY_FEATURES, []);
    const memoizedBenefits = useMemo(() => KEY_BENEFITS, []);
    const memoizedIndustries = useMemo(() => TARGET_INDUSTRIES, []);

    return (
        <div
            className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-white text-slate-900 selection:bg-[#07518a] selection:text-white`}
            style={{ fontFamily: "var(--font-body)" }}
        >
            {/* Stack with sticky background */}
            <div ref={stackRef} className="relative grid grid-cols-1">
                {/* Live background layer */}
                <div
                    ref={heroFrameRef}
                    onMouseMove={handleFrameMove}
                    onMouseLeave={() => setReticle((r) => ({ ...r, active: false }))}
                    className="col-start-1 row-start-1 sticky top-0 h-screen w-full overflow-hidden bg-white z-0 will-change-transform"
                >
                    {/* Base fallback image with blur-up */}
                    <Image
                        src={HERO_FALLBACK_IMAGE}
                        alt="Brihaspathi Spectra Mobile Solar CCTV System"
                        fill
                        priority
                        quality={85}
                        className="object-cover"
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCcAA//2Q=="
                    />

                    <canvas
                        ref={canvasRef}
                        className={`absolute inset-0 w-full h-full object-cover ${frameLoadFailed ? "hidden" : "hidden lg:block"}`}
                        aria-hidden={frameLoadFailed}
                        style={{ willChange: 'transform' }}
                    />

                    {/* Depth gradients */}
                    <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.06)] pointer-events-none" aria-hidden />
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" aria-hidden />

                    {/* Dark grey night overlay when flood lights illuminate in final 2 frames */}
                    <div
                        className="absolute inset-0 bg-slate-950/40 pointer-events-none transition-opacity duration-500 ease-out"
                        style={{ opacity: frameIdx >= 19 ? (frameIdx === 19 ? 0.5 : 0.8) : 0 }}
                        aria-hidden
                    />

                    <div className="hidden lg:block">
                        <ViewfinderCorners color="#0b1220" size={26} className="opacity-35 !inset-6" />
                    </div>

                    {/* Reticle with smooth transition */}
                    {reticle.active && !reduceMotion && (
                        <div
                            className="hidden lg:block absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 ease-out"
                            style={{
                                left: `${reticle.x}%`,
                                top: `${reticle.y}%`,
                                opacity: reticle.active ? 1 : 0
                            }}
                            role="presentation"
                            aria-hidden
                        >
                            <Crosshair className="w-10 h-10 text-slate-800" strokeWidth={1.5} aria-hidden />
                        </div>
                    )}

                    {/* Full-Page Loader Overlay for Solar Spectra */}
                    <AnimatePresence>
                        {!loaded && !frameLoadFailed && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
                                className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 selection:bg-[#07518a] selection:text-white"
                            >
                                <div className="relative flex flex-col items-center justify-center text-center space-y-6 max-w-sm w-full">
                                    {/* Conic Ring & Centered Lucide Icon */}
                                    <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28">
                                        {/* Outer animated border ring */}
                                        <div
                                            className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-[#07518a] border-r-[#07518a]/40 animate-spin"
                                            style={{ animationDuration: "1.1s" }}
                                        />
                                        
                                        {/* Subtly pulsing outer glow */}
                                        <div
                                            className="absolute -inset-2 rounded-full border border-[#07518a]/30 animate-pulse opacity-40"
                                        />

                                        {/* Center Lucide Icon */}
                                        <div className="relative z-10 p-4 rounded-full bg-[#07518a]/10 text-[#07518a] shadow-inner">
                                            <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-[#07518a]" />
                                        </div>
                                    </div>

                                    {/* Text and Percentage */}
                                    <div className="space-y-2">
                                        <div
                                            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#07518a]"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            Brihaspathi Spectra
                                        </div>
                                        <div
                                            className="text-3xl sm:text-4xl font-bold text-[#07518a] tracking-tight"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            {loadingProgress}%
                                        </div>
                                        <p
                                            className="text-[11px] text-slate-500 font-medium tracking-wider uppercase"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            Loading 3D Footage &amp; Interactive Models...
                                        </p>
                                    </div>

                                    {/* Styled Progress Bar */}
                                    <div className="w-48 sm:w-60 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                                        <div
                                            className="h-full bg-[#07518a] transition-all duration-300 ease-out"
                                            style={{ width: `${loadingProgress}%` }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Frame counter with smooth updates */}
                    {!frameLoadFailed && (
                        <div
                            className="hidden lg:flex absolute bottom-6 right-6 z-20 items-center gap-1.5 text-xs text-slate-700 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200 shadow-lg transition-opacity duration-150"
                            style={{ fontFamily: "var(--font-mono)" }}
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <span className="font-semibold text-slate-800">{String(frameIdx).padStart(3, "0")}</span>
                            <span className="text-slate-500">/</span>
                            <span>{FRAME_COUNT}</span>
                        </div>
                    )}

                    {/* Status badge */}
                    <div
                        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[11px] font-semibold text-slate-800 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200 shadow-lg"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" aria-hidden />
                        SPECTRA CHASSIS
                    </div>
                </div>

                {/* Content layer */}
                <div className="col-start-1 row-start-1 relative z-10">
                    {/* Hero */}
                    <div className="relative h-screen flex flex-col justify-end lg:justify-center">
                        <div
                            ref={heroContentRef}
                            className="flex flex-col items-start px-4 sm:px-8 lg:px-0 pb-8 sm:pb-10 lg:pb-0 lg:h-[20vh] lg:min-h-[220px] lg:justify-center will-change-transform"
                        >
                            <div className="w-full sm:max-w-xl lg:w-[40%] lg:min-w-[420px] lg:ml-10 xl:ml-20 rounded-[28px] border border-slate-200 bg-white/95 backdrop-blur-sm shadow-md px-6 sm:px-9 py-7 sm:py-8 lg:py-6 space-y-4 lg:space-y-3 text-slate-900">
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07518a]/[0.06] border border-[#07518a]/20 text-[#07518a] text-[11px] font-semibold uppercase tracking-[0.14em]"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    <Crosshair className="w-3 h-3" aria-hidden />
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
                                    Smart surveillance. Powerful illumination. Anywhere the grid doesn't reach.
                                </p>

                                <p className="hidden lg:block text-sm text-slate-600 leading-relaxed">
                                    AI-powered, solar-operated mobile surveillance with integrated CCTV, high-intensity LED flood
                                    lights, lithium battery backup, and real-time remote monitoring — deployed in minutes.
                                </p>

                                <div className="flex flex-wrap items-center gap-4 pt-1">
                                    <Link
                                        href="/contact"
                                        className="group inline-flex items-center gap-2.5 px-6 py-3 lg:px-7 lg:py-3.5 rounded-xl bg-[#07518a] hover:bg-[#0a6bb3] text-white font-semibold text-sm lg:text-base shadow-lg shadow-[#07518a]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <span>Contact Us</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden />
                                    </Link>
                                </div>
                                </div>
                            </div>
                        </div>

                    {/* About */}
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
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:border-[#07518a]/40 transition-all duration-300">
                                <div className="p-2.5 rounded-xl bg-[#07518a] text-white shrink-0"><Sun className="w-5 h-5" aria-hidden /></div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 text-sm">100% Solar Operated</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">Continuous power, zero electricity cost.</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:border-[#07518a]/40 transition-all duration-300">
                                <div className="p-2.5 rounded-xl bg-[#07518a] text-white shrink-0"><Camera className="w-5 h-5" aria-hidden /></div>
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
                                <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-[#07518a]/40 hover:shadow-md transition-all duration-300">
                                    <div>
                                        <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: row.accent, fontFamily: "var(--font-mono)" }}>
                                            {row.label}
                                        </div>
                                        <div className="text-lg font-semibold text-slate-900 mt-1" style={{ fontFamily: "var(--font-display)" }}>
                                            {row.title}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">{row.note}</div>
                                    </div>
                                    <row.icon className="w-8 h-8 shrink-0" style={{ color: row.accent }} aria-hidden />
                                </div>
                            ))}
                        </div>
                    </GlassPanel>

                    {/* Features */}
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
                            {memoizedFeatures.map((feat, idx) => {
                                const IconComp = feat.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{
                                            duration: 0.5,
                                            delay: (idx % 4) * 0.08,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                        className="group relative rounded-2xl bg-slate-50 p-5 border border-slate-200 hover:border-[#07518a]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-lg overflow-hidden"
                                    >
                                        <ViewfinderCorners color={BRAND} size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="p-3 rounded-xl bg-[#07518a]/10 text-[#07518a] group-hover:scale-110 transition-transform duration-300">
                                                    <IconComp className="w-6 h-6" aria-hidden />
                                                </div>
                                                <span
                                                    className="text-[10px] font-semibold text-[#07518a] bg-[#07518a]/10 border border-[#07518a]/20 px-2.5 py-0.5 rounded-full"
                                                    style={{ fontFamily: "var(--font-mono)" }}
                                                >
                                                    {feat.badge}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#07518a] transition-colors duration-300" style={{ fontFamily: "var(--font-display)" }}>
                                                {feat.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                                        </div>
                                        <div className="mt-5 pt-3 border-t border-slate-200 flex items-center text-xs font-semibold text-slate-600">
                                            <Check className="w-4 h-4 mr-1 text-[#07518a]" aria-hidden /> Standard system component
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </GlassPanel>

                    <div className="h-10 lg:h-20" aria-hidden />
                </div>
            </div>

            {/* Interactive Diagram */}
            <section className="relative z-10 py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
                <InteractiveDiagram />
            </section>

            {/* Industries */}
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
                    {memoizedIndustries.map((ind, idx) => {
                        const IconComp = ind.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: (idx % 3) * 0.06,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                whileHover={{ y: -6 }}
                                className="group relative rounded-2xl bg-white border border-slate-200 hover:border-[#07518a]/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg overflow-hidden"
                            >
                                <ViewfinderCorners color={BRAND} size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden />

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="p-2.5 rounded-xl bg-[#07518a]/10 text-[#07518a] group-hover:bg-[#07518a] group-hover:text-white transition-colors duration-300">
                                            <IconComp className="w-5 h-5" aria-hidden />
                                        </div>
                                        <span
                                            className="text-[10px] font-semibold text-[#07518a] bg-[#07518a]/10 px-2 py-0.5 rounded-full"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            {ind.tag}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-slate-900 group-hover:text-amber-500 transition-colors duration-300" style={{ fontFamily: "var(--font-display)" }}>
                                            {ind.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{ind.desc}</p>
                                    </div>
                                </div>

                                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs text-[#07518a] font-semibold">
                                    <span>Deploy Ready</span>
                                    <CheckCircle2 className="w-4 h-4 text-[#07518a]" aria-hidden />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </ContentSection>

            {/* Benefits */}
            <ContentSection>
                <RevealBlock className="space-y-4">
                    <Eyebrow>Business Value</Eyebrow>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                        Key Benefits
                    </h2>
                    <p className="text-slate-600 text-base max-w-2xl">Unmatched operational efficiency, mobility, and zero energy cost.</p>
                </RevealBlock>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {memoizedBenefits.map((ben, idx) => {
                        const IconComp = ben.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: (idx % 3) * 0.08,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="rounded-2xl bg-white border border-slate-200 p-6 hover:border-[#07518a]/50 transition-all duration-300 space-y-4 hover:shadow-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="p-3.5 rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                                        <IconComp className="w-6 h-6" aria-hidden />
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

            {/* Tech Specs */}
            <ContentSection className="bg-[#0d1526]">
                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    <RevealBlock className="space-y-5">
                        <Eyebrow>Technical Highlights</Eyebrow>
                        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                            System Specifications
                        </h2>
                        <p className="text-slate-400 text-base leading-relaxed">
                            Industrial-grade hardware engineered to withstand severe weather while delivering continuous
                            surveillance performance.
                        </p>

                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-[#07518a] shrink-0" aria-hidden />
                                <div>
                                    <h4 className="text-slate-900 font-semibold text-sm">IP65 Weatherproof</h4>
                                    <p className="text-slate-600 text-xs">Dustproof &amp; heavy rain resistant</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Cpu className="w-6 h-6 text-[#07518a] shrink-0" aria-hidden />
                                <div>
                                    <h4 className="text-slate-900 font-semibold text-sm">MPPT 60A Charge Controller</h4>
                                    <p className="text-slate-600 text-xs">High-efficiency solar charge management</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setModalType("brochure")}
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <Download className="w-4 h-4" aria-hidden />
                            <span>Download Complete Spec Sheet</span>
                        </button>
                    </RevealBlock>

                    <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                        <div className="bg-slate-100 px-5 py-3 flex items-center justify-between text-slate-700 font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                            <span className="text-xs uppercase tracking-wider">Feature</span>
                            <span className="text-xs uppercase tracking-wider">Specification</span>
                        </div>
                        <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
                            {TECH_SPECS.map((spec, idx) => (
                                <div key={idx} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors duration-150 gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#07518a] shrink-0" aria-hidden />
                                        <span className="font-medium text-slate-800 text-sm">{spec.feature}</span>
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

            {/* Applications */}
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
                            <div className="w-2 h-2 rounded-full bg-[#07518a] group-hover:scale-125 transition-transform duration-300 shrink-0" aria-hidden />
                            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors duration-300">{app}</span>
                        </div>
                    ))}
                </div>
            </ContentSection>

            {/* Why Choose */}
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
                            <div className="p-2 rounded-xl bg-[#07518a] text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <Check className="w-4 h-4 stroke-[3]" aria-hidden />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#07518a] transition-colors duration-300">{item}</h4>
                                <p className="text-xs text-slate-500 mt-1">Verified Spectra advantage</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ContentSection>

            {/* FAQ */}
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
                            <div key={idx} className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all duration-300 hover:border-[#07518a]/50 shadow-sm">
                                <button
                                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                                    className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07518a] focus-visible:ring-offset-2 rounded-2xl transition-colors duration-200"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-semibold text-sm sm:text-base text-slate-900 pr-4">{faq.q}</span>
                                    <div className={`p-1.5 rounded-full transition-all duration-300 shrink-0 ${isOpen ? "rotate-180 bg-[#07518a] text-white" : "bg-slate-100 text-slate-500"}`}>
                                        <ChevronDown className="w-4 h-4" aria-hidden />
                                    </div>
                                </button>
                                <AnimatePresence mode="wait">
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                ease: [0.22, 1, 0.36, 1]
                                            }}
                                        >
                                            <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed">{faq.a}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </ContentSection>

            {/* Final CTA */}
            <section className="relative z-10 py-20 lg:py-28 overflow-hidden bg-[#07518a] text-white">
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
                        backgroundSize: "48px 48px"
                    }}
                    aria-hidden
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
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#07518a] font-semibold text-base shadow-xl hover:bg-slate-100 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <span>Contact Us</span>
                            <ArrowRight className="w-4 h-4" aria-hidden />
                        </Link>
                        <button
                            onClick={() => openDemoWithInterest("Price Quote")}
                            className="px-8 py-4 rounded-xl bg-transparent text-white border border-white/40 font-semibold text-base hover:bg-white/10 transition-all duration-300"
                        >
                            Get a Quote
                        </button>
                    </div>
                </div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {modalType && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="relative w-full max-w-lg rounded-3xl bg-[#0b1220] border border-white/10 p-6 sm:p-8 shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-title"
                        >
                            <button
                                onClick={() => setModalType(null)}
                                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200"
                                aria-label="Close dialog"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {formSubmitted ? (
                                <div className="py-12 text-center space-y-4">
                                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                        <Check className="w-8 h-8 stroke-[3]" aria-hidden />
                                    </div>
                                    <h3 id="modal-title" className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                                        Thank You!
                                    </h3>
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
                                        <h3 id="modal-title" className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                                            {modalType === "demo" ? "Request a Demo or Quote" : "Download Product Brochure"}
                                        </h3>
                                        <p className="text-xs text-white/60 mt-1">Portable Mobile Solar CCTV &amp; Flood Light System (2-in-1)</p>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        {modalType === "demo" && (
                                            <div>
                                                <label className="block text-xs font-semibold text-white/70 mb-1">I'm interested in</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {["Live Demo", "Price Quote", "Technical Consultation"].map((opt) => (
                                                        <button
                                                            type="button"
                                                            key={opt}
                                                            onClick={() => setFormData({ ...formData, interest: opt })}
                                                            className={`flex-1 min-w-[100px] text-xs font-semibold px-2 py-2 rounded-lg border transition-all duration-200 ${formData.interest === opt
                                                                ? "bg-amber-500 border-amber-500 text-white"
                                                                : "bg-black/40 border-white/10 text-white/70 hover:border-amber-500/50 hover:bg-black/60"
                                                                }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <label htmlFor="name" className="block text-xs font-semibold text-white/70 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                id="name"
                                                required
                                                type="text"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 text-sm transition-colors duration-200"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label htmlFor="email" className="block text-xs font-semibold text-white/70 mb-1">
                                                    Email Address *
                                                </label>
                                                <input
                                                    id="email"
                                                    required
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 text-sm transition-colors duration-200"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-xs font-semibold text-white/70 mb-1">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    id="phone"
                                                    required
                                                    type="tel"
                                                    placeholder="+91 98765 43210"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 text-sm transition-colors duration-200"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="company" className="block text-xs font-semibold text-white/70 mb-1">
                                                Company / Organization
                                            </label>
                                            <input
                                                id="company"
                                                type="text"
                                                placeholder="Company Name"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 text-sm transition-colors duration-200"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-xs font-semibold text-white/70 mb-1">
                                                Requirements / Site Location
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={3}
                                                placeholder="Tell us about your project requirements..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 text-sm resize-none transition-colors duration-200"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 mt-4 hover:shadow-lg hover:-translate-y-0.5"
                                    >
                                        <Send className="w-4 h-4" aria-hidden />
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