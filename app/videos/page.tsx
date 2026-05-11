'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Play, Share2, ExternalLink, Shield, Zap, Heart, Database, 
    Settings, Youtube, Users, TrendingUp, Bell, Search, Filter, 
    LayoutGrid, List, ChevronRight, Clock, ArrowRight, Video,
    Activity, Globe, Lock, Cpu
} from 'lucide-react'
import Image from 'next/image'

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

const VideoCard = ({ video, index, isActive, onClick }: { video: VideoItem, index: number, isActive: boolean, onClick: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <button
                onClick={onClick}
                className={`group relative w-full text-left bg-white rounded-[2.5rem] p-4 transition-all duration-700 border-2 ${isActive
                    ? 'border-[#07518a] shadow-[0_40px_80px_-20px_rgba(7,81,138,0.12)]'
                    : 'border-slate-50 hover:border-[#07518a]/10 hover:shadow-2xl hover:-translate-y-2'
                    }`}
            >
                {/* Thumbnail Layer */}
                <div className="relative aspect-video rounded-[1.8rem] overflow-hidden mb-6 bg-slate-50 ring-1 ring-slate-100">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Play Accent */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                        <div className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-md text-[#07518a] flex items-center justify-center shadow-2xl">
                            <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                    </div>

                    {/* Metadata Badges */}
                    <div className="absolute top-4 left-4">
                        <div className="px-3 py-1 bg-[#07518a]/90 backdrop-blur-md rounded-lg text-[9px] font-black text-white uppercase tracking-[0.2em] shadow-lg">
                            {video.category}
                        </div>
                    </div>
                </div>

                {/* Info Layer */}
                <div className="px-4 pb-4">
                    <div className="flex items-center gap-3 mb-3 text-orange-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Intelligence</span>
                    </div>
                    
                    <h4 className={`text-lg font-bold leading-tight line-clamp-2 min-h-[3rem] transition-colors duration-500 ${
                        isActive ? 'text-[#07518a]' : 'text-slate-900 group-hover:text-[#07518a]'
                    }`}>
                        {video.title}
                    </h4>
                    
                    <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                        <div className="flex items-center gap-3 text-[#07518a]">
                            <div className="w-8 h-8 rounded-xl bg-[#07518a]/5 flex items-center justify-center group-hover:bg-[#07518a] group-hover:text-white transition-all duration-500 shadow-sm">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                Engage Feed
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            {[1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-100" />)}
                        </div>
                    </div>
                </div>
            </button>
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

            <div className="relative z-10 flex flex-col min-h-screen">
                {/* ── ELITE NAVIGATION ─────────────────────────────────────── */}
                <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-2xl border-b border-slate-100 px-6 md:px-12 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#07518a] flex items-center justify-center shadow-2xl shadow-[#07518a]/30">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-[#07518a]">BTL VISION</span>
                                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest leading-none">Command Center</span>
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex-1 max-w-xl mx-12 hidden lg:block">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#07518a] transition-all" />
                            <input 
                                type="text" 
                                placeholder="Search tactical intelligence archive..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-8 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#07518a]/5 focus:border-[#07518a]/20 transition-all placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="hidden sm:flex items-center gap-4 border-r border-slate-100 pr-8">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-[#07518a] uppercase tracking-widest">Global Status</span>
                                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Operational</span>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 transition-all relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#07518a] to-blue-400 border-2 border-white shadow-xl" />
                    </div>
                </nav>

                {/* ── THEATER CORE LAYOUT ────────────────────────────────────── */}
                <div className="flex-1 max-w-[1920px] mx-auto w-full p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
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

                                    {/* Data Intelligence Hub */}
                                    <div className="bg-white rounded-[4rem] p-10 md:p-16 border border-slate-100 shadow-2xl shadow-[#07518a]/5 relative overflow-hidden group">
                                        <div className="absolute top-0 left-0 w-2 h-full bg-[#07518a]" />
                                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#07518a]/5 rounded-full blur-[80px] group-hover:bg-[#07518a]/10 transition-colors duration-1000" />
                                        
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 relative z-10">
                                            <div className="space-y-8 flex-1">
                                                <div className="flex flex-wrap gap-4">
                                                    <span className="px-5 py-2 bg-[#07518a]/5 text-[#07518a] text-[11px] font-black uppercase tracking-[0.3em] rounded-full border border-[#07518a]/10">
                                                        {activeVideo.category}
                                                    </span>
                                                    <span className="px-5 py-2 bg-orange-50 text-orange-600 text-[11px] font-black uppercase tracking-[0.3em] rounded-full border border-orange-100">
                                                        Tactical Briefing
                                                    </span>
                                                </div>
                                                <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter">
                                                    {activeVideo.title}
                                                </h1>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 shrink-0">
                                                <button className="flex items-center gap-4 px-10 py-6 bg-slate-900 text-white rounded-[2rem] text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#07518a] transition-all duration-500 shadow-2xl shadow-black/10">
                                                    <ExternalLink className="w-5 h-5" /> Export Data
                                                </button>
                                                <button className="w-20 h-20 rounded-[2rem] border border-slate-100 flex items-center justify-center bg-white shadow-lg hover:shadow-2xl hover:border-[#07518a]/20 transition-all group/share">
                                                    <Share2 className="w-6 h-6 text-slate-300 group-hover:text-orange-500 transition-colors" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-16 pt-12 border-t border-slate-50 grid grid-cols-1 sm:grid-cols-3 gap-12">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <Users className="w-5 h-5 text-[#07518a]" />
                                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Community Reach</span>
                                                </div>
                                                <p className="text-3xl font-black text-slate-900 tracking-tight">12.8K+</p>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <TrendingUp className="w-5 h-5 text-orange-500" />
                                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Growth Index</span>
                                                </div>
                                                <p className="text-3xl font-black text-slate-900 tracking-tight">+42.8%</p>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <Globe className="w-5 h-5 text-[#07518a]" />
                                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Global Impact</span>
                                                </div>
                                                <p className="text-3xl font-black text-slate-900 tracking-tight">Enterprise</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* High-Fidelity Discovery Grid */}
                        <div className="pt-24 pb-32">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-1 bg-[#07518a] rounded-full" />
                                        <span className="text-[12px] font-black uppercase tracking-[0.6em] text-[#07518a]">Extended Repository</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">Global Matrix</h2>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                        <button className="p-3 bg-white shadow-xl text-[#07518a] rounded-xl border border-slate-200 transition-all"><LayoutGrid className="w-5 h-5" /></button>
                                        <button className="p-3 text-slate-400 hover:text-slate-900 transition-all"><List className="w-5 h-5" /></button>
                                    </div>
                                    <button className="px-8 py-4 bg-[#07518a] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-[#07518a]/20">
                                        View All
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                                {filteredVideos.slice(0, 6).map((video, idx) => (
                                    <VideoCard 
                                        key={video.id} 
                                        video={video} 
                                        index={idx} 
                                        isActive={activeVideo?.id === video.id}
                                        onClick={() => {
                                            setActiveVideo(video);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: ELITE SIDEBAR QUEUE ────────────────────────────── */}
                    <div className="lg:col-span-4 xl:col-span-3 space-y-12">
                        <div className="sticky top-28 space-y-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[13px] font-black uppercase tracking-[0.4em] text-[#07518a]">Tactical Queue</h3>
                                <div className="flex gap-4">
                                    <Filter className="w-4 h-4 text-slate-300 hover:text-orange-500 cursor-pointer transition-colors" />
                                    <TrendingUp className="w-4 h-4 text-slate-300 hover:text-[#07518a] cursor-pointer transition-colors" />
                                </div>
                            </div>

                            {/* Category Navigator */}
                            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className={`px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                                            filter === cat 
                                            ? 'bg-[#07518a] text-white shadow-2xl shadow-[#07518a]/30 scale-105' 
                                            : 'bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Strategic Queue List */}
                            <div className="space-y-5 max-h-[calc(100vh-250px)] overflow-y-auto pr-3 custom-scrollbar">
                                {filteredVideos.map((video, idx) => (
                                    <motion.button
                                        key={video.id}
                                        onClick={() => {
                                            setActiveVideo(video);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                        className={`flex gap-5 w-full text-left group p-4 rounded-[2rem] transition-all border-2 ${
                                            activeVideo?.id === video.id 
                                            ? 'bg-white border-[#07518a] shadow-2xl shadow-[#07518a]/5' 
                                            : 'bg-white border-transparent hover:border-slate-100 hover:shadow-xl'
                                        }`}
                                    >
                                        <div className="relative w-36 h-24 flex-shrink-0 rounded-[1.5rem] overflow-hidden bg-slate-100 ring-1 ring-slate-100">
                                            <img 
                                                src={video.thumbnail} 
                                                alt="" 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[0.8s] ease-out"
                                            />
                                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-[8px] font-bold text-white rounded-md tracking-tighter">
                                                10:04
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-2 min-w-0 py-1">
                                            <h4 className={`text-[14px] font-bold leading-tight line-clamp-2 transition-colors duration-500 ${
                                                activeVideo?.id === video.id ? 'text-[#07518a]' : 'text-slate-900 group-hover:text-orange-600'
                                            }`}>
                                                {video.title}
                                            </h4>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{video.category}</span>
                                                <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Feed 0{idx+1}</span>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── GLOBAL ELITE FOOTER ────────────────────────────────────── */}
                <footer className="mt-48 border-t border-slate-100 bg-white py-32 px-8 overflow-hidden relative">
                    <div className="absolute -bottom-64 -left-64 w-[50vw] h-[50vw] bg-[#07518a]/5 rounded-full blur-[120px] pointer-events-none" />
                    <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="flex items-center gap-10 text-center lg:text-left">
                            <motion.div 
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 1 }}
                                className="w-24 h-24 rounded-[2.5rem] bg-white border border-slate-100 flex items-center justify-center shadow-2xl"
                            >
                                <Youtube className="w-12 h-12 text-[#07518a]" />
                            </motion.div>
                            <div className="space-y-4">
                                <h4 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Global Command Network</h4>
                                <p className="text-lg font-medium text-slate-500 max-w-lg">
                                    Official Digital Strategic Hub. <span className="text-orange-500 font-black">120+ Active Units Synced.</span>
                                </p>
                            </div>
                        </div>
                        <a 
                            href={YT_CHANNEL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group px-14 py-8 bg-[#07518a] text-white rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.3em] hover:bg-slate-900 transition-all duration-500 shadow-[0_40px_80px_-20px_rgba(7,81,138,0.3)] hover:shadow-black/20 flex items-center gap-6"
                        >
                            Access Primary Archive
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </a>
                    </div>
                </footer>
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
