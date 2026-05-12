'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Play, Share2, ExternalLink, Shield, Zap, Heart, Database,
    Settings, Youtube, Users, TrendingUp, Bell, Search, Filter,
    LayoutGrid, List, ChevronRight, Clock, ArrowRight, Video,
    Activity, Globe, Lock, Cpu, Calendar
} from 'lucide-react'
import Image from 'next/image'
import MainHero from './components/mainhero'

// ============================================================================
// TYPES & CONFIG
// ============================================================================

interface RawVideoData {
    "S.No": string
    Title: string
    Link: string
}

interface VideoItem {
    id: string
    title: string
    embedUrl: string
    thumbnail: string
    originalUrl: string
    category: string
    icon: React.ReactNode
    duration?: string
}

const BRAND_COLOR = '#07518a'
const ACCENT_ORANGE = '#f97316'
const YT_CHANNEL_URL = 'https://www.youtube.com/@brihaspathi'
const API_URL = 'https://sheetdb.io/api/v1/qy3yjgsyojs9b'

// ============================================================================
// UTILS
// ============================================================================

const getCategoryInfo = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('solar') || t.includes('energy')) return { name: 'Energy', icon: <Zap className="w-3.5 h-3.5" /> }
    if (t.includes('security') || t.includes('surveillance') || t.includes('cctv')) return { name: 'Security', icon: <Shield className="w-3.5 h-3.5" /> }
    if (t.includes('health') || t.includes('wellness')) return { name: 'Healthcare', icon: <Heart className="w-3.5 h-3.5" /> }
    if (t.includes('hrms') || t.includes('people') || t.includes('management')) return { name: 'Enterprise', icon: <Database className="w-3.5 h-3.5" /> }
    return { name: 'Strategic', icon: <Settings className="w-3.5 h-3.5" /> }
}

const extractVideoInfo = (title: string, iframeStr: string): VideoItem | null => {
    try {
        const srcMatch = iframeStr.match(/src="([^"]+)"/)
        if (!srcMatch) return null

        let embedUrl = srcMatch[1]
        if (embedUrl.includes('?')) {
            embedUrl = embedUrl.split('?')[0]
        }

        const idMatch = embedUrl.match(/\/embed\/([^/]+)/)
        const videoId = idMatch ? idMatch[1] : ''
        if (!videoId) return null

        const { name, icon } = getCategoryInfo(title)

        return {
            id: videoId,
            title: title.replace(/\n|\r/g, ' ').trim(),
            embedUrl: embedUrl,
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            originalUrl: `https://www.youtube.com/watch?v=${videoId}`,
            category: name,
            icon: icon
        }
    } catch (e) {
        console.error('Extraction Sync Error', e)
        return null
    }
}

// ============================================================================
// ELITE COMPONENTS
// ============================================================================

const VideoCard = ({ video, index, isActive, onTopPlay }: { video: VideoItem, index: number, isActive: boolean, onTopPlay: () => void }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div
                className={`group relative w-full text-left bg-white rounded-[2.5rem] p-4 transition-all duration-700 border-2 ${isActive || isPlaying
                    ? 'border-[#07518a] shadow-[0_40px_80px_-20px_rgba(7,81,138,0.12)]'
                    : 'border-slate-50 hover:border-[#07518a]/10 hover:shadow-2xl hover:-translate-y-2'
                    }`}
            >
                {/* Thumbnail / Player Layer */}
                <div className="relative aspect-video rounded-[1.8rem] overflow-hidden mb-6 bg-black ring-1 ring-slate-100">
                    {!isPlaying ? (
                        <>
                            <img
                                 src={video.thumbnail}
                                 alt={video.title}
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                                 onError={(e) => {
                                     const target = e.target as HTMLImageElement;
                                     if (!target.src.includes('hqdefault.jpg')) {
                                         target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                                     }
                                 }}
                             />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                            {/* Play Accent */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-md text-[#07518a] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                                >
                                    <Play className="w-6 h-6 fill-current ml-1" />
                                </button>
                            </div>

                            {/* Cinematic HUD Overlay (Mini) */}
                            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="flex justify-between items-start">
                                    <div className="px-2 py-1 bg-black/60 backdrop-blur-xl rounded-lg border border-white/10 text-[7px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                                        <Activity className="w-2 h-2 animate-pulse" />
                                        LIVE_SYNC
                                    </div>
                                    <div className="flex gap-2">
                                        <Globe className="w-3 h-3 text-white/40" />
                                        <Lock className="w-3 h-3 text-white/40" />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full">
                            <iframe
                                src={`${video.embedUrl}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                                className="absolute inset-0 w-full h-full"
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                            <button
                                onClick={() => setIsPlaying(false)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-xl text-white flex items-center justify-center hover:bg-[#07518a] transition-colors z-20"
                            >
                                <span className="text-[10px] font-black">✕</span>
                            </button>
                        </div>
                    )}

                    {/* Category Badges */}
                    {!isPlaying && (
                        <div className="absolute top-4 left-4">
                            <div className="px-3 py-1 bg-[#07518a]/90 backdrop-blur-md rounded-lg text-[9px] font-black text-white uppercase tracking-[0.2em] shadow-lg">
                                {video.category}
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Layer */}
                <div className="px-4 pb-4">
                    <div className="flex items-center gap-3 mb-3 text-orange-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Strategic Feed</span>
                    </div>

                    <h4 className={`text-lg font-bold leading-tight line-clamp-2 min-h-[3rem] transition-colors duration-500 ${isActive || isPlaying ? 'text-[#07518a]' : 'text-slate-900 group-hover:text-[#07518a]'
                        }`}>
                        {video.title}
                    </h4>

                    <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                        <button
                            onClick={onTopPlay}
                            className="flex items-center gap-3 text-[#07518a] group/btn"
                        >
                            <div className="w-8 h-8 rounded-xl bg-[#07518a]/5 flex items-center justify-center group-hover/btn:bg-[#07518a] group-hover/btn:text-white transition-all duration-500 shadow-sm">
                                <ExternalLink className="w-4 h-4" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-500">
                                Open Theater
                            </span>
                        </button>
                        <div className="flex items-center gap-1.5">
                            <Cpu className="w-3 h-3 text-slate-200" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// ============================================================================
// MAIN PAGE — WORLD CLASS CORPORATE DASHBOARD
// ============================================================================

export default function WorldClassVideoPage() {
    const [videos, setVideos] = useState<VideoItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)
    const [filter, setFilter] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const gridRef = React.useRef<HTMLDivElement>(null)

    const scrollToGrid = () => {
        gridRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL)
                if (!response.ok) throw new Error('Network Synchronization Failed')
                const data: RawVideoData[] = await response.json()
                const processed = data
                    .map(item => extractVideoInfo(item.Title, item.Link))
                    .filter((v): v is VideoItem => v !== null)

                setVideos(processed)
                if (processed.length > 0) setActiveVideo(processed[0])
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const categories = useMemo(() => ['All', ...Array.from(new Set(videos.map(v => v.category)))], [videos])

    const filteredVideos = useMemo(() => {
        let result = videos
        if (filter !== 'All') result = result.filter(v => v.category === filter)
        if (searchQuery) result = result.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
        return result
    }, [videos, filter, searchQuery])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-[2px] border-slate-50" />
                    <div className="absolute inset-0 rounded-full border-[2px] border-transparent border-t-[#07518a] animate-spin" />
                </div>
                <motion.p
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-10 text-[12px] font-black uppercase tracking-[0.6em] text-[#07518a]"
                >
                    Initializing Visual Matrix
                </motion.p>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-white text-slate-900 font-dm-sans selection:bg-[#07518a] selection:text-white antialiased overflow-x-hidden">


            {/* ── AMBIENT FOUNDATION ───────────────────────────────────────── */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-[#07518a]/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-orange-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 flex flex-col">
                <MainHero />
                {/* ── ELITE BRAND HERO SECTION ────────────────────────────────── */}
                <div className="max-w-[1920px] mx-auto w-full p-4 md:p-8 lg:p-10 pt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white rounded-[4rem] p-10 md:p-14 shadow-[0_50px_100px_-20px_rgba(7,81,138,0.08)] border border-slate-50 relative overflow-hidden"
                    >
                        {/* Decorative Background Glows */}
                        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#07518a]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-orange-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-12 md:gap-20">
                            {/* Brand Avatar: High Fidelity */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-[#07518a] rounded-[3rem] rotate-6 scale-105 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
                                <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl bg-white p-2">
                                    <img
                                        src="https://yt3.ggpht.com/dgkSpXN4IPSVkfAtIP4kfWylJUavjyiITRXHuLmtsTR-l0YEQl8UDpYju1fAQ9Yhd14OPu_hBQ=s176-c-k-c0x00ffffff-no-rj-mo"
                                        alt="Brihaspathi Technologies"
                                        className="w-full h-full object-cover rounded-[2.5rem] transition-transform duration-700 group-hover:scale-110"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                                    <Shield className="w-7 h-7 text-[#07518a]" />
                                </div>
                            </div>

                            {/* Brand Intelligence: Premium Typography */}
                            <div className="flex-1 space-y-10">
                                <div className="space-y-6">
                                    <div className="flex flex-wrap items-center gap-5">
                                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                                            Brihaspathi Technologies <span className="text-[#07518a]">Limited</span>
                                        </h2>
                                        <div className="px-5 py-2 bg-orange-500/10 text-orange-600 text-[11px] font-black uppercase tracking-[0.35em] rounded-full border border-orange-500/20 shadow-sm">
                                            Verified Strategic Partner
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-slate-400 font-mono text-[10px] uppercase tracking-[0.25em]">
                                        <span className="flex items-center gap-2.5 text-[#07518a] font-bold">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#07518a] animate-pulse" />
                                            @brihaspathi
                                        </span>
                                        <span className="flex items-center gap-2.5">
                                            <Users className="w-4 h-4 opacity-50" />
                                            40K+ Operatives
                                        </span>
                                        <span className="flex items-center gap-2.5">
                                            <Video className="w-4 h-4 opacity-50" />
                                            168 Strategic Feeds
                                        </span>
                                        <span className="flex items-center gap-2.5">
                                            <Calendar className="w-4 h-4 opacity-50" />
                                            Active Since 2006
                                        </span>
                                    </div>
                                </div>

                                <div className="max-w-4xl border-l-4 border-slate-100 pl-8">
                                    <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                                        Empowering businesses across India with next-generation technology solutions. 
                                        Since 2006, we’ve committed ourselves to the relentless pursuit of innovation 
                                        in <span className="text-slate-900 font-bold">IoT</span>, 
                                        <span className="text-slate-900 font-bold ml-1">AI</span>, and 
                                        <span className="text-slate-900 font-bold ml-1 text-[#07518a]">CCTV surveillance</span>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ── STRATEGIC ECOSYSTEM BANNER ────────────────────────────── */}
                <div className="max-w-[1920px] mx-auto w-full px-4 md:px-8 lg:px-10 pb-12">
                    <div
                        className="relative h-32 md:h-48 lg:h-56 rounded-[3rem] md:rounded-[4rem] overflow-hidden border-8 border-white shadow-[0_60px_120px_-30px_rgba(7,81,138,0.15)] bg-slate-900"
                    >
                        <img
                            src="https://yt3.googleusercontent.com/plGz8zeHBLpXeIix6Yg0duqhCZPJmD-N0U2OWGeJqzn7PBe31IpqckWSJdgV8zaU2y8hELUOqg=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
                            alt="Strategic Ecosystem"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex items-center gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-white text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] drop-shadow-lg">
                                Global Intelligence Network
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── THEATER CORE LAYOUT ────────────────────────────────────── */}
                <div className="flex-1 max-w-[1920px] mx-auto w-full p-4 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">

                    {/* ── LEFT: PRIMARY COMMAND CONSOLE ────────────────────────── */}
                    <div className="lg:col-span-8 xl:col-span-9 space-y-10">
                        <AnimatePresence mode="wait">
                            {activeVideo && (
                                <motion.div
                                    key={activeVideo.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-10"
                                >
                                    {/* Elite Theater Player */}
                                    <div className="relative aspect-video rounded-[3.5rem] overflow-hidden bg-black shadow-[0_80px_160px_-40px_rgba(7,81,138,0.2)] border-[12px] border-slate-50 group">
                                        <iframe
                                            src={`${activeVideo.embedUrl}?autoplay=1&mute=1&rel=0&modestbranding=1&vq=hd1080`}
                                            className="absolute inset-0 w-full h-full"
                                            title={activeVideo.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />

                                        {/* Cinematic HUD Overlay */}
                                        <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between opacity-40 group-hover:opacity-80 transition-opacity duration-700">
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col gap-3">
                                                    <div className="px-4 py-2 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 text-[11px] font-mono text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-3">
                                                        <Activity className="w-4 h-4 animate-pulse" />
                                                        SECURE_FEED::{activeVideo.id.slice(0, 8)}
                                                    </div>
                                                    <div className="text-[10px] font-mono text-white/60 pl-2 tracking-widest">ENCRYPTION::AES-256</div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2 text-[10px] font-mono text-white/40 tracking-[0.4em]">
                                                    <div>SYSTEM_READY</div>
                                                    <div>UPTIME: 99.98%</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="flex gap-4">
                                                    <Globe className="w-5 h-5 text-white/20" />
                                                    <Lock className="w-5 h-5 text-white/20" />
                                                    <Cpu className="w-5 h-5 text-white/20" />
                                                </div>
                                                <div className="text-[10px] font-mono text-white/20 tracking-tighter">BTL_QUANTUM_CORE_REVISION.X</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── TACTICAL DATA HUB (Filling the space) ────────────────── */}
                                    <div className="bg-white rounded-[3rem] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden group">
                                        {/* Background Accents */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#07518a]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#07518a]/10 transition-colors duration-700" />

                                        <div className="relative z-10 space-y-10">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-4">
                                                        <span className="px-4 py-1.5 bg-[#07518a] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg shadow-[#07518a]/20">
                                                            {activeVideo.category}
                                                        </span>
                                                        <div className="flex items-center gap-2 text-slate-300">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                            <span className="text-[10px] font-mono tracking-widest uppercase">Live_Feed_Active</span>
                                                        </div>
                                                    </div>
                                                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none max-w-4xl uppercase">
                                                        {activeVideo.title}
                                                    </h1>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <button className="flex items-center gap-3 px-8 py-4 bg-slate-50 hover:bg-[#07518a] text-slate-400 hover:text-white rounded-2xl transition-all duration-500 group/btn shadow-sm hover:shadow-xl hover:shadow-[#07518a]/20">
                                                        <Share2 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                                                        <span className="text-[11px] font-black uppercase tracking-widest">Disseminate</span>
                                                    </button>
                                                    <a
                                                        href={activeVideo.originalUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-14 h-14 bg-slate-50 hover:bg-orange-500 text-slate-400 hover:text-white rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-orange-500/20"
                                                    >
                                                        <Youtube className="w-5 h-5" />
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Tactical Description */}
                                            <div className="pt-10 border-t border-slate-50">
                                                <p className="text-slate-500 text-lg leading-relaxed max-w-5xl">
                                                    This strategic transmission contains critical operational intelligence curated for the BTL Vision network.
                                                    Engage with the feed above to analyze the full technical report and tactical insights associated with this deployment.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ── RIGHT: ELITE SIDEBAR QUEUE ────────────────────────────── */}
                    <div className="lg:col-span-4 xl:col-span-3 space-y-12">
                        <div className="sticky top-10 space-y-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[13px] font-black uppercase tracking-[0.4em] text-[#07518a]">Tactical Queue</h3>
                                <div className="flex gap-4">
                                    <TrendingUp className="w-4 h-4 text-slate-300 hover:text-[#07518a] cursor-pointer transition-colors" />
                                </div>
                            </div>

                            {/* Integrated Search for Sidebar */}
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#07518a] transition-all" />
                                <input
                                    type="text"
                                    placeholder="Search archive..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold focus:outline-none focus:ring-4 focus:ring-[#07518a]/5 focus:border-[#07518a]/20 transition-all placeholder:text-slate-400"
                                />
                            </div>

                            {/* Strategic Queue List */}
                            <div className="space-y-5 max-h-[calc(100vh-100px)] overflow-y-auto pr-3 custom-scrollbar">
                                {filteredVideos.slice(0, 6).map((video, idx) => (
                                    <motion.button
                                        key={video.id}
                                        onClick={() => {
                                            setActiveVideo(video);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                        className={`flex gap-5 w-full text-left group p-4 rounded-[2rem] transition-all border-2 ${activeVideo?.id === video.id
                                            ? 'bg-white border-[#07518a] shadow-2xl shadow-[#07518a]/5'
                                            : 'bg-white border-transparent hover:border-slate-100 hover:shadow-xl'
                                            }`}
                                    >
                                        <div className="relative w-32 h-20 flex-shrink-0 rounded-[1.2rem] overflow-hidden bg-slate-100 ring-1 ring-slate-100">
                                            <img
                                                src={video.thumbnail}
                                                alt=""
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[0.8s] ease-out"
                                            />
                                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>
                                        <div className="flex-1 space-y-2 min-w-0 py-1">
                                            <h4 className={`text-[13px] font-bold leading-tight line-clamp-2 transition-colors duration-500 ${activeVideo?.id === video.id ? 'text-[#07518a]' : 'text-slate-900 group-hover:text-orange-600'
                                                }`}>
                                                {video.title}
                                            </h4>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">{video.category}</span>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* View More Trigger */}
                            <button
                                onClick={scrollToGrid}
                                className="w-full py-6 bg-[#07518a] rounded-[2rem] text-white text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-[#07518a]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-4 group"
                            >
                                View All Strategic Feeds
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── GLOBAL MATRIX DISCOVERY GRID ──────────────────────────── */}
                <div ref={gridRef} className="max-w-[1920px] mx-auto w-full p-4 md:p-8 lg:p-10 pb-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pt-12 border-t border-slate-100">
                        <div className="space-y-4 flex-1">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-1 bg-[#07518a] rounded-full" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#07518a]">Enterprise Matrix</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Global Archive</h2>

                            {/* Integrated Search for Grid */}
                            <div className="relative group max-w-xl">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#07518a] transition-all" />
                                <input
                                    type="text"
                                    placeholder="Search global feeds..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium focus:outline-none focus:ring-4 focus:ring-[#07518a]/5 focus:border-[#07518a]/20 transition-all placeholder:text-slate-400 shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {filteredVideos.map((video, idx) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                index={idx}
                                isActive={activeVideo?.id === video.id}
                                onTopPlay={() => {
                                    setActiveVideo(video);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── WORLD CLASS GLOBAL STYLES ───────────────────────────────── */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100..1000&display=swap');
                
                body {
                    font-family: 'DM Sans', sans-serif !important;
                    background: white;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                .font-dm-sans {
                    font-family: 'DM Sans', sans-serif !important;
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #f1f5f9;
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #07518a;
                }

                ::selection {
                    background: #07518a;
                    color: white;
                }

                iframe {
                    border: none;
                    background: black;
                }

                /* Smooth Layout Shifts */
                * {
                    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </main>
    )
}
// Updated: Tue May 12 10:01:52 CEST 2026
