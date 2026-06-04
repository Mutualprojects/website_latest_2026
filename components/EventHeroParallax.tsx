"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import EventsShowcase from "./Professional";

/* ================= TYPES ================= */

export type EventImage = {
  title: string;
  link: string;
  thumbnail: string;
};

type EventItem = {
  title: string;
  description?: string;
  images: string[];
};

type EventParallaxProps = {
  events: EventItem[];
  sizes?: {
    mobile?: { w: string; h: string };
    tablet?: { w: string; h: string };
    desktop?: { w: string; h: string };
    gap?: { mobile?: string; desktop?: string };
  };
};

/* ================= DEFAULT SIZES ================= */

const DEFAULT_SIZES: Required<EventParallaxProps["sizes"]> = {
  mobile: { w: "w-[14rem]", h: "h-56" },
  tablet: { w: "sm:w-[18rem]", h: "sm:h-72" },
  desktop: { w: "md:w-[28rem]", h: "md:h-96" },
  gap: { mobile: "space-x-8", desktop: "md:space-x-16" },
};

/* ================= YOUR EVENTS DATA ================= */

// Data fetched from Strapi API dynamically

/* ================= FLATTEN EVENTS ================= */

function buildEventProducts(events: EventItem[]) {
  return events.flatMap((event) =>
    event.images.map((img, index) => ({
      title: event.title,
      link: "#",
      thumbnail: img,
      _key: `${event.title}-${index}`,
    }))
  );
}

/* ================= EVENT PARALLAX ================= */

export const EventParallax: React.FC<EventParallaxProps> = ({
  events,
  sizes,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const s = { ...DEFAULT_SIZES, ...(sizes ?? {}) };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cardsPerRow = isMobile ? 3 : 5;
  const translateAmount = isMobile ? 320 : 1000;

  const products = useMemo(() => buildEventProducts(events), [events]);

  const rows = useMemo(() => {
    return [
      products.slice(0, cardsPerRow),
      products.slice(cardsPerRow, cardsPerRow * 2),
      products.slice(cardsPerRow * 2, cardsPerRow * 3),
    ];
  }, [products, cardsPerRow]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const spring = { stiffness: 280, damping: 32 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, translateAmount]),
    spring
  );

  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -translateAmount]),
    spring
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [12, 0]),
    spring
  );

  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [10, 0]),
    spring
  );

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [-400, 300]),
    spring
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.25, 1]),
    spring
  );

  const sizeClass = `${s.mobile.w} ${s.mobile.h} ${s.tablet.w} ${s.tablet.h} ${s.desktop.w} ${s.desktop.h}`;

  return (
    <section
      ref={ref}
      className={`
          relative min-h-screen
          
    overflow-hidden
    pt-24 pb-0
    antialiased
    [perspective:1000px]
    [transform-style:preserve-3d]
      `}
    >
      <EventHeader />

      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        {/* ROW 1 */}
        <motion.div
          className={`flex flex-row-reverse space-x-reverse ${s.gap.mobile} ${s.gap.desktop} mb-16`}
        >
          {rows[0].map((item) => (
            <EventCard
              key={item._key}
              product={item}
              translate={translateX}
              sizeClass={sizeClass}
            />
          ))}
        </motion.div>

        {/* ROW 2 */}
        <motion.div
          className={`flex flex-row ${s.gap.mobile} ${s.gap.desktop} mb-16`}
        >
          {rows[1].map((item) => (
            <EventCard
              key={item._key}
              product={item}
              translate={translateXReverse}
              sizeClass={sizeClass}
            />
          ))}
        </motion.div>

        {/* ROW 3 */}
        <motion.div
          className={`flex flex-row-reverse space-x-reverse ${s.gap.mobile} ${s.gap.desktop}`}
        >
          {rows[2].map((item) => (
            <EventCard
              key={item._key}
              product={item}
              translate={translateX}
              sizeClass={sizeClass}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ================= HEADER ================= */

const EventHeader = () => {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-32">
      <p className="uppercase tracking-[0.3em] text-sm text-[#07518a] mb-3">
        Life at Brihaspathi
      </p>

      <h1 className="text-3xl md:text-7xl font-extrabold text-black leading-tight">
        Our Events & <br /> Celebrations
      </h1>

      <p className="max-w-2xl mt-6 text-base md:text-xl text-neutral-600">
        Moments that define our culture — celebrations, milestones, recognitions,
        and shared achievements across Brihaspathi Technologies.
      </p>
    </div>
  );
};

/* ================= CARD ================= */

type EventCardProps = {
  product: EventImage & { _key: string };
  translate: MotionValue<number>;
  sizeClass: string;
};

const EventCard: React.FC<EventCardProps> = ({
  product,
  translate,
  sizeClass,
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -16 }}
      className={`
        group relative flex-shrink-0
        rounded-xl overflow-hidden bg-gray-200
        ${sizeClass}
      `}
    >
      <Link href={product.link} className="block h-full w-full">
        {/* ✅ always full coverage */}
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </Link>

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300" />

      <h2 className="absolute bottom-4 left-4 text-white text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity">
        {product.title}
      </h2>
    </motion.div>
  );
};

/* ================= DEMO EXPORT ================= */

export default function EventParallaxDemo() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchEvents() {
      try {
        const res = await fetch("/strapi/api/events?populate=*");
        if (!res.ok) throw new Error("Failed to fetch events");
        const json = await res.json();
        if (active && json.data) {
          const fetchedEvents: EventItem[] = json.data.map((item: any) => {
            const mainImg = item.mainImage?.url ? `/strapi${item.mainImage.url}` : "";
            const galleryImgs = item.eventGallery?.map((g: any) => `/strapi${g.url}`) || [];
            const allImages = mainImg ? [mainImg, ...galleryImgs] : galleryImgs;
            return {
              title: item.eventTitle || "Untitled",
              description: item.eventDescription || "",
              images: allImages.filter(Boolean),
            };
          });
          setEvents(fetchedEvents);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchEvents();
    return () => { active = false; };
  }, []);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* ✅ CONTROL SIZES HERE */}
      {!loading && events.length > 0 && (
        <EventParallax
          events={events}
          sizes={{
            mobile: { w: "w-[12.5rem]", h: "h-44" },
            tablet: { w: "sm:w-[18rem]", h: "sm:h-72" },
            desktop: { w: "md:w-[30rem]", h: "md:h-96" },
            gap: { mobile: "space-x-6", desktop: "md:space-x-16" },
          }}
        />
      )}
    </section>
  );
}
