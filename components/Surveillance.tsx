"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import certificateinage from "./logos cc.png";
import ReviewCards from "./ReviewCards";

/* ─── brand ─── */
const B = "#07518a";

/* ─── counter (triggers on scroll) ─── */
function Num({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const dur = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setVal(Math.floor(ease * to));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  const display =
    val >= 1_000_000
      ? `${(val / 1_000_000).toFixed(val >= to ? 0 : 1)}M`
      : val >= 1_000
      ? `${(val / 1_000).toFixed(val >= to ? 0 : 1)}K`
      : String(val);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ─── data ─── */
const STATS = [
  { n: 20, s: "+", label: "Industry Experience" },
  { n: 15000, s: "+", label: "Clients Served" },
  { n: 2000000, s: "+", label: "Devices Deployed" },
  { n: 300, s: "+", label: "Skilled Engineers" },
];

/* ─── animation ─── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] as const },
});

export default function AIVMSHero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-5 sm:px-8 py-12">
      <div className="flex flex-col items-center gap-10 w-full max-w-[900px]">

        {/* TEXT BLOCK */}
        <div className="w-full text-center">
          <motion.p
            {...fade(0)}
            className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] mb-4 text-gray-900"
          >
            AI Surveillance / Smart Energy / Enterprise Systems / System Integrators
          </motion.p>

          <motion.h1
            {...fade(0.08)}
            className="text-[2rem] sm:text-[2.6rem] md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight text-gray-950"
          >
            Technology That Protects,
            <br className="hidden sm:block" />
            Powers &amp; Transforms
            <span style={{ color: B }}>.</span>
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto"
          >
            We build and manage large-scale surveillance networks, renewable
            energy infrastructure, and enterprise platforms for governments,
            defence forces, banks, and Fortune-500 enterprises across India.
          </motion.p>

          <motion.div
            {...fade(0.24)}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <a
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all"
              style={{ background: B }}
            >
              Explore Solutions
              <ArrowRight size={15} />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-slate-800 border border-slate-300 hover:border-slate-400 bg-white/60 backdrop-blur-sm transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* STATS */}
        <motion.div {...fade(0.32)} className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
            {STATS.map((s) => (
              <div key={s.label} className="py-5 px-4 text-center">
                <p
                  className="text-2xl sm:text-3xl font-extrabold tabular-nums"
                  style={{ color: B }}
                >
                  <Num to={s.n} suffix={s.s} />
                </p>
                <p className="mt-1 text-[11px] sm:text-xs text-gray-600 font-medium uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CERTIFICATE IMAGE SECTION */}
   <motion.div
  {...fade(0.4)}
  className="w-full flex justify-center"
>
  <div className="relative w-full flex justify-center px-4 sm:px-6 lg:px-0">
    <div
      className="
        relative
        w-full
        max-w-md
        sm:max-w-lg
        md:max-w-xl
        lg:max-w-md
        xl:max-w-sm
        transition-all
        duration-500
      "
    >
      <Image
        src={certificateinage}
        alt="Company Certification"
        className="
          w-full
          h-auto
          object-contain
          transition-transform
          duration-500
          hover:scale-105
        "
        priority
      />
    </div>
  </div>
</motion.div>

<ReviewCards />
      </div>
    </section>
  );
}