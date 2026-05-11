'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import heroImage from './feedback-concept-customer-review-rating-people-leaving-five-star-rating-giant-smartphone.png';

export function TestHero() {
    return (
        <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden py-20 px-6 md:px-12 lg:px-24">
            {/* Ambient Background - No Boxes, just subtle gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(7,81,138,0.05),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(7,81,138,0.03),transparent_50%)]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left Side: Strategic Content */}
                <div className="space-y-10">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#07518a]/10 bg-white/50 backdrop-blur-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#07518a] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#07518a]">Global Trust Network</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight"
                        >
                            Empowering Vision <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#07518a] to-[#00A8E8]">Through Success</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed font-medium"
                        >
                            Discover how Brihaspathi Technologies transforms enterprise complexity into strategic clarity through the voices of our global partners and industry leaders.
                        </motion.p>
                    </div>

                    {/* Trust Markers */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-100"
                    >
                        <div className="space-y-1">
                            <h4 className="text-2xl font-black text-slate-900">10k+</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Clients</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-2xl font-black text-slate-900">98%</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Retention Rate</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-2xl font-black text-slate-900">15+</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Years Expertise</p>
                        </div>
                    </motion.div> */}
                </div>

                {/* Right Side: Immersive Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-center justify-center"
                >
                    <div className="relative w-full max-w-[500px] lg:max-w-none aspect-square">
                        {/* No background boxes as requested, just the transparent image */}
                        <Image
                            src={heroImage}
                            alt="Customer Feedback Concept"
                            fill
                            className="object-contain drop-shadow-[0_20px_50px_rgba(7,81,138,0.15)]"
                            priority
                        />

                        {/* Floating Micro-Animations */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-10 w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-slate-100"
                        >
                            <div className="w-2 h-2 rounded-full bg-[#07518a] animate-ping" />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-20 left-0 w-16 h-16 rounded-3xl bg-white shadow-2xl flex items-center justify-center border border-slate-100"
                        >
                            <svg className="w-8 h-8 text-[#07518a]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
