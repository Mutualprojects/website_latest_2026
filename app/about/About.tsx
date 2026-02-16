"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  Network,
  Cctv,
  RadioTower,
  Lightbulb,
  Home,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ================= CONFIG ================= */
const banner_image = "/355737.jpg";
const BRAND = "#07518a";

/* ================= COMPONENT ================= */
export default function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const techItems = useMemo(
    () => [
      { icon: Brain, label: "AI Intelligence" },
      { icon: Network, label: "IoT Networks" },
      { icon: Cctv, label: "E-Security" },
      { icon: RadioTower, label: "Smart Infrastructure" },
      { icon: Lightbulb, label: "Innovation" },
      { icon: Home, label: "Smart Living" },
    ],
    []
  );

  /* ================= GSAP ================= */
  useEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (c) => {
          const { isDesktop, isMobile, reduceMotion } = c.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduceMotion: boolean;
          };

          if (reduceMotion) return;

          /* ================= HERO PARALLAX (DESKTOP ONLY) ================= */
          if (isDesktop) {
            gsap.fromTo(
              leftRef.current,
              { x: -120 },
              {
                x: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );

            gsap.fromTo(
              ".tech-card",
              { y: 80, opacity: 0.85 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.12,
                ease: "none",
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }

          /* ================= STATS REVEAL ================= */
          gsap.from(".stat-item", {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: isDesktop
              ? {
                  trigger: statsRef.current,
                  start: "top 85%",
                }
              : undefined,
          });

          /* ================= COUNT FIX ================= */
          const formatStat = (val: number, format: string, suffix: string): string => {
            let text: string;
            if (format === "compact") {
              if (val >= 1_000_000) text = `${(val / 1_000_000).toFixed(0)}M`;
              else if (val >= 1_000) text = `${(val / 1_000).toFixed(0)}K`;
              else text = val.toLocaleString();
            } else {
              text = val.toLocaleString();
            }
            return text + (suffix || "");
          };

          document.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
            const value = Number(el.dataset.value);
            const format = el.dataset.format || "";
            const suffix = el.dataset.suffix || "";

            const onUpdate = () => {
              el.innerText = formatStat(Number(el.innerText), format, suffix);
            };

            // MOBILE → run immediately
            if (isMobile) {
              gsap.fromTo(
                el,
                { innerText: 0 },
                {
                  innerText: value,
                  duration: 1.6,
                  snap: { innerText: 1 },
                  ease: "power2.out",
                  onUpdate,
                }
              );
            }

            // DESKTOP → scroll-triggered
            if (isDesktop) {
              gsap.fromTo(
                el,
                { innerText: 0 },
                {
                  innerText: value,
                  duration: 2,
                  snap: { innerText: 1 },
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 80%",
                    once: true,
                  },
                  onUpdate,
                }
              );
            }
          });
        }
      );
    }, heroRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  /* ================= RENDER ================= */
  return (
    <div ref={heroRef} className="relative bg-white">
      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[88vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${banner_image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07518a]/90 via-[#07518a]/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT */}
            <motion.div
              ref={leftRef}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <div className="text-xs tracking-[0.3em] uppercase mb-4 text-blue-100">
                Since 2006
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                The Guru of <br />
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Tomorrow’s Tech
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-blue-100 text-base sm:text-lg leading-relaxed">
                Brihaspathi Technologies Limited delivers AI-driven software,
                advanced E-Security systems, and sustainable IoT solutions.
              </p>

           <p className="t-6 max-w-xl text-blue-100 text-base sm:text-lg leading-relaxed">Established in 2006, Brihaspathi Technologies Limited is a premier global technology conglomerate specializing in E-Security, AI-driven Software, IoT, and Renewable Energy. With a legacy of 20+ years, we have evolved from a web development startup into a multi-domain powerhouse that serves over 15,000 clients globally. Our operations are backed by a workforce of 300+ technology experts and a footprint spanning India, the USA, and Dubai.</p>
            </motion.div>

            {/* RIGHT (hidden mobile) */}
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                {techItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="tech-card p-4 rounded-xl bg-gradient-to-br from-white to-[#f4f9ff] border shadow-md"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                        style={{
                          background: `linear-gradient(135deg, ${BRAND}, #0a6fbf)`,
                        }}
                      >
                        <Icon size={18} className="text-white" />
                      </div>
                      <div className="text-sm font-semibold text-slate-800">
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section
        ref={statsRef}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:-mt-10 lg:-mt-16"
      >
        <div className="bg-white rounded-2xl shadow-2xl grid grid-cols-2 md:grid-cols-4 overflow-hidden">
          {[
            { value: 2000000, label: "Cameras Installed", format: "compact", suffix: "+" },
            { value: 15000, label: "Global Clients", format: "compact", suffix: "+" },
            { value: 300, label: "Experts", suffix: "+" },
            { value: 20, label: "Years of Innovation", suffix: "+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="stat-item p-6 md:p-8 text-center border-b md:border-b-0 md:border-r last:border-r-0"
            >
              <div
                className="stat-number text-3xl md:text-4xl font-extrabold"
                data-value={stat.value}
                data-format={stat.format || ""}
                data-suffix={stat.suffix || ""}
                style={{ color: BRAND }}
              >
                0
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-24" />
    </div>
  );
}
