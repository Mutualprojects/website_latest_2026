"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* =========================
   Brand + Types + Data
========================= */
const BRAND = "#07518a";

type Award = {
  title: string;
  image: string; // public path starting with /Awards/...
};

export const AWARDS: Award[] = [
  {
    title: "Business Awards Hyderabad 2025",
    image: "/Awards/mdsu6200.jpg",
  },
  {
    title: "Business Titan Awards – Radio City (Dubai)",
    image: "/Awards/business-titan-awards-radio-city-dubai-1.jpg",
  },
  { title: "Economic Times Award", image: "/Awards/economic-times-award.jpg" },
  {
    title: "Partner Leadership Award 2019",
    image: "/Awards/partner-leadership-award-2019.jpg",
  },
  { title: "Radio City Award", image: "/Awards/radio-city-award.jpg" },
  {
    title: "Radio City ICON Awards",
    image: "/Awards/radio-city-icon-awards.jpg",
  },
  {
    title: "SKOCH Award – Wireless Radio Technology CCTV Surveillance Project",
    image:
      "/Awards/received-skotch-award-wireless-radio-technology-cctv-surveillance.jpg",
  },
  {
    title: "Backward classes chambers of commerse and Industry ",
    image: "/Awards/whatsapp-image-2025-07-07-5-42-11-am-1.jpeg.jpg",
  },
  {
    title: "Award",
    image: "/Awards/whatsapp-image-2025-07-30-6-39-38-pm.jpeg",
  },
];

/* =========================
   Utilities (tilt + reveal)
========================= */
function useTilt(maxTilt = 6) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState<string>("");

  const onMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) * 2 - 1; // -1 to 1
      const py = (y / rect.height) * 2 - 1;
      const rx = (-py * maxTilt).toFixed(2);
      const ry = (px * maxTilt).toFixed(2);
      setTransform(`rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`);
    },
    [maxTilt]
  );

  const onLeave = React.useCallback(() => {
    setTransform("");
  }, []);

  return { ref, transform, onMove, onLeave };
}

function useReveal() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

/* =========================
   Card: image fill + slide-up overlay + tilt
========================= */
function AwardCard({ award }: { award: Award }) {
  const { ref, transform, onMove, onLeave } = useTilt(7);
  const reveal = useReveal();

  // CSS var for brand (typed safely)
  const brandStyle = { ["--brand" as any]: BRAND } as React.CSSProperties;

  return (
    <article
      ref={reveal.ref}
      aria-label={award.title}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 focus-within:outline-none ${
        reveal.shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={brandStyle}
    >
      {/* Tilt wrapper */}
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative will-change-transform transition-transform duration-300"
        style={{ transform }}
      >
        {/* Base image */}
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={award.image}
            alt={award.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={false}
          />
        </div>

        {/* Slide-up overlay (full cover) */}
        <div
          className="
            absolute inset-0 translate-y-full
            bg-[var(--brand)] text-white
            transition-transform duration-500 ease-out
            group-hover:translate-y-0 group-focus-within:translate-y-0
            flex items-end
          "
          aria-hidden
        >
          <div className="w-full p-4 sm:p-5">
            <h3 className="text-base font-semibold leading-snug sm:text-lg">
              {award.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Keyboard-focus overlay trigger */}
      <button className="absolute inset-0" aria-label={`View ${award.title}`} />
    </article>
  );
}

/* =========================
   Awards Grid Section (2 columns)
========================= */
export default function AwardsSection({
  items = AWARDS,
  heading = "Awards & Recognitions",
}: {
  items?: Award[];
  heading?: string;
}) {
  return (
    <section className="relative py-8 sm:py-10">
      {/* subtle brand wash (no borders) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(900px 460px at 10% -10%, ${BRAND}14, transparent 60%),
                       radial-gradient(900px 460px at 90% -10%, ${BRAND}10, transparent 60%),
                       linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)`,
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.header
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h2
            className="font-extrabold tracking-tight"
            style={{ color: BRAND, fontSize: "clamp(18px, 2.6vw, 32px)" }}
          >
            {heading}
          </h2>
        </motion.header>

        {/* Strict 2-column layout (1 on xs, 2 on sm and up) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {items.map((a, i) => (
            <AwardCard key={`${a.title}-${i}`} award={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
