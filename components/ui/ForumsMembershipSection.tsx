"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* =========================================
   Brand + Data
========================================= */
const BRAND = "#07518a";

type Forum = {
  name: string;
  role?: string;
  image: string; // /public/... path
};

const FORUMS: Forum[] = [
  { name: "Hyderabad Angels", role: "Member", image: "/forums/hyderabad-angels.png" },
  { name: "TiE Hyderabad", role: "Charter Member", image: "/forums/tie-hyderabad.png" },
  {
    name: "Hyderabad Management Association (HMA)",
    role: "Member",
    image: "/forums/hma.png",
  },
];

/* =========================================
   Helpers
========================================= */
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/** Pick row size based on viewport so rows wrap smartly. */
function useRowSize() {
  const [size, setSize] = React.useState(4);
  React.useEffect(() => {
    const mmSm = window.matchMedia("(max-width: 640px)");
    const mmMd = window.matchMedia("(min-width: 641px) and (max-width: 1024px)");
    const apply = () => {
      if (mmSm.matches) setSize(1);
      else if (mmMd.matches) setSize(2);
      else setSize(3);
    };
    apply();
    mmSm.addEventListener("change", apply);
    mmMd.addEventListener("change", apply);
    return () => {
      mmSm.removeEventListener("change", apply);
      mmMd.removeEventListener("change", apply);
    };
  }, []);
  return size;
}

/* =========================================
   Premium Forum Card
========================================= */
function ForumCard({
  forum,
  priority = false,
}: {
  forum: Forum;
  priority?: boolean;
}) {
  return (
    <article
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-white/90 p-5
                 shadow-[0_8px_30px_rgba(7,81,138,0.08)] ring-1 ring-[#07518a]/10 backdrop-blur-md
                 transition-all duration-300 hover:-translate-y-1
                 hover:shadow-[0_22px_50px_rgba(7,81,138,0.20)] hover:ring-[#07518a]/25"
      aria-label={`${forum.name} membership`}
    >
      {/* accent bar that grows on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-[#07518a]
                   transition-transform duration-300 group-hover:scale-y-100"
      />

      {/* logo plate */}
      <div className="relative shrink-0 overflow-hidden rounded-xl bg-[#07518a]/[0.04] p-2 ring-1 ring-[#07518a]/10">
        <Image
          src={forum.image}
          alt={forum.name}
          width={72}
          height={72}
          className="h-[72px] w-[72px] object-contain transition-transform duration-300 group-hover:scale-[1.06]"
          priority={priority}
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-bold leading-snug text-gray-900 line-clamp-2">
          {forum.name}
        </h3>
        {forum.role && (
          <span
            className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px]
                       font-semibold uppercase tracking-wide"
            style={{ color: BRAND, background: `${BRAND}14` }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: BRAND }}
              aria-hidden
            />
            {forum.role}
          </span>
        )}
      </div>
    </article>
  );
}

/* =========================================
   Row that glides horizontally on scroll
========================================= */
function GlideRow({
  items,
  dir,
  scrollYProgress,
  rowIndex,
}: {
  items: Forum[];
  dir: 1 | -1;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  rowIndex: number;
}) {
  const reduce = useReducedMotion();
  const amplitude = 70 - Math.min(50, rowIndex * 10);
  const start = dir === 1 ? -amplitude : amplitude;
  const end = dir === 1 ? amplitude : -amplitude;

  const x = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [start, end]);

  return (
    <motion.div style={{ x }} className="w-full overflow-visible">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f, i) => (
          <ForumCard
            key={`${f.name}-${i}`}
            forum={f}
            priority={rowIndex === 0 && i < 3}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* =========================================
   Main Section
========================================= */
export default function ForumsMembershipSection() {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 15%"],
  });

  const reduce = useReducedMotion();
  const rowSize = useRowSize();
  const rows = React.useMemo(() => chunk(FORUMS, rowSize), [rowSize]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden py-14 sm:py-20"
      aria-label="Forums & memberships"
    >
      {/* Soft brand backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(1100px 520px at 12% -10%, ${BRAND}1f, transparent 60%),
                       radial-gradient(1100px 520px at 88% -10%, ${BRAND}16, transparent 60%)`,
        }}
      />
      {/* faint grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(${BRAND}0a 1px, transparent 1px), linear-gradient(90deg, ${BRAND}0a 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          className="mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: BRAND }}
          >
            <span
              className="h-px w-8"
              style={{ background: BRAND }}
              aria-hidden
            />
            Network &amp; Affiliations
          </span>
          <h2
            className="mt-3 font-black tracking-tight text-gray-900"
            style={{ fontSize: "clamp(24px, 3.4vw, 40px)", lineHeight: 1.1 }}
          >
     A Member of the Following Forums
          </h2>
         
        </motion.header>

        {/* Stat strip */}
     

        {/* Rows */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {rows.map((row, idx) => (
            <GlideRow
              key={`row-${idx}`}
              items={row}
              dir={idx % 2 === 0 ? 1 : -1}
              scrollYProgress={scrollYProgress}
              rowIndex={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}