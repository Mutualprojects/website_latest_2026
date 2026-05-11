'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Video } from 'lucide-react';

// ============================================================================
// TYPES & ARCHITECTURE
// ============================================================================

type Testimonial = {
    id: number;
    quote: string;
    name: string;
    designation: string;
    src: string;
    isVideo?: boolean;
};

interface StrapiImage {
    url: string;
    mime: string;
}

interface ApiTestimonial {
    id: number;
    fullname: string;
    Designation: string;
    Company: string;
    Message: string;
    Profile?: StrapiImage;
}

const STRAPI_BASE = '/strapi';
const API_URL = `${STRAPI_BASE}/api/testimonials?populate=*`;

// Helper to build Strapi media URLs
const getStrapiMedia = (url?: string | null) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${STRAPI_BASE}${url}`;
};

// ============================================================================
// ANIMATED TESTIMONIALS (STACK STYLE)
// ============================================================================

const AnimatedTestimonials = ({
    testimonials,
    autoplay = true,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);

    const handleNext = React.useCallback(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (!autoplay || testimonials.length <= 1) return;
        const interval = setInterval(handleNext, 7000);
        return () => clearInterval(interval);
    }, [autoplay, handleNext, testimonials.length]);

    const isActive = (index: number) => index === active;

    const randomRotate = () => `${Math.floor(Math.random() * 12) - 6}deg`;

    if (testimonials.length === 0) return null;

    return (
        <div className="mx-auto w-full max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
            <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-16 lg:gap-x-24 items-center">
                
                {/* Image Stack Section */}
                <div className="flex items-center justify-center order-1">
                    <div className="relative h-64 w-full max-w-[240px] md:h-80 md:max-w-xs">
                        <AnimatePresence>
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 50, rotate: randomRotate() }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.4,
                                        scale: isActive(index) ? 1 : 0.85,
                                        y: isActive(index) ? 0 : 20,
                                        zIndex: isActive(index) ? testimonials.length : testimonials.length - Math.abs(index - active),
                                        rotate: isActive(index) ? '0deg' : randomRotate(),
                                    }}
                                    exit={{ opacity: 0, scale: 0.9, y: -50 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute inset-0 origin-bottom"
                                >
                                    <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(7,81,138,0.15)] border-4 border-white bg-white">
                                        {testimonial.isVideo ? (
                                            <video 
                                                src={testimonial.src} 
                                                className="h-full w-full object-cover" 
                                                muted autoPlay loop playsInline 
                                            />
                                        ) : (
                                            <img
                                                src={testimonial.src}
                                                alt={testimonial.name}
                                                className="h-full w-full object-cover"
                                                draggable={false}
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(testimonial.name)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
                                                    e.currentTarget.onerror = null;
                                                }}
                                            />
                                        )}
                                        
                                        {testimonial.isVideo && (
                                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                                    <Video className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Text and Controls Section */}
                <div className="flex flex-col justify-center py-4 order-2 text-center md:text-left">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="flex flex-col"
                        >
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <h3 className="text-[11px] md:text-xs font-black text-slate-800 uppercase tracking-widest leading-none mb-1">
                                        {testimonials[active].name}
                                    </h3>
                                    <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none">
                                        {testimonials[active].designation}
                                    </p>
                                </div>
                                <motion.p className="text-sm md:text-base lg:text-lg font-medium text-slate-600 leading-relaxed tracking-tight italic">
                                    "{testimonials[active].quote}"
                                </motion.p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    
                    <div className="flex gap-4 pt-10 md:pt-12 justify-center md:justify-start">
                        <button
                            onClick={handlePrev}
                            aria-label="Previous testimonial"
                            className="group flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white shadow-soft border border-slate-100 transition-all hover:bg-slate-50 hover:border-[#07518a]/30 focus:outline-none focus:ring-2 focus:ring-[#07518a]/20"
                        >
                            <ArrowLeft className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-[#07518a]" />
                        </button>
                        <button
                            onClick={handleNext}
                            aria-label="Next testimonial"
                            className="group flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#07518a] shadow-xl shadow-[#07518a]/20 transition-all hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#07518a]/50"
                        >
                            <ArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export function Component() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('API Sync Failed');
                const result = await response.json();
                
                const formatted = result.data.map((item: ApiTestimonial) => {
                    const profile = item.Profile;
                    const isVideo = profile?.mime?.startsWith('video/');
                    const mediaUrl = getStrapiMedia(profile?.url);

                    return {
                        id: item.id,
                        quote: item.Message.replace(/^"|"$/g, '').trim(),
                        name: item.fullname,
                        designation: `${item.Designation}${item.Company ? ` | ${item.Company}` : ''}`,
                        src: mediaUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(item.fullname)}`,
                        isVideo: isVideo
                    };
                });
                
                setTestimonials(formatted);
            } catch (error) {
                console.error("Testimonial Sync Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#FDFDFD] font-sans antialiased selection:bg-[#07518a] selection:text-white">
            {/* Ambient Background Structure */}
            <div className="absolute inset-0 z-0">
                <style>
                    {`
                        @keyframes animate-grid {
                            0% { background-position: 0% 0%; }
                            100% { background-position: 40px 40px; }
                        }
                        .animated-grid {
                            position: absolute;
                            inset: 0;
                            background-image: 
                                linear-gradient(to right, #07518a 0.5px, transparent 0.5px), 
                                linear-gradient(to bottom, #07518a 0.5px, transparent 0.5px);
                            background-size: 40px 40px;
                            opacity: 0.04;
                            animation: animate-grid 60s linear infinite;
                        }
                    `}
                </style>
                <div className="animated-grid" />
                <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#07518a]/3 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
            </div>
            
            <div className="relative z-10 w-full">
                {isLoading ? (
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 rounded-full border-[1px] border-slate-50" />
                            <div className="absolute inset-0 rounded-full border-[1px] border-transparent border-t-[#07518a] animate-spin" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#07518a]">Syncing Global Feedback</span>
                    </div>
                ) : (
                    <AnimatedTestimonials testimonials={testimonials} />
                )}
            </div>
            
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                body { font-family: 'Inter', sans-serif; background-color: #FDFDFD; }
                * { transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
            `}</style>
        </div>
    );
}
