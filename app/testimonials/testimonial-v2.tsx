'use client'

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Sun, Moon, Loader2 } from 'lucide-react';

// ============================================================================
// TYPES & ARCHITECTURE
// ============================================================================

interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
}

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
// SUB-COMPONENTS
// ============================================================================

const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    if (props.testimonials.length === 0) return null;

    return (
        <div className={props.className}>
            <motion.ul
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <motion.li
                                    key={`${index}-${i}`}
                                    aria-hidden={index === 1 ? "true" : "false"}
                                    tabIndex={index === 1 ? -1 : 0}
                                    whileHover={{
                                        scale: 1.03,
                                        y: -8,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                                        transition: { type: "spring", stiffness: 400, damping: 17 }
                                    }}
                                    className="p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-lg shadow-black/5 max-w-xs w-full bg-white dark:bg-neutral-900 transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-[#07518a]/30"
                                >
                                    <blockquote className="m-0 p-0">
                                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal m-0 transition-colors duration-300 text-sm">
                                            {text}
                                        </p>
                                        <footer className="flex items-center gap-3 mt-6">
                                            <img
                                                width={40}
                                                height={40}
                                                src={image}
                                                alt={`Avatar of ${name}`}
                                                className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-100 dark:ring-neutral-800 group-hover:ring-[#07518a]/30 transition-all duration-300 ease-in-out"
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
                                                    e.currentTarget.onerror = null;
                                                }}
                                            />
                                            <div className="flex flex-col">
                                                <cite className="font-semibold not-italic tracking-tight leading-5 text-neutral-900 dark:text-white transition-colors duration-300 text-xs">
                                                    {name}
                                                </cite>
                                                <span className="text-[10px] leading-5 tracking-tight text-neutral-500 dark:text-neutral-500 mt-0.5 transition-colors duration-300 uppercase font-bold">
                                                    {role}
                                                </span>
                                            </div>
                                        </footer>
                                    </blockquote>
                                </motion.li>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.ul>
        </div>
    );
};

// ============================================================================
// MAIN SECTIONS
// ============================================================================

const TestimonialsSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
    // Split into columns
    const firstColumn = testimonials.filter((_, i) => i % 3 === 0);
    const secondColumn = testimonials.filter((_, i) => i % 3 === 1);
    const thirdColumn = testimonials.filter((_, i) => i % 3 === 2);

    return (
        <section
            aria-labelledby="testimonials-heading"
            className="bg-transparent py-24 relative overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.8 }
                }}
                className="container px-4 z-10 mx-auto"
            >
                <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
                    <div className="flex justify-center">
                        <div className="border border-neutral-300 dark:border-neutral-700 py-1 px-4 rounded-full text-[10px] font-black tracking-widest uppercase text-neutral-600 dark:text-neutral-400 bg-neutral-100/50 dark:bg-neutral-800/50 transition-colors">
                            Global Feedback
                        </div>
                    </div>

                    <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-black tracking-tighter mt-6 text-center text-neutral-900 dark:text-white transition-colors">
                        Voices of Trust
                    </h2>
                    <p className="text-center mt-5 text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-sm transition-colors font-medium">
                        Discover how enterprise leaders and strategic partners scale their vision with Brihaspathi Technologies.
                    </p>
                </div>

                <div
                    className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
                    role="region"
                    aria-label="Scrolling Testimonials"
                >
                    <TestimonialsColumn testimonials={firstColumn} duration={25} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
                </div>
            </motion.div>
        </section>
    );
};

// ============================================================================
// ROOT COMPONENT
// ============================================================================

export default function TestimonialV2() {
    const [isDark, setIsDark] = useState(false);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('API Sync Failed');
                const result = await response.json();

                const formatted = result.data.map((item: ApiTestimonial) => {
                    const profile = item.Profile;
                    const mediaUrl = getStrapiMedia(profile?.url);

                    return {
                        text: item.Message.replace(/^"|"$/g, '').trim(),
                        image: mediaUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(item.fullname)}`,
                        name: item.fullname,
                        role: `${item.Designation}${item.Company ? ` at ${item.Company}` : ''}`
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
        <div className="w-screen min-h-screen bg-[#FDFDFD] dark:bg-neutral-950 transition-colors duration-300 flex flex-col justify-center relative selection:bg-[#07518a] selection:text-white overflow-hidden">

            {/* Ambient Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]">
                <div className="absolute inset-0 bg-[radial-gradient(#07518a_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            {/* Dark Mode Toggle */}
            <button
                onClick={() => setIsDark(!isDark)}
                className="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 shadow-xl hover:scale-110 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#07518a]/50"
                aria-label="Toggle Dark Mode"
            >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isLoading ? (
                <div className="flex flex-col items-center gap-6 z-10">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-[1.5px] border-slate-100 dark:border-neutral-800" />
                        <div className="absolute inset-0 rounded-full border-[1.5px] border-transparent border-t-[#07518a] animate-spin" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#07518a] dark:text-neutral-400">Synchronizing Insights</span>
                </div>
            ) : (
                <TestimonialsSection testimonials={testimonials} />
            )}

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
        </div>
    );
}
