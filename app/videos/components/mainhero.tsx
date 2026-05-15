'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { Users, Video, Youtube } from 'lucide-react'

// ── DYNAMIC COUNTER (FIXED FOR TYPESCRIPT COMPATIBILITY) ───────────────────
function CountUp({ value }: { value: number }) {
    const count = useMotionValue(0)
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const controls = animate(count, value, { duration: 2, ease: [0.16, 1, 0.3, 1] })
        const unsubscribe = count.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.round(latest).toLocaleString()
            }
        })
        return () => {
            controls.stop()
            unsubscribe()
        }
    }, [count, value])

    return <span ref={ref} className="tabular-nums">0</span>
}

// ── FINAL POLISHED HERO: OPTIMIZED SPACING ────────────────────────────────
function MainHero() {
    return (
        <section className="relative w-full min-h-[70vh] lg:h-[75vh] bg-white flex flex-col lg:flex-row overflow-hidden border-b border-slate-100">

            {/* ── BACKGROUND ACCENT: TOP RIGHT ────────────────────────────── */}
            <div className="absolute top-0 right-0 w-[100%] h-[150%] opacity-[0.15] pointer-events-none hidden lg:block">
                <img
                    src="/top-view-cinema-elements-yellow-background-with-copy-space.png"
                    className="w-full h-full object-cover rounded-bl-[8rem]"
                    alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-white" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
            </div>

            {/* ── LEFT: VISUAL ANCHOR (45% Width for Better Balance) ─────────── */}
            <div className="relative z-10 w-full lg:w-[45%] flex items-center justify-center lg:justify-end p-8 lg:pr-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="relative w-full max-w-sm lg:max-w-md aspect-square flex items-center justify-center bg-slate-50/50 rounded-[3rem]"
                >
                    <img
                        src="/images/retro-cinema-banner.png"
                        alt="BTL Strategic Engine"
                        className="w-[100%] h-[105%] object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://www.brihaspathi.com/images/logo.png"; // Emergency fallback
                        }}
                    />
                </motion.div>
            </div>

            {/* ── RIGHT: CORPORATE HUB (55% Width) ───────────────────────────── */}
            <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center p-8 lg:pl-16 xl:pl-24 space-y-8 lg:space-y-10">

                {/* Metrics Hub: Tightened Gaps & Optimized Layout */}
                <div className="flex flex-wrap items-start gap-x-12 gap-y-6 pt-8 border-t border-slate-100 max-w-2xl">
                    {/* Metric 01 */}
                    <div className="min-w-[180px]">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <Users className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-bold uppercase tracking-widest opacity-50">Global Network</span>
                        </div>
                        <div className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                            <CountUp value={40000} />+
                        </div>
                        <div className="text-[#07518a] text-[10px] font-black uppercase tracking-[0.3em] mt-2">Subscribers</div>
                    </div>

                    {/* Metric 02 */}
                    <div className="min-w-[180px]">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <Video className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-bold uppercase tracking-widest opacity-50">Content Nodes</span>
                        </div>
                        <div className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                            <CountUp value={168} />
                        </div>
                        <div className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Active Feeds</div>
                    </div>
                </div>

            </div>

            {/* ── YOUTUBE SUBSCRIBE FLOATING BUTTON ────────────────────────────── */}
            <div className="absolute bottom-8 right-8 z-20">
                <a
                    href="https://www.youtube.com/@brihaspathi?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-6 py-3.5 bg-[#FF0000] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-red-600/30 hover:scale-105 hover:bg-red-700 transition-all"
                >
                    <Youtube className="w-4 h-4 fill-white" />
                    Subscribe Now
                </a>
            </div>

            {/* Matrix Data Anchor */}

        </section>
    )
}

export default MainHero