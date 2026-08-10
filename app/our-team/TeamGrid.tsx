"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Linkedin, Loader2, User } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";

import CodropsSlideshow from "./CodropsSlideshow";

// Constants
const BASE_URL = "/strapi";
const API_URL = `${BASE_URL}/api/members`;
const socket = io(BASE_URL);

const ease = [0.16, 1, 0.3, 1] as const;

/* ================= TYPES ================= */

export interface OrgPerson {
  id: number | string;
  documentId?: string;
  name: string;
  designation: string;
  photo: string;
  bio: string;
  linkedin?: string;
  order: number;
}

const personPhoto = (url?: string) => {
  if (!url || url.trim() === "") {
    return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop"; 
  }
  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
};

/* ================= COMPONENT ================= */

export default function TeamGrid() {
  const [people, setPeople] = useState<OrgPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const activePerson = activeIndex !== null ? people[activeIndex] : null;

  // Fetch data and listen for real-time updates
  useEffect(() => {
    fetchMembers();

    socket.on("memberUpdate", () => {
      console.log("Real-time update received!");
      fetchMembers();
    });

    return () => {
      socket.off("memberUpdate");
    };
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${API_URL}?populate=image&sort=order&pagination[pageSize]=100`);
      const members = response.data.data.map((m: any) => {
        const attr = m.attributes || m;
        const integerId = typeof m.id === "number" ? m.id : m.id_integer || m.internal_id;
        const docId = m.documentId || (typeof m.id === "string" ? m.id : null);
        
        return {
          id: integerId || docId,
          documentId: docId,
          name: attr.tittle || attr.name || "Unknown",
          designation: attr.designation || "",
          bio: attr.About || attr.bio || "",
          linkedin: attr.linkdin || attr.linkedin || "",
          photo: attr.image?.data?.attributes?.url || attr.image?.url || "",
          order: parseInt(attr.order) || 0,
        };
      });
      setPeople(members);
    } catch (err) {
      console.error("Public fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= Keyboard Support ================= */

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  // Reset modal scroll when person changes
  useEffect(() => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  }, [activeIndex]);

  const next = () =>
    setActiveIndex((i) =>
      i === null ? 0 : (i + 1) % people.length
    );

  const prev = () =>
    setActiveIndex((i) =>
      i === null ? 0 : (i - 1 + people.length) % people.length
    );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="font-medium animate-pulse text-sm uppercase tracking-widest text-[#07518a]">Loading Experts...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full overflow-hidden">
        {/* Codrops Interactive Slideshow */}
        <CodropsSlideshow people={people} personPhoto={personPhoto} />
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10 overflow-x-hidden">
        {/* Team Directory Header */}
        <div id="team-directory" className="mb-12 md:mb-16 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#07518a]/10 text-[#07518a] text-[10px] font-bold uppercase tracking-wider mb-4">
                Corporate Team
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                The Minds Behind <br /> <span className="text-[#07518a]">Innovation</span>
              </h2>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                A diverse group of professionals united by purpose, expertise, and a shared
                commitment to excellence in delivering world-class solutions.
              </p>
            </div>
            
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">{people.length}+</div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Global Experts</div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="text-right">
                <div className="text-3xl font-bold text-[#07518a]">15+</div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Specializations</div>
              </div>
            </div>
          </motion.div>
      </div>

      {/* Grid */}
      <motion.div
        className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
          hidden: {},
        }}
      >
        {people.map((person, index) => (
          <motion.button
            key={person.id}
            layout
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease }}
            onClick={() => setActiveIndex(index)}
            className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-[#07518a]/20 transition-all duration-500 overflow-hidden text-left"
          >
            {/* Image Wrapper */}
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
              <img
                src={personPhoto(person.photo)}
                alt={person.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                  View Full Profile <ArrowUpRight size={14} />
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#07518a] transition-colors leading-tight mb-2">
                {person.name}
              </h3>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">
                {person.designation}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#07518a]/10 flex items-center justify-center border-2 border-white">
                    <User size={12} className="text-[#07518a]" />
                  </div>
                </div>
                {person.linkedin && (
                  <div className="text-slate-300 group-hover:text-[#0077b5] transition-colors">
                    <Linkedin size={18} />
                  </div>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {activePerson && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] md:max-h-[85vh] rounded-[2.5rem] bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute right-6 top-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white backdrop-blur-md text-slate-900 shadow-xl flex items-center justify-center transition-all md:text-slate-400 md:hover:text-slate-900 border border-slate-100"
              >
                <X size={20} />
              </button>

              {/* Modal Left: Image Area */}
              <div className="w-full md:w-[45%] bg-slate-50 relative group h-64 md:h-auto overflow-hidden">
                <img
                  src={personPhoto(activePerson.photo)}
                  alt={activePerson.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-8 left-8 hidden md:block">
                  <div className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest">
                    Expert Profile
                  </div>
                </div>
              </div>

              {/* Modal Right: Content Area */}
              <div 
                ref={modalScrollRef}
                className="flex-1 flex flex-col overflow-y-auto p-8 md:p-12 lg:p-16 custom-scrollbar"
              >
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-xs font-bold text-[#07518a] uppercase tracking-[0.2em] mb-3 block">
                      Team Member
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                      {activePerson.name}
                    </h3>
                    <p className="mt-3 text-lg md:text-xl font-semibold text-slate-500 uppercase tracking-wider">
                      {activePerson.designation}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-10 pt-10 border-t border-slate-100"
                  >
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-8 h-px bg-slate-200" /> Professional Bio
                    </h4>
                    <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                      {activePerson.bio}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 flex flex-wrap items-center justify-between gap-8"
                  >
                    {activePerson.linkedin ? (
                      <a 
                        href={activePerson.linkedin} 
                        target="_blank" 
                        className="flex items-center gap-3 px-6 py-3 bg-[#0077b5] text-white rounded-2xl font-bold hover:scale-105 transition-transform"
                      >
                        <Linkedin size={20} />
                        <span>Connect on LinkedIn</span>
                      </a>
                    ) : <div />}
                    
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={prev} 
                        className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-600 flex items-center justify-center transition-all shadow-sm"
                        title="Previous Profile"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={next} 
                        className="w-12 h-12 rounded-2xl bg-slate-900 text-white hover:bg-[#07518a] flex items-center justify-center transition-all shadow-xl"
                        title="Next Profile"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
      </section>
    </div>
  );
}

function ArrowUpRight({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}