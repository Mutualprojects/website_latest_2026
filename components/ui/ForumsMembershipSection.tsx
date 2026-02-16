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
   Brand + Demo Data
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

/** Client hook to pick row size based on viewport (so rows wrap smartly). */
function useRowSize() {
  const [size, setSize] = React.useState(4); // default for SSR hydration
  React.useEffect(() => {
    const mmSm = window.matchMedia("(max-width: 640px)");
    const mmMd = window.matchMedia(
      "(min-width: 641px) and (max-width: 1024px)"
    );

    const apply = () => {
      if (mmSm.matches) setSize(2); // phones: 2 per row
      else if (mmMd.matches) setSize(3); // tablets: 3 per row
      else setSize(4); // desktops: 4 per row
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
   Small Card (no borders, subtle hover)
========================================= */
function SmallForumCard({
  forum,
  priority = false,
}: {
  forum: Forum;
  priority?: boolean;
}) {
  return (
    <article
      className="group flex items-center gap-3 rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur-sm transition
                 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
      aria-label={`${forum.name} membership card`}
    >
      <div className="relative shrink-0 overflow-hidden rounded-lg">
        <Image
          src={forum.image}
          alt={forum.name}
          width={68}
          height={68}
          className="h-[68px] w-[68px] object-contain transition group-hover:scale-[1.03]"
          priority={priority}
        />
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {forum.name}
        </h3>
        {forum.role && (
          <p className="mt-0.5 text-xs text-gray-600">{forum.role}</p>
        )}
      </div>
    </article>
  );
}

/* =========================================
   A whole ROW that glides horizontally on scroll
   dir: 1 => left→right, -1 => right→left
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
  // Give each row a slightly different travel to create depth/parallax
  const amplitude = 90 - Math.min(60, rowIndex * 10); // first row moves more
  const start = dir === 1 ? -amplitude : amplitude;
  const end = dir === 1 ? amplitude : -amplitude;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [start, end]
  );

  return (
    <motion.div style={{ x }} className="w-full overflow-visible">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((f, i) => (
          <SmallForumCard
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
   Main Section: only rows of small cards
   - No borders or big container
   - Height auto (based on data)
   - Each row glides on scroll, alternating directions
========================================= */
export default function ForumsMembershipSection() {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 15%"], // start/end of glide
  });

  const rowSize = useRowSize();
  const rows = React.useMemo(() => chunk(FORUMS, rowSize), [rowSize]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate py-8 sm:py-10"
      // auto height; no fixed minHeight so it grows with data
      aria-label="Forums & memberships"
    >
      {/* Soft brandy backdrop (no visible borders) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(1000px 500px at 10% -10%, ${BRAND}22, transparent 60%),
                       radial-gradient(1000px 500px at 90% -10%, ${BRAND}18, transparent 60%)`,
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.header
          className="mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h2
            className="font-extrabold tracking-tight"
            style={{ color: BRAND, fontSize: "clamp(18px, 2.5vw, 28px)" }}
          >
            A Member of the Following Forums
          </h2>
        </motion.header>

        {/* Rows: each glides horizontally on scroll; alternating directions */}
        <div className="flex flex-col gap-5">
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
